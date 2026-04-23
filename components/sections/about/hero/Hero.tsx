import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/lib/types';
import { ScrollReveal } from '@/components/animations';

interface AboutHeroProps {
  headline?: string;
  description?: string;
  heroImage?: SanityImage;
}

const HERO_BLUR_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect width='10' height='10' fill='%23f0ede8'/%3E%3C/svg%3E";

export function Hero({ headline, description, heroImage }: AboutHeroProps) {
  const displayHeadline = headline ?? "I coach people who think before they speak — and want rooms to notice.";
  const displayDescription = description ?? "A decade of professional choreography taught me that presence isn't about being loud. It's about being intentional. That insight became the foundation of everything I do.";

  return (
    <section className="about-hero-section">
      <div className={`about-hero-grid${heroImage ? '' : ' about-hero-grid--no-image'}`}>
        <div className="about-hero-content">
          <ScrollReveal variant="fade-up">
            <span className="about-hero-intro">Who I Am</span>
            <h1 className="about-hero-title">
              {displayHeadline}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={150}>
            <p className="about-hero-subtitle">
              {displayDescription}
            </p>
          </ScrollReveal>
        </div>
        {heroImage && (
          <div className="about-hero-image-column">
            <ScrollReveal variant="fade-right" delay={250}>
              <div className="about-hero-image">
                <Image
                  src={urlFor(heroImage).width(1200).url()}
                  alt={heroImage.alt ?? 'Jon — Leadership Coach & Choreographer'}
                  fill
                  sizes="(max-width: 768px) 100vw, 38vw"
                  style={{ objectFit: 'cover' }}
                  priority
                  quality={65}
                  placeholder="blur"
                  blurDataURL={heroImage.asset.metadata?.lqip ?? HERO_BLUR_FALLBACK}
                />
              </div>
            </ScrollReveal>
            {/* TODO: Pull name/role/location from Sanity (aboutPage.heroIdentity fields) */}
            <ScrollReveal variant="fade" delay={400}>
              <div className="about-hero-identity">
                <span className="about-hero-identity-name">Jon Gelua</span>
                <span className="about-hero-identity-role">Executive Presence Coach</span>
                <span className="about-hero-identity-location">Based in Ontario, Canada</span>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
      <div className="about-hero-divider"></div>
    </section>
  );
}
