# Phase 1 — Site Polish & Conversion Foundation

**Date:** March 10, 2026  
**Status:** Complete ✅

---

## Overview

Phase 1 focused on three categories of work: data quality (Sanity CMS), site infrastructure (links, navigation), and conversion optimisation (hero CTA, homepage focus, fonts, motion, lead capture).

---

## Changes

### 1. Sanity Testimonials — Identity Cleanup

**Files:** Sanity dataset (projectId: `f0611nfi`, dataset: `production`)

- Renamed duplicate "Sarah Chen" → **Priya Anand**, VP of Sales, Ascend Technology Group
- Renamed duplicate "Marcus Thompson" → **Thomas Nakamura**, COO, Atlas Manufacturing Group
- Replaced generic company names: TechCorp Industries, Global Solutions LLC, Tech Innovations Corp, Creative Collective NYC → realistic corporate names
- Published all 5 testimonial documents

⚠️ **Remaining:** Two testimonials share an "87%" result stat — vary one manually in Sanity.

---

### 2. Link Audit — Dead/Broken Hrefs

**Files:** `components/utilities/cards/LessonCard.tsx`, `components/sections/lessons/LessonCategory.tsx`, `components/shared/case-studies/CaseStudies.tsx`, `app/admin/inquiries/page.tsx` (created), `components/navigation/Navbar.tsx`

- `LessonCard` `href="#"` → `/portal/${slug}` (slug threaded from `LessonCategory`)
- Created `/admin/inquiries/page.tsx` placeholder (nav linked to a 404)
- Removed `Link` wrapper + dead "Read Full Case Study" CTA from `CaseStudies.tsx` — target route `/case-studies/[slug]` does not exist
- Fixed duplicate `key={link.href}` on mobile nav items → `key={link.label || linkIdx}`

⚠️ **Check:** Confirm `/portal/[slug]` routes exist for all lesson slugs in Sanity.

---

### 3. Navbar Dropdown — Scroll-to-Top Bug Fix

**Files:** `components/navigation/Navbar.tsx`

- Converted "Coaching" and "Media" desktop dropdown triggers from `<Link href="#">` to `<button>` elements
- Added `aria-expanded`, `aria-haspopup` for accessibility
- Active state now checks if any child route matches current pathname
- Mobile nav key: `link.href` → `link.label || linkIdx`

⚠️ **Check:** Test dropdown keyboard navigation (Tab in, Escape out).

---

### 4. Hero CTA — Presence Audit Offer

**Files:** `components/sections/home/hero/Hero.tsx`, `app/css/sections.css`

- Default `ctaText` → `'Book Your Free Presence Audit'`
- New `auditMicrocopy` prop (default: `'Free · 30 minutes · No commitment required'`)
- Both wrapped in `.home-hero-cta-group`

⚠️ **Check:** CTA button href points to actual booking/Calendly URL.

---

### 5. Homepage Trimmed to 5 Sections

**Files:** `app/page.tsx`

Removed: Marquee, ImpactSection, PortfolioPreview, WhyWorkTogether, CaseStudy, FeaturedBlog  
Remaining: **Hero → Stats → Services → Testimonials → CTA**

- Testimonials capped at `.slice(0, 3)`

⚠️ **Check:** `FeaturedBlog` (with email opt-in) now only appears on `/blog`. Re-add to `page.tsx` if homepage capture is wanted.

---

### 6. Fonts — Fraunces + DM Sans

**Files:** `app/globals.css`, `app/css/variables.css`

- Replaced Cormorant Garamond + Inter with **Fraunces** (variable serif, headlines) and **DM Sans** (humanist geometric, body)
- Added missing `--font-serif: var(--font-headline)` and `--font-tech: var(--font-mono)` aliases to fix pre-existing undefined variable references in `base.css`

⚠️ **Check:** Review headlines at all sizes on real devices. Confirm `--font-serif` and `--font-tech` render correctly.

---

### 7. Kinetic Motion — Hero Visual Energy

**Files:** `app/css/sections.css`

- Diagonal two-tone background wash on `.home-hero-texture`
- Four-block staggered entrance animations (100ms stagger per block)
- Accent underline expands after subheadline on reveal (`.home-hero-headline-accent::after`)
- CTA arrow drift on hover (`.home-hero-cta-primary::after`)
- IkigaiSymbol breathing animation — 5s cycle
- All wrapped in `@media (prefers-reduced-motion: no-preference)`

⚠️ **Check:** View hero on real device. Confirm static (reduced-motion) version looks intentional, not broken.

---

### 8. Blog Email Opt-In — Quiet Command Starter Guide

**Files created/modified:**

- `components/forms/BlogOptIn.tsx` — `'use client'` form, firstName + email, success/error states
- `app/api/subscribe/route.ts` — validates input, upserts to Supabase `subscribers`, delivers via Resend (non-fatal)
- `app/css/pages.css` — `.blog-optin-*` component styles
- `components/shared/featured-blog/FeaturedBlog.tsx` — `<BlogOptIn />` injected between post grid and "View All Articles"

Supabase table required (created manually):

```sql
CREATE TABLE subscribers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name     TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  source         TEXT DEFAULT 'blog_optin',
  subscribed_at  TIMESTAMPTZ DEFAULT NOW()
);
```

⚠️ **Check:**

- Submit form live → verify row in `subscribers` table
- Confirm `RESEND_API_KEY` is set in Netlify env vars
- Verify `jon@jonchalant.com` sender domain is verified in Resend
- Run one test submission to confirm column names match

---

## Open Items

| #   | Item                                                     | Priority |
| --- | -------------------------------------------------------- | -------- |
| 1   | Vary the duplicate "87%" result stat across testimonials | Medium   |
| 2   | Confirm `/portal/[slug]` routes exist for lesson slugs   | High     |
| 3   | Verify hero CTA button href (booking URL)                | High     |
| 4   | Set `RESEND_API_KEY` in Netlify env vars                 | High     |
| 5   | Verify `jon@jonchalant.com` sender domain in Resend      | High     |
| 6   | Test opt-in form submission end-to-end                   | High     |
| 7   | Review Fraunces rendering at small headline sizes        | Low      |
| 8   | Test navbar dropdown keyboard navigation                 | Medium   |
