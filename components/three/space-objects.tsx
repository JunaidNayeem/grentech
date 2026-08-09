"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { createPlanetTexture, createRingTexture, type PlanetSurface } from "@/lib/planet-texture"

/** Painted spacecraft white — matte, the way real hardware photographs. */
const HULL = "#C6CDD0"
/** Shadowed structure: radiators, adaptors, engine housings, interstage. */
const STRUCTURE = "#2B3134"
/** Multi-layer insulation. Desaturated gold, not brass. */
const INSULATION = "#B08D3C"
/** Solar cell blue-black. */
const CELL = "#151E2C"

/** Ring extent, as multiples of the planet's radius. The texture is laid out to match. */
const RING_INNER = 1.45
const RING_OUTER = 2.35

/**
 * Where something sits in the hero, given in frame fractions rather than world
 * units so the scatter holds its composition at any viewport size.
 */
export interface FramePlacement {
  /** Horizontal position as a fraction of the frame's half-width: -1 is the left edge, +1 the right. */
  u: number
  /** Vertical position as a fraction of the frame's half-height: -1 is the bottom, +1 the top. */
  v: number
  /** Depth in world units. Negative is further from the camera, and reads smaller and dimmer. */
  z: number
}

/**
 * A body drifting in place. Nothing here orbits anything — each object holds its
 * own spot in the frame and wanders slightly, on its own periods, so the field
 * reads as scattered bodies in space rather than a system with a centre.
 */
export interface DriftSpec extends FramePlacement {
  /** Drift amplitude, in the same frame fractions as `u`/`v`. */
  drift?: [number, number]
  /** Seconds per drift cycle, per axis. Deliberately long and mutually prime-ish. */
  period?: [number, number]
  /** Offsets this body's drift so nothing moves in lockstep. */
  phase?: number
}

export interface PlanetSpec extends DriftSpec {
  /** Sphere radius, in world units at z = 0. */
  size: number
  /** Which procedural surface to generate. */
  surface: PlanetSurface
  /** Base albedo, `[r, g, b]` 0-1 — the low ground. */
  base: [number, number, number]
  /** Albedo of highlands, cloud bands or frost. */
  highlight: [number, number, number]
  /** Seeds this planet's surface. Distinct seeds give distinct worlds. */
  seed: number
  /** Adds a banded ice-and-dust ring. */
  ring?: boolean
  /**
   * Axial tilt as `[x, z]` radians — a planet's spin axis is rarely square to the
   * frame. The `x` term is what tips a ring open into an ellipse; on `z` alone a
   * ring stays edge-on and reads as a line drawn across the hero.
   */
  axialTilt?: [number, number]
}

export interface CraftSpec extends DriftSpec {
  /** Overall size. The rocket is ~2.4 units nose to engine at scale 1, the satellite ~1.2. */
  scale: number
  /** Resting attitude as `[x, y, z]` Euler radians — which way the craft is headed. */
  attitude: [number, number, number]
  /** Accent stripe and beacon colour. */
  color: string
}

/**
 * The sun: one hard, neutral source with almost no fill.
 *
 * That ratio is what makes a planet read as a lit body rather than a coloured
 * ball — a sharp terminator and a near-black night side. It lights the whole
 * scene, not just the space objects (three's light layers only gate a light per
 * camera, not per object), so keep it aimed with the existing accent light so
 * the two rigs agree on where the light comes from.
 */
export function SpaceLighting({ direction = [7, 5, 4] }: { direction?: [number, number, number] }) {
  return (
    <>
      <directionalLight position={direction} intensity={4} color="#FFF4E6" />
      {/* Starlight and planetshine: just enough that the night side isn't a void. */}
      <ambientLight intensity={0.1} color="#7E93B4" />
    </>
  )
}

/**
 * Holds an object at its place in the frame with a slow float.
 *
 * The frame widens with distance, so a fixed world position would slide out of
 * composition as the canvas resizes; converting from frame fractions every frame
 * keeps a body where it was placed at any viewport size and any depth.
 */
function useDrift(spec: DriftSpec) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock, viewport, camera }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const [driftU, driftV] = spec.drift ?? [0.035, 0.025]
    const [periodU, periodV] = spec.period ?? [37, 53]
    const phase = spec.phase ?? 0

    const u = spec.u + Math.sin((t / periodU) * Math.PI * 2 + phase) * driftU
    const v = spec.v + Math.cos((t / periodV) * Math.PI * 2 + phase * 1.7) * driftV
    const spread = (camera.position.z - spec.z) / camera.position.z

    ref.current.position.set((u * viewport.width * spread) / 2, (v * viewport.height * spread) / 2, spec.z)
  })

  return ref
}

