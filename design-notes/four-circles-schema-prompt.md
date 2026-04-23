# Claude Code Prompt — Four Circles Course Schema + Ikigai Results Integration

**Copy everything below this line into a fresh Claude Code session in VS Code. Scope is one session, roughly 45 minutes of work. Do not start implementation until you've read the full prompt end to end.**

---

## Context

The Jonchalant site is repositioning around ikigai as the top-of-funnel entry point. The old "Baby Steps" course is being replaced by a new free course called **The Four Circles** — twelve lessons walking through the ikigai framework, gated behind account creation, with progress saved to each user's portal. The ikigai assessment results page already exists and needs to hand off into this new course.

Full positioning context is in `/docs/positioning.md` at the repo root. **Read it before making architectural choices.** The schema and code must be consistent with the positioning doc.

## Scope of this session

You are building the data layer and schema for the Four Circles course. You are **not** writing lesson content (that happens later), and you are **not** building the course rendering UI (separate session). What you are building:

1. A generalized `course` schema in Sanity (usable by Four Circles, Foundation, and future courses)
2. A `lesson` schema extension or new schema to support Four Circles' lesson structure
3. An `ikigaiQuiz` schema if it doesn't already exist (check first — the quiz may be hardcoded)
4. A Supabase migration for storing ikigai assessment results per user
5. Helper functions in `lib/` for saving and retrieving ikigai results
6. A check on the existing `lesson_progress` table to confirm it can be reused for Four Circles progress tracking (no parallel table)

## Architectural constraints (follow strictly)

1. **One course schema, not one per course.** The Foundation and Four Circles both use the same `course` schema, differentiated by a `courseType` field (`free-gated` | `paid`). This scales to future courses.
2. **Lesson difficulty tier is an enum on the lesson:** `basic` | `challenging` | `hardest`. Used by the course landing page to render the 4-4-4 curriculum breakdown.
3. **Ikigai quadrant tagging on lessons is optional.** Each lesson can tag one or more quadrants (`passion` | `mission` | `vocation` | `profession`) it relates to. Used later for personalization.
4. **Reuse `lesson_progress` Supabase table.** Do not build a parallel progress table for Four Circles. If `lesson_progress` is missing fields needed for this course, extend it — don't duplicate it.
5. **Follow all conventions in CLAUDE.md and `.github/copilot-instructions.md`.** Specifically: `@/` imports only, server components by default, SSR-safe Supabase clients from `utils/supabase/`, shared types in `lib/types.ts`, no hardcoded marketing copy.
6. **No new CSS files.** This is a data-layer session. If any view rendering is needed later, styles go in the existing 10 CSS files.

## Tasks

### Task 1 — Sanity schema: `course`

Create `sanity/schemas/course.ts`. Fields:

- `title` (string, required) — e.g., "The Four Circles"
- `slug` (slug, required, source = title) — e.g., `four-circles`
- `subtitle` (string, optional) — short tagline
- `description` (text, optional) — long-form course description, used on the landing page
- `courseType` (string, required, enum: `free-gated` | `paid`)
- `pricing` (object, optional, only shown if courseType = `paid`)
  - `amount` (number)
  - `currency` (string, default USD)
  - `description` (string) — e.g., "Self-paced" or "With weekly check-ins"
- `totalLessons` (number, read-only / computed if possible — otherwise manual)
- `estimatedDuration` (string, optional) — e.g., "12 weeks"
- `heroImage` (image, optional)
- `ctaText` (string, optional) — override for the primary CTA on the landing page
- `whoThisIsFor` (array of strings, optional) — bullet points for the landing page
- `whatThisIsNot` (array of strings, optional) — bullet points for managing expectations
- `lessons` (array of references to `lesson` documents, ordered)
- `order` (number, for ordering in lists)

Register the schema in `sanity/schemaTypes/index.ts`.

### Task 2 — Sanity schema: extend `lesson` (or create new type if needed)

Check the existing `lesson` schema in `sanity/schemas/`. It currently has fields for category (Beginner/Intermediate/Advanced), pillar, duration, etc. — designed for the old Baby Steps / Foundation context.

Decision point: **do we extend the existing lesson schema, or create a new `courseLesson` schema for Four Circles?**

