# Design Tokens Implementation Guide

## Overview

Design tokens have been extracted and centralized in `lib/design-tokens.ts` to eliminate magic numbers scattered throughout the codebase. This improves maintainability, consistency, and makes style changes faster and safer.

## What Are Design Tokens?

Design tokens are design decisions represented as data—reusable values for spacing, colors, timing, sizing, and other design aspects. Instead of hardcoding values like `width: '400px'` or `duration: 300`, we reference named tokens.

### Before vs. After

```tsx
// ❌ Before: Magic numbers
<div style={{ width: '400px', height: '400px', animation: 'pulse 3s ease-in-out infinite' }}>
  {/* Hard to track where values are used */}
</div>

// ✅ After: Design tokens
<div style={{ 
  width: `${DESIGN_TOKENS.SIZES.SVG.STAGE_BODY}px`,
  height: `${DESIGN_TOKENS.SIZES.SVG.STAGE_BODY}px`,
  animation: `pulse ${DESIGN_TOKENS.TIMING.ANIMATION.PULSE}ms ease-in-out infinite`,
}}>
  {/* Self-documenting, reusable, easy to update */}
</div>
```

## File Location & Import

```tsx
import { DESIGN_TOKENS } from '@/lib/design-tokens';
```

## Token Categories

### 1. **Spacing** (`DESIGN_TOKENS.SPACING`)
Standards for margins, padding, and gaps.

```tsx
SPACING: {
  XS: '0.25rem',    // 4px
  SM: '0.5rem',     // 8px
  MD: '1rem',       // 16px
  LG: '1.5rem',     // 24px
  XL: '2rem',       // 32px
  XXL: '3rem',      // 48px
}
```

**Usage:**
```tsx
<div style={{ padding: DESIGN_TOKENS.SPACING.MD }}>
  {/* Standard padding */}
</div>
```

### 2. **Sizing** (`DESIGN_TOKENS.SIZES`)
Dimensions for SVGs, images, and elements.

```tsx
SIZES: {
  SVG: {
    STAGE_BODY: 400,         // Main stage lighting
    STAGE_GLOW_LG: 600,      // Large glow
    STAGE_GLOW_MD: 500,      // Medium glow
    STAGE_GLOW_SM: 300,      // Small glow
    STAGE_CURSOR: 100,       // Cursor indicator
  },
  IMAGE: {
    PLACEHOLDER_SQUARE: { width: 400, height: 400 },
    PLACEHOLDER_LANDSCAPE: { width: 400, height: 300 },
  },
}
```

**Usage:**
```tsx
<svg width={DESIGN_TOKENS.SIZES.SVG.STAGE_BODY} height={DESIGN_TOKENS.SIZES.SVG.STAGE_BODY}>
  {/* Consistent sizing */}
</svg>
```

### 3. **Timing** (`DESIGN_TOKENS.TIMING`)
Animation durations and easing functions.

```tsx
TIMING: {
  DURATION_FAST: 150,        // ms
  DURATION_BASE: 250,        // ms
  DURATION_SLOW: 400,        // ms
  ANIMATION: {
    PULSE: 3000,             // ms
    FLOAT: 6000,             // ms
    SHIMMER: 2000,           // ms
    STAGGER_INCREMENT: 100,  // ms
  },
}
```

**Usage:**
```tsx
<div style={{ 
  transition: `all ${DESIGN_TOKENS.TIMING.DURATION_BASE}ms ease-in-out`,
  animation: `pulse ${DESIGN_TOKENS.TIMING.ANIMATION.PULSE}ms infinite`,
}}>
  {/* Consistent timing */}
</div>
```

### 4. **Borders** (`DESIGN_TOKENS.BORDERS`)
Border widths and border radius values.

```tsx
BORDERS: {
  WIDTH: {
    THIN: 1,      // Subtle
    SM: 2,        // Standard
    MD: 3,        // Prominent
    LG: 4,        // Bold
    BOLD: 5,      // Very bold
  },
  RADIUS: {
    SM: '0.25rem',  // 4px
    MD: '0.5rem',   // 8px
    LG: '1rem',     // 16px
  },
}
```

