'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { AnchorWord } from '@/components/typography/AnchorWord';
import { withAnchorWords } from '@/lib/typography';
import type { HomePageContent, HeroCycleSlide } from '@/lib/types';

interface HeroProps {
  content: HomePageContent;
}

export function Hero({ content }: HeroProps) {
  const {
    heroHeadlineStatic,
    heroHeadlineAnchorWord,
    heroSubhead,
    heroCtaText,
    heroCtaLink,
  } = content;
  const ctaLink = heroCtaLink ?? '/contact';
  const heroCycle = content.heroCycle ?? [];
  const heroCycleLength = heroCycle.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeDuration = heroCycle[currentIndex]?.durationMs ?? 8000;

  const advance = useCallback(() => {
    setCurrentIndex(i => (i + 1) % heroCycleLength);
  }, [heroCycleLength]);

  // Pause cycling when section scrolls out of viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isPausedRef.current = !entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance timer — resets on each slide change
  useEffect(() => {
    if (heroCycleLength <= 1) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setTimeout(() => {
      if (!isPausedRef.current) advance();
    }, activeDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, heroCycleLength, advance, activeDuration]);

  const hasCycle = heroCycle.length > 0;
  const activeSlide = heroCycle[currentIndex];

  return (
    <section
      ref={sectionRef}
      className={`home-hero${hasCycle ? ' home-hero--cycling' : ''}`}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      {/* Background orbs */}
      <div className="home-hero-orb home-hero-orb--1" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb--2" aria-hidden="true" />

      {/* Fixed text column */}
      <div className="home-hero-text">
        <h1 className="home-hero-headline">
          {heroHeadlineStatic && (
            <span className="home-hero-headline-static">
              {withAnchorWords(heroHeadlineStatic, ['presence', 'stillness', 'nonchalant', 'grounded', 'movement'])}{' '}
            </span>
          )}
          {heroHeadlineAnchorWord && (
            <AnchorWord>{heroHeadlineAnchorWord}</AnchorWord>
          )}
        </h1>

        {heroSubhead && (
          <p className="home-hero-subhead">{heroSubhead}</p>
        )}

        {heroCtaText && (
          <div className="home-hero-cta">
            <Button as="link" href={ctaLink}>
              {heroCtaText}
            </Button>
          </div>
        )}
      </div>

      {/* Cycling visual column */}
      {hasCycle && (
        <div
          className="home-hero-visual"
          role="img"
          aria-label={activeSlide?.caption ?? 'Coaching visual'}
        >
          {heroCycle.map((slide, idx) => (
            <div
              key={slide._key}
              className={[
                'home-hero-slide',
                `home-hero-slide--${slide.kind}`,
                idx === currentIndex ? 'home-hero-slide--active' : '',
              ].filter(Boolean).join(' ')}
              aria-hidden={idx !== currentIndex}
            >
              <HeroSlideContent slide={slide} priority={idx === 0} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function HeroSlideContent({ slide, priority = false }: { slide: HeroCycleSlide; priority?: boolean }) {
  switch (slide.kind) {
    case 'photo': {
      if (!slide.image?.asset?.url) return null;
      return (
        <div className="home-hero-slide-photo-inner">
          <Image
            src={slide.image.asset.url}
            alt={slide.caption ?? ''}
            fill
            style={{ objectFit: 'cover' }}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="home-hero-slide-grain" aria-hidden="true" />
        </div>
      );
    }
    case 'typography': {
      if (!slide.typographicWord) return null;
      return (
        <div className="home-hero-slide-type-inner">
          <span className="home-hero-slide-type-word">{slide.typographicWord}</span>
        </div>
      );
    }
    case 'three-js-figure':
    case 'video-loop':
    default:
      return null;
  }
}
