interface WhoForProps {
  headline: string;
  body: string;
}

export function WhoFor({ headline, body }: WhoForProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  return (
    <section className="about-who-for-section">
      <span className="about-who-for-label">{headline}</span>
      <div className="about-who-for-text-block">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="about-who-for-paragraph">{para}</p>
        ))}
      </div>
    </section>
  );
}
