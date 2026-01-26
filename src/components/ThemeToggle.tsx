import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or OS preference
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDarkMode(true);
      setReady(true);
      return;
    }
    if (stored === 'light') {
      setDarkMode(false);
      setReady(true);
      return;
    }
    setDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, ready]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((v) => !v)}
      className={[
        'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100',
        'dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-50 dark:hover:bg-slate-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950',
        className ?? '',
      ].join(' ')}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
    </button>
  );
};

