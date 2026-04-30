# Phase 2 — Schema Consumer Migration Summary

**Branch:** `phase-2-clean`
**Status:** ✅ tsc clean (consumers) · ✅ `npm run build` passes · ✅ `npm run dev` boots · ⚠️ Sanity dataset still on legacy shape (E-2 Phase 4 will migrate it)

This phase moved the codebase from "intentionally broken" (post-schema-deploy) back to "compiles and builds cleanly" against the new Sanity page singletons + shared singletons. No legacy schema files were deleted (E-2 owns that). No Sanity data was migrated. Pages render mostly empty until E-2 populates the new dataset.

---

## What changed

### lib/ (foundation rewrite — Step 1)
- **`lib/types.ts`** — full rewrite. New surface aligned to the new pageHome / pageAbout / pageContact / pageAudit / pageFoundation / pagePrograms / pageBlog / pageLessons / pageIkigai documents and the shared singletons (`siteConfig`, `newsletterCapture`, `auditCta`, `starterGuideCapture`, `pillarSet`, `fourCirclesSet`). Preserved: portal/ikigai/curriculum types that aren't part of the marketing schema migration.
- **`lib/sanity.ts`** — full rewrite. Added page fetchers (`getPageHome`, `getPageAbout`, `getPageContact`, `getPageAudit`, `getPageFoundation`, `getPagePrograms`, `getPageBlog`, `getPageLessons`, `getPageIkigai`) and shared singleton fetchers (`getNewsletterCapture`, `getAuditCta`, `getStarterGuideCapture`, `getPillarSet`, `getFourCirclesSet`, `getSiteConfig`). All deletions documented in session notes; preserved fetchers documented there as well.

### Layout + page consumers (Steps 2–4)
- **`app/(marketing)/layout.tsx`** — fetches `getSiteConfig` + `getNewsletterCapture`, propagates to `<SiteFooter>`.
- **`app/(marketing)/page.tsx` (Home)** — uses `getPageHome` + `getSiteConfig` + `getTestimonials` + `getRecentBlogPosts`. Sections: Hero → Method → FourPillars → AuditCTA → MeetJon → Testimonials → BlogCards → StarterGuideForm → EmailCapture (newsletter).
- **`app/(marketing)/about/page.tsx`** — `getPageAbout`. Sections: StoryScroll(beats[]) → WhoFor → CTA. AboutBento + AboutHero usage removed.
- **`app/(marketing)/contact/{page,ContactClient}.tsx`** — `getPageContact`. Inquiry cards drive type selector; `whatHappensNext`, `thingsWorthKnowing`, `emailFallback` come from CMS. Calendly + audit-prompt + coachingPath blocks deleted (see Known gaps).
- **`app/(marketing)/audit/{page,AuditClient}.tsx`** — `getPageAudit` + `getSiteConfig`. `'capture'` step deleted; quiz → result direct. `scoreToKey()` maps legacy `getBand()` (`foundation`/`developing`/`refining`) → new band keys (`low`/`mid`/`high`). Result band CTAs come from `band.primaryCta` / `band.secondaryCta`. Mid-quiz encouragement renders at midpoint. `<StarterGuideForm>` rendered on result.
- **`app/(marketing)/foundation/page.tsx`** — `getPageFoundation` + `getSiteConfig`. Sections: Hero (with whoFor right column) → WhyDance → Curriculum → HowItWorks → Enrollment (`<EnrollButton>` tier derived from `card.title.includes('check')`) → FAQ → SoftCta → StarterGuideForm. All `FALLBACK_*` arrays removed.
- **`app/(marketing)/programs/page.tsx`** — `getPagePrograms` + `getSiteConfig`. `heroWhoForColumn`, `caseStudiesHeader`, optional `programCardsHeader`, inlined `programCards[]` markup, `closingCta:CtaBlock`, FAQ from `faqItems`, StarterGuideForm.
- **`app/(marketing)/blog/{page,BlogClient}.tsx`** — `getPageBlog` + `getSiteConfig` (replaces `getEmailOptIn` + `getBlogConfig`). Hero/newsletter/emptyState/initialPillar/seriesBanner passed to BlogClient.
- **`app/(marketing)/ikigai/page.tsx`** — `getPageIkigai` + `getSiteConfig`. Renders `<IkigaiClient/>` then conditional `<StarterGuideForm/>` from `pageIkigai.starterGuide`.

