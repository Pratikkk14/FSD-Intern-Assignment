'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Pratik Pujari
            </p>
            <a
              href="mailto:pratik.pujari@vit.edu.in"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              pratik.pujari@vit.edu.in
            </a>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} CSV Runner Dashboard.
          </p>
        </div>
      </div>
    </footer>
  );
}
