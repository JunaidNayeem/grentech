import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/effects/reveal"
import { TiltCard } from "@/components/effects/tilt-card"
import { services } from "@/data/services"
import { cn } from "@/lib/utils"

export function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From idea to{" "}
            <span className="bg-gradient-to-r from-brand to-lime bg-clip-text text-transparent">
              dependable software.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.slug} delay={index * 0.08} className={cn(index % 2 === 1 && "sm:translate-y-6")}>
                <TiltCard className="group relative h-full rounded-2xl border border-border bg-surface/50 p-8 transition-colors hover:border-brand/40 hover:bg-surface-raised">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-teal/10 ring-1 ring-inset ring-brand/20">
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:underline"
                  >
                    Learn more
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