**Usage:**
```tsx
<svg>
  <rect strokeWidth={DESIGN_TOKENS.BORDERS.WIDTH.SM} />
</svg>

<div style={{ borderRadius: DESIGN_TOKENS.BORDERS.RADIUS.MD }}>
  {/* Consistent borders */}
</div>
```

### 5. **Z-Index** (`DESIGN_TOKENS.Z_INDEX`)
Stacking order for layered elements.

```tsx
Z_INDEX: {
  BASE: 1,              // Default
  DROPDOWN: 10,         // Dropdowns
  STICKY: 20,           // Sticky headers
  FIXED: 30,            // Fixed elements
  MODAL: 50,            // Modal dialogs
  TOOLTIP: 60,          // Tooltips
  CURSOR_GLOW: 100,     // Effects
}
```

**Usage:**
```tsx
<div style={{ zIndex: DESIGN_TOKENS.Z_INDEX.MODAL }}>
  {/* Modal overlay */}
</div>
```

### 6. **Colors** (`DESIGN_TOKENS.COLORS`)
Color values organized by theme.

```tsx
COLORS: {
  LIGHT: {
    PRIMARY_BG: '#fcfcfa',
    PRIMARY_TEXT: '#111111',
  },
  DARK: {
    PRIMARY_BG: '#0a0a0a',
    PRIMARY_TEXT: '#f2f2f2',
  },
  ACCENT: {
    VIBRANT: '#ff5f1f',
    NEON: '#00ffff',
    MAGENTA: '#ff00ff',
  },
}
```

### 7. **Typography** (`DESIGN_TOKENS.TYPOGRAPHY`)
Font families, weights, and sizes.

```tsx
TYPOGRAPHY: {
  FONT_FAMILIES: {
    DISPLAY: "'Space Grotesk', sans-serif",
    BODY: "'IBM Plex Sans', sans-serif",
    MONO: "'JetBrains Mono', monospace",
  },
  FONT_WEIGHTS: {
    REGULAR: 400,
    BOLD: 700,
    BLACK: 900,
  },
  FONT_SIZES: {
    BASE: '1rem',      // 16px
    LG: '1.125rem',    // 18px
    XL: '1.25rem',     // 20px
  },
}
```

## Helper Functions

### `getCSSVar(category, key)`
Generates CSS variable names from token paths.

```tsx
getCSSVar('SPACING', 'LG')  // '--spacing-lg'
getCSSVar('COLORS', 'ACCENT')  // '--colors-accent'
```

### `createTransition(duration, property, easing)`
Creates consistent transition strings.

```tsx
createTransition(DESIGN_TOKENS.TIMING.DURATION_BASE)
// Returns: 'all 250ms ease-in-out'

createTransition(300, 'opacity')
// Returns: 'opacity 300ms ease-in-out'
```

### `getStaggerDelay(index, increment)`
Calculates staggered animation delays for item lists.

```tsx
items.map((item, idx) => ({
  style: { 
    transitionDelay: `${getStaggerDelay(idx)}ms` 
  }
}))
// Index 0: 0ms, Index 1: 100ms, Index 2: 200ms, etc.
```

### `constrainPosition(position, dimension, viewport)`
Constrains element position within safe bounds (used by StageLighting).

```tsx
const safeX = constrainPosition(cursorX, elementWidth, window.innerWidth);
// Prevents element from going off-screen
```

## Updated Components

### 1. **StageLighting.tsx**
- ✅ Replaced `400px`, `300px`, `500px`, `600px` with `DESIGN_TOKENS.SIZES.SVG.*`
- ✅ Replaced `150px`, `100px` offsets with `DESIGN_TOKENS.POINTER.*`
- ✅ Replaced `3s` animation with `DESIGN_TOKENS.TIMING.ANIMATION.PULSE`
- ✅ Uses `constrainPosition()` helper for safe bounds
- ✅ Uses `DURATION_FAST` for transitions

### 2. **app/showcase/page.tsx**
- ✅ Added `import { DESIGN_TOKENS }`
- ✅ Replaced `viewBox="0 0 400 400"` with `viewBox={...DESIGN_TOKENS.SIZES.SVG.VISUALIZATION}`
- ✅ Replaced `strokeWidth="2"` and `strokeWidth="3"` with `DESIGN_TOKENS.BORDERS.WIDTH.SM` and `.MD`

