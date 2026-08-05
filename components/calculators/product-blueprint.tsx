import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductBlueprint({ modules }: { modules: string[] }) {
  return (
    <Card aria-hidden="true" tone="neutral" padding="lg" className="relative bg-grid">
      <div className="flex flex-wrap justify-center gap-3">
        {modules.map((module, index) => (
          <Badge
            key={module}
            variant="brand"
            size="lg"
            className="animate-float-slow border border-brand/30 bg-gradient-to-br from-brand/15 to-teal/5 shadow-sm"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {module}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
