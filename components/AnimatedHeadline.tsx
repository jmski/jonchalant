'use client';
import { useEffect, useRef, useState, RefObject } from 'react';
import { useScrollTrigger } from '@/lib/hooks/useScrollTrigger';

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function AnimatedHeadline({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
}: AnimatedHeadlineProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useScrollTrigger(ref as RefObject<HTMLElement>, 0.1);

  useEffect(() => {
    if (!isVisible || displayedChars >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedChars((prev) => prev + 1);
    }, delay + displayedChars * duration * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, displayedChars, text.length, delay, duration]);

  const displayedText = text.substring(0, displayedChars);
  const remainingText = text.substring(displayedChars);

  return (
    <h1 ref={ref} className={className}>
      <span style={{ opacity: 1, transition: 'opacity 0.1s' }}>
        {displayedText}
      </span>
      <span
        style={{
          opacity: 0.3,
          color: 'var(--text-secondary)',
          animation: displayedChars < text.length ? 'pulse 1.5s infinite' : 'none',
        }}
      >
        {remainingText}
      </span>
    </h1>
  );
}
