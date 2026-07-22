"use client"

import dynamic from "next/dynamic"

/**
 * `next/dynamic(..., { ssr: false })` may only be called from a Client
 * Component. Page files are Server Components, so every lazily-loaded scene
 * is wrapped here once and imported as a plain component everywhere else.
 */
export const ServicesScene = dynamic(() => import("@/components/three/scenes/services-scene").then((m) => m.ServicesScene), {
  ssr: false,
})
export const WorkScene = dynamic(() => import("@/components/three/scenes/work-scene").then((m) => m.WorkScene), {
  ssr: false,
})
export const HowWeWorkScene = dynamic(
  () => import("@/components/three/scenes/how-we-work-scene").then((m) => m.HowWeWorkScene),
  { ssr: false },
)
export const AboutScene = dynamic(() => import("@/components/three/scenes/about-scene").then((m) => m.AboutScene), {
  ssr: false,
})
export const InsightsScene = dynamic(() => import("@/components/three/scenes/insights-scene").then((m) => m.InsightsScene), {
  ssr: false,
})
export const ContactScene = dynamic(() => import("@/components/three/scenes/contact-scene").then((m) => m.ContactScene), {
  ssr: false,
})
