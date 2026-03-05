import { ServiceCard } from '@/components/utilities/cards';
import { CardGrid } from '@/components/utilities/grids';

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
}

export function Services({ services, heading, description }: ServicesProps) {
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
