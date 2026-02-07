# Image Optimization Implementation Guide

## Overview

Images are often the largest assets on web pages, typically accounting for 50-70% of page load time. This guide explains the image optimization strategy implemented across your portfolio.

## Current Status

✅ **Optimized Components**:

- `OptimizedImage.tsx` - Wrapper for next/image with sensible defaults
- `lib/imageConfig.ts` - Centralized image configuration (integrated with design tokens)
- Responsive sizing configured across all image contexts

⏳ **In Progress**:

- Update showcase/dance portfolio pages to use OptimizedImage
- Replace hardcoded `/api/placeholder` URLs
- Configure next.config.ts remote image patterns

## Key Optimization Techniques

### 1. **Next.js Image Optimization**

Next.js automatically:

- Converts images to modern formats (WebP, AVIF)
- Serves appropriately-sized images per device
- Prevents layout shift with explicit width/height
- Lazy loads below-fold images by default

### 2. **Responsive Sizing with `sizes` Prop**

Different breakpoints serve different image widths:

```tsx
// Mobile: 100vw (full width)
// Tablet: 50vw (half width)
// Desktop: 33vw (one-third width)

sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
```

### 3. **Quality Optimization**

Different contexts use different quality levels:

- **Hero images**: 90 (high quality, fewer images)
- **Portfolio cards**: 85 (default, best balance)
- **Previews**: 80 (slightly compressed)
- **Thumbnails**: 75 (aggressive compression)

### 4. **Priority Loading**

Control which images load first:

- **Hero image**: `priority={true}` (eager load, highest priority)
- **Above-fold portfolio**: `priority={false}` but still fetched early
- **Below-fold items**: `priority={false}` (lazy load)

## Configuration Files

### `lib/imageConfig.ts`

Centralized configuration for all image handling.

```tsx
import {
  IMAGE_CONFIG,
  getImageSizes,
  getImageDimensions,
} from "@/lib/imageConfig";

// Get preset dimensions
const { width, height } = getImageDimensions("portfolio");

// Get responsive sizes
const sizes = getImageSizes("portfolio");

// Get quality setting
const quality = getImageQuality("default");

// Complete optimization props
const optimizedProps = getOptimizedImageProps("portfolio");
```

### Key Functions

#### `getImageDimensions(context)`

Returns width/height for a specific context.

```tsx
// Available contexts
getImageDimensions("hero"); // 1200x800
getImageDimensions("portfolio_card"); // 500x400
getImageDimensions("gallery_thumb"); // 300x300
getImageDimensions("gallery_full"); // 1200x900
getImageDimensions("showcase_item"); // 600x500
getImageDimensions("banner"); // 1920x600
getImageDimensions("square"); // 400x400 (from design tokens)
getImageDimensions("landscape"); // 400x300 (from design tokens)
```

#### `getImageSizes(context)`

Returns responsive size string for Image component.

```tsx
// Available contexts
getImageSizes("hero"); // '100vw' (full width)
getImageSizes("portfolio"); // '(max-width: 640px) 100vw, ...' (responsive grid)
getImageSizes("gallery"); // '(max-width: 768px) 100vw, ...' (responsive grid)
getImageSizes("half"); // '(max-width: 768px) 100vw, 50vw' (two columns)
getImageSizes("third"); // '(max-width: 768px) 100vw, ...' (three columns)
```

#### `getImageQuality(type)`

Returns quality setting (1-100).

```tsx
// Available types
getImageQuality("hero"); // 90
getImageQuality("default"); // 85
getImageQuality("thumbnail"); // 75
getImageQuality("preview"); // 80
```

#### `shouldLazyLoad(context)`

Determines if image should lazy load.

```tsx
shouldLazyLoad("hero"); // false (eager load)
shouldLazyLoad("above_fold"); // false (eager load)
shouldLazyLoad("below_fold"); // true (lazy load)
shouldLazyLoad("gallery"); // 'lazy' (browser decides)
```

#### `getOptimizedImageProps(context)`

Combines all settings into single props object.

```tsx
const props = getOptimizedImageProps("portfolio");
// Returns: { width: 500, height: 400, quality: 85, sizes: '...', priority: true }

<Image {...props} src={src} alt={alt} />;
```

## OptimizedImage Component

Wrapper component with sensible defaults for portfolio usage.

### Props

```tsx
interface OptimizedImageProps {
  src: string;                           // Required: image URL
  alt: string;                           // Required: alt text
  width?: number;                        // Optional: explicit width (default: 800)
  height?: number;                       // Optional: explicit height (default: 600)
  priority?: boolean;                    // Eager load if true (default: false)
  quality?: number;                      // Quality 1-100 (default: 85)
  sizes?: string;                        // Responsive sizes string
  className?: string;                    // CSS classes
  objectFit?: 'cover' | 'contain' | ... // How to fit image (default: 'cover')
  objectPosition?: string;               // Position within container (default: 'center')
  onLoad?: () => void;                   // Callback when loaded
  fallback?: string;                     // URL if image fails to load
}
```

### Basic Usage

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";

