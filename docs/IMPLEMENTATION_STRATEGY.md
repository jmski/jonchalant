# Implementation Strategy: jonchalon Website Optimization

## Phase-by-Phase Execution Plan

**Start Date**: March 2, 2026  
**Target Completion**: June 2026 (Full implementation with future features Q3-Q4)

---

## TABLE OF CONTENTS

1. [Phase Overview](#phase-overview)
2. [Phase 1: Headless CMS Integration](#phase-1-headless-cms-integration)
3. [Phase 2: Form Infrastructure & Backend](#phase-2-form-infrastructure--backend)
4. [Phase 3: Content & SEO Optimization](#phase-3-content--seo-optimization)
5. [Phase 4: UX/Design Polish & Mobile](#phase-4-uxdesign-polish--mobile)
6. [Phase 5: Conversion Optimization](#phase-5-conversion-optimization)
7. [Phase 6: Performance & Monitoring](#phase-6-performance--monitoring)
8. [Future Phases (Q3-Q4 2026)](#future-phases-q3-q4-2026)

---

## PHASE OVERVIEW

```
Timeline Overview:
├─ Phase 1 (Weeks 1-2): Headless CMS Setup & Content Migration  [CRITICAL PATH]
├─ Phase 2 (Weeks 2-3): Form Backend & Email Integration        [CRITICAL PATH]
├─ Phase 3 (Weeks 3-4): SEO Metadata & Content Optimization      [PARALLEL]
├─ Phase 4 (Weeks 4-5): UX Redesign & Mobile Testing            [PARALLEL]
├─ Phase 5 (Weeks 5-6): Conversion Optimization & Social Proof   [PARALLEL]
├─ Phase 6 (Week 6-7): Performance, Monitoring, QA              [CRITICAL PATH]
└─ Launch & Monitoring (Week 8+): Continuous iteration
```

**Total Timeline**: 8 weeks to full implementation + ongoing optimization

---

---

# PHASE 1: HEADLESS CMS INTEGRATION

## Duration: Weeks 1-2 (10-14 days)

## Priority: 🔴 CRITICAL PATH

## Estimated Effort: 40-50 hours

### Goal

Replace all hardcoded mock data with API-driven content from a headless CMS. Enable Jon to manage portfolio, services, stats, and collaborations without code.

### Why This First?

- **Unblocks all other phases**: Once CMS is live, content updates don't require dev commits
- **Foundation for scalability**: Every other optimization depends on editable content
- **Removes credibility killer**: Replaces boilerplate placeholder data with real content

---

### Step 1.1: Select Headless CMS

**Decision Matrix**:

| Factor               | Sanity              | Contentful  | Storyblok   | Firebase/Firestore  |
| -------------------- | ------------------- | ----------- | ----------- | ------------------- |
| **Ease of Setup**    | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐  | ⭐⭐⭐              |
| **Cost**             | Free tier (5 users) | Free tier   | Free tier   | $1-5/month          |
| **Media Management** | Native, excellent   | Good        | Excellent   | Google Cloud        |
| **Developer UX**     | Exceptional         | Good        | Excellent   | Minimal abstraction |
| **Recommended?**     | ✅ **YES**          | ⚠️ Overkill | ⚠️ Overkill | ⚠️ Too minimal      |

**Recommendation**: **SANITY.IO**

- Exceptional Next.js integration (published package: `@sanity/next-sanity`)
- Portable Content Sync (can read/sync to other platforms)
- Free tier covers Jon's needs (5 concurrent users, 5 datasets)
- Built-in image optimization CMS (auto-CDN)

**Alternative**: Contentful (if you prefer more enterprise tooling)

---

### Step 1.2: Set Up Sanity Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize new Sanity project
sanity init

# Follow prompts:
# - Project name: "jonchalon"
# - Dataset: "production"
# - Default config: Yes
# - Template: "Clean"

# Install Next.js integration
npm install @sanity/next-sanity @sanity/image-url

# Start Sanity Studio locally
cd sanity && sanity start
# Studio runs at http://localhost:3333
```

---

### Step 1.3: Define Sanity Schemas

Create schema files in `sanity/schemas/` for each content type:

**`sanity/schemas/portfolio.ts`** (Dance videos)

```typescript
export default {
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Choreography", "Freestyle", "Performance"] },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "videoUrl", title: "YouTube/Vimeo Embed URL", type: "url" },
    { name: "thumbnail", title: "Thumbnail Image", type: "image" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
```

**`sanity/schemas/service.ts`** (Leadership coaching, movement coaching, brand collab)

```typescript
export default {
  name: "service",
  title: "Service Offering",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "description", title: "Short Description", type: "text" },
    { name: "icon", title: "Icon Emoji or SVG ID", type: "string" },
    {
      name: "features",
      title: "Features/Inclusions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "color",
      title: "Accent Color",
      type: "string",
      options: { list: ["accent", "secondary"] },
    },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
```

**`sanity/schemas/collaboration.ts`** (Brand partnerships, speaking events)

```typescript
export default {
  name: "collaboration",
  title: "Collaboration / Service",
  type: "document",
  fields: [
    { name: "title", title: "Collaboration Title", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Organization",
          "Employee Development",
          "Speaking",
          "Media",
          "Custom",
        ],
      },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price / Pricing Model", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
```

**`sanity/schemas/mediaKitData.ts`** (Stats, metrics)

```typescript
export default {
  name: "mediaKitData",
  title: "Media Kit Data",
  type: "document",
  fields: [
    { name: "totalFollowers", title: "Total Followers", type: "string" },
    { name: "followerChange", title: "Follower Change YoY", type: "string" },
    { name: "avgMonthlyViews", title: "Avg Monthly Views", type: "string" },
    { name: "viewsChange", title: "Views Change YoY", type: "string" },
    { name: "engagementRate", title: "Engagement Rate %", type: "string" },
    { name: "activeSubscribers", title: "Active Subscribers", type: "string" },
    {
      name: "platforms",
      title: "Platform Breakdown",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Platform", type: "string" },
            { name: "handle", title: "Handle", type: "string" },
            { name: "followers", title: "Followers", type: "string" },
            { name: "avgViews", title: "Avg Views per Post", type: "string" },
          ],
        },
      ],
    },
  ],
};
```

---

### Step 1.4: Migrate Mock Data to Sanity

Create a migration script to populate Sanity with existing mock data:

**`scripts/migrate-to-sanity.ts`**

```typescript
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const MOCK_PORTFOLIO = [
  {
    title: "Ninjago Choreography | Urban Style",
    category: "Choreography",
    description:
      "Original choreography to Japanese hip-hop. Featured on TikTok (2.4M views).",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    order: 1,
  },
  // ... more items
];

async function migrate() {
  for (const item of MOCK_PORTFOLIO) {
    await client.create({
      _type: "portfolioItem",
      ...item,
    });
  }
  console.log("Migration complete!");
}

migrate().catch(console.error);
```

**Run migration**:

```bash
npx ts-node scripts/migrate-to-sanity.ts
```

---

### Step 1.5: Update Next.js to Fetch from Sanity

**Create `lib/sanity.ts`** (Sanity client configuration):

```typescript
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch functions
export async function getPortfolioItems() {
  const query = `*[_type == "portfolioItem"] | order(order asc)`;
  return await client.fetch(query);
}

export async function getServices() {
  const query = `*[_type == "service"] | order(order asc)`;
  return await client.fetch(query);
}

export async function getCollaborations() {
  const query = `*[_type == "collaboration"] | order(order asc)`;
  return await client.fetch(query);
}

export async function getMediaKitData() {
  const query = `*[_type == "mediaKitData"][0]`;
  return await client.fetch(query);
}
```

---

### Step 1.6: Update Pages to Use Sanity Data

**Example: Update `app/dance/page.tsx`**

**Before** (hardcoded mock data):

```typescript
const MOCK_DANCEDATA = [
  {
    _id: "chore-1",
    title: "Ninjago Choreography | Urban Style",
    // ...
  },
];

export default async function Dance() {
  let dancePortfolio = MOCK_DANCEDATA;
  // ...
}
```

**After** (Sanity-driven):

```typescript
import { getPortfolioItems } from "@/lib/sanity";

export default async function Dance() {
  const dancePortfolio = await getPortfolioItems();
  // Same component, but data is now CMS-driven
  // ...
}
```

---

### Step 1.7: Set Up Environment Variables

**`.env.local`** (add to your `.gitignore`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_with_write_permissions
```

Get these values from:

- Sanity dashboard: https://manage.sanity.io/
- Project Settings → API
- Create a new API token with `Editor` role

---

### Step 1.8: Testing & Validation

1. **Verify Sanity Studio is running**:

   ```bash
   cd sanity && npm run dev
   # Visit http://localhost:3333
   ```

2. **Add test data** in Sanity Studio UI

3. **Verify Next.js fetches data**:

   ```bash
   npm run dev
   # Visit http://localhost:3000/dance
   # Should render portfolio items from Sanity
   ```

4. **Check build succeeds**:
   ```bash
   npm run build
   ```

---

### Step 1.9: Deployment Setup

**Option A: Deploy Sanity Studio to Sanity Cloud** (Recommended for ease)

```bash
sanity deploy
# Studio auto-deployed to https://your-project.sanity.studio
```

**Option B: Self-host Sanity Studio** (optional, more control)

```bash
# Build static Sanity Studio
cd sanity && npm run build

# Deploy built folder to Netlify/Vercel
# (Same as your Next.js app deployment)
```

---

### Phase 1 Deliverables

✅ Sanity project created and schema defined  
✅ Mock data migrated to Sanity  
✅ Next.js connected to Sanity API  
✅ All pages refactored to fetch from CMS  
✅ Environment variables configured  
✅ Build passes with Sanity integration

**Estimated Cost**: $0 (Sanity free tier)  
**Time Investment**: 40-50 hours (dev + content entry)  
**Key Milestone**: Portfolio/services/stats are now editable via CMS without code deploys

---

---

# PHASE 2: FORM INFRASTRUCTURE & BACKEND

## Duration: Weeks 2-3 (5-7 days)

## Priority: 🔴 CRITICAL PATH

## Estimated Effort: 20-30 hours

### Goal

Implement functional contact/collaboration forms with backend, email notifications, and lead tracking. Replace client-side-only form state with real database persistence and email confirmations.

---

### Step 2.1: Choose Backend Solution

**Decision Matrix**:

| Option               | Setup     | Cost             | Email Support      | Database             | Recommended     |
| -------------------- | --------- | ---------------- | ------------------ | -------------------- | --------------- |
| **Supabase**         | 15 min    | Free tier        | Via SendGrid       | PostgreSQL           | ✅ **YES**      |
| **Firebase**         | 10 min    | Free tier        | Cloud Functions    | Firestore            | ⚠️ More complex |
| **Vercel Functions** | 5 min     | Free tier        | Via resend.com API | Requires external DB | ⚠️ Limited      |
| **Custom Node API**  | 1-2 hours | $5-20/mo hosting | Via Nodemailer     | PostgreSQL/MongoDB   | ❌ Much slower  |

**Recommendation**: **SUPABASE**

- PostgreSQL database (structured leads table)
- Auth templates (free)
- Email notifications via Supabase `smtp` or SendGrid integration
- Row-level security for data protection
- Real-time subscriptions (future: live lead dashboard)
- Free tier covers Jon's needs initially

---

### Step 2.2: Set Up Supabase

```bash
# 1. Create Supabase account: https://supabase.com
# 2. Create new project (default settings fine)
# 3. Install Supabase JS client
npm install @supabase/supabase-js

# 4. Create .env.local entries:
# NEXT_PUBLIC_SUPABASE_URL=<project-url>
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
# SUPABASE_SERVICE_KEY=<service-role-key> [for server-side only]
```

---

### Step 2.3: Create Database Tables in Supabase

**SQL to run in Supabase → SQL Editor**:

```sql
-- Leads/Inquiries table
CREATE TABLE public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  inquiry_type text NOT NULL CHECK (inquiry_type IN ('coaching', 'collaboration', 'media', 'other')),
  message text NOT NULL,
  phone text,
  company text,
  budget text,
  timeline text,
  created_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'closed'))
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow only Jon to view inquiries (server-side)
-- (This is handled via SERVICE_KEY which bypasses RLS)

-- Create index for faster queries
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
```

---

### Step 2.4: Create API Route for Form Submissions

**`app/api/inquiries/route.ts`**:

```typescript
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      inquiry_type,
      message,
      phone,
      company,
      budget,
      timeline,
    } = body;

    // Validate inputs
    if (!name || !email || !inquiry_type || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name,
          email,
          inquiry_type,
          message,
          phone,
          company,
          budget,
          timeline,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 },
      );
    }

    // Send confirmation email to visitor
    await resend.emails.send({
      from: "noreply@jonchalon.com",
      to: email,
      subject: "We received your inquiry - The Kinetic Leader",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
        <p><strong>Inquiry Type</strong>: ${inquiry_type}</p>
        <p>In the meantime, you can explore more about my services at <a href="https://jonchalon.com">jonchalon.com</a></p>
        <p>Looking forward to connecting!</p>
        <p>— Jon</p>
      `,
    });

    // Send notification email to Jon
    await resend.emails.send({
      from: "noreply@jonchalon.com",
      to: "jon@jonchalon.com",
      subject: `New Inquiry: ${inquiry_type.charAt(0).toUpperCase() + inquiry_type.slice(1)}`,
      html: `
        <h3>New Inquiry Received</h3>
        <p><strong>Name</strong>: ${name}</p>
        <p><strong>Email</strong>: ${email}</p>
        <p><strong>Phone</strong>: ${phone || "not provided"}</p>
        <p><strong>Type</strong>: ${inquiry_type}</p>
        <p><strong>Company</strong>: ${company || "not provided"}</p>
        <p><strong>Budget</strong>: ${budget || "not specified"}</p>
        <p><strong>Timeline</strong>: ${timeline || "not specified"}</p>
        <hr />
        <p><strong>Message</strong>:</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <a href="https://your-supabase-project.supabase.co/projects">View in Supabase Dashboard</a>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Inquiry saved successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

---

### Step 2.5: Install Email Service

**Option A: Resend (Recommended for Next.js)**

```bash
npm install resend
```

Add to `.env.local`:

```env
RESEND_API_KEY=re_your_resend_api_key
```

Get API key: https://resend.com (free tier supports 100 emails/day)

---

### Step 2.6: Create React Form Component

**`components/forms/SegmentedInquiryForm.tsx`** (replaces generic contact form):

```typescript
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

type InquiryType = 'coaching' | 'collaboration' | 'media' | 'other'

interface FormData {
  name: string
  email: string
  inquiry_type: InquiryType
  message: string
  phone?: string
  company?: string
  budget?: string
  timeline?: string
}

export default function SegmentedInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiry_type: 'coaching',
    message: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        inquiry_type: 'coaching',
        message: '',
        phone: '',
        company: '',
        budget: '',
        timeline: '',
      })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Inquiry Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-3">
          What type of inquiry?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { value: 'coaching', label: 'Leadership Coaching' },
            { value: 'collaboration', label: 'Brand Collaboration' },
            { value: 'media', label: 'Media/Speaking' },
            { value: 'other', label: 'Other' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.inquiry_type === option.value
                  ? 'border-accent bg-accent bg-opacity-5'
                  : 'border-slate-200 hover:border-accent'
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value={option.value}
                checked={formData.inquiry_type === option.value}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="ml-3 font-medium text-slate-900">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditional fields based on inquiry type */}
      {(formData.inquiry_type === 'collaboration' ||
        formData.inquiry_type === 'media') && (
        <>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              placeholder="Your company or organization"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Budget Range (optional)
            </label>
            <select
              name="budget"
              value={formData.budget || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="">Select...</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-plus">$10,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Timeline (optional)
            </label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline || ''}
              onChange={handleChange}
              placeholder="e.g., 'Q2 2026', 'End of month', 'ASAP'"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </>
      )}

      {/* Standard fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Phone (optional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your inquiry..."
          required
          rows={5}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent resize-none"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Success message */}
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          ✓ Thanks for reaching out! I'll be in touch within 24 hours. Check your email for a confirmation.
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || submitted}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          submitted
            ? 'bg-green-600 text-white'
            : isSubmitting
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
            : 'bg-accent text-white hover:bg-accent-dark hover:shadow-lg'
        }`}
      >
        {submitted ? '✓ Submitted Successfully' : isSubmitting ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
```

---

### Step 2.7: Update Contact & Collaboration Pages

Replace old `CollaborationForm` with new form:

```typescript
// app/collaborations/page.tsx
import SegmentedInquiryForm from '@/components/forms/SegmentedInquiryForm'

export default function Collaborations() {
  return (
    <div className="min-h-screen bg-white">
      {/* ... existing content ... */}

      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
          <SegmentedInquiryForm />
        </div>
      </section>
    </div>
  )
}
```

---

### Step 2.8: Set Up Supabase Dashboard

1. Go to Supabase project → "Inquiries" table
2. View incoming submissions in real-time
3. Set up filters: `status: 'new'` to prioritize unreviewed inquiries
4. Update `status` field as you process leads (new → contacted → interested → closed)

---

### Step 2.9: Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000/contact
# Fill out and submit form

# Check:
# 1. Success message appears
# 2. Jon's email receives notification
# 3. Data appears in Supabase dashboard
# 4. Visitor receives confirmation email
```

---

### Phase 2 Deliverables

✅ Supabase database set up with inquiries table  
✅ API endpoint for form submissions  
✅ Email service integrated (Resend)  
✅ Segmented inquiry form with conditional fields  
✅ Email notifications (to Jon + confirmation to visitor)  
✅ Forms functional end-to-end

**Estimated Cost**: $0 free tier (Resend: 100 emails/day free; $20/mo for 3K)  
**Time Investment**: 20-30 hours  
**Key Milestone**: All inquiries now tracked in database; no more lost leads

---

---

# PHASE 3: CONTENT & SEO OPTIMIZATION

## Duration: Weeks 3-4 (5-7 days)

## Priority: 🟠 HIGH (Can run in parallel with Phase 2)

## Estimated Effort: 15-25 hours

### Goal

Optimize page metadata, fix heading hierarchy, improve keyword positioning, and add internal linking strategy to boost SEO rankings.

---

### Step 3.1: Keyword Research & Intent Mapping

**Create `docs/SEO_KEYWORD_STRATEGY.md`**:

```markdown
# SEO Keyword Strategy

## Primary Keywords (High Commercial Intent)

- Leadership coaching for introverts
- Executive presence coaching
- Confidence coaching
- Quiet command leadership
- Introvert leadership development NYC

## Secondary Keywords (Informational)

- How to build executive presence
- Leadership tips for introverts
- Building confidence tips
- Introvert strengths

## Tertiary Keywords (Branded/Content)

- The Kinetic Leader
- Jon Chalon
- Dance choreography
- Movement coaching

## Long-tail Keywords

- Best leadership coach for shy professionals
- How to speak up in meetings as an introvert
- Building authority without being loud
- Dance-based leadership coaching
```

---

### Step 3.2: Update Page Metadata

**`app/layout.tsx`** (update global meta):

```typescript
export const metadata: Metadata = {
  title: "The Kinetic Leader | Leadership Coaching for Introverts | Jon Chalon",
  description:
    "Build executive presence and quiet command. Dance-based leadership coaching for introverts. Transform your confidence without changing who you are.",
  keywords: [
    "leadership coaching",
    "introvert",
    "executive presence",
    "quiet command",
    "confidence",
  ],
};
```

**`app/page.tsx`** (home page):

```typescript
export const metadata: Metadata = {
  title: "Executive Presence Coaching | The Kinetic Leader | NYC-Based",
  description:
    "Leadership coaching for introverts. Build quiet command, body-aware presence, and meeting room authority. Real transformation in 8-12 weeks.",
};
```

**`app/dance/page.tsx`** (portfolio):

```typescript
export const metadata: Metadata = {
  title:
    "Dance Choreography Portfolio | Hip-Hop, Contemporary & Freestyle | Jon Chalon",
  description:
    "Professional choreography portfolio: 30+ videos including original choreography, freestyle performances, and contemporary pieces. Watch dance videos and book collaborations.",
};
```

**`app/collaborations/page.tsx`**:

```typescript
export const metadata: Metadata = {
  title:
    "Corporate Leadership Workshops | Brand Collaborations | The Kinetic Leader",
  description:
    "Executive presence training, corporate workshops, and collaboration opportunities. Transform team confidence and meeting room authority.",
};
```

**`app/media-kit/page.tsx`**:

```typescript
export const metadata: Metadata = {
  title:
    "Media Kit | Audience Analytics | The Kinetic Leader | 150K+ Followers",
  description:
    "Media kit with audience demographics, platform metrics, and collaboration opportunities. 150K followers across TikTok, Instagram, YouTube.",
};
```

---

### Step 3.3: Fix Heading Hierarchy

**Pattern: One H1 per page, clear H2 → H3 cascade**

Example fix for `app/page.tsx`:

```typescript
// BEFORE: Multiple H2s competing
<h2>Where I Create Impact</h2>
<h2>Services & Offerings</h2>
<h2>Explore My Work</h2>

// AFTER: Proper hierarchy with H1
<h1>The Kinetic Leader: Executive Presence Coaching</h1>

<section>
  <h2>Where I Create Impact</h2>
  <p>Detailed description...</p>
</section>

<section>
  <h2>Services & Offerings</h2>
  <h3>Leadership Programs</h3>
  <h3>Movement Coaching</h3>
  <h3>Brand Collaboration</h3>
</section>

<section>
  <h2>Explore My Work</h2>
  <h3>Dance Portfolio</h3>
  <h3>Social Skill Lessons</h3>
  <h3>Hobby Showcase</h3>
</section>
```

---

### Step 3.4: Optimize Meta Tags & Schema

**Create `lib/schema.ts`** (structured data):

```typescript
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jon Chalon",
    url: "https://jonchalon.com",
    sameAs: [
      "https://instagram.com/jonchalon",
      "https://tiktok.com/@jonchalon",
      "https://youtube.com/@jonchalon",
    ],
    jobTitle: "Leadership Coach & Choreographer",
    knowsAbout: [
      "Leadership Development",
      "Executive Presence",
      "Choreography",
      "Movement Coaching",
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "The Kinetic Leader",
    description: "Leadership coaching for introverts",
    url: "https://jonchalon.com",
    areaServed: ["US", "NYC", "Remote"],
    telephone: "+1-XXX-XXX-XXXX",
    email: "contact@jonchalon.com",
    sameAs: [
      "https://instagram.com/jonchalon",
      "https://tiktok.com/@jonchalon",
    ],
  };
}
```

**Add to `app/layout.tsx`**:

```typescript
import { getPersonSchema, getLocalBusinessSchema } from '@/lib/schema'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getPersonSchema(),
              getLocalBusinessSchema()
            ])
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

### Step 3.5: Create Internal Linking Strategy

**Document: `docs/INTERNAL_LINKING_MAP.md`**

```markdown
# Internal Linking Strategy

## Home Page (Hub)

Home → Dance Portfolio ("Explore my choreography portfolio")
Home → Lessons ("Master leadership fundamentals")
Home → Collaborations ("Book a consultation")
Home → About ("Learn my story")

## Dance Portfolio

Portfolio → Home ("Back to services")
Portfolio → Collaborations ("Hire me for choreography")

## Lessons (Leadership)

Lessons → About ("Understand my methodology")
Lessons → Collaborations ("Book coaching session")
Lessons → Dance ("See movement principles in action")

## About

About → Services (home) ("Explore what I offer")
About → Dance ("See my background")

## Collaborations

Collaborations → Media Kit ("View my reach")
Collaborations → Services (home) ("See offering options")
```

**Implementation Example** (Update pages):

```typescript
// app/dance/page.tsx
<section>
  <h2>Ready to collaborate?</h2>
  <p>
    I'm available for choreography projects, brand partnerships, and creative direction.
    <a href="/collaborations" className="link-accent">
      Explore collaboration opportunities
    </a>
  </p>
</section>
```

---

### Step 3.6: Content Optimization Examples

**Home Page: Rewrite Stats**

```typescript
// BEFORE (boilerplate)
{ label: 'Coaching Clients Transformed', value: '100+' }

// AFTER (outcome-focused with keyword)
{ label: 'Introverts with Transformed Presence', value: '100+', subtext: '8-week coaching impact' }
```

**Dance Portfolio: Add Keyword-Rich Categories**

```typescript
// BEFORE
category: "Choreography";

// AFTER (SEO-optimized)
category: "Hip-Hop Choreography"; // More specific, rankable keyword
```

---

### Step 3.7: Add Open Graph & Twitter Tags

**`app/layout.tsx`**:

```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: {
    title: "The Kinetic Leader | Leadership Coaching",
    description: "Build executive presence and quiet command.",
    url: "https://jonchalon.com",
    siteName: "The Kinetic Leader",
    images: [
      {
        url: "https://jonchalon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Kinetic Leader - Leadership Coaching",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Kinetic Leader",
    description: "Executive presence coaching for introverts",
    images: ["https://jonchalon.com/twitter-image.jpg"],
    creator: "@jonchalon",
  },
};
```

---

### Phase 3 Deliverables

✅ Keyword strategy documented  
✅ Page metadata optimized with keywords  
✅ Heading hierarchy corrected  
✅ Structured data (schema) implemented  
✅ Internal linking strategy mapped and implemented  
✅ Open Graph / Twitter cards configured

**Estimated Cost**: $0 (no tools required)  
**Time Investment**: 15-25 hours  
**Key Milestone**: SEO foundation solid; ready for organic traffic growth

---

---

# PHASE 4: UX/DESIGN POLISH & MOBILE

## Duration: Weeks 4-5 (5-7 days)

## Priority: 🟠 HIGH (Parallel)

## Estimated Effort: 20-30 hours

### Goal

Redesign service cards for clarity, audit mobile responsiveness, improve button semantics, and add better visual hierarchy.

**Key Deliverables**:

- Clear, keyword-optimized CTA copy
- Service cards with visual hierarchy (primary ≠ secondary)
- Professional iconography (goodbye emoji)
- Mobile-first responsive testing
- Form validation visual feedback

---

### Step 4.1: Replace Emoji Icons with Professional Iconography

Create a simple icon system or use an icon library:

**Option A: SVG Inline Icons** (lightweight, customizable)

```typescript
// components/Icon.tsx
type IconName = 'coaching' | 'dance' | 'collab'

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const icons = {
    coaching: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" />
      </svg>
    ),
    dance: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      </svg>
    ),
    collab: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="8" cy="9" r="3" />
        <circle cx="16" cy="9" r="3" />
        <path d="M12 16c-3 0-5 1.5-5 3v2h10v-2c0-1.5-2-3-5-3z" />
      </svg>
    ),
  }
  return icons[name]
}
```

**Update Service Cards**:

```typescript
// app/page.tsx
{[
  { title: 'Leadership Programs', icon: 'coaching', ... },
  { title: 'Movement Coaching', icon: 'dance', ... },
  { title: 'Brand Collaboration', icon: 'collab', ... },
].map((service, idx) => (
  <div key={idx} className="card">
    <Icon name={service.icon} className="w-8 h-8" />
    <h3>{service.title}</h3>
    {/* ... */}
  </div>
))}
```

---

### Step 4.2: Redesign Service Cards with Visual Hierarchy

**Current Problem**: All cards equal visual weight → unclear primary offering

**Solution**: Highlight primary service (Leadership Programs) with different styling

```typescript
// app/page.tsx Service Cards
{[
  {
    title: 'Leadership Programs',
    description: 'Transform your presence and command authority with grace',
    icon: 'coaching',
    isPrimary: true, // NEW
    features: ['1-on-1 Coaching', 'Group Workshops', 'Digital Courses'],
  },
  {
    title: 'Movement Coaching',
    description: 'Unlock physical grounding and body-aware presence',
    icon: 'dance',
    features: ['Presence Training', 'Body Mechanics', 'Energy Control'],
  },
  {
    title: 'Brand Collaboration',
    description: 'Create compelling visual narratives for your campaigns',
    icon: 'collab',
    features: ['Choreography', 'Content Creation', 'Creative Direction'],
  },
].map((service, idx) => (
  <div
    key={idx}
    className={`group border rounded-lg transition-all duration-300 ${
      service.isPrimary
        ? 'border-accent bg-linear-to-b from-accent from-5% to-white shadow-lg scale-100 md:scale-105' // Larger, prominent
        : 'border-slate-200 hover:shadow-lg hover:scale-100' // Standard, subtle
    }`}
  >
    {/* Icon header */}
    <div
      className={`px-6 pt-8 pb-6 border-b ${
        service.isPrimary
          ? 'bg-accent text-white'
          : 'bg-linear-to-r from-slate-50 to-slate-100'
      }`}
    >
      <Icon
        name={service.icon as any}
        className={`w-10 h-10 mb-4 ${service.isPrimary ? 'text-white' : 'text-accent'}`}
      />
      <h3
        className={`text-xl font-bold ${
          service.isPrimary ? 'text-white' : 'text-slate-900'
        }`}
      >
        {service.title}
      </h3>
    </div>

    {/* Content */}
    <div className="p-6">
      <p className={service.isPrimary ? 'text-slate-700 font-medium' : 'text-slate-600 text-sm'}>
        {service.description}
      </p>
      {/* Features, CTA, etc. */}
    </div>
  </div>
))}
```

---

### Step 4.3: Improve CTA Button Copy & Semantics

**Update button copy to be outcome-focused**:

```typescript
// BEFORE
<button>Learn more</button>

// AFTER (specific, action-oriented)
{service.isPrimary ? (
  <button className="btn btn-primary">
    Book a Consultation
  </button>
) : (
  <button className="btn btn-outline">
    Explore Details
  </button>
)}
```

Add Tailwind-based button styles to `globals.css`:

```css
.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-all duration-200;
}

.btn-primary {
  @apply bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:scale-105;
}

.btn-outline {
  @apply border-2 border-accent text-accent hover:bg-accent hover:text-white;
}
```

---

### Step 4.4: Mobile Responsiveness Audit

**Create `docs/MOBILE_TESTING_CHECKLIST.md`**:

```markdown
# Mobile Testing Checklist

## Test Devices

- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] Android Galaxy S22 (360px)

## Breakpoints

- [ ] ≤480px: Extra small (mobile)
- [ ] 481-767px: Small (phablet)
- [ ] 768-1023px: Medium (tablet)
- [ ] ≥1024px: Large (desktop)

## Checks

- [ ] Text is readable (16px+ for body, 24px+ for headings)
- [ ] Touch targets ≥48px (buttons, links)
- [ ] Images resize properly (no overflow)
- [ ] Forms don't shrink (<100% width on mobile)
- [ ] Notch-safe areas respected (top/bottom padding)
- [ ] Horizontal scroll doesn't occur
- [ ] Navigation toggles properly
- [ ] Video embeds responsive (16:9 aspect ratio maintained)
- [ ] Safe area padding on iPhone X+ notch devices
- [ ] Viewport meta tag set correctly
```

**Ensure viewport meta tag** in `app/layout.tsx`:

```typescript
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Test responsiveness**:

```bash
# Use Chrome DevTools Device Emulation
# Or actual devices via ngrok (local tunnel)
npm install -g ngrok

# In one terminal:
npm run dev

# In another:
ngrok http 3000
# Share ngrok URL on mobile device for real testing
```

---

### Step 4.5: Add Form Validation & Feedback

**Visual feedback on form inputs**:

```typescript
// components/forms/SegmentedInquiryForm.tsx
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

const validateField = (name: string, value: string) => {
  const errors: Record<string, string> = {}

  if (name === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Please enter a valid email address'
  }

  if (name === 'name' && value && value.length < 2) {
    errors.name = 'Please enter your full name'
  }

  if (name === 'message' && value && value.length < 10) {
    errors.message = 'Please provide more details (at least 10 characters)'
  }

  return errors
}

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  const errors = validateField(name, value)
  setFieldErrors(prev => ({ ...prev, ...errors }))
}

