'use client';

import Link from 'next/link';
import { EnsoCircle } from '@/components/decorative';

export default function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Optional: Subtle washi paper texture (very faint) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(74, 58, 92, 0.02) 0%, transparent 50%)`
        }}
      />

      {/* Main content: Editorial 60/40 split */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Content (60%) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status indicator - Minimal badge */}
            <div className="inline-flex items-center">
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                ✓ Now Accepting Coaching Clients
              </span>
            </div>

            {/* Headline - Cormorant Garamond, generous letter-spacing */}
            <div className="space-y-2 relative">
              {/* Subtle Enso circle behind headline (Ikigai/Wellness pillar) */}
              <EnsoCircle
                size={280}
                opacity={0.06}
                strokeWidth={1.5}
                style={{
                  top: '-40px',
                  left: '-60px',
                  color: 'var(--accent-primary)',
                }}
              />
              
              <h1 
                className="font-headline font-normal leading-tight relative z-10"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  letterSpacing: '0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: '1.15'
                }}
              >
                Body-Led
                <br />
                Leadership
              </h1>
              <h2 
                className="font-headline font-normal"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                  letterSpacing: '0.03em',
                  color: 'var(--accent-primary)',
                  lineHeight: '1.15'
                }}
              >
                for Introverts
              </h2>
            </div>

            {/* Thin accent line (Ma principle) */}
            <div className="h-px w-16" style={{ backgroundColor: 'var(--accent-primary)' }} />

            {/* Subheading */}
            <p 
              className="text-lg sm:text-xl font-body font-normal leading-relaxed"
              style={{
                color: 'var(--text-secondary)',
                letterSpacing: '0.01em',
                maxWidth: '32rem'
              }}
            >
              Command a room without losing your soul
            </p>

            {/* Body copy - Premium, breathy */}
            <p 
              className="text-base sm:text-lg font-body font-normal leading-relaxed"
              style={{
                color: 'var(--text-tertiary)',
                letterSpacing: '0.005em',
                lineHeight: '1.75',
                maxWidth: '34rem'
              }}
            >
              I teach Quiet Command through three proven pillars: Physical Grounding for presence, Social Scripting for clarity, and Introvert Mastery for sustainable energy. Transform how the world sees you—from the inside out.
            </p>

            {/* CTA Buttons - Sleek, minimal */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/programs"
                className="px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider transition-all duration-300"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'white',
                  borderRadius: '0px',
                  border: '1px solid var(--accent-primary)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-subtle)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-primary)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                Book Your Audit
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider transition-all duration-300"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderRadius: '0px',
                  border: '1px solid var(--border-color)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
              >
                My Story
              </Link>
            </div>
          </div>

          {/* RIGHT: Visual (40%) - Space for future image or graphic */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center min-h-96">
            {/* Placeholder for future visual element */}
            <div 
              className="w-full h-full rounded-sm flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                Editorial Portrait / Graphics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Subtle */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-3">
        <p className="text-xs font-body uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          Scroll
        </p>
        <div 
          className="w-px h-8"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>
    </section>
  );
}
