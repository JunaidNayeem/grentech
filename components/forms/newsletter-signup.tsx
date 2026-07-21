"use client"

import { useId, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle")
  const inputId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitted")
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">Occasional notes, no spam</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        A short, infrequent note when we publish something worth reading. Optional — unsubscribe any time.
      </p>
      {status === "submitted" ? (
        <p role="status" className="mt-4 text-sm font-medium text-brand">
          Thanks — you&rsquo;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Label htmlFor={inputId} className="sr-only">
            Email address
          </Label>
          <Input id={inputId} type="email" required placeholder="you@company.com" className="sm:max-w-xs" />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  )
}
