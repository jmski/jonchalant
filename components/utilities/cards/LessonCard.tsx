interface LessonCardProps {
  _id: string;
  title: string;
  description: string;
  pillar: string;
  icon: string;
  duration: string;
}

export function LessonCard({ _id, title, description, pillar, icon, duration }: LessonCardProps) {
  return (
    <div 
      key={_id}
      className="lesson-card"
    >
      <div className="lesson-card-icon">
        {icon}
      </div>
      <div className="lesson-card-content">
        <span className="lesson-card-pillar">
          {pillar}
        </span>
        <h3 className="lesson-card-title">
          {title}
        </h3>
        <p className="lesson-card-description">
          {description}
        </p>
        <div className="lesson-card-footer">
          <span className="lesson-card-duration">{duration}</span>
          <a href="#" className="lesson-card-cta">
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}
