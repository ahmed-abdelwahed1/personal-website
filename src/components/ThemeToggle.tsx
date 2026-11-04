"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  // Hydration safety: only render theme control after mount
  // to avoid theme mismatch between server and client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="top-controls" role="region" aria-label="Site controls">
      <Link
        href={isArabic ? "/" : "/ar/"}
        className="lang-toggle"
        lang={isArabic ? "en" : "ar"}
        dir={isArabic ? "ltr" : "rtl"}
        aria-label={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
        title={isArabic ? "Switch to English" : "عرض الموقع باللغة العربية"}
      >
        {isArabic ? "EN" : "ع"}
      </Link>

      {!mounted ? (
        <div className="theme-toggle-placeholder" />
      ) : (
        <motion.button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="theme-toggle"
          aria-label="Toggle Theme"
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="theme-toggle-icon-wrapper"
            >
              {isDark ? (
                <FaMoon className="icon-moon-new" />
              ) : (
                <FaSun className="icon-sun-new" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  );
}
