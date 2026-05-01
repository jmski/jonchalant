# Jonchalant — Canonical Copy

**Source of truth for every piece of marketing copy on the site.**

This document is the input for Sanity schema design and content population. Every page section here corresponds to a Sanity field group. When this doc and Sanity Studio disagree, **Sanity is updated to match this doc** — never the reverse.

Last updated: Phase 5, workstream 1 — **COMPLETE.** All ten content surfaces locked in voice. Ready for workstream 2 (schema redesign).

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

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero → Who this is for → Why dance → Curriculum → How it works → Enrollment → FAQ → Soft CTA (audit fallback) → Foundation Starter Guide

Phase 4 fixed vertical rhythm. Phase 5 fully drafted the page in voice, killed the standalone kinetic moment (folded into curriculum), and inserted a "Why dance" section between hero and curriculum to preempt the medium objection on the page rather than in the FAQ.

---

## §1 — Hero

**Eyebrow:** `THE FOUNDATION · 8-WEEK COURSE`

**Headline:** *Learn to inhabit the {{work}}.*

**Subhead:** An eight-week embodiment practice taught through dance — because the body learns what the head can't argue with. The pillars transfer to whatever your medium actually is: a meeting, a stage, a page, a room.

**Primary CTA:** *Enroll — Starting at $197*

**Secondary CTA:** *See What's Inside*

**Microcopy under CTAs:** *No prerequisites. Self-paced unlocks weekly.*

---

## §2 — Who this is for (hero right column)

**Header:** *Who this is for*

**Lede:** You already have the substance. This is about the signal.

**Bullet list:**
- You know your material but lose it when the room is watching.
- You've been called "quiet" or "reserved." Both were code for "not leadership material."
- You're sharp in a 1:1. Something different happens when the room gets bigger.
- You over-prepare. You still feel shaky when it counts.
- You want to walk in as yourself and have it be enough.

---

## §3 — Why dance

**Eyebrow:** `WHY DANCE`

**Headline:** *Dance can't be {{faked}}.*

**Body (paragraph 1):** I get the question constantly: why dance, if your students are leaders and writers and engineers? The honest answer is that dance is the most precise medium I know for training what every other medium needs. You can't bluff your way through a phrase. You can't talk faster to cover the gap. The body is either there or it isn't, and the room can see which one.

**Body (paragraph 2):** That's the whole reason it transfers. The pillars — Grounding, Energy, Flow, Command — exist in any room where you have to show up. A meeting, a stage, a page, a hard conversation with someone who matters. Dance is just where they're hardest to fake, and therefore easiest to actually learn.

**Body (paragraph 3 — the lock):** You won't be doing pirouettes. You'll be learning to find your weight before you speak. To calibrate to a room without performing. To hold a position without bracing. The medium is dance. The work is presence.

**Render note:** Prose, single-column, full text width. No image accompaniment in v1. This section is an argument, not a feature list — the layout should make the reader read it.

---

## §4 — Curriculum

**Eyebrow:** `THE CURRICULUM`

**Header:** *Sequential on purpose.*

**Lede:** Each module builds on the last — grounding before energy, energy before flow, flow before command. You can go faster. Most people shouldn't.

### Module 1 — Why Practice Outlasts Performance

**Duration:** 12 lessons · 15–20 hours

**Blurb:** The argument for the whole approach. Why frameworks and pep talks don't survive the moment that matters, and why physical practice does. By the end of this module you'll know exactly what you're training and why it can't be done from the neck up.

### Module 2 — The Body as Instrument

**Duration:** 17 lessons · 25–30 hours

**Blurb:** Grounding. The first pillar. How you stand, how you take up space, what you do with your hands when you're not doing anything with your hands. Most professionals have never been taught this. They've been told to "have presence." This is where presence is actually built.

### Module 3 — Active Listening & Attunement

**Duration:** 18 lessons · 25–30 hours

**Blurb:** Energy. Reading the room with your whole body, not just your ears. How dancers track each other without looking. How leaders walk into a meeting and know within thirty seconds what kind of room they're in. The practice that turns "good intuition" into something you can train.

### Module 4 — Improvisation & Adaptability

**Duration:** 18 lessons · 25–30 hours

