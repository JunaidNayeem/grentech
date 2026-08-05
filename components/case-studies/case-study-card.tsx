import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cardVariants } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CaseStudy } from "@/data/case-studies"

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        cardVariants({ tone: "neutral", interactive: true }),
        "group flex flex-col overflow-hidden bg-surface/50 p-0 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_40px_-12px] hover:shadow-brand/40"
      )}
    >
      <div aria-hidden="true" className="relative h-40 overflow-hidden border-b border-border bg-grid p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-teal/10 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex h-full flex-col justify-between">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
            <div className="h-2 w-1/2 rounded-full bg-brand/30" />
            <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-teal">{study.categoryLabel}</span>
          {study.isIllustrative && (
            <Badge variant="muted" size="sm">
              Illustrative example
            </Badge>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{study.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{study.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.outcomeLabels.map((label) => (
            <li key={label}>
              <Badge variant="brand" size="default">
                {label}
              </Badge>
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          View case study
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
