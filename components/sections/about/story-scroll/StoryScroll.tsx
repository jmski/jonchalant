'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { StoryBeat } from '@/lib/types';

export interface StoryScrollProps {
  beats?: StoryBeat[];
}

export function StoryScroll({ beats = [] }: StoryScrollProps) {
  const [activeBeat, setActiveBeat] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (beats.length === 0) return null;

  return (
    <section className="story-scroll" aria-label="Jon's story">
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
        <div className="story-scroll-edge-fade" aria-hidden="true" />
      </div>

      <div className="story-scroll-text">
        {beats.map((beat, i) => {
          const isKinetic = i === beats.length - 1;
          const paragraphs = [beat.body, beat.bodyParagraph2].filter(Boolean) as string[];
          return (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className={`story-scroll-panel${activeBeat === i ? ' is-active' : ''}`}
            >
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
                    className={`story-scroll-headline${isKinetic ? ' story-scroll-headline--kinetic' : ''}`}
                  >
                    {beat.headline}
                  </h2>
                )}
                {paragraphs.length > 0 && (
                  <div className="story-scroll-body">
                    {paragraphs.map((para, idx) => (
                      <p key={idx} className="story-scroll-paragraph">{para}</p>
                    ))}
                  </div>
                )}
                {beat.payoffLine && (
                  <p className="story-scroll-payoff">{beat.payoffLine}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
