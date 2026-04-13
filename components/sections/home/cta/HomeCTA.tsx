'use client';

import { useEffect, useRef } from 'react';
import { ScrollFade } from '@/components/animations';
import { Button } from '@/components/ui/Button';

interface HomeCTAProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export function HomeCTA({
  title,
  description,
  buttonText = 'Get Started',
  buttonLink = '#',
}: HomeCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const splitIndex = title.indexOf('?');
  const lines =
    splitIndex !== -1
      ? [title.slice(0, splitIndex + 1), title.slice(splitIndex + 1).trim()]
      : [title];

  return (
    <ScrollFade>
      <div className="cta-section" ref={sectionRef}>
        <div className="cta-section-left">
          <h2 className="cta-section-title cta-split-heading" ref={headingRef}>
            {lines.length === 2 ? (
              <>
                <span className="cta-split-line" data-dir="left">{lines[0]}</span>
                <span className="cta-split-line" data-dir="right">{lines[1]}</span>
              </>
            ) : (
              title
            )}
          </h2>
          <Button as="link" href={buttonLink}>{buttonText}</Button>
        </div>
        <div className="cta-section-description">{description}</div>
      </div>
    </ScrollFade>
  );
}
