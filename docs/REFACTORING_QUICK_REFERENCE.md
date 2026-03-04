# Quick Refactoring Reference

## TL;DR - The Pattern

Every page follows this structure:

```tsx
import { SectionWrapper, SectionContent } from "@/components/layout";
import { TextLink } from "@/components/typography";

export default function MyPage() {
  return (
    <div className="my-page-main">
      <PageTransition animation="blur">
        <SectionWrapper variant="primary">
          <SectionContent>{/* Section 1 content */}</SectionContent>
        </SectionWrapper>

        <SectionWrapper variant="secondary">
          <SectionContent>{/* Section 2 content */}</SectionContent>
        </SectionWrapper>

        <SectionWrapper variant="tertiary">
          <SectionContent>
            {/* Section 3 content - usually CTA */}
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
```

## Component Variants

```tsx
// Three built-in variants for alternating backgrounds:
<SectionWrapper variant="primary">    {/* var(--bg-primary) - Rice paper */}
<SectionWrapper variant="secondary">  {/* var(--bg-secondary) - Slightly warmer */}
<SectionWrapper variant="tertiary">   {/* var(--bg-tertiary) - Warm sand */}
```

## Common Replacements

### Links (❌ Before → ✅ After)

```tsx
// ❌ DON'T
<Link href="/path" className="text-slate-900 hover:text-accent">
  Link Text
</Link>

// ✅ DO
<TextLink href="/path">Link Text</TextLink>
```

### Section Containers (❌ Before → ✅ After)

```tsx
// ❌ DON'T
<div className="page-section-wrapper page-section-header">
  <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    Content
  </main>
</div>

// ✅ DO
<SectionWrapper variant="primary">
  <SectionContent>
    Content
  </SectionContent>
</SectionWrapper>
```

### Typography Styling (❌ Before → ✅ After)

```tsx
// ❌ DON'T
<h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Heading</h1>
<p className="text-lg text-slate-700">Paragraph</p>

// ✅ DO (Option 1: Use semantic CSS)
<h1 className="page-title">Heading</h1>
<p className="page-description">Paragraph</p>

// Or ✅ DO (Option 2: Use inline styles with CSS variables)
<h1 style={{
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  color: 'var(--text-primary)'
}}>Heading</h1>
```

## Color Palette (CSS Variables)

```css
/* Text Colors */
var(--text-primary)      /* Main text, headings */
var(--text-secondary)    /* Body text, descriptions */
var(--text-tertiary)     /* Muted text, labels */

/* Background Colors */
var(--bg-primary)        /* Main/default background */
var(--bg-secondary)      /* Secondary sections */
var(--bg-tertiary)       /* Tertiary sections */

/* Interactive Colors */
var(--accent-primary)    /* Main accent, buttons, links */
var(--accent-hover)      /* Hover states */

/* Borders */
var(--border-color)      /* Subtle borders */
```

## Spacing Reference

```css
/* Use rem units for consistency */
var(--spacing-xs)        /* 0.75rem */
var(--spacing-sm)        /* 1.25rem */
var(--spacing-md)        /* 2rem */
var(--spacing-lg)        /* 3rem */
var(--spacing-xl)        /* 4.5rem */
var(--spacing-2xl)       /* 6rem */
var(--spacing-3xl)       /* 9rem */

/* Responsive section padding (handled by SectionWrapper) */
/* Mobile: 4rem vertical, 2rem horizontal */
/* Tablet: 6rem vertical, 3rem horizontal */
/* Desktop: 6rem vertical, 4rem horizontal */
```

## Typography Scale

```css
/* Fonts */
var(--font-headline)     /* Serif (Cormorant Garamond) */
var(--font-body)         /* Sans-serif (Inter) */

/* Line Heights */
var(--leading-tight)     /* 1.3 */
var(--leading-normal)    /* 1.5 */
var(--leading-relaxed)   /* 1.8 */
var(--leading-editorial) /* 1.9 */
```

## Common Patterns

### Full-Width Section with Alternating Background

