import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Users2, Gauge, Wrench, Sparkle } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/sections/page-header"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { AboutScene } from "@/components/three/scene-loaders"

export const metadata: Metadata = {
  title: "About",
  description: "Grentech is a UK-based software product studio building bespoke platforms, SaaS products, and AI-enabled workflows.",
  alternates: { canonical: "/about" },
}

const principles = [
  {
    icon: Compass,
    title: "Start with the real problem",
    description: "We resist jumping to a solution before we've understood the actual workflow, constraints, and people involved.",
  },
  {
    icon: Users2,
    title: "Build for people",
    description: "Software is only valuable if the people who need to use it actually adopt it — accessibility and usability are never an afterthought.",
  },
  {
    icon: Gauge,
    title: "Keep complexity under control",
    description: "We favour the simplest architecture that solves the real problem, and resist adding complexity for hypothetical future needs.",
  },
  {
    icon: Wrench,
    title: "Deliver work worth maintaining",
    description: "Every platform we hand over should be something a future team — whether ours or yours — can understand, extend, and trust.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT GRENTECH"
        title="Software built around the way your business works."
        description="Grentech is a UK-based software product studio. We work with founders, operations leaders, and product teams to turn complex, manual workflows into software that people actually want to use."
        visual={<TopicVisual Scene={AboutScene} fallback={<TopicFallback icon={Sparkle} color="brand" />} />}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground">Our mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We design and build software that makes complex work feel simple. That means treating discovery, UX,
            engineering, and accessibility as one connected discipline — not separate stages handed off between
            different teams — so what gets built actually solves the problem it was meant to solve.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We work as a product studio rather than a traditional agency: senior involvement throughout, direct
            collaboration with the people who&rsquo;ll use what we build, and a preference for practical, maintainable
            solutions over unnecessary complexity.
          </p>
        </Container>
      </section>

      <section className="border-t border-border bg-surface/30 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Principles we build by</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-background/40 p-6">
                <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Let&rsquo;s talk about what you&rsquo;re building.
          </h2>
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
