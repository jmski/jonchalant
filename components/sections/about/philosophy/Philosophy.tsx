interface Philosophy {
  title: string;
  description: string;
}

interface PhilosophyProps {
  philosophies?: Philosophy[];
}

const emojis = ['🧠', '💫', '🎯'];

export function Philosophy({ philosophies = [] }: PhilosophyProps) {
  return (
    <section className="about-philosophy-section">
      <div className="about-philosophy-header">
        <p className="about-philosophy-eyebrow">My Methodology</p>
        <h2 className="about-philosophy-title">
          This Is How I Actually Work
        </h2>
        <p className="about-philosophy-subtitle">
          No scripts. No performance tricks. Just three principles I come back to in every session — because they're the ones that stick.
        </p>
      </div>

      <div className="about-philosophy-grid">
        {philosophies.length > 0 ? (
          philosophies.map((philosophy, idx) => (
            <div key={idx} className="about-philosophy-card">
              <div className="about-philosophy-emoji">
                {emojis[idx] || ''}
              </div>
              <h3 className="about-philosophy-card-title">
                {philosophy.title}
              </h3>
              <p className="about-philosophy-card-description">
                {philosophy.description}
              </p>
            </div>
          ))
        ) : (
          <div className="loading-state">
            Loading methodology...
          </div>
        )}
      </div>
    </section>
  );
}
