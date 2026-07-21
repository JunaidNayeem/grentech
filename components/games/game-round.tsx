import { DecisionCard } from "@/components/games/decision-card"
import { Button } from "@/components/ui/button"
import type { RescueRound } from "@/data/workflow-rescue"

interface GameRoundProps {
  round: RescueRound
  totalRounds: number
  phase: "round" | "round-feedback"
  lastOptionId?: "A" | "B"
  onChoose: (optionId: "A" | "B") => void
  onContinue: () => void
}

export function GameRound({ round, totalRounds, phase, lastOptionId, onChoose, onContinue }: GameRoundProps) {
  if (phase === "round-feedback" && lastOptionId) {
    const chosen = round.options.find((option) => option.id === lastOptionId)!
    const isLastRound = round.index === totalRounds

    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/[0.05] p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Round {round.index} of {totalRounds} · Outcome
        </span>
        <p aria-live="polite" className="mt-3 font-display text-xl font-semibold text-foreground">
          {chosen.outcomeMessage}
        </p>
        <details className="mt-5 rounded-xl border border-border bg-surface/40 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-foreground">Why this matters</summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{chosen.whyItMatters}</p>
        </details>
        <div className="mt-6">
          <Button size="lg" onClick={onContinue}>
            {isLastRound ? "See your results" : "Next decision"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Round {round.index} of {totalRounds} · {round.title}
      </span>
      <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">{round.problem}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {round.options.map((option) => (
          <DecisionCard
            key={option.id}
            letter={option.id}
            label={option.label}
            description={option.description}
            onSelect={() => onChoose(option.id)}
          />
        ))}
      </div>
    </div>
  )
}
