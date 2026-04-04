import dynamic from 'next/dynamic';

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
  const preferredCategoryOrder = ['choreography', 'freestyle', 'performance'];
  const uniqueCategories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  );
  const orderedCategories = [
    ...preferredCategoryOrder.filter((category) =>
      uniqueCategories.some((itemCategory) => itemCategory.toLowerCase() === category)
    ),
    ...uniqueCategories.filter(
      (category) => !preferredCategoryOrder.includes(category.toLowerCase())
    ),
  ];

  return (
    <section>
      <DanceFilter items={items} categories={orderedCategories} />
    </section>
  );
}
