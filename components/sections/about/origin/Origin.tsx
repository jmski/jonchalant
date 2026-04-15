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
          <span className="about-origin-label">{label ?? 'WHAT CHANGED EVERYTHING'}</span>
          {firstPara && (
            <p className="about-origin-description">{firstPara}</p>
          )}
          {highlight && (
            <blockquote className="about-pull-quote">{highlight}</blockquote>
          )}
          {restParas.map((para, idx) => (
            <p key={idx} className="about-origin-description">{para}</p>
          ))}
        </>
      ) : (
        <div className="loading-state">Loading origin story...</div>
      )}
    </section>
  );
}
