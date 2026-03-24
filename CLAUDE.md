# CLAUDE.md — Jonchalant Codebase Context

Complete reference for the jonchalant.com website codebase. Updated: March 2026.

---

## Tech Stack & Versions

| Tool                  | Version             |
| --------------------- | ------------------- |
| Next.js               | 16.1.1 (App Router) |
| React                 | 19.2.3              |
| TypeScript            | ^5                  |
| Tailwind CSS          | ^4 (utility-only)   |
| Sanity CMS            | ^4.22.0             |
| @sanity/client        | ^6.29.1             |
| next-sanity           | ^11.6.12            |
| @supabase/supabase-js | ^2.98.0             |
| styled-components     | ^6.3.11             |
| resend                | ^6.9.3              |

**Build commands:**

```bash
npm run dev          # http://localhost:3000 with hot reload
npm run build        # Production build (Turbopack)
npm run start        # Run production build locally
npm run lint         # ESLint
npm run sanity:dev   # cd sanity && npm run dev
npm run sanity:deploy # cd sanity && npm run deploy
```

**Key config (next.config.ts):**

- `reactCompiler: true` — automatic memoization, no manual useMemo/useCallback
- `turbopack: { root: __dirname }` — faster builds
- Remote image patterns: `images.unsplash.com`, `picsum.photos`

---

## Project Purpose

**Professional Executive Presence Coaching Platform** for Jon. The site offers coaching programs, blog content, lessons, case studies, testimonials, dance choreography portfolio, and a media kit. Target audience: introverts, shy professionals, and corporate clients. Design philosophy: Japanese Zen-inspired (burnt indigo + muted moss palette, editorial typography, generous whitespace).

---

## Routing Structure (App Router)

```
app/
├── page.tsx              → Home page
├── about/page.tsx        → About Jon
├── blog/
│   ├── page.tsx          → Blog index
│   └── [slug]/           → Blog post (dynamic)
├── programs/page.tsx     → Coaching programs
├── dance/page.tsx        → Choreography portfolio
├── lessons/
│   ├── page.tsx          → Lessons by level
│   └── [courseSlug]/
│       ├── page.tsx      → Course detail with sticky TOC
│       └── [lessonSlug]/page.tsx → Lesson page with video + progress tracking
├── media-kit/page.tsx    → Media kit & collaboration
├── contact/
│   ├── page.tsx          → Server wrapper
│   └── ContactClient.tsx → Client component (form)
├── login/
│   ├── page.tsx          → Auth page (email + Google OAuth)
│   └── LoginClient.tsx   → Client form component
├── portal/
│   ├── layout.tsx
│   ├── page.tsx          → Protected dashboard (requires Supabase auth)
│   ├── PortalCourseCard.tsx
│   ├── SignOutButton.tsx
│   └── [slug]/
│       ├── page.tsx      → Portal lesson page (server, gated)
│       └── LessonActions.tsx
├── ikigai/
│   ├── page.tsx          → Interactive Ikigai quiz with SVG diagram
│   └── IkigaiClient.tsx  → Client component
├── privacy/page.tsx      → Privacy policy (static)
├── auth/callback/        → OAuth callback route (Supabase SSR)
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── auth/
│   ├── inquiries/
│   ├── login/
│   └── reset-password/
├── api/
│   ├── inquiries/        → Inquiry form API route
│   └── subscribe/        → Email subscribe API route (Kit/ConvertKit)
└── css/                  → 10 consolidated CSS files
```

---

## CSS Architecture

### app/globals.css imports:

```css
@layer reset, variables, base, components, utilities, interactive;

@layer variables  → ./css/variables.css
@layer base       → ./css/base.css
@layer components → ./css/components.css, ./css/typography.css,
                    ./css/layout.css, ./css/cards.css,
                    ./css/sections.css, ./css/pages.css
@layer utilities  → ./css/utilities.css
@layer interactive → ./css/interactions.css;
```

### 10 CSS files (app/css/):

| File               | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| `variables.css`    | Design tokens: colors, spacing, fonts, transitions             |
| `base.css`         | HTML/body resets, default element styles                       |
| `components.css`   | Reusable UI patterns: buttons, badges                          |
| `typography.css`   | Text hierarchy: headings, body, sizes                          |
| `layout.css`       | Grid systems, flexbox, responsive layouts                      |
| `cards.css`        | All card types: testimonial, blog, case study, lesson, service |
| `sections.css`     | Full-width section components: hero, carousel, CTA, etc.       |
| `pages.css`        | Form + page-specific styles: contact, blog, dance, etc.        |
| `utilities.css`    | Spacing, color utilities, responsive breakpoints               |
| `interactions.css` | Hover states, transitions, animations                          |

