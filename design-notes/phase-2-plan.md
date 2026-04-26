# Phase 2 — Plan

Carries forward deferred items from Phase 1 closeout, plus P3–P4
polish items from the original change list. Ordered by dependency
and risk.

---

## Execution order

```
P0  → Schema cleanup + deprecation comments          [low risk, clears debt]
P1  → Pre-run diff safety check for seed scripts     [prevents next P0 mis-ship]
       ↓
P2  → P3 polish items (independent, any order)
P3  → Carousel.tsx refactor
P4  → Design-system.html as derived artifact         [long-term, not time-sensitive]
```

---

## P0 — Schema cleanup: deprecated bento fields

**Source:** Phase 1 closeout item 1 + 2.

**Background:** `whyItWorksBentoHeadline` and `whyItWorksCells` were
set to `hidden: true` and `deprecated` in Phase 1 when the bento
render mode was removed from `WhyItWorks`. Data remains in Sanity.
The fields lack a warning that explains *why* they're deprecated —
specifically, the duplicate-render risk if they're ever un-hidden
without removing `pillars`.

**Change 1 — Deprecation warning comment** (`sanity/schemas/homePageContent.ts`):

Add to the existing deprecated block for `whyItWorksBentoHeadline`
and `whyItWorksCells`:

```
// DEPRECATED: bento variant replaced by FourPillars component (Phase 1).
// Do NOT un-hide these fields without first removing the 'pillars' field —
// re-enabling bento data while pillars renders will produce a duplicate
// four-pillars section on the home page. Remove in a migration after
// confirming Sanity data is no longer needed.
```

**Change 2 — Migration script** (new `scripts/migrate-remove-bento-fields.ts`):

Write a safe migration that:
1. Fetches all `homePageContent` documents
2. Logs the current value of `whyItWorksBentoHeadline` and `whyItWorksCells`
   for each document (pre-run diff — see P1 below)
3. Unsets both fields on each document
4. Confirms deletion

Script is idempotent: if fields are already absent, logs "already clean"
and skips.

**Verification:**
- Sanity Studio shows neither field in the document (already hidden;
  this just removes the data)
- `grep -rn "whyItWorksBento\|whyItWorksCells" sanity/schemas/` shows
  fields still present (schema preserved) but with the new warning comment
- Re-running the migration is a no-op

---

## P1 — Pre-run diff safety check for seed/migrate scripts

**Source:** Phase 1 closeout item 3. Would have caught the original
P0 hero mis-ship.

**Change:** Add a `diffAgainstSanity(intended, current)` utility that
seed and migrate scripts call before writing. It fetches the current
Sanity values for the fields they're about to write, diffs them against
the intended values, prints the diff, and prompts for confirmation before
proceeding.

**Implementation sketch:**

```typescript
// scripts/lib/sanity-diff.ts
export async function diffAndConfirm(
  client: SanityClient,
  docId: string,
  fields: string[],
  intended: Record<string, unknown>
): Promise<boolean>
```

- Fetches `docId` from Sanity for the listed `fields`
- For each field: prints `CURRENT` and `INTENDED` if they differ,
  or `UNCHANGED` if they match
- If any field differs, prints a summary and asks:
  `Proceed with write? (y/N)`
- Returns `true` if user confirms, `false` otherwise
- Scripts call this before `.set()` / `.createOrReplace()` and exit
  if it returns `false`

**Scripts to wire up:**
- `migrate-phase1-hero.ts`
- `migrate-phase1-meet-jon.ts`
- `migrate-phase1-pillars.ts`
- `seed-foundation-curriculum.ts` (course-level fields only)
- `seed-four-circles.ts` (course-level fields only)

**Note on `seed-placeholder-content.ts`:** Already uses an
`existing.includes(title)` skip guard. Lower priority for diff wiring —
flag for later.

**Verification:**
- Running any wired script with no Sanity changes prints all fields
  as `UNCHANGED` and exits cleanly without prompting
- Running with a changed intended value prints the diff and halts
  until confirmed

---

## P2 — P3 polish items (from Phase 1 change list)

These are small and independent — can be done in any order or batched.

### P2.1 — Newsletter opt-in background

Pull `EmailCapture` from warm-tan to `--bg-mocha-deep` (dark band).
Check for adjacent dark-band collision with the closing CTA; if they
read as merged, add a cream `SectionWrapper` interstitial between them
or consolidate into one dark section.

**Where:** `components/sections/home/email-capture/EmailCapture.tsx`
+ `app/css/sections.css` (`.email-capture-*` classes).

### P2.2 — Testimonial quote max-width

Add `max-width: 52ch` to the quote text element inside
`components/shared/testimonials/Testimonials.tsx`.

**Where:** `app/css/sections.css` — find the testimonial quote selector
and add the constraint.

### P2.3 — Blog section content surfacing

Check post count in Sanity. If ≤ 2 posts, update the section heading
to honest framing (`Recent writing` or similar) rather than implying
a larger archive. If > 2, adjust the `getRecentBlogPosts()` query
limit.

**Where:** `app/(marketing)/page.tsx` (hardcoded `"From the Blog"` +
`"Insights on purpose..."`) and `lib/sanity.ts` query limit.

### P2.4 — Closing CTA copy fix

`If you've been resisting strong` → reconstruct the sentence based on
intent. Likely Sanity (`ctaDescription` field on `homePageContent`).

---

## P3 — Carousel.tsx refactor

**Source:** Phase 1 closeout item 4. Surfaced in Phase 0, deferred twice.

**Scope (from original finding):**
- Inline colors → CSS variables
- Tailwind utility wall → BEM classes in `sections.css`
- Emoji at line 80 (remove or move to copy)
- Downstream cards: BlogCard, CaseStudyCard, LessonCard, DanceCard, admin

This touches multiple card components and the admin view. Scope a
separate prompt once P0–P2 land.

---

## P4 — Design-system.html as derived artifact

**Source:** Phase 1 closeout item 5. Long-term drift surface.

**Goal:** Regenerate `design-system.html` from `canonical-content.json`
+ a template rather than maintaining it by hand. Closes the last
remaining content drift surface (design-system.html can currently
diverge from canonical-content.json without any signal).

**Not time-sensitive.** Open after Carousel refactor.

---

## What this phase does NOT touch

- Ikigai quiz logic or scoring (`lib/auditData.ts`)
- Portal pages or course content
- Any Sanity schema additions (P0 only removes orphaned data)
- Navigation or footer
- Foundation page layout
