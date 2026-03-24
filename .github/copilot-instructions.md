# AI Coding Guidelines for jonchalant

## Architecture Overview

**Tech Stack**: Next.js 16.1.1 (App Router) + React 19 + TypeScript + CSS-First Styling (Tailwind v4 for utilities only)

This is a **Professional Executive Presence Coaching Platform** for Jon—transforming confidence and leadership presence in busy professionals and introverts. The site features coaching programs, blog content, case studies, testimonials, and a comprehensive media kit. **Design philosophy**: Japanese Zen-inspired aesthetic with editorial typography, generous whitespace, and a muted palette (burnt indigo & muted moss accents) that appeals to corporate clients and coaching prospects.

**Core Architecture**:

- **Component-First Design**: Build reusable components first, compose into pages second. All child components should be props-driven and not depend on context or external state.
- **Next.js App Router**: Server components by default (smaller bundle, faster initial load)
- **React 19 Compiler**: Automatic memoization without manual `useMemo`/`useCallback`
- **CSS-First Styling**: 10 consolidated CSS files organized by architectural purpose, CSS variables for theming, BEM naming convention
- **Sanity CMS Integration**: Server components fetch content (case studies, testimonials, blog posts, services)
- **Minimal Client State**: Interactive components (`'use client'`) only for carousel logic, forms, modals
- **TypeScript Strict Mode**: Enforced at build time; failing types block production

**Build System**:

```bash
npm run dev      # Starts http://localhost:3000 with hot reload
npm run build    # Optimized production build (11-12 seconds with Turbopack)
npm run start    # Runs production build locally
npm run lint     # ESLint validation (Next.js + TypeScript strict rules)
```

**Key Config**:

- **Turbopack** enabled for 2x faster builds
- **React Compiler** automatically optimizes component rendering
- **TypeScript** strict mode enforced
- **ESLint** flat config extending Next.js best practices

## Component Architecture

**Directory Structure** (`components/` folder):

```
components/
├── sections/                    # Page-specific sections
│   ├── home/                    # Home page sections
│   │   ├── hero/              # Hero.tsx
│   │   ├── featured-areas/     # FeaturedAreas.tsx
│   │   └── blog-cards/         # BlogCards.tsx
│   ├── about/                   # About page sections
│   │   ├── hero/                    # Hero.tsx
│   │   ├── origin/                  # Origin.tsx
│   │   ├── turning-point/           # TurningPoint.tsx
│   │   ├── methodology-narrative/   # MethodologyNarrative.tsx
│   │   ├── why-exists/              # WhyExists.tsx
│   │   ├── who-for/                 # WhoFor.tsx
│   │   ├── services/                # Services.tsx (not rendered on About page)
│   │   ├── philosophy/              # Philosophy.tsx (not rendered on About page)
│   │   └── introvert/               # Introvert.tsx (not rendered on About page)
│   ├── blog/                    # Blog page sections (Featured, Posts, Related)
│   ├── dance/                   # Dance page sections
│   │   └── featured-video/    # FeaturedVideo.tsx
│   ├── lesson-section/          # Lesson category section
│   └── index.ts                 # Central export hub
├── shared/                      # Reusable section components (used across pages)
│   ├── cta/                    # CTA.tsx
│   ├── faq/                    # FAQ.tsx
│   ├── hero/                   # Hero.tsx (generic)
│   ├── instagram-embed/        # InstagramEmbed.tsx ('use client')
│   ├── page-hero/              # PageHero.tsx
│   ├── featured-blog/          # FeaturedBlog.tsx
│   ├── carousel/               # Carousel.tsx
│   ├── case-studies/           # CaseStudies.tsx
│   ├── case-study/             # CaseStudy.tsx
│   ├── collaboration/          # Collaboration.tsx
│   ├── copy-button/            # CopyButton.tsx ('use client')
│   ├── programs/               # Programs.tsx
│   ├── services/               # Services.tsx
│   ├── stats/                  # Stats.tsx
│   ├── testimonials/           # Testimonials.tsx
│   ├── three-pillars/          # ThreePillars.tsx
│   └── video-embed/            # VideoEmbed.tsx ('use client')
├── utilities/                   # Reusable utility components
│   ├── badges/                 # Badge.tsx
│   ├── cards/                  # TestimonialCard.tsx, CaseStudyCard.tsx, BlogCard.tsx, LessonCard.tsx, ServiceCard.tsx
│   └── grids/                  # StatsGrid.tsx, CardGrid.tsx
├── layout/                      # Layout wrappers
├── navigation/                  # Navbar, navigation
├── typography/                  # Text/heading components
├── forms/                       # Form components
├── decorative/                  # SVG, decorative elements (FluidShape only)
└── animations/                  # Reusable animation hooks
```