### Components

Created:
- **`components/forms/StarterGuideForm.tsx`** — `'use client'` shared component used on home, ikigai, audit (result), foundation, programs. Props `{ guide: StarterGuideCapture | null, successMessage?: string }`. Submit handler is a TODO/`console.log` placeholder — no `/api/starter-guide` endpoint exists yet.
- **`components/sections/home/method/Method.tsx` (+ index.ts)** — replaces `WhyItWorks`. Consumes `MethodStep[]` + optional `SectionHeader`.

Modified (prop shape changes — see session notes for fields):
- `components/navigation/SiteFooter.tsx` — accepts `{siteConfig, newsletter}`.
- `components/forms/BlogOptIn.tsx` — `optIn:EmailOptInContent` → `newsletter:NewsletterCapture` + `successMessage`.
- `components/sections/home/four-pillars/FourPillars.tsx` — `{header?, pillars?:PillarCard[]}`.
- `components/sections/home/meet-jon/MeetJon.tsx` — `{header?, image?, bodyParagraphs[], primaryLink?, secondaryLink?}`.
- `components/sections/home/email-capture/EmailCapture.tsx` — `{newsletter?, successMessage?}`.
- `components/sections/about/story-scroll/StoryScroll.tsx` — single `{beats?:StoryBeat[]}` prop.
- `components/sections/about/who-for/WhoFor.tsx` — `{image?, headline, body}`.
- `components/sections/about/origin/Origin.tsx` — local `OriginPhase` interface (the lib type was removed; component is currently orphaned, retained for potential reuse).
- `components/shared/series-banner/SeriesBanner.tsx` — `{featuredSeries?:FeaturedSeries|null}`. Field rename `seriesCTALabel` → `seriesCtaLabel`.

Deleted (orphan after consumer rewrite):
- `components/sections/about/bento/`
- `components/sections/home/credibility-strip/`
- `components/sections/home/why-it-works/`
- `components/sections/home/cta/HomeCTA.tsx`
- `components/shared/press-strip/`
- `components/utilities/cards/ProgramTrackCard.tsx`

Barrel updates: `components/sections/index.ts` (added `Method`, removed `CredibilityStrip` / `WhyItWorks` / `AboutBento` / `HomeCTA`), `components/utilities/cards/index.ts` (removed `ProgramTrackCard`).

### Sanity studio (preserved as-is)
- `sanity/structure.ts`, `sanity/schemas/documents/pages/{pageBlog,pageHome,pagePrograms}.ts`, and `sanity/schemas/documents/shared/siteConfig.ts` carry forward the schema additions made during the schema-deploy commit (`featuredSeries`, `meetJonImage`, `programCardsHeader`, `socialLinks`, `contactEmail`).
- `tsconfig.json` `exclude` array gained `"sanity"` because the studio has its own `sanity/tsconfig.json` and pre-existing TS errors there (unrelated `__experimental_actions` removal in newer Sanity types, `media: unknown` preview returns) would otherwise block `next build`. Verified pre-existing on `e71d08c` via `git stash`.

---

## Schema field migrations applied

| Old field / type                          | New field / type                                   |
|--------------------------------------------|----------------------------------------------------|
| `EmailOptInContent`                        | `NewsletterCapture` + `successMessage`             |
| `heading` / `description` / `submitButtonText` / `disclaimer` | `headline` / `subhead` / `submitLabel` / `microcopy` |
| `HomePillar { name, definition, applications }` | `PillarCard { title, body }`                  |
| `BlogConfig.seriesCTALabel`                | `pageBlog.featuredSeries.seriesCtaLabel`           |
| Audit band keys `foundation/developing/refining` | `low/mid/high` (mapped via `scoreToKey()`)   |
| `offerCards`                               | `programCards`                                     |
| `whoForHeading` / `whoForBody`             | `heroWhoForColumn`                                 |
| `ctaHeading` / `ctaDescription` / …        | `closingCta: CtaBlock`                             |
| Foundation tier inferred from `tierKey`    | Inferred from `card.title.includes('check')`       |

---

## Triage of edge cases (from migration-inventory)

