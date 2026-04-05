# Jonchalant — Coaching Business Launch Roadmap

**Goal:** Take jonchalant.com from current state → fully operating online coaching business, ready to take clients
**Last updated:** 2026-04-04

---

## Product Assessment

**What's working:**
- Solid content architecture (Sanity CMS, Supabase auth, portal lesson system)
- Good bones on the portal (enrollment gating, progress tracking, AI coach)
- Clear brand identity (Zen, burnt indigo + muted moss)
- Multiple revenue touch points (Foundation, Programs, Ikigai, 1:1 coaching)
- Stripe checkout + webhook → Supabase enrollment flow is correctly wired

**Critical friction points:**
- Portal is broken for paying users (404 on entry, lessons not visible) → P0
- Navigation creates confusion (/lessons → /foundation redirect is invisible to users)
- Portal UX feels like a Next.js project, not an online coaching platform
- Sanity has 5+ schemas no longer tied to live features
- Images are sparse — reduces credibility and emotional engagement
- Mobile experience on FAQ-heavy pages is degraded

**Strategic observations:**
- The portal is the product. The marketing site is the funnel. They need separate design systems.
- The Foundation is the core offer. Everything else should funnel toward it.
- `/lessons` redirect is wasted real estate — should be a public curriculum preview

---

## Status Key

- `[ ]` todo
- `[~]` in progress
- `[x]` done
- `[!]` blocked — waiting on external dependency

---

## Phase 0 — Critical Fixes

### TASK 0.1 — Fix portal 404 and lesson display `[~]`

**Root cause (diagnosed):**
1. `/portal-thefoundation` 404 — this URL has no corresponding route. The correct path is `/portal/the-foundation`. The broken link is **external to the codebase** (no references found in code). It likely originates from a manually shared link or an email. The Stripe checkout correctly redirects to `/portal?enrolled=true`.
   - **Code fix:** Redirect added in `next.config.ts`: `/portal-thefoundation` → `/portal/the-foundation`

2. **Lessons not displaying** — this is a **Sanity CMS content gap**, not a code bug. The portal fetches `getCourses()` which queries Sanity for `course` documents. If no course document exists with `slug.current == "the-foundation"` (or it has no modules/lessons attached), the portal silently shows nothing.
   - **Code fix:** Improved empty state messages in `portal/[courseSlug]/page.tsx`
   - **Content required in Sanity Studio (see below)**

**Sanity content checklist — must create before portal works:**
- [ ] Create a `Course` document:
  - Title: e.g. "The Foundation"
  - Slug: `the-foundation` (exact — must match)
  - Difficulty: Beginner / Intermediate / Advanced
  - Estimated Duration: e.g. "6–8 hours"
  - Modules: attach module references (see below)
- [ ] Create `Module` documents (one per week/section):
  - Each module needs: Title, Slug, Order number, Parent Course reference → `the-foundation`
  - Add Lesson references to each module
- [ ] Create `Lesson` documents (one per lesson):
  - Each lesson needs: Title, Slug, Access (`free` or `enrolled`), Duration, Order
  - Optionally: Video ID (YouTube), Description, Body content

**Files changed:**
- `next.config.ts` — added redirect
- `app/portal/[courseSlug]/page.tsx` — improved empty state

---

### TASK 0.2 — Fix email capture contrast on homepage `[ ]`

**Root cause:**
- Input background: `rgba(248, 248, 245, 0.1)` — nearly invisible on burnt indigo
- Placeholder text: `rgba(248, 248, 245, 0.4)` — 40% opacity, barely visible

**Files to change:**
- `app/css/sections.css` — `.email-capture-input`, `.email-capture-input::placeholder`

---

## Phase 1 — Cleanup & Stability

### TASK 1.1 — Fix /lessons navigation `[ ]`

**Problem:** Navbar "Lessons" link 301-redirects to `/foundation`. Deceptive navigation.
**Recommendation:** Remove redirect. `/lessons` already has a curriculum page (`app/lessons/page.tsx`). Turn it into a public preview funnel with enrollment CTAs.

**Files:**
- `next.config.ts` — remove `/lessons` redirect
- `app/lessons/page.tsx` — add enrollment CTAs, "preview" badges
- `components/navigation/Navbar.tsx` — optionally rename "Lessons" to "Curriculum"

---

### TASK 1.2 — Remove deprecated Sanity schemas `[ ]`

**Remove these schemas:**
- `sanity/schemas/collaboration.ts`
- `sanity/schemas/service.ts`
- `sanity/schemas/contactInfo.ts`
- `sanity/schemas/danceCategoryFilter.ts`
- `sanity/schemas/pageMetadata.ts`
- `sanity/schemas/portfolio.ts`
- `sanity/schemas/index.ts` — remove their registrations

**Cascading cleanup:**
- `lib/sanity.ts` — remove: `getCollaborations()`, `getCollaborationsByCategory()`, `getPortfolioItems()`, `getContactInfo()`, `getDanceCategories()`
- `lib/types.ts` — remove: `Collaboration`, `Portfolio`/`PortfolioItem`, `ContactInfo`, `DanceCategoryFilter`, `PageMetadata`
- Delete: `components/shared/collaboration/` (confirmed unused)
- Verify dance page isn't using `portfolio.ts` before deleting
- Run: `npm run sanity:deploy` + `npm run build`

**Safe deletion order:**
1. Remove from `sanity/schemas/index.ts`
2. Delete schema `.ts` file
3. Remove Sanity queries from `lib/sanity.ts`
4. Remove TypeScript types from `lib/types.ts`
5. Delete orphaned components
6. `npm run sanity:deploy` → `npm run build`

---

### TASK 1.3 — Remove orphaned components + CSS audit `[ ]`