```tsx
<SectionWrapper variant="primary">
  <SectionContent>
    <h2>Section Title</h2>
    <p>Section description</p>
  </SectionContent>
</SectionWrapper>
```

### Grid of Cards

```tsx
<SectionWrapper variant="secondary">
  <SectionContent>
    <h2>Cards Section</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} hoverable={true}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Card>
      ))}
    </div>
  </SectionContent>
</SectionWrapper>
```

### Hero Section

```tsx
<SectionWrapper variant="primary">
  <SectionContent>
    <HeroSection
      subheading="Optional intro text"
      heading="Main Headline Here"
      description="Optional description or subheading"
    >
      {/* Optional CTA button or additional content */}
    </HeroSection>
  </SectionContent>
</SectionWrapper>
```

### CTA Section (Bottom of Page)

```tsx
<SectionWrapper variant="tertiary">
  <SectionContent>
    <CTASection
      title="Ready to Take Action?"
      description="Description of what happens next"
      buttonText="Click Me"
      buttonLink="/path"
    />
  </SectionContent>
</SectionWrapper>
```

## Checklist for Refactoring a Page

- [ ] Update imports (remove Link, add SectionWrapper, SectionContent, TextLink)
- [ ] Replace all `<Link>` with `<TextLink>`
- [ ] Remove all manual `max-w-6xl mx-auto px-4...` divs
- [ ] Replace with `<SectionWrapper>` + `<SectionContent>`
- [ ] Remove all Tailwind color classes (text-slate-_, bg-slate-_, etc.)
- [ ] Replace with CSS variables (var(--text-primary), etc.)
- [ ] Simplify page CSS file (remove section-wrapper duplicates)
- [ ] Add page-specific CSS classes only
- [ ] Test at mobile, tablet, desktop breakpoints
- [ ] Verify section backgrounds extend full-width
- [ ] Confirm no horizontal scrolling issues
- [ ] Check link hover/focus states work correctly

## CSS File Structure

Each page has one CSS file at `/app/css/[page].css`:

```css
/* Minimal setup - only page-specific styles */

.page-name-main {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.page-specific-element {
  /* Your custom styles using CSS variables */
  color: var(--text-primary);
  padding: 2rem;
}
```

Don't include:

- ❌ `max-width` settings (handled by SectionContent)
- ❌ `margin: 0 auto` centering (handled by SectionContent)
- ❌ Full-width background tricks (handled by SectionWrapper)
- ❌ Responsive padding calculations (handled by SectionWrapper)

## Import Statements Quick Copy

```tsx
// For all refactored pages, copy these imports:
import {
  PageTransition,
  SectionWrapper,
  SectionContent,
} from "@/components/layout";
import { TextLink } from "@/components/typography";
import { CTASection } from "@/components/sections";
import "@/app/css/your-page.css";

// Remove these:
// import Link from 'next/link';
// import any manual section wrapper components
```

## Troubleshooting

| Issue                             | Solution                                                |
| --------------------------------- | ------------------------------------------------------- |
| Section background not full-width | Make sure using `<SectionWrapper>`, not a div           |
| Colors wrong                      | Check you're using `var(--color-name)`, not Tailwind    |
| Text chopped off on mobile        | Check SectionContent responsive padding at breakpoints  |
| Links don't look right            | Switch to `<TextLink>` component                        |
| Excessive padding on desktop      | That's intentional - ma (space) principle               |
| Sidebar covering content          | Check SectionWrapper width calculation includes sidebar |
| Hard to maintain styles           | Move Tailwind utilities to semantic CSS classes         |

## Examples of Completed Pages

Refer to these for reference implementations:

- ✅ `/app/about/page.tsx` - Multiple section types
- ✅ `/app/blog/page.tsx` - Featured + List sections
- ✅ `/app/dance/page.tsx` - Portfolio + Approach sections
- ✅ `/app/lessons/page.tsx` - Multiple category sections

Copy similar patterns from these pages when refactoring new ones.
