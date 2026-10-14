import React from 'react';
import { Truck, ShieldCheck, Disc, Star, Zap, Gamepad2, Award } from 'lucide-react';

interface MarqueeProps {
  announcementText?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ announcementText }) => {
  const tickerItems = [
    ...(announcementText
      ? [{ icon: Zap, text: announcementText }]
      : []),
    { icon: Truck, text: 'Free Delivery on Orders Above ₹1,000' },
    { icon: ShieldCheck, text: '7-Day Doorstep Replacement Guarantee' },
    { icon: Disc, text: 'Tested & Verified Pre-Owned Game Discs' },
    { icon: Gamepad2, text: 'Brand New Sealed PS5 & Xbox Consoles' },
    { icon: Zap, text: 'Original DualSense Wireless Controllers' },
    { icon: Award, text: '1 Year Manufacturer Warranty on New Units' },
  ];

  return (
    <div className="w-full border-y border-[#e5e7eb] dark:border-[#1e293b] bg-[#f9fafb] dark:bg-[#0e1420] py-3 overflow-hidden select-none transition-colors duration-200">
      <div className="animate-marquee flex items-center">
        {/* First copy */}
        <div className="flex items-center gap-10 pr-10 shrink-0">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
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
