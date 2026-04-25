import Link from 'next/link';
import { renderHeadline } from '@/lib/render-headline';

type HeroCTA = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  primaryCta: HeroCTA;
  secondaryCta?: HeroCTA;
  align?: 'left' | 'center';
  showOrbs?: boolean;
};

/**
 * Shared Hero primitive — props-driven, medium-agnostic.
 * Marketing hero recipe per SKILL.md + design-system.html §10.
 * Exported as GenericHero from components/sections/index.ts.
 */
export default function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  align = 'left',
  showOrbs = true,
}: HeroProps) {
  // Parse {{anchor}} — only the first match becomes an italic anchor word.
  // Additional {{...}} markers are rendered as plain text (stripped of braces).
  const renderedHeadline = renderHeadline(headline);

  return (
    <section className={`hero hero--${align}`} data-orbs={showOrbs}>
      {showOrbs && (
        <>
          <div className="hero-orb hero-orb--1" aria-hidden="true" />
          <div className="hero-orb hero-orb--2" aria-hidden="true" />
        </>
      )}
      <div className="hero-inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="headline-display">{renderedHeadline}</h1>
        {subhead && <p className="hero-sub">{subhead}</p>}
        <div className="hero-actions">
          <Link href={primaryCta.href} className="btn btn-primary">
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className="btn btn-secondary">
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
