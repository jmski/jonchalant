import Link from 'next/link';

interface ServiceCardProps {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

export function ServiceCard({ _id, title, description, icon, features }: ServiceCardProps) {
  return (
    <div className="service-card">
      {/* Icon header */}
      <div className="service-card-header">
        {icon && <div className="service-card-icon">{icon}</div>}
        <h3 className="service-card-title">
          {title}
        </h3>
      </div>

      {/* Content section */}
      <div className="service-card-body">
        {/* Description */}
        <p className="service-card-description">
          {description}
        </p>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="service-card-features">
            {features.map((feature, idx) => (
              <div key={idx} className="service-card-feature">
                <span className="service-card-feature-check">✓</span>
                <span className="service-card-feature-text">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="service-card-footer">
        <Link
          href="/programs"
          className="service-card-cta"
          aria-label={`Explore ${title} coaching`}
        >
          <span>Explore this coaching path</span>
          <span className="service-card-cta-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
