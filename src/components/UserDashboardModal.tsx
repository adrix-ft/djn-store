import React, { useState, useMemo } from 'react';
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
  User,
  Mail,
  Phone,
  FileText,
  Heart,
  Save,
  Check,
  CreditCard,
  Printer,
  Copy,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { AuthUser, Order, Product, Condition } from '../types/store';
import { GoogleLogoIcon } from './GoogleLogoIcon';
import { BrandLogo } from './BrandLogo';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  orders: Order[];
  wishlist?: Product[];
  onSignOut: () => void;
  onContinueShopping: () => void;
  onAddToCart?: (product: Product, condition?: Condition) => void;
}

type DashboardTab = 'orders' | 'profile' | 'warranty' | 'wishlist';

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  wishlist = [],
  onSignOut,
  onContinueShopping,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'transit' | 'delivered'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Address editing state
  const [savedAddress, setSavedAddress] = useState(() => {
    const local = localStorage.getItem('djn_saved_address');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {}
    }
    // Fallback to most recent order address
    const latestOrder = orders.find(
      (o) => (o.customer?.email || '').toLowerCase() === user.email.toLowerCase()
    );
    return {
      fullName: user.fullName || latestOrder?.customer?.fullName || '',
      phone: latestOrder?.customer?.phone || '',
      address: latestOrder?.customer?.address || '',
      city: latestOrder?.customer?.city || '',
      state: latestOrder?.customer?.state || 'Maharashtra',
      pincode: latestOrder?.customer?.pincode || '',
    };
  });
  const [addressSavedNotice, setAddressSavedNotice] = useState(false);

  if (!isOpen) return null;

  // Filter orders matching current authenticated user
  const userEmail = (user.email || '').trim().toLowerCase();
  const userOrders = orders.filter((o) => {
    const orderEmail = (o.customer?.email || '').trim().toLowerCase();
    return (
      (orderEmail && orderEmail === userEmail) ||
      (o.userId && o.userId === user.id)
    );
  });

  // Calculate high-level stats
  const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeShipments = userOrders.filter(
    (o) => o.status === 'Confirmed' || o.status === 'Dispatched' || o.status === 'Out for Delivery'
  ).length;

  // Filtered orders list
  const filteredOrders = userOrders
    .filter((o) => {
      if (orderFilter === 'transit') {
        return o.status === 'Dispatched' || o.status === 'Out for Delivery' || o.status === 'Confirmed';
      }
      if (orderFilter === 'delivered') {
        return o.status === 'Delivered';
      }
      return true;
    })
    .filter((o) => {
      const q = orderSearch.trim().toLowerCase();
      if (!q) return true;
      const matchId = o.id.toLowerCase().includes(q);
      const matchItem = o.items.some((it) => it.product.name.toLowerCase().includes(q));
      return matchId || matchItem;
    });

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrderId(id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('djn_saved_address', JSON.stringify(savedAddress));
    setAddressSavedNotice(true);
    setTimeout(() => setAddressSavedNotice(false), 2500);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Confirmed
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Dispatched
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Out for Delivery
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
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
        title: 'Order Confirmed',
        desc: 'Payment received and order confirmed.',
        completed: true,
        active: order.status === 'Confirmed',
      },
      {
        title: 'Quality Check',
        desc: 'Hardware and discs inspected before packing.',
        completed: true,
        active: order.status === 'Confirmed',
      },
      {
        title: 'Dispatched',
        desc: `Blue Dart Express AWB #BD-${order.id.replace('DJN-', '')}-IN`,
        completed: isDispatched,
        active: order.status === 'Dispatched',
      },
      {
        title: 'Out for Delivery',
        desc: 'With delivery executive for doorstep delivery.',
        completed: isOut,
        active: order.status === 'Out for Delivery',
      },
      {
        title: 'Delivered',
        desc: '7-Day replacement guarantee active.',
        completed: isDelivered,
        active: order.status === 'Delivered',
      },
    ];
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-[#f8fafc] dark:bg-[#0b0f19] flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200">
      
      {/* 1. TOP GLOBAL APP BAR */}
      <header className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="cursor-pointer hover:opacity-85 transition-opacity"
            title="Return to DJN Tech Store"
          >
            <BrandLogo variant="horizontal" />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            title="Return to Store"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Return to Store</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. EXECUTIVE PROFILE HERO BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shrink-0 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* User Avatar & Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/50 object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 border-2 border-white/50 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Active Status Badge */}
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                  <GoogleLogoIcon className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                  {user.fullName}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/15 shrink-0">
              <div className="text-center px-2 sm:px-4">
                <span className="text-[10px] uppercase font-semibold text-blue-200 block">Orders Placed</span>
                <span className="text-base sm:text-xl font-black text-white">{userOrders.length}</span>
              </div>
              <div className="text-center px-2 sm:px-4 border-x border-white/15">
                <span className="text-[10px] uppercase font-semibold text-blue-200 block">In Transit</span>
                <span className="text-base sm:text-xl font-black text-amber-300">{activeShipments}</span>
              </div>
              <div className="text-center px-2 sm:px-4">
                <span className="text-[10px] uppercase font-semibold text-blue-200 block">Total Spent</span>
                <span className="text-base sm:text-xl font-black text-emerald-300 font-mono">
                  ₹{totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Pill Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-5 pt-3.5 border-t border-white/15 overflow-x-auto no-scrollbar">
            {[
              { id: 'orders' as DashboardTab, label: 'My Orders & Shipments', shortLabel: 'Orders', icon: Package, count: userOrders.length },
              { id: 'profile' as DashboardTab, label: 'Profile & Address', shortLabel: 'Profile', icon: User },
              { id: 'warranty' as DashboardTab, label: '7-Day Guarantee', shortLabel: 'Guarantee', icon: ShieldCheck },
              { id: 'wishlist' as DashboardTab, label: 'Saved Wishlist', shortLabel: 'Wishlist', icon: Heart, count: wishlist.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] ${
                        isActive ? 'bg-blue-100 text-blue-700 font-black' : 'bg-white/20 text-white'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. FULL-SCREEN SCROLLABLE CONTENT BODY */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* TAB 1: MY ORDERS & SHIPMENTS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter & Search Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'all' as const, label: `All (${userOrders.length})` },
                    { id: 'transit' as const, label: `In Transit (${activeShipments})` },
                    { id: 'delivered' as const, label: `Delivered` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setOrderFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        orderFilter === f.id
                          ? 'bg-blue-600 text-white shadow-2xs font-bold'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by order ID or item..."
                    className="pl-3 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 w-48 sm:w-60"
                  />
                </div>
              </div>

              {/* Order Cards */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                  <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No matching orders found</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                    Browse our collection of verified consoles, controllers, and tested pre-owned games.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onContinueShopping();
                    }}
                    className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Explore Gaming Store
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const stages = getTrackingStages(order);

                  return (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#161f30] overflow-hidden shadow-xs hover:border-blue-500/40 transition-colors"
                    >
                      {/* Order Card Header */}
                      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gray-50/70 dark:bg-[#1a2333]/70 border-b border-gray-100 dark:border-gray-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-black text-gray-900 dark:text-white">
                              #{order.id}
                            </span>
                            <button
                              onClick={() => handleCopyOrderId(order.id)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded cursor-pointer"
                              title="Copy Order ID"
                            >
                              {copiedOrderId === order.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {order.date}
                            </span>
                            <span>·</span>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              Estimated Delivery: {order.estimatedDelivery}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-semibold text-gray-400 block">Total</span>
                            <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400 tabular-nums">
                              ₹{order.total.toLocaleString('en-IN')}.00
                            </span>
                          </div>

                          <button
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                            title={isExpanded ? 'Collapse Tracking' : 'Expand Tracking'}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Purchased Items List */}
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
                                    className="w-12 h-12 object-contain rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-1 shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 shrink-0">
                                    <Package className="w-6 h-6" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="font-bold text-gray-900 dark:text-white truncate">
                                    {it.product.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                      {it.product.platform}
                                    </span>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                      Qty: {it.quantity} · <span className="text-emerald-600 font-medium">{it.selectedCondition}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <span className="font-mono font-bold text-gray-900 dark:text-white shrink-0 ml-3 text-sm">
                                ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}.00
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address Pill */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>
                            Delivery to: <strong>{order.customer.fullName}</strong> · {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode} (Ph: {order.customer.phone})
                          </span>
                        </div>

                        {/* Live Tracking Timeline (Expandable) */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#111827]/70 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                                <Truck className="w-4 h-4 text-blue-600" />
                                Live Transit Timeline
                              </span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                Verified by DJN Logistics
                              </span>
                            </div>

                            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
                              {stages.map((st, sIdx) => (
                                <div key={sIdx} className="relative flex items-start gap-3 pl-1">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                                      st.completed
                                        ? 'bg-emerald-500 text-white shadow-xs'
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
                          </div>
                        )}

                        {/* Order Actions Footer */}
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2333] hover:border-blue-500 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="hidden sm:inline">View Digital Tax Invoice</span>
                            <span className="sm:hidden">Tax Invoice</span>
                          </button>

                          <a
                            href={`https://wa.me/918446439374?text=${encodeURIComponent(
                              `Hi DJN Tech, I need an update on my order #${order.id}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span className="hidden sm:inline">WhatsApp Help</span>
                            <span className="sm:hidden">Help</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: PROFILE & DELIVERY ADDRESS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              {/* Account Overview Box */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-200/80 dark:border-gray-800 space-y-4">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Account Profile Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-gray-400 block mb-1">Full Name</label>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{user.fullName}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Primary Email (Verified)</label>
                    <div className="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white">
                      <GoogleLogoIcon className="w-3.5 h-3.5" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Sign-in Method</label>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Google Verified Account</p>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Account Standing</label>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">Active · 7-Day Buyer Warranty</p>
                  </div>
                </div>
              </div>

              {/* Saved Delivery Address Form */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Default Shipping Address
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      This address will be automatically prefilled whenever you checkout.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveAddress} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={savedAddress.fullName}
                        onChange={(e) => setSavedAddress({ ...savedAddress, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={savedAddress.phone}
                        onChange={(e) => setSavedAddress({ ...savedAddress, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Street Address / House No. *</label>
                    <textarea
                      rows={2}
                      required
                      value={savedAddress.address}
                      onChange={(e) => setSavedAddress({ ...savedAddress, address: e.target.value })}
                      placeholder="Flat No, Building, Street, Landmark"
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={savedAddress.city}
                        onChange={(e) => setSavedAddress({ ...savedAddress, city: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={savedAddress.state}
                        onChange={(e) => setSavedAddress({ ...savedAddress, state: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        value={savedAddress.pincode}
                        onChange={(e) => setSavedAddress({ ...savedAddress, pincode: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2333] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Default Shipping Address</span>
                    </button>

                    {addressSavedNotice && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                        <Check className="w-4 h-4" /> Address saved successfully!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: 7-DAY GUARANTEE & HARDWARE INSPECTION */}
          {activeTab === 'warranty' && (
            <div className="space-y-5 max-w-2xl">
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">
                      DJN Tech 7-Day Doorstep Replacement Guarantee
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Standard coverage on all PlayStation, Xbox consoles, DualSense controllers, and pre-owned game discs.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-blue-100 dark:border-blue-900/40 space-y-1">
                    <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Controller Testing
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Every controller analog stick and button is tested for accurate calibration and response.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-blue-100 dark:border-blue-900/40 space-y-1">
                    <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Verified Game Discs
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Every pre-owned game disc is inspected and tested on retail consoles to ensure smooth gameplay.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-blue-100 dark:border-blue-900/40 space-y-1">
                    <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Doorstep Reverse Pickup
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      If an item develops an issue within 7 days, our courier collects it right from your doorstep.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-blue-100 dark:border-blue-900/40 space-y-1">
                    <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Official Manufacturer Warranty
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Brand new PS5 and Xbox units carry standard 1-year Sony / Microsoft manufacturer warranty.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="https://wa.me/918446439374?text=Hi%20DJN%20Tech%20Support,%20I%20have%20a%20warranty%20inquiry%20regarding%20my%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Warranty Support on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Saved Products ({wishlist.length})
                </h3>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                  <Heart className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Your wishlist is currently empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlist.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#161f30] flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {prod.imageUrl ? (
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-12 h-12 object-contain rounded-xl bg-gray-50 dark:bg-gray-900 p-1 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-gray-900 dark:text-white truncate">
                            {prod.name}
                          </p>
                          <p className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 mt-0.5">
                            ₹{prod.price.toLocaleString('en-IN')}.00
                          </p>
                        </div>
                      </div>

                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* 4. BOTTOM FOOTER BAR */}
      <footer className="px-4 sm:px-6 lg:px-8 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] flex items-center justify-between text-xs text-gray-500 shrink-0">
        <div className="flex items-center gap-2">
          <span>DJN Tech Official Store · Signed in as <strong>{user.email}</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </footer>

      {/* DIGITAL TAX INVOICE POPUP MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-gray-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h3 className="font-black text-lg text-gray-900 tracking-tight">DJN TECH CONSOLE STORE</h3>
                <p className="text-[11px] text-gray-500">Official Retail Invoice & Warranty Certificate</p>
                <p className="text-[10px] text-gray-400">GSTIN: 27AABCT8829Q1Z8 · Mumbai, MH</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block bg-emerald-50 px-2 py-0.5 rounded">
                  PAID IN FULL
                </span>
                <span className="font-mono text-xs font-black text-gray-900 block mt-1">
                  #{selectedInvoiceOrder.id}
                </span>
                <span className="text-[10px] text-gray-400">{selectedInvoiceOrder.date}</span>
              </div>
            </div>

            {/* Customer & Bill To Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Billed & Shipped To</span>
                <p className="font-bold text-gray-900">{selectedInvoiceOrder.customer.fullName}</p>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {selectedInvoiceOrder.customer.address}, {selectedInvoiceOrder.customer.city},{' '}
                  {selectedInvoiceOrder.customer.state} - {selectedInvoiceOrder.customer.pincode}
                </p>
                <p className="text-gray-500 text-[11px] mt-0.5">Ph: {selectedInvoiceOrder.customer.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Payment Details</span>
                <p className="font-semibold text-gray-900 uppercase">{selectedInvoiceOrder.customer.paymentMethod}</p>
                {selectedInvoiceOrder.customer.paymentId && (
                  <p className="font-mono text-[10px] text-gray-500 truncate max-w-[180px] ml-auto">
                    Txn: {selectedInvoiceOrder.customer.paymentId}
                  </p>
                )}
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  7-Day Replacement Guarantee Active
                </p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-4 border-b border-gray-100 text-xs space-y-2.5">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Purchased Products</span>
              {selectedInvoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1">
                  <div>
                    <p className="font-bold text-gray-900">{it.product.name}</p>
                    <p className="text-[10px] text-gray-500">
                      Qty: {it.quantity} · {it.selectedCondition}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-gray-900">
                    ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}.00
                  </span>
                </div>
              ))}
            </div>

            {/* Summary & Totals */}
            <div className="py-3 text-xs space-y-1.5 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-gray-900 font-semibold">
                  ₹{selectedInvoiceOrder.subtotal.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-mono text-emerald-600 font-bold">
                  {selectedInvoiceOrder.shipping === 0 ? 'FREE' : `₹${selectedInvoiceOrder.shipping}.00`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Paid:</span>
                <span className="font-mono text-blue-600 text-base">
                  ₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}.00
                </span>
              </div>
            </div>

            {/* Invoice Print & Download Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(null)}
                className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};

// Aliased export for backwards compatibility
export const UserOrdersModal = UserDashboardModal;
