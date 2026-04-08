import { SectionHeader } from '@/components/ui/SectionHeader';

interface Service {
  _id: string;
  title: string;
  description: string;
}

interface ServicesProps {
  services?: Service[];
}

export function Services({ services = [] }: ServicesProps) {
  return (
    <section className="about-services-section">
      <SectionHeader
        eyebrow="The Work"
        title="What We Work On Together"
        description="Not theory, not templates. Real, focused work in the areas that move the needle fastest for quiet leaders."
      />

      <div className="about-services-grid">
        {services && services.length > 0 ? (
          services.map((service: any) => (
            <div key={service._id} className="about-service-card">
              <h3 className="about-service-card-title">
                {service.title}
              </h3>
              <p className="about-service-card-description">
                {service.description}
              </p>
            </div>
          ))
        ) : (
          <div className="loading-state">
            Loading coaching focus areas...
          </div>
        )}
      </div>
    </section>
  );
}
