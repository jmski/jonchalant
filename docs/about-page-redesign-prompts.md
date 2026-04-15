# About Page Redesign — Implementation Prompts for Claude Code

Run these prompts sequentially in Claude Code (VS Code terminal). Each prompt is self-contained and references the correct file paths based on the live codebase inspection.

---

## PROMPT 1: Scroll Animation System (Foundation — Run First)

```
We need a reusable scroll-reveal animation system for the about page (and eventually site-wide). Currently the about page has ZERO scroll animations (confirmed via DOM inspection — no scroll-fade or animate classes exist).

### What to build:

Create a new client component `components/animations/ScrollReveal.tsx` that wraps children with IntersectionObserver-based entrance animations.

Requirements:
- 'use client' component
- Uses IntersectionObserver (threshold: 0.2, triggerOnce: true)
- Supports multiple animation variants via a `variant` prop:
  - `fade` — opacity 0→1, 300ms ease-out
  - `fade-up` — opacity 0→1 + translateY(20px→0), 300ms ease-out  
  - `fade-left` — opacity 0→1 + translateX(-15px→0), 300ms ease-out
  - `fade-right` — opacity 0→1 + translateX(15px→0), 300ms ease-out
  - `scale-fade` — opacity 0→1 + scale(1.02→1), 300ms ease-out
  - `snap` — opacity 0→1, 150ms linear (no easing — intentionally abrupt)
- Supports a `delay` prop (in ms) for staggering multiple children
- Wraps everything in `@media (prefers-reduced-motion: no-preference)` — users who prefer reduced motion see content immediately with no animation
- Uses CSS transitions (NOT keyframe animations) for better performance
- The component renders a `<div>` wrapper with `will-change: transform, opacity` while not yet visible, and removes `will-change` after animation completes

### CSS:
Add the scroll-reveal styles to `app/css/interactions.css` (that's where all hover states and animations live). Use classes like `.scroll-reveal`, `.scroll-reveal--visible`, `.scroll-reveal--fade-up`, etc.

### Export:
Export from `components/animations/index.ts` alongside the existing ScrollFade and ScrollStagger exports.

### Props interface:
```tsx
interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale-fade' | 'snap';
  delay?: number; // ms
  className?: string;
}
```

Do NOT use any third-party animation libraries. Pure IntersectionObserver + CSS transitions.
```

---

## PROMPT 2: Background Rhythm Redesign

```
The about page currently alternates section wrapper backgrounds in a mechanical pattern: primary → secondary → primary → secondary → primary → secondary → tertiary. This creates a monotonous visual rhythm.

### Current mapping (from DOM inspection):
- Wrapper 0 (about-hero-section): primary
- Wrapper 1 (about-origin-section — "What Changed Everything"): secondary
- Wrapper 2 (about-turning-point-section — "The Moment It Clicked"): primary
- Wrapper 3 (about-methodology-narrative-section — "What I Actually Believe"): secondary
- Wrapper 4 (about-why-exists-section): primary
- Wrapper 5 (about-who-for-section): secondary
- Wrapper 6 (CTA): tertiary

### New mapping — use background to mark narrative importance:
- Wrapper 0 (hero): `primary` — clean start (no change)
- Wrapper 1 (origin — "What Changed Everything"): `tertiary` — warm shift signals "going deeper"
- Wrapper 2 (turning point — "The Moment It Clicked"): `primary` — back to clean, new chapter
- Wrapper 3 (philosophy — "What I Actually Believe"): `tertiary` — warm = intellectual core, most important section
- Wrapper 4 (why this exists): `primary` — clean = clarity of purpose
- Wrapper 5 (who this is for): `secondary` — subtle shift = filter mode
- Wrapper 6 (CTA): `tertiary` — warm = invitation (no change)

### File to edit:
The about page component is in `app/about/page.tsx`. The SectionWrapper components accept a `variant` prop. Change the variant values to match the new mapping above.

This is a simple prop change — just update the `variant` string on each `<SectionWrapper>` component. Don't change anything else about the page structure.
```

---

## PROMPT 3: Hero Section Polish

