# The Kinetic Leader Portal - Architecture Diagram

## Complete System Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         THE KINETIC LEADER PORTAL                               │
│                       Technical Manual for Social Fluency                        │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    Frontend (Next.js)
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  /login                    /portal                 /portal/[slug]                │
│  ─────────                 ───────                 ─────────────                 │
│  • Sign Up/In              • Module Index          • Video Player                │
│  • Email/Password          • Lessons List          • Technical Notes             │
│  • Error Handling          • Progress Bars         • Complete Button             │
│                            • Navigation            • Full-screen focus           │
│                                                                                   │
│                        (All styled: Monochrome + Orange)                         │
│                        (CSS-First, BEM naming, Monospace fonts)                  │
│                                                                                   │
└────────────────┬──────────────────────────────────────────────────────┬──────────┘
                 │                                                      │
                 │                                                      │
       ┌─────────▼──────────┐                              ┌────────────▼────────┐
       │   Auth Layer       │                              │   Data Fetching     │
       │   (lib/auth-*)     │                              │   (lib/sanity.ts)   │
       └─────────┬──────────┘                              └────────────┬────────┘
                 │                                                      │
                 │ useAuth()                                           │ fetchPortalData()
                 │ AuthProvider                                        │ portalClient
                 │                                                      │
                 │                                    ┌──────────────┐  │
                 │                                    │ Middleware   │  │
                 │                                    │ Route Protect│  │
                 │                                    │  middleware  │  │
                 │                                    │   .ts        │  │
                 │                                    └──────────────┘  │
                 │                                                      │
       ┌─────────▼──────────────────────┐              ┌────────────────▼─────────┐
       │       SUPABASE                 │              │      SANITY CMS           │
       │    (Authentication)            │              │    (Content Hub)          │
       └─────────┬──────────────────────┘              └────────────┬──────────────┘
                 │                                                   │
        ┌────────┴────────┐                          ┌──────────────┴──────────────┐
        │                 │                          │                             │
    ┌───▼────┐       ┌────▼────┐             ┌──────▼────┐             ┌──────────▼──┐
    │ Auth   │       │ Database │             │  Dataset: │             │  Schemas:   │
    │ Users  │       │  Tables  │             │production │             │ • Module    │
    │        │       │          │             │           │             │ • Portal    │
    │        │       ├──────────┤             │  (Main)   │             │   Lesson    │
    │        │       │lesson_   │             │           │             │             │
    │        │       │progress  │             └───────────┘             └─────────────┘
    │        │       │          │
    │        │       ├──────────┤
    │        │       │user_id   │
    │        │       │lesson_id │
    │        │       │is_comple-│
    │        │       │ted       │
    │        │       │duration_ │
    │        │       │watched   │
    │        │       └──────────┘
    │        │
    │        └─ RLS Policies
    │           (Row-level security)
    │
    └─ Session Management
       (Cookies + Context)
```

## Data Flow Diagram

### 1. Login Flow
```
User visits /portal
    │
    ├─ Check Middleware
    │    └─ No session found
    │
    ├─ Redirect to /login
    │    │
    │    └─ User enters email & password
    │         │
    │         └─ supabase.auth.signUp() or signInWithPassword()
    │              │
    │              └─ Supabase verifies credentials
    │                   │
    │                   ├─ Create auth.users record
    │                   │
    │                   ├─ Set session cookies
    │                   │
    │                   └─ Return session object
    │
    └─ Router redirects /portal
         │
         └─ Middleware validates session → allows access
         │
         └─ Component renders <AuthProvider>
              │
              └─ useAuth() hook available
```

### 2. Dashboard (Module List) Flow
```
/portal/page.tsx (Server Component)
    │
    ├─ Check session (middleware)
    │
    ├─ Fetch modules: getModulesAndLessons()
    │    │
    │    └─ portalClient.fetch(GROQ query)
    │         │
    │         └─ Sanity learning-portal dataset
    │              │
    │              └─ Returns: Module[] with lessons[] references
    │
    ├─ Get user progress: getUserModuleProgress(userId, lessonIds)
    │    │
    │    └─ supabase.from('lesson_progress')
    │         .select('*')
    │         .eq('user_id', userId)
    │         .in('lesson_id', lessonIds)
    │         │
    │         └─ Returns: Progress[] {lesson_id, is_completed}
    │
    └─ Render: <Module> with <Lesson> items
         │
         ├─ Progress bar % = completed / total
         │
         ├─ Checkmark ✓ for completed lessons
         │
         └─ Link to /portal/[slug] for each lesson
