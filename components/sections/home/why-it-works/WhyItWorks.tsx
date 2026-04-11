'use client';

import { useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const nodes = nodeRefs.current;
    if (!section) return;

    const observers: IntersectionObserver[] = [];

    // Observe section to draw the timeline line
    if (line) {
      const sectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            line.classList.add('is-drawn');
          }
        },
        { threshold: 0.15 }
      );
      sectionObserver.observe(section);
      observers.push(sectionObserver);
    }

    // Observe each node individually
    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          }
        });
      },
      { threshold: 0.4 }
    );

    nodes.forEach((node) => {
      if (node) nodeObserver.observe(node);
    });
    observers.push(nodeObserver);

    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  return (
    <section className="home-why-works-section" ref={sectionRef}>
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
            <div className="timeline-line" ref={lineRef} />
            {steps.map((body, idx) => (
              <div
                key={idx}
                className="home-why-works-step timeline-node"
                data-index={idx + 1}
                ref={(el) => { nodeRefs.current[idx] = el; }}
              >
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