```
Improve the about page hero section (`.about-hero-section`) with better spatial composition and scroll-reveal animations.

### Current state (from DOM inspection):
- Two-column grid: `.about-hero-grid` with text left, image right
- Text column contains: `.about-hero-intro` (eyebrow "WHO I AM"), `.about-hero-title` (h1), `.about-hero-subtitle` (body paragraph)
- Image column: `.about-hero-image` wrapping a Next.js Image (323×431px)
- No animations exist

### Changes needed:

#### 1. Text column max-width
In `app/css/sections.css`, add `max-width: 520px` to `.about-hero-subtitle` (the body text paragraph). This brings line length from ~90 chars down to 65-75 chars for better readability.

#### 2. Breathing room below headline  
In `app/css/sections.css`, increase the margin between `.about-hero-title` and `.about-hero-subtitle`. Add `margin-top: 2rem` to `.about-hero-subtitle` (or increase existing margin-top if one exists).

#### 3. Staggered image alignment
Currently the image top-aligns with the eyebrow label. In `.about-hero-grid`, change the grid alignment so the image starts aligned with the headline area, not the eyebrow. You can do this by adding `align-items: start` to the grid and adding `margin-top: 2.5rem` to `.about-hero-image` — this drops the image down so it starts roughly aligned with the h1, creating a more editorial asymmetric layout.

#### 4. Add scroll-reveal animations
In the Hero component file (look in `components/sections/about/hero/Hero.tsx`), wrap elements with the new `ScrollReveal` component:
- Eyebrow + headline: `<ScrollReveal variant="fade-up">`
- Body text: `<ScrollReveal variant="fade-up" delay={150}>`
- Image: `<ScrollReveal variant="fade-right" delay={250}>`

This creates a three-beat entrance: headline → text → image. The sequence mirrors the narrative — you read about the quiet kid before you see him.

Import ScrollReveal from `@/components/animations`.
```

---

## PROMPT 4: "What Changed Everything" (Origin Section) Improvements

```
Improve the origin section (`.about-origin-section`, "What Changed Everything") with better spatial composition and pullquote emphasis.

### Current state:
- Full-width single column text
- Contains: `.about-origin-label` (eyebrow), `.about-origin-description` (paragraph), `.about-pull-quote` (blockquote with left border), then another `.about-origin-description` paragraph
- Text runs the full content width (~850px), creating excessively long line lengths (100+ chars)
- The pullquote has a left border but feels undersized relative to its importance

### Changes needed:

#### 1. Constrain text column width
In `app/css/sections.css`, add to `.about-origin-section`:
```css
.about-origin-section .about-origin-description,
.about-origin-section .about-origin-label {
  max-width: 640px;
}
```
This narrows the prose to a more intimate reading width appropriate for personal storytelling. Keep it left-aligned (NOT centered) so it maintains the editorial left-edge anchor from the sections above.

#### 2. Enhance the pullquote
The pullquote "It was a skill. And skills can be learned." is the most quotable line on the site. In `app/css/sections.css`, update `.about-pull-quote`:
- Increase vertical margin: `margin: 3rem 0` (currently probably less)
- Increase font size to roughly `1.75rem` / `28px` if it isn't already that size (check current size first)
- Increase left border width to `4px` if it's currently `3px`
- Add left padding of `2rem` to give more breathing room from the border
- Set `max-width: 640px` to match the paragraph constraints above

#### 3. Add scroll-reveal animations
In the Origin component (look in `components/sections/about/origin/Origin.tsx` or wherever this section lives):
- Wrap the eyebrow + description paragraphs in `<ScrollReveal variant="fade">`
- Wrap the pullquote in `<ScrollReveal variant="fade-left" delay={100}>` — the leftward motion matches the left border direction, creating a cohesive directional emphasis
- Wrap the second description paragraph in `<ScrollReveal variant="fade" delay={200}>`
```

---

## PROMPT 5: "The Moment It Clicked" (Turning Point Section) Fixes

