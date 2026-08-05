# Grentech - NDL Phase 0 Audit

Read-only audit. **No code was changed to produce this document.** Scope: the whole
repo (Next.js 15 / React 19 / TypeScript / Tailwind CSS v3, ~130 component/page files),
against `design-system/CLAUDE.md` + `01-04-*.md`. Per the upgrade playbook: tokens
before structure, so this is audit-only - nothing below has been fixed yet.

Severity scale used throughout: **blocker** (fix before anything else) - **high**
(fix in Phase 1-2) - **medium** (fix in the relevant phase, not urgent) - **low** (polish).

---

## 0. Read this first - two things bigger than any token

### 0.1 Brand jurisdiction mismatch (blocker - not a design issue, a fact issue)

The codebase repeatedly and explicitly states Grentech is a **UK-based** entity:

| Claim | File:line |
|---|---|
| `location: "United Kingdom"`, `domain: "grentech.co.uk"` | `lib/constants.ts:5,7` |
| "Grentech is a UK-based software product studio..." (page metadata) | `app/about/page.tsx:14` |
| "Grentech is a UK-based software product studio." (page copy) | `app/about/page.tsx:47` |
| "Grentech is based in the United Kingdom." (legal copy) | `app/privacy/page.tsx:66` |
| `areaServed: "GB"`, `address.addressCountry: "GB"` (Organization JSON-LD, every page) | `app/layout.tsx:49-53` |

The Udyam registration certificate you supplied registers **Grentech as an Indian
sole proprietorship** - Udyam-BR-07-0059773, proprietor MD Junaid Nayeem
(PAN BDJPN2539N), official address in Bhagalpur, Bihar, India, incorporated
28/06/2025, classified Micro/Services under NIC codes 62011/62012/62020/62099
(computer programming consultancy, web-page designing, computer facilities
management) - which otherwise line up neatly with the site's actual service
offering.

