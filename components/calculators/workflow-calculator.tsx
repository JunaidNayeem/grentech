"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Printer } from "lucide-react"

import { StepShell } from "@/components/calculators/step-shell"
import { OptionCards } from "@/components/calculators/option-cards"
import { CheckboxCards } from "@/components/calculators/checkbox-cards"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  calculateWorkflowFriction,
  clampHourlyCost,
  clampHours,
  formatGBP,
  type ErrorFrequency,
  type TeamSizeBand,
} from "@/lib/calculations"
import {
  getImprovementLabel,
  getWorkflowCalculatorRecommendation,
  type DesiredOutcome,
  type FocusArea,
} from "@/lib/recommendations"
import {
  errorFrequencyOptions,
  focusAreaOptions,
  outcomeOptions,
  teamSizeOptions,
  toolOptions,
  type ToolInUse,
} from "@/data/workflow-calculator"
import { track } from "@/lib/analytics"

const CalculatorChart = dynamic(
  () => import("@/components/calculators/calculator-chart").then((mod) => mod.CalculatorChart),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-surface-raised" /> },
)

const TOTAL_STEPS = 7

interface CalculatorAnswers {
  teamSize?: TeamSizeBand
  weeklyHours: number
  hourlyCost: number
  tools: ToolInUse[]
  errorFrequency?: ErrorFrequency
  focusArea?: FocusArea
  outcome?: DesiredOutcome
}

const initialAnswers: CalculatorAnswers = {
  teamSize: undefined,
  weeklyHours: 5,
  hourlyCost: 25,
  tools: [],
  errorFrequency: undefined,
  focusArea: undefined,
  outcome: undefined,
}

const VALID_FRICTION_LEVELS: ErrorFrequency[] = ["rarely", "monthly", "weekly", "daily"]

