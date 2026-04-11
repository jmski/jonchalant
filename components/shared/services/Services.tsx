import { ServiceCard } from '@/components/utilities/cards';
import { ScrollStagger } from '@/components/animations';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  isPrimary?: boolean;
  ctaLabel?: string;
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
      <ScrollStagger staggerDelay={120} threshold={0.15} className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            _id={service._id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            features={service.features}
            isPrimary={service.isPrimary}
            ctaLabel={service.ctaLabel}
          />
        ))}
      </ScrollStagger>
    </section>
  );
}
