import { useEffect, useRef } from 'react';

interface SwipeGestureOptions {
  threshold?: number; // Min pixels to register as swipe (default: 50)
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

/**
 * useSwipeGesture Hook
 * 
 * Detects swipe gestures (touch) on a DOM element.
 * Works with touchstart/touchend events.
 * 
 * @param ref - Reference to the element to track swipes on
 * @param options - Swipe callbacks and threshold distance
 * 
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * useSwipeGesture(containerRef, {
 *   onSwipeLeft: () => goToNext(),
 *   onSwipeRight: () => goToPrevious(),
 *   threshold: 50,
 * });
 */
export function useSwipeGesture(
  ref: React.RefObject<HTMLElement | null>,
  {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  }: SwipeGestureOptions = {}
) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
      touchStartY.current = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      touchEndY.current = e.changedTouches[0].screenY;

      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current - touchEndY.current;

      // Determine dominant direction
      const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

      if (isHorizontal) {
        if (Math.abs(diffX) > threshold) {
          if (diffX > 0) {
            // Swiped left (image moved left, show next)
            onSwipeLeft?.();
          } else {
            // Swiped right (image moved right, show previous)
            onSwipeRight?.();
          }
        }
      } else {
        if (Math.abs(diffY) > threshold) {
          if (diffY > 0) {
            onSwipeUp?.();
          } else {
            onSwipeDown?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, false);
    element.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart, false);
      element.removeEventListener('touchend', handleTouchEnd, false);
    };
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);
}
