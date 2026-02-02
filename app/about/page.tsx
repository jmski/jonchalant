import ScrollFade from "@/components/ScrollFade";
import CTASection from "@/components/CTASection";
import { sanityClient } from "@/lib/sanityClient";
import { aboutQuery } from "@/lib/sanityQueries";

export const metadata = {
  title: "About | Jon",
  description: "Dancer, content creator, and otaku. Connecting movement, creativity, and community."
};

interface AboutData {
  headline: string;
  tagline: string;
  bio: Array<{ heading: string; content: string }>;
  philosophy: Array<{ principle: string; description: string }>;
  expertise: Array<{ category: string; skills: string[] }>;
}

export default async function About() {
  let aboutData: AboutData | null = null;

  try {
    aboutData = await sanityClient.fetch(aboutQuery);
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!aboutData) {
    return <div>Unable to load about page data</div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent mb-6 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {aboutData.headline}
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {aboutData.tagline}
            </p>
          </ScrollFade>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          {aboutData.bio.map((section, idx) => (
            <ScrollFade key={idx}>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-8 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {section.heading}
              </h2>
              <div className="space-y-6 mb-12">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.content}
                </p>
              </div>
            </ScrollFade>
          ))}
        </section>

        {/* Skills & Expertise */}
        <section className="mb-20">
          <ScrollFade>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-8 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              What I Do
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.expertise.map((section, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div className="card-enhanced p-8">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-accent-bright)' }}>
                    {section.category}
                  </h3>
                  <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
                    {section.skills.map((skill, i) => (
                      <li key={i}>✓ {skill}</li>
                    ))}
                  </ul>
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-20 card-enhanced p-12">
          <ScrollFade>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent mb-6 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              My Philosophy
            </h2>
            <div className="space-y-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
              {aboutData.philosophy.map((item, idx) => (
                <p key={idx}>
                  <strong style={{ color: 'var(--text-accent-bright)' }}>{item.principle}:</strong> {item.description}
                </p>
              ))}
            </div>
          </ScrollFade>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Let's Create Something Together"
          description="Whether it's a dance collaboration, hobby content, or brand partnership, I'd love to hear your ideas."
          buttonText="Explore Collaborations"
          buttonLink="/collaborations"
        />
      </main>
    </div>
  );
}
