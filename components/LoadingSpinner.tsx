'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'w-4 h-4 border',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }[size];

  const spinner = (
    <div
      className={`rounded-full animate-spin ${sizeClass} ${className}`}
      style={{
        borderColor: 'var(--border-subtle)',
        borderTopColor: 'var(--accent-primary)',
      }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--overlay-dark)', zIndex: 50 }}>
        {spinner}
      </div>
    );
  }

  return spinner;
}
