'use client';

import { ReactNode, Children, cloneElement, isValidElement } from 'react';
import { useScrollAnimation, AnimationVariant } from '@/lib/hooks/useScrollAnimation';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  /**
   * Animation variant for all children
   */
  variant?: AnimationVariant;
  /**
   * Delay between each child's animation start (ms)
   */
  staggerDelay?: number;
  /**
   * Initial delay before first child animates (ms)
   */
  delay?: number;
  /**
   * Viewport threshold for triggering animation
   */
  threshold?: number;
  /**
   * Animation duration for each child (ms)
   */
  duration?: number;
  /**
   * Easing function for animations
   */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  /**
   * Only animate once (default: true)
   */
  triggerOnce?: boolean;
  /**
   * Repeat animation when element scrolls in/out
   */
  repeat?: boolean;
}

/**
 * ScrollStagger Component
 * 
 * Manages staggered animations for groups of child elements
 * Each child animates in sequence with configurable delays
 * 
 * @example
 * <ScrollStagger variant="slideInUp" staggerDelay={100}>
 *   <div>Item 1 - animates first</div>
 *   <div>Item 2 - animates 100ms later</div>
 *   <div>Item 3 - animates 200ms later</div>
 * </ScrollStagger>
 */
export default function ScrollStagger({
  children,
  className = '',
  variant = 'slideInUp',
  staggerDelay = DESIGN_TOKENS.TIMING.ANIMATION.STAGGER_INCREMENT,
  delay = 0,
  threshold = 0.1,
  duration,
  easing = 'ease-out',
  triggerOnce = true,
  repeat = false,
}: ScrollStaggerProps) {
  // Use scroll animation on container to coordinate stagger timing
  const { ref, isAnimating } = useScrollAnimation({
    variant,
    delay,
    threshold,
    duration,
    easing,
    triggerOnce,
    repeat,
  });

  // Map children with staggered delays
  const staggeredChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;

    // Calculate delay for this child
    const childDelay = staggerDelay * index;

    // Clone child with scroll animation props
    return cloneElement(child, {
      'data-stagger-index': index,
      'data-stagger-delay': childDelay,
      className: `${(child.props as any).className || ''} ${
        isAnimating ? getStaggerAnimationClass(variant) : 'opacity-0'
      }`,
      style: {
        ...(child.props as any).style,
        transition: isAnimating
          ? `all ${duration || 500}ms ${easing} ${childDelay}ms`
          : 'none',
      },
    } as any);
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {staggeredChildren}
    </div>
  );
}

/**
 * Get animation class for staggered children
 */
function getStaggerAnimationClass(variant: AnimationVariant): string {
  const classMap: Record<AnimationVariant, string> = {
    fadeIn: 'animate-fadeIn',
    slideInUp: 'animate-slideInUp',
    slideInDown: 'animate-slideInDown',
    slideInLeft: 'animate-slideInLeft',
    slideInRight: 'animate-slideInRight',
    scaleUp: 'animate-scaleUp',
    rotateIn: 'animate-rotateIn',
    zoomIn: 'animate-zoomIn',
    blurIn: 'animate-blurIn',
  };

  return classMap[variant] || classMap.fadeIn;
}

/**
 * Helper component: ScrollStaggerItem
 * 
 * Use this to wrap individual items in a staggered group
 * Provides proper stagger timing without manual delay calculations
 * 
 * @example
 * <ScrollStagger>
 *   <ScrollStaggerItem>Item 1</ScrollStaggerItem>
 *   <ScrollStaggerItem>Item 2</ScrollStaggerItem>
 * </ScrollStagger>
 */
export function ScrollStaggerItem({
  children,
  className = '',
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return <div className={className}>{children}</div>;
}
