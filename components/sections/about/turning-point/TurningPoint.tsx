import Image from 'next/image';
import type { SanityImage } from '@/lib/types';

interface TurningPointProps {
  headline: string;
  body: string;
  highlight?: string;
  originImage?: SanityImage;
}

export function TurningPoint({ headline, body, highlight, originImage }: TurningPointProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-turning-point-section">
      <div className={`about-origin-grid${originImage ? '' : ' about-origin-grid--no-image'}`}>
        {originImage && (
          <div className="about-origin-image">
            <Image
              src={originImage.asset.url}
              alt={originImage.alt ?? 'The Moment It Clicked'}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="about-origin-content">
          <span className="about-turning-point-label">{headline}</span>
          {highlight && <span className="about-highlight">{highlight}</span>}
          <div className="about-turning-point-body">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="about-turning-point-paragraph">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
