interface Metric {
  label: string;
  value: string;
  change: string;
}

interface KeyMetricsProps {
  metrics: Metric[];
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
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
          Key Metrics
        </h2>
        <div 
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.map((stat: any, idx: number) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-sm border-b-2 transition-all duration-300 hover:shadow-md"
            style={{ 
              borderBottomColor: 'var(--accent-primary)',
              borderBottom: '2px solid var(--accent-primary)'
            }}
          >
            <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>
              {stat.label}
            </p>
            <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {stat.value}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