### Key CSS variables (variables.css):

```css
--bg-primary: #f8f8f5 /* Rice paper/bone */ --bg-secondary: #fafaf8
  --bg-tertiary: #f0ede8 /* Warm sand */ --text-primary: #1a1a1a
  --text-secondary: #3d3d3d --text-tertiary: #7a7a7a --border-color: #d4cfc7
  --border-subtle: #e8e3db --color-burnt-indigo: #4a3a5c
  --color-burnt-indigo-light: #6b5a7a --color-muted-moss: #6b8e63
  /* PRIMARY GREEN */ --color-moss-light: #8aa87a --accent-primary: #6b8e63
  /* Muted Moss — primary CTA accent */ --accent-hover: #8aa87a
  --accent-tertiary: #6a8aaa /* Soft indigo */ --btn-primary-text: #ffffff;
```

**Rules:** No `!important`. No new CSS files — all styles go in the existing 10 files. No inline styles except truly dynamic values. No Tailwind utility classes on component JSX (only text sizing, font weight, responsive breakpoints allowed). Light mode only — no dark mode.

---

## Component Directory Tree

```
components/
├── animations/
│   ├── ScrollFade.tsx
│   ├── ScrollStagger.tsx
│   └── index.ts
├── content/
│   ├── DanceCard.tsx
│   ├── DanceFilter.tsx
│   └── index.ts
├── decorative/
│   ├── FluidShape.tsx
│   └── index.ts
├── forms/
│   ├── BlogOptIn.tsx
│   └── SegmentedInquiryForm.tsx
├── layout/
│   ├── PageTransition.tsx
│   ├── RouteAwareLayout.tsx
│   ├── SectionContent.tsx
│   ├── SectionWrapper.tsx
│   ├── SidebarOverlay.tsx
│   └── index.ts
├── navigation/
│   ├── AdminNavbar.tsx
│   ├── Navbar.tsx
│   └── index.ts
├── typography/
│   ├── Heading.tsx
│   ├── TextLink.tsx
│   └── index.ts
├── utilities/
│   ├── badges/
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── cards/
│   │   ├── BlogCard.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── LessonCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── index.ts
│   └── grids/
│       ├── CardGrid.tsx
│       ├── StatsGrid.tsx
│       └── index.ts
├── shared/                         ← Reusable across multiple pages
│   ├── carousel/
│   │   ├── Carousel.tsx            ('use client')
│   │   └── index.ts
│   ├── case-studies/
│   │   ├── CaseStudies.tsx
│   │   └── index.ts
│   ├── case-study/
│   │   ├── CaseStudy.tsx
│   │   └── index.ts
│   ├── collaboration/
│   │   ├── Collaboration.tsx
│   │   └── index.ts
│   ├── copy-button/
│   │   ├── CopyButton.tsx          ('use client')
│   │   └── index.ts
│   ├── cta/
│   │   ├── CTA.tsx
│   │   └── index.ts
│   ├── faq/
│   │   ├── FAQ.tsx
│   │   └── index.ts
│   ├── featured-blog/
│   │   ├── FeaturedBlog.tsx
│   │   └── index.ts
│   ├── hero/
│   │   ├── Hero.tsx                (GenericHero)
│   │   └── index.ts
│   ├── instagram-embed/
│   │   ├── InstagramEmbed.tsx      ('use client')
│   │   └── index.ts
│   ├── page-hero/
│   │   ├── PageHero.tsx
│   │   └── index.ts
│   ├── programs/
│   │   ├── Programs.tsx
│   │   └── index.ts
│   ├── services/
│   │   ├── Services.tsx
│   │   └── index.ts
│   ├── stats/
│   │   ├── Stats.tsx
│   │   └── index.ts
│   ├── testimonials/
│   │   ├── Testimonials.tsx
│   │   └── index.ts
│   └── three-pillars/
│       ├── ThreePillars.tsx
│       └── index.ts
│   ├── video-embed/
│   │   ├── VideoEmbed.tsx          ('use client')
│   │   └── index.ts
└── sections/                       ← Page/feature-scoped sections
    ├── index.ts                    ← Central export hub (see below)
    ├── about/
    │   ├── hero/        Hero.tsx + index.ts
    │   ├── introvert/   Introvert.tsx + index.ts
    │   ├── origin/      Origin.tsx + index.ts
    │   ├── philosophy/  Philosophy.tsx + index.ts
    │   ├── services/    Services.tsx + index.ts
    │   └── index.ts
    ├── blog/
    │   ├── Featured.tsx
    │   ├── Posts.tsx
    │   ├── Related.tsx
    │   └── index.ts
    ├── dance/
    │   ├── Approach.tsx
    │   ├── FeaturedVideo.tsx
    │   ├── Portfolio.tsx
    │   └── index.ts
    ├── home/
    │   ├── blog-cards/     BlogCards.tsx + index.ts
    │   ├── featured-areas/ FeaturedAreas.tsx + index.ts
    │   ├── hero/           Hero.tsx + index.ts
    │   ├── impact/         ImpactSection.tsx + index.ts
    │   ├── portfolio-preview/ PortfolioPreview.tsx + index.ts
    │   ├── why-work-together/ WhyWorkTogether.tsx + index.ts
    │   └── index.ts
    ├── lessons/
    │   ├── LessonCategory.tsx
    │   └── index.ts
    ├── media-kit/
    │   ├── AudienceProfile.tsx
    │   ├── CollaborationPackages.tsx
    │   ├── ContentMix.tsx
    │   ├── HeroStats.tsx
    │   ├── KeyMetrics.tsx
    │   ├── PlatformBreakdown.tsx
    │   └── index.ts
    └── programs/
        ├── FocusAreas.tsx
        ├── SupplementalLearning.tsx
        └── index.ts
```

