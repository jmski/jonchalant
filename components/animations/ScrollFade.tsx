'use client';

import { useScrollAnimation, AnimationVariant, getAnimationClass } from '@/lib/hooks/useScrollAnimation';
import { CSSProperties } from 'react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // New enhanced props
  variant?: AnimationVariant;
  threshold?: number;
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  triggerOnce?: boolean;
  repeat?: boolean;
}

/**
 * ScrollFade Component
 * 
 * Triggers animation when element enters viewport
 * Supports multiple animation variants with customizable timing
 * 
 * @example
 * <ScrollFade variant="slideInUp" delay={100}>
 *   Content animates in when scrolled into view
 * </ScrollFade>
 */
export default function ScrollFade({
  children,
  className = '',
  delay = 0,
  variant = 'slideInUp',
  threshold = 0.1,
  duration,
  easing = 'ease-out',
  triggerOnce = true,
  repeat = false,
}: ScrollFadeProps) {
  const { ref, isAnimating } = useScrollAnimation({
    variant,
    delay,
    threshold,
    duration,
    easing,
    triggerOnce,
    repeat,
  });

  const animationClass = getAnimationClass(variant, isAnimating);
  const transitionDuration = duration || DESIGN_TOKENS.TIMING.DURATION_BASE;

  const style: CSSProperties = {
    transition: isAnimating ? `all ${transitionDuration}ms ${easing}` : 'none',
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animationClass} transition-all ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
