/**
 * useScrollTrigger Hook
 * Detects when an element enters the viewport using IntersectionObserver
 * Used for scroll-based animations and lazy loading effects
 */

import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Trigger a callback when element enters viewport
 * @param ref - React ref to the element to observe
 * @param threshold - IntersectionObserver threshold (0-1), default 0.1
 * @param once - If true, unobserve after first trigger, default true
 * @returns Boolean indicating if element is visible in viewport
 */
export function useScrollTrigger<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  threshold: number = 0.1,
  once: boolean = true
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (once) {
            hasTriggered.current = true;
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [threshold, once, ref]);

  return isVisible;
}
