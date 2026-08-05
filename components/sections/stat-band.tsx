import { Container } from "@/components/ui/container"

export interface StatBandItem {
  /** The numeral itself, e.g. "12+", "48hrs", "99.9%" - already formatted, not computed here. */
  value: string
  label: string
}

interface StatBandProps {
  stats: StatBandItem[]
}

/**
 * A row of 3-4 real, specific proof numbers - NDL's "specificity is the voice"
 * stat band. Renders nothing if no stats are supplied: this component must
 * never be filled with placeholder or invented figures (see AUDIT.md 9b).
 */
export function StatBand({ stats }: StatBandProps) {
  if (stats.length === 0) return null

  return (
    <section className="border-y border-border bg-surface/40 py-10">
      <Container>
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center sm:border-l sm:border-border sm:pl-6 sm:text-left"
              style={index === 0 ? { borderLeft: "none", paddingLeft: 0 } : undefined}
            >
              <dd className="font-mono text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
