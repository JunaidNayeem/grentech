"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { leadCaptureSchema, type LeadCaptureValues } from "@/lib/validations"
import { submitLeadCapture } from "@/app/contact/actions"

interface LeadCaptureFormProps {
  title: string
  description: string
  source: string
  context?: Record<string, unknown>
  onSuccess?: () => void
  submitLabel?: string
  successMessage?: string
}

export function LeadCaptureForm({
  title,
  description,
  source,
  context,
  onSuccess,
  submitLabel = "Send me the report",
  successMessage = "Thanks — check your inbox shortly.",
}: LeadCaptureFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadCaptureValues>({ resolver: zodResolver(leadCaptureSchema) })

  async function onSubmit(values: LeadCaptureValues) {
    setStatus("submitting")
    const result = await submitLeadCapture({ ...values, source, context })
    if (result.success) {
      setStatus("success")
      onSuccess?.()
    } else {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 text-center">
        <CheckCircle2 className="mx-auto h-6 w-6 text-brand" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium text-foreground">{successMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="lead-name">Name</Label>
          <Input id="lead-name" className="mt-1.5" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-coral">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="lead-email">Work email</Label>
          <Input id="lead-email" type="email" className="mt-1.5" aria-invalid={!!errors.workEmail} {...register("workEmail")} />
          {errors.workEmail && <p className="mt-1 text-xs text-coral">{errors.workEmail.message}</p>}
        </div>
        <div>
          <Label htmlFor="lead-company">Company name</Label>
          <Input id="lead-company" className="mt-1.5" aria-invalid={!!errors.companyName} {...register("companyName")} />
          {errors.companyName && <p className="mt-1 text-xs text-coral">{errors.companyName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lead-phone">Phone (optional)</Label>
          <Input id="lead-phone" type="tel" className="mt-1.5" {...register("phone")} />
        </div>
        <div className="sm:col-span-2">
          {status === "error" && (
            <p role="alert" className="mb-3 text-sm text-coral">
              Something went wrong. Please try again.
            </p>
          )}
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
