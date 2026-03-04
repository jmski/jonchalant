# AI Coding Guidelines for jonchalon

## Architecture Overview

**Tech Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4

This is a **Professional Brand Hub & Digital Media Kit** for Jon—a multi-niche content creator with dance as the primary professional skill. The site integrates dance portfolio, hobby showcases (Gunpla/Pokémon), collaboration opportunities, and media metrics. **Design philosophy**: Clean, modern, minimalist with professional typography and strategic accent colors to appeal to brands and collaborators.

**Key Architectural Decisions**:

- **App Router (not Pages Router)**: Simplifies file-based routing and enables server components by default
- **React Compiler Enabled**: Automatic memoization without manual `useMemo`/`useCallback`
- **Minimal Glassmorphism**: Shift from Pokemon playfulness to sleek, professional UI with clean lines and purposeful whitespace
- **Video Integration**: Hero and portfolio sections embed videos (YouTube/Vimeo) with lazy-loading and responsive sizing
- **Media Gallery**: High-quality image galleries for dance, Gunpla, Pokémon with professional mockups
- **Minimal Client State**: Most components are server components; interactive elements (toggles, video players) use `'use client'` sparingly

**New Page Structure** (`app/` directory):

- `page.tsx` - **Home**: Hero section with dance video loop, headline, CTA to collaborations
- `dance/page.tsx` - **Dance Portfolio**: Categorized videos (choreography, freestyle, performances), professional photography
- `showcase/page.tsx` - **Hobby Showcase**: Sub-sections for Gunpla (builds, timelapse) and Pokémon (collection, unboxings)
- `collaborations/page.tsx` - **Collaborations & Services**: "Let's Work Together" focus with past projects, collaboration types, inquiry form
- `media-kit/page.tsx` - **Media Kit**: Audience demographics, reach, engagement metrics (boilerplate/placeholder)
- `about/page.tsx` - **About**: Short punchy bio connecting dance background with otaku culture and content creation
- `contact/page.tsx` - **Contact**: Direct inquiry form and email
  npm run dev # Starts http://localhost:3000 with hot reload
  npm run build # Production build (optimizes with React Compiler + Turbopack)
  npm run start # Runs production build locally
  npm run lint # Runs ESLint (warns on Next.js best practices + TypeScript errors)

````

**Build Process Details**:

- **Turbopack** enabled in `next.config.ts` for faster builds
- **React Compiler** (`babel-plugin-react-compiler`) automatically optimizes components
- **Type checking**: TypeScript runs during build; failing types block production
- **Linting**: ESLint enforces Next.js best practices and TypeScript strict mode
- **Video Optimization**: Next.js Image component for thumbnails, external embeds (YouTube/Vimeo) for video content

**Common Tasks**:

- **Add a new page**: Create `app/newpage/page.tsx`, import Navbar, follow page structure template
- **Embed video**: Use `<iframe>` for YouTube/Vimeo with lazy loading, or build custom `VideoEmbed.tsx` component
- **Add images to gallery**: Place in `public/` folder, use `next/image` with responsive sizing
- **Update media kit stats**: Edit boilerplate numbers in `media-kit/page.tsx` (placeholder data for now)
- **Test responsive design**: Check `sm:`, `md:`, `lg:` breakpoints on mobile/tablet/desktop
- **Dark mode**: Adjust for professional context (may be minimal dark mode or removed entirely)

## Component Architecture

**Core Components** (`components/` directory):

- **Navbar.tsx** - Clean navigation (Home, Dance, Showcase, Collaborations, Media Kit, About, Contact)
- **Hero.tsx** - Homepage hero with background dance video loop, headline, CTA button
- **VideoEmbed.tsx** (`'use client'`) - Lazy-loaded YouTube/Vimeo embeds with play button overlay, responsive aspect ratio
- **Gallery.tsx** (`'use client'`) - Lightbox/modal image gallery for Gunpla builds, Pokémon collection, dance photography
- **PortfolioCard.tsx** - Clean card component for portfolio items (image, title, description, category badge)
- **StatsGrid.tsx** - Media kit metrics display (followers, engagement rate, avg views—boilerplate values)
- **CollaborationForm.tsx** (`'use client'`) - Contact/inquiry form for collaboration requests

**Key Component Patterns**:

**VideoEmbed Example**:
```tsx
<VideoEmbed
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Dance Choreography: [Song Name]"
  aspectRatio="16:9"
/>
````

Handles responsive sizing, lazy loading, and accessibility.

**Gallery Example**:

```tsx
<Gallery
  images={[{src: '/dance/photo1.jpg', alt: 'Dance performance'}, ...]}
  category="dance"
/>
```

Click-to-expand modal with navigation arrows, captions, category filtering.

## Styling System

### Modern Minimalist Color Palette

**Primary Colors**:

- **`--slate-900: #0f172a`** - Deep charcoal for headings, main text (professional, clean)
- **`--slate-700: #334155`** - Secondary text, borders (muted contrast)
- **`--white: #ffffff`** - Clean backgrounds, cards

**Accent Colors** (choose one pair):

1. **Option A - Vibrant Professional**:
   - `--accent-primary: #2563eb` (deep blue - trust, professionalism)
   - `--accent-secondary: #f97316` (warm orange - energy, creativity)
2. **Option B - Minimal Elegant**:
   - `--accent-primary: #7c3aed` (deep purple - luxury, creativity)
   - `--accent-secondary: #06b6d4` (cyan - modern, tech-forward)
