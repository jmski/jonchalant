interface Stat {
  label: string;
  value: string;
}

interface StatsGridProps {
  stats: Stat[];
  heading?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, heading, description, columns = 3 }: StatsGridProps) {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className="stats-grid-container">
      {(heading || description) && (
        <div className="stats-grid-header">
          {heading && <h2 className="stats-grid-heading">{heading}</h2>}
          {description && <p className="stats-grid-description">{description}</p>}
        </div>
      )}
      <div className={`stats-grid ${gridColsClass}`}>
        {stats.map((stat, idx) => (
          <div key={idx} className="stats-grid-item">
            <div className="stats-grid-value">
              {stat.value}
            </div>
            <div className="stats-grid-label">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
