interface PageTransitionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-bottom' | 'scale' | 'blur' | 'stagger';
  className?: string;
}

const ANIMATION_CLASS = {
  'slide-left': 'page-enter-slide-left',
  'slide-right': 'page-enter-slide-right',
  'slide-bottom': 'page-enter-slide-bottom',
  scale: 'page-enter-scale',
  blur: 'page-enter-blur',
  stagger: 'page-enter-stagger',
  fade: 'page-enter',
} as const;

export default function PageTransition({
  children,
  animation = 'fade',
  className = ''
}: PageTransitionProps) {
  return (
    <div className={`${ANIMATION_CLASS[animation]} ${className}`}>
      {children}
    </div>
  );
}
