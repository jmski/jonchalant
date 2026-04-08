import { HeroCyclingText } from './HeroCyclingText';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  heroHeadline?: string;
  cyclingOutcomes?: string[];
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  auditMicrocopy?: string;
}

export function Hero({
  heroHeadline = 'Quiet Command.',
  cyclingOutcomes,
  description,
  ctaText,
  ctaLink = '/contact',
  auditMicrocopy,
}: HeroProps) {
  return (
    <section className="home-hero-section">
      {/* Gradient wash */}
      <div className="home-hero-texture" aria-hidden="true" />

      {/* Floating ambient orbs */}
      <div className="home-hero-orb home-hero-orb--1" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb--2" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb--3" aria-hidden="true" />

      {/* Content */}
      <div className="home-hero-grid">
        <div className="home-hero-content">

          <p className="home-hero-eyebrow">Executive Presence Coaching</p>

          <h1 className="home-hero-headline">
            {heroHeadline && (
              <span className="home-hero-headline-line">{heroHeadline}</span>
            )}
          </h1>

          <div className="home-hero-accent-bar" aria-hidden="true" />

          {cyclingOutcomes && cyclingOutcomes.length > 0 && (
            <div className="home-hero-outcomes-row">
              <span className="home-hero-outcomes-prefix">So you can </span>
              <HeroCyclingText outcomes={cyclingOutcomes} />
            </div>
          )}

          {description && (
            <p className="home-hero-description">{description}</p>
          )}

          {(ctaText || auditMicrocopy) && (
            <div className="home-hero-lower">
              <div className="home-hero-ctas">
                <div className="home-hero-cta-group">
                  {ctaText && (
                    <Button as="link" href={ctaLink}>
                      {ctaText}
                    </Button>
                  )}
                  {auditMicrocopy && (
                    <p className="home-hero-cta-microcopy">{auditMicrocopy}</p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
