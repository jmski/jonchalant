'use client';

import Link from 'next/link';
import IkigaiSymbol from '@/components/decorative/IkigaiSymbol';

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Content (60%) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Status indicator - Minimal badge */}
            <div className="inline-flex items-center">
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                ✓ Now Accepting Coaching Clients
              </span>
            </div>

            {/* Headline - Cormorant Garamond, generous letter-spacing */}
            <div className="space-y-0 relative">
              <h1 
                className="font-headline font-normal leading-tight relative z-10"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  letterSpacing: '0.03em',
                  lineHeight: '1.15'
                }}
              >
                <div style={{ color: 'var(--text-primary)' }}>
                  Body-Led
                  <br />
                  Leadership
                </div>
                <div style={{ color: 'var(--accent-primary)', marginTop: '0.25em' }}>
                  for Introverts
                </div>
              </h1>
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
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
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

          {/* RIGHT: Visual (40%) - Ikigai Symbol - Desktop only */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <IkigaiSymbol size={380} opacity={0.95} />
          </div>
        </div>

        {/* Mobile Ikigai Symbol - Visible on mobile/tablet only - Bottom of page */}
        <div className="flex lg:hidden justify-center mt-16 sm:mt-20">
          <IkigaiSymbol size={280} opacity={0.95} />
        </div>
      </div>
    </section>
  );
}
