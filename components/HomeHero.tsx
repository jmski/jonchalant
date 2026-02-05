'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen flex items-center justify-center py-12 md:py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, var(--accent-vibrant), transparent 50%)',
      }} />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 80% 80%, var(--accent-vibrant), transparent 50%)',
      }} />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Accent badge */}
        <div className="mb-8 flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: 'var(--badge-gold-bg)',
              border: '1px solid var(--badge-gold-border)',
              color: 'var(--badge-gold-text)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-vibrant)' }} />
            Creative Professional
          </span>
        </div>

        {/* Main headline */}
        <h1 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200"
          style={{ color: 'var(--text-primary)' }}
        >
          Choreographer & <br />
          <span style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Content Creator
          </span>
        </h1>

        {/* Subheadline */}
        <p 
          className="text-lg sm:text-xl lg:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300"
          style={{ color: 'var(--text-secondary)' }}
        >
          Professional dance portfolio, brand collaborations, and creative movement experiences
        </p>

        {/* Description */}
        <p 
          className="text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-700 delay-400"
          style={{ color: 'var(--text-tertiary)' }}
        >
          I combine technical precision with creative vision to deliver exceptional dance content, strategic collaborations, and memorable experiences for brands and audiences worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-3 duration-700 delay-500">
          <Link
            href="/collaborations"
            className="px-8 py-4 rounded font-semibold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 text-sm"
            style={{
              backgroundColor: 'var(--accent-vibrant)',
              color: 'var(--bg-primary)',
              border: '2px solid var(--accent-vibrant)',
            }}
          >
            Let's Collaborate
          </Link>
          <Link
            href="/dance"
            className="px-8 py-4 rounded font-semibold uppercase tracking-widest transition-all duration-300 border-2 text-sm hover:opacity-80"
            style={{
              borderColor: 'var(--text-primary)',
              color: 'var(--text-primary)',
            }}
          >
            View Portfolio
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-16 flex justify-center gap-8 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-600">
          <Link 
            href="/dance"
            className="text-sm uppercase tracking-widest font-semibold transition-colors duration-300 hover:text-accent-vibrant"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Dance ↓
          </Link>
          <Link 
            href="/showcase"
            className="text-sm uppercase tracking-widest font-semibold transition-colors duration-300 hover:text-accent-vibrant"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Showcase ↓
          </Link>
          <Link 
            href="/about"
            className="text-sm uppercase tracking-widest font-semibold transition-colors duration-300 hover:text-accent-vibrant"
            style={{ color: 'var(--text-tertiary)' }}
          >
            About ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