**Blurb:** Flow. The skill of having a plan and being willing to abandon it. Improvisers don't make things up — they respond. By the end of this module you'll be able to do the same thing in any room: hold the structure loose enough for what's actually happening to shape it.

### Module 5 — Reading the Exchange

**Duration:** 18 lessons · 25–30 hours

**Blurb:** The bridge module. Where listening and improvisation become one thing — a real-time conversation between you and the room. You'll learn to match and diverge on purpose. To hold your ground without bracing. To stop performing connection and start actually doing it.

### Module 6 — Tonality & Vocal Presence

**Duration:** 19 lessons · 25–30 hours

**Blurb:** Command, in sound. What your voice does when you're confident. What it does when you're managing. How to tell the difference, in yourself, in real time. Pacing, weight, the strategic use of silence. Most leadership voices fail not because they're too quiet, but because they fill every gap.

### Module 7 — Presence in Practice

**Duration:** 18 lessons · 25–30 hours

**Blurb:** All four pillars, under pressure. High-stakes simulations — the presentation, the difficult conversation, the moment when the room turns. You'll do them, you'll watch yourself do them, you'll do them again. This is the module where the work goes from "I understand it" to "I can do it when it counts."

### Module 8 — The Work, Embodied

**Duration:** 14 lessons · 20–25 hours

**Blurb:** What happens after eight weeks. How to keep practicing when nobody's watching, when there's no module to complete, when the only feedback is the room. You'll leave with a personal practice — not a routine, not a checklist. A way of moving through your work that doesn't dissolve the moment the course ends.

---

## §5 — How it works

**Eyebrow:** `HOW IT WORKS`

**Header:** *Not a lecture series. A movement practice.*

### Column 1 — Self-paced video lessons

Watch at your own pace. Every lesson is a short concept — no fluff, no filler. Lifetime access.

### Column 2 — Movement-grounded principles

Each week draws from professional dance training and translates it into leadership behaviour you can practice immediately.

### Column 3 — Personal follow-up from Jon

Jon reads what you write and writes back. Sometimes a paragraph, sometimes a short video. Always within 48 hours.

---

## §6 — Enrollment

**Eyebrow:** `ENROLLMENT`

**Header:** *Two ways in.*

### Card A — Self-paced

**Price line:** *$197 · once · lifetime access*

**Description:** For people who'll show up to the work without a calendar holding them to it.

**Inclusions:**
- 8 weeks of lessons, 134 lessons total
- Movement-to-leadership frameworks
- Lifetime access
- Personal follow-up from Jon

**CTA:** *Enroll — $197*

### Card B — With weekly check-ins

**Badge:** `MOST CHOSEN`

**Price line:** *$497 · once · lifetime access*

**Description:** Everything in self-paced. Plus eight thirty-minute calls with me, one a week, for whatever the work is bringing up.

**Inclusions:**
- Everything in Self-Paced
- 8 weekly 30-minute calls with Jon
- Real-time feedback on your specific situations
- Prioritized scheduling

**CTA:** *Enroll — $497*

**Footnote under cards:** I keep the with-check-ins tier small on purpose. If you're considering it, the audit will tell you whether it's right.

---

## §7 — FAQ

**Header:** *Common questions.*

### Is this right for me if I'm not a dancer?

Yes. Most people who take this aren't. Dance is the medium I teach in because it can't be faked — but the pillars transfer to any room where you have to show up as yourself in front of people.

### How much time does each week require?

About 90 minutes of lesson time, plus 15–20 minutes a day of practice. Less than a gym habit. More than a podcast.

### What makes this different from other confidence or leadership courses?

Most of them work from the neck up — frameworks, scripts, mindset. The gap between "I know what to do" and "I can do it when it counts" doesn't close from there.

### What does "personal follow-up from Jon" mean in practice?

You write a few sentences after each module about what's landing and what isn't. Jon reads it and writes back — usually within 48 hours, sometimes with a short video. It's not a coaching call. It's a check-in that keeps you honest.

### Is there a refund policy?

Yes. If the first two modules don't deliver, full refund within 14 days. No questions, no exit interview.

### What's the difference between the self-paced and with-check-ins tiers?

Self-paced is the curriculum. With-check-ins is the curriculum plus a weekly 30-minute call with Jon for the eight weeks. Same content. The check-ins are for people who know they'll move faster with someone in the room.

---

