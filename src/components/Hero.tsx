import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
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
    subtitle: '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray',
    price: '₹49,990',
    mrp: '₹54,990',
    discount: '9% OFF',
    image: '/hero-ps5-slim.png',
    productId: 'ps5-slim-disc',
    ambientGlow: 'bg-gradient-to-tr from-blue-600/25 via-cyan-400/20 to-blue-500/15 dark:from-blue-600/40 dark:via-cyan-500/30 dark:to-indigo-500/25',
    badgeText: 'Official Sony 1 Year Warranty',
  },
  {
    id: 'controller',
    label: 'Controllers',
    title: 'DualSense Wireless Controller',
    subtitle: 'Midnight Black · Haptic Feedback & Adaptive Triggers',
    price: '₹4,990',
    mrp: '₹6,390',
    discount: '22% OFF',
    image: '/hero-dualsense.png',
    productId: 'dualsense-midnight-black',
    ambientGlow: 'bg-gradient-to-tr from-indigo-600/25 via-purple-500/20 to-blue-600/15 dark:from-indigo-600/40 dark:via-purple-600/30 dark:to-cyan-500/25',
    badgeText: 'Original DualSense',
  },
  {
    id: 'games',
    label: 'Pre-Owned Discs',
    title: 'Elden Ring: Shadow of the Erdtree',
    subtitle: 'Laser Read Tested · 100% Genuine Certified Disc',
    price: '₹2,199',
    mrp: '₹4,499',
    discount: '51% OFF',
    image: '/hero-elden-ring.png',
    productId: 'elden-ring-ps5',
    ambientGlow: 'bg-gradient-to-tr from-amber-600/25 via-orange-500/20 to-yellow-500/15 dark:from-amber-600/40 dark:via-orange-600/30 dark:to-red-500/25',
    badgeText: '7-Day Replacement Guarantee',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreGames,
  onExploreConsoles,
  featuredProduct,
  onSelectProduct,
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
    <section className="relative w-full bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 dark:from-[#0b0f17] dark:via-[#0e1420] dark:to-[#0b0f17] overflow-hidden transition-colors duration-300">
      
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Content (Moved Upwards) */}
          <div className="lg:col-span-6 flex flex-col justify-start z-10 -mt-1 sm:-mt-3 lg:-mt-6">
            
            {/* Headline - Bigger & Higher Up */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-extrabold text-[#111827] dark:text-white tracking-tight leading-[1.08] sm:leading-[1.04] lg:leading-[1.01]">
              <span className="sm:hidden">PlayStation 5 & Tested Games</span>
              <span className="hidden sm:inline">PlayStation 5, controllers & certified games.</span>
            </h1>

            {/* Subline */}
            <p className="mt-3 sm:mt-4 lg:mt-5 text-xs sm:text-base md:text-lg text-[#6b7280] dark:text-gray-300 font-normal leading-relaxed max-w-xl">
              <span className="sm:hidden">Official sealed consoles & 100% laser-tested games.</span>
              <span className="hidden sm:inline">Factory-sealed consoles and 100% laser-tested pre-owned discs with 7-day doorstep replacement guarantee.</span>
            </p>

            {/* Category Switcher Tabs */}
            <div className="mt-5 sm:mt-7 max-w-full overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md">
                {HERO_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                      idx === activeIndex
                        ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-5">
              <button
                onClick={onExploreConsoles}
                className="px-6 sm:px-8 py-3 bg-[#111827] dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Shop Consoles</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={onExploreGames}
                className="px-3 py-2 text-xs sm:text-sm font-bold text-[#111827] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer flex items-center gap-1 group"
              >
                <span>Browse Discs</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Trust Pill Strip */}
            <div className="hidden sm:flex mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-[#9ca3af] dark:text-gray-400 font-medium">
              <span>Free delivery over ₹1,000</span>
              <span>·</span>
              <span>7-Day doorstep replacement</span>
              <span>·</span>
              <span>100% Tested optical discs</span>
            </div>

          </div>

          {/* Right Column: Frameless Floating 3D Showcase (Completely Borderless & Frameless) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[340px] sm:min-h-[440px] lg:min-h-[520px]">
            
            {/* Dynamic Ambient Glow Behind Product (Pure Soft Light Aura) */}
            <div
              className={`absolute w-[280px] sm:w-[400px] lg:w-[460px] h-[280px] sm:h-[400px] lg:h-[460px] rounded-full blur-[90px] opacity-60 dark:opacity-75 pointer-events-none transition-all duration-700 ${currentItem.ambientGlow}`}
            />

            {/* Interactive Floating Product (Completely Frameless) */}
            <div
              onClick={handleProductClick}
              className="relative z-10 w-full flex flex-col items-center justify-center cursor-pointer group select-none"
              title={`View ${currentItem.title}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -14 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative flex items-center justify-center py-2 sm:py-4"
                >
                  {/* Floating Product Image with realistic studio drop-shadow */}
                  <motion.img
                    src={currentItem.image}
                    alt={currentItem.title}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-auto h-[270px] sm:h-[370px] md:h-[420px] lg:h-[470px] max-w-full object-contain filter drop-shadow-[0_22px_36px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_28px_50px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Stylish Floating Info Pill (Completely Borderless & Frameless) */}
              <motion.div
                key={`pill-${currentItem.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 sm:mt-3 inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-white/85 dark:bg-[#111827]/85 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.10)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-all group-hover:scale-105 group-hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate max-w-[160px] sm:max-w-[240px]">
                    {currentItem.title}
                  </span>
                </div>

                <div className="h-3.5 w-px bg-slate-300/60 dark:bg-slate-700/60" />

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    {currentItem.price}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                    {currentItem.mrp}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-gray-700 dark:text-gray-300 pl-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <span>View</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};




