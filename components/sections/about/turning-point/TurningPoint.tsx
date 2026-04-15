import Image from 'next/image';
import type { SanityImage } from '@/lib/types';
import { ScrollReveal } from '@/components/animations';

interface TurningPointProps {
  headline: string;
  body: string;
  highlight?: string;
  originImage?: SanityImage;
}

export function TurningPoint({ headline, body, highlight, originImage }: TurningPointProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);
  const firstPara = paragraphs[0];
  const belowGridParas = paragraphs.slice(1);

  return (
    <section className="about-turning-point-section">
      {/* Two-column grid: image left, eyebrow + highlight + first paragraph right */}
      <div className={`about-origin-grid${originImage ? '' : ' about-origin-grid--no-image'}`}>
        {originImage && (
          <ScrollReveal variant="scale-fade">
            {/* TODO: Swap this image — playground/kids photo belongs in "Why This Exists" section */}
            <div className="about-origin-image">
              <Image
                src={originImage.asset.url}
                alt={originImage.alt ?? 'The Moment It Clicked'}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>
        )}
        <div className="about-origin-content">
          <ScrollReveal variant="fade-up" delay={150}>
            <span className="about-turning-point-label">{headline}</span>
            {highlight && <span className="about-highlight">{highlight}</span>}
            {firstPara && (
              <p className="about-turning-point-paragraph">{firstPara}</p>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* Remaining paragraphs flow below the grid at a constrained width */}
      {belowGridParas.length > 0 && (
        <ScrollReveal variant="fade" delay={200}>
          <div className="about-turning-point-below-grid">
            {belowGridParas.map((para, idx) => (
              <p key={idx} className="about-turning-point-paragraph">{para}</p>
            ))}
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