### Utility Components Pattern

**Badge** (`components/utilities/badges/Badge.tsx`):

- Reusable badge/label component
- Props: `size` (sm/md/lg), `variant` (accent/primary/secondary), `children`
- Styling: `.badge` classes from `badge.css`
- Usage: Tags, labels, section headers

**Cards** (`components/utilities/cards/`):

- **TestimonialCard**: Displays quote, client name, role, company, optional result
- **CaseStudyCard**: Displays case study with image, challenge, solution, results
- **BlogCard**: Blog post preview card
- **LessonCard**: Lesson/dance category card
- **ServiceCard**: Service/offering card
- All are stateless, accept data as props
- Styled via dedicated CSS files (no inline styles, no Tailwind classes)

**Grids** (`components/utilities/grids/`):

- **StatsGrid**: Display statistics/metrics in a responsive grid
- **CardGrid**: Generic grid layout for card components

### Page/Feature-Scoped Section Components Pattern

**Location**: `components/sections/{page-or-feature}/`

Sections that belong to a specific page or feature:

```tsx
// ✅ CORRECT: Named exports in feature folder
// Location: components/sections/blog/Featured.tsx
export function Featured({ posts }) {
  return (
    <section className="blog-featured-section">
      <h2 className="blog-featured-section-title">Featured</h2>
      {/* content */}
    </section>
  );
}

// ✅ CORRECT: Multiple exports from same folder
export function Posts({ posts }) { ... }
export function Related({ posts }) { ... }

// ✅ CORRECT: Exported from sections/index.ts with aliases
// export { Featured as BlogFeatured, Posts as BlogPosts, Related as BlogRelated }

// ❌ WRONG: Don't use "Section" suffix
// export function BlogFeaturedSection() { }
```

### Shared Section Components Pattern

**Location**: `components/shared/{component-name}/`

Sections that are reused across multiple different pages/features:

```tsx
// ✅ CORRECT: Single export or default export
// Location: components/shared/testimonials/Testimonials.tsx
export function Testimonials({ data }) {
  return <section className="testimonials-section">{/* content */}</section>;
}

// ✅ CORRECT: Can use default export
// export default Testimonials
```

**Export convention**: Shared components use _named exports_. The `index.ts` file may re-export as default for convenience:

```tsx
// components/shared/carousel/index.ts
export { Carousel } from "./Carousel"; // Named export

// components/shared/cta/index.ts
export { default as CTA } from "./CTA"; // Default export in component file
```

**Example: Carousel** (`components/shared/carousel/`):

- Type: `'use client'` (manages carousel state)
- Features: Auto-play (6s interval), dot indicators, keyboard navigation
- Data: Passed as prop from parent (home page)
- Used by: `Testimonials` section

**Example: CaseStudies** (`components/shared/case-studies/`):

- Type: Server component (can fetch from Sanity if needed)
- Features: Responsive grid (1→2 cols), uses `CaseStudyCard`
- Data: Passed as prop from parent
- Styling: Dedicated CSS file

### Page-Specific Section Components

**About page sections** (`components/sections/about/`):

Rendered on the About page (in order): `Hero`, `Origin`, `TurningPoint`, `MethodologyNarrative`, `WhyExists`, `WhoFor`

Not currently rendered but kept as files — do not delete, may be repurposed: `Philosophy`, `Services` (AboutServices), `Introvert`

- No "Section" suffix on any component name
- Each in its own folder with `index.ts`
- All exported from `sections/index.ts` (rendered and dormant alike)

