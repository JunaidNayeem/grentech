import { z } from "zod"

export const budgetRanges = [
  "Under ₹5L",
  "₹5L – ₹15L",
  "₹15L – ₹40L",
  "₹40L – ₹80L",
  "₹80L+",
  "Not sure yet",
] as const

export const timelineOptions = ["Exploring options", "1–3 months", "3–6 months", "6+ months"] as const

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  workEmail: z.string().trim().min(1, "Enter your work email.").email("Enter a valid email address."),
  companyName: z.string().trim().min(2, "Enter your company name."),
  lookingToBuild: z
    .string()
    .trim()
    .min(10, "Tell us a little more about what you're looking to build (at least 10 characters)."),
  budgetRange: z.enum(budgetRanges, { errorMap: () => ({ message: "Select a budget range." }) }),
  timeline: z.enum(timelineOptions, { errorMap: () => ({ message: "Select a timeline." }) }),
  projectDetails: z.string().trim().max(2000, "Keep additional details under 2000 characters.").optional(),
  source: z.string().optional(),
  context: z.record(z.unknown()).optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const leadCaptureSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  workEmail: z.string().trim().min(1, "Enter your work email.").email("Enter a valid email address."),
  companyName: z.string().trim().min(2, "Enter your company name."),
  phone: z.string().trim().optional(),
})

export type LeadCaptureValues = z.infer<typeof leadCaptureSchema>
