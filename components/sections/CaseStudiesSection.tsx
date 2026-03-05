import Link from 'next/link';
import { getCaseStudies } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  clientName: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonial?: string;
  image?: any;
  featured?: boolean;
  order?: number;
}

export async function CaseStudiesSection() {
  let caseStudies: CaseStudy[] = [];

  try {
    caseStudies = await getCaseStudies(true); // Fetch featured case studies only
  } catch (error) {
    console.error('Error fetching case studies:', error);
  }

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span
            className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded mb-4"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              letterSpacing: '0.15em'
            }}
          >
            Success Stories
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Case Studies & Past Collaborations
          </h2>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            See how we've helped brands elevate their presence and create compelling content that resonates.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy._id}
              href={`/case-studies/${caseStudy.slug.current}`}
            >
              <article className="group h-full flex flex-col border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                {/* Image Section */}
                {caseStudy.image && (
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-200">
                    <img
                      src={urlFor(caseStudy.image).width(600).height(400).url()}
                      alt={caseStudy.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Client & Industry */}
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--accent-primary)' }}>
                      {caseStudy.industry || 'Collaboration'}
                    </p>
                    <h3
                      className="text-xl sm:text-2xl font-bold mt-2 group-hover:text-accent transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }} >
                      Client: <span className="font-semibold">{caseStudy.clientName}</span>
                    </p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="mb-6 space-y-4 flex-1">
                    {caseStudy.challenge && (
                      <div>
                        <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Challenge
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {caseStudy.challenge}
                        </p>
                      </div>
                    )}

                    {caseStudy.solution && (
                      <div>
                        <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Solution
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {caseStudy.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Results */}
                  {caseStudy.results && caseStudy.results.length > 0 && (
                    <div className="mb-6 p-4 rounded bg-slate-50 border-l-4" style={{ borderColor: 'var(--accent-primary)' }}>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--accent-primary)' }}>
                        Key Results
                      </p>
                      <ul className="space-y-2">
                        {caseStudy.results.slice(0, 2).map((result, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span style={{ color: 'var(--accent-primary)' }} className="font-bold">✓</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Full Case Study
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
