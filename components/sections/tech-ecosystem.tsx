import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/effects/reveal"
import { Marquee } from "@/components/effects/marquee"

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
    <Section density="marketing" className="overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Modern technology, selected for the problem.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            We choose proven tools that balance speed, maintainability, performance, security, and long-term cost.
          </p>
        </Reveal>
      </Container>

      <div className="mt-12">
        <Marquee
          items={technologies.map((tech) => (
            <span
              key={tech}
              className="whitespace-nowrap rounded-full border border-border bg-surface/50 px-5 py-2.5 text-sm font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
        />
      </div>
    </Section>
  )
}
