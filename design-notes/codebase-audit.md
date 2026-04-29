# Codebase Cleanup Audit

_Generated: April 2026. Source-of-truth research report for refactor work. Companion to [design/canonical-copy.md](../design/canonical-copy.md). Copy migration is tracked separately — this doc only flags **locations** of hardcoded copy._

---

## 1. Critical Issues

### 1.1 Hardcoded hex colors in page-scoped CSS files

**Severity: HIGH** — Violates rule: "Always use CSS variables for colors — never hardcode hex in page-scoped CSS files"

In [app/css/pages-portal.css](../app/css/pages-portal.css):
- L78, L158: `background: #ffffff;` → use `var(--bg-primary)` or add `--bg-white`
- L250: `color: #ffffff;`
- L1211: `background: #000;`
- L1786–1787: `background: #e8f5e2; color: #3d6b3a;`
- L1791–1792: `background: #f5edde; color: #7a5b20;`
- L1796: `background: #ede8f5;`
- L1815: `color: #fff;`
- L1818–1821: Four ikigai quadrant tag colors (`#6B4F3F`, `#A47864`, `#b89a5f`, `#8A9A85`)
- L1986, L1991, L1996, L2001, L2006: Pillar border colors (`#3b82f6`, `#f59e0b`, `#10b981`, `#8b5cf6`, `#06b6d4`)
- L2159, L2163: Progress bar colors (`#3b82f6`, `#f59e0b`)

**Action**: Add new tokens to [app/css/variables.css](../app/css/variables.css) for quadrant + pillar colors, replace hex throughout.

### 1.2 Non-standard breakpoints

**Severity: MEDIUM** — Rule: only 640 / 768 / 1024.

