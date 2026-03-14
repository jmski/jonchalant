interface FocusItem {
  title: string;
  description: string;
  icon: string;
}

interface FocusAreasProps {
  items?: FocusItem[];
}

export function FocusAreas({ items = [] }: FocusAreasProps) {
  const displayItems = items.slice(0, 3);

  return (
    <div className="focus-areas-list">
      {displayItems.length > 0 ? (
        displayItems.map((pillar, idx) => (
          <div key={idx} className="focus-area-card">
            <div className="focus-area-card-inner">
              <div className="focus-area-card-icon">{pillar.icon}</div>
              <div>
                <h2 className="focus-area-card-title">{pillar.title}</h2>
                <p className="focus-area-card-description">{pillar.description}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="focus-areas-empty">Loading program focus areas...</div>
      )}
    </div>
  );
}
