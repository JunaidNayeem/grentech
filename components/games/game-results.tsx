"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"

import { ScorePanel } from "@/components/games/score-panel"
import { WorkflowMap } from "@/components/games/workflow-map"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SCORE_LABEL, calculateOverallScore, type ScoreKey } from "@/data/workflow-rescue"
import { getRescueResultBand } from "@/lib/recommendations"
import type { GameChoice } from "@/lib/workflow-rescue-reducer"
import { track } from "@/lib/analytics"

function frictionLevelForScore(score: number): "daily" | "weekly" | "monthly" | "rarely" {
  if (score < 40) return "daily"
  if (score < 65) return "weekly"
  if (score < 80) return "monthly"
  return "rarely"
}

interface GameResultsProps {
  scores: Record<ScoreKey, number>
  choices: GameChoice[]
  onRestart: () => void
}

export function GameResults({ scores, choices, onRestart }: GameResultsProps) {
  const [leadCaptured, setLeadCaptured] = useState(false)
  const overall = calculateOverallScore(scores)
  const band = getRescueResultBand(overall)
  const friction = frictionLevelForScore(overall)

  useEffect(() => {
    track("workflow_rescue_completed", { score: overall })
    track("workflow_rescue_result_viewed", { score: overall, band: band.key })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const strongChoices = choices.filter((choice) => choice.optionId === "A").length

  return (
    <div className="space-y-10">
      <div aria-live="polite">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your result</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">{band.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Overall Workflow Health: {overall} / 100 · {strongChoices} of {choices.length} decisions favoured structural
          fixes over manual workarounds.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ScorePanel scores={scores} />
        <WorkflowMap overallScore={overall} />
      </div>

      <Card tone="brand" padding="lg" className="sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">Your recommended next step</span>
        <p className="mt-2 font-display text-lg font-semibold text-foreground">{band.recommendation}</p>
      </Card>

      <Card tone="neutral" className="bg-surface/30 text-sm text-muted-foreground">
        <h3 className="font-display text-sm font-semibold text-foreground">Score breakdown</h3>
        <ul className="mt-3 space-y-1">
          {(Object.keys(scores) as ScoreKey[]).map((key) => (
            <li key={key}>
              {SCORE_LABEL[key]}: {scores[key]} / 100
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link
            href={`/workflow-calculator?friction=${friction}&source=workflow-rescue`}
            onClick={() => track("workflow_rescue_calculator_clicked")}
          >
            Calculate your real workflow opportunity
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact?source=workflow-rescue" onClick={() => track("workflow_rescue_contact_clicked")}>
            Book a discovery call
          </Link>
        </Button>
        <Button size="lg" variant="ghost" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restart game
        </Button>
      </div>

      <div>
        {leadCaptured ? (
          <p role="status" className="text-sm font-medium text-brand">
            Thanks — your score and recommendations are on their way by email.
          </p>
        ) : (
          <LeadCaptureForm
            title="Email me my workflow score and tailored recommendations"
            description="Optional — your results are already shown above either way."
            source="workflow-rescue"
            context={{ scores, overall, band: band.key, choices }}
            submitLabel="Email my results"
            onSuccess={() => {
              setLeadCaptured(true)
              track("workflow_rescue_email_report_submitted")
            }}
          />
        )}
      </div>
    </div>
  )
}
