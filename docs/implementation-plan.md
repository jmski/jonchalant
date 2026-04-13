# Implementation Plan — Post-Audit Refactor

**Based on:** `docs/codebase-audit.md` (2026-04-10)
**Branch:** `0.7.3`
**Approach:** Implement all code changes; leave manual tasks as documented plug-in points

---

## Phase 1: CSS Token Compliance

Replace all hardcoded hex colors with CSS variable references. Add missing tokens to `variables.css`.

### 1.1 — Add missing tokens to `variables.css`

Add to the existing `:root` block:

```css
/* Text on dark/accent backgrounds */
--text-on-dark: #f1f1f1;
--text-on-accent: #ffffff;

/* Print-specific (only used in @media print) */
--print-text: #333333;
--print-text-muted: #666666;
--print-border: #cccccc;

/* Admin status colors (external brand — not in design system) */
--admin-blue: #3b82f6;
--admin-amber: #f59e0b;
--admin-green: #10b981;
--admin-purple: #8b5cf6;
--admin-red: #dc2626;

/* Tonality tag colors */
--tag-filler: #7a5e28;
--tag-hedge: #7a4040;
--tag-strength: #3d5e35;
```

### 1.2 — Replace hardcoded colors (51+ instances)

| File | Lines | Current | Replace With |
|------|-------|---------|-------------|
| `cards.css` | 77, 122, 265, 1017 | `var(--border-color, #e2e8f0)` | `var(--border-color)` (remove fallback) |
| `cards.css` | 182 | `#ffffff` | `var(--bg-light)` |
| `layout.css` | 1562 | `#ffffff` | `var(--text-on-accent)` |
| `layout.css` | 1872, 1913, 1965 | `#fff` | `var(--text-on-dark)` |
| `layout.css` | 2058, 2064, 2070 | `#fff` | `var(--text-on-dark)` |
| `interactions.css` | 30 | `#fff` | `var(--text-on-dark)` |
| `sections.css` | 553 | `#f5a3a3` | `color-mix(in srgb, var(--color-error) 60%, white)` |
| `sections.css` | 1215 | `#ffffff` | `var(--text-on-accent)` |
| `pages-audit.css` | 137 | `#fff` | `var(--text-on-accent)` |
| `pages-ikigai.css` | 262, 342, 577, 588, 645 | `#fff` | `var(--text-on-accent)` |
| `pages-lessons.css` | 474, 726, 756 | `#ffffff` | `var(--text-on-accent)` |
| `pages-portal-tools.css` | 48, 100, 176, 233, 315, 972, 1049, 1186 | `#fff` | `var(--text-on-accent)` |
| `pages-portal-tools.css` | 843 | `#ccc` | `var(--print-border)` |
| `pages-portal-tools.css` | 851 | `#333` | `var(--print-text)` |
| `pages-portal-tools.css` | 857 | `#666` | `var(--print-text-muted)` |
| `pages-portal-tools.css` | 1274 | `#7a5e28` | `var(--tag-filler)` |
| `pages-portal-tools.css` | 1280 | `#7a4040` | `var(--tag-hedge)` |
| `pages-portal-tools.css` | 1286 | `#3d5e35` | `var(--tag-strength)` |
| `pages-portal.css` | 78, 158 | `#ffffff` | `var(--bg-light)` |
| `pages-portal.css` | 250 | `#ffffff` | `var(--text-on-accent)` |
| `pages-portal.css` | 1850, 2023 | `#3b82f6` | `var(--admin-blue)` |
| `pages-portal.css` | 1855, 2027 | `#f59e0b` | `var(--admin-amber)` |
| `pages-portal.css` | 1860, 2031 | `#10b981` | `var(--admin-green)` |
| `pages-portal.css` | 1865, 2035 | `#8b5cf6` | `var(--admin-purple)` |
| `pages-portal.css` | 2184, 2189 | `#dc2626` | `var(--admin-red)` |

### 1.3 — Replace hardcoded `font-family: 'Fraunces'` (18 instances)

| File | Lines | Replace With |
|------|-------|-------------|
| `pages-audit.css` | 519, 584, 666, 779 | `var(--font-headline)` |
| `pages-contact.css` | 45, 85, 127, 191, 287 | `var(--font-headline)` |
| `pages-portal.css` | 355, 396, 783, 912, 1259, 1321, 1486, 1562, 2348 | `var(--font-headline)` |

