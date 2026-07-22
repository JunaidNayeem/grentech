import { Compass, Accessibility, Code2, ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/effects/reveal"

const markers = [
  { icon: Compass, label: "Product strategy" },
  { icon: Accessibility, label: "UX and accessibility" },
  { icon: Code2, label: "Full-stack engineering" },
  { icon: ShieldCheck, label: "Secure cloud delivery" },
]

export function CredibilityStrip() {
  return (
    <section className="border-y border-border bg-surface/40 py-10">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium text-muted-foreground">
            Built for ambitious teams solving real operational problems.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {markers.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-teal/10">
                  <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
