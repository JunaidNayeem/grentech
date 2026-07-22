import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { CaseStudyCard } from "@/components/case-studies/case-study-card"
import { Reveal } from "@/components/effects/reveal"
import { TiltCard } from "@/components/effects/tilt-card"
import { caseStudies } from "@/data/case-studies"

export function FeaturedWork() {
  return (
    <section className="relative border-t border-border bg-surface/30 py-20 sm:py-28">
      <Reveal>
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Illustrative project examples
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Software with a{" "}
                <span className="bg-gradient-to-r from-lime to-brand bg-clip-text text-transparent">job to do.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Explore our work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Reveal>

      <Container>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.1}>
              <TiltCard className="h-full">
                <CaseStudyCard study={study} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
