/**
 * usePointerPosition Hook
 * Tracks mouse/touch position relative to a container element
 * Used for interactive effects like spotlights, glow effects, etc.
 */

import { useState, useEffect, useRef, RefObject } from 'react';

export interface PointerPosition {
  x: number;
  y: number;
}

/**
 * Track pointer (mouse/touch) position relative to a container element
 * @param containerRef - React ref to the container element
 * @param trackGlobal - If true, track global window position; if false, track relative to container
 * @returns Object with x, y position coordinates
 */
export function usePointerPosition<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T>,
  trackGlobal: boolean = false
): PointerPosition {
  const [position, setPosition] = useState<PointerPosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (trackGlobal) {
        setPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      } else {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        setPosition({ x, y });
      }
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as TouchEvent;
      if (touchEvent.touches.length === 0) return;

      const touch = touchEvent.touches[0];

      if (trackGlobal) {
        setPosition({ x: touch.clientX, y: touch.clientY });
      } else {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        setPosition({ x, y });
      }
    };

    const target = trackGlobal ? window : containerRef.current;

    if (target) {
      target.addEventListener('mousemove', handleMouseMove);
      target.addEventListener('touchmove', handleTouchMove, { passive: true });

      return () => {
        target.removeEventListener('mousemove', handleMouseMove);
        target.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [trackGlobal]);

  if (!isClient) {
    return { x: 0, y: 0 };
  }

  return position;
}
