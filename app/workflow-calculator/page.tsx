import type { Metadata } from "next"
import { Suspense } from "react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { WorkflowCalculator } from "@/components/calculators/workflow-calculator"

export const metadata: Metadata = {
  title: "Workflow Friction Calculator",
  description: "Find out what manual processes may be costing your team, and where a bespoke platform could help.",
  alternates: { canonical: "/workflow-calculator" },
}

export default function WorkflowCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="FREE TOOL"
        title="Workflow Friction Calculator"
        description="Find out what manual processes may be costing your team."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading calculator…</div>}>
            <WorkflowCalculator />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
