# Learning Portal - Quick Reference & Code Snippets

## Immediate Next Steps (In Order)

### 1. Add to `app/layout.tsx` (Required for Auth to Work)

```tsx
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The Kinetic Leader",
  description: "Technical Manual for Social Fluency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* AuthProvider enables useAuth hook throughout app */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Update `.env.local` with Supabase Credentials

```bash
# New Supabase variables (add these)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# New Sanity variable (add this)
NEXT_PUBLIC_SANITY_PORTAL_DATASET=learning-portal

# Keep existing Sanity variables
NEXT_PUBLIC_SANITY_PROJECT_ID=f0611nfi
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Add Sanity Portal Client to `lib/sanity.ts`

Append this to your existing `lib/sanity.ts`:

```typescript
import { createClient } from "next-sanity";

// Existing production client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// NEW: Portal client for learning-portal dataset
export const portalClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_PORTAL_DATASET || "learning-portal",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Query helper using portal client
export async function fetchPortalData(
  query: string,
  params?: Record<string, unknown>,
) {
  return portalClient.fetch(query, params);
}
```

### 4. Update Portal Pages to Use Portal Client

**In `app/portal/page.tsx`, update `getModulesAndLessons()` function:**

```typescript
import { fetchPortalData } from "@/lib/sanity";

async function getModulesAndLessons() {
  try {
    const query = `
      *[_type == "module"] | order(order asc) {
        _id,
        title,
        slug,
        order,
        icon,
        "lessons": lessons[]-> {
          _id,
          title,
          slug,
          duration,
          difficulty,
          order
        }
      }
    `;

    const modules = await fetchPortalData(query);
    return modules || [];
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
}
```

**In `app/portal/[slug]/page.tsx`, update `fetchLesson()` function:**

```typescript
import { fetchPortalData } from "@/lib/sanity";

async function fetchLesson(slug: string): Promise<Lesson | null> {
  try {
    const query = `
      *[_type == "portalLesson" && slug.current == $slug][0] {
        _id,
        title,
        slug { current },
        technicalDescription,
        videoId,
        socialLogic,
        technicalNotes[] {
          _key,
          column,
          label,
          content
        },
        duration,
        difficulty,
        "module": module-> {
          _id,
          title,
          slug { current }
        }
      }
    `;

    const lesson = await fetchPortalData(query, { slug });

    if (!lesson) return null;

    // Transform slug from object to string if needed
    return {
      ...lesson,
      slug: lesson.slug?.current || slug,
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}
```

### 5. Create Auth Logout API Route

Create `app/api/auth/logout/route.ts`:

```typescript
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  // Clear Supabase session cookies
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");
  cookieStore.delete("sb-sessions");

  // Redirect to login
  redirect("/login");
}
```

### 6. Create Test Module in Sanity

Once you've deployed schemas, create this document in Sanity:

**Document 1: Module**

```
name: module
title: Foundation: Physical Grounding
slug: foundation-physical
order: 1
icon: 🎯
description: Learn foundational stance and breathing techniques
lessons: [reference to lesson below]
```

**Document 2: PortalLesson**

```
name: portalLesson
title: The Grounding Stance: Building Kinetic Confidence
slug: grounding-stance
videoId: dQw4w9WgXcQ (or any YouTube video ID)
technicalDescription: Master the fundamental grounding position that creates unshakeable confidence...
socialLogic: This physical stance directly translates to professional presence...
difficulty: beginner
duration: 8
order: 1
module: [reference to Module above]
technicalNotes: [
  { column: 1, label: "Feet Position", content: "Feet shoulder-width apart..." },
  { column: 2, label: "Breathing", content: "4-count in, 6-count out..." },
  { column: 3, label: "Eye Contact", content: "Gaze should be level or slightly up..." }
]
```

## API Quick Reference

### useAuth Hook

```typescript
import { useAuth } from '@/lib/auth-context'

export function MyComponent() {
  const { session, user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!session) return <div>Not authenticated</div>

  return <div>Welcome, {user?.email}!</div>
}
```

### Progress Tracking

```typescript
import {
  markLessonComplete,
  getUserLessonProgress,
  getModuleCompletionPercentage,
} from "@/lib/portal-progress";

// Mark a lesson as complete
await markLessonComplete(userId, "lesson-slug", 480); // 480 seconds watched

// Check if lesson is completed
const progress = await getUserLessonProgress(userId, "lesson-slug");
if (progress?.is_completed) {
  // Show checkmark
}

// Get module progress
const { completed, total, percentage } = await getModuleCompletionPercentage(
  userId,
  ["lesson-1", "lesson-2", "lesson-3"],
);
```