**Confirmed orphans (safe to delete):**
- `components/shared/collaboration/` — entire folder
- `components/utilities/cards/TestimonialCard.tsx`

**Verify before deleting:**
- `components/content/DanceFilter.tsx`
- `components/utilities/cards/ServiceCard.tsx`
- `app/portal/PortalCourseCard.tsx` vs `components/utilities/cards/CourseCard.tsx` — consolidate

**CSS audit targets (grep class names → check for usage in .tsx):**
- `pages-portal-tools.css` (2,309 lines)
- `layout.css` (2,074 lines)
- `sections.css` (1,857 lines)
- `pages-portal.css` (1,934 lines) — hold until Phase 3 redesign

---

### TASK 1.4 — Audit lib/ folder `[ ]`

| File | Question |
|------|----------|
| `lib/design-tokens.ts` (508 lines) | Is it imported anywhere, or is `variables.css` the source of truth? |
| `lib/imageConfig.ts` (210 lines) | Are all size presets used? |
| `lib/optimizedImage.tsx` (110 lines) | Are consuming components using it? |
| `lib/movement-plans.ts` (80 lines) | Is `/portal/movement-plan` fully functional end-to-end? |
| `lib/schema.ts` (255 lines) | Remove JSON-LD builders for deleted schemas |
| `lib/sanity.ts` (637 lines) | Remove dead queries (see Task 1.2) |
| `lib/types.ts` (255 lines) | Remove interfaces for deleted schemas |

---

### TASK 1.5 — Fix FAQ mobile rendering on /programs and /foundation `[ ]`

**Problem:** No `@media` breakpoints in FAQ styles. Fixed padding on small screens.

**Fix in `app/css/components.css`:**
- `@media (max-width: 768px)`: reduce font size, reduce padding, ensure expand icon doesn't overlap
- Verify tap targets ≥ 44×44px (WCAG 2.5.5)

---

## Phase 2 — Visual Credibility

### TASK 2.1 — Add stock/placeholder images throughout `[ ]`

**Pages needing images:**
- Homepage: hero bg, MeetJon portrait, WhyWorkTogether
- Foundation: hero, "Who It's For", pricing cards
- Programs: hero, track cards, case study cards
- About: all narrative sections
- Blog: default cover per post
- Dance: portfolio grid

**Sources:** Unsplash (already in `next.config.ts`), Pexels (add to `remotePatterns`)
**Implementation:** Add URLs to Sanity documents + hardcoded fallback arrays

---

### TASK 2.2 — Homepage visual polish `[ ]`

- Verify CredibilityStrip has press mention content in Sanity
- Audit HeroCyclingText on mobile
- Audit all sections at 375px for overflow/cramping

---

## Phase 3 — Portal Redesign

> **Vision:** Premium editorial coaching platform. Think Kajabi/Maven but with the Zen aesthetic. Light mode, whitespace, progress that motivates.

### TASK 3.1 — Route groups architecture `[ ]`

Refactor to route groups separating marketing site from portal:

```
app/
├── (marketing)/    ← Navbar + Footer layout
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
└── (portal)/       ← Sidebar + top bar layout, no Navbar
    ├── layout.tsx
    └── portal/
        ├── page.tsx
        └── [courseSlug]/[lessonSlug]/
```

---

### TASK 3.2 — Persistent portal sidebar `[ ]`

Build `PortalSidebar` component:
- Course tree with expandable modules
- Active lesson highlighted
- Progress % per course
- Mobile: off-canvas drawer
- Sections: Learn, Tools, Coaching, Sign Out

---

### TASK 3.3 — Portal dashboard redesign `[ ]`

Key additions:
- "Continue where you left off" — last incomplete lesson
- "This week's focus" — auto-calculated from enrollment date
- Tool cards with icons (not plain text links)
- PresenceCoach as compact widget / floating button

---

### TASK 3.4 — Lesson player redesign `[ ]`

- Video above fold (16:9)
- Sticky course outline sidebar
- Sticky "Mark Complete" button
- Breadcrumb: Module → Lesson
- Keyboard shortcuts: `→` next, `←` prev, `c` complete

---

### TASK 3.5 — Portal tools audit + redesign `[ ]`

- Audit presence-score, tonality, movement-plan for end-to-end function
- Apply consistent portal design system
- Audit `pages-portal-tools.css` (2,309 lines) for dead rules

---

## Phase 4 — Launch Readiness

### TASK 4.1 — Enrollment + onboarding flow audit `[ ]`

Full trace: purchase → webhook → Supabase enrollment → portal access → lessons visible
- Test with Stripe test card
- Verify enrollment confirmation email (Resend)
- Verify success redirect goes to `/portal?enrolled=true`

---

### TASK 4.2 — SEO + metadata `[ ]`

- Unique title/description per public page
- OG images for homepage, foundation, programs
- Remove JSON-LD for deleted schemas
- Add `/sitemap.xml`
- Confirm portal routes are noindexed

---

### TASK 4.3 — Final mobile audit `[ ]`

Test at 375px + 768px: homepage, foundation, programs, about, blog, contact, portal

---

### TASK 4.4 — Sanity content population `[ ]`

Launch blockers:
- Foundation course: all modules + lessons (correct slugs)
- Testimonials: 3+ with photo/name/result
- Blog: 3+ published posts
- Programs: track cards with prices
- About: bio, story, methodology
- Homepage: hero copy + services

---

## Backlog

| Idea | Value | Effort |
|------|-------|--------|
| Certificate of completion | Medium | Medium |
| Progress re-engagement emails | High | Medium |
| Community/cohort space | High | High |
| Video hosting (Mux / Cloudflare Stream) | Medium | High |
| Admin analytics dashboard | Medium | Medium |
| Lesson transcript download | Medium | Low |
| Affiliate/referral system | Medium | High |
