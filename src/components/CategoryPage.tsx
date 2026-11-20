import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronDown, SlidersHorizontal, ArrowUpDown, Filter, Sparkles, Gamepad2, Gamepad, Disc, Layers } from 'lucide-react';
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

  useEffect(() => {
    setSelectedPlatform(platform);
  }, [platform]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (category !== 'all' && p.category !== category) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all') {
        if (selectedPlatform === 'Nintendo' || selectedPlatform === 'Switch') {
          if (p.platform !== 'Nintendo' && p.platform !== 'Switch') return false;
        } else if (p.platform !== selectedPlatform) {
          return false;
        }
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
    if (category === 'preowned_games') {
      if (selectedPlatform === 'PS5') {
        return {
          title: 'PlayStation 5 Games',
          subtitle: 'Verified pre-owned PS5 game discs with original cases and 1 Day Testing Warranty.',
          tag: 'PlayStation 5 Games'
        };
      }
      if (selectedPlatform === 'PS4') {
        return {
          title: 'PlayStation 4 Games',
          subtitle: 'Tested pre-owned PS4 game discs compatible with PS4 and PS5 systems with 1 Day Testing Warranty.',
          tag: 'PlayStation 4 Games'
        };
      }
      if (selectedPlatform === 'Xbox') {
        return {
          title: 'Xbox Games',
          subtitle: 'Pre-owned Xbox games with original cases and 1 Day Testing Warranty.',
          tag: 'Xbox Games'
        };
      }
      if (selectedPlatform === 'Switch' || selectedPlatform === 'Nintendo') {
        return {
          title: 'Nintendo Switch Games',
          subtitle: 'Certified pre-owned Nintendo Switch games (Game Cards & Complete Boxed Editions) with 1 Day Testing Warranty.',
          tag: 'Nintendo Switch Games'
        };
      }
      return {
        title: 'Console Games',
        subtitle: 'Pre-owned and verified console games for PlayStation, Xbox, and Nintendo Switch with 1 Day Testing Warranty.',
        tag: 'Console Games'
      };
    }

    switch (category) {
      case 'consoles':
        if (selectedPlatform === 'PS5') {
          return {
            title: 'PlayStation 5 Consoles',
            subtitle: 'Brand new factory-sealed and verified pre-owned PS5 consoles with 1 Month Shop Warranty (Warranty does not cover physical and liquid damage).',
            tag: 'PlayStation 5 Consoles'
          };
        }
        if (selectedPlatform === 'PS4') {
          return {
            title: 'PlayStation 4 Consoles',
            subtitle: 'Tested pre-owned PS4 consoles with 1 Month Shop Warranty (Warranty does not cover physical and liquid damage).',
            tag: 'PlayStation 4 Consoles'
          };
        }
        if (selectedPlatform === 'Xbox') {
          return {
            title: 'Xbox Consoles',
            subtitle: 'Xbox Series X and Series S consoles with 1 Month Shop Warranty (Warranty does not cover physical and liquid damage).',
            tag: 'Xbox Consoles'
          };
        }
        if (selectedPlatform === 'Nintendo' || selectedPlatform === 'Switch') {
          return {
            title: 'Nintendo Consoles',
            subtitle: 'Certified Pre-Owned Nintendo Switch systems with Testing Warranty (Warranty does not cover physical and liquid damage).',
            tag: 'Nintendo Consoles'
          };
        }
        return {
          title: 'PlayStation, Xbox & Nintendo Consoles',
          subtitle: 'Certified pre-owned and sealed consoles with 1 Month Shop Warranty on PlayStation & Xbox, and Testing Warranty on Nintendo series (Warranty does not cover physical and liquid damage).',
          tag: 'Consoles'
        };
      case 'controllers':
        return {
          title: 'Wireless Controllers',
          subtitle: 'Original DualSense and Xbox wireless controllers with 1 Month Shop Warranty (Warranty does not cover physical and liquid damage).',
          tag: 'Controllers'
        };
      case 'accessories':
        return {
          title: 'Gaming Accessories',
          subtitle: 'Charging stations, stands, cables, and essential gaming accessories.',
          tag: 'Accessories'
        };
      default:
        return {
          title: 'All Products',
          subtitle: 'Browse consoles, controllers, and tested pre-owned games.',
          tag: 'Store Catalog'
        };
    }
  };

  const { title, subtitle, tag } = getCategoryDetails();
  const showPlatformFilter = category === 'consoles' || category === 'preowned_games' || category === 'all';

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
          {(category === 'consoles' || category === 'preowned_games') && selectedPlatform !== 'all' ? (
            <>
              <button
                onClick={() => setSelectedPlatform('all')}
                className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-medium cursor-pointer"
              >
                {category === 'consoles' ? 'Consoles' : 'Console Games'}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] dark:text-gray-600" />
              <span className="text-[#111827] dark:text-white font-semibold">
                {selectedPlatform === 'Switch' || selectedPlatform === 'Nintendo' ? 'Nintendo Switch' : selectedPlatform}
              </span>
            </>
          ) : (
            <span className="text-[#111827] dark:text-white font-semibold">
              {category === 'all' ? 'All Products' : title}
            </span>
          )}
        </div>

        {/* Category Header Banner */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-4 sm:p-8 mb-5 sm:mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#1a73e8] dark:text-[#60a5fa] uppercase tracking-wider block mb-1">
                {tag}
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
                {title}
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-[#6b7280] dark:text-gray-300 mt-1.5 max-w-2xl leading-relaxed">
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
              {[
                { id: 'consoles' as Category, label: 'Consoles', icon: Gamepad2 },
                { id: 'controllers' as Category, label: 'Controllers', icon: Gamepad },
                { id: 'preowned_games' as Category, label: 'Games', fullLabel: 'Pre-Owned Games', icon: Disc },
                { id: 'accessories' as Category, label: 'Accessories', icon: Layers },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f4f5f7] dark:bg-[#1a2333] hover:bg-[#111827] dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all cursor-pointer text-[#4b5563] dark:text-gray-300"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">{cat.fullLabel || cat.label}</span>
                    <span className="sm:hidden">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] p-3 sm:p-4 mb-6 sm:mb-8 shadow-xs">
          
          {/* MOBILE VIEW: Clean Native-styled Dropdowns */}
          <div className="md:hidden flex flex-col gap-2.5 w-full">
            <div className={`grid ${showPlatformFilter ? 'grid-cols-2' : 'grid-cols-1'} gap-2 w-full`}>
              {showPlatformFilter && (
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Gamepad2 className="w-3 h-3 text-[#1a73e8] dark:text-[#60a5fa]" />
                    Platform
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlatform === 'Switch' ? 'Nintendo' : selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value as any)}
                      className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border border-[#d1d5db] dark:border-gray-700 bg-white dark:bg-[#161f30] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:border-[#1a73e8] dark:focus:border-[#60a5fa] cursor-pointer shadow-2xs"
                    >
                      <option value="all">All Platforms</option>
                      <option value="PS5">PlayStation 5</option>
                      <option value="PS4">PlayStation 4</option>
                      <option value="Xbox">Xbox</option>
                      <option value="Nintendo">Nintendo Switch</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-500">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] dark:text-gray-400 mb-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#1a73e8] dark:text-[#60a5fa]" />
                  Condition
                </label>
                <div className="relative">
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value as any)}
                    className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border border-[#d1d5db] dark:border-gray-700 bg-white dark:bg-[#161f30] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:border-[#1a73e8] dark:focus:border-[#60a5fa] cursor-pointer shadow-2xs"
                  >
                    <option value="all">All Conditions</option>
                    <option value="new">Brand New Sealed</option>
                    <option value="preowned">Pre-Owned Grade A+</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-500">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sort Dropdown */}
            <div className="relative w-full pt-2 border-t border-[#f3f4f6] dark:border-[#1e293b]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] dark:text-gray-400 flex items-center gap-1 shrink-0">
                  <ArrowUpDown className="w-3 h-3 text-[#1a73e8] dark:text-[#60a5fa]" />
                  Sort by
                </span>
                <div className="relative flex-1 max-w-[210px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-[#d1d5db] dark:border-gray-700 bg-white dark:bg-[#161f30] text-xs font-semibold text-[#111827] dark:text-white focus:outline-hidden focus:border-[#1a73e8] dark:focus:border-[#60a5fa] cursor-pointer shadow-2xs text-left"
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW: Clean Horizontal Filter Chips & Sort Toolbar */}
          <div className="hidden md:flex items-center justify-between w-full gap-4">
            {/* Platform & Condition Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {showPlatformFilter && (
                <>
                  <span className="text-xs font-bold text-[#6b7280] dark:text-gray-400 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    Platform:
                  </span>
                  {(['all', 'PS5', 'PS4', 'Xbox', 'Nintendo'] as const).map((plat) => {
                    const isPlatActive =
                      selectedPlatform === plat ||
                      (plat === 'Nintendo' && selectedPlatform === 'Switch');
                    return (
                      <button
                        key={plat}
                        onClick={() => setSelectedPlatform(plat)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isPlatActive
                            ? 'bg-[#111827] dark:bg-blue-600 text-white font-semibold shadow-xs'
                            : 'bg-[#f4f5f7] dark:bg-[#161f30] text-[#4b5563] dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
                        }`}
                      >
                        {plat === 'all' ? 'All' : plat === 'Nintendo' ? 'Nintendo Switch' : plat}
                      </button>
                    );
                  })}

                  <div className="h-4 w-[1px] bg-[#e5e7eb] dark:bg-gray-800 mx-1 hidden sm:block" />
                </>
              )}

              <span className="text-xs font-bold text-[#6b7280] dark:text-gray-400 mr-1 flex items-center gap-1">
                {!showPlatformFilter && <Filter className="w-3.5 h-3.5" />}
                Condition:
              </span>
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
              {showPlatformFilter
                ? 'Try adjusting your platform or condition filters to see available inventory.'
                : 'Try adjusting your condition filter to see available inventory.'}
            </p>
            <button
              onClick={() => {
                setSelectedPlatform(platform);
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
