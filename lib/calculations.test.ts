import { describe, expect, it } from "vitest"

import {
  DEFAULT_HOURLY_COST,
  MAX_HOURLY_COST,
  calculateMaturityScore,
  calculateWorkflowFriction,
  clampHourlyCost,
  clampHours,
  formatUSD,
  WORKING_WEEKS_PER_YEAR,
} from "./calculations"

describe("calculateWorkflowFriction", () => {
  it("computes annual manual cost as teamSize x hours x cost x working weeks", () => {
    const result = calculateWorkflowFriction({
      teamSize: "6-15", // midpoint 10
      weeklyHoursPerPerson: 5,
      hourlyCost: 25,
      errorFrequency: "weekly",
    })

    const expectedCost = 10 * 5 * 25 * WORKING_WEEKS_PER_YEAR
    expect(result.annualManualCost).toBe(expectedCost)
    expect(result.teamSizeEstimate).toBe(10)
  })

  it("applies the improvement range for the given error frequency", () => {
    const result = calculateWorkflowFriction({
      teamSize: "1-5",
      weeklyHoursPerPerson: 10,
      hourlyCost: 20,
      errorFrequency: "daily",
    })

    expect(result.improvementRangeLow).toBeCloseTo(0.3)
    expect(result.improvementRangeHigh).toBeCloseTo(0.5)
    expect(result.potentialAnnualValueLow).toBeCloseTo(result.annualManualCost * 0.3)
    expect(result.potentialAnnualValueHigh).toBeCloseTo(result.annualManualCost * 0.5)
    expect(result.improvementPercentLow).toBe(30)
    expect(result.improvementPercentHigh).toBe(50)
  })

  it("produces a larger improvement range for more frequent friction", () => {
    const rarely = calculateWorkflowFriction({
      teamSize: "16-50",
      weeklyHoursPerPerson: 8,
      hourlyCost: 30,
      errorFrequency: "rarely",
    })
    const daily = calculateWorkflowFriction({
      teamSize: "16-50",
      weeklyHoursPerPerson: 8,
      hourlyCost: 30,
      errorFrequency: "daily",
    })

    expect(daily.improvementRangeLow).toBeGreaterThan(rarely.improvementRangeLow)
    expect(daily.improvementRangeHigh).toBeGreaterThan(rarely.improvementRangeHigh)
  })

  it("clamps unusual hours and cost inputs consistently", () => {
    expect(clampHours(-5)).toBe(0)
    expect(clampHours(999)).toBe(40)
    expect(clampHours(Number.NaN)).toBe(0)

    expect(clampHourlyCost(0)).toBe(DEFAULT_HOURLY_COST)
    expect(clampHourlyCost(-10)).toBe(DEFAULT_HOURLY_COST)
    expect(clampHourlyCost(MAX_HOURLY_COST + 5000)).toBe(MAX_HOURLY_COST)
    expect(clampHourlyCost(Number.NaN)).toBe(DEFAULT_HOURLY_COST)
  })
})

describe("formatUSD", () => {
  it("formats whole-dollar USD currency", () => {
    expect(formatUSD(1000)).toBe("$1,000")
    expect(formatUSD(0)).toBe("$0")
    expect(formatUSD(1234567)).toBe("$1,234,567")
  })
})

describe("calculateMaturityScore", () => {
  it("maps all-1 responses to 0", () => {
    expect(calculateMaturityScore(Array(10).fill(1))).toBe(0)
  })

  it("maps all-5 responses to 100", () => {
    expect(calculateMaturityScore(Array(10).fill(5))).toBe(100)
  })

  it("maps a mixed response set to a mid-range score", () => {
    const score = calculateMaturityScore(Array(10).fill(3))
    expect(score).toBe(50)
  })

  it("returns 0 for an empty response set rather than throwing", () => {
    expect(calculateMaturityScore([])).toBe(0)
  })
})
