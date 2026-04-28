# Jonchalant — Canonical Copy

**Source of truth for every piece of marketing copy on the site.**

This document is the input for Sanity schema design and content population. Every page section here corresponds to a Sanity field group. When this doc and Sanity Studio disagree, **Sanity is updated to match this doc** — never the reverse.

Last updated: Phase 5, workstream 1 — home, about, and ikigai pages locked, remaining pages drafted page-by-page.

---

## How to use this document

- **Locked** sections have been drafted in voice and approved. They're ready to populate Sanity.
- **Drafted** sections have copy but need a final pass.
- **Stub** sections have section structure noted but no copy yet.
- Italic anchors are wrapped in `{{double-braces}}` — the codebase already supports this convention via `renderHeadline` in `GenericHero`.
- Em-dashes are em-dashes (`—`), not double hyphens.
- "Ikigai" capitalized as a product name (Ikigai Assessment); lowercase in body when conceptual.

---

## Voice rules

The voice operates in two registers that swap based on what each section is doing.

### Register A — Direct and honest

For: naming problems, calling out patterns, stating what the offer is or isn't, refusals, cutting through avoidance.

Texture: short sentences, fragments allowed, em-dashes for cut-ins, no softening words.

Example: *"Most people are in the right industry. Wrong role."*

### Register B — Warm and present

For: acknowledging hard things, welcoming the reader in, speaking *to* a specific person, closing with care.

Texture: full sentences, conversational rhythm, "you" used directly, occasional "I" for Jon.

Example: *"You're not broken. You're not behind. The room just hasn't met you yet."*

### The bullshit clause

When a reader has dressed up avoidance as principle, the page calls it. Used sparingly — once a page max — but the site is willing to use it.

Example: *"You don't need more information. You need to actually try."*

### Banned forever

unlock · transform · journey · empowered · authentic self · limiting beliefs · inner game · holistic · alignment (in the personal-development sense) · level up · breakthrough · mindset shift · self-mastery · soul work

### Stylistic conventions

- One italic anchor per headline, wrapped in `{{double-braces}}`.
- "ikigai" lowercase in body, "Ikigai" capitalized when product name.
- "The Foundation" always title-cased — product name.
- "Four Circles" title-cased when referring to the course.
- "the four pillars" lowercase conceptually; "Grounding, Energy, Flow, Command" capitalized when listing.
- Numerals 10+; spell out under 10 in body. Headlines often spell out small numbers ("Eight weeks") for human texture.
- Em-dashes for asides — like this — never two hyphens.

---

# Home page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero → ~~Stats~~ → Method (Three steps) → Pillars (Four fundamentals) → Meet Jon → Testimonials → Blog preview → Newsletter → Audit CTA → Foundation Starter Guide

---

## §1 — Hero

**Eyebrow:** `Ikigai · The entry point`

**Headline:** *Find the work you were {{meant}} for.*

**Subhead:** Dance is my medium. Yours will be different. Eight honest questions to read what actually fits — then a practice to learn to inhabit it.

**Primary CTA:** *Discover Your Ikigai* → `/ikigai`

**Secondary CTA:** *Read the essay* → `/about`

---

## §2 — Stats strip *(intentionally removed)*

The stats slot exists structurally but is empty until real client/graduate/completion numbers exist. Do not populate with placeholder or aspirational figures. Schema field group can stay; render conditionally on whether real values are present.

---

## §3 — Three steps. Any medium.

**Eyebrow:** `THE METHOD`

**Headline:** *Three steps. {{Any}} medium.*

**Subhead:** Most coaching gives you frameworks and asks you to apply them later. This works the other way around. You find what fits, you learn what it means, then you live in it. Not in that order on a Tuesday — over months.

### Step 1 — Discover

**Discover.** Eight questions, three minutes. The Ikigai Assessment names which of the four circles — Passion, Mission, Vocation, Profession — you're already in, and which one is missing. Most people are missing one. They've been calling it something else for years.

### Step 2 — Understand

**Understand.** The Four Circles is a free 12-lesson course. Each lesson takes about fifteen minutes. By the end you know what your assessment results actually mean — not as a personality type, but as a diagnosis you can do something about.

### Step 3 — Embody

**Embody.** The Foundation is eight weeks of practice. Grounding, energy, flow, command — one pillar at a time, in the body first, on the page second. Taught through dance because dance can't be faked. Transferable to any room, because the fundamentals are the same.

---

## §4 — Four fundamentals. Any medium.

**Eyebrow:** `THE PILLARS`

