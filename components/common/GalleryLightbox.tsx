'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import OptimizedImage from '@/lib/optimizedImage';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { useSwipeGesture } from '@/lib/hooks/useSwipeGesture';
import { SkeletonLoader } from './SkeletonLoader';

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
  allowTouchGestures?: boolean;
}

export default function GalleryLightbox({
  images,
  onClose,
  initialIndex = 0,
  allowKeyboardNav = true,
  allowTouchGestures = true,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];
  const totalImages = images.length;

  // Setup focus trap and swipe gestures
  useFocusTrap(true, modalRef, onClose);
  useSwipeGesture(contentRef, {
    threshold: 50,
    onSwipeLeft: () => goToNext(),
    onSwipeRight: () => goToPrevious(),
  });

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
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
      aria-describedby="gallery-help"
    >
      {/* Modal Container */}
      <div 
        ref={contentRef}
        className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
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
            <div className="absolute inset-0 flex items-center justify-center">
              <SkeletonLoader variant="image" width="100%" height="100%" />
            </div>
          )}

          {/* Image */}
          <OptimizedImage
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt}
            width={1200}
            height={800}
            quality={95}
            objectFit="contain"
            priority={!isLoading}
            onLoadingComplete={() => setIsLoading(false)}
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
            role="img"
            aria-label={`${currentIndex + 1} of ${totalImages}: ${currentImage.alt}`}
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="text-center text-white text-sm mb-4 max-w-2xl" id="gallery-title">
            {currentImage.caption}
          </p>
        )}

        {/* Controls */}
        <div className="w-full max-w-2xl flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="p-2 text-white hover:bg-white/20 transition-all rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={totalImages <= 1}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Counter & Thumbnails */}
          <div className="flex flex-col items-center gap-4 flex-1 mx-4">
            <p className="text-white text-sm" aria-live="polite">
              <span id="current-image">{currentIndex + 1}</span> / <span id="total-images">{totalImages}</span>
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
                  className={`flex-shrink-0 w-12 h-12 rounded transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    idx === currentIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1}: ${img.alt}`}
                  aria-current={idx === currentIndex ? 'true' : 'false'}
                >
                  <OptimizedImage
                    src={img.src}
                    alt={img.alt}
                    width={48}
                    height={48}
                    quality={80}
                    objectFit="cover"
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="p-2 text-white hover:bg-white/20 transition-all rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={totalImages <= 1}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Keyboard & Touch Help */}
        {(allowKeyboardNav || allowTouchGestures) && (
          <p className="text-center text-white/60 text-xs mt-4" id="gallery-help">
            {allowKeyboardNav && 'Use arrow keys to navigate • '}
            {allowTouchGestures && 'Swipe to navigate • '}
            Press ESC to close
          </p>
        )}
      </div>
    </div>
  );
}