/** Soft round point sprite — a bare square point reads as a pixel, not a star. */
function useStarSprite() {
  return useMemo(() => {
    const size = 32
    const data = new Uint8Array(size * size * 4)
    const centre = (size - 1) / 2

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const distance = Math.sqrt((x - centre) ** 2 + (y - centre) ** 2) / centre
        // Tight core with a faint halo, like a defocused point source.
        const core = Math.max(0, 1 - distance * 2.6) ** 2
        const halo = Math.max(0, 1 - distance) ** 3 * 0.35
        const i = (y * size + x) * 4
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
        data[i + 3] = Math.round(Math.min(1, core + halo) * 255)
      }
    }

    const texture = new THREE.DataTexture(data, size, size)
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter
    texture.needsUpdate = true
    return texture
  }, [])
}

/** One magnitude class of the starfield. */
interface StarLayerSpec {
  count: number
  size: number
  opacity: number
}

const STAR_LAYERS: StarLayerSpec[] = [
  { count: 760, size: 0.2, opacity: 0.45 },
  { count: 230, size: 0.34, opacity: 0.7 },
  { count: 60, size: 0.58, opacity: 0.95 },
]

function StarLayer({ spec, sprite, seed }: { spec: StarLayerSpec; sprite: THREE.Texture; seed: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(spec.count * 3)
    const colors = new Float32Array(spec.count * 3)
    // Deterministic per layer, so the field doesn't reshuffle between renders.
    let state = seed
    const random = () => {
      state = (state * 1664525 + 1013904223) % 4294967296
      return state / 4294967296
    }

    for (let i = 0; i < spec.count; i++) {
      // Uniform on a spherical shell around the camera, so it fills the frame at any aspect.
      const theta = random() * Math.PI * 2
      const z = random() * 2 - 1
      const ring = Math.sqrt(1 - z * z)
      const distance = 40 + random() * 30

      positions[i * 3] = Math.cos(theta) * ring * distance
      positions[i * 3 + 1] = z * distance
      positions[i * 3 + 2] = Math.sin(theta) * ring * distance

      // Colour temperature: most stars near white, a few blue or amber.
      const temperature = random()
      colors[i * 3] = temperature < 0.5 ? 1 : 1 - (temperature - 0.5) * 0.22
      colors[i * 3 + 1] = 0.94 + random() * 0.06
      colors[i * 3 + 2] = temperature < 0.5 ? 1 - (0.5 - temperature) * 0.16 : 1
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return buffer
  }, [spec.count, seed])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={spec.size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={spec.opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Deep field, wrapping the camera so it fills the hero edge to edge. Static by
 * design: without an atmosphere to refract through, stars don't twinkle, and
 * animating them is what makes a starfield look drawn. The only motion is
 * parallax as the camera drifts.
 */
export function Starfield() {
  const sprite = useStarSprite()

  useEffect(() => () => sprite.dispose(), [sprite])

  return (
    <>
      {STAR_LAYERS.map((layer, i) => (
        <StarLayer key={i} spec={layer} sprite={sprite} seed={0x5f3a + i * 7919} />
      ))}
    </>
  )
}

function usePlanetMaps(spec: PlanetSpec) {
  const maps = useMemo(() => {
    const { width, height, color, bump } = createPlanetTexture({
      seed: spec.seed,
      surface: spec.surface,
      base: spec.base,
      highlight: spec.highlight,
    })

    const map = new THREE.DataTexture(color, width, height)
    map.colorSpace = THREE.SRGBColorSpace
    const bumpMap = new THREE.DataTexture(bump, width, height)

    for (const texture of [map, bumpMap]) {
      // DataTexture defaults to nearest filtering, which is the blocky look.
      texture.magFilter = THREE.LinearFilter
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.generateMipmaps = true
      texture.wrapS = THREE.RepeatWrapping
      texture.needsUpdate = true
    }

    if (!spec.ring) return { map, bumpMap, ringMap: null }

    const ring = createRingTexture(spec.seed + 101, 256, RING_INNER / RING_OUTER)
    const ringMap = new THREE.DataTexture(ring.data, ring.size, ring.size)
    ringMap.colorSpace = THREE.SRGBColorSpace
    ringMap.magFilter = THREE.LinearFilter
    ringMap.minFilter = THREE.LinearMipmapLinearFilter
    ringMap.generateMipmaps = true
    ringMap.needsUpdate = true

    return { map, bumpMap, ringMap }
  }, [spec.seed, spec.surface, spec.base, spec.highlight, spec.ring])

  useEffect(
    () => () => {
      maps.map.dispose()
      maps.bumpMap.dispose()
      maps.ringMap?.dispose()
    },
    [maps],
  )

  return maps
}

function Planet({ spec }: { spec: PlanetSpec }) {
  const driftRef = useDrift(spec)
  const bodyRef = useRef<THREE.Mesh>(null)
  const { map, bumpMap, ringMap } = usePlanetMaps(spec)

  useFrame(({ clock }) => {
    // Slow enough to read as rotation rather than spin.
    if (bodyRef.current) bodyRef.current.rotation.y = clock.getElapsedTime() * 0.06
  })

  return (
    <group ref={driftRef}>
      <group rotation={[spec.axialTilt?.[0] ?? 0.3, 0, spec.axialTilt?.[1] ?? 0.24]}>
        <mesh ref={bodyRef}>
          <sphereGeometry args={[spec.size, 48, 32]} />
          <meshStandardMaterial
            map={map}
            bumpMap={bumpMap}
            bumpScale={spec.surface === "banded" ? 0.03 : 0.1}
            roughness={spec.surface === "icy" ? 0.55 : 0.85}
            metalness={0}
          />
        </mesh>
        {ringMap && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[spec.size * RING_INNER, spec.size * RING_OUTER, 96]} />
            <meshStandardMaterial
              map={ringMap}
              alphaMap={ringMap}
              transparent
              side={THREE.DoubleSide}
              roughness={0.9}
              metalness={0}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>
    </group>
  )
}

/** Planets scattered across the frame, each drifting on its own. */
export function PlanetField({ planets }: { planets: PlanetSpec[] }) {
  return (
    <>
      {planets.map((planet, i) => (
        <Planet key={i} spec={planet} />
      ))}
    </>
  )
}

/** Thruster exhaust: an open cone, additive, breathing rather than flickering. */
function Plume({ radius, length, phase }: { radius: number; length: number; phase: number }) {
  const plumeRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!plumeRef.current) return
    // Vacuum plumes are steady; this is a slight pulse, not a cartoon flicker.
    const pulse = 0.9 + Math.sin(clock.getElapsedTime() * 2.4 + phase) * 0.1
    plumeRef.current.scale.set(1, pulse, 1)
    const material = plumeRef.current.material as THREE.MeshBasicMaterial
    material.opacity = 0.1 + pulse * 0.08
  })

  return (
    <mesh ref={plumeRef} position={[0, -length / 2, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[radius, length, 16, 1, true]} />
      <meshBasicMaterial
        color="#CFE2FF"
        transparent
        opacity={0.16}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Adds a slow attitude wobble on top of a craft's resting orientation. */
function useAttitude(spec: CraftSpec) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() + (spec.phase ?? 0) * 10
    ref.current.rotation.set(
      spec.attitude[0] + Math.sin(t * 0.11) * 0.05,
      spec.attitude[1] + Math.sin(t * 0.07) * 0.08,
      spec.attitude[2] + Math.cos(t * 0.09) * 0.04,
    )
  })

  return ref
}

