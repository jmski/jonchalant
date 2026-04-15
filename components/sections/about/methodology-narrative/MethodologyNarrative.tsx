import Image from 'next/image';
import type { SanityImage } from '@/lib/types';

interface MethodologyNarrativeProps {
  headline: string;
  body: string;
  highlight?: string;
  philosophyImage?: SanityImage;
}

const BELIEF_BLOCKS = [
  {
    label: 'THE CHOREOGRAPHER',
    body: 'Memorises. Performs. Freezes the moment the song changes.',
  },
  {
    label: 'THE FREESTYLER',
    body: 'Listens. Feels. Responds in real time — because that\u2019s who they are.',
  },
];

export function MethodologyNarrative({ headline, body, highlight, philosophyImage }: MethodologyNarrativeProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-methodology-narrative-section">
      <span className="about-methodology-narrative-label">{headline}</span>
      {highlight && <span className="about-highlight">{highlight}</span>}

      <div className="about-belief-grid">
        {BELIEF_BLOCKS.map((block) => (
          <div key={block.label} className="about-belief-block">
            <p className="about-belief-label">{block.label}</p>
            <p className="about-belief-body">{block.body}</p>
          </div>
        ))}
      </div>

      {philosophyImage && (
        <div className="about-philosophy-image-wrap">
          <Image
            src={philosophyImage.asset.url}
            alt={philosophyImage.alt ?? 'Philosophy'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="about-methodology-narrative-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-methodology-narrative-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
