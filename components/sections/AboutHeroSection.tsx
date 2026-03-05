interface AboutHeroProps {
  headline?: string;
  description?: string;
}

export function AboutHeroSection({ headline, description }: AboutHeroProps) {
  return (
    <section className="about-hero-section">
      <div className="about-hero-container">
        {headline ? (
          <>
            <span className="about-hero-intro">Who I Am</span>
            <h1 className="about-hero-title">
              {headline}
            </h1>
            <p className="about-hero-subtitle">
              {description}
            </p>
          </>
        ) : (
          <div className="loading-state">Loading hero content...</div>
        )}
      </div>
      <div className="about-hero-divider"></div>
    </section>
  );
}
