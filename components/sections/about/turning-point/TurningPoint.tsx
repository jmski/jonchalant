interface TurningPointProps {
  headline: string;
  body: string;
  highlight?: string;
}

export function TurningPoint({ headline, body, highlight }: TurningPointProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-turning-point-section">
      <span className="about-turning-point-label">{headline}</span>
      {highlight && <span className="about-highlight">{highlight}</span>}
      <div className="about-turning-point-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-turning-point-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
