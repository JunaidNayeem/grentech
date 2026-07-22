"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/effects/reveal"
import { GradientBlobs } from "@/components/effects/gradient-blobs"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const BEFORE = [
  "Spreadsheets",
  "Email threads",
  "WhatsApp or Teams messages",
  "Manual approvals",
  "Repeated data entry",
  "Delayed reporting",
]

const AFTER = [
  "A unified platform",
  "Role-based workflows",
  "Automated reminders",
  "Customer or staff portals",
  "Live reporting",
  "Clear ownership and auditability",
]

export function ProblemToProduct() {
  const [view, setView] = useState<"before" | "after">("before")
  const reducedMotion = useReducedMotion()
  const items = view === "before" ? BEFORE : AFTER

  return (
    <section className="relative py-20 sm:py-28">
      <GradientBlobs variant="cta" className="opacity-60" />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your business is unique.{" "}
            <span className="bg-gradient-to-r from-lime to-brand bg-clip-text text-transparent">
              Your software should be too.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Spreadsheets, email chains, disconnected tools, and manual approvals eventually slow down even the
            strongest teams. Grentech turns these friction points into clear, reliable digital products that fit how
            your organisation actually operates.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
          <div role="tablist" aria-label="Workflow state" className="flex justify-center gap-2">
            <button
              type="button"
              role="tab"
              id="tab-before"
              aria-selected={view === "before"}
              aria-controls="panel-workflow"
              onClick={() => setView("before")}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                view === "before"
                  ? "border-coral/50 bg-coral/10 text-coral shadow-[0_0_24px_-8px] shadow-coral/60"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              Before Grentech
            </button>
            <button
              type="button"
              role="tab"
              id="tab-after"
              aria-selected={view === "after"}
              aria-controls="panel-workflow"
              onClick={() => setView("after")}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                view === "after"
                  ? "border-brand/50 bg-brand/10 text-brand shadow-[0_0_24px_-8px] shadow-brand/60"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              After Grentech
            </button>
          </div>

          <div
            id="panel-workflow"
            role="tabpanel"
            aria-labelledby={view === "before" ? "tab-before" : "tab-after"}
            className="glass-panel relative mt-8 overflow-hidden rounded-2xl p-8"
          >
            {reducedMotion ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    {view === "before" ? (
                      <X className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                    ) : (
                      <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <AnimatePresence mode="wait">
                <motion.ul
                  key={view}
                  initial={{ opacity: 0, x: view === "before" ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: view === "before" ? 16 : -16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                      {view === "before" ? (
                        <X className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                      ) : (
                        <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            )}
          </div>
        </Reveal>

        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border bg-surface/40 p-6 text-sm text-muted-foreground">
          <h3 className="font-display text-sm font-semibold text-foreground">Text summary</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium text-coral">Before Grentech</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {BEFORE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-brand">After Grentech</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {AFTER.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
