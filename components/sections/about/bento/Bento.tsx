import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { BentoTile, PortraitTile, QuoteTile, StatTile, BioTile } from '@/lib/types';

const BLUR_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect width='10' height='10' fill='%23f0ede8'/%3E%3C/svg%3E";

interface BentoProps {
  tiles?: BentoTile[];
}

export function Bento({ tiles }: BentoProps) {
  if (!tiles || tiles.length === 0) return null;

  const portrait = tiles.find((t): t is PortraitTile => t._type === 'portraitTile');
  const supporting = tiles.filter((t): t is QuoteTile | StatTile | BioTile => t._type !== 'portraitTile');

  return (
    <section className="about-bento">
      <div className="about-bento-grid">

        {portrait && (
          <div className="about-bento-tile about-bento-tile--portrait">
            <Image
              src={urlFor(portrait.image).width(1200).url()}
              alt={portrait.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              className="about-bento-portrait-image"
              placeholder="blur"
              blurDataURL={portrait.image.asset?.metadata?.lqip ?? BLUR_FALLBACK}
            />
          </div>
        )}

        {supporting.length > 0 && (
          <div className="about-bento-support">
            {supporting.map((tile, i) => {
              if (tile._type === 'quoteTile') {
                return (
                  <div key={i} className="about-bento-tile about-bento-tile--quote">
                    <blockquote className="about-bento-quote">{tile.quote}</blockquote>
                    {tile.attribution && (
                      <p className="about-bento-quote-attribution">{tile.attribution}</p>
                    )}
                  </div>
                );
              }
              if (tile._type === 'statTile') {
                return (
                  <div key={i} className="about-bento-tile about-bento-tile--stat">
                    <span className="about-bento-stat-number">{tile.number}</span>
                    <span className="about-bento-stat-label">{tile.label}</span>
                  </div>
                );
              }
              if (tile._type === 'bioTile') {
                return (
                  <div key={i} className="about-bento-tile about-bento-tile--bio">
                    <p className="about-bento-bio-text">{tile.text}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

      </div>
    </section>
  );
}
