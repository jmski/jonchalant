'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface MeetJonProps {
  heading?: string;
  body?: string;
  image?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; width: number; height: number };
  };
}

const DEFAULT_HEADING = "Twenty years in dance. The lesson wasn't the choreography.";
const DEFAULT_BODY = `Jon Young teaches embodied presence to professionals whose medium isn't dance. His students lead engineering teams, run product orgs, write for a living, and stand in front of rooms — none of them are dancers, all of them learn to inhabit their work the same way a dancer learns to inhabit a phrase.

The Foundation distills twenty years of performing, teaching, and choreographing into eight weeks of practice that transfer to whatever room you actually have to walk into.`;

/**
 * Render a heading string with the first occurrence of "lesson" wrapped in <em>.
 * The italic anchor word carries the Fraunces italic treatment.
 */
function renderHeadingWithEmphasis(heading: string) {
  const match = heading.match(/lesson/i);
  if (!match || match.index === undefined) {
    return heading;
  }
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
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  image,
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

  const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

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
          <div className="meet-jon-eyebrow-row">
            <span className="meet-jon-eyebrow-rule" aria-hidden="true" />
            <span className="meet-jon-eyebrow">Who you&apos;re working with</span>
          </div>
          <h2 className="meet-jon-heading">{renderHeadingWithEmphasis(heading)}</h2>
          <div className="meet-jon-body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="meet-jon-links">
            <Link href="/about" className="meet-jon-link">
              Read Jon&apos;s story <span className="meet-jon-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

