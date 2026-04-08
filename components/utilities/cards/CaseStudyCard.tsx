import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/lib/types';
import { FeatureList } from '@/components/ui/FeatureList';

interface CaseStudyCardProps {
  title: string;
  clientName: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  image?: SanityImage;
  slug: { current: string };
}

export function CaseStudyCard({
  title,
  clientName,
  industry,
  challenge,
  solution,
  results,
  image,
  slug,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug.current}`}>
      <article className="case-study-card">
        {/* Image Section */}
        {image && (
          <div className="case-study-card-image">
            <img
              src={urlFor(image).width(600).height(400).url()}
              alt={clientName}
              className="case-study-card-image-element"
            />
            <div className="case-study-card-image-overlay" />
          </div>
        )}

        {/* Content Section */}
        <div className="case-study-card-content">
          {/* Client & Industry */}
          <div className="case-study-card-header">
            {industry && (
              <p className="case-study-card-industry">
                {industry}
              </p>
            )}
            <h3 className="case-study-card-title">
              {title}
            </h3>
            <p className="case-study-card-client">
              Client: <span>{clientName}</span>
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="case-study-card-details">
            {challenge && (
              <div className="case-study-card-section">
                <p className="case-study-card-section-label">
                  Challenge
                </p>
                <p className="case-study-card-section-text">
                  {challenge}
                </p>
              </div>
            )}

            {solution && (
              <div className="case-study-card-section">
                <p className="case-study-card-section-label">
                  Solution
                </p>
                <p className="case-study-card-section-text">
                  {solution}
                </p>
              </div>
            )}
          </div>

          {/* Results */}
          {results && results.length > 0 && (
            <div className="case-study-card-results">
              <p className="case-study-card-results-label">
                Key Results
              </p>
              <FeatureList items={results} icon="check" limit={2} className="case-study-card-results-list" />
            </div>
          )}

          {/* CTA */}
          <div className="case-study-card-cta">
            <span className="case-study-card-cta-text">
              Read Full Case Study
              <span className="case-study-card-cta-arrow">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