export function WorkflowCalculator() {
  const searchParams = useSearchParams()
  const frictionParam = searchParams.get("friction")
  const prefillFriction = VALID_FRICTION_LEVELS.includes(frictionParam as ErrorFrequency)
    ? (frictionParam as ErrorFrequency)
    : undefined

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<CalculatorAnswers>({
    ...initialAnswers,
    errorFrequency: prefillFriction,
  })
  const [reportRequested, setReportRequested] = useState(false)

  useEffect(() => {
    track("workflow_calculator_started")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (step === TOTAL_STEPS) {
      track("workflow_calculator_result_viewed")
    }
  }, [step])

  function next() {
    if (step < TOTAL_STEPS) {
      track("workflow_calculator_step_completed", { step: step + 1 })
      setStep((s) => s + 1)
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  const isResults = step === TOTAL_STEPS
  const result =
    answers.teamSize && answers.errorFrequency
      ? calculateWorkflowFriction({
          teamSize: answers.teamSize,
          weeklyHoursPerPerson: answers.weeklyHours,
          hourlyCost: answers.hourlyCost,
          errorFrequency: answers.errorFrequency,
        })
      : null

  if (isResults && result && answers.focusArea && answers.outcome) {
    const recommendation = getWorkflowCalculatorRecommendation(answers.focusArea, answers.outcome)
    const improvementContext = getImprovementLabel(answers.errorFrequency!)

    return (
      <div id="calculator-report" className="space-y-10">
        <div aria-live="polite">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your results</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Based on your answers, manual coordination may be costing your team approximately{" "}
            <span className="text-brand">{formatGBP(result.annualManualCost)}</span> each year.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Creating one clear workflow could potentially return{" "}
            <strong className="text-foreground">
              {result.improvementPercentLow}–{result.improvementPercentHigh}%
            </strong>{" "}
            of that time to higher-value work — worth roughly{" "}
            <strong className="text-foreground">
              {formatGBP(result.potentialAnnualValueLow)} to {formatGBP(result.potentialAnnualValueHigh)}
            </strong>{" "}
            per year. This reflects {improvementContext}.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
          <CalculatorChart
            annualManualCost={result.annualManualCost}
            potentialLow={result.potentialAnnualValueLow}
            potentialHigh={result.potentialAnnualValueHigh}
          />
          <table className="mt-6 w-full text-left text-sm">
            <caption className="sr-only">Text equivalent of the workflow cost chart</caption>
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th scope="col" className="py-2 font-medium">
                  Measure
                </th>
                <th scope="col" className="py-2 font-medium">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="py-2 text-foreground">Estimated current annual manual-work cost</td>
                <td className="py-2 text-foreground">{formatGBP(result.annualManualCost)}</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 text-foreground">Potential opportunity (low estimate)</td>
                <td className="py-2 text-foreground">{formatGBP(result.potentialAnnualValueLow)}</td>
              </tr>
              <tr>
                <td className="py-2 text-foreground">Potential opportunity (high estimate)</td>
                <td className="py-2 text-foreground">{formatGBP(result.potentialAnnualValueHigh)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/40 p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">Main workflow priority</h3>
            <p className="mt-2 text-sm text-muted-foreground">{recommendation}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background/40 p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">Assumptions used</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>{teamSizeOptions.find((o) => o.value === answers.teamSize)?.label} (typical team size)</li>
              <li>{clampHours(answers.weeklyHours)} hours per person per week</li>
              <li>{formatGBP(clampHourlyCost(answers.hourlyCost))} average hourly cost</li>
              <li>48 working weeks per year</li>
            </ul>
          </div>
        </div>

        <p className="rounded-xl border border-amber/30 bg-amber/[0.06] p-4 text-sm text-amber">
          This is an illustrative estimate, not a guarantee. The best solution depends on your current process,
          systems, data, users, security needs, and delivery scope.
        </p>

        <div className="flex flex-wrap gap-3 print:hidden">
          <Button asChild size="lg">
            <Link
              href="/contact?source=workflow-calculator"
              onClick={() => track("workflow_calculator_contact_clicked")}
            >
              Book a discovery call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print / save report
          </Button>
        </div>

        <div className="print:hidden">
          {reportRequested ? (
            <p role="status" className="text-sm font-medium text-brand">
              Thanks — your detailed workflow opportunity report is on its way.
            </p>
          ) : (
            <LeadCaptureForm
              title="Get your detailed workflow opportunity report"
              description="We'll email a copy of this estimate along with tailored next steps."
              source="workflow-calculator"
              context={{ answers, result }}
              submitLabel="Send my report"
              onSuccess={() => {
                setReportRequested(true)
                track("workflow_calculator_report_requested")
              }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {prefillFriction && step === 0 && (
        <p className="mb-6 rounded-xl border border-brand/30 bg-brand/[0.06] p-4 text-sm text-brand">
          We&rsquo;ve carried your Workflow Rescue result into this calculator — your answers here are independent,
          but we&rsquo;ve pre-set the error frequency question to match.
        </p>
      )}
      {step === 0 && (
        <StepShell step={1} totalSteps={TOTAL_STEPS} title="Team size" onNext={next} nextDisabled={!answers.teamSize}>
          <OptionCards
            legend="How many people regularly work in this process?"
            name="team-size"
            options={teamSizeOptions}
            value={answers.teamSize}
            onChange={(value) => setAnswers((a) => ({ ...a, teamSize: value }))}
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell step={2} totalSteps={TOTAL_STEPS} title="Weekly hours" onBack={back} onNext={next}>
          <div>
            <Label htmlFor="weekly-hours" className="font-display text-lg font-semibold text-foreground">
              How many hours per person per week are spent on repetitive admin or manual coordination?
            </Label>
            <div className="mt-5 flex items-center gap-4">
              <input
                id="weekly-hours"
                type="range"
                min={0}
                max={20}
                step={1}
                value={answers.weeklyHours}
                onChange={(e) => setAnswers((a) => ({ ...a, weeklyHours: Number(e.target.value) }))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-brand"
                aria-describedby="weekly-hours-value"
              />
              <Input
                type="number"
                min={0}
                max={40}
                value={answers.weeklyHours}
                onChange={(e) => setAnswers((a) => ({ ...a, weeklyHours: Number(e.target.value) }))}
                className="w-24"
                aria-label="Weekly hours, entered as a number"
              />
            </div>
            <p id="weekly-hours-value" className="mt-2 text-sm text-muted-foreground">
              {answers.weeklyHours} hours per person, per week
            </p>
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell step={3} totalSteps={TOTAL_STEPS} title="Hourly cost" onBack={back} onNext={next}>
          <div>
            <Label htmlFor="hourly-cost" className="font-display text-lg font-semibold text-foreground">
              What is the approximate average hourly cost of this work?
            </Label>
            <div className="mt-5 flex items-center gap-2">
              <span className="text-lg text-muted-foreground">£</span>
              <Input
                id="hourly-cost"
                type="number"
                min={1}
                max={500}
                value={answers.hourlyCost}
                onChange={(e) => setAnswers((a) => ({ ...a, hourlyCost: Number(e.target.value) }))}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">per hour (default £25)</span>
            </div>
          </div>
        </StepShell>
      )}

      {step === 3 && (
        <StepShell step={4} totalSteps={TOTAL_STEPS} title="Tools in use" onBack={back} onNext={next}>
          <CheckboxCards
            legend="Which tools are currently involved?"
            name="tools"
            options={toolOptions}
            value={answers.tools}
            onChange={(value) => setAnswers((a) => ({ ...a, tools: value }))}
          />
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          step={5}
          totalSteps={TOTAL_STEPS}
          title="Error frequency"
          onBack={back}
          onNext={next}
          nextDisabled={!answers.errorFrequency}
        >
          <OptionCards
            legend="How often do delays, missed follow-ups, duplicate work, or data errors occur?"
            name="error-frequency"
            options={errorFrequencyOptions}
            value={answers.errorFrequency}
            onChange={(value) => setAnswers((a) => ({ ...a, errorFrequency: value }))}
          />
        </StepShell>
      )}

      {step === 5 && (
        <StepShell
          step={6}
          totalSteps={TOTAL_STEPS}
          title="Focus area"
          onBack={back}
          onNext={next}
          nextDisabled={!answers.focusArea}
        >
          <OptionCards
            legend="Which area needs the most improvement?"
            name="focus-area"
            options={focusAreaOptions}
            value={answers.focusArea}
            onChange={(value) => setAnswers((a) => ({ ...a, focusArea: value }))}
          />
        </StepShell>
      )}

      {step === 6 && (
        <StepShell
          step={7}
          totalSteps={TOTAL_STEPS}
          title="Desired outcome"
          onBack={back}
          onNext={next}
          nextLabel="See my results"
          nextDisabled={!answers.outcome}
        >
          <OptionCards
            legend="What outcome matters most?"
            name="outcome"
            options={outcomeOptions}
            value={answers.outcome}
            onChange={(value) => setAnswers((a) => ({ ...a, outcome: value }))}
          />
        </StepShell>
      )}
    </div>
  )
}