---

## sections/index.ts — All Exports

```ts
// HOME PAGE
export { Hero } from "./home/hero";
export { FeaturedAreas } from "./home/featured-areas";
export { BlogCards } from "./home/blog-cards";
export { ImpactSection } from "./home/impact";
export { PortfolioPreview } from "./home/portfolio-preview";
export { WhyWorkTogether } from "./home/why-work-together";

// ABOUT PAGE
export { Hero as AboutHero } from "./about/hero";
export { Origin } from "./about/origin";
export { Services as AboutServices } from "./about/services";
export { Philosophy } from "./about/philosophy";
export { Introvert } from "./about/introvert";

// SHARED SECTIONS (reusable)
export { Testimonials } from "@/components/shared/testimonials";
export { CaseStudy } from "@/components/shared/case-study";
export { Services } from "@/components/shared/services";
export { Stats } from "@/components/shared/stats";

// BLOG
export {
  Featured as BlogFeatured,
  Posts as BlogPosts,
  Related as BlogRelated,
} from "@/components/sections/blog";

// SHARED GENERIC
export { CTA } from "@/components/shared/cta";
export { FAQ } from "@/components/shared/faq";
export { PageHero } from "@/components/shared/page-hero";
export { Hero as GenericHero } from "@/components/shared/hero";
export { FeaturedBlog } from "@/components/shared/featured-blog";
export { ThreePillars } from "@/components/shared/three-pillars";
export { Programs } from "@/components/shared/programs";
export { Collaboration } from "@/components/shared/collaboration";
export { Carousel } from "@/components/shared/carousel";
export { CaseStudies } from "@/components/shared/case-studies";

// DANCE
export {
  FeaturedVideo,
  Approach as DanceApproach,
  Portfolio as DancePortfolio,
} from "./dance";

// OTHER PAGE-SPECIFIC
export { LessonCategory } from "./lessons";
export {
  KeyMetrics,
  PlatformBreakdown,
  ContentMix,
  AudienceProfile,
  HeroStats,
  CollaborationPackages,
} from "./media-kit";
export { FocusAreas, SupplementalLearning } from "./programs";

// UTILITY RE-EXPORTS
export { Badge } from "@/components/utilities/badges";
export {
  TestimonialCard,
  CaseStudyCard,
  LessonCard,
  BlogCard,
  ServiceCard,
} from "@/components/utilities/cards";
export { StatsGrid, CardGrid } from "@/components/utilities/grids";
```

---

## Page Section Breakdown

### app/page.tsx (Home)

Fetches: `getHomePageContent()`, `getServices()`, `getTestimonials()`

Sections (in order):

1. `<Hero />` — home/hero
2. `<Stats />` — with `homeContent.stats`, heading "Proven Results"
3. `<Services />` — with Sanity services
4. `<Testimonials />` — first 3 testimonials
5. `<CTA />` — "Ready to Transform Your Executive Presence?"

