interface ContentCategory {
  name: string;
  percentage: number;
  description: string;
}

interface ContentMixProps {
  categories: ContentCategory[];
}

export function ContentMix({ categories }: ContentMixProps) {
  return (
    <section>
      <div className="space-y-3 mb-12">
        <h2 
          className="text-3xl sm:text-4xl font-bold leading-tight"
          style={{ 
            fontSize: 'clamp(1.875rem, 5vw, 2.25rem)',
            color: 'var(--text-primary)' 
          }}
        >
          Content Mix
        </h2>
        <div 
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>

      <div className="space-y-10">
        {categories?.map((category: any, idx: number) => (
          <div key={idx} className="space-y-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {category.name}
              </h3>
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                {category.percentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
              <div
                className="h-full transition-all duration-1000"
                style={{ width: `${category.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
              />
            </div>

            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
