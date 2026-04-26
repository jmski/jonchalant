# Phase 1 — Closeout

Phase 1 (home page placement of verified primitives + positioning
correction) shipped over four execution sessions following the audit
session. This document records what landed, what deviated from the
audit plan, what was deferred, and what carries into Phase 2.

---

## What shipped

### P0 — Hero replacement

**Final state:**
- Headline: `Most people are in the right industry. *Wrong* role.`
- Subhead: `I help professionals find the work they were meant for, and
  learn to inhabit it. It starts with eight honest questions.`
- Eyebrow: `Ikigai · the map before the practice`
- CTA: `Discover Your Ikigai` → `/ikigai`

**Deviation from audit plan:** The audit locked
`Find the work you were meant for.` as the headline. First execution
shipped a different string (`Most people are in the right industry.
Wrong role.`) sourced from a stale migration script. Once the stale
seed was identified as the source, the live page was corrected and
the migration script was fixed in place. The corrected headline
(`Most people are in the right industry. Wrong role.`) is the final
ship state — diagnostic framing rather than aspirational, closer to
the actual reader state described in the audience definition.

### P1 — Three Steps + Four Pillars consolidation

**Final state:**
- Three Steps (`WhyItWorks` component, timeline mode) carries the
  methodology in a dark band: Discover → Understand → Embody.
- Four Pillars (`FourPillars` component, 2×2 grid) carries the proof
  of medium-agnostic transfer: Grounding / Energy / Flow / Command,
  each with three medium-specific mini-applications.
- Legacy Four Fundamentals (`WhyItWorks` bento mode) removed.

**Deviation from audit plan:** The audit assumed Four Fundamentals
was a separate component. Reality: it was the bento render mode of
the same `WhyItWorks` component that produced Three Steps. The first
P1 ship added `FourPillars` as a new section without disabling the
bento mode, causing the home page to render *both* — the original
Four Fundamentals AND the new FourPillars — back-to-back. Caught in
the post-P1 visual audit. Resolved by removing the bento variant
entirely from `WhyItWorks` and deprecating (not deleting) the
associated Sanity schema fields.

### P2 — Section refinements

- **P2.1 — Meet Jon headline:** `Meet Jon` → `I learned to lead
  because the lesson plan required it.` (design-system phrase
  library). Body text rewritten to resolve the claim.
- **P2.2 — Foundation Starter Guide:** Confirmed home page had no
  duplicate opt-in (audit assumption was wrong). Foundation page
  gained the starter-guide opt-in between FAQ and final CTA.
- **P2.3 — Audit/assessment naming:** The audit assumed a single
  asset with naming inconsistency. Reality: two distinct products
  (Ikigai Assessment at `/ikigai`, Presence Audit at `/audit`).
  Cleaned up naming on About page (hardcoded fallbacks) and Privacy
  page (`Quiet Command Starter Guide` → `Jonchalant newsletter`).
  Did not collapse the two products.

### Stale-positioning sweep

A grep across the codebase for off-positioning artifacts
(`Quiet Command`, `introverted creatives`, `Starter Guide` outside
canonical contexts) caught and fixed:

- `app/layout.tsx` root metadata
- `app/(marketing)/opengraph-image.tsx` OG image generation
- `app/(marketing)/about/page.tsx` metadata description
- `app/(marketing)/programs/page.tsx` page title + JSON-LD
- `app/(marketing)/lessons/page.tsx` keywords
- `app/(marketing)/blog/page.tsx` keywords
- `components/sections/home/portfolio-preview/PortfolioPreview.tsx`
  hardcoded description
- `app/api/presence-coach/route.ts` AI system prompt
- `app/api/presence-score/route.ts` AI system prompt
- `app/css/pages-blog.css` comment
- `scripts/seed-foundation-curriculum.ts` Foundation course seed
  (description, philosophy, targetAudience)

### Drift prevention — canonical-content.json

The recurring drift pattern (canonical strings duplicated across
specimen, schema, scripts, and components, with no enforcement that
they stay aligned) was addressed by establishing
`design/canonical-content.json` as a single source of truth for
content strings.

