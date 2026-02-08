'use client';

import React from 'react';

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'image' | 'text' | 'card' | 'circle';
  count?: number; // For multiple skeletons
}

/**
 * SkeletonLoader Component
 * 
 * Displays animated skeleton placeholders while content loads.
 * Use for images, text blocks, or complex cards.
 * 
 * @example
 * // Image skeleton
 * <SkeletonLoader variant="image" width="100%" height="400px" />
 * 
 * // Text skeleton (multiple lines)
 * <SkeletonLoader variant="text" count={3} />
 * 
 * // Card skeleton
 * <SkeletonLoader variant="card" width="100%" height="300px" />
 */
export function SkeletonLoader({
  width = '100%',
  height = '200px',
  className = '',
  variant = 'image',
  count = 1,
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse';

  const variantClasses: Record<string, string> = {
    image: 'rounded-lg',
    text: 'rounded h-4 mb-2 last:mb-0',
    card: 'rounded-lg',
    circle: 'rounded-full',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (count > 1) {
    return (
      <div className={className}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              width: typeof width === 'number' ? `${width}px` : width,
              height: typeof height === 'number' ? `${height}px` : height,
              marginBottom: i < count - 1 ? '8px' : '0',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="Loading content"
    />
  );
}

export default SkeletonLoader;
