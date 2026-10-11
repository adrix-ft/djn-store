import React, { useState } from 'react';
import { Product } from '../types/store';

interface VisualizerProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'detail';
  className?: string;
}

export const ProductVisualizer: React.FC<VisualizerProps> = ({
  product,
  size = 'md',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Height configurations suited for fluid grids
  const heightClasses = {
    sm: 'h-24 sm:h-28',
    md: 'h-48 sm:h-52 md:h-56',
    lg: 'h-56 sm:h-64 md:h-72',
    detail: 'h-72 sm:h-84 md:h-96'
  }[size];

  // Specific fallback image URLs if primary fails
  const fallbackImages: Record<string, string> = {
    consoles: 'https://psxgaming.com/wp-content/uploads/2025/03/game-console-300x300.png',
    controllers: 'https://psxgaming.com/wp-content/uploads/2025/03/joystick-300x300.png',
    preowned_games: 'https://psxgaming.com/wp-content/uploads/2025/03/vinyl-record-300x300.png',
    accessories: 'https://psxgaming.com/wp-content/uploads/2025/03/vr-300x300.png',
  };

  const currentImage = !imageError 
    ? product.imageUrl 
    : fallbackImages[product.category] || 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80';

  return (
    <div className={`relative w-full ${heightClasses} flex items-center justify-center p-2 select-none overflow-hidden bg-[#f8fafc] ${className}`}>
      {currentImage ? (
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center text-[#1a73e8] font-bold text-base mb-2">
            {product.platform}
          </div>
          <span className="text-xs font-semibold text-[#212121] line-clamp-1">{product.name}</span>
          <span className="text-[10px] text-[#64748b] mt-0.5">{product.condition}</span>
        </div>
      )}
    </div>
  );
};
