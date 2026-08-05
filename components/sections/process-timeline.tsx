"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/effects/reveal"
import { processSteps } from "@/data/how-we-work"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const active = processSteps[activeIndex]

  return (
    <Section density="marketing">
      <Container>
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built with you, not just for you.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="Delivery process steps" aria-orientation="vertical" className="flex flex-col gap-2">
            {processSteps.map((step, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  id={`process-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="process-panel"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex items-start gap-4 rounded-xl border p-5 text-left transition-all",
                    isActive
                      ? "border-brand/40 bg-brand/[0.07] shadow-[0_0_30px_-14px] shadow-brand/60"
                      : "border-border bg-transparent hover:border-border-strong hover:bg-surface/40",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm font-semibold",
                      isActive ? "text-brand" : "text-muted-foreground",
                    )}
                  >
                    {step.number}
                  </span>
                  <span>
                    <span className={cn("block font-display font-semibold", isActive ? "text-foreground" : "text-foreground/90")}>
                      {step.title}
                      {isActive && <span className="sr-only"> (selected)</span>}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{step.summary}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${activeIndex}`}
            className="glass-panel relative overflow-hidden rounded-2xl p-8 lg:p-10"
          >
            {reducedMotion ? (
              <>
                <span className="bg-gradient-to-br from-brand/50 to-transparent bg-clip-text font-display text-6xl font-semibold text-transparent">
                  {active.number}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{active.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{active.detail}</p>
              </>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="bg-gradient-to-br from-brand/50 to-transparent bg-clip-text font-display text-6xl font-semibold text-transparent">
                    {active.number}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{active.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{active.detail}</p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
