# Jonchalant Design System

**Source:** [jmski/jonchalant@main](https://github.com/jmski/jonchalant) · Next.js 16 + React 19, CSS-first.
**Product:** A platform that helps professionals find the work they were meant for — and learn to inhabit it.

- **Ikigai** is the entry point (free 8-question assessment).
- **The Four Circles** is the free 12-lesson course that explains the result.
- **The Foundation** is paid embodiment training, taught through dance, medium-agnostic.
- **1-on-1 coaching** is custom work on a specific situation.

Dance is Jon's personal medium, used as the demonstration and the teaching vehicle. The philosophy is medium-agnostic. Writing, selling, leading, parenting — yours will be different.

---

## Index

- **`design-system.html`** — the full visual specimen (principles, color, type, shape, brand, icons, components, patterns, voice).
- **`assets/tokens.css`** · **`assets/fonts.css`** — drop-in CSS variables matching `app/css/variables.css` and Fraunces + DM Sans.
- **`SKILL.md`** — rules and recipes for future work in this system.

---

## Positioning (non-negotiable)

**Ikigai first.** Top-of-funnel copy leads with purpose/ikigai, never "executive presence" or generic "coaching."
**Medium-agnostic.** Never assume the reader is a dancer. Dance-specific language belongs on the Dance and Foundation pages — and only where it's justified.

**Locked phrases** (consistent across the site):
- "Find the work you were meant for."
- "The medium changes. The fundamentals don't."
- "Dance is my medium. Yours will be different."
- Four pillars: **Grounding · Energy · Flow · Command**
- Four circles: **Passion · Mission · Vocation · Profession**

**What the site is not:** not a dance school, not generic executive coaching, not a self-help product.

---

## Four design principles

1. **Ikigai** — purpose-driven; every element earns its place.
2. **Kaizen** — subtlety over spectacle; polish shows on second look.
3. **Ma** — generous whitespace; sections use the upper half of the 4.5rem–11rem scale.
4. **Wabi-sabi** — a little warmth, never slick. Fraunces WONK italic, cream not bone.

---

## Voice

- Casual, direct, unpretentious. No LinkedIn-thought-leadership cadence.
- Specific over general. Prefer named situations, concrete numbers, sensory detail.
- Honest about tradeoffs — name what something *isn't* as clearly as what it *is*.
- **Never use:** unlock, transform, journey, empowered, authentic self, limiting beliefs, inner game.
- **Headlines are claims, not labels.** *"Most people are in the right industry. Wrong role."* is a claim. *"About the Foundation"* is a label.
- **CTAs describe what happens next,** not what you're doing: *"Discover Your Ikigai"* not *"Learn more."*
- **Kinetic typography moment:** one per page maximum; must carry the page's argument, not decorate it.

---

## Visual foundations

**Color — one warm family, one cool whisper.**
Everything accentable pulls from the Mocha Mousse system (`--mocha-mousse #A47864`, `--mocha-deep #6B4F3F`, `--mocha-soft #D4B8A3`). Sage (`#8A9A85`) is the only cool color, used sparingly for category contrast. Warm amber (`#B89A5F`) is reserved for pricing highlights and status.

**Type.** Fraunces (variable `opsz` + `SOFT` + `WONK`) for headlines, DM Sans for body, Monaco for code. Never Inter/Roboto/system sans. One italic anchor word per headline, in Mocha.

**Shape.** Small radii (0.375rem buttons/inputs, 0.5rem cards, 0.75rem program/pricing only). Hairline borders. Shadows ceiling at `0 4px 12px rgba(0,0,0,.06)` for standard cards.

**Motion.** All transitions `cubic-bezier(0.4, 0, 0.2, 1)` · 150/200/300/500ms scale. Hover lifts 2px + soft mocha shadow. No bounces, no pulses, no scale >1.04×.

**Layout.** `SectionWrapper` variants `primary | secondary | tertiary | dark`. Alternate cream and mocha-deep — never stack three cream sections without a break.

---

## Iconography

Lucide-style: 24×24 viewBox, **1.5px strokes**, round caps, round joins, `currentColor`. Default stroke `--mocha-deep` on cream, `--text-white` on dark. No emoji as UI. No filled glyphs.

---

## The four pillars (medium-agnostic)

Any component rendering them should carry three mini-applications across different mediums — this is the single strongest piece of proof that embodiment transfers.

- **Grounding** — the capacity to find your centre before you move.
- **Energy** — calibrating your presence to the room.
- **Flow** — moving between rigid structure and live response.
- **Command** — presence that carries authority without force.

See `design-system.html` §05 for the full reframe and §09 for the home pillar grid with dancer / leader / writer examples.

---

## The four circles

Used on the ikigai quiz, The Four Circles course, and portal dashboard.
**Passion · Mission · Vocation · Profession** — label style identical across the site, always in this order.

---

## Sources

- Repo: `github.com/jmski/jonchalant` · `CLAUDE.md` · `design-notes/jonchalant-positioning.md`
- Canonical tokens: `app/css/variables.css`
- Funnel: `/ikigai` → `/lessons/four-circles` → `/programs/foundation` → `/contact`
