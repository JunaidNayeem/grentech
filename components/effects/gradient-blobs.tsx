import { cn } from "@/lib/utils"

interface GradientBlobsProps {
  className?: string
  variant?: "hero" | "cta"
}

/**
 * NDL's ambient glow: one large, very-low-opacity radial gradient behind a
 * hero/CTA moment - an atmospheric device, not a decorative texture. Tied to
 * --brand so it stays in sync with the product accent.
 */
export function GradientBlobs({ className, variant = "hero" }: GradientBlobsProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute h-[32rem] w-[32rem] rounded-full opacity-10 blur-3xl",
          variant === "hero" ? "-left-24 -top-24 animate-blob-1" : "left-1/2 top-1/3 -translate-x-1/2 animate-blob-2",
        )}
        style={{ background: "radial-gradient(circle, hsl(var(--brand)) 0%, transparent 70%)" }}
      />
    </div>
  )
}
