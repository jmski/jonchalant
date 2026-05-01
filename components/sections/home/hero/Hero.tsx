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
  eyebrow: 'Ikigai · The entry point',
  headline: 'Find the work you were {{meant}} for.',
  subhead: 'Dance is my medium. Yours will be different. Eight honest questions to read what actually fits — then a practice to learn to inhabit it.',
  primaryCtaLabel: 'Discover Your Ikigai',
  primaryCtaHref: '/ikigai',
  secondaryCtaLabel: 'Read the essay',
  secondaryCtaHref: '/about',
};

export function Hero(props: HomeHeroProps) {
  // Use ?? per-field — spreading `props` would let `undefined` values from
  // Sanity (unset fields) overwrite the defaults, which then crashes
  // <Link href={undefined}> during render.
  const copy = {
    eyebrow: props.eyebrow ?? DEFAULTS.eyebrow,
    headline: props.headline ?? DEFAULTS.headline,
    subhead: props.subhead ?? DEFAULTS.subhead,
    primaryCtaLabel: props.primaryCtaLabel ?? DEFAULTS.primaryCtaLabel,
    primaryCtaHref: props.primaryCtaHref ?? DEFAULTS.primaryCtaHref,
    secondaryCtaLabel: props.secondaryCtaLabel ?? DEFAULTS.secondaryCtaLabel,
    secondaryCtaHref: props.secondaryCtaHref ?? DEFAULTS.secondaryCtaHref,
  };
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

