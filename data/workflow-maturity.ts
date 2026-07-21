export interface MaturityQuestion {
  id: string
  topic: string
  question: string
  lowLabel: string
  highLabel: string
}

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: "process-documentation",
    topic: "Process documentation",
    question: "Our key processes are clearly documented, not just held in people's heads.",
    lowLabel: "Not documented at all",
    highLabel: "Fully documented",
  },
  {
    id: "information-visibility",
    topic: "Information visibility",
    question: "Anyone who needs to can see the current status of work without asking someone directly.",
    lowLabel: "No visibility",
    highLabel: "Fully visible",
  },
  {
    id: "spreadsheet-dependency",
    topic: "Spreadsheet dependency",
    question: "We rely on structured systems rather than shared spreadsheets for business-critical information.",
    lowLabel: "Heavily spreadsheet-reliant",
    highLabel: "Minimal reliance",
  },
  {
    id: "approval-ownership",
    topic: "Approval and ownership clarity",
    question: "It's always clear who owns a task and who needs to approve it next.",
    lowLabel: "Frequently unclear",
    highLabel: "Always clear",
  },
  {
    id: "reporting-quality",
    topic: "Reporting quality",
    question: "Leadership can get accurate reporting without manually compiling it first.",
    lowLabel: "Manual and slow",
    highLabel: "Live and reliable",
  },
  {
    id: "onboarding",
    topic: "New employee onboarding",
    question: "A new starter can learn our processes and tools quickly, without lengthy informal coaching.",
    lowLabel: "Requires lots of hand-holding",
    highLabel: "Fast and self-service",
  },
  {
    id: "customer-updates",
    topic: "Customer update experience",
    question: "Customers can get status updates without needing to email or call us directly.",
    lowLabel: "Always requires contact",
    highLabel: "Fully self-service",
  },
  {
    id: "manual-duplication",
    topic: "Manual work and duplication",
    question: "The same piece of information is rarely entered more than once across our systems.",
    lowLabel: "Frequent duplication",
    highLabel: "Rarely duplicated",
  },
  {
    id: "software-limitations",
    topic: "Existing software limitations",
    question: "Our current tools support how we actually want to work, rather than getting in the way.",
    lowLabel: "Significant limitations",
    highLabel: "Well supported",
  },
  {
    id: "growth-readiness",
    topic: "Growth readiness",
    question: "We could handle a significant increase in volume without a proportional increase in admin effort.",
    lowLabel: "Would struggle badly",
    highLabel: "Very well positioned",
  },
]

export const maturityScaleLabels = ["1", "2", "3", "4", "5"] as const
