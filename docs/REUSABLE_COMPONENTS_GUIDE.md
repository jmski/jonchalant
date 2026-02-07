# Reusable Components: Card & Heading Reference

## Overview

Two core reusable components have been created to replace 100+ lines of scattered styling throughout the codebase.

- **Card.tsx** - Replaces repeated `<div className="border p-6...">` patterns
- **Heading.tsx** - Replaces scattered `<h1>`, `<h2>`, `<h3>` styling patterns

Both components integrate with design tokens for consistent sizing and timing.

## Card Component

Flexible card container with multiple variants for different use cases.

### Import

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/common";
```

### Props

```tsx
interface CardProps {
  children: ReactNode; // Card content
  variant?: "default" | "enhanced" | "cta" | "content" | "accent" | "outlined";
  size?: "sm" | "md" | "lg"; // sm, md, lg padding
  borderColor?: "primary" | "vibrant" | "neon" | "magenta" | "none";
  hoverable?: boolean; // Enable hover effects
  className?: string; // Additional CSS classes
  style?: CSSProperties; // Inline styles
  onClick?: () => void; // Click handler
}
```

### Variants

#### 1. **Default** - Basic card with subtle border

```tsx
<Card>Simple card content</Card>
```

#### 2. **Enhanced** - Card with shadow and hover effects

```tsx
<Card variant="enhanced" hoverable>
  Enhanced card with shadow
</Card>
```

#### 3. **CTA** - Call-to-action card with gradient background

```tsx
<Card variant="cta">
  <h3>Call to Action</h3>
  <p>This card stands out with a gradient background</p>
</Card>
```

#### 4. **Content** - Minimal card with custom border color

```tsx
<Card variant="content" borderColor="vibrant">
  Content with vibrant border
</Card>
```

#### 5. **Accent** - Bold card with thicker border

```tsx
<Card variant="accent" borderColor="neon" hoverable>
  Prominent accent card
</Card>
```

#### 6. **Outlined** - Dashed border card

```tsx
<Card variant="outlined" borderColor="magenta">
  Gently outlined content
</Card>
```

### Sizes

```tsx
// Small padding (16px)
<Card size="sm">Small card</Card>

// Medium padding (24px) - default
<Card>Medium card</Card>

// Large padding (32px)
<Card size="lg">Large card</Card>
```

### Complete Example: Portfolio Card

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/common";

<Card variant="enhanced" hoverable borderColor="vibrant" size="md">
  <CardHeader>
    <h3>Dance Performance</h3>
  </CardHeader>

  <CardContent>
    <img src="/performance.jpg" alt="Performance" className="mb-4" />
    <p>An incredible showcase of movement and technique</p>
  </CardContent>

  <CardFooter>
    <a href="#more">Learn more →</a>
  </CardFooter>
</Card>;
```

## Heading Component

Semantic heading component with consistent typography and flexible styling.

### Import

```tsx
import { Heading, HeadingWithSubtext } from "@/components/common";
```

### Props

```tsx
interface HeadingProps {
  children: ReactNode; // Heading text
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // HTML heading level
  variant?: "display" | "section" | "subsection" | "label";
  color?: "primary" | "secondary" | "vibrant" | "neon" | "magenta" | "inherit";
  align?: "left" | "center" | "right";
  className?: string; // Additional CSS classes
  style?: CSSProperties; // Inline styles
  underline?: boolean; // Add underline
  underlineColor?: string; // Custom underline color
  tracking?: "tight" | "normal" | "wide" | "widest"; // Letter spacing
}
```

### Variants

#### 1. **Display** - Large, bold headings for page heroes

```tsx
// h1 display: 6xl-8xl
<Heading level="h1" variant="display">
  Welcome to My Portfolio
</Heading>

// h2 display: 5xl-7xl
<Heading level="h2" variant="display" color="vibrant">
  Featured Work
</Heading>
```

#### 2. **Section** - Section headings (h2-h3 size)

```tsx
<Heading level="h2" variant="section">
  Dance Portfolio
</Heading>

<Heading level="h3" variant="section" color="neon">
  Creative Showcase
</Heading>
```

#### 3. **Subsection** - Smaller headings for categories

```tsx
<Heading level="h3" variant="subsection">
  Gunpla Builds
</Heading>

<Heading level="h4" variant="subsection" color="magenta">
  Featured Items
</Heading>
```

#### 4. **Label** - Small uppercase labels

```tsx
<Heading level="h6" variant="label" tracking="widest">
  → DANCE CATEGORY
</Heading>

<Heading variant="label" tracking="widest" color="vibrant">
  Premium Content
</Heading>
```

### Text Colors

```tsx
// Primary (default)
<Heading color="primary">Dark text</Heading>

// Secondary
<Heading color="secondary">Muted text</Heading>

// Accent colors
<Heading color="vibrant">Vibrant orange</Heading>
<Heading color="neon">Cyan neon</Heading>
<Heading color="magenta">Magenta text</Heading>

// Inherit parent color
<Heading color="inherit">Uses parent color</Heading>
```

### Alignment

```tsx
// Left aligned (default)
<Heading align="left">Left aligned</Heading>

// Center aligned
<Heading align="center">Centered heading</Heading>

// Right aligned
<Heading align="right">Right aligned</Heading>
```

