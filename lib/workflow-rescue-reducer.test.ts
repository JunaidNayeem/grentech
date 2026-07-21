import { describe, expect, it } from "vitest"

import { rescueRounds, calculateOverallScore } from "@/data/workflow-rescue"
import { getRescueResultBand } from "@/lib/recommendations"
import { gameReducer, initialGameState, type GameState } from "./workflow-rescue-reducer"

function playThrough(optionId: "A" | "B"): GameState {
  let state = gameReducer(initialGameState, { type: "START" })

  for (let i = 0; i < rescueRounds.length; i += 1) {
    state = gameReducer(state, { type: "CHOOSE", optionId })
    state = gameReducer(state, { type: "CONTINUE" })
  }

  return state
}

describe("gameReducer", () => {
  it("starts in the intro phase", () => {
    expect(initialGameState.phase).toBe("intro")
  })

  it("moves to the round phase on START", () => {
    const state = gameReducer(initialGameState, { type: "START" })
    expect(state.phase).toBe("round")
    expect(state.roundIndex).toBe(0)
  })

  it("records a choice and moves to round-feedback on CHOOSE", () => {
    const started = gameReducer(initialGameState, { type: "START" })
    const chosen = gameReducer(started, { type: "CHOOSE", optionId: "A" })

    expect(chosen.phase).toBe("round-feedback")
    expect(chosen.lastOptionId).toBe("A")
    expect(chosen.choices).toHaveLength(1)
    expect(chosen.choices[0]).toMatchObject({ roundIndex: 0, optionId: "A" })
  })

  it("ignores CHOOSE when not in the round phase", () => {
    const chosenTwice = gameReducer(
      gameReducer(gameReducer(initialGameState, { type: "START" }), { type: "CHOOSE", optionId: "A" }),
      { type: "CHOOSE", optionId: "B" },
    )
    // Second CHOOSE call happened while already in round-feedback, so it's a no-op.
    expect(chosenTwice.lastOptionId).toBe("A")
  })

  it("advances through all five rounds and reaches results on the final CONTINUE", () => {
    const finalState = playThrough("A")
    expect(finalState.phase).toBe("results")
    expect(finalState.choices).toHaveLength(rescueRounds.length)
  })

  it("resets to the intro phase on RESTART", () => {
    const played = playThrough("A")
    const restarted = gameReducer(played, { type: "RESTART" })
    expect(restarted).toEqual(initialGameState)
  })

  it("produces a high Workflow Health score and 'ready to scale' band when every round favours the structural fix", () => {
    const finalState = playThrough("A")
    const overall = calculateOverallScore(finalState.scores)
    const band = getRescueResultBand(overall)

    expect(overall).toBeGreaterThanOrEqual(80)
    expect(band.key).toBe("ready-to-scale")
  })

  it("produces a low Workflow Health score and 'manual process risk' band when every round favours the manual workaround", () => {
    const finalState = playThrough("B")
    const overall = calculateOverallScore(finalState.scores)
    const band = getRescueResultBand(overall)

    expect(overall).toBeLessThan(40)
    expect(band.key).toBe("manual-process-risk")
  })

  it("never lets a score exceed the 0-100 bounds regardless of choices", () => {
    const finalState = playThrough("A")
    for (const value of Object.values(finalState.scores)) {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(100)
    }
  })
})
