'use client';

import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader/SectionHeader';
import type { MethodStep, SectionHeader as SectionHeaderType } from '@/lib/types';

interface MethodProps {
  header?: SectionHeaderType;
  steps: MethodStep[];
}

const STEP_ICONS = ['◯', '△', '◇'];

export function Method({ header, steps }: MethodProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const nodes = nodeRefs.current;
    if (!section) return;

    const observers: IntersectionObserver[] = [];

    if (line) {
      const sectionObserver = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) line.classList.add('is-drawn'); },
        { threshold: 0.15 }
      );
      sectionObserver.observe(section);
      observers.push(sectionObserver);
    }

    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-active');
        });
      },
      { threshold: 0.4 }
    );
    nodes.forEach((node) => { if (node) nodeObserver.observe(node); });
    observers.push(nodeObserver);

    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  if (!steps || steps.length === 0) return null;

  return (
    <section className="home-why-works-section" ref={sectionRef}>
      <div className="home-why-works-layout">
        {header?.headline && (
          <div className="why-it-works-left">
            <SectionHeader
              eyebrow={header.eyebrow}
              title={header.headline}
              description={header.subhead}
              className="home-why-works-header"
            />
          </div>
        )}
        <div className="home-why-works-timeline">
          <div className="timeline-draw-line" ref={lineRef} aria-hidden="true" />
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="home-why-works-step timeline-node-item"
              data-index={idx + 1}
              ref={(el) => { nodeRefs.current[idx] = el; }}
            >
              <div className="home-why-works-step-marker">
                <span className="home-why-works-step-icon">{STEP_ICONS[idx] ?? '◯'}</span>
                {idx < steps.length - 1 && <span className="home-why-works-step-line" aria-hidden="true" />}
              </div>
              <div className="home-why-works-step-content">
                <span className="home-why-works-step-number">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="home-why-works-step-title">{step.title}</h3>
                <p className="home-why-works-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
