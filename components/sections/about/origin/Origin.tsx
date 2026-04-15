import { ScrollReveal } from '@/components/animations';

interface OriginProps {
  label?: string;
  headline?: string;
  description?: string;
  highlight?: string;
}

export function Origin({ label, headline, description, highlight }: OriginProps) {
  const paragraphs = description ? description.split('\n\n').filter(Boolean) : [];
  const firstPara = paragraphs[0];
  const restParas = paragraphs.slice(1);

  return (
    <section className="about-origin-section">
      {headline ? (
        <>
          <ScrollReveal variant="fade">
            <span className="about-origin-label">{label ?? 'WHAT CHANGED EVERYTHING'}</span>
            {firstPara && (
              <p className="about-origin-description">{firstPara}</p>
            )}
          </ScrollReveal>
          {highlight && (
            <ScrollReveal variant="fade-left" delay={100}>
              <blockquote className="about-pull-quote">{highlight}</blockquote>
            </ScrollReveal>
          )}
          {restParas.map((para, idx) => (
            <ScrollReveal key={idx} variant="fade" delay={200}>
              <p className="about-origin-description">{para}</p>
            </ScrollReveal>
          ))}
        </>
      ) : (
        <div className="loading-state">Loading origin story...</div>
      )}
    </section>
  );
}
