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
      {/* Icon */}
      {icon && <div className="service-card-icon">{icon}</div>}

      {/* Title */}
      <h3 className="service-card-title">{title}</h3>

      {/* Description */}
      <p className="service-card-description">{description}</p>

      {/* Features list */}
      {features && features.length > 0 && (
        <ul className="service-card-features">
          {features.map((feature, idx) => (
            <li key={idx} className="service-card-feature">
              <span className="service-card-feature-mark" aria-hidden="true">—</span>
              <span className="service-card-feature-text">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <Link
        href="/programs"
        className="service-card-cta"
        aria-label={`Explore ${title} coaching`}
      >
        Explore this path
        <span className="service-card-cta-arrow" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
