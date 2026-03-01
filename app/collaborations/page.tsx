import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import dynamic from 'next/dynamic';

const CollaborationForm = dynamic(() => import('@/components/forms').then(mod => ({ default: mod.CollaborationForm })), {
  loading: () => <div className="py-12 px-8 text-center">Loading form...</div>,
  ssr: true
});

export const metadata = {
  title: "Collaborations | The Kinetic Leader",
  description: "Brand partnerships, teaching collaborations, and professional opportunities"
};

// Mock collaboration examples
const MOCK_COLLABORATIONS = [
  {
    _id: 'collab-1',
    title: 'Leadership Coaching for Teams',
    category: 'Organization',
    description: 'Transform your leadership culture through the Kinetic Leader methodology. Custom workshops for executive teams seeking confident, inclusive leadership.',
    price: 'Custom Quote'
  },
  {
    _id: 'collab-2',
    title: 'Corporate Workshops',
    category: 'Employee Development',
    description: 'Build team confidence and communication skills through integrated physical and social presence training.',
    price: '$2,000-$5,000 per session'
  },
  {
    _id: 'collab-3',
    title: 'Executive Coaching',
    category: ' Speaking',
    description: 'Guest keynote speaker on introvert leadership, quiet command, and presence development for professional conferences.',
    price: 'Custom Quote'
  },
  {
    _id: 'collab-4',
    title: 'Podcast/Media Appearances',
    category: 'Media',
    description: 'Guest appearances discussing leadership for introverts, professional presence, and transformational coaching.',
    price: 'Negotiable'
  }
];

const SERVICE_CATEGORIES = [
  {
    name: 'Leadership Coaching',
    items: [
      'Executive presence development',
      'Team coaching programs',
      'Organizational culture shifts',
      'Customized to your needs',
      'Measured outcomes & ROI'
    ]
  },
  {
    name: 'Speaking & Teaching',
    items: [
      'Keynote presentations',
      'Workshop facilitation',
      'Corporate training programs',
      'University guest lectures',
      'Conference presentations'
    ]
  },
  {
    name: 'Content & Media',
    items: [
      'Podcast guest appearances',
      'Interview features',
      'Article/blog contributions',
      'Video content collaboration',
      'Educational course content'
    ]
  },
  {
    name: 'Custom Partnerships',
    items: [
      'Brand collaborations',
      'Course development',
      'Product partnerships',
      'Affiliate opportunities',
      'Strategic alliances'
    ]
  }
];

export default function Collaborations() {
  const services = MOCK_COLLABORATIONS;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PageTransition animation="fade">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO SECTION */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600 dark:text-slate-400">Strategic Partnerships</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                Let's Work Together
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm open to collaborations that align with The Kinetic Leader mission: helping introverts discover their quiet command, build authentic presence, and lead with confidence.
              </p>

              <p className="text-base text-slate-600 dark:text-slate-400">
                Whether you're building a training program, hosting a speaking event, or creating educational content, let's explore what's possible.
              </p>
            </div>

            {/* Right column visual placeholder */}
            <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Collaboration Partner Showcase</p>
            </div>
          </section>

          {/* SERVICE CATEGORIES */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Ways We Can Collaborate
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                From coaching your teams to speaking at your events, here are the types of partnerships I'm exploring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICE_CATEGORIES.map((category, idx) => (
                <div key={idx} className="border-t-2 border-slate-200 dark:border-slate-700 pt-8">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    {category.name}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-slate-900 dark:text-white font-semibold mt-1 shrink-0">✓</span>
                        <span className="text-slate-700 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT COLLABORATIONS */}
          <section className="mb-24 py-16 border-t border-slate-200 dark:border-slate-700">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Partnership Examples
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Types of collaborations I'm actively pursuing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((collab) => (
                <div
                  key={collab._id}
                  className="border border-slate-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {collab.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest font-medium text-slate-600 dark:text-slate-400 mb-4">
                    {collab.category}
                  </p>
                  <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
                    {collab.description}
                  </p>
                  {collab.price && (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {collab.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* COLLABORATION FORM */}
          <section id="collaboration-form" className="mb-24 py-16 border-t border-slate-200 dark:border-slate-700">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Send Your Inquiry
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
                Have a partnership idea? I respond to all inquiries within 48 hours. Let's explore what's possible together.
              </p>
            </div>
            <div className="max-w-3xl">
              <CollaborationForm />
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Make Quiet Command  Part of Your Organization"
              description="Build more confident, authentic leaders through coaching that transforms how your team shows up."
              buttonText="Start Your Inquiry"
              buttonLink="#collaboration-form"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