/**
 * A launch vehicle, modelled nose-up along +Y: long white booster, dark
 * interstage, grid fins, and a lit engine. Proportions are the giveaway for
 * whether a rocket reads as real hardware or as a toy, so the body is deliberately
 * long and slender rather than stubby.
 */
export function Rocket({ spec }: { spec: CraftSpec }) {
  const driftRef = useDrift(spec)
  const attitudeRef = useAttitude(spec)

  return (
    <group ref={driftRef}>
      <group ref={attitudeRef}>
        <group scale={spec.scale}>
          {/* Booster. */}
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.14, 0.145, 1.5, 28]} />
            <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.44} />
          </mesh>
          {/* Interstage — the dark band that breaks up a long white body. */}
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.142, 0.142, 0.14, 28]} />
            <meshStandardMaterial color={STRUCTURE} metalness={0.5} roughness={0.55} />
          </mesh>
          {/* Second stage and fairing. */}
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.135, 0.14, 0.5, 28]} />
            <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.42} />
          </mesh>
          <mesh position={[0, 1.0, 0]} scale={[1, 2.1, 1]}>
            <sphereGeometry args={[0.135, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.4} />
          </mesh>
          {/* Accent stripe — the one brand mark on the hull. */}
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.147, 0.147, 0.05, 28]} />
            <meshStandardMaterial color={spec.color} metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Grid fins, stowed flat against the booster. */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
              <mesh position={[0.155, 0.28, 0]}>
                <boxGeometry args={[0.05, 0.16, 0.13]} />
                <meshStandardMaterial color={STRUCTURE} metalness={0.6} roughness={0.5} />
              </mesh>
            </group>
          ))}
          {/* Engine section and bell. */}
          <mesh position={[0, -1.16, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 0.14, 24]} />
            <meshStandardMaterial color={STRUCTURE} metalness={0.7} roughness={0.42} />
          </mesh>
          <mesh position={[0, -1.32, 0]}>
            <cylinderGeometry args={[0.13, 0.07, 0.2, 24, 1, true]} />
            <meshStandardMaterial color={STRUCTURE} metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <group position={[0, -1.42, 0]}>
            <Plume radius={0.075} length={0.7} phase={spec.phase ?? 0} />
          </group>
        </group>
      </group>
    </group>
  )
}

