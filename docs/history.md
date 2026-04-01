# Project History

---

## Session: Programs page overhaul + Sanity consolidation

**Date:** March 2026

**Completed:**

- Programs page fully rebuilt with Sanity-driven content (no hardcoded strings)
- Sanity schema consolidated: programTrack, program, programFocus, programPageContent all removed/orphaned — replaced by a single programsPageContent singleton document
- programsPageContent schema owns the entire page: hero, offers section header, offer cards (inline array), "who it's for" section, and CTA
- Migration script written and run: scripts/migrate-programs-page.mjs populated the programsPageContent document in Sanity with all content
- ProgramTrackCard updated: internal links use Next.js `<Link>`, external links use `<a>` with `target="_blank" rel="noopener noreferrer"`
- "Who this is built for" section moved from standalone section into PageHero rightColumn (3fr/2fr split layout), removing an empty-looking standalone block
- CTA section background changed to `variant="tertiary"` (warm sand) for visual contrast
- Offers section eyebrow confirmed as accent-primary colour
- Orphaned components removed from barrel exports: FocusAreas, SupplementalLearning, ProgramTracks no longer exported from sections/index.ts
- Program and ProgramFocus interfaces removed from lib/types.ts
- Dead query functions removed from lib/sanity.ts: getPrograms, getProgramBySlug, getProgramsByCategory, getProgramsFocusItems, getProgramTracks

**Files to manually delete (orphaned, safe to remove):**

- sanity/schemas/program.ts
- sanity/schemas/programFocus.ts
- sanity/schemas/programTrack.ts
- sanity/schemas/programPageContent.ts
- components/sections/programs/FocusAreas.tsx
- components/sections/programs/SupplementalLearning.tsx
- components/sections/programs/ProgramTracks.tsx
- scripts/seed-program-tracks.mjs (targets dead programTrack type)

**Architecture decisions:**

- One schema, one document, one fetch for the entire programs page
- Offer cards live as inline objects inside programsPageContent (not separate documents) — they only belong to this page, so separate documents added no value
- Schema named programsPageContent to align with homePageContent / aboutPage conventions

**Sanity content added:**

Document: programsPageContent (`_id: "programsPageContent"`)

| Field | Value |
| --- | --- |
| Hero eyebrow | "The Work" |
| Hero headline | "This is where it gets physical." |
| Offers eyebrow | "Three ways to work together" |
| Offers heading | "Find the format that fits where you are" |
| Who it's for heading | "Who this is built for" |
| CTA heading | "Not sure which one is right?" |
| CTA button | "Book a free call" → /contact |
| CTA microcopy | "No pressure, no pitch. Just a conversation." |

Three offer cards:

1. The Foundation — $197 — Digital Course
2. The Foundation + Weekly Check-ins — $497 — Most Popular
3. Work With Jon Directly — Let's talk — 1-on-1 Coaching

**Pages completed so far:**

- About page — COMPLETE
- Home page — COMPLETE
- Programs page — COMPLETE
- Contact page — COMPLETE

**Next session:**

- Delete the 8 orphaned files listed above

---

## Session: Programs page + course structure

**Date:** March 2026

**Completed:**

- Programs page fully rebuilt (app/programs/page.tsx)
- New programTrack Sanity schema (sanity/schemas/programTrack.ts)
- Schema registered in sanity/schemaTypes/index.ts
- ProgramTrackItem interface added to lib/types.ts
- getProgramTracks() updated in lib/sanity.ts
- New ProgramTrackCard component (components/utilities/cards/ProgramTrackCard.tsx)
- Card handles internal vs external links dynamically (Calendly-safe)
- CSS added to cards.css and pages.css
- Three programTrack documents created in Sanity Studio

### The Foundation

Pricing:

- $197 — self-paced digital course (async, no calls)
- $497 — 8-week program with weekly 1-on-1 check-ins
- Custom — 1-on-1 coaching (discovery call first)

Calendly links (live):

- Discovery call: <https://calendly.com/jmski-dev/30min>
- Weekly check-in: <https://calendly.com/jmski-dev/foundation-weekly-check-in>

8-week program structure (confirmed by Jon, adjust as needed):

| Week | Topic |
| --- | --- |
| 1 | Body audit: what you're already communicating without knowing it |
| 2 | Posture and grounding: how you take up space |
| 3 | Movement fundamentals: isolation, weight, rhythm |
| 4 | Stillness and timing: the power of not moving |
| 5 | Eye contact, breath, and voice as physical tools |
| 6 | High-stakes situations: presentations, interviews, difficult conversations |
| 7 | Building your own style: freestyle principles |
| 8 | Integration: putting it all together, what's next |

**Pages completed so far:**

- About page — COMPLETE
- Home page — COMPLETE
- Programs page — COMPLETE
- Contact page — COMPLETE

**Jon's voice notes (keep these for every session):**

- Casual, direct, warm, occasionally funny
- Filipino-Canadian, married with 3 kids
- Fitness industry 10+ years, dance since high school
- Core belief: confidence is a skill, not a personality type
- Freestyle over choreography. Natural over performed.
- Brand name: Jonchalant = Jon + nonchalant
- NOT: polished coaching jargon, generic motivational language
