import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';
import { ProductVisualizer } from './ProductVisualizer';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
  onSelectProduct,
}) => {
  // Lock background body scroll when wishlist is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Sibling Backdrop to prevent backdrop-filter bleed-through bugs */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Solid Opaque Drawer Panel */}
      <div className="relative z-10 w-full max-w-md h-full h-[100dvh] bg-white dark:bg-[#0b0f17] border-l border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#e5e7eb] dark:border-[#1e293b] flex items-center justify-between bg-white dark:bg-[#0b0f17] shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#d0473e] fill-[#d0473e]" />
            <h2 className="text-base font-bold text-[#212121] dark:text-white">
              Saved Wishlist ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3 bg-white dark:bg-[#0b0f17]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] flex items-center justify-center text-[#94a3b8]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#212121] dark:text-white">No saved items yet</h3>
              <p className="text-xs text-[#64748b] dark:text-gray-400 max-w-xs">
                Save your favorite pre-owned games, consoles, and controllers to find them anytime.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#212121] dark:bg-blue-600 text-white font-bold rounded-full text-xs hover:bg-[#333333] dark:hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#161f30] flex gap-3 shadow-xs group"
              >
                <div 
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-20 bg-[#f8fafc] dark:bg-[#111827] rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-[#e2e8f0] dark:border-[#2d3748] cursor-pointer"
                >
                  <ProductVisualizer product={product} size="sm" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#1a73e8] dark:text-[#60a5fa] font-bold uppercase">{product.platform}</span>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-[#94a3b8] hover:text-[#d0473e] dark:hover:text-[#f87171] transition-colors p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#212121] dark:text-white line-clamp-1 cursor-pointer hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors"
                    >
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-[#10b981] font-mono">
                      {product.condition}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] dark:border-gray-800 mt-2">
                    <span className="text-xs font-bold text-[#1a73e8] dark:text-[#60a5fa] font-mono tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}.00
                    </span>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      className="px-3 py-1 bg-[#212121] dark:bg-blue-600 hover:bg-[#333333] dark:hover:bg-blue-700 text-white font-bold rounded-full text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#e5e7eb] dark:border-[#1e293b] bg-[#fafafa] dark:bg-[#161f30]">
            <button
              onClick={() => {
                items.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-[#212121] dark:bg-blue-600 hover:bg-[#333333] dark:hover:bg-blue-700 text-white font-bold rounded-full text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
};
