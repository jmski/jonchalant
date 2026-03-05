# AI Coding Guidelines for jonchalon

## Architecture Overview

**Tech Stack**: Next.js 16.1.1 (App Router) + React 19 + TypeScript + CSS-First Styling (Tailwind v4 for utilities only)

This is a **Professional Executive Presence Coaching Platform** for Jon—transforming confidence and leadership presence in busy professionals and introverts. The site features coaching programs, blog content, case studies, testimonials, and a comprehensive media kit. **Design philosophy**: Clean, modern, minimalist with professional typography and strategic accent colors that appeal to corporate clients and coaching prospects.

**Core Architecture**:

- **Next.js App Router**: Server components by default (smaller bundle, faster initial load)
- **React 19 Compiler**: Automatic memoization without manual `useMemo`/`useCallback`
- **CSS-First Styling**: Dedicated CSS files per component, CSS variables for theming, BEM naming convention
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
├── shared/                      # Reusable components across pages
│   ├── badges/                 # Small UI components
│   │   └── Badge.tsx
│   ├── cards/                  # Card components (used in grids, carousels)
│   │   ├── TestimonialCard.tsx
│   │   ├── CaseStudyCard.tsx
│   │   └── [other card types]
│   └── index.ts
├── sections/                    # Full-width section components
│   ├── testimonial-section/     # Carousel section
│   │   ├── TestimonialSection.tsx ('use client' - needs state)
│   │   └── index.ts
│   ├── case-study-section/      # Grid section
│   │   ├── CaseStudySection.tsx (server - fetches from Sanity)
│   │   └── index.ts
│   ├── featured-blog-section/
│   │   ├── FeaturedBlogSection.tsx
│   │   └── index.ts
│   └── [other sections]
├── hero/                        # Hero components
├── layout/                      # Layout wrappers
├── navigation/                  # Navbar, navigation
├── typography/                  # Text/heading components
├── effects/                     # Animations, decorative effects
├── forms/                       # Form components
├── decorative/                  # SVG, decorative elements
└── animations/                  # Reusable animation hooks
```

### Shared Components Pattern

**Badge** (`components/shared/badges/Badge.tsx`):

- Reusable badge/label component
- Props: `size` (sm/md/lg), `variant` (accent/primary/secondary), `children`
- Styling: `.badge` classes from `badge.css`
- Usage: Tags, labels, section headers

**Cards** (`components/shared/cards/`):

- **TestimonialCard**: Displays quote, client name, role, company, optional result
- **CaseStudyCard**: Displays case study with image, challenge, solution, results
- Both are stateless, accept data as props
- Styled via dedicated CSS files (no inline styles, no Tailwind classes)

### Section Components Pattern

All sections follow this pattern:

```tsx
// ✅ CORRECT: Dedicated CSS file, CSS class names only
export function SectionName({ data }) {
  return (
    <section className="section-name">
      <div className="section-name-header">
        <h2 className="section-name-title">Title</h2>
      </div>
      <div className="section-name-content">
        {data.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
```

**Example: TestimonialSection** (`components/sections/testimonial-section/`):

- Type: `'use client'` (manages carousel state)
- Features: Auto-play (6s interval), dot indicators, keyboard navigation
- Data: Passed as prop from parent (home page)
- Styling: `testimonial-section.css` + uses `TestimonialCard`

**Example: CaseStudySection** (`components/sections/case-study-section/`):

- Type: Server component (async)
- Features: Fetches from Sanity, responsive grid (1→2 cols)
- Data: `getCaseStudies(featured: true)` called in component
- Styling: `case-study-section.css` + uses `CaseStudyCard`

### FUTURE: Components/Sections Refactoring Plan

**Current Structure Issue**: Component naming is redundant ("AboutServicesSection" in `/sections/` folder = saying "section" 3x). Sections scattered flat makes scaling difficult.

**Proposed Structure** (to implement when time allows):

```
components/sections/
├── shared/                     # Reusable across pages
│   ├── stats/index.ts + Stats.tsx
│   ├── cta/index.ts + CTA.tsx
│   ├── faq/index.ts + FAQ.tsx
│   ├── testimonials/index.ts + Testimonials.tsx
│   ├── case-study/index.ts + CaseStudy.tsx
│   ├── featured-blog/index.ts + FeaturedBlog.tsx
│   └── services/index.ts + Services.tsx
├── home/                       # Home page sections only
│   ├── hero/index.ts + Hero.tsx
│   ├── featured-areas/index.ts + FeaturedAreas.tsx
│   └── blog-cards/index.ts + BlogCards.tsx
└── about/                      # About page sections only
    ├── hero/index.ts + Hero.tsx
    ├── origin/index.ts + Origin.tsx
    ├── services/index.ts + Services.tsx
    ├── philosophy/index.ts + Philosophy.tsx
    └── introvert/index.ts + Introvert.tsx
```

**Benefits**:
- ✅ No naming redundancy (`about/hero/Hero.tsx` instead of `AboutHeroSection`)
- ✅ Clear page association (all about sections grouped)
- ✅ Easier imports: `import { Hero } from '@/sections/about/hero'`
- ✅ Scalable (new pages easy to add)
- ✅ Separates shared vs. page-specific

**Refactoring Steps**:
1. Create new folder structure (`shared/`, `home/`, `about/` subdirectories)
2. Move component files to new locations, rename (drop `Section` suffix)
3. Create `index.ts` in each folder with export
4. Update main `sections/index.ts` to export from new locations
5. Update all page imports (home, about, lessons, etc.)
6. Build and verify no errors

## Styling System

**CSS-First Architecture**: All component styling uses dedicated CSS files with BEM-inspired class names. No inline styles (except truly dynamic values). No Tailwind utility classes in component JSX.

### CSS File Organization

Each component gets its own `.css` file in `app/css/`, imported on the global level:

```
app/css/
├── badge.css
├── testimonial-card.css
├── case-study-card.css
├── testimonial-section.css
├── case-study-section.css
├── [other component CSS files]
└── ~~card.css, btn-primary.css~~ [legacy - replaced by component CSS]
```

Import in `app/globals.css`:

```css
@import url("./css/badge.css");
@import url("./css/testimonial-card.css");
@import url("./css/case-study-card.css");
@import url("./css/testimonial-section.css");
@import url("./css/case-study-section.css");
```

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

### Color System (CSS Variables)

All colors defined in `:root` in `app/globals.css`:

```css
:root {
  /* Primary Colors */
  --text-primary: #0f172a; /* Headings, primary text */
  --text-secondary: #334155; /* Secondary text, muted */
  --text-tertiary: #64748b; /* Tertiary, very muted */
  --accent-primary: #2563eb; /* Main accent color (blue) */
  --accent-secondary: #f97316; /* Secondary accent (orange) */

  /* Backgrounds */
  --bg-light: #ffffff;
  --bg-muted: #f8fafc;

  /* Borders & Shadows */
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --bg-light: #1e293b;
    --bg-muted: #0f172a;
    --border-color: #334155;
  }
}
```

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

### Modern Minimalist Color Palette

**Chosen Colors** (Option A - Vibrant Professional):

- **`--accent-primary: #2563eb`** (deep blue - trust, professionalism)
- **`--accent-secondary: #f97316`** (warm orange - energy, creativity)

**Alternative Options** (if brand pivot):

1. **Option B - Minimal Elegant**: Purple + Cyan
2. **Option C - Bold Modern**: Red + Teal

**Design Principles**:

- Clean typography (system sans-serif only)
- Professional cards with simple borders and subtle shadows
- Minimal glass/transparency effects (reserved for dark mode)
- Full-bleed images with subtle overlays
- CTA buttons with accent colors, slight hover scale/shadow

## Page Structure & Responsive Design

All pages follow this clean, minimalist template:

```tsx
import Navbar from "@/components/Navbar";

export default function PageName() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Page Title
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
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
**Common patterns**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `text-3xl sm:text-4xl lg:text-5xl`, `p-6 sm:p-8 lg:p-10`
**Key principle**: Generous whitespace, clean typography, minimal visual noise

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

**New Standard** (as of Phase 4): All component styling uses dedicated `.css` files with BEM-inspired naming. No inline styles (except dynamic values). No Tailwind utility classes in JSX for styled components.

**Pattern**:

Component JSX (`TestimonialCard.tsx`):

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

Dedicated CSS (`app/css/testimonial-card.css`):

```css
.testimonial-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-light);
}

