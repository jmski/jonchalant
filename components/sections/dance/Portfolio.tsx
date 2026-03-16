import dynamic from 'next/dynamic';
import { DANCE_FILTER_CATEGORIES } from '@/lib/pageContent';

/** Portfolio item shape expected by DanceFilter — matches DanceFilter's internal DanceItem interface. */
interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
}

const DanceFilter = dynamic(() => import('@/components/content').then(mod => ({ default: mod.DanceFilter })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

interface PortfolioProps {
  items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
  return (
    <section>
      <DanceFilter items={items} categories={DANCE_FILTER_CATEGORIES} />
    </section>
  );
}
