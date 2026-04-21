import { Bento, BentoCell } from '@/components/shared/bento';
import { KineticHeading } from '@/components/typography/KineticHeading';
import type { CurriculumWeek } from '@/lib/types';

interface CurriculumBentoProps {
  headline?: string;
  weeks: CurriculumWeek[];
}

export function CurriculumBento({ headline, weeks }: CurriculumBentoProps) {
  if (!weeks || weeks.length === 0) return null;

  return (
    <section className="curriculum-bento">
      {headline && (
        <div className="curriculum-bento-heading">
          <KineticHeading
            as="h2"
            anchorWords={['weeks', 'foundation', 'presence', 'movement']}
          >
            {headline}
          </KineticHeading>
        </div>
      )}
      <Bento columns={4} gap="md">
        {weeks.map((week) => (
          <BentoCell
            key={week._id}
            size={week.bentoSize ?? 'sm'}
            className="curriculum-bento-cell"
          >
            {week.illustrationSlug && (
              <div className="curriculum-bento-illustration" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <object
                  type="image/svg+xml"
                  data={`/illustrations/${week.illustrationSlug}.svg`}
                  className="curriculum-bento-svg"
                  aria-hidden="true"
                />
              </div>
            )}
            <div className="curriculum-bento-body">
              <span className="curriculum-week-number">
                {String(week.weekNumber).padStart(2, '0')}
              </span>
              <h3 className="curriculum-week-title">{week.title}</h3>
              {week.oneLineDescription && (
                <p className="curriculum-week-desc">{week.oneLineDescription}</p>
              )}
            </div>
          </BentoCell>
        ))}
      </Bento>
    </section>
  );
}