<OptimizedImage
  src="/portfolio/dance-performance.jpg"
  alt="Dance performance"
  width={800}
  height={600}
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>;
```

### With Config Helper

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";
import { getOptimizedImageProps, getImageSizes } from "@/lib/imageConfig";

const props = getOptimizedImageProps("portfolio");

<OptimizedImage
  src="/portfolio/item.jpg"
  alt="Portfolio item"
  {...props}
  sizes={getImageSizes("portfolio")}
/>;
```

## Responsive sizing Patterns

### 1. **Full-Width Hero (1 column)**

```tsx
<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  priority={true}
  quality={90}
  sizes="100vw"
  objectFit="cover"
/>
```

### 2. **Portfolio Grid (Responsive Columns)**

```tsx
{
  portfolioItems.map((item, idx) => (
    <OptimizedImage
      key={idx}
      src={item.image}
      alt={item.title}
      width={500}
      height={400}
      priority={idx < 3} // Eager load first 3 images
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  ));
}
```

### 3. **Gallery with Lightbox**

```tsx
{
  galleryImages.map((img) => (
    <OptimizedImage
      key={img.id}
      src={img.thumbnail}
      alt={img.title}
      width={300}
      height={300}
      quality={80}
      sizes="(max-width: 768px) 50vw, 25vw"
      onClick={() => openLightbox(img.fullResolution)}
      className="cursor-pointer hover:opacity-80"
    />
  ));
}
```

### 4. **Showcase Items (Fixed Size)**

```tsx
<OptimizedImage
  src={item.image}
  alt={item.title}
  width={600}
  height={500}
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
  objectFit="cover"
/>
```

## Next.js Configuration

Images are preprocessed through optimization pipeline in `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity CMS images
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Stock photos
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com", // CDN images
      },
    ],
    formats: ["image/avif", "image/webp"], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Thumbnail sizes
    minimumCacheTTL: 31536000, // Cache for 1 year
  },
};
```

## Performance Impact

### Expected Improvements

- **File size**: 40-60% reduction via WebP/AVIF conversion
- **LCP**: 300-500ms improvement from lazy loading
- **CLS**: Eliminated via explicit width/height
- **Mobile score**: +10-20 points in Lighthouse

### Measurement

```bash
# Run Lighthouse audit
npm run build
npx lighthouse https://localhost:3000 --view

# Check image statistics
npm run analyze  # if configured
```

## Common Patterns in Your Portfolio

### Showcase/Dance Portfolio Gallery

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";
import { getOptimizedImageProps } from "@/lib/imageConfig";

export default function ShowcaseGallery({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, idx) => (
        <OptimizedImage
          key={item._id}
          src={item.image || IMAGE_CONFIG.PLACEHOLDERS.DEFAULT}
          alt={item.title}
          {...getOptimizedImageProps("showcase_item")}
          priority={idx < 3}
          className="h-full object-cover rounded"
        />
      ))}
    </div>
  );
}
```

### Portfolio Cards

```tsx
export function PortfolioCard({ item }) {
  return (
    <div className="card">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        width={500}
        height={400}
        quality={85}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3>{item.title}</h3>
      </div>
    </div>
  );
}
```

## Troubleshooting

### Issue: "Image is missing required `src` prop"

**Solution**: Always provide a `src` prop:

```tsx
<OptimizedImage src={imageSrc} alt={alt} /> // ✅ Correct
```

### Issue: "Image Optimization failed"

**Solutions**:

1. Ensure remote domain is configured in `next.config.ts`
2. Check that image file actually exists
3. Use fallback prop for broken images:

```tsx
<OptimizedImage src={src} alt={alt} fallback={PLACEHOLDERS.DEFAULT} />
```

### Issue: Layout shift during image load

**Solution**: Always specify width and height:

```tsx
<OptimizedImage width={800} height={600} /> // ✅ Prevents layout shift
```

### Issue: Image not lazy loading

**Solution**: Don't set priority for below-fold images:

```tsx
<OptimizedImage priority={false} /> // ✅ Lazy loads
<OptimizedImage priority={true} />  // ❌ Eager loads
```

## Best Practices

1. ✅ Always provide explicit width/height
2. ✅ Use appropriate quality settings (90 for hero, 85 default, 75 for thumbnails)
3. ✅ Set sizes for responsive images
4. ✅ Use priority={true} only for above-fold images
5. ✅ Use design tokens for consistent dimensions
6. ✅ Provide fallback images for external sources
7. ✅ Use object-fit: cover for fixed-size containers
8. ✅ Monitor LCP and CLS metrics

## Integration with Design Tokens

Design tokens provide consistent sizing across components:

```tsx
import { DESIGN_TOKENS } from "@/lib/design-tokens";
import { IMAGE_CONFIG } from "@/lib/imageConfig";

// Use design token placeholder dimensions
<OptimizedImage
  src={src}
  alt={alt}
  width={DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_SQUARE.width}
  height={DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_SQUARE.height}
  sizes={getImageSizes("gallery")}
/>;
```

---

**Last Updated**: February 6, 2026  
**Status**: Configuration complete, implementation in progress  
**Files**: OptimizedImage.tsx, lib/imageConfig.ts, next.config.ts  
**Expected Performance Gain**: 40-60% image size reduction + 300-500ms LCP improvement
