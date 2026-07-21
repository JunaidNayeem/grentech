"use client"

import { useMemo, useState } from "react"

import { CaseStudyCard } from "@/components/case-studies/case-study-card"
import { CASE_STUDY_CATEGORY_LABEL, type CaseStudy, type CaseStudyCategory } from "@/data/case-studies"
import { cn } from "@/lib/utils"

const FILTERS: Array<{ value: CaseStudyCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "saas", label: CASE_STUDY_CATEGORY_LABEL.saas },
  { value: "platforms", label: CASE_STUDY_CATEGORY_LABEL.platforms },
  { value: "ai-automation", label: CASE_STUDY_CATEGORY_LABEL["ai-automation"] },
  { value: "public-services", label: CASE_STUDY_CATEGORY_LABEL["public-services"] },
]

export function WorkGrid({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<CaseStudyCategory | "all">("all")

  const filtered = useMemo(
    () => (filter === "all" ? studies : studies.filter((study) => study.category === filter)),
    [filter, studies],
  )

  return (
    <div>
      <div role="group" aria-label="Filter case studies by category" className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const isActive = filter === item.value
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" role="status">
        Showing {filtered.length} of {studies.length} illustrative examples.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  )
}
