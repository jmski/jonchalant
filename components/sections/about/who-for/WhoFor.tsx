import Image from 'next/image';
import { ScrollReveal } from '@/components/animations';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/lib/types';

interface WhoForProps {
  image?: SanityImage;
  headline: string;
  body: string;
}

export function WhoFor({ image, headline, body }: WhoForProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-who-for-section">
      <div className="about-section-divider"></div>

      <ScrollReveal variant="fade-up">
        <span className="about-who-for-label">{headline}</span>
      </ScrollReveal>

      {image?.asset && (
        <div className="about-who-for-image">
          <Image
            src={urlFor(image).width(1200).url()}
            alt={image.alt ?? ''}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={80}
          />
        </div>
      )}

      <div className="about-who-for-text-block">
        {paragraphs.map((para, idx) => (
          <ScrollReveal key={idx} variant="fade" delay={100}>
            <p className="about-who-for-paragraph">{para}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
