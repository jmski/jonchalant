# CSS Refactoring Cross-Reference Audit Report

**Generated**: February 4, 2026  
**Scope**: Refactored `globals.css` vs. `/components` and `/app` directories  
**Status**: 🔴 **CRITICAL ISSUES FOUND** - Action Required

---

## Executive Summary

The refactored `globals.css` introduces **5 critical variable breaks** that will cause visual glitches across multiple components. Additionally, new global element selectors (`h1`, `h2`, `button`) have broad specificity that may unintentionally override Tailwind classes.

**Risk Level**: 🔴 HIGH - Components will render with missing or fallback colors

---

## Issues Found

### 1. Missing CSS Variables (CRITICAL)

The following variables are **referenced in components** but **NOT defined** in the refactored `globals.css`:

| Variable              | Used In                                                                                 | Impact                                                | Severity    |
| --------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| `--gradient-heading`  | StatsSection.tsx (2 refs)<br/>showcase/page.tsx (2 refs)<br/>media-kit/page.tsx (1 ref) | Gradient text effect fails, falls back to solid color | 🔴 CRITICAL |
| `--text-muted`        | StatsSection.tsx (1 ref)<br/>Hero.tsx (1 ref)                                           | Text becomes invisible or wrong color on all themes   | 🔴 CRITICAL |
| `--light-cyan`        | StageLighting.tsx (1 ref)                                                               | Stage cyan glow missing                               | 🔴 CRITICAL |
| `--light-cyan-medium` | StageLighting.tsx (1 ref)                                                               | Gradient intermediate stop missing                    | 🔴 CRITICAL |
| `--light-cyan-glow`   | StageLighting.tsx (1 ref)                                                               | Box shadow glow effect missing                        | 🔴 CRITICAL |
| `--light-gold`        | StageLighting.tsx (1 ref)                                                               | Stage gold lighting effect missing                    | 🔴 CRITICAL |
| `--light-gold-medium` | StageLighting.tsx (1 ref)                                                               | Gold gradient intermediate stop missing               | 🔴 CRITICAL |
| `--light-pink`        | StageLighting.tsx (1 ref)                                                               | Pink stage lighting missing                           | 🔴 CRITICAL |
| `--light-pink-subtle` | StageLighting.tsx (1 ref)                                                               | Pink gradient variant missing                         | 🔴 CRITICAL |
| `--badge-gold-bg`     | Hero.tsx (1 ref)                                                                        | Badge background broken                               | 🔴 CRITICAL |
| `--badge-gold-border` | Hero.tsx (1 ref)                                                                        | Badge border broken                                   | 🔴 CRITICAL |
| `--badge-gold-text`   | Hero.tsx (1 ref)                                                                        | Badge text color broken                               | 🔴 CRITICAL |

**Affected Files** (5 total):

- `components/StatsSection.tsx` - 3 missing vars
- `components/StageLighting.tsx` - 7 missing vars
- `components/Hero.tsx` - 4 missing vars
- `app/showcase/page.tsx` - 1 missing var (--gradient-heading)
- `app/media-kit/page.tsx` - 1 missing var (--gradient-heading)

---

### 2. Class Name Collisions & Specificity Issues

#### A. Global Element Selectors (Medium Risk)

The refactored `globals.css` applies broad element selectors that **may override Tailwind utilities**:

| Selector | New Styling                                                   | Potential Conflict                                         | Risk      |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| `h1`     | `border-bottom: 1px solid var(--border-color)`                | Components using Tailwind `border-0` or custom borders     | ⚠️ MEDIUM |
| `h2`     | `border-bottom: 1px solid var(--border-color)`                | Same as h1                                                 | ⚠️ MEDIUM |
| `h3`     | `text-transform: uppercase` + `font-family: var(--font-mono)` | Components expecting normal case + serif fonts             | ⚠️ MEDIUM |
| `button` | Default `.btn` styling implicitly applied                     | Not explicitly styled but `<button>` tags get global rules | ⚠️ MEDIUM |
| `p`      | `color: var(--text-secondary)`                                | Can override Tailwind color classes                        | ⚠️ MEDIUM |
| `a`      | `color: var(--accent-primary)` + `text-decoration: underline` | All links become underlined by default                     | ⚠️ MEDIUM |

