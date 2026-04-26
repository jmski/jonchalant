# Phase 3 — Closeout

Phase 3 (Foundation page content pass + structural polish) shipped in one execution session
following the Phase 2/3 audit. This document records what landed, deviations, deferrals, and
audit calibration notes.

---

## What shipped

### P0 — Foundation Hero

**Final state:**
- Headline: `Knowing the work isn't the same as {{inhabiting}} it.`
  (renders with *inhabiting* in mocha-mousse italic via `renderHeadline()`)
- Eyebrow: `THE FOUNDATION · 8 WEEKS · MEDIUM-AGNOSTIC EMBODIMENT`
- Subhead: `Eight weeks of body-first practice in Grounding, Energy, Flow, and Command.
  Your medium. Your role.`
- Body: A decade of choreography / insight in the mind / presence in the body copy.
- Primary CTA: `Enroll — starting at $197` → `#pricing`
- Secondary CTA: `See what's inside` → `#inside`
- Note: `No pressure. No pitch. Enroll when you're ready.`

Delivered via Sanity migration `migrate:phase3-foundation-hero`.

---

### P1 — Pricing + Methodology + Curriculum copy

**Final state:**

**Pricing section:**
- `$197 Self-Paced`: "Full course access. All 8 weeks and lessons, at your own pace."
- `$497 With Weekly Check-ins`: "Weekly 15-minute calls with Jon for the full 8 weeks —
  most useful if you're navigating a specific role, situation, or transition in real time."
- Badge on primary card (hardcoded JSX): `Recommended for transitions`
- Primary card visual treatment (VH-A + VH-B): top border `--mocha-mousse`, warm elevation
  shadow `rgba(164, 120, 100, 0.15)`.
- Fine print: "14-day refund policy for both tiers — complete the first two weeks and reach
  out if it's not right. Check-in spots are limited per cohort."

Delivered via Sanity migration `migrate:phase3-foundation-p1`.

**Methodology cards:**
- Card 1: `Sequenced for the body, not the syllabus`
- Card 2: `Movement-grounded principles` / "Each week takes a principle from dance —
  precision, weight, responsiveness, stillness — and shows you what it looks like when
  you're not dancing. The translation is the practice."
- Card 3: `Personal follow-up from Jon` (unchanged)

