import Link from "next/link"
import { ArrowRight, Gamepad2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { HeroVisual } from "@/components/sections/hero-visual"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <Eyebrow>PRODUCT STUDIO · SAAS · AI WORKFLOWS</Eyebrow>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build software that moves your business forward.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Grentech designs and engineers scalable SaaS platforms, internal tools, and intelligent workflows for
            ambitious teams ready to replace manual work with better systems.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Book a discovery call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/workflow-rescue">
                <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                Play Workflow Rescue
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            From first idea to launch, scale, and continuous improvement.
          </p>
        </div>

        <HeroVisual />
      </Container>
    </section>
  )
}
