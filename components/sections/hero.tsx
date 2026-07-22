import Link from "next/link"
import { ArrowRight, Gamepad2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { WebGLHero } from "@/components/three/webgl-hero"
import { GradientBlobs } from "@/components/effects/gradient-blobs"
import { CustomCursor } from "@/components/effects/custom-cursor"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <CustomCursor />
      <GradientBlobs variant="hero" />
      <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-brand">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            PRODUCT STUDIO · SAAS · AI WORKFLOWS
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build software that{" "}
            <span className="bg-gradient-to-r from-brand via-lime to-teal bg-clip-text text-transparent">
              moves your business forward.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Grentech designs and engineers scalable SaaS platforms, internal tools, and intelligent workflows for
            ambitious teams ready to replace manual work with better systems.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Book a discovery call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

        <WebGLHero />
      </Container>
    </section>
  )
}
