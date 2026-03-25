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
  secondaryCtaText?: string;
  stats?: { value: string; label: string }[];
}

export function Hero({
  headline = 'Nobody Gets Confident',
  subheadline = 'by Thinking About It.',
  description = "You already know what you want to say. The problem isn't your ideas — it's that nobody ever trained you on how your body carries them. That's what we fix.",
  ctaText = 'Book Your Free Presence Audit',
  ctaLink = '/contact',
  auditMicrocopy = 'Free · 30 minutes · No commitment required',
  secondaryCtaText = 'Learn About My Approach',
  stats,
}: HeroProps) {
  const displayStats = (stats && stats.length > 0) ? stats : [
    { value: '10+', label: 'Years coaching & fitness' },
    { value: '8 wk', label: 'Core Program' },
    { value: 'Free', label: 'Presence Audit' },
  ];
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
              {secondaryCtaText}
            </Link>
          </div>

          {/* Stats strip */}
          <div className="home-hero-stats">
            {displayStats.filter(stat => stat.value).flatMap((stat, i) => [
              i > 0 ? <div key={`divider-${i}`} className="home-hero-stat-divider" aria-hidden="true" /> : null,
              <div key={stat.label} className="home-hero-stat">
                <span className="home-hero-stat-value">{stat.value}</span>
                <span className="home-hero-stat-label">{stat.label}</span>
              </div>,
            ])}
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
