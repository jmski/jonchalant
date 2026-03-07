interface WhyWorkTogetherItem {
  title: string;
  description: string;
}

interface WhyWorkTogetherProps {
  heading?: string;
  items?: WhyWorkTogetherItem[];
  showVisualShowcase?: boolean;
}

export function WhyWorkTogether({
  heading = 'Why Work Together',
  items = [
    { title: 'Technical Excellence', description: 'Precision choreography with professional production quality' },
    { title: 'Creative Partnership', description: 'Collaborative approach from concept to final execution' },
    { title: 'Strategic Thinking', description: 'Brand alignment and audience engagement optimization' },
    { title: 'Fast Turnaround', description: 'Efficient workflows without compromising on quality' },
  ],
  showVisualShowcase = true,
}: WhyWorkTogetherProps) {
  return (
    <section className="why-work-together-section">
      <div className="why-work-together-grid">
        <div className="why-work-together-content">
          <h2 className="why-work-together-heading">{heading}</h2>
          <div className="why-work-together-features">
            {items.map((item, idx) => (
              <div key={idx} className="why-feature">
                <div className="why-feature-number">{idx + 1}</div>
                <div className="why-feature-body">
                  <h4 className="why-feature-title">{item.title}</h4>
                  <p className="why-feature-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showVisualShowcase && (
          <div className="why-work-together-visual">
            <p className="why-visual-placeholder">Visual Showcase</p>
          </div>
        )}
      </div>
    </section>
  );
}
