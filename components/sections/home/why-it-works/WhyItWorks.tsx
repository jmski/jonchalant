interface WhyItWorksProps {
  label?: string;
  highlight?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

const STEP_TITLES = [
  'Awareness',
  'Practice',
  'Integration',
];

export function WhyItWorks({ label, highlight, paragraph1, paragraph2, paragraph3 }: WhyItWorksProps) {
  const steps = [paragraph1, paragraph2, paragraph3].filter(Boolean);

  return (
    <section className="home-why-works-section">
      {label && <span className="home-why-works-label">{label}</span>}
      {highlight && <h2 className="home-why-works-highlight">{highlight}</h2>}
      {steps.length > 0 && (
        <div className="home-why-works-grid">
          {steps.map((body, idx) => (
            <div key={idx} className="home-why-works-card">
              <span className="home-why-works-card-step">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="home-why-works-card-title">{STEP_TITLES[idx] ?? `Step ${idx + 1}`}</h3>
              <p className="home-why-works-card-body">{body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
