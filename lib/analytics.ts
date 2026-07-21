/**
 * Lightweight analytics abstraction.
 *
 * Swap the implementation of `dispatch` for a real provider (PostHog, Plausible, etc.)
 * without changing any call sites. No personal data (names, emails, phone numbers)
 * should ever be passed as an event property — only anonymous, aggregate, or
 * categorical values.
 */

export type AnalyticsEventName =
  | "workflow_calculator_started"
  | "workflow_calculator_step_completed"
  | "workflow_calculator_result_viewed"
  | "workflow_calculator_report_requested"
  | "workflow_calculator_contact_clicked"
  | "product_scope_started"
  | "product_scope_step_completed"
  | "product_scope_result_viewed"
  | "product_scope_brief_requested"
  | "product_scope_contact_clicked"
  | "workflow_maturity_started"
  | "workflow_maturity_completed"
  | "workflow_maturity_result_viewed"
  | "workflow_maturity_contact_clicked"
  | "workflow_rescue_started"
  | "workflow_rescue_round_completed"
  | "workflow_rescue_completed"
  | "workflow_rescue_result_viewed"
  | "workflow_rescue_calculator_clicked"
  | "workflow_rescue_contact_clicked"
  | "workflow_rescue_email_report_submitted"
  | "contact_form_submitted"
  | "nav_cta_clicked"

export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>

function dispatch(event: AnalyticsEventName, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") return

  // Development visibility only. Replace with a real provider call, e.g.:
  //   posthog.capture(event, properties)
  //   plausible(event, { props: properties })
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, properties ?? {})
  }
}

export function track(event: AnalyticsEventName, properties?: AnalyticsProperties) {
  try {
    dispatch(event, properties)
  } catch {
    // Analytics must never break the user experience.
  }
}
