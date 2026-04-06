import { ServiceCard } from '@/components/utilities/cards';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

interface ServicesProps {
  services: Service[];
  heading?: string;
  description?: string;
  eyebrow?: string;
}

export function Services({ services, heading, description, eyebrow }: ServicesProps) {
  return (
    <section className="services-section">
      <div className="services-section-header">
        {eyebrow && <span className="services-section-eyebrow">{eyebrow}</span>}
        {heading && <h2 className="services-section-heading">{heading}</h2>}
        {description && <p className="services-section-description">{description}</p>}
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            _id={service._id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            features={service.features}
          />
        ))}
      </div>
    </section>
  );
}
