import { Target, ShieldCheck, MessagesSquare, Accessibility } from "lucide-react"

import { Container } from "@/components/ui/container"

const values = [
  {
    icon: Target,
    title: "Product-first",
    description: "We focus on the problem, adoption, and business outcome — not simply a feature list.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    description: "Maintainable architecture, clear documentation, security-minded delivery, and scalable foundations.",
  },
  {
    icon: MessagesSquare,
    title: "Clear collaboration",
    description: "Regular demos, visible priorities, and straightforward communication from start to finish.",
  },
  {
    icon: Accessibility,
    title: "Inclusive by design",
    description: "Accessible, responsive, understandable products built for real people and real-world use.",
  },
]

export function WhyGrentech() {
  return (
    <section className="border-t border-border bg-surface/30 py-20 sm:py-28">
      <Container>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Senior thinking. Practical delivery.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-border bg-background/40 p-6">
              <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm font-medium text-brand">
          Accessibility is a core product quality, not a final checklist.
        </p>
      </Container>
    </section>
  )
}
