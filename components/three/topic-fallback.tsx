import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const COLOR_CLASSES = {
  brand: { glow: "bg-brand/20", border: "border-brand/30", icon: "text-brand", grad: "from-brand/20 to-teal/10" },
  lime: { glow: "bg-lime/20", border: "border-lime/30", icon: "text-lime", grad: "from-lime/20 to-brand/10" },
  teal: { glow: "bg-teal/25", border: "border-teal/30", icon: "text-teal", grad: "from-teal/25 to-brand/10" },
  amber: { glow: "bg-amber/20", border: "border-amber/30", icon: "text-amber", grad: "from-amber/20 to-lime/10" },
} as const

/** Lightweight CSS fallback for a TopicVisual — used with no WebGL or reduced motion. */
export function TopicFallback({
  icon: Icon,
  color = "brand",
}: {
  icon: LucideIcon
  color?: keyof typeof COLOR_CLASSES
}) {
  const c = COLOR_CLASSES[color]
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className={cn("animate-pulse-node absolute h-40 w-40 rounded-full blur-3xl", c.glow)} />
      <div
        className={cn(
          "animate-float-slow relative flex h-28 w-28 items-center justify-center rounded-3xl border bg-gradient-to-br",
          c.border,
          c.grad,
        )}
      >
        <Icon className={cn("h-12 w-12", c.icon)} />
      </div>
    </div>
  )
}