### 1.4 — Deduplicate `.stat-number`

- **Keep:** `typography.css:433` (weight 300, clamp(3rem, 6vw, 5rem))
- **Remove:** `utilities.css:147` (weight 900, different sizing — contradicts)
- **Verify:** Grep `.stat-number` usage in components to confirm which style is visually correct before removing

### 1.5 — Remove unused `.card-enhanced-shine`

- **File:** `cards.css:811-818`
- **Verify:** Grep `card-enhanced-shine` across all TSX files. If no component applies this class, remove the rule and its hover counterpart (~12 lines)

### 1.6 — Document breakpoint standard

Add comment block to top of `variables.css` (after existing header comment):

```css
/* Standard Breakpoints (mobile-first, min-width):
   sm: 640px  — mobile landscape / large phone
   md: 768px  — tablet
   lg: 1024px — desktop
   
   Non-standard breakpoints (480px, 560px, 960px, 1100px) should be
   migrated to the nearest standard on next touch. */
```

---

## Phase 2: CSS Deduplication & Breakpoint Migration

### 2.1 — Migrate non-standard breakpoints (12 instances)

Each migration requires visual verification. Change the media query value and test the affected component at the old and new breakpoints.

| File | Line | Current | Migrate To | Component |
|------|------|---------|-----------|-----------|
| `pages-blog.css` | 692 | `1100px` | `1024px` | Blog grid layout |
| `pages-blog.css` | 1027 | `480px` | `640px` | Blog card stacking |
| `layout.css` | 1895 | `480px` | `640px` | Footer opt-in layout |
| `pages-ikigai.css` | 15 | `960px` | `1024px` | Ikigai grid columns |
| `pages-portal-tools.css` | 273 | `max-width: 480px` | `max-width: 639px` | Tool layout mobile |
| `pages-portal-tools.css` | 533 | `max-width: 480px` | `max-width: 639px` | Tool layout mobile |
| `pages-portal.css` | 875 | `560px` | `640px` | Portal layout |
| `pages-portal.css` | 1023 | `480px` | `640px` | Portal card grid |
| `pages-portal.css` | 1718 | `max-width: 480px` | `max-width: 639px` | Portal mobile |
| `utilities.css` | 369 | `max-width: 480px` | `max-width: 639px` | Print utility |
| `sections.css` | 506 | `480px` | `640px` | Email capture layout |
| `sections.css` | 1892 | `max-width: 480px` | `max-width: 639px` | Section mobile |

### 2.2 — Remove `#e2e8f0` fallbacks from `var()` calls

In `cards.css` (lines 77, 122, 265, 1017): change `var(--border-color, #e2e8f0)` to `var(--border-color)`. The variable is defined in `:root` — fallback is unnecessary and masks theme issues.

---

## Phase 3: Component Refactors

### 3.1 — Extract `usePresenceChat` hook

**Create:** `lib/hooks/usePresenceChat.ts`

Extract from `components/portal/PresenceCoach.tsx`:
- State: `messages`, `input`, `isStreaming`, `isLimited`, `error`, `remaining` (lines 27-34)
- Refs: `messagesEndRef`, `textareaRef`, `abortRef` (lines 35-37)
- Effects: auto-scroll (lines 40-43), textarea resize (lines 45-58), cleanup (lines 60-65)
- Handler: `handleSubmit` with streaming logic (lines 67-189)

**Hook signature:**
```typescript
export function usePresenceChat(userId: string) {
  // Returns: { messages, input, setInput, isStreaming, isLimited, error, 
  //            remaining, handleSubmit, dismissError, messagesEndRef, textareaRef }
}
```

**Result:** `PresenceCoach.tsx` drops from 308 → ~120 LOC (rendering only)

Update barrel export in `lib/hooks/index.ts`.

### 3.2 — Extract Navbar sub-components

**Create:** `components/navigation/MobileMenu.tsx`