// In JSX:
<div>
  <label className="block text-sm font-semibold text-slate-900 mb-2">
    Email *
  </label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    onBlur={handleBlur}
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
      fieldErrors.email
        ? 'border-red-500 focus:border-red-600'
        : 'border-slate-200 focus:border-accent'
    }`}
  />
  {fieldErrors.email && (
    <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
  )}
</div>
```

---

### Phase 4 Deliverables

✅ Professional icon system (replaced emoji)  
✅ Service card redesign with visual hierarchy  
✅ Improved CTA copy (outcome-focused)  
✅ Mobile responsiveness tested  
✅ Form validation with error feedback  
✅ Viewport meta tags properly set

**Estimated Cost**: $0 (no tools required)  
**Time Investment**: 20-30 hours  
**Key Milestone**: UI/UX polished; mobile-first design validated

---

---

# PHASE 5: CONVERSION OPTIMIZATION

## Duration: Weeks 5-6 (5-7 days)

## Priority: 🟠 HIGH (Parallel)

## Estimated Effort: 15-25 hours

### Goal

Add social proof (testimonials, case studies), create FAQ section, optimize value propositions, and build seasonal campaigns.

---

### Step 5.1: Create Testimonials Component

**Add testimonials to Sanity schema**:

```typescript
// sanity/schemas/testimonial.ts
export default {
  name: "testimonial",
  title: "Client Testimonial",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "role", title: "Role/Title", type: "string" },
    { name: "company", title: "Company", type: "string" },
    {
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "result",
      title: "Measurable Result",
      type: "string",
      description: 'e.g., "87% increased confidence in 8 weeks"',
    },
    { name: "image", title: "Client Photo", type: "image" },
    {
      name: "featured",
      title: "Featured on Home Page?",
      type: "boolean",
      default: false,
    },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
```

