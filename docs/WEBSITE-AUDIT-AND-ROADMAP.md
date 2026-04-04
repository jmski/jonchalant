# Jonchalant — 2026 Board Review

**Date:** April 2026 — Second Session
**Auditors:** Board of Directors (UX, SEO, Product)
**Subject:** jonchalant.com — Executive Presence Coaching for Introverts
**Scope:** Fresh strategic critique of current state + modular execution roadmap

> *The first audit delivered results. The homepage has been overhauled, the conversion flow tightened, Three.js removed, and the copy structure aligned with best-in-class coaching sites. That work was necessary. Now we're holding it to a higher standard. This session is about closing the gap between "good coaching website" and "the site a serious coaching brand deserves." No hedging.*

---

## Board Verdict

The site has moved from a B to a solid A-. The architecture is elite-tier. The design DNA — Fraunces + DM Sans, burnt indigo + muted moss, Zen restraint — is genuinely differentiated. The homepage flow now earns attention before it asks for it. These are meaningful gains.

What remains is not cosmetic. The three gaps that stand between this site and genuine authority are: **no video proof** of the man selling executive presence, **broken conversion plumbing** (a coaching inquiry path with no booking link), and **invisible case studies** sitting in the codebase waiting to be published. Fix those three and the site converts at a different rate.

Everything else below is either optimization or infrastructure. But those three are costing real money today.

---

## Pillar 1: User Behavior (UX)

### UX Wins

The homepage flow is now textbook: Hero → Credibility → Philosophy → Services → MeetJon → Testimonials → Blog → Email Capture → CTA. That sequence was wrong in the first audit and it's been corrected. The hero is clean — a single headline, a single CTA, atmospheric orbs as the only visual flourish. No competing elements. The email capture section has its own full dark section above the fold. BlogCards are live. This is a materially better visitor experience than six months ago.

The navigation is well-structured and accessible. Mobile sidebar is solid. The free audit as a nav-level CTA is the right call — it's the highest-intent, lowest-friction entry point and it deserves prominent placement.

The audit quiz and Ikigai quiz are both technically impressive. Animated transitions, progress tracking, clear result states. These tools deliver genuine value to visitors and establish intellectual credibility.

### UX Red Flags

**1. No video of Jon on any public page.**
This is the most damaging gap on the site. Jon is selling *executive presence* — the non-verbal authority, the physical confidence, the voice, the stillness. A visitor has no way to witness any of that before they commit to a conversation. The dance page has videos of movement tutorials. That is not the same thing. There needs to be a short clip — 60 to 90 seconds — of Jon speaking in a coaching or leadership context, placed on the homepage or About page above the fold. Every coaching brand at the level this site is targeting has video. Brené Brown, Simon Sinek, Robin Sharma — their faces and voices are the product. If the visitor can't see and hear Jon before reaching out, they are making a purchase decision with incomplete information. That friction costs conversions.

**2. Calendly booking is a TODO.**
The Contact page coaching path explicitly surfaces a "book a discovery call" action. There is no Calendly link. A visitor who chooses the coaching inquiry path — the highest-intent visitor on the entire site — hits a dead end at the exact moment they are ready to act. This is a revenue-blocking bug, not a design preference. A visitor who wanted to book and couldn't book is not coming back.

**3. Ikigai quiz captures zero leads.**
The tool is built beautifully. The results page is engaging. After results, the visitor gets a "Work with Jon" link to `/contact`. That's it. There is no email capture at the results stage. This tool likely has strong engagement metrics and generates zero trackable leads. The fix is simple: after displaying results, offer the visitor a way to receive their results by email — one field, one button, same API endpoint already in use on the audit.

**4. No press or media mentions anywhere.**
"As seen on" is the single fastest trust signal for a cold visitor. It signals external validation without requiring the visitor to read anything. Jon has presumably appeared on podcasts, been quoted in articles, or published content with meaningful reach. None of that is surfaced anywhere on the site. There is no media section, no press strip, no speaker appearances listed. Even an "As heard on [Podcast Name]" line under the hero credibility strip would move the needle. This is free credibility that is being left on the table.

**5. The dance page does not convert.**
The dance page is intellectually interesting and correctly positions movement as a leadership tool. The problem is that a visitor who lands there and watches a few videos has no clear reason to take the next step toward coaching. The CTA at the bottom links to `/programs` with generic copy. There is no narrative bridge explaining the connection between what they just watched and why they should book a coaching conversation. The page needs a section that explicitly translates the movement philosophy into a coaching outcome — "If this is how movement changes presence, here is what that means for your next performance review / board presentation / difficult conversation."

