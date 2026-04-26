'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/lib/types';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface StoryScrollProps {
  // Beat 1 — Origin
  originImage?: SanityImage;
  originHeadline?: string;
  originBody?: string;
  originAnchorWord?: string;
  // Beat 2 — Turning Point
  turningPointImage?: SanityImage;
  turningPointHeadline?: string;
  turningPointBody?: string;
  // Beat 3 — Transfer + Brand Claim (combined, kinetic headline)
  transferImage?: SanityImage;
  transferHeadline?: string;
  transferBody?: string;
}

// ─── Internal types ───────────────────────────────────────────────────────────

interface Beat {
  image?: SanityImage;
  headline?: string;
  body?: string;
  anchorWord?: string;
  isKinetic: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Wraps a single anchor word in <em> within a line of text.
 * Case-insensitive match; safe against regex special characters.
 */
function wrapAnchorWord(text: string, anchorWord: string): React.ReactNode {
  const escaped = anchorWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${escaped})`, 'i');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    part.toLowerCase() === anchorWord.toLowerCase() ? <em key={i}>{part}</em> : part
  );
}

/**
 * Renders a headline string.
 * - Splits on "\n" for two-line (kinetic) headlines.
 * - Wraps anchorWord in <em> on whatever line it appears.
 */
function renderHeadline(headline: string, anchorWord?: string): React.ReactNode {
  const lines = headline.split('\n').filter(Boolean);

  if (lines.length > 1) {
    return lines.map((line, i) => (
      <span key={i} className="story-scroll-headline-line">
        {anchorWord ? wrapAnchorWord(line, anchorWord) : line}
      </span>
    ));
  }

  return anchorWord ? wrapAnchorWord(headline, anchorWord) : headline;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StoryScroll({
  originImage,
  originHeadline,
  originBody,
  originAnchorWord,
  turningPointImage,
  turningPointHeadline,
  turningPointBody,
  transferImage,
  transferHeadline,
  transferBody,
}: StoryScrollProps) {
  const [activeBeat, setActiveBeat] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const beats: Beat[] = [
    {
      image: originImage,
      headline: originHeadline,
      body: originBody,
      anchorWord: originAnchorWord,
      isKinetic: false,
    },
    {
      image: turningPointImage,
      headline: turningPointHeadline,
      body: turningPointBody,
      isKinetic: false,
    },
    {
      image: transferImage,
      headline: transferHeadline,
      body: transferBody,
      isKinetic: true,
    },
  ];

  // IntersectionObserver — tracks which beat's text panel is centred on screen.
  // Drives both the sticky image swap (desktop) and panel dim/undim (desktop).
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveBeat(i);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section className="story-scroll" aria-label="Jon's story">

      {/* Left column — sticky image (desktop only, hidden on mobile via CSS) */}
      <div className="story-scroll-sticky" aria-hidden="true">
        {beats.map((beat, i) => {
          if (!beat.image) return null;
          return (
            <div
              key={i}
              className={`story-scroll-image${activeBeat === i ? ' is-active' : ''}`}
            >
              <Image
                src={urlFor(beat.image).width(1000).url()}
                alt={beat.image.alt ?? ''}
                fill
                sizes="50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                quality={80}
                priority={i === 0}
              />
            </div>
          );
        })}
        {/* Soft right-edge fade — blends image into text column */}
        <div className="story-scroll-edge-fade" aria-hidden="true" />
      </div>

      {/* Right column — scrolling text panels */}
      <div className="story-scroll-text">
        {beats.map((beat, i) => (
          <div
            key={i}
            ref={el => { panelRefs.current[i] = el; }}
            className={`story-scroll-panel${activeBeat === i ? ' is-active' : ''}`}
          >
            {/* Mobile-only image — rendered above the text block for each beat */}
            {beat.image && (
              <div className="story-scroll-panel-image">
                <Image
                  src={urlFor(beat.image).width(800).url()}
                  alt={beat.image.alt ?? ''}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  quality={70}
                />
              </div>
            )}

            <div className="story-scroll-panel-content">
              {beat.headline && (
                <h2
                  className={`story-scroll-headline${beat.isKinetic ? ' story-scroll-headline--kinetic' : ''}`}
                >
                  {renderHeadline(beat.headline, beat.anchorWord)}
                </h2>
              )}
              {beat.body && (
                <div className="story-scroll-body">
                  {beat.body.split('\n\n').filter(Boolean).map((para, idx) => (
                    <p key={idx} className="story-scroll-paragraph">{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
