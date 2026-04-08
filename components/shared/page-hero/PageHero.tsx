import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface PageHeroProps {
  eyebrow: string;
  headline: string | string[];
  subheading: string;
  description?: string;
  ctaButtons?: CTAButton[];
  rightColumn?: ReactNode;
}

export default function PageHero({
  eyebrow,
  headline,
  subheading,
  description,
  ctaButtons = [],
  rightColumn,
}: PageHeroProps) {
  const headlineLines = Array.isArray(headline) ? headline : [headline];

  return (
    <section className="page-hero-section">
      <div className={`page-hero-inner${rightColumn ? ' page-hero-inner--split' : ''}`}>
        <div className="page-hero-content">
          <span className="page-hero-eyebrow">{eyebrow}</span>
          <h1 className="page-hero-headline">
            {headlineLines.map((line, idx) => (
              <span key={idx} className="page-hero-headline-line">{line}</span>
            ))}
          </h1>
          <p className="page-hero-subheading">{subheading}</p>
          {description && <p className="page-hero-description">{description}</p>}
          {ctaButtons.length > 0 && (
            <div className="page-hero-ctas">
              {ctaButtons.map((btn, idx) => (
                <Button
                  key={idx}
                  as="a"
                  href={btn.href}
                  variant={btn.variant === 'secondary' ? 'secondary' : 'primary'}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {rightColumn && <div className="page-hero-aside">{rightColumn}</div>}
      </div>
      <div className="page-hero-divider" />
    </section>
  );
}