Extract from `Navbar.tsx` lines 229-315: the mobile menu overlay, sections, links, social links, footer CTAs.

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  socialLinks: SocialLink[];
  pathname: string;
}
```

**Result:** `Navbar.tsx` drops from 319 → ~200 LOC

### 3.3 — Add barrel exports

**Create 4 files:**

`components/forms/index.ts`:
```typescript
export { PresenceAuditFlow } from './PresenceAuditFlow';
export { SegmentedInquiryForm } from './SegmentedInquiryForm';
export { BlogOptIn } from './BlogOptIn';
```

`components/portal/index.ts`:
```typescript
export { PortalShell } from './PortalShell';
export { PresenceCoach } from './PresenceCoach';
export { PresenceCoachWidget } from './PresenceCoachWidget';
export { SignOutButton } from './SignOutButton';
```

`components/ui/index.ts`:
```typescript
export { Button } from './Button';
export { FormField } from './FormField';
export { FormMessage } from './FormMessage';
export { SectionHeader } from './SectionHeader';
export { SectionIntro } from './SectionIntro';
export { FeatureList } from './FeatureList';
```

`components/foundation/index.ts`:
```typescript
export { EnrollButton } from './EnrollButton';
```

No import changes needed — existing direct imports still work, these just enable cleaner future imports.

---

## Phase 4: UX & Conversion Infrastructure

### 4.1 — Guest checkout flow

**Goal:** Allow unauthenticated users to purchase Foundation without creating an account first. Account creation happens post-payment.

**Changes:**

1. **`components/foundation/EnrollButton.tsx`** — Remove auth guard (lines 24-29). Instead, collect email inline or pass to checkout without auth:
   ```typescript
   // Before: redirect to /login if not authenticated
   // After: POST to /api/checkout with { tier, email? }
   // If user is authenticated, include user_id. If not, proceed as guest.
   ```

2. **`app/api/checkout/route.ts`** — Make auth optional:
   - Try to get user. If authenticated, use `user.id` and `user.email`
   - If not authenticated, accept `email` from request body
   - Set `customer_email` on Stripe session either way
   - Add `guest_email` to metadata when no user_id

3. **`app/api/webhooks/stripe/route.ts`** — Handle guest enrollment:
   - If `metadata.user_id` exists: current flow (insert enrollment)
   - If `metadata.guest_email` exists and no `user_id`:
     - Create Supabase user via `supabase.auth.admin.createUser({ email, email_confirm: true })`
     - Use new user's ID for enrollment insert
     - Send enrollment email with "Set up your password" link

4. **`app/(marketing)/foundation/page.tsx`** — Add email input to pricing section for unauthenticated users (appears when no session detected)

5. **Success URL:** Change to `/foundation/success?session_id={CHECKOUT_SESSION_ID}` for guests, `/portal?enrolled=true` for authenticated users

6. **Create `app/(marketing)/foundation/success/page.tsx`** — Post-purchase confirmation for guests:
   - "You're enrolled! Check your email to set up your account."
   - Link to `/login`

### 4.2 — Context-aware navbar CTA

**File:** `components/navigation/Navbar.tsx` (lines 209-216, 278-293)

**Change:** Replace static "Portal" text with dynamic text based on auth state.

```typescript
// Add to Navbar: check auth state
const [isAuthenticated, setIsAuthenticated] = useState(false);

// In useEffect: check supabase session
const { data: { session } } = await supabase.auth.getSession();
setIsAuthenticated(!!session);

// Desktop CTA (line 213): 
// Before: <Link href="/login">Portal</Link>
// After:  <Link href={isAuthenticated ? '/portal' : '/login'}>
//           {isAuthenticated ? 'Dashboard' : 'Sign In'}
//         </Link>

// Mobile CTA (line 292): same logic
```

### 4.3 — Enrollment polling (replace manual refresh)

**File:** `app/(portal)/portal/page.tsx` (lines 68-83)

**Change:** Replace static "Confirming..." + Refresh button with auto-polling:

```typescript
// When enrolled=true but enrollment not in DB:
// Poll /api/enrollment-status every 3s for up to 30s
// Auto-redirect to course on success
// Show manual refresh only after timeout
```

**Create:** `app/api/enrollment-status/route.ts` — lightweight endpoint that returns `{ enrolled: boolean }` for the current user + course slug.

### 4.4 — Visual polish (CSS-only)

**`variables.css`:**
- Increase bg-tertiary contrast: `#f0ede8` → `#ebe6de` (warmer sand)

