'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Bento, BentoCell } from '@/components/shared/bento';
import { KineticHeading } from '@/components/typography/KineticHeading';
import type { WhyItWorksCell } from '@/lib/types';

interface WhyItWorksProps {
  // Legacy flat props
  label?: string;
  highlight?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  // Bento props (Phase 5)
  bentoHeadline?: string;
  cells?: WhyItWorksCell[];
}

const STEP_TITLES = ['Awareness', 'Practice', 'Integration'];
const STEP_ICONS = ['◯', '△', '◇'];

export function WhyItWorks({
  label,
  highlight,
  paragraph1,
  paragraph2,
  paragraph3,
  bentoHeadline,
  cells,
}: WhyItWorksProps) {
  if (cells && cells.length > 0) {
    return (
      <WhyItWorksBento headline={bentoHeadline ?? label} cells={cells} />
    );
  }
  return (
    <WhyItWorksLegacy
      label={label}
      highlight={highlight}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      paragraph3={paragraph3}
    />
  );
}

// ─── Bento layout (Phase 5) ──────────────────────────────────────────────────

function WhyItWorksBento({
  headline,
  cells,
}: {
  headline?: string;
  cells: WhyItWorksCell[];
}) {
  return (
    <section className="why-it-works">
      {headline && (
        <div className="why-it-works-heading">
          <KineticHeading as="h2" anchorWords={['works', 'presence', 'stillness', 'grounded']}>
            {headline}
          </KineticHeading>
        </div>
      )}
      <Bento columns={4} gap="md">
        {cells.map((cell) => (
          <BentoCell key={cell._key} size={cell.size ?? 'sm'} className="why-it-works-cell">
            {cell.image?.asset?.url && (
              <div className="why-it-works-cell-image">
                <Image
                  src={cell.image.asset.url}
                  alt={cell.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            )}
            <div className="why-it-works-cell-body">
              <h3 className="why-it-works-cell-title">{cell.title}</h3>
              {cell.insight && (
                <p className="why-it-works-cell-insight">{cell.insight}</p>
              )}
            </div>
          </BentoCell>
        ))}
      </Bento>
    </section>
  );
}

// ─── Legacy timeline layout ───────────────────────────────────────────────────

function WhyItWorksLegacy({
  label,
  highlight,
  paragraph1,
  paragraph2,
  paragraph3,
}: Omit<WhyItWorksProps, 'bentoHeadline' | 'cells'>) {
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

  return (
    <section className="home-why-works-section" ref={sectionRef}>
      <div className="home-why-works-layout">
        {highlight && (
          <div className="why-it-works-left">
            <SectionHeader
              eyebrow={label}
              title={highlight}
              className="home-why-works-header"
            />
          </div>
        )}
        {steps.length > 0 && (
          <div className="home-why-works-timeline">
            <div className="timeline-draw-line" ref={lineRef} aria-hidden="true" />
            {steps.map((body, idx) => (
              <div
                key={idx}
                className="home-why-works-step timeline-node-item"
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
