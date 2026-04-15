interface WhoForProps {
  headline: string;
  body: string;
  highlight?: string;
}

export function WhoFor({ headline, body, highlight }: WhoForProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-who-for-section">
      <div className="about-section-divider"></div>
      <span className="about-who-for-label">{headline}</span>
      {highlight && <span className="about-highlight">{highlight}</span>}
      <div className="about-who-for-text-block">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-who-for-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
