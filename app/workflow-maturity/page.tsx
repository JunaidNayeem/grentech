import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { MaturityAssessment } from "@/components/calculators/maturity-assessment"

export const metadata: Metadata = {
  title: "Workflow Maturity Assessment",
  description: "An indicative assessment of your operation's process maturity and software readiness.",
  alternates: { canonical: "/workflow-maturity" },
}

export default function WorkflowMaturityPage() {
  return (
    <>
      <PageHeader
        eyebrow="FREE TOOL"
        title="Is your operation ready for a better system?"
        description="Answer ten short questions about how your team currently operates to get an indicative maturity score and practical recommendations."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <MaturityAssessment />
        </Container>
      </section>
    </>
  )
}
