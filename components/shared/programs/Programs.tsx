import { ScrollFade, ScrollStagger } from "@/components/animations";
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureList } from '@/components/ui/FeatureList';

interface Program {
  _id: string;
  title: string;
  category: string;
  description: string;
  investment: string;
  features: string[];
}

interface ProgramsProps {
  programs: Program[];
}

export default function Programs({ programs }: ProgramsProps) {
  return (
    <section className="program-cards-section">
      <ScrollFade>
        <SectionHeader
          title="All Programs"
          description="A program for every stage of your journey. From free assessment to intensive 1-on-1 coaching."
          className="program-cards-header"
        />
      </ScrollFade>

      <ScrollStagger variant="slideInUp" staggerDelay={100}>
        <div className="program-cards-grid">
          {programs.map((program, idx) => (
            <ScrollFade key={program._id} delay={idx * 100}>
              <div className="program-card card">
                {/* Category badge */}
                <p className="program-card-category text-badge">
                  {program.category}
                </p>

                {/* Title */}
                <h3 className="program-card-title">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="program-card-description">
                  {program.description}
                </p>

                {/* Features */}
                <FeatureList items={program.features} icon="check" limit={3} className="program-card-features" />

                {/* Investment */}
                <div className="program-card-investment">
                  <p className="program-card-investment-label text-badge">
                    Investment
                  </p>
                  <p className="program-card-investment-amount">
                    {program.investment}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href={program._id === 'program-6' ? '#audit-cta' : '#inquiry-form'}
                  className="program-card-cta btn btn-primary"
                >
                  Learn More
                </a>
              </div>
            </ScrollFade>
          ))}
        </div>
      </ScrollStagger>
    </section>
  );
}
