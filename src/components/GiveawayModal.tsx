import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Gift,
  Truck,
  Disc,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  Flame,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export interface GiveawayModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl?: string;
}

export const GiveawayModal: React.FC<GiveawayModalProps> = ({
  isOpen,
  onClose,
  formUrl = 'https://forms.gle/RtfL5twVXAQ8EYLE6',
}) => {
  // Lock body scroll and handle keyboard Esc
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="giveaway-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 animate-in zoom-in-95 duration-200 text-[#212121] dark:text-gray-100">
        
        {/* Top Header Banner Ribbon */}
        <div className="relative bg-gradient-to-br from-[#1a73e8] via-[#145fc3] to-[#0f448c] dark:from-[#13233c] dark:via-[#0e1b2f] dark:to-[#091220] p-5 sm:p-7 text-white overflow-hidden border-b border-blue-400/20 dark:border-gray-800">
          
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Brand + Tag + Close Button */}
          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-amber-300 border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                Special Event
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-blue-100 uppercase tracking-wider">
                100% Free
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer shrink-0"
              aria-label="Close giveaway modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Headline & Subtitle */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>DJN Tech Official Giveaway Program</span>
            </div>
            
            <h2
              id="giveaway-modal-title"
              className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight"
            >
              Win Free Game Delivered To Your Address! 🎁
            </h2>

            <p className="text-xs sm:text-[13px] text-blue-100 dark:text-gray-300 leading-relaxed max-w-md">
              We are hosting an exclusive giveaway for gaming enthusiasts! Enter today for a chance to win verified console games delivered directly to your doorstep at <strong className="text-amber-300 underline underline-offset-2">zero cost</strong>.
            </p>
          </div>

          {/* Console Badges */}
          <div className="relative z-10 flex items-center gap-2 pt-3">
            <span className="px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-xs text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
              <Gamepad2 className="w-3 h-3 text-cyan-300" /> PS5 & PS4
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-xs text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
              <Gamepad2 className="w-3 h-3 text-emerald-300" /> Xbox Series & One
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/10 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> All India
            </span>
          </div>

        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5">
          
          {/* 4 Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Truck className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-gray-900 dark:text-white">Free Doorstep Delivery</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Zero delivery or packing charges. Delivered directly to your address.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Disc className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-gray-900 dark:text-white">Top Console Discs</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Original, tested game discs for your PlayStation or Xbox console.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-gray-900 dark:text-white">1-Minute Entry Form</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Simply fill your Name, Contact, Address & YouTube ID.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-gray-900 dark:text-white">100% Free Entry</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  No purchase or checkout required. Open to all gaming fans.
                </p>
              </div>
            </div>

          </div>

          {/* Primary Action Button */}
          <div className="space-y-2 pt-1">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Keep modal open or let user close when done
              }}
              className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#1a73e8] via-blue-600 to-[#145fc3] hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 dark:shadow-blue-900/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Gift className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Enter Giveaway (Google Form)</span>
              <ExternalLink className="w-4 h-4 ml-0.5 opacity-90 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Maybe Later · Browse Store
            </button>
          </div>

          {/* Trust Guarantee Note */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Official DJN Tech Community Program</span>
            </div>
            <span>Limited Time</span>
          </div>

        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

