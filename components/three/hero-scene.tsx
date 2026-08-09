"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

import {
  BRAND,
  LIME,
  TEAL,
  ConnectionLines,
  NodeMesh,
  PointerRig,
  SceneLights,
  useAutoRotate,
  type NodeSpec,
} from "@/components/three/scene-primitives"
import {
  PlanetField,
  Rocket,
  Satellite,
  SpaceLighting,
  Starfield,
  type CraftSpec,
  type PlanetSpec,
} from "@/components/three/space-objects"

const NODES: NodeSpec[] = [
  { position: [-2.4, 0.8, 0], scale: 0.62, geometry: "icosahedron", color: BRAND, speed: 0.9 },
  { position: [1.6, 1.4, -1], scale: 0.4, geometry: "torus", color: LIME, speed: 1.3 },
  { position: [2.6, -0.6, 0.4], scale: 0.7, geometry: "box", color: TEAL, speed: 0.7 },
  { position: [-1.2, -1.3, 0.6], scale: 0.5, geometry: "box", color: BRAND, speed: 1.1 },
  { position: [0.2, 0.2, 1.2], scale: 0.32, geometry: "icosahedron", color: LIME, speed: 1.5 },
  { position: [-2.8, -0.9, -0.8], scale: 0.36, geometry: "torus", color: TEAL, speed: 1.0 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 1],
  [3, 5],
]

/**
 * Planets scattered across the whole hero, placed in frame fractions (`u`/`v`)
 * rather than around any centre — nothing orbits, each body just holds its spot
 * and drifts. The scatter is uneven on purpose, and the ones over the copy side
 * are held small and far so they read as distance rather than clutter. Albedos
 * are real-world dull: a saturated planet reads as a graphic, a dusty one reads
 * as a body in sunlight.
 */
const PLANETS: PlanetSpec[] = [
  {
    u: 0.55,
    v: 0.62,
    z: -4.5,
    size: 0.68,
    surface: "banded",
    base: [0.27, 0.3, 0.28],
    highlight: [0.66, 0.68, 0.61],
    seed: 20125,
    ring: true,
    axialTilt: [0.62, 0.35],
    drift: [0.03, 0.022],
    period: [41, 58],
    phase: 0.3,
  },
  {
    u: -0.58,
    v: 0.76,
    z: -5.5,
    size: 0.45,
    surface: "rocky",
    base: [0.19, 0.2, 0.2],
    highlight: [0.54, 0.55, 0.53],
    seed: 74113,
    drift: [0.045, 0.03],
    period: [63, 37],
    phase: 2.1,
  },
  {
    u: 0.42,
    v: -0.78,
    z: -2.2,
    size: 0.38,
    surface: "icy",
    base: [0.29, 0.35, 0.39],
    highlight: [0.77, 0.83, 0.87],
    seed: 51884,
    axialTilt: [-0.42, -0.3],
    drift: [0.05, 0.018],
    period: [47, 71],
    phase: 4.4,
  },
  {
    u: -0.9,
    v: -0.88,
    z: -4.2,
    size: 0.5,
    surface: "rocky",
    base: [0.23, 0.2, 0.17],
    highlight: [0.51, 0.45, 0.38],
    seed: 33027,
    drift: [0.035, 0.04],
    period: [54, 43],
    phase: 5.6,
  },
  {
    u: 0.86,
    v: -0.48,
    z: -7,
    size: 0.72,
    surface: "icy",
    base: [0.24, 0.29, 0.33],
    highlight: [0.7, 0.76, 0.81],
    seed: 90412,
    axialTilt: [0.4, 0.55],
    drift: [0.02, 0.03],
    period: [77, 49],
    phase: 1.4,
  },
  {
    u: -0.18,
    v: 0.86,
    z: -8.5,
    size: 0.35,
    surface: "rocky",
    base: [0.21, 0.19, 0.18],
    highlight: [0.47, 0.44, 0.4],
    seed: 61207,
    drift: [0.06, 0.02],
    period: [68, 59],
    phase: 3.2,
  },
]

