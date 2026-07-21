import type { LucideIcon } from "lucide-react"
import { Layers, Boxes, Sparkles, RefreshCw } from "lucide-react"

export interface Service {
  slug: string
  icon: LucideIcon
  title: string
  summary: string
  description: string
  outcomes: string[]
  deliverables: string[]
  bestFor: string
}

export const services: Service[] = [
  {
    slug: "saas-product-development",
    icon: Layers,
    title: "SaaS product development",
    summary:
      "We take your product from discovery and MVP to a scalable subscription platform your customers can rely on.",
    description:
      "From a validated idea to a subscription product customers pay for, we handle strategy, UX, engineering, billing, and the operational foundations a growing SaaS business needs — without over-building before you have real users.",
    outcomes: [
      "A working product in the hands of real users faster",
      "Subscription billing, plans, and account management built in from day one",
      "An architecture that can scale as usage and features grow",
    ],
    deliverables: [
      "Product strategy and roadmap",
      "UX flows and design system",
      "Multi-tenant application architecture",
      "Billing and subscription integration",
      "Launch-ready MVP",
    ],
    bestFor: "Founders and teams turning a validated idea into a product people can subscribe to and rely on.",
  },
  {
    slug: "bespoke-business-platforms",
    icon: Boxes,
    title: "Bespoke business platforms",
    summary:
      "Replace fragmented tools and manual processes with purpose-built software that gives your team clarity and control.",
    description:
      "When off-the-shelf tools no longer fit how your business actually operates, we design and build a platform shaped around your real workflows — roles, approvals, reporting, and all — so your team stops working around software and starts working with it.",
    outcomes: [
      "One connected system instead of spreadsheets, inboxes, and disconnected tools",
      "Clear ownership, workflow states, and audit trails",
      "Reporting leadership can trust without manual reconciliation",
    ],
    deliverables: [
      "Workflow mapping and process design",
      "Role-based access and permissions",
      "Custom dashboards and reporting",
      "Staff and/or customer portals",
      "Ongoing platform support",
    ],
    bestFor: "Operations-heavy teams whose growth is constrained by manual process rather than headcount.",
  },
  {
    slug: "ai-and-workflow-automation",
    icon: Sparkles,
    title: "AI and workflow automation",
    summary:
      "Introduce practical AI and automation where it removes repetitive effort, improves decisions, and creates measurable value.",
    description:
      "We identify the repetitive, rules-based, or data-heavy parts of your operation where automation and AI create genuine value — then build it in, integrated with your existing systems, rather than bolted on as a separate tool.",
    outcomes: [
      "Repetitive manual tasks automated end to end",
      "AI-assisted decisions where data volume outpaces manual review",
      "Automation that fits inside your existing tools and workflows",
    ],
    deliverables: [
      "Automation opportunity mapping",
      "Rules-based workflow automation",
      "AI-assisted features (drafting, triage, summarisation, extraction)",
      "Integration with existing systems",
      "Monitoring and iteration",
    ],
    bestFor: "Teams with clear, repeatable processes that currently consume disproportionate manual effort.",
  },
  {
    slug: "product-modernisation",
    icon: RefreshCw,
    title: "Product modernisation",
    summary:
      "Improve legacy software, stabilise critical systems, and create a user experience that makes adoption easy.",
    description:
      "We work with existing, business-critical systems that have become hard to maintain, slow to change, or difficult for staff to use — modernising incrementally so the business keeps running while the platform improves.",
    outcomes: [
      "A stabilised, maintainable codebase and architecture",
      "A user experience people actually want to use",
      "A clear, staged roadmap rather than a risky rewrite",
    ],
    deliverables: [
      "Technical and UX audit",
      "Incremental modernisation roadmap",
      "Architecture stabilisation and refactoring",
      "Interface redesign for adoption",
      "Handover documentation",
    ],
    bestFor: "Organisations depending on ageing systems that are increasingly costly or risky to change.",
  },
]

export type EngagementOption = {
  name: string
  summary: string
  bestWhen: string
}

export const engagementOptions: EngagementOption[] = [
  {
    name: "Discovery sprint",
    summary: "A focused, time-boxed engagement to validate the problem and shape a clear scope before committing to build.",
    bestWhen: "You know something needs to change but don't yet have a clear brief, or want to de-risk a bigger decision.",
  },
  {
    name: "Focused MVP build",
    summary: "A lean, working first version of your product, scoped around your highest-priority capabilities.",
    bestWhen: "You have a clear priority workflow or product idea and want working software in front of real users quickly.",
  },
  {
    name: "Product team extension",
    summary: "Grentech engineers and designers embed alongside your team as an extension of your existing capability.",
    bestWhen: "You have an in-house team or roadmap already and need additional senior capacity without a lengthy hiring process.",
  },
  {
    name: "Ongoing product partnership",
    summary: "Continuous discovery, delivery, support, and iteration as your product and business evolve.",
    bestWhen: "Your product is live and growing, and you want a long-term partner rather than a series of one-off projects.",
  },
]

export const servicesFaq = [
  {
    question: "We don't have a detailed brief yet — can you still help?",
    answer:
      "Yes. Most engagements start with a discovery sprint precisely because the brief isn't fully formed. We'll help you turn a rough problem statement into a clear, scoped plan.",
  },
  {
    question: "Do you only build brand-new products, or can you work with what we already have?",
    answer:
      "Both. We regularly work with existing systems — stabilising, modernising, and extending them — as well as building new platforms from scratch.",
  },
  {
    question: "How involved will our team need to be?",
    answer:
      "As involved as is useful. We run regular demos and keep priorities visible throughout, but we aim to minimise the operational burden on your team so they can keep running the business.",
  },
  {
    question: "What does a typical engagement cost?",
    answer:
      "It depends entirely on scope, which is exactly what a discovery sprint or initial conversation is for. We don't publish fixed prices because the right engagement model varies significantly by project.",
  },
  {
    question: "Can you work with our existing technology choices?",
    answer:
      "In most cases, yes. We favour proven, well-supported technology and will always explain the reasoning if we recommend a change.",
  },
]
