import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE } from "@/lib/constants"
import "./globals.css"

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Grentech | SaaS Platforms, AI Workflows & Bespoke Software",
    template: "%s | Grentech",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Grentech | SaaS Platforms, AI Workflows & Bespoke Software",
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Grentech | SaaS Platforms, AI Workflows & Bespoke Software",
    description: SITE.description,
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  areaServed: "GB",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  description: SITE.description,
  sameAs: ["https://www.linkedin.com/company/grentech", "https://github.com/grentech", "https://www.instagram.com/grentech"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="skip-link rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
