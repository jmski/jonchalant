# Phase 1 — Home page change list

Output of the design audit session, 2026-04-24.

Phase 0 verified the primitives (`.jc-section--dark`, `.jc-kinetic`,
em-anchor accent, `SectionWrapper` contract). Phase 1 places those
primitives on live pages. This document scopes the home-page changes,
prioritized by structural dependency.

**Source of truth:** `design/design-system.html`. Where the live home
page conflicts with the design system, the design system wins.
Confirmed during audit.

---

## Working principles for Phase 1 execution

- **One scoped Claude Code prompt per item.** Mixed-scope prompts produce
  mixed-quality output and obscure regressions.
- **Order by P-rating.** P0 blocks all subsequent work — do not parallelize
  P0 with anything else.
- **Visual verification per item.** Capture before/after at 1280px and
  375px. Drop into `design-notes/phase-1-screenshots/` (create as needed).
- **No bundling fixes into verification PRs.** If a change surfaces a
  separate issue, file it as a follow-up. The "alignment PR found stale
  tokens" pattern from Phase 0 — keep that discipline.

---

## P0 — Hero replacement

**Status:** Blocks all subsequent work.

**Change:**
- Headline: `I teach introverted creatives the soft skills` →
  `Find the [em]work[/em] you were meant for.`
- Subhead: replace with design-system canonical: `I help professionals
  find the work they were meant for, and learn to inhabit it. It starts
  with eight honest questions.`
- Eyebrow: keep `FOR CORPORATE PROFESSIONALS` (already correct).
- Primary CTA: keep current destination (assessment), but verify CTA
  label matches the canonical name decided in P2.6.

**Why:** The live headline talks to a different audience than the eyebrow
above it and the funnel below it. Resolving the contradiction is the
single highest-leverage change on the page. Everything else assumes this
is fixed.

**Source content:** `design/design-system.html` § Hero specimen.

**Where to edit:** Likely Sanity (`homePageContent` schema) — verify
whether the headline and subhead are CMS-driven or hardcoded in
`app/(marketing)/page.tsx`. If CMS-driven, this is a Studio edit, no
code changes. If hardcoded, scoped Claude Code prompt.

**Notes:**
hero shipped correctly after an initial mis-ship caused by stale seed script. Worth documenting both the original mis-ship and the corrective fix, so the artifact reflects what actually happened.

**Verification:**
- 1280px and 375px screenshots, before/after
- Confirm the italic [em]work[/em] anchor renders in `--mocha-mousse` (cream
  context) per the verified `.jc-kinetic em` rule from /design-test
