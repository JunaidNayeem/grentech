"use client"

import { useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { budgetRanges, contactFormSchema, timelineOptions, type ContactFormValues } from "@/lib/validations"
import { submitContactForm } from "@/app/contact/actions"
import { track } from "@/lib/analytics"
import { CONTACT_RESPONSE_TIME } from "@/lib/constants"

interface ContactFormProps {
  /** Pre-attached structured context from an interactive tool, e.g. calculator answers or a game score. */
  prefillContext?: Record<string, unknown>
}

export function ContactForm({ prefillContext }: ContactFormProps) {
  const searchParams = useSearchParams()
  const source = searchParams.get("source") ?? "contact-page"

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [serverError, setServerError] = useState<string | null>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      budgetRange: undefined,
      timeline: undefined,
      source,
      context: prefillContext,
    },
  })

  const errorEntries = Object.entries(errors) as Array<[keyof ContactFormValues, { message?: string }]>

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting")
    setServerError(null)

    const result = await submitContactForm({ ...values, source, context: prefillContext })

    if (result.success) {
      setStatus("success")
      track("contact_form_submitted", { source })
    } else {
      setStatus("error")
      setServerError(result.error ?? "Something went wrong. Please try again.")
      errorSummaryRef.current?.focus()
    }
  }

  function onInvalid() {
    const first = Object.keys(errors)[0] as keyof ContactFormValues | undefined
    if (first) setFocus(first)
    errorSummaryRef.current?.focus()
  }

  if (status === "success") {
    return (
      <Card role="status" tone="brand" padding="lg" className="text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Thanks — your message is with us.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{CONTACT_RESPONSE_TIME}</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-6">
      {errorEntries.length > 0 && (
        <Alert
          ref={errorSummaryRef}
          tabIndex={-1}
          variant="destructive"
          className="border-coral/40 bg-coral/[0.06] text-coral [&>svg]:text-coral"
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>
            <span className="font-semibold">Please fix the following before submitting</span>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {errorEntries.map(([field, error]) => (
                <li key={field}>
                  <a href={`#field-${field}`} className="underline underline-offset-2">
                    {error.message}
                  </a>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {serverError && (
        <Alert variant="destructive" className="border-coral/40 bg-coral/[0.06] text-coral [&>svg]:text-coral">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="field-name">Name</Label>
          <Input id="field-name" className="mt-2" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} {...register("name")} />
          {errors.name && (
            <p id="error-name" className="mt-1.5 text-sm text-coral">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="field-workEmail">Work email</Label>
          <Input
            id="field-workEmail"
            type="email"
            className="mt-2"
            autoComplete="email"
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? "error-workEmail" : undefined}
            {...register("workEmail")}
          />
          {errors.workEmail && (
            <p id="error-workEmail" className="mt-1.5 text-sm text-coral">
              {errors.workEmail.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="field-companyName">Company name</Label>
        <Input
          id="field-companyName"
          className="mt-2"
          autoComplete="organization"
          aria-invalid={!!errors.companyName}
          aria-describedby={errors.companyName ? "error-companyName" : undefined}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p id="error-companyName" className="mt-1.5 text-sm text-coral">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="field-lookingToBuild">What are you looking to build?</Label>
        <Textarea
          id="field-lookingToBuild"
          className="mt-2"
          rows={4}
          aria-invalid={!!errors.lookingToBuild}
          aria-describedby={errors.lookingToBuild ? "error-lookingToBuild" : undefined}
          {...register("lookingToBuild")}
        />
        {errors.lookingToBuild && (
          <p id="error-lookingToBuild" className="mt-1.5 text-sm text-coral">
            {errors.lookingToBuild.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="field-budgetRange">Estimated budget range</Label>
          <Controller
            control={control}
            name="budgetRange"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="field-budgetRange"
                  className="mt-2"
                  aria-invalid={!!errors.budgetRange}
                  aria-describedby={errors.budgetRange ? "error-budgetRange" : undefined}
                >
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.budgetRange && (
            <p id="error-budgetRange" className="mt-1.5 text-sm text-coral">
              {errors.budgetRange.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="field-timeline">Project timeline</Label>
          <Controller
            control={control}
            name="timeline"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="field-timeline"
                  className="mt-2"
                  aria-invalid={!!errors.timeline}
                  aria-describedby={errors.timeline ? "error-timeline" : undefined}
                >
                  <SelectValue placeholder="Select a timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.timeline && (
            <p id="error-timeline" className="mt-1.5 text-sm text-coral">
              {errors.timeline.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="field-projectDetails">Optional project details</Label>
        <Textarea id="field-projectDetails" className="mt-2" rows={4} {...register("projectDetails")} />
      </div>

      <p className="text-sm text-muted-foreground">
        Your information is used only to respond to your enquiry. {CONTACT_RESPONSE_TIME}
      </p>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  )
}
