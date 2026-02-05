'use client';

import { useCallback, useState, useEffect } from 'react';

type Theme = 'default' | 'dark' | 'earthy';

const THEMES: Array<{ id: Theme; color: string; label: string }> = [
  { id: 'default', color: '#FCFCFA', label: 'Paper' },
  { id: 'dark', color: '#0A0A0A', label: 'Blueprint' },
  { id: 'earthy', color: '#E2DED0', label: 'Parchment' },
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('jonchalon-theme') as Theme | null;
    const initialTheme = stored || 'default';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jonchalon-theme', newTheme);
  }, []);

  if (!mounted) return null;

  return (
    <div className="theme-selector">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => changeTheme(t.id)}
          className={`theme-square ${theme === t.id ? 'active' : ''}`}
          style={{
            backgroundColor: t.color,
            borderColor: theme === t.id ? 'var(--accent-vibrant)' : 'var(--border-color)',
          }}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        />
      ))}
    </div>
  );
}