## §8 — Soft CTA (audit fallback)

**Header:** *Not sure yet? Start with the audit.*

**Body:** Seven questions, three minutes. I'll review your answers and tell you exactly where your presence stands — and whether the Foundation is the right next step for you.

**CTA:** *Take the Presence Audit*

**Microcopy:** *Free. No email required.*

---

## §9 — Foundation Starter Guide footer

**Reuses Home §10 — referenced singleton.** See Home for canonical content. Schema decision: this section is one Sanity document referenced by Home, Ikigai, and Foundation pages — not three duplicated copies.

---

# Programs page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero (with "Who this is built for" right column) → Case studies → Three program cards → FAQ → Closing CTA → Foundation Starter Guide

Phase 4 locked the "Who this is built for" bullets and the case studies header, and moved case studies above the program cards. Phase 5 drafted hero subhead, three program cards, FAQ, and closing CTA in voice.

---

## §1 — Programs hero

**Eyebrow:** `THE WORK`

**Headline:** *This is where it gets {{physical}}.*

**Subhead:** Knowing what to do isn't the problem. Doing it when it counts is. These programs train the body to hold what the head already understands — through dance, because dance can't be faked, and into whatever room you actually have to walk into.

**"Who this is built for" — right column bullet list (locked phase 4):**

**Header:** *Who this is built for*

- You're good at your job. The room just doesn't feel it yet.
- You've been told you're "too quiet" — or too much. Neither felt accurate.
- You want to stop managing how you come across and start actually showing up.
- You're already good enough. You just never learned to inhabit it.

---

## §2 — Case studies header (locked phase 4)

**Eyebrow:** `BEFORE & AFTER`

**Headline:** *Real shifts. Actual situations.*

**Subhead:** The names and some details have been changed. The challenges and outcomes are accurate.

**Schema note:** Case study card copy (Marcus / Michael / Diana etc.) lives on the `caseStudy` schema in Sanity. Voice pass on those happens at the schema level in workstream 2, not here.

---

## §3 — Three program cards

### Card 1 — The Foundation (Self-Paced)

**Eyebrow:** `SELF-PACED COURSE`

**Title:** *The Foundation*

**Price line:** *$197 · once · lifetime access*

**Description:** Eight weeks of practice, on your schedule. Same curriculum as the cohort tier — the videos, the modules, the movement-to-leadership frameworks. No calls, no live check-ins, just the work itself. For people who'll show up to the practice without a calendar holding them to it.

**Inclusions:**
- 8 modules · 134 lessons total
- Lifetime access — go at your pace
- Movement-to-leadership frameworks
- Personal follow-up from Jon (async)
- Foundation Starter Guide included

**CTA:** *Get Started — $197*

---

### Card 2 — The Foundation + Weekly Check-Ins

**Eyebrow:** `MOST CHOSEN`

**Title:** *The Foundation + Weekly Check-ins*

**Price line:** *$497 · once · lifetime access*

**Description:** Same curriculum as self-paced. Plus eight thirty-minute calls with me, one a week, for whatever the work is bringing up. The check-ins are why most people choose this tier — not because they need permission, but because they know they'll move faster with someone in the room.

**Inclusions:**
- Everything in self-paced
- 8 weekly 30-minute calls with Jon
- Real-time feedback on your specific situations
- Prioritized scheduling

**CTA:** *Book a Discovery Call*

---

### Card 3 — Work With Jon Directly

**Eyebrow:** `1:1 COACHING`

**Title:** *Work With Jon Directly*

**Price line:** *Custom · starting at $3,500*

**Description:** For people whose situation is specific enough that a course can't quite reach it. A board presence problem. A creative session that keeps stalling. A role you're about to step into. We build it around what you're actually walking into — not a curriculum, a custom plan.

**Inclusions:**
- Intake assessment — full presence audit
- Custom coaching plan
- Flexible session frequency (typically biweekly)
- Direct access between sessions

**CTA:** *Book a Discovery Call*

---

## §4 — Common questions (FAQ)

**Header:** *Common questions.*

### How is this different from a typical leadership course?

Most leadership courses work from the neck up — frameworks, scripts, case studies. The gap between "I know what to do" and "I can do it when it counts" doesn't close from there. These programs start in the body, because the body is where the gap actually lives.

