import { ScrollReveal } from '@/components/animations';

interface WhyExistsProps {
  headline: string;
  body: string;
  highlight?: string;
}

const CALLOUT_PREFIXES = ['The kid ', 'The teenager ', 'The adult '];

export function WhyExists({ headline, body, highlight }: WhyExistsProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  const introParagraphs: string[] = [];
  const calloutItems: string[] = [];
  const remainingParagraphs: string[] = [];

  let phase: 'intro' | 'callout' | 'after' = 'intro';
  for (const para of paragraphs) {
    const isCallout = CALLOUT_PREFIXES.some((prefix) => para.startsWith(prefix));
    if (phase === 'intro' && isCallout) phase = 'callout';
    if (phase === 'callout' && !isCallout) phase = 'after';
    if (phase === 'intro') introParagraphs.push(para);
    else if (phase === 'callout') calloutItems.push(para);
    else remainingParagraphs.push(para);
  }

  const closingParas = remainingParagraphs.slice(0, -1);
  const missionStatement = remainingParagraphs[remainingParagraphs.length - 1];

  return (
    <section className="about-why-exists-section">
      <ScrollReveal variant="fade-up">
        <span className="about-why-exists-label">{headline}</span>
        {highlight && <span className="about-highlight">{highlight}</span>}
      </ScrollReveal>

      {introParagraphs.length > 0 && (
        <ScrollReveal variant="fade" delay={100}>
          <div className="about-why-exists-body">
            {introParagraphs.map((para, idx) => (
              <p key={idx} className="about-why-exists-paragraph">{para}</p>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Three callout blocks with staggered entrance — accumulating impact */}
      {calloutItems.map((item, idx) => (
        <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
          <div className="about-callout">
            <p>{item}</p>
          </div>
        </ScrollReveal>
      ))}

      {closingParas.length > 0 && (
        <ScrollReveal variant="fade" delay={150}>
          <div className="about-why-exists-body">
            {closingParas.map((para, idx) => (
              <p key={idx} className="about-why-exists-paragraph">{para}</p>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Visual pause before the mission statement lands */}
      {missionStatement && (
        <ScrollReveal variant="fade" delay={150}>
          <hr className="about-section-divider" />
          <p className="about-why-exists-paragraph">{missionStatement}</p>
        </ScrollReveal>
      )}
    </section>
  );
}
