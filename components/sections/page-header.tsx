import type React from "react"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/effects/reveal"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  /** Optional decorative visual (e.g. a TopicVisual) rendered beside the text on larger screens. */
  visual?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, children, visual }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-grid py-16 sm:py-20">
      <Container className={visual ? "grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]" : undefined}>
        <Reveal className="max-w-2xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>}
          {children}
        </Reveal>
        {visual && <div className="hidden lg:block">{visual}</div>}
      </Container>
    </section>
  )
}