Wrappers: `<PageTransition animation="fade">` + `<SectionWrapper variant="primary|secondary|tertiary">` + `<SectionContent>`

Also includes: `AggregateRatingSchema` JSON-LD script

### app/about/page.tsx

Fetches: `getAboutPageContent()`

Sections (in order):

1. `<AboutHero />` — about/hero, passes `heroHeadline`, `heroDescription`
2. `<Origin />` — about/origin, passes `originSectionHeadline`, `originSectionDescription` (phases array and image placeholder removed)
3. `<TurningPoint />` — about/turning-point, passes `turningPointHeadline`, `turningPointBody` (conditional on Sanity field)
4. `<MethodologyNarrative />` — about/methodology-narrative, passes `methodologyHeadline`, `methodologyBody` (conditional on Sanity field)
5. `<Stats />` — with `aboutContent.stats`, heading "The Work in Numbers"
6. `<WhyExists />` — about/why-exists, passes `whyExistsHeadline`, `whyExistsBody` (conditional on Sanity field)
7. `<WhoFor />` — about/who-for, passes `whoForHeadline`, `whoForBody` (conditional on Sanity field)
8. `<CTA />` — driven by Sanity `closingHeadline`, `closingBody`, `ctaButtonText`

### app/blog/page.tsx

Fetches: Direct `client.fetch()` for `*[_type == "blogPost"]`

Sections (in order):

1. Blog page header (inline heading via `<Heading level={1}>`)
2. `<BlogFeatured />` — sections/blog/Featured (only if featuredPosts.length > 0)
3. `<BlogPosts />` — sections/blog/Posts (regular non-featured posts)
4. `<CTA />` — "Ready to Build Your Executive Presence?"

### app/programs/page.tsx

Fetches: `getPrograms()`, `getProgramsFocusItems()`

Sections (in order):

1. `<PageHero />` — with `<FocusAreas items={focusItems} />` as rightColumn
2. `<ProgramsSection />` — shared/programs (id="programs-section")
3. SupplementalLearning + CTA (remaining content)

Also includes: `CourseSchema` JSON-LD for 8-Week program and Group Workshop

### app/dance/page.tsx

Fetches: `getPortfolioItems()`, `getFeaturedPortfolioItem()`

Sections (in order):

1. `<FeaturedVideo />` — dance/FeaturedVideo (if featuredItem exists)
2. `<DancePortfolio />` — dance/Portfolio
3. `<DanceApproach />` — dance/Approach
4. `<CTA />` — "Ready to Integrate Movement into Your Leadership?"

### app/lessons/page.tsx

Fetches: `getLessons()`

Sections (in order):

1. `<GenericHero />` — shared/hero, heading "Master Quiet Command"
2. Supplemental text panel (inline, links to /dance)
3. `<LessonCategory level="Beginner" />` — filtered lessons
4. `<LessonCategory level="Intermediate" />` — filtered lessons
5. `<LessonCategory level="Advanced" />` — filtered lessons
6. `<CTA />` — "Learn Better with Coaching"

### app/media-kit/page.tsx

Fetches: `getMediaKitData()`, `getPageMetadata('mediaKit')`, `getCollaborationPackages()`

Sections (in order):

1. `<PageHero />` — with `<HeroStats />` as rightColumn
2. `<KeyMetrics />` — media-kit/KeyMetrics
3. `<PlatformBreakdown />` — media-kit/PlatformBreakdown
4. `<ContentMix />` — media-kit/ContentMix
5. `<AudienceProfile />` — media-kit/AudienceProfile
6. `<CollaborationPackages />` — media-kit/CollaborationPackages (id="collaboration-section")
7. `<CTA />`

### app/contact/page.tsx

Fetches: `getContactInfo()`, `getPageMetadata('contact')`
Delegates entirely to `<ContactClient />` (client component, contains `SegmentedInquiryForm`)

---

## Layout Components

All pages use these wrappers from `@/components/layout`:

- `<PageTransition animation="fade">` — wraps entire page content, handles route transitions
- `<SectionWrapper variant="primary|secondary|tertiary">` — sets section background color
- `<SectionContent>` — constrains max-width, handles inner padding
- `<RouteAwareLayout>` — in app/layout.tsx, handles Navbar visibility
- `<SidebarOverlay>` — mobile nav overlay

---

## Sanity CMS

### Studio location: `sanity/` folder