**`typography.css` or `sections.css`:**
- Add Fraunces lighter weight for hero display text:
  ```css
  .hero-headline { font-weight: 400; } /* was implicitly 700 */
  ```

**`components.css` or `sections.css`:**
- Add warm amber pull-quote style:
  ```css
  .pull-quote {
    font-family: var(--font-headline);
    font-weight: 300;
    font-style: italic;
    color: var(--color-burnt-indigo);
    border-left: 3px solid var(--color-warm-amber);
    padding-left: 1.5rem;
  }
  ```

---

## Phase 5: Plug-in Point Infrastructure

These create the code scaffolding for content the user will produce manually.

### 5.1 — Credentials section (About page)

**Create:** `components/sections/about/credentials/Credentials.tsx`

Server component that renders a credentials strip. Data from Sanity `aboutPage` schema.

```typescript
// Props from Sanity (to be added to schema):
interface CredentialsProps {
  yearsExperience?: number;
  clientCount?: number;
  certifications?: string[];
  companiesWorkedWith?: string[];
}
```

**Sanity schema update:** Add `credentials` object field to `sanity/schemas/aboutPage.ts`:
```javascript
{
  name: 'credentials',
  title: 'Credentials',
  type: 'object',
  fields: [
    { name: 'yearsExperience', title: 'Years of Experience', type: 'number' },
    { name: 'clientCount', title: 'Number of Clients', type: 'number' },
    { name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'string' }] },
    { name: 'companiesWorkedWith', title: 'Companies', type: 'array', of: [{ type: 'string' }] },
  ]
}
```

**`lib/sanity.ts`:** Update `getAboutPageContent()` to include `credentials` in the GROQ projection.

**`app/(marketing)/about/page.tsx`:** Insert `<Credentials />` between TurningPoint and Methodology sections. Renders only when data exists (Sanity fallback pattern).

**Plug-in:** User populates the `credentials` fields in Sanity Studio. Component renders automatically.

### 5.2 — Lesson preview embed (Foundation page)

**Create:** `components/foundation/LessonPreview.tsx`

Server component that renders a video preview with overlay and CTA.

```typescript
interface LessonPreviewProps {
  videoId?: string;   // YouTube video ID from Sanity
  title?: string;     // "Watch a preview — Lesson 1.1"
  duration?: string;  // "12 min"
}
```

**Sanity schema update:** Add `previewVideoId` field to `sanity/schemas/foundationPage.ts`.

**`app/(marketing)/foundation/page.tsx`:** Insert between Hero and Curriculum sections. Renders only when `previewVideoId` exists.

**Plug-in:** User uploads a preview video to YouTube, adds the ID in Sanity Studio. Component renders automatically.

### 5.3 — Comparison table (Foundation page)

**Create:** `components/foundation/ComparisonTable.tsx`

Server component rendering a feature comparison of Foundation tiers. Data hardcoded in `lib/` (coupled to pricing logic like audit data).

**`app/(marketing)/foundation/page.tsx`:** Insert between "How It Works" and Pricing sections.

**Plug-in:** Already functional on creation — uses hardcoded tier data. User updates if tiers change.

### 5.4 — Testimonial enhancement

The Sanity `testimonial` schema already has a `result` field (line 32-36 in `sanity/schemas/testimonial.ts`) for transformation metrics like "87% increased confidence in 8 weeks."

**`components/utilities/cards/TestimonialCard.tsx`:** Add `result` rendering below the quote:
```typescript
{testimonial.result && (
  <p className="testimonial-card-result">{testimonial.result}</p>
)}
```

**`cards.css`:** Add `.testimonial-card-result` style (small, accent-colored, semi-bold).

**`lib/sanity.ts`:** Ensure `result` is included in `TESTIMONIAL_FIELDS` projection.

**Plug-in:** User populates `result` field in each testimonial document in Sanity Studio.

### 5.5 — Email capture copy improvement

**`components/sections/home/email-capture/EmailCapture.tsx`** already accepts `heading` and `subheading` props (lines 7-10).

