import { FAQSection } from "@/components/sections";
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Collaborations & Services | Speaking, Workshops & Coaching | Jonchalant",
  description: "Work with Jon on leadership workshops, corporate training, speaking engagements, and collaboration opportunities. Executive presence coaching designed for organizations.",
  keywords: "corporate speaking, leadership workshops, collaboration opportunities, executive coaching services, professional development training, brand partnerships",
  openGraph: {
    title: "Collaborations & Services | Jonchalant",
    description: "Partner with Jon for speaking engagements, corporate workshops, and professional development training.",
    type: "website",
    url: "https://jonchalant.com/collaborations",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-collaborations-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Collaborations & Services",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collaborations & Services | Jonchalant",
    description: "Partner with Jon for speaking, workshops, and professional development.",
    images: ["https://jonchalant.com/social/og-collaborations-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default function Collaborations() {
  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="fade">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <div className="py-16 md:py-24">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Let's Work Together
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mb-8">
                I partner with organizations to build stronger leaders through workshops, speaking engagements, and custom coaching programs. Whether you need executive presence training, team development, or a keynote speaker, let's create something meaningful.
              </p>
              <a
                href="#inquiry"
                className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Start a Conversation
              </a>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* SERVICES */}
        <SectionWrapper>
          <SectionContent>
            <div className="py-16 md:py-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Services & Offerings</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Corporate Workshops */}
                <div className="p-8 border-l-4 border-accent-primary rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Corporate Workshops</h3>
                  <p className="text-slate-700 mb-6">
                    Half-day or full-day interactive workshops for teams. Covers the 5 pillars of executive presence with hands-on practice, group feedback, and take-home resources.
                  </p>
                  <ul className="space-y-2 text-slate-700 mb-6">
                    <li>✓ 2-4 hour format (flexible)</li>
                    <li>✓ Up to 50 participants</li>
                    <li>✓ Custom focus by industry</li>
                    <li>✓ Pre/post assessments available</li>
                  </ul>
                  <p className="font-semibold text-slate-900">$2,500 - $7,500+</p>
                </div>

                {/* Speaking Engagements */}
                <div className="p-8 border-l-4 border-accent-primary rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Speaking Engagements</h3>
                  <p className="text-slate-700 mb-6">
                    Keynote presentations on quiet leadership, executive presence, and the power of authentic communication. Designed for conferences, retreats, and organizational events.
                  </p>
                  <ul className="space-y-2 text-slate-700 mb-6">
                    <li>✓ 45-60 minute keynotes</li>
                    <li>✓ Q&A sessions included</li>
                    <li>✓ Customizable topics</li>
                    <li>✓ Virtual or in-person</li>
                  </ul>
                  <p className="font-semibold text-slate-900">$1,500 - $5,000+</p>
                </div>

                {/* Executive Coaching */}
                <div className="p-8 border-l-4 border-accent-primary rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Executive Coaching</h3>
                  <p className="text-slate-700 mb-6">
                    One-on-one or small group coaching for individual leaders. Build confidence, presence, and influence through personalized guidance and practice.
                  </p>
                  <ul className="space-y-2 text-slate-700 mb-6">
                    <li>✓ 8-12 week programs</li>
                    <li>✓ 1-hour weekly sessions</li>
                    <li>✓ Remote via Zoom</li>
                    <li>✓ Results tracking & metrics</li>
                  </ul>
                  <p className="font-semibold text-slate-900">$1,997 - $4,997</p>
                </div>

                {/* Custom Programs */}
                <div className="p-8 border-l-4 border-accent-primary rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Custom Programs</h3>
                  <p className="text-slate-700 mb-6">
                    Tailored programs designed for your organization's specific goals. From executive retreats to leadership development cohorts.
                  </p>
                  <ul className="space-y-2 text-slate-700 mb-6">
                    <li>✓ Assessment & discovery phase</li>
                    <li>✓ Custom curriculum design</li>
                    <li>✓ Flexible delivery options</li>
                    <li>✓ Team engagement focus</li>
                  </ul>
                  <p className="font-semibold text-slate-900">Custom pricing</p>
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* FAQ SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <div className="py-16 md:py-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Frequently Asked Questions
              </h2>
              <FAQSection />
            </div>
          </SectionContent>
        </SectionWrapper>

        {/* INQUIRY FORM */}
        <SectionWrapper id="inquiry">
          <SectionContent>
            <div className="py-16 md:py-24">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Start a Conversation</h2>
                <p className="text-slate-700 mb-8">
                  Let's discuss your needs and explore how we can work together. Fill out the form below and I'll be in touch within 24 hours.
                </p>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-slate-900 mb-2">
                      Organization/Company
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-900 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="workshop">Corporate Workshop</option>
                      <option value="speaking">Speaking Engagement</option>
                      <option value="coaching">Executive Coaching</option>
                      <option value="custom">Custom Program</option>
                      <option value="other">Other/Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                      Tell Me About Your Needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                      placeholder="What are you looking to accomplish?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
