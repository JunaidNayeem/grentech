import { Container } from "@/components/ui/container"

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Docker",
  "Stripe",
  "OpenAI / AI integrations",
]

export function TechEcosystem() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Modern technology, selected for the problem.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            We choose proven tools that balance speed, maintainability, performance, security, and long-term cost.
          </p>
        </div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface/50 px-5 py-2.5 text-sm font-medium text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
