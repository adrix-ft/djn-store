import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  X,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Lock,
  Loader2,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { verifyAdminCredentials } from '../lib/supabase';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (adminUser?: string) => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);

  // Reset form state on modal open
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setIsSubmitting(false);
      const savedUser = localStorage.getItem('djn_admin_saved_username');
      if (savedUser) {
        setUsername(savedUser);
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await verifyAdminCredentials(username, password);

      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('djn_admin_authenticated', 'true');
          localStorage.setItem('djn_admin_saved_username', username.trim());
        } else {
          sessionStorage.setItem('djn_admin_authenticated', 'true');
        }

        if (result.user) {
          localStorage.setItem('djn_admin_active_user', result.user);
        }

        setTimeout(() => {
          setIsSubmitting(false);
          onSuccess(result.user);
        }, 300);
      } else {
        setIsSubmitting(false);
        setErrorMessage(result.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'Connection error. Please try again.');
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close Admin Portal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Brand Section */}
          <div className="flex flex-col items-center text-center">
            {/* Center Logo Emblem with Soft Halo */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute -inset-2 rounded-2xl bg-blue-500/15 blur-lg" />
              <div className="relative w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center p-2.5">
                <img
                  src="/logo-icon.png"
                  alt="DJN Tech"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
            </div>

            <h2
              id="admin-modal-title"
              className="text-xl font-black tracking-tight text-slate-900 dark:text-white"
            >
              DJN Tech Command Center
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              Enter authorized administrator credentials to manage products, pricing, and customer orders.
            </p>

            {/* Security Guard Chip */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Enterprise Security Guard</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Username / Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. admin or store email"
                  autoComplete="username"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Security Password
                </label>
                {capsLockActive && (
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                    CAPS LOCK IS ON
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onKeyUp={(e) => {
                    setCapsLockActive(e.getModifierState && e.getModifierState('CapsLock'));
                  }}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Remember Workstation Option */}
            <div className="flex items-center text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Remember on this device</span>
              </label>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Store Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Open Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Notice */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
              Authorized store management only. Protected by enterprise cloud security protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminLoginModal = AdminPinModal;
