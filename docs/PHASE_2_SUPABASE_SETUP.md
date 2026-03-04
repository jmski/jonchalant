# Phase 2: Supabase Database Setup Guide

## Quick Start: 5 Minutes

### 1. Create Supabase Account & Project

1. Go to https://supabase.com
2. Sign up (use Google, GitHub, or email)
3. Create a new project:
   - **Name**: jonchalon
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier (perfect for Phase 2)
4. Wait for project provisioning (~2 minutes)

### 2. Get API Keys

Once project is created:

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_KEY`

⚠️ **IMPORTANT**: `SUPABASE_SERVICE_KEY` is like a password—never expose in client-side code. Only use on server/API routes.

### 3. Create Database Table

Go to **SQL Editor** (left sidebar) and paste this SQL:

```sql
-- Create inquiries table for lead tracking
CREATE TABLE IF NOT EXISTS public.inquiries (
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
  updated_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'closed'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow only authenticated users (Jon) to SELECT/UPDATE
CREATE POLICY "Authenticated users can select all" ON public.inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON public.inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_email ON public.inquiries(email);
```

Click **Run** button to execute. You should see:

- ✅ Table `public.inquiries` created
- ✅ RLS enabled
- ✅ Policies created
- ✅ Indexes created

### 4. Verify Table Creation

1. Go to **Table Editor** (left sidebar)
2. Click **public.inquiries**
3. You should see columns: `id`, `name`, `email`, `inquiry_type`, `message`, `phone`, `company`, `budget`, `timeline`, `created_at`, `updated_at`, `status`

### 5. (Optional) Add Authentication for Jon's Dashboard

If you want Jon to view inquiries via Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Click **Invite a user**
3. Enter your email (or jon@jonchalon.com)
4. Complete signup link sent to email

---

## Next Steps

Once Supabase is set up:

1. Fill in `.env.local` with your API keys
2. Next.js API route: `app/api/inquiries/route.ts` uses these automatically
3. Contact form component will submit to this API

Test with:

```bash
npm run dev
# Visit http://localhost:3000/contact
# Submit a test form
# Check Supabase → Table Editor → inquiries for new row
```

---

## Troubleshooting

**Table doesn't appear?**

- Check SQL Editor output for errors
- Try running SQL again (should be idempotent)
- Clear browser cache and refresh

**Submissions not appearing?**

- Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check browser console for fetch errors
- Check server logs: `npm run dev` terminal output

**"403 Forbidden" error?**

- RLS policy might be too restrictive
- Ensure INSERT policy allows anonymous: `WITH CHECK (true)`

---

## What Each Policy Does

| Policy                    | Allows                        | Used By            |
| ------------------------- | ----------------------------- | ------------------ |
| `Allow anonymous inserts` | Anyone can submit forms       | Form submissions   |
| `Authenticated select`    | Jon can view all inquiries    | Dashboard (future) |
| `Authenticated update`    | Jon can update inquiry status | Dashboard (future) |

---

## Cost & Limits (Free Tier)

- **Database size**: 500 MB
- **API requests**: Unlimited (rate limited)
- **Concurrent connections**: 100
- **Storage**: 1 GB for usage
- **Cost**: **$0** ✅

Plenty of capacity for Phase 2 launch. Scale to paid plan only when needed.

---

See `.env.local.example` for all required environment variables.
