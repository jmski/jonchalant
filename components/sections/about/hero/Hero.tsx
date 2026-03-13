interface AboutHeroProps {
  headline?: string;
  description?: string;
}

export function Hero({ headline, description }: AboutHeroProps) {
  const displayHeadline = headline ?? "I coach people who think before they speak — and want rooms to notice.";
  const displayDescription = description ?? "A decade of professional choreography taught me that presence isn't about being loud. It's about being intentional. That insight became the foundation of everything I do.";

  return (
    <section className="about-hero-section">
      <div className="about-hero-container">
        <span className="about-hero-intro">Who I Am</span>
        <h1 className="about-hero-title">
          {displayHeadline}
        </h1>
        <p className="about-hero-subtitle">
          {displayDescription}
        </p>
      </div>
      <div className="about-hero-divider"></div>
    </section>
  );
}
