# Image Assets Structure Guide

## Overview

This guide documents the expected folder structure for optimized images across the portfolio. All images are stored in `public/images/` with category-based organization for easy management and responsive optimization.

## Folder Structure

```
public/images/
├── showcase/
│   ├── gunpla/
│   │   ├── rg-evangelion-unit-01.jpg (680x680, 120KB)
│   │   ├── mg-unicorn-gundam.jpg (680x680, 125KB)
│   │   ├── hg-barbatos-lupus-rex.jpg (680x680, 130KB)
│   │   └── pg-strike-freedom.jpg (680x680, 135KB)
│   └── pokemon/
│       ├── charizard-vmax-gold.jpg (680x680, 115KB)
│       ├── pikachu-illustrator.jpg (680x680, 110KB)
│       ├── mewtwo-ex-crystal.jpg (680x680, 118KB)
│       └── blastoise-base-set.jpg (680x680, 120KB)
├── dance/
│   ├── choreography/
│   │   ├── ninjago-urban-style.jpg (800x600, 140KB)
│   │   ├── midnight-dreams-fusion.jpg (800x600, 145KB)
│   │   ├── synthwave-sunday-retro.jpg (800x600, 150KB)
│   │   └── [additional choreography thumbnails]
│   └── freestyle/
│       ├── freestyle-battle-2024.jpg (800x600, 140KB)
│       ├── freestyle-jam-session.jpg (800x600, 145KB)
│       └── [additional freestyle thumbnails]
└── collaborations/
    ├── music-video-direction.jpg (800x480, 130KB)
    ├── tiktok-reels-content.jpg (800x480, 125KB)
    ├── brand-campaign.jpg (800x480, 135KB)
    ├── live-performance.jpg (800x480, 140KB)
    ├── choreography-teaching.jpg (800x480, 130KB)
    └── podcast-interview.jpg (800x480, 125KB)
```

## Image Specifications by Category

### Showcase Gallery Images (Gunpla & Pokémon)
- **Dimensions**: 680x680px (1:1 square ratio)
- **Quality**: 85% (WebP/JPEG)
- **File Size Target**: 110-135KB each
- **Format**: `.jpg` with WebP fallback
- **Use Case**: Grid gallery display with lightbox modal

**Responsive Sizes Configuration:**
```js
sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

### Dance Portfolio Thumbnails
- **Dimensions**: 800x600px (4:3 ratio for video format)
- **Quality**: 85% (WebP/JPEG)
- **File Size Target**: 140-150KB each
- **Format**: `.jpg` with WebP fallback
- **Use Case**: Video thumbnail display before playback

**Responsive Sizes Configuration:**
```js
sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
```

### Collaboration Service Images
- **Dimensions**: 800x480px (16:9 widescreen ratio)
- **Quality**: 85% (WebP/JPEG)
- **File Size Target**: 125-140KB each
- **Format**: `.jpg` with WebP fallback
- **Use Case**: Service tier card display

**Responsive Sizes Configuration:**
```js
sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

## OptimizedImage Component Usage

All images across pages use the `OptimizedImage` component wrapper for automatic optimization:

```tsx
import { OptimizedImage } from '@/components/common';

<OptimizedImage
  src="/images/showcase/gunpla/rg-evangelion-unit-01.jpg"
  alt="RG Evangelion Unit-01"
  width={680}
  height={680}
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={false}
/>
```

## Integration Points

### 1. Showcase Page (`app/showcase/page.tsx`)
- **Component**: `EnhancedGallery` (uses OptimizedImage internally)
- **Image Path Format**: `/images/showcase/gunpla/{filename}.jpg`
- **Mock Data Path**: `MOCK_GUNPLA` and `MOCK_POKEMON` arrays
- **Implementation**: Images are mapped directly in gallery render

### 2. Dance Page (`app/dance/page.tsx`)
- **Component**: `DanceFilter` with embedded gallery
- **Image Path Format**: `/images/dance/{category}/{filename}.jpg`
- **Mock Data Path**: `MOCK_CHOREOGRAPHY` and `MOCK_FREESTYLE` arrays
- **Implementation**: Thumbnail images displayed alongside video embeds

### 3. Collaborations Page (`app/collaborations/page.tsx`)
- **Component**: Service grid cards
- **Image Path Format**: `/images/collaborations/{filename}.jpg`
- **Mock Data Path**: `MOCK_COLLABORATIONS` array
- **Implementation**: Service tier cards with background images

## Performance Optimization

### Image Delivery
- **Next.js Image Optimization**: Automatic WebP conversion, responsive sizing
- **Lazy Loading**: All images use `priority={false}` (lazy load by default)
- **Quality Settings**: 85% quality balances visual fidelity with file size
- **Shimmer Animation**: `animate-shimmer` CSS class applied during load

### File Size Targets
| Category | Image Count | Total Size | Avg per Image |
|----------|------------|-----------|---------------|
| Showcase | 8 | ~950KB | 119KB |
| Dance | 8+ | ~1.1MB+ | 145KB |
| Collaborations | 6 | ~785KB | 131KB |
| **Total Portfolio** | **22+** | **2.8MB+** | **131KB** |

### Estimated Page Load Impact
- **Showcase Page**: 950KB images → ~280KB optimized (70% reduction)
- **Dance Page**: 1.1MB images → ~320KB optimized (70% reduction)
- **Collaborations Page**: 785KB images → ~230KB optimized (70% reduction)

## Implementation Checklist

- [x] Structure defined for all image categories
- [x] OptimizedImage component ready for use
- [x] EnhancedGallery integration (uses OptimizedImage)
- [x] Mock data paths updated to real image paths
- [ ] Create `/public/images/` directory structure
- [ ] Add placeholder images to directories
- [ ] Verify responsive sizing works on all breakpoints
- [ ] Test image optimization with Next.js Image tool
- [ ] Lighthouse performance audit
- [ ] Monitor Core Web Vitals (LCP, CLS)

## Next Steps

1. **Create Directory Structure**: Build the `/public/images/` folder hierarchy
2. **Prepare Images**: Format and optimize images to specifications
3. **Add Images**: Place images in appropriate directories
4. **Test Responsiveness**: Verify images display correctly on mobile/tablet/desktop
5. **Performance Testing**: Use Lighthouse to verify optimization impact
6. **Deploy**: Commit to production and monitor performance

## Responsive Breakpoints

All images are optimized for these breakpoints:

| Breakpoint | Image Width Used |
|-----------|-----------------|
| Mobile (< 768px) | 100% viewport width |
| Tablet (768px - 1024px) | 50-60% viewport width |
| Desktop (> 1024px) | 33-50% viewport width |

## Accessibility

All images include:
- ✅ Descriptive `alt` text for screen readers
- ✅ Proper aspect ratio declarations (width/height props)
- ✅ ARIA labels where applicable
- ✅ Loading states with shimmer animation

## Monitoring & Optimization

### Metrics to Track
- **Largest Contentful Paint (LCP)**: Target < 2.5s
- **Cumulative Layout Shift (CLS)**: Target < 0.1
- **Image Load Time**: Target < 1.5s per image
- **Total Image Size**: Target < 3MB portfolio-wide

### Tools
- Next.js Image Optimizer
- Lighthouse
- WebPageTest
- Chrome DevTools Network tab

---

**Last Updated**: February 6, 2026  
**Status**: Phase 1 Part 5 - Image Path Integration Complete  
**Next Phase**: Add actual images to public/images directories
