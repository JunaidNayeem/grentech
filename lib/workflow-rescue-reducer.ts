/**
 * Typed state machine for the Workflow Rescue game. Pure and React-free so it
 * can be exercised directly in unit tests.
 */

import { rescueRounds, STARTING_SCORES, clampScore, type ScoreKey } from "@/data/workflow-rescue"

export type GamePhase = "intro" | "round" | "round-feedback" | "results"

export interface GameChoice {
  roundId: string
  roundIndex: number
  optionId: "A" | "B"
}

export interface GameState {
  phase: GamePhase
  roundIndex: number
  scores: Record<ScoreKey, number>
  choices: GameChoice[]
  lastOptionId?: "A" | "B"
}

export type GameAction =
  | { type: "START" }
  | { type: "CHOOSE"; optionId: "A" | "B" }
  | { type: "CONTINUE" }
  | { type: "RESTART" }

export const initialGameState: GameState = {
  phase: "intro",
  roundIndex: 0,
  scores: { ...STARTING_SCORES },
  choices: [],
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return { ...initialGameState, phase: "round" }

    case "CHOOSE": {
      if (state.phase !== "round") return state
      const round = rescueRounds[state.roundIndex]
      const option = round.options.find((candidate) => candidate.id === action.optionId)
      if (!option) return state

      const scores: Record<ScoreKey, number> = {
        clarity: clampScore(state.scores.clarity + option.deltas.clarity),
        customerExperience: clampScore(state.scores.customerExperience + option.deltas.customerExperience),
        scaleReadiness: clampScore(state.scores.scaleReadiness + option.deltas.scaleReadiness),
      }

      return {
        ...state,
        phase: "round-feedback",
        scores,
        lastOptionId: action.optionId,
        choices: [...state.choices, { roundId: round.id, roundIndex: state.roundIndex, optionId: action.optionId }],
      }
    }

    case "CONTINUE": {
      if (state.phase !== "round-feedback") return state
      const isLastRound = state.roundIndex === rescueRounds.length - 1
      if (isLastRound) {
        return { ...state, phase: "results" }
      }
      return { ...state, phase: "round", roundIndex: state.roundIndex + 1, lastOptionId: undefined }
    }

    case "RESTART":
      return { ...initialGameState, phase: "intro" }

    default:
      return state
  }
}
