'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale-fade' | 'snap';
  delay?: number; // ms
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fade',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // CSS handles reduced-motion via @media (prefers-reduced-motion: no-preference)
    // — elements are visible at their natural opacity when motion is reduced.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Remove will-change after animation completes to free GPU resources
  const duration = variant === 'snap' ? 150 : 300;
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setDone(true), delay + duration + 50);
    return () => clearTimeout(timer);
  }, [visible, delay, duration]);

  const variantClass = `scroll-reveal--${variant}`;
  const visibleClass = visible ? 'scroll-reveal--visible' : '';
  const willChange = !done ? { willChange: 'transform, opacity' as const } : {};

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${variantClass} ${visibleClass} ${className}`.trim()}
      style={willChange}
    >
      {children}
    </div>
  );
}
