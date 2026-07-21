"use client"

import { useEffect, useReducer, useState } from "react"

import { GameIntro } from "@/components/games/game-intro"
import { GameRound } from "@/components/games/game-round"
import { GameResults } from "@/components/games/game-results"
import { ScorePanel } from "@/components/games/score-panel"
import { WorkflowMap } from "@/components/games/workflow-map"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { rescueRounds, calculateOverallScore } from "@/data/workflow-rescue"
import { gameReducer, initialGameState } from "@/lib/workflow-rescue-reducer"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

const SKIP_ANIMATION_KEY = "grentech-workflow-rescue-skip-animation"

export function WorkflowRescueGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  const [skipAnimation, setSkipAnimation] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(SKIP_ANIMATION_KEY)
    if (stored === "true") setSkipAnimation(true)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(SKIP_ANIMATION_KEY, String(skipAnimation))
  }, [skipAnimation])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && state.phase === "round-feedback") {
        dispatch({ type: "CONTINUE" })
      }
    }
    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [state.phase])

  function handleStart() {
    track("workflow_rescue_started")
    dispatch({ type: "START" })
  }

  function handleChoose(optionId: "A" | "B") {
    track("workflow_rescue_round_completed", { round: state.roundIndex + 1, optionId })
    dispatch({ type: "CHOOSE", optionId })
  }

  function handleRestart() {
    dispatch({ type: "RESTART" })
  }

  const overall = calculateOverallScore(state.scores)
  const currentRound = rescueRounds[state.roundIndex]

  return (
    <div className={cn(skipAnimation && "no-anim")}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface/30 p-4">
        <div className="flex items-center gap-3">
          <Switch id="skip-animation" checked={skipAnimation} onCheckedChange={setSkipAnimation} />
          <Label htmlFor="skip-animation" className="text-sm">
            Skip animation
          </Label>
        </div>
        {state.phase !== "intro" && (
          <Button variant="ghost" size="sm" onClick={handleRestart}>
            Restart game
          </Button>
        )}
      </div>

      {state.phase === "intro" && <GameIntro onStart={handleStart} />}

      {(state.phase === "round" || state.phase === "round-feedback") && (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <GameRound
            round={currentRound}
            totalRounds={rescueRounds.length}
            phase={state.phase}
            lastOptionId={state.lastOptionId}
            onChoose={handleChoose}
            onContinue={() => dispatch({ type: "CONTINUE" })}
          />
          <div className="space-y-6">
            <ScorePanel scores={state.scores} />
            <WorkflowMap overallScore={overall} />
          </div>
        </div>
      )}

      {state.phase === "results" && (
        <GameResults scores={state.scores} choices={state.choices} onRestart={handleRestart} />
      )}
    </div>
  )
}
