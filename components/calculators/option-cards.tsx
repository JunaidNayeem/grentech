"use client"

import type { LucideIcon } from "lucide-react"
import { Check } from "lucide-react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Option<T extends string> {
  value: T
  label: string
  description?: string
  icon?: LucideIcon
}

interface OptionCardsProps<T extends string> {
  legend: string
  name: string
  options: Option<T>[]
  value: T | undefined
  onChange: (value: T) => void
  columns?: 1 | 2
}

export function OptionCards<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: OptionCardsProps<T>) {
  return (
    <fieldset>
      <legend className="font-display text-lg font-semibold text-foreground">{legend}</legend>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as T)}
        className={cn("mt-4 grid gap-3", columns === 2 && "sm:grid-cols-2")}
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`
          const isSelected = value === option.value
          const Icon = option.icon
          return (
            <Label
              key={option.value}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                isSelected
                  ? "border-brand/50 bg-brand/[0.07]"
                  : "border-border bg-transparent hover:border-border-strong hover:bg-surface/40",
              )}
            >
              <RadioGroupItem value={option.value} id={id} className="mt-0.5" />
              {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {option.label}
                  {isSelected && <Check className="ml-1.5 inline h-3.5 w-3.5 text-brand" aria-hidden="true" />}
                </span>
                {option.description && (
                  <span className="mt-1 block text-xs text-muted-foreground">{option.description}</span>
                )}
              </span>
            </Label>
          )
        })}
      </RadioGroup>
    </fieldset>
  )
}
