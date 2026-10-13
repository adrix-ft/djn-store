import React, { useState, useMemo } from 'react';
import {
  Product,
  Category,
  Platform,
  Condition,
  SiteConfig,
  Order,
} from '../types/store';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';
import { PRODUCTS } from '../data/products';
import {
  upsertProductToDB,
  deleteProductFromDB,
  upsertSiteConfigToDB,
  updateOrderStatusInDB,
  updateAdminCredentials,
} from '../lib/supabase';
import {
  Package,
  Settings,
  ShoppingBag,
  Database,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  LogOut,
  Save,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Mail,
  Instagram,
  Tag,
  ShieldAlert,
  ArrowLeft,
  DollarSign,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  Gamepad2,
  Disc,
  CreditCard,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Filter,
  Copy,
  MessageSquare,
  CheckCircle2,
  Clock,
  Truck,
  Send,
  Sliders,
  KeyRound,
  User,
  Lock,
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (newConfig: SiteConfig) => void;
  orders: Order[];
  onUpdateOrders: (newOrders: Order[]) => void;
  onExit: () => void;
  onLogout: () => void;
  showToast: (msg: string) => void;
}

type AdminTab = 'products' | 'orders' | 'content' | 'backup' | 'security';

type ProductNavTab =
  | 'all'
  | 'consoles'
  | 'controllers'
  | 'accessories'
  | 'ps5_games'
  | 'ps4_games'
  | 'xbox_games';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onUpdateProducts,
  siteConfig,
  onUpdateSiteConfig,
  orders,
  onUpdateOrders,
  onExit,
  onLogout,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [activeProductTab, setActiveProductTab] = useState<ProductNavTab>('all');

  // Search & Filters for Products
  const [productSearch, setProductSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'in' | 'out' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'stock-desc' | 'name-asc'>('featured');

  // Pagination for Products Table (20 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Search & Filter for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product Editor Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalTab, setModalTab] = useState<'basic' | 'pricing' | 'specs' | 'warranty'>('basic');

  // Delete Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Site Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  // Backup / Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  // Blank product baseline
  const blankProduct: Product = {
    id: '',
    name: '',
    subtitle: '',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 4999,
    price: 3999,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 15,
    inStock: true,
    stockCount: 5,
    badge: 'NEW ARRIVAL',
    features: ['100% Genuine Certified', 'Bench tested and verified by DJN Tech'],
    description: 'High quality gaming product inspected and verified by DJN Tech.',
    inTheBox: ['Original Retail Item', 'Verification Certificate'],
    warranty: '7-Day Replacement Guarantee',
    themeColor: '#00439c',
    imageUrl: '',
    reviews: [],
  };

  const [productForm, setProductForm] = useState<Product>(blankProduct);
  const [featuresText, setFeaturesText] = useState('');
  const [inTheBoxText, setInTheBoxText] = useState('');

  // Admin Security & Database Credentials
  const [secUsername, setSecUsername] = useState(() => {
    return localStorage.getItem('djn_admin_active_user') || 'admin';
  });
  const [secNewPassword, setSecNewPassword] = useState('');
  const [secConfirmPassword, setSecConfirmPassword] = useState('');
  const [showSecPassword, setShowSecPassword] = useState(false);
  const [secLoading, setSecLoading] = useState(false);
  const [secMessage, setSecMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateAdminSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secUsername.trim()) {
      setSecMessage({ type: 'error', text: 'Username cannot be empty.' });
      return;
    }
    if (secNewPassword.length < 6) {
      setSecMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (secNewPassword !== secConfirmPassword) {
      setSecMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setSecLoading(true);
    setSecMessage(null);

    const res = await updateAdminCredentials(secUsername, secNewPassword);
    setSecLoading(false);
    if (res.success) {
      setSecMessage({ type: 'success', text: res.message || 'Credentials updated successfully!' });
      setSecNewPassword('');
      setSecConfirmPassword('');
      showToast('Admin credentials updated and synced to database');
    } else {
      setSecMessage({ type: 'error', text: res.message || 'Failed to update credentials.' });
    }
  };

  // Key Metrics
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stockCount || 0), 0);
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  // Product Category Navigation Pills with Live Counts
  const productNavTabs = useMemo(
    () => [
      {
        id: 'all' as ProductNavTab,
        label: 'All Catalog',
        icon: Layers,
        count: products.length,
      },
      {
        id: 'consoles' as ProductNavTab,
        label: 'Consoles',
        icon: Gamepad2,
        count: products.filter((p) => p.category === 'consoles').length,
      },
      {
        id: 'controllers' as ProductNavTab,
        label: 'Controllers',
        icon: Gamepad2,
        count: products.filter((p) => p.category === 'controllers').length,
      },
      {
        id: 'accessories' as ProductNavTab,
        label: 'Accessories',
        icon: Sparkles,
        count: products.filter((p) => p.category === 'accessories').length,
      },
      {
        id: 'ps5_games' as ProductNavTab,
        label: 'PS5 Games',
        icon: Disc,
        count: products.filter(
          (p) => p.category === 'preowned_games' && p.platform === 'PS5'
        ).length,
      },
      {
        id: 'ps4_games' as ProductNavTab,
        label: 'PS4 Games',
        icon: Disc,
        count: products.filter(
          (p) => p.category === 'preowned_games' && p.platform === 'PS4'
        ).length,
      },
      {
        id: 'xbox_games' as ProductNavTab,
        label: 'Xbox Games',
        icon: Disc,
        count: products.filter(
          (p) => p.category === 'preowned_games' && p.platform === 'Xbox'
        ).length,
      },
    ],
    [products]
  );

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Tab filter
        let matchesTab = true;
        if (activeProductTab === 'consoles') matchesTab = p.category === 'consoles';
        else if (activeProductTab === 'controllers') matchesTab = p.category === 'controllers';
        else if (activeProductTab === 'accessories') matchesTab = p.category === 'accessories';
        else if (activeProductTab === 'ps5_games') matchesTab = p.category === 'preowned_games' && p.platform === 'PS5';
        else if (activeProductTab === 'ps4_games') matchesTab = p.category === 'preowned_games' && p.platform === 'PS4';
        else if (activeProductTab === 'xbox_games') matchesTab = p.category === 'preowned_games' && p.platform === 'Xbox';

        // Search query
        const q = productSearch.trim().toLowerCase();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
          p.id.toLowerCase().includes(q);

        // Stock status
        let matchesStock = true;
        if (stockFilter === 'in') matchesStock = p.inStock;
        else if (stockFilter === 'out') matchesStock = !p.inStock;
        else if (stockFilter === 'low') matchesStock = p.inStock && (p.stockCount || 0) <= 2;

        return matchesTab && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'stock-desc') return (b.stockCount || 0) - (a.stockCount || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // default featured
      });
  }, [products, activeProductTab, productSearch, stockFilter, sortBy]);

  // Paginated Slices
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  const handleTabChange = (tab: ProductNavTab) => {
    setActiveProductTab(tab);
    setCurrentPage(1);
  };

  // Open Add Product Modal with smart defaults based on active tab
  const handleOpenAddProduct = () => {
    const newId = `product-${Date.now()}`;
    setEditingProduct(null);
    setModalTab('basic');

    let initialCategory: Category = 'consoles';
    let initialPlatform: Platform = 'PS5';

    if (activeProductTab === 'consoles') {
      initialCategory = 'consoles';
      initialPlatform = 'PS5';
    } else if (activeProductTab === 'controllers') {
      initialCategory = 'controllers';
      initialPlatform = 'PS5';
    } else if (activeProductTab === 'accessories') {
      initialCategory = 'accessories';
      initialPlatform = 'Universal';
    } else if (activeProductTab === 'ps5_games') {
      initialCategory = 'preowned_games';
      initialPlatform = 'PS5';
    } else if (activeProductTab === 'ps4_games') {
      initialCategory = 'preowned_games';
      initialPlatform = 'PS4';
    } else if (activeProductTab === 'xbox_games') {
      initialCategory = 'preowned_games';
      initialPlatform = 'Xbox';
    }

    setProductForm({
      ...blankProduct,
      id: newId,
      category: initialCategory,
      platform: initialPlatform,
    });
    setFeaturesText(blankProduct.features.join('\n'));
    setInTheBoxText(blankProduct.inTheBox.join('\n'));
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setFeaturesText((product.features || []).join('\n'));
    setInTheBoxText((product.inTheBox || []).join('\n'));
    setModalTab('basic');
    setIsProductModalOpen(true);
  };

  // Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Product title is required.');
      return;
    }

    const calculatedDiscount =
      productForm.mrp > productForm.price
        ? Math.round(((productForm.mrp - productForm.price) / productForm.mrp) * 100)
        : 0;

    const updatedProduct: Product = {
      ...productForm,
      discountPercent: calculatedDiscount,
      features: featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      inTheBox: inTheBoxText
        .split('\n')
        .map((b) => b.trim())
        .filter(Boolean),
    };

    if (editingProduct) {
      const nextProducts = products.map((p) =>
        p.id === editingProduct.id ? updatedProduct : p
      );
      onUpdateProducts(nextProducts);
      upsertProductToDB(updatedProduct).catch(console.error);
      showToast(`Updated "${updatedProduct.name}" in catalog`);
    } else {
      onUpdateProducts([updatedProduct, ...products]);
      upsertProductToDB(updatedProduct).catch(console.error);
      showToast(`Added new product "${updatedProduct.name}"`);
    }

    setIsProductModalOpen(false);
  };

  // Quick In-Stock Toggle
  const handleToggleStock = (productId: string) => {
    let updatedTarget: Product | undefined;
    const nextProducts = products.map((p) => {
      if (p.id === productId) {
        const nextInStock = !p.inStock;
        const nextStockCount = nextInStock ? (p.stockCount && p.stockCount > 0 ? p.stockCount : 1) : 0;
        updatedTarget = { ...p, inStock: nextInStock, stockCount: nextStockCount };
        return updatedTarget;
      }
      return p;
    });
    onUpdateProducts(nextProducts);
    if (updatedTarget) {
      upsertProductToDB(updatedTarget).catch(console.error);
    }
    const target = products.find((p) => p.id === productId);
    showToast(
      `${target?.name || 'Product'} marked ${target?.inStock ? 'Out of Stock' : 'In Stock'}`
    );
  };

  // Quick Inline Stock Quantity Adjuster (+1 / -1)
  const handleAdjustStockUnits = (productId: string, delta: number) => {
    let updatedTarget: Product | undefined;
    const nextProducts = products.map((p) => {
      if (p.id === productId) {
        const newCount = Math.max(0, (p.stockCount || 0) + delta);
        updatedTarget = {
          ...p,
          stockCount: newCount,
          inStock: newCount > 0,
        };
        return updatedTarget;
      }
      return p;
    });
    onUpdateProducts(nextProducts);
    if (updatedTarget) {
      upsertProductToDB(updatedTarget).catch(console.error);
    }
    showToast(`Updated stock count to ${updatedTarget?.stockCount || 0} units`);
  };

  // Delete product
  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const nextProducts = products.filter((p) => p.id !== productToDelete.id);
    onUpdateProducts(nextProducts);
    deleteProductFromDB(productToDelete.id).catch(console.error);
    showToast(`Deleted "${productToDelete.name}" from catalog`);
    setProductToDelete(null);
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const nextOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    onUpdateOrders(nextOrders);
    updateOrderStatusInDB(orderId, status).catch(console.error);
    showToast(`Order #${orderId} marked as ${status}`);
  };

  // Open WhatsApp Customer Notification
  const handleSendWhatsAppUpdate = (order: Order) => {
    const cleanPhone = (order.customer.phone || '').replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const itemsSummary = order.items
      .map((it) => `${it.product.name} (x${it.quantity})`)
      .join(', ');
    const message = encodeURIComponent(
      `Hello ${order.customer.fullName}! 👋\n\nYour order #${order.id} from *DJN Tech Console Store* is currently: *${order.status.toUpperCase()}*.\n\n📦 *Items:* ${itemsSummary}\n💰 *Total:* ₹${order.total.toLocaleString('en-IN')}\n\nThank you for choosing DJN Tech!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  // Save Site Configuration
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configForm);
    upsertSiteConfigToDB(configForm).catch(console.error);
    showToast('Website banners, promo codes & contact details saved!');
  };

  // Export JSON
  const handleExportProductsJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'djn-products-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded products catalog backup (JSON)');
  };

  const handleExportSiteConfigJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(siteConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'djn-site-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded site-config backup (JSON)');
  };

  // Import JSON
  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
        onUpdateProducts(parsed);
        setImportJsonText('');
        setImportError(null);
        showToast(`Successfully imported ${parsed.length} products!`);
      } else {
        setImportError('Invalid format: JSON must be an array of Product objects.');
      }
    } catch (err: any) {
      setImportError(`Failed to parse JSON: ${err.message}`);
    }
  };

  // Reset to Factory Default
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default catalog and settings? Any custom added products will be reset.'
      )
    ) {
      onUpdateProducts(PRODUCTS);
      onUpdateSiteConfig(DEFAULT_SITE_CONFIG);
      setConfigForm(DEFAULT_SITE_CONFIG);
      localStorage.removeItem('djn_products_v6');
      localStorage.removeItem('djn_site_config');
      showToast('Restored store catalog to default factory settings.');
    }
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = orderSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.email.toLowerCase().includes(q);

      const matchesStatus =
        orderStatusFilter === 'all' || o.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
      
      {/* TOP EXECUTIVE HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 shadow-2xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Live Connection Indicator */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              DJN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white leading-none tracking-tight">
                  Store Management Console
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Supabase Live Sync
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Enterprise control for catalog, physical inventory & orders
              </p>
            </div>
          </div>

          {/* Quick Actions & Exit Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Product</span>
            </button>

            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              title="Return to customer store view"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Store</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              title="Lock & Exit Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* SUB-HEADER / TAB NAVIGATION BAR */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          
          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {[
              { id: 'products' as AdminTab, label: 'Product Catalog', count: products.length, icon: Package },
              { id: 'orders' as AdminTab, label: 'Customer Orders', count: orders.length, icon: ShoppingBag },
              { id: 'content' as AdminTab, label: 'Banners & Marketing', count: null, icon: Settings },
              { id: 'backup' as AdminTab, label: 'Backup & Restore', count: null, icon: Database },
              { id: 'security' as AdminTab, label: 'Admin Security', count: null, icon: KeyRound },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>Currency: <strong className="text-gray-800 dark:text-gray-200">INR (₹)</strong></span>
            <span>·</span>
            <span>Total Physical Units: <strong className="text-blue-600 dark:text-blue-400">{totalStockUnits}</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* EXECUTIVE KPI DASHBOARD STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* KPI 1: Total Catalog & Physical Units */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Catalog Titles</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {totalProducts}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{totalStockUnits} physical discs & units in inventory</span>
            </div>
          </div>

          {/* KPI 2: Gross Orders Revenue */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Gross Orders</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2">
              {totalOrders} customer checkouts tracked
            </div>
          </div>

          {/* KPI 3: Stock Status Health */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Stock Health</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {inStockCount} Active
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-2">
              {outOfStockCount > 0 ? (
                <span className="text-red-500 font-bold">{outOfStockCount} out of stock</span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400">100% catalog in stock</span>
              )}
            </div>
          </div>

          {/* KPI 4: Active Store Promotions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs relative overflow-hidden group hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Promo Code</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
              {siteConfig.promoCode}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-2">
              {siteConfig.promoDiscountPercent}% OFF at checkout
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Category Navigation Ribbon (1:1 Mirror of Store Navigation) */}
            <div className="p-1.5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {productNavTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeProductTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Controls Bar: Search, Filters, Sorting, and Add Product */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-2.5">
                
                {/* Search Field */}
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={`Search titles, ID, platform in ${
                      productNavTabs.find((t) => t.id === activeProductTab)?.label || 'products'
                    }...`}
                    className="w-full pl-10 pr-8 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                  {productSearch && (
                    <button
                      onClick={() => {
                        setProductSearch('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Stock Status Filter */}
                <select
                  value={stockFilter}
                  onChange={(e) => {
                    setStockFilter(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">All Stock Status</option>
                  <option value="in">In Stock Only</option>
                  <option value="out">Out of Stock Only</option>
                  <option value="low">Low Stock (≤ 2 units)</option>
                </select>

                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock-desc">Stock Quantity (High first)</option>
                  <option value="name-asc">Title: A to Z</option>
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddProduct}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Data Table */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 dark:bg-[#161f30] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-200/80 dark:border-gray-800">
                      <th className="py-3.5 px-4">Product Details & Cover</th>
                      <th className="py-3.5 px-3">Category</th>
                      <th className="py-3.5 px-3">Condition</th>
                      <th className="py-3.5 px-3">Price & MRP</th>
                      <th className="py-3.5 px-4">Inventory Stepper</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-gray-400 dark:text-gray-500">
                          <Package className="w-12 h-12 mx-auto mb-3 opacity-30 stroke-[1.5]" />
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            No products found matching filters
                          </p>
                          <p className="text-xs mt-1 text-gray-500">
                            Try resetting search keywords or switching category tabs.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-blue-50/30 dark:hover:bg-[#1a2333]/50 transition-colors group"
                        >
                          {/* Title & Cover Art */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs group-hover:border-blue-500/40 transition-colors">
                                {p.imageUrl ? (
                                  <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLImageElement).src =
                                        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg';
                                    }}
                                  />
                                ) : (
                                  <Package className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="min-w-0 max-w-xs sm:max-w-md">
                                <div className="font-bold text-gray-900 dark:text-white truncate text-[13px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {p.name}
                                </div>
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                  {p.subtitle || p.category}
                                </div>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">
                                    {p.platform}
                                  </span>
                                  {p.badge && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40 truncate max-w-[120px]">
                                      {p.badge}
                                    </span>
                                  )}
                                  <span className="text-[9px] font-mono text-gray-400 hidden sm:inline">
                                    ID: {p.id}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
                              {p.category.replace('_', ' ')}
                            </span>
                          </td>

                          {/* Condition */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                              {p.condition}
                            </span>
                          </td>

                          {/* Price & MRP */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <div className="font-bold text-gray-900 dark:text-white text-sm">
                              ₹{p.price.toLocaleString('en-IN')}
                            </div>
                            {p.mrp > p.price && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] text-gray-400 line-through">
                                  ₹{p.mrp.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                  {p.discountPercent}% OFF
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Inventory Stepper & Quick Toggle */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {/* Stock Count Stepper */}
                              <div className="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80 p-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleAdjustStockUnits(p.id, -1)}
                                  title="Decrease stock unit by 1"
                                  className="w-6 h-6 flex items-center justify-center rounded text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 cursor-pointer font-bold transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-bold text-xs text-gray-900 dark:text-white">
                                  {p.stockCount || 0}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAdjustStockUnits(p.id, 1)}
                                  title="Increase stock unit by 1"
                                  className="w-6 h-6 flex items-center justify-center rounded text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 cursor-pointer font-bold transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              {/* In/Out Pill */}
                              <button
                                type="button"
                                onClick={() => handleToggleStock(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                  p.inStock
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 hover:bg-red-200'
                                }`}
                              >
                                {p.inStock ? 'In Stock' : 'Out of Stock'}
                              </button>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                                title="Edit Product Specs & Pricing"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setProductToDelete(p)}
                                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50 dark:bg-[#161f30]/50">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Showing <strong className="text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                    <strong className="text-gray-900 dark:text-white">
                      {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                    </strong>{' '}
                    of <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> items
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <span className="px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Orders Header & Search Toolbar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by Order ID, customer name, phone, or email..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">All Order Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {orders.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all order records?')) {
                      onUpdateOrders([]);
                      showToast('Cleared order history');
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  Clear History
                </button>
              )}
            </div>

            {/* Orders Feed */}
            {filteredOrders.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs text-gray-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 stroke-[1.5]" />
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">No orders found</p>
                <p className="text-xs mt-1 text-gray-500">
                  When customers complete checkout, their order details and shipping info will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredOrders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4 hover:border-blue-500/30 transition-colors"
                  >
                    {/* Top Row: ID, Date, Status & WhatsApp Dispatch Button */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                          #{o.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{o.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleSendWhatsAppUpdate(o)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 text-xs font-bold transition-colors cursor-pointer"
                          title="Open WhatsApp to send customer order notification"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Notify via WhatsApp</span>
                        </button>

                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(o.id, e.target.value as Order['status'])
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Shipping Summary Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                          Customer
                        </span>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {o.customer.fullName}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {o.customer.phone}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {o.customer.email}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                          Shipping Address
                        </span>
                        <p className="text-gray-800 dark:text-gray-200 leading-snug">
                          {o.customer.address}
                        </p>
                        <p className="text-gray-500 font-medium">
                          {o.customer.city}, {o.customer.state} - {o.customer.pincode}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                          Payment & Total
                        </span>
                        <p className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                          ₹{o.total.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              o.customer.paymentMethod === 'razorpay'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {o.customer.paymentMethod === 'razorpay' ? 'Razorpay (Paid Online)' : o.customer.paymentMethod}
                          </span>
                        </div>
                        {o.customer.paymentId && (
                          <span className="block text-[10px] font-mono text-gray-400 mt-0.5 truncate">
                            Txn ID: {o.customer.paymentId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ordered Items List */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold mb-2">
                        Purchased Items ({o.items.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {o.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-gray-50 dark:bg-[#1a2333]/60 border border-gray-100 dark:border-gray-800"
                          >
                            <span className="font-medium text-gray-800 dark:text-gray-200 truncate pr-2">
                              {item.product.name} <strong className="text-blue-600">(x{item.quantity})</strong>
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white shrink-0">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WEBSITE BANNERS & MARKETING SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveSiteConfig} className="space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Store Contact & Customer Support
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Controls phone numbers, WhatsApp quick links, and official email across the entire website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Store Phone / Calling Number *</label>
                  <input
                    type="text"
                    required
                    value={configForm.phone}
                    onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                    placeholder="+91 84464 39374"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Displayed in header, footer & contact support buttons.
                  </span>
                </div>

                <div>
                  <label className="font-semibold block mb-1">WhatsApp Digits (without + or spaces) *</label>
                  <input
                    type="text"
                    required
                    value={configForm.whatsappNumber}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        whatsappNumber: e.target.value.replace(/\D/g, ''),
                      })
                    }
                    placeholder="918446439374"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Used for direct wa.me chat links (e.g. 918446439374).
                  </span>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Store Support Email *</label>
                  <input
                    type="email"
                    required
                    value={configForm.email}
                    onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                    placeholder="contact@djntech.in"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Instagram Profile Link</label>
                  <input
                    type="url"
                    value={configForm.instagram}
                    onChange={(e) => setConfigForm({ ...configForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/djntech"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Announcement Ticker & Promo Code */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Tag className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Announcement Marquee & Promo Code
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Update the infinite scrolling ticker bar and active checkout coupon code.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Running Marquee Announcement Ticker</label>
                  <textarea
                    rows={2}
                    value={configForm.marqueeAnnouncement}
                    onChange={(e) => setConfigForm({ ...configForm, marqueeAnnouncement: e.target.value })}
                    placeholder="⚡ FLAT 10% OFF ON ALL PRE-OWNED PS4 & PS5 GAMES · USE CODE: DJN10 · FREE SHIPPING ACROSS INDIA"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Live Marquee Ticker Preview */}
                  <div className="mt-2 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 text-[11px] text-blue-700 dark:text-blue-300 overflow-hidden whitespace-nowrap">
                    <strong>Preview: </strong> {configForm.marqueeAnnouncement}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">Active Coupon Code *</label>
                    <input
                      type="text"
                      required
                      value={configForm.promoCode}
                      onChange={(e) => setConfigForm({ ...configForm, promoCode: e.target.value.toUpperCase() })}
                      placeholder="DJN10"
                      className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs uppercase font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Promo Discount Percentage (%) *</label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      required
                      value={configForm.promoDiscountPercent}
                      onChange={(e) => setConfigForm({ ...configForm, promoDiscountPercent: Number(e.target.value) })}
                      className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Gateway (Razorpay) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Razorpay Payment Gateway API
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powers instant UPI, Credit/Debit cards, NetBanking and EMI checkout.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Razorpay Key ID (Live / Test)</label>
                  <input
                    type="text"
                    value={configForm.razorpayKeyId || ''}
                    onChange={(e) => setConfigForm({ ...configForm, razorpayKeyId: e.target.value.trim() })}
                    placeholder="rzp_live_... or rzp_test_..."
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex flex-col justify-center">
                  <span className="font-bold flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    256-Bit SSL Encryption Active
                  </span>
                  <span>
                    When configured, customers can pay directly with UPI, Cards, NetBanking or EMI.
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Website Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BACKUP & DATA MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            
            {/* Export JSON Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Export Backup Data (JSON)
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Download full offline backups of your store catalog and settings.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportProductsJson}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download products.json ({products.length} Items)</span>
                </button>

                <button
                  onClick={handleExportSiteConfigJson}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download site-config.json</span>
                </button>
              </div>
            </div>

            {/* Import JSON Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Upload className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Import Products JSON
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Paste valid Product array JSON to restore or batch-update the catalog.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    setImportError(null);
                  }}
                  placeholder='Paste JSON here (e.g. [{"id": "ps5-slim-disc", "name": "...", ...}])'
                  className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-3 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {importError && (
                  <p className="text-xs text-red-500 font-medium">{importError}</p>
                )}

                <button
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Apply & Import Catalog</span>
                </button>
              </div>
            </div>

            {/* Factory Reset Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-bold text-sm text-red-700 dark:text-red-400">
                    Reset Store to Default Fallback
                  </h3>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">
                    Restore the standard baseline products and clear local override cache.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetToDefaults}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Local Cache</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: ADMIN SECURITY & DATABASE CREDENTIALS */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            
            {/* Header Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-900/40">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    Administrator Authentication & Database Security
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage login credentials, password encryption, and database access controls.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Active Session: Authenticated</span>
              </div>
            </div>

            {/* Change Credentials Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Form Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      Update Admin Username & Password
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Changes are encrypted with SHA-256 and synchronized directly to Supabase.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUpdateAdminSecurity} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-300">
                      Administrator Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={secUsername}
                        onChange={(e) => setSecUsername(e.target.value)}
                        placeholder="e.g. admin or store email"
                        required
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-300">
                      New Security Password (Min 6 characters)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showSecPassword ? 'text' : 'password'}
                        value={secNewPassword}
                        onChange={(e) => setSecNewPassword(e.target.value)}
                        placeholder="Enter strong password"
                        required
                        className="w-full pl-9 pr-10 py-2.5 bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecPassword(!showSecPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        {showSecPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showSecPassword ? 'text' : 'password'}
                        value={secConfirmPassword}
                        onChange={(e) => setSecConfirmPassword(e.target.value)}
                        placeholder="Re-enter password to confirm"
                        required
                        className="w-full pl-9 pr-10 py-2.5 bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {secMessage && (
                    <div
                      className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                        secMessage.type === 'success'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                          : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {secMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      )}
                      <span>{secMessage.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={secLoading}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{secLoading ? 'Syncing with Supabase...' : 'Save & Sync Credentials to Database'}</span>
                  </button>
                </form>
              </div>

              {/* Database & Security Architecture Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      Database Connection Architecture
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your store credentials are saved directly in your PostgreSQL Supabase cluster.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2333] border border-gray-200/70 dark:border-gray-700/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Database Host:</span>
                      <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                        rudqiwifokllmjpfcnbp.supabase.co
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Auth Table:</span>
                      <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                        public.admin_users
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Hashing Standard:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        SHA-256 (Web Crypto API)
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                    <strong className="block font-bold mb-1">
                      💡 Supabase SQL Migration Available:
                    </strong>
                    The SQL file <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">supabase/admin_users.sql</code> has been created. Run it in your Supabase SQL Editor if you ever need to reset or inspect raw user records in PostgreSQL directly.
                  </div>

                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Lock Session & Log Out</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>


      {/* ========================================================================= */}
      {/* PRODUCT ADD / EDIT MODAL WITH LIVE CARD PREVIEW */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-[#161f30]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                    {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Product to Store'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Configure specifications, price, inventory stock, and media
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Sub-Tabs */}
            <div className="px-6 pt-3 pb-0 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto shrink-0 bg-white dark:bg-[#111827]">
              {[
                { id: 'basic' as const, label: '1. Basic Info & Image' },
                { id: 'pricing' as const, label: '2. Pricing & Stock' },
                { id: 'specs' as const, label: '3. Features & In The Box' },
                { id: 'warranty' as const, label: '4. Warranty & Details' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    modalTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body & Live Preview Split */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
              
              {/* Form Input Columns (Left / 7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* SUB-TAB 1: Basic Info & Image */}
                {modalTab === 'basic' && (
                  <div className="space-y-4 animate-in fade-in duration-100">
                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g. PlayStation 5 Slim (Disc Edition)"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        Subtitle / Highlights Line
                      </label>
                      <input
                        type="text"
                        value={productForm.subtitle}
                        onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                        placeholder="e.g. 1TB Custom SSD · 4K 120Hz · Ray Tracing"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Category *</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as Category })}
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="consoles">Consoles</option>
                          <option value="controllers">Controllers</option>
                          <option value="preowned_games">Pre-Owned Games</option>
                          <option value="accessories">Accessories</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Platform *</label>
                        <select
                          value={productForm.platform}
                          onChange={(e) => setProductForm({ ...productForm, platform: e.target.value as Platform })}
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="PS5">PlayStation 5 (PS5)</option>
                          <option value="PS4">PlayStation 4 (PS4)</option>
                          <option value="Xbox">Xbox Series X|S / Xbox One</option>
                          <option value="Switch">Nintendo Switch</option>
                          <option value="Universal">Universal</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        High-Resolution Image URL
                      </label>
                      <input
                        type="url"
                        value={productForm.imageUrl || ''}
                        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                        placeholder="https://... or /hero-ps5-slim.png"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        Direct image link or local path. Instant live preview is visible on the right.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Product Badge</label>
                        <input
                          type="text"
                          value={productForm.badge || ''}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          placeholder="e.g. BESTSELLER, 4K GAMING, GOTY"
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Condition Tag</label>
                        <select
                          value={productForm.condition}
                          onChange={(e) => setProductForm({ ...productForm, condition: e.target.value as Condition })}
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Brand New Sealed">Brand New Sealed</option>
                          <option value="Pre-Owned Grade A+">Pre-Owned Grade A+</option>
                          <option value="Pre-Owned Grade A">Pre-Owned Grade A</option>
                          <option value="DJN Certified Refurbished">DJN Certified Refurbished</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: Pricing & Inventory */}
                {modalTab === 'pricing' && (
                  <div className="space-y-4 animate-in fade-in duration-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                          Selling Price (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                          Original MRP (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={productForm.mrp}
                          onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Auto-Calculated Discount Callout */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                      <span>Calculated Customer Discount:</span>
                      <strong className="text-sm font-black">
                        {productForm.mrp > productForm.price
                          ? `${Math.round(((productForm.mrp - productForm.price) / productForm.mrp) * 100)}% OFF`
                          : '0% OFF'}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                          Physical Stock Quantity
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={productForm.stockCount}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              stockCount: Number(e.target.value),
                              inStock: Number(e.target.value) > 0,
                            })
                          }
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex flex-col justify-end">
                        <label className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.inStock}
                            onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-gray-900 dark:text-white">Mark In Stock</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: Features & In The Box */}
                {modalTab === 'specs' && (
                  <div className="space-y-4 animate-in fade-in duration-100">
                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        Bullet Features (1 per line)
                      </label>
                      <textarea
                        rows={4}
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        placeholder="Slimmer design with 1TB ultra-high speed internal SSD&#10;Haptic feedback and adaptive triggers&#10;Official 1 Year Sony Warranty"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        In The Box Package Items (1 per line)
                      </label>
                      <textarea
                        rows={3}
                        value={inTheBoxText}
                        onChange={(e) => setInTheBoxText(e.target.value)}
                        placeholder="PS5 Slim Console&#10;DualSense Wireless Controller&#10;HDMI 2.1 Cable&#10;Power Cord"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        Long Product Overview / Story
                      </label>
                      <textarea
                        rows={3}
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: Warranty & QA Details */}
                {modalTab === 'warranty' && (
                  <div className="space-y-4 animate-in fade-in duration-100">
                    <div>
                      <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
                        Warranty Terms Text
                      </label>
                      <input
                        type="text"
                        value={productForm.warranty}
                        onChange={(e) => setProductForm({ ...productForm, warranty: e.target.value })}
                        placeholder="e.g. 1 Year Official Sony Warranty + DJN Tech Assured Support"
                        className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Genre / Category Tag</label>
                        <input
                          type="text"
                          value={productForm.genre || ''}
                          onChange={(e) => setProductForm({ ...productForm, genre: e.target.value })}
                          placeholder="e.g. Next-Gen Console, Action RPG"
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Edition</label>
                        <input
                          type="text"
                          value={productForm.edition || ''}
                          onChange={(e) => setProductForm({ ...productForm, edition: e.target.value })}
                          placeholder="e.g. Standard Disc Edition"
                          className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Preview Panel (Right / 5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-200 dark:border-gray-700/80">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-700 text-gray-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Live Customer Card Preview</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>

                  {/* Mock Card Preview */}
                  <div className="w-full max-w-[210px] mx-auto rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
                    <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2 overflow-hidden">
                      {productForm.imageUrl ? (
                        <img
                          src={productForm.imageUrl}
                          alt={productForm.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg';
                          }}
                        />
                      ) : (
                        <Package className="w-10 h-10 text-gray-400 opacity-40" />
                      )}

                      {productForm.badge && (
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#111827] text-white">
                          {productForm.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-3 text-left">
                      <div className="text-[10px] text-gray-400 font-semibold mb-0.5">
                        {productForm.platform} · {productForm.condition}
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-xs truncate">
                        {productForm.name || 'Product Title'}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="font-bold text-gray-900 dark:text-white text-xs">
                          ₹{productForm.price.toLocaleString('en-IN')}
                        </span>
                        {productForm.mrp > productForm.price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹{productForm.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to Store</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Delete "{productToDelete.name}"?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This item will be permanently removed from your online catalog and Supabase database.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 cursor-pointer"
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
