"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { formatINR } from "@/lib/calculations"

interface CalculatorChartProps {
  annualManualCost: number
  potentialLow: number
  potentialHigh: number
}

export function CalculatorChart({ annualManualCost, potentialLow, potentialHigh }: CalculatorChartProps) {
  const data = [
    { name: "Current manual cost", value: Math.round(annualManualCost) },
    { name: "Potential opportunity (low)", value: Math.round(potentialLow) },
    { name: "Potential opportunity (high)", value: Math.round(potentialHigh) },
  ]

  return (
    <div aria-hidden="true" className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 16% 24%)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#A6B8B1", fontSize: 11 }} interval={0} tickLine={false} />
          <YAxis tickFormatter={(value) => formatINR(value)} tick={{ fill: "#A6B8B1", fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
          <Tooltip
            formatter={(value: number) => formatINR(value)}
            contentStyle={{ background: "#0E1D19", border: "1px solid hsl(160 16% 24%)", borderRadius: 8, color: "#F4FAF7" }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#36E39A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
