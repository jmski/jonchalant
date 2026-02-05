# Navigation Architecture - Visual Guide

## Two-Mode Layout System

Your site now operates in two distinct modes based on the current URL:

### Mode 1: Home Page (`/`)

**Table of Contents View - Full Screen**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              JONCHALON                  │
│        Dance Artist & Digital Creator   │
│                                         │
│         INTRODUCTION                    │
│         • About Me                       │
│         • Contact                        │
│                                         │
│         PORTFOLIO                       │
│         • Dance                          │
│         • Showcase                       │
│                                         │
│         PROFESSIONAL                    │
│         • Collaborations                 │
│         • Media Kit                      │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**

- ✓ No navbar or sidebar
- ✓ Centered layout (800px max)
- ✓ Large typography
- ✓ Feels like a book's table of contents
- ✓ Orange links on hover

---

### Mode 2: Content Pages (`/about`, `/dance`, etc.)

**Sidebar Navigation + Main Content**

#### Desktop Layout (>1024px)

```
┌──────────┬────────────────────────────────┐
│ JONCHALON│                                 │
├──────────┤                                 │
│PRIMARY   │ Main Content Area               │
│• Home    │                                 │
│• About ○ │ Page content flows here        │
│• Contact │ with typography and images     │
│          │                                 │
│PORTFOLIO │                                 │
│• Dance   │                                 │
│• Showcase│                                 │
│          │                                 │
│PROF.     │                                 │
│• Collabs │                                 │
│• Media   │                                 │
│          │                                 │
│ THEME    │                                 │
│ [Paper]  │                                 │
│ [Dark]   │                                 │
│ [Earthy] │                                 │
└──────────┴────────────────────────────────┘
```

**Features:**

- ✓ Fixed 250px sidebar on left
- ✓ Flexible content area on right
- ✓ Vertical line separator
- ✓ Active page highlighted in orange
- ✓ Theme toggle in footer
- ✓ Sticky positioning

---

#### Tablet Layout (768px - 1024px)

```
┌─────────────────────────────────────┐
│ ☰ Menu              Main Content     │
│                                      │
│                    Page content      │
│                    goes here with    │
│                    full width        │
│                                      │
│                    (sidebar hidden)  │
│                                      │
└─────────────────────────────────────┘
```

**Features:**

- ✓ Menu button appears (☰ Menu)
- ✓ Sidebar hidden by default
- ✓ Click menu to toggle sidebar
- ✓ Smooth 250ms animation

---

#### Mobile Layout (<768px)

**Closed State:**

```
┌──────────────────────────┐
│ ☰ Menu   [Page Content]  │
│                          │
│    Main content area     │
│    with responsive       │
│    typography            │
│                          │
└──────────────────────────┘
```

**Open State (Menu Clicked):**

```
┌────────┬─────────────────┐
│JONCHALON│  Page Content  │
├────────┤                 │
│PRIMARY │                 │
│• Home  │ Semi-transparent │
│• About │ overlay         │
│• Cont. │ (click to close)│
│        │                 │
│PORTF.  │                 │
│• Dance │                 │
│• Show. │                 │
│        │                 │
└────────┴─────────────────┘
```

**Features:**

- ✓ Menu button fixed at top-left
- ✓ Sidebar slides in from left
- ✓ Overlay appears behind sidebar
- ✓ Click overlay to close
- ✓ Smooth CSS transition

---

## Color Scheme: Orange Accent

### Active States (Sidebar Links)

**Light Theme:**

```
Link Text Color:      #FF5F1F (Orange)
Background:           #f0f0f0 (Light gray)
Left Border:          2px solid #FF5F1F
Font Weight:          600 (Bold)
```

**Dark Theme:**

```
Link Text Color:      #FF7043 (Lighter Orange)
Background:           #2a2a2a (Dark gray)
Left Border:          2px solid #FF7043
Font Weight:          600 (Bold)
```

**Earthy Theme:**

```
Link Text Color:      #D97A47 (Rust Orange)
Background:           #dcd7ca (Light tan)
Left Border:          2px solid #D97A47
Font Weight:          600 (Bold)
```

### Hover States

All interactive elements turn orange on hover:

- Links
- Buttons
- Theme toggle buttons

---

## Sidebar Anatomy

### Header

```
┌────────────────┐
│ JONCHALON      │  Monospace, uppercase
└────────────────┘  1rem font size
```

### Section

```
┌────────────────┐
│PRIMARY         │  Section title
│ • Home         │  (0.75rem, uppercase)
│ • About        │
│ • Contact      │  Links (0.85rem)
└────────────────┘  With left border when active
```

### Footer

```
┌────────────────┐
│ THEME          │  Section title
│ [Paper]        │  Theme buttons
│ [Dark ]        │  (0.65rem, uppercase)
│ [Earthy]       │
└────────────────┘
```

---

## Interactive States

### Link States

**Default:**

```
Text Color:  var(--text-secondary)
Background:  transparent
Border:      transparent
```

**Hover:**

```
Text Color:  var(--accent-vibrant) [Orange]
Background:  var(--bg-tertiary) [Light gray]
Border:      Left 2px solid [Orange]
```

