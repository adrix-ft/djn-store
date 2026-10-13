import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface ProductSectionCarouselProps {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeDotClass?: string;
  badgeTextClass?: string;
  products: Product[];
  onViewAll: () => void;
  viewAllLabel?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  cartIds: string[];
  maxDisplay?: number;
  containerBgClass?: string;
  borderClass?: string;
}

export const ProductSectionCarousel: React.FC<ProductSectionCarouselProps> = ({
  title,
  subtitle,
  badgeText,
  badgeDotClass = 'bg-blue-600 dark:bg-blue-400',
  badgeTextClass = 'text-blue-600 dark:text-blue-400',
  products,
  onViewAll,
  viewAllLabel = 'View all',
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  maxDisplay = 20,
  containerBgClass = 'bg-white dark:bg-[#0b0f17]',
  borderClass = 'border-b border-[#e5e7eb] dark:border-[#1e293b]',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Take top items for fast rendering, or all if small
  const displayProducts = products.slice(0, maxDisplay);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [displayProducts]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 320);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={`w-full py-10 sm:py-14 ${containerBgClass} transition-colors duration-200`}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className={`flex items-end justify-between mb-5 pb-3.5 ${borderClass}`}>
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${badgeDotClass}`} />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${badgeTextClass}`}>
                {badgeText}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="hidden sm:block text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Navigation Controls: Arrows on Desktop, Swipe note on Mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="sm:hidden text-[11px] font-medium text-gray-400 dark:text-gray-500">
              Swipe →
            </span>

            {/* Desktop Left/Right Carousel Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-xs cursor-pointer'
                    : 'bg-gray-50 dark:bg-gray-900/50 text-gray-300 dark:text-gray-600 border-gray-100 dark:border-gray-800 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-xs cursor-pointer'
                    : 'bg-gray-50 dark:bg-gray-900/50 text-gray-300 dark:text-gray-600 border-gray-100 dark:border-gray-800 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onViewAll}
              className="text-xs font-bold text-[#2563eb] dark:text-[#60a5fa] hover:underline cursor-pointer flex items-center gap-1 ml-1"
            >
              <span>{viewAllLabel}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track (Desktop & Mobile) */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-3.5 sm:gap-4 md:gap-5 pb-3 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {displayProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              className="w-[164px] min-w-[164px] sm:w-[195px] sm:min-w-[195px] md:w-[220px] md:min-w-[220px] lg:w-[235px] lg:min-w-[235px] shrink-0 snap-start h-full"
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(prod.id)}
              isInCart={cartIds.includes(prod.id)}
            />
          ))}

          {/* Interactive End Card to explore full catalog */}
          {products.length > displayProducts.length && (
            <div
              onClick={onViewAll}
              className="w-[164px] min-w-[164px] sm:w-[195px] sm:min-w-[195px] md:w-[220px] md:min-w-[220px] lg:w-[235px] lg:min-w-[235px] shrink-0 snap-start flex flex-col items-center justify-center rounded-lg bg-gray-50/80 dark:bg-gray-800/40 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 p-6 text-center cursor-pointer group transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                View All {products.length} Items
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Explore entire catalog
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