**Headline:** *Four fundamentals. {{Any}} medium.*

**Subhead:** These are the four things presence is actually made of. Whether you're walking into a corporate review, a creative session, a hard conversation with someone who matters — the difference between commanding the room and managing your nerves comes down to these four. The Foundation teaches them.

### Grounding

The capacity to find your centre before you move. A dancer sets her weight into the floor before the first phrase. A leader pauses for a full breath before answering the hostile question. A writer names the argument in one sentence before the paragraph that contains it. Same skill.

### Energy

Calibrating your presence to the room. Speakers know this — the same talk lands differently to twelve people than to two hundred. So does showing up to a 1:1 versus a board. The room tells you what it needs. You learn to read it, then meet it.

### Flow

Moving between rigid structure and live response. The choreography says one thing — the music does another. A leader has the talking points and then someone interrupts with the question that matters more. Flow is the skill that holds the structure loose enough for the room to actually shape it.

### Command

Presence that carries authority without force. A dancer holds the final position for one extra count. A leader delivers the decision in one sentence. A writer ends the paragraph where it ends. No volume required. The pause does the work.

---

## §5 — Meet Jon

**Eyebrow:** `WHO YOU'RE WORKING WITH`

**Headline:** *Twenty years in dance. The {{lesson}} wasn't the choreography.*

**Body (paragraph 1):** Jon Young teaches embodied presence to professionals whose medium isn't dance. His students lead engineering teams, run product orgs, write for a living, and stand in front of rooms — none of them are dancers, all of them learn to inhabit their work the same way a dancer learns to inhabit a phrase.

**Body (paragraph 2):** The Foundation distills twenty years of performing, teaching, and choreographing into eight weeks of practice that transfer to whatever room you actually have to walk into.

**Primary link:** *Read Jon's story →* `/about`

**Secondary link:** *(removed — was "Watch Jon dance" pointing to /dance, deleted in phase 4)*

---

## §6 — Testimonials

**Eyebrow:** `WHAT CLIENTS ACTUALLY SAY`

**Headline:** *(none — eyebrow alone, testimonials carry themselves)*

**Subhead:** *(none)*

Testimonials themselves are real client quotes, not rewritten here. Source: `testimonial` schema in Sanity.

---

## §7 — From the Lab

**Eyebrow:** `READ`

**Headline:** *From the {{Lab}}.*

**Subhead:** Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms. New essays as I figure things out. Some of them will probably be wrong.

**Per-card CTA:** *Read the essay →*

**Section CTA below grid:** *See all essays* → `/blog`

---

## §8 — Newsletter capture

**Eyebrow:** *(none)*

**Headline:** *One idea every Tuesday. {{No}} noise.*

**Subhead:** Practice, presence, and the work you were meant for — one short essay every Tuesday.

**Form field — email**
- Label: *Email*
- Placeholder: *you@yourwork.com*

**Submit button:** *Send me Tuesdays*

**Microcopy below form:** *Unsubscribe in one click. No tricks.*

---

## §9 — Audit CTA

**Eyebrow:** `NOT READY YET?`

**Headline:** *You don't have to {{commit}} to anything.*

**Body:** Start with the assessment. It's free. It takes five minutes. If it tells you something useful, keep going. If it doesn't, you keep your Tuesday.

**Primary CTA:** *Take the Ikigai Assessment* → `/ikigai`

**Microcopy below CTA:** *No account needed. No email required.*

---

## §10 — Foundation Starter Guide capture

**Eyebrow:** `FREE GUIDE`

**Headline:** *The {{Foundation}} Starter Guide.*

**Body:** Five body-aware habits you can practice this week. Not posture tips. Not breath tricks. The actual fundamentals — distilled from the Foundation curriculum, rewritten for people who don't have eight weeks right now.

**Form fields:** First name · Email
- First name placeholder: *First name*
- Email placeholder: *you@email.com*

**Submit button:** *Send me the guide*

---

# About page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** AboutHero → StoryScroll (4 beats: Origin → Turning Point → Transfer → Brand claim) → WhoFor → CTA

The StoryScroll structure was built in phase 4 with placeholder Sanity field mappings. The copy below populates those fields once schemas are reorganized.

---

## §1 — About hero

**Eyebrow:** `THE STORY`

**Headline:** *I learned this in a {{room}} that wasn't a boardroom.*

**Subhead:** Twenty years of dance taught me what presence is actually made of. None of my students dance. All of them learn the same fundamentals — because the room doesn't care what your medium is. It only knows whether you're actually there.

