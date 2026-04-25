# CLAUDE.md — Jonchalant Codebase Rules

Rules and conventions for jonchalant.com. For detailed reference (component trees, page breakdowns, Sanity schemas, data fetching), see `.github/copilot-instructions.md`.

---

## Current positioning (read this first)

Jonchalant helps professionals find the work they were meant for — then learn to inhabit it. Ikigai is the entry point. Embodiment is the practice. Dance is Jon's personal medium, used as the demonstration and the teaching vehicle, but the philosophy is medium-agnostic.

**Funnel:**
1. Ikigai Assessment (free, ungated) — identifies which of the four circles are strong/missing
2. The Four Circles (free, gated behind account creation) — 12-lesson course explaining what the results mean
3. The Foundation (paid, $197 or $497) — embodiment training through dance, transfers to any medium
4. 1-on-1 coaching ($3,500+) — custom work on specific situations

**Voice and tone:** Casual, direct, unpretentious. Specific over general. No coaching jargon. Jon speaks like someone who's honest about tradeoffs and doesn't need to impress you.

**Key phrases that should stay consistent across the site:**
- "Find the work you were meant for"
- "The medium changes. The fundamentals don't."
- "Dance is my medium. Yours will be different."
- The four pillars: Grounding, Energy, Flow, Command
- The four circles: Passion, Mission, Vocation, Profession

**What the site is not:**
- Not a dance school
- Not a generic executive coaching program
- Not a self-help product

See `design-notes/jonchalant-positioning.md` for full copy blocks and page-by-page direction.

---

## Stack & Build

Next.js 16.1.1 (App Router) | React 19 | TypeScript 5 | Tailwind v4 (utility-only) | Sanity CMS | Supabase Auth | Resend | Stripe

```bash
npm run dev           # localhost:3000
npm run build         # Production build (Turbopack)
npm run lint          # ESLint
npm run sanity:dev    # Sanity Studio dev
npm run sanity:deploy # Deploy Sanity Studio
```

Config: `reactCompiler: true` (no manual useMemo/useCallback), `turbopack` enabled.

---

## Project Purpose

Jonchalant is a professional platform helping people find their purpose (using the ikigai framework) and learn to embody it (through a dance-taught, medium-agnostic embodiment practice). Target audience: corporate professionals who are quietly misaligned — usually well-paid, competent, in-demand, and missing one of the four ikigai circles (most often Mission or Passion).

Design philosophy: Japanese Zen-inspired (burnt indigo, muted moss, warm amber palette; editorial typography via Fraunces; generous whitespace). The brand is warm and honest, not polished and aspirational. Light mode only.

---

## Content & copy principles

When editing copy or generating new content:

1. **Ikigai first.** Any new top-of-funnel copy should lead with the purpose/ikigai frame, not with "executive presence" or "coaching."
2. **Medium-agnostic.** Never assume the reader is a dancer. If a copy block is dance-specific, justify the mention or make it optional.
3. **No coaching jargon.** Avoid: unlock, transform, journey, empowered, authentic self, limiting beliefs, inner game.
4. **Specificity wins.** Prefer concrete numbers, named situations, sensory detail over abstract claims.
5. **Honest about tradeoffs.** When describing a program or course, name what it isn't as clearly as what it is.
6. **Kinetic typography moments.** One per page maximum. Must carry the page's argument, not decorate it. See `design-notes/jonchalant-positioning.md` for the approved phrase library.

---

## Strict Rules

**CSS:**
- **No `!important`** — fix specificity/cascade instead
- **No new CSS files** — 19 files exist (9 system + 10 page-scoped). Add styles to the relevant one
- **No inline styles** except truly dynamic values
- **No Tailwind in component JSX** — only `text-*`, `font-*`, `leading-*`, responsive breakpoint prefixes
- **BEM-inspired kebab-case naming**: `.section-name`, `.section-name-header`, `.section-name-title`
- **Light mode only** — no dark mode
- **Always use CSS variables for colors** — never hardcode hex in page-scoped CSS files
- **Standard breakpoints only**: 640px (sm), 768px (md), 1024px (lg) — no 480px, 560px, 960px

