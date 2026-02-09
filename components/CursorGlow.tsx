'use client';
import { useRef, RefObject } from 'react';
import { usePointerPosition } from '@/lib/hooks/usePointerPosition';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const position = usePointerPosition(glowRef as RefObject<HTMLElement>, true);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-vibrant) 20%, transparent) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 10,
        opacity: 0.7,
      } as React.CSSProperties}
    />
  );
}
