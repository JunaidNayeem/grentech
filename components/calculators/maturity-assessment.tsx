"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight, Printer } from "lucide-react"

import { LikertScale } from "@/components/calculators/likert-scale"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { maturityQuestions } from "@/data/workflow-maturity"
import { calculateMaturityScore } from "@/lib/calculations"
import { getMaturityBand } from "@/lib/recommendations"
import { track } from "@/lib/analytics"

export function MaturityAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reportRequested, setReportRequested] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!started.current) {
      track("workflow_maturity_started")
      started.current = true
    }
  }, [])

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === maturityQuestions.length

  function handleSubmit() {
    if (!allAnswered) return
    track("workflow_maturity_completed")
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted) {
      track("workflow_maturity_result_viewed")
      resultsRef.current?.focus()
    }
  }, [submitted])

  if (submitted) {
    const score = calculateMaturityScore(Object.values(answers))
    const band = getMaturityBand(score)

    return (
      <div
        ref={resultsRef}
        tabIndex={-1}
        className="space-y-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <div aria-live="polite">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your result</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">{band.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">Indicative score: {score} / 100</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{band.description}</p>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-surface-raised" role="img" aria-label={`Score ${score} out of 100`}>
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${score}%` }} />
        </div>

        <Card tone="neutral" padding="lg" className="sm:p-8">
          <h3 className="font-display text-lg font-semibold text-foreground">Practical recommendations</h3>
          <ul className="mt-4 space-y-3">
            {band.recommendations.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="brand" padding="lg" className="sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">Suggested next step</span>
          <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{band.engagement}</h3>
        </Card>

        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This is an indicative assessment, not a definitive diagnosis. It&rsquo;s designed to prompt useful conversation,
            not replace a proper discovery process.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-3 print:hidden">
          <Button asChild size="lg">
            <Link href="/contact?source=workflow-maturity" onClick={() => track("workflow_maturity_contact_clicked")}>
              Book a discovery call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print / save results
          </Button>
        </div>

        <div className="print:hidden">
          {reportRequested ? (
            <p role="status" className="text-sm font-medium text-brand">
              Thanks — your full results are on their way by email.
            </p>
          ) : (
            <LeadCaptureForm
              title="Email me my full results"
              description="We'll send this assessment and your tailored recommendations to your inbox."
              source="workflow-maturity"
              context={{ answers, score, band: band.key }}
              submitLabel="Email my results"
              onSuccess={() => setReportRequested(true)}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-5">
        {maturityQuestions.map((question) => (
          <LikertScale
            key={question.id}
            name={question.id}
            question={question.question}
            lowLabel={question.lowLabel}
            highLabel={question.highLabel}
            value={answers[question.id]}
            onChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" role="status">
          {answeredCount} of {maturityQuestions.length} answered
        </p>
        <Button size="lg" onClick={handleSubmit} disabled={!allAnswered}>
          See my result
        </Button>
      </div>
    </div>
  )
}
