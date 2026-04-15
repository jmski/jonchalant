import { ScrollReveal } from '@/components/animations';

interface WhoForProps {
  headline: string;
  body: string;
  highlight?: string;
}

// Dance styles paragraph contains these discipline names
const STYLES_KEYWORDS = ['hip hop', 'breaking', 'popping', 'locking', 'krumping'];

function isStylesParagraph(para: string): boolean {
  const lower = para.toLowerCase();
  return STYLES_KEYWORDS.filter((kw) => lower.includes(kw)).length >= 2;
}

export function WhoFor({ headline, body, highlight }: WhoForProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);
  const bodyParas = paragraphs.slice(0, -1);
  // TODO: Update "keep reading" → "let's talk." in Sanity Studio (about page, whoForBody field)
  const finalLine = paragraphs[paragraphs.length - 1];

  return (
    <section className="about-who-for-section">
      <div className="about-section-divider"></div>

      <ScrollReveal variant="fade-up">
        <span className="about-who-for-label">{headline}</span>
        {highlight && <span className="about-highlight">{highlight}</span>}
      </ScrollReveal>

      <div className="about-who-for-text-block">
        {bodyParas.map((para, idx) => {
          const isStyles = isStylesParagraph(para);
          if (isStyles) {
            return (
              <ScrollReveal key={idx} variant="fade" delay={150}>
                <p className="about-who-for-paragraph about-who-for-paragraph--styles">{para}</p>
              </ScrollReveal>
            );
          }
          return (
            <ScrollReveal key={idx} variant="fade" delay={100}>
              <p className="about-who-for-paragraph">{para}</p>
            </ScrollReveal>
          );
        })}
      </div>

      {finalLine && (
        <ScrollReveal variant="fade" delay={200}>
          <p className="about-who-for-paragraph">{finalLine}</p>
        </ScrollReveal>
      )}
    </section>
  );
}
