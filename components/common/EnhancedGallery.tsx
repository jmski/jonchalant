'use client';

import { useState, useMemo } from 'react';
import { ScrollFade, ScrollStagger } from '@/components/animations';
import GalleryLightbox from './GalleryLightbox';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import OptimizedImage from '@/lib/optimizedImage';

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  thumbnail?: string;
}

interface EnhancedGalleryProps {
  images: GalleryItem[];
  categories?: string[];
  columns?: 1 | 2 | 3 | 4;
  accentColor?: 'vibrant' | 'secondary' | 'tertiary';
  enableFiltering?: boolean;
  enableLightbox?: boolean;
  enableLazyLoad?: boolean;
  onImageClick?: (index: number) => void;
}

export default function EnhancedGallery({
  images,
  categories,
  columns = 3,
  accentColor = 'vibrant',
  enableFiltering = true,
  enableLightbox = true,
  enableLazyLoad = true,
  onImageClick,
}: EnhancedGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Extract unique categories from images
  const uniqueCategories = useMemo(() => {
    if (categories) return categories;
    const cats = new Set<string>();
    images.forEach((img) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats);
  }, [images, categories]);

  // Filter images by category
  const filteredImages = useMemo(
    () =>
      selectedCategory
        ? images.filter((img) => img.category === selectedCategory)
        : images,
    [images, selectedCategory]
  );

  // Handle image click
  const handleImageClick = (index: number) => {
    if (onImageClick) onImageClick(index);
    if (enableLightbox) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  // Handle image load for lazy loading
  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  };

  // Color mapping
  const colorMap = {
    vibrant: {
      text: 'text-vibrant',
      border: 'border-vibrant',
      bg: 'bg-vibrant-faint',
      hover: 'hover:shadow-vibrant',
    },
    secondary: {
      text: 'text-secondary',
      border: 'border-secondary',
      bg: 'bg-secondary-faint',
      hover: 'hover:shadow-secondary',
    },
    tertiary: {
      text: 'text-tertiary',
      border: 'border-tertiary',
      bg: 'bg-tertiary-faint',
      hover: 'hover:shadow-tertiary',
    },
  };

  const colors = colorMap[accentColor];
  const gridColsClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2 lg:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };
  const gridCols = gridColsClass[columns];

  return (
    <>
      {/* Category Filter */}
      {enableFiltering && uniqueCategories.length > 0 && (
        <ScrollFade>
          <div className="mb-12">
            <h3 className="text-xl font-black uppercase tracking-wider mb-6 block">
              Filter
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* All button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 font-bold uppercase text-sm transition-all border-2 ${
                  selectedCategory === null
                    ? `${colors.border} ${colors.bg} ${colors.text}`
                    : `border-primary text-primary hover:${colors.bg}`
                }`}
              >
                All
              </button>

              {/* Category buttons */}
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className={`px-4 py-2 font-bold uppercase text-sm transition-all border-2 ${
                    selectedCategory === cat
                      ? `${colors.border} ${colors.bg} ${colors.text}`
                      : `border-primary text-primary hover:${colors.bg}`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollFade>
      )}

      {/* Image Grid */}
      <ScrollStagger variant="slideInUp" staggerDelay={70}>
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {filteredImages.length > 0 ? (
            filteredImages.map((image, idx) => {
              const isLoaded = loadedImages.has(image.src);

              return (
                <div
                  key={`${image.src}-${idx}`}
                  className="group relative overflow-hidden rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-vibrant"
                  onClick={() => handleImageClick(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleImageClick(idx);
                    }
                  }}
                  aria-label={`${image.alt}${image.caption ? ': ' + image.caption : ''}`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-tertiary overflow-hidden rounded-lg">
                    {/* Lazy load skeleton */}
                    {enableLazyLoad && !isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}

                    {/* Image with smooth fade-in and blur placeholder */}
                    <OptimizedImage
                      src={image.thumbnail || image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      quality={80}
                      objectFit="cover"
                      placeholder="blur"
                      onLoadingComplete={() => handleImageLoad(image.src)}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-focus-within:scale-110 ${
                        isLoaded ? 'animate-fadeIn' : ''
                      }`}
                    />

                    {/* Overlay on Hover - Enhanced */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-focus-within:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                      <div className={`p-3 rounded-full border-2 ${colors.border} text-white transform transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110`}>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          role="presentation"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Category Badge - Enhanced */}
                    {image.category && (
                      <div
                        className={`absolute top-3 right-3 text-xs font-black uppercase px-3 py-1 rounded ${colors.bg} ${colors.text} transition-all duration-300 group-hover:scale-110 group-focus-within:scale-110`}
                      >
                        {image.category}
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  {image.caption && (
                    <div className="p-3 bg-primary border-t border-primary transition-colors duration-300 group-hover:bg-secondary group-focus-within:bg-secondary">
                      <p className="text-sm text-secondary line-clamp-2 group-hover:text-primary group-focus-within:text-primary">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-secondary">
              <p>No images to display</p>
            </div>
          )}
        </div>
      </ScrollStagger>

      {/* Lightbox Modal */}
      {enableLightbox && lightboxOpen && (
        <GalleryLightbox
          images={filteredImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
