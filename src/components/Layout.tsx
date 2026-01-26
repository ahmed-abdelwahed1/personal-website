import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-35">
            <div className="absolute -top-28 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-200 blur-3xl dark:from-indigo-900/40 dark:via-sky-900/40 dark:to-emerald-900/40" />
          </div>
          {children}
        </div>

        <footer className="mt-14 border-t border-slate-200/70 dark:border-slate-800/70 pt-6 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ahmed Abdelwahed</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;

