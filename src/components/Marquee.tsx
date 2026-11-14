import React from 'react';
import { Truck, ShieldCheck, Disc, Star, Zap, Gamepad2, Award, Gift } from 'lucide-react';

interface MarqueeProps {
  announcementText?: string;
  onOpenGiveaway?: () => void;
}

export const Marquee: React.FC<MarqueeProps> = ({ announcementText, onOpenGiveaway }) => {
  const tickerItems = [
    {
      icon: Gift,
      text: '🎁 Win Free Games Delivered to Your Doorstep! Click for Official Giveaway',
      isGiveaway: true,
    },
    ...(announcementText
      ? [{ icon: Zap, text: announcementText, isGiveaway: false }]
      : []),
    { icon: Truck, text: 'Free Delivery on Orders Above ₹1,000', isGiveaway: false },
    { icon: ShieldCheck, text: '7-Day Doorstep Replacement Guarantee', isGiveaway: false },
    { icon: Disc, text: 'Tested & Verified Pre-Owned Game Discs', isGiveaway: false },
    { icon: Gamepad2, text: 'Brand New Sealed PS5 & Xbox Consoles', isGiveaway: false },
    { icon: Zap, text: 'Original DualSense Wireless Controllers', isGiveaway: false },
    { icon: Award, text: '1 Year Manufacturer Warranty on New Units', isGiveaway: false },
  ];

  return (
    <div className="w-full border-y border-[#e5e7eb] dark:border-[#1e293b] bg-[#f9fafb] dark:bg-[#0e1420] py-3 overflow-hidden select-none transition-colors duration-200">
      <div className="animate-marquee flex items-center">
        {/* First copy */}
        <div className="flex items-center gap-10 pr-10 shrink-0">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            if (item.isGiveaway && onOpenGiveaway) {
              return (
                <button
                  key={`t1-${idx}`}
                  onClick={onOpenGiveaway}
                  type="button"
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span className="underline underline-offset-4 decoration-amber-400 font-extrabold">{item.text}</span>
                  <span className="text-[#d1d5db] dark:text-gray-700 ml-6">·</span>
                </button>
              );
            }
            return (
              <div key={`t1-${idx}`} className="flex items-center gap-2 text-xs font-semibold text-[#4b5563] dark:text-gray-300 whitespace-nowrap">
                <Icon className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
                <span>{item.text}</span>
                <span className="text-[#d1d5db] dark:text-gray-700 ml-6">·</span>
              </div>
            );
          })}
        </div>

        {/* Duplicate copy for seamless infinite loop */}
        <div className="flex items-center gap-10 pr-10 shrink-0" aria-hidden="true">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            if (item.isGiveaway && onOpenGiveaway) {
              return (
                <button
                  key={`t2-${idx}`}
                  onClick={onOpenGiveaway}
                  type="button"
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span className="underline underline-offset-4 decoration-amber-400 font-extrabold">{item.text}</span>
                  <span className="text-[#d1d5db] dark:text-gray-700 ml-6">·</span>
                </button>
              );
            }
            return (
              <div key={`t2-${idx}`} className="flex items-center gap-2 text-xs font-semibold text-[#4b5563] dark:text-gray-300 whitespace-nowrap">
                <Icon className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
                <span>{item.text}</span>
                <span className="text-[#d1d5db] dark:text-gray-700 ml-6">·</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
