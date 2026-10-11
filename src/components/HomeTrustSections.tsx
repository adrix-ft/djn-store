import React from 'react';
import { RotateCcw, Headphones, Truck, Star, ArrowRight } from 'lucide-react';
import { Marquee } from './Marquee';

interface HomeTrustSectionsProps {
  onShopNow: () => void;
}

export const HomeTrustSections: React.FC<HomeTrustSectionsProps> = ({ onShopNow }) => {
  return (
    <div className="space-y-16 w-full">
      
      {/* 1. Value Props Infinite Running Marquee */}
      <Marquee />

      {/* 3. Three Trust Pillars Row */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] text-center flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] dark:bg-[#161f30] text-[#111827] dark:text-white flex items-center justify-center mb-1">
              <RotateCcw className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white">Free Replacement</h3>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-relaxed">
              Comprehensive 7-day replacement warranty if any defect or issue occurs on pre-owned products.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] text-center flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] dark:bg-[#161f30] text-[#111827] dark:text-white flex items-center justify-center mb-1">
              <Headphones className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white">Direct Support</h3>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-relaxed">
              Reach our customer support directly via WhatsApp & phone assistance for quick queries and updates.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] text-center flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] dark:bg-[#161f30] text-[#111827] dark:text-white flex items-center justify-center mb-1">
              <Truck className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] dark:text-white">Free Express Shipping</h3>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 max-w-sm leading-relaxed">
              Free insured delivery on orders above ₹1,000 across all serviceable pin codes in India.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Customer Feedback Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
            Verified Customer Reviews
          </h2>
          <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
            Real feedback from gamers across India who purchased from DJN Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
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

          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
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

          <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
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