**Home page sections** (`components/sections/home/`):

- No "Section" suffix (e.g., `Hero`, `FeaturedAreas`, `BlogCards`)
- Similar structure to about sections

### Architecture Highlights

**Separation of Concerns** (Critical):

- ✅ **Page-specific sections** in `components/sections/{page}/` (e.g., `components/sections/about/`, `components/sections/dance/`)
- ✅ **Feature-scoped sections** in `components/sections/{feature}/` (e.g., `components/sections/blog/` for blog pages)
- ✅ **Truly reusable sections** in `components/shared/` (e.g., `components/shared/testimonials/`, `components/shared/cta/`)
- ✅ **Utility components** (cards, badges, grids) in `components/utilities/`
- ✅ **No naming redundancy** - Use `Featured`, `Posts`, `Related` instead of `FeaturedSection`, `PostsSection`

**How to Determine Placement**:

1. **Is this specific to one "page" or "feature"?** → Place in `components/sections/{page-or-feature}/`
   - Example: Blog-specific sections → `components/sections/blog/`
   - Example: Home page sections → `components/sections/home/`
2. **Is this reusable across multiple different features?** → Place in `components/shared/{name}/`
   - Example: Testimonials used on multiple pages → `components/shared/testimonials/`
3. **Is this a small reusable card/badge/utility?** → Place in `components/utilities/{category}/{name}/`

**Export Strategy**:

- All sections are exported from `sections/index.ts` with descriptive aliases
  - Page-specific: `export { Hero as AboutHero }`
  - Feature-scoped: `export { Featured as BlogFeatured }`
  - Shared: `export { Testimonials }`
- This maintains consistency and makes imports predictable

**Folder Organization Benefits**:

- ✅ Clear separation: `sections/` for page/feature-specific, `shared/` for truly reusable
- ✅ Easy to identify scope: is it used only for blog pages? → sections/blog
- ✅ No ambiguous nesting: no `sections/shared/` confusion
- ✅ Scalable: new pages/features go in `sections/{name}` automatically

## Styling System

**CSS-First Architecture**: All component styling uses dedicated CSS files with BEM-inspired class names. No inline styles (except truly dynamic values). No Tailwind utility classes in component JSX.

### CSS File Organization

CSS is organized into **10 consolidated files** by **architectural purpose**, not individual components:

```
app/css/
├── variables.css         # Design tokens (colors, spacing, fonts, transitions)
├── base.css              # HTML resets and default element styling
├── components.css        # Reusable UI patterns (buttons, badges, patterns)
├── typography.css        # Text hierarchy system (headings, body, sizes)
├── interactions.css      # Hover states, transitions, animations
├── layout.css            # Grid systems, flexbox, responsive layouts
├── cards.css             # All card types (testimonial, case-study, blog, lesson, service, etc.)
├── sections.css          # Full-width section components (hero, carousel, CTA, etc.)
├── pages.css             # Form and page-specific styles (contact, blog, dance, etc.)
└── utilities.css         # Spacing, color utilities, responsive breakpoints, patterns
```

Import structure in `app/globals.css`:

```css
@layer components {
  @import url("./css/components.css");
  @import url("./css/typography.css");
  @import url("./css/layout.css");
  @import url("./css/cards.css");
  @import url("./css/sections.css");
  @import url("./css/pages.css");
}
@layer utilities {
  @import url("./css/utilities.css");
}
@layer base {
  @import url("./css/variables.css");
  @import url("./css/base.css");
}
@layer interactive {
  @import url("./css/interactions.css");
}
```

**Architectural Layers** (cascade order):

1. `variables.css` — Design foundation
2. `base.css` — HTML resets
3. `components.css`, `typography.css` — Core patterns
4. `layout.css`, `cards.css`, `sections.css`, `pages.css` — Structural layers
5. `utilities.css` — Responsive helpers
6. `interactions.css` — Hover/animation overrides

### CSS Naming Convention (BEM-Inspired)

Use kebab-case class names matching component names:

```css
/* Component name: TestimonialCard */
.testimonial-card {
} /* Base element */
.testimonial-card-quote {
} /* Child element */
.testimonial-card-footer {
} /* Another child */
.testimonial-card:hover .testimonial-card-cta {
} /* Hover state */

/* Component name: Badge */
.badge {
} /* Base */
.badge--sm {
} /* Variant/modifier */
.badge--accent {
} /* Color variant */

/* Component name: TestimonialSection */
.testimonial-section {
} /* Base section */
.testimonial-section-header {
} /* Header area */
.testimonial-carousel {
} /* Carousel track */
.testimonial-carousel-dot {
} /* Indicator dots */
.testimonial-carousel-dot.active {
} /* Active state */
```

### Color System (CSS Variables) — Zen Design System

**The Kinetic Leader** uses a Japanese Zen-inspired, light-mode-only color system. All colors defined in `:root` in `app/css/variables.css`:

```css
:root {
  /* Background - Rice Paper/Bone */
  --bg-primary: #f8f8f5; /* Rice paper/bone background */
  --bg-secondary: #fafaf8; /* Slightly warmer */
  --bg-tertiary: #f0ede8; /* Warm sand accent */

  /* Text - Sumie Ink (deep, commanding) */
  --text-primary: #1a1a1a; /* Headings, primary text */
  --text-secondary: #3d3d3d; /* Secondary text */
  --text-tertiary: #7a7a7a; /* Very muted text */

  /* Borders - Hairline aesthetic */
  --border-color: #d4cfc7; /* Subtle, warm */
  --border-subtle: #e8e3db; /* Very faint */

  /* Kinetic Accents - Zen Palette (light mode only) */
  --color-burnt-indigo: #4a3a5c; /* Deep, contemplative */
  --color-burnt-indigo-light: #6b5a7a; /* Hover variant */
  --color-muted-moss: #6b8e63; /* Natural, growth (PRIMARY GREEN) */
  --color-moss-light: #8aa87a; /* Softened variant */

  /* Status Colors */
  --color-success: #5a8a6a; /* Moss-inspired */
  --color-warning: #b89a5f; /* Warm amber */
  --color-error: #8a5a5a; /* Muted burgundy */
  --color-info: #6a8aaa; /* Soft indigo */

  /* Accent Interactive */
  --accent-primary: #6b8e63; /* Muted Moss (PRIMARY ACCENT) */
  --accent-hover: #8aa87a; /* Moss light - hover state */
  --accent-tertiary: #6a8aaa; /* Soft indigo - category color */
  --btn-primary-text: #ffffff; /* Button text on accent */
}

/* NOTE: Light mode only - no dark mode support */
```

**Design Principles** (Zen Philosophy):

- **Ikigai**: Purpose-driven, intentional design
- **Kaizen**: Continuous refinement through subtlety
- **Ma**: Generous whitespace, breathing room
- **Wabi-Sabi**: Beauty in imperfection and simplicity

### Example: CSS File Pattern

**testimonial-card.css**:

```css
.testimonial-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-light);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-md);
}

.testimonial-card-quote {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  flex-grow: 1;
  font-style: italic;
}

.testimonial-card-result {
  background: var(--bg-muted);
  padding: 1rem;
  border-left: 3px solid var(--accent-primary);
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

.testimonial-card-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.testimonial-card-client-name {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

@media (min-width: 640px) {
  .testimonial-card {
    padding: 1.75rem;
  }
}
```

### Brand Identity Details

**Primary Accent Elements**:

- **Muted Moss** (`#6b8e63`) - Growth, natural leadership, grounded presence
- **Burnt Indigo** (`#4a3a5c`) - Depth, contemplation, sophistication
- **Soft Indigo** (`#6a8aaa`) - Secondary category, alternative accent

**Visual Language**:

- Clean editorial typography (serif headlines, sans-serif body)
- Professional cards with minimal borders and subtle shadows
- Full-bleed images with soft overlays
- Generous whitespace throughout (Ma principle)
- Decorative elements: fluid shapes (FluidShape only — Enso circles and blueprint grid components were removed)
- CTA buttons with muted moss accent, subtle hover scale transitions

## Page Structure & Responsive Design

All pages follow this clean, editorial template:

