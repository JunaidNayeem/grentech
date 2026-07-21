import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { SITE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Grentech collects, uses, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="LEGAL" title="Privacy policy" />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <p>
            This policy explains what information Grentech collects through this website, why, and how it is used.
            We collect only what is necessary to respond to enquiries and improve the site.
          </p>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Information we collect</h2>
            <p className="mt-3">
              When you submit a contact form, calculator, assessment, or game report request, we collect the details
              you provide — such as your name, work email, company name, and the content of your enquiry, including
              any answers to our interactive tools that you choose to attach to that enquiry.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-3">
              Your information is used only to respond to your enquiry, understand the context behind it, and, where
              relevant, to send the report or brief you requested. We do not sell your information, and we do not use
              it for purposes unrelated to responding to you.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Analytics</h2>
            <p className="mt-3">
              We may use lightweight, privacy-conscious analytics to understand how the site and interactive tools are
              used in aggregate. These events do not include personal information such as your name, email address, or
              phone number.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Your rights</h2>
            <p className="mt-3">
              You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete
              it. Contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">
                {SITE.email}
              </a>{" "}
              to make a request.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              Grentech is based in the United Kingdom. Questions about this policy can be sent to{" "}
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
