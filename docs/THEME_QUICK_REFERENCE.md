# Theme System - Quick Reference

## Theme Switching

The navbar now displays three theme selector buttons. Click to toggle:

- **PAPER** - Default light theme
- **BLUEPRINT** - Dark minimalist theme
- **MANUAL** - Earthy vintage theme

Your theme preference is saved automatically and persists on reload.

## Color Palettes at a Glance

### Paper Theme (Light, Professional)

```
Background: #f9f9f9 (off-white)
Cards:      #ffffff (white)
Text:       #121212 (charcoal)
Borders:    #e5e5e5 (light gray)
Accents:    #1a1a1a (dark charcoal)
```

### Blueprint Theme (Dark, Technical)

```
Background: #0a0a0a (black)
Cards:      #1a1a1a (dark gray)
Text:       #ffffff (white)
Borders:    #3a3a3a (medium gray)
Accents:    #ffffff (white)
```

### Manual Theme (Warm, Vintage)

```
Background: #e2ddd0 (clay/olive)
Cards:      #f0ede8 (cream)
Text:       #3c3633 (brown)
Borders:    #c9c4ba (tan)
Accents:    #8b7355 (bronze)
```

## Using CSS Variables in Components

All colors are CSS variables that automatically update with theme:

```tsx
// In component styles
style={{
  backgroundColor: 'var(--bg-secondary)',
  borderColor: 'var(--border-color)',
  color: 'var(--text-primary)'
}}

// In Tailwind classes - use color utilities that reference variables
className="bg-white text-slate-900"  // These use var() internally
```

## Available CSS Variables

### Color Variables

```css
--bg-primary          /* Main page background */
--bg-secondary        /* Cards, containers */
--bg-tertiary         /* Hover states, muted areas */
--text-primary        /* Headings, main text */
--text-secondary      /* Body text, secondary content */
--text-tertiary       /* Labels, muted text */
--border-color        /* Standard borders */
--border-accent       /* Hover/active borders */
--accent-primary      /* Primary buttons, links */
--accent-secondary    /* Secondary accents */
```

### Typography Variables

```css
--font-serif:
  "Georgia", "Garamond", serif --font-mono: "Departure Mono", "IBM Plex Mono",
  monospace;
```

### Spacing Variables

```css
--gutter: 1.5rem /* Container padding */ --column-gap: 2rem
  /* Multi-column gap */;
```

### Timing Variables

```css
--transition-fast: 150ms ease-in-out --transition-base: 250ms ease-in-out;
```

## Component Classes

All components use `.theme-button`, `.nav-link`, `.card`, `.btn`, etc. styling that automatically respects the active theme.

### Button Classes

- `.btn` - Standard button
- `.btn-primary` - Primary action button
- `.btn-outline` - Outlined button variant

### Container Classes

- `.card` - Content card
- `.section` - Section container
- `.card-outlined` - Transparent card with border

### Typography Classes

- `h1, h2, h3, etc.` - Monospace headings with theme colors
- `p` - Serif body text

## Troubleshooting

**Theme not persisting on reload?**

- Check that localStorage is enabled
- Check browser console for JavaScript errors
- Clear browser cache and try again

**Colors not updating?**

- Make sure you're using `var(--variable-name)` syntax
- Verify the theme button shows "active" state
- Check that `data-theme` attribute is set on `<html>` element

**Flash of unstyled content (FOUC)?**

- The layout.tsx includes FOUC prevention script
- This script runs before React hydration to set the correct theme
- If you still see flashing, check that the script tag is in `<head>`

## For Developers

### Adding a New Theme

1. Add new `html[data-theme="name"]` rule in `globals.css`
2. Define all CSS variables for the new theme
3. Add theme to `THEMES` array in `Navbar.tsx`
4. Theme will appear in theme selector automatically

### Customizing Colors

- Edit CSS variable values in `globals.css`
- All components automatically inherit new colors
- No need to update individual components

### Using in New Components

```tsx
// Always use CSS variables, not hardcoded colors
const MyComponent = () => (
  <div
    style={{
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      borderColor: "var(--border-color)",
    }}
  >
    Content
  </div>
);
```