### Is this coaching for me if I'm not a dancer?

Yes. Most people who work with me aren't. Dance is the medium I teach in because it can't be faked. The pillars — Grounding, Energy, Flow, Command — transfer to any room where you have to show up as yourself in front of people.

### What results should I expect, and by when?

Different for everyone. Most people notice a shift in week two — usually in how they hold themselves before they speak. By week six, the change is visible to others before it's visible to them. By week eight, the practice is yours.

### Can I do this remotely?

Yes — both the self-paced course and the weekly check-ins are remote-first. 1:1 coaching can be remote or in-person depending on where you are and what you're working on.

### What if I need to pause or reschedule?

For self-paced: you can pause anytime, lifetime access. For check-ins: I keep two flex weeks in every cohort for life happening. For 1:1: rescheduling is built into the rhythm, no penalty.

### Is there a refund policy?

Yes. For self-paced and check-ins: full refund within 14 days if the first two modules don't deliver. For 1:1: a no-fault exit after the first session if it isn't the right fit — full refund minus the intake.

---

## §5 — Closing CTA

**Eyebrow:** `STILL DECIDING`

**Headline:** *Not sure which one is {{right}}?*

**Body:** We'll talk through where you are, what you're working toward, and which format actually makes sense for you. If none of them do, I'll tell you that too.

**Primary CTA:** *Book a Free Call*

**Microcopy:** *No pressure, no pitch, no commitment.*

---

## §6 — Foundation Starter Guide footer

**Reuses Home §10 — referenced singleton.** See Home for canonical content.

---

# Lessons page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero → Two course cards → Closing CTA → Foundation Starter Guide

The Lessons page is the lightest copy load on the site, but the two course cards do the most conversion work — they're the only place on the site where someone can scan both courses side-by-side and decide where to start.

---

## §1 — Lessons hero

**Eyebrow:** `STRUCTURED LEARNING`

**Headline:** *The {{Blueprint}}.*

**Subhead:** Two courses, in order. The free one tells you what's missing. The paid one builds it back. Both are self-paced, both are honest about what they can and can't do.

---

## §2 — Course cards

Course descriptions live on the `course` schema in Sanity, not on a `lessonsPage` schema. Same content reused on the individual course detail pages.

### Card 1 — The Four Circles

**Eyebrow:** `BEGINNER`

**Title:** *The Four Circles*

**Tagline:** *Free. Twelve lessons. Whatever you scored on the assessment, here's what it means.*

**Description:** A free 12-lesson course that walks you through what your ikigai assessment results actually mean. Each lesson takes about fifteen minutes. Passion, Mission, Vocation, Profession — one circle at a time, what each one looks like when it's working, what it looks like when it isn't, and how to tell the difference in your own work. By the end you'll know which one is missing from your current situation, and you'll have language for what to do about it.

**Metadata:**
- 1 module · 12 lessons
- ~3 hours total
- Free · gated by free account

**CTA:** *Start the Course*

---

### Card 2 — The Foundation

**Eyebrow:** `INTERMEDIATE`

**Title:** *The Foundation*

**Tagline:** *Eight weeks. The body work that makes the other work stick.*

**Description:** A self-paced video course teaching embodied presence through the lens of dance. Eight modules, 134 lessons, 200+ hours of content. Built for professionals whose medium isn't dance — the pillars (Grounding, Energy, Flow, Command) transfer to any room where you have to show up as yourself in front of people. Same content as the cohort tier on the Programs page, no live calls.

**Metadata:**
- 8 modules · 134 lessons
- 200+ hours of content
- $197 · lifetime access

**CTA:** *See the Course*

---

## §3 — Closing CTA

**Eyebrow:** `WANT MORE?`

**Headline:** *Courses teach the {{frameworks}}. Coaching applies them.*

**Body:** These courses are the curriculum. They give you the language and the practice. If you want someone in the room with you while you do the work — feedback in real time, accountability, a shape to your week — that's what coaching is for.

**Primary CTA:** *Explore Coaching Programs* → `/programs`

---

## §4 — Foundation Starter Guide footer

**Reuses Home §10 — referenced singleton.**

---

## Schema notes

If the course detail page (e.g. `/lessons/four-circles`) needs a longer description than the card on the Lessons index page, the schema should have both `cardDescription` and `fullDescription` as separate fields rather than truncating one for the other.

