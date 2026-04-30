# Migration Inventory

Generated for Phase 1 of the Sanity schema migration. Read-only research; no code or schema changes were made to produce this document.

Scope: every codebase reference to the 12 legacy Sanity schemas being replaced — `homePageContent`, `aboutPage`, `contactPage`, `auditPage`, `foundationPage`, `programsPageContent`, `service`, `ikigaiQuiz`, `pressMention`, `emailOptIn`, `contactInfo`, `blogConfig`.

## Summary stats

| Metric | Count |
|---|---|
| Legacy schemas to migrate | 12 |
| Legacy schemas with NO production usage (orphans) | 3 (`ikigaiQuiz`, `pressMention`, `service`) |
| Production fetchers in `lib/sanity.ts` requiring rewrite | 9 |
| TypeScript interfaces in `lib/types.ts` requiring update | 7 |
| Component/page files requiring updates | 7 |
| GROQ queries to update | 9 |
| Edge cases requiring human decisions | 8 |

## Document type renames

| Legacy schema | New schema | Type |
|---|---|---|
| `homePageContent` | `pageHome` | Page singleton |
| `aboutPage` | `pageAbout` | Page singleton |
| `contactPage` | `pageContact` | Page singleton |
| `auditPage` | `pageAudit` | Page singleton |
| `foundationPage` | `pageFoundation` | Page singleton |
| `programsPageContent` | `pagePrograms` | Page singleton |
| `emailOptIn` | `newsletterCapture` | Shared singleton |
| `contactInfo` | `siteConfig` (partial) | Shared singleton |
| `blogConfig` | `pageBlog` | Page singleton |
| `service` | — | Removed (orphan; no production usage) |
| `ikigaiQuiz` | — | Removed (quiz logic in `lib/auditData.ts`) |
| `pressMention` | — | Removed (orphan; no production usage) |

## Field path migrations by schema

### `homePageContent` → `pageHome`

