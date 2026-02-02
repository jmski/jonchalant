import ScrollFade from "@/components/ScrollFade";
import CTASection from "@/components/CTASection";
import CollaborationForm from "@/components/CollaborationForm";
import { sanityClient } from "@/lib/sanityClient";
import { collaborationQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT } from "@/lib/pageContent";

export const metadata = {
  title: "Collaborations | Jon",
  description: "Brand partnerships, sponsored content, and collaboration opportunities"
};

const pageContent = PAGE_CONTENT.collaborations;

export default async function Collaborations() {
  let services: any[] = [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent mb-6 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {pageContent.headline}
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {pageContent.subheadline}
            </p>
          </ScrollFade>
        </div>

        {/* Services Grid */}
        <section className="mb-20">
          <ScrollFade>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-12 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Services & Collaboration Types
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <ScrollFade key={service._id} delay={idx * 100}>
                <div className="card-enhanced p-8">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent-bright)' }}>
                    {service.title}
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="text-lg font-semibold text-yellow-400">
                      {service.price}
                    </p>
                  )}
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="mb-20">
          <ScrollFade>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-8 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Get in Touch
            </h2>
            <p className="text-lg text-slate-300 mb-12 max-w-2xl">
              Ready to collaborate? Fill out the form below with your project details.
            </p>
          </ScrollFade>
          <div className="max-w-2xl mx-auto">
            <CollaborationForm />
          </div>
        </section>

        {/* Info */}
        <CTASection
          title="Ready to Collaborate?"
          description="Let's create something amazing together. Reach out using the form above or connect with me on social media."
          buttonText="Get Started"
          buttonLink="#contact-form"
        />
      </main>
    </div>
  );
}
