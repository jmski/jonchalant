# Jonchalant Website Audit & Master Execution Roadmap

**Date:** April 3, 2026
**Auditors:** Lead Designer, Project Manager, Tech Lead
**Subject:** jonchalant.com — Executive Presence Coaching for Introverts
**Scope:** Strategic critique + modular execution plan (no code changes)

---

## Part 1: The Persona Audits

---

### Lead Designer Critique

**Overall Assessment: B+ (Strong foundation, needs refinement to reach elite tier)**

Your design DNA is excellent. The Fraunces + DM Sans type pairing, the burnt indigo/muted moss/rice paper palette, and the Japanese Zen philosophy are all genuinely differentiated choices that position you above 90% of coaching sites. You are not a template. That said, several execution details currently undercut the premium positioning you've built.

**What's Working:**

- **Type pairing is strong.** Fraunces (serif display) + DM Sans (body) is an elevated, editorial combination. Fraunces has that warm, slightly organic quality that avoids feeling sterile. This pairing signals: "thoughtful, not corporate."
- **Color palette is distinctive.** Burnt indigo (#4a3a5c) + muted moss (#6b8e63) + rice paper (#f8f8f5) is genuinely rare in the coaching space. It reads as "contemplative luxury" rather than "hustle culture" or "corporate consulting."
- **CSS architecture is remarkably clean.** The 6-layer cascade system (reset > variables > base > components > utilities > interactive) and BEM-style naming shows disciplined, production-grade thinking. This is well above typical coaching sites.

**What Needs Work:**

1. **Hero section is doing too much.** You currently have: a static headline, a cycling slot machine, a description paragraph, a primary CTA, microcopy, a secondary CTA, AND a stats strip — all in the hero. Compare this to Simon Sinek's hero (one sentence + one button) or Robin Sharma's (animated text + zero CTAs). The Zen philosophy should manifest as restraint here. The slot machine animation, while technically impressive, competes with the headline for attention and creates visual noise. It's a "developer flex" that fights your brand ethos.

2. **Whitespace is generous but not yet "breathing."** Your section padding (4rem-6rem vertical) is good but not exceptional. Robin Sharma uses 200px (~12.5rem) hero top padding. Simon Sinek uses py-24 to py-32 between sections. For a Zen brand, whitespace isn't just good design — it IS the design. The space between elements should feel intentional and contemplative, like the silence between notes in music. Push your `--spacing-2xl` and `--spacing-3xl` tokens further, especially between major homepage sections.

3. **The 3D HeroCanvas feels misaligned.** Loading a Three.js/R3F canvas in the hero adds significant runtime weight and visual complexity. For a brand that should feel like a serene Japanese garden, a WebGL canvas reads more "tech startup" than "executive presence coach." The floating ambient orbs (CSS-based) are a much more aligned atmospheric effect — understated, performant, and evocative. Consider whether the 3D element earns its weight in the hero.

4. **Section background color contrast is too flat.** Your homepage flows: primary (rice paper) > primary > primary > secondary (moss-tinted) > tertiary. Three consecutive `primary` sections create monotony. Top-tier sites use alternating light/dark sections to create cinematic rhythm. Consider introducing a dark section (burnt indigo background with light text) to break the page into visual "chapters."

5. **Typography hierarchy could push further on display scale.** Your h1 maxes at `clamp(2.5rem, 8vw, 4.5rem)` which is respectable. But at the hero level specifically, the elite coaching sites go much bolder — Robin Sharma's hero type occupies 40-50% of the viewport height. Consider a hero-specific display size that pushes to 6-7rem on desktop. The headline should be "the only thing you see" above the fold.

6. **No custom photography visible.** The `remotePatterns` in next.config only allow Unsplash and Picsum (stock/placeholder). The most premium coaching sites (Mel Robbins, Brene Brown) use art-directed custom photography. Even one professional headshot or environmental portrait would dramatically elevate the perceived value. This is the single highest-ROI non-code investment you can make.

**Visual Hierarchy Score:** 7/10 — Good bones, needs bolder contrasts and more restraint.
**UI/UX Score:** 7.5/10 — Clean patterns, well-organized, but hero and content density need refinement.
**Trendiness Score:** 8/10 — Palette and type are on-trend (editorial serif revival, organic earth tones). Would benefit from scroll-driven animations and kinetic typography.
**Authenticity Score:** 9/10 — The Zen/introvert positioning is genuine and well-integrated in the naming and CSS tokens. This is your superpower. Don't dilute it.

---

### Project Manager Critique

**Overall Assessment: B (Good structure, conversion pathway needs tightening)**

**Content Flow Analysis:**

Your homepage follows this structure:
```
Hero → Services → WhyItWorks → Testimonials → CTA
```

The competitor-benchmarked optimal flow for a coaching brand is:
```
Hero → Credibility → Philosophy → Offerings → Content → Social Proof → Email Capture → Footer
```

Key gaps:

1. **No credibility layer between hero and services.** Visitors who land from Google or social media have zero context. They need a trust signal within the first scroll. This doesn't have to be aggressive — even a single line like "Featured in [publications]" or "Trusted by professionals at [companies]" creates instant legitimacy. Brene Brown uses media outlet names; Simon Sinek uses a quiet philosophy statement. Either approach works for your brand.

2. **Philosophy/story section comes too late (WhyItWorks is section 3).** The "why" should precede the "what." A visitor needs to believe in Jon's worldview before they care about service offerings. Move the philosophy or methodology narrative closer to the top, or integrate it into the hero subheadline. "Why It Works" is also a features-focused name — consider reframing as something more human: "Our Approach" or "The Quiet Method."

3. **Only ONE email capture point (footer opt-in strip).** Every competitor has a mid-page or dedicated email capture section. Your footer's `BlogOptIn` component is easy to miss. The newsletter needs its own dedicated section on the homepage, ideally between testimonials and the final CTA, with compelling positioning. "Personal insights direct to your inbox" > "Subscribe to our newsletter."

4. **Blog content is absent from the homepage.** You have a `BlogCards` component exported in sections/index.ts but it is NOT rendered on the homepage. Blog content on the homepage serves two purposes: (a) proves ongoing thought leadership, and (b) gives visitors who aren't ready to buy a lower-commitment action. Brene Brown and Simon Sinek both feature content prominently on their homepages.

5. **Missing personal introduction.** For a solo coaching brand, the visitor needs to connect with a human. Your About page is rich and well-structured (Origin, TurningPoint, MethodologyNarrative, WhyExists, WhoFor — that's excellent storytelling), but none of this warmth reaches the homepage. Consider a brief "Meet Jon" section or an editorial-style photo + one-liner before the CTA.

**Conversion Optimization:**

| Element | Current State | Issue |
|---------|--------------|-------|
| Hero CTA | Primary + Secondary + Microcopy | Too many options. One CTA, one scroll-away. |
| Free Audit CTA | In navbar + hero | Good dual placement, but the audit itself is a separate page — consider if an inline quiz would convert better. |
| Contact page | Server-rendered wrapper of a client component | Good, but the page itself is a dead end. Add "What happens next" microcopy to reduce friction. |
| Programs page | Cards with pricing + CTAs | Pricing on the page is fine for this tier, but consider "starting at" framing vs. fixed prices. |
| Testimonials | Grid on moss background | Good placement. Would benefit from named clients with photos and specific outcome metrics. |
| Footer CTA | Newsletter opt-in | Buried. Needs its own section. |

**Message Clarity Score:** 7.5/10 — "Executive presence for introverts" is a clear, differentiated niche. The messaging is consistent across metadata, headlines, and CTAs. Would benefit from a single, memorable tagline or brand line (like Sinek's "Start With Why" or Marie Forleo's "Everything is Figureoutable").

**Conversion Path Score:** 6.5/10 — The primary path (Hero → Audit or Contact) exists but has friction. Secondary paths (Blog → Trust → Contact, Programs → Pricing → Contact) need strengthening.

**Lead Capture Score:** 5/10 — Single capture point in the footer. No lead magnets, no quiz-to-email, no content upgrades. This is the biggest gap.

---

### Tech Lead Critique

**Overall Assessment: A- (Excellent architecture, minor performance and SEO refinements needed)**

This is a genuinely well-engineered codebase. React 19, Next.js 16, App Router, Server Components by default, React Compiler enabled, Turbopack — you're on the cutting edge. The CSS architecture is production-grade. Let me focus on what needs attention.

**Performance:**

1. **Three.js bundle is the elephant in the room.** `@react-three/fiber` + `three` are ~500KB+ gzipped. They're loaded via `next/dynamic` with SSR disabled, which prevents blocking, but the bundle still downloads and parses on the main thread after load. For a coaching site that should feel fast and serene, this is a significant tradeoff. The HeroCanvas is a single visual flourish that costs every visitor ~500ms of interactivity delay on mid-range devices. Consider:
   - Is the 3D element critical to conversion? (Likely no.)
   - Could the same atmospheric effect be achieved with CSS-only (orbs already exist) or a lightweight `<canvas>` with 2D context?
   - If kept, lazy-load it with `IntersectionObserver` so it only initializes when scrolled into view — but since it's in the hero, it's always in view.

2. **Sanity remote image patterns are missing.** Your `next.config.ts` only allows `images.unsplash.com` and `picsum.photos`. Sanity CDN images (`cdn.sanity.io`) should be added to `remotePatterns` to enable Next.js `<Image>` optimization (AVIF/WebP, responsive srcsets, lazy loading). If you're using `@sanity/image-url` to build URLs, those still bypass Next.js optimization unless routed through `<Image>`.

3. **`styled-components` is listed as a dependency.** This is unusual with your CSS architecture (vanilla CSS + CSS layers + Tailwind). If any component uses styled-components, that adds a runtime CSS-in-JS cost and conflicts with your otherwise static CSS approach. Audit whether this dependency is actually used; if not, remove it.

4. **Middleware runs on every non-static request.** Your Supabase session refresh middleware is broad-matched. For unauthenticated visitors (the majority), every page request makes a Supabase round-trip for cookie refresh that returns nothing. Consider narrowing the matcher to `/portal/*`, `/admin/*`, and `/api/*` where auth actually matters, or making the middleware no-op when no auth cookie exists.

5. **Google Analytics loads for everyone.** The `afterInteractive` strategy is correct, but consider loading GA only after cookie consent (if targeting EU/UK visitors), or using Partytown to move it off the main thread entirely.

**SEO:**

1. **JSON-LD is well-implemented.** Person, Organization, LocalBusiness, and AggregateRating schemas are all present. This puts you ahead of most coaching sites. However:
   - `AggregateRatingSchema` uses `testimonials?.length || 25` as the review count — this means if Sanity returns 0 testimonials, you claim 25 reviews. This could be flagged by Google as misleading structured data.
   - Consider adding `FAQPage` schema on pages with FAQ sections.

2. **Per-page metadata is thorough.** Title templates, OpenGraph, Twitter cards — all properly configured. The `metadataBase` approach is correct.

3. **No sitemap.xml or robots.txt generation spotted.** Next.js 16 supports `app/sitemap.ts` and `app/robots.ts` — these are essential for search engines. Verify they exist or create them.

4. **Blog post SEO.** Blog posts from Sanity should generate `BlogPosting` JSON-LD schema dynamically. Each post should have unique OG images (not the generic home one).

**Scalability & Architecture:**

1. **Sanity fallback pattern is well-implemented.** Every page gracefully degrades if Sanity is unreachable. This is production-resilient.

2. **Auth architecture is sound.** Server-side session refresh in middleware, client-side auth gating via `useAuth` hook, SSR-safe Supabase helpers — this follows best practices.

3. **Component organization is excellent.** The `sections/` > `shared/` > `utilities/` hierarchy with central exports from `index.ts` is clean and scalable.

4. **API routes cover a wide surface area** (9 endpoints including Stripe, AI tools). Ensure rate limiting exists on public-facing endpoints (`/api/inquiries`, `/api/subscribe`, `/api/presence-coach`, `/api/tonality-analysis`) to prevent abuse.

**Performance Score:** 7/10 — Three.js is the primary drag. CSS and rendering architecture are excellent.
**SEO Score:** 8/10 — Strong structured data and metadata. Needs sitemap, blog-level schema, and truthful aggregate ratings.
**Scalability Score:** 9/10 — Architecture scales well. Sanity + Supabase + Vercel is a proven stack for this scale.
**Code Quality Score:** 9.5/10 — This is genuinely elite-tier code organization for a coaching website.

---

## Part 2: Competitor & Inspiration Benchmarks

### Design/Structural Elements to Adopt

**1. Simon Sinek's "Indented Philosophy Statement"**
Sinek's homepage features his WHY statement in a staggered-indentation layout — text cascading diagonally with progressive margin shifts and a single highlight color on the key phrase. This is powerfully aligned with Zen typography principles (asymmetry as beauty). Adopt this for Jon's coaching philosophy or methodology statement on the homepage.

**2. Robin Sharma's "Maximum Restraint Hero"**
Sharma's hero uses bold, animated typography with absolutely zero competing elements — no CTAs, no secondary text, no images. The entire viewport is dedicated to 3-4 words cycling through with generous whitespace. The CTA comes only when you scroll. For a Zen-inspired brand, this is the gold standard: make the first impression about presence, not about selling.

**3. Mel Robbins' "Authority via Press Quotes"**
Instead of generic testimonials, Robbins uses a rotating carousel of press quotes from Time, Boston Globe, etc., with the publication name and a one-line excerpt. This is more authoritative than client testimonials for building initial trust. If Jon has been featured in any publications (even podcasts or LinkedIn articles with notable engagement), surface that in a similar pattern. Even "As seen on [Podcast Name]" counts.

---

## Part 3: The Modular Execution Roadmap (Token-Optimized)

Each task below is self-contained. In future sessions, say: **"Implement Task #X"** and provide a link to this document for context.

---

### HIGH PRIORITY (Impact: Conversion + First Impression)

#### Task #1: Simplify the Hero Section
**Scope:** `components/sections/home/hero/Hero.tsx`, `app/css/sections.css` (hero rules)
**What to do:**
- Remove the slot-machine cycling text. Replace with a single, bold, static headline.
- Remove the secondary CTA link. Keep only ONE primary CTA button.
- Remove the stats strip from the hero (move it to its own section below).
- Remove the description paragraph — let the headline + CTA speak.
- Increase headline font size to `clamp(3rem, 10vw, 6.5rem)` for hero-only use.
- Keep the floating orbs (CSS-only) as the sole atmospheric effect.
**Goal:** First impression = "I know exactly what this is, and it feels premium."
**Files touched:** 2

#### Task #2: Remove Three.js from the Hero
**Scope:** `components/sections/home/hero/Hero.tsx`, `components/sections/home/hero/HeroCanvas.tsx`, `package.json`
**What to do:**
- Remove the `HeroCanvas` dynamic import and the `home-hero-visual` div.
- Remove `@react-three/fiber` and `three` from dependencies (unless used elsewhere — check first).
- Remove the `@types/three` dev dependency if Three.js is fully removed.
- Clean up any CSS rules specifically for `home-hero-visual`.
**Goal:** Save ~500KB+ of JS bundle. Faster load = better first impression.
**Files touched:** 3-4

#### Task #3: Add a Credibility/Authority Strip Below the Hero
**Scope:** New section component, `app/page.tsx`, `app/css/sections.css`
**What to do:**
- Create a minimal horizontal strip showing social proof. Options:
  - "Trusted by professionals at [Company logos]" if available
  - "As heard on [Podcast Name]" if Jon has been a guest
  - "X years of coaching experience | Y clients coached | Z industries" (stats moved from hero)
- Style: subtle, understated text in `--text-tertiary` color. No background change. Think whispered authority, not shouted.
- Place it directly after the hero section on the homepage.
**Goal:** Build trust before the visitor decides to scroll or bounce.
**Files touched:** 3

#### Task #4: Add a Dedicated Email Capture Section
**Scope:** New or adapted section component, `app/page.tsx`, `app/css/sections.css`
**What to do:**
- Create a standalone email capture section (not buried in the footer).
- Position it on the homepage between Testimonials and the final CTA.
- Use compelling positioning: "Weekly insights on quiet leadership — delivered to your inbox"
- Simple layout: headline + subline + email input + submit button.
- Connect to existing `/api/subscribe` endpoint.
- Style with burnt indigo background + light text for visual contrast.
**Goal:** Capture visitors who aren't ready to book but want to stay connected.
**Files touched:** 3-4

#### Task #5: Add a "Meet Jon" Section to the Homepage
**Scope:** New section component or adapted shared component, `app/page.tsx`
**What to do:**
- Add a brief personal introduction section between WhyItWorks and Testimonials.
- Content: professional photo + 2-3 sentences about Jon's background and approach.
- Link to the full About page for those who want the full story.
- Editorial layout: photo left (or full-bleed), text right with serif headline.
**Goal:** Create human connection. People buy coaching from people, not brands.
**Files touched:** 2-3

#### Task #6: Reorder the Homepage Content Flow
**Scope:** `app/page.tsx`
**What to do:**
- Rearrange sections to match the optimal conversion flow:
  1. Hero (simplified — Task #1)
  2. Credibility strip (Task #3)
  3. WhyItWorks / Philosophy (moved up)
  4. Services
  5. Meet Jon (Task #5)
  6. Testimonials
  7. Blog preview (reactivate `BlogCards` component already exported)
  8. Email capture (Task #4)
  9. Final CTA
- Add alternating background variants (primary/secondary/tertiary) for visual rhythm.
**Goal:** Guide the visitor through a narrative arc: Trust → Believe → Explore → Connect.
**Files touched:** 1

---

### MEDIUM PRIORITY (Impact: Polish + Engagement)

#### Task #7: Introduce a Dark Section (Burnt Indigo Block)
**Scope:** `app/css/variables.css`, `app/css/sections.css`, applicable section(s)
**What to do:**
- Create a dark section variant using `--color-burnt-indigo` as background.
- Light text (`#f8f8f5`), moss accent for links/CTAs.
- Apply it to one homepage section (philosophy or email capture) to break the visual monotony.
- Ensure all text within passes WCAG AA contrast ratios.
**Goal:** Create cinematic rhythm on the page. Light → Dark → Light signals premium editorial design.
**Files touched:** 2-3

#### Task #8: Increase Section Spacing (The "Ma" Upgrade)
**Scope:** `app/css/variables.css`, `app/css/utilities.css`
**What to do:**
- Increase `--spacing-2xl` from 6rem to 7.5rem and `--spacing-3xl` from 9rem to 11rem.
- Increase section padding on desktop from 6rem to 8rem vertical.
- Ensure mobile spacing remains comfortable (no excess scrolling on small screens).
- The goal is that the space between sections feels meditative, not just empty.
**Goal:** Make whitespace a deliberate design statement, not a byproduct.
**Files touched:** 2

#### Task #9: Add Blog Preview Cards to Homepage
**Scope:** `app/page.tsx`, potentially `components/sections/home/blog-cards/`
**What to do:**
- The `BlogCards` component already exists and is exported from sections/index.ts.
- Add it to the homepage between Testimonials and Email Capture.
- Fetch the 3 most recent blog posts from Sanity.
- Include a "Read More on the Blog" link beneath the cards.
**Goal:** Prove ongoing thought leadership and give non-buyers a path to stay engaged.
**Files touched:** 1-2

#### Task #10: Add a Memorable Brand Tagline
**Scope:** Homepage hero, About page, metadata
**What to do:**
- Develop a concise brand tagline similar to "Everything is Figureoutable" (Forleo) or "Start With Why" (Sinek).
- Candidates based on Jon's positioning: "Quiet Command," "Presence Without Performance," "Lead From Stillness," or something distilled from the coaching philosophy.
- Place it as the hero headline, in the site metadata description, and on the About page.
**Goal:** Give visitors a phrase they remember and repeat. This is brand equity.
**Files touched:** 3-5 (mostly content/copy updates)

#### Task #11: Enhance Testimonials with Specifics
**Scope:** Sanity schemas, testimonial card component, CSS
**What to do:**
- Add fields to the Sanity `testimonial` schema for: client photo/avatar, job title, company, specific outcome metric.
- Update `TestimonialCard` component to display photo + name + title.
- Consider ordering by specificity — testimonials with measurable results first.
**Goal:** Named testimonials with roles and outcomes are 3x more credible than anonymous quotes.
**Files touched:** 3-4

#### Task #12: Add a "What Happens Next" Flow to Contact Page
**Scope:** `app/contact/ContactClient.tsx`, `app/css/pages-contact.css`
**What to do:**
- Below the contact form, add a simple 3-step visual: "1. Submit your inquiry → 2. We'll schedule a 15-min call → 3. Build your custom plan."
- Use icons or simple numbered circles with DM Sans labels.
- This reduces "what am I committing to?" anxiety, which is especially important for your introvert target audience.
**Goal:** Reduce contact form abandonment by clarifying expectations.
**Files touched:** 2

---

### LOW PRIORITY (Impact: Technical Health + Future SEO)

#### Task #13: Add Sitemap and Robots Configuration
**Scope:** New `app/sitemap.ts` and `app/robots.ts`
**What to do:**
- Create `app/sitemap.ts` that dynamically generates a sitemap from all public pages + all blog post slugs from Sanity.
- Create `app/robots.ts` that allows all crawlers, points to the sitemap, and disallows `/portal`, `/admin`, `/api`.
**Goal:** Ensure Google crawls and indexes all public pages efficiently.
**Files touched:** 2 (new files)

#### Task #14: Fix AggregateRating Schema Integrity
**Scope:** `app/page.tsx`, `lib/schema.ts`
**What to do:**
- Change the fallback from `testimonials?.length || 25` to `testimonials?.length || 0`.
- Only render the AggregateRating schema if there are actual testimonials (count > 0).
- This prevents Google from flagging misleading structured data.
**Goal:** Maintain search engine trust and avoid structured data penalties.
**Files touched:** 1-2

#### Task #15: Add BlogPosting Schema to Blog Posts
**Scope:** `app/blog/[slug]/page.tsx`, `lib/schema.ts`
**What to do:**
- Generate a `BlogPosting` JSON-LD schema for each blog post with: headline, author, datePublished, dateModified, image, description.
- Add it via `<Script type="application/ld+json">` in the blog post page.
**Goal:** Rich results in Google (featured snippets, article carousels).
**Files touched:** 2

#### Task #16: Narrow Middleware Matcher
**Scope:** `middleware.ts`
**What to do:**
- Change the middleware matcher from "everything except static files" to only routes that need auth cookies: `/portal/:path*`, `/admin/:path*`, `/api/:path*`.
- This skips the Supabase round-trip for all public page loads (home, about, blog, etc.).
**Goal:** Reduce Time to First Byte for unauthenticated visitors.
**Files touched:** 1

#### Task #17: Audit and Remove `styled-components`
**Scope:** Full codebase search, `package.json`
**What to do:**
- Search for any import of `styled-components` across the codebase.
- If unused, remove from `dependencies`.
- If used in one or two places, migrate those to CSS classes in the appropriate CSS file.
**Goal:** Remove dead weight from the bundle. Every unused dependency = slower builds + larger node_modules.
**Files touched:** 1-3

#### Task #18: Add Sanity CDN to Image Remote Patterns
**Scope:** `next.config.ts`
**What to do:**
- Add `cdn.sanity.io` to the `images.remotePatterns` array.
- This allows Next.js `<Image>` to optimize Sanity-hosted images (AVIF/WebP conversion, responsive srcsets, lazy loading).
**Goal:** Faster image loading for CMS-hosted content.
**Files touched:** 1

#### Task #19: Add Rate Limiting to Public API Routes
**Scope:** `app/api/inquiries/route.ts`, `app/api/subscribe/route.ts`, other public API endpoints
**What to do:**
- Implement simple in-memory rate limiting (or use Vercel's built-in edge rate limiting if on Vercel Pro).
- Suggested limits: `/api/inquiries` at 5/min per IP, `/api/subscribe` at 3/min per IP.
- AI endpoints (`/api/presence-coach`, `/api/tonality-analysis`, `/api/movement-plan`) should be auth-gated AND rate-limited.
**Goal:** Prevent abuse and protect against cost spikes on AI API calls.
**Files touched:** 3-5

#### Task #20: Add FAQPage Schema to FAQ Sections
**Scope:** `components/shared/faq/FAQ.tsx`, `lib/schema.ts`
**What to do:**
- When the FAQ component renders, inject a `FAQPage` JSON-LD schema with all Q&A pairs.
- This is eligible for Google's FAQ rich results, which can dramatically increase SERP real estate.
**Goal:** Organic search visibility boost with zero content creation effort.
**Files touched:** 2

---

## Part 4: The Idea Parking Lot

*Add your own brainstorming ideas and future feature requests below:*

-
-
-
-
-
-
-
-
-
-

---

## Quick Reference: Priority Summary

| Priority | Tasks | Theme |
|----------|-------|-------|
| **HIGH** | #1-#6 | First impression, conversion path, lead capture |
| **MEDIUM** | #7-#12 | Visual polish, brand depth, trust signals |
| **LOW** | #13-#20 | Technical health, SEO, security |

**Recommended execution order:** Start with Tasks #1 and #2 together (hero simplification), then #6 (reorder), then #3-#5 (new sections), then #4 (email capture). This gives you the biggest visual transformation in the fewest sessions.

---

*Document authored by Claude — Lead Designer, Project Manager, and Tech Lead personas. For implementation, reference individual task numbers.*
