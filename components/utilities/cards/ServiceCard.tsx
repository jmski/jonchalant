import Link from 'next/link';
import { FeatureList } from '@/components/ui/FeatureList';

interface ServiceCardProps {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  isPrimary?: boolean;
  ctaLabel: string;
}

export function ServiceCard({ _id, title, description, icon, features, isPrimary, ctaLabel }: ServiceCardProps) {
  return (
    <div className={`service-card${isPrimary ? ' service-card--primary' : ''}`}>
      {/* Icon */}
      {icon && <div className="service-card-icon">{icon}</div>}

      {/* Title */}
      <h3 className="service-card-title">{title}</h3>

      {/* Description */}
      <p className="service-card-description">{description}</p>

      {/* Features list */}
      {features && features.length > 0 && (
        <FeatureList items={features} icon="dash" className="service-card-features" />
      )}

      {/* CTA */}
      <Link
        href="/programs"
        className="service-card-cta"
        aria-label={`Explore ${title} coaching`}
      >
        {ctaLabel}
        <span className="service-card-cta-arrow">→</span>
      </Link>
    </div>
  );
}