```
Fix and improve the turning point section (`.about-turning-point-section`, "The Moment It Clicked").

### Current state (from DOM inspection):
- Two-column grid: `.about-origin-grid` with image LEFT, text RIGHT
- Image: 366×274px, Jon with kids at playground — this is the wrong image for a section about a school dance performance
- Text column: `.about-origin-content` with `.about-turning-point-label` (eyebrow), `.about-highlight` (bold Fraunces sentence), and four `.about-turning-point-paragraph` elements
- The bold highlight text was visually clipping/overflowing on the right edge during visual inspection
- Text column has too much content for the available space next to the image

### Changes needed:

#### 1. Fix text overflow
In `app/css/sections.css`, check `.about-origin-content` and `.about-highlight` for overflow issues. Add:
```css
.about-turning-point-section .about-origin-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.about-turning-point-section .about-highlight {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
```

#### 2. Allow text to flow below the image
Currently the two-column grid constrains the text to sit beside the image. The four paragraphs create a wall of text. Change the layout so the text flows BELOW the image after the grid:

In the component file for this section, restructure so:
- The grid (image left + highlight sentence + first paragraph right) stays as a two-column layout
- The remaining paragraphs (2nd, 3rd, 4th) sit BELOW the grid as full-width text, constrained to `max-width: 640px`

This means moving the later paragraphs out of the grid and into a separate container below.

#### 3. Image note
The current image (Jon with kids at playground) would be better in the "Why This Exists" section where he talks about having three kids. For now, keep it here — we'll address the image swap in a later prompt when we handle "Why This Exists". Just add a TODO comment in the code: `{/* TODO: Swap this image — playground/kids photo belongs in "Why This Exists" section */}`

#### 4. Add scroll-reveal animations  
- Image: `<ScrollReveal variant="scale-fade">` — different from the hero's fade-right, creating variety
- Highlight sentence + first paragraph: `<ScrollReveal variant="fade-up" delay={150}>`
- Below-grid paragraphs: `<ScrollReveal variant="fade" delay={200}>`
```

---

## PROMPT 6: Philosophy Section Redesign (The Big One)

```
Major spatial and interaction redesign of the philosophy section (`.about-methodology-narrative-section`, "What I Actually Believe"). This is the intellectual centrepiece of the brand and currently has zero visual distinction from surrounding sections.

### Current state (from DOM inspection):
- `.about-methodology-narrative-label` (eyebrow "WHAT I ACTUALLY BELIEVE")
- `.about-highlight` (bold Fraunces sentence: "That's what I'm teaching...")
- `.about-belief-grid` — CSS grid, two columns (401px each, 48px gap)
  - Two `.about-belief-block` elements, each with `.about-belief-label` (THE CHOREOGRAPHER / THE FREESTYLER) and `.about-belief-body` (description text)
  - Each card has a top border in burnt indigo
- `.about-philosophy-image-wrap` containing the split dance photo (850×372px)
- Then paragraphs of `.about-methodology-narrative-body` and `.about-methodology-narrative-paragraph`

### Changes needed:

#### 1. Make the comparison cards visually embody their meaning
In `app/css/sections.css`, differentiate the two cards:

THE CHOREOGRAPHER card (first `.about-belief-block`):
```css
.about-belief-block:first-child {
  border-top: 3px solid var(--color-burnt-indigo);
  border-radius: 0; /* Sharp corners = rigidity */
  padding: 2rem;
  background: rgba(74, 58, 92, 0.03); /* Very subtle burnt indigo tint */
  transition: all 0.1s linear; /* Fast, no easing = mechanical feel */
}

.about-belief-block:first-child:hover {
  background: rgba(74, 58, 92, 0.06);
  border-top-color: var(--color-burnt-indigo-light);
}

.about-belief-block:first-child .about-belief-label {
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.15em; /* Rigid, spaced-out feel */
}
```

THE FREESTYLER card (second `.about-belief-block`):
```css
.about-belief-block:last-child {
  border-top: 3px solid var(--color-muted-moss);
  border-radius: 12px; /* Rounded = organic */
  padding: 2rem;
  background: rgba(107, 142, 99, 0.03); /* Very subtle moss tint */
  transition: all 0.4s ease-out; /* Slow, eased = fluid feel */
}

.about-belief-block:last-child:hover {
  background: rgba(107, 142, 99, 0.06);
  border-top-color: var(--color-moss-light);
  transform: translateY(-2px); /* Subtle lift — the freestyler moves */
}

.about-belief-block:last-child .about-belief-body {
  font-style: italic; /* Flowing, expressive */
}
```

#### 2. Increase card size
Add to `.about-belief-block`:
```css
.about-belief-block {
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-belief-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
}

.about-belief-body {
  font-size: 1.0625rem; /* 17px — slightly larger than body text */
  line-height: 1.6;
  color: var(--text-secondary);
}
```

#### 3. Tighten card-to-image gap
Reduce the space between `.about-belief-grid` and `.about-philosophy-image-wrap` to `2rem` (32px). Check the current margin/padding between them and adjust.

#### 4. Constrain the philosophy paragraphs
The paragraphs after the image (`.about-methodology-narrative-body`, `.about-methodology-narrative-paragraph`) should have `max-width: 640px` for consistent reading width.

#### 5. Add scroll-reveal animations with metaphor-matching motion
In the philosophy component file, add ScrollReveal wrappers:
- Eyebrow + highlight: `<ScrollReveal variant="fade-up">`
- Choreographer card: `<ScrollReveal variant="snap">` — instant, rigid entrance matching its meaning
- Freestyler card: `<ScrollReveal variant="fade" delay={200}>` — smooth, delayed entrance matching its meaning  
- Philosophy image: `<ScrollReveal variant="fade" delay={100}>`
- Body paragraphs: `<ScrollReveal variant="fade" delay={150}>`

Import ScrollReveal from `@/components/animations`.
```

---

## PROMPT 7: "Why This Exists" Section Improvements

```
Improve the "Why This Exists" section (`.about-why-exists-section`) by pulling out the three powerful examples as distinct visual moments.

### Current state:
- `.about-why-exists-label` (eyebrow)
- `.about-highlight` (bold Fraunces: "None of those people are broken...")  
- Multiple `.about-why-exists-paragraph` elements containing:
  - Fitness industry paragraph
  - "I was always the second kind" line
  - Three kids paragraph with embedded examples (kid who freezes, teenager at restaurant, adult in interview)
  - "None of those people are broken" closing
  - "That's why Jonchalant exists" closer

### Changes needed:

#### 1. Pull the three examples into callout blocks
In the component file for this section, restructure the three examples from the paragraph text into their own styled containers. Create three callout elements with a CSS class `.about-callout`:

```html
<div class="about-callout">
  <p>The kid who freezes up when someone asks them a question in class.</p>
</div>
<div class="about-callout">
  <p>The teenager who can't order food at a restaurant without their heart racing.</p>
</div>
<div class="about-callout">
  <p>The adult who has every qualification for the job but goes completely blank in the interview.</p>
</div>
```

**Important:** These callout texts should be sourced from Sanity, not hardcoded. If the current content is already coming from Sanity (check `getAboutPageContent()`), you may need to adjust how the data is structured. If the content IS hardcoded in the component, extract it and keep it as-is for now with a TODO comment to move to Sanity.

#### 2. Style the callouts
In `app/css/sections.css`:
```css
.about-callout {
  border-left: 3px solid var(--color-muted-moss);
  padding: 1.25rem 1.5rem;
  margin: 1rem 0;
  background: rgba(107, 142, 99, 0.03);
  max-width: 640px;
}

.about-callout p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
}
```

#### 3. Constrain text width
All `.about-why-exists-paragraph` and `.about-highlight` in this section should have `max-width: 640px`.

#### 4. Add a pause before the closer
After the "None of those people are broken..." paragraph and before "That's why Jonchalant exists.", add a thin horizontal rule using the existing `.about-section-divider` class, or add `margin-top: 3rem` to the final "That's why Jonchalant exists" paragraph to create a visual pause. The pause lets the reader sit with the weight of the examples before the mission statement lands.

#### 5. Add scroll-reveal animations
- Eyebrow + highlight: `<ScrollReveal variant="fade-up">`
- Fitness industry paragraphs: `<ScrollReveal variant="fade" delay={100}>`
- Three callout blocks: Each wrapped in `<ScrollReveal variant="fade-up">` with staggered delays: delay={0}, delay={100}, delay={200}. The rhythmic stagger creates accumulating impact — example, example, example, then the payoff.
- Closing paragraphs: `<ScrollReveal variant="fade" delay={150}>`
```

