'use client';
import { useEffect, useRef } from 'react';
import { ScrollReveal } from "@/components/animations";
import { Button } from '@/components/ui/Button';

export interface CTAPreviewItem {
  number: string;
  text: string;
}

interface CTAProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  sub?: string;
  previewItems?: CTAPreviewItem[];
  previewLabel?: string;
}

export default function CTA({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#",
  sub,
  previewItems,
  previewLabel = "What you'll get",
}: CTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split title into two lines at the first sentence boundary
  const splitIndex = title.indexOf('?');
  const lines = splitIndex !== -1
    ? [title.slice(0, splitIndex + 1), title.slice(splitIndex + 1).trim()]
    : [title];

  const rightContent = previewItems ? (
    // TODO: Move previewItems content to Sanity (aboutPage.ctaPreviewItems)
    <div className="cta-preview">
      <span className="cta-preview-label">{previewLabel}</span>
      <ul className="cta-preview-list">
        {previewItems.map((item) => (
          <li key={item.number}>
            <span className="cta-preview-number">{item.number}</span>
            <span className="cta-preview-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="cta-section-description">{description}</div>
  );

  return (
    <div className="cta-section" ref={sectionRef}>
      <ScrollReveal variant="fade-up">
        <div className="cta-section-left">
          <h2 className="cta-section-title">
            {lines.length === 2 ? (
              <>
                <span className="cta-headline-line" data-direction="left">{lines[0]}</span>
                <span className="cta-headline-line" data-direction="right">{lines[1]}</span>
              </>
            ) : (
              title
            )}
          </h2>
          {sub && <p className="cta-sub">{sub}</p>}
          <Button as="link" href={buttonLink}>{buttonText}</Button>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={150}>
        {rightContent}
      </ScrollReveal>
    </div>
  );
}
