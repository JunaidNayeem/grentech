export type ScoreKey = "clarity" | "customerExperience" | "scaleReadiness"

export interface RescueOption {
  id: "A" | "B"
  label: string
  description: string
  outcomeMessage: string
  whyItMatters: string
  deltas: Record<ScoreKey, number>
}

export interface RescueRound {
  id: string
  index: number
  title: string
  problem: string
  primaryLesson: string
  options: [RescueOption, RescueOption]
}

export const STARTING_SCORES: Record<ScoreKey, number> = {
  clarity: 0,
  customerExperience: 0,
  scaleReadiness: 0,
}

export const SCORE_LABEL: Record<ScoreKey, string> = {
  clarity: "Workflow clarity",
  customerExperience: "Customer experience",
  scaleReadiness: "Scale readiness",
}

export const rescueRounds: RescueRound[] = [
  {
    id: "fragmented-intake",
    index: 1,
    title: "Fragmented intake",
    problem:
      "New customer enquiries arrive through email, WhatsApp, spreadsheets, and web forms. The team loses track of who responded.",
    primaryLesson: "A single source of truth improves visibility and reliable follow-up.",
    options: [
      {
        id: "A",
        label: "Create one central intake workflow",
        description: "Route every enquiry, regardless of channel, into one structured system with clear status.",
        outcomeMessage: "Every enquiry now lands in one place, with a visible owner and status.",
        whyItMatters:
          "A single intake point removes the guesswork of checking four different channels, and makes it obvious at a glance what still needs a response.",
        deltas: { clarity: 32, customerExperience: 20, scaleReadiness: 8 },
      },
      {
        id: "B",
        label: "Ask the team to check every channel more often",
        description: "Add a reminder for the team to monitor email, WhatsApp, spreadsheets, and forms more closely.",
        outcomeMessage: "Checking more often helps a little, but enquiries still slip through the cracks.",
        whyItMatters:
          "Increasing manual vigilance can reduce missed enquiries slightly, but it doesn't fix the underlying fragmentation — and it adds more work to an already stretched team.",
        deltas: { clarity: 9, customerExperience: 6, scaleReadiness: 2 },
      },
    ],
  },
  {
    id: "missing-ownership",
    index: 2,
    title: "Missing ownership",
    problem: "Tasks are being missed because ownership is unclear.",
    primaryLesson: "Defined ownership and workflow states reduce missed work.",
    options: [
      {
        id: "A",
        label: "Add clear roles, task assignment, statuses, and due dates",
        description: "Give every task a named owner, a status, and a due date, visible to the whole team.",
        outcomeMessage: "Ownership is now explicit — nothing sits unassigned for long.",
        whyItMatters:
          "When ownership is a structural part of the workflow rather than an assumption, tasks stop relying on someone remembering to pick them up.",
        deltas: { clarity: 30, customerExperience: 8, scaleReadiness: 18 },
      },
      {
        id: "B",
        label: "Send more manual reminder messages",
        description: "Ask managers to chase outstanding tasks more frequently via chat.",
        outcomeMessage: "Reminders catch some missed tasks, but managers are now spending more time chasing.",
        whyItMatters:
          "Manual chasing can patch individual gaps, but it scales badly — the more the team grows, the more chasing is required just to stand still.",
        deltas: { clarity: 8, customerExperience: 2, scaleReadiness: 5 },
      },
    ],
  },
  {
    id: "customer-updates",
    index: 3,
    title: "Customer updates",
    problem: "Customers keep emailing for updates, adding more pressure to the team.",
    primaryLesson: "Self-service product experiences reduce repetitive support while improving customer confidence.",
    options: [
      {
        id: "A",
        label: "Build a secure customer portal with live status and updates",
        description: "Give customers a self-service way to check status at any time, without emailing the team.",
        outcomeMessage: "Customers can now check status themselves — support requests drop sharply.",
        whyItMatters:
          "Self-service doesn't just save time — it improves customer confidence, because they no longer have to wait on a reply to know where things stand.",
        deltas: { clarity: 8, customerExperience: 32, scaleReadiness: 12 },
      },
      {
        id: "B",
        label: "Create more email templates",
        description: "Speed up manual replies to status-update emails with pre-written templates.",
        outcomeMessage: "Replies go out a little faster, but the team is still answering every enquiry manually.",
        whyItMatters:
          "Templates reduce typing time, but they don't reduce volume — customers still have to ask, and the team still has to respond, every single time.",
        deltas: { clarity: 2, customerExperience: 9, scaleReadiness: 4 },
      },
    ],
  },
  {
    id: "reporting-burden",
    index: 4,
    title: "Reporting burden",
    problem: "Leadership wants reporting, but the team spends every Friday merging spreadsheets.",
    primaryLesson: "Structured data enables reliable and timely reporting.",
    options: [
      {
        id: "A",
        label: "Add a live operational dashboard and reporting layer",
        description: "Build reporting directly on top of live operational data, always current.",
        outcomeMessage: "Reporting is now live and always current — no more Friday merge.",
        whyItMatters:
          "Reporting that reads directly from structured operational data is inherently trustworthy and available on demand, instead of being a manual exercise repeated every week.",
        deltas: { clarity: 26, customerExperience: 8, scaleReadiness: 28 },
      },
      {
        id: "B",
        label: "Ask the team to improve the spreadsheet template",
        description: "Standardise the spreadsheet format to make merging slightly less painful.",
        outcomeMessage: "The merge is a little faster, but Friday afternoons are still spent reconciling data.",
        whyItMatters:
          "A better template reduces friction but doesn't remove the fundamental problem: reporting still depends on a recurring manual step that consumes time every single week.",
        deltas: { clarity: 7, customerExperience: 2, scaleReadiness: 8 },
      },
    ],
  },
  {
    id: "scaling-operations",
    index: 5,
    title: "Scaling operations",
    problem: "The business is expanding, but repetitive tasks are consuming more time every week.",
    primaryLesson: "Practical automation helps operations scale without administrative work growing at the same rate.",
    options: [
      {
        id: "A",
        label: "Automate repeatable rules, notifications, and hand-offs",
        description: "Identify the repetitive, rules-based steps in the workflow and automate them directly.",
        outcomeMessage: "Repetitive steps now happen automatically — the team can absorb growth without more admin.",
        whyItMatters:
          "Automation is what breaks the link between business growth and administrative headcount — the workflow keeps up with demand without proportionally more manual effort.",
        deltas: { clarity: 10, customerExperience: 22, scaleReadiness: 32 },
      },
      {
        id: "B",
        label: "Hire more people to manage the same manual process",
        description: "Add headcount to handle the growing volume of manual work.",
        outcomeMessage: "Extra hands help in the short term, but admin overhead keeps growing alongside demand.",
        whyItMatters:
          "More people can absorb more manual work for a while, but the underlying cost of growth keeps rising in lockstep — it doesn't break the link between scale and admin burden.",
        deltas: { clarity: 3, customerExperience: 6, scaleReadiness: 9 },
      },
    ],
  },
]

export function clampScore(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

export function calculateOverallScore(scores: Record<ScoreKey, number>): number {
  const values = Object.values(scores)
  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  return clampScore(average)
}
