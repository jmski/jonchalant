import dynamic from 'next/dynamic';
import { DANCE_FILTER_CATEGORIES } from '@/lib/pageContent';

const DanceFilter = dynamic(() => import('@/components/content').then(mod => ({ default: mod.DanceFilter })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

interface PortfolioProps {
  items: any[];
}

export function Portfolio({ items }: PortfolioProps) {
  return (
    <section>
      <DanceFilter items={items} categories={DANCE_FILTER_CATEGORIES} />
    </section>
  );
}
