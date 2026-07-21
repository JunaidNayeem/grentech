import type React from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
