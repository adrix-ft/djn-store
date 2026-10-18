import React, { useEffect, useRef } from 'react';

export const GoogleReviewsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure Elfsight platform script is dynamically initialized and watermark is removed
  useEffect(() => {
    const scriptSrc = 'https://elfsightcdn.com/platform.js';
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existing) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else {
      try {
        const win = window as any;
        if (win.elfsight && typeof win.elfsight.init === 'function') {
          win.elfsight.init();
        }
      } catch (err) {
        // ignore
      }
    }

    // Comprehensive function to remove / hide watermark from both standard DOM and Shadow DOM
    const purgeWatermark = () => {
      // 1. Regular DOM search
      document.querySelectorAll('a[href*="elfsight.com"], a[href*="utm_campaign=free-widget"]').forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
        (el as HTMLElement).style.setProperty('opacity', '0', 'important');
        (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
        try {
          el.remove();
        } catch {
          // ignore
        }
      });

      // 2. Piercing Shadow DOM (Elfsight renders widgets inside open shadow roots)
      const hosts = document.querySelectorAll('[class*="elfsight-app"]');
      hosts.forEach((host) => {
        if (host && host.shadowRoot) {
          const shadow = host.shadowRoot;

          // Inject persistent style tag into shadow root
          if (!shadow.querySelector('#purge-elfsight-badge')) {
            const style = document.createElement('style');
            style.id = 'purge-elfsight-badge';
            style.textContent = `
              a[href*="elfsight.com"],
              a[href*="utm_campaign=free-widget"],
              [class*="Badge"],
              [class*="badge"],
              [class*="Watermark"],
              [class*="watermark"],
              [class*="eapps-link"],
              [class*="OwnerPanel"],
              [class*="WidgetToolbar"],
              [class*="toolbar"] {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                pointer-events: none !important;
                position: absolute !important;
                left: -9999px !important;
              }
            `;
            shadow.appendChild(style);
          }

          // Directly remove any matched anchor or badge elements in shadow DOM
          shadow.querySelectorAll('a[href*="elfsight.com"], a[href*="utm_campaign=free-widget"], [class*="eapps-link"], [class*="badge"], [class*="Badge"]').forEach((el) => {
            (el as HTMLElement).style.setProperty('display', 'none', 'important');
            try {
              el.remove();
            } catch {
              // ignore
            }
          });
        }
      });
    };

    purgeWatermark();
    const interval = setInterval(purgeWatermark, 300);

    // MutationObserver to catch immediate element injection
    const observer = new MutationObserver(() => {
      purgeWatermark();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8">
      {/* Live Google Reviews Elfsight Widget */}
      <div
        ref={containerRef}
        className="w-full rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] p-2 sm:p-6 shadow-xs overflow-hidden"
      >
        <div
          className="elfsight-app-c242b803-88d2-488d-b013-8b66750f43f1 min-h-[220px]"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};
