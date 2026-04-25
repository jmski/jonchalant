'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { urlFor } from '@/lib/sanity';

interface MeetJonProps {
  heading?: string;
  body?: string;
  linkText?: string;
  image?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; width: number; height: number };
  };
}

export function MeetJon({
  heading = 'I learned to lead because the lesson plan required it.',
  body = 'A decade of professional choreography taught me that presence isn\'t about being loud — it\'s about being intentional. That insight transfers. Not just to dance. To the meeting you\'re dreading, the pitch you\'ve over-rehearsed, the role that fits your skills but not your life.',
  linkText = 'Read the full story',
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

  return (
    <section className="meet-jon-section" ref={sectionRef}>
      <div className="meet-jon-inner">
        <div className="meet-jon-photo-col meet-jon-photos" aria-hidden="true">
          {image?.asset ? (
            <Image
              src={urlFor(image).width(800).height(1066).fit('crop').url()}
              alt={image.alt ?? 'Jon — executive presence coach'}
              width={400}
              height={533}
              className="meet-jon-photo"
              sizes="(max-width: 768px) 100vw, 400px"
              quality={60}
            />
          ) : (
            <div className="meet-jon-photo-placeholder" />
          )}
        </div>
        <div className="meet-jon-copy-col meet-jon-bio meet-jon-text-col">
          <SectionHeader eyebrow="About Jon" title={heading} />
          <p className="meet-jon-body">{body}</p>
          <Link href="/about" className="meet-jon-link">
            {linkText} <span className="meet-jon-link-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
