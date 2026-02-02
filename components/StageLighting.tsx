'use client';

import { useState, useEffect, useRef } from 'react';

export default function StageLighting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  if (!isClient) return null;

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
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
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
          left: `${Math.max(100, Math.min(window.innerWidth - 100, mousePosition.x + 150))}px`,
          top: `${Math.max(100, Math.min(window.innerHeight - 100, mousePosition.y - 150))}px`,
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
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
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
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
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
