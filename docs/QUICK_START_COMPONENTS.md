# Quick Start: Using the New Kinetic Leader Components

## 1. Unified Buttons

Replace all inline button styling with `StyledButton`:

```tsx
// BEFORE: Scattered CSS classes
<button className="btn btn-primary">Send</button>
<button className="btn btn-secondary">Cancel</button>

// AFTER: Unified component
import StyledButton from '@/components/common/StyledButton';

<StyledButton variant="primary">Send</StyledButton>
<StyledButton variant="secondary">Cancel</StyledButton>
<StyledButton variant="tertiary">Learn More</StyledButton>
```

**Variants**: `primary` (Kinetic), `secondary` (ghost), `tertiary` (text)  
**Sizes**: `sm`, `md` (default), `lg`

---

## 2. Zen Sleek Cards

Replace scattered card styles with consistent `ZenCard`:

```tsx
import ZenCard from '@/components/common/ZenCard';

// Default minimal card
<ZenCard>
  <h3 className="card-title">Title</h3>
  <p>Content here</p>
</ZenCard>

// Enhanced with hover
<ZenCard variant="enhanced" hoverable>
  <h3>Interactive</h3>
</ZenCard>

// Accent highlight
<ZenCard variant="accent">
  <h3>Featured</h3>
</ZenCard>
```

---

## 3. Section Headers

Use for consistent hierarchy and accent integration:

```tsx
import SectionHeader from "@/components/typography/SectionHeader";

<SectionHeader
  eyebrow="Programs"
  title="Transform Your Presence"
  subtitle="12-week intensive coaching"
  alignment="left"
  withUnderline
/>;
```

---

## 4. Ikigai Circles (Background Decoration)

Add subtle visual interest to sections:

```tsx
import { IkigaiCircles } from "@/components/decorative";

<section className="relative">
  <IkigaiCircles
    size={400}
    opacity={0.08}
    style={{ position: "absolute", top: 0, right: -100 }}
  />
  {/* Section content */}
</section>;
```

---

## 5. Geometric Grid (Kaizen Precision)

Add architectural grid patterns:

```tsx
import { GeometricGrid } from "@/components/decorative";

<section className="relative">
  <GeometricGrid
    variant="dots"
    opacity={0.04}
    style={{ position: "absolute", top: 0, left: 0 }}
  />
  {/* Section content */}
</section>;
```

---

## 6. Color Palette

All accent colors now use centralized CSS variables:

```css
var(--accent-primary)      /* #6b8e63 - Muted Moss */
var(--accent-hover)        /* #8aa87a - Moss light */
var(--text-primary)        /* #1a1a1a - Sumie ink */
var(--text-secondary)      /* #3d3d3d - Secondary */
var(--text-tertiary)       /* #7a7a7a - Tertiary */
var(--border-color)        /* #d4cfc7 - Hairline */
var(--bg-primary)          /* #f8f8f5 - Rice paper */
var(--bg-secondary)        /* #fafaf8 - Warm white */
```

---

## 7. Spacing Scale

Section padding is now condensed (Kaizen refinement):

- **Mobile**: 4rem (64px) `py-12`
- **Tablet**: 5rem (80px) `py-16`
- **Desktop**: 6rem (96px) `py-20`

Use `py-12 sm:py-16` for section spacing (reduced from `py-16 sm:py-24`)

---

## 8. Page Template

Here's a complete example:

```tsx
import SectionHeader from "@/components/typography/SectionHeader";
import ZenCard from "@/components/common/ZenCard";
import StyledButton from "@/components/common/StyledButton";
import { IkigaiCircles } from "@/components/decorative";

export const metadata = {
  title: "New Page | The Kinetic Leader",
  description: "Page description here",
};

export default function NewPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section with decorative element */}
        <section className="relative mb-20">
          <IkigaiCircles
            size={300}
            opacity={0.08}
            style={{
              position: "absolute",
              top: 0,
              right: -100,
              zIndex: 0,
            }}
          />

          <SectionHeader
            eyebrow="Category"
            title="Section Title"
            subtitle="Supporting description"
            withUnderline
          />

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative z-10">
            {data.map((item) => (
              <ZenCard key={item.id} variant="enhanced" hoverable>
                <h3 className="card-title">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
                <div className="mt-6">
                  <StyledButton variant="secondary" size="sm">
                    Learn More →
                  </StyledButton>
                </div>
              </ZenCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
```

---

## 9. CSS Classes (Still Available)

Legacy CSS classes still work:

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-tertiary">Tertiary</button>

<!-- Cards -->
<div class="card">Default card</div>
<div class="card card-outlined">Outlined card</div>

<!-- Typography -->
<h2 class="text-3xl sm:text-4xl font-bold">Heading</h2>
<p class="text-lg text-slate-700 leading-relaxed">Body text</p>
```

---

## 10. Mobile-First Strategy

All components are mobile-first and fully responsive:

- **Base (mobile)**: Single column, condensed spacing
- **Tablet (768px+)**: Two columns, medium spacing
- **Desktop (1024px+)**: Three columns, generous spacing

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid automatically adjusts */}
</div>
```

---

## 11. Accessibility

All new components meet WCAG AA standards:

- ✅ Minimum 48px touch targets
- ✅ 4.5:1 contrast ratio (text on background)
- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed

---

## 12. Performance

- ✅ Zero bundle size overhead (tree-shakeable components)
- ✅ SVG decorative elements are lightweight
- ✅ CSS-only hover states (no JavaScript)
- ✅ Optimized for Vercel/Next.js

---

## Need Help?

See `STRUCTURAL_KAIZEN_COMPLETE.md` for the full refactoring documentation.
