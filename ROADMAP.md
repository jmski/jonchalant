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

### TASK 0.1 — Fix portal 404 and lesson display `[x]`

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

### TASK 0.2 — Fix email capture contrast on homepage `[x]`

**Root cause:**
- Input background: `rgba(248, 248, 245, 0.1)` — nearly invisible on burnt indigo
- Placeholder text: `rgba(248, 248, 245, 0.4)` — 40% opacity, barely visible

**Files to change:**
- `app/css/sections.css` — `.email-capture-input`, `.email-capture-input::placeholder`

---

## Phase 1 — Cleanup & Stability

### TASK 1.1 — Fix /lessons navigation `[x]`

**Problem:** Navbar "Lessons" link 301-redirects to `/foundation`. Deceptive navigation.
**Recommendation:** Remove redirect. `/lessons` already has a curriculum page (`app/lessons/page.tsx`). Turn it into a public preview funnel with enrollment CTAs.

**Files:**
- `next.config.ts` — remove `/lessons` redirect
- `app/lessons/page.tsx` — add enrollment CTAs, "preview" badges
- `components/navigation/Navbar.tsx` — optionally rename "Lessons" to "Curriculum"

---

### TASK 1.2 — Remove deprecated Sanity schemas `[x]`

**Removed schemas:** `collaboration.ts`, `portfolio.ts`, `danceCategoryFilter.ts`, `pageMetadata.ts`
**Kept (still in use):** `service.ts` (homepage Services section), `contactInfo.ts` (layout social links)

**Cascading cleanup done:**

- `lib/sanity.ts` — removed: `PORTFOLIO_FIELDS`, `COLLABORATION_FIELDS`, `getPortfolioItems()`, `getPortfolioByCategory()`, `getPortfolioItem()`, `getFeaturedPortfolioItem()`, `getCollaborations()`, `getCollaborationsByCategory()`, `getDanceCategoryFilter()`, `getPageMetadata()`
- `lib/types.ts` — no changes needed (none of the removed schemas had types there)
- Deleted: `components/shared/collaboration/` (Collaboration.tsx + index.ts)
- Run: `npm run sanity:deploy` + `npm run build`

---

### TASK 1.3 — Remove orphaned components + CSS audit `[x]`

**Component audit results:**

- `components/shared/collaboration/` — deleted in Task 1.2
- `TestimonialCard`, `ServiceCard`, `DanceFilter`, `DanceCard` — all in active use, not orphans (roadmap assessment was wrong)
- `PortalCourseCard` vs `CourseCard` — serve different purposes: `PortalCourseCard` is auth portal dashboard (minimal, links to `/portal/${slug}`); `CourseCard` is public curriculum page (rich, has thumbnail/badges/modules). Keep both.
- No orphaned CSS from deleted schemas (no collaboration/portfolio/danceCategoryFilter/pageMetadata classes in CSS files)

**CSS audit deferred** — large-file audit (`layout.css`, `sections.css`, `pages-portal-tools.css`) needs systematic grep-based pass; deferred to standalone cleanup task. `pages-portal.css` holds until Phase 3 redesign.

---

### TASK 1.4 — Audit lib/ folder `[x]`

**Findings:**

| File | Result |
| ---- | ------ |
| `lib/design-tokens.ts` | Used by animation hooks (`useScrollAnimation`, `ScrollStagger`, `ScrollFade`) and `imageConfig.ts` — keep |
| `lib/imageConfig.ts` | Used by `DanceCard.tsx` via `getOptimizedImageProps` — keep |
| `lib/optimizedImage.tsx` | **Deleted** — no imports found anywhere |
| `lib/movement-plans.ts` | Used by portal movement-plan pages — keep |
| `lib/schema.ts` | Removed unused `VideoSchema` (never imported). No deleted-schema builders were present. |
| `lib/sanity.ts` | Cleaned in Task 1.2 |
| `lib/types.ts` | No changes needed (verified in Task 1.2) |

---

### TASK 1.6 — Connect PresenceCoach to Claude API `[x]`

**Finding:** Route was already correctly wired to Anthropic API via direct fetch with proper streaming, error handling, rate limiting, and system prompt. Only change needed:

- Updated model from `claude-haiku-4-5-20251001` → `claude-sonnet-4-6` in `app/api/presence-coach/route.ts`

**Note:** Rate limiting is inline in the route (daily per-userId window). `lib/rate-limit.ts` exists separately (IP-based, windowed) but isn't used here — both coexist. Ensure `ANTHROPIC_API_KEY` is set in Vercel env vars before launch.

---

### TASK 1.5 — Fix FAQ mobile rendering on /programs and /foundation `[x]`

**Fix applied in `app/css/components.css`:**

- Added `@media (max-width: 768px)` block: reduced trigger padding to `1rem 1.25rem`, added `min-height: 44px` (WCAG 2.5.5), reduced question font to `0.9375rem`, reduced answer padding/font
- Wrapper containers (`.foundation-faq`, `.programs-faq`) were already fine — `max-width` + `margin: auto`, no overflow risk

---

## Phase 2 — Visual Credibility

### TASK 2.1 — Add stock/placeholder images throughout `[x]`

**Code changes done:**

