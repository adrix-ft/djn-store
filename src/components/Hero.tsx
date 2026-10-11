import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Product } from '../types/store';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreGames: () => void;
  onExploreConsoles: () => void;
  featuredProduct: Product;
  onSelectProduct: (product: Product) => void;
}

const HERO_ITEMS = [
  {
    id: 'console',
    label: 'Consoles',
    title: 'PlayStation 5 Slim (Disc Edition)',
    price: '₹49,990',
    mrp: '₹54,990',
    image: '/ps5-hero.jpg',
    productId: 'ps5-slim-disc'
  },
  {
    id: 'controller',
    label: 'Controllers',
    title: 'DualSense Wireless Controller',
    price: '₹4,990',
    mrp: '₹6,390',
    image: '/dualsense-hero.jpg',
    productId: 'dualsense-midnight-black'
  },
  {
    id: 'games',
    label: 'Pre-Owned Discs',
    title: 'Elden Ring: Shadow of the Erdtree',
    price: '₹2,999',
    mrp: '₹4,999',
    image: '/games-hero.jpg',
    productId: 'gow-ragnarok-ps5'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onExploreGames,
  onExploreConsoles,
  featuredProduct,
  onSelectProduct
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-switch between featured products
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = HERO_ITEMS[activeIndex];

  const handleProductClick = () => {
    const matched =
      PRODUCTS.find((p) => p.id === currentItem.productId) || featuredProduct;
    if (matched) {
      onSelectProduct(matched);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-[#0b0f17] border-b border-[#f0f2f5] dark:border-[#1e293b] transition-colors duration-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Clean Editorial Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tagline */}
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#9ca3af] dark:text-gray-400 uppercase mb-2 sm:mb-3">
              DJN Tech · Gaming Store
            </p>

            {/* Headline (Line 1) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white tracking-tight leading-[1.18] sm:leading-[1.12]">
              PlayStation 5, controllers & certified games.
            </h1>

            {/* Subline (Line 2) */}
            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#6b7280] dark:text-gray-300 font-normal leading-relaxed max-w-xl">
              Factory-sealed consoles and 100% laser-tested pre-owned discs with 7-day replacement.
            </p>

            {/* Category Switcher Tabs - Responsive with smooth scroll and zero overflow */}
            <div className="mt-5 sm:mt-6 max-w-full overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#f4f5f7] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] shadow-xs">
                {HERO_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                      idx === activeIndex
                        ? 'bg-white dark:bg-[#1e293b] text-[#111827] dark:text-white shadow-xs'
                        : 'text-[#6b7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-5">
              <button
                onClick={onExploreConsoles}
                className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#111827] dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs hover:shadow flex items-center gap-2"
              >
                <span>Shop Consoles</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreGames}
                className="px-2 py-2 text-xs sm:text-sm font-semibold text-[#111827] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer flex items-center gap-1 group"
              >
                <span>Browse Discs</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Understated Trust Note */}
            <div className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-[#f3f4f6] dark:border-gray-800 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-[#9ca3af] dark:text-gray-400">
              <span>Free delivery over ₹1,000</span>
              <span className="hidden xs:inline">·</span>
              <span>7-Day replacement</span>
              <span className="hidden xs:inline">·</span>
              <span>100% Tested optical discs</span>
            </div>

          </div>

          {/* Right Column: Centered Floating Hardware Stage */}
          <div className="lg:col-span-6 flex items-center justify-center">
            
            <div
              onClick={handleProductClick}
              className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-square bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] rounded-3xl p-5 sm:p-8 flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:border-[#d0d5dd] dark:hover:border-gray-600"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentItem.id}
                  src={currentItem.image}
                  alt={currentItem.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Floating Bottom Info Pill */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#6b7280] dark:text-gray-300 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-[#eaedf0] dark:border-[#2d3748] shadow-sm">
                <span className="font-semibold text-[#111827] dark:text-white truncate mr-2">
                  {currentItem.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-[#111827] dark:text-white">{currentItem.price}</span>
                  <span className="text-[#9ca3af] dark:text-gray-500 line-through text-[11px]">{currentItem.mrp}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};



