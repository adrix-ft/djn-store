import React from 'react';
import { RotateCcw, Headphones, Truck, Star, ArrowRight } from 'lucide-react';
import { Marquee } from './Marquee';

interface HomeTrustSectionsProps {
  onShopNow: () => void;
}

export const HomeTrustSections: React.FC<HomeTrustSectionsProps> = ({ onShopNow }) => {
  return (
    <div className="space-y-6 sm:space-y-12 lg:space-y-16 w-full">
      
      {/* 1. Value Props Infinite Running Marquee */}
      <Marquee />

      {/* 3. Three Trust Pillars Row - Compact on Mobile */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6">
          
          <div className="p-3 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-row sm:flex-col items-center sm:text-center gap-3 sm:gap-0 sm:space-y-2 shadow-xs">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 sm:mb-1">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 sm:flex-none">
              <h3 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">Free Replacement</h3>
              <p className="text-[11px] sm:text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-tight sm:leading-relaxed mt-0.5 sm:mt-1">
                Comprehensive 7-day replacement warranty if any defect or issue occurs.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-row sm:flex-col items-center sm:text-center gap-3 sm:gap-0 sm:space-y-2 shadow-xs">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 sm:mb-1">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 sm:flex-none">
              <h3 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">Direct Support</h3>
              <p className="text-[11px] sm:text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-tight sm:leading-relaxed mt-0.5 sm:mt-1">
                Reach customer support directly via WhatsApp & phone assistance.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-row sm:flex-col items-center sm:text-center gap-3 sm:gap-0 sm:space-y-2 shadow-xs">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 sm:mb-1">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 sm:flex-none">
              <h3 className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">Free Express Shipping</h3>
              <p className="text-[11px] sm:text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-tight sm:leading-relaxed mt-0.5 sm:mt-1">
                Free insured delivery on orders above ₹1,000 across India.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Customer Feedback Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
            Verified Customer Reviews
          </h2>
          <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
            Real feedback from gamers across India who purchased from DJN Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          <div className="p-3.5 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#111827] dark:text-white">Kavya, Coimbatore</span>
                <span className="text-[#059669] dark:text-emerald-400">· Verified Buyer</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-gray-300 leading-relaxed">
                "Ordered PS5 DualSense and delivery was fast with bubble packaging. Everything authentic and sealed. Definitely recommend."
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#111827] dark:text-white">Ramesh, Trichy</span>
                <span className="text-[#059669] dark:text-emerald-400">· Verified Buyer</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-gray-300 leading-relaxed">
                "Got pre-owned God of War Ragnarok disc. Zero scratches, disc loaded immediately. DJN Tech customer support is very responsive on WhatsApp."
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#111827] dark:text-white">Murugan, Madurai</span>
                <span className="text-[#059669] dark:text-emerald-400">· Verified Buyer</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-gray-300 leading-relaxed">
                "Price was genuine compared to other stores. Excellent condition on the refurbished PS4 console with warranty card included."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
