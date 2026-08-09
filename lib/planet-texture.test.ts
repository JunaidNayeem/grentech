import { describe, expect, it } from "vitest"

import { createPlanetTexture, createRingTexture } from "./planet-texture"

const OPTIONS = {
  seed: 20125,
  surface: "rocky" as const,
  base: [0.2, 0.22, 0.21] as [number, number, number],
  highlight: [0.6, 0.62, 0.58] as [number, number, number],
}

describe("createPlanetTexture", () => {
  it("fills every texel of an RGBA buffer at the requested size", () => {
    const texture = createPlanetTexture({ ...OPTIONS, width: 64, height: 32 })

    expect(texture.color).toHaveLength(64 * 32 * 4)
    expect(texture.bump).toHaveLength(64 * 32 * 4)
    expect([...texture.color].every((value) => Number.isInteger(value) && value >= 0 && value <= 255)).toBe(true)
    expect([...texture.bump].every((value) => Number.isInteger(value) && value >= 0 && value <= 255)).toBe(true)
  })

  it("is deterministic for a seed, so a planet looks the same on every reload", () => {
    const a = createPlanetTexture({ ...OPTIONS, width: 64, height: 32 })
    const b = createPlanetTexture({ ...OPTIONS, width: 64, height: 32 })

    expect(Array.from(a.color)).toEqual(Array.from(b.color))
  })

  it("gives different seeds different surfaces", () => {
    const a = createPlanetTexture({ ...OPTIONS, width: 64, height: 32 })
    const b = createPlanetTexture({ ...OPTIONS, seed: 74113, width: 64, height: 32 })

    expect(Array.from(a.color)).not.toEqual(Array.from(b.color))
  })

  it("wraps horizontally, so the sphere shows no seam", () => {
    const width = 64
    const height = 32
    const { color } = createPlanetTexture({ ...OPTIONS, width, height })

    for (let y = 0; y < height; y++) {
      const first = color[(y * width) * 4]
      const last = color[(y * width + width - 1) * 4]
      // Adjacent columns across the wrap, so they differ by about one step.
      expect(Math.abs(first - last)).toBeLessThan(40)
    }
  })

  it("keeps relief flat for gas giants and varied for rock", () => {
    const spread = (surface: "rocky" | "banded") => {
      const { bump } = createPlanetTexture({ ...OPTIONS, surface, width: 64, height: 32 })
      const values = Array.from({ length: 64 * 32 }, (_, i) => bump[i * 4])
      return Math.max(...values) - Math.min(...values)
    }

    expect(spread("banded")).toBeLessThan(spread("rocky"))
  })
})

describe("createRingTexture", () => {
  it("is clear inside the ring gap and beyond the outer edge, and drawn between", () => {
    const size = 64
    const innerRatio = 0.6
    const { data } = createRingTexture(20226, size, innerRatio)
    const centre = (size - 1) / 2
    // Sample along the +x axis, where texture radius maps straight to distance.
    const alphaAtRadius = (radius: number) => {
      const x = Math.round(centre + radius * centre)
      const y = Math.round(centre)
      return data[(y * size + x) * 4 + 3]
    }

    expect(alphaAtRadius(0)).toBe(0)
    expect(alphaAtRadius(innerRatio - 0.1)).toBe(0)
    // The corners sit at radius > 1 — outside the ring entirely.
    expect(data[3]).toBe(0)

    const insideRing = [0.7, 0.8, 0.9].map(alphaAtRadius)
    expect(Math.max(...insideRing)).toBeGreaterThan(60)
  })
})
