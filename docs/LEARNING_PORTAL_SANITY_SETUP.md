# Learning Portal - Sanity Schema Setup Guide

## What We've Created

### 1. **Module** Schema (`module.ts`)
Container for lessons within the learning portal.

**Fields:**
- `title` (string, required): Module name (e.g., "Foundation: Physical Grounding")
- `slug` (slug, auto-generated from title): URL-friendly identifier
- `description` (text): Brief overview of the module
- `order` (number): Display order in the portal (lower numbers first)
- `icon` (string): Emoji representation (e.g., 🎯)
- `lessons` (array of references): Links to PortalLesson documents
- `createdAt` (datetime): Timestamp

### 2. **PortalLesson** Schema (`portalLesson.ts`)
Individual lessons within a module - the core curriculum unit.

**Key Fields:**
- `title` (string, required): Lesson title
- `slug` (slug): URL-friendly identifier for `[slug]` route
- `technicalDescription` (text, required): Detailed technical explanation
- `videoId` (string, required): YouTube video ID (11 chars, e.g., "dQw4w9WgXcQ")
- `socialLogic` (text, required): Dance-to-social parallel explanation
- `technicalNotes` (array): Structured notes for the multi-column grid beneath video
  - `column` (1-3): Grid column number
  - `label` (string): Note title (e.g., "Breathing Pattern")
  - `content` (text): Detailed explanation
- `duration` (number): Video length in minutes
- `order` (number): Display order within module
- `difficulty` (string): beginner | intermediate | advanced
- `module` (reference): Link to parent Module
- `publishedAt` (datetime): Publication timestamp
- `updatedAt` (datetime): Last update timestamp

## Setup Instructions

### Step 1: Create New Dataset in Sanity
1. Go to [sanity.io/manage](https://sanity.io/manage) → Your Project
2. Click **Datasets** in the sidebar
3. Click **+ Create dataset**
4. Name it: `learning-portal`
5. Clone from dataset: `production` (optional, to copy any shared reference types)
6. Click **Create**

### Step 2: Environment Configuration
Update your `.env.local` file to support both datasets:

```bash
# Primary production dataset for main site
NEXT_PUBLIC_SANITY_PROJECT_ID=f0611nfi
NEXT_PUBLIC_SANITY_DATASET=production

# Learning portal uses the same project but different dataset
NEXT_PUBLIC_SANITY_PORTAL_DATASET=learning-portal
SANITY_API_TOKEN=YOUR_SANITY_API_TOKEN
```

### Step 3: Deploy Schemas to Learning Portal Dataset
The schemas are now added to your Sanity config. To deploy them to the `learning-portal` dataset:

**Option A: Via Sanity CLI**
```bash
cd sanity
SANITY_DATASET=learning-portal npx sanity schema deploy
```

**Option B: Via Sanity Studio**
1. Start Sanity Studio: `npm run sanity:dev`
2. Go to Vision in Studio
3. Run mutation to create documents (below)

### Step 4: Create Sample Data
Create at least one Module and one PortalLesson in Sanity Studio to test:

1. **Create Module:**
   - Title: "Foundation: Physical Grounding"
   - Order: 1
   - Icon: 🎯
   - Description: "Master the fundamental stance and breathing patterns"

2. **Create PortalLesson:**
   - Title: "The Grounding Stance: Building Kinetic Confidence"
   - VideoId: Use any public YouTube video ID (e.g., "dQw4w9WgXcQ")
   - TechnicalDescription: Detailed explanation
   - SocialLogic: How this applies to presence
   - Duration: 8
   - Difficulty: beginner
   - Module: (Reference the Module you created)
   - TechnicalNotes: Add 1-2 sample notes

## Schema Relationships

```
Module (1) ──┬── has many ─► PortalLesson (many)
             │
             └── displayed in ─► /portal dashboard
                                /portal/[lesson-slug] page
```

## Preview in Sanity Studio

Once deployed, you'll see:
- **Content** → **Module**: Creates new modules
- **Content** → **Portal Lesson**: Creates new lessons

Each has a preview showing title and metadata (difficulty, duration, order).

## Next Steps

1. ✅ Schemas created
2. ⏳ Create learning-portal dataset in Sanity
3. ⏳ Supabase auth setup
4. ⏳ Protected routes in Next.js
5. ⏳ Dashboard and video player UI
