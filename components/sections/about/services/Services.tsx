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
      <div className="about-services-header">
        <h2 className="about-services-title">
          What I Coach
        </h2>
        <p className="about-services-subtitle">
          Three core pillars that transform how you show up professionally.
        </p>
      </div>

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
            Loading coaching services...
          </div>
        )}
      </div>
    </section>
  );
}