---

## PROMPT 8: "Who This Is For" Section — Spatial Compression

```
Reshape the "Who This Is For" section (`.about-who-for-section`) with spatial compression to match its intimate, direct-address tone.

### Current state:
- `.about-who-for-label` (eyebrow)
- `.about-highlight` (bold Fraunces: "You don't have to be an introvert...")
- Multiple `.about-who-for-paragraph` elements
- Ends with "If none of that scared you off — keep reading."
- A `.about-section-divider` (horizontal rule) sits above this section

### Changes needed:

#### 1. Narrow this section's text dramatically  
In `app/css/sections.css`:
```css
.about-who-for-section .about-who-for-text-block {
  max-width: 540px;
}

.about-who-for-section .about-highlight {
  max-width: 540px;
}
```
This is the narrowest text column on the page. The spatial compression communicates intimacy — Jon is talking directly to one person. The narrow column reinforces "if you take yourself very seriously, you might find me exhausting."

#### 2. Give the dance styles sentence visual distinction
The sentence listing "hip hop, breaking, popping, waving, locking and krumping" is product information embedded in personal copy. Find this paragraph and add a subtle visual distinction. In `app/css/sections.css`:
```css
.about-who-for-section .about-who-for-paragraph--styles {
  background: rgba(107, 142, 99, 0.03);
  border-left: 2px solid var(--border-subtle);
  padding: 1rem 1.25rem;
  border-radius: 0 4px 4px 0;
  margin: 1.5rem 0;
}
```
You'll need to add a modifier class `.about-who-for-paragraph--styles` to that specific paragraph in the component. If the paragraphs come from Sanity as an array, identify which one contains the styles mention and apply the class conditionally.

#### 3. Fix the "keep reading" transition
"Keep reading" implies there's more content, but it goes straight to the CTA. Two options — pick one:

**Option A (recommended):** Change the text from "If none of that scared you off — keep reading." to "If none of that scared you off — let's talk." This naturally bridges into the CTA.

**Option B:** Remove "keep reading" entirely and end with "If you take yourself very seriously, you might find me exhausting." — let the CTA section be the natural next beat.

If the copy is in Sanity, update it in Sanity Studio. If it's hardcoded, update it in the component. Add a TODO comment to ensure it's in Sanity.

#### 4. Add scroll-reveal animations
- Eyebrow + highlight: `<ScrollReveal variant="fade-up">`
- Body paragraphs: `<ScrollReveal variant="fade" delay={100}>`
- Styles paragraph (with background): `<ScrollReveal variant="fade" delay={150}>`
- Final line: `<ScrollReveal variant="fade" delay={200}>`
```

