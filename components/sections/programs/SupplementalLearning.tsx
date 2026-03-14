import { TextLink } from "@/components/typography";

export function SupplementalLearning() {
  return (
    <section>
      <div className="text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Learn at Your Own Pace
        </h3>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Before committing to a program, explore foundational lessons on quiet command, executive presence, and body-aware leadership.
        </p>
        <TextLink 
          href="/lessons" 
          className="programs-cta-button"
        >
          Explore Leadership Lessons <span className="programs-cta-arrow">→</span>
        </TextLink>
      </div>
    </section>
  );
}