3. **Option C - Bold Modern**:
   - `--accent-primary: #dc2626` (red - bold, confident)
   - `--accent-secondary: #0891b2` (teal - cool, balance)

**Backgrounds & Borders**:

- `--bg-light: #ffffff` - Cards, sections
- `--bg-muted: #f8fafc` - Subtle backgrounds, hover states
- `--border: #e2e8f0` - Clean lines, dividers
- `--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)` - Subtle elevation

**Recommended**: Option A (Blue + Orange) for professional appeal with energy for collaborations.

### Design Principles

- **Clean Typography**: Sans-serif only (no decorative fonts), generous whitespace, clear hierarchy
- **Professional Cards**: Simple borders, subtle shadows, no glassmorphism (too playful)
- **Video Focus**: Dark overlays for video thumbnails, play buttons on hover
- **Image Gallery**: Full-bleed images, minimal captions, category badges with accent color
- **CTA Buttons**: Solid accent color with hover state (slight scale/shadow increase)

### CSS Custom Properties in `globals.css`

```css
:root {
  /* Colors */
  --slate-900: #0f172a;
  --slate-700: #334155;
  --slate-500: #64748b;
  --white: #ffffff;
  --accent-primary: #2563eb; /* Change based on chosen palette */
  --accent-secondary: #f97316; /* Change based on chosen palette */

  /* Backgrounds */
  --bg-light: #ffffff;
  --bg-muted: #f8fafc;

  /* Borders & Shadows */
  --border: #e2e8f0;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);

  /* Fonts */
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --slate-900: #ffffff;
    --slate-700: #e2e8f0;
    --bg-light: #1e293b;
    --bg-muted: #0f172a;
    --border: #334155;
  }
}
```

### Minimal Custom Classes

| Class              | Purpose                                    | Usage                         |
| ------------------ | ------------------------------------------ | ----------------------------- |
| `.card`            | Clean card with subtle shadow and border   | Portfolio items, stats blocks |
| `.btn-primary`     | Solid accent color button with hover scale | CTAs, form submit             |
| `.badge`           | Small accent color label                   | Category tags, skill badges   |
| `.video-container` | Responsive 16:9 video embed wrapper        | YouTube/Vimeo embeds          |

### Typography

- **Headings**: System sans-serif (Segoe UI, Roboto), bold weight, `--slate-900` color
- **Body**: System sans-serif, regular weight, `--slate-700` color, 16px base size
- **Accents**: Use accent color for important text, badges, links, CTAs
- **No decorative fonts** - Keep professional for brand credibility

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

### Typography & Styling

Use system sans-serif (auto-loaded via CSS), Tailwind color classes for consistency:

```tsx
<h1 className="text-4xl font-bold text-slate-900 dark:text-white">Heading</h1>
<p className="text-lg text-slate-700 dark:text-slate-300">Body text</p>
<span className="px-3 py-1 bg-accent-primary text-white rounded text-sm font-medium badge">Tag</span>
```

**Never use decorative fonts** - Keep professional appeal for collaborations.

### Styling Preference Order

1. **Tailwind utilities**: `text-slate-900`, `bg-white`, `p-6`, `rounded`, `border`
2. **Custom CSS classes**: `.card`, `.btn-primary`, `.badge`, `.video-container`
3. **Inline styles**: Only for truly dynamic values (rarely needed)

### Animations & Transitions

Minimal animations for professional feel—subtle hover effects and smooth transitions:

```tsx
/* Smooth color/shadow transitions */
<button className="transition-all duration-200 hover:shadow-md">CTA</button>

/* Lazy load images with fade-in */
<img className="opacity-0 animate-fadeIn" src="..." />
```

Keep animations subtle and purposeful (no playful bounces).

### Dark Mode (Optional)

If dark mode is desired, use Tailwind's `dark:` classes with CSS variable overrides:

```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Content adapts automatically
</div>
```

For professional contexts, light mode may be preferred (easier to read portfolios/media kits).

## Configuration Files

- **`next.config.ts`**: Enables `reactCompiler: true` and turbopack
- **`tsconfig.json`**: ES2017 target, bundler resolution, `paths: {"@/*": ["./"]}`
- **`eslint.config.mjs`**: Flat config extending Next.js + TypeScript rules
- **`postcss.config.mjs`**: Tailwind CSS v4 plugin
- **`app/globals.css`**: Tailwind import, defines CSS variables (colors, fonts, shadows), custom classes (`.card`, `.btn-primary`, `.badge`, `.video-container`), minimal animations

## Development Tips

- **New page**: Create `app/newpage/page.tsx`, import Navbar, follow page structure template
- **Video embeds**: Use `VideoEmbed.tsx` component for YouTube/Vimeo with lazy loading
- **Image galleries**: Use `Gallery.tsx` (`'use client'`) for modal galleries with category filtering
- **Update media kit**: Edit boilerplate stats in `media-kit/page.tsx` with real data when available
- **Accent colors**: Choose one palette option (A, B, or C) and update CSS variables in `globals.css`
- **Responsive testing**: Mobile-first; test `sm:`, `md:`, `lg:` breakpoints for all gallery/video sections
- **Professional checks**: Verify no decorative fonts, minimal animations, clean whitespace, consistent brand colors
- **Debugging**: Layout issues → inspect grid/gaps; type errors → `npm run lint`; video not loading → check embed URL</content>
  <parameter name="filePath">/Users/gyalua/Documents/GitHub/jonchalant/.github/copilot-instructions.md
