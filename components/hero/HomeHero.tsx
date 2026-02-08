'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Add subtle animation on mount
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(20px)';
      
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'all 800ms ease-out';
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'translateY(0)';
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center py-12 md:py-20 overflow-hidden bg-primary"
    >
      {/* BOLD BACKGROUND - TECHNICAL GRID */}
      <div className="absolute inset-0 opacity-8" style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, var(--border-color) 25%, var(--border-color) 26%, transparent 27%, transparent 74%, var(--border-color) 75%, var(--border-color) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Accent lines - editorial style */}
      <div className="absolute top-1/4 left-0 w-96 h-1 bg-vibrant opacity-20" />
      <div className="absolute bottom-1/3 right-0 w-64 h-1 bg-neon opacity-15" />

      {/* Main content - ASYMMETRIC LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE - BOLD INTERACTIVE TEXT */}
        <div className="space-y-8">
          {/* Status badge - interactive */}
          <div 
            className="inline-flex items-center gap-3 px-5 py-3 border-2 border-vibrant bg-vibrant-faint group hover:border-neon hover:bg-neon-faint transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
          >
            <span className="w-2 h-2 bg-vibrant group-hover:bg-neon animate-pulse rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.15em] text-vibrant group-hover:text-neon transition-colors">
              🎬 NOW ACCEPTING
            </span>
          </div>

          {/* HEADLINE - INTERACTIVE GLITCH ON HOVER */}
          <div 
            className="relative"
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
          >
            <h1 
              className={`text-6xl sm:text-7xl lg:text-8xl font-black leading-tight heading-display text-primary mb-6 ${
                glitchActive ? 'glitch-text' : ''
              }`}
              style={{
                letterSpacing: glitchActive ? '0.02em' : '0.15em',
                transition: 'letter-spacing 150ms ease-in-out'
              }}
            >
              CHOREOGRAPHER<br />
              <span className="text-vibrant">MOVEMENT</span><br />
              ARCHITECT
            </h1>
            {/* Animated accent line */}
            <div 
              className="h-1 bg-vibrant transition-all duration-500"
              style={{
                width: glitchActive ? '100%' : '180px'
              }}
            />
          </div>

          {/* SUBHEADLINE - Sharp + Direct */}
          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-black text-secondary leading-tight">
              Dance Performance | Content Direction | Brand Strategy
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-tertiary font-body max-w-xl">
              Creating bold movement experiences for brands, audiences, and platforms that demand visual impact.
            </p>
          </div>

          {/* CTA BUTTONS - INTERACTIVE */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/collaborations"
              className="px-8 py-4 font-black uppercase tracking-[0.1em] text-sm border-2 border-vibrant bg-vibrant text-primary hover:bg-primary hover:text-vibrant transition-all duration-300 relative overflow-hidden group"
              onMouseEnter={() => setGlitchActive(true)}
              onMouseLeave={() => setGlitchActive(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                → START PROJECT
              </span>
              <div className="absolute inset-0 bg-vibrant scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ zIndex: 0 }} />
            </Link>
            <Link
              href="/dance"
              className="px-8 py-4 font-black uppercase tracking-[0.1em] text-sm border-3 border-primary text-primary hover:border-neon hover:text-neon transition-all duration-300 relative group"
            >
              ⬇ PORTFOLIO
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - TECHNICAL SCHEMATIC */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Outer technical frame */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
              {/* Outer border */}
              <rect x="20" y="20" width="360" height="360" fill="none" stroke="var(--border-color)" strokeWidth="2" />
              
              {/* Corner brackets */}
              <g stroke="var(--accent-vibrant)" strokeWidth="3" fill="none">
                <line x1="20" y1="20" x2="60" y2="20" />
                <line x1="20" y1="20" x2="20" y2="60" />
                
                <line x1="380" y1="20" x2="340" y2="20" />
                <line x1="380" y1="20" x2="380" y2="60" />
                
                <line x1="20" y1="380" x2="60" y2="380" />
                <line x1="20" y1="380" x2="20" y2="340" />
                
                <line x1="380" y1="380" x2="340" y2="380" />
                <line x1="380" y1="380" x2="380" y2="340" />
              </g>

              {/* Center circle with movement lines */}
              <circle cx="200" cy="200" r="60" fill="none" stroke="var(--accent-neon)" strokeWidth="2" opacity="0.6" strokeDasharray="8,4" />
              
              {/* Radiating movement lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = 200 + 100 * Math.cos(rad);
                const y2 = 200 + 100 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1="200"
                    y1="200"
                    x2={x2}
                    y2={y2}
                    stroke={i % 2 === 0 ? 'var(--accent-vibrant)' : 'var(--accent-neon)'}
                    strokeWidth="1"
                    opacity="0.4"
                  />
                );
              })}
              
              {/* Measurement markers */}
              <circle cx="120" cy="120" r="3" fill="var(--accent-vibrant)" opacity="0.7" />
              <circle cx="280" cy="120" r="3" fill="var(--accent-neon)" opacity="0.7" />
              <circle cx="120" cy="280" r="3" fill="var(--accent-neon)" opacity="0.7" />
              <circle cx="280" cy="280" r="3" fill="var(--accent-vibrant)" opacity="0.7" />
              
              {/* Center indicator */}
              <circle cx="200" cy="200" r="4" fill="var(--accent-vibrant)" />
              
              {/* Labels */}
              <text x="30" y="385" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace">CHOREOGRAPHY</text>
              <text x="310" y="385" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace" textAnchor="end">SYSTEMS</text>
            </svg>

            {/* Floating accent boxes */}
            <div className="absolute -top-8 -right-8 w-20 h-20 border-3 border-vibrant opacity-60 hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-neon opacity-40 hover:opacity-100 transition-opacity" style={{ borderStyle: 'dashed' }} />
          </div>
        </div>
      </div>

      {/* Bottom navigation - Retro style */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 sm:gap-12">
        <Link 
          href="/dance"
          className="text-[10px] uppercase tracking-[0.2em] font-black text-tertiary hover:text-vibrant transition-all duration-200 hover:scale-125 transform"
        >
          ▼ DANCE
        </Link>
        <Link 
          href="/showcase"
          className="text-[10px] uppercase tracking-[0.2em] font-black text-tertiary hover:text-vibrant transition-all duration-200 hover:scale-125 transform"
        >
          ▼ WORK
        </Link>
        <Link 
          href="/about"
          className="text-[10px] uppercase tracking-[0.2em] font-black text-tertiary hover:text-vibrant transition-all duration-200 hover:scale-125 transform"
        >
          ▼ INFO
        </Link>
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes glitch {
          0% { letter-spacing: 0.05em; }
          25% { letter-spacing: -0.02em; }
          50% { letter-spacing: 0.15em; }
          75% { letter-spacing: -0.01em; }
          100% { letter-spacing: 0.05em; }
        }
        
        .glitch-text {
          animation: glitch 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}
