import { SectionHeader } from '@/components/ui/SectionHeader';

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

const STEP_ICONS = [
  '◯',   // Empty circle — openness, seeing clearly
  '△',   // Triangle — structured effort, building
  '◇',   // Diamond — refined, complete integration
];

export function WhyItWorks({ label, highlight, paragraph1, paragraph2, paragraph3 }: WhyItWorksProps) {
  const steps = [paragraph1, paragraph2, paragraph3].filter(Boolean);

  return (
    <section className="home-why-works-section">
      <div className="home-why-works-layout">
        {highlight && (
          <SectionHeader
            eyebrow={label}
            title={highlight}
            className="home-why-works-header"
          />
        )}
        {steps.length > 0 && (
          <div className="home-why-works-timeline">
            {steps.map((body, idx) => (
              <div key={idx} className="home-why-works-step">
                <div className="home-why-works-step-marker">
                  <span className="home-why-works-step-icon">{STEP_ICONS[idx]}</span>
                  {idx < steps.length - 1 && <span className="home-why-works-step-line" aria-hidden="true" />}
                </div>
                <div className="home-why-works-step-content">
                  <span className="home-why-works-step-number">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="home-why-works-step-title">{STEP_TITLES[idx] ?? `Step ${idx + 1}`}</h3>
                  <p className="home-why-works-step-body">{body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