```tsx
import Navbar from "@/components/Navbar";

export default function PageName() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="mb-16">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Page Title
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Compelling subtitle or description
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">...</div>
        </div>
      </main>
    </div>
  );
}
```

**Mobile-first breakpoints**: `sm:` (≥640px), `md:` (≥768px), `lg:` (≥1024px)
**Spacing system**: Uses CSS variables (`--spacing-sm`, `--spacing-md`, `--spacing-lg`, etc.) for consistent rhythm
**Key principle**: Generous whitespace (Ma), editorial typography (Kaizen), minimal visual noise, light mode only

## Code Patterns & Conventions

### Imports

Always use `@/*` alias (maps to project root via `tsconfig.json`):

```tsx
import Navbar from "@/components/Navbar"; // ✅
import Navbar from "../components/Navbar"; // ❌
```

### Client vs Server Components

Use `'use client'` **only** for interactive elements: video players, image galleries, forms. Most components are server components (faster, smaller bundle). Example (Gallery.tsx):

```tsx
"use client";
import { useState } from "react";

export default function Gallery({ images, category }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          onClick={() => setSelectedIndex(idx)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
```

### Styling Approach: CSS-First

**Current Standard**: All component styling uses consolidated CSS files (10 files total) with BEM-inspired naming. No inline styles except truly dynamic values. Minimal Tailwind utilities—only for text sizing/weight and responsive breakpoints.

**Never use `!important`** — if you need to override a style, the issue is CSS specificity or cascade layers. Revisit the CSS layer structure. `!important` breaks cascade predictability and makes debugging exponentially harder.

**Pattern**:

Component JSX (`TestimonialCard.tsx`) — Props-driven, no external dependencies:

```tsx
export function TestimonialCard({ quote, clientName, role, company, result }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-card-quote">{quote}</p>
      {result && (
        <div className="testimonial-card-result">
          <p className="testimonial-card-result-text">Key Result: {result}</p>
        </div>
      )}
      <div className="testimonial-card-footer">
        <p className="testimonial-card-client-name">{clientName}</p>
        <p className="testimonial-card-role">{role}</p>
        <p className="testimonial-card-company">{company}</p>
      </div>
    </div>
  );
}
```

CSS in consolidated file (`app/css/cards.css`):

```css
.testimonial-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-primary);
  transition: all var(--transition-base);
}

.testimonial-card:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 12px rgba(107, 142, 99, 0.08);
}

.testimonial-card-quote {
  font-size: 1rem;
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  font-style: italic;
}
```

**Advantages**:

- Cleaner JSX (no className bloat)
- Centralized styling (easier to maintain)
- Predictable cascade using @layer structure
- Components are fully reusable and portable
- Easy to adjust responsive behavior globally
- Better performance (smaller JS bundles)

### Client vs Server Components

Use `'use client'` **only** for interactive state management: carousels, form handling, modals, toggles. **Most components are server components** (fetching data, rendering static content).

**Example Server Component** (CaseStudySection):

```tsx
// No 'use client' - fetches from Sanity
export async function CaseStudySection() {
  const caseStudies = await getCaseStudies(true);

  return (
    <section className="case-study-section">
      <div className="case-study-section-grid">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study._id} {...study} />
        ))}
      </div>
    </section>
  );
}
```

**Example Client Component** (TestimonialSection):

