import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { FOOTER_SERVICE_LINKS, FOOTER_TOOL_LINKS, PRIMARY_NAV, SITE, SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We design and build software that makes complex work feel simple.
            </p>
            <ul className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Site">
            <h2 className="font-display text-sm font-semibold text-foreground">Site</h2>
            <ul className="mt-4 space-y-3">
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="font-display text-sm font-semibold text-foreground">Services</h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Interactive tools">
            <h2 className="font-display text-sm font-semibold text-foreground">Explore</h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            <a href={`mailto:${SITE.email}`} className="hover:text-foreground">
              {SITE.email}
            </a>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {SITE.location}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Grentech. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
