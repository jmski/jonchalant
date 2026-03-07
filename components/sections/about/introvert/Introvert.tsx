import { TextLink } from "@/components/typography";

interface IntrovertProps {
  traits?: string[];
}

export function Introvert({ traits = [] }: IntrovertProps) {
  return (
    <section className="about-introvert-section">
      <div className="about-introvert-content">
        <h2 className="about-introvert-title">
          Why Your Introversion Is Your Superpower
        </h2>

        <p className="about-introvert-paragraph">
          You listen more than you speak. You think before you act. You draw energy from depth, not breadth. These aren't weaknesses—they're advantages waiting to be weaponized.
        </p>

        <p className="about-introvert-paragraph">
          The world needs more leaders who think before they act, who listen deeply, and who lead from authenticity. That's you.
        </p>

        <p className="about-introvert-cta-text">
          See how these principles translate to movement and presence in my{' '}
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
            Loading introvert traits...
          </div>
        )}
      </div>
    </section>
  );
}
