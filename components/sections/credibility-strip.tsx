import { Compass, Accessibility, Code2, ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"

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
        <p className="text-center text-sm font-medium text-muted-foreground">
          Built for ambitious teams solving real operational problems.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {markers.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
