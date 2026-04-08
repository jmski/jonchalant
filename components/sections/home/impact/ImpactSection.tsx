import { SectionHeader } from '@/components/ui/SectionHeader';

interface ImpactSectionProps {
  headline?: string;
  featuredMainTitle?: string;
  featuredMainDescription?: string;
  sidebarFeatures?: Array<{
    title: string;
    description: string;
  }>;
}

export function ImpactSection({
  headline,
  featuredMainTitle,
  featuredMainDescription,
  sidebarFeatures = [],
}: ImpactSectionProps) {
  return (
    <section className="impact-section">
      {headline && (
        <SectionHeader title={headline} />
      )}

      <div className="impact-grid">
        {/* Main featured area */}
        <div className="impact-main">
          <div className="impact-main-image" />
          {featuredMainTitle && (
            <h3 className="impact-main-title">{featuredMainTitle}</h3>
          )}
          {featuredMainDescription && (
            <p className="impact-main-description">{featuredMainDescription}</p>
          )}
        </div>

        {/* Sidebar features */}
        <div className="impact-sidebar">
          {sidebarFeatures.map((feature, idx) => (
            <div key={idx} className="impact-feature">
              <div className="impact-feature-content">
                <h4 className="impact-feature-title">{feature.title}</h4>
                <p className="impact-feature-description">{feature.description}</p>
              </div>
              {idx < sidebarFeatures.length - 1 && (
                <div className="impact-feature-divider" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
