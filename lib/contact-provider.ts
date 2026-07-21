/**
 * Enquiry submission abstraction.
 *
 * `submitEnquiry` is the single seam between the site's forms and wherever
 * enquiries actually need to go. Swap the body of this function for a real
 * integration (Resend, Zoho Forms, HubSpot, or a custom API) without
 * changing any calling code — every form in the app calls this function
 * with a typed payload, not a specific provider's SDK.
 */

export interface EnquiryPayload {
  name: string
  workEmail: string
  companyName: string
  phone?: string
  lookingToBuild?: string
  budgetRange?: string
  timeline?: string
  projectDetails?: string
  source: string
  /** Structured context from an interactive tool (calculator answers, game score, etc). */
  context?: Record<string, unknown>
}

export interface EnquiryResult {
  success: boolean
  error?: string
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    // Replace this block with a real provider call, for example:
    //
    //   await resend.emails.send({
    //     from: "Grentech <hello@grentech.co.uk>",
    //     to: "hello@grentech.co.uk",
    //     subject: `New enquiry: ${payload.companyName}`,
    //     text: JSON.stringify(payload, null, 2),
    //   })
    //
    // or a POST to Zoho Forms / HubSpot's forms API using their public endpoint
    // and portal/form IDs from environment variables.

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("[contact-provider] Enquiry received:", payload)
    }

    await new Promise((resolve) => setTimeout(resolve, 400))

    return { success: true }
  } catch {
    return { success: false, error: "Something went wrong while sending your enquiry. Please try again." }
  }
}