- `sanity.config.ts` — main Sanity Studio config
- `sanity.cli.ts` — CLI config
- `structure.ts` — custom Studio desk structure
- `schemaTypes/index.ts` — schema registry
- `schemas/` — individual schema files

### All Schema Types (19 total):

| Schema                 | Type     | Description                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `aboutPage`            | document | About page content (heroHeadline, heroDescription, originSectionHeadline, originSectionDescription, turningPointHeadline, turningPointBody, methodologyHeadline, methodologyBody, whyExistsHeadline, whyExistsBody, whoForHeadline, whoForBody, closingHeadline, closingBody, ctaButtonText, phases, stats, philosophies, introvertTraits) |
| `blogPost`             | document | Blog posts (title, slug, excerpt, pillar, readingTime, publishedAt, featured)   |
| `caseStudy`            | document | Case studies (challenge, solution, results, testimonial, image)                 |
| `collaboration`        | document | Portfolio collaborations (category, price, deliverables, timeline)              |
| `collaborationPackage` | document | Media kit collaboration packages (packages array)                               |
| `contactInfo`          | document | Contact methods (label, value, href, description)                               |
| `danceCategoryFilter`  | document | Dance filter categories (categories array)                                      |
| `homePageContent`      | document | Home page dynamic content (stats, headlines, descriptions)                      |
| `lesson`               | document | Lessons (category: Beginner/Intermediate/Advanced, pillar, duration, icon)      |
| `mediaKitData`         | document | Metrics, platforms, content categories, audience demographics                   |
| `pageMetadata`         | document | Page-level SEO/CTA metadata per page slug                                       |
| `portfolio`            | document | Dance portfolio items (videoUrl, thumbnail, category, duration)                 |
| `program`              | document | Coaching programs (category, investment, features)                              |
| `programFocus`         | document | Program focus area items (title, description, icon)                             |
| `programsPageContent`  | document | Programs page dynamic content                                                   |
| `service`              | document | Coaching services (icon, features, isPrimary, color)                            |
| `serviceCategory`      | document | Service categories (categories array with items)                                |
| `testimonial`          | document | Testimonials (clientName, role, company, quote, result, featured, serviceType)  |
| `portalLesson`         | document | Portal lesson content (in sanity/schemas/portalLesson.ts)                       |

Note: `module.ts` also exists in `sanity/schemas/` (portal module groupings).

### Sanity client (lib/sanity.ts):

```ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
export function urlFor(source); // image URL builder
```

### All data fetching functions (lib/sanity.ts):

**Portfolio (dance videos):**

- `getPortfolioItems()` — all, ordered by `order`
- `getPortfolioByCategory(category)` — filtered
- `getPortfolioItem(slug)` — single
- `getFeaturedPortfolioItem()` — `featured == true`

**Services:**

- `getServices()` — all, ordered
- `getPrimaryService()` — `isPrimary == true`
- `getService(slug)` — single

**Collaborations:**

- `getCollaborations()` — all
- `getCollaborationsByCategory(category)` — filtered

**Media Kit:**

- `getMediaKitData()` — keyMetrics, platforms, contentCategories, audience

**Testimonials:**

- `getTestimonials(featured?)` — all or featured-only

**Case Studies:**

- `getCaseStudies(featured?)` — all or featured-only
- `getCaseStudy(slug)` — single

**Lessons:**

- `getLessons()` — all
- `getLessonsByCategory(category)` — Beginner/Intermediate/Advanced
- `getLessonsByPillar(pillar)` — filtered by pillar

**Programs:**

- `getPrograms()` — all
- `getProgramBySlug(slug)` — single
- `getProgramsByCategory(category)` — filtered
- `getProgramsFocusItems()` — `programFocus` type, ordered

**Page Metadata:**

- `getPageMetadata(page)` — per page slug (headline, subheadline, ctaTitle, etc.)

**Contact:**

- `getContactInfo()` — title + contactMethods array

**About Page:**

- `getAboutPageContent()` — full about page content

**Home Page:**

- `getHomePageContent()` — stats, headlines, sidebar features

**Dance Category Filter:**

- `getDanceCategoryFilter()` — categories array

**Service Categories:**

- `getServiceCategories()` — categories with items

**Collaboration Packages:**

- `getCollaborationPackages()` — packages array (name, price, features)

---

## Supabase Auth & Database

Used for the learning portal (authentication + progress tracking).

### SSR-Safe Auth Clients

**Never import `lib/supabase.ts`** — that file has been deleted. Use the SSR-safe helpers from `utils/supabase/`:

```ts
// Server components & Route Handlers
import { createClient } from "@/utils/supabase/server";

// Client components ('use client')
import { createClient } from "@/utils/supabase/client";

// Middleware (session refresh)
import { updateSession } from "@/utils/supabase/middleware";
```

The root `middleware.ts` delegates to `updateSession` to keep auth cookies fresh on every request. All auth-gate logic lives client-side (via the `useAuth` hook in `lib/auth-context.tsx`) or inside Route Handlers — not in middleware.

### Database

- `lesson_progress` table with Row Level Security (RLS)
- Progress helpers in `lib/portal-progress.ts` — `markLessonComplete`, `getLessonProgress`, `getCourseProgress`

---

## Other lib/ Files

| File                              | Purpose                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| `auth-context.tsx`                | React auth context provider                                           |
| `design-tokens.ts`                | JS-accessible design tokens                                           |
| `imageConfig.ts`                  | Next.js image config helpers                                          |
| `optimizedImage.tsx`              | Optimized image component wrapper                                     |
| `pageContent.ts`                  | Static/fallback page content                                          |
| `portal-progress.ts`              | Learning portal progress tracking                                     |
| `schema.ts`                       | JSON-LD structured data schemas (AggregateRatingSchema, CourseSchema) |
| `types.ts`                        | 16 shared TypeScript interfaces: `SanitySlug`, `SanityImage`, `Course`, `Module`, `Lesson`, `PortalLesson`, `BlogPost`, `Program`, `Testimonial`, `DanceCategory`, `DanceVideo`, `InstagramReel`, `MediaKit`, `MediaKitStat`, `MediaKitExpertise`, `LessonProgress` |
| `blog/portableTextComponents.tsx` | Portable text renderer for blog posts                                 |
| `hooks/`                          | Custom React hooks                                                    |

### Custom hooks (lib/hooks/):

- `useFocusTrap.ts`
- `useFormValidation.ts`
- `usePointerPosition.ts`
- `useScrollAnimation.ts`
- `useScrollTrigger.ts`
- `useSwipeGesture.ts`

---

## Middleware (middleware.ts)

Delegates session refresh to the Supabase SSR helper — no blocking at middleware level:

```ts
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

All auth-gate logic lives client-side (via the `useAuth` hook in `lib/auth-context.tsx`) or inside Route Handlers — not in middleware.

---

## Environment Variables Required

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # optional, admin only
KIT_API_KEY=                 # Kit (ConvertKit) API key
KIT_FORM_ID=                 # Kit form ID for /api/subscribe endpoint
```

---

## Key Conventions

1. **Import alias**: Always `@/` (maps to project root). Never relative paths from deep files.
2. **Server components by default**. Only add `'use client'` for interactive state (carousels, forms, toggles).
3. **CSS naming**: BEM-inspired kebab-case. `.section-name`, `.section-name-header`, `.section-name-title`, `.section-name-title:hover`.
4. **No new CSS files** — styles go in one of the 10 consolidated files.
5. **No `!important`** — fix cascade/specificity instead.
6. **No Tailwind in component JSX** (except `text-*`, `font-*`, `leading-*`, responsive breakpoint prefixes).
7. **No "Section" suffix** on component names (e.g., `Hero` not `HeroSection`).
8. **Page-specific sections** → `components/sections/{page}/`. **Reusable sections** → `components/shared/`.
9. **Utility components** (cards, badges, grids) → `components/utilities/{category}/`.
10. **All sections exported from `components/sections/index.ts`** with descriptive aliases.
11. **Sanity fallback pattern**: `try { const data = await getSanityData(); if (data) use it } catch { use fallback/mock }`.
12. **Wrappers pattern for all pages**: `<PageTransition>` → `<SectionWrapper variant>` → `<SectionContent>` → component.
13. **Auth (Supabase SSR)**: Server components use `utils/supabase/server.ts`; client components use `utils/supabase/client.ts`. Never import `lib/supabase.ts` (deleted). All auth-gate logic lives client-side in the `useAuth` hook.
14. **Shared TypeScript types**: All Sanity + portal interfaces live in `lib/types.ts`. Import from there; do not re-declare inline.

---

## Fonts

Loaded via Google Fonts (globals.css):

- **Fraunces** (9..144 optical size, 300–700 weight, italic) — serif display/headings
- **DM Sans** (300, 400, 500, 600 weight, italic 400) — body text
