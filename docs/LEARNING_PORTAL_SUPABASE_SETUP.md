# Learning Portal - Supabase Auth & Progress Setup

## Overview

The Learning Portal uses Supabase for:
- **User Authentication** (email/password, Google, GitHub, etc.)
- **Lesson Progress Tracking** (which lessons are started/completed)
- **User Progress Persistence** (survives across sessions)

## Part 1: Environment Setup

### 1. Get Supabase Credentials
Go to [supabase.com](https://supabase.com):
1. Create a new project (or use existing one)
2. Go to **Settings** → **API**
3. Copy these values to your `.env.local`:

```bash
# Supabase Auth & Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # (Keep this private, server-side only)
```

### 2. Update Environment Files
Create/update `.env.local`:

```bash
# Existing
NEXT_PUBLIC_SANITY_PROJECT_ID=f0611nfi
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PORTAL_DATASET=learning-portal

# Add Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Part 2: Database Schema

Create these tables in Supabase SQL Editor:

### Table: `lesson_progress`
Tracks user progress for each lesson.

```sql
-- Create lesson_progress table
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL, -- portalLesson slug from Sanity
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT FALSE NOT NULL,
  duration_watched INTEGER DEFAULT 0, -- seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Unique constraint: user can only have one progress record per lesson
  UNIQUE(user_id, lesson_id)
);

-- Create index for fast lookups
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_completed ON lesson_progress(is_completed);
```

### RPC Function: Mark Lesson Complete
This function updates progress when a user finishes a video.

```sql
CREATE OR REPLACE FUNCTION mark_lesson_complete(
  p_user_id UUID,
  p_lesson_id TEXT,
  p_duration_watched INTEGER DEFAULT 0
)
RETURNS lesson_progress AS $$
DECLARE
  v_record lesson_progress;
BEGIN
  INSERT INTO lesson_progress (user_id, lesson_id, is_completed, completed_at, duration_watched)
  VALUES (p_user_id, p_lesson_id, TRUE, NOW(), p_duration_watched)
  ON CONFLICT (user_id, lesson_id)
  DO UPDATE SET
    is_completed = TRUE,
    completed_at = NOW(),
    duration_watched = EXCLUDED.duration_watched,
    updated_at = NOW()
  RETURNING * INTO v_record;
  
  RETURN v_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can see their own progress
CREATE POLICY "Users can view their own progress"
  ON lesson_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON lesson_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own progress"
  ON lesson_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users cannot delete progress
-- (This prevents accidental data loss)
```

## Part 3: Setup in Next.js

### 1. Add Supabase Files (Already Created ✅)
- `lib/supabase.ts` - Client initialization
- `lib/auth-context.tsx` - Auth provider & useAuth hook
- `lib/portal-progress.ts` - Progress helper functions

### 2. Update `app/layout.tsx`

Wrap your app with the AuthProvider:

```tsx
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap app with AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
```

### 3. Enable Auth in Supabase Dashboard

Go to **Authentication** → **Providers**:
1. **Email/Password** - Enable (default)
2. **Google**, **GitHub** (optional) - Turn on if desired
3. Go to **URL Configuration** and add your site URL:
   - Production: `https://yourdomain.com`
   - Development: `http://localhost:3000`

## Part 4: How It Works

### Login Flow
```
User visits /portal
  ↓ (not authenticated)
Redirect to /login
  ↓ (enters email/password)
Supabase creates session
  ↓ (session stored in browser)
Redirect to /portal/[slug]
  ↓ (useAuth checks session)
Load lesson & progress
```

### Progress Tracking Flow
```
User watches video in /portal/[slug]
  ↓ (clicks "Complete Lesson" button)
Frontend calls markLessonComplete(userId, lessonId)
  ↓ (Supabase RPC function)
lesson_progress table updated
  ↓ (checkmark appears in dashboard sidebar)
User sees checkmark next to lesson
```

## Part 5: Helper Functions

Most functions are pre-built in `lib/portal-progress.ts`:

```typescript
import { useAuth } from '@/lib/auth-context'
import { markLessonComplete, getUserLessonProgress } from '@/lib/portal-progress'

// In a component
const { user } = useAuth()

// Mark lesson complete when user finishes video
const handleCompleteLesson = async () => {
  if (!user) return
  await markLessonComplete(user.id, 'lesson-slug', 480) // 480 seconds watched
}

// Check if lesson is already completed
const progress = await getUserLessonProgress(user.id, 'lesson-slug')
const isCompleted = progress?.is_completed || false
```

## Part 6: Testing

### Test Authentication
1. Go to `/login`
2. Sign up with email
3. Confirm email (check inbox or Supabase auth dashboard)
4. Should redirect to `/portal`

### Test Progress Tracking
1. Login and navigate to `/portal/lesson-1`
2. Click "Complete Lesson" button
3. Go back to dashboard (should see checkmark)
4. Refresh page (checkmark persists from database)

## Troubleshooting

**Session not persisting?**
- Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
- Verify AuthProvider wraps your app in layout.tsx
- Check browser localStorage (Supabase stores session there)

**Progress not saving?**
- Verify lesson_progress table exists
- Check RLS policies allow INSERT/UPDATE for authenticated users
- Verify user_id matches authenticated user in Supabase

**Can't login?**
- Verify email auth is enabled in Supabase
- Check URL configuration includes your site domain
- Check email confirmation (Supabase sends verification link)

## Next Steps
1. ✅ Sanity schemas created
2. ✅ Supabase auth helpers created
3. ⏳ Create database tables in Supabase SQL
4. ⏳ Add AuthProvider to layout.tsx
5. ⏳ Build protected routes (/login, /portal, /portal/[slug])
6. ⏳ Build dashboard & video player UI
