'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { KineticHeading } from '@/components/typography/KineticHeading';
import type { OriginPhase } from '@/lib/types';

const ANCHOR_WORDS = ['presence', 'stillness', 'nonchalant', 'grounded', 'movement', 'path'];

interface OriginProps {
  // Legacy flat-field props (still used as fallback)
  label?: string;
  headline?: string;
  description?: string;
  highlight?: string;
  // Phase 4: scrollytelling
  phases?: OriginPhase[];
  anchorWord?: string;
}

export function Origin({
  label,
  headline,
  description,
  highlight,
  phases,
  anchorWord,
}: OriginProps) {
  // If we have scrollytelling phases, render that layout
  if (phases && phases.length > 0) {
    return (
      <OriginScrollytelling
        phases={phases}
        anchorWord={anchorWord}
        sectionLabel={label}
      />
    );
  }

  // Fallback: original flat layout
  return (
    <OriginFallback
      label={label}
      headline={headline}
      description={description}
      highlight={highlight}
    />
  );
}

// ─── Scrollytelling layout ───────────────────────────────────────────────────

function OriginScrollytelling({
  phases,
  anchorWord,
  sectionLabel,
}: {
  phases: OriginPhase[];
  anchorWord?: string;
  sectionLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sceneRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.5, rootMargin: '-30% 0px -30% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [phases.length]);

  const anchorWordList = anchorWord
    ? [anchorWord, ...ANCHOR_WORDS.filter((w) => w !== anchorWord)]
    : ANCHOR_WORDS;

  return (
    <section className="origin-scrolly" aria-label={sectionLabel ?? 'Origin story'}>
      {/* Sticky image panel */}
      <div className="origin-scrolly-sticky" aria-hidden="true">
        {phases.map((phase, i) => {
          const imageUrl = phase.image?.asset?.url;
          if (!imageUrl) return null;
          return (
            <div
              key={phase._key}
              className={`origin-scrolly-image${i === activeIndex ? ' is-active' : ''}`}
              style={prefersReducedMotion.current ? { transition: 'none' } : undefined}
            >
              <Image
                src={imageUrl}
                alt={phase.imageAlt}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          );
        })}
        {/* Overlay gradient so text is readable on mobile */}
        <div className="origin-scrolly-overlay" />
      </div>

      {/* Scrolling caption column */}
      <div className="origin-scrolly-scroll">
        {phases.map((phase, i) => (
          <article
            key={phase._key}
            ref={(el) => { sceneRefs.current[i] = el; }}
            className="origin-scrolly-scene"
          >
            <KineticHeading as="h3" anchorWords={anchorWordList}>
              {phase.title}
            </KineticHeading>
            {phase.description && (
              <p className="origin-scrolly-scene-body">{phase.description}</p>
            )}
            {phase.pullQuote && (
              <blockquote className="origin-scrolly-scene-quote">
                {phase.pullQuote}
              </blockquote>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Legacy fallback ─────────────────────────────────────────────────────────

function OriginFallback({
  label,
  headline,
  description,
  highlight,
}: {
  label?: string;
  headline?: string;
  description?: string;
  highlight?: string;
}) {
  const paragraphs = description ? description.split('\n\n').filter(Boolean) : [];
  const firstPara = paragraphs[0];
  const restParas = paragraphs.slice(1);

  if (!headline) return <div className="loading-state">Loading origin story...</div>;

  return (
    <section className="about-origin-section">
      <span className="about-origin-label">{label ?? 'WHAT CHANGED EVERYTHING'}</span>
      {firstPara && <p className="about-origin-description">{firstPara}</p>}
      {highlight && (
        <blockquote className="about-pull-quote">{highlight}</blockquote>
      )}
      {restParas.map((para, idx) => (
        <p key={idx} className="about-origin-description">{para}</p>
      ))}
    </section>
  );
}

