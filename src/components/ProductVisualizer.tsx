import React, { useState } from 'react';
import { Product } from '../types/store';
import { GameCaseFrame } from './GameCaseFrame';

interface VisualizerProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'detail';
  className?: string;
  forceCaseFrame?: boolean;
}

export const ProductVisualizer: React.FC<VisualizerProps> = ({
  product,
  size = 'md',
  className = '',
  forceCaseFrame = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Height configurations suited for fluid grids
  const heightClasses = {
    sm: 'h-24 sm:h-28',
    md: 'h-52 sm:h-56 md:h-60',
    lg: 'h-60 sm:h-68 md:h-76',
    detail: 'h-76 sm:h-88 md:h-[420px]'
  }[size];

  // Specific fallback image URLs if primary fails
  const fallbackImages: Record<string, string> = {
    consoles: 'https://psxgaming.com/wp-content/uploads/2025/03/game-console-300x300.png',
    controllers: 'https://psxgaming.com/wp-content/uploads/2025/03/joystick-300x300.png',
    preowned_games: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg',
    accessories: 'https://psxgaming.com/wp-content/uploads/2025/03/vr-300x300.png',
  };

  const currentImage = !imageError 
    ? product.imageUrl 
    : fallbackImages[product.category] || 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80';

  const isGame = forceCaseFrame || product.category === 'preowned_games';

  // If this product is a game, automatically frame it in the authentic physical console case!
  if (isGame) {
    return (
      <div className={`relative w-full ${heightClasses} flex items-center justify-center p-2.5 sm:p-3 select-none overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] dark:from-[#0d1527] dark:to-[#080d19] ${className}`}>
        <GameCaseFrame
          imageUrl={currentImage}
          name={product.name}
          platform={product.platform}
          size={size}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClasses} flex items-center justify-center p-2 select-none overflow-hidden bg-[#f8fafc] dark:bg-[#161f30] ${className}`}>
      {currentImage ? (
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border border-[#e2e8f0] dark:border-gray-700 shadow-xs flex items-center justify-center text-[#1a73e8] font-bold text-base mb-2">
            {product.platform}
          </div>
          <span className="text-xs font-semibold text-[#212121] dark:text-white line-clamp-1">{product.name}</span>
          <span className="text-[10px] text-[#64748b] dark:text-gray-400 mt-0.5">{product.condition}</span>
        </div>
      )}
    </div>
  );
};
