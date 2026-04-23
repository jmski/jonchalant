# Jonchalant — Surface Audit & Repositioning Plan

**Context:** Ikigai is moving from a buried page to the front door of the brand. Every page gets audited below under that new frame. Goal: identify what stays, what shifts, what's broken, and what's dependent on real assets arriving next month.

---

## The core repositioning (read this first)

**Old frame:** Executive presence coaching for introverts, taught through dance.

**New frame:** Help people find the work they were meant for, then embody it. Dance is Jon's medium and the demonstration of the philosophy — the embodiment practice transfers to any medium.

**What this changes across the site:**

1. **Lead message** shifts from "build presence" to "find purpose, then embody it."
2. **Ikigai quiz** becomes the top-of-funnel entry point, not a side experience.
3. **Foundation** becomes step two — embodiment training for the purpose you've just identified.
4. **Dance** becomes the demonstration layer, not the product.
5. **Target** expands subtly: not just introverts, but professionals who suspect they're misaligned.

**The funnel tension to solve:** If someone takes the ikigai quiz and their medium is writing or building or leading, what do you sell them? The Foundation has to earn the claim that embodiment training transfers. The copy needs to say this explicitly, not assume it.

**Recommended new hierarchy of CTAs:**

1. Discover your ikigai (quiz) — primary, everywhere
2. Take the Presence Audit — secondary, for people already past step 1
3. Enroll in the Foundation — for people who know they want the work

---

## Cross-cutting items (do these before page-by-page work)

These aren't tied to any single page and should be knocked out first:

1. **Navbar rework** — logo left, nav pill centre, sign-in right. My proposal: circular "N" monogram button outside the pill for sign-in. Pairs visually with the pill through proximity, clearly a different action category. "Start Here" as a distinct nav item that's visually weighted slightly heavier (not bigger — use medium weight vs regular on the others, or an underline, or a subtle dot indicator). Linking to the ikigai quiz, not programs, under the new positioning.
2. **Remove "As Seen On"** — strip from home page, remove from schema (`homePageContent.seenOn` or equivalent), remove any related components. Don't leave dead fields.
3. **Home hero CTA** — currently "Start With Your Free Audit" linking somewhere unclear. Under new positioning: primary CTA is "Discover Your Ikigai" → `/ikigai`. Audit becomes secondary CTA.
4. **Foundation card routing on programs page** — fix both cards. Self-paced Foundation → `/programs/foundation` (or register). Foundation + Weekly Check-ins → `/programs/foundation` with a query param or flag that triggers check-in booking after registration. Never route a Foundation CTA to `/contact`.
5. **Footer cleanup** — "The Blueprint / The Archives / The Breakdown / Free Audit" are cute names but ambiguous to a first-time visitor. Either keep the names and add one-word descriptors, or swap to literal names. Worth a separate decision.

---

## Page-by-page audit

Each page gets: what it is now, what's broken, what changes under the new positioning, and what's blocked on real assets.

---

### 1. Home (`app/page.tsx`)

**What it is now:** Hero with placeholder video, four pillar cards (Grounding / Energy / Flow / Command) with black placeholder videos, Instagram section, blog preview, testimonial block, CTA.

**What's broken:**

- Hero CTA link unclear / likely wrong destination.
- "As Seen On" strip needs removal.
- Four pillar videos are all placeholder black boxes — visually dead zone dominating the page.
- Instagram section with two white placeholder rectangles is filler.
- The page doesn't say what Jon actually does until you scroll past the pillars. The hero is abstract.

**What changes under new positioning:**

- **Hero headline needs to lead with the ikigai question.** Something in the territory of *"Are you doing the work you were meant for?"* or *"Most professionals are in the right industry, wrong role."* Not "executive presence." The presence angle comes after.
- **Primary CTA: Discover Your Ikigai.** Secondary: Take the Presence Audit.
- **The four pillars (Grounding / Energy / Flow / Command) need reframing.** Right now they read as dance concepts. Under ikigai-front-door, they should read as *what alignment looks like* — the qualities that emerge when someone is in the right medium doing the right work. Same words, different copy underneath.
- **Add a "Here's how this works" moment** — three steps: Discover (ikigai) → Embody (foundation) → Practice (ongoing). Clean, literal, replaces the abstract pillar grid as the primary explainer.

**Asset dependencies:**