Fetcher: `getHomePageContent()` at [lib/sanity.ts](lib/sanity.ts#L397). GROQ filters `_type == "homePageContent" && title == "Home Page"`.
Type: `HomePageContent` at [lib/types.ts](lib/types.ts#L491).
Read by: [app/(marketing)/page.tsx](app/(marketing)/page.tsx).

| Old field | New field |
|---|---|
| `heroEyebrow` | `hero.eyebrow` |
| `heroHeadline` | `hero.headline` |
| `heroSubhead` | `hero.subhead` |
| `heroPrimaryCtaLabel` | `hero.primaryCta.label` |
| `heroPrimaryCtaHref` | `hero.primaryCta.href` |
| `heroSecondaryCtaLabel` | `hero.secondaryCta.label` |
| `heroSecondaryCtaHref` | `hero.secondaryCta.href` |
| `heroStats[]` | `hero.stats[]` |
| `whyItWorksLabel` | (no direct field — see Edge Case 1) |
| `whyItWorksHighlight` | `methodHeader.headline` (see Edge Case 1) |
| `whyItWorksParagraph1/2/3` | `methodSteps[].body` (3 entries) |
| `pillarsHeadline` | `pillarsHeader.headline` |
| `pillars[]` (inline) | `pillarSet` reference → `pillarSet` shared singleton |
| `meetJonHeadline` | `meetJonHeader.headline` |
| `meetJonBody` | `meetJonBodyParagraphs[]` |
| `meetJonImage` | (no destination — see Edge Case 2) |
| `servicesHeadline` | (none — see Edge Case 9) |
| `servicesDescription` | (none — see Edge Case 9) |
| `testimonialsEyebrow` | `testimonialsHeader.eyebrow` |
| `testimonialsHeading` | `testimonialsHeader.headline` |
| `ctaTitle` / `ctaDescription` / `ctaButtonText` / `ctaButtonHref` | `softCta.headline` / `softCta.body` / `softCta.cta.label` / `softCta.cta.href` |

References added on `pageHome`: `starterGuide` → `starterGuideCapture`; `newsletter` → `newsletterCapture`; `auditCta` → `auditCta`; `pillarSet` → `pillarSet`.

### `aboutPage` → `pageAbout`

Fetcher: `getAboutPageContent()` at [lib/sanity.ts](lib/sanity.ts#L276). GROQ filters `_type == "aboutPage" && title == "About"`.
Type: `AboutPage` at [lib/types.ts](lib/types.ts#L381).
Read by: [app/(marketing)/about/page.tsx](app/(marketing)/about/page.tsx).

| Old field | New field |
|---|---|
| `heroHeadline` / `heroDescription` / `heroImage` | `hero.headline` / `hero.subhead` / `hero.image` |
| `originSectionLabel` / `originSectionHeadline` / `originSectionDescription` / `originSectionAnchorWord` / `originPhases[]` / `originImage` | `storyBeats[0].*` (origin beat) |
| `turningPointHeadline` / `turningPointBody` / `introvertImage` | `storyBeats[1].*` (turning point beat) |
| `methodologyHeadline` / `methodologyBody` / `philosophyImage` | `storyBeats[2].*` (methodology beat) |
| `whoForHeadline` / `whoForBody` / `whoForHighlight` | `whoFor.headline` / `whoFor.body` / `whoFor.highlight` |
| `closingHeadline` / `closingBody` / `ctaButtonText` | `cta.headline` / `cta.body` / `cta.primaryCta.label` |
| `bentoTiles[]` | (no clean destination — see Edge Case 3) |

### `contactPage` → `pageContact`

Fetcher: `getContactPageContent()` at [lib/sanity.ts](lib/sanity.ts#L467). GROQ filters `_type == "contactPage"`.
Type: `ContactPageContent` at [lib/types.ts](lib/types.ts#L303).
Read by: [app/(marketing)/contact/page.tsx](app/(marketing)/contact/page.tsx) and [app/(marketing)/contact/ContactClient.tsx](app/(marketing)/contact/ContactClient.tsx).

| Old field | New field |
|---|---|
| `auditPromptBadge` / `auditPromptHeadline` / `auditPromptBody` / `auditPromptButtonText` / `auditPromptNote` / `auditStats[]` | shared `auditCta` singleton (see Edge Case 4) |
| `coachingPathHeading` / `coachingPathBody` / `coachingCalendlyHref` / `coachingCalendlyLabel` | `inquiryCards[]` entry (see Edge Case 4) |
| `sidebarHeading` / `sidebarItems[]` | `thingsWorthKnowingHeader.*` / `thingsWorthKnowingItems[]` |

### `auditPage` → `pageAudit`

Fetcher: `getAuditPageContent()` at [lib/sanity.ts](lib/sanity.ts#L439). GROQ filters `_type == "auditPage"`.
Type: `AuditPageContent` at [lib/types.ts](lib/types.ts#L274).
Read by: [app/(marketing)/audit/page.tsx](app/(marketing)/audit/page.tsx) and [app/(marketing)/audit/AuditClient.tsx](app/(marketing)/audit/AuditClient.tsx).

| Old field | New field |
|---|---|
| `pageHeaderBadge` / `pageHeaderHeadline` / `pageHeaderBody` | `hero.eyebrow` / `hero.headline` / `hero.subhead` |
| `captureBadge` / `captureHeadline` / `captureBody` / `capturePrivacyNote` | `heroMicrocopy` (collapsed — see Edge Case 5) |
| `resultBands[]` (array, keyed by `band` field) | `resultBands.low` / `.mid` / `.high` (object — see Edge Case 6) |
| `resultNextHeading` / `resultNextBody` / `resultCtaText` / `resultCtaButtonLabel` / `resultCtaHref` | `cta.*` |
| `pageFooterNote` | (no destination — see Edge Case 5) |

### `foundationPage` → `pageFoundation`

Fetcher: `getFoundationPageContent()` at [lib/sanity.ts](lib/sanity.ts#L543). GROQ filters `_type == "foundationPage"`.
Type: `FoundationPage` at [lib/types.ts](lib/types.ts).
Read by: [app/(marketing)/foundation/page.tsx](app/(marketing)/foundation/page.tsx).

| Old field | New field |
|---|---|
| `heroEyebrow` / `heroHeadline` / `heroSubheadline` / `heroBody` / `heroPrimaryCtaLabel` / `heroSecondaryCtaLabel` / `heroNote` | `hero.*` |
| `insideEyebrow` / `insideTitle` / `insideBody` | `whyDanceHeader.*` / `whyDanceBodyParagraphs[]` (rename — see Edge Case 7) |
| `modules[]` (references to `module` documents) | `curriculumModules[]` (inline objects — see Edge Case 8) |
| `whoEyebrow` / `whoTitle` / `whoItems[]` | `whoForHeader.*` / `whoForItems[]` |
| `howEyebrow` / `howTitle` / `howCards[]` | `howItWorksHeader.*` / `howItWorksColumns[]` |
| `pricingEyebrow` / `pricingTitle` / `pricingNote` / `pricingTiers[]` | `enrollment.*` fieldset |
| `ctaTitle` / `ctaBody` / `ctaButtonLabel` / `ctaNote` | `softCta.*` |

### `programsPageContent` → `pagePrograms`

Fetcher: `getProgramsPageContent()` at [lib/sanity.ts](lib/sanity.ts#L224). GROQ filters `_type == "programsPageContent"`.
Type: `ProgramsPageContent` at [lib/types.ts](lib/types.ts#L212).
Read by: [app/(marketing)/programs/page.tsx](app/(marketing)/programs/page.tsx).

| Old field | New field |
|---|---|
| `heroEyebrow` / `heroHeadline` / `heroSubheading` | `hero.*` |
| `whoForHeading` / `whoForBody[]` | `heroWhoForColumn.*` |
| `offersEyebrow` / `offersHeading` / `offersSubtext` | (unclear placement — see Edge Case 10) |
| `offerCards[]` | `programCards[]` (uses `programCard` object type) |
| `faqItems[]` | `faqs[]` |
| closing CTA fields | `softCta.*` |

### `emailOptIn` → `newsletterCapture`

Fetcher: `getEmailOptIn()` at [lib/sanity.ts](lib/sanity.ts#L498). GROQ filters `_type == "emailOptIn"`.
Type: `EmailOptInContent` at [lib/types.ts](lib/types.ts#L321).
Read by: [app/(marketing)/layout.tsx](app/(marketing)/layout.tsx) and [app/(marketing)/blog/page.tsx](app/(marketing)/blog/page.tsx).

| Old field | New field |
|---|---|
| `eyebrow` | `eyebrow` |
| `heading` | `headline` |
| `description` | `subhead` |
| `submitButtonText` | `submitLabel` |
| `disclaimer` | `microcopy` |
| `successTitle` / `successBody` | (removed — see Edge Case 11; success state lives on `siteConfig.formMicrocopy.successStates.newsletter`) |

### `contactInfo` → `siteConfig` (partial)

Fetcher: `getContactInfo()` at [lib/sanity.ts](lib/sanity.ts#L258). GROQ filters `_type == "contactInfo"`.
Type: `ContactInfo` declared inline at [lib/sanity.ts](lib/sanity.ts#L38).
Read by: [app/(marketing)/layout.tsx](app/(marketing)/layout.tsx) — used to extract social link URLs (LinkedIn, Instagram, TikTok, YouTube) for the footer.

| Old field | New field |
|---|---|
| `contactMethods[]` (filtered for socials) | `siteConfig.footer.*` social links (see Edge Case 12 — exact field needs confirmation against the new `siteConfig` shape) |
| `contactMethods[]` (non-social entries) | (no destination — see Edge Case 12) |

### `blogConfig` → `pageBlog`

Fetcher: `getBlogConfig()` at [lib/sanity.ts](lib/sanity.ts#L589). GROQ filters `_type == "blogConfig"`.
Type: `BlogConfig` at [lib/types.ts](lib/types.ts#L414).
Read by: [app/(marketing)/blog/page.tsx](app/(marketing)/blog/page.tsx).

| Old field | New field |
|---|---|
| `seriesBannerEnabled` / `seriesName` / `seriesSlug` / `seriesStatus` / `seriesDescription` / `seriesCurrentPhase` / `seriesCTALabel` | (none — see Edge Case 13; series banner fields were not carried over to `pageBlog`) |

## Shared singleton consolidations

### `starterGuideCapture` (new)
No legacy predecessor — net-new singleton. Referenced by `pageHome`, `pageAudit`, `pageFoundation`, `pagePrograms`, `pageLessons`.

### `newsletterCapture` (replaces `emailOptIn`)
Single source: `emailOptIn` → field renames as listed above. Referenced by `pageHome`, `pageBlog`.

### `auditCta` (new)
Closest legacy source: the audit-prompt block on `contactPage` (`auditPromptBadge`, `auditPromptHeadline`, `auditPromptBody`, `auditPromptButtonText`, `auditPromptNote`, `auditStats[]`). Mapping to `auditCta`'s fields (`eyebrow`, `headline`, `body`, `primaryCta`, `microcopy`) is approximate — `auditStats[]` has no destination on the new singleton (see Edge Case 4). Referenced by `pageHome`, `pageBlog`.

### `pillarSet` (new)
Single source: `homePageContent.pillars[]` → moves to `pillarSet.pillars[]` with the same per-pillar shape (`number`, `name`, `definition`, `applications[]`). Referenced by `pageHome`.

### `fourCirclesSet` (new)
No legacy predecessor — net-new singleton. Referenced by `pageIkigai`.

### `siteConfig` (partial replacement of `contactInfo`)
Absorbs:
- `contactInfo.contactMethods[]` → social link URLs surface somewhere on `siteConfig` (footer fields). The exact target field is not yet pinned down; flagged as Edge Case 12.
- Other `siteConfig` content (nav, footer, form microcopy, 404 page, auth pages) is net-new — no legacy predecessor.

## Files requiring changes

Grouped by the legacy schema that triggers the edit. Several files appear under multiple schemas because they consume more than one fetcher.

### Touch points in `lib/`

| File | Reason |
|---|---|
| [lib/sanity.ts](lib/sanity.ts) | Rewrite 9 fetchers (`getHomePageContent`, `getAboutPageContent`, `getContactPageContent`, `getAuditPageContent`, `getFoundationPageContent`, `getProgramsPageContent`, `getEmailOptIn`, `getContactInfo`, `getBlogConfig`) — each needs a new `_type` filter and a new GROQ projection. Also delete the unreferenced `getServices` / `getPrimaryService` / `getService` / `getIkigaiQuiz` / `getPressMentions` (orphaned — confirm with user before removal). |
| [lib/types.ts](lib/types.ts) | Update interfaces `HomePageContent` (line 491), `AboutPage` (line 381), `ContactPageContent` (line 303), `AuditPageContent` (line 274), `ProgramsPageContent` (line 212), `EmailOptInContent` (line 321), `BlogConfig` (line 414). `IkigaiQuiz` / `IkigaiQuizQuestion` / `IkigaiAnswerOption` / `IkigaiResultInterpretation` (lines 77, 100, etc.) can be deleted once `getIkigaiQuiz` is removed — pending confirmation. |

### Touch points in `app/`

| File | Schemas consumed |
|---|---|
| [app/(marketing)/page.tsx](app/(marketing)/page.tsx) | `homePageContent` |
| [app/(marketing)/about/page.tsx](app/(marketing)/about/page.tsx) | `aboutPage` |
| [app/(marketing)/contact/page.tsx](app/(marketing)/contact/page.tsx) + [ContactClient.tsx](app/(marketing)/contact/ContactClient.tsx) | `contactPage` |
| [app/(marketing)/audit/page.tsx](app/(marketing)/audit/page.tsx) + [AuditClient.tsx](app/(marketing)/audit/AuditClient.tsx) | `auditPage` |
| [app/(marketing)/foundation/page.tsx](app/(marketing)/foundation/page.tsx) | `foundationPage` |
| [app/(marketing)/programs/page.tsx](app/(marketing)/programs/page.tsx) | `programsPageContent` |
| [app/(marketing)/blog/page.tsx](app/(marketing)/blog/page.tsx) | `emailOptIn`, `blogConfig` |
| [app/(marketing)/layout.tsx](app/(marketing)/layout.tsx) | `emailOptIn`, `contactInfo` |

### Touch points in `components/`

| File | Schemas consumed |
|---|---|
| [components/shared/press-strip/PressStrip.tsx](components/shared/press-strip/PressStrip.tsx) | `pressMention` — component is unused in production; safe to delete (confirm with user). |

## Legacy schemas with no replacement

Verified by grep across `app/`, `components/`, `lib/`, `utils/`, `scripts/`:

| Schema | Fetcher | Production callers | Status |
|---|---|---|---|
| `ikigaiQuiz` | `getIkigaiQuiz()` at [lib/sanity.ts](lib/sanity.ts#L748) | None | Orphan. Quiz logic lives in [lib/auditData.ts](lib/auditData.ts). Recommend: delete fetcher + `IkigaiQuiz*` types in [lib/types.ts](lib/types.ts#L77-L100). Schema can stay registered until data is decommissioned (Phase 4). |
| `pressMention` | `getPressMentions()` at [lib/sanity.ts](lib/sanity.ts#L602) | None | Orphan. Component [PressStrip.tsx](components/shared/press-strip/PressStrip.tsx) exists but is never imported anywhere. Recommend: delete fetcher + component (Phase 2). |
| `service` | `getServices()`, `getPrimaryService()`, `getService(slug)` at [lib/sanity.ts](lib/sanity.ts#L174-L183) | None | Orphan. `SERVICE_FIELDS` constant + 3 fetchers are dead code. Recommend: delete fetchers + constant (Phase 2). |

## Edge cases and unknowns

Each item flags a non-obvious mapping decision the user needs to make before the Phase 2 rewrite proceeds.

1. **Home "Why It Works" → "Method" rename.** `homePageContent` had a single block (`whyItWorksLabel`, `whyItWorksHighlight`, `whyItWorksParagraph1/2/3`). `pageHome` has a 3-step `methodSteps[]` with separate `title` and `body` per step. The 3 paragraphs likely map to the 3 step bodies, but step titles have no source. **Decision needed:** generate step titles from canonical copy, or fall back to a default like "Step 1 / 2 / 3"?

2. **Home "Meet Jon" image.** `homePageContent.meetJonImage` exists but `pageHome.meetJonHeader` (a `sectionHeader` object) has no image field. **Decision needed:** add an `image` field to `meetJonHeader` (or to `pageHome` directly), or drop the image and replace with copy-only treatment?

3. **About bento tiles → story beats.** `aboutPage.bentoTiles[]` was a flexible mosaic (portrait, quote, stat, bio variants). `pageAbout.storyBeats[]` is a 3-beat narrative (origin / turning point / methodology). These are not the same shape. **Decision needed:** is the bento layout being retired, or does `pageAbout` need a separate `bentoTiles` field re-added alongside `storyBeats`?

4. **Contact audit-prompt block.** `contactPage.auditPromptBadge/Headline/Body/ButtonText/Note + auditStats[]` was a dedicated block. The new layout splits this between (a) the shared `auditCta` singleton and (b) `pageContact.inquiryCards[]`. `auditStats[]` has no destination on `auditCta` (which lacks a stats array). **Decision needed:** drop `auditStats[]`, or extend `auditCta` to include a stats array?

5. **Audit capture block.** `auditPage.captureBadge`, `captureHeadline`, `captureBody`, `capturePrivacyNote`, `pageFooterNote` were 5 distinct strings. `pageAudit` collapses them to a single `heroMicrocopy` field. **Decision needed:** keep collapsing (lossy — only one survives), expand `pageAudit` to retain all 5 fields, or move email capture to a shared singleton like `starterGuideCapture` and have `pageAudit` reference it?

6. **Audit result bands shape change.** Old: `resultBands[]` array, each entry tagged with `band: 'foundation' | 'developing' | 'refining'`. New: `resultBands` object with explicit `.low` / `.mid` / `.high` keys. The semantic mapping (`foundation` → `low`, `developing` → `mid`, `refining` → `high`) is plausible but unconfirmed. **Decision needed:** confirm the band-to-key mapping. Also: `AuditClient` currently uses `.find(b => b.band === 'foundation')` — needs full rewrite, not a one-line patch.

7. **Foundation "What's Inside" → "Why Dance" rename.** Section semantics shifted from product description to philosophical justification. Existing copy in Sanity (`insideBody`) may not survive verbatim into `whyDanceBodyParagraphs[]`. **Decision needed:** is the existing prose being kept, or is this section being rewritten from scratch in Phase 2 (in which case migrating field-by-field is moot)?

8. **Foundation modules: references → inline objects.** Old: `foundationPage.modules[]` was an array of references to standalone `module` documents. New: `pageFoundation.curriculumModules[]` is inline. This means `module` documents become orphaned content. **Decision needed:** are existing `module` documents being deleted, kept as standalone content, or migrated into `curriculumModules[]` inline objects? The desk structure currently shows them under "Curriculum content" — implies they stay.

9. **Home services section.** `homePageContent.servicesHeadline` / `servicesDescription` are read by [app/(marketing)/page.tsx](app/(marketing)/page.tsx). `pageHome` has no equivalent fields. **Decision needed:** is the services strip being removed from home, or do these fields need to be added to `pageHome` (or sourced from `siteConfig`)?

10. **Programs offers section.** `programsPageContent.offersEyebrow / offersHeading / offersSubtext` precede `offerCards[]`. `pagePrograms.programCards[]` exists, but the wrapper section header for the cards is unclear in the new schema. **Decision needed:** confirm whether `pagePrograms` has a `programsHeader` (or equivalent) field that the eyebrow/heading/subtext map to.

11. **Newsletter success state.** `emailOptIn.successTitle / successBody` are gone in `newsletterCapture`. The new approach surfaces success copy via `siteConfig.formMicrocopy.successStates.newsletter`. **Decision needed:** confirm this is the intended replacement — and that `getEmailOptIn` (or the new `getNewsletterCapture`) will be supplemented by a `getSiteConfig` fetch on every page that renders the form.

12. **`contactInfo` → `siteConfig` socials mapping.** [app/(marketing)/layout.tsx](app/(marketing)/layout.tsx) currently filters `contactInfo.contactMethods[]` to extract social URLs. The new `siteConfig` shape was not exhaustively inspected — exact target field for socials is unknown. **Decision needed:** point to the field on `siteConfig` that holds social URLs (or confirm the new schema needs a dedicated `socials[]` field added). Also: non-social entries on `contactMethods[]` (e.g., email, phone) — do they survive?

13. **Blog series banner.** `blogConfig.series*` fields drive a `<SeriesBanner>` on the blog index. `pageBlog` does not appear to carry these fields. **Decision needed:** is the series banner feature being retired, or does `pageBlog` need a `seriesBanner` block added?

---

End of inventory. Phase 2 is paused until decisions on the 13 edge cases (the 8 numbered in the original outline plus 5 follow-ups discovered during the field-walk) are resolved.
