# Grentech

Marketing website and interactive product-strategy tools for **Grentech**, a UK-based bespoke software product studio. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and a small set of accessible, typed interactive tools (a workflow cost calculator, a product scope explorer, a maturity assessment, and a scored mini-game).

## Tech stack

- **Next.js 15** (App Router, Server Components by default)
- **TypeScript** (strict mode)
- **Tailwind CSS** + shadcn/ui primitives (Radix UI under the hood)
- **Framer Motion** for restrained, reduced-motion-aware animation
- **React Hook Form + Zod** for form state and validation
- **Recharts** for the calculator's chart (with a plain-text/table equivalent alongside every chart)
- **Vitest** for unit tests of calculator, scope, maturity, and game-scoring logic

Note on 3D: the brief allowed React Three Fiber for the hero "only if it remains lightweight" with a required non-WebGL fallback. This build uses a lightweight CSS/SVG animated visual instead of an R3F scene — it satisfies the same requirements (decorative, `aria-hidden`, reduced-motion aware, cheap to render) without the added bundle size and WebGL fallback complexity. If you want a true 3D hero later, swap the contents of `components/sections/hero-visual.tsx` for an R3F `<Canvas>`, keeping the `aria-hidden` wrapper and the `useReducedMotion` gate.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

Other scripts:

```bash
npm run build       # production build
npm run start       # run the production build
npm run lint        # ESLint (next lint)
npm run test        # run the Vitest unit test suite once
npm run test:watch  # Vitest in watch mode
```

## Environment variables

The site runs with no environment variables required for local development — the contact/lead-capture pipeline currently logs to the console in development (see `lib/contact-provider.ts`). When you connect a real provider, typical variables would be:

```bash
# .env.local (create as needed — none are required out of the box)
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=hello@grentech.co.uk
```

Add whatever variables your chosen provider needs (see "Connecting the contact and report forms" below) and read them inside `lib/contact-provider.ts`.

## Project structure

```
app/                      Routes (App Router). Each route owns its metadata.
  workflow-calculator/    Workflow Friction Calculator
  build-your-platform/    Product Scope Explorer
  workflow-maturity/      Workflow Maturity Assessment
  workflow-rescue/        Workflow Rescue mini-game
  work/[slug]/            Case study detail pages
  insights/[slug]/        Article detail pages
  contact/actions.ts      Server Actions (submitContactForm, submitLeadCapture)
  sitemap.ts, robots.ts   SEO

components/
  layout/                 Header, footer, wordmark logo
  sections/               Homepage + inner-page sections
  case-studies/           Case study card, filterable grid, "chaos to clarity" module
  calculators/             Shared multi-step primitives (step shell, option/checkbox
                          cards, Likert scale) + the calculator/scope/maturity UIs
  games/                  Workflow Rescue UI (decision cards, score panel, map, results)
  forms/                  Contact form, reusable lead-capture form, newsletter stub
  ui/                     shadcn/ui primitives

lib/
  constants.ts            Site-wide config, nav links, footer links
  calculations.ts         Pure calculator/maturity scoring math (unit tested)
  recommendations.ts      Score → band/recommendation mappings (unit tested)
  workflow-rescue-reducer.ts  Typed reducer/state machine for the game (unit tested)
  validations.ts          Zod schemas for all forms
  contact-provider.ts     Single seam for enquiry delivery (swap in a real provider here)
  analytics.ts            Typed analytics event abstraction

data/                     Typed content and configuration (no business logic in components)
  services.ts, case-studies.ts, insights.ts, how-we-work.ts
  workflow-calculator.ts, product-scope.ts, workflow-maturity.ts, workflow-rescue.ts
```

The rule of thumb throughout: **components render, `lib/` calculates, `data/` configures.** If you need to change a number, a copy string, or a score threshold, you should almost always be editing a file in `data/` or `lib/`, not a component.

## Updating branding

- **Wordmark / icon**: `components/layout/logo.tsx` is a pure inline SVG + text — no image asset required. Edit the `<rect>`/`<path>` elements or swap in a different mark; it will render correctly at any size.
- **Colour palette**: all brand colours are CSS custom properties in `app/globals.css` (`:root`), mapped to Tailwind tokens in `tailwind.config.ts` (`brand`, `lime`, `teal`, `amber`, `coral`, plus `background`/`surface`/etc.). Change the HSL values in `globals.css` to retheme the whole site.
- **Fonts**: loaded via `next/font/google` in `app/layout.tsx` (Plus Jakarta Sans for display, Inter for body). Swap the imports there and update the `--font-display`/`--font-body` variable names if you change typefaces.
- **Site-wide copy** (tagline, email, social links, nav labels): `lib/constants.ts`.

## Replacing the illustrative case studies

All three case studies (FuelFinder, PulseCoach, FlowOps) are explicitly labelled as **illustrative examples** in the UI (`isIllustrative: true`) and must stay labelled that way until you have explicit permission to publish a named client project.

To add or replace a case study:

1. Edit `data/case-studies.ts` — add an entry to the `caseStudies` array matching the `CaseStudy` type (challenge, approach, capabilities, technology, outcomes, before/after lists, and the stage-by-stage `stages` array used by the interactive "chaos to clarity" module).
2. Set `isIllustrative: false` once you have real, permitted content — this removes the "Illustrative example" badge and the amber notice banner on the detail page.
3. The `/work` grid and `/work/[slug]` detail pages, plus the homepage "Featured work" section, all read from this one file — no other changes needed.

## Connecting the contact and report forms

