import { ServiceCard } from '@/components/utilities/cards';
import { SectionHeader } from '@/components/ui/SectionHeader';

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
      {heading && (
        <SectionHeader
          eyebrow={eyebrow}
          title={heading}
          description={description}
        />
      )}
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
