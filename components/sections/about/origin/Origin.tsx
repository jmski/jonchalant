interface Phase {
  title: string;
  description: string;
}

interface OriginProps {
  headline?: string;
  description?: string;
  phases?: Phase[];
}

export function Origin({ headline, description, phases = [] }: OriginProps) {
  return (
    <section className="about-origin-section">
      <div className="about-origin-content">
        {headline ? (
          <>
            <h2 className="about-origin-title">
              {headline}
            </h2>
            
            <p className="about-origin-description">
              {description}
            </p>

            <div className="about-phases">
              <h3 className="about-phases-title">
                The Three Phases
              </h3>
              <div className="about-phases-list">
                {phases?.map((phase: any, idx: number) => (
                  <div key={idx}>
                    <h4 className="about-phase-item-title">{phase.title}</h4>
                    <p className="about-phase-item-description">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="loading-state">Loading origin story...</div>
        )}
      </div>

      {/* Right column placeholder */}
      <div className="about-origin-image">
        <p className="about-origin-image-text">Editorial Image Placeholder</p>
      </div>
    </section>
  );
}
