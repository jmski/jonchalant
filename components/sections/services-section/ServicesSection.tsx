import { ServiceCard } from '@/components/shared/cards';
import { CardGrid } from '@/components/shared/grids';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

interface ServiceCardsSectionProps {
  services: Service[];
  heading?: string;
  description?: string;
}

export function ServicesSection({ services, heading, description }: ServiceCardsSectionProps) {
  return (
    <section className="services-section">
      {(heading || description) && (
        <div className="services-section-header">
          {heading && <h2 className="services-section-heading">{heading}</h2>}
          {description && <p className="services-section-description">{description}</p>}
        </div>
      )}
      <CardGrid columns={3}>
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
      </CardGrid>
    </section>
  );
}
