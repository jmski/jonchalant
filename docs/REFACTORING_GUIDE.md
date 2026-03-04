# Component Refactoring Guide

## Overview

All pages and components have been refactored to:
1. **Use reusable React components** instead of manual div structures
2. **Eliminate Tailwind color utilities** in favor of CSS variables
3. **Follow a consistent pattern** for section layouts and styling

## Key Components

### SectionWrapper
Provides full-width background sections with proper responsive padding that accounts for the 250px fixed sidebar.

```tsx
import { SectionWrapper } from "@/components/layout";

<SectionWrapper variant="primary" | "secondary" | "tertiary">
  {/* content */}
</SectionWrapper>
```

**Variants:**
- `primary` - Uses `--bg-primary` (rice paper color)
- `secondary` - Uses `--bg-secondary` (slightly warmer)
- `tertiary` - Uses `--bg-tertiary` (warm sand accent)

**Features:**
- Automatic responsive padding (4rem → 6rem → 6rem)
- Full-width background that extends beyond content
- Proper sidebar-aware width calculations

### SectionContent
Inner content container that constrains width and provides responsive padding.

```tsx
import { SectionContent } from "@/components/layout";

<SectionWrapper variant="primary">
  <SectionContent>
    {/* Your content here */}
  </SectionContent>
</SectionWrapper>
```

### TextLink
Replaces `<Link>` from Next.js, using CSS variables for colors instead of Tailwind utilities.

```tsx
import { TextLink } from "@/components/typography";

<TextLink href="/path">Link text</TextLink>
```

### HeroSection
Provides consistent hero heading styling.

```tsx
import { HeroSection } from "@/components/sections";

<HeroSection
  subheading="Optional subheading"
  heading="Main Heading"
  description="Optional description"
>
  {/* Optional children */}
</HeroSection>
```

### Card
Reusable card component with optional hover effects.

```tsx
import { Card } from "@/components/layout";

<Card hoverable={true}>
  {/* Card content */}
</Card>
```

### Grid
Responsive grid layout component.

```tsx
import { Grid } from "@/components/layout";

<Grid columns={3} gap="md">
  {/* Grid items */}
</Grid>
```

## CSS Variables System

All styling uses CSS custom properties defined in `/app/css/variables.css`:

### Colors
- `--bg-primary` - Main background (rice paper)
- `--bg-secondary` - Secondary backgrounds
- `--bg-tertiary` - Tertiary/accent backgrounds
- `--text-primary` - Main text (sumie ink)
- `--text-secondary` - Secondary text
- `--text-tertiary` - Muted text
- `--border-color` - Subtle borders
- `--accent-primary` - Primary accent (muted moss)
- `--accent-secondary` - Secondary accent
- `--accent-hover` - Hover state for accents

### Spacing
- `--spacing-xs` through `--spacing-3xl` - Consistent spacing scale
- `--section-padding-*` - Pre-configured section padding

### Typography
- `--font-headline` - Serif font for headings (Cormorant Garamond)
- `--font-body` - Sans-serif for body (Inter)
- `--leading-*` - Line height presets

## Replacing Tailwind Color Classes

### Before (Old Pattern)
```tsx
<p className="text-slate-700 mb-4">Description</p>
<Link href="/path" className="font-semibold text-slate-900 hover:text-accent">
  Link
</Link>
```

### After (New Pattern)
```tsx
<p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>
  Description
</p>
// Or use semantic CSS classes:
<p className="description-text">Description</p>

<TextLink href="/path">Link</TextLink>
```

## Page Refactoring Checklist

For each page, follow this pattern:

1. **Update Imports**
   ```tsx
   import { SectionWrapper, SectionContent } from "@/components/layout";
   import { TextLink } from "@/components/typography";
   import { PageTransition } from "@/components/layout";
   // Remove: import Link from 'next/link';
   ```

2. **Replace Manual Section Wrappers**
   ```tsx
   // Before
   <div className="page-section-wrapper page-section-header">
     <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* content */}
     </main>
   </div>

   // After
   <SectionWrapper variant="primary">
     <SectionContent>
       {/* content */}
     </SectionContent>
   </SectionWrapper>
   ```

3. **Replace Link Components**
   ```tsx
   // Before
   <Link href="/path" className="text-slate-900">Link</Link>

   // After
   <TextLink href="/path">Link</TextLink>
   ```

4. **Remove Tailwind Color Classes**
   - `text-slate-*` → Uses CSS variables
   - `bg-slate-*` → Uses CSS variables
   - `border-slate-*` → Uses CSS variables
   - `text-center` → Keep (structural, not color)

