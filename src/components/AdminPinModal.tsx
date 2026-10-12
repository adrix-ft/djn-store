import React, { useState } from 'react';
import { Lock, ShieldCheck, X, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default PIN: 8446
    if (pin.trim() === '8446') {
      if (rememberMe) {
        localStorage.setItem('djn_admin_authenticated', 'true');
      }
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(false);
      if (nextPin === '8446') {
        if (rememberMe) {
          localStorage.setItem('djn_admin_authenticated', 'true');
        }
        setTimeout(() => {
          setPin('');
          onSuccess();
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Admin Portal</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter 4-digit security PIN to edit store catalog & website content
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
            <KeyRound className="w-3 h-3" />
            <span>Default PIN: 8446</span>
          </div>
        </div>

        {/* PIN Dots Indicator */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    isFilled
                      ? 'bg-blue-600 border-blue-600 scale-110 shadow-xs'
                      : 'border-gray-300 dark:border-gray-600 bg-transparent'
                  } ${error ? 'border-red-500 bg-red-100 dark:bg-red-950/40' : ''}`}
                />
              );
            })}
          </div>

          {/* Text input fallback for keyboard typing */}
          <div className="relative mb-4">
            <input
              type={showPin ? 'text' : 'password'}
              maxLength={4}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 4) {
                  setPin(val);
                  setError(false);
                }
              }}
              placeholder="Or type PIN here"
              className={`w-full text-center tracking-widest text-base font-bold py-2 px-3 rounded-xl border bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                error
                  ? 'border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-center text-xs text-red-500 font-semibold mb-3 animate-pulse">
              Incorrect PIN. Please use default: 8446
            </p>
          )}

          {/* Virtual Keypad for quick mobile/mouse entry */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (item === 'C') {
                    setPin('');
                    setError(false);
                  } else if (item === '⌫') {
                    handleDelete();
                  } else {
                    handleKeypadPress(item);
                  }
                }}
                className="py-2.5 rounded-xl font-bold text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 active:scale-95 transition-all shadow-2xs"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember login on this browser</span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
