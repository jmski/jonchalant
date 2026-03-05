'use client';

import Link from 'next/link';
import IkigaiSymbol from '@/components/decorative/IkigaiSymbol';

interface HomeHeroSectionProps {
  headline?: string;
  subheadline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
}

export function HomeHeroSection({ 
  headline = 'Body-Led Leadership',
  subheadline = 'for Introverts',
  description = 'Build executive presence, quiet command, and confident communication through movement-based coaching designed for introverts.',
  ctaText = 'Start Your Transformation',
  ctaLink = '/contact',
  badge = '✓ Now Accepting Coaching Clients'
}: HomeHeroSectionProps) {
  return (
    <section className="home-hero-section">
      {/* Background texture */}
      <div className="home-hero-texture" />

      {/* Main content: Editorial 60/40 split */}
      <div className="home-hero-grid">
        
        {/* LEFT: Content (60%) */}
        <div className="home-hero-content">
          {/* Status badge */}
          {badge && (
            <div className="home-hero-badge">
              <span>{badge}</span>
            </div>
          )}

          {/* Headline */}
          <div className="home-hero-headline">
            <div className="home-hero-headline-main">
              {headline}
            </div>
            <div className="home-hero-headline-accent">
              {subheadline}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="home-hero-description">
              {description}
            </p>
          )}

          {/* CTA Button */}
          <div className="home-hero-ctas">
            <Link href={ctaLink} className="home-hero-cta-primary">
              {ctaText}
            </Link>
            <Link href="/about" className="home-hero-cta-secondary">
              Learn About My Approach
            </Link>
          </div>
        </div>

        {/* RIGHT: Ikigai Symbol (40%) */}
        <div className="home-hero-visual">
          <IkigaiSymbol />
        </div>
      </div>
    </section>
  );
}
