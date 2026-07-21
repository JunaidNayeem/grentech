import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

/**
 * Bespoke Grentech wordmark: a modular, connected-node icon beside the name.
 * Pure SVG + text — no image asset required to render.
 */
export function Logo({ className, markClassName, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className={cn("h-8 w-8 shrink-0", markClassName)}
        fill="none"
      >
        <rect x="1" y="1" width="12" height="12" rx="4" className="fill-brand/90" />
        <rect x="19" y="1" width="12" height="12" rx="4" className="fill-teal/70" />
        <rect x="1" y="19" width="12" height="12" rx="4" className="fill-teal/70" />
        <rect x="19" y="19" width="12" height="12" rx="4" className="fill-brand/90" />
        <path
          d="M13 7H19M7 13V19M25 13V19M13 25H19"
          stroke="currentColor"
          className="text-lime/80"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className={cn("font-display text-lg font-semibold tracking-tight text-foreground", wordmarkClassName)}>
        Grentech
      </span>
    </span>
  )
}
