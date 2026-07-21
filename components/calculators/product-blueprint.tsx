export function ProductBlueprint({ modules }: { modules: string[] }) {
  return (
    <div aria-hidden="true" className="relative rounded-2xl border border-border bg-grid p-8">
      <div className="flex flex-wrap justify-center gap-3">
        {modules.map((module, index) => (
          <div
            key={module}
            className="animate-float-slow rounded-xl border border-brand/30 bg-gradient-to-br from-brand/15 to-teal/5 px-4 py-3 text-center text-xs font-semibold text-foreground shadow-sm"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {module}
          </div>
        ))}
      </div>
    </div>
  )
}
