import { LessonCard } from '@/components/utilities/cards';

interface LessonCategorySectionProps {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: any[];
}

export function LessonCategorySection({ level, lessons }: LessonCategorySectionProps) {
  const getHeading = () => {
    switch (level) {
      case 'Beginner':
        return '🎯 Beginner: Build Your Foundation';
      case 'Intermediate':
        return '🚀 Intermediate: Deepen Your Command';
      case 'Advanced':
        return '👑 Advanced: Master Your Impact';
    }
  };

  const getDescription = () => {
    switch (level) {
      case 'Beginner':
        return "Learn what presence actually is—and isn't. These fundamentals cover body awareness, vocal clarity, and the psychology of how people perceive authority. Master these first.";
      case 'Intermediate':
        return 'Apply the fundamentals in complex situations. Learn to read rooms, navigate power dynamics, manage your energy in high-stakes moments, and lead without being loud.';
      case 'Advanced':
        return 'Command rooms, shape culture, and amplify your influence across teams and organizations. Executive presence that scales and sustains.';
    }
  };

  return (
    <section className="lesson-category-section">
      <div className="lesson-category-header">
        <h2 className="lesson-category-heading">
          {getHeading()}
        </h2>
        <p className="lesson-category-description">
          {getDescription()}
        </p>
      </div>

      <div className="lesson-category-grid">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            _id={lesson._id}
            title={lesson.title}
            description={lesson.description}
            pillar={lesson.pillar}
            icon={lesson.icon}
            duration={lesson.duration}
          />
        ))}
      </div>
    </section>
  );
}
