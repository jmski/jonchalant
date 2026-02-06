'use client';

import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-bottom' | 'scale' | 'blur' | 'stagger';
}

export default function PageTransition({
  children,
  animation = 'fade'
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) return '';
    
    switch (animation) {
      case 'slide-left':
        return 'page-enter-slide-left';
      case 'slide-right':
        return 'page-enter-slide-right';
      case 'slide-bottom':
        return 'page-enter-slide-bottom';
      case 'scale':
        return 'page-enter-scale';
      case 'blur':
        return 'page-enter-blur';
      case 'stagger':
        return 'page-enter-stagger';
      case 'fade':
      default:
        return 'page-enter';
    }
  };

  return (
    <div className={getAnimationClass()}>
      {children}
    </div>
  );
}
