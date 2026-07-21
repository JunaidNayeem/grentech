/**
 * Scoring bands and recommendation mappings shared by the interactive tools.
 * Kept as pure, typed functions so they can be unit tested without React.
 */

import type { ErrorFrequency } from "./calculations"

/* ---------------------------------------------------------------------- */
/* Workflow Friction Calculator                                            */
/* ---------------------------------------------------------------------- */

export type FocusArea =
  | "customer-onboarding"
  | "operations"
  | "staff-workflows"
  | "reporting"
  | "approvals"
  | "bookings"
  | "payments"
  | "data-management"
  | "other"

export type DesiredOutcome =
  | "save-time"
  | "improve-visibility"
  | "reduce-errors"
  | "scale-without-more-admin"
  | "improve-customer-experience"

export const FOCUS_AREA_LABEL: Record<FocusArea, string> = {
  "customer-onboarding": "Customer onboarding",
  operations: "Operations",
  "staff-workflows": "Staff workflows",
  reporting: "Reporting",
  approvals: "Approvals",
  bookings: "Bookings",
  payments: "Payments",
  "data-management": "Data management",
  other: "Other",
}

export const OUTCOME_LABEL: Record<DesiredOutcome, string> = {
  "save-time": "Save time",
  "improve-visibility": "Improve visibility",
  "reduce-errors": "Reduce errors",
  "scale-without-more-admin": "Scale without more admin",
  "improve-customer-experience": "Improve customer experience",
}

const FOCUS_AREA_RECOMMENDATION: Record<FocusArea, string> = {
  "customer-onboarding":
    "a structured onboarding workflow with clear steps, automated reminders, and a single record per customer",
  operations: "a central operations hub that replaces scattered spreadsheets and status updates with one live view",
  "staff-workflows": "role-based workflows that make ownership, tasks, and handovers clear across your team",
  reporting: "a live reporting layer that removes manual spreadsheet-merging and gives leadership real-time visibility",
  approvals: "a structured approval workflow with clear ownership, audit trail, and automatic routing",
  bookings: "a booking and scheduling workflow that reduces double-handling and manual coordination",
  payments: "a connected payments workflow that reduces manual reconciliation and chasing",
  "data-management": "a single source of truth for your data, replacing duplicated entry across tools",
  other: "a tailored workflow built around the specific friction your team experiences day to day",
}

const OUTCOME_RECOMMENDATION: Record<DesiredOutcome, string> = {
  "save-time": "freeing up meaningful hours each week for higher-value work",
  "improve-visibility": "giving your team and leadership a clear, real-time view of what's happening",
  "reduce-errors": "reducing the duplicate entry and manual handling that causes mistakes",
  "scale-without-more-admin": "letting you grow without a proportional increase in admin headcount",
  "improve-customer-experience": "giving customers a faster, clearer, more self-service experience",
}

export function getWorkflowCalculatorRecommendation(area: FocusArea, outcome: DesiredOutcome): string {
  return `Based on your answers, Grentech would typically start by mapping ${FOCUS_AREA_RECOMMENDATION[area]}, with the goal of ${OUTCOME_RECOMMENDATION[outcome]}.`
}

export function getImprovementLabel(frequency: ErrorFrequency): string {
  const labels: Record<ErrorFrequency, string> = {
    rarely: "occasional friction with a modest but reliable improvement opportunity",
    monthly: "recurring friction that a single connected workflow could meaningfully reduce",
    weekly: "frequent friction — a strong signal that a dedicated workflow would pay back quickly",
    daily: "constant friction that is very likely limiting how fast your team can operate",
  }
  return labels[frequency]
}

/* ---------------------------------------------------------------------- */
/* Product Scope Explorer                                                  */
/* ---------------------------------------------------------------------- */

export type ProductType =
  | "saas-platform"
  | "internal-tool"
  | "customer-portal"
  | "workflow-automation"
  | "legacy-modernisation"

export type UserAudience = "employees" | "customers" | "partners" | "public"