- [pages-ikigai.css#L38](../app/css/pages-ikigai.css#L38): `@media (min-width: 960px)`
- [pages-portal.css#L875](../app/css/pages-portal.css#L875): `560px`
- [pages-portal.css#L1023](../app/css/pages-portal.css#L1023): `480px`
- [pages-portal.css#L1718](../app/css/pages-portal.css#L1718): `480px`
- [pages-blog.css#L1036](../app/css/pages-blog.css#L1036): `480px`
- [pages-portal-tools.css#L273](../app/css/pages-portal-tools.css#L273): `480px`
- [pages-portal-tools.css#L533](../app/css/pages-portal-tools.css#L533): `480px`

### 1.3 Documentation drift: CSS file count

CLAUDE.md and `copilot-instructions.md` both say "19 CSS files (9 system + 10 page-scoped)". Actual count is **18 (9 system + 9 page-scoped)**. The 10th was likely consolidated. Docs need updating (handled in this audit).

### 1.4 Dormant about-page sections

These exist as full folders but are NOT exported from [components/sections/index.ts](../components/sections/index.ts) and NOT imported by [app/(marketing)/about/page.tsx](../app/(marketing)/about/page.tsx) (which uses `AboutStoryScroll`):

- [components/sections/about/methodology-narrative/](../components/sections/about/methodology-narrative)
- [components/sections/about/turning-point/](../components/sections/about/turning-point)
- [components/sections/about/why-exists/](../components/sections/about/why-exists)

**Action required**: decide — delete OR add to `sections/index.ts`. Currently they're invisible dead code. (Note: `Philosophy`, `Services`, `Introvert` are also dormant but at least exported per CLAUDE.md.)

### 1.5 `!important` usage — acceptable

Only [interactions.css#L147–L150](../app/css/interactions.css#L147) inside `@media (prefers-reduced-motion: reduce)`. This is a legitimate accessibility exception — leave it.

---

## 2. Hardcoded Styling

### 2.1 Inline styles (non-dynamic)

Acceptable (truly dynamic) — leave alone:
- Progress bar widths (`width: ${n}%`)
- Carousel `translateX(...)`
- CSS custom properties via `style={{ '--word-index': i } as React.CSSProperties}`

Violations:

- [components/shared/InstagramEmbed.tsx#L64-L67](../components/shared/InstagramEmbed.tsx#L64): `background: '#FFF'`, `boxShadow: ...` — move to `.instagram-embed-container` in `components.css`
- [app/(marketing)/ikigai/IkigaiClient.tsx#L423](../app/(marketing)/ikigai/IkigaiClient.tsx#L423): `style={{ backgroundColor: 'var(--bg-primary)' }}` — should be inherited
- [app/(marketing)/mfa/MfaClient.tsx#L182](../app/(marketing)/mfa/MfaClient.tsx#L182): inline flex/margin — extract to `.mfa-qr-container` in `pages-forms.css`
- [app/design-test/page.tsx#L32](../app/design-test/page.tsx#L32): inline style — see §5.3 (test page should be removed or gated)

### 2.2 Tailwind utility abuse in JSX

**Clean.** Codebase correctly limits Tailwind in JSX to `text-*`, `font-*`, `leading-*`, and responsive prefixes.

### 2.3 Hardcoded colors / non-token values

Page-scoped CSS: covered in §1.1.

OG image files use hardcoded hex — these are server-rendered to PNG and don't ship to the browser. Acceptable, but should be **explicitly documented as an exception**:

- [app/(marketing)/foundation/opengraph-image.tsx#L12-L104](../app/(marketing)/foundation/opengraph-image.tsx#L12)
- [app/(marketing)/opengraph-image.tsx](../app/(marketing)/opengraph-image.tsx)
- [app/(marketing)/programs/opengraph-image.tsx](../app/(marketing)/programs/opengraph-image.tsx)

Brand assets:
- [app/(marketing)/login/LoginClient.tsx#L172-L175](../app/(marketing)/login/LoginClient.tsx#L172): Google logo SVG with brand hex — acceptable.

### 2.4 Non-standard breakpoints

See §1.2.

---

## 3. Component Refactor Opportunities

### 3.1 Large page files needing decomposition

**Clean.** All marketing pages delegate to section components.

### 3.2 Repeated patterns / hardcoded fallbacks in components

These components carry baked-in default copy. Once Sanity is restructured, defaults should disappear (and all copy should come from props).

- [components/sections/home/why-work-together/WhyWorkTogether.tsx#L7-L15](../components/sections/home/why-work-together/WhyWorkTogether.tsx#L7) — fallback `items` array
- [components/sections/home/email-capture/EmailCapture.tsx#L11-L13](../components/sections/home/email-capture/EmailCapture.tsx#L11) — default `heading` / `subheading`
- [components/sections/about/services/Services.tsx#L13-L16](../components/sections/about/services/Services.tsx#L13) — hardcoded `SectionHeader` props
- [components/sections/home/four-pillars/FourPillars.tsx#L16-L18](../components/sections/home/four-pillars/FourPillars.tsx#L16) — subhead string
- [components/shared/cta/CTA.tsx#L18-L19](../components/shared/cta/CTA.tsx#L18) — default button label "Get Started"

### 3.3 Misplaced / dormant components

See §1.4 (about subsections) and §5.3.

### 3.4 Missing exports

[components/sections/index.ts](../components/sections/index.ts) does not export `MethodologyNarrative`, `TurningPoint`, `WhyExists`. See §1.4.

### 3.5 `'use client'` candidates that could be server components

Components currently marked `'use client'` whose only client behavior is `IntersectionObserver` for scroll-fade animation. These should be wrapped in `<ScrollFade>` / `<ScrollReveal>` (already client) and the inner component made a server component:

- [components/sections/home/meet-jon/MeetJon.tsx](../components/sections/home/meet-jon/MeetJon.tsx)
- [components/sections/home/why-it-works/WhyItWorks.tsx](../components/sections/home/why-it-works/WhyItWorks.tsx)
- [components/sections/home/cta/HomeCTA.tsx](../components/sections/home/cta/HomeCTA.tsx)
- [components/shared/cta/CTA.tsx](../components/shared/cta/CTA.tsx) (already wraps in `ScrollReveal` — internal observer is redundant)
- [components/shared/programs/Programs.tsx](../components/shared/programs/Programs.tsx) — directive present, no apparent client need; verify

### 3.6 Naming violations ("Section" suffix)

- [components/sections/home/impact/ImpactSection.tsx](../components/sections/home/impact/ImpactSection.tsx) — file and export named `ImpactSection`. Rename to `Impact`. Update [sections/index.ts](../components/sections/index.ts).

---

## 4. Hardcoded Copy (locations only)

| File | Lines | Page | Snippet |
|---|---|---|---|
| [components/sections/home/hero/Hero.tsx](../components/sections/home/hero/Hero.tsx#L13) | 13–19 | Home | "Ikigai · The entry point" / hero subhead |
| [components/sections/home/four-pillars/FourPillars.tsx](../components/sections/home/four-pillars/FourPillars.tsx#L9) | 9–18 | Home | "The fundamentals are the same." / subhead |
| [components/sections/home/email-capture/EmailCapture.tsx](../components/sections/home/email-capture/EmailCapture.tsx#L11) | 11–13 | Home | "One idea every Tuesday. No noise." |
| [components/sections/home/meet-jon/MeetJon.tsx](../components/sections/home/meet-jon/MeetJon.tsx#L21) | 21–23 | Home | "Twenty years in dance…" |
| [components/sections/home/why-work-together/WhyWorkTogether.tsx](../components/sections/home/why-work-together/WhyWorkTogether.tsx#L12) | 12–17 | Home | Fallback feature items |
| [components/sections/home/why-it-works/WhyItWorks.tsx](../components/sections/home/why-it-works/WhyItWorks.tsx#L12) | 12 | Home | `STEP_TITLES` array |
| [components/sections/about/services/Services.tsx](../components/sections/about/services/Services.tsx#L13) | 13–16 | About | "The Work" / "What We Work On Together" |
| [components/sections/about/who-for/WhoFor.tsx](../components/sections/about/who-for/WhoFor.tsx#L20) | 20 | About | TODO: closing-line copy |
| [components/sections/about/hero/Hero.tsx](../components/sections/about/hero/Hero.tsx#L51) | 51 | About | TODO: name/role/location |
| [components/sections/about/methodology-narrative/MethodologyNarrative.tsx](../components/sections/about/methodology-narrative/MethodologyNarrative.tsx#L44) | 44 | About | TODO: transition copy |
| [components/sections/about/turning-point/TurningPoint.tsx](../components/sections/about/turning-point/TurningPoint.tsx#L9) | 9 | About | TODO: quote text |
| [components/shared/cta/CTA.tsx](../components/shared/cta/CTA.tsx#L18) | 18–19, 55 | All | Default CTA label / preview items TODO |
| [app/(marketing)/about/page.tsx](../app/(marketing)/about/page.tsx#L94) | 94 | About | TODO: trim closingBody |
| [app/(marketing)/programs/page.tsx](../app/(marketing)/programs/page.tsx#L46) | 46–71 | Programs | `PROGRAMS_FAQS` array |
| [app/(marketing)/foundation/page.tsx](../app/(marketing)/foundation/page.tsx#L25) | 25–104 | Foundation | `FALLBACK_MODULES`, `FALLBACK_WHO_FOR`, `FALLBACK_HOW_IT_WORKS`, `FOUNDATION_FAQS`, `FALLBACK_PRICING` |
| [app/(marketing)/lessons/page.tsx](../app/(marketing)/lessons/page.tsx#L69) | 69–76 | Lessons | "The Blueprint" hero copy |

> Validate against [design/canonical-copy.md](../design/canonical-copy.md) when migrating to Sanity. Foundation has the most concentrated hardcoded marketing copy.

---

## 5. Architecture & Conventions

### 5.1 Relative imports

**Clean.** Only relative imports are inside the separate `sanity/` workspace, which is correct.

### 5.2 Duplicated types

**Clean.** Shared types correctly live in [lib/types.ts](../lib/types.ts). All inline interfaces found are component props / API request-response / hook options — appropriate.

### 5.3 Dead / dormant files

- [app/design-test/page.tsx](../app/design-test/page.tsx) — design system test page. Should be moved to a non-shipping location or gated by env. Currently builds in production.
- See §1.4 for dormant about sections.

### 5.4 Convention drift

- CSS file count: docs say 19/10, actual is 18/9 (fixed in this commit).
- `'use client'` overuse for animation-only components — see §3.5.

---

## 6. Documentation Updates

Applied in this commit:
- CLAUDE.md and copilot-instructions.md: corrected CSS file count.
- Added OG image inline-style exception.
- Clarified `'use client'` guidance (animation wrapper pattern).
- Updated about-page section status.

---

## 7. Recommended Refactor Sequence

**Phase 1 — CSS hygiene (critical path)**
1. Add quadrant + pillar tokens to [variables.css](../app/css/variables.css); replace hardcoded hex in [pages-portal.css](../app/css/pages-portal.css).
2. Standardize breakpoints (480/560/960 → 640/768/1024) across all `pages-*.css`.

**Phase 2 — Component architecture**
3. Decide: delete or export the dormant about sections (`MethodologyNarrative`, `TurningPoint`, `WhyExists`).
4. Rename `ImpactSection` → `Impact`.
5. Convert animation-only client components to server + `<ScrollFade>` / `<ScrollReveal>` wrapper pattern.
6. Move inline styles in `InstagramEmbed`, `MfaClient`, `IkigaiClient` into CSS classes.

**Phase 3 — Copy migration prep** (blocks on user's Sanity schema rewrite)
7. Use §4 table as the migration checklist. Foundation page is the highest-volume target.
8. Once Sanity schemas land, remove all fallback `FALLBACK_*` arrays and component default props.

**Phase 4 — Hygiene**
9. Remove or gate [app/design-test/page.tsx](../app/design-test/page.tsx).
10. Resolve in-code TODOs as Sanity fields are created.

No breaking API changes required for any phase.
