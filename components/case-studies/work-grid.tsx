"use client"

import { useCallback, useMemo, useState } from "react"

import { CaseStudyCard } from "@/components/case-studies/case-study-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CASE_STUDY_CATEGORY_LABEL, type CaseStudy, type CaseStudyCategory } from "@/data/case-studies"

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

  const handleFilterChange = useCallback((value: string) => {
    if (value) {
      setFilter(value as CaseStudyCategory | "all")
    }
  }, [])

  return (
    <div>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={handleFilterChange}
        aria-label="Filter case studies by category"
        className="flex flex-wrap justify-start gap-2"
      >
        {FILTERS.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value} variant="pill">
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

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
