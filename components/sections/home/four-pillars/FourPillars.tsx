import type { HomePillar } from '@/lib/types';

interface FourPillarsProps {
  headline?: string;
  pillars?: HomePillar[];
}

const FALLBACK_HEADLINE = 'The fundamentals are the same. The medium is yours to choose.';

export function FourPillars({ headline, pillars }: FourPillarsProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="four-pillars-section">
      <div className="four-pillars-header">
        <p className="four-pillars-eyebrow">The Four Pillars</p>
        <h2 className="four-pillars-headline">{headline ?? FALLBACK_HEADLINE}</h2>
        <p className="four-pillars-subhead">
          Grounding, Energy, Flow, Command — the embodiment archetypes that transfer across every medium.
        </p>
      </div>

      <div className="four-pillars-grid">
        {pillars.map((pillar) => (
          <div key={pillar._key ?? pillar.name} className="four-pillars-card">
            <p className="four-pillars-card-label">{pillar.number}</p>
            <h3 className="four-pillars-card-name">{pillar.name}</h3>
            <p className="four-pillars-card-def">{pillar.definition}</p>
            {pillar.applications?.length > 0 && (
              <ul className="four-pillars-card-apps">
                {pillar.applications.map((app) => (
                  <li key={app._key ?? app.who}>
                    <span className="four-pillars-card-who">{app.who}</span>
                    {' '}{app.body}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
