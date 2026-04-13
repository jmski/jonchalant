# Jonchalant — Comprehensive Codebase Audit & Critique

**Date:** 2026-04-10
**Scope:** Full multi-disciplinary audit of jonchalant.com codebase
**Codebase:** Next.js 16.1.1 | React 19 | Sanity CMS | Supabase Auth | 17,693 lines of CSS | 130 components

---

## Executive Summary

Jonchalant is an executive presence coaching platform with strong architectural bones, clear brand identity, and a well-defined niche. The codebase reflects thoughtful engineering decisions — route groups separating marketing from portal, centralized data fetching, consistent component patterns, and a disciplined CSS layer system.

However, an audit through the lenses of graphic design, UX/UI, copywriting, product management, and engineering reveals friction that is costing conversions, CSS that has grown beyond maintainability thresholds, and brand trust gaps that undermine an otherwise excellent product positioning.

**Overall Score: 7.2 / 10**

| Discipline | Score | Verdict |
|-----------|-------|---------|
| Graphic Design | 6.5/10 | Coherent palette, but flat and image-starved |
| UX/UI Design | 7.0/10 | Smart flows with conversion-blocking friction |
| Copywriting | 8.0/10 | Strong voice, weak social proof specifics |
| Product Management | 7.0/10 | Clear core offer, missing competitive table stakes |
| Information Architecture | 8.0/10 | Clean routing, good separation of concerns |
| Engineering & Code Quality | 8.0/10 | Solid patterns, some components over complexity threshold |
| CSS Architecture | 6.5/10 | Good structure, poor execution discipline |

---

## 1. Graphic Design Critique

**Role:** Visual Designer evaluating brand expression, color usage, typography execution, and visual depth.

### What's Working