1. ✅ `HomeCTA` deleted — `pageHome` has no terminal CTA (auditCta + starterGuide replace).
2. ✅ `CredibilityStrip` / `WhyItWorks` / `AboutBento` deleted — no schema field.
3. ✅ `ProgramTrackCard` deleted — `programCards[]` shape doesn't match; programs page inlines markup.
4. ✅ `PressStrip` deleted — not referenced by any page; press mentions moved to legacy in studio.
5. ✅ Audit `'capture'` stage deleted — email collection no longer at end of audit.
6. ✅ Calendly + coachingPath deleted from contact (see Known gaps).
7. ✅ Foundation `FALLBACK_*` arrays deleted.
8. ✅ Programs `PROGRAMS_FAQS` hardcoded array deleted.
9. ✅ Blog `EmailOptInContent` + `BlogConfig` → `NewsletterCapture` + `pageBlog`.
10. ✅ Footer drives socials from `siteConfig.socialLinks[]`.
11. ✅ `OriginPhase` removed from lib/types — Origin component (orphaned) retains a local type.
12. ✅ `StoryBeat.anchorWord` not in new schema — dropped (renderHeadline anchor logic untouched).
13. ✅ `AboutWhoFor.highlight` not in new schema — dropped.

---

## Known issues / follow-up work

### Build
- **Home Hero spread bug fixed.** `components/sections/home/hero/Hero.tsx` previously merged props with `{ ...DEFAULTS, ...props }` — when Sanity returned `undefined` for unset hero fields, the spread overwrote defaults, producing `<Link href={undefined}>` and a `formatUrl` crash during static prerender (`Cannot destructure property 'auth' of 'a' as it is undefined`). Now uses per-field `??` fallback. Other components that take optional CTA props directly should be audited the same way during polish.

### Backend gaps (out of scope per directive)
- **No `/api/starter-guide` endpoint.** `StarterGuideForm.handleSubmit` is a `console.log` placeholder. Wire to `useFormSubmission` once the endpoint lands.
- **`/api/subscribe` (newsletter)** exists and accepts `{ firstName, email }` — compatible with current callers.

### Content gaps vs canonical-copy.md
- **Contact page divider line "*or reach out directly*"** (canonical §2) is not currently rendered — was removed alongside the Calendly block. Consider re-adding when the contact page is polished.
- **Calendly** is not referenced in canonical-copy.md anywhere; deletion is justified by canon.

### CSS polish (deferred)
New BEM classes are used without backing styles in the system CSS files. They render as semantic markup with no styling and need entries added during the polish pass:
- `contact-hero` / `contact-hero-headline` / `-subhead` / `-eyebrow`
- `audit-mid-encouragement`, `audit-result-starter-guide`
- `foundation-why-dance` / `-prose` / `-paragraph`, `foundation-pricing-eyebrow`
- `program-track-card-badge`
- `blog-page-eyebrow`, `blog-no-results-headline`, `blog-empty-headline`
- `starter-guide-form` / `-fields` / `-row`, `starter-guide-input`
- `home-starter-guide` / `-eyebrow` / `-headline` / `-body`
- `about-who-for-image`, `story-scroll-payoff`
- `jc-footer-contact`, `meet-jon-link--secondary`

### Sanity TS errors (pre-existing, excluded)
- `sanity/schemas/**` has TS errors against newer Sanity types (`__experimental_actions` removal, `media: unknown` from `prepare()`). These predate this branch and live in the studio sub-package, which has its own `tsconfig.json`. Excluded from root TS via `tsconfig.json` `exclude: ["sanity"]`.

### Tests
- No test scripts in `package.json` (`scripts.test` absent). No tests were run.

---

## Verification status

| Gate                              | Result                                       |
|------------------------------------|----------------------------------------------|
| `npx tsc --noEmit` (consumers)     | ✅ clean (sanity/* excluded, pre-existing)   |
| `npm run build`                    | ✅ passes (home is static)                   |
| `npm run dev`                      | ✅ ready in ~5s, no startup errors           |
| `npm test`                         | ⏭️ no script defined                         |

---

## Ready for E-2

Yes. The codebase compiles and builds against the new schema. Pages will render with mostly empty content until the dataset is migrated — that's the expected Phase 2 end state. E-2 Phase 4 owns deleting the legacy schema files and the legacy data migration script.
