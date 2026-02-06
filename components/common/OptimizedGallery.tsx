'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getOptimizedImageProps } from '@/lib/imageConfig';

interface OptimizedGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    category?: string;
  }>;
  columns?: 2 | 3 | 4;
  onImageClick?: (index: number) => void;
}

/**
 * OptimizedGallery Component
 * 
 * Responsive image gallery with optimized loading
 * - Lazy loads below-fold images
 * - Responsive column layout
 * - Click to expand modal (optional)
 * - Proper alt text and accessibility
 * 
 * @example
 * <OptimizedGallery
 *   images={[
 *     { src: '/img1.jpg', alt: 'Dance', title: 'Performance' },
 *     { src: '/img2.jpg', alt: 'Gunpla', title: 'Build' },
 *   ]}
 *   columns={3}
 * />
 */
export default function OptimizedGallery({
  images,
  columns = 3,
  onImageClick,
}: OptimizedGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const imageProps = getOptimizedImageProps('GALLERY_THUMB');

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${gridColsClass} gap-6`}>
        {images.map((image, idx) => (
          <GalleryItem
            key={idx}
            index={idx}
            image={image}
            imageProps={imageProps}
            isLoaded={imageLoaded[idx] || false}
            onLoad={() => setImageLoaded((prev) => ({ ...prev, [idx]: true }))}
            onClick={() => {
              setSelectedIndex(idx);
              onImageClick?.(idx);
            }}
          />
        ))}
      </div>

      {/* Lightbox Modal (Optional) */}
      {selectedIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={() =>
            setSelectedIndex((prev) =>
              prev !== null ? (prev + 1) % images.length : 0
            )
          }
          onPrev={() =>
            setSelectedIndex((prev) =>
              prev !== null ? (prev - 1 + images.length) % images.length : 0
            )
          }
        />
      )}
    </>
  );
}

interface GalleryItemProps {
  index: number;
  image: {
    src: string;
    alt: string;
    title?: string;
    category?: string;
  };
  imageProps: any;
  isLoaded: boolean;
  onLoad: () => void;
  onClick: () => void;
}

function GalleryItem({
  index,
  image,
  imageProps,
  isLoaded,
  onLoad,
  onClick,
}: GalleryItemProps) {
  return (
    <div
      className="relative group overflow-hidden cursor-pointer bg-tertiary aspect-square"
      onClick={onClick}
    >
      {/* Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        {...imageProps}
        priority={index < 3} // Eagerly load first 3 images
        onLoadingComplete={onLoad}
        className={`
          w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-110 group-hover:rotate-1
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Loading skeleton */}
      {!isLoaded && <div className="absolute inset-0 bg-secondary animate-pulse" />}

      {/* Overlay on hover */}
      <div
        className={`
          absolute inset-0 bg-black transition-opacity duration-300
          ${isLoaded ? 'opacity-0 group-hover:opacity-40' : 'opacity-0'}
        `}
      />

      {/* Content overlay */}
      {(image.title || image.category) && (
        <div
          className={`
            absolute inset-0 flex flex-col items-end justify-end p-4
            transition-all duration-300 transform
            ${isLoaded ? 'group-hover:translate-y-0 group-hover:opacity-100 translate-y-4 opacity-0' : 'opacity-0'}
          `}
        >
          <div className="text-white text-right">
            {image.category && (
              <p className="text-xs uppercase tracking-widest text-vibrant mb-1">
                {image.category}
              </p>
            )}
            {image.title && <h3 className="text-sm font-bold">{image.title}</h3>}
          </div>
        </div>
      )}

      {/* Corner accent */}
      <div
        className={`
          absolute bottom-0 left-0 w-6 h-6 border-t-2 border-r-2 border-vibrant
          transition-opacity duration-300
          ${isLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

interface LightboxProps {
  images: Array<{ src: string; alt: string; title?: string }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const image = images[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Content */}
      <div
        className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-vibrant transition-colors"
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes="90vw"
            className="object-contain"
          />
        </div>

        {/* Navigation buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-vibrant text-4xl transition-colors"
          aria-label="Previous image"
        >
          ‹
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-vibrant text-4xl transition-colors"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Caption */}
        {image.title && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center">
            <h2 className="text-lg font-bold">{image.title}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
