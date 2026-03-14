interface Stat {
  label: string;
  value: string;
}

interface StatsProps {
  stats: Stat[];
  heading?: string;
  description?: string;
  eyebrow?: string;
  columns?: 2 | 3 | 4;
}

export async function Stats({
  stats,
  heading,
  description,
  eyebrow = 'Impact',
  columns = 3,
}: StatsProps) {
  return (
    <section className="stats-section">
      {(heading || description) && (
        <header className="stats-section-header">
          <span className="stats-section-eyebrow">{eyebrow}</span>
          {heading && <h2 className="stats-section-heading">{heading}</h2>}
          {description && (
            <p className="stats-section-description">{description}</p>
          )}
        </header>
      )}
      <div className="stats-section-grid" data-columns={columns}>
        {stats.map((stat, idx) => (
          <div key={idx} className="stats-section-item">
            <span className="stats-section-value">{stat.value}</span>
            <span className="stats-section-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
