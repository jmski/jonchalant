# Phase 9 Audit Report (2026-04-21)

Scope audited: redesigned marketing surfaces and supporting UI system (home hero cycle, about origin scrollytelling, dance featured reel, audit immersive flow, typography/motion primitives).

## A) Performance

### Performance Checklist
- Full-bleed image components reviewed for `next/image`, `sizes`, priority discipline, and layout stability.
- `use client` components reviewed for state/effect requirements.
- Heavy import points reviewed for lazy/dynamic opportunities.
- CSS transitions reviewed for possible layout thrash risks.

### Performance Findings

| File | Line | Severity | Issue | One-line fix suggestion | Status |
|---|---:|---|---|---|---|
| ~~`components/sections/home/hero/Hero.tsx`~~ | ~~125~~ | ~~medium~~ | ~~Photo slides in hero cycle were all marked `priority`, causing unnecessary preload pressure.~~ | ~~Only the first above-the-fold hero slide should be `priority`.~~ | ~~[FIXED: 2026-04-21]~~ |
| `components/sections/home/hero/Hero.tsx` | 149 | low | `three-js-figure` slide kind currently renders `null` (visual gap if selected in Sanity). | Add fallback renderer or wire restored Three.js figure component. | open |
| `app/css/layout.css` | 1245 | low | Several redesigned areas still use `transition: all`, increasing repaint/reflow risk. | Restrict transitions to `opacity`, `transform`, `color`, `background-color`, and `border-color`. | open |
| `app/css/pages-audit.css` | 125 | low | Legacy audit styles include `transition: all`; new immersive rules are scoped but old block remains broad. | Replace `all` with explicit properties in the legacy block. | open |

## B) Accessibility

### Accessibility Checklist
- Buttons/links checked for accessible names.
- Image alt behavior reviewed.
- Focus visibility reviewed.
- Contrast risks reviewed for mocha-on-cream combinations.
- `prefers-reduced-motion` behavior reviewed in hero/origin/kinetic/motion utilities.
- Keyboard completion path checked on audit flow.

### Accessibility Findings

| File | Line | Severity | Issue | One-line fix suggestion | Status |
|---|---:|---|---|---|---|
| ~~`components/sections/dance/FeaturedVideo.tsx`~~ | ~~17~~ | ~~medium~~ | ~~Featured reel autoplay + caption reveal did not branch for `prefers-reduced-motion`.~~ | ~~Gate autoplay/caption animation with reduced-motion media query and start paused when requested.~~ | ~~[FIXED: 2026-04-21]~~ |
| `components/sections/about/origin/Origin.tsx` | 100 | low | `alt` relies entirely on Sanity `imageAlt`; missing CMS values would degrade screen reader context. | Add defensive `alt={phase.imageAlt ?? ''}` and enforce `imageAlt` required in schema validation. | open |
| `app/css/pages-ikigai.css` | 625 | low | CTA color pairing should stay on deeper accent for reliable AA contrast. | Keep hover/active on `--mocha-deep` and avoid light-tint backgrounds with white text. | open |

## C) Visual Consistency

### Visual Consistency Checklist
- Heading system usage reviewed.
- Hardcoded hex usage reviewed outside data/config contexts.
- Button sizing/transition consistency reviewed.

### Visual Consistency Findings

| File | Line | Severity | Issue | One-line fix suggestion | Status |
|---|---:|---|---|---|---|
| `app/(marketing)/opengraph-image.tsx` | 12 | low | OG image generators intentionally use hardcoded hex values in inline image composition. | Optional: centralize OG palette constants in one token module for consistency. | open |
| ~~`app/(marketing)/ikigai/IkigaiClient.tsx`~~ | ~~70~~ | ~~medium~~ | ~~Quadrant colors and SVG circle colors used hardcoded hex values in JSX.~~ | ~~Replace with CSS variable references aligned to Mocha system.~~ | ~~[FIXED: 2026-04-21]~~ |
| `components/shared/cta/CTA.tsx` | 24 | low | CTA fallback label is hardcoded (`Get Started`), introducing copy variance across pages. | Move fallback labels to centralized content fallback map in `lib/pageContent.ts`. | open |

## D) Sanity-Driven Copy

### Sanity Copy Checklist
- Grep scan run for representative literals (`Ready to`, `Your presence`, `Book a`, `Get started`).

### Sanity Copy Findings

| File | Line | Severity | Issue | One-line fix suggestion | Status |
|---|---:|---|---|---|---|
| `app/(marketing)/audit/AuditClient.tsx` | 32 | low | Fallback audit summary/result copy remains inline in component. | Move fallback copy constants to `lib/pageContent.ts` and keep component render-only. | open |
| `app/(marketing)/page.tsx` | 190 | low | Home CTA fallback heading/description literals are embedded in page component. | Source fallback from shared content file to reduce component-level copy. | open |
| `components/shared/cta/CTA.tsx` | 24 | low | Generic CTA default text is hardcoded. | Pull default text from shared content fallback map. | open |

## Summary
- Blocker issues: 0
- Medium issues: 3 (all fixed)
- Low issues: 9 (catalogued for follow-up)

## Validation Notes
- `npm run build`: pass (latest successful run in this branch context).
- `npm run lint`: currently fails due to Node heap OOM while scanning generated/dist artifacts; this is environmental/repo-scale and not isolated to the Phase 9 edits.