The course descriptions on this page should match the descriptions used wherever else the courses appear (Foundation page hero, Programs page card 1) — this is a candidate for a single Sanity reference, not duplicated copy.

---

# Blog index page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero → Filter pills → The Lab featured strip → Featured grid → All articles list → Newsletter capture → Audit CTA → Foundation Starter Guide

Most of the work on this page is chrome — individual blog post content lives on each post. The phase 4 deferred filter pill renames are locked here.

---

## §1 — Blog hero

**Eyebrow:** `THE ARCHIVES`

**Headline:** *Practical writing on what it actually takes to {{stop}} disappearing in rooms.*

**Subhead:** Essays on presence, movement, and the gap between what you know and what you can do when it counts. New ones as I figure things out. Some of them will probably be wrong.

---

## §2 — Filter pills

Locked rename list (deferred from phase 4):

| Current label | New label |
|---|---|
| MOVEMENT & BODY | The Body |
| PRESENCE & CONFIDENCE | Presence |
| LEADERSHIP & CAREER | The Work |
| THE LAB | The Lab *(unchanged)* |

**Schema implication:** Pillar labels likely live on the `pillar` schema or as a string enum on `blogPost`. Renaming display labels is safe; renaming slugs is not. Workstream 2 will resolve the schema-level path. For now: display label rename only.

---

## §3 — The Lab featured strip

**Series eyebrow:** `THE LAB · ONGOING`

**Series title:** *The Lab*

**Series description:** I'm running myself through the Foundation curriculum, week by week, and writing what's actually happening. What's working. What isn't. What I keep getting wrong. Updated as I go — no schedule, no script, no neat conclusions.

**CTA:** *Follow The Lab*

---

## §4 — Featured grid

No section subhead. Card content is per-post.

**Section header (if rendered):** `FEATURED`

---

## §5 — All articles list

**Section header (if rendered):** `ALL ARTICLES`

**Search placeholder:** *Search essays...*

**No-results state:** *No essays match. Try a different filter, or browse The Lab.*

---

## §6 — Newsletter capture

**Reuses Home §8 — referenced singleton.**

The Tuesday newsletter capture appears on Home, Blog index, and likely Audit results. Same Sanity document, multiple render contexts.

---

## §7 — Audit CTA

**Reuses Home §9 — referenced singleton.**

---

## §8 — Foundation Starter Guide

**Reuses Home §10 — referenced singleton.**

---

# Contact page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Audit-first hero card → Direct contact split → What happens next → A few things worth knowing → Email fallback

The Contact page barely needed voice work — most existing copy was already on-voice. Phase 5 captured what was already shipping into the canonical doc and tightened a few lines.

---

## §1 — Audit-first hero card

**Eyebrow:** `START HERE`

**Headline:** *Not sure where to start?*

**Body:** Take the Presence Audit first. Seven questions, three minutes. I'll review your answers and follow up personally with something actually useful — not a generic drip sequence.

**Stats grid (right of card):**
- **7** questions
- **3** minutes
- **1** honest reply from Jon

**Primary CTA:** *Take the Presence Audit*

**Microcopy:** *No account needed. Free.*

---

## §2 — Direct contact split

**Divider line:** *or reach out directly*

**Section header:** *What's on your mind?*

### Card A — 1-on-1 Coaching

**Eyebrow:** `1-ON-1 COACHING`

**Body:** *I want to work with Jon directly.*

**Behavior:** Opens contact form with this preselected as inquiry type.

### Card B — General Question

**Eyebrow:** `GENERAL QUESTION`

**Body:** *I have something else on my mind.*

**Behavior:** Opens contact form with this preselected as inquiry type.

---

## §3 — What happens next

**Eyebrow:** `WHAT HAPPENS NEXT`

### Step 1

**Title:** *Submit your inquiry*

**Body:** Takes 2 minutes. No prep needed.

### Step 2

**Title:** *We schedule a 15-min call*

**Body:** I'll reach out within 2–3 business days to find a time.

### Step 3

**Title:** *We build your custom plan*

**Body:** Together we map out the right path forward for you.

---

## §4 — A few things worth knowing

**Eyebrow:** `A FEW THINGS WORTH KNOWING`

### Item 1