**Example Risk**:

```tsx
// In a component:
<h1 className="text-3xl font-bold text-slate-900 border-0">Title</h1>
// Result: Still gets border-bottom from globals.css h1 selector (specificity issue)
```

#### B. CSS Class Usage (Low Risk - All Present)

The following CSS classes **are properly defined** and used correctly:

✅ `.card` - Used in cards, sections  
✅ `.badge` - Used in PortfolioCard.tsx  
✅ `.nav-link` - Used in Navbar.tsx  
✅ `.container` - Standard layout container  
✅ `.sidebar` - Sidebar layout system  
✅ `.theme-selector` - Theme selector component  
✅ `.btn` - Buttons (via inline styles mostly)

---

### 3. Variable Inheritance & Derived Variables (Low Risk)

The refactored `globals.css` uses derived variables correctly:

✅ `--text-heading: var(--text-primary)` - Properly inherits  
✅ `--text-body: var(--text-secondary)` - Properly inherits  
✅ `--text-label: var(--text-tertiary)` - Properly inherits  
✅ `--border-subtle: var(--border-color)` - Properly inherits  
✅ `--bg-muted: var(--bg-tertiary)` - Properly inherits

**No issues detected** in variable inheritance chain.

---

### 4. Selector Specificity Deep Dive

#### Global h1/h2/h3 Styling - Risk Analysis

**Current Refactored CSS**:

```css
h1 {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  font-size: 2.5rem;
}

h3 {
  text-transform: uppercase;
  font-family: var(--font-mono);
}
```

**Problem**: These will apply to ALL `<h1>`, `<h2>`, `<h3>` tags across the entire app, including those with Tailwind classes.

**Example of Breakage**:

**Component Code**:

```tsx
<h1 className="text-4xl font-bold text-accent-600 no-underline">
  Portfolio Title
</h1>
```

**What Happens**:

- Tailwind's `text-4xl` sets `font-size: 2.5rem`
- Tailwind's `text-accent-600` sets color
- **BUT** globals.css `h1` adds `border-bottom: 1px solid...` anyway ← **UNWANTED**
- Global `h1` `font-size: 2.5rem` conflicts with Tailwind's `text-4xl`

**Files at High Risk**:

