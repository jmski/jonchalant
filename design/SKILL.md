# SKILL.md — Designing in the Jonchalant system

Use these rules for any page, component, or marketing artifact.

## Positioning (read this first)

Jonchalant helps professionals **find the work they were meant for — and learn to inhabit it**. Ikigai is the entry point. Embodiment is the practice. Dance is Jon's medium, used as demonstration; the philosophy is medium-agnostic.

- Top-of-funnel CTAs go to `/ikigai`, never to `/foundation` or `/contact`.
- Shared components (hero, card, CTA, feature grid) must **never** hardcode dance-specific language. Dance copy is permitted on the Dance page and on the Foundation page in the justification context.
- The four pillars (Grounding, Energy, Flow, Command) are medium-agnostic. Show at least two non-dance applications wherever the pillars are presented.

## Voice checklist

Before shipping copy:

1. Does it lead with purpose/ikigai, or does it open with "executive presence" / "coaching" language? → Rewrite.
2. Any banned words? **unlock, transform, journey, empowered, authentic self, limiting beliefs, inner game.** → Cut.
3. Is the headline a **claim** (makes an argument) or a **label** (orients)? Heroes get claims; wayfinding gets labels.
4. Does the CTA name what happens next? "Discover Your Ikigai" ✓ · "Learn more" ✗.
5. Specific over general — named situations, concrete numbers, sensory detail.
6. Honest about tradeoffs — name what it *isn't*.

## Visual non-negotiables

- **Light mode only.** No dark-mode variants.
- **Cream page background** (`--bg-primary #F4EBE0`). `#FFFFFF` is card-surface only.
- **Mocha accent only.** Every accent comes from the Mocha Mousse family. Sage is the rare second voice. Warm amber is reserved (pricing/status).
- **Fraunces + DM Sans.** Never Inter, Roboto, system sans.
- **No emoji as UI.** No emoji in buttons, badges, nav, CTAs, card icons.
- **No gradient hero bodies.** Hero gets soft radial mocha orbs instead.
- **No utility-class walls.** Only `text-*`, `font-*`, `leading-*`, and `sm:/md:/lg:` responsive prefixes. Complex styling → named BEM class in the right CSS layer.
- **Standard breakpoints only:** 640 · 768 · 1024. No 480/560/960.

## Recipes

### Marketing hero
```
Eyebrow (DM Sans, uppercase, mocha-deep)
  ↓
Headline (Fraunces 400, opsz 144, one italic anchor word in Mocha)
  ↓
One-to-two-sentence subhead (DM Sans, 1.0625rem, text-secondary)
  ↓
Primary CTA (solid mocha)  ·  Secondary CTA (transparent + hairline)
```

### Kinetic typography moment
One per page, max. It's an argument line, not decoration. Examples from the phrase library:
- Home: *"Are you in the right room, playing the wrong role?"*
- Foundation: *"Eight weeks. One week at a time."*
- Ikigai: *"The medium changes. The fundamentals don't."*
- Dance: *"This isn't a portfolio. It's a practice."*

### Pillar card (medium-agnostic)
```
Pillar name (Fraunces 600)
One-line definition (DM Sans, text-primary)
— divider —
3 mini-applications, each prefixed by the archetype in italic mocha:
  • A dancer …
  • A leader …
  • A writer …
```

### The Four Circles lesson row
```
01 · Lesson title           ·  ~15 min
A short, honest description of what the lesson names.
```
Use the four-circles color mapping: Passion, Mission, Vocation, Profession each get a subtle border-left tint drawn from the Mocha family.

### Card anatomy
- 1.75rem padding (2rem on wider cards).
- 1px `--border-color` or `--border-subtle`.
- Radius 0.5rem (0.75rem for program/pricing only).
- Hover: +2px lift, mocha shadow `0 4px 16px rgba(164, 120, 100, 0.1)`.
- Service cards keep the top-accent-bar hover trick (2px transparent border-top → mocha).

### Buttons
- Primary: solid mocha, white text, uppercase, letter-spacing 0.06em.
- Secondary: transparent, 1px border, primary text. Hover → faint mocha tint.
- Tertiary: inline text link with underline-on-hover. No "button" chrome.

### Forms
- 1.5px border `--border-color`, cream-secondary fill.
- Focus: mocha border + 3px halo at 12% mocha.
- Minimum 44px hit area. `font-size: 16px` on mobile inputs (prevents iOS zoom).

## When inventing new things

- Design to match existing primitives first. Look for the closest analog in `sections.css` / `cards.css` / `components.css`.
- New colors come from `color-mix()` of existing tokens — never fresh hex.
- If mocha doesn't work, reach for sage — never teal, indigo, or any bright hue.
- New motion uses the four-step bezier timing.

## CSS rules (from repo)

- No `!important`. Fix specificity/cascade instead.
- No new CSS files — 19 files exist (9 system + 10 page-scoped). Add to the right one.
- No inline styles except truly dynamic values.
- Always use CSS variables for colors — never hardcode hex in page-scoped CSS.
- BEM-inspired kebab-case naming: `.section-name`, `.section-name-header`, `.section-name-title`.
- Component name rule: no "Section" suffix (`Hero` not `HeroSection`).

## Content guardrails

- One message per section. Don't stack two competing CTAs.
- Replace "Get started" / "Learn more" with verbs that name the commitment: *Discover your ikigai*, *Start the course*, *Book the intake call*, *Read the essay*.
- Social proof in plain language — "Promoted to Director — Q2 2025" beats "+30% promotion readiness."
- Any dance mention in shared copy must justify itself or be made optional.

## Last check before shipping

1. Does top-of-funnel copy lead with ikigai/purpose? If not, fix.
2. Any banned words? If yes, rewrite.
3. Any hexes not in `tokens.css`? Fix or add tokens intentionally.
4. Hero anchor word italic + mocha? It should be.
5. One kinetic typography line per page, max? Good.
6. Every card padded ≥1.5rem with a 2px hover lift? Good.
7. Can the user breathe? If the section feels crowded, delete something.
