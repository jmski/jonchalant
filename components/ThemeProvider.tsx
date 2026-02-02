'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/useTheme';
import Navbar from './Navbar';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();

  // Initialize theme on mount to prevent hydration mismatch
  useEffect(() => {
    const storedTheme = localStorage.getItem('jonchalon-theme') || 'default';
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  // Prevent rendering until theme is initialized to avoid flash
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