**Title:** *I don't do pressure.*

**Body:** If you reach out, I'm not going to chase you down. Take your time.

### Item 2

**Title:** *I work with individuals, not committees.*

**Body:** If you're the one who wants to change, this is for you — not your boss who thinks you need coaching.

### Item 3

**Title:** *Spots are limited.*

**Body:** I keep my 1-on-1 client load intentionally small. If you're on the fence, sooner is better.

---

## §5 — Email fallback

**Body line:** Prefer email? hello@jonchalant.com — I check it daily, minus weekends when I'm wrangling three kids and pretending to relax.

---

# Audit page

**Status:** ✅ Locked (Phase 5, workstream 1)

**Sections in render order:** Hero / pre-quiz intro → Quiz (7 questions, in code) → Result band copy (one of three) → Foundation Starter Guide

The Audit page wraps the Presence Audit — distinct from the Ikigai Assessment. Quiz logic and question text remain in `lib/auditData.ts` per workstream-2 decision. Result band copy lives in Sanity since it's marketing copy, not quiz logic.

---

## §1 — Audit hero / pre-quiz intro

**Eyebrow:** `THE PRESENCE AUDIT`

**Headline:** *Seven questions. {{Three}} minutes. One honest read.*

**Subhead:** This is the quick one. Where the Ikigai Assessment tells you which circle is missing, the Presence Audit tells you where you are with what you already have. Built for people who already know their work but want to know where the gap actually is.

**Microcopy:** *Free. No account. No email required to see your result.*

**Primary CTA:** *Start the Audit*

---

## §2 — Mid-quiz progress chrome

**Question counter format:** *Question 3 of 7 — 43%*

**Mid-quiz encouragement (single instance, at midpoint only):** *Halfway. Keep going.*

---

## §3 — Result bands

The audit produces a numerical score mapping to one of three bands. Each band has its own headline, body, and CTAs. Bands are honest, not flattering — the warmth move is meeting the person where they actually are, not telling everyone they did great.

### Band A — Low (score in lower third)

**Result headline:** *You've got the substance. The {{signal}} isn't there yet.*

**Body:** Most of your answers point to a real gap between what you know and how the room reads you. That's not bad news — it's the most fixable kind of presence problem there is, because the work isn't to become someone else. It's to learn what you already know how to do, in your body. Most people who score in this band see a noticeable shift in week two of the Foundation.

**Primary CTA:** *See the Foundation*

**Secondary CTA:** *Tuesday newsletter — one idea a week to start*

---

### Band B — Mid (score in middle third)

**Result headline:** *You show up well. Sometimes. The pattern isn't reliable yet.*

**Body:** Your answers say the skills are there — at least sometimes — but they aren't dependable across contexts. You probably already know which rooms feel right and which ones don't. The Foundation is built for exactly this gap: the skills exist, the practice that locks them in does not.

**Primary CTA:** *See the Foundation*

**Secondary CTA:** *Book a free 15-minute call*

---

### Band C — High (score in upper third)

**Result headline:** *You already have it. Most of the time. {{Most}} isn't all of it.*

**Body:** Your answers say presence isn't your bottleneck — but you wouldn't have taken this audit if nothing was missing. The gap is probably specific, not general: a room where it slips, a kind of conversation that loses you, a transition you haven't figured out yet. That's 1:1 territory, not curriculum territory.

**Primary CTA:** *Book a Discovery Call*

**Secondary CTA:** *Read the essays — The Lab*

---

## §4 — Foundation Starter Guide

**Reuses Home §10 — referenced singleton.**

---

## Schema notes

Quiz question text and scoring logic stay in `lib/auditData.ts` (decision locked in workstream 1). Migration to Sanity would couple two systems for marginal benefit; question phrasing is stable enough to live in code.

Result band copy *does* live in Sanity. The three bands need their own document or referenced sub-document so they're editable without engineering.

Schema fields needed on the audit page document:
- `audit.hero.eyebrow`, `audit.hero.headline`, `audit.hero.subhead`, `audit.hero.microcopy`, `audit.hero.cta`
- `audit.midQuizEncouragement`
- `audit.bands.low.headline`, `audit.bands.low.body`, `audit.bands.low.primaryCta`, `audit.bands.low.secondaryCta` — repeat for `mid` and `high`
- Foundation Starter Guide is a reference, not a duplicated field group

