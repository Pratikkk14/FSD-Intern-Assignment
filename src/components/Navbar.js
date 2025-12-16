'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Runner Dashboard
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About Project
            </Link>
            <Link href="/visualization" className="text-foreground hover:text-primary transition-colors">
              Visualization
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact Me
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
