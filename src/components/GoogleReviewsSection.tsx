import React, { useEffect, useRef } from 'react';

export const GoogleReviewsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WIDGET_ID = 'c242b803-88d2-488d-b013-8b66750f43f1';
    const scriptSrc = 'https://elfsightcdn.com/platform.js';

    // 1. Ensure platform script is loaded
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }

    // 2. If platform is already in memory, signal it to require the widget
    const win = window as any;
    if (win.eapps?.platform?.requireWidget) {
      try {
        win.eapps.platform.requireWidget(WIDGET_ID);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8">
      {/* Live Google Reviews Elfsight Widget */}
      <div
        ref={containerRef}
        className="w-full rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] p-2 sm:p-6 shadow-xs overflow-hidden"
      >
        <div className="elfsight-app-c242b803-88d2-488d-b013-8b66750f43f1 min-h-[260px]" />
      </div>
    </section>
  );
};