**Curriculum module titles:**
- M1: `Why Practice Outlasts Performance`
- M5: `Reading the Exchange`
- M8: `The Work, Embodied`
- M4 description: light-touch rewrite (improviser's skill framing)
- M2, M3, M6, M7: unchanged

All 8 modules patched via `migrate:phase3-foundation-modules`. `foundationPage.modules`
wired to reference all 8 module documents in order.

**Seed drift prevention:**
`scripts/seed-foundation-curriculum.ts` refactored to pull title/description from
`canonicalContent.foundationPage.curriculum.modules` via `canonicalModuleMap`. Zero
hardcoded module strings remain in the script.

---

### P2 — On-ramp for direct-traffic readers

**Final state:** Single-line strip at the bottom of the hero section (inside hero
SectionWrapper, below hero content):

> Haven't named the work yet? [Start with the ikigai assessment.](#) →

- Hardcoded JSX in `page.tsx` (single-instance string; badge precedent applied)
- Links to `/ikigai`
- Styled via `.foundation-onramp` + `.foundation-onramp a` (text-secondary, underline,
  underline-offset 2px)
- No button style, no SectionWrapper of its own

---

### P3.A — FAQ Q6 update

Q6 "What's the difference between the Self-Paced and With Check-ins tiers?" answer updated
to align terminology with P1 pricing copy:

> "Both tiers include full access to all 8 weeks of lessons. The With Check-ins tier adds
> a weekly 15-minute call with Jon — most useful if you're navigating a specific role,
> situation, or transition in real time (a promotion, a difficult team, a speaking
> engagement). Eight calls over the 8 weeks."

Previous answer used "1:1 call" and "weekly 1:1"; now consistent with "15-minute call"
pricing language. Q1–Q5 unchanged.

---

### P3.B — Page-bottom section reorder + variant swap

**New order:** FAQ → Audit CTA → Starter Guide (EmailCapture)
(Previously: FAQ → Starter Guide → Audit CTA)

**Variant change:** EmailCapture SectionWrapper changed from `variant="dark"` to
`variant="secondary"`. The section is now a low-key close, not a high-contrast pitch.

**Spacing:** Transition from Audit CTA (primary variant) → Starter Guide (secondary variant)
reads cleanly — no padding adjustment needed. The background contrast difference between
primary and secondary provides natural visual separation.

---

### P3.D — Module metadata de-emphasis

`.foundation-module-meta` in `pages-foundation.css`:
- `font-size: 0.8125rem` → `0.6875rem`
- Added `opacity: 0.75`

Existing `color: var(--text-tertiary, #888)` preserved. The combined treatment (smaller
size + reduced opacity on an already-tertiary color) renders as clearly de-emphasized
without becoming illegible.

---

### P3.C — Audit CTA destination

**Confirmed correct.** `page.tsx:303` `href="/audit"` — routes to `/audit`. No change made.

---

### P3.E — Methodology animation

**Confirmed not a bug.** `ScrollFade` uses IntersectionObserver; sections below the initial
viewport render as `opacity-0` until scrolled into view. Screenshots taken at page-top
show blank methodology/curriculum sections — this is correct behavior for real users.

See `design-notes/scrollfade-screenshot-note.md` for the full explanation and re-diagnosis
prevention note.

---

### Philosophy orphan (P3-B from original brief)

`foundationCourse.philosophy` in `canonical-content.json` updated to P3-B draft with
user refinement:

> "Insight lives in the mind. Presence lives in the body. Most training stops at the first
> one. The Foundation starts at the second — using professional dance training to develop
> Grounding, Energy, Flow, and Command for the work that's actually in front of you. It
> doesn't teach you to dance. It uses dance as the shortest route to the thing that can't
> be read about or listened to."

Field confirmed orphaned (not rendered anywhere in `app/` or `components/`). Canonical
updated; no Sanity migration scoped.

---

## Deviations from the audit plan

1. **P1 migration idempotency bug.** The first P1 migration run never short-circuited
   because: (a) inline array objects had `_type: 'object'` in canonical but Sanity's
   projection strips it, and (b) key ordering in Sanity responses (alphabetical) differed
   from canonical JSON (insertion order). Fixed by: removing `_type: 'object'` from
   canonical objects, and adding a `stable()` helper that deep-sorts keys before
   `JSON.stringify`. Migration now correctly short-circuits on re-run.

2. **Seed script refactor: missing `>` in type annotation.** `Record<number, { title:
   string; description: string }` was missing the closing `>`. Caught by TypeScript
   during `npm run build`. Fixed before shipping.

3. **Module documents pre-existed.** Pre-flight GROQ query confirmed `foundation-module-1`
   through `foundation-module-8` already existed with deterministic IDs. Migration scoped
   to patch (not create), which simplified the script.

4. **P3.E was a screenshot artifact, not a real bug.** The pre-flight brief scoped P3.E as
   conditional ("diagnose first"). Diagnosis confirmed no fix was needed. ScrollFade
   behavior is correct.

---

## What deferred to Phase 4

1. **Sanity badge field.** `Recommended for transitions` badge text is hardcoded in JSX.
   Phase 4: add `pricingBadgeLabel` field to `foundationPage` schema, migrate to Sanity,
   remove hardcode.

2. **Schema cleanup.** `foundationCourse.philosophy` is an orphan field (set in Sanity,
   never fetched or rendered). Either wire it to the UI or remove the field + migration.
   Phase 4 scope.

3. **`sanity-diff.js` module resolution bug.** `migrate-phase3-foundation-hero` uses
   `ts-node --esm` which fails on Node 24 ESM resolution. Resolved by switching to `tsx`,
   but the underlying `sanity-diff.js` helper that was intended as a pre-run diff tool
   was abandoned. If a diff-before-write pattern is desired, rewrite in `tsx` idiom.

4. **Carousel.tsx refactor.** Carried from Phase 2, still deferred.

5. **Pre-run diff for all migration scripts.** Carried from Phase 1, still deferred.

---

## What the audit got wrong

1. **ScrollFade and screenshot methodology.** The audit plan included visual captures of
   methodology and curriculum sections as evidence of correctness. Screenshots taken at
   page-top position show blank sections due to IntersectionObserver. The audit should
   have flagged this as a capture constraint, not a render requirement.

2. **Philosophy field status.** The audit surfaced `foundationCourse.philosophy` as
   requiring a content update. It is an orphan — present in Sanity, never rendered.
   The audit checked content quality but not whether the field was being consumed.
   Calibration: before scoping a content update, grep for field consumption in `app/`
   and `components/`.

3. **P3.B Starter Guide placement assumption.** The audit assumed the Starter Guide
   section (dark variant, high contrast) was appropriately positioned as a closing
   high-pressure moment. The reorder (Audit CTA → Starter Guide) reversed this:
   the direct commitment ask comes first, and the softer opt-in lands last. Calibration:
   audit should reason about the narrative arc of page-bottom sections, not just whether
   each section is present.

---

## Closeout checklist

- [x] Foundation hero, pricing, methodology, curriculum copy shipped (Sanity + fallbacks)
- [x] All 8 module documents patched; `foundationPage.modules` wired
- [x] Seed script reads from `canonical-content.json` — no hardcoded strings
- [x] FAQ Q6 updated to match pricing terminology
- [x] On-ramp strip added (hero bottom, `/ikigai`, hardcoded)
- [x] Section order: FAQ → Audit CTA → Starter Guide
- [x] EmailCapture variant: `dark` → `secondary`
- [x] Module metadata: `0.6875rem` + `opacity: 0.75`
- [x] ScrollFade note written (`design-notes/scrollfade-screenshot-note.md`)
- [x] `npm run build` clean
- [x] `npm run build:design-system` clean
- [x] `/ikigai` on-ramp link verified in rendered HTML
- [x] `/audit` CTA link verified in rendered HTML
- [x] Section order verified via byte-position check in rendered HTML
- [x] No Sanity migrations needed for P2–P3 changes (all component / CSS edits)
- [x] Phase 3 screenshots in `design-notes/phase-3-screenshots/`

Phase 3 is complete.

Phase 4 opens with: Sanity badge field for pricing card, philosophy field resolution
(wire or remove), Node 24 migration toolchain cleanup.