5. **Simplify CSS Files**
   Remove duplicate section wrapper styles now handled by SectionWrapper component:
   ```css
   /* Remove these - now in section-wrapper.css */
   .page-section-wrapper {
     width: calc(100% + 4rem);
     margin-left: -2rem;
     /* ... etc */
   }
   
   /* Keep only page-specific styles */
   .page-specific-element {
     /* your custom styles */
   }
   ```

## Completed Refactors

✅ **About Page** (`/app/about/page.tsx`)
- Uses SectionWrapper for all sections
- Replaced Link with TextLink
- Simplified /app/css/about.css

✅ **Blog Page** (`/app/blog/page.tsx`)
- Uses SectionWrapper for header, featured, all, cta sections
- Replaced Link with TextLink
- Simplified /app/css/blog.css

✅ **Dance Page** (`/app/dance/page.tsx`)
- Uses SectionWrapper for all sections
- Replaced Link with TextLink
- Updated /app/css/dance.css with approach section styles

## Pages Needing Refactoring

⚠️ **Programs Page** (`/app/programs/page.tsx`)
- Large complex layout with inline styles
- Multiple decorative elements
- Strategy: Break into smaller sections, use SectionWrapper

⚠️ **Lessons Page** (`/app/lessons/page.tsx`)
- Multiple lesson categories
- Strategy: Use SectionWrapper with nested Grid components

⚠️ **Media Kit Page** (`/app/media-kit/page.tsx`)
- Complex layout with multiple data sections
- Strategy: Use SectionWrapper for each section

⚠️ **Contact Page** (`/app/contact/page.tsx`)
- Form-heavy layout
- Suggestion: Create reusable FormSection component

## Best Practices

### Color Usage
```tsx
// ✅ Good - Uses CSS variables
<div style={{color: 'var(--text-primary)'}}>Text</div>
<p className="description-text">Text</p>

// ❌ Avoid - Tailwind color utilities
<p className="text-slate-700">Text</p>
<div className="bg-slate-50">

</div>
```

### Spacing
```tsx
// ✅ Good - Uses CSS values
<div style={{padding: '1rem', marginBottom: '1.5rem'}}>
  Content
</div>

// ❌ Avoid - Tailwind spacing utilities (unless structural)
<div className="p-4 mb-6">Content</div>
```

### Links
```tsx
// ✅ Good
<TextLink href="/path">Link text</TextLink>

// ❌ Avoid
<Link href="/path" className="text-slate-900 hover:text-accent">
  Link text
</Link>
```

## Component Export Structure

All components are exported from their respective index files:

- `/components/layout/index.ts` - SectionWrapper, SectionContent, Grid, Card
- `/components/typography/index.ts` - Heading, TextLink
- `/components/sections/index.ts` - HeroSection, CTASection, etc.

This allows clean imports:
```tsx
import { SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink, Heading } from "@/components/typography";
import { HeroSection, CTASection } from "@/components/sections";
```

## Adding New Pages

For new pages, follow this template:

```tsx
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { HeroSection, CTASection } from "@/components/sections";
import { TextLink } from "@/components/typography";
import type { Metadata } from 'next';
import '@/app/css/your-page.css';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default function YourPage() {
  return (
    <div className="your-page-main">
      <PageTransition animation="blur">
        {/* Hero Section */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <HeroSection
              heading="Page Heading"
              description="Page description"
            />
          </SectionContent>
        </SectionWrapper>

        {/* Content Sections */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            {/* Your content */}
          </SectionContent>
        </SectionWrapper>

        {/* CTA Section */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTASection
              title="Call to Action"
              description="Description"
              buttonText="Button"
              buttonLink="/path"
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
```

And in your page-specific CSS file:
```css
/* /app/css/your-page.css */

.your-page-main {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.your-page-specific-element {
  /* Your custom styles using CSS variables */
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}
```

## Troubleshooting

### Colors not applying
- Check that CSS variables are defined in `/app/css/variables.css`
- Verify you're using `var(--variable-name)` syntax
- Don't use Tailwind color classes

### Section backgrounds not full-width
- Make sure you're using `<SectionWrapper>` component
- Check that `<SectionContent>` is inside `<SectionWrapper>`
- Don't use `max-w-6xl mx-auto` directly

### Links not styled correctly
- Use `<TextLink>` instead of `<Link>`
- TextLink automatically uses CSS variables for colors
- Add custom className only if needed for specific styling

## Testing Responsive Design

Test all refactored pages at:
- Mobile: 320px, 375px, 412px
- Tablet: 640px, 768px
- Desktop: 1024px, 1280px, 1536px

The responsive padding system should work correctly at all breakpoints.
