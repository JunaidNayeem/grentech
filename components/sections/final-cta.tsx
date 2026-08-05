import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/effects/reveal"
import { GradientBlobs } from "@/components/effects/gradient-blobs"

export function FinalCta() {
  return (
    <Section density="marketing" className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,hsl(152_74%_25%/0.45),transparent)]"
      />
      <GradientBlobs variant="cta" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Have a complex workflow?{" "}
            <span className="bg-gradient-to-r from-lime via-brand to-teal bg-clip-text text-transparent">
              Let&apos;s make it simple.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tell us what is slowing your team down. We will help you identify the right product opportunity and a
            practical route to launch.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/workflow-calculator">
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Calculate your workflow opportunity
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
