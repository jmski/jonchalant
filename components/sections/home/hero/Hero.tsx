import { Hero as GenericHero } from '@/components/shared/hero';

type HomeHeroProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const DEFAULTS = {
  eyebrow: 'Find your purpose',
  headline: 'Most people are in the right industry. {{Wrong}} role.',
  subhead: 'Ikigai names the gap. The eight-question assessment shows you where you are — and what to build next.',
  primaryCtaLabel: 'Discover Your Ikigai',
  primaryCtaHref: '/ikigai',
  secondaryCtaLabel: 'How it works',
  secondaryCtaHref: '/lessons/four-circles',
};

export function Hero(props: HomeHeroProps) {
  const copy = { ...DEFAULTS, ...props };
  return (
    <GenericHero
      eyebrow={copy.eyebrow}
      headline={copy.headline}
      subhead={copy.subhead}
      primaryCta={{
        label: copy.primaryCtaLabel,
        href: copy.primaryCtaHref,
      }}
      secondaryCta={
        copy.secondaryCtaLabel && copy.secondaryCtaHref
          ? { label: copy.secondaryCtaLabel, href: copy.secondaryCtaHref }
          : undefined
      }
    />
  );
}

