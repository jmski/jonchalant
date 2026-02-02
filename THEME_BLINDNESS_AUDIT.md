# Theme-Blindness Audit Report

## Summary

Found **31 violations** of CSS variable usage across **11 component/page files**. Components are using hardcoded colors that don't react to theme changes.

---

## Critical Violations by Category

### 1. Hardcoded RGBA Colors (Hero Overlay & Lighting)

**Files**: `Hero.tsx`, `StageLighting.tsx`, `MusicVisualizer.tsx`, `LoadingSpinner.tsx`

| Violation                | Current          | Issue                   | Replacement              |
| ------------------------ | ---------------- | ----------------------- | ------------------------ |
| `rgba(10, 14, 39, 0.8)`  | Hero overlay     | Hardcoded default theme | Should use CSS variable  |
| `rgba(26, 31, 58, 0.5)`  | Hero overlay     | Hardcoded default theme | Should use CSS variable  |
| `rgba(0, 217, 255, 0.4)` | Cyan lighting    | Hardcoded accent color  | Use `--accent-secondary` |
| `rgba(0, 217, 255, 0.3)` | Cyan glow        | Hardcoded accent color  | Use `--accent-secondary` |
| `rgba(255, 215, 0, 0.6)` | Gold lighting    | Hardcoded accent color  | Use `--accent-primary`   |
| `rgba(255, 0, 110, 0.2)` | Pink lighting    | Hardcoded accent color  | Use `--accent-tertiary`  |
| `rgba(10, 6, 20, 0.4)`   | Dark overlay     | Hardcoded default theme | Should use CSS variable  |
| `rgba(10, 6, 20, 0.3)`   | Music visualizer | Hardcoded default theme | Should use CSS variable  |

### 2. Hardcoded Hex Colors in Inline Styles

**Files**: `CTASection.tsx`, `Navbar.tsx`, `InteractiveTimeline.tsx`

| File                      | Line | Hardcoded Color          | Context                   | Replacement            |
| ------------------------- | ---- | ------------------------ | ------------------------- | ---------------------- |
| `CTASection.tsx`          | 33   | `#ffd700`                | CTA button gradient       | Use `--accent-primary` |
| `CTASection.tsx`          | 33   | `#ffed4e`                | CTA button gradient light | Needs new variable     |
| `CTASection.tsx`          | 33   | `#0a0614`                | CTA text color            | Use `--bg-primary`     |
| `Navbar.tsx`              | 41   | `#ffd700`                | Theme button (default)    | Use CSS variable       |
| `Navbar.tsx`              | 42   | `#4f46e5`                | Theme button (executive)  | Use CSS variable       |
| `Navbar.tsx`              | 43   | `#ff8c42`                | Theme button (midnight)   | Use CSS variable       |
| `InteractiveTimeline.tsx` | 22   | `#ffd700`                | Performance badge         | Use `--accent-primary` |
| `InteractiveTimeline.tsx` | 22   | `rgba(255, 215, 0, 0.1)` | Performance badge BG      | Use CSS variable       |

### 3. Tailwind Color Classes (Non-Semantic)

**Files**: `Navbar.tsx`, `Hero.tsx`, `PortfolioCard.tsx`, `DanceFilter.tsx`, `SectionDivider.tsx`, `layout.tsx`

| File                 | Class                            | Issue                     | Replacement                                         |
| -------------------- | -------------------------------- | ------------------------- | --------------------------------------------------- |
| `layout.tsx`         | `text-slate-50`                  | Hardcoded light text      | Use `text-light` class or inline `var(--text-body)` |
| `Hero.tsx`           | `bg-cyan-400/5`, `bg-cyan-500/5` | Hardcoded cyan tint       | Use theme variables                                 |
| `Hero.tsx`           | `bg-yellow-400/5`                | Hardcoded yellow tint     | Use theme variables                                 |
| `PortfolioCard.tsx`  | `bg-slate-800`                   | Hardcoded dark card BG    | Use `var(--card-bg)`                                |
| `Navbar.tsx`         | `bg-slate-400`                   | Fallback color            | Use CSS variable                                    |
| `SectionDivider.tsx` | `text-slate-800`                 | Hardcoded text color (2x) | Use `var(--text-heading)`                           |
| `DanceFilter.tsx`    | `text-slate-600`                 | Hardcoded text color      | Use `var(--text-secondary)`                         |
| `DanceFilter.tsx`    | `text-slate-400`                 | Dark mode fallback        | Use `var(--text-secondary)`                         |

### 4. Hardcoded Gradients in Inline Styles

**Files**: `CTASection.tsx`, `StageLighting.tsx`

| Violation                                                                       | Current      | Issue                                     |
| ------------------------------------------------------------------------------- | ------------ | ----------------------------------------- |
| `linear-gradient(135deg, #ffd700, #ffed4e)`                                     | CTA gradient | Uses hardcoded colors instead of CSS vars |
| `linear-gradient(to bottom, rgba(10, 14, 39, 0.8), rgba(26, 31, 58, 0.5), ...)` | Hero overlay | Hardcoded gradient for overlay            |