---

# Globals — copy that appears on every page

**Status:** ✅ Locked (Phase 5, workstream 1)

Universal copy that lives in shared components rather than page-specific Sanity documents. Schema decisions in workstream 2 will determine whether these live in a `siteConfig` singleton, in component defaults, or in environment variables.

---

## Navbar

**Wordmark:** `JONCHALANT`

**Desktop primary nav (in order):**
- Start Here → `/`
- Programs → `/programs`
- Lessons → `/lessons`
- About → `/about`

**Right-side links:**
- Sign In → `/sign-in`

**Mobile menu (in order):**
- Start Here · Programs · Lessons · About · Contact · Sign In

**Mobile persistent CTA (in nav bar, always visible):** *Discover Your Ikigai* → `/ikigai`

*Note: Contact appears on mobile menu but not desktop primary nav. Desktop relies on the Contact link in the footer.*

---

## Footer

**Brand line (left, near wordmark):** *Find the work you were meant for — then learn to inhabit it.*

**Column 1 — ESSENTIALS:**
- Home → `/`
- About → `/about`
- Contact → `/contact`

**Column 2 — COACHING:**
- Programs → `/programs`
- The Foundation → `/foundation`
- Ikigai → `/ikigai`

**Column 3 — LEARN:**
- The Blueprint → `/lessons`
- The Archives → `/blog`
- Presence Audit → `/audit`

**Account section:**
- Sign In → `/sign-in`

**Bottom row:**
- Copyright: *© 2026 Jonchalant. All rights reserved.*
- Privacy link: *Privacy* → `/privacy`

**Removed in phase 5:** "The Breakdown" was previously listed in the Learn column as a placeholder for an unbuilt blog series. Removed since it has no destination. Restore if a Breakdown series ships later.

---

## Universal form microcopy

### Submit success states

- General form: *Got it. Check your inbox.*
- Newsletter signup: *You're in. First Tuesday lands soon.*
- Starter Guide: *Sent. Check your inbox in the next minute.*
- Contact form: *Got it. I'll be in touch within 2–3 business days.*

### Submit error

*Something went sideways. Try again, or email me directly: hello@jonchalant.com*

### Field validation

- Required field: *Required.*
- Invalid email: *That doesn't look like an email.*
- Field too short: *A bit more.*
- Field too long: *Less, please.*

### Loading state on submit button

*Sending...*

### Tone notes

- Error messages don't apologize. They name what happened and offer the next move.
- Success messages don't celebrate. They confirm and tell you what comes next.
- Validation messages are short. *Required* is enough.

**Email reconciliation:** `hello@jonchalant.com` is the canonical contact email everywhere on the site. Earlier draft used `jon@jonchalant.com` in form errors — corrected to match Contact page.

---

## Universal CTA labels (style guide for consistency)

### Primary CTAs in order of conversion weight

- *Discover Your Ikigai* — top of funnel, default primary CTA
- *Take the Presence Audit* — diagnostic alternative
- *Start the Course* — Four Circles entry
- *See the Foundation* — mid-funnel, paid offer awareness
- *Get Started — $197* — direct purchase intent
- *Book a Discovery Call* — high-touch / 1:1
- *Book a Free Call* — same as above, less-warm framing

### Secondary CTAs

- *Read the essay* — blog/about reads
- *Read Jon's story* — about page
- *Send me Tuesdays* — newsletter
- *Send me the guide* — Foundation Starter Guide
- *Follow The Lab* — blog series subscription
- *Explore Coaching Programs* — cross-link from Lessons

### Microcopy under CTAs (consistent usage)

- *Free.* — when something is
- *No account needed.* — standard accountless offer (use this phrasing, not "No account required")
- *No email required.* — audit-specific (no signup needed to see result)
- *Free. No email required.* — combined for highest-trust offers

---

## 404 page

**Headline:** *That page doesn't exist.*

**Body:** Either the link's broken, or you typed something I haven't built yet. Either way — here are the places you probably wanted.

**Three links:**
- Home → `/`
- About → `/about`
- The Archives → `/blog`

**Microcopy:** *If you got here from a link on this site, let me know — hello@jonchalant.com.*

---

## Sign-in / sign-up (auth pages)

### Sign-in

