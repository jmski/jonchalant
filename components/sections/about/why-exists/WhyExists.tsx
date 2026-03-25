interface WhyExistsProps {
  headline: string;
  body: string;
  highlight?: string;
}

export function WhyExists({ headline, body, highlight }: WhyExistsProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-why-exists-section">
      <span className="about-why-exists-label">{headline}</span>
      {highlight && <span className="about-highlight">{highlight}</span>}
      <div className="about-why-exists-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-why-exists-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
