'use client';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  autoGlitch?: boolean;
}

export default function GlitchText({
  text,
  className = '',
  autoGlitch = false,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(autoGlitch);

  useEffect(() => {
    if (!autoGlitch) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [autoGlitch]);

  const glitchDuration = 0.4;
  const glitchOffset = 4;

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layer 1 (red) */}
      <span
        className="absolute top-0 left-0 opacity-75 pointer-events-none"
        style={{
          color: 'var(--glitch-red)',
          zIndex: isGlitching ? 20 : 0,
          transform: isGlitching ? `translateX(${glitchOffset}px)` : 'translateX(0)',
          textShadow: isGlitching ? `${glitchOffset}px 0 var(--glitch-magenta)` : 'none',
          transition: `all ${glitchDuration}s steps(2, end)`,
          animation: isGlitching ? `glitch ${glitchDuration}s steps(2, end)` : 'none',
        }}
      >
        {text}
      </span>

      {/* Glitch layer 2 (cyan) */}
      <span
        className="absolute top-0 left-0 opacity-75 pointer-events-none"
        style={{
          color: 'var(--glitch-cyan)',
          zIndex: isGlitching ? 21 : 0,
          transform: isGlitching ? `translateX(-${glitchOffset}px)` : 'translateX(0)',
          textShadow: isGlitching ? `-${glitchOffset}px 0 var(--glitch-magenta)` : 'none',
          transition: `all ${glitchDuration}s steps(2, end)`,
          animation: isGlitching ? `glitch-reverse ${glitchDuration}s steps(2, end)` : 'none',
        }}
      >
        {text}
      </span>
    </div>
  );
}
