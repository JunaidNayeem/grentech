import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Building2,
  Users,
  Workflow,
  RefreshCw,
  User,
  UserSquare2,
  Handshake,
  Globe,
  KeyRound,
  ShieldCheck,
  BarChart3,
  CreditCard,
  Repeat,
  FileText,
  Bell,
  Sparkles,
  Plug,
} from "lucide-react"

import type { Capability, ProductType, ScaleBand, Timeline, UserAudience } from "@/lib/recommendations"

export const productTypeOptions: { value: ProductType; label: string; description: string; icon: LucideIcon }[] = [
  {
    value: "saas-platform",
    label: "SaaS platform",
    description: "A subscription product your customers sign up for and pay to use.",
    icon: LayoutDashboard,
  },
  {
    value: "internal-tool",
    label: "Internal operations tool",
    description: "A system your own team uses to run part of the business.",
    icon: Building2,
  },
  {
    value: "customer-portal",
    label: "Customer portal",
    description: "A self-service space where your customers manage their own account or orders.",
    icon: Users,
  },
  {
    value: "workflow-automation",
    label: "Workflow automation",
    description: "A system that automates a specific repeatable process end to end.",
    icon: Workflow,
  },
  {
    value: "legacy-modernisation",
    label: "Legacy modernisation",
    description: "An improvement or rebuild of software you already rely on.",
    icon: RefreshCw,
  },
]

export const audienceOptions: { value: UserAudience; label: string; icon: LucideIcon }[] = [
  { value: "employees", label: "Employees", icon: User },
  { value: "customers", label: "Customers", icon: UserSquare2 },
  { value: "partners", label: "Partners", icon: Handshake },
  { value: "public", label: "Public users", icon: Globe },
]

export const capabilityOptions: { value: Capability; label: string; icon: LucideIcon }[] = [
  { value: "secure-login", label: "Secure login", icon: KeyRound },
  { value: "roles-and-permissions", label: "Roles and permissions", icon: ShieldCheck },
  { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { value: "reporting", label: "Reporting", icon: BarChart3 },
  { value: "payments", label: "Payments", icon: CreditCard },
  { value: "subscriptions", label: "Subscriptions", icon: Repeat },
  { value: "documents", label: "Documents", icon: FileText },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "ai-assistance", label: "AI assistance", icon: Sparkles },
  { value: "integrations", label: "Third-party integrations", icon: Plug },
]

export const scaleOptions: { value: ScaleBand; label: string }[] = [
  { value: "1-10", label: "1–10 users" },
  { value: "10-100", label: "10–100 users" },
  { value: "100-1000", label: "100–1,000 users" },
  { value: "1000+", label: "1,000+ users" },
]

export const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "exploring", label: "Exploring" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
]

export const productTypeBaseModules: Record<ProductType, string[]> = {
  "saas-platform": ["Marketing site", "Account & billing", "Core product workspace"],
  "internal-tool": ["Internal sign-in", "Core workspace", "Admin controls"],
  "customer-portal": ["Customer sign-in", "Self-service dashboard", "Account management"],
  "workflow-automation": ["Trigger & rules engine", "Task queue", "Status tracking"],
  "legacy-modernisation": ["Modern interface layer", "Data migration bridge", "Core workflows"],
}
