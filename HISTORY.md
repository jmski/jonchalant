# Changelog

A running log of significant codebase changes, refactors, and cleanups. Most recent first.

---

## 2026-04-02 — Portal Design Revamp + Enrollment Debug Tooling

### Enrollment bug diagnosis

After a test Stripe payment the portal still redirected to `/foundation` (not enrolled state). Root cause: **Stripe webhooks cannot reach `localhost` in local dev** — the `checkout.session.completed` event that writes to `enrollments` never fires without Stripe CLI forwarding (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`). The webhook handler and Supabase write logic were correct.

**New file:**

- `app/api/admin/enroll/route.ts` — `POST /api/admin/enroll` endpoint that manually writes an enrollment record to Supabase, bypassing Stripe. Protected by `Authorization: Bearer ${ADMIN_SECRET}`. Accepts `{ email, courseSlug, tier? }`. Use during local dev or to grant access manually.

```bash
# Usage example (local dev):
curl -X POST http://localhost:3000/api/admin/enroll \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","courseSlug":"the-foundation"}'
```

Add `ADMIN_SECRET=any-random-string` to your `.env.local`. Without it the endpoint returns 503.

### Portal UI redesign

Full visual overhaul of all portal pages to match the Jonchalant brand (burnt-indigo + muted-moss palette, Fraunces serif headings, editorial whitespace).

**CSS changes (`app/css/pages.css` — `portal-*` section):**

- **Topbar**: Now uses `var(--color-burnt-indigo)` background with white Fraunces brand wordmark. Sign-out button uses ghost white style.
- **Dashboard layout**: New two-column layout via `.portal-body` wrapper — `portal-main` (flex: 1) + `portal-sidebar` (17rem, sticky). Collapses to single column below 900px.
- **Welcome section**: Added `.portal-welcome-eyebrow` label ("Learning Portal"). Greeting bumped to `clamp(2rem, 5vw, 2.75rem)` in Fraunces.
- **Section labels**: Now include a bottom border for visual separation.
- **Course cards**: Added `border-top: 3px solid var(--accent-primary)` (green) that transitions to burnt-indigo on hover, plus subtle lift animation (`translateY(-2px)`). Title uses Fraunces serif.
- **Coach section**: Left-border accent in burnt-indigo instead of background box.
- **Sidebar links** (`.portal-sidebar-link`): New component replacing quick-links grid on dashboard.
- **Lesson page**: Two-column layout — `portal-lesson-layout` wraps `portal-lesson-main` + `portal-lesson-outline` sidebar (17rem, sticky). Sidebar shows all modules and lessons with completion state (✓ prefix for done, bold green for current).
- **Video wrapper**: Removed black 1px border, uses border-radius 4px.
- **Lesson header**: Now uses Fraunces for title, removed heavy black borders.
- **"Mark Complete" button**: Aligned to brand green (`var(--accent-primary)`) instead of orange. Done state shows outline variant.
- **Section sub-headings**: Fraunces serif, lighter weight, bottom border for separation.
- **Social Logic block**: Subtle burnt-indigo left border + tinted background instead of plain box.
- **Technical note cards**: Muted-moss left border.
- **Module list** (course overview): Left border in `var(--color-burnt-indigo-light)`. Module number uses indigo color. Lesson row hover uses green-tinted background.
- **Lesson outline items**: Three states — default, `--current` (green tint + green text), `--done` (muted with ✓ prefix).
- **Pagination**: unchanged structure, improved hover states.

**JSX changes:**

- `app/portal/page.tsx`: Restructured to `portal-body` > `portal-main` + `<aside className="portal-sidebar">`. Quick links moved to sidebar as `portal-sidebar-link` items. Added `portal-welcome-eyebrow`.
- `app/portal/[courseSlug]/[lessonSlug]/page.tsx`: Added `portal-lesson-outline` sidebar with per-module lesson list and completion state. Fetches `completedSlugs` via `getCourseProgress`. Added portal topbar (burnt-indigo) + `portal-lesson-nav` sub-breadcrumb bar. Wrapped content in `portal-lesson-layout` / `portal-lesson-main`.

### Folder structure clarification

There is **no** `app/portal/lessons/` directory. What appears as nested in VS Code is the `[courseSlug]/[lessonSlug]` dynamic route. The `app/lessons/` directory is a **separate public curriculum page** (not deprecated) — it serves as the public-facing course catalog with SEO metadata and a "Resume where you left off" banner for logged-in users.

---

## 2026-03-29 — Audit & Contact Pages: Hardcoded Text Removed

All page copy moved out of components into the correct data layer.

**New Sanity schemas:**

- `sanity/schemas/auditPage.ts` — all Presence Audit page copy: page header (badge, headline, body, footer note), capture stage, result bands (foundation/developing/refining), "What happens next" section, result CTA
- `sanity/schemas/contactPage.ts` — contact page marketing blocks: audit prompt block (badge, headline, body, stats array), coaching path (heading, body, Calendly href), sidebar notes (heading, items array, email text)

Both registered in `sanity/schemaTypes/index.ts`.

**New lib file:**

- `lib/auditData.ts` — quiz questions, `getBand()` helper, `SCORE_THRESHOLDS` constant extracted from `AuditClient.tsx`. Questions stay here (not Sanity) because scoring thresholds are coupled to question/option structure.

**Updated fetch functions (`lib/sanity.ts`):**

- `getAuditPageContent()` — fetches `auditPage` document
- `getContactPageContent()` — fetches `contactPage` document

**Updated pages:**

- `app/audit/page.tsx` — now `async`, fetches audit content, renders server-side header, passes `content` prop to `AuditClient`
- `app/audit/AuditClient.tsx` — imports questions from `lib/auditData`, accepts `content` prop, all copy uses `content?.field ?? 'fallback'` pattern
- `app/contact/page.tsx` — now `async`, fetches contact content, passes `content` prop to `ContactClient`
- `app/contact/ContactClient.tsx` — accepts `content` prop, marketing blocks use Sanity content with fallbacks; form labels/placeholders remain hardcoded (UI concerns)

**New TypeScript interfaces (`lib/types.ts`):**

`AuditPageContent`, `AuditResultBand`, `ContactPageContent`, `ContactAuditStat`, `ContactSidebarItem`

**Next step:** Create `auditPage` and `contactPage` documents in Sanity Studio with the current copy. Pages render with hardcoded fallbacks until documents exist.

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
