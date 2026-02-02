# Theme Contribution Guide

Add a new theme to the jonchalon portfolio in 4 steps.

---

## Overview

The theming system uses CSS custom properties (CSS variables) stored in `app/globals.css`. Each theme is a named `html[data-theme]` block with complete color overrides.

**Current Themes:**

- `default` - Dark mode (purple/gold/cyan)
- `executive` - Light mode (indigo/cyan accents)
- `midnight` - Warm dark mode (orange accents)

---

## Step 1: Define Theme CSS Variables

### 1.1 Determine Your Color Palette

Choose 3-5 core colors for your theme:

- **Primary background** (for body)
- **Secondary background** (for cards, nav)
- **Text colors** (heading, body, secondary, accent)
- **Accents** (primary, secondary, tertiary)
- **Borders** and **shadows**

**WCAG Contrast Requirements:**

- Body text on background: **4.5:1** (AA) or **7:1** (AAA)
- Large text (18pt+): **3:1** minimum
- UI components: **3:1** minimum

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to validate.

### 1.2 Add Theme Block to `globals.css`

**Location:** Bottom of `app/globals.css`, after Midnight theme

**Template:**

```css
/* ========== YOUR-THEME-NAME THEME ========== */
html[data-theme="your-theme-name"] {
  /* Base & Surface */
  --bg-primary: #YOUR_HEX;
  --bg-secondary: #YOUR_HEX;
  --bg-tertiary: #YOUR_HEX;

  /* ========== PRIMARY ACCENT COLORS ========== */
  --accent-primary: #YOUR_HEX;
  --accent-secondary: #YOUR_HEX;
  --accent-tertiary: #YOUR_HEX;

  /* ========== TEXT COLORS ========== */
  --text-heading: #YOUR_HEX;
  --text-body: #YOUR_HEX;
  --text-secondary: #YOUR_HEX;
  --text-accent: #YOUR_HEX;
  --text-accent-bright: #YOUR_HEX;
  --text-accent-secondary: #YOUR_HEX;
  --text-success: #YOUR_HEX;
  --text-error: #YOUR_HEX;

  /* ========== BORDER COLORS ========== */
  --border-color: #YOUR_HEX;
  --border-color-light: #YOUR_HEX;
  --border-accent: #YOUR_HEX;
  --border-accent-secondary: #YOUR_HEX;

  /* ========== CARD STYLING ========== */
  --card-bg: #YOUR_HEX;
  --card-border: #YOUR_HEX;

  /* ========== SHADOWS ========== */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.8);
  --shadow-accent: 0 0 20px rgba(YOUR_R, YOUR_G, YOUR_B, 0.3);
  --shadow-accent-lg: 0 0 30px rgba(YOUR_R, YOUR_G, YOUR_B, 0.4);

  /* ========== BUTTON COLORS ========== */
  --btn-primary-text: #YOUR_HEX;
  --btn-secondary-text: #YOUR_HEX;

  /* ========== GRADIENT ========== */
  --gradient-heading: linear-gradient(to right, #YOUR_HEX, #YOUR_HEX);
  --gradient-accent: linear-gradient(to right, #YOUR_HEX, #YOUR_HEX);
  --cta-gradient: linear-gradient(to right, #YOUR_HEX, #YOUR_HEX);

  /* ========== FOCUS MANAGEMENT (WCAG AAA) ========== */
  --focus-ring-color: #YOUR_HEX;
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;

  /* ========== CATEGORY COLORS ========== */
  --category-choreography-bg: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
  --category-choreography-border: #YOUR_HEX;
  --category-performance-bg: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
  --category-performance-border: #YOUR_HEX;
  --category-freestyle-bg: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
  --category-freestyle-border: #YOUR_HEX;
  --category-breakthrough-bg: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
  --category-breakthrough-border: #YOUR_HEX;
  --category-collaboration-bg: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
  --category-collaboration-border: #YOUR_HEX;

  /* ========== UTILITY/OVERLAY COLORS ========== */
  --overlay-dark: rgba(YOUR_R, YOUR_G, YOUR_B, 0.8);
  --overlay-dark-medium: rgba(YOUR_R, YOUR_G, YOUR_B, 0.5);

  /* ========== LIGHTING EFFECTS (for StageLighting component) ========== */
  --light-cyan: rgba(YOUR_R, YOUR_G, YOUR_B, 0.4);
  --light-cyan-medium: rgba(YOUR_R, YOUR_G, YOUR_B, 0.2);
  --light-cyan-glow: rgba(YOUR_R, YOUR_G, YOUR_B, 0.3);
  --light-gold: rgba(YOUR_R, YOUR_G, YOUR_B, 0.6);
  --light-gold-medium: rgba(YOUR_R, YOUR_G, YOUR_B, 0.2);
  --light-pink: rgba(YOUR_R, YOUR_G, YOUR_B, 0.2);
  --light-pink-subtle: rgba(YOUR_R, YOUR_G, YOUR_B, 0.05);
}
```

---

## Step 2: Add Theme Button to Navigation

### 2.1 Update `Navbar.tsx`

Add your theme to the `getThemeColor()` function:

```tsx
function ThemeButton({
  theme,
  isActive,
  onClick,
}: {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}) {
  const getThemeColor = () => {
    if (theme === "default") return "var(--accent-primary)";
    if (theme === "executive") return "var(--accent-primary)";
    if (theme === "midnight") return "var(--accent-secondary)";
    if (theme === "your-theme-name") return "var(--accent-primary)"; // ← ADD THIS
    return "var(--text-secondary)";
  };
  // ... rest of component
}
```

### 2.2 Update `useTheme.ts`

Update the `Theme` type to include your new theme:

```tsx
export type Theme = "default" | "executive" | "midnight" | "your-theme-name";
```

---

## Step 3: Test the Theme

### 3.1 Start Development Server

```bash
npm run dev
```

### 3.2 Manual Testing Checklist

- [ ] **Theme Switching**: Navbar button appears and switches theme smoothly
- [ ] **Page Load**: Theme persists on refresh (localStorage working)
- [ ] **First Visit**: System color scheme is respected (prefers-color-scheme)
- [ ] **All Pages**: Visit each page and verify colors render correctly
  - Home
  - Dance Portfolio
  - Showcase
  - Collaborations
  - Media Kit
  - About
  - Contact

### 3.3 Accessibility Testing

**Keyboard Navigation:**

```bash
# After page loads, press Tab repeatedly
# Verify:
# - Focus ring is visible (uses --focus-ring-color)
# - Can reach all interactive elements
# - Skip-to-content link appears on first Tab
```

**Screen Reader:**

- Use [NVDA](https://www.nvaccess.org/) (Windows) or VoiceOver (Mac)
- Verify all headings are announced
- Verify skip link is announced first

**Contrast Validation:**

```bash
# Use Chrome DevTools
# 1. Right-click → Inspect
# 2. Rendering tab → Emulate vision deficiencies
# Test all 3 types: Protanopia, Deuteranopia, Tritanopia
```

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

- Test text-body on bg-primary → Should be 7:1 minimum
- Test accent colors used for UI → Should be 3:1 minimum

### 3.4 Reduced Motion Testing

**Mac:**

1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"
3. Reload page
4. Verify animations are disabled

**Windows:**

1. Settings → Ease of Access → Display
2. Enable "Show animations"
3. Reload page
4. Verify animations are disabled

---

## Step 4: Update Documentation

### 4.1 Add to `EXECUTIVE_THEME_DOCUMENTATION_INDEX.md`

In the "Available Themes" section, add:

```markdown
### Your Theme Name

- **Background**: Dark/Light/Warm
- **Primary Color**: #YOUR_HEX
- **Accent**: Brief description
- **Best For**: Use case or audience
```

### 4.2 Update `EXECUTIVE_THEME_CSS_VARIABLES_REFERENCE.md`

Add your theme's variable values to the reference table.

### 4.3 Run Build Test

```bash
npm run build
```

Verify:

- [ ] Build completes with 0 errors
- [ ] All routes prerender successfully
- [ ] No type errors

---

## Color Palette Examples

### Example 1: High-Contrast (Accessibility-Focused)

```css
--bg-primary: #ffffff; /* Pure white */
--bg-secondary: #f5f5f5; /* Light gray */
--text-heading: #000000; /* Pure black (7:1 contrast) */
--text-body: #1a1a1a; /* Near-black (8.59:1 contrast) */
--accent-primary: #0066cc; /* Bold blue */
--focus-ring-color: #ff0000; /* Red (highly visible) */
```

### Example 2: Pastel (Soft, Calming)

```css
--bg-primary: #f5e6f0; /* Soft lavender */
--bg-secondary: #fffafc; /* Soft pink-white */
--text-heading: #3d2645; /* Deep plum */
--text-body: #5a4d6f; /* Muted purple */
--accent-primary: #d4a5d4; /* Light purple */
--focus-ring-color: #9b5fa5; /* Saturated purple */
```

### Example 3: Vibrant (High Energy)

```css
--bg-primary: #1a1a2e; /* Deep navy */
--bg-secondary: #16213e; /* Dark blue */
--text-heading: #00ff9f; /* Neon green */
--text-body: #00ffd5; /* Cyan */
--accent-primary: #ff006e; /* Hot pink */
--focus-ring-color: #00ff9f; /* Neon green */
```

---

## Troubleshooting

### Theme Doesn't Switch

- Check browser console for errors
- Verify `data-theme` attribute is set on `<html>`
- Clear localStorage: `localStorage.clear()`
- Restart dev server: `npm run dev`

### Colors Look Different on Different Pages

- Verify all CSS variables are defined in your theme block
- Check if page has inline `style` prop overriding theme
- Use DevTools → Elements → Computed to inspect actual CSS variable value

### Focus Ring Invisible

- Check `--focus-ring-color` has sufficient contrast with current background
- Verify `:focus-visible` CSS rule is applied
- Test with `--focus-ring-color: #ff0000` (bright red) to debug

### Build Fails After Adding Theme

- Verify CSS syntax (no missing semicolons, closing braces)
- Check all hex colors are valid format: `#RRGGBB` or `#RGB`
- Run `npm run lint` to catch CSS issues

---

## Best Practices

1. **Accessibility First**: Always test contrast ratios before deploying
2. **Document Rationale**: Add comment explaining theme purpose
3. **Test Dark/Light**: If adding a light theme, test all pages
4. **Use Semantic Names**: Name themes by purpose, not just color (e.g., "high-contrast" not "red-theme")
5. **Test Keyboard Navigation**: All interactive elements must be focusable
6. **Test with Real Users**: Get feedback from people with vision differences

---

## Questions?

Refer to:

- [EXECUTIVE_THEME_CSS_VARIABLES_REFERENCE.md](./EXECUTIVE_THEME_CSS_VARIABLES_REFERENCE.md) for complete variable documentation
- [EXECUTIVE_THEME_ACCESSIBILITY_REPORT.md](./EXECUTIVE_THEME_ACCESSIBILITY_REPORT.md) for WCAG compliance
- [EXECUTIVE_THEME_VISUAL_TEST_GUIDE.md](./EXECUTIVE_THEME_VISUAL_TEST_GUIDE.md) for testing procedures
