# Navigation Architecture Quick Reference

## How It Works

### Route Detection

Your site automatically switches layouts based on the current URL:

```
/                    → Full-screen Table of Contents (ToC)
/about, /dance, etc  → Sidebar Navigation + Main Content
```

## Visual Appearance

### Home Page (`/`)

- **No navbar, no sidebar**
- Centered title: "JONCHALON"
- Subtitle: "Dance Artist & Digital Creator"
- Grouped navigation sections with bold headings
- Organized like a book's table of contents
- Links styled in monospace, orange on hover

### Content Pages (`/about`, `/dance`, etc.)

- **Fixed sidebar on left** (250px)
- **Main content on right** (flexible)
- **Vertical line** separating sidebar from content
- Sidebar shows all sections + active page highlighted
- Theme toggle in sidebar footer
- Mobile: Hamburger menu (☰) toggles sidebar

## Orange Accent Color

Used for all interactive elements and active states:

| Theme      | Color   | Purpose                             |
| ---------- | ------- | ----------------------------------- |
| **Light**  | #FF5F1F | Vibrant orange                      |
| **Dark**   | #FF7043 | Lighter orange for dark backgrounds |
| **Earthy** | #D97A47 | Muted rust orange                   |

## Files to Know

| File                              | Purpose                            |
| --------------------------------- | ---------------------------------- |
| `components/RouteAwareLayout.tsx` | Detects route & switches layouts   |
| `components/TableOfContents.tsx`  | Home page navigation display       |
| `components/Sidebar.tsx`          | Content page sidebar               |
| `app/globals.css`                 | All layout & orange accent styles  |
| `app/layout.tsx`                  | Root layout using RouteAwareLayout |

## CSS Classes

### Table of Contents (Home)

```css
.toc-container      /* Full-screen wrapper */
.toc-content        /* Centered content (max 800px) */
.toc-header         /* Title section */
.toc-section        /* Navigation section */
.toc-links          /* Link list */
```

### Sidebar Layout (Content Pages)

```css
.layout-with-sidebar  /* Grid: sidebar | content */
.sidebar              /* Fixed left sidebar */
.main-content         /* Scrollable content area */
.sidebar-toggle       /* Mobile menu button */
.sidebar-overlay      /* Mobile overlay (click to close) */
```

## Responsive Behavior

| Device                      | Layout                                |
| --------------------------- | ------------------------------------- |
| **Desktop** (>1024px)       | Sidebar always visible                |
| **Tablet** (768px - 1024px) | Sidebar hidden, toggle button visible |
| **Mobile** (<768px)         | Sidebar slides in from left           |

## Color Usage in Components

### Orange Accent Throughout

- **Links**: Normal state, hover state
- **Active sidebar item**: Text color + left border
- **Theme buttons**: Border on hover, filled when active
- **Focus indicators**: Skip-to-content link
- **Hover states**: All interactive elements

### Example: Sidebar Link Active State

```tsx
style={{
  color: isActive ? 'var(--accent-vibrant)' : 'var(--text-secondary)',
  backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
  borderLeftColor: isActive ? 'var(--accent-vibrant)' : 'transparent',
}}
```

## Typography

| Element              | Font      | Size                             | Theme-Specific     |
| -------------------- | --------- | -------------------------------- | ------------------ |
| **ToC Title**        | Serif     | 3rem (desktop), 1.75rem (mobile) | Color from theme   |
| **ToC Sections**     | Serif     | 1.25rem                          | Color from theme   |
| **ToC Links**        | Monospace | 0.95rem                          | Orange on hover    |
| **Sidebar Header**   | Monospace | 1rem                             | Uppercase, gray    |
| **Sidebar Sections** | Monospace | 0.75rem                          | Gray labels        |
| **Sidebar Links**    | Monospace | 0.85rem                          | Orange when active |

## Mobile Menu

### Toggle Button

- Monospace font
- Text: "☰ Menu"
- Position: Fixed top-left
- Visible only on mobile (<768px)
- Orange border on hover

### Overlay

- Semi-transparent black (rgba(0, 0, 0, 0.5))
- Click to close sidebar
- Only visible when sidebar is open

## Theme Integration

All orange colors automatically update with theme:

```css
:root {
  --accent-vibrant: #ff5f1f;
}

html[data-theme="dark"] {
  --accent-vibrant: #ff7043;
}

html[data-theme="earthy"] {
  --accent-vibrant: #d97a47;
}
```

Use `var(--accent-vibrant)` for consistent theming.

## Accessibility

✓ WCAG AA contrast ratio on all themes  
✓ Keyboard navigation (Tab through links)  
✓ Focus indicators on all interactive elements  
✓ Proper semantic HTML (`<nav>`, `<aside>`, `<main>`)  
✓ Skip-to-content link (orange accent, keyboard accessible)  
✓ ARIA labels on buttons

## Adding New Navigation Links

**Update both Sidebar.tsx and TableOfContents.tsx:**

```typescript
const SITE_SECTIONS = [
  {
    title: "New Section",
    links: [{ label: "New Page", href: "/new-page" }],
  },
];
```

Both components use the same data structure for consistency.

## Customization

### Change Orange Color

Edit in `app/globals.css`:

```css
:root {
  --accent-vibrant: #YOUR_COLOR;
}
```

### Change Sidebar Width

Edit `.layout-with-sidebar`:

```css
grid-template-columns: 300px 1fr; /* Change 250px to desired width */
```

### Change ToC Max-Width

Edit `.toc-content`:

```css
max-width: 1000px; /* Change from 800px */
```

### Adjust Mobile Breakpoint

Edit media queries (currently 768px and 480px):

```css
@media (max-width: 900px) {
  /* Change breakpoint */
  /* Mobile styles */
}
```

## Testing

**To test the navigation:**

1. Visit home page (`/`)
   - Should see full-screen ToC
   - No sidebar visible

2. Visit any content page (`/about`, `/dance`, etc.)
   - Should see sidebar on left
   - Sidebar shows current page highlighted in orange
   - Main content on right

3. On mobile (<768px)
   - Hamburger menu (☰) visible
   - Click to show/hide sidebar
   - Overlay appears behind sidebar

4. Theme switching
   - Click theme buttons in sidebar footer
   - Orange color updates to theme variant
   - Theme persists after page reload

5. Responsive
   - Resize browser window
   - Verify layout switches at 768px breakpoint
   - Check mobile menu appears/disappears correctly

## Browser Compatibility

- ✓ Chrome/Edge (latest)
- ✓ Firefox (latest)
- ✓ Safari (latest)
- ✓ Mobile browsers
- ✓ IE11: Partial (CSS Grid supported, but some features limited)

## Performance Notes

- **No runtime overhead** for theme switching (CSS variables only)
- **Minimal JavaScript** (only for mobile menu toggle and route detection)
- **Single source of truth** for navigation structure
- **Efficient redraws** (sticky sidebar only repaints on scroll)
- **Responsive design** (mobile-first approach)

---

**Status**: ✅ Ready for Production  
**Last Updated**: February 4, 2026
