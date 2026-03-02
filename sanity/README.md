# Sanity Setup Guide

## Initial Setup Instructions

This Sanity Studio integration allows Jon to manage all portfolio, services, collaborations, testimonials, and media kit data through a user-friendly CMS interface.

### Step 1: Create a Sanity Project

1. Visit https://sanity.io and sign up (or use existing Google account)
2. Create a new project:
   - **Project Name**: jonchalon
   - **Dataset Name**: production
   - **Plan**: Free tier works fine initially
3. Note your **Project ID** from the project settings

### Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id-from-step-1>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=<generated-below>
   ```

3. Generate an API token:
   - Go to https://manage.sanity.io/
   - Select your project
   - Go to **Settings → API**
   - Create a new token with **Editor** role
   - Copy and paste into `.env.local`

### Step 3: Start Sanity Studio

```bash
npm run sanity:dev
```

Studio will open at http://localhost:3333

### Step 4: Migrate Initial Data

Once Sanity Studio is running and configured:

```bash
npm run migrate:data
```

This will populate Sanity with the initial portfolio, services, and colaboration data.

### Step 5: Add Real Content

1. Visit http://localhost:3333
2. Click on "Portfolio Item", "Service", "Collaboration", etc.
3. Upload real images, update video URLs, add testimonials
4. Changes are published immediately

## Development Commands

```bash
# Start Sanity Studio (localhost:3333)
npm run sanity:dev

# Start Next.js dev server (localhost:3000)
npm run dev

# Deploy Sanity Studio to Sanity Cloud
npm run sanity:deploy

# Run data migration script
npm run migrate:data
```

## Content Models

### Portfolio Item

- Title, slug, category (choreography/freestyle/performance)
- Description, video URL, thumbnail image
- Duration in minutes, published date

### Service

- Title, description, icon, features list
- Full description (rich text)
- isPrimary flag (highlights Leadership Programs)
- Color and display order

### Collaboration

- Title, category, description
- Price/pricing model
- Deliverables list, timeline in weeks

### Media Kit Data

- Total followers, engagement rate, monthly views
- Platform breakdown (TikTok, Instagram, YouTube)
- Content category distribution

### Testimonial

- Client name, role, company
- Quote, measurable result
- Client photo, featured flag

### Case Study

- Client name, industry, challenge, solution
- Results list, client testimonial
- Featured image, display order

## Troubleshooting

**"Missing NEXT_PUBLIC_SANITY_PROJECT_ID"**

- Check `.env.local` is created and has correct values
- Restart dev server: `npm run dev`

**"Failed to fetch portfolio from Sanity"**

- Check Sanity Studio is running: `npm run sanity:dev`
- Verify API token in `.env.local`
- Check Project ID is correct

**"Can't see images in Sanity Studio"**

- Images upload to Sanity's CDN automatically
- Make sure images are under 5MB
- Try a different image format (JPG, PNG)

## Next Steps

After Phase 1 is complete:

- **Phase 2**: Add form backend (Supabase + Resend email)
- **Phase 3**: SEO optimization (metadata, headings, schema)
- **Phase 4**: UX redesign (mobile testing, visual hierarchy)
- **Phase 5**: Conversion optimization (testimonials, FAQ, social proof)
- **Phase 6**: Performance monitoring (Lighthouse CI/CD, analytics)

---

Questions? See [IMPLEMENTATION_STRATEGY.md](../docs/IMPLEMENTATION_STRATEGY.md) for details.
