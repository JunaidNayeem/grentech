import { Button } from "@/components/ui/button"

export function GameIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-8 sm:p-12">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand">Monday, 09:00</span>
      <h2 className="mt-4 font-display text-2xl font-semibold text-foreground sm:text-3xl">
        Customer demand has doubled, but the team still runs on spreadsheets, inboxes, chat messages, and manual
        updates.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Every delay is now visible. You have one week to restore order — five decisions stand between the current
        chaos and a workflow leadership, customers, and your team can trust.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        <li>· Five short decision rounds, roughly 60–90 seconds in total</li>
        <li>· No wrong answers — every choice teaches something useful</li>
        <li>· Fully keyboard operable, with a skip-animation option</li>
      </ul>
      <div className="mt-8">
        <Button size="lg" onClick={onStart}>
          Start the week
        </Button>
      </div>
    </div>
  )
}
