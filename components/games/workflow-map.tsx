const NODES = [
  { id: "customer", label: "Customer", x: 10, y: 20 },
  { id: "team", label: "Team", x: 50, y: 10 },
  { id: "task", label: "Task", x: 90, y: 20 },
  { id: "approval", label: "Approval", x: 20, y: 55 },
  { id: "system", label: "System", x: 50, y: 50 },
  { id: "dashboard", label: "Dashboard", x: 80, y: 55 },
  { id: "automation", label: "Automation", x: 50, y: 88 },
] as const

const CONNECTIONS: Array<[string, string]> = [
  ["customer", "team"],
  ["team", "task"],
  ["team", "approval"],
  ["team", "system"],
  ["system", "dashboard"],
  ["approval", "system"],
  ["system", "automation"],
  ["dashboard", "automation"],
]

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!
}

export function WorkflowMap({ overallScore }: { overallScore: number }) {
  const activeConnections = Math.round((overallScore / 100) * CONNECTIONS.length)

  return (
    <div aria-hidden="true" className="relative rounded-2xl border border-border bg-grid p-6">
      <svg viewBox="0 0 100 100" className="h-56 w-full overflow-visible">
        {CONNECTIONS.map(([from, to], index) => {
          const a = nodeById(from)
          const b = nodeById(to)
          const isActive = index < activeConnections
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isActive ? "#36E39A" : "#F26E62"}
              strokeOpacity={isActive ? 0.7 : 0.25}
              strokeWidth={isActive ? 1 : 0.6}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          )
        })}
        {NODES.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={4.5} fill="#10231E" stroke="#36E39A" strokeWidth={0.8} />
            <text x={node.x} y={node.y + 9} textAnchor="middle" fontSize="4" fill="#A6B8B1">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