**Headline:** *Welcome back.*

**Subhead:** *Pick up where you left off.*

**Form CTAs:**
- Primary: *Sign in*
- Magic link option: *Email me a sign-in link*
- Forgot password: *Forgot password?*

### Sign-up

**Headline:** *Make a free account.*

**Subhead:** *Saves your audit results, lesson progress, and starter guide. No marketing emails — you control what you get.*

**Form CTA:** *Create account*

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
| 1. Canonical copy doc | ✅ **COMPLETE** — all 10 content surfaces locked |
| 2. Schema redesign | ⚪ Ready to start |
| 3. Content population + code reconciliation | ⚪ Blocked on workstream 2 |

---

## Workstream 1 — final summary

All content surfaces are now drafted in voice and locked:

| Page | Sections | Status |
|---|---|---|
| Home | 10 | ✅ Locked |
| About | 6 | ✅ Locked |
| Ikigai | 6 | ✅ Locked |
| Foundation | 9 | ✅ Locked |
| Programs | 6 | ✅ Locked |
| Lessons | 4 | ✅ Locked |
| Blog index | 8 | ✅ Locked |
| Contact | 5 | ✅ Locked |
| Audit | 4 | ✅ Locked |
| Globals | nav + footer + microcopy + 404 + auth | ✅ Locked |

**Voice rules:** Two-register system (Direct/Honest + Warm/Present) with the bullshit clause for sparingly-used callouts. Banned words list locked. Italic-anchor convention via `{{double-braces}}`.

**Brand markers established and reused across pages:**
- *"Find the work you were meant for"* — home hero, footer brand line
- *"Dance can't be faked"* — Foundation §3, Programs hero, Foundation FAQ
- *"How to find your centre. How to read a room."* — About §4, echoed in Foundation §4 module 2
- *"Eight weeks. One week at a time."* — Foundation curriculum framing (originally home §3)
- *"Some of them will probably be wrong"* — Home §7, Blog hero (the warmth-admission move)
- *"I don't do pressure"* — Contact §4 (the Jon principle line)

**Schema decisions surfaced during workstream 1** (resolved in workstream 2):

1. Foundation Starter Guide is one document referenced from Home §10, Ikigai §5, Foundation §9 — not three duplicated copies
2. Tuesday newsletter capture is one document referenced from Home §8, Blog §6, possibly Audit
3. Audit CTA is one document referenced from Home §9, Blog §7, Foundation §8
4. Pillar definitions (Grounding/Energy/Flow/Command) are one document referenced from Home §4 and Foundation curriculum mentions
5. Four Circles definitions (Passion/Mission/Vocation/Profession) are one document referenced from Home §3 and Ikigai §2
6. Course descriptions (Four Circles, The Foundation) are one source — Lessons cards, Foundation page hero, Programs page card 1 all derive from the same fields
7. Audit quiz logic stays in `lib/auditData.ts` (not migrated to Sanity)
8. Audit result band copy moves *to* Sanity (it's marketing copy, not quiz logic)
9. Pillar filter labels rename happens at display level, not slug level — slugs stay stable
10. The italic-anchor convention `{{word}}` needs a description on every headline field in Studio

---

## Next session: workstream 2 — schema redesign

Workstream 2 designs Sanity schemas to hold the canonical copy above. Key decisions to make first:

1. **Schema rename strategy** — rename existing fields (clean, breaks runtime data shape, requires coordinated deploy) vs. add new fields and dual-write (safer, more moving parts, slower migration)
2. **Singleton document type pattern** — establish a clear convention for page singletons (Home, About, Ikigai, Foundation, Programs, Lessons, Blog index, Contact, Audit) vs. listed types (blog posts, courses, case studies, testimonials)
3. **Reusable section pattern** — establish a "section" object type (eyebrow, headline, subhead, body, primaryCta, secondaryCta) used as a building block across schemas, so every hero-shaped section uses the same field set
4. **Reference pattern for shared content** — how Foundation Starter Guide / newsletter capture / pillar definitions get referenced from multiple page documents
5. **Studio UI organization** — fieldsets, validation rules, field descriptions (especially around the `{{double-braces}}` italic-anchor convention)

Once workstream 2 is done, workstream 3 populates Sanity with the locked copy from workstream 1 and reconciles any hardcoded component defaults.
