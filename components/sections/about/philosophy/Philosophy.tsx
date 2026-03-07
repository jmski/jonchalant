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
        <h2 className="about-philosophy-title">
          How I Coach: Three Non-Negotiables
        </h2>
        <p className="about-philosophy-subtitle">
          This framework is the backbone of every coaching conversation. It's what makes the transformation real.
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
            Loading philosophy content...
          </div>
        )}
      </div>
    </section>
  );
}
