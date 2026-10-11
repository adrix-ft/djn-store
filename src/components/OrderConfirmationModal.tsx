import React from 'react';
import { CheckCircle2, Truck, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import { Order } from '../types/store';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs overflow-y-auto flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#212121] dark:text-gray-100">
        
        {/* Top Celebration Banner */}
        <div className="bg-[#f8fafc] dark:bg-[#161f30] border-b border-[#e5e7eb] dark:border-[#1e293b] p-6 text-center text-[#212121] dark:text-white">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold font-display">
            Order Confirmed!
          </h2>
          <p className="text-xs text-[#64748b] dark:text-gray-400 mt-1">
            Thank you, {order.customer.fullName}. Order <span className="font-mono font-bold text-[#212121] dark:text-white">#{order.id}</span> is successfully registered.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-[#424242] dark:text-gray-300">
          
          {/* Status Tracker */}
          <div className="p-4 rounded-xl bg-[#fafafa] dark:bg-[#161f30] border border-[#e5e7eb] dark:border-[#1e293b]">
            <p className="font-bold text-[#212121] dark:text-white uppercase text-[11px] mb-3">
              Shipment Tracking
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="w-7 h-7 mx-auto rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <p className="font-bold text-[#212121] dark:text-white mt-1">Confirmed</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-gray-400">Today</p>
              </div>

              <div>
                <div className="w-7 h-7 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 text-[#1a73e8] dark:text-blue-300 border border-[#1a73e8] flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p className="font-bold text-[#1a73e8] dark:text-blue-400 mt-1">QC & Testing</p>
                <p className="text-[10px] text-[#64748b] dark:text-gray-400">In progress</p>
              </div>

              <div className="opacity-60">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#e2e8f0] dark:bg-gray-700 text-[#64748b] dark:text-gray-300 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p className="font-medium text-[#64748b] dark:text-gray-400 mt-1">Dispatched</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-gray-400">Tomorrow</p>
              </div>

              <div className="opacity-60">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#e2e8f0] dark:bg-gray-700 text-[#64748b] dark:text-gray-300 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <p className="font-medium text-[#64748b] dark:text-gray-400 mt-1">Delivered</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-gray-400">{order.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#161f30] space-y-1">
              <span className="font-bold text-[#212121] dark:text-white block">Delivery Address</span>
              <p className="text-[#212121] dark:text-white font-semibold">{order.customer.fullName}</p>
              <p className="text-[#64748b] dark:text-gray-400">{order.customer.address}</p>
              <p className="text-[#64748b] dark:text-gray-400">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-[#64748b] dark:text-gray-400">Phone: {order.customer.phone}</p>
            </div>

            <div className="p-4 rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] bg-white dark:bg-[#161f30] space-y-1">
              <span className="font-bold text-[#212121] dark:text-white block">Payment Summary</span>
              <p className="text-[#64748b] dark:text-gray-400">Payment Mode: <span className="font-semibold text-[#212121] dark:text-white uppercase">{order.customer.paymentMethod}</span></p>
              <p className="text-[#64748b] dark:text-gray-400">Est. Delivery: <span className="text-[#10b981] font-bold">{order.estimatedDelivery}</span></p>
              <div className="pt-2 border-t border-[#f1f5f9] dark:border-gray-800 flex justify-between font-bold text-sm text-[#212121] dark:text-white">
                <span>Total Amount:</span>
                <span className="font-mono text-[#1a73e8] dark:text-[#60a5fa]">₹{order.total.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#212121] dark:bg-blue-600 hover:bg-[#333333] dark:hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-3 border border-[#cbd5e1] dark:border-gray-700 hover:bg-[#f8fafc] dark:hover:bg-[#161f30] text-[#424242] dark:text-gray-200 font-semibold rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
