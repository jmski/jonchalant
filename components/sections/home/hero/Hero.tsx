import Link from 'next/link';

interface HeroProps {
  heroHeadline?: string;
  ctaText?: string;
  ctaLink?: string;
  auditMicrocopy?: string;
}

export function Hero({
  heroHeadline = 'Quiet Command.',
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

      {/* Content */}
      <div className="home-hero-grid">
        <div className="home-hero-content">

          <h1 className="home-hero-headline">
            {heroHeadline && (
              <span className="home-hero-headline-line">{heroHeadline}</span>
            )}
          </h1>

          {(ctaText || auditMicrocopy) && (
            <div className="home-hero-lower">
              <div className="home-hero-ctas">
                <div className="home-hero-cta-group">
                  {ctaText && (
                    <Link href={ctaLink} className="btn btn-primary">
                      {ctaText}
                    </Link>
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
