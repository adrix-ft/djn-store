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
  Sliders,
  DollarSign,
  Layers,
  Sparkles,
  Eye,
  Gamepad2,
  Disc,
  CreditCard,
  ShieldCheck,
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

type AdminTab = 'products' | 'content' | 'orders' | 'backup';

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

  // Product Category Navigation Tabs (matching website navigation)
  type ProductNavTab =
    | 'all'
    | 'consoles'
    | 'controllers'
    | 'accessories'
    | 'ps5_games'
    | 'ps4_games'
    | 'xbox_games';

  const [activeProductTab, setActiveProductTab] = useState<ProductNavTab>('all');

  // Search & Filter state for products
  const [productSearch, setProductSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<string>('all');

  // Product Editor Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Site Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  // Backup / Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  // Product Form Initial Blank State
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
    badge: 'New Arrival',
    features: ['100% Genuine Certified', 'Tested and verified by DJN Tech'],
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

  // Stats calculation
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  // Dynamic Product Tabs based on current catalog
  const productNavTabs = useMemo(
    () => [
      {
        id: 'all' as ProductNavTab,
        label: 'All Products',
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
        label: 'XBOX Games',
        icon: Disc,
        count: products.filter(
          (p) => p.category === 'preowned_games' && p.platform === 'Xbox'
        ).length,
      },
    ],
    [products]
  );

  // Filtered Products by active category tab, search query, and stock status
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab matching:
      let matchesTab = true;
      if (activeProductTab === 'consoles') {
        matchesTab = p.category === 'consoles';
      } else if (activeProductTab === 'controllers') {
        matchesTab = p.category === 'controllers';
      } else if (activeProductTab === 'accessories') {
        matchesTab = p.category === 'accessories';
      } else if (activeProductTab === 'ps5_games') {
        matchesTab = p.category === 'preowned_games' && p.platform === 'PS5';
      } else if (activeProductTab === 'ps4_games') {
        matchesTab = p.category === 'preowned_games' && p.platform === 'PS4';
      } else if (activeProductTab === 'xbox_games') {
        matchesTab = p.category === 'preowned_games' && p.platform === 'Xbox';
      }

      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(productSearch.toLowerCase());

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'in' && p.inStock) ||
        (stockFilter === 'out' && !p.inStock);

      return matchesTab && matchesSearch && matchesStock;
    });
  }, [products, activeProductTab, productSearch, stockFilter]);

  // Open Add Product Modal with smart pre-selected category & platform
  const handleOpenAddProduct = () => {
    const newId = `product-${Date.now()}`;
    setEditingProduct(null);

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
    setFeaturesText(product.features.join('\n'));
    setInTheBoxText(product.inTheBox.join('\n'));
    setIsProductModalOpen(true);
  };

  // Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Product name is required.');
      return;
    }

    const calculatedDiscount =
      productForm.mrp > productForm.price
        ? Math.round(
            ((productForm.mrp - productForm.price) / productForm.mrp) * 100
          )
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
      // Update existing
      const nextProducts = products.map((p) =>
        p.id === editingProduct.id ? updatedProduct : p
      );
      onUpdateProducts(nextProducts);
      upsertProductToDB(updatedProduct).catch(console.error);
      showToast(`Updated "${updatedProduct.name}"`);
    } else {
      // Add new
      onUpdateProducts([updatedProduct, ...products]);
      upsertProductToDB(updatedProduct).catch(console.error);
      showToast(`Added new product "${updatedProduct.name}"`);
    }

    setIsProductModalOpen(false);
  };

  // Toggle inStock quick button
  const handleToggleStock = (productId: string) => {
    let updatedTarget: Product | undefined;
    const nextProducts = products.map((p) => {
      if (p.id === productId) {
        updatedTarget = { ...p, inStock: !p.inStock };
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
      `${target?.name || 'Product'} marked ${
        target?.inStock ? 'Out of Stock' : 'In Stock'
      }`
    );
  };

  // Delete product
  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const idToDelete = productToDelete.id;
    const nextProducts = products.filter((p) => p.id !== idToDelete);
    onUpdateProducts(nextProducts);
    deleteProductFromDB(idToDelete).catch(console.error);
    showToast(`Deleted "${productToDelete.name}"`);
    setProductToDelete(null);
  };

  // Save Site Settings
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configForm);
    upsertSiteConfigToDB(configForm).catch(console.error);
    showToast('Website content and contact details updated successfully!');
  };

  // Order status update
  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: Order['status']
  ) => {
    const nextOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    onUpdateOrders(nextOrders);
    updateOrderStatusInDB(orderId, newStatus).catch(console.error);
    showToast(`Order #${orderId} status changed to ${newStatus}`);
  };

  // Export JSON
  const handleExportProductsJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'djn-products.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded products.json catalog backup');
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
    showToast('Downloaded site-config.json backup');
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
      localStorage.removeItem('djn_products_v5');
      localStorage.removeItem('djn_site_config');
      showToast('Restored store catalog to default factory settings.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 transition-colors">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              DJN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  Store Management Console
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Live editor for catalog, website banners & orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              title="Lock & Logout Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
              <span className="text-xs font-medium">Total Products</span>
              <Package className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {totalProducts}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              {inStockCount} In Stock · {outOfStockCount} Out
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
              <span className="text-xs font-medium">Customer Orders</span>
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {totalOrders}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1">
              Tracked via checkout
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
              <span className="text-xs font-medium">Store WhatsApp</span>
              <Phone className="w-4 h-4 text-[#25d366]" />
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white truncate">
              {siteConfig.phone}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1">
              Direct customer link
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
              <span className="text-xs font-medium">Active Promo</span>
              <Tag className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white truncate">
              {siteConfig.promoCode}
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
              {siteConfig.promoDiscountPercent}% Discount
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website Banners & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Backup & Restore</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Category Navigation Ribbon - 1:1 Mirror of Website Tabs */}
            <div className="p-1.5 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {productNavTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeProductTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveProductTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
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

            {/* Search, Stock Filter & Add Button Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-2.5">
                {/* Search Box */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder={`Search within ${
                      productNavTabs.find((t) => t.id === activeProductTab)?.label || 'products'
                    }...`}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Stock Filter */}
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Stock Status</option>
                  <option value="in">In Stock Only</option>
                  <option value="out">Out of Stock Only</option>
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddProduct}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  Add New Product
                </span>
              </button>
            </div>

            {/* Products Table / Grid View */}
            <div className="bg-white dark:bg-[#161f30] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 dark:bg-[#111827]/80 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                      <th className="py-3 px-4">Product Details</th>
                      <th className="py-3 px-3">Platform</th>
                      <th className="py-3 px-3">Condition</th>
                      <th className="py-3 px-3">Price & MRP</th>
                      <th className="py-3 px-3">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 text-center text-gray-400 dark:text-gray-500"
                        >
                          <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
                          <p className="text-sm font-medium">No products found matching filters.</p>
                          <p className="text-xs mt-1">Try clearing filters or search query.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-gray-50/50 dark:hover:bg-[#1a2333]/50 transition-colors"
                        >
                          {/* Details & Image */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
                                {p.imageUrl ? (
                                  <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <Package className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="min-w-0 max-w-xs sm:max-w-sm">
                                <div className="font-bold text-gray-900 dark:text-white truncate">
                                  {p.name}
                                </div>
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                  {p.subtitle || p.category}
                                </div>
                                {p.badge && (
                                  <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Platform */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                              {p.platform}
                            </span>
                          </td>

                          {/* Condition */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-[11px] text-gray-600 dark:text-gray-400">
                              {p.condition}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-bold text-gray-900 dark:text-white">
                              ₹{p.price.toLocaleString('en-IN')}
                            </div>
                            {p.mrp > p.price && (
                              <div className="text-[10px] text-gray-400 line-through">
                                ₹{p.mrp.toLocaleString('en-IN')}{' '}
                                <span className="text-emerald-600 font-semibold no-underline">
                                  ({p.discountPercent}% off)
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Stock Toggle */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleToggleStock(p.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
                                p.inStock
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                                  : 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
                              }`}
                              title="Click to toggle stock status"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  p.inStock ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                              />
                              <span>
                                {p.inStock
                                  ? `In Stock (${p.stockCount || 1})`
                                  : 'Out of Stock'}
                              </span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                                title="Edit Product"
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
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE CONTENT & BANNERS */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveSiteConfig} className="space-y-6">
            {/* Contact Details Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Store Contact & Social Details
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Controls phone numbers, WhatsApp quick links, and official email across the entire website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">
                    Store Phone / Calling Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={configForm.phone}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, phone: e.target.value })
                    }
                    placeholder="+91 84464 39374"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Displayed in header, footer & contact modals.
                  </span>
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    WhatsApp Digits (without + or spaces) *
                  </label>
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
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Used for wa.me links (e.g. 918446439374).
                  </span>
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Store Support Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={configForm.email}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, email: e.target.value })
                    }
                    placeholder="djntechofficial@gmail.com"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Instagram Handle or URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={configForm.instagram}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, instagram: e.target.value })
                    }
                    placeholder="@djntech"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1">
                    Support Operating Timings
                  </label>
                  <input
                    type="text"
                    value={configForm.supportHours}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        supportHours: e.target.value,
                      })
                    }
                    placeholder="Monday to Sunday, 10:00 AM – 9:00 PM IST"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Marquee & Banner Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Announcement Marquee & Shipping
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Controls the scrolling ticker tape on homepage and threshold for free shipping.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">
                    Announcement Marquee Ticker Text
                  </label>
                  <textarea
                    rows={2}
                    value={configForm.marqueeAnnouncement}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        marqueeAnnouncement: e.target.value,
                      })
                    }
                    placeholder="⚡ Free Express Shipping Across India · 🛡️ Certified 25-Point Hardware QA Inspection..."
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">
                      Free Shipping Minimum Order (₹)
                    </label>
                    <input
                      type="number"
                      value={configForm.freeShippingThreshold}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          freeShippingThreshold: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">
                      Store Brand Name
                    </label>
                    <input
                      type="text"
                      value={configForm.storeName}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          storeName: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Codes & Discounts Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <Tag className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Coupon Code & Promotions
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Customers can enter this coupon code at checkout to receive instant discounts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">
                    Active Coupon Code
                  </label>
                  <input
                    type="text"
                    value={configForm.promoCode}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        promoCode: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="DJN2026"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs uppercase font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={configForm.promoDiscountPercent}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        promoDiscountPercent: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Razorpay Payment Gateway Settings Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      Razorpay Payment Gateway Settings
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Configure your Razorpay Key ID for UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards & NetBanking.
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configForm.razorpayEnabled !== false}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        razorpayEnabled: e.target.checked,
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Enable Razorpay
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">
                    Razorpay Key ID (Live / Test) *
                  </label>
                  <input
                    type="text"
                    value={configForm.razorpayKeyId || ''}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        razorpayKeyId: e.target.value.trim(),
                      })
                    }
                    placeholder="rzp_live_... or rzp_test_..."
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Find this in your{' '}
                    <a
                      href="https://dashboard.razorpay.com/app/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-semibold"
                    >
                      Razorpay Dashboard &gt; Settings &gt; API Keys
                    </a>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex flex-col justify-center">
                  <span className="font-bold flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    256-Bit SSL Encryption Active
                  </span>
                  <span>
                    When enabled, customers can pay directly with UPI, Cards, NetBanking or EMI. If left on test key, it operates in safe sandbox mode.
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Website Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Customer Checkout Orders
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {orders.length} total orders recorded. Total Revenue: ₹
                  {totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>

              {orders.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all order records?')) {
                      onUpdateOrders([]);
                      showToast('Cleared order history');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Clear History
                </button>
              )}
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 text-gray-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold">No orders recorded yet</p>
                <p className="text-xs mt-1">
                  When customers complete checkout, their order details and shipping info will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                          #{o.id}
                        </span>
                        <span className="text-xs text-gray-400">{o.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500">Status:</span>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(
                              o.id,
                              e.target.value as Order['status']
                            )
                          }
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Shipping Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">
                          Customer
                        </span>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {o.customer.fullName}
                        </p>
                        <p className="text-gray-500">{o.customer.phone}</p>
                        <p className="text-gray-500">{o.customer.email}</p>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">
                          Shipping Address
                        </span>
                        <p className="text-gray-700 dark:text-gray-300">
                          {o.customer.address}
                        </p>
                        <p className="text-gray-500">
                          {o.customer.city}, {o.customer.state} -{' '}
                          {o.customer.pincode}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">
                          Payment & Total
                        </span>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          ₹{o.total.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            o.customer.paymentMethod === 'razorpay'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }`}>
                            {o.customer.paymentMethod === 'razorpay' ? 'Razorpay (Paid)' : o.customer.paymentMethod}
                          </span>
                        </div>
                        {o.customer.paymentId && (
                          <span className="block text-[10px] font-mono text-gray-400 mt-0.5 truncate">
                            ID: {o.customer.paymentId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1.5">
                        Purchased Items ({o.items.length})
                      </span>
                      <div className="space-y-1.5">
                        {o.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-gray-50 dark:bg-[#1a2333]/50"
                          >
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {item.product.name} (x{item.quantity})
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
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

        {/* TAB 4: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            {/* Export Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
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
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all cursor-pointer"
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

            {/* Import Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f30] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
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
                  <p className="text-xs text-red-500 font-medium">
                    {importError}
                  </p>
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
                    Reset Store to Factory Defaults
                  </h3>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">
                    Restore the original 24 default products and standard contact details.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetToDefaults}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT ADD / EDIT MODAL FORM */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-2xl p-6 overflow-y-auto my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fill in product attributes, pricing, stock, and descriptions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    placeholder="e.g. PlayStation 5 Slim (Disc Edition)"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={productForm.subtitle}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        subtitle: e.target.value,
                      })
                    }
                    placeholder="e.g. 1TB Ultra-High Speed SSD · DualSense Wireless Controller"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as Category,
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  >
                    <option value="consoles">Consoles</option>
                    <option value="controllers">Controllers</option>
                    <option value="preowned_games">Pre-Owned Games</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Platform *</label>
                  <select
                    value={productForm.platform}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        platform: e.target.value as Platform,
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  >
                    <option value="PS5">PlayStation 5</option>
                    <option value="PS4">PlayStation 4</option>
                    <option value="Xbox">Xbox Series X|S</option>
                    <option value="Switch">Nintendo Switch</option>
                    <option value="Universal">Universal</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Condition *</label>
                  <select
                    value={productForm.condition}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        condition: e.target.value as Condition,
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  >
                    <option value="Brand New Sealed">Brand New Sealed</option>
                    <option value="Pre-Owned Grade A+">Pre-Owned Grade A+</option>
                    <option value="Pre-Owned Grade A">Pre-Owned Grade A</option>
                    <option value="DJN Certified Refurbished">
                      DJN Certified Refurbished
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={productForm.badge || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, badge: e.target.value })
                    }
                    placeholder="e.g. Bestseller, Hot Deal, New Arrival"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2333]/50 border border-gray-200/80 dark:border-gray-700 space-y-3">
                <span className="font-bold text-gray-700 dark:text-gray-300 block">
                  Pricing & Stock Inventory
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">
                      Sale Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-2 text-xs text-gray-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={productForm.mrp}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          mrp: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-2 text-xs text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Stock Count</label>
                    <input
                      type="number"
                      value={productForm.stockCount}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stockCount: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-2 text-xs text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            inStock: e.target.checked,
                          })
                        }
                        className="rounded text-blue-600"
                      />
                      <span className="font-bold text-[11px]">
                        {productForm.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="font-semibold block mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productForm.imageUrl || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        imageUrl: e.target.value,
                      })
                    }
                    placeholder="/ps5-hero.jpg or https://images.unsplash.com/..."
                    className="flex-1 bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                  {productForm.imageUrl && (
                    <div className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0">
                      <img
                        src={productForm.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Warranty & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Warranty</label>
                  <input
                    type="text"
                    value={productForm.warranty}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        warranty: e.target.value,
                      })
                    }
                    placeholder="1 Year Sony Warranty / 7-Day Replacement"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Storage / Edition
                  </label>
                  <input
                    type="text"
                    value={productForm.storage || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        storage: e.target.value,
                      })
                    }
                    placeholder="e.g. 1TB SSD / Standard Edition"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              {/* Features & In the box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">
                    Key Features (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="Ultra-High Speed SSD&#10;Ray Tracing Support&#10;Haptic Feedback"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    What's In The Box (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={inTheBoxText}
                    onChange={(e) => setInTheBoxText(e.target.value)}
                    placeholder="PlayStation 5 Console&#10;DualSense Wireless Controller&#10;HDMI 2.1 Cable"
                    className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Delete Product?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Are you sure you want to remove "{productToDelete.name}" from the store catalog?
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
