'use client';

import { useRef, RefObject } from 'react';
import { usePointerPosition } from '@/lib/hooks/usePointerPosition';

export default function StageLighting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const position = usePointerPosition(containerRef as RefObject<HTMLElement>, false);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* Main Spotlight */}
      <div
        className="absolute transition-all duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        {/* Primary spotlight glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, var(--light-cyan) 0%, var(--light-cyan-medium) 30%, transparent 70%)`,
            filter: 'blur(40px)',
            boxShadow: '0 0 60px var(--light-cyan-glow)',
          }}
        />

        {/* Inner bright core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at center, var(--light-gold) 0%, var(--light-gold-medium) 50%, transparent 100%)`,
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Secondary Rim Light (opposite side) */}
      <div
        className="absolute transition-all duration-100"
        style={{
          left: `${Math.max(100, Math.min(window.innerWidth - 100, position.x + 150))}px`,
          top: `${Math.max(100, Math.min(window.innerHeight - 100, position.y - 150))}px`,
          width: '300px',
          height: '300px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, var(--light-pink) 0%, var(--light-pink-subtle) 40%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />
      </div>

      {/* Vignette overlay (darken edges) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--overlay-dark-medium) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Spotlight cone effect */}
      <div
        className="absolute transition-all duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: `conic-gradient(
            from 0deg,
            rgba(0, 217, 255, 0) 0deg,
            rgba(0, 217, 255, 0.1) 45deg,
            rgba(0, 217, 255, 0.15) 90deg,
            rgba(0, 217, 255, 0.1) 135deg,
            rgba(0, 217, 255, 0) 180deg
          )`,
          filter: 'blur(30px)',
          clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
          opacity: 0.5,
        }}
      />

      {/* Bloom effect layer */}
      <div
        className="absolute transition-all duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}
