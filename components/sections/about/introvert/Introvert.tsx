import { TextLink } from "@/components/typography";
import { SectionHeader } from '@/components/ui/SectionHeader';

interface IntrovertProps {
  traits?: string[];
}

export function Introvert({ traits = [] }: IntrovertProps) {
  return (
    <section className="about-introvert-section">
      <div className="about-introvert-content">
        <SectionHeader
          eyebrow="What I Believe"
          title="Introversion Isn't a Problem to Solve"
        />

        <p className="about-introvert-paragraph">
          You listen more than you speak. You think before you act. You draw energy from depth, not breadth. The world keeps telling you to fix that. I disagree.
        </p>

        <p className="about-introvert-paragraph">
          Every trait that makes you feel "too quiet" or "not enough" in the room is actually signal — of a leader who thinks clearly, builds trust slowly but deeply, and doesn't perform authority. That's rare. That's valuable. That's what we work with.
        </p>

        <p className="about-introvert-cta-text">
          See how these principles show up in movement in my{' '}
          <TextLink href="/dance">
            choreography portfolio
          </TextLink>
          .
        </p>
      </div>

      <div className="about-traits-grid">
        {traits.length > 0 ? (
          traits.map((trait, idx) => (
            <div key={idx} className="about-trait-card">
              <p className="about-trait-text">{trait}</p>
            </div>
          ))
        ) : (
          <div className="loading-state">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
}
