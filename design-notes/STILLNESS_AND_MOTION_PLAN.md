# Stillness & Motion — Implementation Plan

**Concept:** A redesign of jonchalant.netlify.app around a single design principle: *some things stay still while everything else moves*. This is literally what Jon teaches — body-led presence is the meeting of stillness and motion — so the interface will demonstrate the pitch before the user reads a word.

**Palette pivot:** Burnt indigo / muted moss → Mocha Mousse (Pantone 17-1230) warm system.

**Trends deployed (selectively):** full-screen cycling hero, expressive + kinetic Fraunces typography, cinematic scrollytelling on About > Origin, bento grids (homepage + programs), micro-delight pass, chrome-stripped dance page. Three.js stays singular (homepage only — do not dilute).

**How to use this doc:**
1. Work through phases **in order**. Each one makes the next easier.
2. Complete the **pre-flight checklist** at the top of each phase before running the prompt.
3. The ☐ items inside each prompt block are the acceptance criteria — do not mark a phase done until they pass.
4. Copy-paste each fenced `PROMPT` block verbatim into Claude Code (Sonnet 4.6). The prompts are self-contained and reference `CLAUDE.md` and `.github/copilot-instructions.md` so Sonnet has full context.
5. Commit after each phase so rollback is trivial.

---

## Table of Contents

