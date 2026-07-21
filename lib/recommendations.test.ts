import { describe, expect, it } from "vitest"

import {
  getEngagementRecommendation,
  getMaturityBand,
  getRescueResultBand,
  getWorkflowCalculatorRecommendation,
  MATURITY_BANDS,
  RESCUE_RESULT_BANDS,
} from "./recommendations"

describe("getWorkflowCalculatorRecommendation", () => {
  it("returns a non-empty tailored sentence for any valid combination", () => {
    const text = getWorkflowCalculatorRecommendation("reporting", "improve-visibility")
    expect(text).toContain("reporting")
    expect(text.length).toBeGreaterThan(20)
  })
})

describe("getEngagementRecommendation", () => {
  it("recommends a Discovery Sprint when the timeline is still exploring", () => {
    const result = getEngagementRecommendation({
      productType: "saas-platform",
      audience: "customers",
      capabilities: ["secure-login", "dashboard", "reporting", "payments"],
      scale: "100-1000",
      timeline: "exploring",
    })
    expect(result).toBe("Discovery Sprint")
  })

  it("recommends a Discovery Sprint for very small capability scope regardless of timeline", () => {
    const result = getEngagementRecommendation({
      productType: "internal-tool",
      audience: "employees",
      capabilities: ["dashboard"],
      scale: "1-10",
      timeline: "3-6-months",
    })
    expect(result).toBe("Discovery Sprint")
  })

  it("recommends Phased Platform Delivery for large scale or long timelines", () => {
    const largeScale = getEngagementRecommendation({
      productType: "customer-portal",
      audience: "customers",
      capabilities: ["secure-login", "dashboard", "reporting"],
      scale: "1000+",
      timeline: "1-3-months",
    })
    expect(largeScale).toBe("Phased Platform Delivery")

    const longTimeline = getEngagementRecommendation({
      productType: "workflow-automation",
      audience: "employees",
      capabilities: ["secure-login", "dashboard", "reporting"],
      scale: "10-100",
      timeline: "6-plus-months",
    })
    expect(longTimeline).toBe("Phased Platform Delivery")
  })

  it("recommends a Focused MVP for moderate scope with a defined timeline", () => {
    const result = getEngagementRecommendation({
      productType: "internal-tool",
      audience: "employees",
      capabilities: ["secure-login", "dashboard", "reporting"],
      scale: "10-100",
      timeline: "1-3-months",
    })
    expect(result).toBe("Focused MVP")
  })
})

describe("getMaturityBand", () => {
  it("covers the full 0-100 range with no gaps", () => {
    for (let score = 0; score <= 100; score += 1) {
      expect(() => getMaturityBand(score)).not.toThrow()
      const band = getMaturityBand(score)
      expect(score).toBeGreaterThanOrEqual(band.minScore)
      expect(score).toBeLessThanOrEqual(band.maxScore)
    }
  })

  it("clamps out-of-range scores", () => {
    expect(getMaturityBand(-10).key).toBe(MATURITY_BANDS[0].key)
    expect(getMaturityBand(500).key).toBe(MATURITY_BANDS[MATURITY_BANDS.length - 1].key)
  })

  it("maps boundary scores to the expected bands", () => {
    expect(getMaturityBand(0).key).toBe("manual-and-fragmented")
    expect(getMaturityBand(25).key).toBe("manual-and-fragmented")
    expect(getMaturityBand(26).key).toBe("growing-pains")
    expect(getMaturityBand(76).key).toBe("optimisation-ready")
    expect(getMaturityBand(100).key).toBe("optimisation-ready")
  })
})

describe("getRescueResultBand", () => {
  it("covers the full 0-100 range with no gaps", () => {
    for (let score = 0; score <= 100; score += 1) {
      const band = getRescueResultBand(score)
      expect(score).toBeGreaterThanOrEqual(band.minScore)
      expect(score).toBeLessThanOrEqual(band.maxScore)
    }
  })

  it("maps boundary scores to the expected bands", () => {
    expect(getRescueResultBand(0).key).toBe("manual-process-risk")
    expect(getRescueResultBand(39).key).toBe("manual-process-risk")
    expect(getRescueResultBand(40).key).toBe("growing-operational-friction")
    expect(getRescueResultBand(80).key).toBe("ready-to-scale")
    expect(getRescueResultBand(100).key).toBe("ready-to-scale")
  })

  it("clamps out-of-range scores", () => {
    expect(getRescueResultBand(-5).key).toBe(RESCUE_RESULT_BANDS[0].key)
    expect(getRescueResultBand(1000).key).toBe(RESCUE_RESULT_BANDS[RESCUE_RESULT_BANDS.length - 1].key)
  })
})
