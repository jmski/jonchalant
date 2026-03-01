# ��� Documentation Hub

Quick reference for developing **The Kinetic Leader** portfolio.

---

## ��� Start Here

| Document                                                                 | Purpose                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------ |
| **[PROJECT_STATUS.md](PROJECT_STATUS.md)**                               | Current project status and what's been completed |
| **[ADAPTIVE_THEME_IMPLEMENTATION.md](ADAPTIVE_THEME_IMPLEMENTATION.md)** | How the light/dark adaptive theme system works   |

---

## ��� Design & Brand

| Guide                                                              | Purpose                                                           |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **[KINETIC_LEADER_BRAND_VOICE.md](KINETIC_LEADER_BRAND_VOICE.md)** | Brand guidelines, tone, and messaging for The Kinetic Leader      |
| **[DESIGN_TOKENS_GUIDE.md](DESIGN_TOKENS_GUIDE.md)**               | Design system: colors, spacing, typography, and styling constants |

---

## ���️ Development Guides

| Guide                                                                      | Purpose                                                    |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **[REUSABLE_COMPONENTS_GUIDE.md](REUSABLE_COMPONENTS_GUIDE.md)**           | Pre-built component patterns, best practices, and examples |
| **[PATTERN_LIBRARY_IMPLEMENTATION.md](PATTERN_LIBRARY_IMPLEMENTATION.md)** | Component patterns ready to use in development             |
| **[PERFORMANCE_BASELINE.md](PERFORMANCE_BASELINE.md)**                     | Performance metrics and optimization targets               |

---

## ��� Media & Images

| Guide                                                          | Purpose                                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| **[IMAGE_OPTIMIZATION_GUIDE.md](IMAGE_OPTIMIZATION_GUIDE.md)** | Image sizing, formats, responsive images, and optimization |
| **[IMAGE_TESTING_GUIDE.md](IMAGE_TESTING_GUIDE.md)**           | Testing image loading, performance, and visual quality     |

---

## ��� Key Project Files

### Configuration

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript setup
- `tailwind.config.js` - Tailwind CSS with `darkMode: 'media'`
- `eslint.config.mjs` - ESLint rules

### Styles (`app/css/`)

- `variables.css` - CSS custom properties and adaptive theme
- `animations.css` - Animation keyframes
- `base.css` - Base element styles
- `typography.css` - Font families and heading styles
- `utilities.css` - Utility classes
- `components.css` - Component-specific styles
- `layout.css` - Layout systems and grids
- `interactions.css` - Hover, focus, and interactive states
- `responsive.css` - Media queries and breakpoints

### Components

- `components/hero/` - Hero sections
- `components/forms/` - Form components
- `components/sections/` - Content sections
- `components/common/` - Reusable utilities
- `components/layout/` - Navbar, Sidebar, layout
- `components/animations/` - Animation effects
- `components/typography/` - Text and heading components

### Pages (App Router)

- `app/page.tsx` - Home
- `app/about/page.tsx` - About
- `app/dance/page.tsx` - Dance portfolio
- `app/showcase/page.tsx` - Showcase/lessons
- `app/programs/page.tsx` - Coaching programs
- `app/collaborations/page.tsx` - Collaboration inquiry
- `app/media-kit/page.tsx` - Media kit
- `app/contact/page.tsx` - Contact form

### Utilities

- `lib/design-tokens.ts` - Design system constants
- `lib/pageContent.ts` - Page content definitions
- `public/` - Static assets

---

## ⚡ Quick Commands

```bash
npm install      # Install dependencies
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Run production build
npm run lint     # Check types and lint
```

---

## ✅ Development Checklist

Before committing:

- [ ] `npm run build` passes (0 errors)
- [ ] `npm run lint` passes
- [ ] Light mode tested
- [ ] Dark mode tested (system preference)
- [ ] No console errors/warnings

---

## ��� Current Status

- **Build**: ✅ Passing
- **Design**: ✅ Modern Zen aesthetic
- **Theme**: ✅ Adaptive light/dark
- **Pages**: ✅ 8/8 functional
- **Ready for Deploy**: ✅ Yes

---

**Updated**: February 28, 2026
