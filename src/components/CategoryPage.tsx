import React, { useState, useMemo } from 'react';
import { ChevronRight, SlidersHorizontal, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { Product, Category, Platform } from '../types/store';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  category: Category | 'all';
  platform?: Platform | 'all';
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  cartIds: string[];
  onNavigateHome: () => void;
  onSelectCategory: (cat: Category | 'all') => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  platform = 'all',
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  onNavigateHome,
  onSelectCategory
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>(platform);
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (category !== 'all' && p.category !== category) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== 'all') {
        if (selectedCondition === 'new' && !p.condition.toLowerCase().includes('brand new')) {
          return false;
        }
        if (selectedCondition === 'preowned' && !p.condition.toLowerCase().includes('pre-owned') && !p.condition.toLowerCase().includes('grade')) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured default
    });
  }, [products, category, selectedPlatform, selectedCondition, sortBy]);

  const getCategoryDetails = () => {
    switch (category) {
      case 'consoles':
        return {
          title: 'PlayStation & Xbox Consoles',
          subtitle: 'Official factory-sealed PS5 Slim & Pro consoles, verified refurbished PS4 systems, and Xbox Series X with warranty.',
          tag: 'Official Warranty · Sealed Units'
        };
      case 'controllers':
        return {
          title: 'Wireless Controllers',
          subtitle: 'DualSense wireless controllers with haptic feedback, Midnight Black, Cosmic Red, and official DualShock 4 gamepads.',
          tag: 'Haptic Feedback · Precision Sticks'
        };
      case 'preowned_games':
        return {
          title: 'Pre-Owned Tested Games',
          subtitle: '100% optical laser-tested PS5 & PS4 game discs with clean original boxes, buffed surfaces, and 7-Day Replacement Guarantee.',
          tag: 'Grade A+ Mint · Laser Readability 100%'
        };
      case 'accessories':
        return {
          title: 'Gaming Accessories',
          subtitle: 'Charging stations, vertical console stands, high-speed HDMI 2.1 cables, and protective gaming cases.',
          tag: 'Fast Charging · High Speed Gear'
        };
      default:
        return {
          title: 'All Products & Gaming Gear',
          subtitle: 'Explore our complete verified catalog of consoles, controllers, and tested pre-owned game discs across India.',
          tag: 'All Gaming Inventory'
        };
    }
  };

  const { title, subtitle, tag } = getCategoryDetails();

  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-[#0b0f17] min-h-screen py-6 sm:py-8 text-[#212121] dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-[#6b7280] dark:text-gray-400 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] dark:text-gray-600" />
          <span className="text-[#111827] dark:text-white font-semibold">
            {category === 'all' ? 'All Products' : title}
          </span>
        </div>

        {/* Category Header Banner */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1a73e8] dark:text-[#60a5fa] uppercase tracking-wider block mb-1">
                {tag}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-[#6b7280] dark:text-gray-300 mt-1.5 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            <div className="text-xs text-[#6b7280] dark:text-gray-400 bg-[#f8f9fa] dark:bg-[#161f30] px-3.5 py-2 rounded-xl border border-[#eaedf0] dark:border-[#2d3748] self-start md:self-auto shrink-0">
              Showing <strong className="text-[#111827] dark:text-white">{filteredProducts.length}</strong> items
            </div>
          </div>

          {/* Quick Sub-Category Nav Pills if viewing All */}
          {category === 'all' && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#f3f4f6] dark:border-[#1e293b]">
              {(['consoles', 'controllers', 'preowned_games', 'accessories'] as Category[]).map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => onSelectCategory(catKey)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f4f5f7] dark:bg-[#1a2333] hover:bg-[#111827] dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all cursor-pointer text-[#4b5563] dark:text-gray-300"
                >
                  {catKey === 'consoles'
                    ? 'Consoles'
                    : catKey === 'controllers'
                    ? 'Controllers'
                    : catKey === 'preowned_games'
                    ? 'Pre-Owned Games'
                    : 'Accessories'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          
          {/* Platform & Condition Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#6b7280] dark:text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Platform:
            </span>
            {(['all', 'PS5', 'PS4', 'Xbox'] as const).map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedPlatform === plat
                    ? 'bg-[#111827] dark:bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-[#f4f5f7] dark:bg-[#161f30] text-[#4b5563] dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {plat === 'all' ? 'All' : plat}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-[#e5e7eb] dark:bg-gray-800 mx-1 hidden sm:block" />

            <span className="text-xs font-bold text-[#6b7280] dark:text-gray-400 mr-1 hidden sm:inline">Condition:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'Brand New' },
              { id: 'preowned', label: 'Pre-Owned' }
            ].map((cond) => (
              <button
                key={cond.id}
                onClick={() => setSelectedCondition(cond.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCondition === cond.id
                    ? 'bg-[#111827] dark:bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-[#f4f5f7] dark:bg-[#161f30] text-[#4b5563] dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {cond.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs shrink-0">
            <span className="text-[#6b7280] dark:text-gray-400 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-[#d1d5db] dark:border-gray-700 bg-white dark:bg-[#161f30] text-xs font-medium text-[#111827] dark:text-white focus:outline-hidden focus:border-[#1a73e8] dark:focus:border-[#60a5fa] cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 mb-16">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={(p) => onSelectProduct(p)}
                onAddToCart={(p) => onAddToCart(p)}
                onToggleWishlist={(p) => onToggleWishlist(p)}
                isWishlisted={wishlistIds.includes(prod.id)}
                isInCart={cartIds.includes(prod.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-12 text-center my-8">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] dark:bg-[#161f30] text-[#6b7280] dark:text-gray-400 flex items-center justify-center mx-auto mb-3">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white">No matching products found</h3>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1 max-w-sm mx-auto">
              Try adjusting your platform or condition filters to see available inventory.
            </p>
            <button
              onClick={() => {
                setSelectedPlatform('all');
                setSelectedCondition('all');
              }}
              className="mt-4 px-4 py-2 bg-[#111827] dark:bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-black dark:hover:bg-blue-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
