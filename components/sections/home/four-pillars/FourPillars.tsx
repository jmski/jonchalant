import SectionHeader from '@/components/ui/SectionHeader/SectionHeader';
import type { PillarCard, SectionHeader as SectionHeaderType } from '@/lib/types';

interface FourPillarsProps {
  header?: SectionHeaderType;
  pillars?: PillarCard[];
}

export function FourPillars({ header, pillars }: FourPillarsProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="four-pillars-section">
      <div className="four-pillars-header">
        {header?.eyebrow && <p className="four-pillars-eyebrow">{header.eyebrow}</p>}
        {header?.headline && (
          <h2 className="four-pillars-headline">{header.headline}</h2>
        )}
        {header?.subhead && (
          <p className="four-pillars-subhead">{header.subhead}</p>
        )}
        {!header && (
          <SectionHeader title="The Four Pillars" />
        )}
      </div>

      <div className="four-pillars-grid">
        {pillars.map((pillar, idx) => (
          <div key={pillar.title ?? idx} className="four-pillars-card">
            <p className="four-pillars-card-label">{String(idx + 1).padStart(2, '0')}</p>
            <h3 className="four-pillars-card-name">{pillar.title}</h3>
            <p className="four-pillars-card-def">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
