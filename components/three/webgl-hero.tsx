"use client"

import dynamic from "next/dynamic"

import { HeroVisual } from "@/components/sections/hero-visual"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroVisual />,
})

/**
 * Decorative hero visual. Renders a real WebGL 3D scene (React Three Fiber)
 * when the browser supports it and the user hasn't asked for reduced motion;
 * otherwise falls back to the lightweight CSS/SVG visual. Never required to
 * understand the page — always `aria-hidden`.
 */
export function WebGLHero() {
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()

  const useCanvas = webglSupported === true && !reducedMotion

  if (!useCanvas) {
    return <HeroVisual />
  }

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-xl">
      <HeroScene />
    </div>
  )
}
