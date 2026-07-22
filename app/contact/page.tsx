import type { Metadata } from "next"
import { Suspense } from "react"
import { CalendarClock, Send } from "lucide-react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/sections/page-header"
import { ContactForm } from "@/components/forms/contact-form"
import { TopicVisual } from "@/components/three/topic-visual"
import { TopicFallback } from "@/components/three/topic-fallback"
import { ContactScene } from "@/components/three/scene-loaders"
import { SITE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Grentech what you're looking to build and book a discovery call.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="START A PROJECT"
        title="Tell us what you're building."
        description="Share a few details about your project and we'll be in touch to arrange a discovery call."
        visual={<TopicVisual Scene={ContactScene} fallback={<TopicFallback icon={Send} color="lime" />} />}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading form…</div>}>
            <ContactForm />
          </Suspense>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <CalendarClock className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground">Prefer to book directly?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A calendar booking link will appear here once connected. In the meantime, submit the form and
                we&rsquo;ll reach out to schedule a time that works for you.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Prefer email?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Your information is used only to respond to your enquiry. We aim to respond within two working days.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
