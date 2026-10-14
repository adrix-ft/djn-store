import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types/store';
import { ProductVisualizer } from './ProductVisualizer';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  // Lock background body scroll when cart is open to prevent underlying page from scrolling
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

  const FREE_SHIPPING_THRESHOLD = 1000;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal + shipping;

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Sibling Backdrop to eliminate backdrop-filter bleed-through bugs */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Solid Opaque Drawer Panel */}
      <div className="relative z-10 w-full max-w-md h-full h-[100dvh] bg-white dark:bg-[#0b0f17] border-l border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#e5e7eb] dark:border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1a73e8] dark:text-[#60a5fa]" />
            <h2 className="text-base font-bold text-[#212121] dark:text-white">
              Shopping Cart ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator matching ₹1000 threshold */}
        <div className="px-5 py-3 bg-[#f8fafc] dark:bg-[#161f30] border-b border-[#e5e7eb] dark:border-[#1e293b]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            {amountNeededForFreeShipping > 0 ? (
              <span className="text-[#424242] dark:text-gray-300">
                Add <span className="font-bold text-[#1a73e8] dark:text-[#60a5fa] font-mono">₹{amountNeededForFreeShipping}.00</span> more for <span className="text-[#10b981] font-bold">Free Delivery</span>
              </span>
            ) : (
              <span className="text-[#10b981] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Free Shipping Unlocked!
              </span>
            )}
            <span className="text-[11px] font-mono text-[#94a3b8] dark:text-gray-400">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#e2e8f0] dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1a73e8] dark:bg-[#60a5fa] rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3 bg-white dark:bg-[#0b0f17]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] flex items-center justify-center text-[#94a3b8]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#212121] dark:text-white">Your cart is currently empty.</h3>
              <p className="text-xs text-[#64748b] dark:text-gray-400 max-w-xs">
                Before proceed to checkout you must add some products to your shopping cart.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#212121] dark:bg-blue-600 text-white font-bold rounded-full text-xs hover:bg-[#333333] dark:hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          ) : (
            items.map(({ product, quantity, selectedCondition }) => {
              return (
                <div
                  key={`${product.id}-${selectedCondition}`}
                  className="p-3 rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#161f30] flex gap-3 shadow-xs"
                >
                  <div className="w-16 h-20 bg-[#f8fafc] dark:bg-[#111827] rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-[#e2e8f0] dark:border-[#2d3748]">
                    <ProductVisualizer product={product} size="sm" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-[#1a73e8] dark:text-[#60a5fa] font-bold uppercase">{product.platform}</span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#94a3b8] hover:text-[#d0473e] dark:hover:text-[#f87171] transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-semibold text-[#212121] dark:text-white line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-[#10b981] font-mono">
                        {selectedCondition}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] dark:border-gray-800 mt-2">
                      <span className="text-xs font-bold text-[#1a73e8] dark:text-[#60a5fa] font-mono tabular-nums">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}.00
                      </span>

                      <div className="flex items-center gap-2 bg-[#f8fafc] dark:bg-[#111827] border border-[#cbd5e1] dark:border-gray-700 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#212121] dark:text-white font-mono min-w-[14px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#e5e7eb] dark:border-[#1e293b] bg-[#fafafa] dark:bg-[#161f30] space-y-3">
            

            {/* Calculations */}
            <div className="space-y-1 text-xs text-[#64748b] dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-[#212121] dark:text-white font-semibold tabular-nums">₹{subtotal.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? <span className="text-[#10b981] font-bold">FREE</span> : `₹${shipping}.00`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#212121] dark:text-white pt-2 border-t border-[#e2e8f0] dark:border-gray-700">
                <span>Total:</span>
                <span className="font-mono text-[#1a73e8] dark:text-[#60a5fa] tabular-nums">
                  ₹{finalTotal.toLocaleString('en-IN')}.00
                </span>
              </div>
            </div>

            {/* Checkout Action Pill Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 bg-[#212121] dark:bg-blue-600 hover:bg-[#333333] dark:hover:bg-blue-700 text-white font-bold rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-[#94a3b8] dark:text-gray-400">
              Free replacement within 7 days · Express Shipping Available
            </p>
          </div>
        )}

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
};