**6. No persistent CTA between hero and the final CTA section.**
On long pages (About, Foundation, Programs), a visitor who misses the hero CTA has to scroll to the very bottom to find the next clear action. There is no sticky header CTA, no mid-page prompt, no anchor. On mobile this is especially acute — the hero CTA disappears above the fold almost immediately and the next action is hundreds of pixels below. A floating or scroll-triggered CTA component would close this gap without disrupting the Zen aesthetic.

**7. Foundation pricing is hardcoded.**
The Foundation page displays `$197` and `$497` as static text in the JSX. Changing the price requires a code deploy. This is a content management failure for a page that will likely be updated frequently as pricing is tested and adjusted. Move it to Sanity.

**8. Lessons page shows no preview to anonymous visitors.**
A visitor who finds the Lessons page sees course cards and titles but cannot access a single word of content without creating an account. There is nothing to demonstrate the quality of what they would be buying into. A single freely-accessible lesson — even just Week 1, Module 1 — would give visitors evidence that the content is worth enrolling for. Right now they are being asked to trust without being shown anything.

**9. Text-heavy pages lack visual breathing room.**
The About page tells a compelling story across six sections. The Foundation page outlines an eight-week curriculum in detail. Blog posts dive deep into leadership topics. All of these are largely walls of text with minimal visual interruption. There are no inline images, no editorial photography between sections, no pull quotes with photographic context. Premium coaching sites use imagery not for decoration but for pacing — a photograph between sections gives the reader permission to pause and process. The site has the typography and the words. It needs the pictures.

### UX Opportunities

- A short "Jon in action" video — shot vertically for mobile, 60–90 seconds — would be the highest-ROI content investment available right now. Place it in the homepage MeetJon section or as a dedicated Above-the-Fold element on the About page.
- The sticky CTA could be as minimal as the "Free Audit" button that persists in the navbar — lean into that existing pattern rather than building something new.
- The Ikigai results page could offer a downloadable summary ("Your Ikigai snapshot") as an email capture incentive — adds value, generates the lead.

---

## Pillar 2: Search Visibility (SEO)

### SEO Wins

The technical SEO foundation is strong. Per-page metadata is thorough — title templates, OpenGraph, Twitter cards, proper robots directives on auth-gated routes. The dynamic sitemap (`app/sitemap.ts`) generates with blog post slugs and correct priorities. Fonts are self-hosted with display swap. Images use `next/image` with alt text throughout. GA4 loads with `afterInteractive` strategy so it doesn't block rendering. The JSON-LD schemas for Person, Organization, LocalBusiness, and AggregateRating are all implemented. This puts the site meaningfully ahead of most coaching sites technically.

Blog posts use ISR with one-hour revalidation. Static params are pre-generated for blog and lesson routes. The Sanity fallback pattern is consistently applied. This is production-grade.

### SEO Red Flags

**1. AggregateRating schema may hurt before it helps.**
The schema currently uses `testimonials.length` as the review count. If Sanity returns two or three testimonials, Google's structured data displays "2 reviews" or "3 reviews" in search results. Rich snippet eligibility for AggregateRating typically requires a minimum of five reviews. Below that threshold, displaying the count in search results can actually reduce click-through by signaling limited social proof. The schema should be gated: only inject it when the testimonial count exceeds a meaningful threshold (five minimum, ten preferred).

