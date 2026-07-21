import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { SITE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing the use of the Grentech website.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="LEGAL" title="Terms of use" />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <p>
            These terms govern your use of the Grentech website. By using this site, you agree to the terms below.
            Separate terms apply to any commercial engagement with Grentech, agreed directly with clients.
          </p>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Website content</h2>
            <p className="mt-3">
              Content on this site, including copy, illustrative case studies, calculators, and interactive tools, is
              provided for informational purposes. Illustrative project examples are clearly labelled and do not
              represent named client work unless stated otherwise.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Interactive tools and estimates</h2>
            <p className="mt-3">
              The Workflow Friction Calculator, Product Scope Explorer, Workflow Maturity Assessment, and Workflow
              Rescue game produce illustrative, indicative output based on the information you provide. None of these
              tools guarantee savings, outcomes, project cost, or timelines. The right solution for your organisation
              depends on discovery specific to your circumstances.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Intellectual property</h2>
            <p className="mt-3">
              Unless otherwise stated, the design, code structure, and copy on this site belong to Grentech and may
              not be reproduced without permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Liability</h2>
            <p className="mt-3">
              This site is provided &ldquo;as is&rdquo;. While we take reasonable care to keep it accurate and available, we make
              no warranty that it will be uninterrupted or error-free.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
