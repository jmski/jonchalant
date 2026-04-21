# AI Image Generation Prompts — Placeholder Assets

Companion document to `STILLNESS_AND_MOTION_PLAN.md`. These prompts generate placeholder imagery using your own photos as reference, so the site can progress through Phases 2, 4, and 5 before professional photography is ready.

**The goal is a coherent set of images that feel like they came from the same shoot**, not a collection of random AI outputs that vary wildly in style, lighting, and mood. Consistency matters more than perfection here.

---

## Table of Contents

- [Tool Recommendations](#tool-recommendations)
- [Global Style Rules (use across every prompt)](#global-style-rules-use-across-every-prompt)
- [Character Reference Workflow](#character-reference-workflow)
- [Phase 2 — Homepage Hero Fragments](#phase-2--homepage-hero-fragments)
- [Phase 4 — About > Origin Scenes](#phase-4--about--origin-scenes)
- [Introvert Section — Solitude Anchor Image](#introvert-section--solitude-anchor-image)
- [Phase 5 — Why It Works Bento Images](#phase-5--why-it-works-bento-images)
- [Phase 5 — Curriculum Week Illustrations](#phase-5--curriculum-week-illustrations)
- [Bonus — Dance Page Poster Frame](#bonus--dance-page-poster-frame)
- [Consistency Tips Across The Set](#consistency-tips-across-the-set)
- [Troubleshooting — When Outputs Go Wrong](#troubleshooting--when-outputs-go-wrong)

---

## Tool Recommendations

Different tools are best for different images here. Use the right one for each job.

| Tool | Best for | Why |
|------|----------|-----|
| **Midjourney v7** (`--cref` + `--sref`) | Hero fragments, Origin scenes, bento body shots | Best at film-photo aesthetic; character ref + style ref locks consistency across a set |
| **Gemini 2.5 Flash Image** (a.k.a. Nano Banana) | Face-accurate portraits (origin-05, introvert-solitude) | Exceptional face likeness from reference images; great for "you now" shots |
| **Flux.1 Kontext** (via Replicate / fal.ai) | Editing one of your real photos into the style | If you have a real photo close to what you want, Kontext can restyle it |
| **Ideogram 2.0** | The 8 curriculum line-drawings | Best line-art consistency right now |
| **ChatGPT / DALL·E 3** | Empty rooms, objects, evocative stand-ins (origin-01, 02, 03) | Good at environmental/scene work without faces |

**If you only want to use one tool**, pick **Midjourney v7**. It handles 80% of this brief well and has the best character-reference consistency across a multi-image set. Everything below is written Midjourney-first with notes for alternates.

---

## Global Style Rules (use across every prompt)

These style fragments should appear in **every** photography prompt below. Copy this block once and keep it handy.

**Style fragment (append to every photo prompt):**
```
shot on 35mm film, medium grain, natural light, desaturated black and white with warm shadow tones, documentary editorial aesthetic reminiscent of Kinfolk magazine and Annie Leibovitz, Cereal magazine mood, quiet and unposed, shallow depth of field, soft diffused light, warm cream and espresso tonal palette when colour bleeds through, no smiling at camera, no stock photo vibes, no LinkedIn aesthetic
```

**Negative prompt (append or use as negative field):**
```
--no corporate headshot, stock photo, beauty retouch, plastic skin, bright saturated colours, HDR, studio flash, white teeth smile, arms crossed power pose, suit and tie cliché, digital oversharpening, bokeh overdose, shallow millennial aesthetic, fisheye, dutch angle
```

**Midjourney parameter baseline for the photo set:**
```
--style raw --ar 4:5 --stylize 250 --v 7
```

- `--style raw` reduces Midjourney's default prettification — important for documentary feel
- `--stylize 250` keeps it grounded (lower = more literal, higher = more stylized)
- `--ar 4:5` is the hero fragment ratio; swap to `--ar 16:9` for origin scenes

**Once you've generated one image you love, lock its style for the rest of the set:**
- Midjourney: use `--sref [first-image-url]` on all subsequent prompts
- This is how you get a coherent set instead of 10 different looks

---

## Character Reference Workflow

When the image should look like **you specifically**:

### Midjourney v7

1. Upload 3–5 of your best reference photos to Discord (or a public URL)
2. In your prompt, append `--cref [url1] [url2] [url3]`
3. Use more reference photos for tighter likeness — v7 removed `--cw` (character weight). More refs = stronger character lock.
4. Combine with `--sref [style-reference-url]` for style lock

Example suffix: `--cref https://yoururl1.jpg https://yoururl2.jpg https://yoururl3.jpg --sref https://firstimage.jpg --style raw --ar 4:5 --v 7`

### Gemini 2.5 Flash Image (Nano Banana)

1. Upload 2–4 of your reference photos directly into the chat
2. Write the prompt as a natural instruction ("Create a documentary photograph of the person in these images...")
3. Nano Banana is currently the best at preserving facial identity — use it when the face needs to read as you

### Flux.1 Kontext (via Replicate)

1. Upload **one** real photo of you
2. Use a prompt like "Restyle this photograph in black-and-white 35mm documentary style, retaining the subject's identity"
3. Best for when you already have a close-to-right photo and just need the aesthetic polished

### When NOT to use character reference

- **hero-fragment-01, 02, 03** — no face visible anyway, skip `--cref`
- **origin-01, 02, 03** — these are scenes without people
- **Illustrations** — character ref is not useful for line art

Character reference is only necessary for: `origin-04`, `origin-05`, `introvert-solitude`, and any Why It Works cell that shows your face.

---

## Phase 2 — Homepage Hero Fragments

These are the three cycling photos in the homepage hero. **No face visible in any of them.** Body fragments only. Each is a quiet documentary moment.

### `hero-fragment-01.jpg` — Shoulders dropping into relaxation

**Where it's used:** Homepage hero cycle slide (rotating behind the headline)
**Aspect ratio:** 4:5 portrait
**Reference images needed:** None — no face, no cref needed. Just prompt.

**Prompt:**
```
Close-up black and white documentary photograph of a man's bare shoulders and upper back from behind, shoulders visibly dropping into a relaxed exhale, subtle musculature catching soft window light from the left, gentle shadows defining the trapezius, warm cream background fading out of focus, intimate and quiet, no face, no clothing visible, shot on 35mm film with medium grain, shallow depth of field, editorial documentary aesthetic, Kinfolk magazine mood, conveys release and groundedness --ar 4:5 --style raw --stylize 250 --v 7 --no smile, stock photo, studio flash, HDR, saturated colours, oil
```

**Tool notes:**
- Midjourney handles this well on first try
- If Midjourney refuses due to "bare back" interpretation, add `thin dark neutral t-shirt, fabric visible at frame edges` to the prompt
- DALL·E 3: rephrase as "A close-up documentary photograph from behind showing a man's shoulders in a soft dark knit shirt, captured mid-exhale, black and white film grain..."

---

### `hero-fragment-02.jpg` — Hands mid-gesture

**Where it's used:** Homepage hero cycle slide
**Aspect ratio:** 4:5 portrait
**Reference images needed:** None

**Prompt:**
```
Black and white documentary photograph of a man's hands mid-gesture, one hand slightly in motion creating natural motion blur, fingers extended expressively as if mid-sentence or mid-explanation, dark neutral sleeve cuff visible at the bottom of frame, soft diffused natural window light, shot on 35mm film with visible grain, macro lens aesthetic, shallow depth of field with the still hand sharp and the moving hand softly blurred, warm cream background, Kinfolk magazine editorial style, conveys thoughtful articulation, no face, no wedding ring --ar 4:5 --style raw --stylize 250 --v 7 --no smile, stock photo, studio flash, HDR, saturated colours
```

**Tool notes:**
- Motion blur is tricky — Midjourney sometimes ignores it. If so, add `long exposure, 1/30 shutter speed` to force it
- If hands look like AI hands (six fingers, melted joints), regenerate with `--seed [number]` variations until one lands

---

### `hero-fragment-03.jpg` — Feet planted

**Where it's used:** Homepage hero cycle slide
**Aspect ratio:** 4:5 portrait
**Reference images needed:** None

**Prompt:**
```
Low angle black and white documentary photograph of a man's feet planted firmly on a polished wooden studio floor, weight evenly distributed, one foot slightly forward suggesting grounded readiness, simple dark leather shoes or bare feet, warm afternoon light streaking across the floor catching wood grain texture, shot on 35mm film with medium grain, Cereal magazine editorial style, sense of rootedness and quiet presence, shallow depth of field with feet sharp, cream and espresso tonal palette, dark neutral trousers cropped at ankles --ar 4:5 --style raw --stylize 250 --v 7 --no smile, sneakers, white sneakers, stock photo, studio flash
```

**Tool notes:**
- Specify "simple dark leather shoes OR bare feet" not both — pick one when generating
- If you want bare feet, consider adding `tatami mat floor, Japanese dance studio aesthetic` for an even stronger mood

---

## Phase 4 — About > Origin Scenes

Five scenes telling Jon's narrative: kid who wouldn't speak up → dance discovery → "someone noticed" → teaching → now. Mixed strategy: scenes 1-3 are evocative stand-ins (no face), scenes 4-5 feature you (use character reference).

### `origin-01.jpg` — "The kid who wouldn't speak up"

**Where it's used:** About > Origin scrollytelling scene 1
**Aspect ratio:** 16:9 landscape
**Reference images needed:** None — this is an evocative stand-in

**Prompt:**
```
Desaturated faded documentary photograph of an empty 1990s-era school classroom at end of day, wooden desks arranged in rows, afternoon light slanting through tall windows, one desk in the middle foreground slightly askew as if just vacated, chalk dust catching sunbeams in the air, faded sepia and warm cream tones, mood of quiet isolation and unspoken thoughts, shot as if found in an old photo album, slight natural vignette, 35mm film grain, Cereal magazine nostalgic editorial aesthetic --ar 16:9 --style raw --stylize 300 --v 7 --no children, people, faces, saturated colours, bright colours, HDR
```

**Alternate interpretation** if the classroom doesn't land: the back of a small figure walking away down a long hallway, or a single empty swing in an empty playground at dusk. Both work as placeholders for "quiet kid energy."

**Tool notes:**
- DALL·E 3 is actually excellent for empty-room scenes like this
- Midjourney's v7 style might over-dramatize; `--stylize 200` or lower helps

---

### `origin-02.jpg` — Empty dance studio at dawn

**Where it's used:** About > Origin scrollytelling scene 2 (discovering dance)
**Aspect ratio:** 16:9 landscape
**Reference images needed:** None

**Prompt:**
```
Black and white documentary photograph of an empty dance studio at dawn, polished wooden floor stretching toward a wall of mirrors and ballet barres, soft morning light pouring through tall industrial windows, dust motes visible in the light beams, no people, high ceiling with exposed beams, minimal and spare aesthetic, mood of anticipation and quiet possibility, shot on 35mm film with fine grain, Cereal and Kinfolk magazine editorial style, a single forgotten water bottle or folded sweater on the floor for human trace --ar 16:9 --style raw --stylize 250 --v 7 --no people, dancers, crowds, bright colours, HDR
```

**Tool notes:**
- Adding "a single forgotten water bottle or folded sweater" gives the image a human trace without a figure — important for the narrative beat
- If the mirrors look weird (AI often botches reflections), remove the mirror wall and describe "studio with soft morning light on empty floor" instead

---

### `origin-03.jpg` — The "someone noticed" moment

**Where it's used:** About > Origin scrollytelling scene 3
**Aspect ratio:** 16:9 landscape
**Reference images needed:** None

**Prompt:**
```
Black and white documentary photograph of a single vintage microphone on a stand in an otherwise empty theatre or conference space, warm spot of soft light catching only the microphone, background falling into deep atmospheric shadow, sense of held breath and before-the-moment anticipation, shot on 35mm film with medium grain, intimate cinematic composition, minimalist, warm tungsten undertones bleeding into the black and white, Saul Leiter atmospheric mood --ar 16:9 --style raw --stylize 300 --v 7 --no people, crowds, stage lights, concert, colourful lights
```

**Alternate interpretations:** a podium in an empty room; stage curtains partially drawn; a single chair facing an empty stage. All carry the same "about to be seen" energy.

**Tool notes:**
- This prompt is atmospheric — let the tool interpret. Generate 4 variants and pick.

---

### `origin-04.jpg` — Teaching, side angle

**Where it's used:** About > Origin scrollytelling scene 4 (deciding to teach)
**Aspect ratio:** 16:9 landscape
**Reference images needed:** 3–5 photos of your face (for character reference)

**Prompt (Midjourney with cref):**
```
Black and white documentary photograph from the side of a man in his thirties mid-gesture while teaching, dark neutral clothing (dark knit or henley), caught mid-sentence with one hand raised expressively, a student's out-of-focus shoulder at the edge of frame suggesting the teaching context without making it the subject, warm natural light from studio windows, shot on 35mm film with visible grain, Kinfolk editorial style, authentic unposed moment, warm ambient studio room with wooden floors, subject is not looking at camera --ar 16:9 --style raw --stylize 250 --cref [your-reference-url-1] [your-reference-url-2] [your-reference-url-3] --v 7 --no smile, corporate headshot, teeth showing, suit and tie, whiteboard, PowerPoint, office setting
```

**Tool notes:**
- For tighter likeness, add more reference URLs to `--cref` (v7 removed `--cw`)
- Nano Banana (Gemini 2.5 Flash Image) may do a better job here — try both
- If your references are all smiling photos, the model will fight to add a smile. Use reference photos where you're neutral-faced if possible.

---

### `origin-05.jpg` — You now, alone, grounded

**Where it's used:** About > Origin scrollytelling scene 5 (the closing note)
**Aspect ratio:** 4:5 portrait (vertical — fills the sticky column well)
**Reference images needed:** 3–5 photos of your face

**Prompt:**
```
Black and white documentary photograph of a man in his thirties standing alone in a quiet room, three-quarter angle to the camera, looking slightly off frame with a composed expression, dark neutral clothing (turtleneck or dark knit), relaxed confident posture with hands loose at sides, warm natural light from a window to his right, shot on 35mm film with medium grain, mood of quiet groundedness and earned stillness, editorial documentary style reminiscent of The Gentlewoman magazine, minimal interior with a single wooden chair or plant for context, no performance, no effort --ar 4:5 --style raw --stylize 250 --cref [your-reference-url-1] [your-reference-url-2] [your-reference-url-3] --v 7 --no smile, teeth, corporate headshot, arms crossed, fake confidence, glasses glare
```

**Tool notes:**
- This is the most emotionally important image on the About page — worth generating 20+ variants to get right
- Try Nano Banana alongside Midjourney; compare face fidelity
- "Looking slightly off frame" is key — direct eye contact with camera reads as headshot, which is what we're avoiding

---

## Introvert Section — Solitude Anchor Image

### `introvert-solitude.jpg` — You alone, quiet, unposed

**Where it's used:** About page > Introvert section (the emotional anchor for your pitch to introverts)
**Aspect ratio:** 4:5 portrait or 3:4
**Reference images needed:** 3–5 photos of your face

**Prompt:**
```
Black and white documentary photograph of a man in his thirties alone in a quiet domestic interior, sitting by a tall window in soft afternoon light, reading a book or holding a cup of tea, completely unposed, mid-thought expression, dark neutral clothing (soft knit sweater), warm wood and cream interior with minimal furnishing, shot on 35mm film with fine grain, intimate editorial mood reminiscent of Kinfolk and Cereal magazines, The Gentlewoman aesthetic, no performance for camera, conveys inner stillness and calm self-possession, subject unaware of camera, a natural moment of solitude --ar 4:5 --style raw --stylize 220 --cref [your-reference-url-1] [your-reference-url-2] [your-reference-url-3] --v 7 --no smile, phone, laptop, tech, corporate setting, posed, eye contact with camera
```

**Alternate angles worth trying:** shoulder-from-behind with book visible in foreground; reflection of you in a window; a hand and a teacup with part of your face blurred in background. All work — you're showing introvert energy, not you specifically.

**Tool notes:**
- This is the single most "you" image on the site. Spend time on it. Generate 30+ options if needed.
- When you have real photography, swap this out first — the AI version is an acceptable placeholder but the real one will be significantly better.

---

## Phase 5 — Why It Works Bento Images

Four cells in the homepage bento. Three need imagery (one cell is text-only). These are **body-fragment companions to short insights**, so they should feel like a mini-photo-essay.

Use the **same `--sref` style reference** across all three so they feel unified.

### `bento-flagship.jpg` — Large flagship cell (grounded full-body, mid-chest down)

**Aspect ratio:** 1:1 square (will be cropped in bento grid)
**Reference images needed:** Optional (face not prominent)

**Prompt:**
```
Black and white documentary photograph of a man's full figure from mid-chest down, hands loose and relaxed at sides, visibly grounded posture, dark neutral trousers and a dark knit top, standing on warm wooden studio floor, natural side light from left, shot on 35mm film with medium grain, Kinfolk editorial style, conveys embodied presence without effort, cream background out of focus, not looking at camera --ar 1:1 --style raw --stylize 250 --v 7 --no face close up, smile, power pose, suit
```

---

### `bento-small-01.jpg` — Small cell (spine / upper back detail)

**Aspect ratio:** 1:1 square
**Reference images needed:** None

**Prompt:**
```
Close-up black and white documentary photograph of a man's upper back in a thin dark knit, shoulder blades subtly visible through fine fabric, elegant natural posture captured from directly behind, soft natural light creating gentle definition without drama, shot on 35mm film with fine grain, Kinfolk editorial quiet style, no face, intimate and quiet --ar 1:1 --style raw --stylize 250 --sref [first-image-url-from-this-set] --v 7 --no stock photo, studio flash
```

---

### `bento-tall.jpg` — Tall cell (head/neck from behind)

**Aspect ratio:** 4:5 portrait
**Reference images needed:** None required (face not visible)

**Prompt:**
```
Black and white documentary photograph of a man's head and neck from behind, dark hair, slight turn revealing jawline and ear, warm natural window light on the side of the neck, soft focus with shallow depth of field, dark neutral collar visible at the base of frame, Kinfolk editorial style, conveys attention without display, 35mm film grain --ar 4:5 --style raw --stylize 250 --sref [first-image-url-from-this-set] --v 7 --no face, stock photo, smiling
```

**Tool notes:**
- Once you've generated `bento-flagship.jpg` and you're happy with it, use its URL as `--sref` on the other two prompts. This is what locks the visual family.

---

## Phase 5 — Curriculum Week Illustrations

The 8 line-drawings for the programs bento. **These are the hardest to make consistent across a set via AI** — AI line art tends to vary wildly in stroke weight and style. Your best options:

1. **Ideogram 2.0** — current best-in-class for line art consistency
2. **Midjourney with `--sref` locked across all 8** — will get close but not perfect
3. **ChatGPT / DALL·E 3 with "same style as image 1"** — hit and miss

Realistic expectation: you'll generate 20+ variants per week and pick the best-matched set, or you'll clean them up in Figma/Illustrator afterward. For placeholders it's fine — just get something on the screen.

### Shared style prefix (use on every illustration prompt):

```
Single continuous line drawing, minimalist ink illustration, confident wavy line, 2-2.5px uniform stroke weight, no fill no shading, warm mocha brown stroke on cream background, Matisse-inspired modern minimalism with slight hand-drawn imperfection, Jean Jullien mood, clean SVG-ready geometry, centred composition with generous white space, square format
```

Generate the first one, then on all subsequent prompts append `--sref [first-illustration-url]` to keep stroke weight and vibe consistent.

### Week 1 — Body Audit
```
[shared style prefix], subject: a single open human eye, simplified iris and pupil, viewed from the front, one continuous line where possible --ar 1:1 --stylize 100 --v 7
```

### Week 2 — Posture & Grounding
```
[shared style prefix], subject: a side-view abstract human spine with ribcage suggested, tapering down to two planted feet on ground, minimal and symbolic --ar 1:1 --stylize 100 --v 7
```

### Week 3 — Movement Fundamentals
```
[shared style prefix], subject: a single arcing arrow curving through space suggesting graceful motion, like the path of a dancer's gesture --ar 1:1 --stylize 100 --v 7
```

### Week 4 — Stillness & Timing
```
[shared style prefix], subject: a pause symbol interpreted as two parallel vertical lines, or alternatively a single seated figure in lotus-like repose viewed from the side, symbolic and abstract --ar 1:1 --stylize 100 --v 7
```

### Week 5 — Voice & Breath
```
[shared style prefix], subject: a stylised open mouth in profile with a soft curving line emerging to suggest breath or sound, minimal and symbolic --ar 1:1 --stylize 100 --v 7
```

### Week 6 — High-Stakes Situations
```
[shared style prefix], subject: a simple doorway with light spilling through from the other side, the threshold as an abstract portal, single continuous line --ar 1:1 --stylize 100 --v 7
```

### Week 7 — Personal Style
```
[shared style prefix], subject: a single folded garment on a flat surface, like a folded shirt or jacket, minimal and tailored --ar 1:1 --stylize 100 --v 7
```

### Week 8 — Integration
```
[shared style prefix], subject: three concentric circles or a spiral, expanding outward, symbolic of integration and wholeness --ar 1:1 --stylize 100 --v 7
```

**Post-processing step (important):**

Once you have 8 raster outputs you like, run them through an SVG tracer so they become actual SVG files with editable stroke colour (the curriculum bento CSS uses `currentColor` to recolour on hover):

- **Vectorizer.AI** (paid, best quality) — handles line art beautifully
- **Vector Magic** (paid) — similar quality
- **Inkscape** (free) — Trace Bitmap → Single scan → Brightness cutoff. Then save as plain SVG.

After tracing, open each SVG in a text editor and replace `stroke="#XXXXXX"` with `stroke="currentColor"`. That's the one-line edit that lets CSS variables drive the colour.

---

## Bonus — Dance Page Poster Frame

Not strictly needed (video plays automatically), but a still poster frame improves perceived loading and acts as a fallback.

### `dance-hero-poster.jpg`

**Aspect ratio:** 16:9 landscape
**Reference images needed:** Optional

**Prompt:**
```
Cinematic black and white still frame of a dancer mid-movement in a warm-lit studio, motion blur on one arm, sharp focus on the torso and grounded foot, shot as a film still with 35mm grain, soft spotlight quality, dark moody background with cream highlights on skin and fabric, no face or face in shadow, conveys controlled power through movement, reminiscent of Wim Wenders' Pina documentary, warm tungsten undertones --ar 16:9 --style raw --stylize 300 --v 7 --no stage lights, concert, colourful, saturated colours, bright lights
```

---

## Consistency Tips Across The Set

The number-one thing that distinguishes a pro visual set from an AI-generated grab-bag is consistency. Here's how to enforce it:

**1. Generate your "north star" first.**
Pick the single image that matters most — probably `origin-05.jpg` or `introvert-solitude.jpg` — and spend real time on it. Generate 30–50 variants. Once you have one you love, **save its URL**.

**2. Use it as `--sref` on everything else.**
For every other photo prompt, append `--sref [north-star-url]`. Style reference is what locks lighting temperature, grain, tone, and mood across a set.

**3. Keep the style fragment identical.**
Don't rewrite "shot on 35mm film..." each time. Copy-paste the exact block. Small variations in wording cause noticeable style drift.

**4. Generate in batches, not one at a time.**
Generate the 3 hero fragments in one session, then the 5 origin scenes in another, then the 3 bento cells. Staying in flow on one batch keeps the mental model consistent across prompts.

**5. Use the same seed family where possible.**
On Midjourney, after getting one image you love, use `/info` to grab its seed. Use that seed or nearby variants (`--seed 12345`, `--seed 12346`) on related images. This is less reliable than `--sref` but a free extra lever.

**6. Pass everything through one colour grade after.**
Once you have all your selects, run the whole set through the same preset in Lightroom, Darkroom, or even a simple Photoshop action:
- Convert to B&W
- Add 5–8% warm tint in shadows (orange/brown hue)
- Add mild film grain
- Subtle vignette

This final pass makes the AI-generated and future real photography sit together as one family. Critical when you later swap in real photos one at a time — without a consistent grade, the new photo will look out of place until you've replaced all of them.

---

## Troubleshooting — When Outputs Go Wrong

**"The face doesn't look like me."**
- Add more reference URLs to `--cref` — v7 removed `--cw`, so more refs is the lever now (use 4–5 URLs)
- Use photos with neutral expression
- Try Nano Banana (Gemini 2.5 Flash Image) — currently better for face identity than Midjourney

**"It keeps adding a smile."**
- Add `neutral expression, serious, contemplative, mouth closed` to the positive prompt
- Add `smile, teeth, grin, laughing` to the negative prompt
- Use reference photos where you're not smiling

**"Hands look like AI hands."**
- Regenerate — this is a dice roll issue
- Add `anatomically correct hands, five fingers` (sounds silly, often helps)
- Crop tighter so fewer fingers are visible
- Midjourney v7 is significantly better at hands than v6 — make sure you're on the latest version

**"The image feels too polished / overly dramatic."**
- Lower `--stylize` to 150 or 100
- Ensure `--style raw` is in the prompt
- Add `everyday, unremarkable, not dramatic` to positive prompt

**"The images all look different from each other."**
- You're missing `--sref`. Set a north-star image and reference it on every subsequent prompt.
- Double-check your style fragment is identical each time

**"It's too black and white / too contrasty."**
- Describe it as `desaturated` rather than "black and white"
- Add `warm tonal bleed, cream and espresso palette, not pure monochrome`

**"The line drawings are inconsistent."**
- This is the hardest thing to solve via AI
- Solution 1: Generate all 8 in Ideogram using the same prompt template and `--sref`
- Solution 2: Commission one real illustrator — for 8 simple line drawings, a Fiverr illustrator will deliver in 3–5 days for $200–400, and consistency will be perfect

---

## Final Workflow

1. **Today:** Gather 5–10 good reference photos of yourself. Neutral expression, good light, various angles. Upload them somewhere with public URLs (imgur, a private Dropbox link, etc.) for Midjourney `--cref`.
2. **Session 1 (1–2 hours):** Generate the 3 hero fragments. These don't need character reference — fast wins.
3. **Session 2 (2–3 hours):** Generate origin-01, 02, 03 (scene shots, no people) and origin-04, 05, and introvert-solitude (with your face). This is the longest session.
4. **Session 3 (1 hour):** The 3 bento cell images, using your north-star `--sref` for consistency.
5. **Session 4 (2 hours):** The 8 curriculum illustrations — expect trial and error. Trace to SVG after.
6. **Final step (30 min):** Batch colour-grade the photos to a unified preset. Upload to Sanity Studio tagged `stillness-motion-v1-placeholder`.

You're now ready to run Phase 2.

When real photography is complete, replace each asset one at a time in Sanity. No code changes needed — the schema already handles both.
