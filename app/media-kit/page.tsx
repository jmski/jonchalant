import ScrollFade from "@/components/ScrollFade";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Media Kit | Jon",
  description: "Audience statistics, engagement metrics, and media information"
};

interface Stat {
  label: string;
  value: string;
  change: string;
}

interface Platform {
  name: string;
  handle: string;
  followers: string;
  avgViews: string;
  category: string;
}

interface ContentCategory {
  name: string;
  percentage: number;
  description: string;
}

interface AudienceDemographic {
  age: Array<{ range: string; percentage: number }>;
  gender: Array<{ label: string; percentage: number }>;
  locations: Array<{ country: string; percentage: number }>;
}

interface MediaKitPageData {
  headline: string;
  subheadline: string;
  keyMetrics: Stat[];
  platforms: Platform[];
  contentCategories: ContentCategory[];
  audience: AudienceDemographic;
}

export default async function MediaKit() {
  const fallbackData: MediaKitPageData = {
      headline: 'Media Kit',
      subheadline: 'Audience statistics and engagement metrics',
      keyMetrics: [
        { label: 'Total Followers', value: '150K+', change: '+15% YoY' },
        { label: 'Avg Monthly Views', value: '2.5M', change: '+22% YoY' },
        { label: 'Engagement Rate', value: '4.8%', change: '+0.5% YoY' },
        { label: 'Active Subscribers', value: '85K', change: '+18% YoY' }
      ],
      platforms: [
        { name: 'TikTok', handle: '@jonhandle', followers: '120K', avgViews: '2.1M', category: 'Dance Content' },
        { name: 'Instagram', handle: '@jonhandle', followers: '45K', avgViews: '8K', category: 'Photography & Reels' },
        { name: 'YouTube', handle: '@jonhandle', followers: '32K', avgViews: '125K', category: 'Long-form & Tutorials' }
      ],
      contentCategories: [
        { name: 'Dance Choreography', percentage: 45, description: 'Original choreography and dance covers' },
        { name: 'Tutorials', percentage: 25, description: 'Dance tutorials and how-to content' },
        { name: 'Lifestyle', percentage: 20, description: 'Behind-the-scenes and daily life' },
        { name: 'Collaborations', percentage: 10, description: 'Collaborations with other creators' }
      ],
      audience: {
        age: [
          { range: '13-17', percentage: 15 },
          { range: '18-24', percentage: 45 },
          { range: '25-34', percentage: 25 },
          { range: '35+', percentage: 15 }
        ],
        gender: [
          { label: 'Female', percentage: 68 },
          { label: 'Male', percentage: 28 },
          { label: 'Other', percentage: 4 }
        ],
        locations: [
          { country: 'United States', percentage: 42 },
          { country: 'Canada', percentage: 12 },
          { country: 'United Kingdom', percentage: 10 },
          { country: 'Australia', percentage: 8 },
          { country: 'Other', percentage: 28 }
        ]
      }
    };
  
  return (
    <div className="min-h-screen page-wrapper">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-heading-text mb-6 font-display">
              {fallbackData.headline}
            </h1>
            <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {fallbackData.subheadline}
            </p>
          </ScrollFade>
        </div>

        {/* Key Stats */}
        <section className="mb-20">
          <ScrollFade>
            <h2 style={{ color: 'var(--text-heading)' }} className="text-4xl font-bold mb-8 font-display">
              Key Metrics
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackData.keyMetrics.map((stat, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div
                  className="p-8 border rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p style={{ color: 'var(--text-heading)' }} className="text-4xl font-bold mb-2">
                    {stat.value}
                  </p>
                  <p style={{ color: 'var(--color-success)' }} className="text-sm">
                    {stat.change}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Platform Breakdown */}
        <section className="mb-20">
          <ScrollFade>
            <h2 style={{ color: 'var(--text-heading)' }} className="text-4xl font-bold mb-8 font-display">
              Platform Presence
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fallbackData.platforms.map((platform, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div
                  className="p-8 border rounded-lg"
                  style={{
                    borderColor: 'var(--border)',
                  }}
                >
                  <h3 style={{ color: 'var(--text-heading)' }} className="text-2xl font-bold mb-2">
                    {platform.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-4">
                    {platform.handle}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p style={{ color: 'var(--text-muted)' }} className="text-xs font-medium uppercase tracking-wide">
                        Followers
                      </p>
                      <p style={{ color: 'var(--text-heading)' }} className="text-lg font-bold">
                        {platform.followers}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-muted)' }} className="text-xs font-medium uppercase tracking-wide">
                        Avg Views
                      </p>
                      <p style={{ color: 'var(--text-heading)' }} className="text-lg font-bold">
                        {platform.avgViews}
                      </p>
                    </div>
                    <div className="pt-3" style={{ borderTopColor: 'var(--border)' }}>
                      <p style={{ color: 'var(--text-accent-bright)' }} className="text-sm font-medium">
                        {platform.category}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Content Mix */}
        <section className="mb-20">
          <ScrollFade>
            <h2 style={{ color: 'var(--text-heading)' }} className="text-4xl font-bold mb-8 font-display">
              Content Distribution
            </h2>
          </ScrollFade>
          <div className="space-y-6">
            {fallbackData.contentCategories.map((category, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 style={{ color: 'var(--text-heading)' }} className="text-lg font-semibold">
                      {category.name}
                    </h3>
                    <span style={{ color: 'var(--text-accent-bright)' }} className="text-lg font-bold">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${category.percentage}%`,
                        background: 'var(--cta-gradient)',
                      }}
                    />
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm mt-2">
                    {category.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Audience Demographics */}
        <section className="mb-20">
          <ScrollFade>
            <h2 style={{ color: 'var(--text-heading)' }} className="text-4xl font-bold mb-8 font-display">
              Audience Demographics
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Age */}
            <ScrollFade delay={0}>
              <div className="p-8 border rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 style={{ color: 'var(--text-heading)' }} className="text-xl font-bold mb-6">
                  Age Distribution
                </h3>
                <div className="space-y-4">
                  {fallbackData.audience.age.map((age, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">
                          {age.range}
                        </span>
                        <span style={{ color: 'var(--text-heading)' }} className="text-sm font-semibold">
                          {age.percentage}%
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--bg-muted)' }}>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${age.percentage}%`,
                            background: 'var(--cta-gradient)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>

            {/* Gender */}
            <ScrollFade delay={100}>
              <div className="p-8 border rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 style={{ color: 'var(--text-heading)' }} className="text-xl font-bold mb-6">
                  Gender
                </h3>
                <div className="space-y-4">
                  {fallbackData.audience.gender.map((gender, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">
                          {gender.label}
                        </span>
                        <span style={{ color: 'var(--text-heading)' }} className="text-sm font-semibold">
                          {gender.percentage}%
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--bg-muted)' }}>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${gender.percentage}%`,
                            background: 'var(--cta-gradient)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>

            {/* Locations */}
            <ScrollFade delay={200}>
              <div className="p-8 border rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 style={{ color: 'var(--text-heading)' }} className="text-xl font-bold mb-6">
                  Top Locations
                </h3>
                <div className="space-y-3">
                  {fallbackData.audience.locations.map((location, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">
                        {location.country}
                      </span>
                      <span style={{ color: 'var(--text-heading)' }} className="text-sm font-semibold">
                        {location.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* Download Section */}
        <CTASection
          title="Download Full Media Kit"
          description="Get a PDF version with complete statistics and collaboration packages."
          buttonText="Download PDF"
          buttonLink="#"
        />
      </main>
    </div>
  );
}