---

## PROMPT 9: CTA Section Refinement

```
Refine the CTA section at the bottom of the about page.

### Current state (from DOM inspection):
- `.cta-section.is-visible` inside the last `<SectionWrapper variant="tertiary">`
- Two-column layout: heading + button on the left, long paragraph on the right
- Heading: "Your Presence Matters. Let's Build It."
- Button: "Book Your Free Presence Audit" linking to `/contact`
- Right column: ~120-word paragraph starting with "I'm not here to fix you."

### Changes needed:

#### 1. Trim the right-column text
The right column paragraph is too long and overwhelms the button. The strongest sentences are the first few. In the CTA component or Sanity content, keep only:

"I'm not here to fix you. You're not broken. I'm here to show you that the version of yourself you've been holding back — not because you're ashamed of it, but because nobody ever showed you how to let it out — that's not your weakness. That's your foundation."

Remove everything after "That's your foundation." The "We start with the body... We start with music..." content repeats what earlier sections already establish. If this content is in Sanity, update it there. If hardcoded, update the component.

#### 2. Increase right-column text weight
In `app/css/sections.css`, find the right column text styling in the CTA section and:
- Increase font size to `1.125rem` (18px) if it's currently smaller
- Increase opacity to full (1.0) if it's currently reduced — it should feel like a partner to the heading, not fine print
- Set `line-height: 1.7` for comfortable reading

#### 3. Fix the button destination
The button currently links to `/contact`. The site's primary CTA is the Presence Audit at `/audit`. Update the button href from `/contact` to `/audit`. Check the CTA component — this might be a prop passed from the about page, or it might be in the shared CTA component. Look in `components/shared/cta/CTA.tsx` and `app/about/page.tsx` for how the CTA link is configured.

#### 4. Add scroll-reveal animation
Wrap the entire CTA section content in `<ScrollReveal variant="fade-up">`. Simple, gentle arrival.
```

