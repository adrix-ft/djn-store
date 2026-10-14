import React from 'react';
import { Home, Gamepad2, Gamepad, Disc, Headphones, Banknote } from 'lucide-react';
import { AuthUser, Category, Platform } from '../types/store';

interface MobileBottomNavProps {
  currentPage: string;
  activeCategory: Category | 'all';
  onNavigateHome: () => void;
  onSelectCategory: (category: Category | 'all', platform?: Platform | 'all') => void;
  onNavigateSellConsoles: () => void;
  // Optional legacy props maintained for backward compatibility
  onOpenCart?: () => void;
  cartCount?: number;
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
}) => {
  const isHomeActive = currentPage === 'home';
  const isConsolesActive = currentPage === 'consoles' || (currentPage === 'all' && activeCategory === 'consoles');
  const isControllersActive = currentPage === 'controllers' || (currentPage === 'all' && activeCategory === 'controllers');
  const isGamesActive = currentPage === 'preowned_games' || (currentPage === 'all' && activeCategory === 'preowned_games');
  const isAccessoriesActive = currentPage === 'accessories' || (currentPage === 'all' && activeCategory === 'accessories');
  const isSellActive = currentPage === 'sell-consoles';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)] transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-6 h-14 items-center px-1">
        
        {/* 1. HOME */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isHomeActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Navigate Home"
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Home</span>
        </button>

        {/* 2. CONSOLES */}
        <button
          onClick={() => onSelectCategory('consoles', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isConsolesActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Shop Consoles"
        >
          <Gamepad2 className={`w-5 h-5 ${isConsolesActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Consoles</span>
        </button>

        {/* 3. CONTROLLERS */}
        <button
          onClick={() => onSelectCategory('controllers', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isControllersActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Shop Controllers"
        >
          <Gamepad className={`w-5 h-5 ${isControllersActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Controllers</span>
        </button>

        {/* 4. GAMES */}
        <button
          onClick={() => onSelectCategory('preowned_games', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isGamesActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Browse Pre-Owned Games"
        >
          <Disc className={`w-5 h-5 ${isGamesActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Games</span>
        </button>

        {/* 5. ACCESSORIES */}
        <button
          onClick={() => onSelectCategory('accessories', 'all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isAccessoriesActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Shop Gaming Accessories"
        >
          <Headphones className={`w-5 h-5 ${isAccessoriesActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Accessories</span>
        </button>

        {/* 6. SELL / TRADE */}
        <button
          onClick={onNavigateSellConsoles}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer select-none px-0.5 ${
            isSellActive
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Sell or Trade-In Console"
        >
          <Banknote className={`w-5 h-5 ${isSellActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9.5px] min-[390px]:text-[10px] mt-0.5 leading-none tracking-tight">Trade</span>
        </button>

      </div>
    </nav>
  );
};
