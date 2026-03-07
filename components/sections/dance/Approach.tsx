import { TextLink } from '@/components/typography';

export function Approach() {
  return (
    <section className="dance-approach-section">
      <h2 className="dance-approach-title">Why Movement Matters for Leadership</h2>
      <p className="dance-approach-description">
        Every piece in this portfolio demonstrates principles that directly transfer to executive presence. Your body communicates before your words do.
      </p>
      <p className="dance-approach-links">
        Learn more about how choreography principles translate to professional leadership in the{' '}
        <TextLink href="/lessons">
          leadership lessons
        </TextLink>
        {' '}or{' '}
        <TextLink href="/about">
          about my approach
        </TextLink>
        .
      </p>
    </section>
  );
}
