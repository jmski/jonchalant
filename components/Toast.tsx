'use client';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    info: 'var(--accent-primary)',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div
      className="fixed bottom-6 right-6 max-w-sm rounded-lg p-4 shadow-lg transition-all duration-300 animate-slideInUp"
      style={{
        background: bgColors[type],
        color: 'var(--btn-primary-text)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{icons[type]}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
