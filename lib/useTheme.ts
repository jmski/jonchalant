'use client';

import { useEffect, useState, useCallback } from 'react';

export type Theme = 'default' | 'executive' | 'midnight';

const THEME_STORAGE_KEY = 'jonchalon-theme';
const DEFAULT_THEME: Theme = 'default';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = storedTheme || DEFAULT_THEME;
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  // Change theme
  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  return {
    theme,
    changeTheme,
    mounted,
  };
}