### 3. **app/collaborations/page.tsx**
- ✅ Added `import { DESIGN_TOKENS }`
- ✅ Replaced `viewBox="0 0 400 400"` with design tokens
- ✅ Replaced stroke widths with border token values

## Common Usage Patterns

### Pattern 1: SVG Dimensions
```tsx
<svg 
  width={DESIGN_TOKENS.SIZES.SVG.STAGE_BODY}
  height={DESIGN_TOKENS.SIZES.SVG.STAGE_BODY}
>
  <circle r={DESIGN_TOKENS.SIZES.SVG.STAGE_CURSOR} />
</svg>
```

### Pattern 2: Animations
```tsx
<div style={{
  animation: `pulse ${DESIGN_TOKENS.TIMING.ANIMATION.PULSE}ms ease-in-out infinite`,
  transition: `all ${DESIGN_TOKENS.TIMING.DURATION_BASE}ms ease-in-out`,
}}>
  {/* Animated element */}
</div>
```

### Pattern 3: Staggered Lists
```tsx
{items.map((item, idx) => (
  <div
    key={idx}
    style={{
      transitionDelay: `${getStaggerDelay(idx)}ms`,
    }}
  >
    {item}
  </div>
))}
```

### Pattern 4: Responsive Constraints
```tsx
const x = constrainPosition(
  position.x + DESIGN_TOKENS.POINTER.OFFSET_X,
  DESIGN_TOKENS.SIZES.SVG.STAGE_GLOW_SM,
  window.innerWidth
);
```

## Benefits Achieved

✅ **Maintainability**: Change animation speed once, updates everywhere
✅ **Consistency**: All components use same spacing/sizing standards
✅ **Discoverability**: IDE autocomplete helps find tokens
✅ **Scalability**: Easy to add new tokens without searching code
✅ **Documentation**: Token names are self-documenting
✅ **Type Safety**: TypeScript tracks all token references

## Migration Checklist

Use this when adding new components or refactoring existing ones:

- [ ] Check for hardcoded pixel values (px)
- [ ] Check for hardcoded animation durations (ms, s)
- [ ] Check for hardcoded z-index values
- [ ] Check for hardcoded border widths
- [ ] Check for hardcoded spacing values
- [ ] Replace with appropriate `DESIGN_TOKENS.*` value
- [ ] Import `DESIGN_TOKENS` if not already imported
- [ ] Test visual output matches before/after
- [ ] TypeScript compilation passes

## Future Token Candidates

These values could be extracted to tokens in future updates:

1. **Grid patterns**: `50px`, `60px`, `80px` grid sizes
2. **SVG viewBox dimensions**: Consolidate all `400`, `500`, etc.
3. **Gradient definitions**: Radial/conic gradients as presets
4. **Breakpoint values**: 480, 768, 1024 as token constants
5. **Shadow definitions**: Blur amounts, spread radius
6. **Container max-widths**: max-w-6xl, etc.

## Troubleshooting

### Issue: "DESIGN_TOKENS is not defined"
**Solution**: Add `import { DESIGN_TOKENS } from '@/lib/design-tokens'`

### Issue: Type mismatches in inline styles
**Solution**: Ensure values are correct type:
- Sizes: number (will be `px` in CSS)
- Durations: number (milliseconds)
- Easing: string
- Border radius: string with unit

### Issue: Animation not applying
**Solution**: Verify the animation name is defined in CSS:
```css
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
```

## Next Steps

1. **Gallery optimization**: Extract gallery timing and dimensions
2. **Form tokens**: Add input heights, border radius, focus widths
3. **Breakpoint constants**: Move from magic numbers (768, 1024) to tokens
4. **Shadow presets**: Create standard shadow definitions
5. **Gradient library**: Predefine common gradient patterns

---

**Last Updated**: February 6, 2026  
**Status**: Phase 1 - Foundation Complete  
**Files Modified**: 4 (design-tokens.ts created, StageLighting.tsx, showcase/page.tsx, collaborations/page.tsx updated)  
**Build Status**: ✅ Successful | No TypeScript errors
