import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { ScopeExplorer } from "@/components/calculators/scope-explorer"

export const metadata: Metadata = {
  title: "Build your platform",
  description: "Answer a few questions and get a practical starting point for your software product.",
  alternates: { canonical: "/build-your-platform" },
}

export default function BuildYourPlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="FREE TOOL"
        title="Turn your software idea into a product blueprint."
        description="Answer a few questions and get a practical starting point for your product."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <ScopeExplorer />
        </Container>
      </section>
    </>
  )
}
