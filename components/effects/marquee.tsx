"use client"

import type { ReactNode } from "react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  items: ReactNode[]
  speed?: "slow" | "fast"
  className?: string
  itemClassName?: string
}

/**
 * Infinite horizontal scrolling strip. The animated track duplicates its
 * items for a seamless loop, with the duplicate marked `aria-hidden` so
 * screen readers only encounter each item once. Falls back to a static,
 * wrapped row when the user prefers reduced motion.
 */
export function Marquee({ items, speed = "slow", className, itemClassName }: MarqueeProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
        {items.map((item, i) => (
          <div key={i} className={itemClassName}>
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]", className)}>
      <div className={cn("flex shrink-0 items-center gap-4 pr-4", speed === "slow" ? "animate-marquee" : "animate-marquee-fast", "group-hover:[animation-play-state:paused]")}>
        {items.map((item, i) => (
          <div key={i} className={itemClassName}>
            {item}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className={cn("flex shrink-0 items-center gap-4 pr-4", speed === "slow" ? "animate-marquee" : "animate-marquee-fast", "group-hover:[animation-play-state:paused]")}
      >
        {items.map((item, i) => (
          <div key={`dup-${i}`} className={itemClassName}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
