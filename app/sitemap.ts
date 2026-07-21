import type { MetadataRoute } from "next"

import { SITE } from "@/lib/constants"
import { caseStudies } from "@/data/case-studies"
import { insights } from "@/data/insights"

const staticRoutes = [
  "",
  "/services",
  "/work",
  "/how-we-work",
  "/about",
  "/insights",
  "/contact",
  "/workflow-calculator",
  "/build-your-platform",
  "/workflow-maturity",
  "/workflow-rescue",
  "/privacy",
  "/terms",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE.url}/work/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const insightEntries: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${SITE.url}/insights/${insight.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  return [...staticEntries, ...caseStudyEntries, ...insightEntries]
}
