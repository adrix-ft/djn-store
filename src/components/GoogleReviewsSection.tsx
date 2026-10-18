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

    // 3. Inject CSS to completely hide watermark/badge inside Shadow DOM without deleting nodes
    // Deleting nodes (el.remove) crashes the Elfsight Lit/React reconciliation lifecycle!
    const shadowCss = `
      a[href*="elfsight.com"],
      a[href*="free-widget"],
      a[href*="utm_campaign"],
      [class*="Badge"],
      [class*="badge"],
      [class*="Watermark"],
      [class*="watermark"],
      [class*="eapps-link"],
      [class*="OwnerPanel"],
      [class*="owner-panel"],
      [class*="WidgetToolbar"],
      [class*="toolbar"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        height: 0 !important;
        max-height: 0 !important;
        width: 0 !important;
        max-width: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        overflow: hidden !important;
      }
    `;

    const applyCleanStyles = () => {
      // Hide in standard DOM (CSS display/visibility only, no DOM node deletion)
      document.querySelectorAll('a[href*="elfsight.com"], a[href*="utm_campaign=free-widget"]').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('display', 'none', 'important');
        htmlEl.style.setProperty('opacity', '0', 'important');
        htmlEl.style.setProperty('visibility', 'hidden', 'important');
        htmlEl.style.setProperty('pointer-events', 'none', 'important');
      });

      // Piercing Shadow DOM
      const hosts = document.querySelectorAll('[class*="elfsight-app"]');
      hosts.forEach((host) => {
        if (host && host.shadowRoot) {
          const shadow = host.shadowRoot;
          if (!shadow.querySelector('#purge-elfsight-style')) {
            const style = document.createElement('style');
            style.id = 'purge-elfsight-style';
            style.textContent = shadowCss;
            shadow.appendChild(style);
          }

          shadow.querySelectorAll('a[href*="elfsight.com"], a[href*="utm_campaign=free-widget"], [class*="eapps-link"], [class*="badge"], [class*="Badge"]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.setProperty('display', 'none', 'important');
            htmlEl.style.setProperty('opacity', '0', 'important');
            htmlEl.style.setProperty('visibility', 'hidden', 'important');
            htmlEl.style.setProperty('pointer-events', 'none', 'important');
          });
        }
      });
    };

    applyCleanStyles();
    const interval = setInterval(applyCleanStyles, 400);

    // Stop frequent polling after 12 seconds to save CPU cycles
    const timer = setTimeout(() => {
      clearInterval(interval);
      setInterval(applyCleanStyles, 2500);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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
