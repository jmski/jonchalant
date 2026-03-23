interface WhyExistsProps {
  headline: string;
  body: string;
}

export function WhyExists({ headline, body }: WhyExistsProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-why-exists-section">
      <span className="about-why-exists-label">{headline}</span>
      <div className="about-why-exists-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-why-exists-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