Every form in the app (`contact/page.tsx`, and the lead-capture forms embedded in the calculator, scope explorer, maturity assessment, and game results) submits through one seam:

- `lib/contact-provider.ts` → `submitEnquiry(payload)` — currently logs to the console in development and simulates a network delay.
- `app/contact/actions.ts` → two Server Actions, `submitContactForm` and `submitLeadCapture`, validate with Zod (`lib/validations.ts`) and call `submitEnquiry`.

To connect a real provider, edit only `submitEnquiry` in `lib/contact-provider.ts`:

- **Resend**: call `resend.emails.send(...)` with the payload.
- **Zoho Forms / HubSpot**: `fetch()` their public forms endpoint with your portal/form ID from an environment variable.
- **Custom API**: `fetch()` your own endpoint.

No component or page needs to change — they all already call `submitEnquiry` indirectly through the two Server Actions.

## Connecting analytics

`lib/analytics.ts` exports a single `track(event, properties)` function and a typed union of every event name used across the site (calculator, scope explorer, maturity assessment, and game funnels, plus contact form submission). It currently only logs to the console in development.

To connect PostHog, Plausible, or another provider, edit the body of `dispatch()` in `lib/analytics.ts` — no call site needs to change. Never pass personal data (name, email, phone) as an event property; the existing call sites already avoid this.

## Modifying calculator assumptions

The Workflow Friction Calculator's math lives entirely in `lib/calculations.ts`:

- `TEAM_SIZE_MIDPOINT` — the representative headcount used for each team-size band.
- `IMPROVEMENT_RANGE` — the low/high improvement-opportunity percentage per error-frequency answer.
- `WORKING_WEEKS_PER_YEAR` — currently 48.
- `calculateWorkflowFriction()` — `teamSize × weeklyHours × hourlyCost × workingWeeks`, then applies the improvement range.

The recommendation text mapping (focus area × desired outcome → a sentence) lives in `lib/recommendations.ts`. Both files are covered by `lib/calculations.test.ts` and `lib/recommendations.test.ts` — update the tests alongside any assumption change.

The Workflow Maturity Assessment's question set is in `data/workflow-maturity.ts`; its 1–5 → 0–100 normalisation is `calculateMaturityScore()` in `lib/calculations.ts`, and its score bands/recommendations are `MATURITY_BANDS` in `lib/recommendations.ts`.

## Modifying game scenarios and scoring

Workflow Rescue's entire content — rounds, options, outcome copy, "why this matters" text, and score deltas — lives in `data/workflow-rescue.ts`. Each round has two options, each with a `deltas` object (`clarity`, `customerExperience`, `scaleReadiness`) added to a running 0–100 score per dimension.

- To change a scenario's wording: edit the round's `problem`, `options[].label/description/outcomeMessage/whyItMatters`.
- To change scoring balance: edit `deltas`. The current tuning makes an all-strong-choice playthrough land around 90+ overall ("Ready to scale with confidence") and an all-weak-choice playthrough land below 40 ("Manual process risk") — see `lib/workflow-rescue-reducer.test.ts` for the exact assertions; update them if you retune the deltas.
- The game's control flow is a typed reducer, `lib/workflow-rescue-reducer.ts` (`gameReducer`), fully decoupled from React — test it directly by dispatching actions, as the existing test suite does.
- Score → result-band mapping (`RESCUE_RESULT_BANDS`) is in `lib/recommendations.ts`.

## Accessibility testing guidance

The site targets WCAG 2.2 AA. To verify a change:

1. **Keyboard only**: unplug your mouse (or just don't use it) and walk every route, including all four interactive tools and the mobile menu. Every action should be reachable with Tab/Shift+Tab, triggerable with Enter/Space, and dialogs (mobile nav) should trap focus and close on Escape.
2. **Reduced motion**: enable "reduce motion" in your OS accessibility settings and reload. Animations should become effectively instant (global CSS handles this in `app/globals.css` via `@media (prefers-reduced-motion: reduce)`); Workflow Rescue additionally has an explicit in-page "Skip animation" toggle independent of the OS setting.
3. **Screen reader spot-check**: run a screen reader (NVDA, VoiceOver, or the Chrome DevTools "Accessibility" pane) over the calculator, scope explorer, maturity assessment, and game — confirm step changes, score updates, and results are announced (they use `aria-live` regions), and that every chart/visual has a text or table equivalent nearby.
4. **Automated checks**: the project doesn't bundle an axe browser extension dependency, but you can run one ad hoc — install the [axe DevTools browser extension](https://www.deque.com/axe/devtools/) or run `npx @axe-core/cli http://localhost:3000` against a running dev server for a quick regression scan.
5. **Zoom/reflow**: check 400% browser zoom and a 320px viewport width — layouts should reflow without horizontal scrolling or clipped content.

## Performance notes

- Heavy/interactive modules (the calculator's chart, the game, the hero visual) are Client Components scoped as narrowly as possible; the rest of each page renders as a Server Component.
- The hero visual and game visuals are CSS/SVG, not WebGL — there's no bundle cost from a 3D engine and no non-WebGL fallback to maintain separately.
- Fonts load via `next/font/google`, which self-hosts and subsets automatically to avoid layout shift and third-party font requests.
- No third-party scripts are loaded by default; analytics is a local no-op until you wire up a provider.

## Deployment

This is a standard Next.js app — deploy to Vercel (recommended, zero config) or any Node-capable host:

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL`-equivalent values by editing `SITE.url` in `lib/constants.ts` before shipping to production (used for canonical URLs, sitemap, Open Graph, and JSON-LD).
