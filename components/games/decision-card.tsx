import { cardVariants } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DecisionCardProps {
  letter: "A" | "B"
  label: string
  description: string
  onSelect: () => void
  disabled?: boolean
}

export function DecisionCard({ letter, label, description, onSelect, disabled }: DecisionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        cardVariants({ tone: "neutral" }),
        "flex h-full flex-col text-left transition-colors hover:border-brand/40 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-semibold text-brand">
        {letter}
      </span>
      <span className="mt-4 font-display text-lg font-semibold text-foreground">{label}</span>
      <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
    </button>
  )
}