**Refactored to read from canonical-content.json:**
- `scripts/seed-placeholder-content.ts`
- `scripts/migrate-phase1-hero.ts`
- `scripts/migrate-phase1-meet-jon.ts`
- `scripts/migrate-phase1-pillars.ts`

**Intentionally unchanged:**
- `scripts/migrate-hero-fields.ts` (no canonical strings — pure
  data movement between Sanity fields)

**Sanity envelope handling:** `_key` / `_type` markers stayed in
scripts; only source strings moved to JSON. Correct separation of
content from transport.

---

## What deferred to Phase 2

These items surfaced during Phase 1 but didn't block closeout:

1. **Schema cleanup** — `whyItWorksBentoHeadline` and
   `whyItWorksCells` are deprecated (`hidden: true`) but data
   remains in Sanity. Eventual cleanup requires migration handling.

2. **Schema deprecation comment** — Recommended adding a one-line
   warning to the deprecated fields preventing future
   un-hide-without-removal:
   `// DEPRECATED: replaced by 'pillars'. Do not un-hide without`
   `// first removing 'pillars' to avoid duplicate-render bug.`

3. **Pre-run diff safety check for seed scripts** — Before any
   seed script writes to Sanity, it should diff intended writes
   against current state and surface the diff for human approval.
   Twenty lines of TypeScript, would have caught the original P0
   mis-ship.

4. **Carousel.tsx refactor** — Inline colors, Tailwind util-wall,
   and an emoji at line 80. Touches BlogCard, CaseStudyCard,
   LessonCard, DanceCard, and admin. Surfaced in Phase 0,
   intentionally deferred.

5. **Design-system.html as derived artifact** — Long-term
   evolution: regenerate `design-system.html` from
   `canonical-content.json` + templates rather than maintaining
   them separately. Closes the remaining drift surface.

6. **P3 polish items** — Newsletter background color, testimonial
   quote max-width, blog content surfacing, closing CTA copy fix.
   These are genuinely polish-tier and intentionally deferred to
   open Phase 2 with clear scope.

---

## What the audit got wrong

Worth recording for next audit's calibration.

1. **Headline canonical assumption.** Audit assumed
   `Find the work you were meant for.` was the canonical hero;
   actual canonical (per the design-system kinetic specimen and
   final ship) is `Most people are in the right industry. Wrong
   role.` The audit referenced design-system.html but didn't
   distinguish between hero specimens and kinetic-typography phrase
   examples in the same file. Calibration: when the design system
   contains multiple candidate strings for a single placement,
   the audit should surface the ambiguity rather than pick one.

2. **Four Fundamentals as separate component.** Audit treated it
   as a sibling of Three Steps. Reality: same component, different
   render mode. Calibration: when two sections look distinct on
   the page, verify component boundaries before scoping changes.

3. **Two opt-ins on home page.** Audit observed the home page
   "had two opt-ins." Reality: one (the newsletter); the
   "Foundation Starter Guide" was the closing-CTA section, not a
   separate opt-in. Calibration: distinguish opt-in forms from
   CTAs that link to forms.

4. **Single canonical name for assessment.** Audit assumed one
   product. Reality: two distinct products with naming overlap.
   Calibration: ask before scoping a sweep that assumes
   consolidation.

The audit was useful despite these gaps — the Phase 1 priority
ordering (P0 → P1 → P2 → P3) held even when the specifics shifted,
and the audit framework caught real positioning issues that would
have persisted without it.

---

## Closeout criteria — final state

- [x] Live home page matches design-system positioning (corporate
      professionals, ikigai-first framing)
- [x] No layout bugs visible at 1280px or 375px
- [x] One opt-in on the home page (newsletter)
- [x] Audit/assessment naming clarified (two distinct products,
      both correctly named)
- [x] All P0–P2 items have before/after screenshots in
      `design-notes/phase-1-screenshots/`
- [x] Stale-positioning artifacts swept across codebase
- [x] Drift prevention in place (canonical-content.json)
- [x] Migration scripts refactored to read from canonical source
- [x] No drift between seed scripts and shipped content

Phase 1 is complete.

Phase 2 opens with: schema cleanup, P3 polish items, drift-prevention
hardening (pre-run diff), and carousel refactor.
