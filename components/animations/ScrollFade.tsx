'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollFade({ children, className = '', delay = 0 }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-slideInUp' : 'opacity-0'} transition-all ${className}`}
    >
      {children}
    </div>
  );
}
