export type CaseStudyCategory = "saas" | "platforms" | "ai-automation" | "public-services"

export const CASE_STUDY_CATEGORY_LABEL: Record<CaseStudyCategory, string> = {
  saas: "SaaS",
  platforms: "Platforms",
  "ai-automation": "AI and automation",
  "public-services": "Public services",
}

export interface WorkflowStage {
  stage: string
  challenge: string
  userNeed: string
  feature: string
  benefit: string
}

export interface CaseStudy {
  slug: string
  title: string
  category: CaseStudyCategory
  categoryLabel: string
  description: string
  outcomeLabels: string[]
  isIllustrative: boolean
  challenge: string
  approach: string
  capabilities: string[]
  technology: string[]
  outcomes: string[]
  before: string[]
  after: string[]
  stages: WorkflowStage[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fuelfinder",
    title: "FuelFinder",
    category: "public-services",
    categoryLabel: "Public service platform",
    description:
      "A clear, accessible service that helps people find essential fuel information when it matters most.",
    outcomeLabels: ["Accessible service design", "High-traffic readiness", "Next.js and TypeScript"],
    isIllustrative: true,
    challenge:
      "During periods of fuel supply uncertainty, people struggled to find clear, current information about availability — relying on rumour, social media, and word of mouth, which created unnecessary pressure on local infrastructure.",
    approach:
      "We designed a focused, accessible web service prioritising clarity and speed over feature breadth: a simple information model, resilient architecture for traffic spikes, and an interface usable by people under stress on any device.",
    capabilities: [
      "Real-time information display",
      "Accessible, low-bandwidth-friendly interface",
      "Resilient architecture for demand spikes",
      "Content update workflow for administrators",
    ],
    technology: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    outcomes: [
      "A calm, accessible experience during a high-stress public situation",
      "Architecture that stayed reliable under high concurrent traffic",
      "A content workflow non-technical staff could update directly",
    ],
    before: [
      "Fragmented, unofficial information sources",
      "No single place to check current status",
      "Manual updates via social media posts",
    ],
    after: [
      "One authoritative, accessible information source",
      "Resilient service during peak demand",
      "Simple update workflow for administrators",
    ],
    stages: [
      {
        stage: "Discovery",
        challenge: "People had no single trustworthy place to check current information.",
        userNeed: "Find accurate, current information in seconds, from any device.",
        feature: "A single, focused information service with minimal cognitive load.",
        benefit: "Reduced reliance on rumour and unofficial channels.",
      },
      {
        stage: "Peak demand",
        challenge: "Traffic could spike suddenly and without warning.",
        userNeed: "The service needed to stay fast and available under load.",
        feature: "Resilient, cache-friendly architecture built for demand spikes.",
        benefit: "Consistent availability when it mattered most.",
      },
      {
        stage: "Ongoing updates",
        challenge: "Administrators needed to update information without developer support.",
        userNeed: "A simple way to publish accurate updates quickly.",
        feature: "A lightweight content workflow for non-technical staff.",
        benefit: "Faster, more accurate updates with less operational overhead.",
      },
    ],
  },
  {
    slug: "pulsecoach",
    title: "PulseCoach",
    category: "saas",
    categoryLabel: "Fitness operations platform",
    description:
      "A client-management platform that helps independent coaches organise programmes, progress, check-ins, and payments in one place.",
    outcomeLabels: ["Reduced admin time", "Client portals", "Subscription platform"],
    isIllustrative: true,
    challenge:
      "Independent coaches were managing client programmes across spreadsheets, messaging apps, and payment links — losing time to admin instead of coaching, with no consistent way to track client progress.",
    approach:
      "We built a subscription SaaS platform giving coaches a single workspace for programmes, scheduling, and payments, alongside a simple client portal so clients could check in and track progress without extra messaging back and forth.",
    capabilities: [
      "Programme and session builder",
      "Client progress tracking",
      "Client self-service portal",
      "Subscription billing for coaches",
      "Automated check-in reminders",
    ],
    technology: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    outcomes: [
      "Meaningful reduction in weekly admin time per coach",
      "Clients able to track progress independently via a self-service portal",
      "A recurring subscription revenue model for the business",
    ],
    before: [
      "Client programmes tracked in spreadsheets",
      "Progress updates via scattered messages",
      "Manual payment links and reminders",
    ],
    after: [
      "One workspace for programmes and scheduling",
      "Self-service client portal for check-ins and progress",
      "Automated billing and reminders",
    ],
    stages: [
      {
        stage: "Onboarding a client",
        challenge: "New clients were onboarded via back-and-forth messages and paper forms.",
        userNeed: "A fast, guided way to get a new client set up correctly.",
        feature: "A structured onboarding flow capturing goals, plans, and payment in one pass.",
        benefit: "Coaches start new clients in minutes, not days.",
      },
      {
        stage: "Weekly check-ins",
        challenge: "Coaches chased clients individually for progress updates.",
        userNeed: "A simple, low-friction way for clients to report progress.",
        feature: "A lightweight client portal with reminders built in.",
        benefit: "Consistent check-in data without manual chasing.",
      },
      {
        stage: "Getting paid",
        challenge: "Payments were tracked manually across different tools.",
        userNeed: "Reliable, automatic billing tied to each client relationship.",
        feature: "Integrated subscription billing per client.",
        benefit: "Predictable revenue with far less manual reconciliation.",
      },
    ],
  },
  {
    slug: "flowops",
    title: "FlowOps",
    category: "platforms",
    categoryLabel: "Operations workflow platform",
    description:
      "A tailored operations hub that gives distributed teams a single view of tasks, approvals, reporting, and performance.",
    outcomeLabels: ["Workflow automation", "Role-based access", "Business reporting"],
    isIllustrative: true,
    challenge:
      "A distributed operations team relied on email, spreadsheets, and chat messages to coordinate tasks and approvals across locations, making it difficult for leadership to see what was actually happening in the business.",
    approach:
      "We designed a role-based operations platform consolidating task management, approvals, and reporting into a single system — with automation handling routine hand-offs and notifications that previously required manual chasing.",
    capabilities: [
      "Role-based task and approval workflows",
      "Automated notifications and hand-offs",
      "Live operational dashboard",
      "Cross-location reporting",
      "Audit trail for approvals",
    ],
    technology: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    outcomes: [
      "A single live view of operational status across all locations",
      "Faster approvals with a clear audit trail",
      "Reporting available on demand instead of a manual Friday exercise",
    ],
    before: [
      "Tasks and approvals tracked over email and chat",
      "No consolidated view across locations",
      "Reporting compiled manually before every meeting",
    ],
    after: [
      "One role-based platform for tasks and approvals",
      "Automated hand-offs and reminders",
      "Live, always-current reporting dashboard",
    ],
    stages: [
      {
        stage: "Task intake",
        challenge: "Requests arrived through inconsistent channels with no shared record.",
        userNeed: "One place to log and route a request correctly the first time.",
        feature: "Structured task intake with automatic routing by type.",
        benefit: "Nothing enters the business without a clear owner.",
      },
      {
        stage: "Approvals",
        challenge: "Approvals stalled when the right person wasn't reachable by chat.",
        userNeed: "A clear, trackable approval step with visible status.",
        feature: "Role-based approval workflow with escalation rules.",
        benefit: "Faster decisions and a complete audit trail.",
      },
      {
        stage: "Reporting to leadership",
        challenge: "Reporting required manually merging spreadsheets every week.",
        userNeed: "Leadership needed a trustworthy, current view without asking the team to compile it.",
        feature: "A live dashboard drawing directly from operational data.",
        benefit: "Reporting available in real time, with no manual compilation.",
      },
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}
