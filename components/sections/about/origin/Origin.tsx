interface OriginProps {
  headline?: string;
  description?: string;
}

export function Origin({ headline, description }: OriginProps) {
  return (
    <section className="about-origin-section">
      {headline ? (
        <>
          <h2 className="about-origin-title">
            {headline}
          </h2>
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
