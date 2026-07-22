import type { Metadata } from "next"
import { Lightbulb } from "lucide-react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { InsightsGrid } from "@/components/sections/insights-grid"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { InsightsScene } from "@/components/three/scene-loaders"
import { insights } from "@/data/insights"

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical thinking on SaaS validation, operational risk, and product adoption from the Grentech team.",
  alternates: { canonical: "/insights" },
}

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="INSIGHTS"
        title="Thinking beyond the build."
        description="Practical perspectives on product strategy, operations, and building software people actually adopt."
        visual={<TopicVisual Scene={InsightsScene} fallback={<TopicFallback icon={Lightbulb} color="amber" />} />}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <InsightsGrid insights={insights} />
          <div className="mt-14 max-w-xl">
            <NewsletterSignup />
          </div>
        </Container>
      </section>
    </>
  )
}
