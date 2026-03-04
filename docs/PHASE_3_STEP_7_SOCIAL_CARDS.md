# Phase 3, Step 7: Social Card Optimization Strategy

## Overview
Optimize Open Graph (OG) and Twitter card metadata across all pages, plus create branded social sharing card templates/images. These cards appear when content is shared on LinkedIn, Twitter, Facebook, and other platforms.

## Social Card Specifications

### Design Specifications
- **Dimensions**: 1200x630px (primary), also supports 1200x1500px for Pinterest
- **Format**: PNG or JPG (optimized for web, <200KB)
- **Brand Colors**: 
  - Primary: #2563eb (Blue)
  - Secondary: #f97316 (Orange)
  - Background: #ffffff (White)
  - Text: #0f172a (Slate-900)
  
### Required Elements per Card
1. **Company/Personal Brand** (top-left): "Jonchalant" logo/wordmark
2. **Page Title** (center): Bold headline, max 2 lines
3. **Achievement/Metric** (center-right): Data point or outcome (e.g., "8-Week Program", "100+ Leaders Trained")
4. **Call-to-Action** (bottom): "Transform Your Presence" or similar
5. **Accent Color Bar**: Bottom or left border in primary brand color

## Pages & Content

### 1. Home Page
- **OG Title**: "Executive Presence Coaching for Introverts | Jonchalant"
- **OG Description**: "Transform your professional presence in 8-12 weeks. Body-aware leadership for shy professionals and introverts."
- **Card Focus**: Hero image with "Build Executive Presence" + "100+ Leaders Transformed" metric
- **Primary CTA**: "Learn More"

### 2. About Page
- **OG Title**: "About Jon | Leadership Coach & Choreographer | Jonchalant"
- **OG Description**: "Dance-trained leadership coach specializing in executive presence for introverts and shy professionals."
- **Card Focus**: Personal branding - Jon's photo/icon with "Leadership Expert" + "15+ Years Experience" metric
- **Primary CTA**: "Discover My Story"

### 3. Programs Page
- **OG Title**: "Leadership Coaching Programs | Quiet Command & Executive Presence | Jonchalant"
- **OG Description**: "8-12 week programs for building executive presence and quiet command. Body-aware coaching for introverts."
- **Card Focus**: Program overview with "3 Coaching Paths" + "$297-$5,000 Investment" metric
- **Primary CTA**: "Explore Programs"

### 4. Lessons Page
- **OG Title**: "Leadership Lessons & Coaching | Evidence-Based Training | Jonchalant"
- **OG Description**: "Master quiet command, executive presence, and body-aware leadership through evidence-based lessons."
- **Card Focus**: Learning progression with "3 Skill Levels" + "15+ Master Classes" metric
- **Primary CTA**: "Start Learning"

### 5. Dance Portfolio
- **OG Title**: "Dance Portfolio | Professional Choreography & Performances | Jonchalant"
- **OG Description**: "Professional choreography, freestyle sessions, and performance videos showcasing 15+ years of experience."
- **Card Focus**: Dance/movement imagery with "30+ Videos" + "100+ Performance Hours" metric
- **Primary CTA**: "Watch Portfolio"

### 6. Contact Page
- **OG Title**: "Contact & Inquiry | Leadership Coaching & Collaboration | Jonchalant"
- **OG Description**: "Get in touch for leadership coaching, choreography services, or collaboration inquiries."
- **Card Focus**: Call-to-action focused with "Let's Connect" + icon/illustration
- **Primary CTA**: "Send Message"

### 7. Media Kit Page
- **OG Title**: "Media Kit | Reach & Metrics | Jonchalant"
- **OG Description**: "Professional media kit with audience demographics, reach metrics, and collaboration opportunities."
- **Card Focus**: Stats/metrics with "X Followers" + "X% Engagement Rate" metric
- **Primary CTA**: "Download Kit"

## Metadata Implementation

### Standard Format
```tsx
openGraph: {
  title: "Page Title | Jonchalant",
  description: "Compelling page description for social sharing",
  type: "website",
  url: "https://jonchalant.com/page-path",
  siteName: "Jonchalant",
  images: [
    {
      url: "https://jonchalant.com/og-page-name-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Page title social card image",
      type: "image/png",
    }
  ],
  locale: "en_US",
},
twitter: {
  card: "summary_large_image",
  title: "Page Title | Jonchalant",
  description: "Compelling page description for social sharing",
  images: ["https://jonchalant.com/og-page-name-1200x630.png"],
  creator: "@jonchalant",
}
```

## Image Generation Options

### Option A: Design Tool (Recommended)
- Use Figma, Canva, or Adobe Express
- Create 1200x630px template
- Export as optimized PNG for each page
- Place in `/public/social/`

### Option B: Programmatic Generation
- Use a service like Vercel's `@vercel/og` (React-based OG image generation)
- Create dynamic OG images from page data
- Automatically generate for consistency

### Option C: SVG Templates
- Create scalable SVG social cards
- Include brand colors and typography
- Can be rasterized to PNG at deployment

## File Structure
```
public/
├── social/
│   ├── og-home-1200x630.png
│   ├── og-about-1200x630.png
│   ├── og-programs-1200x630.png
│   ├── og-lessons-1200x630.png
│   ├── og-dance-1200x630.png
│   ├── og-contact-1200x630.png
│   └── og-media-kit-1200x630.png
```

## Metadata Updates Needed

### Files to Modify
- [x] `app/page.tsx` - Home
- [x] `app/about/page.tsx` - About
- [x] `app/programs/page.tsx` - Programs
- [x] `app/lessons/page.tsx` - Lessons
- [x] `app/dance/page.tsx` - Dance
- [x] `app/contact/page.tsx` - Contact
- [x] `app/media-kit/page.tsx` - Media Kit

## Additional Optimizations

### Facebook OpenGraph
- Ensure `og:url` includes full domain
- Set `og:type` appropriately (website, article, etc.)
- Include `og:locale` for language targeting

### Twitter Card
- Use `summary_large_image` for maximum impact
- Include `twitter:creator` (@username)
- Ensure image dimensions match (1200x630 recommended)

### LinkedIn
- OG tags work for LinkedIn sharing
- Uses `og:image`, `og:title`, `og:description`
- Requires proper image dimensions

### Pinterest
- Support 1000x1500px portrait orientation for Pinterest
- Include descriptive `og:description`

## Testing & Verification

### Tools
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/sharing/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Vercel OG Debugger**: Built into Vercel deployments

### Checklist
- [ ] All social card images created (7 total)
- [ ] Metadata updated on all pages
- [ ] Twitter card tags added
- [ ] Open Graph images optimized (<200KB each)
- [ ] All links tested in debuggers
- [ ] Mobile preview checked
- [ ] Dark mode compatibility verified

## Performance Notes
- Optimize images: Use tools like TinyPNG or ImageOptim
- Keep dimensions exactly 1200x630px
- File size target: 50-150KB per image
- Format: PNG (better for text), JPG acceptable for photos

## Next Steps
1. Create or source social card images for all 7 pages
2. Place optimized images in `/public/social/`
3. Update metadata on each page with proper OG image URLs
4. Add Twitter card metadata
5. Test with Facebook, Twitter, and LinkedIn debuggers
6. Monitor click-through rates from social shares

## ROI Impact
- **Improved click-through rate**: Professional cards can increase CTR by 20-50%
- **Better brand recognition**: Consistent visual identity across platforms
- **Higher engagement**: Clear achievement metrics in cards drive conversions
- **Reduced bounce rate**: Better expectations set before clicking
