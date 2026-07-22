"use client"

import type { ComponentType, ReactNode } from "react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useWebGLSupport } from "@/hooks/use-webgl-support"
import { cn } from "@/lib/utils"

interface TopicVisualProps {
  /** A `next/dynamic(() => import(...), { ssr: false })`-wrapped scene component. */
  Scene: ComponentType
  fallback: ReactNode
  className?: string
}

/**
 * Generic decorative-visual wrapper shared by every page's topic scene: shows
 * the real WebGL scene when supported and motion is allowed, otherwise a
 * lightweight CSS fallback. Always `aria-hidden` — never required to
 * understand the page.
 */
export function TopicVisual({ Scene, fallback, className }: TopicVisualProps) {
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()
  const useCanvas = webglSupported === true && !reducedMotion

  return (
    <div aria-hidden="true" className={cn("relative mx-auto aspect-square w-full max-w-md", className)}>
      {useCanvas ? <Scene /> : fallback}
    </div>
  )
}