/** One rocket, low and centre-left, holding a cruise attitude across the bottom of the frame. */
const ROCKET: CraftSpec = {
  u: 0.05,
  v: -0.6,
  z: -1,
  scale: 0.38,
  attitude: [0.12, 0.6, -0.38],
  color: BRAND,
  drift: [0.05, 0.03],
  period: [51, 39],
  phase: 0.8,
}

/** One satellite, high and right, turning slowly the way station-keeping hardware does. */
const SATELLITE: CraftSpec = {
  u: 0.68,
  v: 0.8,
  z: -1.5,
  scale: 0.7,
  attitude: [0.35, 0, 0.22],
  color: LIME,
  drift: [0.025, 0.035],
  period: [44, 61],
  phase: 3.7,
}

/** Widest the cluster ever gets in world units, at scale 1, over a full auto-rotation. */
const CLUSTER_SPAN = 6.6
/** How far the cluster is allowed to bleed past its column — safe now that the canvas is full-bleed. */
const CLUSTER_OVERSCAN = 1.18
/** Mirrors the page shell: `max-w-content`, `lg:px-8`, and the hero grid's `gap-12`. */
const CONTENT_MAX_PX = 1240
const CONTENT_GUTTER_PX = 32
const COLUMN_GAP_PX = 48
/** Tailwind's `lg` breakpoint — where the hero copy drops to a single column. */
const TWO_COLUMN_PX = 1024

/**
 * The canvas spans the whole hero, so the cluster places itself rather than
 * relying on a wrapper's size: it lines up with the copy's second grid column
 * instead of the canvas centre, and holds a constant on-screen size however
 * tall the section grows. Below `lg` the copy is full width, so it centres and
 * reads as a backdrop.
 */
function useClusterPlacement() {
  const size = useThree((state) => state.size)
  const viewport = useThree((state) => state.viewport)

  // Camera-derived: world units per CSS pixel at z = 0.
  const worldPerPx = viewport.width / size.width
  const contentPx = Math.min(size.width, CONTENT_MAX_PX) - CONTENT_GUTTER_PX * 2

  if (size.width < TWO_COLUMN_PX) {
    const spanPx = Math.min(contentPx, size.height * 0.9)
    return { x: 0, scale: (spanPx * worldPerPx) / CLUSTER_SPAN }
  }

  const columnPx = (contentPx - COLUMN_GAP_PX) / 2
  return {
    x: (COLUMN_GAP_PX / 2 + columnPx / 2) * worldPerPx,
    scale: (columnPx * CLUSTER_OVERSCAN * worldPerPx) / CLUSTER_SPAN,
  }
}

function Scene() {
  const { x, scale } = useClusterPlacement()
  const groupRef = useAutoRotate(0.06)

  return (
    <>
      {/* The space itself lives in world space, spanning the whole hero: the star
          field wraps the camera, and the bodies place themselves against the frame
          rather than against the cluster. */}
      <Starfield />
      <SpaceLighting />
      <PlanetField planets={PLANETS} />
      <Rocket spec={ROCKET} />
      <Satellite spec={SATELLITE} />
      {/* The node cluster keeps its own column and its own light rig — lights sit
          beside it but keep their distance, so shading holds as the cluster resizes. */}
      <group position={[x, 0, 0]}>
        <SceneLights />
        <group scale={scale}>
          <group ref={groupRef}>
            {NODES.map((node, i) => (
              <NodeMesh key={i} node={node} />
            ))}
            <ConnectionLines nodes={NODES} connections={CONNECTIONS} />
          </group>
          <Sparkles count={40} scale={[6, 4, 4]} size={2} speed={0.3} color={BRAND} opacity={0.5} />
        </group>
      </group>
      <PointerRig />
    </>
  )
}

/**
 * Only ever mounted when WebGL is available and the user has not requested
 * reduced motion — see `WebGLHero`, which decides that and owns the fallback.
 */
export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  )
}
