import React from 'react';
import { Home, LayoutGrid, Disc, Banknote, User } from 'lucide-react';
import { AuthUser, Category, Platform } from '../types/store';

interface MobileBottomNavProps {
  currentPage: string;
  activeCategory: Category | 'all';
  onNavigateHome: () => void;
  onSelectCategory: (category: Category | 'all', platform?: Platform | 'all') => void;
  onNavigateSellConsoles: () => void;
  authUser?: AuthUser | null;
  onOpenAuth?: () => void;
  onOpenUserOrders?: () => void;
  userOrdersCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  activeCategory,
  onNavigateHome,
  onSelectCategory,
  onNavigateSellConsoles,
  authUser,
  onOpenAuth,
  onOpenUserOrders,
  userOrdersCount = 0,
}) => {
  const isHomeActive = currentPage === 'home';
  const isCategoriesActive =
    (currentPage === 'all' && activeCategory === 'all') ||
    currentPage === 'consoles' ||
    currentPage === 'controllers' ||
    currentPage === 'accessories';
  const isGamesActive = currentPage === 'preowned_games';
  const isTradeActive = currentPage === 'sell-consoles';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)] transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 h-14 items-center px-1">
        
        {/* 1. HOME */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none ${
            isHomeActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Navigate Home"
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 leading-none">Home</span>
        </button>

        {/* 2. CATEGORIES (Consoles, Controllers & Accessories consolidated) */}
        <button
          onClick={() => onSelectCategory('all', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none ${
            isCategoriesActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Browse All Categories"
        >
          <LayoutGrid className={`w-5 h-5 ${isCategoriesActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 leading-none">Categories</span>
        </button>

        {/* 3. GAMES (Pre-Owned & Sealed Discs) */}
        <button
          onClick={() => onSelectCategory('preowned_games', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none ${
            isGamesActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Browse Pre-Owned Games"
        >
          <Disc className={`w-5 h-5 ${isGamesActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 leading-none">Games</span>
        </button>

        {/* 4. TRADE (Sell / Trade-In Console) */}
        <button
          onClick={onNavigateSellConsoles}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none ${
            isTradeActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Sell or Trade-In Console"
        >
          <Banknote className={`w-5 h-5 ${isTradeActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 leading-none">Trade</span>
        </button>

        {/* 5. ACCOUNT / PROFILE */}
        <button
          onClick={() => {
            if (authUser && onOpenUserOrders) {
              onOpenUserOrders();
            } else if (onOpenAuth) {
              onOpenAuth();
            }
          }}
          className="flex flex-col items-center justify-center py-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer select-none relative"
          aria-label={authUser ? 'User Dashboard' : 'Sign In'}
        >
          <div className="relative">
            {authUser?.avatarUrl ? (
              <img
                src={authUser.avatarUrl}
                alt={authUser.fullName}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-blue-500"
              />
            ) : (
              <User className="w-5 h-5 stroke-[1.8]" />
            )}
            {userOrdersCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 border border-white dark:border-gray-900" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 leading-none">
            {authUser ? 'Account' : 'Sign In'}
          </span>
        </button>

      </div>
    </nav>
  );
};