```

### 3. Video Player Flow
```
/portal/[slug]/page.tsx (Client Component)
    │
    ├─ useAuth() hook gets user from context
    │
    ├─ Fetch lesson: fetchLesson(slug)
    │    │
    │    └─ portalClient.fetch(GROQ query)
    │         │
    │         └─ Sanity learning-portal dataset
    │              │
    │              └─ Returns: Lesson {
    │                   title,
    │                   videoId,
    │                   technicalDescription,
    │                   socialLogic,
    │                   technicalNotes[]
    │                 }
    │
    ├─ Check progress: getUserLessonProgress(userId, slug)
    │    │
    │    └─ supabase.from('lesson_progress')
    │         .select('*')
    │         .eq('user_id', userId)
    │         .eq('lesson_id', slug)
    │         │
    │         └─ Returns: Progress | null
    │
    ├─ Render: <iframe> with YouTube video
    │    │
    │    └─ src="https://youtube.com/embed/{lesson.videoId}"
    │
    ├─ Button click: "Mark Complete"
    │    │
    │    └─ handleMarkComplete()
    │         │
    │         └─ markLessonComplete(userId, slug, duration)
    │              │
    │              └─ supabase.rpc('mark_lesson_complete', {...})
    │              │    │
    │              │    └─ Supabase RPC function executes
    │              │         │
    │              │         └─ INSERT or UPDATE lesson_progress
    │              │              │
    │              │              └─ Set is_completed = true
    │              │                  Set completed_at = NOW()
    │              │
    │              └─ Return updated progress
    │                   │
    │                   └─ setState(progress)
    │
    └─ Button shows ✓ checkmark
         │
         └─ User can verify on dashboard (progress bar updates)
```

## Component Hierarchy

```
app/layout.tsx
    │
    └─ <AuthProvider>
         │
         └─ children
              │
              ├─ /login/page.tsx
              │  └─ <LoginClient> ('use client')
              │      ├─ useRouter()
              │      ├─ supabase.auth.signUp/signInWithPassword
              │      └─ Form: email, password, toggle sign up/in
              │
              ├─ /portal/page.tsx (Server Component)
              │  ├─ getModulesAndLessons() (async)
              │  ├─ getUserProgress() (async)
              │  └─ Render: Module[] → Lesson[]
              │
              └─ /portal/[slug]/page.tsx ('use client')
                 ├─ useAuth() hook
                 ├─ useState: lesson, progress
                 ├─ useEffect: fetch lesson + progress
                 ├─ handleMarkComplete()
                 └─ Render: <iframe> + notes grid
```

## Database Schema

```
SUPABASE: lesson_progress Table
┌──────────────────────────────────────┐
│ id (UUID, PK)                        │  ┐
├──────────────────────────────────────┤  │ Unique
│ user_id (UUID, FK → auth.users)      │  │ constraint on
│ lesson_id (TEXT, slug from Sanity)   │  │ (user_id, lesson_id)
├──────────────────────────────────────┤  ┘
│ started_at (TIMESTAMP)               │
│ completed_at (TIMESTAMP, nullable)   │
│ is_completed (BOOLEAN, default false)│
│ duration_watched (INTEGER seconds)   │
│ created_at (TIMESTAMP)               │
│ updated_at (TIMESTAMP)               │
└──────────────────────────────────────┘

RLS POLICIES:
├─ SELECT: Users can see their own progress
├─ INSERT: Users can insert their own progress
├─ UPDATE: Users can update their own progress
└─ DELETE: Blocked (prevent accidental data loss)

RPC FUNCTION: mark_lesson_complete()
├─ Input: user_id (UUID), lesson_id (TEXT), duration_watched (INT, optional)
├─ Logic: INSERT ... ON CONFLICT ... DO UPDATE
└─ Output: lesson_progress record
```

## Sanity Data Model

```
SANITY learning-portal Dataset
│
├─ Document Type: "module"
│  ├─ name: "module" (unique)
│  ├─ title: "Foundation: Physical Grounding"
│  ├─ slug: { current: "foundation-physical" }
│  ├─ order: 1
│  ├─ icon: "🎯"
│  ├─ description: "Master stance and breathing..."
│  └─ lessons: [
│       { _type: "reference", _ref: "lesson-doc-id-1" },
│       { _type: "reference", _ref: "lesson-doc-id-2" }
│     ]
│
└─ Document Type: "portalLesson"
   ├─ name: "portalLesson" (unique)
   ├─ title: "The Grounding Stance"
   ├─ slug: { current: "grounding-stance" }
   ├─ technicalDescription: "Detailed explanation..."
   ├─ videoId: "dQw4w9WgXcQ" (YouTube ID, 11 chars)
   ├─ socialLogic: "How this applies to social presence..."
   ├─ technicalNotes: [
   │   {
   │     _key: "note-1",
   │     column: 1,
   │     label: "Feet Position",
   │     content: "Shoulder-width apart..."
   │   },
   │   {
   │     _key: "note-2",
   │     column: 2,
   │     label: "Breathing",
   │     content: "4 in, 6 out pattern..."
   │   }
   │ ]
   ├─ duration: 8 (minutes)
   ├─ difficulty: "beginner"
   ├─ order: 1
   ├─ module: { _type: "reference", _ref: "module-doc-id" }
   ├─ publishedAt: "2024-01-15T10:00:00Z"
   └─ updatedAt: "2024-01-15T10:00:00Z"
