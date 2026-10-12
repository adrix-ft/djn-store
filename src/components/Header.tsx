import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  ArrowRight,
  Sun,
  Moon,
  Phone,
  Menu,
  X,
  ChevronRight,
  Gamepad2,
  Disc,
  Wrench,
  Banknote,
  Layers,
  Home,
  ShieldCheck,
} from 'lucide-react';
import { Product, Category, Platform, SiteConfig } from '../types/store';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: Category | 'all', platform?: Platform | 'all') => void;
  activeCategory: Category | 'all';
  activePlatform?: Platform | 'all';
  currentPage: 'home' | 'all' | Category | 'sell-consoles' | 'repair-console' | 'product-detail';
  onNavigateHome: () => void;
  onNavigateSellConsoles: () => void;
  onNavigateRepairConsole: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAdmin?: () => void;
  siteConfig?: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  activePlatform = 'all',
  currentPage,
  onNavigateHome,
  onNavigateSellConsoles,
  onNavigateRepairConsole,
  onSearch,
  searchQuery,
  allProducts,
  onSelectProduct,
  theme,
  onToggleTheme,
  onOpenAdmin,
  siteConfig,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    setShowSearchDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#1e293b] shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] w-full transition-colors duration-200">
      
      {/* Tier 1: Main Top Brand & Search Bar */}
      <div className="w-full max-w-[1920px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo */}
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

        {/* Center: Search Bar with Autocomplete */}
        <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search PS5, Xbox Series X, controllers, games..."
              className="w-full bg-[#f8f9fa] dark:bg-[#161f30] hover:bg-[#f3f4f6] dark:hover:bg-[#1c273d] focus:bg-white dark:focus:bg-[#111827] text-xs sm:text-sm text-[#212121] dark:text-white placeholder-[#9e9e9e] dark:placeholder-gray-400 border border-[#e5e7eb] dark:border-[#2d3748] focus:border-[#1a73e8] dark:focus:border-[#60a5fa] rounded-full py-2.5 pl-4 pr-10 focus:outline-none transition-colors shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Live Autocomplete Dropdown */}
          {showSearchDropdown && localSearch.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#111827] rounded-2xl shadow-xl border border-[#e5e7eb] dark:border-[#1e293b] p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
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

        {/* Right Zone: Support, Theme, Account, Wishlist, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Quick Help Link (desktop only) */}
          <a
            href={`https://wa.me/${siteConfig?.whatsappNumber || '918446439374'}`}
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 text-xs text-[#4b5563] dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-2.5 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a2333] transition-colors font-medium mr-1"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-500" />
            <span>Support: {siteConfig?.phone || '+91 84464 39374'}</span>
          </a>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 text-[#424242] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Toggle search"
          >
            <Search className="w-4.5 h-4.5 stroke-[1.8]" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-[#424242] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#f59e0b] transition-all rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-gray-700 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Admin Dashboard Access (Desktop) */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              title="Admin Panel (Edit Website)"
              className="hidden md:flex p-2 text-[#424242] dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
              aria-label="Admin Panel"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            </button>
          )}

          {/* User Account */}
          <button
            onClick={() => onSelectCategory('all')}
            className="hidden sm:block p-2 text-[#424242] dark:text-gray-300 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Account"
          >
            <User className="w-4.5 h-4.5 stroke-[1.8]" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#424242] dark:text-gray-300 hover:text-[#d0473e] dark:hover:text-[#f87171] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-4.5 h-4.5 stroke-[1.8]" />
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
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
            <span className="absolute top-1 right-0 w-4 h-4 bg-[#1a73e8] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in scale-in-75 duration-150">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button (Horizontal lines) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#424242] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] cursor-pointer ml-0.5"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5.5 h-5.5 stroke-[2]" />
          </button>

        </div>

      </div>

      {/* Mobile Search Bar - displayed only when toggled on mobile */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3.5 pb-2.5 pt-1 border-t border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0b0f17] animate-in slide-in-from-top duration-150">
          <form onSubmit={(e) => {
            handleSearchSubmit(e);
            setIsMobileSearchOpen(false);
          }} className="relative w-full flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search PS5, controllers, Xbox games..."
                className="w-full bg-[#f9fafb] dark:bg-[#161f30] text-xs text-[#212121] dark:text-white placeholder-[#9ca3af] dark:placeholder-gray-400 border border-[#e5e7eb] dark:border-[#2d3748] rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#60a5fa] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] dark:text-gray-400 hover:text-[#1a73e8] dark:hover:text-[#60a5fa]"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:white shrink-0 px-1 py-1.5 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Tier 2: Clean Navigation Ribbon (Hidden on mobile for ultra clean look) */}
      <div className="hidden md:block w-full border-t border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#0c121e]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-11 sm:h-12 flex items-center overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full shrink-0">
            {[
              {
                id: 'consoles',
                label: 'Consoles',
                onClick: () => onSelectCategory('consoles', 'all'),
                isActive: currentPage === 'consoles' && (activePlatform === 'all' || !activePlatform)
              },
              {
                id: 'controllers',
                label: 'Controllers',
                onClick: () => onSelectCategory('controllers', 'all'),
                isActive: currentPage === 'controllers'
              },
              {
                id: 'accessories',
                label: 'Accessories',
                onClick: () => onSelectCategory('accessories', 'all'),
                isActive: currentPage === 'accessories'
              },
              {
                id: 'ps5-games',
                label: 'PS5 Games',
                onClick: () => onSelectCategory('preowned_games', 'PS5'),
                isActive: currentPage === 'preowned_games' && activePlatform === 'PS5'
              },
              {
                id: 'ps4-games',
                label: 'PS4 Games',
                onClick: () => onSelectCategory('preowned_games', 'PS4'),
                isActive: currentPage === 'preowned_games' && activePlatform === 'PS4'
              },
              {
                id: 'xbox-games',
                label: 'XBOX Games',
                onClick: () => onSelectCategory('preowned_games', 'Xbox'),
                isActive: currentPage === 'preowned_games' && activePlatform === 'Xbox'
              },
              {
                id: 'sell-consoles',
                label: 'Sell Your Consoles',
                onClick: onNavigateSellConsoles,
                isActive: currentPage === 'sell-consoles'
              },
              {
                id: 'repair-console',
                label: 'Repair Your Console',
                onClick: onNavigateRepairConsole,
                isActive: currentPage === 'repair-console'
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={tab.onClick}
                className={`h-full inline-flex items-center px-2.5 sm:px-3 text-[13.5px] sm:text-sm transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                  tab.isActive
                    ? 'text-gray-950 dark:text-white font-bold border-gray-950 dark:border-white'
                    : 'text-gray-600 dark:text-gray-300 font-medium hover:text-gray-950 dark:hover:text-white border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

        </div>
      </div>

      {/* Mobile Navigation Menu Drawer rendered in body portal so it covers full screen */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-[300px] max-w-[85vw] h-full h-[100dvh] bg-white dark:bg-[#0b0f17] flex flex-col shadow-2xl border-l border-[#e5e7eb] dark:border-[#1e293b] animate-in slide-in-from-right duration-250">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#e5e7eb] dark:border-[#1e293b] flex items-center justify-between bg-white dark:bg-[#0b0f17] shrink-0">
              <BrandLogo variant="horizontal" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Title */}
            <div className="px-5 py-2.5 bg-gray-50/70 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800/80 shrink-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Menu
              </p>
            </div>

            {/* Navbar Buttons as Menu Options */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
              {[
                {
                  id: 'home',
                  label: 'Home',
                  onClick: () => {
                    onNavigateHome();
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'home'
                },
                {
                  id: 'consoles',
                  label: 'Consoles',
                  onClick: () => {
                    onSelectCategory('consoles', 'all');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'consoles' && (activePlatform === 'all' || !activePlatform)
                },
                {
                  id: 'controllers',
                  label: 'Controllers',
                  onClick: () => {
                    onSelectCategory('controllers', 'all');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'controllers'
                },
                {
                  id: 'accessories',
                  label: 'Accessories',
                  onClick: () => {
                    onSelectCategory('accessories', 'all');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'accessories'
                },
                {
                  id: 'ps5-games',
                  label: 'PS5 Games',
                  onClick: () => {
                    onSelectCategory('preowned_games', 'PS5');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'preowned_games' && activePlatform === 'PS5'
                },
                {
                  id: 'ps4-games',
                  label: 'PS4 Games',
                  onClick: () => {
                    onSelectCategory('preowned_games', 'PS4');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'preowned_games' && activePlatform === 'PS4'
                },
                {
                  id: 'xbox-games',
                  label: 'XBOX Games',
                  onClick: () => {
                    onSelectCategory('preowned_games', 'Xbox');
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'preowned_games' && activePlatform === 'Xbox'
                },
                {
                  id: 'sell-consoles',
                  label: 'Sell Your Consoles',
                  onClick: () => {
                    onNavigateSellConsoles();
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'sell-consoles'
                },
                {
                  id: 'repair-console',
                  label: 'Repair Your Console',
                  onClick: () => {
                    onNavigateRepairConsole();
                    setIsMobileMenuOpen(false);
                  },
                  isActive: currentPage === 'repair-console'
                }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`w-full px-3.5 py-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer text-sm ${
                    tab.isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight className={`w-4 h-4 ${tab.isActive ? 'text-white' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Bottom Footer Area */}
            <div className="p-4 border-t border-[#e5e7eb] dark:border-[#1e293b] bg-gray-50/50 dark:bg-[#0c121e] space-y-2.5 shrink-0">
              <button
                onClick={() => {
                  onOpenWishlist();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#d0473e]" />
                  <span>Wishlist</span>
                </div>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Admin Panel</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-bold">
                    EDIT SITE
                  </span>
                </button>
              )}

              <a
                href={`https://wa.me/${siteConfig?.whatsappNumber || '918446439374'}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {siteConfig?.phone || '+91 84464 39374'}</span>
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}

    </header>
  );
};