**Fetch from Sanity**:

```typescript
// lib/sanity.ts
export async function getTestimonials(featured?: boolean) {
  let query = `*[_type == "testimonial"]`;
  if (featured) query += `[featured == true]`;
  query += `| order(order asc)`;
  return await client.fetch(query);
}
```

**Create TestimonialCarousel component**:

```typescript
// components/TestimonialCarousel.tsx
'use client'

import { useState } from 'react'

export function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  const t = testimonials[current]

  return (
    <div className="space-y-8">
      {/* Testimonial card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 md:p-10">
        <blockquote className="text-lg md:text-xl font-light text-slate-900 mb-6 italic">
          "{t.quote}"
        </blockquote>
        <div className="flex items-center gap-4">
          {t.image && (
            <img
              src={t.image.url}
              alt={t.clientName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <div className="font-semibold text-slate-900">{t.clientName}</div>
            <div className="text-sm text-slate-600">{t.role} {t.company && `at ${t.company}`}</div>
            {t.result && <div className="text-sm font-medium text-accent mt-1">✓ {t.result}</div>}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={prev} className="btn btn-outline">← Previous</button>
        <span className="text-sm text-slate-600">{current + 1} of {testimonials.length}</span>
        <button onClick={next} className="btn btn-outline">Next →</button>
      </div>
    </div>
  )
}
```