```tsx
"use client";
import { useState, useEffect } from "react";

export function TestimonialSection({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="testimonial-section">
      <div className="testimonial-carousel">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className={idx === currentIndex ? "active" : ""}>
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Typography & Text Classes

For page headers and standard text, use **minimal Tailwind utilities** (size/weight only) + **CSS variables for colors**:

```tsx
<h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Title</h2>
<p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>Description</p>
<span className="badge badge--accent">Tag</span>
```

**Keep it simple**:

- ✅ Tailwind: `text-lg`, `font-bold`, `sm:text-xl`, `leading-relaxed`
- ✅ CSS variables: `color: var(--text-primary)`, `background: var(--bg-secondary)`, `border-color: var(--border-color)`
- ❌ Never: `.p-6 .flex .gap-4 inlined` — use a CSS class instead
- ❌ Never: `!important` — fix specificity and cascade layers instead

Complex styling? Use a CSS class in the appropriate consolidated file (cards.css, sections.css, pages.css, etc.).

## Configuration Files

- **`next.config.ts`**: Enables `reactCompiler: true` and turbopack
- **`tsconfig.json`**: ES2017 target, bundler resolution, `paths: {"@/*": ["./"]}`
- **`eslint.config.mjs`**: Flat config extending Next.js + TypeScript rules
- **`postcss.config.mjs`**: Tailwind CSS v4 plugin
- **`app/globals.css`**: Tailwind import, defines CSS variables, imports 10 consolidated CSS files organized by @layer (base, components, utilities, interactive)

## Development Tips

- **New page**: Create `app/newpage/page.tsx`, import Navbar, follow page structure template
- **New utility component** (small reusable element like Badge):
  1. Create `components/utilities/{category}/ComponentName.tsx` with props interface
  2. Add styles to `app/css/components.css` using BEM naming (`.badge`, `.badge--sm`, etc.)
  3. Export from `components/utilities/{category}/index.ts`
  4. ✅ No new CSS file needed — styles go in components.css
- **New shared section** (reusable across pages):
  1. Create `components/shared/section-name/SectionName.tsx`
  2. Create `index.ts` with named export
  3. Add styles to `app/css/sections.css` using BEM naming (`.section-name`, `.section-name-header`, etc.)
  4. Re-export from `components/sections/index.ts`
  5. ✅ No new CSS file needed — styles go in sections.css
- **New page-specific section**:
  1. Create `components/sections/{page}/section-name/SectionName.tsx`
  2. Create `index.ts` with export (no "Section" suffix in component name)
  3. Add styles to `app/css/sections.css` using BEM naming
  4. Import directly in page file
  5. ✅ No new CSS file needed — styles go in sections.css
- **New card component**:
  1. Create `components/utilities/cards/YourCard.tsx`
  2. Add styles to `app/css/cards.css` using BEM naming (`.your-card`, `.your-card-title`, etc.)
  3. Export from `components/utilities/cards/index.ts`
  4. ✅ No new CSS file needed — styles go in cards.css
- **New form or page-specific styles**:
  1. Add styles to `app/css/pages.css` using descriptive naming (`.contact-form`, `.blog-header`, etc.)
  2. ✅ No new CSS file needed — styles go in pages.css
- **Fetch from Sanity**: Use async server components with `getCaseStudies()`, `getTestimonials()`, etc. from `@/lib/sanity`
- **Styling workflow**:
  1. Identify which file your component belongs to (cards.css, sections.css, components.css, pages.css, etc.)
  2. Add your BEM-named classes to that file
  3. Use CSS variable references (`--accent-primary`, `--border-color`, etc.)
  4. Test responsive behavior with media queries in utilities.css breakpoints
- **Responsive design**: Build mobile-first with `@media (min-width: 640px)`, `@media (min-width: 768px)`, `@media (min-width: 1024px)` (consolidated in utilities.css)
- **Test build**: `npm run build` validates TypeScript and CSS compilation (required before committing)
- **Debug CSS**: Inspect classes in `.css` files in `app/css/` using browser DevTools
- **Imports**: Use `@/components/sections`, `@/components/shared`, `@/components/utilities` with consistent paths
- **Do NOT create new .css files** — use the consolidated structure (10 files only)
- **Auth (Supabase SSR)**: Server components use `utils/supabase/server.ts`; client components (`'use client'`) use `utils/supabase/client.ts`. Never import `lib/supabase.ts` (deleted). All auth-gate logic lives client-side in the `useAuth` hook (`lib/auth-context.tsx`).
- **Shared TypeScript types**: All Sanity + portal interfaces live in `lib/types.ts`. Import from there; do not re-declare inline.
- **CSS architecture note**: `pages.css` has a table of contents at the top (24 entries). The portal login section intentionally uses non-brand colors — this is not a bug.</content>
  <parameter name="filePath">/Users/gyalua/Documents/GitHub/jonchalant/.github/copilot-instructions.md