- Hero video: placeholder until photoshoot. Midjourney can generate a moody abstract loop in the meantime — something kinetic, not static.
- Four pillar videos: these should become short movement clips after the shoot. Until then, either commission four illustrations (since you're already commissioning) or replace with type-only cards. **Strong recommendation: type-only cards until real video exists.** Black placeholder boxes are worse than no boxes.
- Instagram section: kill it for now. Bring it back when there's actual content to show.

**Sanity schema work:** Audit `homePageContent` — likely has fields for `seenOn`, hero video URL, pillar video URLs, Instagram embed IDs. Remove seenOn. Make video fields optional and render conditionally. Add a new `howItWorks` field group (3 steps × title, description, icon).

---

### 2. About (`app/about/page.tsx`)

**What it is now:** Five-panel origin story with image placeholders (classroom → empty studio → microphone → teaching → origin-5), a pull quote, a long personal narrative about not learning to dance until late, a "What I'm teaching" section, a family photo section.

**What's working:** This is the strongest page on the site right now. The voice is clearly Jon's — casual, specific, honest. "I hadn't just learned to lead. I had learned to lead because the lesson plan required it" is the kind of line that makes a stranger trust you.

**What's broken:**

- The five-panel photo grid is all placeholder text — this page is *dependent* on the photoshoot to work visually.
- The 2x2 or 5-panel grid (depending on what's there now) is a known design critique item — single hero image was the recommendation.
- The family photo at the bottom is emotionally strong but the positioning is unclear — is this a credential? A vulnerability moment? Label it clearly or lose it.

**What changes under new positioning:**

- **Ikigai is now the through-line of this page.** The origin story is *literally a story about Jon finding his ikigai late* — dance as the overlap of love, skill, value, and need. That's the bridge between your personal story and the product. Say it explicitly. One section titled something like *"This is what ikigai felt like for me"* with the four-quadrant diagram overlaid on the story.
- The "What I'm teaching" section gets reframed from "no moves, no routines, the fundamentals" to something like "the fundamentals of embodiment — so you can apply them to whatever medium is yours."
- Add a subtle closing: *"Dance was mine. Yours might be writing, or sales, or standing in front of a boardroom. The work is the same."*

**Asset dependencies:** Heavy. Photoshoot next month. Until then:
- Replace the 5-panel grid with one hero illustration (commissioned) + prose. The grid without images is dead space.
- Or: use the grid, but fill it with Midjourney outputs styled consistently — understanding they're placeholder.

**Sanity schema work:** `aboutPage.phases` (the five panels) — check if image fields are required. Make optional. Add a new field for the ikigai moment section.

---

### 3. Programs (`app/programs/page.tsx`)

**What it is now:** Hero with "Start With Your Free Audit" CTA, stats strip, focus areas grid ("Awareness / Practice / Presence / Integration"), a "How This Works" three-column grid (1-on-1 / Movement & Presence / Group Workshops), Jon headshot section, single testimonial, blog cards, email optin, "Still Here?" closer.

**What's broken:**

- Foundation card CTAs route to contact (confirmed broken).
- Page is structurally fine but the *choice architecture* is weak. You offer 1-on-1, Movement & Presence, Group Workshops — three options, no clear recommendation, no pricing until deep in the page.
- The hero CTA is "Start With Your Free Audit" which competes with the programs on the page you're already on. Confusing.

**What changes under new positioning:**

- **Ikigai entry point up top.** Banner or small card: *"Not sure which program fits? Take the ikigai quiz first."* Low-key, but present.
- **Reframe the four focus areas (Awareness / Practice / Presence / Integration) as embodiment stages** — these map beautifully to an ikigai-through-embodiment journey. Keep the names, rewrite the copy.
- **Foundation needs to be the clear recommended path.** Right now it's presented as "one of three options." Under the new positioning it's the core product. Mark it as recommended / most popular, visually bigger, make the other two options smaller satellites.

**Asset dependencies:** Jon headshot section needs the real photoshoot. Placeholder is fine for now but mark it as TODO.

**Sanity schema work:** `program` schema — check CTA link field. Make sure each program can specify its own CTA destination (not hardcoded). `programsPageContent` — likely where the focus areas live. Audit for hardcoded copy.

---

### 4. Foundation (`app/programs/foundation/page.tsx` — inferred from image)

**What it is now:** Dedicated sales page for the Foundation. 8-week curriculum breakdown, "How it works" three columns, two pricing tiers ($197 self-paced / $497 with check-ins), FAQ, presence audit CTA at the bottom.

**What's working:** This is the most complete sales page on the site. Structure is right, pricing is clear, FAQ handles objections. The module breakdown is concrete.

**What's broken:**

- Copy treats the Foundation as about *presence* specifically. Under the new positioning it needs to earn the claim that the embodiment fundamentals transfer to any medium. Right now it assumes dance is the vehicle without defending why it should matter to a writer or a salesperson or a lawyer.
- "8 weeks, one week at a time" is good. The module names (Why Soft Skills Matter / The Body as Instrument / etc.) are solid. But the descriptions underneath are where the transfer-to-any-medium claim has to land.

**What changes under new positioning:**

- Opening frame: *"You've found your medium. Now learn to inhabit it."* or similar. Positions the Foundation as step 2 after ikigai.
- Add a short section: *"Why dance teaches this better than anything else"* — addresses the transfer concern head-on. If you don't justify dance-as-teaching-medium, skeptical professionals bounce.
- Keep the two-tier pricing as-is. The self-paced / with-check-ins split is good product design.

**Asset dependencies:** Module thumbnails or illustrations would help. Low-priority — the text-heavy structure works.

**Sanity schema work:** Is the Foundation page driven by Sanity or hardcoded? If hardcoded, this is a big schema build-out — module schema, tier schema, FAQ schema. Worth doing once, reusing for future programs.

---

### 5. Lessons / The Blueprint (`app/lessons/page.tsx`)

**What it is now:** "The Blueprint" hero, two course cards (Baby Steps + The Foundation, both placeholder hero images), "Ready to accelerate?" bridge to coaching programs, email optin, footer.

**What's broken:**

- Only two courses shown, and you've said Baby Steps is being revamped anyway. So this page is effectively showing one usable course.
- Card hero images are empty beige rectangles. Visually dead.
- The "apparent empty card state on the lessons page" diagnostic item from the design critique applies here — is there a third category (Advanced) that's rendering empty? Worth checking.

**What changes under new positioning:**

- Minor. This page is fundamentally *learn at your own pace*, which works fine in either positioning. Main tweak: intro copy should tie back to ikigai/embodiment rather than generic "self-aware professional → quietly commanding leader."
- Consider adding a card preview for *future* courses (greyed out, "coming soon") — signals the site isn't a two-course shop but a growing library. Only do this if there's a real roadmap.

**Asset dependencies:** Course hero imagery. Commission illustrations here — courses benefit from distinct visual identity per course.

**Sanity schema work:** `lesson` schema categorizes by level. Check if there's a parent `course` concept or if lessons are just grouped by tag. If grouped by tag, might be worth formalising a `course` schema so Baby Steps and Foundation become proper documents with their own page structure.

---

### 6. Ikigai (`app/ikigai/page.tsx`)

**What it is now:** "Find the Work You Were Meant For" hero with four-quadrant diagram, explanation, quadrant cards, "Discover Your Ikigai" CTA, then the quiz itself — 8 questions, 4-point scale.

**What's working:** This page is already well-built. Under the new positioning, this is about to become the highest-traffic page on the site.

**What's broken:**

- Currently buried — footer link only, not in main nav.
- Quiz completion path is unclear from the audit: what happens after question 8? Does it show a results page, email capture, redirect to Foundation? This is the critical conversion moment.

**What changes under new positioning:**

- **Promote to main nav.** Either as "Ikigai Quiz" or as "Start Here" pointing here.
- **Results page becomes the most important page on the site.** Needs to: (1) show which quadrant(s) the user is strong in, (2) interpret what that means, (3) recommend next step — usually the Foundation, framed as *"you've identified your medium, here's how to inhabit it."* If results page doesn't exist yet or is thin, this is priority.
- **Add email capture at the end of the quiz.** Not paywalled, but offered: "Want your results + a weekly note from Jon on ikigai?" Feeds Kit.

**Asset dependencies:** None critical. The SVG diagram works.

**Sanity schema work:** Is the quiz content in Sanity or hardcoded? If hardcoded (likely), build an `ikigaiQuiz` schema with questions, answer mappings, and results copy per outcome pattern. This unlocks quiz iteration without deploys.

---

### 7. Archives / Blog (`app/blog/page.tsx`)

**What it is now:** "The Archives" hero, search, filter pills (All / The Lab / Movement & Body / Presence & Confidence / Leadership & Career), "The Lab" series card, featured section (5 posts), all articles list, email optin, audit CTA.

**What's working:** Strong information architecture. The Lab as an ongoing series is a good content move.

**What's broken:**

- Filter pill labels are keyword-heavy (known issue from design critique — "Leadership & Career" reads as SEO). These are Sanity Studio edits, no code needed. Simpler labels: Lab / Body / Presence / Career.
- Featured cards have placeholder beige rectangles where images should be.

**What changes under new positioning:**

- Add a filter category: *Ikigai & Purpose*. Or weave it through existing categories.
- Intro copy can stay largely as-is — "what it actually takes to stop disappearing in rooms" still works, maybe broaden to "stop disappearing in rooms and start doing work that matters."

**Asset dependencies:** Blog post cover images. Midjourney can handle these per-post as you publish.

**Sanity schema work:** `blogPost.pillar` field values are probably the filter labels — update those in Studio (no code). Consider adding `blogPost.ikigaiQuadrant` as an optional tag for posts that map to specific ikigai dimensions.

---

### 8. Dance (`app/dance/page.tsx`)

**What it is now (inferred):** Featured video + portfolio grid + approach section + CTA.

**What changes under new positioning:**

- **Dance's role shifts from "the product" to "the demonstration."** This page should answer: *"Why dance? Why is this the medium Jon uses to teach embodiment?"* Right now (likely) it reads as a choreography portfolio.
- Add a framing sentence up top: *"Dance is my medium. Here's what it looks like when philosophy becomes practice. Yours might be different."*
- Can deprioritize this page — it's lower in the funnel under the new positioning.

**Asset dependencies:** Depends on real dance content. Keep portfolio as-is for now.

---

### 9. Contact (`app/contact/page.tsx`)

**What it is now:** "Not sure where to start?" audit card up top, "What's on your mind?" with two options (1-on-1 coaching / General question), what-happens-next timeline, "A few things worth knowing" principles block, foundation guide optin.

**What's working:** This page has *personality.* "I don't do pressure. I work with individuals, not committees. Spots are limited." That's brand voice. Don't touch it.

**What's broken:** Nothing major. This page is in good shape.

**What changes under new positioning:** Minor. Could add a third inquiry option: "I took the ikigai quiz and want to talk about my results." Low priority.

**Asset dependencies:** None.

---

## Kinetic typography moments

You mentioned wanting these as section separators and for emphasis. My rule: **one per page, maximum, and it has to carry the page's argument — not decorate it.** Here's where they'd earn their place:

- **Home:** *"Are you in the right room, playing the wrong role?"* — between hero and pillars.
- **About:** *"I learned to lead because the lesson plan required it."* — the existing quote, just rendered as a kinetic moment.
- **Programs:** *"Find the format that fits where you are."* — already a headline on the page, worth elevating.
- **Foundation:** *"8 weeks. One week at a time."* — already strong, kinetic rendering underlines it.
- **Ikigai:** *"IKIGAI"* itself, entering with the diagram assembly animation.

Skip kinetic moments on Blog, Lessons, Contact. They're functional pages, movement would fight the scanning behaviour.

---

## Asset strategy while you wait for the photoshoot

Prioritise commissioned illustrations here (highest ROI until photos land):

1. **Ikigai quadrant diagram** — probably already illustrated, but make sure it's production-quality.
2. **Four pillar cards (home)** — one illustration each for Grounding / Energy / Flow / Command.
3. **About page origin story** — one hero illustration that captures the "found dance late" moment.
4. **Two course hero images (Baby Steps + Foundation)** — distinct, memorable.
5. **Foundation module thumbnails (8 of them)** — lower priority, can wait.

Midjourney handles: blog cover images, hero video loops, placeholder Jon-at-work imagery until the shoot. Keep a consistent prompt style so placeholders feel intentional, not random.

---

## Priority ordering (post-audit)

Given everything above, here's how I'd sequence the deep-dive work:

1. **Positioning doc + message pillars** — 1 session, locks the language.
2. **Cross-cutting bugs** — navbar, As Seen On removal, CTA routing, footer cleanup. 1 session.
3. **Ikigai page deep-dive** — promote to front door, results page, email capture, schema. This is the new centre of gravity.
4. **Home deep-dive** — reframe around ikigai, how-it-works section, kill dead zones (pillar videos, Instagram).
5. **About deep-dive** — integrate ikigai as the through-line.
6. **Programs + Foundation deep-dive** — fix choice architecture, defend transfer claim.
7. **Lessons** — wait until Baby Steps revamp is scoped.
8. **Archives, Dance, Contact** — light polish only.

The first three items are high leverage. Items 4–6 depend on 1 being locked. Items 7–8 can wait.

---

## Open questions for you

Before we go deep on any page, these need answers:

1. **What does the Foundation promise a non-dancer?** The transfer-to-any-medium claim has to be defensible. What's the actual mechanism?
2. **Ikigai results page — does it exist yet?** If not, this is the biggest build task in the whole plan.
3. **Course roadmap beyond Baby Steps + Foundation** — real, or aspirational?
4. **Footer link names** — keep the branded names (Blueprint, Archives, Breakdown) or switch to literal?
5. **Baby Steps revamp** — in scope for this quarter, or separate track?