### Supabase Auth

```typescript
import { supabase } from "@/lib/supabase";

// Sign up
const { error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "secure-password",
});

// Sign in
const { error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});

// Sign out
await supabase.auth.signOut();

// Get current session
const {
  data: { session },
} = await supabase.auth.getSession();
```

## CSS Testing

Before going live, test these styles:

### Login Page

- [ ] Visit `/login` - should show minimalist form with black borders
- [ ] Orange button on hover
- [ ] Toggle between Sign Up / Sign In
- [ ] Error message appears in red box
- [ ] Back link styled correctly

### Dashboard

- [ ] Module boxes have 1px black borders
- [ ] Progress bar shows orange fill
- [ ] Lesson items show checkmark (✓) when completed
- [ ] Hover state shows gray background
- [ ] Responsive on mobile (single column)

### Video Player

- [ ] Video loads full width with 16:9 aspect ratio
- [ ] Technical notes display in 3-column grid
- [ ] Orange button for "Mark Complete"
- [ ] Button changes to green with checkmark when done
- [ ] Responsive on mobile (single column notes)

## Common Errors & Solutions

### "Cannot find module '@/lib/auth-context'"

**Fix**: Ensure `lib/auth-context.tsx` exists. Check file path is correct.

### "Supabase URL not found"

**Fix**: Add `NEXT_PUBLIC_SUPABASE_URL` to `.env.local`

### "Cannot find dataset 'learning-portal'"

**Fix**: Go to Sanity dashboard, create dataset manually:

1. Go to Settings → Datasets
2. Click "+ Create dataset"
3. Name: `learning-portal`
4. Clone from: `production` (optional)

### "502 Bad Gateway from Sanity"

**Fix**: Ensure you've deployed schemas to learning-portal dataset:

```bash
cd sanity
SANITY_DATASET=learning-portal npx sanity schema deploy
```

### "Video won't load: 404 Not Found"

**Fix**: YouTube video ID format:

- ✓ Correct: `dQw4w9WgXcQ` (11 chars, alphanumeric + underscore + hyphen)
- ✗ Wrong: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ✗ Wrong: `youtube.com/watch?v=dQw4w9WgXcQ`

Extract just the ID!

## Running Build Check

Before deploying:

```bash
npm run build
```

This will validate:

- TypeScript types
- ESLint rules
- Metadata & paths
- CSS compilation
- Next.js optimizations

If build succeeds (all 22+ pages compiled), you're ready!

## Files You Created/Modified

```
✅ CREATED:
  sanity/schemas/module.ts
  sanity/schemas/portalLesson.ts
  lib/supabase.ts
  lib/auth-context.tsx
  lib/portal-progress.ts
  app/login/page.tsx
  app/portal/page.tsx
  app/portal/[slug]/page.tsx
  middleware.ts
  docs/LEARNING_PORTAL_SANITY_SETUP.md
  docs/LEARNING_PORTAL_SUPABASE_SETUP.md
  docs/LEARNING_PORTAL_IMPLEMENTATION_GUIDE.md
  docs/LEARNING_PORTAL_QUICK_REFERENCE.md (this file)

✏️ UPDATED:
  sanity/sanity.config.ts (added imports)
  sanity/schemas/index.ts (added exports)
  app/css/pages.css (added ~300 lines of styling)
```

## What You Still Need To Do

1. ✏️ Update `.env.local` with Supabase credentials
2. ✏️ Add AuthProvider to `app/layout.tsx`
3. ✏️ Create Supabase tables (SQL migrations)
4. ✏️ Deploy Sanity schemas to learning-portal dataset
5. ✏️ Create sample Module & Lesson in Sanity
6. ✏️ Test login flow end-to-end
7. 🚀 Deploy to production (Vercel/Netlify)

**Estimated time**: 30-45 minutes

## Success Criteria

✓ Can create account at `/login`
✓ Can see dashboard at `/portal` with modules
✓ Can click lesson → see video player
✓ Can click "Mark Complete" → see checkmark appear
✓ Checkmark persists after refresh
✓ Logout redirects to `/login`
✓ Direct access to `/portal` without session redirects to `/login`
