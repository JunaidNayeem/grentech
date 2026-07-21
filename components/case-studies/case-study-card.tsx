import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { CaseStudy } from "@/data/case-studies"

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-colors hover:border-border-strong hover:bg-surface-raised"
    >
      <div aria-hidden="true" className="relative h-40 overflow-hidden border-b border-border bg-grid p-5">
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
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Illustrative example
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{study.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{study.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.outcomeLabels.map((label) => (
            <li key={label} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {label}
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