**Active (Current Page):**

```
Text Color:  var(--accent-vibrant) [Orange]
Background:  var(--bg-tertiary) [Light gray]
Border:      Left 2px solid [Orange]
Font Weight: 600 (Bold)
```

### Button States

**Theme Button Default:**

```
Border:      1px solid var(--border-color)
Background:  transparent
Text Color:  var(--text-primary)
```

**Theme Button Hover:**

```
Border:      1px solid var(--accent-vibrant) [Orange]
```

**Theme Button Active:**

```
Border:      1px solid var(--accent-vibrant) [Orange]
Background:  var(--accent-vibrant) [Orange]
Text Color:  white
```

---

## Typography Hierarchy

### Page Title (ToC)

```
Font:     Serif (Georgia, Garamond)
Size:     3rem (desktop) / 1.75rem (mobile)
Weight:   Bold (700)
Color:    Theme primary color
Spacing:  1.2 line-height
```

### Section Heading (ToC/Sidebar)

```
Font:     Serif (Georgia, Garamond)
Size:     1.25rem
Weight:   Bold (700)
Color:    Theme primary color
Spacing:  0.8px letter-spacing
```

### Sidebar Links

```
Font:     Monospace (Departure Mono, IBM Plex)
Size:     0.85rem
Weight:   Normal (or 600 when active)
Color:    Theme secondary (or orange when active)
Spacing:  0.2px letter-spacing
```

---

## Responsive Breakpoints

### Desktop (>1024px)

```
┌──────┬──────────┐
│ 250px│  1fr     │
│      │          │
│ Sidebar always visible
└──────┴──────────┘
```

### Tablet (768px - 1024px)

```
┌──────────────────┐
│ ☰ Menu Button   │
│                  │
│ Full width       │
│ content          │
│                  │
│ (Sidebar hidden) │
└──────────────────┘
```

### Mobile (<768px)

```
┌──────────────┐
│ ☰ [Content]  │
│   area       │
│              │
└──────────────┘

Sidebar toggles with
☰ button click
```

---

## Animation Details

### Sidebar Slide-In (Mobile)

```
Duration:     250ms
Timing:       ease-in-out
Direction:    Left to right
Start:        left: -250px
End:          left: 0
```

### Link Hover

```
Duration:     150ms
Properties:   color, background-color, border-color
Timing:       ease-in-out
```

### Theme Switch

```
Duration:     250ms
Properties:   all theme colors
Timing:       ease-in-out
Applied to:   html element
```

---

## Accessibility Features

### Focus States

```
All links and buttons have visible focus indicators
Focus color:  Orange (var(--accent-vibrant))
Focus style:  Underline or border
```

### Skip Link

```
Position:     Top-left (fixed)
Visible on:   Keyboard focus
Color:        Orange on background
Text:         "Skip to main content"
```

### Semantic Structure

```
<nav>           - Sidebar
<aside>         - Sidebar (alternative)
<main>          - Main content area
<section>       - Navigation sections
<a href="...">  - All links
<button>        - All buttons
```

---

## Theme Variant Comparison

### Light Theme (Paper)

```
Background:   #f9f9f9 (Off-white)
Text:         #121212 (Near-black)
Borders:      #e5e5e5 (Light gray)
Orange:       #FF5F1F (Vibrant)
```

### Dark Theme (Blueprint)

```
Background:   #0a0a0a (Black)
Text:         #ffffff (White)
Borders:      #3a3a3a (Dark gray)
Orange:       #FF7043 (Lighter orange)
```

### Earthy Theme (Manual)

```
Background:   #e2ddd0 (Warm beige)
Text:         #3c3633 (Dark brown)
Borders:      #c9c4ba (Tan)
Orange:       #D97A47 (Rust orange)
```

All orange colors maintain WCAG AA contrast ratio (4.5:1 minimum).

---

## File Structure

```
components/
├── RouteAwareLayout.tsx      ← Route detection
├── TableOfContents.tsx       ← Home page ToC
├── Sidebar.tsx               ← Content page sidebar
└── [other components]

app/
├── layout.tsx                ← Uses RouteAwareLayout
├── globals.css               ← All layout styles
├── page.tsx                  ← Home page (empty)
└── [other pages]

docs/
├── NAVIGATION_ARCHITECTURE_COMPLETE.md
├── NAVIGATION_QUICK_REFERENCE.md
└── NAVIGATION_IMPLEMENTATION_SUMMARY.md
```

---

## Quick Start Guide

### For Users

1. Visit home page (`/`) → See table of contents
2. Click any link → Sidebar appears, main content loads
3. Click theme buttons → Colors change instantly
4. On mobile → Click ☰ Menu to show/hide sidebar

### For Developers

1. Add new link to `SITE_SECTIONS` in Sidebar.tsx
2. Add matching link to `SITE_SECTIONS` in TableOfContents.tsx
3. Create new route in `/app` (auto-detected by RouteAwareLayout)
4. Use `usePathname()` to detect current route if needed

---

**Status**: ✅ Production Ready  
**Last Updated**: February 4, 2026
