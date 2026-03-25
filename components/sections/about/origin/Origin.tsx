interface OriginProps {
  label?: string;
  headline?: string;
  description?: string;
  highlight?: string;
}

export function Origin({ label, headline, description, highlight }: OriginProps) {
  return (
    <section className="about-origin-section">
      {headline ? (
        <>
          <span className="about-origin-label">{label ?? 'WHAT CHANGED EVERYTHING'}</span>
          {highlight && <span className="about-highlight">{highlight}</span>}
          <p className="about-origin-description">
            {description}
          </p>
        </>
      ) : (
        <div className="loading-state">Loading origin story...</div>
      )}
    </section>
  );
}
