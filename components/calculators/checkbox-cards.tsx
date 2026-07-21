"use client"

import type { LucideIcon } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Option<T extends string> {
  value: T
  label: string
  icon?: LucideIcon
}

interface CheckboxCardsProps<T extends string> {
  legend: string
  name: string
  options: Option<T>[]
  value: T[]
  onChange: (value: T[]) => void
  columns?: 1 | 2
}

export function CheckboxCards<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: CheckboxCardsProps<T>) {
  function toggle(optionValue: T, checked: boolean) {
    if (checked) {
      onChange([...value, optionValue])
    } else {
      onChange(value.filter((item) => item !== optionValue))
    }
  }

  return (
    <fieldset>
      <legend className="font-display text-lg font-semibold text-foreground">{legend}</legend>
      <div className={cn("mt-4 grid gap-3", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const id = `${name}-${option.value}`
          const isSelected = value.includes(option.value)
          const Icon = option.icon
          return (
            <Label
              key={option.value}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                isSelected
                  ? "border-brand/50 bg-brand/[0.07]"
                  : "border-border bg-transparent hover:border-border-strong hover:bg-surface/40",
              )}
            >
              <Checkbox
                id={id}
                checked={isSelected}
                onCheckedChange={(checked) => toggle(option.value, checked === true)}
              />
              {Icon && <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
              <span className="text-sm font-semibold text-foreground">{option.label}</span>
            </Label>
          )
        })}
      </div>
    </fieldset>
  )
}