export type Capability =
  | "secure-login"
  | "roles-and-permissions"
  | "dashboard"
  | "reporting"
  | "payments"
  | "subscriptions"
  | "documents"
  | "notifications"
  | "ai-assistance"
  | "integrations"

export type ScaleBand = "1-10" | "10-100" | "100-1000" | "1000+"
export type Timeline = "exploring" | "1-3-months" | "3-6-months" | "6-plus-months"

export type EngagementModel = "Discovery Sprint" | "Focused MVP" | "Phased Platform Delivery"

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  "saas-platform": "SaaS platform",
  "internal-tool": "Internal operations tool",
  "customer-portal": "Customer portal",
  "workflow-automation": "Workflow automation",
  "legacy-modernisation": "Legacy modernisation",
}

export const AUDIENCE_LABEL: Record<UserAudience, string> = {
  employees: "Employees",
  customers: "Customers",
  partners: "Partners",
  public: "Public users",
}

export const CAPABILITY_LABEL: Record<Capability, string> = {
  "secure-login": "Secure login",
  "roles-and-permissions": "Roles and permissions",
  dashboard: "Dashboard",
  reporting: "Reporting",
  payments: "Payments",
  subscriptions: "Subscriptions",
  documents: "Documents",
  notifications: "Notifications",
  "ai-assistance": "AI assistance",
  integrations: "Third-party integrations",
}

export const SCALE_LABEL: Record<ScaleBand, string> = {
  "1-10": "1–10 users",
  "10-100": "10–100 users",
  "100-1000": "100–1,000 users",
  "1000+": "1,000+ users",
}

export const TIMELINE_LABEL: Record<Timeline, string> = {
  exploring: "Still exploring",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  "6-plus-months": "6+ months",
}

export interface ProductScopeSelections {
  productType: ProductType
  audience: UserAudience
  capabilities: Capability[]
  scale: ScaleBand
  timeline: Timeline
}

export function getEngagementRecommendation(selections: ProductScopeSelections): EngagementModel {
  const { timeline, capabilities, scale } = selections

  if (timeline === "exploring" || capabilities.length <= 2) {
    return "Discovery Sprint"
  }

  const isLargeScale = scale === "100-1000" || scale === "1000+"
  const isLongTimeline = timeline === "6-plus-months"

  if (isLargeScale || isLongTimeline || capabilities.length >= 6) {
    return "Phased Platform Delivery"
  }

  return "Focused MVP"
}

export const ENGAGEMENT_DESCRIPTION: Record<EngagementModel, string> = {
  "Discovery Sprint":
    "A focused, time-boxed engagement to validate the problem, map user journeys, and produce a clear scope and technical approach before committing to a build.",
  "Focused MVP":
    "A lean, working first version covering your priority capabilities — built to get real users and feedback quickly, with a clear path to expand.",
  "Phased Platform Delivery":
    "A structured, multi-phase build for larger scope or scale, with defined milestones, continuous delivery, and room to evolve the platform as it grows.",
}

/* ---------------------------------------------------------------------- */
/* Workflow Maturity Assessment                                            */
/* ---------------------------------------------------------------------- */

export type MaturityBandKey = "manual-and-fragmented" | "growing-pains" | "ready-to-scale" | "optimisation-ready"

export interface MaturityBand {
  key: MaturityBandKey
  minScore: number
  maxScore: number
  title: string
  description: string
  recommendations: string[]
  engagement: EngagementModel
}

