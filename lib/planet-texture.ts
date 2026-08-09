/**
 * Procedural surface maps for the hero's planets.
 *
 * Distant planets read as real bodies mostly through two cues: albedo that
 * varies across the surface, and relief that catches the terminator. Both come
 * from the same seeded fBm field here, so a planet needs no image assets and
 * every planet gets its own surface from a different seed.
 *
 * Equirectangular layout (u = longitude, v = latitude). The noise lattice wraps
 * in u so a sphere shows no seam.
 */

export type PlanetSurface = "rocky" | "banded" | "icy"

export interface PlanetTextureOptions {
  seed: number
  surface: PlanetSurface
  /** Base albedo as `[r, g, b]`, 0-1. Darker reads further away. */
  base: [number, number, number]
  /** Albedo of the high-noise regions — highlands, cloud bands, ice. */
  highlight: [number, number, number]
  width?: number
  height?: number
}

export interface PlanetTextureData {
  width: number
  height: number
  /** RGBA colour map. */
  color: Uint8Array
  /** RGBA greyscale relief, for use as a bump map. */
  bump: Uint8Array
}

/** Deterministic 32-bit PRNG (mulberry32) — same seed, same planet, every reload. */
function createRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

/**
 * Value noise on a lattice that repeats every `periodX` cells horizontally,
 * which is what keeps the equirectangular wrap seamless.
 */
function createNoise(random: () => number, periodX: number, periodY: number) {
  const lattice = new Float32Array(periodX * periodY)
  for (let i = 0; i < lattice.length; i++) lattice[i] = random()

  return (x: number, y: number) => {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const fx = smoothstep(x - x0)
    const fy = smoothstep(y - y0)

    const wrap = (value: number, period: number) => ((value % period) + period) % period
    const ix0 = wrap(x0, periodX)
    const ix1 = wrap(x0 + 1, periodX)
    const iy0 = wrap(y0, periodY)
    const iy1 = wrap(y0 + 1, periodY)

    const v00 = lattice[iy0 * periodX + ix0]
    const v10 = lattice[iy0 * periodX + ix1]
    const v01 = lattice[iy1 * periodX + ix0]
    const v11 = lattice[iy1 * periodX + ix1]

    return (v00 * (1 - fx) + v10 * fx) * (1 - fy) + (v01 * (1 - fx) + v11 * fx) * fy
  }
}

/** Circular depressions with a raised rim — the detail that says "rock, not sphere". */
function createCraters(random: () => number, count: number) {
  return Array.from({ length: count }, () => ({
    u: random(),
    v: 0.15 + random() * 0.7,
    radius: 0.012 + random() * 0.045,
    depth: 0.35 + random() * 0.5,
  }))
}

