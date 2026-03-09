# The Kinetic Leader Learning Portal - Complete Implementation Guide

## Overview

You now have a **fully architected** Learning Portal system with:

- ✅ Sanity schemas (Module & PortalLesson)
- ✅ Supabase auth & progress tracking
- ✅ Protected routes (/login, /portal, /portal/[slug])
- ✅ Technical manual UI with monochrome + orange accent
- ✅ Real-time progress sync to database

## Files Created/Updated

### Sanity

- `sanity/schemas/module.ts` - Module curriculum container
- `sanity/schemas/portalLesson.ts` - Individual lesson with video
- `sanity/schemas/index.ts` - Updated exports
- `sanity/sanity.config.ts` - Updated imports
- `docs/LEARNING_PORTAL_SANITY_SETUP.md` - Setup instructions

### Supabase & Auth

- `lib/supabase.ts` - Supabase client initialization
- `lib/auth-context.tsx` - Auth provider & useAuth hook
- `lib/portal-progress.ts` - Progress tracking helpers
- `middleware.ts` - Route protection
- `docs/LEARNING_PORTAL_SUPABASE_SETUP.md` - Setup instructions

### Pages & Components

- `app/login/page.tsx` - Login/signup page
- `app/portal/page.tsx` - Dashboard (module list + progress)
- `app/portal/[slug]/page.tsx` - Video player + notes
- `app/css/pages.css` - All styling (login, dashboard, player)

## Implementation Checklist

### Step 1: Sanity Setup (10 minutes)

- [ ] Go to [sanity.io/manage](https://sanity.io/manage)
- [ ] Create dataset named `learning-portal`
- [ ] Schemas are already configured in your code
- [ ] Follow: `docs/LEARNING_PORTAL_SANITY_SETUP.md` for deployment

### Step 2: Supabase Setup (15 minutes)

- [ ] Create or use existing Supabase project
- [ ] Get API URL and `anon` key from Settings → API
- [ ] Update `.env.local` with Supabase credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
  SUPABASE_SERVICE_ROLE_KEY=eyJ...
  ```
- [ ] Run SQL migrations from `docs/LEARNING_PORTAL_SUPABASE_SETUP.md`:
  - Create `lesson_progress` table
  - Create RPC function `mark_lesson_complete`
  - Add RLS policies
- [ ] Enable Email/Password auth in Supabase Dashboard

### Step 3: App Setup (5 minutes)

- [ ] Add AuthProvider to `app/layout.tsx`:

  ```tsx
  import { AuthProvider } from "@/lib/auth-context";

  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  }
  ```

### Step 4: Sanity Data Integration (10 minutes)

- [ ] Update your Sanity client to support switching datasets
- [ ] In `lib/sanity.ts`, add support for `NEXT_PUBLIC_SANITY_PORTAL_DATASET`
- [ ] Update `/portal/page.tsx` and `/portal/[slug]/page.tsx` to query learning-portal dataset
- [ ] Example query update:
  ```typescript
  // Create a separate Sanity client for portal
  const portalSanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_PORTAL_DATASET || "learning-portal",
    apiVersion: "2024-01-01",
    useCdn: false,
  });
  ```

### Step 5: Test & Go Live (20 minutes)

- [ ] Populate sample data in Sanity (at least 1 Module + 3 Lessons)
- [ ] Test login flow: `/login` → create account → verify email
- [ ] Test dashboard: See modules, lessons, progress bars
- [ ] Test video player: Watch video → click "Mark Complete" → see checkmark
- [ ] Verify progress persists on page refresh
- [ ] Test logout: Sign out → redirect to `/login`

## Key Architecture Decisions

### Auth Flow

```
1. User visits /portal
   ↓
   Middleware checks session
   ↓ (no session)
   Redirects to /login
   ↓
2. User signs up or logs in
   ↓
   Supabase creates session (stored in cookies)
   ↓
3. Redirects to /portal (dashboard)
   ↓
4. useAuth hook reads session from context
   ↓
5. Dashboard queries progress from lesson_progress table
```

### Progress Tracking

```
1. User opens lesson page
   ↓
2. Lesson renders video player + "Mark Complete" button
   ↓
3. User clicks "Mark Complete"
   ↓
4. markLessonComplete() inserts/updates lesson_progress
   ↓
5. Supabase RPC function handles upsert
   ↓
6. Progress.is_completed = true
   ↓
7. Button changes to green checkmark ✓
   ↓
8. Dashboard auto-updates (progress bars shift)
```

### Styling Approach

- **Monospace fonts**: IBM Plex Mono (can use system fallback)
- **Layout**: High-contrast black borders (1px solid #000)
- **Accent**: Orange (#FF5F1F) for active elements & CTAs
- **Background**: Pure white (technical manual aesthetic)
- **Typography**: Uppercase labels, condensed spacing

## Environment Variables Required

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=f0611nfi
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PORTAL_DATASET=learning-portal

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # Server-side only
```

