"use client"

import type React from "react"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface StepShellProps {
  step: number
  totalSteps: number
  title: string
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  children: React.ReactNode
}

export function StepShell({
  step,
  totalSteps,
  title,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  children,
}: StepShellProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span aria-hidden="true">{Math.round((step / totalSteps) * 100)}%</span>
      </div>
      <Progress value={(step / totalSteps) * 100} className="mt-2 h-1.5" />

      <div aria-live="polite" className="sr-only">
        Step {step} of {totalSteps}: {title}
      </div>

      <div className="mt-8">{children}</div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="button" onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