- [Before You Start: Asset Checklist](#before-you-start-asset-checklist)
- [Global Conventions (embedded in every prompt)](#global-conventions-embedded-in-every-prompt)
- [Phase 0 — Branch, Baseline, Safety Net](#phase-0--branch-baseline-safety-net)
- [Phase 1 — Mocha Mousse Colour Pivot](#phase-1--mocha-mousse-colour-pivot)
- [Phase 2 — Homepage Full-Bleed Cycling Hero](#phase-2--homepage-full-bleed-cycling-hero)
- [Phase 3 — Expressive & Kinetic Typography System](#phase-3--expressive--kinetic-typography-system)
- [Phase 4 — About > Origin Cinematic Scrollytelling](#phase-4--about--origin-cinematic-scrollytelling)
- [Phase 5 — Bento Grids (Homepage + Programs)](#phase-5--bento-grids-homepage--programs)
- [Phase 6 — Micro-Delight Pass](#phase-6--micro-delight-pass)
- [Phase 7 — Dance Page Chrome Strip](#phase-7--dance-page-chrome-strip)
- [Phase 8 — Presence Audit Reduction](#phase-8--presence-audit-reduction)
- [Phase 9 — Final Polish & QA Sweep](#phase-9--final-polish--qa-sweep)
- [Appendix A — Rollback Strategy](#appendix-a--rollback-strategy)
- [Appendix B — Image & Illustration Sourcing Brief](#appendix-b--image--illustration-sourcing-brief)
- [Appendix C — Claude Code Prompting Patterns That Work Here](#appendix-c--claude-code-prompting-patterns-that-work-here)

---

## Before You Start: Asset Checklist

You cannot start Phase 2 without real photos. Get these scheduled *now* so they're ready when the code is.

### Photography shoot brief (needed for Phase 2, 4, 6)

Shoot in **black and white or convertible to duotone mocha**, 35mm-ish feel, high contrast, natural light. The goal is documentary stills, not headshots. No smiling at camera. No suit-and-arms-crossed clichés.

| ID | Description | Used in | Notes |
|----|-------------|---------|-------|
| `hero-fragment-01` | Shoulders/upper back from behind, dropping into relaxation | Homepage hero cycle slide 2 | Close crop, no face |
| `hero-fragment-02` | Hands, mid-gesture, slightly blurred from motion | Homepage hero cycle slide 4 | Macro-ish, shallow depth |
| `hero-fragment-03` | Feet planted, floor visible, weight shifting | Homepage hero cycle rotation pool | Grounded, stable |
| `origin-01` | Evocative stand-in for "the kid who wouldn't speak up" | About > Origin scene 1 | Empty classroom, back of a head, or old photo of you |
| `origin-02` | Empty dance studio or first studio you trained in | About > Origin scene 2 | Floor, mirror, light — no people |
| `origin-03` | A microphone on a stand, or a podium, or a stage curtain | About > Origin scene 3 | The "someone noticed" moment |
| `origin-04` | You teaching — side angle, mid-sentence, gesturing | About > Origin scene 4 | A student's shoulder visible is ok |
| `origin-05` | You now — alone, still, grounded | About > Origin scene 5 | Could be the introvert-section photo |
| `introvert-solitude` | You alone in a quiet room, reading or sitting, not posed | About > Introvert section | This is the emotional anchor — get it right |

**Delivery format:** High-res JPG/WebP, 2400px long edge minimum. Upload to Sanity Studio under a new `asset` tag `"stillness-motion-v1"` so they're easy to find during implementation.

### Illustrations (needed for Phase 5)

8 tiny line drawings, one style, mocha ink on cream. One per curriculum week:

1. Week 1 — Body Audit → an eye, or silhouette outline
2. Week 2 — Posture & Grounding → a spine, or feet planted
3. Week 3 — Movement Fundamentals → an arc of motion, arrow
4. Week 4 — Stillness & Timing → a held pose, or a pause mark
5. Week 5 — Voice & Breath → diaphragm, or a mouth shape
6. Week 6 — High-Stakes Situations → a spotlight, or a doorway
7. Week 7 — Personal Style → a folded garment, or a single shoe
8. Week 8 — Integration → concentric circles, or a spiral

**Source options:**
- Hire illustrator ($400–800 for the set) — best result
- Commission via Fiverr/Dribble in "continuous line" or "minimal ink" style
- Generate with AI, then have an illustrator clean them up for consistency
- Last resort: use Phosphor/Lucide icons at large scale with mocha stroke — looks clean but generic

Store in `/public/illustrations/week-01.svg` through `week-08.svg`. SVG only — these need to scale and recolour via `currentColor`.

### Optional: short video loops

If you have them, a 2–3 second loop of shoulders dropping, or a hand opening, or weight shifting between feet, can replace one of the hero cycle frames. MP4, muted, under 2MB. Call it `hero-motion-01.mp4` in `/public/video/`.

---

## Global Conventions (embedded in every prompt)

Every prompt in this document ends with a reminder block that enforces your codebase rules. When you paste a prompt, do not edit this block out — it's what keeps Sonnet from violating conventions.

```
NON-NEGOTIABLES (read before writing any code):
1. Read CLAUDE.md and .github/copilot-instructions.md first. Honour everything in them.
2. No new CSS files. Styles go into the existing 10 files under app/css/. If you
   touch pages.css, update its table-of-contents comment at the top.
3. No !important. Fix cascade/specificity/@layer order instead.
4. No hardcoded user-facing copy in components. All copy comes from Sanity via
   lib/sanity.ts fetchers. If a new schema is needed, create it under sanity/schemas/
   and register it in sanity/schemaTypes/index.ts.
5. All shared TypeScript interfaces live in lib/types.ts. Do not redeclare inline.
6. Supabase: server components use utils/supabase/server.ts, client components use
   utils/supabase/client.ts. Never import lib/supabase.ts — it was deleted.
7. Imports use the @/ alias. Never relative paths from deep files.
8. Server components by default. 'use client' only when state/effects are required.
9. No Tailwind utility classes on JSX except text sizing (text-*), font weight
   (font-*), line height (leading-*), and responsive breakpoint prefixes.
10. Portal login section uses non-brand monospace aesthetic on purpose — do not
    touch it during styling passes.
11. When finished, run `npm run lint` and `npm run build`. Report any failures and
    fix them before declaring the task complete.
12. Do not touch files outside the scope of this task. If a change seems to require
    it, stop and ask first.
```

Save this block as a snippet in your editor. From here on it's referenced as **`[NON-NEGOTIABLES]`**.

---

## Phase 0 — Branch, Baseline, Safety Net

**Goal:** Create a safe rollback point and capture the current state so regressions are obvious later.

### Pre-flight

- [ ] You're on `main` and clean (`git status` shows nothing)
- [ ] Netlify preview deploys are working
- [ ] You have the Sanity Studio credentials handy

### Manual steps (do these yourself — no Claude Code needed)

```bash
git checkout -b stillness-motion-redesign
git push -u origin stillness-motion-redesign
```

Take full-page screenshots of the current site (Chrome DevTools → Device Mode → "Capture full size screenshot") and save them to `/design-notes/baseline/` inside your repo so you can compare before/after per page. Suggested pages:

- `baseline-home.png`
- `baseline-about.png`
- `baseline-programs.png`
- `baseline-dance.png`
- `baseline-contact.png`
- `baseline-audit.png`

Commit these: `git commit -am "chore: baseline screenshots before stillness-motion redesign"`.

---

## Phase 1 — Mocha Mousse Colour Pivot

**Goal:** Replace the burnt-indigo/muted-moss palette with a warm Mocha Mousse system. One commit, massive visual change. Every subsequent phase reads differently against the new palette, which is why this goes first.

**Files primarily touched:** `app/css/variables.css`, possibly `app/css/base.css`, `interactions.css`.

### Pre-flight

- [ ] Phase 0 complete, on `stillness-motion-redesign` branch
- [ ] Baseline screenshots captured

### Prompt 1.1 — Audit hardcoded colour values

```
You are working in the jonchalant Next.js codebase. Your job right now is ONLY to
audit — do not edit any files yet.

Task: find every place in the codebase where brand colours are referenced outside
of app/css/variables.css. I'm pivoting the palette and need to know what will
break.

Scan for:
1. CSS variable usages: --color-burnt-indigo, --color-burnt-indigo-light,
   --color-muted-moss, --color-moss-light, --accent-primary, --accent-hover,
   --accent-tertiary, --color-success, --color-warning, --color-error, --color-info.
2. Hardcoded hex values that match the current palette: #4a3a5c, #6b5a7a,
   #6b8e63, #8aa87a, #6a8aaa, #b89a5f. Also scan for any other hex values in
   .tsx, .ts, .css, and Sanity schema files.
3. rgb() / rgba() values that reference the above colours.
4. Tailwind-style colour utilities in JSX (bg-*, text-*, border-*) — these
   shouldn't exist per our conventions, but flag any you find.

Output format: a single markdown table with columns:
| File | Line | Match | Context (one line) | Risk level |
Risk level = HIGH if it's a hardcoded hex in a component, MEDIUM if it's a CSS
variable reference outside variables.css, LOW if it's already in variables.css.

Do NOT modify any files. Do NOT run lint or build. Just produce the table and
save it to design-notes/phase-1-colour-audit.md.

[NON-NEGOTIABLES]
```

**After this runs:** read the audit file. If anything HIGH-risk appears outside `variables.css`, you may need to refactor it to use a CSS variable *before* the pivot. Usually there are only a handful.

### Prompt 1.2 — Execute the palette pivot

```
You are working in the jonchalant Next.js codebase. You have already produced
design-notes/phase-1-colour-audit.md in the previous step. Re-read it before
starting.

Task: replace the current palette in app/css/variables.css with the Mocha Mousse
system below. Then update any HIGH-risk hardcoded values found in the audit so
they reference CSS variables instead of hex.

New palette (paste these EXACT values into :root in app/css/variables.css,
replacing the existing colour section — keep spacing/font/transition tokens
untouched):

  /* Backgrounds — cream, warmer than previous bone */
  --bg-primary:   #F4EBE0;   /* Cream — primary background */
  --bg-secondary: #EFE4D6;   /* Slightly deeper cream */
  --bg-tertiary:  #E8D9C7;   /* Cream-deep — card backgrounds, section contrast */

  /* Text — espresso, richer than pure black */
  --text-primary:   #2A1F1A; /* Espresso */
  --text-secondary: #5C4A3F; /* Ink */
  --text-tertiary:  #8A7668; /* Faded ink */

  /* Borders — warm hairlines */
  --border-color:   #D4B8A3; /* Mocha-soft used as border */
  --border-subtle:  #E8D9C7; /* Very faint */

  /* Mocha Mousse system — the anchor */
  --mocha-mousse: #A47864;   /* PANTONE 17-1230, primary brand accent */
  --mocha-deep:   #6B4F3F;   /* Hover/pressed state */
  --mocha-soft:   #D4B8A3;   /* Tints, subtle fills */

  /* Sage whisper — single cool accent, used sparingly for contrast */
  --sage-whisper: #8A9A85;

  /* Semantic aliases — existing CSS references these; keep them but remap */
  --accent-primary:   var(--mocha-mousse);
  --accent-hover:     var(--mocha-deep);
  --accent-tertiary:  var(--sage-whisper);
  --btn-primary-text: #FFFFFF;

  /* Status colours — warm-aligned */
  --color-success: #7A8A6A; /* sage-adjacent */
  --color-warning: #B89A5F; /* warm amber retained for alerts only */
  --color-error:   #8A5A5A; /* muted burgundy */
  --color-info:    #8A9A85; /* sage-whisper reused */

  /* Legacy aliases — kept temporarily so nothing explodes mid-migration.
     Remove these in Phase 9 after the full sweep is verified. */
  --color-burnt-indigo:       var(--mocha-deep);
  --color-burnt-indigo-light: var(--mocha-mousse);
  --color-muted-moss:         var(--sage-whisper);
  --color-moss-light:         var(--mocha-soft);

Then:
1. For any HIGH-risk hardcoded hex values from the audit, replace them with the
   appropriate CSS variable reference. Match by intent: if it was acting as an
   accent, use --mocha-mousse; if it was a text colour, use the text-* variable,
   etc.
2. Do NOT touch the portal login section's monospace/non-brand styling.
3. Do NOT touch any colour inside /sanity/ config files.

Acceptance criteria — all must pass before you report done:
☐ app/css/variables.css has the new palette exactly as specified above
☐ All HIGH-risk audit entries are resolved
☐ `npm run lint` passes
☐ `npm run build` passes
☐ No visual references to the old moss green or burnt indigo remain in .tsx/.css
  files (run a final grep for #6b8e63 and #4a3a5c to confirm)
☐ A summary of every file changed is listed at the end of your response

[NON-NEGOTIABLES]
```

### Verification

Run the dev server and eyeball these pages:
- Homepage — buttons should now be mocha, not green
- About — accent underlines and stats should be mocha
- Programs — pricing highlights should be mocha
- Portal login — **must remain unchanged** (monospace non-brand)

**Commit:**
```bash
git add -A
git commit -m "feat(design): pivot palette to Mocha Mousse (Pantone 17-1230)"
```

> 📸 **Image reminder:** If you haven't scheduled the photo shoot yet, do it now. Phase 2 needs at least `hero-fragment-01`, `hero-fragment-02`, and `hero-fragment-03` uploaded to Sanity before you run it.

---

## Phase 2 — Homepage Full-Bleed Cycling Hero

**Goal:** Full-screen hero with fixed elements (headline, nav, CTA) and a cycling visual (Three.js figure → photo → typographic slide → motion loop). The stillness/motion concept made literal.

**Files primarily touched:**
- `components/sections/home/hero/Hero.tsx`
- `app/css/sections.css` (new hero styles)
- `sanity/schemas/homePageContent.ts` (add cycle array)
- `lib/sanity.ts` (extend `getHomePageContent` if needed)
- `lib/types.ts` (new interface)

### Pre-flight

- [ ] Phase 1 merged and verified
- [ ] At least **2** of `hero-fragment-01/02/03` uploaded to Sanity Studio (3 ideal)
- [ ] Existing Three.js figure still rendering correctly after colour pivot

### Image/asset reminder block

> 📸 **Before running Prompt 2.1:**
> 1. Open Sanity Studio.
> 2. Upload your hero fragment photos as image assets.
> 3. Note their asset references — you'll need to add them to the `homePageContent` document after the schema is extended.

### Prompt 2.1 — Extend the Sanity schema

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and the
Sanity schema files under sanity/schemas/ before starting.

Task: extend the homePageContent Sanity schema to support a hero cycle sequence.

Requirements:
1. Add a new array field `heroCycle` to homePageContent.
2. Each array item is an object of type `heroCycleSlide` with these fields:
   - `_key` (Sanity auto)
   - `kind` (string, required) — one of: 'three-js-figure', 'photo', 'typography', 'video-loop'
   - `image` (image, conditional) — required when kind === 'photo'; include hotspot
   - `videoFile` (file, conditional) — required when kind === 'video-loop'; accept mp4/webm
   - `typographicWord` (string, conditional) — required when kind === 'typography'
   - `caption` (string, optional) — screen-reader label, used by all kinds
   - `durationMs` (number, default 8000) — how long this slide shows before cross-fade
3. Add a sibling field `heroHeadlineStatic` (string, required) — the part of the
   headline that never moves.
4. Add a sibling field `heroHeadlineAnchorWord` (string, required) — the one word
   styled in italic Fraunces mocha (the "anchor word" — e.g. "presence").
5. Add a sibling field `heroSubhead` (text, optional).
6. Add a sibling field `heroCtaLabel` (string) and `heroCtaHref` (string).
7. Register any new sub-schema in sanity/schemaTypes/index.ts.
8. Update lib/types.ts:
   - Add interface `HeroCycleSlide` matching the schema
   - Extend the existing `HomePageContent` interface with the new fields
9. Update lib/sanity.ts `getHomePageContent()` GROQ query to include the new
   fields — use the standard fetchList/fetchOne pattern already in that file.
10. Do NOT yet touch any component. This prompt is schema + types + fetcher only.

Acceptance criteria:
☐ Schema file edits validate in Sanity Studio (I will deploy and test)
☐ `npm run lint` passes
☐ `npm run build` passes with no type errors
☐ Summary of every file changed at the end of your response

[NON-NEGOTIABLES]
```

**After this runs:**
1. `npm run sanity:deploy` to push the schema
2. Open Sanity Studio, edit the homePageContent document:
   - Fill `heroHeadlineStatic` with something like: "Body-led leadership for the quietly"
   - Fill `heroHeadlineAnchorWord`: "ambitious" (or "present", "grounded" — pick what lands)
   - Fill `heroSubhead`, `heroCtaLabel`, `heroCtaHref`
   - Add 4 heroCycle slides in this order: three-js-figure, photo (hero-fragment-01), typography (word: "presence"), photo (hero-fragment-02). Set durationMs to 8000 for all.
3. Verify it saves without errors.

### Prompt 2.2 — Build the cycling hero component

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md,
.github/copilot-instructions.md, and the existing components/sections/home/hero/
folder before starting.

Context: Phase 2.1 added Sanity schema support for a hero cycle. The data is now
available via getHomePageContent() in lib/sanity.ts, and typed as HeroCycleSlide[]
in lib/types.ts. The existing Three.js windmill figure component stays — it
becomes one of the cycle slides.

Task: rebuild components/sections/home/hero/Hero.tsx into a full-bleed hero with
fixed elements and a cycling visual.

Layout (desktop; mobile adapts — see below):
- Section height: 100vh, min-height: 640px. Full-bleed (break out of the usual
  SectionContent max-width — let the section touch the viewport edges).
- Two-column grid on >=1024px: left column (40%) for fixed text, right column
  (60%) for the cycling visual. On <1024px, stack — text on top, visual below
  at 60vh.
- FIXED elements (never animate during the cycle):
    * Headline: heroHeadlineStatic followed by heroHeadlineAnchorWord. The anchor
      word is wrapped in <span className="hero-anchor-word"> and styled italic
      Fraunces, colour var(--mocha-mousse), slight kerning (letter-spacing: -0.01em).
    * Subhead (smaller, var(--text-secondary))
    * CTA button linking to heroCtaHref
- CYCLING visual (right column) — reads heroCycle[] from Sanity and rotates through:
    * 'three-js-figure' → render the existing Three.js windmill component
      (preserve the existing import and props; do not touch its internals)
    * 'photo' → render <Image /> from next/image with the Sanity image, object-fit
      cover, aspect 4:5, subtle grain overlay via a ::after with radial noise SVG
      (inline data URI is fine)
    * 'typography' → render the typographicWord at massive scale (clamp(8rem,
      20vw, 16rem)), Fraunces italic, colour var(--mocha-mousse), centred, with
      optical-sizing: 144
    * 'video-loop' → <video autoPlay muted loop playsInline> with the Sanity
      file URL

Cycle behaviour:
- Auto-advance: move to next slide every slide.durationMs (default 8000).
- Cross-fade transition: 600ms opacity cross-fade between slides.
  Implement with two absolutely-positioned layers that swap visibility.
- Pause on hover over the visual column (for desktop). Pause when the section
  is not in the viewport (IntersectionObserver) to save cycles.
- Respect prefers-reduced-motion: if set, show only the first slide, no cycling.
- No autoplay on mobile (<768px) for video-loop slides unless the user taps.

Implementation details:
- This component must be 'use client' because of the interval + IntersectionObserver.
- Import types from @/lib/types.
- Preserve any existing Three.js-related imports and lazy-loading logic — do not
  break the current windmill render.
- Copy comes from Sanity via props. This component receives { content: HomePageContent }
  as its only prop. No hardcoded strings anywhere.
- Accessibility: each cycling slide has aria-hidden on non-active layers. The
  whole visual region has role="img" and an aria-label that reads the active
  slide's caption.

Styles:
- Add all new styles to app/css/sections.css under a comment banner:
    /* ============================================================
       HOME HERO — cycling full-bleed hero
       ============================================================ */
- BEM-ish: .home-hero, .home-hero-text, .home-hero-headline,
  .home-hero-anchor-word, .home-hero-subhead, .home-hero-cta, .home-hero-visual,
  .home-hero-slide, .home-hero-slide--active, .home-hero-slide--photo,
  .home-hero-slide--typography, .home-hero-slide--three-js, .home-hero-slide--video.
- No !important. Use @layer components properly.
- The cross-fade uses opacity + a 600ms ease-in-out transition.

Do NOT touch:
- The existing Three.js figure component internals
- app/page.tsx unless the Hero props signature changes (it shouldn't)
- Any other section component

Acceptance criteria:
☐ Hero renders full-bleed, 100vh
☐ Headline and CTA never move during cycle
☐ Visual cycles through all slides defined in Sanity
☐ Cross-fade transitions are smooth (no flash of empty content)
☐ Pauses on hover (desktop) and off-screen
☐ Respects prefers-reduced-motion
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed at the end of your response

[NON-NEGOTIABLES]
```

### Verification

- Open homepage, confirm cycle runs through all 4 slides over 32 seconds
- Hover the visual — should pause
- Scroll down past the hero — should pause (DevTools → Performance tab shows the timer halting)
- Toggle "Reduce motion" in macOS System Settings → only first slide shows
- Mobile emulation at 375px — verify stacked layout, no video autoplay

**Commit:**
```bash
git commit -am "feat(home): full-bleed cycling hero with fixed headline"
```

---

## Phase 3 — Expressive & Kinetic Typography System

**Goal:** Make Fraunces do more. Anchor words (4–5 signature words) get a consistent treatment everywhere. Headlines use variable-font axes for warmth. Selected words animate into view on scroll. No word-spinning gimmicks.

**Files primarily touched:**
- `app/css/typography.css`
- `app/globals.css` (font-loading tweaks if needed)
- `components/typography/AnchorWord.tsx` (new)
- `components/typography/KineticHeading.tsx` (new)
- `lib/hooks/useScrollTrigger.ts` (extend if needed)

### Pre-flight

- [ ] Phase 2 merged and verified
- [ ] Decide your anchor-word list now. Recommended: `presence`, `stillness`, `nonchalant`, `grounded`, `movement`

### Prompt 3.1 — AnchorWord component + Fraunces variable axes

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and the
existing components/typography/ folder before starting.

Task: establish the "anchor word" typographic system and unlock Fraunces'
variable axes for expressive headlines.

Part A — Fraunces variable axes
1. Inspect how Fraunces is loaded (app/globals.css, possibly app/layout.tsx).
   Confirm the variable font with SOFT and WONK axes is being loaded (not just
   static weights).
2. If it's currently loading static weights, switch to the variable font via
   next/font/google with:
      - weight: 'variable'
      - style: ['normal', 'italic']
      - axes: ['SOFT', 'WONK', 'opsz']
      - display: 'swap'
3. Add CSS classes in app/css/typography.css under a new banner:
      /* ============================================================
         EXPRESSIVE FRAUNCES — variable axis system
         ============================================================ */
   Classes to add:
    .type-display           → font-family Fraunces, opsz 144, SOFT 100, weight 400,
                              line-height 0.95, letter-spacing -0.02em
    .type-display--soft     → SOFT 100, WONK 1, italic — warmest, used on About
    .type-headline          → opsz 72, SOFT 50, weight 500
    .type-eyebrow           → DM Sans, weight 500, text-transform uppercase,
                              letter-spacing 0.12em, size 0.78rem, colour
                              var(--mocha-deep)

Part B — AnchorWord component
1. Create components/typography/AnchorWord.tsx as a server component.
2. Props:
      - children: string (required)
      - as?: 'span' | 'em' | 'strong' (default 'span')
      - variant?: 'default' | 'large' | 'inline' (default 'inline')
      - noItalic?: boolean (default false)
3. Rendering:
      - Wraps children in the chosen element with className "anchor-word
        anchor-word--{variant}".
      - Applies italic Fraunces, colour var(--mocha-mousse), slight negative
        kerning, opsz scaling based on variant.
4. Add styles to app/css/typography.css under the same banner:
    .anchor-word               → italic Fraunces, colour var(--mocha-mousse),
                                 letter-spacing -0.01em, font-variation-settings
                                 "opsz" 72, "SOFT" 100
    .anchor-word--large        → font-size clamp(2rem, 5vw, 4rem)
    .anchor-word--inline       → inherits surrounding size
5. Export from components/typography/index.ts.

Part C — Migrate visible uses
1. Find every occurrence of these words in component JSX that comes from Sanity
   or is a heading: presence, stillness, nonchalant, grounded, movement.
   Wrap them in <AnchorWord>…</AnchorWord> WHERE THE WORD IS EMPHATIC (i.e. part
   of a headline or pull-quote). Do NOT wrap inside body paragraphs — that will
   be too loud.
2. If a Sanity-sourced string contains one of these words, do not rewrite the
   Sanity content. Instead, create a small helper in lib/typography.ts:
      export function withAnchorWords(text: string, words: string[]): ReactNode[]
   that splits the text and wraps matches in <AnchorWord>. Use this helper in
   Hero.tsx (Phase 2) to post-process the headline string if it contains any
   anchor word. This is the ONE exception to the "no transformations on Sanity
   copy" rule — it's presentational, not editorial.

Acceptance criteria:
☐ Fraunces variable font loads with SOFT/WONK/opsz axes
☐ .type-display renders with noticeably warmer, softer letterforms vs before
☐ <AnchorWord>word</AnchorWord> renders italic mocha with tight kerning
☐ withAnchorWords helper correctly wraps matches in a string
☐ Homepage hero's anchor word now uses the AnchorWord component
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

### Prompt 3.2 — KineticHeading (scroll-triggered word reveal)

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and
lib/hooks/useScrollTrigger.ts before starting.

Task: build a KineticHeading component that animates headlines word-by-word as
they enter the viewport. This is for About > Philosophy and other sections where
the typography itself is the visual. Not for body copy.

Requirements:
1. Create components/typography/KineticHeading.tsx as a 'use client' component.
2. Props:
      - children: string (required) — the full heading text
      - as?: 'h1' | 'h2' | 'h3' (default 'h2')
      - anchorWords?: string[] (default []) — words to wrap in AnchorWord
      - className?: string
3. Implementation:
      - Split children on whitespace, render each word in a <span
        className="kinetic-word"> with a style --word-index set to its position.
      - Use useScrollTrigger (or IntersectionObserver directly if the hook doesn't
        expose what you need — extend the hook rather than bypassing it) to detect
        when the heading enters the viewport (threshold 0.3).
      - On enter, add className "kinetic-heading--revealed" to the container.
      - CSS handles the reveal: each word fades in + translates up 10px, staggered
        200ms apart (using --word-index).
      - If a word matches anchorWords (case-insensitive), wrap its inner text in
        <AnchorWord> — the animation still applies, the styling is additive.
      - Respect prefers-reduced-motion: skip animation, set revealed immediately.
4. Styles in app/css/typography.css:
    .kinetic-heading           → composition base, display block
    .kinetic-word              → display inline-block, opacity 0, transform
                                 translateY(10px), transition opacity 700ms
                                 ease-out, transform 700ms ease-out, transition-delay
                                 calc(var(--word-index) * 80ms)
    .kinetic-heading--revealed .kinetic-word → opacity 1, transform none
    @media (prefers-reduced-motion: reduce) { .kinetic-word { opacity: 1;
      transform: none; transition: none; } }
5. Export from components/typography/index.ts.
6. Do NOT replace existing <Heading> component usages globally. This component
   is opt-in for sections that want the effect — we'll use it in Phases 4 and 5.

Acceptance criteria:
☐ <KineticHeading>The quiet path to presence</KineticHeading> animates word-by-word
  when scrolled into view
☐ anchorWords={['presence']} correctly styles "presence" as mocha italic
☐ prefers-reduced-motion shows the heading instantly, no animation
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

### Verification

- Create a quick test page (or temporarily add to homepage bottom) with `<KineticHeading anchorWords={['presence']}>The quiet path to presence</KineticHeading>` and verify word-by-word reveal
- Check in DevTools that animation respects reduce-motion
- Verify AnchorWord looks right in the hero

**Commit:**
```bash
git commit -am "feat(typography): expressive Fraunces + AnchorWord + KineticHeading system"
```

---

## Phase 4 — About > Origin Cinematic Scrollytelling

**Goal:** The About > Origin section becomes a scrollytelling experience — a full-bleed image pins, copy fades in, image cross-fades to the next scene as you scroll. Five scenes total. This is the emotional narrative of Jon's why.

**Files primarily touched:**
- `components/sections/about/origin/Origin.tsx`
- `app/css/sections.css`
- `sanity/schemas/aboutPage.ts` (extend phases to include image per scene)
- `lib/sanity.ts`
- `lib/types.ts`

### Pre-flight

- [ ] Phase 3 merged and verified
- [ ] All 5 `origin-01` through `origin-05` images uploaded to Sanity
- [ ] Copy for the 5 scenes drafted (by you, not Sonnet — this is brand-voice territory)

### Image/asset reminder block

> 📸 **Before running Prompt 4.1:**
> 1. In Sanity Studio, open the aboutPage document.
> 2. For each of the 5 phases, upload the corresponding `origin-XX` image.
> 3. Write/refine copy for each scene — keep it short (1–3 sentences per scene). This is the emotional core of your About page; don't let Sonnet draft this for you.

### Prompt 4.1 — Extend aboutPage schema for image-per-phase

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and the
existing aboutPage schema + Origin component before starting.

Task: extend the aboutPage Sanity schema so each phase in the origin story has
its own full-bleed image and optional caption.

Requirements:
1. In sanity/schemas/aboutPage.ts, find the existing `phases` array field.
2. Each phase currently has (approx): title, description, order. Add:
      - image (image, required, with hotspot)
      - imageAlt (string, required) — for accessibility
      - pullQuote (string, optional) — a single line for big typographic emphasis
3. Also add top-level fields on aboutPage:
      - originSectionAnchorWord (string, optional) — the single anchor word for
        the section (e.g. "path")
4. Update lib/types.ts:
      - Extend OriginPhase interface (or whatever the current one is called)
      - Extend AboutPageContent interface
5. Update the GROQ query in lib/sanity.ts getAboutPageContent() to include the
   new fields.
6. Do NOT touch the component yet.

Acceptance criteria:
☐ Schema deploys without errors (I will verify in Studio)
☐ Types are updated, no build errors
☐ GROQ query returns the new fields
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

**After this runs:** deploy schema (`npm run sanity:deploy`), fill in all 5 phase images, captions, and pull quotes in Studio.

### Prompt 4.2 — Build the scrollytelling Origin component

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md,
.github/copilot-instructions.md, and the existing
components/sections/about/origin/Origin.tsx before starting. The Sanity schema
was extended in the prior step — each phase now has an image, imageAlt, and
pullQuote.

Task: rebuild Origin.tsx as a cinematic scrollytelling section where a full-bleed
image pins in place while captions scroll past, and the image cross-fades to the
next scene when the corresponding caption enters the viewport.

Layout:
- Section is full-bleed, ~100vh tall per phase (total height = phases.length * 100vh).
- Inside the section, a sticky container at top: 0 holds the active image at full
  viewport size (100vh).
- On the opposite side of the viewport (right on desktop, overlaid on mobile), a
  scroll-through column contains the phase captions — each caption takes ~100vh
  of scroll space.
- As the user scrolls, IntersectionObserver detects which caption is currently in
  view, and cross-fades the sticky image to that phase's image.

Implementation:
1. This must be a 'use client' component (IntersectionObserver + state).
2. Structure:
      <section className="origin-scrolly">
        <div className="origin-scrolly-sticky">
          {phases.map(phase => (
            <Image
              key={phase._key}
              className={`origin-scrolly-image ${active === i ? 'is-active' : ''}`}
              src={phase.imageUrl}
              alt={phase.imageAlt}
              fill
              sizes="100vw"
              priority={i === 0}
            />
          ))}
        </div>
        <div className="origin-scrolly-scroll">
          {phases.map((phase, i) => (
            <article ref={refs[i]} className="origin-scrolly-scene">
              <KineticHeading as="h3" anchorWords={[...anchorWords]}>
                {phase.title}
              </KineticHeading>
              <p>{phase.description}</p>
              {phase.pullQuote && <blockquote>{phase.pullQuote}</blockquote>}
            </article>
          ))}
        </div>
      </section>
3. All images are rendered absolutely positioned, stacked. Only .is-active has
   opacity 1; others opacity 0, 800ms cross-fade.
4. IntersectionObserver watches each .origin-scrolly-scene with threshold 0.5
   and rootMargin "-30% 0px -30% 0px" so the active scene is roughly centre-screen.
5. On mobile (<768px), flip to a simpler stacked layout: image on top at 70vh,
   caption below, no pinning. Still fade between images if the layout allows,
   else just let them scroll normally.
6. Respect prefers-reduced-motion: disable cross-fade (hard swap only) and
   disable KineticHeading animation (already built in).
7. Use next/image with Sanity urlFor() — ensure images are optimised.

Styles in app/css/sections.css, under banner:
      /* ============================================================
         ABOUT ORIGIN — scrollytelling
         ============================================================ */
Classes:
  .origin-scrolly, .origin-scrolly-sticky, .origin-scrolly-image,
  .origin-scrolly-image.is-active, .origin-scrolly-scroll, .origin-scrolly-scene,
  .origin-scrolly-scene-quote.
No !important.

Data flow:
- The parent (app/about/page.tsx) already fetches aboutPageContent and passes
  data to <Origin />. Extend the Origin props type to include the new per-phase
  image fields. If the current prop shape differs, adapt — but keep the import
  site in app/about/page.tsx updated accordingly.

Do NOT touch:
- Any other About section (Philosophy, Introvert, Services, Hero)
- The overall page wrapper structure

Acceptance criteria:
☐ Scrolling through Origin section shows the image pinned and cross-fading
  between 5 scenes
☐ Each scene's KineticHeading animates when it enters the viewport
☐ On mobile, stacked layout works without pinning
☐ prefers-reduced-motion disables cross-fade and word animation
☐ All 5 images load optimally (priority on first, lazy on rest)
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

### Verification

- Scroll through About page slowly — each scene should pin, then swap
- Test on mobile emulation (375px) — should gracefully degrade to stacked
- Toggle reduce-motion — cross-fades should become hard cuts, no word animation
- Lighthouse performance score should stay >=85 (the cross-fade uses opacity, which is compositor-only — GPU-efficient)

**Commit:**
```bash
git commit -am "feat(about): cinematic scrollytelling on Origin section"
```

---

## Phase 5 — Bento Grids (Homepage + Programs)

**Goal:** Replace uniform card grids with asymmetric bento layouts. Mixed cell sizes break visual monotony. Homepage service cards become a 4-cell bento. Programs 8-week curriculum becomes a 2x4-ish bento with varied tile sizes.

**Files primarily touched:**
- `components/shared/bento/Bento.tsx` (new)
- `components/sections/home/services/` (refactor or replace)
- `components/sections/programs/FocusAreas.tsx` or new `CurriculumBento.tsx`
- `app/css/layout.css` and `app/css/cards.css`

### Pre-flight

- [ ] Phase 4 merged and verified
- [ ] All 8 week illustrations delivered and saved to `/public/illustrations/week-0X.svg`
- [ ] Homepage service-card copy reviewed (and updated in Sanity if needed)

### Image/asset reminder block

> 🖼️ **Before running Prompt 5.2:**
> 1. Confirm all 8 week illustrations are in `/public/illustrations/` as SVG.
> 2. SVGs must use `currentColor` for stroke/fill so they recolour on hover.
> 3. Upload illustrations to Sanity Studio as an asset if you want editorial control later (optional — filesystem is fine for v1).

### Prompt 5.1 — Generic Bento component

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md before
starting.

Task: build a generic, reusable Bento grid component that takes children and
positions them in a varied grid using CSS Grid.

Requirements:
1. Create components/shared/bento/Bento.tsx (server component).
2. Subcomponent: <BentoCell> with props:
      - size?: 'sm' | 'md' | 'lg' | 'tall' | 'wide' (default 'md')
      - children: ReactNode
      - className?: string
3. <Bento> props:
      - columns?: number (default 4 on desktop)
      - gap?: 'sm' | 'md' | 'lg' (default 'md')
      - children: ReactNode (should be BentoCell instances)
      - className?: string
4. Implementation:
      - <Bento> renders a CSS Grid container. Base: grid-template-columns:
        repeat(var(--bento-columns), 1fr). On mobile, always 1 column.
      - <BentoCell> renders a div with data-size="{size}" and CSS handles the
        grid-column/grid-row span based on that attribute.
      - Size mapping (desktop, in a 4-column grid):
          sm    → span 1 col, 1 row
          md    → span 2 col, 1 row
          lg    → span 2 col, 2 rows
          tall  → span 1 col, 2 rows
          wide  → span 3 col, 1 row
      - Media query at <768px: every cell becomes 1 col, auto row.
      - Media query 768–1024px: wide/lg become 2 cols, others 1 col.
5. Styles go in app/css/layout.css under banner:
      /* ============================================================
         BENTO GRID — reusable asymmetric layout
         ============================================================ */
6. Export from components/shared/bento/index.ts.
7. Re-export from components/sections/index.ts: `export { Bento, BentoCell } from '@/components/shared/bento';`

Acceptance criteria:
☐ <Bento><BentoCell size="lg">…</BentoCell>…</Bento> produces a varied grid
☐ Responsive collapses cleanly to 1 col on mobile
☐ No content overflow or broken spans at any breakpoint
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

### Prompt 5.2 — Homepage "Why It Works" bento (replaces current service cards)

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md, the existing
components/sections/home/, and the Bento component created in Phase 5.1 before
starting.

Task: replace the homepage's current service-card section with a "Why It Works"
bento layout — 4 cells, mixed sizes, each cell pairs a small body-fragment
image with a one-line insight.

Requirements:
1. Create components/sections/home/why-it-works/WhyItWorks.tsx.
2. Data source: Sanity. Extend the existing `services` Sanity schema or create a
   new homePageContent field `whyItWorksCells` — an array of 4 items, each with:
      - title (string)
      - insight (text, one sentence)
      - image (Sanity image, required)
      - size ('sm' | 'md' | 'lg' | 'tall' | 'wide')
   Pick whichever approach is cleaner. If you add to homePageContent, update the
   schema, the GROQ query, and lib/types.ts (interface WhyItWorksCell).
3. Layout using <Bento columns={4}>:
      - Cell 1: size="lg"  — large image + title + insight (the flagship)
      - Cell 2: size="sm"  — small image only
      - Cell 3: size="sm"  — text-only, pull quote style
      - Cell 4: size="tall" — image + title stacked
   Feel free to vary the exact mapping in Sanity by exposing `size` as a field.
4. Use <KineticHeading> for the section heading ("Why it works" or similar —
   copy comes from Sanity field on homePageContent: whyItWorksHeadline).
5. Images use next/image with Sanity urlFor(). Aspect ratios should be consistent
   enough to not create whitespace gaps — crop via Sanity hotspot.
6. Replace the current service-cards import in app/page.tsx with <WhyItWorks />.
   Do NOT delete the old Services component file — just stop using it on the
   homepage. (It may still be used on About.)
7. Styles go in app/css/sections.css under banner:
      /* ============================================================
         HOME — Why It Works bento
         ============================================================ */
   Classes: .why-it-works, .why-it-works-cell, .why-it-works-cell-image,
   .why-it-works-cell-body, .why-it-works-cell-title, .why-it-works-cell-insight.

Acceptance criteria:
☐ Section renders 4 cells in a varied bento layout on desktop
☐ Collapses gracefully on mobile
☐ Copy and images come from Sanity — none hardcoded
☐ KineticHeading animates on scroll
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

**Before running 5.2:** open Sanity Studio after the schema update deploys and create 4 cells with real copy + images. Four 500x500ish crops from the photo shoot will work.

### Prompt 5.3 — Programs curriculum bento

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md, the existing
components/sections/programs/, and the Bento component before starting.

Task: build a CurriculumBento component for the Programs page showing the 8-week
curriculum as an asymmetric bento grid. Each tile: week number (Fraunces),
week title, one-line description, and a small line-drawing illustration from
/public/illustrations/week-0X.svg.

Requirements:
1. Create components/sections/programs/CurriculumBento.tsx.
2. Data source: Sanity — extend the existing program schema's 8-week curriculum
   data, OR (if it doesn't exist as structured data yet) create a new document
   type `curriculumWeek` with:
      - weekNumber (number, 1-8)
      - title (string)
      - oneLineDescription (text)
      - illustrationSlug (string) — e.g. "week-01" — mapped to
        /public/illustrations/{slug}.svg
      - bentoSize ('sm'|'md'|'lg'|'tall'|'wide', default 'sm')
      - order (number)
   If you create this type, register it in sanity/schemaTypes/index.ts and add
   a getCurriculumWeeks() fetcher in lib/sanity.ts + CurriculumWeek interface in
   lib/types.ts.
3. Bento layout suggestion (final mapping editable in Sanity):
      Week 1 (Body Audit)         → lg    (flagship — biggest)
      Week 2 (Posture & Grounding) → sm
      Week 3 (Movement)           → md
      Week 4 (Stillness & Timing) → tall  (highlights the core concept)
      Week 5 (Voice & Breath)     → sm
      Week 6 (High-Stakes)        → wide
      Week 7 (Personal Style)     → sm
      Week 8 (Integration)        → md
4. Each tile renders:
      <BentoCell size={week.bentoSize}>
        <span className="curriculum-week-number">{week.weekNumber}</span>
        <h3 className="curriculum-week-title">{week.title}</h3>
        <p className="curriculum-week-desc">{week.oneLineDescription}</p>
        <object type="image/svg+xml" data={`/illustrations/${week.illustrationSlug}.svg`}
          className="curriculum-week-illustration" />
      </BentoCell>
5. Hover state: illustration rotates 6deg and scales 1.05, title colour shifts to
   mocha-mousse. Smooth 300ms transition. Add to app/css/interactions.css.
6. Illustration stroke colour must use `color: var(--mocha-deep)` and SVG uses
   currentColor for stroke — so hover can shift it. If the SVGs don't use
   currentColor yet, skip the hover recolour but still do the rotate/scale.
7. Styles in app/css/sections.css under banner:
      /* ============================================================
         PROGRAMS — Curriculum Bento
         ============================================================ */
8. Import and render in app/programs/page.tsx between PageHero and the existing
   ProgramsSection. Add a section heading via Sanity programsPageContent
   (add field `curriculumHeadline` if needed).

Acceptance criteria:
☐ 8 curriculum tiles render in a bento grid
☐ Illustrations load (even if stylistically unfinished)
☐ Hover effects work smoothly (no jank)
☐ Mobile stacks cleanly
☐ All copy from Sanity
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

**Commit after both sub-phases:**
```bash
git commit -am "feat(layout): bento grids on homepage + programs curriculum"
```

---

## Phase 6 — Micro-Delight Pass

**Goal:** Small, fast, cumulative interactions. These are what make the site feel *alive* rather than static. Mocha cursor dot, link underline draws, button hover, form field focus, section scroll reveals, page transition mocha sweep.

**Files primarily touched:**
- `components/utilities/cursor/MochaCursor.tsx` (new)
- `app/css/interactions.css`
- `components/layout/PageTransition.tsx`
- Various form components

### Pre-flight

- [ ] Phase 5 merged and verified
- [ ] No current blocking bugs — micro-delight amplifies whatever state the site is in

### Prompt 6.1 — Mocha cursor dot

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md before starting.

Task: add a small, eased mocha cursor dot that follows the actual cursor with a
~150ms lag, giving a tactile feel.

Requirements:
1. Create components/utilities/cursor/MochaCursor.tsx ('use client').
2. Behaviour:
      - Renders a 12px circle, background var(--mocha-mousse), mix-blend-mode
        'multiply', position fixed, pointer-events none, z-index 9999.
      - Tracks mouse position via mousemove listener; moves to mouse coords with
        an easing lerp (factor 0.18 per frame via requestAnimationFrame).
      - Grows to 36px + transparent fill + 1.5px mocha border when hovering over
        interactive elements (a, button, [role="button"], [data-cursor="hover"]).
        Detect via mouseover/mouseout on document.
      - Hides completely on touch devices (feature-detect via pointer: fine
        media query OR matchMedia).
      - Hides when document.hidden.
      - Respects prefers-reduced-motion — fall back to no lag (instant follow)
        but keep the visual.
3. Mount in app/layout.tsx inside RouteAwareLayout, after Navbar, before main.
4. Styles in app/css/interactions.css under banner:
      /* ============================================================
         MOCHA CURSOR — eased follow
         ============================================================ */
   Classes: .mocha-cursor, .mocha-cursor--hover.

Acceptance criteria:
☐ On desktop (pointer: fine), a small mocha dot follows the cursor with visible lag
☐ Over buttons/links, the dot grows and shows a ring
☐ On touch devices, no dot appears and no performance hit
☐ prefers-reduced-motion: dot still appears but follows instantly
☐ No layout shift or scroll jank introduced
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

### Prompt 6.2 — Link underline draw + button + form field polish

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md before
starting.

Task: polish the smallest interactions site-wide — link underlines, button
hovers, form field focus. All additive, no structural changes.

Changes — apply to app/css/interactions.css additions only (no JSX changes
unless specifically called out):

1. LINKS (anchor tags in prose contexts — use a CSS class to opt in):
      .link-underline-draw {
        position: relative;
        display: inline;
        background-image: linear-gradient(currentColor, currentColor);
        background-position: 0% 100%;
        background-repeat: no-repeat;
        background-size: 0% 1px;
        transition: background-size 250ms ease-out;
      }
      .link-underline-draw:hover, .link-underline-draw:focus-visible {
        background-size: 100% 1px;
      }
   Apply this class to TextLink component and inline links inside blog portable
   text components.

2. BUTTONS:
      .btn-primary (existing, if present): on hover, scale 1.03, box-shadow shift
      from 0 2px 6px rgba(42,31,26,0.08) to 0 6px 18px rgba(107,79,63,0.15).
      Active state: scale 0.98.
      Transition: 200ms ease-out.
      If .btn-primary doesn't exist as a CSS class, locate the current
      button styling in components.css and extend it.

3. FORM FIELDS (contact form + audit form + any <label>/<input> pair):
      - Floating label pattern: label sits above input. On focus OR when input
        has value, label shrinks to 0.78rem and slides up 18px with a
        colour shift to var(--mocha-deep). 200ms transition.
      - Input border: 1px solid var(--border-subtle) → on focus, 1px solid
        var(--mocha-mousse) with a soft outer glow via box-shadow (0 0 0 3px
        rgba(164,120,100,0.12)).
      - Do NOT change input structure or add JS — this is achievable via
        :focus-within and :not(:placeholder-shown) selectors.

4. Add the `.link-underline-draw` class to:
      - TextLink component (components/typography/TextLink.tsx)
      - Portable text link renderer (lib/blog/portableTextComponents.tsx) —
        find the <a> renderer and add the class.

Acceptance criteria:
☐ Any link marked with .link-underline-draw shows a left-to-right underline
  animation on hover
☐ Primary buttons have a subtle lift on hover
☐ Form inputs have a floating-label focus state with mocha glow
☐ No !important used anywhere
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

### Prompt 6.3 — Page transition mocha sweep

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and
components/layout/PageTransition.tsx before starting.

Task: replace or extend the current page transition with a subtle mocha sweep —
a thin mocha bar slides across the screen during route changes, suggesting
motion while the page content cross-fades.

Requirements:
1. PageTransition currently does a fade. Keep the fade for content.
2. Add an overlay element: a full-screen div with a narrow (12px) mocha-mousse
   bar at the top edge. On route change:
      - Bar slides from x: -100% to x: 0% in 250ms
      - Holds for 100ms
      - Slides out x: 0% → x: 100% in 250ms
3. Content fade crossfades during the hold.
4. Use the existing animation prop API — if animation is "fade" (default),
   include the sweep. Add a new animation prop value "fade-sweep" if you
   prefer to keep the current fade without the sweep elsewhere.
5. Respect prefers-reduced-motion: skip the sweep, just do the fade.
6. Styles in app/css/interactions.css under banner:
      /* ============================================================
         PAGE TRANSITION — mocha sweep
         ============================================================ */

Acceptance criteria:
☐ Navigating between pages shows a thin mocha bar sweeping across
☐ Content smoothly fades without flash
☐ No layout shift
☐ prefers-reduced-motion: sweep disabled
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

**Commit after all three:**
```bash
git commit -am "feat(interactions): micro-delight pass — cursor, links, buttons, forms, page transition"
```

---

## Phase 7 — Dance Page Chrome Strip

**Goal:** Remove visual chrome from the dance page so video dominates. Featured reel becomes full-bleed, autoplays muted, the navbar becomes translucent on scroll. It should feel like a film-reel site, not a coaching site.

**Files primarily touched:**
- `app/dance/page.tsx`
- `components/sections/dance/FeaturedVideo.tsx`
- `components/navigation/Navbar.tsx` (add a translucent mode)
- `app/css/sections.css`, `app/css/components.css`

### Pre-flight

- [ ] Phase 6 merged and verified
- [ ] Featured dance video is set in Sanity and plays correctly

### Prompt 7.1 — Full-bleed featured video + translucent nav

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md, the existing
app/dance/page.tsx, components/sections/dance/FeaturedVideo.tsx, and
components/navigation/Navbar.tsx before starting.

Task: strip chrome from the Dance page so the featured video dominates.

Part A — Full-bleed featured video
1. Modify components/sections/dance/FeaturedVideo.tsx:
      - Section becomes 100vh, full-bleed (break out of SectionContent).
      - Video element: autoplay, muted, loop, playsInline, object-fit cover,
        100% width + height.
      - Overlay gradient at bottom (from transparent to rgba(42,31,26,0.6)) so
        caption is readable.
      - Caption (video title, tiny supporting line) appears bottom-left, fades
        in 400ms after load.
      - Small "sound on" icon bottom-right — on click, unmute (toggles muted
        state). Add aria-label.
      - On scroll (after 50% of the video is scrolled past), pause the video
        and show a play icon overlay.
2. Add styles to app/css/sections.css under banner:
      /* ============================================================
         DANCE — full-bleed featured reel
         ============================================================ */

Part B — Translucent navbar on dance page
1. Modify components/navigation/Navbar.tsx:
      - Add a prop or context-aware variant. Options:
          Option A: accept a `variant` prop ('solid' | 'translucent-on-scroll').
          Option B: read the pathname via usePathname() and auto-apply translucent
                   variant on `/dance`.
      Pick Option B — simpler, scoped, no API change needed.
2. Translucent behaviour on /dance:
      - At scrollY < 80: navbar background transparent, text white, mix-blend-mode
        difference (for legibility over any video frame).
      - At scrollY >= 80: navbar gets a backdrop-filter blur (12px) + background
        rgba(244,235,224,0.85) + text var(--text-primary). Transition 250ms.
3. Make sure the Navbar is still 'use client' if it needs scroll state — it likely
   already is. If not, convert it carefully without breaking other pages.

Acceptance criteria:
☐ /dance opens with a full-screen autoplay-muted video
☐ Scroll pauses video and shows play icon
☐ Sound toggle works
☐ Navbar is translucent at top of /dance, becomes solid on scroll
☐ Other pages' navbar is unchanged
☐ `npm run lint` and `npm run build` pass

[NON-NEGOTIABLES]
```

**Commit:**
```bash
git commit -am "feat(dance): full-bleed featured video + translucent nav"
```

---

## Phase 8 — Presence Audit Reduction

**Goal:** The audit is your primary conversion. Strip it to the essence — one question on the screen at a time, kinetic type reveal, mocha mousse button, no nav/footer distractions. Should feel like *the only thing on the page*.

**Files primarily touched:**
- `app/audit/page.tsx`
- `app/audit/AuditClient.tsx` (already exists from prior work)
- `app/audit/layout.tsx` (new — suppresses Navbar/Footer)
- `app/css/pages.css`

### Pre-flight

- [ ] Phase 7 merged and verified
- [ ] Current audit wiring works end-to-end (the item from your outstanding list — verify email capture, scoring, follow-up)
- [ ] Audit copy is confirmed in Sanity

### Prompt 8.1 — Audit page reduction

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md, the existing
app/audit/ directory, and components/layout/RouteAwareLayout.tsx before starting.

Task: transform the /audit route into a radically reduced, immersive experience
— one question per screen, kinetic text reveal, mocha CTA, no distractions.

Requirements:

1. Hide global chrome on /audit
   - Create app/audit/layout.tsx that renders ONLY its children (no Navbar, no
     Footer). Check if RouteAwareLayout can be made pathname-aware (probably
     already is — confirm). If so, adjust RouteAwareLayout to hide chrome when
     pathname starts with /audit. If not, use the nested layout override.
   - Do NOT break the existing Navbar visibility on other routes.

2. One-question-per-screen flow
   - AuditClient.tsx currently renders (likely) a full questionnaire on one page.
     Refactor so only ONE question is visible at a time.
   - Progress indicator at the top: a thin mocha bar showing completion % (no
     text labels — just the bar). 1px tall, 200ms ease on update.
   - Navigation: "Back" (ghost button, text-only) left, "Next" (filled mocha
     button) right. Keyboard: Enter advances, Shift+Tab goes back.
   - Entering a question: question text uses <KineticHeading> for word reveal.
     Option buttons fade in 100ms staggered after the question.
   - Leaving a question: quick opacity fade 200ms, then next question mounts.

3. Visual treatment
   - Background var(--bg-primary) (cream).
   - Question text centred, max-width 640px, large Fraunces (clamp(2rem, 5vw,
     3.5rem), line-height 1.15).
   - Option buttons: stacked on mobile, inline on desktop if short. Each is a
     soft pill with mocha border; selected state has mocha fill.
   - CTAs: bottom of the viewport, not fixed — scroll with content on small
     screens.
   - No logo, no nav, no footer. One tiny "Jonchalant" text-mark bottom-left at
     0.78rem, mocha-deep, pointing to home.

4. End screens
   - Name/email capture screen: same treatment, two fields, floating labels
     (from Phase 6), single mocha CTA.
   - Results screen: the scoring band (Building Your Foundation / Developing
     Your Presence / Refining Your Edge) as a KineticHeading. Below: a short
     personalised summary, followed by a Calendly-style CTA linking to the
     discovery call (use the Calendly placeholder field from Sanity — do NOT
     hardcode the URL).

5. Accessibility
   - Each question is in a <fieldset> with a <legend> screen-reader-only.
   - Progress bar has role="progressbar" aria-valuenow/aria-valuemin/aria-valuemax.
   - Keyboard navigation works fully.
   - Focus trap is NOT needed since the page has no other chrome, but focus
     management on question change is: move focus to the new question heading.

6. Styles go in app/css/pages.css under banner:
      /* ============================================================
         AUDIT — immersive reduced experience
         ============================================================ */
   Update the table-of-contents comment at the top of pages.css to include this.

Do NOT touch:
- Anything in app/portal/ (the full 15-question assessment lives there — it's a
  different product)
- The audit API endpoint — we're changing UI only
- Any scoring logic — keep as-is

Acceptance criteria:
☐ /audit renders with no navbar, no footer, only the audit
☐ Questions appear one at a time with kinetic word reveal
☐ Progress bar updates smoothly
☐ Back/Next and keyboard navigation work
☐ Name/email capture and results screens match the reduced aesthetic
☐ Other pages still have navbar/footer unchanged
☐ `npm run lint` and `npm run build` pass
☐ Summary of files changed

[NON-NEGOTIABLES]
```

**Commit:**
```bash
git commit -am "feat(audit): immersive reduced one-question-per-screen experience"
```

---

## Phase 9 — Final Polish & QA Sweep

**Goal:** Remove legacy aliases, ensure visual consistency, performance audit, accessibility audit, final cleanup.

### Prompt 9.1 — Remove legacy colour aliases

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md before
starting.

Context: During Phase 1, legacy colour variables (--color-burnt-indigo,
--color-burnt-indigo-light, --color-muted-moss, --color-moss-light) were aliased
to the new Mocha Mousse variables to avoid breaking references during migration.
All phases since have moved to the new variable names. It's time to remove the
legacy aliases.

Task: remove legacy colour aliases and confirm nothing references them.

Steps:
1. Search the entire codebase (all file types) for these strings:
      --color-burnt-indigo
      --color-burnt-indigo-light
      --color-muted-moss
      --color-moss-light
   Output a list of every match (file + line).
2. For every match that is NOT in app/css/variables.css itself, replace it with
   the appropriate new variable:
      --color-burnt-indigo       → --mocha-deep
      --color-burnt-indigo-light → --mocha-mousse
      --color-muted-moss         → --sage-whisper
      --color-moss-light         → --mocha-soft
3. Once zero matches remain outside variables.css, delete the legacy alias
   declarations from variables.css.
4. Run `npm run lint` and `npm run build`. Report any failures.

Acceptance criteria:
☐ No codebase references to the legacy variable names remain
☐ variables.css no longer contains the legacy aliases
☐ Lint and build pass

[NON-NEGOTIABLES]
```

### Prompt 9.2 — Performance + accessibility audit

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md before
starting.

Task: run a self-audit across the redesigned site and produce a markdown report
at design-notes/phase-9-audit.md. Do not fix issues yet — just catalogue them.

Audit checklist:

A — Performance
1. For each full-bleed image component (home hero, origin scrollytelling, dance
   featured video poster), confirm:
     - next/image is used, not <img>
     - sizes attribute is set
     - priority is only on above-the-fold images
     - no layout shift (explicit width/height or fill + aspect-ratio CSS)
2. For each 'use client' component, confirm there's a reason it's client. If
   any can be server components, flag them.
3. For heavy imports (Three.js, Sanity client), confirm dynamic import or
   lazy loading where possible.
4. List any CSS that might cause layout thrash on scroll — transitions on
   properties other than transform, opacity, filter.

B — Accessibility
1. Every <button> and <a> has an accessible name (text content, aria-label,
   or aria-labelledby).
2. Images have alt text (or alt="" if decorative). Sanity imageAlt fields are
   populated.
3. Focus styles are visible (not outline: none without an alternative).
4. Colour contrast: mocha-mousse on cream — test with a contrast checker.
   Flag any combinations below WCAG AA (4.5:1 for normal text, 3:1 for large).
5. prefers-reduced-motion is respected in: hero cycle, origin scrollytelling,
   KineticHeading, mocha cursor, page transition.
6. Keyboard: can you complete the audit flow with keyboard only?

C — Visual consistency
1. Every heading uses either <Heading>, <KineticHeading>, or one of the
   .type-display/.type-headline/.type-eyebrow classes.
2. No hardcoded hex values remain in .tsx files outside data files.
3. Buttons share consistent sizing and transitions across pages.

D — Sanity-driven copy
1. No hardcoded user-facing English strings in components. Grep for strings like
   "Ready to", "Your presence", "Book a", "Get started" — any of these as literal
   strings in component JSX is a violation of our architecture. List them.

Output design-notes/phase-9-audit.md with sections for each checklist category
and a table of issues with file, line, severity (blocker/medium/low), and a
one-line fix suggestion.

[NON-NEGOTIABLES]
```

### Prompt 9.3 — Fix audit findings

```
You are working in the jonchalant Next.js codebase. Read CLAUDE.md and
design-notes/phase-9-audit.md before starting.

Task: fix all "blocker" and "medium" severity issues from the audit report. Skip
"low" severity unless fixing one is trivially in-path.

For each fix:
1. Briefly describe the change in your response
2. Update the audit file inline, striking through fixed items with [FIXED: date]

Acceptance criteria:
☐ All blocker and medium severity items resolved
☐ design-notes/phase-9-audit.md updated with resolution notes
☐ `npm run lint` and `npm run build` pass
☐ Final summary of files changed

[NON-NEGOTIABLES]
```

**Commit:**
```bash
git commit -am "chore(polish): remove legacy aliases, fix audit findings"
```

### Final merge

```bash
# Only after everything's verified on Netlify preview:
git checkout main
git merge --no-ff stillness-motion-redesign
git push origin main
# Delete baseline screenshots if they're bulky, or archive elsewhere
```

---

## Appendix A — Rollback Strategy

Each phase is one commit on the `stillness-motion-redesign` branch. To roll back:

```bash
# Roll back the most recent phase
git reset --hard HEAD~1

# Roll back to a specific phase
git log --oneline
git reset --hard <commit-hash>

# Nuclear option: abandon the branch entirely
git checkout main
git branch -D stillness-motion-redesign
git push origin --delete stillness-motion-redesign
```

Netlify will redeploy the current HEAD of `main` automatically. Your baseline screenshots in `/design-notes/baseline/` give you a visual reference for what "working" looked like before the project started.

---

## Appendix B — Image & Illustration Sourcing Brief

### Photography — "Documentary Stills, Not Headshots"

**Reference look:**
- Think Annie Leibovitz shooting a dancer, not LinkedIn profile photography.
- Kinfolk magazine, Cereal magazine, The Gentlewoman — muted, editorial, quiet.
- Black and white primarily; colour only if the mocha/cream palette is already present in the scene (wood, skin, natural textures).

**Shoot logistics:**
- 1 photographer, 2–3 hour slot, natural light preferred.
- One outfit — dark neutrals (charcoal, black, deep brown). No patterns.
- Location: a dance studio (primary) + a quiet room (introvert photo).
- Shot list (take 20+ frames per shot for variety):
  1. Shoulders dropping — back angle, close crop
  2. Hands mid-gesture — macro-ish, slight motion blur
  3. Feet planted — low angle, floor visible
  4. You teaching — side angle, mid-sentence
  5. You alone, still — three-quarter crop, reading or just sitting
  6. Walking toward camera — slightly out of focus, suggest motion

**Deliverables from photographer:**
- 10–15 final selects, high-res, colour-graded if colour
- Black-and-white versions of everything with print-level contrast
- Permission to duotone into mocha-mousse

### Illustrations — "Single continuous line"

**Reference look:**
- Saul Steinberg for wit
- Matisse line drawings for confidence
- Jean Jullien for modern minimalism

**Brief for illustrator:**
> 8 single-subject line drawings, ~500x500px each, SVG with `currentColor` stroke (no fills, no gradients). Stroke weight: 2–2.5px consistent across the set. Style: confident, slightly playful, minimal — no more than 30 strokes per drawing.
>
> The set depicts 8 weeks of a somatic leadership curriculum:
> 1. An eye opening (body audit)
> 2. A spine/feet rooted (posture)
> 3. An arrow arcing through motion (movement)
> 4. A pause / rest symbol, or a held figure (stillness)
> 5. A diaphragm or open mouth shape (voice & breath)
> 6. A doorway with light spilling out, or a spotlight (high-stakes)
> 7. A single folded garment or shoe (personal style)
> 8. A spiral or concentric circles (integration)
>
> Deliver as week-01.svg through week-08.svg. Must use `stroke="currentColor"`.

### Video loops (optional, stretch)

**Brief:**
- 2–3 second loops, seamless (first frame = last frame).
- Muted, no audio needed.
- 1080x1350 (4:5) for hero compatibility.
- Under 2MB each — use Handbrake or ffmpeg with H.264, CRF 26, fastdecode tuning.
- Subjects: shoulders dropping; hand opening from closed fist; weight shifting foot to foot; head turning slowly.

---

## Appendix C — Claude Code Prompting Patterns That Work Here

Patterns baked into every prompt above — worth knowing in case you need to write custom prompts mid-project.

**1. Force it to read context first.**
Every prompt starts with `Read CLAUDE.md and [specific file] before starting.` Sonnet 4.6 will skip context if you let it. This prevents drift.

**2. Separate audit from edit.**
Phase 1's audit-first approach is intentional. When a change might cascade (colour pivot, rename, API change), make Sonnet produce a report first so *you* can review the blast radius before any code changes.

**3. Explicit "do NOT touch" list.**
Near the end of every prompt, list the files and concepts that should remain untouched. Without this, Sonnet sometimes "helpfully" refactors adjacent code.

**4. Acceptance criteria as ticked boxes.**
The `☐` checklist at the end of each prompt is Sonnet's self-verification contract. In my experience, a concrete checklist dramatically reduces "mostly done" submissions.

**5. Always end with lint + build + summary.**
`npm run lint` and `npm run build` are your safety net. The "summary of files changed" is for your mental model — you should know every file touched.

**6. Split by "schema → fetcher → component."**
Multi-phase features (Hero cycle, Origin scrollytelling, Curriculum bento) all split into: (a) Sanity schema + types + fetcher, (b) Sanity Studio content entry by you, (c) component build. Each step is verifiable independently.

**7. Name banners in CSS files.**
`/* =================== SECTION NAME =================== */` in the consolidated CSS files. This becomes searchable navigation for you and Sonnet alike as pages.css/sections.css grow.

**8. "Feel free to vary X in Sanity" is a safety valve.**
When you want the final design decision to be yours (e.g. which curriculum week gets which bento size), expose it in Sanity so you can tune without re-prompting.

**9. If something surprises you, stop and ask before continuing.**
Applies to you and to Sonnet. If a prompt produces something that doesn't match the brief, don't patch it with another prompt — revert, refine the original prompt, and rerun. Prompts compound; bad prompts produce bad foundations.

---

## Final Notes

This plan has **23 prompts across 9 phases**, and at least **14 distinct assets** (photos + illustrations) to source. Expect roughly:

- **Photography and illustration sourcing**: 2–4 weeks parallel to dev work
- **Phase 1 (colour pivot)**: 1–2 hours
- **Phase 2 (hero cycle)**: 1 day, mostly blocked on photo availability
- **Phase 3 (typography)**: half a day
- **Phase 4 (scrollytelling)**: 1 day, blocked on origin photos
- **Phase 5 (bento)**: 1–2 days, blocked on illustrations
- **Phase 6 (micro-delight)**: 1 day
- **Phase 7 (dance chrome strip)**: 2–3 hours
- **Phase 8 (audit reduction)**: 1 day
- **Phase 9 (polish)**: half a day

**Total engineering time: ~5–7 working days over a 3–4 week calendar window** (the gap is for shoot scheduling and asset delivery).

Start with Phase 0 today. Schedule the photo shoot this week. The rest follows.