*(No CTA — the about page is a story, not a conversion.)*

---

## §2 — StoryScroll · Beat 1 (Origin)

**Image:** classroom (the high school setting)

**Headline:** *We weren't just a group of {{kids}}.*

**Body:** The first dance club at our high school. Nobody knew what they were doing. Neither did I. But on stage, the room did something the classroom never had — and I've been trying to understand it ever since.

---

## §3 — StoryScroll · Beat 2 (Turning Point)

**Image:** microphone / performance moment

**Headline:** *I hadn't just learned to dance. I had learned to {{lead}}.*

**Body:** A school performance. The fear. The planning. It was wrong all the way through. Then it wasn't. I stopped managing and started listening. That was the first thing I'd ever done that felt like leading.

---

## §4 — StoryScroll · Beat 3 (Transfer + Brand claim — combined)

**Image:** teaching

**Headline:** *Not moves. Not routines.*
*The {{fundamentals}}.*

(Two-line treatment, italic anchor on second line per phase 4 build.)

**Body (paragraph 1):** I spent the next decade reverse-engineering what happened. Not the choreography. Not the performance. The fundamentals.

**Body (paragraph 2):** Then I started seeing them in the leaders, writers, and speakers who actually held a room. None of them danced. All of them had it.

**Payoff line (slightly larger body text):** *How to find your centre. How to read a room. How to move with what's happening. How to hold authority without force.*

---

## §5 — WhoFor (exit beat)

**Status:** ✅ Locked (preserved from phase 4)

**Image:** the warm/personal one

**Headline:** *None of these people are {{broken}}.*

**Body:** They just never had anyone show them that the way you naturally are — quiet, observant, internal — is already enough to build something powerful on.

---

## §6 — About page CTA

**Eyebrow:** *(none)*

**Headline:** *That's the {{story}}. Here's the offer.*

**Body:** If any of this landed — if any of this sounded like you — the next step is the assessment. Eight questions. Three minutes. It tells you which of the four circles you're already in, and which one is missing. Free. No account.

**CTA:** *Discover Your Ikigai* → `/ikigai`

*(CTA wording matches home page primary CTA exactly — button consistency reduces decision friction.)*

---

# Ikigai page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero → Four Circles preview → Quiz bridge → Quiz → Foundation Starter Guide capture → CTA

Phase 4 set up the visual structure (hero gap fixed, four-circle cards strengthened, quiz bridge added). Copy below populates those fields.

---

## §1 — Ikigai hero

**Eyebrow:** `THE ASSESSMENT`

**Headline:** *Most people are missing {{one}} circle. They've been calling it something else for years.*

**Subhead:** Passion, Mission, Vocation, Profession — most people are already in three. The work you were meant for sits where all four overlap. Eight honest questions, three minutes, and you'll know which one isn't there yet.

**Primary CTA:** *Start the Assessment* → (anchor to quiz section)

*(The phrase "eight honest questions" appears here and again in the §3 quiz bridge. Deliberate brand-marker repetition; preserved across both instances.)*

---

## §2 — Four Circles preview cards

Each card has two lines: a plain-text **definition** and an italicised **missing-line**. Italics only on the missing-line — the definition reads as quieter scaffolding underneath. Card titles use the canonical ikigai labels.

### Passion
**Definition:** What you love doing.
**Missing:** *You're competent and quietly bored. The work is fine. You are not.*

### Mission
**Definition:** What the world actually needs from you.
**Missing:** *You're useful and you can't feel why it matters. The output ships. The meaning doesn't.*

### Vocation
**Definition:** What you can be paid to do.
**Missing:** *You love the work and the world hasn't figured out how to pay you for it yet.*

### Profession
**Definition:** What you're trained for and good at.
**Missing:** *You're passionate and you keep getting outmatched by people who actually know how.*

*(Definitions stay close to canonical ikigai labels — Jon doesn't redefine ikigai. The missing-lines do the recognition work. Profession's missing-line runs hotter than the others by design — Profession-missing is the gap people most resist admitting, and a uniformly-tempered set of cards would feel managed.)*

