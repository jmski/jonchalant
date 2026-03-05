import { StatsGrid } from '@/components/shared/grids';

interface Stat {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats: Stat[];
  heading?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export async function StatsSection({ stats, heading, description, columns = 3 }: StatsSectionProps) {
  return (
    <section className="stats-section">
      <StatsGrid 
        stats={stats} 
        heading={heading}
        description={description}
        columns={columns}
      />
    </section>
  );
}
