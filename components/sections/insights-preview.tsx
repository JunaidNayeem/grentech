import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { InsightCard } from "@/components/sections/insight-card"
import { Reveal } from "@/components/effects/reveal"
import { insights } from "@/data/insights"

export function InsightsPreview() {
  return (
    <Section density="marketing" className="border-t border-border bg-surface/30">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Thinking beyond the build.
            </h2>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              All insights
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <Reveal key={insight.slug} delay={index * 0.08}>
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
