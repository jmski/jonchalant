'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

interface HeroProps {
  heroHeadline?: string;
  cyclingOutcomes?: string[];
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  auditMicrocopy?: string;
  secondaryCtaText?: string;
  stats?: { value: string; label: string }[];
}

export function Hero({
  heroHeadline,
  cyclingOutcomes,
  description,
  ctaText,
  ctaLink = '/contact',
  auditMicrocopy,
  secondaryCtaText,
  stats,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const n = cyclingOutcomes?.length ?? 0;
  const nextIdx     = (index + 1) % n;
  const upcomingIdx = (index + 2) % n;

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % n);
        setAnimating(false);
      }, 500);
    }, 3500);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section className="home-hero-section">
      {/* Gradient wash */}
      <div className="home-hero-texture" aria-hidden="true" />

      {/* Floating ambient orbs */}
      <div className="home-hero-orb home-hero-orb--1" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb--2" aria-hidden="true" />

      {/* Background canvas */}
      <div className="home-hero-visual" aria-hidden="true">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="home-hero-grid">
        <div className="home-hero-content">

          <h1 className="home-hero-headline">
            {heroHeadline && (
              <span className="home-hero-headline-line">{heroHeadline}</span>
            )}
            {cyclingOutcomes && cyclingOutcomes.length > 0 && (
              <div className="home-hero-slot" aria-live="polite" aria-atomic="true">
                <div className={`home-hero-slot-track${animating ? ' home-hero-slot-track--animating' : ''}`}>
                  <span className="home-hero-slot-item home-hero-slot-item--current">{cyclingOutcomes[index]}</span>
                  <span className="home-hero-slot-item home-hero-slot-item--next">{cyclingOutcomes[nextIdx]}</span>
                  <span className="home-hero-slot-item home-hero-slot-item--upcoming" aria-hidden="true">{cyclingOutcomes[upcomingIdx]}</span>
                </div>
              </div>
            )}
          </h1>

          {(description || ctaText || secondaryCtaText || stats) && (
            <div className="home-hero-lower">
              {description && (
                <p className="home-hero-description">{description}</p>
              )}

              <div className="home-hero-ctas">
                <div className="home-hero-cta-group">
                  {ctaText && (
                    <Link href={ctaLink} className="home-hero-cta-primary">
                      {ctaText}
                    </Link>
                  )}
                  {auditMicrocopy && (
                    <p className="home-hero-cta-microcopy">{auditMicrocopy}</p>
                  )}
                </div>
                {secondaryCtaText && (
                  <Link href="/about" className="home-hero-cta-secondary">
                    {secondaryCtaText}
                  </Link>
                )}
              </div>

              {stats && stats.length > 0 && (
                <div className="home-hero-stats">
                  {stats.filter(stat => stat.value).flatMap((stat, i) => [
                    i > 0 ? <div key={`divider-${i}`} className="home-hero-stat-divider" aria-hidden="true" /> : null,
                    <div key={stat.label} className="home-hero-stat">
                      <span className="home-hero-stat-value">{stat.value}</span>
                      <span className="home-hero-stat-label">{stat.label}</span>
                    </div>,
                  ])}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