*(Schema implication: per workstream-2 note #5, these definitions should live in a single Sanity document referenced from both this page and home page §3, not duplicated.)*

---

## §3 — Quiz bridge

**Status:** ✅ Locked (preserved from phase 4)

Single line: *Eight honest questions. No right or wrong answers — only clarity.*

---

## §4 — Quiz

Question text lives in `lib/auditData.ts`. Out of scope for canonical copy doc unless we choose to migrate questions to Sanity (recommended in phase 5 schema redesign).

---

## §5 — Foundation Starter Guide

Same as home page §10. Reuse Sanity content via shared field reference, not duplicated.

---

## §6 — Ikigai CTA

**Eyebrow:** `ENOUGH READING`

**Headline:** *You don't need more {{information}}. You need to actually try.*

**Body:** You've read the page. You know what the assessment does. The only thing left is to take it. Eight questions. Three minutes. No account.

**CTA:** *Take the Assessment* → (anchor to quiz section)

*(Uses the voice rules' bullshit-clause example as the headline — fired here at the closing CTA where the brand has earned the right to call the question. This is the page's one bullshit-clause use; voice rules permit one per page.)*

---

# Foundation page

**Status:** ⚪ Stub — voice pass needed

**Sections in render order:** Hero → Curriculum (8 weeks) → "Not a lecture series" → Pricing (Two ways in) → FAQ → Audit CTA → Foundation Starter Guide

Foundation is the highest-stakes paid conversion page on the site. Copy is mostly in place but needs voice tightening. Phase 4 fixed vertical rhythm; phase 5 should focus on:
- Hero claim sharpening
- Pricing card differentiation copy
- FAQ tone consistency
- "Not a lecture series" positioning line

---

## §1 — Foundation hero

**Current placeholder:** *Executive presence for people who think before they speak.*

This is close. Voice pass needed — feels slightly more corporate than the home page hero. Possible direction: lean harder on what The Foundation actually is (eight weeks, body first, transferable) and less on the audience descriptor.

---

## §2 — Curriculum

Eight modules, one per week. Each module needs:
- Module number + title
- Duration
- One-line description in voice

Module titles from current page (paraphrased in voice rather than rewritten wholesale) — TBD.

---

## §3 — "Not a lecture series. A movement practice."

This headline already works. Three-column body needs voice pass.

---

## §4 — Pricing

Two cards: $197 self-paced and $497 with weekly check-ins. Each card needs:
- Eyebrow
- Title
- Inclusions list (in voice — no generic "lifetime access" boilerplate)
- Price
- CTA

---

## §5 — FAQ

Common questions list. Each Q+A pair needs voice pass.

---

## §6 — Audit CTA + Foundation Starter Guide

Reuse home page §9 and §10.

---

# Programs page

**Status:** 🟡 Partially refreshed (phase 4) — needs gap-filling

**Sections in render order:** Hero (with FocusAreas) → Case studies (moved up in phase 4) → Program cards → Supplemental learning → FAQ → Closing CTA → Foundation Starter Guide

---

## §1 — Programs hero

**Headline:** *This is where it gets {{physical}}.*

**Subhead:** Executive presence isn't a mindset shift. It's a physical one. These programs teach you to occupy space, hold stillness, and project authority — in a way that matches how good you already are.

(Slight voice pass needed — "physical one" lands but the "executive presence" framing leans corporate. Consider revising.)

**"Who this is built for" — bullet list (locked in phase 4):**
- You're good at your job. The room just doesn't feel it yet.
- You've been told you're "too quiet" — or too much. Neither felt accurate.
- You want to stop managing how you come across and start actually showing up.
- You're already good enough. You just never learned to inhabit it.

---

## §2 — Case studies header (locked in phase 4)

**Eyebrow:** `BEFORE & AFTER`
**Headline:** *Real shifts. Actual situations.*
**Subhead:** The names and some details have been changed. The challenges and outcomes are accurate.

---

## §3 — Three program cards

Self-paced ($197) · Foundation + Weekly Check-ins ($497) · 1:1 Coaching ($3,500+)

Each card needs voice pass. Current copy is functional but generic.

---

## §4 — Supplemental + FAQ + Closing

Standard sections, voice pass needed.

---

# Lessons page

**Status:** ⚪ Stub — light copy load

**Sections:** Hero → Course cards → Closing CTA

The hero ("The Blueprint") works. Subhead needs review. Course cards are pulled from Sanity — those need voice pass at the course level (Four Circles description, Foundation description).

---

## §1 — Lessons hero

**Eyebrow:** `STRUCTURED LEARNING`
**Headline:** *The Blueprint*
**Subhead:** A structured path from self-aware professional to quietly commanding leader. Each course builds on the last — choose your starting point and go at your own pace.

(Voice pass: "self-aware professional to quietly commanding leader" is fine but slightly aspirational-paint. Consider tightening.)

---

## §2 — Course cards

Pulled from Sanity. Each course needs:
- Title
- One-paragraph description
- Difficulty/duration metadata

The Four Circles description was flagged in phase 4 for review. Foundation description also needs alignment with the Foundation page's own positioning.

---

# Blog index page

**Status:** ⚪ Stub — mostly chrome

**Sections:** Hero → Filter pills → "The Lab" featured strip → Featured grid → All articles list → Newsletter capture → Audit CTA → Foundation Starter Guide

---

## §1 — Blog hero

**Headline:** *The Archives*
**Subhead:** Practical writing on presence, movement, and what it actually takes to stop disappearing in rooms.

Voice is close. Subhead may want one more line. TBD.

---

## §2 — Filter pills

Renames from phase 4 (deferred to phase 5):
- MOVEMENT & BODY → The Body
- PRESENCE & CONFIDENCE → Presence
- LEADERSHIP & CAREER → The Work
- THE LAB → The Lab (no change)

---

## §3 — The Lab strip

Existing copy:
> The Lab — I'm putting myself through the foundation program and documenting my journey — what's working, what's hard, what's actually changing. Updated as I go.

"Documenting my journey" — banned word. Rewrite needed.

Suggested direction (Register A): *I'm running myself through the foundation. Honest notes on what's working, what isn't, and what I keep getting wrong. Updated as I go.*

---

# Contact page

**Status:** 🟢 Already in good shape — polish pass only

The contact page is the cleanest page on the site already. Hero, "What's on your mind" coaching/general split, "What happens next" steps, and "A few things worth knowing" are all on-voice. Polish pass should:
- Verify every line passes the voice rules
- Tighten any line that drifts (none flagged on first read)

---

# Audit page

**Status:** ⚪ Stub — minimal marketing copy

Quiz question text lives in `lib/auditData.ts`. Out of scope unless migrated to Sanity in phase 5 schema redesign.

Marketing copy:
- Pre-quiz intro line
- Result band copy (low / mid / high) — needs voice pass, currently slightly coachy
- Post-result CTA

---

# Globals — copy that appears on every page

## Navbar

- Logo wordmark: `JONCHALANT`
- Primary nav: Start Here · Programs · Lessons · About
- Sign In link: *Sign In*
- Mobile primary CTA: *Discover Your Ikigai* → `/ikigai`

## Footer

- Brand line: *Find the work you were meant for — then learn to inhabit it.*
- Column 1 — Essentials: Home · About · Contact
- Column 2 — Coaching: Programs · The Foundation · Ikigai
- Column 3 — Learn: The Blueprint · The Archives · The Breakdown · Presence Audit
- Account: Sign In
- Copyright: *© 2026 Jonchalant. All rights reserved.*
- Privacy link: *Privacy*

## Form microcopy (universal)

- Submit success: *Got it. Check your inbox.*
- Submit error: *Something went sideways. Try again, or email me directly: jon@jonchalant.com*
- Email validation: *That doesn't look like an email.*
- Required field: *Required.*

---

# Schema implications (preview for workstream 2)

This document already exposes several schema-level decisions that need to be made:

1. **Repeating sections.** "Foundation Starter Guide" appears on home, ikigai, and foundation pages. It should be one Sanity document referenced by each page, not three duplicated copies.

2. **Audit CTA pattern.** Same — appears on multiple pages. One source.

3. **Newsletter capture.** Same — one source.

4. **Pillar definitions.** Grounding/Energy/Flow/Command appear on home and Foundation. One source.

5. **Four Circles definitions.** Passion/Mission/Vocation/Profession appear on home and ikigai. One source.

6. **Quiz questions.** Currently in `lib/auditData.ts`. Decision: migrate to Sanity or keep in code. Migration enables non-engineering edits but couples scoring logic to CMS.

7. **Italic anchor convention.** Every headline field needs a description telling editors how to use `{{double-braces}}`. Studio UI should make this discoverable.

8. **Field naming standardization.** All hero-shaped sections use the same field names: `eyebrow`, `headline`, `subhead`, `body`, `primaryCta`, `secondaryCta`. No drift.

These get resolved in workstream 2 (schema redesign).

---

# Workstream progress

| Workstream | Status |
|---|---|
| 1. Canonical copy doc | 🟡 In progress — Home + About + Ikigai locked, remaining pages stubbed |
| 2. Schema redesign | ⚪ Not started |
| 3. Content population + code reconciliation | ⚪ Not started |

Next session: pick up workstream 1 with the Foundation page voice pass, then proceed in order: Programs → Lessons → Blog → Contact → Audit → Globals.
