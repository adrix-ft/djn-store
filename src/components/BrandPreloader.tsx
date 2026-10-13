import React, { useState, useEffect } from 'react';

interface BrandPreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number; // Minimum time to stay visible to buffer background loading
}

export const BrandPreloader: React.FC<BrandPreloaderProps> = ({
  onComplete,
  minDurationMs = 1400,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing gaming inventory...');
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock body scroll while splash is active
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const intervalTime = 25; // update every 25ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawRatio = Math.min(1, elapsed / minDurationMs);

      // Easing curve (fast start, steady middle, snap to 100 at end)
      const eased = Math.round(
        rawRatio < 0.6 
          ? rawRatio * 1.3 * 100 
          : 78 + (rawRatio - 0.6) * 55
      );

      const nextProgress = Math.min(100, Math.max(progress, eased));
      setProgress(nextProgress);

      // Cycle thematic status messages
      if (nextProgress < 30) {
        setStatusText('Checking certified PlayStation & Xbox consoles...');
      } else if (nextProgress < 65) {
        setStatusText('Loading 100% laser-tested optical disc library...');
      } else if (nextProgress < 95) {
        setStatusText('Connecting to live store inventory & deals...');
      } else {
        setStatusText('Ready! Welcome to DJN Tech Store.');
      }

      if (rawRatio >= 1 && nextProgress >= 100) {
        clearInterval(timer);
        // Brief pause at 100% before smooth fade out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsMounted(false);
            document.body.style.overflow = '';
            onComplete?.();
          }, 500); // 500ms fade-out animation
        }, 180);
      }
    }, intervalTime);

    // Fallback safety timeout (max 3 seconds)
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setIsExiting(true);
      setTimeout(() => {
        setIsMounted(false);
        document.body.style.overflow = '';
        onComplete?.();
      }, 500);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, [minDurationMs, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-between p-6 sm:p-10 select-none bg-white text-slate-900 transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-[1.01] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading DJN Tech Online Store"
      role="status"
    >
      {/* Background Soft Blue & Indigo Ambient Glow (Light Theme) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[480px] h-96 sm:h-[480px] bg-blue-100/60 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-50/70 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Spacer / Subtle Official Pill */}
      <div className="pt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-blue-600 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
        <span>Official Gaming Hardware & Discs</span>
      </div>

      {/* Center Hero: Brand Emblem + Progress Bar */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full -mt-4">
        
        {/* Animated Brand Logo with Ambient Glow and Floating Motion */}
        <div className="relative mb-4 flex items-center justify-center">
          {/* Breathing Ambient Backlight Glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-400/20 to-indigo-500/20 blur-2xl animate-logo-glow pointer-events-none" />
          
          {/* Levitating Logo Container with Sheen Sweep */}
          <div className="relative w-56 sm:w-64 h-36 sm:h-44 flex items-center justify-center animate-logo-float">
            <img
              src="/logo.png"
              alt="DJN Tech Console Store"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(23,37,84,0.12)]"
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo-icon.png';
              }}
            />
            {/* Glossy Sheen Sweep Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-logo-sweep" />
            </div>
          </div>
        </div>

        {/* Dynamic Precision Progress Bar (Light Theme) */}
        <div className="w-64 sm:w-80 mt-1">
          
          {/* Bar Track */}
          <div className="relative h-2.5 sm:h-3 w-full bg-slate-100/90 rounded-full overflow-hidden border border-slate-200 p-[2px] shadow-inner">
            {/* Animated Fill Gradient */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 transition-all duration-150 ease-out shadow-[0_2px_10px_rgba(37,99,235,0.35)] relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Sliding Light Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>

          {/* Progress Percent & Live Status Row */}
          <div className="flex items-center justify-between text-xs mt-3 text-slate-500">
            <span className="text-[11px] font-medium text-slate-600 truncate max-w-[210px]">
              {statusText}
            </span>
            <span className="font-bold font-mono text-blue-600 tabular-nums">
              {progress}%
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Footer Trust Row */}
      <div className="pb-4 text-center">
        <p className="text-[10px] sm:text-[11px] text-slate-500 tracking-wide font-medium">
          PS5 · PS4 · Xbox Consoles · Tested Pre-Owned Games · Cash on Delivery
        </p>
      </div>

    </div>
  );
};