/** A solar array: framed cells on a short boom, one per side. */
function SolarArray({ side }: { side: 1 | -1 }) {
  return (
    <group position={[0.3 * side, 0.02, 0]}>
      <mesh position={[-0.16 * side, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.14, 8]} />
        <meshStandardMaterial color={STRUCTURE} metalness={0.6} roughness={0.5} />
      </mesh>
      {[-0.115, 0, 0.115].map((offset) => (
        <mesh key={offset} position={[offset * 1.6 * side, 0, 0]}>
          <boxGeometry args={[0.17, 0.012, 0.2]} />
          <meshStandardMaterial color={CELL} metalness={0.35} roughness={0.28} />
        </mesh>
      ))}
      {/* Frame edge — catches the sun and defines the panel silhouette. */}
      <mesh>
        <boxGeometry args={[0.58, 0.008, 0.215]} />
        <meshStandardMaterial color={HULL} metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

/**
 * A satellite: instrument bus, insulated equipment section, high-gain dish and
 * two solar arrays. It holds an attitude and turns slowly, the way station-keeping
 * hardware does — no thrust, so no plume.
 */
export function Satellite({ spec }: { spec: CraftSpec }) {
  const driftRef = useDrift(spec)
  const attitudeRef = useAttitude(spec)
  const busRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (busRef.current) busRef.current.rotation.y = clock.getElapsedTime() * 0.08
  })

  return (
    <group ref={driftRef}>
      <group ref={attitudeRef}>
        <group ref={busRef} scale={spec.scale}>
          <mesh>
            <cylinderGeometry args={[0.115, 0.13, 0.66, 24]} />
            <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.42} />
          </mesh>
          {/* Insulated equipment section. */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.122, 0.122, 0.1, 24]} />
            <meshStandardMaterial color={INSULATION} metalness={0.85} roughness={0.35} />
          </mesh>
          {/* Accent stripe. */}
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.132, 0.135, 0.035, 24]} />
            <meshStandardMaterial color={spec.color} metalness={0.3} roughness={0.5} />
          </mesh>
          <SolarArray side={1} />
          <SolarArray side={-1} />
          {/* High-gain antenna. */}
          <group position={[0, 0.34, 0.04]} rotation={[0.55, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.7]} />
              <meshStandardMaterial color={HULL} metalness={0.4} roughness={0.35} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
              <meshStandardMaterial color={STRUCTURE} metalness={0.6} roughness={0.5} />
            </mesh>
          </group>
          {/* Station-keeping thruster housing. */}
          <mesh position={[0, -0.37, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.1, 20]} />
            <meshStandardMaterial color={STRUCTURE} metalness={0.75} roughness={0.4} />
          </mesh>
          {/* Position beacon. */}
          <mesh position={[0, 0.16, -0.11]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshStandardMaterial color={spec.color} emissive={spec.color} emissiveIntensity={1.6} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