```

## CSS Architecture

```
app/css/pages.css
│
├─ .portal-login-*
│  ├─ .portal-login-page (container, white bg, monospace)
│  ├─ .portal-login-form (1px black border)
│  ├─ .portal-login-input (monospace, black border)
│  ├─ .portal-login-submit (#FF5F1F orange, uppercase)
│  └─ .portal-login-error (red background)
│
├─ .portal-dashboard-*
│  ├─ .portal-dashboard-page (grid layout)
│  ├─ .portal-dashboard-module (1px black border box)
│  ├─ .portal-dashboard-lesson (flex, gray hover)
│  ├─ .portal-dashboard-progress-fill (#FF5F1F bar)
│  ├─ .portal-dashboard-checkmark (✓ orange)
│  └─ .portal-dashboard-logout (black border button)
│
└─ .portal-lesson-*
   ├─ .portal-lesson-video-wrapper (responsive iframe, 16:9)
   ├─ .portal-lesson-complete-button (#FF5F1F, changes to white on done)
   ├─ .portal-lesson-description (text, gray bg)
   ├─ .portal-lesson-notes-grid (3-column, orange left border)
   └─ .portal-lesson-note-card (1px black, content text)

Design Principles:
├─ Monospace fonts: Monospace system fonts + IBM Plex Mono fallback
├─ Colors: Pure white (#fff) bg, pure black (#000) borders, orange (#FF5F1F) accent
├─ Spacing: CSS variables, generous whitespace
└─ Aesthetic: Technical manual / engineering spec sheet
```

## Environment Configuration

```
.env.local

# Existing (keep)
NEXT_PUBLIC_SANITY_PROJECT_ID=f0611nfi
NEXT_PUBLIC_SANITY_DATASET=production

# New: Sanity Portal
NEXT_PUBLIC_SANITY_PORTAL_DATASET=learning-portal

# Supabase (new)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (server-side only)
```

## Request/Response Flow Example

### User completes lesson
```
POST /api/lesson/complete
{
  userId: "550e8400-e29b-41d4-a716-446655440000",
  lessonId: "grounding-stance",
  durationWatched: 480
}
     │
     ├─ Call: markLessonComplete(userId, lessonId, 480)
     │
     └─ supabase.rpc('mark_lesson_complete', {
          p_user_id: userId,
          p_lesson_id: lessonId,
          p_duration_watched: 480
        })
     │
     └─ Response: {
          "id": "row-uuid",
          "user_id": "550e8400-e29b-41d4-a716-446655440000",
          "lesson_id": "grounding-stance",
          "is_completed": true,
          "completed_at": "2024-01-15T14:30:00Z",
          "duration_watched": 480,
          ...
        }
     │
     └─ Button changes: "Mark Complete" → "✓ Complete" (orange)
     │
     └─ Dashboard progress bar updates on next visit
```

## Summary

```
┌─────────────────┐
│   User Browser  │
│   /login·/portal│
│   /portal/[slug]│
└────────┬────────┘
         │
         │ authenticates
         ▼
    ┌────────────┐
    │  Supabase  │
    │ (Auth+DB)  │
    └────────────┘
         │
         │ stores progress
         │
    ┌────────────┐
    │   Sanity   │
    │    (CMS)   │
    └────────────┘
         │
         │ provides content
         │
         └──back to user
```

This architecture ensures:
✅ Secure authentication (Supabase)
✅ Content management (Sanity)
✅ Progress persistence (Supabase DB)
✅ Server-side rendering (Next.js)
✅ Clean integration (React hooks)
✅ Technical aesthetic (CSS-first design)
