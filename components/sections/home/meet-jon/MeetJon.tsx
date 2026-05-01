'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { Cta, SanityImage, SectionHeader as SectionHeaderType } from '@/lib/types';

interface MeetJonProps {
  header?: SectionHeaderType;
  image?: SanityImage;
  bodyParagraphs?: string[];
  primaryLink?: Cta;
  secondaryLink?: Cta;
}

function renderHeadingWithEmphasis(heading: string) {
  const match = heading.match(/lesson/i);
  if (!match || match.index === undefined) return heading;
  const before = heading.slice(0, match.index);
  const word = heading.slice(match.index, match.index + match[0].length);
  const after = heading.slice(match.index + match[0].length);
  return (
    <>
      {before}
      <em>{word}</em>
      {after}
    </>
  );
}

export function MeetJon({
  header,
  image,
  bodyParagraphs,
  primaryLink,
  secondaryLink,
}: MeetJonProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = (bodyParagraphs ?? []).filter(Boolean);

  return (
    <section className="meet-jon-section" ref={sectionRef}>
      <div className="meet-jon-inner">
        <div className="meet-jon-photo-col meet-jon-photos" aria-hidden="true">
          {image?.asset ? (
            <Image
              src={urlFor(image).width(840).height(1120).fit('crop').url()}
              alt={image.alt ?? "Jon Young — embodied presence coach"}
              width={420}
              height={560}
              className="meet-jon-photo"
              sizes="(max-width: 768px) 100vw, 420px"
              quality={60}
            />
          ) : (
            <div className="meet-jon-photo-placeholder" />
          )}
        </div>
        <div className="meet-jon-copy-col meet-jon-bio meet-jon-text-col">
          {header?.eyebrow && (
            <div className="meet-jon-eyebrow-row">
              <span className="meet-jon-eyebrow-rule" aria-hidden="true" />
              <span className="meet-jon-eyebrow">{header.eyebrow}</span>
            </div>
          )}
          {header?.headline && (
            <h2 className="meet-jon-heading">{renderHeadingWithEmphasis(header.headline)}</h2>
          )}
          {paragraphs.length > 0 && (
            <div className="meet-jon-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {(primaryLink || secondaryLink) && (
            <div className="meet-jon-links">
              {primaryLink && (
                <Link href={primaryLink.href} className="meet-jon-link">
                  {primaryLink.label} <span className="meet-jon-link-arrow" aria-hidden="true">→</span>
                </Link>
              )}
              {secondaryLink && (
                <Link href={secondaryLink.href} className="meet-jon-link meet-jon-link--secondary">
                  {secondaryLink.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
