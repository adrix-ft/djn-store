import React, { useState } from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { Product } from '../types/store';
import { ProductVisualizer } from './ProductVisualizer';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isInCart: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isInCart,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = !product.inStock || (typeof product.stockCount === 'number' && product.stockCount <= 0);
  const isLowStock = !isOutOfStock && typeof product.stockCount === 'number' && product.stockCount > 0 && product.stockCount <= 2;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col rounded-lg bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] hover:border-[#9ca3af] dark:hover:border-gray-500 hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? 'opacity-90' : ''
      } ${className}`}
    >
      
      {/* Visual Product Image Container */}
      <div 
        onClick={() => onSelect(product)} 
        className={`relative cursor-pointer overflow-hidden bg-[#f9fafb] dark:bg-[#161f30] ${
          isOutOfStock ? 'grayscale-[25%]' : ''
        }`}
      >
        <ProductVisualizer product={product} size="md" />

        {/* Out of Stock Badge / Minimal Discount Tag */}
        {isOutOfStock ? (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-red-600 text-white shadow-xs uppercase">
              Out of Stock
            </span>
          </div>
        ) : product.discountPercent > 0 ? (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="text-[10px] font-semibold tracking-tight px-1.5 py-0.5 rounded bg-[#111827] dark:bg-white text-white dark:text-[#111827]">
              -{product.discountPercent}%
            </span>
          </div>
        ) : null}

        {/* Low Stock Urgency Pill */}
        {isLowStock && (
          <div className="absolute top-2.5 right-10 z-20">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-2xs">
              Only {product.stockCount} left
            </span>
          </div>
        )}

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-[#6b7280] dark:text-gray-300 hover:text-[#ef4444] shadow-xs transition-colors cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#ef4444] text-[#ef4444]' : ''}`} />
        </button>

        {/* Quick Add To Cart Hover Action */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-200 z-30 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          {isOutOfStock ? (
            <button
              disabled
              className="w-full py-2 rounded-md text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none"
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className={`w-full py-2 rounded-md text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isInCart
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#111827] dark:bg-blue-600 hover:bg-[#1f2937] dark:hover:bg-blue-700 text-white'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added to cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Information Body */}
      <div 
        onClick={() => onSelect(product)}
        className="p-3.5 flex-1 flex flex-col justify-between cursor-pointer text-left"
      >
        <div className="space-y-1">
          {/* Metadata: Platform & Condition (Unboxed text) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280] dark:text-gray-400">
            <span>{product.platform}</span>
            <span aria-hidden="true">·</span>
            <span className="line-clamp-1">{product.condition}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-medium text-[#111827] dark:text-gray-100 group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors line-clamp-2 min-h-[38px] leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Pricing Row */}
        <div className="mt-2.5 pt-2 border-t border-[#f3f4f6] dark:border-[#1e293b] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#111827] dark:text-white tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-[#9ca3af] dark:text-gray-500 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {isOutOfStock ? (
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
              Low Stock
            </span>
          ) : null}
        </div>
      </div>

    </div>
  );
};
