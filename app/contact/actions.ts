"use server"

import { contactFormSchema, leadCaptureSchema, type ContactFormValues, type LeadCaptureValues } from "@/lib/validations"
import { submitEnquiry, type EnquiryResult } from "@/lib/contact-provider"

export async function submitContactForm(values: ContactFormValues): Promise<EnquiryResult> {
  const parsed = contactFormSchema.safeParse(values)

  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." }
  }

  const { name, workEmail, companyName, lookingToBuild, budgetRange, timeline, projectDetails, source, context } =
    parsed.data

  return submitEnquiry({
    name,
    workEmail,
    companyName,
    lookingToBuild,
    budgetRange,
    timeline,
    projectDetails,
    source: source ?? "contact-page",
    context,
  })
}

export interface LeadCaptureSubmission extends LeadCaptureValues {
  source: string
  context?: Record<string, unknown>
}

export async function submitLeadCapture(values: LeadCaptureSubmission): Promise<EnquiryResult> {
  const parsed = leadCaptureSchema.safeParse(values)

  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." }
  }

  return submitEnquiry({
    ...parsed.data,
    source: values.source,
    context: values.context,
  })
}
