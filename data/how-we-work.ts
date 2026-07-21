export interface ProcessStep {
  number: string
  title: string
  summary: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    summary: "We learn how your team works, where friction lives, and what success should look like.",
    detail:
      "We spend time with the people who actually do the work — not just leadership — to understand current processes, pain points, and constraints before proposing anything.",
  },
  {
    number: "02",
    title: "Define",
    summary: "We shape the product strategy, user journeys, technical approach, scope, and delivery plan.",
    detail:
      "Discovery findings become a concrete plan: a prioritised scope, user journeys, a technical approach, and a realistic delivery timeline everyone agrees on before building starts.",
  },
  {
    number: "03",
    title: "Design",
    summary: "We turn complex requirements into accessible, intuitive product experiences.",
    detail:
      "We design real workflows for real users — accessible, responsive, and tested against how people will actually use the product, not just how it looks in a mockup.",
  },
  {
    number: "04",
    title: "Build",
    summary: "We engineer the platform in focused iterations, with visibility at every stage.",
    detail:
      "Development happens in short, visible iterations with regular demos, so priorities stay aligned and nothing arrives as a surprise at the end.",
  },
  {
    number: "05",
    title: "Improve",
    summary: "We measure, support, refine, and scale the product as your needs grow.",
    detail:
      "Launch is a milestone, not the finish line. We monitor usage, support your team, and plan the next round of improvements as your business evolves.",
  },
]
