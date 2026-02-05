import { sanityClient } from '@/lib/sanityClient';
import { statsQuery } from '@/lib/sanityQueries';
import AnimatedStatCard from '@/components/AnimatedStatCard';

interface PlatformStats {
  platform: string;
  followers: number;
  totalViews: number;
  avgEngagementRate: number;
  monthlyGrowth: number;
  profileUrl: string;
  updatedAt: string;
}

export default async function StatsSection() {
  let stats: PlatformStats[] = [];

  try {
    stats = await sanityClient.fetch(statsQuery);
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return empty or placeholder stats if fetch fails
  }

  if (stats.length === 0) {
    return (
      <section className="py-20 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent mb-12 text-center font-display gradient-heading">
            By The Numbers
          </h2>
          <p className="text-center text-lg text-secondary">
            Platform metrics coming soon. Follow along to see the journey!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent mb-12 text-center font-display gradient-heading">
          By The Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <AnimatedStatCard key={stat.platform} stat={stat} />
          ))}
        </div>

        <p className="text-center text-sm mt-8 text-tertiary">
          Stats update automatically from Sanity CMS
        </p>
      </div>
    </section>
  );
}
