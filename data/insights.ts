export type InsightCategory = "Strategy" | "Operations" | "Product"

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }

export interface Insight {
  slug: string
  title: string
  category: InsightCategory
  excerpt: string
  readingTime: string
  publishedLabel: string
  content: ContentBlock[]
}

export const insights: Insight[] = [
  {
    slug: "validate-a-saas-idea-before-writing-code",
    title: "How to validate a SaaS idea before writing code",
    category: "Strategy",
    excerpt:
      "Building the wrong product quickly is still building the wrong product. Here's a practical way to test demand before committing engineering time.",
    readingTime: "7 min read",
    publishedLabel: "Grentech insights",
    content: [
      {
        type: "paragraph",
        text: "Most SaaS ideas fail for a reason that has nothing to do with engineering: nobody validated whether the problem was worth solving, for whom, and at what price, before building it. The good news is that validation doesn't require code, a designer, or months of runway — it requires discipline and a willingness to hear 'no'.",
      },
      { type: "heading", text: "Start with the problem, not the product" },
      {
        type: "paragraph",
        text: "It's tempting to describe your idea in terms of features. Resist that. Describe the problem instead: who has it, how often, and what they currently do about it. If you can't describe the current workaround in detail — the spreadsheet, the manual process, the workaround tool — you probably don't understand the problem well enough yet to solve it.",
      },
      { type: "heading", text: "Talk to fifteen people before you talk to a developer" },
      {
        type: "paragraph",
        text: "Fifteen structured conversations with people who genuinely have the problem will tell you more than any amount of internal debate. Ask about their current process, what it costs them (time, money, stress), and what they've already tried. Avoid asking whether they'd 'use' your idea — hypothetical enthusiasm is cheap. Ask what they're doing about the problem today.",
      },
      { type: "heading", text: "Test willingness to pay before you test the interface" },
      {
        type: "list",
        items: [
          "A landing page describing the outcome, not the features, with a clear call to action",
          "A concierge version of the service, delivered manually, to prove the value before automating it",
          "A short paid pilot with a handful of early customers, even if delivery is partly manual",
        ],
      },
      {
        type: "paragraph",
        text: "Each of these approaches produces a stronger signal than a finished product with no users. If people won't pay for a manual version of your idea, a polished app is unlikely to change their mind.",
      },
      { type: "heading", text: "Scope the smallest version that proves the value" },
      {
        type: "paragraph",
        text: "Once you have signal, resist the urge to build everything at once. Identify the single workflow that delivers the core value, and build only that — deliberately excluding the features that feel important but aren't yet proven. This is the point at which a structured discovery sprint earns its cost: it turns validated demand into a scoped, buildable first version.",
      },
      {
        type: "paragraph",
        text: "Validation isn't a phase you complete once. It continues through the first release and beyond — but doing the groundwork before writing code dramatically improves the odds that what you build is worth using.",
      },
    ],
  },
  {
    slug: "when-spreadsheets-become-a-business-risk",
    title: "When spreadsheets become a business risk",
    category: "Operations",
    excerpt:
      "Spreadsheets are brilliant until they aren't. Here are the warning signs that your operation has outgrown them — and what tends to work instead.",
    readingTime: "6 min read",
    publishedLabel: "Grentech insights",
    content: [
      {
        type: "paragraph",
        text: "Spreadsheets are one of the best tools ever built for flexible, ad hoc work. That flexibility is exactly why they become dangerous once a process becomes critical, shared, and repeated: nothing stops someone from changing a formula, deleting a row, or working from a stale copy.",
      },
      { type: "heading", text: "The warning signs" },
      {
        type: "list",
        items: [
          "More than one person edits the same spreadsheet, and you're not fully sure who changed what, or when",
          "You've had at least one incident caused by a broken formula, an overwritten cell, or a version mismatch",
          "Reporting requires manually copying data between multiple spreadsheets before anyone can trust it",
          "New starters need a 'tribal knowledge' walkthrough just to use the spreadsheet correctly",
          "The spreadsheet is now the de facto system of record for something that matters — payments, compliance, customer commitments",
        ],
      },
      {
        type: "paragraph",
        text: "None of these are hypothetical risks. They are the most common root cause we see behind reporting errors, missed customer commitments, and hours lost every week reconciling numbers that should never have needed reconciling.",
      },
      { type: "heading", text: "Why the risk is easy to miss" },
      {
        type: "paragraph",
        text: "Spreadsheets fail gradually, not suddenly. Each individual workaround feels reasonable in isolation — one more tab, one more manual step, one more shared file. The risk compounds quietly until an error becomes visible at the worst possible time: during an audit, a busy period, or in front of a customer.",
      },
      { type: "heading", text: "What tends to replace them well" },
      {
        type: "paragraph",
        text: "The fix is rarely 'buy an off-the-shelf tool' or 'build something enormous'. It's usually a small, purpose-built system covering the one workflow causing the most risk: structured data entry instead of free-form cells, defined roles instead of shared editing, and an audit trail instead of version guesswork.",
      },
      {
        type: "paragraph",
        text: "Done well, this doesn't remove the flexibility your team values — it removes the fragility that flexibility creates once a process becomes business-critical.",
      },
    ],
  },
  {
    slug: "what-makes-an-internal-tool-people-actually-adopt",
    title: "What makes an internal tool people actually adopt",
    category: "Product",
    excerpt:
      "Plenty of internal tools get built and then quietly ignored. The difference between adoption and abandonment usually comes down to a few consistent factors.",
    readingTime: "6 min read",
    publishedLabel: "Grentech insights",
    content: [
      {
        type: "paragraph",
        text: "Internal tools have a uniquely hard adoption problem: unlike a consumer product, users often didn't choose to use it, aren't paying for it, and can usually find a workaround. If the tool is even slightly harder than the old way, people will quietly revert — and no amount of internal mandate fully prevents that.",
      },
      { type: "heading", text: "It has to be faster than the workaround, not just more correct" },
      {
        type: "paragraph",
        text: "'More correct' rarely wins on its own. If the new tool takes longer than the spreadsheet or the shared inbox it's replacing, people will use it only when someone is watching. Adoption depends on the tool being genuinely quicker for the most common task, even if that means initially supporting fewer edge cases.",
      },
      { type: "heading", text: "It has to fit how the role actually works" },
      {
        type: "paragraph",
        text: "Internal tools are too often designed around an idealised process rather than how the work actually happens. Time spent watching the real workflow — including the messy parts — usually reveals what the interface actually needs to support.",
      },
      { type: "heading", text: "Common adoption killers" },
      {
        type: "list",
        items: [
          "Requiring data entry that duplicates something already recorded elsewhere",
          "Adding approval steps without removing an equivalent amount of manual work",
          "Launching without training or a clear 'why this matters' explanation",
          "Ignoring frontline feedback after launch because the build phase is 'done'",
        ],
      },
      { type: "heading", text: "Treat launch as the start, not the finish" },
      {
        type: "paragraph",
        text: "The tools that get adopted are rarely perfect on day one. They're the ones where feedback in the first few weeks is taken seriously and acted on quickly, so early friction gets resolved before it hardens into 'this tool doesn't work for us' — a reputation that's very hard to undo later.",
      },
      {
        type: "paragraph",
        text: "Ultimately, adoption is a product problem, not a training problem. If people revert to the old way despite training, the tool — not the team — usually needs to change.",
      },
    ],
  },
]

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug)
}

export function getRelatedInsights(slug: string, count = 2): Insight[] {
  return insights.filter((insight) => insight.slug !== slug).slice(0, count)
}
