# Changelog

A running log of significant codebase changes, refactors, and cleanups. Most recent first.

---

## 2026-03-29 — CSS & Component Cleanup

**Dead CSS removed from `app/css/pages.css`:**

- `portal-dashboard-*` (40 rules) — old curriculum index dashboard UI, replaced by current portal page
- `featured-blog-*` (16 rules) — old featured blog widget design, no longer used
- `program-track-*` / `program-tracks-*` (20+ rules) — old Three-Track Layout replaced by `ProgramTrackCard` component
- `focus-area-card` / `focus-areas-*` — old PageHero right-column design for programs page
- `programs-for-*` — unused programs page section
- `programs-cta-button` — orphaned CTA class
- `portal-lesson-error*` / `portal-lesson-loading` — orphaned error/loading state styles
- `blog-optin-input` — unused override class
- `form-grid` / `form-grid-2` — unused layout utility

**Duplicate component directories deleted:**

- `components/shared/instagram-embed/` — exact duplicate of loose `components/shared/InstagramEmbed.tsx`
- `components/shared/video-embed/` — exact duplicate of loose `components/shared/VideoEmbed.tsx`

The loose files (`InstagramEmbed.tsx`, `VideoEmbed.tsx`) are the canonical versions and remain in use.

---

## 2026-03-29 — About Page Sections Expanded

Four new sections added to `components/sections/about/` and integrated into `app/about/page.tsx`:

- `turning-point/` — TurningPoint component
- `methodology-narrative/` — MethodologyNarrative component
- `why-exists/` — WhyExists component
- `who-for/` — WhoFor component

All are conditionally rendered based on Sanity fields. All exported from `components/sections/index.ts`.

---

## 2026-03-29 — Blog Opt-In Widget

Added `components/forms/BlogOptIn.tsx` — email capture widget rendered inline in blog posts and the site footer. Integrates with Kit (ConvertKit) via `/api/subscribe`.

---

## 2026-03-22 — Portal Auth Migration

Removed `lib/supabase.ts`. All auth now uses SSR-safe helpers:

- Server components → `utils/supabase/server.ts`
- Client components → `utils/supabase/client.ts`
- Middleware → `utils/supabase/middleware.ts`

Auth-gate logic moved entirely client-side via `lib/auth-context.tsx` `useAuth` hook.
