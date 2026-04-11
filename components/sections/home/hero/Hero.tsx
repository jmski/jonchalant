import { HeroCyclingText } from './HeroCyclingText';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  eyebrow?: string;
  heroHeadline?: string;
  cyclingOutcomes?: string[];
  description?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  auditMicrocopy?: string;
}

export function Hero({
  eyebrow,
  heroHeadline = 'Quiet Command.',
  cyclingOutcomes,
  description,
  subtext,
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

          {eyebrow && <p className="home-hero-eyebrow hero-animate-in" data-delay="0">{eyebrow}</p>}

          <h1 className="home-hero-headline hero-animate-in" data-delay="1">
            {heroHeadline && (
              <span className="home-hero-headline-line">{heroHeadline}</span>
            )}
          </h1>

          <div className="home-hero-accent-bar hero-animate-in" data-delay="2" aria-hidden="true" />

          {cyclingOutcomes && cyclingOutcomes.length > 0 && (
            <div className="home-hero-outcomes-row hero-animate-in" data-delay="2">
              <span className="home-hero-outcomes-prefix">So you can </span>
              <HeroCyclingText outcomes={cyclingOutcomes} />
            </div>
          )}

          {description && (
            <p className="home-hero-description hero-animate-in" data-delay="3">{description}</p>
          )}

          {subtext && (
            <span className="home-hero-subtext hero-animate-in" data-delay="3">{subtext}</span>
          )}

          {(ctaText || auditMicrocopy) && (
            <div className="home-hero-lower hero-animate-in" data-delay="4">
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
