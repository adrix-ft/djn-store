import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  LogOut,
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { AuthUser, Order } from '../types/store';
import { GoogleLogoIcon } from './GoogleLogoIcon';

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  orders: Order[];
  onSignOut: () => void;
  onContinueShopping: () => void;
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  onSignOut,
  onContinueShopping,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  if (!isOpen) return null;

  // Filter orders for this user by email or userId
  const userEmail = (user.email || '').trim().toLowerCase();
  const userOrders = orders.filter((o) => {
    const orderEmail = (o.customer?.email || '').trim().toLowerCase();
    return (
      (orderEmail && orderEmail === userEmail) ||
      (o.userId && o.userId === user.id)
    );
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Order Confirmed · Processing
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Dispatched · Blue Dart Express
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Out for Delivery Today
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Delivered · 7-Day Warranty Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  const getTrackingStages = (order: Order) => {
    const isDispatched = order.status === 'Dispatched' || order.status === 'Out for Delivery' || order.status === 'Delivered';
    const isOut = order.status === 'Out for Delivery' || order.status === 'Delivered';
    const isDelivered = order.status === 'Delivered';

    return [
      {
        title: 'Order Confirmed & Payment Verified',
        desc: 'Secured via 256-bit Razorpay SSL. Invoice generated.',
        completed: true,
        active: order.status === 'Confirmed',
      },
      {
        title: 'DJN Tech 25-Point Optical & Drift QA Inspection',
        desc: 'Disc laser reading & DualSense drift diagnostics completed.',
        completed: true,
        active: order.status === 'Confirmed',
      },
      {
        title: 'Dispatched via Express Courier',
        desc: `Blue Dart Express AWB #BD-${order.id.replace('DJN-', '')}-IN`,
        completed: isDispatched,
        active: order.status === 'Dispatched',
      },
      {
        title: 'Out for Delivery',
        desc: 'Courier executive assigned with OTP hand-off.',
        completed: isOut,
        active: order.status === 'Out for Delivery',
      },
      {
        title: 'Delivered to Doorstep',
        desc: 'Protected by DJN Tech 7-Day Hassle-Free Replacement Guarantee.',
        completed: isDelivered,
        active: order.status === 'Delivered',
      },
    ];
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* User Profile Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-5 sm:p-6 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-14 h-14 rounded-2xl border-2 border-white/40 object-cover shadow-md"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-black text-white shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-xs">
                <GoogleLogoIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black truncate">{user.fullName}</h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-blue-100 truncate">{user.email}</p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-blue-200">
                <span>{userOrders.length} {userOrders.length === 1 ? 'Order Placed' : 'Orders Placed'}</span>
                <span>·</span>
                <span className="text-white font-semibold">Priority Express Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Orders Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                My Orders & Live Updates
              </h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {userOrders.length} total
            </span>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No Orders Placed Yet</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                When you order consoles, controllers, or pre-owned games, live tracking and warranty updates will appear here automatically.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Browse Gaming Store
              </button>
            </div>
          ) : (
            userOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const stages = getTrackingStages(order);

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#161f30] overflow-hidden shadow-xs hover:border-blue-500/40 transition-colors"
                >
                  {/* Order Card Header */}
                  <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50 dark:bg-[#1a2333]/50 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-gray-900 dark:text-white">
                          #{order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {order.date}
                        </span>
                        <span>·</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Est. Delivery: {order.estimatedDelivery}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-gray-400 block">Total Paid</span>
                        <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400 tabular-nums">
                          ₹{order.total.toLocaleString('en-IN')}.00
                        </span>
                      </div>

                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse Tracking' : 'Expand Live Tracking'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="space-y-2">
                      {order.items.map((it, idx) => (
                        <div
                          key={`${it.product.id}-${idx}`}
                          className="flex items-center justify-between text-xs py-1.5"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {it.product.imageUrl ? (
                              <img
                                src={it.product.imageUrl}
                                alt={it.product.name}
                                className="w-10 h-10 object-contain rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-0.5 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 shrink-0">
                                <Package className="w-5 h-5" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white truncate">
                                {it.product.name}
                              </p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                Qty: {it.quantity} · <span className="text-emerald-600 dark:text-emerald-400 font-medium">{it.selectedCondition}</span>
                              </p>
                            </div>
                          </div>

                          <span className="font-mono font-bold text-gray-900 dark:text-white shrink-0 ml-3">
                            ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}.00
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address Pill */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>
                        Delivery to: <strong>{order.customer.fullName}</strong>, {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                      </span>
                    </div>

                    {/* Live Tracking Progress View (Expandable) */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#111827]/70 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-blue-600" />
                            Live Dispatch & Transit Status
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Synced via DJN Express Network
                          </span>
                        </div>

                        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
                          {stages.map((st, sIdx) => (
                            <div key={sIdx} className="relative flex items-start gap-3 pl-1">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                                  st.completed
                                    ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/30'
                                    : st.active
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                }`}
                              >
                                {st.completed ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className={`text-xs font-bold ${st.completed || st.active ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                  {st.title}
                                </p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                                  {st.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order WhatsApp Support Link */}
                        <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between">
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            Need help with this shipment?
                          </span>
                          <a
                            href={`https://wa.me/918446439374?text=${encodeURIComponent(
                              `Hi DJN Tech, I need an update on my order #${order.id}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Support</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Sign Out */}
        <div className="p-4 border-t border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0e1422] flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Google</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
