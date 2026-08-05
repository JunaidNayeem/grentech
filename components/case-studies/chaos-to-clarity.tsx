import { Check, X } from "lucide-react"

import { Card, cardVariants } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ChaosToClarity({ before, after }: { before: string[]; after: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className={cn(cardVariants({ tone: "neutral" }), "border-coral/30 bg-coral/[0.05]")}>
        <h3 className="font-display text-sm font-semibold text-coral">Before Grentech</h3>
        <ul className="mt-4 space-y-3">
          {before.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Card tone="brand">
        <h3 className="font-display text-sm font-semibold text-brand">After Grentech</h3>
        <ul className="mt-4 space-y-3">
          {after.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