**Components:**
- **No "Section" suffix** on component names (`Hero` not `HeroSection`)
- **Server components by default** — only `'use client'` for interactive state
- **Import alias `@/` always** — never relative paths from deep files
- **All sections exported from `components/sections/index.ts`** with descriptive aliases

**Data:**
- **Sanity fallback pattern**: `try { fetch } catch { use fallback }`
- **No hardcoded page copy** — all marketing text from Sanity or lib data files
- **Audit quiz data** stays in `lib/auditData.ts` (not Sanity) — scoring coupled to question structure
- **Shared TypeScript types** live in `lib/types.ts` — import from there, don't re-declare inline

**Auth:**
- **Never import `lib/supabase.ts`** (deleted). Use SSR-safe helpers:
  - Server: `import { createClient } from "@/utils/supabase/server"`
  - Client: `import { createClient } from "@/utils/supabase/client"`
- **Auth-gate logic lives client-side** in the `useAuth` hook (`lib/auth-context.tsx`)

**Positioning & Copy:**
- **Positioning consistency**: All new copy must align with `design-notes/jonchalant-positioning.md`. If a section of the codebase has copy that contradicts the ikigai-front-door positioning, flag it rather than preserving it.
- **Ikigai + Four Circles integration**: The ikigai quiz (on `/ikigai`) and the Four Circles course are tightly coupled. Quiz results always save to the user's portal (if authed) and unlock personalized lesson recommendations. Never treat them as separate products in code or copy.

---

## Architecture

### Route Groups
```
app/
├── (marketing)/    ← Navbar + Footer layout (public pages)
│   ├── layout.tsx
│   ├── page.tsx (home), about/, blog/, contact/, foundation/,
│   │   programs/, dance/, lessons/, audit/, ikigai/, login/, mfa/, privacy/
│   └── opengraph-image.tsx
├── (portal)/       ← PortalShell + sidebar layout (auth-gated, noindexed)
│   ├── layout.tsx
│   └── portal/
│       ├── page.tsx (dashboard)
│       ├── four-circles/page.tsx (Four Circles course — free, gated behind account creation)
│       ├── four-circles/[lessonSlug]/page.tsx
│       ├── [courseSlug]/page.tsx
│       ├── [courseSlug]/[lessonSlug]/page.tsx
│       └── movement-plan/, presence-score/, tonality/
├── admin/          ← Admin dashboard (separate auth)
└── api/            ← 9 routes: admin, checkout, inquiries, movement-plan,
                       presence-coach, presence-score, subscribe, tonality-analysis, webhooks
```

### CSS Layer Order

Defined in `globals.css`:

```text
@layer reset → variables → base → components → utilities → interactive
```

### 9 System CSS Files

| File | Purpose |
|------|---------|
| `variables.css` | Design tokens: colors, spacing, fonts, gradients |
| `base.css` | HTML/body resets |
| `components.css` | Buttons, badges, FAQ, section-header utils |
| `typography.css` | Text hierarchy |
| `layout.css` | Grid systems, flexbox, sidebar |
| `cards.css` | All card types |
| `sections.css` | Hero, carousel, CTA sections |
| `utilities.css` | Spacing, responsive breakpoints |
| `interactions.css` | Hover states, transitions, animations |

### 10 Page-Scoped CSS Files
`pages-forms.css` | `pages-portal.css` | `pages-blog.css` | `pages-audit.css` | `pages-ikigai.css` | `pages-lessons.css` | `pages-dance.css` | `pages-portal-tools.css` | `pages-contact.css` | `pages-foundation.css`

### Key Colors
- `--accent-primary: #6b8e63` (Muted Moss — primary CTA)
- `--color-burnt-indigo: #4a3a5c` (depth/contemplation)
- `--bg-primary: #f8f8f5` (rice paper), `--text-primary: #1a1a1a`

---

## Component Organization

### Placement Rules
- **Page-specific sections** → `components/sections/{page}/` (e.g., `sections/home/hero/`)
- **Reusable sections** → `components/shared/{name}/` (e.g., `shared/cta/`, `shared/testimonials/`)
- **Utility components** (cards, badges, grids) → `components/utilities/{category}/`
- Each component gets its own folder with `ComponentName.tsx` + `index.ts`

