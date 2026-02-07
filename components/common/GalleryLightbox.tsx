'use client';

import { useState, useCallback, useEffect } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  onClose: () => void;
  initialIndex?: number;
  allowKeyboardNav?: boolean;
}

export default function GalleryLightbox({
  images,
  onClose,
  initialIndex = 0,
  allowKeyboardNav = true,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];
  const totalImages = images.length;

  // Navigate to next image
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setIsLoading(true);
  }, [totalImages]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setIsLoading(true);
  }, [totalImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!allowKeyboardNav) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allowKeyboardNav, goToNext, goToPrevious, onClose]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 transition-colors rounded-lg"
          aria-label="Close gallery"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image Container */}
        <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center mb-4">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-white/20 rounded-full" />
              </div>
            </div>
          )}

          {/* Image */}
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt}
            onLoad={handleImageLoad}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="text-center text-white text-sm mb-4 max-w-2xl">
            {currentImage.caption}
          </p>
        )}

        {/* Controls */}
        <div className="w-full max-w-2xl flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="p-2 text-white hover:bg-white/20 transition-colors rounded-lg disabled:opacity-50"
            disabled={totalImages <= 1}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Counter & Thumbnails */}
          <div className="flex flex-col items-center gap-4 flex-1 mx-4">
            <p className="text-white text-sm">
              {currentIndex + 1} / {totalImages}
            </p>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsLoading(true);
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded transition-all ${
                    idx === currentIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="p-2 text-white hover:bg-white/20 transition-colors rounded-lg disabled:opacity-50"
            disabled={totalImages <= 1}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Keyboard Help */}
        {allowKeyboardNav && (
          <p className="text-center text-white/60 text-xs mt-4">
            Use arrow keys to navigate • Press ESC to close
          </p>
        )}
      </div>
    </div>
  );
}
