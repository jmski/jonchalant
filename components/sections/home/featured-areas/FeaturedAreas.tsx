interface FeaturedArea {
  title: string;
  description: string;
  href: string;
  count: string;
  bgColor: string;
  metrics?: Array<{ label: string; value: string }>;
  tags?: string[];
}

interface FeaturedAreaProps {
  heading?: string;
  description?: string;
  areas: FeaturedArea[];
}

export function FeaturedAreas({ heading, description, areas }: FeaturedAreaProps) {
  return (
    <section className="featured-areas-section">
      {(heading || description) && (
        <div className="featured-areas-header">
          {heading && <h2 className="featured-areas-heading">{heading}</h2>}
          {description && <p className="featured-areas-description">{description}</p>}
        </div>
      )}

      <div className="featured-areas-grid">
        {areas.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="featured-area-card group"
          >
            {/* Visual header with gradient */}
            <div className={`featured-area-visual bg-linear-to-br ${item.bgColor}`}>
              <div className="featured-area-visual-overlay" />
              <div className="featured-area-visual-content">
                <p className="featured-area-count">
                  {item.count}
                </p>
                <div className="featured-area-icon-placeholder" />
              </div>
            </div>

            {/* Content section */}
            <div className="featured-area-body">
              {/* Title and description */}
              <div className="featured-area-content">
                <h3 className="featured-area-title">
                  {item.title}
                </h3>
                <p className="featured-area-description">
                  {item.description}
                </p>
              </div>

              {/* Metrics and tags */}
              {(item.metrics || item.tags) && (
                <div className="featured-area-meta">
                  {item.metrics && (
                    <div className="featured-area-metrics">
                      {item.metrics.map((metric, midx) => (
                        <div key={midx} className="featured-area-metric">
                          <span className="featured-area-metric-label">{metric.label}</span>
                          <span className="featured-area-metric-value">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.tags && (
                    <div className="featured-area-tags">
                      {item.tags.map((tag, tidx) => (
                        <span key={tidx} className="featured-area-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="featured-area-cta">
                Explore →
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
