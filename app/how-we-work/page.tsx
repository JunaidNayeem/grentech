import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, RefreshCcw } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/sections/page-header"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { HowWeWorkScene } from "@/components/three/scene-loaders"

export const metadata: Metadata = {
  title: "How we work",
  description: "Grentech's product delivery approach — discovery, design, iterative delivery, testing, launch, and ongoing improvement.",
  alternates: { canonical: "/how-we-work" },
}

const timeline = [
  {
    weeks: "Weeks 1–2",
    title: "Discovery",
    detail: "Stakeholder and user conversations, current-process mapping, and early technical scoping.",
  },
  {
    weeks: "Weeks 3–4",
    title: "Prototype and technical plan",
    detail: "A clickable prototype of key journeys alongside a concrete technical approach and delivery plan.",
  },
  {
    weeks: "Week 5 onward",
    title: "Iterative delivery",
    detail: "Focused build iterations with regular demos, visible priorities, and continuous testing.",
  },
]

const expectations = [
  "A short weekly or fortnightly demo of what's shipped, not just what's planned",
  "A visible, prioritised backlog you can review at any time",
  "Direct access to the people building your product, not just an account manager",
  "Clear documentation as we go, not retrofitted at the end",
  "QA and testing built into every iteration rather than left to the end",
  "A release plan agreed with you in advance, not sprung on you at launch",
]

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="HOW WE WORK"
        title="Built with you, not just for you."
        description="A structured, transparent delivery approach — from first conversation to a live product and everything after."
        visual={<TopicVisual Scene={HowWeWorkScene} fallback={<TopicFallback icon={RefreshCcw} color="teal" />} />}
      />

      <ProcessTimeline />

      <section className="border-t border-border bg-surface/30 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            An example delivery timeline
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every engagement is scoped to the project, but most follow a similar shape in the early weeks.
          </p>
          <ol className="mt-10 space-y-6">
            {timeline.map((item) => (
              <li key={item.weeks} className="grid gap-2 rounded-2xl border border-border bg-background/40 p-6 sm:grid-cols-[160px_1fr] sm:items-start">
                <span className="font-display text-sm font-semibold text-brand">{item.weeks}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            What you can expect each week
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-border bg-surface/40 p-5 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">Ready to see how this would work for you?</h2>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">
                Book a discovery call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
