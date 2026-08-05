"use client"

import { useCallback, useMemo, useState } from "react"

import { InsightCard } from "@/components/sections/insight-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Insight, InsightCategory } from "@/data/insights"

const CATEGORIES: Array<InsightCategory | "all"> = ["all", "Strategy", "Operations", "Product"]

export function InsightsGrid({ insights }: { insights: Insight[] }) {
  const [filter, setFilter] = useState<InsightCategory | "all">("all")

  const filtered = useMemo(
    () => (filter === "all" ? insights : insights.filter((insight) => insight.category === filter)),
    [filter, insights],
  )

  const handleFilterChange = useCallback((value: string) => {
    if (value) {
      setFilter(value as InsightCategory | "all")
    }
  }, [])

  return (
    <div>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={handleFilterChange}
        aria-label="Filter articles by category"
        className="flex flex-wrap justify-start gap-2"
      >
        {CATEGORIES.map((category) => (
          <ToggleGroupItem key={category} value={category} variant="pill">
            {category === "all" ? "All" : category}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </div>
  )
}
