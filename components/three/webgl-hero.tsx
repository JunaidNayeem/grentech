"use client"

import dynamic from "next/dynamic"

import { HeroVisual } from "@/components/sections/hero-visual"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroVisualLayer />,
})

/**
 * The CSS/SVG fallback, held where the 3D scene renders: the hero's second
 * column on desktop, a faint centred backdrop once the copy goes full width.
 */
function HeroVisualLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 lg:opacity-100"
    >
      <div className="w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto lg:ml-auto lg:w-[calc(50%-1.5rem)]">
          <HeroVisual />
        </div>
      </div>
    </div>
  )
}

/**
 * Decorative hero visual, rendered as a full-bleed layer behind the hero copy
 * rather than as a sized box — so the scene is never cropped by a wrapper and
 * can spread into the section's own space. Renders a real WebGL 3D scene
 * (React Three Fiber) when the browser supports it and the user hasn't asked
 * for reduced motion; otherwise the lightweight CSS/SVG fallback. Never
 * required to understand the page — always `aria-hidden`.
 */
export function WebGLHero() {
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()

  const useCanvas = webglSupported === true && !reducedMotion

  if (!useCanvas) {
    return <HeroVisualLayer />
  }

  // Below `lg` the copy runs full width, so the scene sits behind it — held
  // faint there to keep text contrast where it should be.
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 opacity-25 lg:opacity-100">
      <HeroScene />
    </div>
  )
}
