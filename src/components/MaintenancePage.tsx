import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Clock,
  ShieldCheck,
  Gamepad2,
  Disc,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
  ExternalLink,
  Bell,
  RefreshCw,
  Cpu,
  Truck,
  Sun,
  Moon,
  Eye,
  Sliders,
  Power,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import { SiteConfig } from '../types/store';
import { BrandLogo } from './BrandLogo';
import { Marquee } from './Marquee';
import { Footer } from './Footer';
import type { PolicyType } from './PolicyModal';
import { parseMaintenanceReturn } from '../lib/supabase';

interface MaintenancePageProps {
  siteConfig: SiteConfig;
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
  onEnterAdmin?: () => void;
  onBypassMaintenance?: () => void;
  onToggleMaintenance?: (enabled: boolean) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenPolicy?: (type: PolicyType) => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  siteConfig,
  onOpenAdmin,
  isAdminAuthenticated,
  onEnterAdmin,
  onBypassMaintenance,
  onToggleMaintenance,
  theme = 'light',
  onToggleTheme,
  onOpenPolicy = () => {},
}) => {
  // Parse target date and display text dynamically
  const parsedReturn = React.useMemo(() => {
    return parseMaintenanceReturn(siteConfig.maintenanceEstimatedReturn);
  }, [siteConfig.maintenanceEstimatedReturn]);

  // Live Ticking Countdown based on targetDate
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = parsedReturn.targetDate || new Date(Date.now() + 3.75 * 60 * 60 * 1000);
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: diff <= 0,
    };
  });

  useEffect(() => {
    const updateTimer = () => {
      const target = parsedReturn.targetDate;
      if (!target) return;
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: diff <= 0,
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [parsedReturn]);

  // Notification Subscription state
  const [notifyInput, setNotifyInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('djn_maintenance_subscribed') === 'true';
  });
  const [submittingNotify, setSubmittingNotify] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyInput.trim()) return;

    setSubmittingNotify(true);
    setTimeout(() => {
      setSubmittingNotify(false);
      setIsSubscribed(true);
      localStorage.setItem('djn_maintenance_subscribed', 'true');
      const existing = JSON.parse(localStorage.getItem('djn_maintenance_subscribers') || '[]');
      existing.push({
        contact: notifyInput.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('djn_maintenance_subscribers', JSON.stringify(existing));
    }, 500);
  };

  // WhatsApp formatted link
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber || '918446439374'}?text=${encodeURIComponent(
    'Hi DJN Tech, I noticed the store is currently under scheduled maintenance. I would like to inquire about ordering consoles, games, or booking a console repair.'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#0b0f17] text-[#212121] dark:text-gray-100 transition-colors duration-200 font-sans">
      
      {/* 1. ADMIN ACTIVE FLOATING BAR (Only shown when admin is authenticated) */}
      {isAdminAuthenticated && (
        <div className="sticky top-0 z-50 bg-[#1e293b] text-white border-b border-[#334155] px-4 py-2.5 text-xs shadow-md">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-bold text-white">Admin Session Active:</span>
              <span className="text-gray-300">
                Visitors currently see this official Maintenance Notice.
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {onBypassMaintenance && (
                <button
                  type="button"
                  onClick={onBypassMaintenance}
                  className="px-3 py-1.5 rounded-lg bg-[#334155] hover:bg-[#475569] text-white font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview Live Store</span>
                </button>
              )}
              {onEnterAdmin && (
                <button
                  type="button"
                  onClick={onEnterAdmin}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              )}
              {onToggleMaintenance && (
                <button
                  type="button"
                  onClick={() => onToggleMaintenance(false)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Turn OFF Maintenance</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. OFFICIAL TOP STORE HEADER */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0b0f17] border-b border-[#e5e7eb] dark:border-[#1e293b] shadow-xs w-full transition-colors duration-200">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <BrandLogo variant="horizontal" theme={theme} className="h-8 sm:h-10 w-auto" />
          </div>

          {/* Center Official Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Official Store Maintenance In Progress</span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick WhatsApp Support */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#1f883d] dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#1f883d] dark:fill-emerald-400 text-white" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>

            {/* Theme Toggle (Light / Dark) */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-700" />
                )}
              </button>
            )}

            {/* Staff Portal Login Button */}
            <button
              type="button"
              onClick={isAdminAuthenticated && onEnterAdmin ? onEnterAdmin : onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
              title="Store Staff Login"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{isAdminAuthenticated ? 'Admin Console' : 'Staff Login'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. INFINITE RUNNING MARQUEE ANNOUNCEMENT TICKER */}
      <Marquee announcementText="Scheduled Store Maintenance · WhatsApp Ordering & Inquiries Online · 7-Day Replacement Guarantee" />

      {/* 4. MAIN OFFICIAL MAINTENANCE NOTICE SECTION */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 flex flex-col items-center">
        
        {/* Official Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4">
          <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>SCHEDULED SYSTEM MAINTENANCE</span>
        </div>

        {/* Official Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] dark:text-white text-center max-w-3xl leading-tight">
          {siteConfig.maintenanceHeadline || 'Upgrading the Gaming Experience'}
        </h1>

        {/* Subtitle / Customer Notice */}
        <p className="text-[#64748b] dark:text-gray-400 text-sm sm:text-base max-w-2xl text-center mt-3.5 leading-relaxed">
          {siteConfig.maintenanceMessage ||
            'We are currently performing scheduled maintenance on our catalog servers, updating certified pre-owned stock, and optimizing checkout performance. The website will be fully restored shortly.'}
        </p>

        {/* 5. COUNTDOWN & SYSTEM RESTORATION PROGRESS CARD */}
        <div className="w-full max-w-2xl mt-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs">
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-gray-400 mb-4">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Estimated Store Relaunch</span>
            </div>

            {/* Solid Clean Timer Boxes */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-[#f4f5f8] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#223048] flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 mt-1.5 uppercase tracking-wider">
                  Hours
                </span>
              </div>

              <span className="text-2xl font-black text-[#9ca3af] dark:text-gray-600 pb-5">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-[#f4f5f8] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#223048] flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 mt-1.5 uppercase tracking-wider">
                  Minutes
                </span>
              </div>

              <span className="text-2xl font-black text-[#9ca3af] dark:text-gray-600 pb-5">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-[#f4f5f8] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#223048] flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 mt-1.5 uppercase tracking-wider">
                  Seconds
                </span>
              </div>
            </div>

            <div className="text-xs text-[#1a73e8] dark:text-blue-400 font-medium mt-3">
              {timeLeft.isExpired
                ? 'Finalizing System Updates · Opening Imminently'
                : (parsedReturn.displayText || 'Target Window: Today, 6:00 PM IST')}
            </div>
          </div>

          {/* Progress Bar & Sub-systems Status */}
          <div className="pt-6 border-t border-[#e5e7eb] dark:border-[#1e293b]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#374151] dark:text-gray-300 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>System Synchronization & Catalog Indexing</span>
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">88%</span>
            </div>

            {/* Solid Clean Blue Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#e5e7eb] dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: '88%' }}
              />
            </div>

            {/* Verification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 text-xs text-[#4b5563] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>Server Database & Speed Boosts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>256-Bit SSL Checkout Security</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />
                <span className="text-amber-700 dark:text-amber-400 font-medium">PS5 & Xbox Catalog Restock</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
                <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shrink-0" />
                <span>Final Smoke Testing</span>
              </div>
            </div>
          </div>

        </div>

        {/* 6. WHATSAPP & PHONE DIRECT ORDER DESK (BUSINESS CONTINUITY) */}
        <div className="w-full max-w-2xl mt-6 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs text-left">
          <div className="flex items-start gap-3.5 pb-4 border-b border-[#e5e7eb] dark:border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-emerald-600 dark:fill-emerald-400 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-[#111827] dark:text-white">
                  Need to Buy, Sell or Repair Right Now?
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Support Online
                </span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-gray-400 mt-0.5">
                Our WhatsApp desk is fully functional. We are actively taking direct orders and booking repairs.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* WhatsApp Solid Green Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5c] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat with Store on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${(siteConfig.phone || '+918446439374').replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111827] dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Call Store</span>
              </a>

              <a
                href={`mailto:${siteConfig.email || 'djntechofficial@gmail.com'}`}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111827] dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-[#6b7280] dark:text-gray-400 flex items-center justify-between">
            <span>⚡ Typical WhatsApp response: under 10 minutes</span>
            <span className="hidden sm:inline">Mumbai Store · Express Delivery Across India</span>
          </div>
        </div>

        {/* 7. "NOTIFY ME" SUBSCRIPTION FORM */}
        <div className="w-full max-w-lg mt-6 p-5 rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs text-center">
          <div className="text-xs font-semibold text-[#64748b] dark:text-gray-400 mb-2 flex items-center justify-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Be notified the moment our store goes live</span>
          </div>

          {isSubscribed ? (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>You're subscribed! We'll alert you the moment the store reopens.</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="text"
                required
                value={notifyInput}
                onChange={(e) => setNotifyInput(e.target.value)}
                placeholder="Enter Email or WhatsApp Number"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#f4f5f8] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#223048] text-xs sm:text-sm text-[#111827] dark:text-white placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={submittingNotify}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {submittingNotify ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* 8. FOUR OFFICIAL STORE TRUST PILLARS (Matching HomeTrustSections) */}
        <div className="w-full max-w-4xl mt-12">
          <div className="text-center mb-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748b] dark:text-gray-400">
              Why Customers Choose DJN Tech
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#111827] dark:text-white">Authentic Hardware</h4>
              <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-1 leading-normal">
                100% genuine PlayStation & Xbox consoles and wireless controllers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#111827] dark:text-white">7-Day Guarantee</h4>
              <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-1 leading-normal">
                Doorstep replacement warranty on all tested pre-owned game titles.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#111827] dark:text-white">Free Express Shipping</h4>
              <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-1 leading-normal">
                Free delivery on all orders above ₹1,000 across India.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
                <Headphones className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#111827] dark:text-white">Direct WhatsApp Care</h4>
              <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-1 leading-normal">
                Speak directly with gaming specialists for queries and recommendations.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 9. OFFICIAL STORE FOOTER (IDENTICAL TO REAL WEBSITE) */}
      <Footer
        onSelectCategory={() => {}}
        onOpenPolicy={onOpenPolicy}
        onOpenAdmin={onOpenAdmin}
        siteConfig={siteConfig}
      />

    </div>
  );
};