**I haven't changed anything here** - there are legitimate setups where this is
fine (an Indian-registered proprietor legitimately trading under a UK brand/company,
or a UK entity that simply hasn't been formed yet). But right now the site's
**Privacy Policy makes an affirmative jurisdiction claim** ("based in the United
Kingdom") that contradicts your actual legal registration, and the
`ProfessionalService` JSON-LD tells Google the business is UK-only
(`areaServed: "GB"`). That's a real compliance/trust surface (UK GDPR vs. Indian
IT Act, which courts/consumer-protection regime applies, whether `grentech.co.uk`
domain claims are accurate), not a cosmetic one. **Flagging for your decision
before Phase 5 (copy) or any metadata work touches these files** - tell me which
is true and I'll make `lib/constants.ts`, the About page, the Privacy Policy, and
the JSON-LD agree with each other and with reality.

### 0.2 The token substrate is a genuine head start, not a rewrite

Unlike a typical unsystematised app, `app/globals.css:6-39` already defines a real
single-theme, dark-first HSL brand-token block (`--background`, `--surface`,
`--foreground`, `--brand`, `--border`, etc.), correctly wired into
`tailwind.config.ts:17-62`. That's most of NDL section 2's architecture already in
place. What's missing is depth and range: no ink ladder (`ink-1` to `ink-4`), only
two line steps (`border` / `border-strong`, not the `line-1/2/3` hairline scale),
no elevation/shadow tokens (see section 5 below), no motion duration/easing
tokens, one radius primitive instead of NDL's six-step scale, and no mono
typeface at all. Phase 1 is "extend," not "replace."

There is also a second, dead stylesheet: **`styles/globals.css`** is a stock
shadcn light-mode boilerplate file (Arial body font, a full light + `.dark`
palette with `--sidebar-*` tokens) that **nothing imports** - `app/layout.tsx:8`
imports `./globals.css`, i.e. `app/globals.css`. It's orphaned and should simply
be deleted in Phase 1, not merged.

---

## 1. Colour

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 1a | medium | ~12 distinct raw values across 5 files (9 hex, 2 raw `hsl()` literals, `bg-black/80` x3) | `components/three/scene-primitives.tsx:8-12` (`BRAND="#36E39A"`, `LIME`, `TEAL`, `CORAL`, `AMBER` re-declared as hex); `components/calculators/calculator-chart.tsx:24-31` (`stroke="hsl(160 16% 24%)"`, `fill="#A6B8B1"`); `components/sections/final-cta.tsx:14` (arbitrary `bg-[radial-gradient(...,hsl(152_74%_25%/0.45),...)]`) | These are almost all forced by contexts that need JS string literals (Three.js materials, Recharts props, raw SVG `stopColor`) where a CSS var can't be read directly. Don't chase these to zero - instead add **one** `lib/theme-colors.ts` exporting the same values as named constants sourced from the token hexes, so there's a single place to update instead of 5. Replace `final-cta.tsx`'s arbitrary gradient with a token-referencing one (`hsl(var(--brand) / 0.45)` works fine in an arbitrary value). | Low - 5 files, isolated to chart/3D/SVG rendering code, not general UI |
| 1b | low | 3 occurrences, 1 class | `bg-black/80` scrims in `components/ui/alert-dialog.tsx:21`, `dialog.tsx:24`, `sheet.tsx:24` (unmodified shadcn boilerplate) | Swap for `bg-canvas-0/80`-equivalent once the ink/canvas tokens exist, so the scrim tints with the brand hue like everything else | Low - 3 files, all modal/sheet overlays |
| 1c | high (compounds section 5) | 40 shadow-utility instances, 19 of them unmapped | `components/ui/dialog.tsx:41`, `tooltip.tsx:22`, `select.tsx:78`, `context-menu.tsx:49,65` use bare `shadow-md`/`shadow-lg` | See section 5 - colour and shadow are the same root cause here | Site-wide - every dropdown/dialog/popover/tooltip |

**Overall verdict:** genuinely better than the playbook's "40-80 raw values"
baseline - no arbitrary hex utilities in `className`, no stray Tailwind palette
colours (`bg-slate-*`, `text-gray-*`, etc.) anywhere. The colour system itself is
close to sound; it just needs the ink/line/elevation layers built on top of it.

---

## 2. Typography

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 2a | high | 0 mono faces found anywhere | Eyebrows render in Inter at `text-xs uppercase tracking-wide` - e.g. `components/ui/eyebrow.tsx:8`, timestamp in `components/games/game-intro.tsx:6`, stat labels in `components/case-studies/workflow-stages.tsx` | Add a third self-hosted mono face (`next/font` local or Google `Geist Mono`/`IBM Plex Mono`) and route eyebrows, step numbers, stat values and timestamps through it per NDL section 3.1 | Site-wide but purely additive - no visual regression, just a new `--font-mono` variable and a handful of className swaps |
| 2b | medium | 11 distinct `text-*` steps in live use (of 13 available) | `text-sm` x167, `text-lg` x44, `text-xs` x40, `text-3xl` x20 ... down to `text-7xl` x1 | Collapse onto NDL's ~11-token fluid clamp scale (section 3.2) - close to a 1:1 remap since the count already matches, just needs fluid clamps instead of fixed breakpoint jumps | Every text-bearing component; mechanical find/replace once the scale is defined |
| 2c | low | 2 `text-6xl` headings with **no tracking class** | `components/sections/process-timeline.tsx:74,89` (gradient step-number spans) | Add `tracking-tight` - NDL section 3.2 rule: never ship large display type at normal tracking | 1 file, 2 lines |
| 2d | low | 3 arbitrary values (`text-[10px]`, `fontSize: 11` x2) | `components/case-studies/case-study-card.tsx:32`; `components/calculators/calculator-chart.tsx:25-26` (Recharts axis ticks, unitless px, effectively unavoidable) | Map `text-[10px]` to a real caption token; leave the Recharts pixel values - SVG tick config doesn't take Tailwind classes | 2 files |
| 2e | low | 3 arbitrary tracking/leading values, all deliberate | `tracking-[0.14em]` in `eyebrow.tsx:8` and `hero.tsx:17` (this **is** NDL's own eyebrow tracking spec, just not yet a named token); `leading-[1.05]` in `hero.tsx:21` | Promote `0.14em` to `--tr-eyebrow` and `1.05` to `--lh-display` - these aren't bugs, they're tokens waiting to be named | 2 files |

**Overall verdict:** typography discipline is already unusually good for a
pre-audit codebase - almost zero inline styles, almost no odd arbitrary values,
and the two "violations" found are actually the NDL spec's own values used ad
hoc. The real gap is the missing mono face, which is a section 3.1 identity
element, not a bug fix.

---

## 3. Spacing

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 3a | medium | No shared `<Section>` wrapper; 11 sections each hand-set their own padding | Most cluster on `py-20 sm:py-28` (6 of 11: `before-after.tsx:37`, `featured-work.tsx:12`, `process-timeline.tsx:18`, `insights-preview.tsx:11`, `services-grid.tsx:12`, `why-grentech.tsx:32`, `tech-ecosystem.tsx:20`) but 4 deviate: `credibility-strip.tsx:15` (`py-10`), `page-header.tsx:18` (`py-16 sm:py-20`), `final-cta.tsx:11` (`py-24`, no responsive step), `hero.tsx:15` (`py-20 sm:py-24 lg:py-32`) | Build the `<Section>` wrapper from Playbook Phase 3 section 1 owning one `--section-y` clamp token; strip padding out of every section's own className | All 11 section components - mechanical, low-risk |
| 3b | low | 6 arbitrary bracket values under 4px-multiples, all inside `components/ui/*` hairline dividers | `top-[1px]` (`navigation-menu.tsx:58`), `p-[1px]` x2 (`scroll-area.tsx:36,38`), `h-/w-[1px]` (`separator.tsx:22`), `w-[2px]` (`sidebar.tsx:303`) | Leave these - 1-2px hairlines are a legitimate exception to the "divisible by 4" rule (borders, not layout spacing), and `sidebar.tsx` is dead code (section 6) anyway | Negligible |
| 3c | low | Single `Container` width (`max-w-content: 1240px`); no `container-wide`/`container-narrow` split | `components/ui/container.tsx:5` | Add the two extra container tokens per NDL section 8.1 once a comparison table/stat band genuinely needs the wider one | Low |

**Overall verdict:** no real "13px never appears" violations in bespoke marketing
code - the only arbitrary-spacing hits are inside third-party-derived primitives
and are legitimate 1px hairlines. The actual spacing gap is structural (3a), not
numeric.

---

## 4. Radius

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 4a | medium | 8 distinct `rounded-*` values in live use, only 3 wired to the `--radius` token | `rounded-sm`/`md`/`lg` correctly derive from `--radius` (`tailwind.config.ts:64-66`); `rounded-xl` (18 uses/15 files), `rounded-2xl` (36 uses/27 files), `rounded-3xl` (1 use), `rounded-full` (46 uses/27 files) all fall back to Tailwind's **hardcoded static defaults**, untouched by the token | Extend `tailwind.config.ts` `borderRadius` with `xl`/`2xl` mapped to `calc(var(--radius) + Npx)` steps, matching NDL's 6-step scale (section 5) | Every `rounded-2xl` card (the most common radius in the app) and every pill - visually invisible change today, but currently un-themeable |

**Overall verdict:** this is the cleanest "quick win" in the whole audit - the
fix is additive (extend the Tailwind theme mapping), touches zero component
files, and immediately makes radius themeable everywhere for free.

---

## 5. Shadow

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 5a | **high** | 19 of ~40 shadow-utility instances use Tailwind's default black-based recipe on a dark canvas | `shadow-md` - `context-menu.tsx:49,65`, `dropdown-menu.tsx:68`, `select.tsx:78`, `tooltip.tsx:22`, `navigation-menu.tsx:112`; `shadow-lg` - `dialog.tsx:41`, `alert-dialog.tsx:39`, `sheet.tsx:34`, `switch.tsx:22` | `tailwind.config.ts` has **no `boxShadow` override** (verified - only `colors`/`borderRadius`/`fontFamily`/`maxWidth`/`keyframes`/`animation` are extended), so these fall through to `rgba(0,0,0,...)` recipes - this is the exact "light-mode shadow recipe on a dark canvas" anti-pattern CLAUDE.md rule 4 names explicitly. Add `--elev-1/2/3` per NDL section 6 and map `shadow-sm/md/lg` to them in `theme.extend.boxShadow` | Every dropdown, dialog, popover, tooltip, context menu, sheet, and switch in the app - i.e. nearly every piece of floating/overlay UI site-wide |
| 5b | low | Custom glow shadows already correctly token-based | `shadow-[0_0_40px_-12px] shadow-brand/40` (`case-study-card.tsx:10`), similar in `before-after.tsx:66,82`, `process-timeline.tsx:42` | None needed - these are the right pattern, worth using as the reference example when writing `--elev-accent` | -- |

**Overall verdict:** this is the single highest-impact, lowest-effort fix in the
whole audit. One `boxShadow` extension in `tailwind.config.ts` fixes an
anti-pattern that currently ships on effectively every interactive overlay in the
product.

---

## 6. Components

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 6a | high | `components/ui/badge.tsx` has **zero importers** anywhere in the app; meanwhile 5 files hand-roll 4 visually distinct pill treatments | "Illustrative example" tag (`case-study-card.tsx:32`), outcome chip (`case-study-card.tsx:41`), hero eyebrow pill (`hero.tsx:17`), tech chip (`tech-ecosystem.tsx:37`), work detail tag (`app/work/[slug]/page.tsx:92`) | Consolidate onto `Badge` variants (or extend `Eyebrow`/a new `Pill` primitive) per NDL 02.5; delete the duplicates | 5 files, cosmetically low-risk since they're already visually similar |
| 6b | medium | 41 hand-rolled "card" containers across 27 files never route through `components/ui/card.tsx` | `forms/newsletter-signup.tsx:19`, `case-studies/insight-card.tsx:10` & `case-study-card.tsx:10` (near-identical `rounded-2xl border border-border bg-surface/50 ...`), all of `components/games/*`, `components/calculators/*` | This is less urgent than it sounds - `ui/card.tsx` itself only knows `rounded-lg`, one radius step below what marketing cards actually use. Fix 4a first (radius scale), then decide whether `Card` should grow a `size`/`radius` prop or these stay as intentional one-offs | Large surface area but low urgency - visual output is already consistent, it's a maintainability issue not a bug |
| 6c | medium | Identical "pill filter/tab" button pattern copy-pasted across 4 files instead of a `Button` variant | `case-studies/workflow-stages.tsx:32-37`, `work-grid.tsx:36-41`, `sections/insights-grid.tsx:30-35` (byte-identical class string + active/inactive branch); `before-after.tsx:63-68,79-84` (near-identical) | Add a `filter`/`tab` variant to `buttonVariants` in `components/ui/button.tsx` and migrate all 4 | 4 files, mechanical |
| 6d | low | 1 clickable "card-as-button" duplication | `components/games/decision-card.tsx:13-20` - a raw `<button>` styled as a full card | Low priority, single-use in the Workflow Rescue game | 1 file |
| 6e | low | 7 unused shadcn primitives, dead code | `components/ui/sidebar.tsx`, `breadcrumb.tsx`, `pagination.tsx`, `menubar.tsx`, `context-menu.tsx`, `navigation-menu.tsx` confirmed never imported outside `components/ui/` itself | Delete - this is boilerplate scaffolding from the shadcn template that was never wired up; it's also why some of the `outline-none`/shadow counts above look worse than the shipping app actually is | Zero user-facing risk; reduces audit noise and bundle for anyone who later imports one by accident |

---

## 7. Accessibility

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 7a | **high** | 2 files, but ships on every page | `DialogPrimitive.Close`/`SheetPrimitive.Close` close buttons have **no size/padding classes** - hit area is just the `h-4 w-4` icon (approx 16x16px) | `components/ui/dialog.tsx:47-49`, `components/ui/sheet.tsx:68-70` - the Sheet one is the mobile-nav close button, live on every route via `components/layout/header.tsx:67-95` | Add `h-11 w-11` (or a padded hit-area wrapper) to both Close buttons per CLAUDE.md rule 6 (44x44px floor) | Every route - this is the mobile nav close button |
| 7b | medium | 1 instance, no visual focus indicator at all | `components/calculators/maturity-assessment.tsx:50` - `tabIndex={-1}` results panel is programmatically focused after quiz submission (line 41) but has bare `outline-none` with no ring replacement | Add `focus-visible:ring-2 focus-visible:ring-brand` (or just `:focus` since it's programmatic, not tab-reached) | 1 file, but it's the exact moment a screen-reader/keyboard user needs the focus move confirmed |
| 7c | low | `header.tsx` menu button at exactly 40x40px | `components/layout/header.tsx:69` - `size="icon"` default is `h-10 w-10` (`button.tsx:26`) | Bump the `icon` size variant to `h-11 w-11` (44px) site-wide, or give this one instance extra padding | Every icon-only button using the default size |
| 7d | none found | 0 duplicate `<h1>` | Checked `hero.tsx:21`, `page-header.tsx:22` (shared by 14 routes), `insights/[slug]/page.tsx:41` - no page imports both `Hero` and `PageHeader` | -- clean | -- |
| 7e | none found / N-A | 0 missing `alt` | Zero `<Image>` and zero raw `<img>` anywhere in the codebase - every visual is inline SVG, CSS gradients, lucide icons, or WebGL. The audit question ("images missing alt") doesn't apply; what would apply instead is confirming every `aria-hidden` on decorative SVG is correct, which spot-checks (`logo.tsx:16-33`, icon usages throughout) confirm it is | -- clean, and worth remembering as a real constraint: NDL's imagery rules (section 10) about AVIF/lazy-loading/aspect-ratio are moot for this site as built | -- |
| 7f | none found | 4/4 icon-only controls correctly labelled | `header.tsx:69` (`aria-label="Open menu"`), `dialog.tsx`/`sheet.tsx` close buttons (`sr-only` "Close"), `pagination.tsx:67,83` (unused primitive, but correct if it ships later) | -- clean | -- |
| 7g | low | 41 `outline-none` occurrences, all but ~5 paired with a real focus-visible replacement | Menu-family primitives (`context-menu.tsx`, `dropdown-menu.tsx`, `menubar.tsx`, `select.tsx:121`, `navigation-menu.tsx:44`) pair it with `focus:bg-accent` (a colour change, not a ring) rather than `focus-visible:ring-*` | Weaker than ideal but not a floor violation - upgrade to a ring when these primitives are touched for other reasons; most are also dead code per 6e | Low - mostly unused primitives |

**Overall verdict:** materially better than a typical unaudited app - h1 hygiene,
icon labelling, and alt-text (moot) are all clean. The two real, live,
floor-level violations (7a, 7b) are both small and specific.

---

## 8. Structure

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 8a | high | Homepage skeleton order deviates from NDL section 1 in two ways | Actual order: `Hero -> CredibilityStrip -> ProblemToProduct -> ServicesGrid -> FeaturedWork -> ProcessTimeline -> WhyGrentech -> TechEcosystem -> InsightsPreview -> FinalCta` (`app/page.tsx:24-33`). (1) The marquee-pattern component (`TechEcosystem`, using `components/effects/marquee.tsx`) sits at position 8, not position 2 right after the hero where NDL uses it for "breadth without prose" before the reader has scrolled far. (2) `CredibilityStrip` (position 2) is a 4-icon trust-chip row with **no numbers** - it fills the *position* of the section 1 stat band but not the *function*; there is no numeric stat band anywhere on the site | Consider moving `TechEcosystem`'s marquee earlier; add a real stat band (3-4 hard numbers - see 9b) somewhere in the first two screens | Homepage only, structural reorder + one new section |
| 8b | high | No Testimonials section anywhere in the codebase | Confirmed via full-repo search - no testimonial data, no testimonial component, no `AggregateRating` | Section 1's trust-then-objections sequence (testimonials -> FAQ) is missing its first half entirely; this is a content problem as much as a structural one (you'd need real client quotes) | New component + new content, whenever real testimonials exist |
| 8c | medium | Inner pages (`about`, `services`, `how-we-work`) hand-roll `<section>` blocks inline instead of composing from `components/sections/*` the way the homepage does | Only shared piece across them is `PageHeader`; `services/page.tsx` and `about/page.tsx` build their sections inline; `how-we-work/page.tsx` reuses `ProcessTimeline` but hand-rolls the rest | Lower priority than it sounds - extract shared sections opportunistically as Phase 3 touches these pages, don't do a big-bang refactor | 3 route files |
| 8d | none found | FAQ pattern exists correctly, just only on one route | `servicesFaq` data + `Accordion` in `app/services/page.tsx:101-102`/`data/services.ts:135` - matches the section 1 skeleton's FAQ section shape | No fix needed; see section 11 for the missing structured-data half of this | -- |

---

## 9. Copy

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 9a | low | 1 banned-vocabulary hit in user-facing copy | "Learn more" link, `components/sections/services-grid.tsx:38` | Rename to name the outcome, e.g. "See how it works" | 1 file |
| 9b | **high** (voice-rule, not vocabulary) | 0 quantified stats anywhere on the site | `CredibilityStrip` (`credibility-strip.tsx:6-11`) is 4 qualitative capability labels, not numbers; no client count, years-in-business, or outcome percentage exists anywhere in `data/` | NDL section 4.2 "numbers are always specific" / the specificity test fails site-wide - this is the single biggest copy gap, bigger than any banned word. **Don't invent numbers** (Playbook section 5 rule: flag, don't fabricate) - this needs 2-3 real figures from you (projects delivered, years active, a measurable outcome) before it can be fixed | Homepage stat band + hero lede, wherever real numbers exist |
| 9c | none found | "seamless" only appears in a code comment (`marquee.tsx:17`), not shipped copy; zero hits for every other banned term; zero hits for "thousands of"/"100%"/"countless" as stat-sounding claims (the "100%" hits found are SVG/CSS attribute values, not copy) | -- | Copy is already unusually disciplined for a pre-audit codebase | -- |
| 9d | low | Footer copyright year hardcoded | "(c) 2026 Grentech. All rights reserved." - `components/layout/footer.tsx:92` | `(c) {new Date().getFullYear()} Grentech.` | 1 file, 1 line |

**Overall verdict:** the copy voice is already close to NDL's "dry, specific"
register in the prose that exists (see the services descriptions - genuinely
good). The gap isn't tone, it's **evidence**: no numbers, no testimonials (8b),
nothing a skeptical reader can independently verify.

---

## 10. Performance

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 10a | **high** | Full Three.js / @react-three/fiber / @react-three/drei stack ships on 7 of 15 routes, including the homepage | `components/three/` - 12 files, 650 lines, 8 of which import the 3D libs directly; imported from `app/about`, `app/services`, `app/how-we-work`, `app/contact`, `app/work`, `app/insights` page files, and from `components/sections/hero.tsx:6` (`WebGLHero`) on the homepage | **This contradicts the repo's own README** (`README.md:15`), which states: *"This build uses a lightweight CSS/SVG animated visual instead of an R3F scene - it satisfies the same requirements ... without the added bundle size."* The actual code ships the opposite of what's documented. Either the README is stale (3D was added after it was written) or `WebGLHero`/`TopicVisual` have a non-WebGL fallback path that makes this conditional - worth confirming which, since three.js is one of the heaviest dependencies a marketing site can ship | Up to 6 route templates + the homepage hero; verify real bundle cost with `next build` output before deciding whether to keep, lazy-load harder, or revert to the CSS/SVG approach the README describes |
| 10b | medium | `images.unoptimized: true`, no `remotePatterns`/`formats` config | `next.config.mjs:9-11` | Moot today since there are zero raster images (7e) - but re-enable + configure AVIF/WebP the moment any `<Image>` is introduced, don't leave this set from old boilerplate | Whole app, but currently inert |
| 10c | medium | Build-time error suppression | `next.config.mjs:3-8` - `eslint.ignoreDuringBuilds: true`, `typescript.ignoreBuildErrors: true` | Not a design-system issue, but worth flagging: type errors and lint failures currently can't fail a production build. Re-enable once the lint gates from Phase 1 section 5 are added, so the two efforts land together | Whole app |
| 10d | none found | 0 `"use client"` on any `app/**/page.tsx` route | Confirmed by grep - every route is a Server Component by default, matching CLAUDE.md's stack assumptions exactly | -- clean | -- |
| 10e | low | 62 client components total, concentrated as expected | 27 in `components/ui/` (Radix primitives, unavoidable), 11 in `components/three/`, 8 in `components/calculators/` | Reasonable boundaries already - no whole-page `"use client"` anti-pattern found | -- |

---

## 11. Metadata & structured data

| # | Severity | Count | Example | Proposed fix | Blast radius |
|---|---|---|---|---|---|
| 11a | **blocker** | 0 favicon, 0 app icon, 0 OG/Twitter image, 0 manifest, 0 `theme-color`, anywhere | `public/` is completely empty; no `app/icon.*`/`app/favicon.ico`/`app/manifest.ts` file-convention icons exist either; `openGraph`/`twitter` blocks in `app/layout.tsx:29-40` have no `images` array; grep for `theme-color`/`themeColor` returns nothing | Every browser tab shows a generic globe icon and every social share (LinkedIn, Twitter, Slack) renders with no preview image, site-wide, on every one of the 15 routes. This is the cheapest fix in the whole audit relative to its visibility - one 1200x630 OG image, a favicon set, and a `theme-color` matching `--background` | Every single page |
| 11b | high | 13/15 routes set only `title` + `description` + `alternates.canonical`; **zero** routes set their own `keywords`, `robots`, `openGraph`, or `twitter` | Verified across `app/page.tsx`, `services/page.tsx`, `contact/page.tsx`, and both dynamic `[slug]` routes - all inherit the identical root `openGraph`/`twitter` block from `app/layout.tsx:29-40` | Per-route OG/Twitter title+description (and eventually per-route share images, e.g. per case study) per NDL section 5's required-per-page contract | 13 route files |
| 11c | high | Live FAQ content with no matching schema | `servicesFaq` renders as a real accordion on `/services` (8d) but grep for `FAQPage` across the whole repo returns 0 matches | Add `FAQPage` JSON-LD to `app/services/page.tsx` mirroring the visible questions exactly, per NDL section 5 | 1 route |
| 11d | medium | Only one JSON-LD block exists anywhere: the root `ProfessionalService` | `app/layout.tsx:43-56`, emitted on every page via `RootLayout` | No `SoftwareApplication` schema for the product/tools, no `BreadcrumbList` on nested routes (`/work/[slug]`, `/insights/[slug]`), no `CreativeWork` on case studies | Nested route templates |
| 11e | see 0.1 | `areaServed: "GB"` / `address.addressCountry: "GB"` in the one JSON-LD block that exists | `app/layout.tsx:49-53` | Blocked on the jurisdiction decision in section 0.1 | Every page |
| 11f | low | `sitemap.ts`/`robots.ts` are both clean, correctly generated (not hand-written) | `app/sitemap.ts`, `app/robots.ts` | No fix needed | -- |

---

## Summary - the three highest-leverage changes

**First, resolve the UK/India identity question (section 0.1)** before any copy or
metadata work touches `lib/constants.ts`, the About page, the Privacy Policy, or
the Organization JSON-LD - it's the one finding in this audit that isn't a design
decision, and fixing tokens or copy around it first just means redoing that work
once the real answer is confirmed. **Second, extend `tailwind.config.ts`'s
`boxShadow` and `borderRadius` mappings (4a, 5a)** - this is the highest ratio of
impact to effort in the whole audit: two small config additions fix a named
CLAUDE.md anti-pattern (black shadows on a dark canvas) currently shipping on
every dropdown, dialog, tooltip and popover in the app, and make the 8-value
radius sprawl themeable for free, with zero component-file edits. **Third, close
the credibility gap (9b, 11a, 8b)** - a real favicon/OG image/`theme-color` set
(cheap, mechanical, affects all 15 routes' browser and social presence) paired
with 2-3 real numbers for a genuine stat band, since NDL's whole thesis
("specificity is the voice") is currently undermined by a site with strong
writing but zero independently-checkable proof points. None of these three
require touching component structure or waiting on Phase 1's full token
substrate - they can start immediately, in parallel with Phase 1.
