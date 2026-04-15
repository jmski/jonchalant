'use client';
import { useEffect, useRef } from 'react';
import { ScrollReveal } from "@/components/animations";
import { Button } from '@/components/ui/Button';

interface CTAProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTA({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#"
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

  return (
    <ScrollReveal variant="fade-up">
      <div className="cta-section" ref={sectionRef}>
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
          <Button as="link" href={buttonLink}>{buttonText}</Button>
        </div>
        <div className="cta-section-description">
          {description}
        </div>
      </div>
    </ScrollReveal>
  );
}