- Extend the existing schema if the current fields are compatible and adding new optional fields won't break existing lessons.
- Create a new schema if the existing one has required fields that don't make sense for Four Circles (e.g., required video URL when Four Circles lessons are text-based).

Read the existing schema, then make the call and explain your reasoning in the commit message.

Whichever direction, the lesson document must support these fields for Four Circles:

- `title` (string, required)
- `slug` (slug, required)
- `lessonNumber` (number, required) — 1 through 12 for Four Circles
- `difficultyTier` (string, required, enum: `basic` | `challenging` | `hardest`)
- `ikigaiQuadrants` (array of strings, optional, enum values: `passion` | `mission` | `vocation` | `profession`) — tags which quadrant(s) this lesson is about
- `subtitle` (string, optional) — e.g., "Three circles, missing Mission"
- `summary` (text, required) — short description shown on the course landing page curriculum list
- `content` (portable text / rich text, optional for now — will be filled in later) — the actual lesson body
- `reflectionPrompt` (text, optional) — the reflection question at the end of each lesson
- `tryThisWeek` (text, optional) — the "one specific thing to try" at the end of each lesson
- `estimatedMinutes` (number, optional) — default 15

If extending the existing schema, mark new fields as optional so existing Foundation/Baby Steps lessons don't break.

### Task 3 — Sanity schema: `ikigaiQuiz`

Check if this schema exists. If the quiz questions are currently hardcoded in the React component, create the schema so the quiz can be edited in Studio without code deploys.

Fields:

- `title` (string, required) — e.g., "The Ikigai Assessment"
- `introText` (text, optional)
- `questions` (array, required, min 8, max 12) — each question has:
  - `questionText` (text, required)
  - `quadrant` (string, required, enum: `passion` | `mission` | `vocation` | `profession`) — which quadrant the question measures
  - `order` (number, required)
- `answerScale` (array of objects, fixed to 4 options) — each has:
  - `label` (string, required) — e.g., "Not at all", "Rarely true", "Often true", "Strongly agree"
  - `value` (number, required) — 1, 2, 3, 4
- `resultInterpretations` (array of objects) — one per quadrant + one per three-circle pattern
  - `type` (string, enum: `quadrant-dominant` | `three-circle-pattern`)
  - `quadrant` (string, required if type = quadrant-dominant)
  - `pattern` (string, required if type = three-circle-pattern, enum: `delight-no-wealth` | `delight-uncertain` | `comfortable-empty` | `useful-unexcited`)
  - `headline` (string, required)
  - `body` (text, required)
  - `recommendedLessonNumber` (number, optional) — which Four Circles lesson to recommend based on this result

**If the quiz is already in Sanity, skip this task and note the existing schema structure in the commit message.** Do not refactor a working schema unless it's missing fields needed for Four Circles personalization.

### Task 4 — Supabase migration: `ikigai_results`

Create a migration for a new `ikigai_results` table:

```sql
CREATE TABLE ikigai_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  passion_score integer NOT NULL CHECK (passion_score >= 0),
  mission_score integer NOT NULL CHECK (mission_score >= 0),
  vocation_score integer NOT NULL CHECK (vocation_score >= 0),
  profession_score integer NOT NULL CHECK (profession_score >= 0),
  strongest_quadrant text NOT NULL CHECK (strongest_quadrant IN ('passion', 'mission', 'vocation', 'profession')),
  pattern text CHECK (pattern IN ('delight-no-wealth', 'delight-uncertain', 'comfortable-empty', 'useful-unexcited', NULL)),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE ikigai_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own results"
  ON ikigai_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON ikigai_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fetching latest result per user
CREATE INDEX idx_ikigai_results_user_created ON ikigai_results(user_id, created_at DESC);
```

Notes:
- Results are additive (users can retake the assessment). Never update or delete; only insert new rows.
- `pattern` is nullable because it only applies when a user has three circles strongly overlapping. Calculated at save time.
- RLS mirrors the pattern in `lesson_progress`.

Place the migration in the existing Supabase migrations directory (check `/supabase/migrations/` or similar — follow whatever pattern is already established in the repo).

### Task 5 — Helper functions: `lib/ikigai-results.ts`

Create this file with the following functions, all SSR-compatible:

