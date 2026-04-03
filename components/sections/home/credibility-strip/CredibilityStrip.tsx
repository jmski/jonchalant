interface Stat {
  value: string;
  label: string;
}

interface CredibilityStripProps {
  stats?: Stat[];
}

export function CredibilityStrip({ stats }: CredibilityStripProps) {
  if (!stats || stats.length === 0) return null;

  const filtered = stats.filter(s => s.value);
  if (filtered.length === 0) return null;

  return (
    <div className="credibility-strip">
      <div className="credibility-strip-inner">
        {filtered.flatMap((stat, i) => [
          i > 0 ? (
            <div key={`divider-${i}`} className="credibility-strip-divider" aria-hidden="true" />
          ) : null,
          <div key={stat.label} className="credibility-strip-stat">
            <span className="credibility-strip-value">{stat.value}</span>
            <span className="credibility-strip-label">{stat.label}</span>
          </div>,
        ])}
      </div>
    </div>
  );
}
