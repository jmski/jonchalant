interface Platform {
  name: string;
  handle: string;
  followers: string;
  avgViews: string;
  category: string;
}

interface PlatformBreakdownProps {
  platforms: Platform[];
}

export function PlatformBreakdown({ platforms }: PlatformBreakdownProps) {
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
          Platform Breakdown
        </h2>
        <div 
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platforms?.map((platform: any, idx: number) => (
          <div
            key={idx}
            className="p-8 rounded-sm border-l-4 transition-all duration-300 hover:shadow-md"
            style={{ 
              borderLeftColor: 'var(--accent-primary)',
              borderLeft: '4px solid var(--accent-primary)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                {platform.name}
              </p>
              <p className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {platform.handle}
              </p>
            </div>

            <div className="space-y-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div>
                <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                  Followers
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                  {platform.followers}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                  Avg Monthly Views
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                  {platform.avgViews}
                </p>
              </div>
              <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {platform.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
