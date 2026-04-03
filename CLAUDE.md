# CLAUDE.md — Jonchalant Codebase Rules

Rules and conventions for the jonchalant.com codebase. For detailed reference (component trees, page breakdowns, Sanity schemas, data fetching functions), see `.github/copilot-instructions.md`.

---

## Stack & Build

Next.js 16.1.1 (App Router) | React 19 | TypeScript 5 | Tailwind v4 (utility-only) | Sanity CMS | Supabase Auth | Resend

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

Executive Presence Coaching Platform for Jon. Coaching programs, blog, lessons, dance portfolio, media kit. Target: introverts & corporate clients. Design: Japanese Zen-inspired (burnt indigo + muted moss palette, editorial typography, generous whitespace). Light mode only.

---

## Strict Rules

### CSS Rules
1. **No `!important`** — fix specificity/cascade instead
2. **No new CSS files** — 19 files exist (9 system + 10 page-scoped). Add styles to the relevant one
3. **No inline styles** except truly dynamic values
4. **No Tailwind in component JSX** — only `text-*`, `font-*`, `leading-*`, responsive breakpoint prefixes allowed
5. **BEM-inspired kebab-case naming**: `.section-name`, `.section-name-header`, `.section-name-title`
6. **Light mode only** — no dark mode

### Component Rules
7. **No "Section" suffix** on component names (`Hero` not `HeroSection`)
8. **Server components by default** — only `'use client'` for interactive state (carousels, forms, toggles)
9. **Import alias `@/` always** — never relative paths from deep files
10. **All sections exported from `components/sections/index.ts`** with descriptive aliases

### Data Rules
11. **Sanity fallback pattern**: `try { fetch } catch { use fallback }`
12. **No hardcoded page copy** — all marketing text from Sanity or lib data files. Fallback strings (`?? 'fallback'`) acceptable
13. **Audit quiz data** stays in `lib/auditData.ts` (not Sanity) — scoring thresholds are coupled to question structure
14. **Shared TypeScript types** live in `lib/types.ts` — import from there, don't re-declare inline

### Auth Rules
15. **Never import `lib/supabase.ts`** (deleted). Use SSR-safe helpers:
    - Server: `import { createClient } from "@/utils/supabase/server"`
    - Client: `import { createClient } from "@/utils/supabase/client"`
16. **Auth-gate logic lives client-side** in the `useAuth` hook (`lib/auth-context.tsx`) — not in middleware

---

## CSS Architecture

### Layer order (globals.css):
```
@layer reset → variables → base → components → utilities → interactive
```

### 9 system files (app/css/):
| File | Purpose |
|------|---------|
| `variables.css` | Design tokens: colors, spacing, fonts |
| `base.css` | HTML/body resets |
| `components.css` | Buttons, badges, FAQ, section-header utils |
| `typography.css` | Text hierarchy |
| `layout.css` | Grid systems, flexbox |
| `cards.css` | All card types |
| `sections.css` | Hero, carousel, CTA sections |
| `utilities.css` | Spacing, responsive breakpoints |
| `interactions.css` | Hover states, transitions, animations |

### 10 page-scoped files:
`pages-forms.css` | `pages-portal.css` | `pages-blog.css` | `pages-audit.css` | `pages-ikigai.css` | `pages-lessons.css` | `pages-dance.css` | `pages-portal-tools.css` | `pages-contact.css` | `pages-foundation.css`

### Key colors:
- `--accent-primary: #6b8e63` (Muted Moss — primary CTA)
- `--color-burnt-indigo: #4a3a5c` (depth/contemplation)
- `--bg-primary: #f8f8f5` (rice paper), `--text-primary: #1a1a1a`

---

## Component Organization

### Placement rules:
- **Page-specific sections** → `components/sections/{page}/` (e.g., `sections/home/hero/`)
- **Reusable sections** → `components/shared/{name}/` (e.g., `shared/cta/`, `shared/testimonials/`)
- **Utility components** (cards, badges, grids) → `components/utilities/{category}/`
- Each component gets its own folder with `ComponentName.tsx` + `index.ts`

### Page wrapper pattern (all pages):
```tsx
<PageTransition animation="fade">
  <SectionWrapper variant="primary|secondary|tertiary">
    <SectionContent>
      {/* component */}
    </SectionContent>
  </SectionWrapper>
</PageTransition>
```

### Where to add new styles:
- New card → `cards.css`
- New section → `sections.css`
- New page-specific style → relevant `pages-*.css` file
- New utility component → `components.css`
- Form styles → `pages-forms.css`

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/sanity.ts` | Sanity client + all data fetching functions |
| `lib/types.ts` | 21 shared TypeScript interfaces |
| `lib/auditData.ts` | Audit quiz questions + scoring |
| `lib/auth-context.tsx` | React auth context (useAuth hook) |
| `lib/portal-progress.ts` | Portal lesson progress tracking |
| `lib/schema.ts` | JSON-LD structured data |
| `components/sections/index.ts` | Central export hub for all sections |
| `middleware.ts` | Supabase session refresh only |

---

## Routes (Quick Reference)

`/` Home | `/about` | `/blog` + `/blog/[slug]` | `/programs` | `/dance` | `/lessons` + nested | `/media-kit` | `/contact` | `/audit` | `/ikigai` | `/login` | `/portal` (protected) | `/admin` | `/privacy` | `/api/inquiries` | `/api/subscribe`

---

## Sanity CMS

21 schema types in `sanity/schemas/`. Key ones: `blogPost`, `service`, `program`, `testimonial`, `portfolio`, `lesson`, `caseStudy`, `homePageContent`, `aboutPage`, `contactPage`, `auditPage`, `portalLesson`.

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
KIT_API_KEY=                 # Kit/ConvertKit
KIT_FORM_ID=                 # /api/subscribe endpoint
```

---

## Fonts

- **Fraunces** — serif display/headings
- **DM Sans** — body text
