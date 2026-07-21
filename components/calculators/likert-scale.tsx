"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface LikertScaleProps {
  name: string
  question: string
  lowLabel: string
  highLabel: string
  value: number | undefined
  onChange: (value: number) => void
}

const SCALE = [1, 2, 3, 4, 5]

export function LikertScale({ name, question, lowLabel, highLabel, value, onChange }: LikertScaleProps) {
  return (
    <fieldset className="rounded-2xl border border-border bg-surface/40 p-6">
      <legend className="font-display text-base font-semibold text-foreground">{question}</legend>
      <RadioGroup
        value={value?.toString()}
        onValueChange={(next) => onChange(Number(next))}
        className="mt-5 flex items-center justify-between gap-2"
      >
        {SCALE.map((point) => {
          const id = `${name}-${point}`
          const isSelected = value === point
          return (
            <Label
              key={point}
              htmlFor={id}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors",
                isSelected
                  ? "border-brand/50 bg-brand/[0.08]"
                  : "border-border bg-transparent hover:border-border-strong",
              )}
            >
              <RadioGroupItem value={point.toString()} id={id} />
              <span className="text-sm font-semibold text-foreground">{point}</span>
            </Label>
          )
        })}
      </RadioGroup>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </fieldset>
  )
}
