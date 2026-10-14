import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Layers,
  Gamepad2,
  Disc,
  Flame,
  ChevronRight,
  MapPin,
  Clock,
  IndianRupee,
  Boxes,
  Plus,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { Product, Order, SiteConfig } from '../types/store';

interface AdminAnalyticsProps {
  products: Product[];
  orders: Order[];
  siteConfig: SiteConfig;
  onNavigateTab?: (tab: 'products' | 'orders' | 'content') => void;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({
  products,
  orders,
  siteConfig,
  onNavigateTab,
}) => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [chartView, setChartView] = useState<'area' | 'bar'>('bar');

  // Business Owner Analytics Calculation
  const stats = useMemo(() => {
    // 1. REVENUE & FINANCIAL SUMMARY
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const confirmedOrders = orders.filter((o) => o.status === 'Confirmed');
    const inTransitOrders = orders.filter(
      (o) => o.status === 'Dispatched' || o.status === 'Out for Delivery'
    );
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

    const inTransitRevenue = inTransitOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingPackingRevenue = confirmedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const deliveredRevenue = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
    const deliverySuccessRate =
      orders.length > 0
        ? Math.round((deliveredOrders.length / orders.length) * 100)
        : 100;

    // 2. INVENTORY CAPITAL & ASSET VALUATION
    const totalStockValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
    const totalMrpValue = products.reduce((sum, p) => sum + (p.mrp || 0), 0);
    const totalDiscountSavings = totalMrpValue - totalStockValue;
    const avgDiscountPercent = Math.round(
      products.reduce((sum, p) => sum + (p.discountPercent || 0), 0) / (products.length || 1)
    );

    // 3. URGENT SHOP ACTION ITEMS
    // Low stock items (stockCount <= 2 or out of stock)
    const lowStockItems = products.filter(
      (p) => !p.inStock || (p.stockCount !== undefined && p.stockCount <= 2)
    );

    // 4. REAL SALES & TOP EARNERS LEADERBOARD
    const itemSalesMap = new Map<
      string,
      { product: Product; unitsSold: number; totalEarned: number }
    >();
    let totalItemsSold = 0;

    orders.forEach((order) => {
      (order.items || []).forEach((cartItem) => {
        if (!cartItem?.product?.id) return;
        const pid = cartItem.product.id;
        const qty = Number(cartItem.quantity) || 1;
        const itemPrice = Number(cartItem.product.price) || 0;
        totalItemsSold += qty;

        const existing = itemSalesMap.get(pid);
        if (existing) {
          existing.unitsSold += qty;
          existing.totalEarned += itemPrice * qty;
        } else {
          itemSalesMap.set(pid, {
            product: cartItem.product,
            unitsSold: qty,
            totalEarned: itemPrice * qty,
          });
        }
      });
    });

    const realOrderedList = Array.from(itemSalesMap.values()).sort(
      (a, b) => b.totalEarned - a.totalEarned || b.unitsSold - a.unitsSold
    );

    // Top sellers list: real orders first, then fill with high-value stock items
    const topSellers = [
      ...realOrderedList.map((item, idx) => ({
        ...item.product,
        unitsSold: item.unitsSold,
        totalEarned: item.totalEarned,
        trendingRank: idx + 1,
        isRealSale: true,
      })),
      ...products
        .filter((p) => !itemSalesMap.has(p.id))
        .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.price - a.price)
        .slice(0, Math.max(0, 6 - realOrderedList.length))
        .map((p, idx) => ({
          ...p,
          unitsSold: 0,
          totalEarned: p.price,
          trendingRank: realOrderedList.length + idx + 1,
          isRealSale: false,
        })),
    ].slice(0, 6);

    // 5. CUSTOMER GEOGRAPHY (Where are orders coming from?)
    const cityMap = new Map<string, { city: string; state: string; count: number; total: number }>();
    orders.forEach((o) => {
      const city = o.customer?.city?.trim() || 'Direct Store Order';
      const state = o.customer?.state?.trim() || 'India';
      const key = `${city}-${state}`;
      const existing = cityMap.get(key);
      if (existing) {
        existing.count += 1;
        existing.total += o.total || 0;
      } else {
        cityMap.set(key, {
          city,
          state,
          count: 1,
          total: o.total || 0,
        });
      }
    });

    const topCities = Array.from(cityMap.values())
      .sort((a, b) => b.total - a.total || b.count - a.count)
      .slice(0, 5);

    // 6. INVENTORY CATEGORY BREAKDOWN
    const consoles = products.filter((p) => p.category === 'consoles');
    const controllers = products.filter((p) => p.category === 'controllers');
    const games = products.filter((p) => p.category === 'preowned_games');
    const accessories = products.filter((p) => p.category === 'accessories');

    const consolesVal = consoles.reduce((s, p) => s + p.price, 0);
    const controllersVal = controllers.reduce((s, p) => s + p.price, 0);
    const gamesVal = games.reduce((s, p) => s + p.price, 0);
    const accessoriesVal = accessories.reduce((s, p) => s + p.price, 0);

    // 7. SALES TIMELINE FOR OWNER (Daily / Weekly Breakdown)
    const now = Date.now();
    const parsedOrders = orders
      .map((o) => {
        const orderTime = new Date(o.date).getTime();
        return {
          ...o,
          timestamp: isNaN(orderTime) ? now : orderTime,
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);

    let trajectoryPoints: { label: string; date: string; revenue: number; orders: number }[] = [];

    if (timeframe === '7d') {
      const days = 7;
      let running = 0;
      trajectoryPoints = Array.from({ length: days }).map((_, idx) => {
        const dayOffset = days - 1 - idx;
        const d = new Date(now - dayOffset * 86400000);
        const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const dayEnd = dayStart + 86400000;

        const dayOrders = parsedOrders.filter((o) => o.timestamp >= dayStart && o.timestamp < dayEnd);
        const dayRev = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        running += dayRev;

        const weekday = d.toLocaleDateString('en-IN', { weekday: 'short' });
        const dateStr = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

        return {
          label: idx === days - 1 ? `${weekday} (Today)` : weekday,
          date: dateStr,
          revenue: chartView === 'area' ? running : dayRev,
          orders: dayOrders.length,
        };
      });
      if (chartView === 'area' && running < totalRevenue) {
        trajectoryPoints[trajectoryPoints.length - 1].revenue = totalRevenue;
        trajectoryPoints[trajectoryPoints.length - 1].orders = Math.max(
          trajectoryPoints[trajectoryPoints.length - 1].orders,
          orders.length
        );
      }
    } else if (timeframe === '30d') {
      const weeks = 4;
      let running = 0;
      trajectoryPoints = Array.from({ length: weeks }).map((_, idx) => {
        const weekOffset = weeks - 1 - idx;
        const wStart = now - (weekOffset + 1) * 7 * 86400000;
        const wEnd = now - weekOffset * 7 * 86400000;

        const weekOrders = parsedOrders.filter((o) => o.timestamp >= wStart && o.timestamp < wEnd);
        const weekRev = weekOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        running += weekRev;

        const startStr = new Date(wStart).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        const endStr = new Date(wEnd).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

        return {
          label: `Week ${idx + 1}`,
          date: `${startStr} - ${endStr}`,
          revenue: chartView === 'area' ? running : weekRev,
          orders: weekOrders.length,
        };
      });
      if (chartView === 'area' && running < totalRevenue) {
        trajectoryPoints[trajectoryPoints.length - 1].revenue = totalRevenue;
        trajectoryPoints[trajectoryPoints.length - 1].orders = Math.max(
          trajectoryPoints[trajectoryPoints.length - 1].orders,
          orders.length
        );
      }
    } else if (timeframe === '90d') {
      const months = 3;
      let running = 0;
      trajectoryPoints = Array.from({ length: months }).map((_, idx) => {
        const mOffset = months - 1 - idx;
        const d = new Date();
        d.setMonth(d.getMonth() - mOffset);
        const mStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
        const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime();

        const mOrders = parsedOrders.filter((o) => o.timestamp >= mStart && o.timestamp <= mEnd);
        const mRev = mOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        running += mRev;

        return {
          label: d.toLocaleDateString('en-IN', { month: 'short' }),
          date: d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
          revenue: chartView === 'area' ? running : mRev,
          orders: mOrders.length,
        };
      });
      if (chartView === 'area' && running < totalRevenue) {
        trajectoryPoints[trajectoryPoints.length - 1].revenue = totalRevenue;
        trajectoryPoints[trajectoryPoints.length - 1].orders = Math.max(
          trajectoryPoints[trajectoryPoints.length - 1].orders,
          orders.length
        );
      }
    } else {
      let running = 0;
      const count = 4;
      const firstTime = parsedOrders.length > 0 ? parsedOrders[0].timestamp : now - 30 * 86400000;
      const span = Math.max(86400000 * 7, now - firstTime);
      const step = span / count;

      trajectoryPoints = Array.from({ length: count }).map((_, idx) => {
        const tStart = firstTime + idx * step;
        const tEnd = firstTime + (idx + 1) * step;

        const periodOrders = parsedOrders.filter((o) => o.timestamp >= tStart && o.timestamp <= tEnd);
        const pRev = periodOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        running += pRev;

        return {
          label: idx === count - 1 ? 'Latest' : `Phase ${idx + 1}`,
          date: new Date(tEnd).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          revenue: chartView === 'area' ? running : pRev,
          orders: periodOrders.length,
        };
      });
      if (chartView === 'area') {
        trajectoryPoints[trajectoryPoints.length - 1].revenue = totalRevenue;
        trajectoryPoints[trajectoryPoints.length - 1].orders = Math.max(
          trajectoryPoints[trajectoryPoints.length - 1].orders,
          orders.length
        );
      }
    }

    return {
      totalRevenue,
      inTransitRevenue,
      pendingPackingRevenue,
      deliveredRevenue,
      averageOrderValue,
      deliverySuccessRate,
      totalStockValue,
      totalMrpValue,
      totalDiscountSavings,
      avgDiscountPercent,
      confirmedOrders,
      inTransitOrders,
      deliveredOrders,
      lowStockItems,
      topSellers,
      totalItemsSold,
      topCities,
      consoles,
      controllers,
      games,
      accessories,
      consolesVal,
      controllersVal,
      gamesVal,
      accessoriesVal,
      trajectoryPoints,
    };
  }, [products, orders, timeframe, chartView]);

  // Export Store Orders & Financial Report (Clean CSV for Accounting)
  const handleExportOwnerCSV = () => {
    const headers = [
      'Order ID',
      'Date & Time',
      'Customer Name',
      'Phone Number',
      'Delivery City',
      'Delivery State',
      'Items Purchased',
      'Total Amount (₹)',
      'Payment Method',
      'Order Status',
    ];

    const orderRows = orders.map((o) => {
      const itemsSummary = (o.items || [])
        .map((it) => `${it.product?.name || 'Item'} (x${it.quantity || 1})`)
        .join('; ');

      return [
        o.id,
        o.date,
        o.customer?.fullName || 'Guest Buyer',
        o.customer?.phone || '',
        o.customer?.city || '',
        o.customer?.state || '',
        itemsSummary,
        o.total || 0,
        (o.customer?.paymentMethod || 'Online').toUpperCase(),
        o.status,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...orderRows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `djn_store_sales_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG Chart Geometry
  const chartHeight = 200;
  const chartWidth = 760;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;

  const innerW = chartWidth - padLeft - padRight;
  const innerH = chartHeight - padTop - padBottom;

  const maxRevenue = Math.max(...stats.trajectoryPoints.map((d) => d.revenue), 1000) * 1.18;

  const points = stats.trajectoryPoints.map((pt, i) => {
    const x = padLeft + (i / Math.max(1, stats.trajectoryPoints.length - 1)) * innerW;
    const y = padTop + innerH - (pt.revenue / maxRevenue) * innerH;
    return { ...pt, x, y };
  });

  const linePath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padTop + innerH} L ${points[0]?.x || 0} ${padTop + innerH} Z`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. STORE OWNER TOP BAR */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Store Overview
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-xl">
              Sales, orders to pack, and inventory summary.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Timeframe Filter */}
            <div className="bg-black/25 backdrop-blur-md p-1 rounded-2xl border border-white/15 flex items-center gap-1">
              {[
                { id: '7d', label: 'Last 7 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: '90d', label: '90 Days' },
                { id: 'all', label: 'All Time' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    timeframe === tf.id
                      ? 'bg-white text-blue-700 shadow-md scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Export Business CSV */}
            <button
              onClick={handleExportOwnerCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              title="Download customer orders spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Download Orders (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Action 1: Pending Orders to Pack */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all ${
            stats.confirmedOrders.length > 0
              ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 shadow-xs'
              : 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-2xl shrink-0 ${
                  stats.confirmedOrders.length > 0
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {stats.confirmedOrders.length > 0 ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {stats.confirmedOrders.length > 0
                    ? `Orders to Pack (${stats.confirmedOrders.length})`
                    : 'No Orders Waiting for Packing'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {stats.confirmedOrders.length > 0
                    ? `₹${stats.pendingPackingRevenue.toLocaleString(
                        'en-IN'
                      )} in confirmed orders ready for dispatch.`
                    : 'All placed orders have been dispatched.'}
                </p>
              </div>
            </div>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('orders')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                  stats.confirmedOrders.length > 0
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <span>View Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action 2: Low Stock Warning */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all ${
            stats.lowStockItems.length > 0
              ? 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 shadow-xs'
              : 'bg-gray-50 dark:bg-[#111827] border-gray-200/80 dark:border-gray-800'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-2xl shrink-0 ${
                  stats.lowStockItems.length > 0
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-blue-500 text-white'
                }`}
              >
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {stats.lowStockItems.length > 0
                    ? `Low Stock Items (${stats.lowStockItems.length})`
                    : 'Stock Levels Normal'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {stats.lowStockItems.length > 0
                    ? `${stats.lowStockItems
                        .slice(0, 2)
                        .map((p) => p.name)
                        .join(', ')} running low.`
                    : 'All catalog titles currently have stock.'}
                </p>
              </div>
            </div>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('products')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 bg-white dark:bg-gray-800 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                <span>View Stock</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 3. CORE STORE NUMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Sales */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              {orders.length} orders recorded
            </span>
            <span className="text-gray-400 text-[11px]">Gross total</span>
          </div>
        </div>

        {/* Metric 2: Average Order Value */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Average Order Value</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            ₹{stats.averageOrderValue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-semibold text-[11px] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              {stats.totalItemsSold} items purchased
            </span>
            <span className="text-gray-400 text-[11px]">Per order</span>
          </div>
        </div>

        {/* Metric 3: Stock Value */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Inventory Value</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            ₹{stats.totalStockValue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-semibold text-[11px]">
              {products.length} units in stock
            </span>
            <span className="text-gray-400 text-[11px]">Available now</span>
          </div>
        </div>

        {/* Metric 4: Deliveries */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Delivery Success</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {stats.deliverySuccessRate}%
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-semibold text-[11px]">
              {stats.deliveredOrders.length} delivered, {stats.inTransitOrders.length} in transit
            </span>
            <span className="text-gray-400 text-[11px]">Blue Dart</span>
          </div>
        </div>

      </div>

      {/* 4. SALES GRAPH: How much money did you make over time? */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Sales &amp; Cash Flow Trend
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Exact rupees earned from customer orders over your selected timeframe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setChartView('bar')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  chartView === 'bar'
                    ? 'bg-white dark:bg-[#111827] text-blue-600 shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Earnings Per Period
              </button>
              <button
                onClick={() => setChartView('area')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  chartView === 'area'
                    ? 'bg-white dark:bg-[#111827] text-blue-600 shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Cumulative Growth
              </button>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full overflow-x-auto no-scrollbar pt-2">
          <div className="min-w-[680px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="ownerRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="ownerBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                const y = padTop + innerH - ratio * innerH;
                const valueLabel = Math.round((maxRevenue * ratio) / 1000);
                return (
                  <g key={idx}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={chartWidth - padRight}
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      className="text-gray-200 dark:text-gray-800"
                      strokeWidth="1"
                    />
                    <text
                      x={padLeft - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="text-[10px] fill-gray-400 font-mono font-medium"
                    >
                      ₹{valueLabel}k
                    </text>
                  </g>
                );
              })}

              {/* Bar View */}
              {chartView === 'bar' &&
                points.map((pt, i) => {
                  const barW = Math.max(32, innerW / (points.length * 2.2));
                  const barH = Math.max(4, padTop + innerH - pt.y);
                  return (
                    <rect
                      key={i}
                      x={pt.x - barW / 2}
                      y={pt.y}
                      width={barW}
                      height={barH}
                      rx="6"
                      fill="url(#ownerBarGrad)"
                      className="transition-all hover:brightness-110 cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}

              {/* Area View */}
              {chartView === 'area' && <path d={areaPath} fill="url(#ownerRevGrad)" />}
              {chartView === 'area' && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              )}

              {/* Points & Labels */}
              {points.map((pt, i) => {
                const isHovered = hoveredPoint === i;
                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 7 : 4}
                      fill="#FFFFFF"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                    />
                    <text
                      x={pt.x}
                      y={padTop + innerH + 20}
                      textAnchor="middle"
                      className={`text-[11px] font-semibold ${
                        isHovered
                          ? 'fill-blue-600 dark:fill-blue-400 font-bold'
                          : 'fill-gray-400 dark:fill-gray-500'
                      }`}
                    >
                      {pt.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating Tooltip */}
          {hoveredPoint !== null && points[hoveredPoint] && (
            <div
              className="absolute pointer-events-none z-20 p-3 rounded-2xl bg-gray-900/95 text-white shadow-xl backdrop-blur-md border border-white/20 text-xs animate-in zoom-in-95 duration-100"
              style={{
                left: `clamp(10px, ${points[hoveredPoint].x - 60}px, calc(100% - 160px))`,
                top: `${Math.max(10, points[hoveredPoint].y - 80)}px`,
              }}
            >
              <div className="font-semibold text-gray-400 text-[10px] uppercase">
                {points[hoveredPoint].date}
              </div>
              <div className="text-base font-black text-white font-mono mt-0.5">
                ₹{points[hoveredPoint].revenue.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-1">
                {points[hoveredPoint].orders} Customer Purchases
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. SECTIONS: BEST SELLERS & CUSTOMER LOCATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Selling Products */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Top Selling Items
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Products generating the most sales.
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-2 pt-1">
            {stats.topSellers.map((item, idx) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#1a2333]/50 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-contain bg-white dark:bg-gray-900 p-0.5 border border-gray-200 dark:border-gray-700 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                      <span className="px-1.5 py-0.2 rounded font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {item.platform}
                      </span>
                      {(item as any).isRealSale ? (
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {item.unitsSold} sold
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium">In Stock</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs text-gray-900 dark:text-white block">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {(item as any).isRealSale
                      ? `₹${item.totalEarned.toLocaleString('en-IN')}`
                      : 'Price'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Locations */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                Customer Locations
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cities where orders have been placed.
              </p>
            </div>
            <span className="text-xs font-medium text-gray-500">
              Domestic Shipping
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {stats.topCities.length > 0 ? (
              stats.topCities.map((cityData, idx) => {
                const percentOfTotal =
                  stats.totalRevenue > 0
                    ? Math.round((cityData.total / stats.totalRevenue) * 100)
                    : 100;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#1a2333]/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>
                          {cityData.city}, {cityData.state}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">
                          ₹{cityData.total.toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-400 text-[10px] ml-1.5">
                          ({cityData.count} order{cityData.count > 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${percentOfTotal}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-400 text-xs">
                Customer delivery locations will appear here as orders are placed.
              </div>
            )}

            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200 mt-3">
              <span className="flex items-center gap-1.5 font-semibold">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Integrated Delivery Partner
              </span>
              <strong className="font-bold text-gray-900 dark:text-white">Blue Dart Express</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 6. WHERE IS YOUR MONEY TIED UP? (Stock Valuation by Category) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Boxes className="w-4 h-4 text-indigo-600" />
              Shelf Inventory &amp; Capital Breakdown
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              See how much money is currently invested in each product category.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            ₹{stats.totalStockValue.toLocaleString('en-IN')} Total Shop Capital
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 text-xs">
          
          {/* Pre-Owned Games */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Disc className="w-4 h-4 text-blue-600" />
                Pre-Owned Games
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                {stats.games.length} Discs
              </span>
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
              ₹{stats.gamesVal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Avg game value: ₹
              {stats.games.length > 0 ? Math.round(stats.gamesVal / stats.games.length).toLocaleString('en-IN') : 0}
            </p>
          </div>

          {/* Consoles */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-indigo-600" />
                Gaming Consoles
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                {stats.consoles.length} Units
              </span>
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
              ₹{stats.consolesVal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Avg console value: ₹
              {stats.consoles.length > 0 ? Math.round(stats.consolesVal / stats.consoles.length).toLocaleString('en-IN') : 0}
            </p>
          </div>

          {/* Controllers */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-emerald-600" />
                Controllers
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                {stats.controllers.length} Units
              </span>
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
              ₹{stats.controllersVal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              PS5 DualSense &amp; Xbox Controllers
            </p>
          </div>

          {/* Accessories */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-600" />
                Accessories
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">
                {stats.accessories.length} Items
              </span>
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
              ₹{stats.accessoriesVal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Cables, charging docks &amp; drives
            </p>
          </div>

        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
          <span>
            Average Discount Provided to Customers:{' '}
            <strong className="text-emerald-600 font-bold">{stats.avgDiscountPercent}% Below Retail MRP</strong>
          </span>
          <span>
            Total Customer Savings Offered:{' '}
            <strong className="text-gray-900 dark:text-white font-bold">
              ₹{stats.totalDiscountSavings.toLocaleString('en-IN')}
            </strong>
          </span>
        </div>
      </div>

    </div>
  );
};
