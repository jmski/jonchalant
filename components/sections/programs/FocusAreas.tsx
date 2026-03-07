interface FocusItem {
  title: string;
  description: string;
  icon: string;
}

interface FocusAreasProps {
  items?: FocusItem[];
}

export function FocusAreas({ items = [] }: FocusAreasProps) {
  return (
    <>
      <style>{`
        .pillar-card {
          transition: all 300ms ease-in-out;
        }
        .pillar-card:hover {
          box-shadow: 0 8px 24px rgba(107, 142, 99, 0.12);
          transform: translateY(-4px);
        }
      `}</style>
      <div className="space-y-6">
        {items.length > 0 ? (
          items.map((pillar, idx) => (
            <div
              key={idx}
              className="pillar-card p-6 sm:p-8 rounded-sm border-l-4"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderLeftColor: 'var(--accent-primary)',
                borderLeftWidth: '4px'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="text-4xl shrink-0"
                  style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {pillar.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h2 
                    className="font-headline font-bold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {pillar.title}
                  </h2>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
            Loading program focus areas...
          </div>
        )}
      </div>
    </>
  );
}
