/**
 * Image Optimization Configuration
 * 
 * Centralizes responsive image sizing, quality settings, and optimization strategies
 * Used across all image components for consistency
 * 
 * Integrates with design-tokens.ts for sizing consistency
 */

import { DESIGN_TOKENS } from './design-tokens';

export const IMAGE_CONFIG = {
  /**
   * Default image dimensions
   * Used as fallbacks when specific sizes aren't provided
   * Integrated with DESIGN_TOKENS.SIZES.IMAGE for consistency
   */
  DIMENSIONS: {
    HERO: DESIGN_TOKENS.SIZES.IMAGE.HERO_IMAGE,
    PORTFOLIO_CARD: { width: 500, height: 400 },
    GALLERY_THUMB: { width: 300, height: 300 },
    GALLERY_FULL: { width: 1200, height: 900 },
    SHOWCASE_ITEM: { width: 600, height: 500 },
    BANNER: { width: 1920, height: 600 },
    // Also expose design token placeholders
    SQUARE: DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_SQUARE,
    LANDSCAPE: DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_LANDSCAPE,
  },

  /**
   * Quality settings for different image types
   * Balance between quality and file size
   * 
   * Quality scale: 1-100 (higher = better quality, larger file)
   * NextJS default: 75
   * Recommended baseline: 85
   */
  QUALITY: {
    HERO: 90,           // High quality for hero images
    DEFAULT: 85,        // Standard quality (recommended)
    THUMBNAIL: 75,      // Lower quality for thumbnails
    PREVIEW: 80,        // Preview/teaser quality
  },

  /**
   * Responsive size strings for different image contexts
   * Used in Image component's sizes prop
   * 
   * Format: "(media condition) viewport width, ..."
   * Default is 100vw (full viewport width)
   */
  SIZES: {
    // Full-width images (hero, banners)
    FULL: '100vw',
    
    // Half-width images (two-column layouts)
    HALF: '(max-width: 768px) 100vw, 50vw',
    
    // Third-width images (three-column grids)
    THIRD: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    
    // Quarter-width (four-column)
    QUARTER: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
    
    // Portfolio cards (responsive grid)
    PORTFOLIO: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw',
    
    // Gallery images
    GALLERY: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    
    // Small thumbnails
    THUMBNAIL: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 100px',
  },

  /**
   * Lazy loading strategy
   * Images below the fold should use lazy loading
   */
  LAZY_LOADING: {
    HERO: false,              // Always eager load hero
    ABOVE_FOLD: false,        // Eager load visible content
    BELOW_FOLD: true,         // Lazy load portfolio items
    GALLERY: 'lazy',          // Let browser decide
  },

  /**
   * Remote image patterns (from next.config.ts)
   * These are pre-configured in next.config.ts
   */
  REMOTE_PATTERNS: {
    UNSPLASH: 'https://images.unsplash.com',
    PICSUM: 'https://picsum.photos',
  },

  /**
   * Placeholder/fallback images
   * Used when images fail to load or aren't available
   */
  PLACEHOLDERS: {
    DEFAULT: DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_DEFAULT,
    WIDE: '/api/placeholder/1200/400',
    SQUARE: `/api/placeholder/${DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_SQUARE.width}/${DESIGN_TOKENS.SIZES.IMAGE.PLACEHOLDER_SQUARE.height}`,
    PORTRAIT: '/api/placeholder/300/400',
  },

  /**
   * Image formats and optimization strategy
   */
  FORMAT_STRATEGY: {
    MODERN: ['image/webp', 'image/avif'],  // Modern formats
    FALLBACK: 'image/jpeg',                // Fallback format
    AUTO: true,                             // Let Next.js optimize
  },
};

/**
 * Get responsive sizes for different image contexts
 * 
 * @param context - The context where image is used
 * @returns sizes string for Image component
 * 
 * @example
 * const sizes = getImageSizes('portfolio');
 * <Image sizes={sizes} />
 */
export function getImageSizes(
  context: 'hero' | 'portfolio' | 'gallery' | 'full' | 'half' | 'third' | 'thumbnail'
): string {
  const sizeMap: Record<string, string> = {
    hero: IMAGE_CONFIG.SIZES.FULL,
    portfolio: IMAGE_CONFIG.SIZES.PORTFOLIO,
    gallery: IMAGE_CONFIG.SIZES.GALLERY,
    full: IMAGE_CONFIG.SIZES.FULL,
    half: IMAGE_CONFIG.SIZES.HALF,
    third: IMAGE_CONFIG.SIZES.THIRD,
    thumbnail: IMAGE_CONFIG.SIZES.THUMBNAIL,
  };

  return sizeMap[context] || IMAGE_CONFIG.SIZES.THIRD;
}

/**
 * Get image dimensions for a specific context
 * 
 * @param context - The context/use case
 * @returns { width, height } dimensions
 * 
 * @example
 * const { width, height } = getImageDimensions('portfolio');
 * <Image width={width} height={height} />
 */
export function getImageDimensions(
  context: keyof typeof IMAGE_CONFIG.DIMENSIONS
): { width: number; height: number } {
  return IMAGE_CONFIG.DIMENSIONS[context] || IMAGE_CONFIG.DIMENSIONS.PORTFOLIO_CARD;
}

/**
 * Get quality setting for image type
 * 
 * @param type - The image quality type
 * @returns quality number (1-100)
 * 
 * @example
 * const quality = getImageQuality('hero');
 * <Image quality={quality} />
 */
export function getImageQuality(
  type: keyof typeof IMAGE_CONFIG.QUALITY
): number {
  return IMAGE_CONFIG.QUALITY[type] || IMAGE_CONFIG.QUALITY.DEFAULT;
}

/**
 * Should lazy load this image?
 * 
 * @param context - The context/position of image
 * @returns boolean indicating if lazy loading should be used
 * 
 * @example
 * const lazy = shouldLazyLoad('portfolio');
 * <Image priority={!lazy} />
 */
export function shouldLazyLoad(
  context: keyof typeof IMAGE_CONFIG.LAZY_LOADING
): boolean {
  const lazyValue = IMAGE_CONFIG.LAZY_LOADING[context];
  return lazyValue === true || lazyValue === 'lazy';
}

/**
 * Build optimized image props
 * Combines multiple configs into single object for Image component
 * 
 * @param context - The image context
 * @returns optimized props object
 * 
 * @example
 * const props = getOptimizedImageProps('portfolio');
 * <Image {...props} src={src} alt={alt} />
 */
export function getOptimizedImageProps(
  context: keyof typeof IMAGE_CONFIG.DIMENSIONS
) {
  return {
    ...getImageDimensions(context),
    quality: getImageQuality('DEFAULT'),
    sizes: getImageSizes(context as any),
    priority: !shouldLazyLoad(context as any),
  };
}
