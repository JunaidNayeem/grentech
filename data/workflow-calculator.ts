import type { TeamSizeBand, ErrorFrequency } from "@/lib/calculations"
import type { FocusArea, DesiredOutcome } from "@/lib/recommendations"
import { TEAM_SIZE_LABEL, ERROR_FREQUENCY_LABEL } from "@/lib/calculations"
import { FOCUS_AREA_LABEL, OUTCOME_LABEL } from "@/lib/recommendations"

export const teamSizeOptions: { value: TeamSizeBand; label: string }[] = (
  Object.keys(TEAM_SIZE_LABEL) as TeamSizeBand[]
).map((value) => ({ value, label: TEAM_SIZE_LABEL[value] }))

export const errorFrequencyOptions: { value: ErrorFrequency; label: string }[] = (
  Object.keys(ERROR_FREQUENCY_LABEL) as ErrorFrequency[]
).map((value) => ({ value, label: ERROR_FREQUENCY_LABEL[value] }))

export const focusAreaOptions: { value: FocusArea; label: string }[] = (
  Object.keys(FOCUS_AREA_LABEL) as FocusArea[]
).map((value) => ({ value, label: FOCUS_AREA_LABEL[value] }))

export const outcomeOptions: { value: DesiredOutcome; label: string }[] = (
  Object.keys(OUTCOME_LABEL) as DesiredOutcome[]
).map((value) => ({ value, label: OUTCOME_LABEL[value] }))

export type ToolInUse = "spreadsheets" | "email" | "chat-apps" | "paper-forms" | "existing-software" | "other"

export const toolOptions: { value: ToolInUse; label: string }[] = [
  { value: "spreadsheets", label: "Spreadsheets" },
  { value: "email", label: "Email" },
  { value: "chat-apps", label: "WhatsApp / Teams / Slack" },
  { value: "paper-forms", label: "Paper forms" },
  { value: "existing-software", label: "Existing software" },
  { value: "other", label: "Other" },
]
