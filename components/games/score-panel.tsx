import { Card } from "@/components/ui/card"
import { SCORE_LABEL, calculateOverallScore, type ScoreKey } from "@/data/workflow-rescue"

const BAR_COLOR: Record<ScoreKey, string> = {
  clarity: "bg-brand",
  customerExperience: "bg-teal",
  scaleReadiness: "bg-lime",
}

export function ScorePanel({ scores }: { scores: Record<ScoreKey, number> }) {
  const overall = calculateOverallScore(scores)
  const keys = Object.keys(scores) as ScoreKey[]

  return (
    <Card tone="neutral">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-sm font-semibold text-foreground">Workflow health</h2>
        <span className="font-display text-2xl font-semibold text-brand">{overall}</span>
      </div>

      <div aria-live="polite" className="sr-only">
        Workflow health {overall} out of 100. {keys.map((key) => `${SCORE_LABEL[key]} ${scores[key]}.`).join(" ")}
      </div>

      <div className="mt-5 space-y-4">
        {keys.map((key) => (
          <div key={key}>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>{SCORE_LABEL[key]}</span>
              <span aria-hidden="true">{scores[key]}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-raised">
              <div
                className={`h-full rounded-full transition-all duration-4 ease-out ${BAR_COLOR[key]}`}
                style={{ width: `${scores[key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
