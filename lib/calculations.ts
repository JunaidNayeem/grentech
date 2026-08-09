/**
 * Workflow Friction Calculator — pure calculation logic.
 * Kept free of React/DOM so it can be unit tested in isolation.
 */

export type TeamSizeBand = "1-5" | "6-15" | "16-50" | "51-200" | "200+"
export type ErrorFrequency = "rarely" | "monthly" | "weekly" | "daily"

export const TEAM_SIZE_MIDPOINT: Record<TeamSizeBand, number> = {
  "1-5": 3,
  "6-15": 10,
  "16-50": 33,
  "51-200": 125,
  "200+": 250,
}

export const TEAM_SIZE_LABEL: Record<TeamSizeBand, string> = {
  "1-5": "1–5 people",
  "6-15": "6–15 people",
  "16-50": "16–50 people",
  "51-200": "51–200 people",
  "200+": "200+ people",
}

/** Improvement opportunity range, expressed as [min, max] fractions of manual cost. */
export const IMPROVEMENT_RANGE: Record<ErrorFrequency, [number, number]> = {
  rarely: [0.1, 0.2],
  monthly: [0.15, 0.3],
  weekly: [0.2, 0.4],
  daily: [0.3, 0.5],
}

export const ERROR_FREQUENCY_LABEL: Record<ErrorFrequency, string> = {
  rarely: "Rarely",
  monthly: "Monthly",
  weekly: "Weekly",
  daily: "Daily",
}

export const WORKING_WEEKS_PER_YEAR = 48

export interface WorkflowCalculatorInputs {
  teamSize: TeamSizeBand
  weeklyHoursPerPerson: number
  hourlyCost: number
  errorFrequency: ErrorFrequency
}

export interface WorkflowCalculatorResult {
  teamSizeEstimate: number
  annualManualCost: number
  improvementRangeLow: number
  improvementRangeHigh: number
  potentialAnnualValueLow: number
  potentialAnnualValueHigh: number
  improvementPercentLow: number
  improvementPercentHigh: number
}

export function clampHours(hours: number): number {
  if (Number.isNaN(hours)) return 0
  return Math.min(Math.max(hours, 0), 40)
}

/** Blended hourly cost of the people doing the manual work, in USD. */
export const DEFAULT_HOURLY_COST = 50
/** Upper bound, generous enough for senior/specialist time without letting a typo run away. */
export const MAX_HOURLY_COST = 500

export function clampHourlyCost(cost: number): number {
  if (Number.isNaN(cost) || cost <= 0) return DEFAULT_HOURLY_COST
  return Math.min(cost, MAX_HOURLY_COST)
}

export function calculateWorkflowFriction(inputs: WorkflowCalculatorInputs): WorkflowCalculatorResult {
  const teamSizeEstimate = TEAM_SIZE_MIDPOINT[inputs.teamSize]
  const weeklyHours = clampHours(inputs.weeklyHoursPerPerson)
  const hourlyCost = clampHourlyCost(inputs.hourlyCost)

  const annualManualCost = teamSizeEstimate * weeklyHours * hourlyCost * WORKING_WEEKS_PER_YEAR

  const [low, high] = IMPROVEMENT_RANGE[inputs.errorFrequency]

  return {
    teamSizeEstimate,
    annualManualCost,
    improvementRangeLow: low,
    improvementRangeHigh: high,
    potentialAnnualValueLow: annualManualCost * low,
    potentialAnnualValueHigh: annualManualCost * high,
    improvementPercentLow: Math.round(low * 100),
    improvementPercentHigh: Math.round(high * 100),
  }
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Normalises a set of 1–5 Likert responses to a 0–100 maturity score, where
 * all-1s maps to 0 and all-5s maps to 100.
 */
export function calculateMaturityScore(responses: number[]): number {
  if (responses.length === 0) return 0
  const sum = responses.reduce((total, value) => total + value, 0)
  const min = responses.length * 1
  const max = responses.length * 5
  const score = ((sum - min) / (max - min)) * 100
  return Math.round(Math.min(100, Math.max(0, score)))
}