### Tracking (Letter Spacing)

```tsx
// Tight spacing
<Heading tracking="tight">Tight spacing</Heading>

// Normal spacing (default)
<Heading tracking="normal">Normal spacing</Heading>

// Wide spacing
<Heading tracking="wide">Wide spacing</Heading>

// Widest spacing (best for labels)
<Heading variant="label" tracking="widest">CATEGORY</Heading>
```

### Underline

```tsx
// Simple underline with accent color
<Heading underline>Underlined heading</Heading>

// Custom underline color
<Heading underline underlineColor="#00ffff">
  Custom underline
</Heading>
```

### Complete Examples

#### Page Hero

```tsx
<div className="text-center mb-12">
  <Heading level="h1" variant="display" color="primary" align="center">
    Dance Portfolio
  </Heading>
  <Heading
    level="h2"
    variant="section"
    color="secondary"
    align="center"
    className="mt-4"
  >
    Choreography | Freestyle | Performances
  </Heading>
</div>
```

#### Section with Underline

```tsx
<div className="mb-12">
  <Heading
    level="h2"
    variant="section"
    color="vibrant"
    underline
    underlineColor="var(--accent-vibrant)"
  >
    Recent Projects
  </Heading>
</div>
```

#### Category Label

```tsx
<Heading variant="label" color="neon" tracking="widest" className="mb-4">
  → SHOWCASE
</Heading>
```

## HeadingWithSubtext Component

Convenience component for heading + subtitle pairs.

```tsx
import { HeadingWithSubtext } from "@/components/common";

<HeadingWithSubtext
  title="Dance Portfolio"
  subtitle="Choreography, freestyle, and professional performances"
  level="h2"
  variant="section"
  color="vibrant"
  subtitleColor="secondary"
  align="left"
/>;
```

## Migration Guide

### Before: Individual Card Styling

```tsx
// Old approach - scattered styling
<div className="border-2 border-vibrant bg-white dark:bg-slate-900 p-6 hover:shadow-lg rounded transition-all">
  <h3 className="text-xl font-bold mb-4">Title</h3>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

### After: Reusable Card Component

```tsx
// New approach - cleaner and consistent
<Card variant="enhanced" borderColor="vibrant" hoverable>
  <CardHeader>
    <Heading level="h3" variant="subsection">
      Title
    </Heading>
  </CardHeader>
  <CardContent>
    <p>Description</p>
  </CardContent>
</Card>
```

## Design Tokens Integration

Both components integrate with design tokens for consistency:

```tsx
import { DESIGN_TOKENS } from '@/lib/design-tokens';

// Card padding uses DESIGN_TOKENS.CARD.PADDING
<Card size="md">  // Uses DESIGN_TOKENS.CARD.PADDING

// Heading sizing uses DESIGN_TOKENS.TYPOGRAPHY.FONT_SIZES
<Heading level="h1" variant="display">  // Uses 6xl-8xl
```

## Common Patterns

### Portfolio Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {portfolioItems.map((item) => (
    <Card
      key={item.id}
      variant="enhanced"
      hoverable
      borderColor="vibrant"
      onClick={() => openDetail(item)}
    >
      <img src={item.image} alt={item.title} />
      <CardContent>
        <Heading level="h3" variant="subsection">
          {item.title}
        </Heading>
        <p>{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Section with Header

```tsx
<div>
  <Heading level="h2" variant="section" color="vibrant" underline>
    Showcase
  </Heading>
  <div className="mt-12 grid...">{/* Content grid */}</div>
</div>
```

### CTA Section

```tsx
<Card variant="cta" className="text-center py-16">
  <Heading level="h2" variant="section" align="center">
    Ready to Collaborate?
  </Heading>
  <p className="mt-4 text-lg">Let's create something amazing together</p>
  <button className="mt-8">Get Started</button>
</Card>
```

## Benefits

✅ **Consistency**: All cards and headings use the same styling system
✅ **Maintainability**: Change styling in one place, updates everywhere
✅ **Reusability**: 100+ lines of scattered code replaced
✅ **Type Safety**: Full TypeScript support
✅ **Accessibility**: Semantic HTML (heading levels, proper structure)
✅ **Performance**: Smaller component files, less duplication
✅ **Flexibility**: Multiple variants for different use cases

## Troubleshooting

### Issue: Card border not showing

**Solution**: Make sure `borderColor` is specified correctly:

```tsx
<Card borderColor="vibrant">  // ✅ Correct
<Card>                        // ❌ Uses primary (may not contrast)
```

### Issue: Heading sizing seems off

**Solution**: Check the variant-level combination:

```tsx
<Heading level="h1" variant="display">      // ✅ 6xl-8xl (largest)
<Heading level="h3" variant="subsection">  // ✅ xl-2xl (smaller)
```

### Issue: Hover effect not working

**Solution**: Make sure `hoverable={true}` on Card:

```tsx
<Card hoverable>Content</Card>  // ✅ Has hover effects
<Card>Content</Card>            // ❌ No hover effects
```

---

**Last Updated**: February 6, 2026  
**Status**: Phase 1 Complete + 4/5 items done  
**Files**: components/common/Card.tsx, components/common/Heading.tsx  
**Impact**: Reduced component duplication by ~100 lines, improved maintainability
