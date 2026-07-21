import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Info } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/sections/page-header"
import { ChaosToClarity } from "@/components/case-studies/chaos-to-clarity"
import { WorkflowStages } from "@/components/case-studies/workflow-stages"
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies"

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/work/${study.slug}` },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  return (
    <>
      <PageHeader eyebrow={study.categoryLabel} title={study.title} description={study.description} />

      <section className="border-b border-border bg-amber/[0.06] py-4">
        <Container className="flex items-start gap-3 text-sm text-amber">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            This is an illustrative project example used to demonstrate the kind of work Grentech does. It will be
            replaced with a real, named case study once explicit public permission is confirmed.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">The challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Our approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.approach}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface/30 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-foreground">From chaos to clarity</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Explore how the workflow changed stage by stage — or read the full plain-text version below.
          </p>
          <div className="mt-8">
            <ChaosToClarity before={study.before} after={study.after} />
          </div>
          <div className="mt-10">
            <WorkflowStages stages={study.stages} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Product capabilities</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {study.capabilities.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.technology.map((item) => (
                <li key={item} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Outcomes</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {study.outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">Have a similar challenge?</h2>
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
