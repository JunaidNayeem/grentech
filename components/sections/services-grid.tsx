import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { services } from "@/data/services"

export function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          From idea to dependable software.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.slug}
                className="group relative rounded-2xl border border-border bg-surface/50 p-8 transition-colors hover:border-border-strong hover:bg-surface-raised"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
                <Link
                  href={`/services#${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:underline"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
