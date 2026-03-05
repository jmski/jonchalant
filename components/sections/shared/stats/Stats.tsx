import { StatsGrid } from '@/components/shared/grids';

interface Stat {
  label: string;
  value: string;
}

interface StatsProps {
  stats: Stat[];
  heading?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export async function Stats({ stats, heading, description, columns = 3 }: StatsProps) {
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