- **Color palette is distinctive.** Burnt indigo (#4a3a5c) + muted moss (#6b8e63) on rice paper (#f8f8f5) creates immediate brand recognition. The Zen philosophy is legible in the color choices.
- **Typography pairing is strong.** Fraunces (editorial serif) for headlines + DM Sans (geometric sans) for body creates the "calm but authoritative" tension the brand needs.
- **Design token system is well-organized.** `variables.css` (146 lines) centralizes colors, spacing, transitions, and gradients with clear naming.
- **Gradient tokens are tasteful.** `--gradient-hero`, `--gradient-moss-wash`, `--gradient-warm` use `color-mix()` at 2-5% opacity — barely perceptible, which is correct for the Zen aesthetic.

### What Needs Work

**1. The site is image-starved.**
Every marketing page hero is text-only with CSS orbs/shapes as the sole visual interest. For a coaching business selling *presence* — a fundamentally visual, embodied concept — the absence of photography is the single biggest credibility gap. Stock imagery was scaffolded (Pexels domain added to `next.config.ts`, `BlogCard` supports `coverImage`) but no images are populated in Sanity.

**Recommendation:** Before any code changes, invest in a professional photoshoot. The brand identity doc already defines the photography direction (warm, natural light, candid movement) — execute it. Until then, add high-quality stock to hero backgrounds with heavy overlay (`rgba(248, 248, 245, 0.85)`).

**2. Backgrounds are monotonal.**
`--bg-primary` (#f8f8f5), `--bg-secondary` (#fafaf8), and `--bg-tertiary` (#f0ede8) differ by only 2-3% lightness. On screen, sections blend together. The `SectionWrapper` component cycles through `primary|secondary|tertiary` variants, but the visual rhythm is imperceptible.

**Recommendation:** Increase the delta between `--bg-secondary` and `--bg-tertiary`. Consider `--bg-tertiary: #ebe6de` (warmer, more sand) for stronger section separation. Alternatively, use `--gradient-moss-wash` or `--gradient-warm` as section backgrounds instead of flat colors.

**3. Limited accent range.**
Muted moss is the only strong accent. Warm amber (`--color-warm-amber: #b89a5f`) exists in `variables.css` but is functionally unused outside of `--color-warning`. The brand identity doc recommends it for pull quotes, secondary badges, and pricing highlights — this hasn't been implemented.

**Recommendation:** Introduce warm amber as a secondary accent: pull-quote borders, featured card accent bars, pricing tier highlights. This adds warmth without departing from the palette.

**4. Typography weight usage is heavy.**
Fraunces is used at weight 700 for all headings. The brand identity doc recommends lighter weights (300-400) for large display text to create an editorial feel. Currently, all headings look the same weight, reducing hierarchy contrast.

**Recommendation:** Use Fraunces at 300-400 for hero headlines (large display sizes compensate for light weight). Reserve 600-700 for smaller section headings. Introduce Fraunces italic for testimonial quotes and cycling text.

**5. Decorative elements are underutilized.**
`FluidShape` (amorphous SVG) exists but appears rarely. Hero orbs are limited to the homepage. No line-art dividers, dot patterns, or brush strokes appear anywhere despite being listed in the brand identity doc.

**Recommendation:** Phase decorative elements in gradually. Start with the accent bar (already 3rem x 2px) as a consistent brand mark across section transitions.

---

## 2. UX/UI Design Critique

**Role:** Product Designer evaluating user flows, interaction patterns, conversion funnels, and mobile experience.

### What's Working

- **Navigation is well-structured.** Two-tier CTA in navbar ("Free Audit" primary + "Portal" secondary). Dropdown menus group content logically (Coaching, Learn).
- **Contact page is excellent.** Audit-first flow ("Not sure where to start? Take the Presence Audit") is a low-friction entry point. Sidebar notes ("I don't do pressure") build trust. Inquiry type segmentation (Coaching vs General) is smart.
- **Portal dashboard is thoughtful.** Personalized welcome ("Welcome back, {firstName}"), "Continue where you left off" card, week-based focus tracking, AI tools section.
- **Route groups separate concerns.** `(marketing)` layout has Navbar + Footer. `(portal)` layout has PortalShell + sidebar. Portal is noindexed. Clean boundary.
- **Lesson player is well-designed.** Video above fold, sticky sidebar with course outline, keyboard shortcuts (arrow keys + `c` for complete), toggle-able completion state.

### Conversion-Blocking Friction

**1. Account creation before checkout — the biggest conversion leak.**
Current flow: Click "Enroll" on `/foundation` → Redirect to `/login?redirect=/foundation` → Create account → Verify email → MFA setup → Return to Foundation → Click "Enroll" again → Stripe checkout.

This is 5-6 steps before payment. Industry standard for digital products is 2: click buy → payment form. Every additional step loses ~10-15% of prospects.

**Recommendation:** Implement guest checkout. Stripe Checkout supports `customer_email` without requiring an account. Create the Supabase account *after* successful payment in the webhook handler. Send account creation email post-purchase: "Your account is ready — set up your password to access the portal."

**2. MFA adds friction for non-technical users.**
The codebase implements MFA via Supabase's AAL2 (Authenticator Assurance Level 2). While security is important, requiring TOTP app setup for a $197 coaching course is unusual. Many target users (corporate introverts, not engineers) may not have an authenticator app.

**Recommendation:** Make MFA optional and encourage it rather than require it. Or defer MFA enrollment to the portal settings page after first login.

**3. Portal "enrolled=true" race condition workaround is user-visible.**
When Stripe webhook hasn't fired yet, the portal shows "Confirming your enrollment..." with a manual Refresh button. This is correct engineering but poor UX — the user just paid $197 and is told to wait.

**Recommendation:** Implement polling. After redirect to `/portal?enrolled=true`, poll the enrollment status every 3 seconds for up to 30 seconds. Auto-redirect to the course when confirmed. Only show the manual refresh as a fallback after timeout.

**4. "Portal" navbar button is ambiguous.**
For non-enrolled visitors, "Portal" is meaningless. They don't know if it's login, signup, or a demo.

**Recommendation:** Change to "Sign In" for unauthenticated users. For enrolled users, change to "My Course" or "Dashboard." Context-aware CTA.

**5. Email capture value proposition is weak.**
Homepage email capture (section 9 of 10, near bottom): "Weekly insights on quiet leadership." This is generic. No preview of what they'll receive, no urgency, no specific benefit.

**Recommendation:** "Get the 3-minute body language exercise that Fortune 500 coaches use — plus weekly presence insights." Specificity + credibility + immediate value.

### Mobile Observations

- FAQ mobile fix is in place (Task 1.5 — reduced padding, 44px min-height for WCAG)
- Hero cycling text uses `clamp()` and `flex-wrap` — handles narrow screens
- Portal coach drawer has `max-height: calc(100dvh - 6rem)` and mobile breakpoint at 520px
- **Gap:** No evidence of systematic mobile testing at 375px across all pages (Task 4.3 is still `[ ]` in roadmap)

---

## 3. Copywriting Critique

**Role:** Conversion Copywriter evaluating messaging, value propositions, CTAs, and persuasion architecture.

### What's Working

- **Brand positioning is razor-sharp.** "Executive Presence Coaching for Introverts" — immediately differentiates from generic leadership training. The audience knows within 3 seconds if this is for them.
- **Hero copy is excellent.** "Quiet Command." as headline is memorable, paradoxical, and brand-defining. The cycling outcomes ("So you can...") create aspirational framing.
- **Foundation page copy sells the methodology.** "A decade of professional choreography taught me that presence isn't about being loud..." — bridges the unusual dance-leadership connection with credibility.
- **Tone is consistent and human.** Conversational without being casual. Professional without being stiff. "First name is fine," "Ask away," "No pressure. No pitch." — these micro-copy moments build trust.
- **FAQ copy is excellent.** Conversational, addresses real objections ("Is this for non-dancers?"), refund policy is clear (14-day, must complete first 2 weeks).
- **Contact sidebar is outstanding.** "I don't do pressure" / "I work with individuals, not committees" / "Spots are limited" — creates scarcity without being pushy.

### What Needs Work

**1. Testimonials lack transformation specifics.**
Current format: "Quote — Name, Role, Company." This tells visitors that *someone* liked the coaching. It doesn't tell them *what changed*.

**Recommendation:** Restructure testimonials to include measurable outcomes:
- "I went from being overlooked in meetings to leading the quarterly business review — in 6 weeks." — Sarah M., Product Manager, [Company]
- Before/after framing: "Before: anxious before every presentation. After: requested to keynote the annual summit."

**2. No credentials or trust signals on About page.**
The About page tells Jon's story well (origin, turning point, methodology, mission) but never states: How many clients coached? What certifications? What companies worked with? How many years of experience?

For high-ticket coaching ($197-$497 self-paced, likely $2K+ for 1:1), prospects need *authority* signals. The story is compelling, but it's not enough alone.

**Recommendation:** Add a credentials section: "X years coaching | Y+ clients | Trained leaders at [Company logos or names] | Certified in [relevant credential]."

**3. "Why It Works" section reads as generic process.**
Three steps (Awareness → Practice → Integration) could describe any coaching program. The dance/movement methodology — the brand's primary differentiator — is absent from the explanation of *why* it works.

**Recommendation:** Rewrite to explain the movement-based methodology: "Your body learns presence before your mind catches up. Movement-based exercises rewire how you hold yourself, how you breathe, how you enter a room — in ways that a PowerPoint about 'executive presence' never could."

**4. No affordability messaging anywhere.**
Foundation pricing is $197 / $497. Neither page addresses: "Is this worth it?" or "What if I can't afford the premium tier?" Many prospects are price-sensitive; addressing this proactively increases conversion.

**Recommendation:** Add FAQ: "Can I start with the self-paced tier and upgrade later?" and "What results justify the investment?" with specific ROI framing (e.g., "One confident presentation could be worth more to your career than 10x this investment").

**5. Redundant CTA paths create decision paralysis.**
"Free Audit" appears in: navbar, homepage hero, contact page, foundation page bottom, about page. Five entry points to the same destination. This dilutes the CTA rather than strengthening it.

**Recommendation:** Consolidate to two primary paths: (1) "Free Audit" for uncertain prospects, (2) "Enroll Now" for ready buyers. Remove audit CTAs from pages where the visitor has already progressed past the awareness stage.

---

## 4. Product Management Critique

**Role:** Product Manager evaluating feature completeness, monetization strategy, competitive positioning, and launch readiness.

### What's Working

- **Clear product hierarchy.** Foundation (self-paced) → Programs (guided/1:1) → Ikigai (assessment tool) → Portal (learning platform). Each serves a distinct need.
- **Revenue model is sound.** Two Foundation tiers ($197/$497), programs with flexible pricing, Stripe checkout integrated with webhooks.
- **Portal adds genuine value beyond video.** AI tools (Presence Score, Tonality Analysis, Movement Plan) differentiate from typical course platforms. PresenceCoach widget provides persistent AI coaching access.
- **Audit as lead gen is smart.** Low-friction, high-value: 7 questions, 3 minutes, personalized result band. Captures email + primes for enrollment.
- **Content architecture supports scale.** Sanity CMS for all marketing content, structured course/module/lesson hierarchy ready for 200+ hours of content.

### Critical Product Gaps

**1. No lesson preview or trailer.**
A visitor cannot see a single second of course content before paying $197. For a video-heavy product, this is a significant trust gap.

**Recommendation:** Make Module 1, Lesson 1 free (or a 3-minute trailer). The Foundation page should embed a sample video: "Watch a preview — Lesson 1.1: The Soft Skills Myth (12 min)." This is standard for online course platforms (Udemy, Coursera, Maven all do this).

**2. No comparison table for programs.**
Programs page shows individual cards but no side-by-side comparison. Visitors can't easily answer: "What's the difference between self-paced and 1:1? What do I get for $300 more?"

**Recommendation:** Add a comparison table below program cards:

| Feature | Self-Paced ($197) | With Check-ins ($497) | 1:1 Coaching |
|---------|-------------------|----------------------|--------------|
| Video lessons | All 8 modules | All 8 modules | Custom |
| AI tools | Yes | Yes | Yes |
| Personal follow-up | Email only | Bi-weekly calls | Weekly calls |
| Timeline | Self-paced | 8 weeks guided | Custom |

**3. No cohort/community offering.**
The curriculum (200+ hours across 8 modules) is designed for deep engagement, but the experience is entirely solo. Competing coaching platforms (Maven, On Deck, Reforge) offer cohort-based learning with peer accountability.

**Recommendation:** Add a "Cohort" tier to Foundation: live group sessions (monthly or quarterly), private community (Discord or Circle), peer accountability partners. This creates recurring revenue and higher engagement.

**4. No corporate/team pricing.**
The brand targets "introverts & corporate clients" but has no team pricing, corporate packages, or enterprise inquiry path. VP of L&D evaluating coaching vendors will leave.

**Recommendation:** Add a "For Teams" page or section on Programs. Even a simple "Contact us for team pricing — 5+ seats" form creates a corporate funnel.

**5. Content production bottleneck.**
The Foundation curriculum document specifies 200+ hours of content across 8 modules (142 lessons). Currently, Sanity has zero lesson content populated (Task 0.1 in roadmap identifies this as the content gap). The platform is built, but the product is empty.

**Recommendation:** Prioritize Module 1 (12 lessons, mostly concept + animation, lowest production cost). Launch with Module 1 available and remaining modules as "Coming Soon" to create forward momentum and early revenue.

### Launch Readiness Assessment

| Blocker | Status | Impact |
|---------|--------|--------|
| Sanity course content (modules + lessons) | Not started | **Launch blocker** — portal shows nothing |
| Professional photography | Not started | Credibility gap |
| 3+ testimonials with photos | Not confirmed | Social proof gap |
| 3+ blog posts published | Not confirmed | SEO + authority gap |
| Stripe end-to-end test | Not tested | Payment reliability |
| RESEND_API_KEY in Vercel | Not confirmed | Enrollment emails won't send |
| ANTHROPIC_API_KEY in Vercel | Not confirmed | AI tools won't work |
| Mobile audit at 375px/768px | Not done (Task 4.3) | Mobile UX unknown |

---

## 5. Information Architecture Critique

**Role:** Information Architect evaluating content hierarchy, navigation structure, URL design, and discoverability.

### What's Working

- **Route groups are clean.** `(marketing)` and `(portal)` separate public and authenticated experiences with distinct layouts.
- **URL structure is semantic.** `/foundation`, `/programs`, `/blog/[slug]`, `/portal/[courseSlug]/[lessonSlug]` — predictable, SEO-friendly.
- **Sitemap is maintained.** `app/sitemap.ts` generates XML sitemap. Stale `/media-kit` entry was removed.
- **Portal routes are noindexed.** `(portal)/layout.tsx` sets `robots: { index: false }`.
- **Section exports are centralized.** `components/sections/index.ts` with descriptive aliases (`AboutHero`, `BlogFeatured`) prevents import confusion.

### Issues

**1. `/lessons` route purpose is unclear.**
`/lessons` exists as a public curriculum preview page (`app/(marketing)/lessons/page.tsx`). The redirect from `/lessons` to `/foundation` was removed (Task 1.1), making it accessible again. But navigating to `/lessons` shows the same curriculum that `/foundation` shows. Two pages with overlapping content.

**Recommendation:** Differentiate clearly. `/lessons` should be a free curriculum browser (module titles, lesson previews, "Enroll to unlock" badges). `/foundation` should be the sales page (positioning, pricing, CTAs). Currently, they're too similar.

**2. Navbar "Lessons" link → "Curriculum" rename was suggested but may not have been implemented.**
Task 1.1 noted: "optionally rename 'Lessons' to 'Curriculum'" in the navbar. This would reduce confusion between the public curriculum page and the enrolled portal lessons.

**3. No breadcrumbs on marketing pages.**
Portal has breadcrumbs (Module → Lesson), but marketing pages don't. Blog posts, foundation subpages, and programs would benefit from breadcrumb navigation for orientation.

**4. Footer nav columns may not match current routes.**
Footer uses a `FOOTER_NAV` constant — verify it reflects current routing (no `/media-kit`, correct dropdown groupings).

---

## 6. Engineering & Code Quality Critique

**Role:** Senior Engineer evaluating architecture, patterns, maintainability, type safety, and performance.

### What's Working

- **Component architecture is clean.** 130 components across 14 directories. Average ~48 LOC per component. Consistent `ComponentName.tsx` + `index.ts` structure.
- **Server/client boundary is correct.** 28 of 130 components marked `'use client'`. All justified (forms, navigation, animations, portal interactivity). No unnecessary client components detected.
- **Type safety is strong.** `lib/types.ts` (283 lines) centralizes 21 interfaces matching Sanity schemas. No `any` types found in spot checks.
- **Data fetching is well-patterned.** `lib/sanity.ts` (559 lines) uses reusable field projections and generic `fetchList`/`fetchOne` helpers. All pages implement try/catch fallback pattern.
- **Custom hooks are well-organized.** 9 hooks in `lib/hooks/` with barrel export. Single-responsibility (scroll animation, focus trap, form validation, keyboard navigation, etc.).
- **CLAUDE.md compliance is excellent.** All 16 rules pass spot-check verification.

### Issues

**1. Five components exceed 300 LOC complexity threshold.**

| Component | Lines | Issue |
|-----------|-------|-------|
| `Navbar.tsx` | 319 | Mobile menu logic, dropdown handlers, active state detection all inline |
| `PresenceCoach.tsx` | 308 | Chat state, streaming fetch, rate limiting, auto-scroll, textarea resize all in one |
| `PresenceAuditFlow.tsx` | 265 | Multi-step form with challenge selection |
| `SegmentedInquiryForm.tsx` | 247 | Contact form with inquiry type switching |
| `PortalShell.tsx` | 246 | Sidebar course tree, expand/collapse, progress calculation |

**Recommendation for PresenceCoach (highest impact):**
```
Extract to:
- lib/hooks/usePresenceChat.ts — message state, streaming logic, rate limiting
- components/portal/PresenceCoachInput.tsx — textarea with auto-resize
- components/portal/PresenceCoach.tsx — UI rendering only (~120 LOC)
```

**Recommendation for Navbar:**
```
Extract to:
- components/navigation/NavDropdown.tsx — dropdown menu logic
- components/navigation/MobileMenu.tsx — mobile menu overlay
- components/navigation/Navbar.tsx — shell/composition only (~150 LOC)
```

**2. Page-level client components are large.**

| File | Lines | Purpose |
|------|-------|---------|
| `IkigaiClient.tsx` | 672 | Full Ikigai assessment flow |
| `MovementPlanClient.tsx` | 537 | AI movement plan generator |
| `TonalityClient.tsx` | 499 | AI tonality analyzer |
| `PresenceScoreClient.tsx` | 441 | AI presence scorer |
| `admin/page.tsx` | 421 | Admin dashboard |

These are feature-complete client apps within pages. Complexity is inherent to the feature, but state management could be extracted to custom hooks to improve testability and reduce component LOC.

**3. Missing barrel exports in four directories.**

| Directory | Files | Missing |
|-----------|-------|---------|
| `components/forms/` | 3 components | No `index.ts` |
| `components/ui/` | 6 components | No `index.ts` |
| `components/portal/` | 4 components | No `index.ts` |
| `components/shared/` | 12 directories | No top-level `index.ts` |

This forces direct path imports (`@/components/portal/PresenceCoach`) rather than barrel imports (`@/components/portal`). Minor consistency issue but violates the pattern established by `components/sections/index.ts`.

**4. Hero component variants are confusing.**
Four hero-related components exist:
- `components/sections/home/hero/` — homepage hero (specific)
- `components/sections/about/hero/` — about page hero (specific)
- `components/shared/hero/` — generic hero wrapper
- `components/shared/page-hero/` — page hero variant

The distinction between `shared/hero` and `shared/page-hero` is unclear. Consolidate to one reusable `PageHero` component.

**5. No test coverage.**
Zero test files found. No `__tests__/` directories, no `.test.tsx` files, no testing libraries in dependencies. For a platform handling payments and authentication, this is a risk.

**Recommendation:** At minimum, add integration tests for:
- Stripe checkout → webhook → enrollment flow
- Authentication → portal access gate
- Sanity data fetching → fallback behavior

---

## 7. CSS Optimization Plan

**Total CSS:** 17,693 lines across 19 files + 43 lines in `globals.css`.

### 7.1 File Size Analysis

| File | Lines | Assessment |
|------|-------|-----------|
| `pages-portal.css` | 2,597 | **Critical** — nearly 15% of total CSS |
| `pages-portal-tools.css` | 2,195 | **Critical** — tool-specific styles are massive |
| `layout.css` | 2,160 | **High** — contains portal sidebar + marketing grid |
| `sections.css` | 2,075 | **High** — hero + email + testimonials + CTA |
| `cards.css` | 1,318 | **Moderate** — 7 card types, reasonable |
| `pages-blog.css` | 1,087 | **Moderate** — search + filter + cards + featured |
| `pages-audit.css` | 879 | Acceptable |
| `pages-lessons.css` | 867 | Acceptable |
| `pages-ikigai.css` | 770 | Acceptable |
| `components.css` | 629 | Acceptable |
| `interactions.css` | 520 | Acceptable |
| `typography.css` | 450 | Acceptable |
| `pages-contact.css` | 435 | Acceptable |
| `pages-foundation.css` | 410 | Acceptable |
| `utilities.css` | 400 | Acceptable |
| `pages-dance.css` | 382 | Acceptable |
| `pages-forms.css` | 247 | Good |
| `variables.css` | 146 | Good |
| `base.css` | 126 | Good |

### 7.2 Critical Issues

**Issue 1: Hardcoded colors outside design tokens**

19+ instances of `#fff`/`#ffffff`, plus:
- `pages-ikigai.css`: Quadrant colors hardcoded as hex (`#4a3a5c`, `#6b8e63`, `#b89a5f`, `#6a8aaa`) instead of `var(--color-burnt-indigo)` etc.
- `pages-portal-tools.css`: 14+ hardcoded hex colors (`#333`, `#666`, `#ccc`, `#7a5e28`, etc.)
- `pages-portal.css`: OAuth button colors (`#f59e0b`, `#8b5cf6`, `#3b82f6`, `#10b981`)
- `sections.css`: Error color `#f5a3a3` instead of `--color-error`
- `cards.css`: Fallback `#e2e8f0` in `var()` calls

**Fix:** Add missing tokens to `variables.css`:
```css
:root {
  --text-on-dark: #f1f1f1;
  --text-on-accent: #ffffff;
  /* OAuth provider colors (external brand guidelines) */
  --oauth-google: #f59e0b;
  --oauth-microsoft: #8b5cf6;
  --oauth-github: #3b82f6;
  --oauth-discord: #10b981;
}
```
Then replace all hardcoded hex values in page-scoped files with variable references.

**Issue 2: Inconsistent responsive breakpoints**

Six different breakpoints used across 19 files:

| Breakpoint | Usage Count | Files |
|-----------|-------------|-------|
| 480px | 4 | layout, sections, blog, portal |
| 560px | 1 | portal only |
| 640px | 25 | layout, cards, utilities, forms, audit, sections |
| 768px | 27 | layout, cards, utilities, sections, blog, dance, portal |
| 960px | 1 | ikigai only |
| 1024px | 34 | layout, sections, utilities, cards, blog, foundation, lessons |

**Fix:** Standardize on three breakpoints. Add to `variables.css` as comments (CSS custom properties can't be used in media queries, but documenting the standard prevents drift):
```css
/* Breakpoint standard:
   Mobile-first, breakpoints UP:
   sm: 640px  — mobile landscape / large phone
   md: 768px  — tablet
   lg: 1024px — desktop
   
   480px, 560px, 960px are non-standard — migrate to nearest standard.
*/
```

**Issue 3: Duplicate selector definitions**

- `.testimonial-card` defined twice in `cards.css` (lines ~71-177 and ~180-253) with different padding values
- Button hover state appears twice in `components.css` with slight variations
- `.stat-number` defined in both `utilities.css` and `typography.css`
- Section header patterns (`.section-header`, `.section-eyebrow`, `.section-title`) appear in both `components.css` and `layout.css`
- Text size utilities (`.text-lg`, `.text-base`, `.text-sm`) in both `typography.css` and `utilities.css`

**Fix:** Deduplicate each pair. Keep the definition in the more appropriate file (section headers → `components.css`, stat numbers → `typography.css`, text sizes → `typography.css`). Remove the duplicate.

**Issue 4: Hardcoded font-family references**

`pages-contact.css` and `pages-dance.css` use `font-family: 'Fraunces'` directly instead of `var(--font-headline)`.

**Fix:** Global find-and-replace: `font-family: 'Fraunces'` → `font-family: var(--font-headline)` and `font-family: "Fraunces"` → `font-family: var(--font-headline)`.

### 7.3 Optimization Recommendations (Prioritized)

**Phase 1: Token Compliance (estimated: ~2 hours)**
1. Add missing color tokens to `variables.css` (~10 new tokens)
2. Replace all hardcoded hex values in `pages-ikigai.css` with variable references
3. Replace all hardcoded hex values in `pages-portal-tools.css`
4. Replace all hardcoded hex values in `pages-portal.css`
5. Replace hardcoded `'Fraunces'` with `var(--font-headline)`
6. Replace `#f5a3a3` in `sections.css` with `var(--color-error)` or a light variant

**Phase 2: Deduplication (estimated: ~3 hours)**
1. Remove duplicate `.testimonial-card` definition in `cards.css`
2. Consolidate button hover states in `components.css`
3. Remove `.stat-number` from `utilities.css` (keep in `typography.css`)
4. Remove text size utilities from `utilities.css` (keep in `typography.css`)
5. Consolidate section header patterns to `components.css` only
6. Audit form styles across `components.css`, `pages-forms.css`, `pages-contact.css`, `pages-audit.css` for duplication

**Phase 3: Breakpoint Standardization (estimated: ~4 hours)**
1. Document standard breakpoints in `variables.css`
2. Migrate `480px` breakpoints to `640px` (test each change visually)
3. Migrate `560px` in `pages-portal.css` to `640px`
4. Migrate `960px` in `pages-ikigai.css` to `1024px`
5. Verify no visual regressions at 375px, 640px, 768px, 1024px, 1440px

**Phase 4: File Size Reduction (estimated: ~3 hours)**
Note: CLAUDE.md rule #2 prohibits new CSS files. These optimizations work within existing files.
1. Audit `pages-portal.css` (2,597 lines) for unused selectors — grep every class against `components/portal/` and `app/(portal)/`
2. Audit `pages-portal-tools.css` (2,195 lines) — the shared `.tool-btn` consolidation was done (Task 3.5) but file is still massive; audit for remaining dead CSS
3. Audit `layout.css` (2,160 lines) — check if portal sidebar styles overlap with `pages-portal.css`
4. Remove unused `.card-enhanced-shine` from `cards.css` (opacity never changes from 0)

**Estimated total reduction:** 800-1,200 lines (~5-7% of total CSS)

---

## 8. Refactor Plan

### Phase A: Quick Wins (1-2 days, CSS only, no component changes)

| # | Task | File(s) | Impact |
|---|------|---------|--------|
| A1 | Replace hardcoded colors with CSS variables | `pages-ikigai.css`, `pages-portal-tools.css`, `pages-portal.css`, `sections.css`, `cards.css` | Maintainability |
| A2 | Replace hardcoded `'Fraunces'` references | `pages-contact.css`, `pages-dance.css` | Consistency |
| A3 | Remove duplicate `.testimonial-card` | `cards.css` | ~80 lines removed |
| A4 | Consolidate duplicate text utilities | `typography.css`, `utilities.css` | ~30 lines removed |
| A5 | Remove duplicate section header styles | `components.css`, `layout.css` | ~40 lines removed |
| A6 | Remove unused `.card-enhanced-shine` | `cards.css` | ~12 lines removed |
| A7 | Document breakpoint standard | `variables.css` | Prevents future drift |

### Phase B: Component Refactors (3-5 days)

| # | Task | File(s) | Impact |
|---|------|---------|--------|
| B1 | Extract `usePresenceChat` hook from PresenceCoach | New: `lib/hooks/usePresenceChat.ts`, Edit: `PresenceCoach.tsx` | PresenceCoach drops from 308 → ~120 LOC |
| B2 | Extract NavDropdown + MobileMenu from Navbar | New: `components/navigation/NavDropdown.tsx`, `MobileMenu.tsx` | Navbar drops from 319 → ~150 LOC |
| B3 | Add barrel exports to `forms/`, `ui/`, `portal/`, `shared/` | New: 4 `index.ts` files | Import consistency |
| B4 | Consolidate hero variants | Edit: `shared/hero/`, `shared/page-hero/` | Remove ambiguity |
| B5 | Extract portal sidebar builder from `(portal)/layout.tsx` | New: `lib/portal-utils.ts` | Testability |

### Phase C: UX & Conversion Improvements (1-2 weeks)

| # | Task | Impact |
|---|------|--------|
| C1 | Implement guest checkout (Stripe → account creation post-payment) | Estimated 10-15% conversion uplift |
| C2 | Make MFA optional (move to portal settings) | Reduces enrollment friction |
| C3 | Change "Portal" navbar button to context-aware text | Reduces visitor confusion |
| C4 | Add polling for enrollment confirmation | Eliminates manual refresh UX |
| C5 | Add warm amber accent to pull quotes, pricing highlights | Visual warmth |
| C6 | Increase `--bg-tertiary` contrast for section separation | Visual rhythm |
| C7 | Implement lighter Fraunces weights for display text | Editorial typography |

### Phase D: Content & Trust (ongoing)

| # | Task | Impact |
|---|------|--------|
| D1 | Professional photoshoot | Biggest single visual improvement |
| D2 | Add credentials/trust section to About page | Authority signals |
| D3 | Rewrite testimonials with transformation metrics | Social proof specificity |
| D4 | Create Module 1 content in Sanity | **Launch unblocker** |
| D5 | Add lesson preview / trailer to Foundation page | Reduces purchase anxiety |
| D6 | Add comparison table to Programs page | Decision simplification |
| D7 | Strengthen email capture value prop | Lead gen improvement |
| D8 | Add "For Teams" section or page | Corporate funnel |

### Phase E: Testing & Reliability (1 week)

| # | Task | Impact |
|---|------|--------|
| E1 | Add Stripe checkout → webhook → enrollment integration test | Payment reliability |
| E2 | Add auth → portal access gate test | Security verification |
| E3 | Complete mobile audit at 375px + 768px (Task 4.3) | Mobile UX confidence |
| E4 | Standardize responsive breakpoints (migrate non-standard) | CSS consistency |
| E5 | Dead CSS audit (grep classes against components) | File size reduction |

---

## 9. Discipline-Specific Scorecards

### Graphic Design: 6.5/10

| Element | Score | Notes |
|---------|-------|-------|
| Color palette | 8/10 | Distinctive, cohesive, well-tokenized |
| Typography | 7/10 | Strong pairing, weight variety underused |
| Visual hierarchy | 6/10 | Sections blur together, backgrounds monotonal |
| Imagery | 3/10 | Almost entirely absent — biggest gap |
| Decorative elements | 5/10 | FluidShape and orbs exist but underused |
| Brand consistency | 8/10 | Palette and tone are consistent throughout |

### UX/UI Design: 7.0/10

| Element | Score | Notes |
|---------|-------|-------|
| Navigation | 8/10 | Well-structured, clear hierarchy |
| Conversion funnel | 5/10 | Account-before-checkout is conversion-killing |
| Portal experience | 8/10 | Personalized, smart context cards, AI tools |
| Mobile readiness | 6/10 | Responsive CSS exists, not systematically tested |
| Accessibility | 7/10 | Focus states, reduced-motion, WCAG tap targets |
| Error handling | 7/10 | Enrollment error states, form validation present |

### Copywriting: 8.0/10

| Element | Score | Notes |
|---------|-------|-------|
| Brand positioning | 10/10 | "Quiet Command" owns a clear niche |
| Hero copy | 9/10 | Compelling, clear, speaks to introverts |
| Product descriptions | 8/10 | Foundation curriculum is well-articulated |
| Social proof | 5/10 | Testimonials lack transformation metrics |
| Trust signals | 4/10 | Missing credentials, client count, guarantees |
| CTAs | 7/10 | Multiple entry points, some redundancy |
| Microcopy | 9/10 | Human, warm, builds trust |
| Email capture | 5/10 | Generic value prop, needs specificity |

### Product Management: 7.0/10

| Element | Score | Notes |
|---------|-------|-------|
| Core offer clarity | 9/10 | Foundation is well-defined and differentiated |
| Pricing strategy | 7/10 | Two tiers, no comparison table, no team pricing |
| Feature completeness | 6/10 | Portal built, content empty, no video preview |
| Competitive positioning | 7/10 | Movement-based angle is unique |
| Launch readiness | 4/10 | Multiple blockers (content, images, testing) |
| Monetization strategy | 6/10 | No corporate tier, no cohort model, no community |

### Engineering: 8.0/10

| Element | Score | Notes |
|---------|-------|-------|
| Architecture | 9/10 | Route groups, centralized data, clean patterns |
| Type safety | 9/10 | Comprehensive, centralized types |
| Component quality | 7/10 | 5 components over complexity threshold |
| Data fetching | 8/10 | Centralized, fallback pattern, generic helpers |
| CSS architecture | 6.5/10 | Good structure, poor token discipline |
| Test coverage | 2/10 | Zero tests for payment-critical flows |
| Code conventions | 9/10 | CLAUDE.md rules followed consistently |

---

## 10. Top 10 Actions Ranked by Impact

| Rank | Action | Effort | Impact | Category |
|------|--------|--------|--------|----------|
| 1 | Populate Module 1 content in Sanity | High | **Launch unblocker** | Content |
| 2 | Implement guest checkout (account after payment) | Medium | ~15% conversion uplift | UX |
| 3 | Professional photoshoot | External | Biggest visual improvement | Design |
| 4 | Add testimonials with transformation metrics | Low | Social proof credibility | Copy |
| 5 | Add credentials section to About page | Low | Authority signals | Copy |
| 6 | Replace hardcoded CSS colors with variables | Low | Maintainability | Engineering |
| 7 | Add lesson preview / trailer to Foundation | Medium | Purchase confidence | Product |
| 8 | Extract PresenceCoach + Navbar to sub-components | Medium | Code maintainability | Engineering |
| 9 | Standardize CSS breakpoints | Medium | Consistency | Engineering |
| 10 | Complete mobile audit (Task 4.3) | Medium | Mobile UX confidence | UX |

---

*This audit was conducted on 2026-04-10 against branch `0.7.3`. All line counts and file references verified against the current codebase state.*
