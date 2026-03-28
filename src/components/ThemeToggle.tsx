"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="theme-toggle-placeholder" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle"
      aria-label="Toggle Theme"
    >
      <div className="theme-toggle-slider" data-dark={isDark}>
        <div className="theme-toggle-knob">
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ y: -20, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: isDark ? 360 : 0 }}
              exit={{ y: 20, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            >
              {isDark ? <FaMoon className="icon-moon" /> : <FaSun className="icon-sun" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </button>
  );
}