**Change defaults** in the component:
- `heading`: "Weekly insights on quiet leadership" → *(leave as prop — updated via Sanity or parent page)*
- **`app/(marketing)/page.tsx`:** Pass stronger copy as props from the homepage:
  ```typescript
  <EmailCapture 
    heading="The 3-minute exercise Fortune 500 coaches use"
    subheading="Plus weekly presence insights for introverts who lead. No spam, unsubscribe anytime."
  />
  ```

**Plug-in:** User can override copy by updating the props or making them Sanity-driven.

### 5.6 — Hero image support (Foundation + About)

Both hero sections currently have no image support. Create CSS classes that accommodate an optional background image with overlay.

**`pages-foundation.css`:** Add `.foundation-hero-image` class for background image with rice-paper overlay.

**`pages-portal.css` / `sections.css`:** Similar for about hero.

**Plug-in:** When professional photos are ready, add `backgroundImage` field to relevant Sanity schemas. The CSS is already in place — just needs the `<img>` or `style={{ backgroundImage }}` to be added.

---

## Phase 6: Testing Infrastructure

### 6.1 — Verify environment variables

**Create:** `scripts/check-env.ts` — a simple Node script that checks for required env vars and reports missing ones:
```
Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SUPABASE_URL, 
          NEXT_PUBLIC_SUPABASE_ANON_KEY
Launch-critical: ANTHROPIC_API_KEY, RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
Optional: SUPABASE_SERVICE_ROLE_KEY, KIT_API_KEY, KIT_FORM_ID, SANITY_API_TOKEN
```

### 6.2 — Mobile audit checklist

Not code — this is a manual task. But document the test matrix:

| Page | 375px | 768px | 1024px | Status |
|------|-------|-------|--------|--------|
| Homepage | | | | |
| Foundation | | | | |
| Programs | | | | |
| About | | | | |
| Blog | | | | |
| Contact | | | | |
| Audit | | | | |
| Portal Dashboard | | | | |
| Lesson Player | | | | |

---

## Manual Tasks (User Responsibility)

These cannot be automated. The code infrastructure from Phases 1-5 ensures each has a clear plug-in point.

| Task | Plug-in Point | What to Do |
|------|--------------|------------|
| **Professional photography** | Sanity image fields (hero backgrounds, about page, MeetJon) | Upload images to Sanity. Components will render them via existing `coverImage` / `image` fields |
| **Populate Module 1 in Sanity** | Course → Module → Lesson documents | Create documents per Task 0.1 checklist in ROADMAP.md |
| **Write testimonial transformation metrics** | Sanity `testimonial.result` field | Edit each testimonial document, fill in `result` string |
| **Populate credentials in Sanity** | Sanity `aboutPage.credentials` object | Fill in years, client count, certifications, companies |
| **Upload Foundation preview video** | Sanity `foundationPage.previewVideoId` | Upload video to YouTube (unlisted), paste video ID |
| **Rewrite email capture copy** | Props on `<EmailCapture>` in homepage | Update copy in `app/(marketing)/page.tsx` or make Sanity-driven |
| **Stripe end-to-end test** | Stripe CLI + test card | Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` |
| **Set Vercel env vars** | Vercel dashboard | Add: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| **Mobile visual audit** | Browser DevTools | Test at 375px, 768px, 1024px per checklist above |
| **Corporate/team pricing page** | New route or section on Programs | Requires business decision on pricing model first |

---

## Execution Order

```
Phase 1 (CSS tokens)          → 1 session, no component changes
Phase 2 (CSS dedup/breakpoints) → 1 session, visual verification needed  
Phase 3 (Component refactors)  → 1-2 sessions, test after each extraction
Phase 4 (UX infrastructure)    → 2-3 sessions, guest checkout is largest change
Phase 5 (Plug-in points)       → 1-2 sessions, schema updates + stub components
Phase 6 (Testing)              → 1 session for env script, manual audit separate
```

**Total estimated code sessions:** 7-10

**Dependencies:**
- Phase 2 depends on Phase 1 (tokens must exist before breakpoint migration)
- Phase 4.1 (guest checkout) is independent — can be done in parallel with CSS work
- Phase 5 depends on nothing — can start immediately
- Phase 3 is independent — can be done in any order

---

*Generated 2026-04-10 from codebase-audit.md findings.*