export const MATURITY_BANDS: MaturityBand[] = [
  {
    key: "manual-and-fragmented",
    minScore: 0,
    maxScore: 25,
    title: "Manual and fragmented",
    description:
      "Your operation is currently held together by manual effort — spreadsheets, messages, and individual judgement rather than a shared system. This is common at an early stage, but it usually means growth creates more admin rather than more output.",
    recommendations: [
      "Map your single highest-friction process end to end before changing anything",
      "Agree one place records should live, even before introducing new software",
      "Identify the one workflow causing the most repeated manual effort",
      "Start with a discovery conversation rather than jumping to a build",
    ],
    engagement: "Discovery Sprint",
  },
  {
    key: "growing-pains",
    minScore: 26,
    maxScore: 50,
    title: "Growing pains",
    description:
      "Some structure exists, but your team is likely compensating for gaps with manual workarounds and informal knowledge. This is the stage where a well-scoped first platform typically has the fastest payback.",
    recommendations: [
      "Choose one workflow to fully digitise rather than attempting everything at once",
      "Introduce clear ownership and status tracking for in-flight work",
      "Reduce reliance on chat messages for anything that needs a record",
      "Plan a focused MVP around your highest-friction workflow",
    ],
    engagement: "Focused MVP",
  },
  {
    key: "ready-to-scale",
    minScore: 51,
    maxScore: 75,
    title: "Ready to scale",
    description:
      "Your core processes are reasonably well defined, and the main constraint is that your tools have not kept pace with your ambitions. A connected platform would likely unlock meaningful capacity.",
    recommendations: [
      "Consolidate the tools your team currently juggles into one connected platform",
      "Add reporting that leadership can trust without manual reconciliation",
      "Introduce customer or partner self-service where it reduces repetitive support",
      "Plan a phased delivery so improvements land continuously, not all at once",
    ],
    engagement: "Focused MVP",
  },
  {
    key: "optimisation-ready",
    minScore: 76,
    maxScore: 100,
    title: "Optimisation-ready",
    description:
      "Your operation already runs on reasonably solid foundations. The opportunity now is refinement — automation, integration, and data quality — rather than fixing basic gaps.",
    recommendations: [
      "Identify remaining manual steps that automation could remove entirely",
      "Introduce AI-assisted workflows where decisions are repetitive and data-rich",
      "Deepen integration between existing systems to remove duplicate data entry",
      "Build a longer-term platform and automation roadmap with your team",
    ],
    engagement: "Phased Platform Delivery",
  },
]

export function getMaturityBand(score: number): MaturityBand {
  const clamped = Math.min(Math.max(score, 0), 100)
  return (
    MATURITY_BANDS.find((band) => clamped >= band.minScore && clamped <= band.maxScore) ??
    MATURITY_BANDS[MATURITY_BANDS.length - 1]
  )
}

/* ---------------------------------------------------------------------- */
/* Workflow Rescue                                                         */
/* ---------------------------------------------------------------------- */

export type RescueResultKey = "manual-process-risk" | "growing-operational-friction" | "strong-foundation" | "ready-to-scale"

export interface RescueResultBand {
  key: RescueResultKey
  minScore: number
  maxScore: number
  title: string
  recommendation: string
}

export const RESCUE_RESULT_BANDS: RescueResultBand[] = [
  {
    key: "manual-process-risk",
    minScore: 0,
    maxScore: 39,
    title: "Manual process risk",
    recommendation: "Start with a workflow mapping and discovery session.",
  },
  {
    key: "growing-operational-friction",
    minScore: 40,
    maxScore: 64,
    title: "Growing operational friction",
    recommendation: "Identify one high-value workflow for a focused MVP.",
  },
  {
    key: "strong-foundation",
    minScore: 65,
    maxScore: 79,
    title: "Strong foundation, clear opportunity",
    recommendation: "Identify one high-value workflow for a focused MVP.",
  },
  {
    key: "ready-to-scale",
    minScore: 80,
    maxScore: 100,
    title: "Ready to scale with confidence",
    recommendation: "Plan an integrated platform and automation roadmap.",
  },
]

export function getRescueResultBand(score: number): RescueResultBand {
  const clamped = Math.min(Math.max(score, 0), 100)
  return (
    RESCUE_RESULT_BANDS.find((band) => clamped >= band.minScore && clamped <= band.maxScore) ??
    RESCUE_RESULT_BANDS[RESCUE_RESULT_BANDS.length - 1]
  )
}
