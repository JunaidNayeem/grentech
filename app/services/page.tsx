import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Layers } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, cardVariants } from "@/components/ui/card"
import { PageHeader } from "@/components/sections/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { ServicesScene } from "@/components/three/scene-loaders"
import { services, engagementOptions, servicesFaq } from "@/data/services"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Services",
  description:
    "SaaS product development, bespoke business platforms, AI and workflow automation, and product modernisation from Grentech.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICES"
        title="From idea to dependable software."
        description="Whatever stage your product or platform is at, we bring product strategy, design, and engineering together under one roof."
        visual={<TopicVisual Scene={ServicesScene} fallback={<TopicFallback icon={Layers} color="brand" />} />}
      />

      <section className="py-16 sm:py-20">
        <Container className="space-y-16">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.slug}
                id={service.slug}
                tone="neutral"
                padding="lg"
                className="scroll-mt-24 grid gap-8 sm:p-10 lg:grid-cols-[1fr_1.3fr]"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <p className="mt-4 text-sm font-medium text-foreground">Best for: {service.bestFor}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Outcomes</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {service.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Example deliverables</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )
          })}
        </Container>
      </section>

      <section className="border-t border-border bg-surface/30 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Ways to work with us</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Different problems call for different engagement models. Here&rsquo;s how to choose.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {engagementOptions.map((option) => (
              <div key={option.name} className={cn(cardVariants({ tone: "neutral" }), "bg-background/40")}>
                <h3 className="font-display text-lg font-semibold text-foreground">{option.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.summary}</p>
                <p className="mt-4 text-sm font-medium text-brand">Best when: {option.bestWhen}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-8">
            {servicesFaq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Ready to talk through your project?
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
