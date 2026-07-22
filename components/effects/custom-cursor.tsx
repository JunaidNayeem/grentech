"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * A trailing glow accent that follows the pointer, layered on top of (not
 * replacing) the native cursor — purely decorative, so it never affects
 * click targets or hover behaviour. Desktop with a fine pointer only, and
 * skipped entirely under reduced motion.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 250, damping: 30, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 250, damping: 30, mass: 0.5 })

  useEffect(() => {
    setEnabled(window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (!enabled || reducedMotion) return
    function handleMove(event: PointerEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener("pointermove", handleMove)
    return () => window.removeEventListener("pointermove", handleMove)
  }, [enabled, reducedMotion, x, y])

  if (!enabled || reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-10 w-10 rounded-full bg-brand/30 mix-blend-screen blur-md"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    />
  )
}
