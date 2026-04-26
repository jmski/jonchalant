import { SectionHeader } from '@/components/ui/SectionHeader';

interface PortfolioItem {
  title: string;
  description: string;
  href: string;
  count: string;
  metrics: Array<{ label: string; value: string }>;
  tags: string[];
  bgColor: string;
}

interface PortfolioPreviewProps {
  heading?: string;
  description?: string;
  items?: PortfolioItem[];
}

export function PortfolioPreview({
  heading = 'Explore My Work',
  description = 'Each area represents years of expertise, refined methodology, and proven results. Discover what makes each unique.',
  items = [
    {
      title: 'Social Skill Lessons',
      description: 'Structured frameworks for the four pillars — Grounding, Energy, Flow, Command',
      href: '/lessons',
      count: 'Master Classes',
      metrics: [
        { label: 'Course Modules', value: '15' },
        { label: 'Students Trained', value: '100+' }
      ],
      tags: ['Coaching', 'Training', 'Leadership'],
      bgColor: 'from-slate-800 to-slate-900'
    },
  ],
}: PortfolioPreviewProps) {
  return (
    <section className="portfolio-preview-section">
      <SectionHeader title={heading} description={description} />

      <div className="portfolio-preview-grid">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="portfolio-card group"
          >
            {/* Visual header with gradient */}
            <div className={`portfolio-card-visual bg-linear-to-br ${item.bgColor}`}>
              <div className="portfolio-card-overlay" />
              <div className="portfolio-card-content">
                <p className="portfolio-card-count">{item.count}</p>
                <div className="portfolio-card-icon" />
              </div>
            </div>

            {/* Content section */}
            <div className="portfolio-card-body">
              {/* Title and description */}
              <div className="portfolio-card-header">
                <h3 className="portfolio-card-title">{item.title}</h3>
                <p className="portfolio-card-description">{item.description}</p>
              </div>

              {/* Metrics */}
              <div className="portfolio-card-metrics">
                {item.metrics.map((metric, midx) => (
                  <div key={midx} className="portfolio-metric">
                    <span className="portfolio-metric-label">{metric.label}</span>
                    <span className="portfolio-metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="portfolio-card-tags">
                {item.tags.map((tag, tidx) => (
                  <span key={tidx} className="portfolio-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA indicator */}
              <div className="portfolio-card-cta">
                <span>Explore</span>
                <span className="portfolio-card-arrow">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
