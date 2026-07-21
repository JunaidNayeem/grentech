import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { WorkflowRescueGame } from "@/components/games/workflow-rescue-game"

export const metadata: Metadata = {
  title: "Workflow Rescue",
  description: "Your team is growing. Your workflow is not. Fix the operational chaos before the week ends.",
  alternates: { canonical: "/workflow-rescue" },
}

export default function WorkflowRescuePage() {
  return (
    <>
      <PageHeader
        eyebrow="INTERACTIVE · WORKFLOW RESCUE"
        title="Workflow Rescue"
        description="Your team is growing. Your workflow is not. Fix the operational chaos before the week ends."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <WorkflowRescueGame />
        </Container>
      </section>
    </>
  )
}
