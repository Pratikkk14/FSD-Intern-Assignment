'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Wait for mount
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 w-9 h-9" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}

export default ThemeToggle;