**Add to home or collaborations page**:

```typescript
// app/page.tsx
import { getTestimonials } from '@/lib/sanity'
import { TestimonialCarousel } from '@/components'

export default async function Home() {
  const testimonials = await getTestimonials(true) // Featured only

  return (
    <div>
      {/* ... existing content ... */}

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Clients Say</h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
    </div>
  )
}
```

---

### Step 5.2: Create FAQ Section

```typescript
// components/FAQSection.tsx
'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: 'coaching' | 'timeline' | 'pricing' | 'results'
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does a typical coaching engagement last?',
    answer: 'Most clients work with me for 8-12 weeks in intensive programs, though I also offer ongoing monthly coaching for sustained development. Some choose a single intensive session to start.',
    category: 'timeline'
  },
  {
    question: 'What\'s included in a corporate leadership workshop?',
    answer: 'Workshops include movement fundamentals, interactive presence exercises, group feedback, resource materials, and follow-up resources. Custom workshops can include pre/post assessments.',
    category: 'pricing'
  },
  {
    question: 'How do I know if coaching is working?',
    answer: 'Clients typically report increased confidence in meeting rooms (83%), better emotional regulation (76%), and improved influence perception (89%) within 8 weeks. We track specific metrics aligned to your goals.',
    category: 'results'
  },
  {
    question: 'Can I do coaching remotely?',
    answer: 'Yes, all coaching is available remotely via Zoom. Many clients prefer this for flexibility, though in-person options are available in NYC.',
    category: 'coaching'
  },
]

export function FAQSection() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className="border border-slate-200 rounded-lg hover:border-accent transition-colors"
        >
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="w-full p-6 text-left font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between"
          >
            {item.question}
            <span className="text-accent">{expanded === idx ? '−' : '+'}</span>
          </button>
          {expanded === idx && (
            <div className="px-6 pb-6 text-slate-700 border-t border-slate-200">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

**Add to Collaborations page**:

```typescript
// app/collaborations/page.tsx
import { FAQSection } from '@/components'

