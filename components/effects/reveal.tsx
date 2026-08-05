"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DUR_4, EASE_OUT } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/**
 * Fades/slides content in as it scrolls into view. Renders statically (no
 * animation, no hidden initial state) when the user prefers reduced motion,
 * so content is never gated behind motion.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR_4, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
}

/** Wrap a list of children to stagger their Reveal animation automatically. */
export function RevealStagger({ children, className, stagger = 0.08 }: RevealGroupProps) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={index * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
