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
  const [showHelpHint, setShowHelpHint] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];
  const totalImages = images.length;
  
  // Preload next and previous images for smooth navigation
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload next image
    const nextIndex = (currentIndex + 1) % totalImages;
    preloadImage(images[nextIndex].src);

    // Preload previous image
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    preloadImage(images[prevIndex].src);
  }, [currentIndex, images, totalImages]);

  // Setup focus trap and swipe gestures
  useFocusTrap(true, modalRef, onClose);
  useSwipeGesture(contentRef, {
    threshold: 50,
    onSwipeLeft: () => goToNext(),
    onSwipeRight: () => goToPrevious(),
  });

  // Navigate to next image
  const goToNext = useCallback(() => {
    setTransitionDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setIsLoading(true);
    setShowHelpHint(false);
  }, [totalImages]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setTransitionDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setIsLoading(true);
    setShowHelpHint(false);
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
          className="absolute top-4 right-4 z-10 p-2 text-overlay hover:bg-overlay-light transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            '--tw-ring-color': '#ffffff',
            '--tw-ring-offset-color': 'rgba(0, 0, 0, 0.5)',
          } as React.CSSProperties}
          aria-label="Close gallery"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image Container */}
        <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center mb-4">
          {/* Loading State with Blur Placeholder */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {/* Blur-up placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md pointer-events-none" />
              <div className="text-center relative z-10">
                <SkeletonLoader variant="image" width="100%" height="100%" />
                <p className="text-white text-sm mt-4 opacity-70 animate-pulse">Loading image...</p>
              </div>
            </div>
          )}

          {/* Image with fade-in animation and LQIP support */}
          <div className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl animate-fadeIn"
              role="img"
              aria-label={`${currentIndex + 1} of ${totalImages}: ${currentImage.alt}`}
            />
          </div>
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="text-center text-overlay text-sm mb-4 max-w-2xl" id="gallery-title">
            {currentImage.caption}
          </p>
        )}

        {/* Controls */}
        <div className="w-full max-w-2xl flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="p-2 text-overlay hover:bg-overlay-light active:bg-overlay-lighter transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110"
            style={{
              '--tw-ring-color': '#ffffff',
              '--tw-ring-offset-color': 'rgba(0, 0, 0, 0.5)',
            } as React.CSSProperties}
            disabled={totalImages <= 1}
            aria-label="Previous image"
            title="Previous (←)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Counter & Thumbnails */}
          <div className="flex flex-col items-center gap-4 flex-1 mx-4">
            <div className="relative h-6 flex items-center justify-center">
              <p className="text-overlay text-sm font-medium transition-all duration-300" aria-live="polite" aria-atomic="true">
                <span className={`inline-block transition-all duration-300 ${isLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`} id="current-image">{currentIndex + 1}</span> / <span id="total-images">{totalImages}</span>
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto max-w-full pb-2 scroll-smooth">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTransitionDirection(idx > currentIndex ? 'right' : 'left');
                    setCurrentIndex(idx);
                    setIsLoading(true);
                    setShowHelpHint(false);
                  }}
                  className={`shrink-0 w-12 h-12 rounded transition-all focus:outline-none focus:ring-2 hover:scale-110 ${
                    idx === currentIndex
                      ? 'ring-2 scale-110 shadow-lg'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    '--tw-ring-color': idx === currentIndex ? '#ffffff' : 'transparent',
                  } as React.CSSProperties}
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
            className="p-2 text-overlay hover:bg-overlay-light active:bg-overlay-lighter transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110"
            style={{
              '--tw-ring-color': '#ffffff',
              '--tw-ring-offset-color': 'rgba(0, 0, 0, 0.5)',
            } as React.CSSProperties}
            disabled={totalImages <= 1}
            aria-label="Next image"
            title="Next (→)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Keyboard & Touch Help */}
        {(allowKeyboardNav || allowTouchGestures) && (
          <div className="mt-6 text-center space-y-3">
            {showHelpHint && (
            <div className="px-4 py-3 bg-overlay-lighter backdrop-blur-sm rounded-lg border border-overlay-light animate-fadeIn">
              <div className="space-y-2 text-sm">
                {allowKeyboardNav && (
                  <div className="flex justify-center gap-6 text-overlay flex-wrap">
                    <span className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-overlay-light rounded text-xs font-bold">←</kbd>
                      <span>Previous</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-overlay-light rounded text-xs font-bold">→</kbd>
                      <span>Next</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-overlay-light rounded text-xs font-bold">ESC</kbd>
                        <span>Close</span>
                      </span>
                    </div>
                  )}
                  {allowTouchGestures && (
                    <p className="text-white/70 text-xs">💫 Swipe to navigate</p>
                  )}
                </div>
              </div>
            )}
            <p className="text-white/50 text-xs">
              {showHelpHint ? (
                <button
                  onClick={() => setShowHelpHint(false)}
                  className="hover:text-white/70 transition-colors underline"
                  aria-label="Hide keyboard shortcuts"
                >
                  Hide shortcuts
                </button>
              ) : (
                <button
                  onClick={() => setShowHelpHint(true)}
                  className="hover:text-white/70 transition-colors underline"
                  aria-label="Show keyboard shortcuts"
                >
                  Show shortcuts
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
