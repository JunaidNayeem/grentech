import type React from "react"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-grid py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
