"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Printer } from "lucide-react"

import { StepShell } from "@/components/calculators/step-shell"
import { OptionCards } from "@/components/calculators/option-cards"
import { CheckboxCards } from "@/components/calculators/checkbox-cards"
import { ProductBlueprint } from "@/components/calculators/product-blueprint"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { Button } from "@/components/ui/button"
import {
  audienceOptions,
  capabilityOptions,
  productTypeBaseModules,
  productTypeOptions,
  scaleOptions,
  timelineOptions,
} from "@/data/product-scope"
import {
  AUDIENCE_LABEL,
  CAPABILITY_LABEL,
  ENGAGEMENT_DESCRIPTION,
  getEngagementRecommendation,
  PRODUCT_TYPE_LABEL,
  SCALE_LABEL,
  TIMELINE_LABEL,
  type Capability,
  type ProductType,
  type ScaleBand,
  type Timeline,
  type UserAudience,
} from "@/lib/recommendations"
import { track } from "@/lib/analytics"

const TOTAL_STEPS = 5

interface ScopeAnswers {
  productType?: ProductType
  audience?: UserAudience
  capabilities: Capability[]
  scale?: ScaleBand
  timeline?: Timeline
}

export function ScopeExplorer() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<ScopeAnswers>({ capabilities: [] })
  const [briefRequested, setBriefRequested] = useState(false)

  useEffect(() => {
    track("product_scope_started")
  }, [])

  useEffect(() => {
    if (step === TOTAL_STEPS) track("product_scope_result_viewed")
  }, [step])

  function next() {
    track("product_scope_step_completed", { step: step + 1 })
    setStep((s) => Math.min(TOTAL_STEPS, s + 1))
  }
  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  const isResults = step === TOTAL_STEPS

  if (isResults && answers.productType && answers.audience && answers.scale && answers.timeline) {
    const engagement = getEngagementRecommendation({
      productType: answers.productType,
      audience: answers.audience,
      capabilities: answers.capabilities,
      scale: answers.scale,
      timeline: answers.timeline,
    })

    const modules = [
      ...productTypeBaseModules[answers.productType],
      ...answers.capabilities.map((c) => CAPABILITY_LABEL[c]),
    ]

    return (
      <div className="space-y-10">
        <div aria-live="polite">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your blueprint</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            A {PRODUCT_TYPE_LABEL[answers.productType]} for {AUDIENCE_LABEL[answers.audience].toLowerCase()}
          </h2>
        </div>

        <ProductBlueprint modules={modules} />

        <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-foreground">Your platform could include</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {modules.map((module) => (
              <li key={module} className="flex items-center gap-2 text-sm text-foreground">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {module}
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-medium text-muted-foreground">Audience</dt>
              <dd className="mt-1 text-foreground">{AUDIENCE_LABEL[answers.audience]}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Expected scale</dt>
              <dd className="mt-1 text-foreground">{SCALE_LABEL[answers.scale]}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Timeline</dt>
              <dd className="mt-1 text-foreground">{TIMELINE_LABEL[answers.timeline]}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">Recommended starting point</span>
          <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{engagement}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ENGAGEMENT_DESCRIPTION[engagement]}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            We don&rsquo;t show fixed prices here — final scope and cost always follow a short discovery conversation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 print:hidden">
          <Button asChild size="lg">
            <Link href="/contact?source=build-your-platform" onClick={() => track("product_scope_contact_clicked")}>
              Book a discovery call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print / save brief
          </Button>
        </div>

        <div className="print:hidden">
          {briefRequested ? (
            <p role="status" className="text-sm font-medium text-brand">
              Thanks — your product brief is on its way by email.
            </p>
          ) : (
            <LeadCaptureForm
              title="Email me this product brief"
              description="We'll send this blueprint to your inbox along with next steps."
              source="build-your-platform"
              context={{ answers, engagement }}
              submitLabel="Email my brief"
              onSuccess={() => {
                setBriefRequested(true)
                track("product_scope_brief_requested")
              }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {step === 0 && (
        <StepShell
          step={1}
          totalSteps={TOTAL_STEPS}
          title="Product type"
          onNext={next}
          nextDisabled={!answers.productType}
        >
          <OptionCards
            legend="What are you building?"
            name="product-type"
            options={productTypeOptions}
            value={answers.productType}
            onChange={(value) => setAnswers((a) => ({ ...a, productType: value }))}
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell
          step={2}
          totalSteps={TOTAL_STEPS}
          title="Audience"
          onBack={back}
          onNext={next}
          nextDisabled={!answers.audience}
        >
          <OptionCards
            legend="Who will use it?"
            name="audience"
            options={audienceOptions}
            value={answers.audience}
            onChange={(value) => setAnswers((a) => ({ ...a, audience: value }))}
          />
        </StepShell>
      )}

      {step === 2 && (
        <StepShell step={3} totalSteps={TOTAL_STEPS} title="Capabilities" onBack={back} onNext={next}>
          <CheckboxCards
            legend="Which capabilities matter?"
            name="capabilities"
            options={capabilityOptions}
            value={answers.capabilities}
            onChange={(value) => setAnswers((a) => ({ ...a, capabilities: value }))}
          />
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          step={4}
          totalSteps={TOTAL_STEPS}
          title="Scale"
          onBack={back}
          onNext={next}
          nextDisabled={!answers.scale}
        >
          <OptionCards
            legend="Expected scale"
            name="scale"
            options={scaleOptions}
            value={answers.scale}
            onChange={(value) => setAnswers((a) => ({ ...a, scale: value }))}
          />
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          step={5}
          totalSteps={TOTAL_STEPS}
          title="Timeline"
          onBack={back}
          onNext={next}
          nextLabel="See my blueprint"
          nextDisabled={!answers.timeline}
        >
          <OptionCards
            legend="Timeline"
            name="timeline"
            options={timelineOptions}
            value={answers.timeline}
            onChange={(value) => setAnswers((a) => ({ ...a, timeline: value }))}
          />
        </StepShell>
      )}
    </div>
  )
}