- Added `images.pexels.com` to `next.config.ts` remotePatterns
- Updated `getRecentBlogPosts()` + `getBlogPosts()` to fetch `coverImage { asset->{ url }, alt }`
- Added `coverImage` prop to `BlogCard` — renders in `default` (homepage) and `featured` (blog page) variants
- Added `.blog-card-cover` + `.blog-featured-card-cover` CSS (negative-margin bleed, 16:9 aspect, scale-on-hover)
- `MeetJon` already had image support; `DanceCard` already had image support

**Remaining content work (Sanity Studio):**

- Blog posts: upload `coverImage` to each post
- MeetJon: upload portrait to `homePageContent.meetJonImage`
- Other pages (Foundation hero, Programs hero, About sections): these sections don't have image fields in their schemas yet — add fields when real images are ready

---

### TASK 2.2 — Homepage visual polish `[x]`

**Code audit findings:**

- `CredibilityStrip` already renders null when `heroStats` is empty — no code fix needed, populate stats in Sanity
- `HeroCyclingText` uses `clamp()` font sizes and `flex-wrap: wrap` — handles mobile correctly
- Hero orbs use fixed px sizes but `overflow: clip` on the section prevents any overflow
- All homepage sections use `clamp()` sizing and have responsive breakpoints — no overflow issues found in code

**Remaining content/browser tasks:**

- Populate `homePageContent.heroStats` in Sanity (drives CredibilityStrip)
- Populate `pressMention` documents in Sanity (drives PressStrip)
- Visual verification at 375px in browser once content is populated

---

## Phase 3 — Portal Redesign

> **Vision:** Premium editorial coaching platform. Think Kajabi/Maven but with the Zen aesthetic. Light mode, whitespace, progress that motivates.

### TASK 3.1 — Route groups architecture `[x]`

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

### TASK 3.2 — Persistent portal sidebar `[x]`

Build `PortalSidebar` component:
- Course tree with expandable modules
- Active lesson highlighted
- Progress % per course
- Mobile: off-canvas drawer
- Sections: Learn, Tools, Coaching, Sign Out

---

### TASK 3.3 — Portal dashboard redesign `[x]`

Key additions:
- "Continue where you left off" — last incomplete lesson
- "This week's focus" — auto-calculated from enrollment date
- Tool cards with icons (not plain text links)
- PresenceCoach as compact widget / floating button

**Implementation:**

- `getEnrollmentDate(client, userId, courseSlug)` added to `utils/supabase/enrollments.ts`
- `(portal)/layout.tsx` derives `userId` + `firstName`, passes to `PortalShell`
- `components/portal/PresenceCoachWidget.tsx` — floating FAB (burnt-indigo pill) + always-mounted chat drawer (CSS visibility toggle to preserve chat history)
- `PortalShell` renders `<PresenceCoachWidget>` when userId is available (accessible on all portal pages)
- Dashboard page: parallel-fetches `getLastActiveLesson` + `getEnrollmentDate` + courses; derives continue lesson + week focus from Sanity module data; removed inline PresenceCoach section; added 3 tool cards (Presence Score, Tonality Analysis, Movement Plan) in bordered list layout with icons

---

### TASK 3.4 — Lesson player redesign `[x]`

- Video above fold (16:9)
- Sticky course outline sidebar
- Sticky "Mark Complete" button + **"Undo Complete" toggle** (re-click to uncomplete — calls same toggle endpoint with inverse state)
- Breadcrumb: Module → Lesson
- Keyboard shortcuts: `→` next, `←` prev, `c` complete

**Implementation:**

- `app/(portal)/portal/[courseSlug]/[lessonSlug]/page.tsx` — restructured to two-column layout (`.portal-lesson-layout`): main content left, sticky course outline sidebar right; breadcrumb now includes module (`lesson.module.title`); `LessonActions` receives `initialCompleted` from server-fetched `completedSlugs` (no client-side fetch on load)
- `LessonActions.tsx` — toggle behavior: `markLessonComplete` / `markLessonIncomplete` called based on current state; `c` keyboard shortcut wired to `handleToggle`; `disabled` only while `isMarking` (not when completed); `title` attribute on done state signals click-to-undo
- `LessonKeyboard.tsx` (new) — client component, renders `null`; registers `ArrowLeft`/`ArrowRight` handlers; guards against input focus and modifier keys
- `pages-portal.css` — `.portal-lesson-header` made sticky (`top: 7.25rem`, `z-index: 4`, `background: var(--bg-primary)`); padding tightened for sticky bar; `portal-breadcrumb-module` span style added

---

### TASK 3.5 — Portal tools audit + redesign `[ ]`

- Audit presence-score, tonality, movement-plan for end-to-end function
- Apply consistent portal design system
- Audit `pages-portal-tools.css` (2,309 lines) for dead rules

---

### TASK 3.6 — Fix PresenceCoach viewport sizing `[ ]`

**Problem:** AI Presence Coach chat box is not optimized for small/medium viewports — likely overflows or becomes unusable on mobile.

**Files:**
- `app/portal/presence-coach/` (or wherever the chat UI lives)
- `app/css/pages-portal-tools.css` or `pages-portal.css` — chat container styles

**Fix:**
- Constrain chat container height with `max-height: calc(100dvh - Xrem)` so it doesn't overflow
- Ensure input bar stays anchored to bottom on mobile
- Verify message list scrolls independently (not the whole page)
- Test at 375px, 768px

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


## Notes
