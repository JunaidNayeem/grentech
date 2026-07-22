import { cn } from "@/lib/utils"

interface GradientBlobsProps {
  className?: string
  variant?: "hero" | "cta"
}

/**
 * Purely decorative animated gradient-mesh blobs. `aria-hidden` and frozen
 * automatically under `prefers-reduced-motion` via the global CSS rule.
 */
export function GradientBlobs({ className, variant = "hero" }: GradientBlobsProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="animate-blob-1 absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            variant === "hero"
              ? "radial-gradient(circle, #36E39A 0%, transparent 70%)"
              : "radial-gradient(circle, #B8F55A 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-blob-2 absolute -right-32 top-1/3 h-[24rem] w-[24rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #3E8D78 0%, transparent 70%)" }}
      />
      <div
        className="animate-blob-1 absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #B8F55A 0%, transparent 70%)",
          animationDelay: "4s",
        }}
      />
    </div>
  )
}