- [app/showcase/page.tsx](app/showcase/page.tsx#L34) - Has custom `h1`, `h2` with Tailwind classes
- [app/media-kit/page.tsx](app/media-kit/page.tsx#L93) - Multiple `h1`, `h2`, `h3` with Tailwind
- [app/dance/page.tsx](app/dance/page.tsx) - Likely has heading conflicts
- [components/Hero.tsx](components/Hero.tsx) - Uses styled headings
- [components/StatsSection.tsx](components/StatsSection.tsx) - Multiple headings

---

## Recommendations

### IMMEDIATE ACTIONS (Fix Critical Issues)

#### 1. Add Missing CSS Variables to globals.css

Add the following to the **LIGHT THEME** section (after `--cta-gradient`):

```css
/* Light Theme - Gradient & Special Effects */
--gradient-heading: linear-gradient(
  135deg,
  var(--accent-vibrant),
  var(--accent-primary)
);
--text-muted: #999999;
--light-cyan: #0ef;
--light-cyan-medium: rgba(0, 238, 255, 0.6);
--light-cyan-glow: rgba(0, 238, 255, 0.4);
--light-gold: #ffd700;
--light-gold-medium: rgba(255, 215, 0, 0.5);
--light-pink: #ff69b4;
--light-pink-subtle: rgba(255, 105, 180, 0.4);
--badge-gold-bg: rgba(255, 215, 0, 0.15);
--badge-gold-border: #ffd700;
--badge-gold-text: #b8860b;
```

Add overrides to **DARK THEME** section (after overlay vars):

```css
/* Dark Theme - Gradient & Special Effects */
--gradient-heading: linear-gradient(135deg, var(--accent-vibrant), #ff9575);
--text-muted: #666666;
--light-cyan: #06b6d4;
--light-cyan-medium: rgba(6, 182, 212, 0.6);
--light-cyan-glow: rgba(6, 182, 212, 0.4);
--light-gold: #fbbf24;
--light-gold-medium: rgba(251, 191, 36, 0.5);
--light-pink: #f472b6;
--light-pink-subtle: rgba(244, 114, 182, 0.4);
--badge-gold-bg: rgba(251, 191, 36, 0.15);
--badge-gold-border: #fbbf24;
--badge-gold-text: #b45309;
```

Add overrides to **EARTHY THEME** section (after overlay vars):

```css
/* Earthy Theme - Gradient & Special Effects */
--gradient-heading: linear-gradient(135deg, var(--accent-vibrant), #d97a47);
--text-muted: #a89f94;
--light-cyan: #0891b2;
--light-cyan-medium: rgba(8, 145, 178, 0.6);
--light-cyan-glow: rgba(8, 145, 178, 0.4);
--light-gold: #b8860b;
--light-gold-medium: rgba(184, 134, 11, 0.5);
--light-pink: #c2185b;
--light-pink-subtle: rgba(194, 24, 91, 0.4);
--badge-gold-bg: rgba(184, 134, 11, 0.15);
--badge-gold-border: #b8860b;
--badge-gold-text: #6f4e37;
```

**Impact**: Fixes 12 missing variable errors across 5 component files

---

#### 2. Scope h1/h2 Styling to Prevent Conflicts

**Option A** (Recommended): Use CSS specificity selector

Modify the `h1`, `h2`, `h3` rules to only apply to **content pages** (not components):

```css
/* ========== TYPOGRAPHY ========== */

/* Global page headings only - not component headings */
.article-main h1,
.main-content h1,
.article-main h2,
.main-content h2 {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.article-main h1 {
  font-size: 2.5rem;
}

.article-main h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
}

/* h3 styling can stay global (usually safe) */
h3 {
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: var(--font-mono);
}
```

**Option B** (Alternative): Remove global h1/h2 borders entirely

Delete the `border-bottom` styling from `h1`, `h2` rules and rely on components to add borders where needed.

**Option C** (Testing-based): Use CSS not() selector

```css
h1:not([class]),
h2:not([class]) {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}
```

**Recommendation**: Option A + Option C combined = safest approach

---

#### 3. Add Explicit Link Reset for nav-link

Current globals.css makes **all** `<a>` tags underlined. Override this for navigation:

```css
/* In NAVIGATION section */
.nav-link {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  border-bottom: 1px solid transparent;
  padding-bottom: 0.25rem;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
  text-decoration: none; /* ← ADD THIS */
}
```

---

### SECONDARY ACTIONS (Code Quality)

#### 4. High-Risk Files to Test

After fixes, perform **visual regression testing** on:

1. **[app/showcase/page.tsx](app/showcase/page.tsx)** - Multiple h1/h2 with gradients
   - Test: Gradient headings render correctly
   - Test: No double borders on heading elements
   - Test: Mobile responsive spacing correct

2. **[components/Hero.tsx](components/Hero.tsx)** - Badge styling + headings
   - Test: Gold badge displays correctly
   - Test: All three themes: gold badge visible
   - Test: Glow effects on stage elements work

3. **[components/StageLighting.tsx](components/StageLighting.tsx)** - All stage lighting
   - Test: Cyan glow visible (especially dark theme)
   - Test: Gold and pink lighting render correctly
   - Test: Shadows/glows don't break on mobile

4. **[components/StatsSection.tsx](components/StatsSection.tsx)** - Gradient headings
   - Test: Text gradient (background-clip) works across themes
   - Test: Fallback colors look acceptable if gradient fails

5. **[app/media-kit/page.tsx](app/media-kit/page.tsx)** - Multiple headings
   - Test: h1, h2, h3 all render with correct colors
   - Test: No unexpected borders on styled headings

#### 5. Document Theme Variable Coverage

Create a `THEME_VARIABLES_CHECKLIST.md` file documenting:

- Each CSS variable name
- Which themes define it
- Default fallback value
- Components using it

---

## Test Checklist

Before deploying, verify:

- [ ] Build completes with 0 errors
- [ ] All three themes load (Light, Dark, Earthy)
- [ ] No console CSS errors about undefined variables
- [ ] Headings render correctly across all pages
- [ ] Badge styling visible in Hero component
- [ ] Stage lighting effects display (StageLighting.tsx)
- [ ] Navigation links have proper underlines only on hover
- [ ] Mobile responsive breakpoints work (768px, 480px)
- [ ] Print styles don't break (if used)

---

## Detailed Variable Reference

### Missing Variables - Full Definitions Needed

**For Light Theme** (default):

```css
--gradient-heading: Creates vibrant gradient effect on headings
  --text-muted: Lighter gray for secondary text (comments, timestamps)
  --light-cyan: Bright cyan (#0ef for neon effect)
  --light-cyan-medium: Semi-transparent cyan --light-cyan-glow: Cyan glow for
  box-shadow effects --light-gold: Gold/yellow accent (#ffd700)
  --light-gold-medium: Semi-transparent gold --light-pink: Hot pink/magenta
  --light-pink-subtle: Semi-transparent pink --badge-gold-bg: Light gold
  background (high transparency) --badge-gold-border: Gold border color
  --badge-gold-text: Dark gold text color;
```

**For Dark Theme**:

```css
--gradient-heading: Brighter gradient (light -> bright) --text-muted: Darker
  gray (higher contrast in dark mode) --light- *: Brighter neon variants for
  visibility;
```

**For Earthy Theme**:

```css
--gradient-heading:
  Muted earth tones --text-muted: Earthy gray-brown --light- *: Natural,
  muted variants (browns, warm tones);
```

---

## Files Summary

### Components with Issues

| File                                                         | Issue                                                   | Variables | Classes     | Severity    |
| ------------------------------------------------------------ | ------------------------------------------------------- | --------- | ----------- | ----------- |
| [components/StatsSection.tsx](components/StatsSection.tsx)   | Missing `--gradient-heading`, `--text-muted`            | 2 missing | ✅ OK       | 🔴 CRITICAL |
| [components/StageLighting.tsx](components/StageLighting.tsx) | Missing cyan/gold/pink lighting vars                    | 7 missing | ✅ OK       | 🔴 CRITICAL |
| [components/Hero.tsx](components/Hero.tsx)                   | Missing badge vars, `--text-muted`                      | 4 missing | ✅ OK       | 🔴 CRITICAL |
| [app/showcase/page.tsx](app/showcase/page.tsx)               | h1/h2 border conflicts, missing `--gradient-heading`    | 1 missing | ⚠️ CONFLICT | ⚠️ MEDIUM   |
| [app/media-kit/page.tsx](app/media-kit/page.tsx)             | h1/h2/h3 border conflicts, missing `--gradient-heading` | 1 missing | ⚠️ CONFLICT | ⚠️ MEDIUM   |
| [app/dance/page.tsx](app/dance/page.tsx)                     | Likely h1/h2 conflicts (not checked)                    | Unknown   | Unknown     | ⚠️ MEDIUM   |
| [components/Navbar.tsx](components/Navbar.tsx)               | Link underlines (global `a` selector)                   | 0 missing | ⚠️ CONFLICT | ⚠️ MEDIUM   |
| [components/PortfolioCard.tsx](components/PortfolioCard.tsx) | No conflicts detected                                   | ✅ 0      | ✅ OK       | ✅ NONE     |
| [components/Sidebar.tsx](components/Sidebar.tsx)             | No conflicts detected                                   | ✅ 0      | ✅ OK       | ✅ NONE     |

---

## Conclusion

**The refactored globals.css has introduced several regressions that require immediate fixes**:

1. **12 missing CSS variables** will cause visual glitches immediately
2. **Global element selectors** (h1, h2, a) will create specificity conflicts with component-level Tailwind classes
3. **Gradient effects** will fail silently (fallback to solid colors)
4. **Stage lighting effects** will be completely invisible

**Estimated Fix Time**: 30 minutes  
**Priority**: 🔴 **URGENT** - Deploy only after addressing critical issues

---

**Generated by**: CSS Audit Tool  
**Report Version**: 1.0  
**Status**: Ready for Implementation
