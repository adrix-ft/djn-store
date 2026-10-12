import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Banknote, QrCode, ArrowRight } from 'lucide-react';
import { CartItem, Order, OrderCustomerInfo } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'cod',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'DJN-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...items],
        subtotal,
        discount,
        shipping,
        total,
        customer: { ...formData },
        status: 'Confirmed',
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs overflow-y-auto flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#212121] dark:text-gray-100">
        
        {/* Header */}
        <div className="p-5 border-b border-[#e5e7eb] dark:border-[#1e293b] flex items-center justify-between bg-[#fafafa] dark:bg-[#161f30]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#1a73e8] dark:text-[#60a5fa]" />
            <h2 className="text-base sm:text-lg font-bold text-[#212121] dark:text-white">
              Checkout Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-[#424242] dark:text-gray-300">
            
            {/* Left Column: Shipping Address */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-bold text-[#212121] dark:text-white text-sm mb-2">
                1. Delivery Address
              </h3>

              <div>
                <label className="font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Sundaram"
                  className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 84464 39374"
                    className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@gmail.com"
                    className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Address & House No. *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House No, Street, Landmark"
                  className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Trichy"
                    className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="620001"
                    className="w-full bg-[#f8fafc] dark:bg-[#161f30] border border-[#cbd5e1] dark:border-gray-700 rounded-xl p-2.5 text-xs text-[#212121] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <h3 className="font-bold text-[#212121] dark:text-white text-sm mb-2">
                  2. Payment Method
                </h3>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod' ? 'border-[#1a73e8] bg-blue-50/40 dark:bg-blue-950/40' : 'border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-[#161f30]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="accent-[#1a73e8]"
                      />
                      <div>
                        <p className="font-bold text-[#212121] dark:text-white">Cash on Delivery (COD)</p>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400">Pay cash or UPI upon delivery</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1a73e8] bg-blue-100 dark:bg-blue-900/60 dark:text-blue-300 px-2 py-0.5 rounded-full">POPULAR</span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'upi' ? 'border-[#1a73e8] bg-blue-50/40 dark:bg-blue-950/40' : 'border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-[#161f30]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="accent-[#1a73e8]"
                      />
                      <div>
                        <p className="font-bold text-[#212121] dark:text-white">UPI (GPay / PhonePe / Paytm)</p>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400">Instant payment</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-[#fafafa] dark:bg-[#161f30] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#212121] dark:text-white text-sm mb-3">
                  Order Summary ({items.length} items)
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1">
                  {items.map((it) => (
                    <div key={it.product.id} className="flex justify-between items-center text-xs py-1.5 border-b border-[#e2e8f0] dark:border-gray-700">
                      <div className="truncate max-w-[160px]">
                        <p className="font-semibold text-[#212121] dark:text-white truncate">{it.product.name}</p>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400">Qty: {it.quantity} · {it.selectedCondition}</p>
                      </div>
                      <span className="font-mono text-[#212121] dark:text-white font-bold">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}.00
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#64748b] dark:text-gray-400 pt-2 border-t border-[#e2e8f0] dark:border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-[#212121] dark:text-white">₹{subtotal.toLocaleString('en-IN')}.00</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#10b981]">
                      <span>Discount:</span>
                      <span>-₹{discount.toLocaleString('en-IN')}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-mono text-[#10b981] font-bold">
                      {shipping === 0 ? 'FREE' : `₹${shipping}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#212121] dark:text-white pt-2 border-t border-[#e2e8f0] dark:border-gray-700">
                    <span>Total:</span>
                    <span className="font-mono text-[#1a73e8] dark:text-[#60a5fa]">
                      ₹{total.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e2e8f0] dark:border-gray-700 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#212121] dark:bg-blue-600 hover:bg-[#333333] dark:hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Placing Order...' : `Place Order · ₹${total.toLocaleString('en-IN')}.00`}
                </button>
                <p className="text-center text-[10px] text-[#94a3b8] dark:text-gray-400">
                  7-Day Replacement Guarantee Included
                </p>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
