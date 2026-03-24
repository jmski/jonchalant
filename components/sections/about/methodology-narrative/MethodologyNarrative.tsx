interface MethodologyNarrativeProps {
  headline: string;
  body: string;
}

export function MethodologyNarrative({ headline, body }: MethodologyNarrativeProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-methodology-narrative-section">
      <span className="about-methodology-narrative-label">{headline}</span>
      <div className="about-methodology-narrative-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-methodology-narrative-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
