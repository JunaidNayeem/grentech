import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cardVariants } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Insight } from "@/data/insights"

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(cardVariants({ tone: "neutral", interactive: true }), "bg-surface/50 group flex flex-col")}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-teal">{insight.category}</span>
      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{insight.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{insight.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{insight.readingTime}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          Read article
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