export function createPlanetTexture({
  seed,
  surface,
  base,
  highlight,
  width = 256,
  height = 128,
}: PlanetTextureOptions): PlanetTextureData {
  const random = createRandom(seed)
  const octaves = [
    { noise: createNoise(random, 8, 4), scale: 1, weight: 0.5 },
    { noise: createNoise(random, 16, 8), scale: 2, weight: 0.28 },
    { noise: createNoise(random, 32, 16), scale: 4, weight: 0.14 },
    { noise: createNoise(random, 64, 32), scale: 8, weight: 0.08 },
  ]
  const craters = surface === "rocky" ? createCraters(random, 26) : []
  const bandPhase = random() * Math.PI * 2

  const color = new Uint8Array(width * height * 4)
  const bump = new Uint8Array(width * height * 4)

  for (let y = 0; y < height; y++) {
    const v = y / height
    for (let x = 0; x < width; x++) {
      const u = x / width

      let field = 0
      for (const octave of octaves) {
        field += octave.noise(u * 8 * octave.scale, v * 4 * octave.scale) * octave.weight
      }

      if (surface === "banded") {
        // Latitude bands, warped by the noise — Jovian cloud belts.
        const bands = Math.sin(v * Math.PI * 9 + bandPhase + field * 2.2)
        field = 0.5 + bands * 0.28 + field * 0.22
      }

      let relief = field
      for (const crater of craters) {
        // Longitude distance has to wrap, and shrink toward the poles.
        const du = Math.min(Math.abs(u - crater.u), 1 - Math.abs(u - crater.u)) * Math.sin(v * Math.PI)
        const dv = v - crater.v
        const distance = Math.sqrt(du * du + dv * dv)
        if (distance > crater.radius) continue
        const t = distance / crater.radius
        // Bowl, plus a bright rim in the outer fifth.
        relief -= crater.depth * (1 - smoothstep(t)) * 0.6
        if (t > 0.8) relief += crater.depth * 0.25
      }

      const shade = Math.min(1, Math.max(0, relief))
      // Slight poleward brightening: dust and frost collect where the sun is low.
      const polar = Math.pow(Math.abs(v - 0.5) * 2, 3) * (surface === "icy" ? 0.5 : 0.22)
      const mix = Math.min(1, shade * 0.85 + polar)

      const i = (y * width + x) * 4
      color[i] = Math.round(255 * (base[0] + (highlight[0] - base[0]) * mix))
      color[i + 1] = Math.round(255 * (base[1] + (highlight[1] - base[1]) * mix))
      color[i + 2] = Math.round(255 * (base[2] + (highlight[2] - base[2]) * mix))
      color[i + 3] = 255

      // Gas giants have no relief to speak of — flatten the bump for them.
      const reliefStrength = surface === "banded" ? 0.35 : 1
      const height8 = Math.round(255 * (0.5 + (shade - 0.5) * reliefStrength))
      bump[i] = height8
      bump[i + 1] = height8
      bump[i + 2] = height8
      bump[i + 3] = 255
    }
  }

  return { width, height, color, bump }
}

/**
 * Square RGBA map for a planetary ring, drawn as concentric bands with gaps.
 *
 * `RingGeometry` gives planar UVs normalised by the *outer* radius, so circles
 * drawn in texture space land as real radial divisions — but only the annulus
 * between `innerRatio` and 1 is ever sampled. Bands and edge fades are laid out
 * across that annulus, and everything outside it is left fully transparent.
 */
export function createRingTexture(
  seed: number,
  size = 256,
  innerRatio = 0.6,
): { size: number; data: Uint8Array } {
  const random = createRandom(seed)
  const bands = Array.from({ length: 7 }, () => ({
    /** Position across the ring, 0 at the inner edge and 1 at the outer. */
    position: random(),
    width: 0.05 + random() * 0.16,
    /** Negative bands are divisions — the Cassini gaps that make a ring read. */
    density: random() < 0.35 ? -(0.3 + random() * 0.5) : 0.2 + random() * 0.6,
  }))
  const data = new Uint8Array(size * size * 4)
  const centre = (size - 1) / 2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - centre) / centre
      const dy = (y - centre) / centre
      const radius = Math.sqrt(dx * dx + dy * dy)
      const i = (y * size + x) * 4
      const ice = 200 + Math.round(random() * 40)
      data[i] = ice
      data[i + 1] = Math.round(ice * 0.96)
      data[i + 2] = Math.round(ice * 0.88)

      if (radius < innerRatio || radius > 1) {
        data[i + 3] = 0
        continue
      }

      const t = (radius - innerRatio) / (1 - innerRatio)
      let density = 0.45
      for (const band of bands) {
        const distance = Math.abs(t - band.position)
        if (distance < band.width) density += band.density * (1 - distance / band.width)
      }
      // Thin out both edges so the ring fades instead of ending on a hard line.
      const edge = Math.min(1, Math.min(t, 1 - t) * 9)
      const alpha = Math.min(1, Math.max(0, density)) * Math.max(0, edge)

      data[i + 3] = Math.round(alpha * 235)
    }
  }

  return { size, data }
}
