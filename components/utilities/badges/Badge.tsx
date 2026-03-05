interface BadgeProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function Badge({ 
  children, 
  size = 'md', 
  variant = 'accent',
  className = ''
}: BadgeProps) {
  return (
    <span className={`badge badge-${size} badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
