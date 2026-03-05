import { getCaseStudies } from '@/lib/sanity';
import { CaseStudyCard } from '@/components/utilities/cards';

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

export async function CaseStudy() {
  let caseStudies: CaseStudy[] = [];

  try {
    caseStudies = await getCaseStudies(true);
  } catch (error) {
    console.error('Error fetching case studies:', error);
  }

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="case-study-section">
      <div className="case-study-section-container">
        {/* Section Header */}
        <div className="case-study-section-header">
          <span className="case-study-section-badge">
            Success Stories
          </span>
          <h2 className="case-study-section-title">
            Case Studies & Past Collaborations
          </h2>
          <p className="case-study-section-description">
            See how we've helped brands elevate their presence and create compelling content that resonates.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="case-study-section-grid">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy._id}
              title={caseStudy.title}
              clientName={caseStudy.clientName}
              industry={caseStudy.industry}
              challenge={caseStudy.challenge}
              solution={caseStudy.solution}
              results={caseStudy.results}
              image={caseStudy.image}
              slug={caseStudy.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