---

## PROMPT 10: Final Verification & Cleanup

```
Run verification checks on all the about page changes.

### 1. Build check
Run `npm run build` and fix any TypeScript or CSS compilation errors.

### 2. Lint check  
Run `npm run lint` and fix any ESLint issues.

### 3. Visual verification checklist
Open http://localhost:3000/about and verify:

- [ ] Background rhythm: hero (primary/bone), origin (tertiary/warm sand), turning point (primary), philosophy (tertiary), why exists (primary), who this is for (secondary), CTA (tertiary)
- [ ] Hero: headline has breathing room above body text, image is slightly dropped, body text doesn't exceed ~520px width
- [ ] Origin: text constrained to ~640px, pullquote is prominent with 4px left border
- [ ] Turning point: text doesn't overflow/clip on the right, later paragraphs flow below the image
- [ ] Philosophy: Choreographer card has sharp corners + cool tint, Freestyler card has rounded corners + warm tint, hover states feel different (snap vs ease)
- [ ] Why This Exists: three callout blocks with left green borders, text at ~640px
- [ ] Who This Is For: text noticeably narrower (~540px), dance styles paragraph has subtle background
- [ ] CTA: right-column text is trimmed and readable, button links to /audit

### 4. Scroll animation check
Scroll through the entire page slowly. Every section should have a subtle entrance animation. Verify:
- Hero elements stagger in (headline → text → image)
- Pullquote slides in from the left
- Philosophy cards enter differently (Choreographer snaps, Freestyler eases)  
- Why This Exists callouts stagger
- Reduced motion: test with `prefers-reduced-motion: reduce` — all content should appear immediately with no animation

### 5. Mobile responsiveness
Check at 375px width (iPhone SE) and 768px (iPad):
- All max-width constraints should still work (content shouldn't be wider than viewport)
- Comparison cards should stack to single column on mobile
- Callout blocks should be full-width on mobile
- Scroll animations should still trigger properly

### 6. No hardcoded copy
Grep for any new hardcoded strings that should be in Sanity:
```bash
grep -r "freezes up" components/sections/about/
grep -r "restaurant" components/sections/about/
grep -r "qualification" components/sections/about/
```
If any of these return hits in TSX files (not in Sanity queries), add TODO comments.

Fix any issues found.
```

---

## Execution Order

Run these prompts in this order:
1. **Prompt 1** — ScrollReveal component (foundation for everything else)
2. **Prompt 2** — Background rhythm (quick wins, simple prop changes)
3. **Prompt 3** — Hero section
4. **Prompt 4** — Origin section
5. **Prompt 5** — Turning point section
6. **Prompt 6** — Philosophy section (the big one)
7. **Prompt 7** — Why This Exists section
8. **Prompt 8** — Who This Is For section
9. **Prompt 9** — CTA section
10. **Prompt 10** — Verification & cleanup

Each prompt is independent but they build on each other — Prompt 1 creates the ScrollReveal component that all subsequent prompts use.

---

## Notes

- All CSS changes go into existing files (`app/css/sections.css`, `app/css/interactions.css`). No new CSS files.
- Component changes should respect the existing pattern: server components by default, `'use client'` only for the ScrollReveal wrapper.
- All text should come from Sanity. If you find hardcoded copy while making these changes, add TODO comments rather than refactoring the data layer mid-session.
- The about page's section components live in `components/sections/about/`. Check the exact file names before editing.
- Import ScrollReveal from `@/components/animations` (the barrel export file).