**2. All blog posts share a single static OG image.**
Every blog post uses `og-blog-1200x630.png` as its social share image. When an article gets shared on LinkedIn or Twitter, the preview image is identical across all posts — the generic site brand image. Per-post OG images (using the post's featured image from Sanity, if available) dramatically improve click-through on social shares. This is low-effort once the Sanity field exists.

**3. BlogPosting JSON-LD not confirmed on individual posts.**
The `BlogPostingSchema` function exists in `lib/schema.ts`. It was not found injected in `app/blog/[slug]/page.tsx`. Each blog post page should be generating structured data with: headline, author, datePublished, dateModified, image, and description. This schema is eligible for Google's article rich results — which increase SERP real estate and click-through rates significantly for content-heavy coaching brands.

**4. BreadcrumbList schema is defined but unused.**
The `BreadcrumbSchema` function is in `lib/schema.ts` and is not injected anywhere. Blog posts are the clearest candidate: `Home > Blog > [Post Title]`. Breadcrumb rich results appear in Google search snippets and improve navigation signals for the crawler.

**5. No `robots.ts`.**
The sitemap exists. The robots file does not. Without explicit robots configuration, crawlers use defaults — which are permissive enough that this is low-urgency, but explicit rules for `/admin`, `/portal`, and `/api` are best practice and clarify crawl budget allocation.

**6. No Course schema on `/foundation` or `/programs`.**
The Foundation page describes a structured eight-week program with pricing and curriculum details. The Programs page describes multiple coaching tiers with pricing. Course schema is eligible for rich results in Google Education search — displaying course name, provider, and price directly in the SERP. This is a missed structured data opportunity on the site's highest-value conversion pages.

**7. FAQ schema is defined but unused.**
`FAQPageSchema` exists in `lib/schema.ts`. If FAQ sections are added to the Foundation or Programs pages (which they should be — see Product section), each FAQ should generate `FAQPage` schema. FAQ rich results dramatically expand SERP real estate and are one of the easier rich snippets to earn.

**8. No explicit canonical tags.**
Next.js infers canonical URLs from `metadataBase`. This works correctly in most cases. Explicit canonical tags are a hedge against future edge cases — URL parameters, preview URLs, or CMS preview URLs accidentally getting indexed. Adding them explicitly costs one line per page and eliminates an entire class of potential duplicate content issues.

### SEO Opportunities

- Once BlogPosting schema is added, submit key posts through Google Search Console's Rich Results Test to confirm eligibility and request indexing.
- Dynamic OG images per blog post can be implemented via Next.js `opengraph-image.tsx` convention or by pulling the Sanity featured image into `generateMetadata`. Either approach is straightforward.
- The sitemap already has the right priorities. No changes needed there.

---

## Pillar 3: Product Feedback

### Product Wins

The free audit is a well-designed lead magnet. Seven questions, three minutes, a score with a personalized result band, and a promise of a personal reply from Jon. The flow is smooth: quiz → capture → results. The scoring bands map to meaningful coaching stages (Foundation, Developing, Refining). The rate limiting on the API prevents abuse. The ConvertKit integration on the email capture sections is working. The portal has genuine depth — AI-powered coaching tools (Presence Coach, Tonality Analysis, Movement Plan, Presence Score) that are meaningfully differentiated from anything a comparable coaching site offers. Keeping those exclusive to paid clients is the right call.

The enrollment and payment flow (Stripe → Supabase → portal access) is technically sound. The portal itself — progress tracking, AI coaching, resume functionality — delivers real post-purchase value.

### Product Red Flags

**1. No case studies or transformation stories anywhere on the site.**
There is a `CaseStudyCard` component in `components/utilities/`. There is a `caseStudy` schema type in Sanity. Neither is wired to a published page or section. Case studies are the highest-converting content type for coaching services because they answer the visitor's actual question: "Has this worked for someone like me?" A structured "Before / After" story — with the client's role, the specific challenge, what changed, and what the outcome was — is more persuasive than any testimonial, any credential, and any amount of copy about methodology. This infrastructure exists and is going unused.

**2. The audit's personal reply promise is a scaling liability.**
The audit copy explicitly states: "not with an automated email, with an actual response." This is a strong brand differentiator when volume is low. It becomes a bottleneck as volume grows. There needs to be a defined process: at what score threshold does Jon personally reply vs. reply with a templated starting point? What is the SLA — 24 hours, 48 hours? What happens when Jon is traveling? The technology supports auto-routing by score band. The operational process needs to be documented before this becomes a problem.

**3. No score-to-program upsell on audit results.**
The audit calculates a band — Foundation, Developing, or Refining. The band maps directly to coaching offerings. The current results page shows the score and a generic "Book a Discovery Call" CTA. The opportunity: each band should surface a specific, tailored recommendation. A Foundation result should say "You're at the beginning of this journey — The Foundation course was built for exactly this" with a direct link to enroll. A Developing result should surface the guided program. Refining should surface 1-on-1. The data exists. The logic exists. The copy is the only thing missing.

**4. No social sharing on blog posts.**
Blog content is squarely in the category of "things people share." Articles about leadership, introversion, executive presence, and quiet authority have social currency. There are no share buttons. There is no "share this" prompt at the end of posts. Every blog post is a potential organic distribution channel that is currently closed.

**5. Portal users are isolated.**
After a client enrolls and accesses the portal, they have no way of knowing anyone else is there. No cohort signaling, no community element, no peer progress visibility. This is partly intentional — the experience is personal and private. But even a subtle "You're part of a group of [X] professionals building their presence" would increase retention and accountability. Enrolled clients with community are less likely to churn than enrolled clients working alone.

**6. No referral mechanism.**
Satisfied coaching clients talk to their peers. There is no structured way to capture that word-of-mouth — no referral link, no "share with a colleague" prompt in the portal, no referral incentive. This is low-urgency but is free distribution being declined.

### Product Opportunities

- The case study infrastructure is ready. The only thing needed is content. Even two or three well-written case studies, structured as narrative (challenge → coaching → outcome), would move the needle significantly on the Programs and Foundation pages.
- The audit score-to-program mapping is a same-session conversion opportunity. A visitor who just got their results is in the most receptive state they will ever be in. The current CTA doesn't capitalize on that.
- Social share buttons on blog posts can be minimal — native Web Share API on mobile, LinkedIn + Twitter links on desktop. No third-party scripts required.

---

## Competitive Benchmark (2026 Update)

**Brené Brown — brené.com**
The benchmark for personal brand coaching sites in 2026. Key pattern to steal: the "Research & Storytelling" content hub, where blog posts, podcast episodes, and book references coexist in a single filterable archive. Jon's blog, dance curriculum, and lesson content currently live in separate siloed pages. A unified content hub would improve discoverability and dwell time.

**Adam Grant — adamgrant.net**
Masterclass in using a simple text-forward editorial aesthetic with maximum white space to signal intellectual authority. No hero images, no hero video — the headline does all the work. Note: Grant has a 2M+ following that earns him this level of minimalism. For a brand still building audience, some visual richness is still appropriate. But the text-to-image balance Grant achieves is the north star.

**Mel Robbins — melrobbins.com**
The execution model for press mentions. A scrolling strip of publication logos (CNN, Forbes, Oprah) immediately below the hero. The logos do the trust work in under two seconds. Jon doesn't need CNN. A strip of three to five podcasts, a LinkedIn audience stat, or a "Featured in" mention from any credible external source achieves the same psychological effect at this stage of brand growth.

---

## Execution Roadmap

Each task below is self-contained. In future sessions, reference tasks by number: **"Implement Task #X."**

---

### HIGH PRIORITY — Revenue-Blocking, Conversion-Critical

#### Task #1: Wire Up Calendly on the Contact Page
**Scope:** `app/contact/ContactClient.tsx`
- The coaching inquiry path currently has a TODO where the Calendly link should be. Add the actual Calendly booking URL. If embedding the widget is preferred over a link, use the Calendly embed script (defer-loaded to avoid blocking).
- This is a blocking revenue issue. A visitor who clicks "1-on-1 Coaching" and cannot book is gone.
**Files:** 1

#### Task #2: Add Email Capture to Ikigai Results Stage
**Scope:** `app/ikigai/IkigaiClient.tsx`, API already exists at `/api/subscribe`
- After the quiz results are displayed, add a capture prompt: "Get your Ikigai results in your inbox" — name + email, same subscribe endpoint.
- Make it optional (dismissable) but surface it clearly before the "Work with Jon" CTA.
- LocalStorage flag (matching `jonchalant_subscribed` pattern from BlogOptIn) to suppress if already subscribed.
**Files:** 1–2

#### Task #3: Smart Audit Result CTA — Score Band → Program
**Scope:** `app/audit/AuditClient.tsx`, `lib/auditData.ts`
- The three score bands (Foundation ≤14, Developing 15–21, Refining 22+) should each surface a different recommendation with a direct action.
  - Foundation → "The Foundation course was built for exactly where you are" + "Enroll — starting at $197" → `/foundation`
  - Developing → "A guided program will accelerate what you've already built" + "Explore Programs" → `/programs`
  - Refining → "You're ready for 1-on-1 work" + "Book a Discovery Call" → `/contact`
- Replace the current generic "Book a Discovery Call" CTA in the results stage.
**Files:** 1–2

#### Task #4: Move Foundation Pricing to Sanity
**Scope:** `app/foundation/page.tsx`, `sanity/schemas/`, Sanity Studio
- The $197 / $497 pricing and tier features are hardcoded in JSX.
- Create or extend a Sanity schema for the Foundation page pricing tiers.
- Fetch pricing in the page server component and pass to the client.
- A pricing change should never require a code deploy.
**Files:** 3–4

#### Task #5: Add a Free Preview Lesson to the Lessons Page
**Scope:** `app/lessons/page.tsx`, `app/lessons/[courseSlug]/[lessonSlug]/page.tsx`
- Mark one lesson in Sanity (e.g., Week 1, Module 1) as `isPreview: true`.
- Allow unauthenticated access to preview lessons.
- Add a visual "Preview" badge on the course card for any course with a free lesson.
- Visitors should be able to experience the content quality before being asked to enroll.
**Files:** 3–4

---

### MEDIUM PRIORITY — Trust, Depth, Engagement

#### Task #6: Add Editorial Images Throughout the Site
**Scope:** `app/about/`, `app/foundation/page.tsx`, blog post layout, `components/sections/home/meet-jon/`
- The About page narrative sections (Origin, TurningPoint, MethodologyNarrative, WhyExists, WhoFor) need at least one full-width or half-width photograph between sections to break the copy rhythm.
- The Foundation curriculum section needs a visual element — a photograph of a workshop, a speaking moment, or an environmental portrait — between the module list and the pricing section.
- Blog post pages need a featured header image (pull from Sanity `mainImage` field if it exists; add field if it doesn't).
- The MeetJon homepage section should have a proper editorial photo of Jon — not a placeholder.
- All images should use `next/image` with appropriate `sizes` attributes and descriptive `alt` text.
**Files:** 5–8 (and Sanity content updates)

#### Task #7: Add Jon Video to Homepage or About Page
**Scope:** `components/sections/home/meet-jon/` or `app/about/`
- A 60–90 second clip of Jon speaking — not dancing, not teaching movement — demonstrating the presence and authority he is selling.
- Host on YouTube or Vimeo (unlisted if preferred) and embed with native `<iframe>` or a lightweight wrapper component.
- Place in the MeetJon section on the homepage, or as a dedicated visual moment on the About page before the CTA.
- This is a content dependency (video must be shot) before it can be implemented.
**Files:** 2–3

#### Task #8: Add Press / Media Mentions Strip
**Scope:** New component in `components/shared/` or `components/sections/home/`, `app/css/sections.css`
- A horizontal strip of media names, podcast logos, or publication mentions placed below the hero CredibilityStrip.
- Even three to five credible external mentions dramatically change how cold visitors perceive the brand.
- If press clips don't exist yet: start with podcast appearances, LinkedIn audience stats, or any external feature. Add the component structure now; populate it as mentions accumulate.
- Should be Sanity-managed so new mentions can be added without code changes.
**Files:** 3–4

#### Task #9: Build and Publish Case Studies
**Scope:** `components/utilities/cards/case-study/CaseStudyCard.tsx` (exists), `sanity/schemas/` (schema exists), new page or section
- Create a `/case-studies` page or add a Case Studies section to the Programs or About page.
- Populate with two to three structured narratives: client role + challenge + coaching approach + measurable outcome.
- Wire `CaseStudyCard` into the section layout.
- This is primarily a content task. The infrastructure is ready.
**Files:** 3–4 (plus content creation in Sanity)

#### Task #10: Add Social Share Buttons to Blog Posts
**Scope:** `app/blog/[slug]/page.tsx` or its layout component
- Use the Web Share API (mobile) with a fallback to direct LinkedIn and Twitter/X share links (desktop).
- No third-party scripts. Native links with pre-filled share text are sufficient.
- Place at the bottom of the post body, above related posts.
**Files:** 1–2

#### Task #11: Add FAQ Sections to Foundation and Programs Pages
**Scope:** `app/foundation/page.tsx`, `app/programs/page.tsx`, existing `FAQ` component in `components/shared/`
- Both pages are conversion pages where visitor objections live. Common questions: "Is this for me?", "What if I can't keep up?", "What's the refund policy?", "How is this different from other courses?"
- The `FAQ` component already exists. Add 4–6 questions per page, managed from Sanity or hardcoded initially.
- Once added, pair with FAQ schema (Task #16 below).
**Files:** 2–3

#### Task #12: Connect Dance Page to the Coaching Funnel
**Scope:** `app/dance/page.tsx`, `components/sections/dance/`
- Add a narrative bridge section between the video curriculum and the final CTA.
- The section should explicitly translate the movement philosophy into a coaching context: "This is what these principles look like in a boardroom / on a stage / in a difficult conversation."
- Update the CTA copy to be specific: not "Explore Coaching Programs" but something like "Take What You Just Learned Into a Room That Matters."
**Files:** 2

---

### LOW PRIORITY — Technical Health, SEO Polish

#### Task #13: Add `app/robots.ts`
**Scope:** New file `app/robots.ts`
- Explicit configuration: allow all crawlers on public routes, disallow `/admin`, `/portal`, `/login`, `/api`.
- Point to sitemap URL.
**Files:** 1 (new)

#### Task #14: Add BlogPosting JSON-LD to Individual Blog Posts
**Scope:** `app/blog/[slug]/page.tsx`, `lib/schema.ts`
- `BlogPostingSchema` exists in `lib/schema.ts`. Inject it in the blog post page with: headline, author (PersonSchema), datePublished, dateModified (from Sanity `_updatedAt`), image (from Sanity `mainImage`), description (from Sanity `excerpt`).
- Use `<Script type="application/ld+json">` pattern already established in `app/page.tsx`.
**Files:** 1–2

#### Task #15: Add BreadcrumbList Schema to Blog Posts
**Scope:** `app/blog/[slug]/page.tsx`, `lib/schema.ts`
- `BreadcrumbSchema` exists unused. Inject on blog post pages: `Home > Blog > [Post Title]`.
- Pair with the visible breadcrumb HTML already in the blog layout (if it exists) or add it.
**Files:** 1–2

#### Task #16: Add Course Schema to `/foundation` and `/programs`
**Scope:** `app/foundation/page.tsx`, `app/programs/page.tsx`, `lib/schema.ts`
- `CourseSchema` exists in `lib/schema.ts`. Inject with: name, description, provider (OrganizationSchema), offers (pricing), hasCourseInstance.
- This makes Foundation and Programs eligible for Google Education rich results.
**Files:** 2

#### Task #17: Add FAQ Schema to Pages with FAQ Sections
**Scope:** `app/foundation/page.tsx`, `app/programs/page.tsx` (after Task #11)
- Once FAQ sections exist, inject `FAQPageSchema` with all Q&A pairs.
- FAQ rich results expand SERP real estate significantly.
**Files:** 2

#### Task #18: Dynamic OG Images for Blog Posts
**Scope:** `app/blog/[slug]/opengraph-image.tsx` (new) or `generateMetadata` in `app/blog/[slug]/page.tsx`
- Pull `mainImage` from Sanity post data and use it as the OG image in `generateMetadata`.
- If the post has no image, fall back to the generic blog OG image.
- Every post that gets shared deserves its own social preview.
**Files:** 1–2

#### Task #19: Add Explicit Canonical Tags to Key Pages
**Scope:** `app/page.tsx`, `app/about/page.tsx`, `app/programs/page.tsx`, `app/foundation/page.tsx`
- Add `alternates: { canonical: 'https://jonchalant.com/[path]' }` to each page's metadata export.
- Low urgency; high protection against future edge cases.
**Files:** 4–6

#### Task #20: Gate AggregateRating Schema Behind a Minimum Threshold
**Scope:** `app/page.tsx`
- Change the condition for injecting the schema from `testimonials.length > 0` to `testimonials.length >= 5`.
- Below five reviews, the schema is hurting more than it helps in search results.
**Files:** 1

---

## Quick Reference: Priority Summary

| Priority | Tasks | Theme |
|----------|-------|-------|
| **HIGH** | #1–#5 | Broken plumbing, revenue leaks, conversion optimization |
| **MEDIUM** | #6–#12 | Visual richness, trust depth, engagement loops |
| **LOW** | #13–#20 | SEO infrastructure, structured data, technical polish |

**Recommended execution order:** Task #1 (Calendly) immediately — it is actively losing clients right now. Then Task #3 (smart audit CTA) — highest leverage on existing traffic. Then Task #6 (images) — visible quality improvement. Then Task #2 (Ikigai capture) — closes a free lead gen leak.

---

## Idea Parking Lot

*Add brainstorming and future considerations below:*

-
-
-
-
-

---

*Document authored April 2026 — Board of Directors review session. Reference individual task numbers in future sessions for implementation.*