- Confirm eyebrow + headline + subhead read as one coherent statement
  ("for corporate professionals → find the work you were meant for →
  here's the mechanism")

**Out of scope:**
- Any layout changes to the hero
- CTA destination changes
- Stats strip below

---

## P1 — Three Steps vs. Four Fundamentals consolidation

**Status:** Decided — Three Steps stays as methodology; Four Fundamentals
becomes proof or is removed.

**Decision pending:** Does Four Fundamentals stay (as proof) or go (and
free up vertical space on the home page)?

### Option A — Four Fundamentals becomes proof of medium-agnostic transfer

Per design-system.html §05 / §09, the four pillars (Grounding, Energy,
Flow, Command) are the medium-agnostic embodiment archetypes. The
strongest possible proof of "this works across mediums" is showing each
pillar applied to *different* mediums (dancer / leader / writer).

The current live cards explain each pillar abstractly. Reworking them
to show three mini-applications per pillar would shift the section from
"here's the methodology twice" to "here's why the methodology transfers."

**Layout:** 2×2 grid (resolves the "Command alone on row 2" bug). Each
card contains: pillar name, one-sentence definition, three mini-examples
(one per medium).

**Risk:** Content-heavy cards. Need to keep each mini-example tight
(one line each). If the cards become walls of text, the section dies.

### Option B — Four Fundamentals is removed entirely

Three Steps carries the full methodology. The page gets shorter, the
cream-cream-cream-cream rhythm gets tighter. "Meet Jon" moves up.

**Risk:** The page loses the "four pillars" framing entirely on the home
page. Reader has to navigate to /lessons/four-circles or /ikigai to
encounter the pillars. Worth checking whether the four pillars are
load-bearing for home-page conversions or whether they live more
naturally in the funnel.

**Recommendation:** Option A. The pillars are too central to the brand
to omit from the home page, and showing them with medium-agnostic proof
is the strongest possible execution. Option B is a fallback if the
content lift is too heavy.

**Where to edit:**
- Section component: likely `components/shared/three-pillars/ThreePillars.tsx`
  or similar (check imports in `app/(marketing)/page.tsx`)
- Sanity: likely `homePageContent` for the cards data — confirm
- Layout: ensure the grid is `grid-template-columns: repeat(2, 1fr)`
  at 1280px, single column at 375px

**Verification:**
- 1280px screenshot showing 2×2 layout, no orphaned card
- 375px screenshot showing single-column stack
- Confirm content-volume per card is tight (each mini-example one line)

---

## P1 — Four Fundamentals grid layout fix

**Status:** Real layout bug regardless of P1.A above.

If Option A is chosen, this is folded into the section rework. If
Option B is chosen, this becomes moot (section removed). Hold this
item open until the P1 decision is made.

---

## P2 — "Meet Jon" headline replaces label with claim

**Change:** `Meet Jon` → claim from design-system phrase library.

Candidates (from design-system.html §02 phrase library):
- `I learned to lead because the lesson plan required it.`
  (Strongest — names the origin, sets up the bio)
- Custom claim written for this section, vetted against the brand voice
  rules (no "unlock," "transform," "journey," etc.)

**Recommendation:** Use the design-system phrase. It's already vetted
and it carries the page's argument forward — the bio that follows then
explains what "the lesson plan required" means.

**Where to edit:** Component or Sanity — check `Programs.tsx` /
`MeetJon.tsx` or equivalent.

**Verification:**
- Headline reads as a claim, not a label
- Bio text below resolves the claim (reader finishes the section
  understanding what "lesson plan required it" referred to)

---

## P2 — Move Foundation Starter Guide opt-in to Foundation page

**Change:** Remove the Foundation Starter Guide opt-in section from
the home page. Add it (or confirm it already exists) on the Foundation
page.

**Why:** Two opt-ins on the home page is one too many. The Foundation
Starter Guide is for warm leads who've signaled interest in the
methodology — not for cold home-page visitors. Newsletter ("One idea
every Tuesday") is the correct cold-lead opt-in.

**Where to edit:**
- Home: remove the section from `app/(marketing)/page.tsx`
- Foundation page: confirm presence; if absent, add it

**Verification:**
- Home page renders without the Foundation Starter Guide section
- Foundation page renders with the Foundation Starter Guide (either
  pre-existing or added)
- Newsletter opt-in remains on home, unchanged

**Out of scope:**
- Newsletter opt-in styling or copy
- Foundation page redesign

---

## P2 — Resolve audit/assessment naming

**Change:** Two distinct products with overlapping naming, cleaned up.

**Current state:** Live home page uses `START WITH YOUR FREE AUDIT` in
the closing CTA. Other pages may use "assessment," "ikigai assessment,"
"presence audit," or similar. Need a sweep.

**Recommendation:** Sweep first, decide second. Run:
```
grep -rni "audit\|assessment" app/ components/ --include="*.tsx" --include="*.ts"
```
Compile every variant. Then decide. The design-system specimen uses
"Discover Your Ikigai" as a CTA label, suggesting the asset itself is
the *ikigai assessment*. Naming should align.

**Where to edit:** Multiple files; likely a repo-wide find-and-replace
once canonical name is chosen.

**Verification:**
- Single canonical name appears across all pages
- CTAs all link to the same destination
- No stale references to deprecated names

**Out of scope:**
- Changing the asset itself
- Changing CTA destinations

---

## P3 — Stats strip label review

**Change:** Confirm the three stats (`30+`, `8wk`, `Free`) carry
labels that read as evidence, not features. Particularly: does
`Free` belong as a stat?

**Action:** Audit at full resolution. If `Free` is labeled as
"Free assessment" it stays. If standalone, replace with a number-driven
stat aligned with the corporate-professional positioning.

**Where to edit:** Sanity (`homePageContent.stats` likely) or component.

**Verification:** Three stats all read as data points, not marketing
copy.

---

## P3 — Newsletter opt-in background color

**Change:** Decide whether the warm-tan background of the newsletter
opt-in is intentional chromatic rhythm or unintentional drift.

**Options:**
- Pull to canonical cream background (consistent rhythm)
- Pull to canonical mocha-deep dark band (heavier visual weight on
  the conversion ask)
- Keep as third color and commit to a tertiary background system

**Recommendation:** Pull to mocha-deep. The newsletter is the page's
final cold-lead conversion ask — giving it the same visual weight as
the closing CTA dark band reinforces "this is where you say yes."

**Risk:** Two adjacent dark bands (newsletter opt-in + closing CTA).
May read as one big dark section. Worth a small cream interstitial
between them or merging them into a single dark section.

**Where to edit:** `BlogOptIn.tsx` (per Phase 0 work, this component
emits `.jc-footer-optin-*`) — verify which section component is
producing the newsletter band.

---

## P3 — Testimonial quote max-width

**Status:** Already queued as a follow-up from primitive migration.

**Change:** Add `max-width: 52ch` to the testimonial quote element.
See earlier prompt in conversation thread for full scope.

---

## P3 — Blog section content surfacing

**Change:** Either surface more posts (if they exist beyond the two
shown) or own the sparse state with copy.

**Action:** Confirm post count in Sanity. If >2 recent posts exist,
adjust query. If only 2 exist, headline shifts to "Two recent essays"
or similar honest framing.

**Where to edit:** `FeaturedBlog.tsx` query or section copy.

---

## P4 — Closing CTA copy fix

**Change:** `If you've been resisting strong` → grammar fix.

**Likely correct version:** `If you've been resisting it, the audit
is where we'll start.` (or similar — needs sentence reconstruction
based on intent).

**Where to edit:** Sanity or component, depending on source.

---

## Decisions deferred (not P-rated)

These came up during audit but don't need resolution before Phase 1
execution begins.

- **Kinetic typography moment on home page.** Where it goes, what it
  says. The hero already gets `.jc-kinetic em` styling on `[em]work[/em]`,
  which functions as the page's anchor moment. Adding a *second* full
  kinetic line elsewhere may compete. Defer until P0-P2 land and the
  page rhythm is observable.

- **Cream-cream-cream-cream rhythm break.** Whether to introduce a
  fourth background variant or accept the rhythm. Defer until P1
  consolidation lands — removing or reworking Four Fundamentals will
  shift the rhythm naturally.

- **Testimonial content audit.** The Menka Suresh testimonial (fitness
  industry) doesn't align with the corporate-professional positioning.
  Content track, not design. Defer to a separate content audit.

- **Cream interstitial between stats and Three Steps dark band.** The
  abrupt cream→dark handoff is real but minor. Address only if it still
  reads abrupt after P0-P2 land.

---

## Execution order

```
P0  → Hero replacement                                    [blocks all]
       ↓
P1  → Decide Four Fundamentals fate (Option A or B)
P1  → Execute the chosen option
       ↓
P2  → Meet Jon headline
P2  → Move Foundation Starter Guide
P2  → Audit/assessment naming sweep
       ↓
P3  → All P3 items can proceed in any order (small, independent)
       ↓
P4  → Copy fix
```

Estimated session count: 3-4 working sessions to land P0-P2. P3-P4
fold into a single cleanup session.

---

## Phase 1 closeout criteria

Phase 1 is complete when:

- [ ] Live home page matches design-system positioning (corporate
      professionals, "find the work you were meant for")
- [ ] No layout bugs visible at 1280px or 375px
- [ ] One opt-in on the home page (newsletter)
- [ ] Single canonical name for the assessment/audit across the site
- [ ] All P0-P2 items have before/after screenshots in
      `design-notes/phase-1-screenshots/`
- [ ] Phase 0 follow-up items (testimonial quote width, etc.) folded
      into Phase 1 or filed as Phase 2

When closeout criteria are met, capture full-page 1280px and 375px
screenshots and update this document with a "Phase 1 complete" section
summarizing what landed and what was deferred.

## Phase 1 surfaced findings

Section listing: seed script refactor (now done) stale-positioning sweep (10_ files), canonical-content.json introduced, scripts grep clean. 