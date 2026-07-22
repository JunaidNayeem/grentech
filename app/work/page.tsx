import type { Metadata } from "next"
import { LayoutGrid } from "lucide-react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { WorkGrid } from "@/components/case-studies/work-grid"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { WorkScene } from "@/components/three/scene-loaders"
import { caseStudies } from "@/data/case-studies"

export const metadata: Metadata = {
  title: "Our work",
  description: "Illustrative examples of the SaaS platforms, bespoke tools, and workflow products Grentech designs and builds.",
  alternates: { canonical: "/work" },
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="OUR WORK"
        title="Software with a job to do."
        description="These examples are illustrative — built to show the kind of platforms Grentech designs and engineers. They will be replaced with real client case studies as soon as we have explicit permission to publish them."
        visual={<TopicVisual Scene={WorkScene} fallback={<TopicFallback icon={LayoutGrid} color="lime" />} />}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <WorkGrid studies={caseStudies} />
        </Container>
      </section>
    </>
  )
}
