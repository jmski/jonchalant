'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

interface HeroProps {
  headline?: string;
  subheadline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  auditMicrocopy?: string;
}

export function Hero({ 
  headline = 'Body-Led Leadership',
  subheadline = 'for Introverts',
  description = 'Build executive presence, quiet command, and confident communication through movement-based coaching designed for introverts.',
  ctaText = 'Book Your Free Presence Audit',
  ctaLink = '/contact',
  auditMicrocopy = 'Free · 30 minutes · No commitment required'
}: HeroProps) {
  return (
    <section className="home-hero-section">
      {/* Gradient wash */}
      <div className="home-hero-texture" aria-hidden="true" />

      {/* Floating ambient orbs */}
      <div className="home-hero-orb home-hero-orb--1" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb--2" aria-hidden="true" />

      {/* Main grid */}
      <div className="home-hero-grid">

        {/* LEFT: Content */}
        <div className="home-hero-content">

          <h1 className="home-hero-headline">
            <span className="home-hero-headline-line">{headline}</span>
            <span className="home-hero-headline-accent">{subheadline}</span>
          </h1>

          {description && (
            <p className="home-hero-description">{description}</p>
          )}

          <div className="home-hero-ctas">
            <div className="home-hero-cta-group">
              <Link href={ctaLink} className="home-hero-cta-primary">
                {ctaText}
              </Link>
              {auditMicrocopy && (
                <p className="home-hero-cta-microcopy">{auditMicrocopy}</p>
              )}
            </div>
            <Link href="/about" className="home-hero-cta-secondary">
              Learn About My Approach
            </Link>
          </div>

          {/* Stats strip */}
          <div className="home-hero-stats">
            <div className="home-hero-stat">
              <span className="home-hero-stat-value">47+</span>
              <span className="home-hero-stat-label">Leaders coached</span>
            </div>
            <div className="home-hero-stat-divider" aria-hidden="true" />
            <div className="home-hero-stat">
              <span className="home-hero-stat-value">92%</span>
              <span className="home-hero-stat-label">Report measurable results</span>
            </div>
            <div className="home-hero-stat-divider" aria-hidden="true" />
            <div className="home-hero-stat">
              <span className="home-hero-stat-value">8 wk</span>
              <span className="home-hero-stat-label">Core program</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive 3D particle sphere */}
        <div className="home-hero-visual" aria-hidden="true">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
