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

    // 3. Inject CSS to completely hide watermark/badge inside Shadow DOM and standard DOM
    const shadowCss = `
      a[href*="elfsight.com"],
      a[href*="free-widget"],
      a[href*="utm_campaign"],
      [title*="Remove Elfsight"],
      [aria-label*="Elfsight"],
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

      /* Hide watermark badge wrapper container */
      :has(> a[href*="elfsight.com"]),
      :has(> a[href*="free-widget"]),
      :has(> [title*="Remove Elfsight"]) {
        display: none !important;
        height: 0 !important;
        max-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }
    `;

    // Recursively collect all shadow roots anywhere inside a node tree
    const collectShadowRoots = (root: Node): ShadowRoot[] => {
      const roots: ShadowRoot[] = [];
      const traverse = (node: Node) => {
        if (!node) return;
        const el = node as Element;
        if (el.shadowRoot) {
          roots.push(el.shadowRoot);
          el.shadowRoot.childNodes.forEach(traverse);
        }
        node.childNodes.forEach(traverse);
      };
      traverse(root);
      return roots;
    };

    const applyCleanStyles = () => {
      // 1. Gather all roots (document + all shadow roots in container or document)
      const targetContainer = containerRef.current || document.body;
      const shadowRoots = collectShadowRoots(targetContainer);

      const allScopes: (Document | ShadowRoot)[] = [document, ...shadowRoots];

      allScopes.forEach((scope) => {
        // Inject style tag if not already present
        if (!scope.querySelector('#purge-elfsight-style')) {
          const style = document.createElement('style');
          style.id = 'purge-elfsight-style';
          style.textContent = shadowCss;
          if ('head' in scope && scope.head) {
            scope.head.appendChild(style);
          } else {
            scope.appendChild(style);
          }
        }

        // Direct styling on matched elements and their immediate wrapper
        scope.querySelectorAll(
          'a[href*="elfsight.com"], a[href*="free-widget"], a[href*="utm_campaign"], [title*="Remove Elfsight"], [aria-label*="Elfsight"]'
        ).forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.setProperty('display', 'none', 'important');
          htmlEl.style.setProperty('opacity', '0', 'important');
          htmlEl.style.setProperty('visibility', 'hidden', 'important');
          htmlEl.style.setProperty('height', '0', 'important');
          htmlEl.style.setProperty('max-height', '0', 'important');
          htmlEl.style.setProperty('width', '0', 'important');
          htmlEl.style.setProperty('pointer-events', 'none', 'important');
          htmlEl.style.setProperty('position', 'absolute', 'important');
          htmlEl.style.setProperty('left', '-9999px', 'important');

          // Also collapse parent wrapper if it solely holds the watermark
          if (htmlEl.parentElement && htmlEl.parentElement !== (scope as any)) {
            const parent = htmlEl.parentElement as HTMLElement;
            parent.style.setProperty('display', 'none', 'important');
            parent.style.setProperty('height', '0', 'important');
            parent.style.setProperty('max-height', '0', 'important');
            parent.style.setProperty('margin', '0', 'important');
            parent.style.setProperty('padding', '0', 'important');
            parent.style.setProperty('visibility', 'hidden', 'important');
            parent.style.setProperty('pointer-events', 'none', 'important');
          }
        });

        // Also check any badge elements by text content (e.g., "Free Google Reviews Widget")
        scope.querySelectorAll('a, div, span').forEach((el) => {
          const text = (el.textContent || '').trim();
          if (text.startsWith('Free ') && text.includes('Widget')) {
            const htmlEl = el as HTMLElement;
            htmlEl.style.setProperty('display', 'none', 'important');
            htmlEl.style.setProperty('opacity', '0', 'important');
            htmlEl.style.setProperty('visibility', 'hidden', 'important');
            htmlEl.style.setProperty('height', '0', 'important');
            htmlEl.style.setProperty('pointer-events', 'none', 'important');
            if (htmlEl.parentElement && htmlEl.parentElement !== (scope as any)) {
              htmlEl.parentElement.style.setProperty('display', 'none', 'important');
              htmlEl.parentElement.style.setProperty('height', '0', 'important');
              htmlEl.parentElement.style.setProperty('visibility', 'hidden', 'important');
            }
          }
        });
      });
    };

    applyCleanStyles();
    const interval = setInterval(applyCleanStyles, 250);

    // Watch for dynamic DOM changes inside container to immediately apply styles
    const observer = new MutationObserver(() => {
      applyCleanStyles();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Stop frequent polling after 12 seconds to save CPU cycles
    const timer = setTimeout(() => {
      clearInterval(interval);
      setInterval(applyCleanStyles, 2000);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
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
        <div className="elfsight-app-c242b803-88d2-488d-b013-8b66750f43f1 min-h-[260px]" />
      </div>
    </section>
  );
};