## Database & API Reference

### Supabase Table: `lesson_progress`

```sql
id              UUID (primary key)
user_id         UUID (FK to auth.users)
lesson_id       TEXT (slug from portalLesson)
started_at      TIMESTAMP
completed_at    TIMESTAMP (null until completed)
is_completed    BOOLEAN (default false)
duration_watched INTEGER (seconds)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Supabase RPC: `mark_lesson_complete()`

```sql
CALL mark_lesson_complete(
  p_user_id: UUID,
  p_lesson_id: TEXT,
  p_duration_watched: INTEGER?
)
RETURNS lesson_progress
```

## Styling System Structure

All portal-specific styles are in `app/css/pages.css`:

- `.portal-login-*` - Login page styles
- `.portal-dash-*` - Dashboard styles
- `.portal-lesson-*` - Video player styles

No inline styles or Tailwind classes in portal components. All styling is CSS-first with BEM naming convention.

## Testing Scenarios

### Test 1: First-Time User

1. Go to `/login`
2. Click "Sign Up"
3. Enter email & password
4. Check inbox for confirmation
5. Confirm email
6. Should redirect to `/portal`
7. See empty curriculum or sample modules

**Expected**: User is authenticated, dashboard loads, no progress yet

### Test 2: Complete a Lesson

1. Click on a lesson in module
2. Video should load from YouTube
3. Scroll down, see "Technical Description" & "Social Logic"
4. See technical notes in 3-column grid
5. Click "Mark Complete" button
6. Button changes to green checkmark ✓
7. Go back to dashboard
8. See progress bar increment

**Expected**: Checkmark persists, progress saved to Supabase

### Test 3: Session Persistence

1. Complete a lesson (checkmark visible)
2. Refresh page (F5/Cmd+R)
3. Progress should still show as completed

**Expected**: Progress data survives page refresh from Supabase DB

### Test 4: Auth Protection

1. Logout from dashboard
2. Try to visit `/portal` directly
3. Should redirect to `/login`
4. Try to visit `/portal/lesson-slug` directly
5. Should redirect to `/login`

**Expected**: Protected routes are gated

## Troubleshooting

### "Session not found after login"

- ✓ Verify NEXT_PUBLIC_SUPABASE_URL is correct
- ✓ Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- ✓ Check Supabase email auth is enabled
- ✓ Check AuthProvider wraps your app in layout.tsx
- ✓ Check browser cookies are not blocked

### "Can't see lessons in dashboard"

- ✓ Verify Sanity learning-portal dataset has Module & Lesson documents
- ✓ Verify your query in `/portal/page.tsx` targets the right dataset
- ✓ Run Sanity vision query: `*[_type == "module"]`
- ✓ Check portalLesson documents are referenced in module.lessons array

### "Progress doesn't save"

- ✓ Check lesson_progress table exists in Supabase
- ✓ Check RLS policy allows INSERT for authenticated users
- ✓ Verify user_id matches authenticated user
- ✓ Check lesson_id matches the lesson slug
- ✓ Check Supabase browser console for errors

### "Video won't play"

- ✓ Verify videoId is correct YouTube video ID (11 chars)
- ✓ Video URL format should be `https://www.youtube.com/watch?v={videoId}`
- ✓ Check video is publicly accessible
- ✓ Check iframe embed permissions on YouTube video

## Next Steps After Go-Live

1. **Enroll Users**: Direct access to Supabase auth or invite system
2. **Analytics**: Track completion rates, lesson difficulty, time-watched
3. **Automation**: Email notifications on lesson completion
4. **Gamification**: Badges, certificates on module completion
5. **Cohorts**: Group lessons by cohort/batch enrollment
6. **Mobile App**: Wrap in React Native / Expo
7. **Video Hosting**: Consider Mux instead of YouTube for DRM/analytics

## Support & Debugging

### GitHub Copilot Instructions

Your project includes `.github/copilot-instructions.md` which documents:

- Project architecture (Next.js 16, React 19, Sanity, CSS-first styling)
- Component patterns
- Styling system
- Development workflow

Refer to this for consistency when adding features.

### Monorepo Structure

```
/jonchalant/          # Main portfolio site
├── /app               # Next.js app (pages)
├── /components        # Reusable components
├── /lib               # Utilities (sanity, supabase, auth)
├── /docs              # Documentation
└── /sanity            # Sanity CMS config
    ├── /schemas       # Schema definitions (module, portalLesson, etc.)
    └── /structure.ts  # Sanity Studio customization
```

## Questions?

Review these docs in order:

1. `docs/LEARNING_PORTAL_SANITY_SETUP.md` - Sanity configuration
2. `docs/LEARNING_PORTAL_SUPABASE_SETUP.md` - Supabase database
3. `.github/copilot-instructions.md` - Project conventions
