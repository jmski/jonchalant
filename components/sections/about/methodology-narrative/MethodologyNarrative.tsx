import Image from 'next/image';
import type { SanityImage } from '@/lib/types';
import { ScrollReveal } from '@/components/animations';

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
      <ScrollReveal variant="fade-up">
        <span className="about-methodology-narrative-label">{headline}</span>
        {highlight && <span className="about-highlight">{highlight}</span>}
      </ScrollReveal>

      <div className="about-belief-grid">
        {/* Choreographer snaps in — rigid, instant, like a set routine */}
        <ScrollReveal variant="snap">
          <div className="about-belief-block">
            <p className="about-belief-label">{BELIEF_BLOCKS[0].label}</p>
            <p className="about-belief-body">{BELIEF_BLOCKS[0].body}</p>
          </div>
        </ScrollReveal>
        {/* Freestyler eases in — fluid, unhurried, like improvisation */}
        <ScrollReveal variant="fade" delay={200}>
          <div className="about-belief-block">
            <p className="about-belief-label">{BELIEF_BLOCKS[1].label}</p>
            <p className="about-belief-body">{BELIEF_BLOCKS[1].body}</p>
          </div>
        </ScrollReveal>
      </div>

      {philosophyImage && (
        <ScrollReveal variant="fade" delay={100}>
          <div className="about-philosophy-image-wrap">
            <Image
              src={philosophyImage.asset.url}
              alt={philosophyImage.alt ?? 'Philosophy'}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal variant="fade" delay={150}>
        <div className="about-methodology-narrative-body">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="about-methodology-narrative-paragraph">{para}</p>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
