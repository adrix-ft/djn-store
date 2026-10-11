import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, ArrowRight, Sun, Moon } from 'lucide-react';
import { Product, Category } from '../types/store';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: Category | 'all') => void;
  activeCategory: Category | 'all';
  currentPage: 'home' | 'all' | Category | 'product-detail';
  onNavigateHome: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  currentPage,
  onNavigateHome,
  onSearch,
  searchQuery,
  allProducts,
  onSelectProduct,
  theme,
  onToggleTheme,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = localSearch.trim()
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.platform.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    setShowSearchDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#1e293b] shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_10px_rgba(0,0,0,0.3)] w-full transition-colors duration-200">
      
      {/* Top Main Navigation Bar spanning full screen width */}
      <div className="w-full max-w-[1920px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo - 100% visible and high contrast in both themes */}
        <div className="flex items-center shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="flex items-center group transition-transform hover:scale-[1.02] cursor-pointer"
            aria-label="DJN Tech Console Store Home"
          >
            <BrandLogo variant="horizontal" />
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#424242] dark:text-gray-300">
          <button
            onClick={onNavigateHome}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'home' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectCategory('all')}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'all' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => onSelectCategory('consoles')}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'consoles' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            Consoles
          </button>
          <button
            onClick={() => onSelectCategory('controllers')}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'controllers' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            Controllers
          </button>
          <button
            onClick={() => onSelectCategory('preowned_games')}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'preowned_games' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            Pre-Owned Games
          </button>
          <button
            onClick={() => onSelectCategory('accessories')}
            className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors py-1 cursor-pointer ${
              currentPage === 'accessories' ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold border-b-2 border-[#1a73e8] dark:border-[#60a5fa]' : ''
            }`}
          >
            Accessories
          </button>
        </nav>

        {/* Right Zone: Search Bar, Order Track, Theme Toggle, Account, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Search Input Box */}
          <div ref={searchRef} className="relative hidden md:block w-64 lg:w-72 xl:w-80">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="I'm looking for..."
                className="w-full bg-[#f9fafb] dark:bg-[#161f30] hover:bg-[#f3f4f6] dark:hover:bg-[#1c273d] focus:bg-white dark:focus:bg-[#111827] text-sm text-[#212121] dark:text-white placeholder-[#9e9e9e] dark:placeholder-gray-400 border border-[#e5e7eb] dark:border-[#2d3748] focus:border-[#1a73e8] dark:focus:border-[#60a5fa] rounded-full py-2 pl-4 pr-10 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#1a73e8] dark:hover:text-[#60a5fa]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {showSearchDropdown && localSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#111827] rounded-2xl shadow-xl border border-[#e5e7eb] dark:border-[#1e293b] p-2 z-50">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        setShowSearchDropdown(false);
                      }}
                      className="p-2.5 hover:bg-[#f9fafb] dark:hover:bg-[#1a2333] rounded-xl cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="truncate pr-2">
                        <p className="font-semibold text-[#212121] dark:text-white truncate">{prod.name}</p>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400">₹{prod.price.toLocaleString('en-IN')}.00 · {prod.condition}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9e9e9e] dark:text-gray-500" />
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-[#64748b] dark:text-gray-400">
                    No items found for "{localSearch}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 sm:p-2.5 text-[#424242] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#f59e0b] transition-all rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* User Account Icon - desktop/tablet */}
          <button
            onClick={() => onSelectCategory('all')}
            className="hidden sm:block p-2 text-[#424242] dark:text-gray-300 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#424242] dark:text-gray-300 hover:text-[#d0473e] dark:hover:text-[#f87171] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d0473e] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in scale-in-75 duration-150">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#424242] dark:text-gray-300 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-1 right-0 w-4 h-4 bg-[#1a73e8] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in scale-in-75 duration-150">
              {cartCount}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Search Bar - 100% Full Width Clean Field */}
      <div className="md:hidden px-3.5 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search PS5, controllers, pre-owned games..."
            className="w-full bg-[#f9fafb] dark:bg-[#161f30] text-sm text-[#212121] dark:text-white placeholder-[#9ca3af] dark:placeholder-gray-400 border border-[#e5e7eb] dark:border-[#2d3748] rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#60a5fa] transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] dark:text-gray-400 hover:text-[#1a73e8] dark:hover:text-[#60a5fa]"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

    </header>
  );
};