.testimonial-card-quote {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-style: italic;
}
/* ... more styles ... */
```

**Advantages**:

- Cleaner JSX (no className bloat)
- Centralized styling (easier to maintain)
- Consistent pattern across project
- Easy to adjust responsive behavior
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

For page headers and standard text, use **minimal Tailwind utilities** (size/weight/color). Then style via CSS classes:

```tsx
<h2 className="text-4xl sm:text-5xl font-bold mb-6">Title</h2>
<p className="text-lg text-secondary mb-4">Description</p>
<span className="badge badge--accent">Tag</span>
```

**Keep it simple**: Text utilities only, never `.p-6 .flex .gap-4` etc. Use a CSS class instead if you need complex styling.

## Configuration Files

- **`next.config.ts`**: Enables `reactCompiler: true` and turbopack
- **`tsconfig.json`**: ES2017 target, bundler resolution, `paths: {"@/*": ["./"]}`
- **`eslint.config.mjs`**: Flat config extending Next.js + TypeScript rules
- **`postcss.config.mjs`**: Tailwind CSS v4 plugin
- **`app/globals.css`**: Tailwind import, defines CSS variables (colors, fonts, shadows), custom classes (`.card`, `.btn-primary`, `.badge`, `.video-container`), minimal animations

## Development Tips

- **New page**: Create `app/newpage/page.tsx`, import Navbar, follow page structure template
- **New component (shared card)**:
  1. Create `components/shared/cards/ComponentName.tsx` with props interface
  2. Create `app/css/component-name.css` with BEM naming
  3. Export from `components/shared/cards/index.ts`
  4. Import CSS in `app/globals.css`
- **New section**:
  1. Create `components/sections/section-name/` directory
  2. Create `SectionName.tsx` (server component, async data fetch if needed)
  3. Create `index.ts` with export
  4. Create `app/css/section-name.css`
  5. Import CSS in `app/globals.css`
  6. Update `components/sections/index.ts` to export new section
- **Fetch from Sanity**: Use async server components with `getCaseStudies()`, `getTestimonials()`, etc. from `@/lib/sanity`
- **Styling**: Create dedicated `.css` file for component, use CSS variable references, follow BEM naming
- **Responsive design**: Build mobile-first with `@media (min-width: 640px)` for tablet/desktop adjustments
- **Test build**: `npm run build` validates TypeScript and CSS compilation (required before committing)
- **Debug CSS**: Inspect `.css` files in `app/css/` using browser DevTools
- **Legacy components**: Check `components/sections/index.ts` for DEPRECATED notices before using old components</content>
  <parameter name="filePath">/Users/gyalua/Documents/GitHub/jonchalant/.github/copilot-instructions.md
