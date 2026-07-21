"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

const NODES = [
  { x: 18, y: 24, size: 46, delay: 0 },
  { x: 62, y: 12, size: 30, delay: 0.4 },
  { x: 82, y: 40, size: 54, delay: 0.8 },
  { x: 34, y: 58, size: 38, delay: 1.2 },
  { x: 70, y: 70, size: 44, delay: 0.2 },
  { x: 12, y: 78, size: 26, delay: 0.6 },
  { x: 48, y: 36, size: 22, delay: 1.0 },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 2],
  [3, 5],
  [6, 1],
  [6, 3],
]

/**
 * Decorative, lightweight CSS/SVG hero visual representing a connected
 * software ecosystem. Purely decorative — hidden from assistive tech,
 * never required to understand the page. Respects prefers-reduced-motion
 * and applies gentle cursor parallax on desktop only.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-1, 1], [4, -4])
  const rotateY = useTransform(springX, [-1, 1], [-4, 4])

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches)
  }, [])

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDesktop || reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function handlePointerLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-xl"
    >
      <motion.div
        style={reducedMotion ? undefined : { rotateX, rotateY }}
        className="relative h-full w-full [perspective:1000px] [transform-style:preserve-3d]"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {CONNECTIONS.map(([a, b], i) => {
            const nodeA = NODES[a]
            const nodeB = NODES[b]
            return (
              <line
                key={i}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke="url(#lineGradient)"
                strokeWidth="0.4"
                strokeLinecap="round"
                opacity={0.5}
              />
            )
          })}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#36E39A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3E8D78" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="#B8F55A" />
              <stop offset="100%" stopColor="#36E39A" />
            </radialGradient>
          </defs>
        </svg>

        {NODES.map((node, i) => (
          <div
            key={i}
            className={reducedMotion ? "" : "animate-float-slow"}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              transform: "translate(-50%, -50%)",
              animationDelay: `${node.delay}s`,
            }}
          >
            <div
              className={`h-full w-full rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/25 to-teal/10 backdrop-blur-sm ${
                reducedMotion ? "" : "animate-pulse-node"
              }`}
              style={{ animationDelay: `${node.delay}s` }}
            />
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 rounded-full bg-brand/10 blur-3xl" />
    </div>
  )
}
