'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'malleable-theme';

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Uses the visitor's saved choice, otherwise their system preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', theme === 'light' ? '#f6f8fb' : '#060e1a'));
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    // Follow system changes until the visitor picks a theme explicitly.
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      try { if (localStorage.getItem(THEME_STORAGE_KEY)) return; } catch { /* ignore */ }
      const next: Theme = event.matches ? 'light' : 'dark';
      applyTheme(next); setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? document.documentElement.dataset.theme) === 'light' ? 'dark' : 'light';
    applyTheme(next);
    setTheme(next);
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* storage may be blocked */ }
  };

  const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  return <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={label} title={label}>
    <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
    <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>
  </button>;
}