```ts
// Save a new result set for the current user. Requires authenticated user.
// Calculates strongestQuadrant and pattern before insert.
export async function saveIkigaiResult(scores: {
  passion: number;
  mission: number;
  vocation: number;
  profession: number;
}): Promise<IkigaiResult | null>;

// Fetch the most recent result for the current user. Returns null if not authed or no results yet.
export async function getLatestIkigaiResult(): Promise<IkigaiResult | null>;

// Fetch all historical results for the current user, ordered newest first.
export async function getIkigaiResultHistory(): Promise<IkigaiResult[]>;

// Pure calculation helpers — no Supabase calls, exportable for use in components.
export function calculateStrongestQuadrant(scores: IkigaiScores): Quadrant;
export function calculatePattern(scores: IkigaiScores): IkigaiPattern | null;
```

Pattern calculation logic:

- Compute the mean of the four scores.
- A quadrant is "strong" if its score is ≥ mean + some threshold (start with 1.0 — tunable).
- If three quadrants are strong and one is weak, that's a three-circle pattern:
  - Missing Passion → `useful-unexcited`
  - Missing Mission → `comfortable-empty`
  - Missing Vocation → `delight-uncertain`
  - Missing Profession → `delight-no-wealth`
- Otherwise pattern is null.

Use the SSR-safe Supabase client (`utils/supabase/server.ts` for server contexts, `utils/supabase/client.ts` for client contexts). Export both variants if needed, following the repo's existing helper patterns.

Shared types (`IkigaiResult`, `IkigaiScores`, `Quadrant`, `IkigaiPattern`) go in `lib/types.ts`.

### Task 6 — Audit `lesson_progress` table for Four Circles compatibility

Look at the existing `lesson_progress` table structure (in Supabase migrations or schema dumps). Confirm it can be used for Four Circles progress without modification, or identify exactly what needs to be added.

Likely fields already present: `user_id`, `lesson_id` or `lesson_slug`, `completed_at`.

Likely fields potentially missing for Four Circles: a `course_slug` or `course_id` so lessons can be grouped per course in queries (critical if the same user eventually takes multiple courses).

If a course field is missing, add a migration to add it as an optional column with a sensible default or backfill strategy. Do not break existing Foundation/Baby Steps progress records.

Document the outcome in the commit message.

### Task 7 — Shared types in `lib/types.ts`

Add (or update if they exist):

```ts
export type Quadrant = 'passion' | 'mission' | 'vocation' | 'profession';

export type IkigaiPattern =
  | 'delight-no-wealth'
  | 'delight-uncertain'
  | 'comfortable-empty'
  | 'useful-unexcited';

export type DifficultyTier = 'basic' | 'challenging' | 'hardest';

export type CourseType = 'free-gated' | 'paid';

export interface IkigaiScores {
  passion: number;
  mission: number;
  vocation: number;
  profession: number;
}

export interface IkigaiResult extends IkigaiScores {
  id: string;
  userId: string;
  strongestQuadrant: Quadrant;
  pattern: IkigaiPattern | null;
  createdAt: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  courseType: CourseType;
  pricing?: {
    amount: number;
    currency: string;
    description?: string;
  };
  totalLessons?: number;
  estimatedDuration?: string;
  heroImage?: SanityImage;
  ctaText?: string;
  whoThisIsFor?: string[];
  whatThisIsNot?: string[];
  lessons?: Lesson[];
  order?: number;
}

export interface Lesson {
  _id: string;
  title: string;
  slug: string;
  lessonNumber?: number;
  difficultyTier?: DifficultyTier;
  ikigaiQuadrants?: Quadrant[];
  subtitle?: string;
  summary: string;
  content?: PortableTextBlock[];
  reflectionPrompt?: string;
  tryThisWeek?: string;
  estimatedMinutes?: number;
  // existing Lesson fields preserved
}
```

Be careful not to break the existing `Lesson` type — if extending, all new fields are optional.

### Task 8 — Sanity query helpers in `lib/sanity.ts`

Add these fetch functions following the existing patterns in the file:

```ts
export async function getCourse(slug: string): Promise<Course | null>;
export async function getCourses(courseType?: CourseType): Promise<Course[]>;
export async function getFourCirclesCourse(): Promise<Course | null>;
  // convenience wrapper: getCourse('four-circles')
export async function getFourCirclesLesson(lessonSlug: string): Promise<Lesson | null>;
export async function getIkigaiQuiz(): Promise<IkigaiQuiz | null>;
  // skip if quiz is still hardcoded; return null and note in comments
```

Follow the GROQ query patterns already in the file. Include the full lesson dereferencing on `getCourse` so the landing page gets the curriculum in one fetch.

## Create one Four Circles course document + placeholder lessons in Sanity

Once the schemas are built, seed the database with:

1. One `course` document: title "The Four Circles", slug `four-circles`, courseType `free-gated`.
2. Twelve `lesson` documents (or `courseLesson` documents if you chose a separate schema), one per lesson in the curriculum below. Populate title, slug, lessonNumber, difficultyTier, summary, and ikigaiQuadrants. Leave `content`, `reflectionPrompt`, and `tryThisWeek` empty — those are written later.

Curriculum:

**Basic (1-4):**
1. Why purpose matters — quadrants: all four
2. Passion alone — quadrant: passion
3. Mission alone — quadrant: mission
4. Vocation alone — quadrant: vocation

**Challenging (5-8):**
5. Profession alone — quadrant: profession
6. The six pairings — quadrants: all four
7. Delight but no wealth — quadrants: passion, mission, vocation
8. Delight but uncertain — quadrants: passion, mission, profession

**Hardest (9-12):**
9. Comfortable but empty — quadrants: passion, vocation, profession
10. Useful but unexcited — quadrants: mission, vocation, profession
11. Ikigai, when it happens — quadrants: all four
12. Why knowing isn't enough — quadrants: all four (transition lesson to Foundation)

This seeding can be done via a migration script (`scripts/seed-four-circles.ts`) or by hand in Studio, whichever the repo already prefers.

## What NOT to do in this session

- Do not write lesson content. `content`, `reflectionPrompt`, and `tryThisWeek` stay empty.
- Do not build the course landing page UI (`app/lessons/four-circles/page.tsx`).
- Do not build the lesson detail UI.
- Do not touch the existing Foundation page.
- Do not rename existing "Baby Steps" records — that's a separate migration session. Leave them alone for now.
- Do not modify the ikigai quiz UI (`app/ikigai/IkigaiClient.tsx`) unless you're swapping hardcoded content for Sanity fetches, and only if clean to do so. If risky, skip and note in commit message.
- Do not update CLAUDE.md or copilot-instructions.md in this session. Those updates happen later as a batch.

## Verification checklist before finishing

- [ ] `npm run build` passes with no TypeScript errors
- [ ] `npm run lint` passes
- [ ] New Sanity schemas appear in Studio after `npm run sanity:dev`
- [ ] Supabase migration applies cleanly (test locally or document the SQL for the user to run)
- [ ] `lib/types.ts` exports all new types without breaking existing imports
- [ ] Sanity query helpers return expected shape when tested against seeded data
- [ ] The Four Circles course document exists in Sanity with all 12 lesson references
- [ ] `getFourCirclesCourse()` fetches the course with lessons dereferenced correctly

## Commit strategy

One commit per logical chunk, not one giant commit. Suggested order:

1. `chore(sanity): add course schema`
2. `chore(sanity): extend lesson schema for Four Circles` (or `add courseLesson schema`)
3. `chore(sanity): add ikigaiQuiz schema` (skip if already exists)
4. `chore(supabase): add ikigai_results table with RLS`
5. `chore(supabase): extend lesson_progress for multi-course support` (only if needed)
6. `feat(lib): add ikigai-results helpers`
7. `feat(lib): add course/lesson Sanity query helpers`
8. `feat(lib): add shared types for courses, lessons, ikigai`
9. `chore(sanity): seed Four Circles course and 12 placeholder lessons`

Each commit should be independently revertable.

## When you're done

Reply with:

1. Summary of what was built (one paragraph).
2. Any decisions made where the prompt left room (e.g., extend vs new lesson schema — which and why).
3. List of any prompt instructions you couldn't follow, with reasons.
4. Next suggested session (likely: build the Four Circles landing page UI, or wire the ikigai results save/fetch flow in the quiz component).

Do not begin lesson content writing. That's a separate conversation with Jon.
