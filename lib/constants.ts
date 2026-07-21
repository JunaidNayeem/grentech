export const SITE = {
  name: "Grentech",
  legalName: "Grentech",
  domain: "grentech.co.uk",
  url: "https://www.grentech.co.uk",
  email: "hello@grentech.co.uk",
  location: "United Kingdom",
  tagline: "Software built around the way your business works.",
  description:
    "Grentech designs and builds scalable SaaS platforms, internal tools, AI workflows, and bespoke software for ambitious teams.",
} as const

export type NavLink = {
  label: string
  href: string
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
]

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { label: "SaaS product development", href: "/services#saas-product-development" },
  { label: "Bespoke business platforms", href: "/services#bespoke-business-platforms" },
  { label: "AI and workflow automation", href: "/services#ai-and-workflow-automation" },
  { label: "Product modernisation", href: "/services#product-modernisation" },
]

export const FOOTER_TOOL_LINKS: NavLink[] = [
  { label: "Workflow Friction Calculator", href: "/workflow-calculator" },
  { label: "Build your platform", href: "/build-your-platform" },
  { label: "Workflow Maturity Assessment", href: "/workflow-maturity" },
  { label: "Workflow Rescue", href: "/workflow-rescue" },
]

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/grentech" },
  { label: "GitHub", href: "https://github.com/grentech" },
  { label: "Instagram", href: "https://www.instagram.com/grentech" },
]

export const CONTACT_RESPONSE_TIME = "We aim to respond within two working days."
