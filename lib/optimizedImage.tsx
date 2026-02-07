import Image, { ImageProps } from 'next/image';
import React from 'react';

interface OptimizedImageProps
  extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
}

/**
 * OptimizedImage Component
 * ─────────────────────────────────────────────────────────────
 * Wrapper around Next.js Image component with sensible defaults
 * for portfolio use. Handles lazy loading, WebP/AVIF conversion,
 * and responsive sizing automatically.
 *
 * Features:
 *   - Automatic WebP/AVIF format conversion
 *   - Lazy loading (default, eager for priority)
 *   - Responsive sizing with breakpoints
 *   - Quality optimization (85 default)
 *   - Accessibility (required alt text)
 *   - TypeScript strict types
 *
 * Props:
 *   src: Image URL (required)
 *   alt: Alt text for accessibility (required)
 *   width: Image width in px (default: 800)
 *   height: Image height in px (default: 600)
 *   priority: Load immediately (default: false)
 *   quality: JPEG quality 1-100 (default: 85)
 *   objectFit: CSS object-fit (default: 'cover')
 *   placeholder: Blur placeholder (default: 'empty')
 *   className: Additional Tailwind classes
 *
 * Usage Examples:
 *
 *   // Gallery thumbnail
 *   <OptimizedImage
 *     src="/images/photo.jpg"
 *     alt="Portfolio image"
 *     width={400}
 *     height={300}
 *     quality={80}
 *     className="rounded"
 *   />
 *
 *   // Hero image (priority loading)
 *   <OptimizedImage
 *     src="/images/hero.jpg"
 *     alt="Hero banner"
 *     width={1920}
 *     height={1080}
 *     priority={true}
 *     quality={90}
 *   />
 *
 *   // Full-screen lightbox
 *   <OptimizedImage
 *     src="/images/full-res.jpg"
 *     alt="Detailed view"
 *     width={2560}
 *     height={1920}
 *     quality={95}
 *     priority={showLightbox}
 *   />
 */
export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 85,
  placeholder = 'empty',
  onLoadingComplete,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
      className={className}
      style={{
        objectFit: objectFit !== 'fill' ? objectFit : undefined,
        width: '100%',
        height: 'auto',
      }}
      placeholder={placeholder}
      onLoadingComplete={onLoadingComplete}
      {...props}
    />
  );
}
