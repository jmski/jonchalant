import React from 'react';

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
    <>
      <style>{`
        .stat-card {
          transition: all 300ms ease-in-out;
        }
        .stat-card:hover {
          box-shadow: 0 8px 24px rgba(var(--accent-primary-rgb), 0.12);
          transform: translateY(-4px);
        }
      `}</style>

      <div className="space-y-6">
        {displayStats.map((stat, idx) => (
          <div
            key={idx}
            className="stat-card p-6 sm:p-8 rounded-sm border-l-4"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderLeftColor: 'var(--accent-primary)',
            }}
          >
            <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
              {stat.label}
            </p>
            <p className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--accent-primary)' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
