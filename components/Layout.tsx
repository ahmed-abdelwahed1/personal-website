import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Terminal, Database, FileText, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const navItems = [
    { path: '/', label: 'PIPELINE', icon: Database },
    { path: '/blog', label: 'LOGS', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-mono">
      {/* Sidebar / Header */}
      <aside className="w-full md:w-64 border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white bg-white dark:bg-black flex-shrink-0 relative z-20">
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="mb-8 border-4 border-black dark:border-white p-2 shadow-brutal dark:shadow-brutal-dark">
              <h1 className="text-2xl font-bold leading-none">AHMED<br/>ABDELWAHED</h1>
              <p className="mt-2 text-sm opacity-70">DATA_ENGINEER.EXE</p>
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 border-2 border-black dark:border-white transition-all 
                    ${location.pathname === item.path 
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-brutal dark:shadow-brutal-dark' 
                      : 'hover:translate-x-1 hover:shadow-brutal dark:hover:shadow-brutal-dark'
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-bold tracking-wider">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 md:mt-0">
            <button
              onClick={toggleTheme}
              className="w-full p-3 border-2 border-black dark:border-white flex items-center justify-center space-x-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{darkMode ? 'LGT_MODE' : 'DRK_MODE'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="p-4 md:p-8 lg:p-12 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;