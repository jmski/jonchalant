interface HeroStatsProps {
  stats?: Array<{ label: string; value: string }>;
}

export function HeroStats({ stats = [] }: HeroStatsProps) {
  const defaultStats = [
    { label: 'Total Followers', value: '100K+' },
    { label: 'Monthly Views', value: '2M+' },
    { label: 'Engagement Rate', value: '8-12%' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="media-kit-hero-stats">
      {displayStats.map((stat, idx) => (
        <div key={idx} className="media-kit-hero-stat">
          <p className="media-kit-hero-stat-label">{stat.label}</p>
          <p className="media-kit-hero-stat-value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