### Page Wrapper Pattern
```tsx
<PageTransition animation="fade">
  <SectionWrapper variant="primary|secondary|tertiary">
    <SectionContent>
      {/* component */}
    </SectionContent>
  </SectionWrapper>
</PageTransition>
```

### Style Placement Guide
New card → `cards.css` | New section → `sections.css` | Page-specific → `pages-*.css` | Utility → `components.css` | Forms → `pages-forms.css`

---

## Design Notes (`design-notes/`)

A folder of design reference assets. Do not delete or move these — they are used for visual regression checks and design system reference during Phase 1 refactoring.

| File / Folder | Purpose |
|---|---|
| `design-system.html` | Live HTML render of the full design system (tokens, typography, components) |
| `design-system.png` | Static screenshot of the design system render |
| `baseline/desktop/` | Pre-Phase-1 desktop screenshots (1280px) for 9 marketing pages |
| `baseline/mobile/` | Pre-Phase-1 mobile screenshots (375px) for 9 marketing pages |
| `phase-1-change-list.md` | Planned Phase 1 UI changes |
| `tokens.css` | Design token reference (mirrors `variables.css`) |
| `fonts.css` | Font stack reference |
| `SKILL.md` | Design-system skill file for Copilot |
| `README.md` | Design notes overview |

Baseline screenshots cover: `home`, `about`, `blog`, `contact`, `dance`, `foundation`, `ikigai`, `lessons`, `programs` — at both 1280px and 375px.

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/sanity.ts` | Sanity client + all `get{ContentType}()` data fetching |
| `lib/types.ts` | Shared TypeScript interfaces |
| `lib/auditData.ts` | Audit quiz questions + scoring |
| `lib/auth-context.tsx` | React auth context (useAuth hook) |
| `lib/portal-progress.ts` | Portal lesson progress tracking |
| `lib/schema.ts` | JSON-LD structured data |
| `lib/hooks/` | 9 custom hooks (scroll, form, keyboard, focus, swipe) |
| `components/sections/index.ts` | Central export hub for all sections |
| `components/portal/PortalShell.tsx` | Portal sidebar + course tree layout |
| `components/portal/PresenceCoachWidget.tsx` | Floating AI coach (all portal pages) |
| `middleware.ts` | Supabase session refresh only |
| `lib/ikigai-results.ts` | Ikigai result calculation + Supabase helpers |

### Database (Supabase)

- `lesson_progress` — RLS-protected, tracks lesson completion per user
- `ikigai_results` — RLS-protected, stores quiz results (scores per quadrant, timestamp, pattern classification, retake history)
- Progress helpers in `lib/portal-progress.ts` — `markLessonComplete`, `getLessonProgress`, `getCourseProgress`
- Ikigai helpers in `lib/ikigai-results.ts` — `saveIkigaiResult`, `getLatestIkigaiResult`, `getIkigaiResultHistory`

---

## Sanity CMS

23 schema types in `sanity/schemas/`. Key ones: `blogPost`, `service`, `course`, `courseLesson`, `module`, `lesson`, `testimonial`, `caseStudy`, `homePageContent`, `aboutPage`, `contactPage`, `foundationPage`, `programsPageContent`, `ikigaiQuiz`.

All data fetching lives in `lib/sanity.ts` — functions follow pattern `get{ContentType}()`.

---

## Environment Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # optional, admin only
ANTHROPIC_API_KEY=           # AI portal tools + PresenceCoach
RESEND_API_KEY=              # Enrollment confirmation emails
STRIPE_SECRET_KEY=           # Stripe checkout
STRIPE_WEBHOOK_SECRET=       # Stripe webhook verification
KIT_API_KEY=                 # Kit/ConvertKit
KIT_FORM_ID=                 # /api/subscribe endpoint
```

---

## Fonts

- **Fraunces** (`var(--font-headline)`) — serif display/headings
- **DM Sans** (`var(--font-body)`) — body text
