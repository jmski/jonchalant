'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  fallback?: string;
}

/**
 * OptimizedImage Component
 * 
 * Wrapper around next/image with sensible defaults for portfolio
 * Handles responsive sizing, quality optimization, and fallbacks
 * 
 * Usage:
 * <OptimizedImage
 *   src="/portfolio/photo.jpg"
 *   alt="Dance performance"
 *   width={800}
 *   height={600}
 *   priority={false}
 *   quality={85}
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  sizes,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  fallback = '/api/placeholder/400/300',
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageSrc(fallback);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width || 800}
        height={height || 600}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        className={`
          w-full h-full
          ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`}
          ${isLoading ? 'animate-pulse' : ''}
          transition-opacity duration-300
        `}
        style={{
          objectPosition,
        }}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-tertiary animate-pulse" />
      )}
    </div>
  );
}