### 5. Undefined CSS Variables Used

**Files**: `Hero.tsx`, `CTASection.tsx`, `StatsSection.tsx`

| Variable                  | Used In                  | Status         | Action         |
| ------------------------- | ------------------------ | -------------- | -------------- |
| `--badge-gold-bg`         | Hero badge               | ❌ Not defined | Need to create |
| `--badge-gold-border`     | Hero badge               | ❌ Not defined | Need to create |
| `--badge-gold-text`       | Hero badge               | ❌ Not defined | Need to create |
| `--text-light`            | layout.tsx               | ❌ Not defined | Need to create |
| `--text-muted`            | Hero, StatsSection       | ❌ Not defined | Need to create |
| `--border-subtle`         | CTASection               | ❌ Not defined | Need to create |
| `--bg-muted`              | CTASection               | ❌ Not defined | Need to create |
| `--text-gradient-heading` | CTASection, StatsSection | ❌ Not defined | Need to create |

---

## Files Affected (11 total)

### High Priority (4 files)

1. **Hero.tsx** - 8 violations (RGBA colors, Tailwind classes, undefined vars)
2. **StageLighting.tsx** - 6 violations (RGBA colors with accent colors)
3. **CTASection.tsx** - 5 violations (Hardcoded gradient, undefined vars)
4. **Navbar.tsx** - 4 violations (Hardcoded theme colors, Tailwind fallback)

### Medium Priority (4 files)

5. **layout.tsx** - 1 violation (Hardcoded text color)
6. **PortfolioCard.tsx** - 1 violation (Hardcoded card BG)
7. **SectionDivider.tsx** - 2 violations (Hardcoded text colors)
8. **DanceFilter.tsx** - 2 violations (Hardcoded text colors)

### Lower Priority (3 files)

9. **MusicVisualizer.tsx** - 2 violations (RGBA colors)
10. **LoadingSpinner.tsx** - 1 violation (RGBA color overlay)
11. **InteractiveTimeline.tsx** - 2 violations (Hardcoded colors)
12. **Toast.tsx** - 1 violation (Hardcoded text-white)
13. **CollaborationForm.tsx** - 1 violation (Hardcoded text-white)
14. **contact/page.tsx** - 1 violation (Hardcoded text-white)

---

## Required CSS Variables to Add to globals.css

```css
/* Badge colors for hero accent */
--badge-gold-bg: rgba(255, 215, 0, 0.1);
--badge-gold-border: 1px solid rgba(255, 215, 0, 0.3);
--badge-gold-text: var(--text-accent);

/* Text utilities */
--text-light: var(--text-body);
--text-muted: var(--text-secondary);

/* Background utilities */
--bg-muted: var(--bg-tertiary);
--border-subtle: var(--border-color-light);

/* Gradients */
--text-gradient-heading: var(--gradient-heading);

/* Overlay utilities */
--overlay-dark: rgba(10, 14, 39, 0.8);
--overlay-dark-medium: rgba(26, 31, 58, 0.5);

/* Lighting effects (theme-aware) */
--light-cyan: rgba(0, 217, 255, 0.4);
--light-gold: rgba(255, 215, 0, 0.6);
--light-pink: rgba(255, 0, 110, 0.2);
```

---

## Recommended Fixes by Priority

### Phase 1: Remove Tailwind Color Classes (Quick)

- [ ] Replace `text-slate-50` with inline `var(--text-body)`
- [ ] Replace `text-slate-800` with inline `var(--text-heading)`
- [ ] Replace `text-slate-600` with inline `var(--text-secondary)`
- [ ] Replace `text-slate-400` with inline `var(--text-secondary)`
- [ ] Replace `bg-slate-800` with inline `var(--card-bg)`
- [ ] Replace `bg-slate-400` with CSS variable

### Phase 2: Add Missing CSS Variables (Medium)

- [ ] Add all variables listed above to globals.css
- [ ] Update all three theme blocks (Default, Executive, Midnight)
- [ ] Test that all variables work in all themes

### Phase 3: Replace Hardcoded Inline Colors (Complex)

- [ ] Hero.tsx: Replace RGBA overlays with CSS variables
- [ ] StageLighting.tsx: Replace all RGBA lighting effects
- [ ] CTASection.tsx: Replace gradient with CSS variable
- [ ] Navbar.tsx: Replace theme button colors with CSS variables
- [ ] InteractiveTimeline.tsx: Replace badge colors with CSS variables

### Phase 4: Validation & Testing

- [ ] Switch between all three themes
- [ ] Verify no hardcoded colors remain
- [ ] Check visual appearance in each theme
- [ ] Run build to validate

---

## Impact

- **Files to modify**: 14 components/pages
- **Total violations**: 31 instances
- **New variables needed**: 11
- **Estimated effort**: 2-3 hours for complete refactor

**End result**: 100% theme-reactive design where every color adapts to the selected theme.
