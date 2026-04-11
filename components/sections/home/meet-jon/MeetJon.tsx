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
  heading = 'Meet Jon',
  body = 'Jon is an executive presence coach who spent years studying movement, embodiment, and communication to develop a body-aware approach to leadership. He works with introverts and quiet professionals who want to lead authentically — without performing confidence they don\'t feel.',
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
            />
          ) : (
            <div className="meet-jon-photo-placeholder" />
          )}
        </div>
        <div className="meet-jon-copy-col meet-jon-bio">
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
