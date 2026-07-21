"use client"

import { useState } from "react"

import type { WorkflowStage } from "@/data/case-studies"
import { cn } from "@/lib/utils"

/**
 * "From chaos to clarity" interactive module. Visitors can tab through each
 * workflow stage to see the challenge, user need, feature, and benefit.
 * A full plain-text reading view is always rendered below for anyone who
 * prefers not to use the interactive tabs.
 */
export function WorkflowStages({ stages }: { stages: WorkflowStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = stages[activeIndex]

  return (
    <div>
      <div role="tablist" aria-label="Workflow stages" className="flex flex-wrap gap-2">
        {stages.map((stage, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={stage.stage}
              type="button"
              role="tab"
              id={`stage-tab-${index}`}
              aria-selected={isActive}
              aria-controls="stage-panel"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {stage.stage}
            </button>
          )
        })}
      </div>

      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${activeIndex}`}
        className="glass-panel mt-6 grid gap-6 rounded-2xl p-6 sm:grid-cols-2 sm:p-8"
      >
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-coral">The challenge</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{active.challenge}</p>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What users needed
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{active.userNeed}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-brand">The Grentech feature</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{active.feature}</p>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Operational benefit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{active.benefit}</p>
        </div>
      </div>

      <details className="mt-8 rounded-xl border border-border bg-surface/30 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          Read the full plain-text version
        </summary>
        <ol className="mt-4 space-y-5">
          {stages.map((stage) => (
            <li key={stage.stage} className="text-sm leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">{stage.stage}</p>
              <p className="mt-1">
                <span className="font-medium text-foreground">Challenge: </span>
                {stage.challenge}
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">User need: </span>
                {stage.userNeed}
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">Feature: </span>
                {stage.feature}
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">Benefit: </span>
                {stage.benefit}
              </p>
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}
