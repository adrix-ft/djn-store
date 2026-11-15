import React, { useState } from 'react';
import { ShoppingBag, Heart, Check, MessageCircle } from 'lucide-react';
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

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col rounded-lg bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] hover:border-[#9ca3af] dark:hover:border-gray-500 hover:shadow-md transition-all duration-200 overflow-hidden ${className}`}
    >
      
      {/* Visual Product Image Container */}
      <a 
        href={`/product/${product.id}`}
        onClick={(e) => {
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            onSelect(product);
          }
        }} 
        className="relative block cursor-pointer overflow-hidden bg-[#f9fafb] dark:bg-[#161f30]"
      >
        <ProductVisualizer product={product} size="md" />

        {/* Minimal Discount Tag */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="text-[10px] font-semibold tracking-tight px-1.5 py-0.5 rounded bg-[#111827] dark:bg-white text-white dark:text-[#111827]">
              -{product.discountPercent}%
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

        {/* Quick Add To Cart / WhatsApp Enquiry Hover Action */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-200 z-30 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          {product.isEnquiryOnly || product.price === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full py-2 rounded-md text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Enquire on WhatsApp</span>
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
      </a>

      {/* Product Information Body */}
      <div 
        onClick={() => onSelect(product)}
        className="p-3.5 flex-1 flex flex-col justify-between cursor-pointer text-left"
      >
        <div className="space-y-1">
          {/* Metadata: Platform & Condition (Unboxed text) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280] dark:text-gray-400">
            <span>{product.platform === 'Switch' || product.platform === 'Nintendo' ? 'Nintendo Switch' : product.platform}</span>
            <span aria-hidden="true">·</span>
            <span className="line-clamp-1">{product.condition}</span>
          </div>

          {/* Product Name */}
          <a
            href={`/product/${product.id}`}
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onSelect(product);
              }
            }}
            className="text-xs sm:text-sm font-medium text-[#111827] dark:text-gray-100 group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors line-clamp-2 min-h-[38px] leading-snug block"
          >
            {product.name}
          </a>
        </div>

        {/* Pricing Row */}
        <div className="mt-2.5 pt-2 border-t border-[#f3f4f6] dark:border-[#1e293b]">
          {product.isEnquiryOnly || product.price === 0 ? (
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Pre-Order / Enquiry
                </span>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-0.5">
                WhatsApp booking · No advance fee
              </span>
            </div>
          ) : (
            <>
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
              <span className="text-[10px] text-[#9ca3af] dark:text-gray-400 block mt-0.5">
                Incl. all taxes
              </span>
            </>
          )}
        </div>
      </div>

    </div>
  );
};
