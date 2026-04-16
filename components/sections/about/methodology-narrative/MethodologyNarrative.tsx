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

      <div className="about-belief-comparison">
        {/* Choreographer — faded, struck-through: what we're leaving behind */}
        <ScrollReveal variant="fade">
          <div className="about-belief-block about-belief-block--rejected">
            <span className="about-belief-label">{BELIEF_BLOCKS[0].label}</span>
            <p className="about-belief-body">{BELIEF_BLOCKS[0].body}</p>
          </div>
        </ScrollReveal>

        {/* Transition — narrative pause between rejected and chosen */}
        {/* TODO: Move transition copy to Sanity (aboutPage.methodologyTransitionText) */}
        <ScrollReveal variant="fade" delay={400}>
          <div className="about-belief-transition" aria-hidden="true">
            <span className="about-belief-transition-line"></span>
            <span className="about-belief-transition-text">Not this. This:</span>
            <span className="about-belief-transition-line"></span>
          </div>
        </ScrollReveal>

        {/* Freestyler — full-color, serif, elevated: the destination */}
        <ScrollReveal variant="fade-up" delay={600}>
          <div className="about-belief-block about-belief-block--chosen">
            <span className="about-belief-label">{BELIEF_BLOCKS[1].label}</span>
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
