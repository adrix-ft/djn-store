import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthUser } from '../types/store';
import { signInWithGoogleOAuth } from '../lib/supabase';
import { GoogleLogoIcon } from './GoogleLogoIcon';

export { GoogleLogoIcon };

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Sign In with Google',
  subtitle = 'Login to track your orders in real-time, view invoice history, and manage deliveries.',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setErrorMsg(null);
      setIsLoading(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await signInWithGoogleOAuth();
      if (res.success && res.url) {
        window.location.href = res.url;
        return;
      }

      if (res.error) {
        console.warn('[Auth] Google OAuth error:', res.error);
        setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Connection to Google Auth provider unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Customer Portal
            </span>
          </div>

          <h2 className="text-xl font-black tracking-tight">{title}</h2>
          <p className="text-xs text-blue-100 mt-1 leading-relaxed">{subtitle}</p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Primary Action: Official Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-[#1a2333] border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99] disabled:opacity-50"
          >
            <GoogleLogoIcon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {isLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </span>
          </button>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center p-2 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Live Tracking</p>
              <p className="text-[9px] text-gray-400">Blue Dart & AWB</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800">
              <ShieldCheck className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">7-Day Warranty</p>
              <p className="text-[9px] text-gray-400">Doorstep return</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800">
              <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Fast Checkout</p>
              <p className="text-[9px] text-gray-400">Autofilled details</p>
            </div>
          </div>

          {/* Terms & Privacy Note */}
          <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 pt-1 leading-relaxed">
            By signing in, you agree to DJN Tech Store's Terms of Service and Privacy Policy. Your details are securely encrypted.
          </p>

        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
