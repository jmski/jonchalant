interface AudienceData {
  age?: Array<{ range: string; percentage: number }>;
  gender?: Array<{ label: string; percentage: number }>;
  locations?: Array<{ country: string; percentage: number }>;
}

interface AudienceProfileProps {
  audience: AudienceData;
}

export function AudienceProfile({ audience }: AudienceProfileProps) {
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
          Audience Profile
        </h2>
        <div 
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Age Distribution */}
        <div className="p-8 rounded-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Age Distribution</h3>
          <div className="space-y-6">
            {audience?.age?.map((age: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {age.range}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {age.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div
                    className="h-full transition-all duration-1000"
                    style={{ width: `${age.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="p-8 rounded-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Gender Distribution</h3>
          <div className="space-y-6">
            {audience?.gender?.map((gender: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {gender.label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {gender.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div
                    className="h-full transition-all duration-1000"
                    style={{ width: `${gender.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="p-8 rounded-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Top Locations</h3>
          <div className="space-y-6">
            {audience?.locations?.map((location: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {location.country}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {location.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div
                    className="h-full transition-all duration-1000"
                    style={{ width: `${location.percentage}%`, backgroundColor: 'var(--accent-primary)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
