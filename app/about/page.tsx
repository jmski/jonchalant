import { CTASection } from "@/components/sections";
import { PageTransition } from "@/components/layout";
import { EnsoCircle } from "@/components/decorative";

export const metadata = {
  title: "About | The Kinetic Leader",
  description: "Jon Chalon teaches introverts how to gain Quiet Command through body-led leadership, social mechanics, and introvert mastery."
};

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PageTransition animation="blur">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="main-content">
          {/* HERO SECTION */}
          <section className="mb-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              From the Back of the Room to the Front of the Floor
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed">
              For most of my life, I believed that leadership was a loud man's game. As a natural introvert, I was the one who overthought every email, stayed quiet in meetings, and felt like my social battery was perpetually at 5%.
            </p>
          </section>

          {/* ORIGIN STORY - 60/40 LAYOUT */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Subtle Enso circle decorative element - represents Ikigai/Purpose */}
            <EnsoCircle
              size={300}
              opacity={0.05}
              strokeWidth={1}
              style={{
                position: 'absolute',
                top: '40px',
                right: '-80px',
                color: 'var(--accent-primary)',
                zIndex: 0,
              }}
            />
            
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Everything changed when I stopped thinking and started moving.
              </h2>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                I discovered that the same coordination, posture, and presence required on the dance floor were the exact 'mechanics' missing from my professional life. Dance taught me how to inhabit my body and take up space without saying a word.
              </p>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  The Three Phases
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Dance & Discipline</h4>
                    <p className="text-slate-700">
                      I discovered movement as a language for expression that bypassed all my introverted self-doubt. My body could say things my words couldn't.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Sales & Service</h4>
                    <p className="text-slate-700">
                      I took that physical grounding into the high-pressure world of the fitness industry and realized that introverts don't need to change their personalities—they just need a better script and a stronger physical foundation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">The Mission</h4>
                    <p className="text-slate-700">
                      Today, I've mastered the skills to lead despite my introversion. I created The Kinetic Leader to help other quiet experts use movement and social mechanics to command the room—all while protecting their energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column placeholder */}
            <div className="lg:col-span-5 bg-slate-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500">Editorial Image Placeholder</p>
            </div>
          </section>

          {/* KEY STATS */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Years Experience', value: '8+' },
              { label: 'Clients Coached', value: '50+' },
              { label: 'Transformations', value: '100%*' },
              { label: 'Introvert-Led', value: '✓' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="border-l border-slate-200 pl-6 py-4"
              >
                <div className="text-sm uppercase tracking-widest text-slate-600 font-medium mb-2">
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
              </div>
            ))}
          </section>
          <p className="text-xs text-slate-600 italic mb-24">*Of those who complete programs</p>

          {/* WHAT I TEACH */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                What I Coach
              </h2>
              <p className="text-lg text-slate-700">
                Three core pillars that transform how you show up professionally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Physical Grounding',
                  desc: 'How your body language shapes perception. Posture, movement, spatial awareness—the foundation of presence.'
                },
                {
                  title: 'Social Scripting',
                  desc: 'The hidden rules of professional interactions. Conversation frameworks, networking mechanics, relationship building.'
                },
                {
                  title: 'Energy Mastery',
                  desc: 'Your introvert energy is finite and powerful. Learn to activate it strategically while avoiding burnout.'
                },
                {
                  title: 'Executive Presence',
                  desc: 'For professionals seeking leadership roles. Combining all three pillars into a commanding, authentic presence.'
                },
                {
                  title: 'Interview & Pitch Coaching',
                  desc: 'High-stakes moments where your body and delivery matter most. Master them without losing authenticity.'
                },
                {
                  title: 'Team & Group Programs',
                  desc: 'For organizations building more confident, inclusive teams. Leadership development through the Kinetic lens.'
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-slate-900 mb-3 text-lg">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* MY PHILOSOPHY */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                How I Work
              </h2>
              <p className="text-lg text-slate-700">
                Three principles guide everything I do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'No Performance Required',
                  desc: 'You don\'t need to become someone else. I help you become fully, confidently yourself—and let that presence speak.'
                },
                {
                  title: 'Science + Intuition',
                  desc: 'Body language psychology meets personal intuition. We use both data and soul to build your authentic command.'
                },
                {
                  title: 'Sustainable Leadership',
                  desc: 'Your energy is precious. I teach you how to lead from strength, not from depletion or performance anxiety.'
                },
              ].map((philosophy, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 p-8 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {philosophy.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {philosophy.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* INTROVERT ADVANTAGE */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Your Introversion Is Your Superpower
              </h2>

              <p className="text-lg text-slate-700 leading-relaxed">
                You listen more than you speak. You think before you act. You draw energy from depth, not breadth. These aren't weaknesses—they're advantages waiting to be weaponized.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                The world needs more leaders who think before they act, who listen deeply, and who lead from authenticity. That's you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'Deep Listeners',
                'Thoughtful Decision Makers',
                'One-on-One Masters',
                'Authentic Leaders',
                'Written Communicators',
                'Resilient Problem Solvers',
              ].map((trait, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 p-4 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-sm font-medium text-slate-900">{trait}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <CTASection
              title="Ready to Discover Your Quiet Command?"
              description="This is more than coaching. It's a transformation that starts with understanding where you are now. Let's talk about your Presence Audit."
              buttonText="BOOK YOUR AUDIT"
              buttonLink="/programs"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
