import Image from 'next/image';
import type { SanityImage } from '@/lib/types';

interface AboutHeroProps {
  headline?: string;
  description?: string;
  heroImage?: SanityImage;
}

export function Hero({ headline, description, heroImage }: AboutHeroProps) {
  const displayHeadline = headline ?? "I coach people who think before they speak — and want rooms to notice.";
  const displayDescription = description ?? "A decade of professional choreography taught me that presence isn't about being loud. It's about being intentional. That insight became the foundation of everything I do.";

  return (
    <section className="about-hero-section">
      <div className={`about-hero-grid${heroImage ? '' : ' about-hero-grid--no-image'}`}>
        <div className="about-hero-content">
          <span className="about-hero-intro">Who I Am</span>
          <h1 className="about-hero-title">
            {displayHeadline}
          </h1>
          <p className="about-hero-subtitle">
            {displayDescription}
          </p>
        </div>
        {heroImage && (
          <div className="about-hero-image">
            <Image
              src={heroImage.asset.url}
              alt={heroImage.alt ?? 'Jon — Leadership Coach & Choreographer'}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
      </div>
      <div className="about-hero-divider"></div>
    </section>
  );
}