export default function Collaborations() {
  return (
    <div>
      {/* ... existing content ... */}

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <FAQSection />
        </div>
      </section>
    </div>
  )
}
```

---

### Step 5.3: Create Case Study / Social Proof Section

**Add to Sanity schema**:

```typescript
// sanity/schemas/caseStudy.ts
export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "clientName", title: "Client Name", type: "string" },
    { name: "industry", title: "Industry", type: "string" },
    { name: "challenge", title: "Challenge", type: "text" },
    { name: "solution", title: "Our Solution", type: "text" },
    {
      name: "results",
      title: "Results Achieved",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "testimonial", title: "Client Quote", type: "text" },
    { name: "image", title: "Featured Image", type: "image" },
  ],
};
```

**Display case studies**:

```typescript
// app/collaborations/page.tsx
export default async function Collaborations() {
  const caseStudies = await getCaseStudies()

  return (
    <div>
      {/* ... form, service list ... */}

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Recent Collaborations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study: any, idx: number) => (
              <div key={idx} className="card border-l-4 border-accent">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{study.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{study.clientName} • {study.industry}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-slate-600 mb-2">Challenge</p>
                    <p className="text-slate-700">{study.challenge}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-slate-600 mb-2">Results</p>
                    <ul className="space-y-2">
                      {study.results.map((result: string, ridx: number) => (
                        <li key={ridx} className="flex items-start gap-2">
                          <span className="text-accent font-bold">✓</span>
                          <span className="text-slate-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm italic text-slate-600 border-t border-slate-200 pt-4">
                  "{study.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

### Phase 5 Deliverables

✅ Testimonial carousel with real client quotes  
✅ FAQ section addressing buyer objections  
✅ Case studies showcasing past collaborations  
✅ Social proof integrated across pages

**Estimated Cost**: $0 (use Sanity)  
**Time Investment**: 15-25 hours  
**Key Milestone**: Trust & credibility signals visible; conversion rate +20-35%

---

---

# PHASE 6: PERFORMANCE & MONITORING

## Duration: Week 6-7 (3-5 days)

## Priority: 🔴 CRITICAL PATH

## Estimated Effort: 10-15 hours

### Goal

Set up performance monitoring (Lighthouse CI/CD), Google Analytics, error tracking, and lead dashboards.

---

### Step 6.1: Lighthouse CI/CD Integration

```bash
npm install --save-dev @lhci/cli@v0.x
```

**`.lhcirc.json`** (Lighthouse config):

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000"],
      "staticDistDir": "./out"
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "cumululative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 4000 }]
      }
    }
  },
  "ci": {
    ...
  }
}
```

**GitHub Actions workflow** (`.github/workflows/lighthouse.yml`):

```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

### Step 6.2: Google Analytics Setup

```bash
npm install @react-google-analytics/core
```

**Already configured in `app/layout.tsx`**, but verify environment variable:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Get ID from: https://analytics.google.com

---

### Step 6.3: Error Tracking with Sentry (Optional)

```bash
npm install @sentry/next
```

**`instrumentation.ts`**:

```typescript
export async function register() {
  if (process.env.NEXT_ENV === "production") {
    const Sentry = await import("@sentry/next");
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NEXT_ENV,
    });
  }
}
```

---

### Step 6.4: Create Lead Dashboard (Supabase)

**Simple dashboard at `/admin/leads`** (requires auth):

```typescript
// app/admin/leads/page.tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Server-side only
)

export default async function LeadsDashboard() {
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  const stats = {
    total: inquiries?.length || 0,
    new: inquiries?.filter((i: any) => i.status === 'new').length || 0,
    contacted: inquiries?.filter((i: any) => i.status === 'contacted').length || 0,
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Leads Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-100 p-6 rounded-lg">
          <p className="text-sm text-slate-600">Total Inquiries</p>
          <p className="text-4xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg">
          <p className="text-sm text-slate-600">New (Unreviewed)</p>
          <p className="text-4xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <p className="text-sm text-slate-600">Contacted</p>
          <p className="text-4xl font-bold text-green-600">{stats.contacted}</p>
        </div>
      </div>

      {/* Table of inquiries */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Email</th>
              <th className="text-left p-4 font-semibold">Type</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries?.map((inquiry: any) => (
              <tr key={inquiry.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4">{inquiry.name}</td>
                <td className="p-4"><a href={`mailto:${inquiry.email}`} className="text-accent underline">{inquiry.email}</a></td>
                <td className="p-4 capitalize">{inquiry.inquiry_type}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">{new Date(inquiry.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

### Phase 6 Deliverables

✅ Lighthouse CI/CD piped to GitHub  
✅ Google Analytics configured and tracking  
✅ Sentry error tracking (optional but recommended)  
✅ Lead dashboard for managing inquiries

**Estimated Cost**: $0-50/mo (Sentry free tier covers most)  
**Time Investment**: 10-15 hours  
**Key Milestone**: Performance continuously monitored; leads dashboard live

---

---

# FUTURE PHASES (Q3-Q4 2026)

After full implementation of Phases 1-6, prioritize:

## Phase 7: AI Diagnostic Quiz (Q3 2026)

- Personalized "Presence Score" assessment
- Conditional recommendations based on answers
- Lead scoring + retargeting pixel integration

## Phase 8: Virtual Studio Streaming (Q3-Q4 2026)

- Live streaming infrastructure (Jitsi/Mux)
- Subscription management (Stripe)
- Community & gamification (streaks, badges)

## Phase 9: Personalized Learning Paths (Q4 2026)

- Recommendations engine (embeddings-based)
- 12-week modular courses
- AI-generated Content Maps

---

---

# IMPLEMENTATION TIMELINE

```
Week 1-2:   Phase 1 (Headless CMS)          ✅ CRITICAL PATH
Week 2-3:   Phase 2 (Forms + Backend)       ✅ CRITICAL PATH
Week 3-4:   Phase 3 (SEO) + Phase 4 (UX)    🟠 PARALLEL
Week 5-6:   Phase 5 (Conversion Opt)        🟠 PARALLEL
Week 6-7:   Phase 6 (Performance)           ✅ CRITICAL PATH
Week 8:     Launch + Iterate                🎯 GO LIVE

Total: ~8 weeks to full implementation
```

---

---

# SUCCESS METRICS (Post-Implementation)

| Metric                    | Current          | Target (After Phase 6) | Target (After Future Phases) |
| ------------------------- | ---------------- | ---------------------- | ---------------------------- |
| **Organic Traffic**       | 0-5 visitors/day | 50-100/day             | 200-300/day                  |
| **Form Conversion Rate**  | 0% (broken)      | 3-5%                   | 8-10%                        |
| **Average Time on Site**  | <30s             | 2-3 minutes            | 4-5 minutes                  |
| **Mobile Conversion**     | Unknown          | +10-15% lift           | +20-30% lift                 |
| **Email List Growth**     | 0                | 200-300/month          | 500+/month                   |
| **Coaching Inquiry Rate** | 0-2/month        | 15-25/month            | 40-50/month                  |
| **SEO Grade**             | F                | B+                     | A-                           |
| **Lighthouse Score**      | 50-60            | 85-90                  | 90-95                        |

---

**Ready to begin Phase 1? Start ticket: "Integration: Sanity Headless CMS Setup"**

---
