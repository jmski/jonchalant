import { ScrollReveal } from '@/components/animations';

interface TurningPointProps {
  headline: string;
  body: string;
  highlight?: string;
}

// TODO: Move quote text to Sanity (aboutPage.turningPointFeatureQuote)
const FEATURE_QUOTE = "We weren't just a group of kids who learned some moves. We were the first dance club in our high school's history.";

export function TurningPoint({ headline, body, highlight }: TurningPointProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);
  const firstPara = paragraphs[0];
  const belowGridParas = paragraphs.slice(1);

  return (
    <section className="about-turning-point-section">
      {/* Two-column layout: typographic pullquote left, content right */}
      <div className="about-origin-grid">
        <ScrollReveal variant="scale-fade">
          <div className="about-turning-point-feature">
            <span className="about-turning-point-feature-mark">&ldquo;</span>
            <p className="about-turning-point-feature-quote">{FEATURE_QUOTE}</p>
            <span className="about-turning-point-feature-attribution">The origin of Jonchalant</span>
          </div>
        </ScrollReveal>
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
