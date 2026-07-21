"use client"

import { useMemo, useState } from "react"

import { InsightCard } from "@/components/sections/insight-card"
import type { Insight, InsightCategory } from "@/data/insights"
import { cn } from "@/lib/utils"

const CATEGORIES: Array<InsightCategory | "all"> = ["all", "Strategy", "Operations", "Product"]

export function InsightsGrid({ insights }: { insights: Insight[] }) {
  const [filter, setFilter] = useState<InsightCategory | "all">("all")

  const filtered = useMemo(
    () => (filter === "all" ? insights : insights.filter((insight) => insight.category === filter)),
    [filter, insights],
  )

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = filter === category
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category === "all" ? "All" : category}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </div>
  )
}
