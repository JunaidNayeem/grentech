import type { Metadata } from "next"

import { Hero } from "@/components/sections/hero"
import { CredibilityStrip } from "@/components/sections/credibility-strip"
import { ProblemToProduct } from "@/components/sections/before-after"
import { ServicesGrid } from "@/components/sections/services-grid"
import { FeaturedWork } from "@/components/sections/featured-work"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { WhyGrentech } from "@/components/sections/why-grentech"
import { TechEcosystem } from "@/components/sections/tech-ecosystem"
import { InsightsPreview } from "@/components/sections/insights-preview"
import { FinalCta } from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: "Grentech | SaaS Platforms, AI Workflows & Bespoke Software",
  description:
    "Grentech designs and builds scalable SaaS platforms, internal tools, AI workflows, and bespoke software for ambitious teams.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <ProblemToProduct />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessTimeline />
      <WhyGrentech />
      <TechEcosystem />
      <InsightsPreview />
      <FinalCta />
    </>
  )
}
