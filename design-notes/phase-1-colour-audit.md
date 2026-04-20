# Phase 1 Colour Audit

Generated before palette pivot. Risk levels:
- **HIGH** — hardcoded hex or inline `var(--old-name)` in component/API files
- **MEDIUM** — CSS variable reference outside `variables.css`, or rgba encoding old palette in CSS
- **LOW** — already inside `variables.css`

---

## Hardcoded Hex in Components / API

| File | Line | Match | Context | Risk |
|------|------|-------|---------|------|
| `app/(marketing)/opengraph-image.tsx` | 30 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/opengraph-image.tsx` | 38 | `#6b8e63` | `color: '#6b8e63'` | HIGH |
| `app/(marketing)/opengraph-image.tsx` | 53 | `#4a3a5c` | `color: '#4a3a5c'` | HIGH |
| `app/(marketing)/opengraph-image.tsx` | 88 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/foundation/opengraph-image.tsx` | 30 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/foundation/opengraph-image.tsx` | 38 | `#6b8e63` | `color: '#6b8e63'` | HIGH |
| `app/(marketing)/foundation/opengraph-image.tsx` | 53 | `#6b8e63` | `color: '#6b8e63'` | HIGH |
| `app/(marketing)/foundation/opengraph-image.tsx` | 68 | `#4a3a5c` | `color: '#4a3a5c'` | HIGH |
| `app/(marketing)/foundation/opengraph-image.tsx` | 103 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/programs/opengraph-image.tsx` | 30 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/programs/opengraph-image.tsx` | 38 | `#6b8e63` | `color: '#6b8e63'` | HIGH |
| `app/(marketing)/programs/opengraph-image.tsx` | 53 | `#4a3a5c` | `color: '#4a3a5c'` | HIGH |
| `app/(marketing)/programs/opengraph-image.tsx` | 89–90 | `#4a3a5c` | border + color on price tag | HIGH |
| `app/(marketing)/programs/opengraph-image.tsx` | 113 | `#4a3a5c` | `background: '#4a3a5c'` | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 70 | `#4a3a5c` | passion label colour | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 76 | `#6b8e63` | mission label colour | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 82 | `#b89a5f` | vocation label colour | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 88 | `#6a8aaa` | profession label colour | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 131 | `#4a3a5c` | passion circle fill | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 132 | `#6b8e63` | mission circle fill | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 133 | `#b89a5f` | vocation circle fill | HIGH |
| `app/(marketing)/ikigai/IkigaiClient.tsx` | 134 | `#6a8aaa` | profession circle fill | HIGH |
| `app/api/webhooks/stripe/route.ts` | 65 | `#6b8e63` | email HTML `color` | HIGH |
| `app/api/webhooks/stripe/route.ts` | 73 | `#6b8e63` | email HTML button `background` | HIGH |
| `app/api/webhooks/stripe/route.ts` | 78 | `#6b8e63` | email HTML link `color` | HIGH |

---

## Old CSS Variable Names Used Outside variables.css

| File | Line | Match | Context | Risk |
|------|------|-------|---------|------|
| `app/(portal)/portal/tonality/TonalityClient.tsx` | 98 | `var(--color-burnt-indigo)` | Commanding tone colour | MEDIUM |
| `app/css/cards.css` | 211 | `var(--color-muted-moss)` | border-color on featured card | MEDIUM |
| `app/css/cards.css` | 227 | `var(--color-muted-moss)` | color on featured card stat | MEDIUM |
| `app/css/cards.css` | 247 | `var(--color-muted-moss)` | color on featured card detail | MEDIUM |

*(All other `--accent-primary`, `--accent-hover`, `--color-warning`, etc. references are MEDIUM but will automatically remap via the alias variables added in the pivot — no file-by-file changes needed for these.)*

---

## Hardcoded rgba() Encoding Old Palette (in CSS files)

`rgba(107, 142, 99, ...)` = muted moss → needs → `rgba(164, 120, 100, ...)` (mocha-mousse)  
`rgba(74, 58, 92, ...)`  = burnt indigo → needs → `rgba(107, 79, 63, ...)` (mocha-deep)

| File | Occurrences |
|------|-------------|
| `app/css/cards.css` | 10 instances |
| `app/css/components.css` | 1 instance |
| `app/css/layout.css` | 2 instances |
| `app/css/sections.css` | 8 instances |
| `app/css/typography.css` | 1 instance |
| `app/css/pages-audit.css` | 5 instances |
| `app/css/pages-blog.css` | 1 instance |
| `app/css/pages-forms.css` | 3 instances |
| `app/css/pages-foundation.css` | 1 instance |
| `app/css/pages-ikigai.css` | 12 instances |
| `app/css/pages-lessons.css` | 6 instances |
| `app/css/pages-portal-tools.css` | 8 instances |
| `app/css/pages-portal.css` | 6 instances |

---

## Inside variables.css (no action needed until Phase 9)

| Lines | Match | Risk |
|-------|-------|------|
| 71–86, 91–98, 111–138 | All current palette hex + rgba tokens | LOW |
