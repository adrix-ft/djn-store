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
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-between p-6 sm:p-10 select-none bg-[#090d16] text-white transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading DJN Tech Online Store"
      role="status"
    >
      {/* Background Soft Blue & Cyan Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Spacer / Subtle Official Pill */}
      <div className="pt-4 flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-blue-400/80">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
        <span>Official Gaming Hardware & Discs</span>
      </div>

      {/* Center Hero: Brand Emblem + Title + Progress Bar */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full -mt-6">
        
        {/* Glowing Brand Icon Logo */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Subtle Outer Rotating Halo */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-cyan-400/20 to-indigo-600/30 blur-md animate-pulse" />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0f172a] border border-blue-500/30 shadow-2xl flex items-center justify-center p-3 overflow-hidden">
            <img
              src="/logo-icon.png"
              alt="DJN Tech"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(59,130,246,0.5)]"
              loading="eager"
              decoding="async"
              onError={(e) => {
                // If logo-icon fails, fallback to logo
                (e.currentTarget as HTMLImageElement).src = '/favicon.png';
              }}
            />
          </div>
        </div>

        {/* Brand Typography */}
        <h1 className="text-xl sm:text-2xl font-black tracking-[0.2em] uppercase text-white leading-tight">
          DJN TECH
        </h1>
        <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-gray-400 font-medium mt-1">
          Online Gaming Store
        </p>

        {/* Dynamic Precision Progress Bar */}
        <div className="w-64 sm:w-76 mt-8">
          
          {/* Bar Track */}
          <div className="relative h-2 sm:h-2.5 w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/60 p-[2px] shadow-inner">
            {/* Animated Fill Gradient */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)] relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Sliding Light Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>

          {/* Progress Percent & Live Status Row */}
          <div className="flex items-center justify-between text-xs font-mono mt-2.5 text-gray-400">
            <span className="text-[11px] text-gray-300 font-sans truncate max-w-[200px]">
              {statusText}
            </span>
            <span className="font-bold text-blue-400 tabular-nums">
              {progress}%
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Footer Trust Row */}
      <div className="pb-4 text-center">
        <p className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide font-medium">
          PS5 · PS4 · Xbox Consoles · Tested Pre-Owned Games · Cash on Delivery
        </p>
      </div>

    </div>
  );
};
