/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, TEST_PRODUCT } from './data/products';
import { AuthUser, Product, CartItem, Category, Platform, Condition, Order, ProductReview, SiteConfig } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductSectionCarousel } from './components/ProductSectionCarousel';
import { Marquee } from './components/Marquee';
import { HomeTrustSections } from './components/HomeTrustSections';
import { Footer } from './components/Footer';
import { BrandPreloader } from './components/BrandPreloader';
import { MobileBottomNav } from './components/MobileBottomNav';
import type { PolicyType } from './components/PolicyModal';

// Code-split heavy views and modals for sub-second initial bundle load
const ProductPage = React.lazy(() => import('./components/ProductPage').then(m => ({ default: m.ProductPage })));
const CategoryPage = React.lazy(() => import('./components/CategoryPage').then(m => ({ default: m.CategoryPage })));
const SellConsolesPage = React.lazy(() => import('./components/SellConsolesPage').then(m => ({ default: m.SellConsolesPage })));
const RepairConsolePage = React.lazy(() => import('./components/RepairConsolePage').then(m => ({ default: m.RepairConsolePage })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const AdminPinModal = React.lazy(() => import('./components/AdminPinModal').then(m => ({ default: m.AdminPinModal })));
const CartDrawer = React.lazy(() => import('./components/CartDrawer').then(m => ({ default: m.CartDrawer })));
const WishlistDrawer = React.lazy(() => import('./components/WishlistDrawer').then(m => ({ default: m.WishlistDrawer })));
const CheckoutModal = React.lazy(() => import('./components/CheckoutModal').then(m => ({ default: m.CheckoutModal })));
const OrderConfirmationModal = React.lazy(() => import('./components/OrderConfirmationModal').then(m => ({ default: m.OrderConfirmationModal })));
const PolicyModal = React.lazy(() => import('./components/PolicyModal').then(m => ({ default: m.PolicyModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const UserOrdersModal = React.lazy(() => import('./components/UserOrdersModal').then(m => ({ default: m.UserOrdersModal })));
const MaintenancePage = React.lazy(() => import('./components/MaintenancePage').then(m => ({ default: m.MaintenancePage })));
import { DEFAULT_SITE_CONFIG } from './data/siteConfig';
import {
  fetchProductsFromDB,
  fetchSiteConfigFromDB,
  fetchOrdersFromDB,
  fetchUserOrdersFromDB,
  signOutUser,
  supabase,
  createOrderInDB,
  upsertProductToDB,
  upsertSiteConfigToDB,
} from './lib/supabase';
import { Check } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      localStorage.removeItem('djn_products_v6');
      const saved = localStorage.getItem('djn_products_v7');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Dynamic Site Configuration
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('djn_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          maintenanceMode:
            parsed.maintenanceMode !== undefined
              ? parsed.maintenanceMode
              : DEFAULT_SITE_CONFIG.maintenanceMode,
        };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Maintenance Bypass State for Admin Testing
  const [adminBypassMaintenance, setAdminBypassMaintenance] = useState(false);

  useEffect(() => {
    localStorage.setItem('djn_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Sync with Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadFromSupabase() {
      try {
        const [dbProducts, dbConfig] = await Promise.all([
          fetchProductsFromDB(),
          fetchSiteConfigFromDB(),
        ]);
        if (isMounted) {
          if (dbProducts && dbProducts.length > 0) {
            const hasTest = dbProducts.some((p) => p.id === TEST_PRODUCT.id || p.price === 1);
            setProducts(hasTest ? dbProducts : [TEST_PRODUCT, ...dbProducts]);
          }
          if (dbConfig) {
            setSiteConfig(dbConfig);
          }
        }
      } catch (err) {
        console.warn('[Supabase] Initial sync fallback to local storage:', err);
      }
    }
    loadFromSupabase();
    return () => {
      isMounted = false;
    };
  }, []);


  // Theme Management (Default: Light Theme)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('djn_theme_v2');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('djn_theme_v2', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated');
  };

  // Brand Splash Preloader State
  const [isSiteLoading, setIsSiteLoading] = useState(true);

  // Multi-page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'all' | Category | 'sell-consoles' | 'repair-console' | 'product-detail' | 'admin'>('home');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Admin Portal & Security PIN State
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('djn_admin_authenticated') === 'true';
  });

  // Tracked Orders for Admin
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('djn_admin_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'DJN-84291',
        date: '12 Oct 2026, 04:15 PM',
        items: [
          {
            product: PRODUCTS[0],
            quantity: 1,
            selectedCondition: PRODUCTS[0].condition,
          }
        ],
        subtotal: 49990,
        discount: 0,
        shipping: 0,
        total: 49990,
        customer: {
          fullName: 'Rahul Sharma',
          phone: '+91 84464 39374',
          email: 'rahul.s@example.com',
          address: 'Flat 402, Sea Green Apartments, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
          paymentMethod: 'razorpay',
        },
        status: 'Dispatched',
        estimatedDelivery: '14 Oct 2026',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('djn_admin_orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch orders only when admin is accessed or authenticated to save customer bandwidth
  useEffect(() => {
    if (isAdminAuthenticated || currentPage === 'admin') {
      fetchOrdersFromDB().then((dbOrders) => {
        if (dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders);
        }
      }).catch((err) => {
        console.warn('[Supabase] Failed to fetch orders for admin:', err);
      });
    }
  }, [isAdminAuthenticated, currentPage]);

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('djn_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('djn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Google Authentication State
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('djn_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  // Helper to accurately extract Google profile details (avatar, name, email)
  const parseGoogleUser = (u: any): AuthUser => {
    const meta = u.user_metadata || {};
    const identityMeta = (u.identities?.[0]?.identity_data as any) || {};

    const avatarUrl =
      meta.avatar_url ||
      meta.picture ||
      meta.avatar ||
      identityMeta.avatar_url ||
      identityMeta.picture ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.email || 'Customer')}&backgroundColor=0070D1`;

    const fullName =
      meta.full_name ||
      meta.name ||
      identityMeta.full_name ||
      identityMeta.name ||
      u.email?.split('@')[0] ||
      'Customer';

    return {
      id: u.id,
      email: (u.email || '').toLowerCase(),
      fullName,
      avatarUrl,
      provider: 'google',
    };
  };

  // Auth Session listener
  useEffect(() => {
    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const parsed = parseGoogleUser(session.user);
        setAuthUser(parsed);
        localStorage.setItem('djn_auth_user', JSON.stringify(parsed));
      }
    });

    // 2. Auth changes subscription (e.g. Google OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
        const parsed = parseGoogleUser(session.user);
        setAuthUser(parsed);
        localStorage.setItem('djn_auth_user', JSON.stringify(parsed));
        if (event === 'SIGNED_IN') {
          showToast(`Welcome, ${parsed.fullName}!`);
        }
      } else if (event === 'SIGNED_OUT') {
        setAuthUser(null);
        localStorage.removeItem('djn_auth_user');
        setUserOrders([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch orders for this customer from Supabase whenever authUser or orders change
  useEffect(() => {
    if (authUser?.email) {
      const email = authUser.email.trim().toLowerCase();
      fetchUserOrdersFromDB(email).then((fetched) => {
        // Merge with in-memory placed orders
        const localMatches = orders.filter(
          (o) => (o.customer?.email || '').trim().toLowerCase() === email
        );
        const combined = [...localMatches];
        for (const fo of fetched) {
          if (!combined.some((c) => c.id === fo.id)) {
            combined.push(fo);
          }
        }
        setUserOrders(combined);
      });
    } else {
      setUserOrders([]);
    }
  }, [authUser?.email, orders]);

  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${user.fullName}`);
  };

  const handleSignOutUser = async () => {
    await signOutUser();
    setAuthUser(null);
    setUserOrders([]);
    showToast('Signed out successfully');
  };

  useEffect(() => {
    localStorage.setItem('djn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('djn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('djn_products_v7', JSON.stringify(products));
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Navigation Handlers
  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
    setActiveCategory('all');
    setSelectedPlatform('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSellConsoles = () => {
    setSelectedProduct(null);
    setCurrentPage('sell-consoles');
    setActiveCategory('all');
    setSelectedPlatform('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateRepairConsole = () => {
    setSelectedProduct(null);
    setCurrentPage('repair-console');
    setActiveCategory('all');
    setSelectedPlatform('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Access Handlers
  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setCurrentPage('admin');
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminPinModalOpen(true);
    }
  };

  // Support direct #admin navigation
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        handleOpenAdmin();
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdminAuthenticated]);

  const handleAdminPinSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminPinModalOpen(false);
    setCurrentPage('admin');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Welcome to Store Admin Console');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('djn_admin_authenticated');
    setCurrentPage('home');
    showToast('Admin session locked');
  };

  const handleNavigateCategory = (cat: Category | 'all', plat: Platform | 'all' = 'all') => {
    setSelectedProduct(null);
    setCurrentPage(cat);
    setActiveCategory(cat);
    setSelectedPlatform(plat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Cart
  const handleAddToCart = (product: Product, condition?: Condition) => {
    const chosenCondition = condition || product.condition;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (it) => it.product.id === product.id && it.selectedCondition === chosenCondition
      );
      if (existing) {
        return prevCart.map((it) =>
          it.product.id === product.id && it.selectedCondition === chosenCondition
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      } else {
        return [...prevCart, { product, quantity: 1, selectedCondition: chosenCondition }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  // Instant Buy Now (requires login)
  const handleBuyNow = (product: Product, condition?: Condition) => {
    handleAddToCart(product, condition);
    if (!authUser) {
      setIsAuthModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.product.id === productId ? { ...it, quantity } : it))
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((it) => it.product.id !== productId));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some((p) => p.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved to wishlist`);
    }
  };

  // Order Placement Success
  const handleOrderSuccess = (order: Order) => {
    setCompletedOrder(order);
    setOrders((prev) => [order, ...prev]);
    if (authUser) {
      setUserOrders((prev) => [order, ...prev]);
    }
    setCart([]);
    setIsCheckoutOpen(false);

    // 1. Persist catalog state to localStorage
    setProducts((prevProducts) => {
      localStorage.setItem('djn_products_v7', JSON.stringify(prevProducts));
      return prevProducts;
    });

    // 2. Persist order to Supabase
    createOrderInDB(order).catch((err) => {
      console.warn('[Supabase] Failed to persist order online:', err);
    });

    showToast(`Order #${order.id} confirmed! Thank you for choosing DJN Tech.`);
  };

  // Section collections for Home page: Distinct, non-overlapping, and thematic catalogs
  const featuredProducts = useMemo(() => {
    // 1. Hardware first (consoles & controllers)
    const hardware = products.filter(
      (p) => p.category === 'consoles' || p.category === 'controllers'
    );

    // 2. High-profile flagship blockbusters & GOTY masterpieces
    const flagshipKeywords = [
      'grand theft auto',
      'gta',
      'ghost of tsushima',
      'spider-man',
      'god of war',
      'hogwarts legacy',
      'the last of us',
      'red dead redemption',
      'uncharted',
      'witcher 3',
      'cyberpunk',
      'horizon zero',
      'resident evil',
      'elden ring',
    ];

    const flagshipGames = products.filter((p) => {
      if (p.category !== 'preowned_games') return false;
      const lower = p.name.toLowerCase();
      // Skip custom printed covers in featured to keep it premium standard edition
      if (lower.includes('custom printed cover')) return false;
      return flagshipKeywords.some((kw) => lower.includes(kw));
    });

    const curated = [...hardware, ...flagshipGames];
    return curated.length > 0 ? curated : products;
  }, [products]);

  const trendingProducts = useMemo(() => {
    const featuredIdSet = new Set(featuredProducts.map((p) => p.id));

    // High-demand competitive, sports, racing, combat & modern releases
    const trendingKeywords = [
      'fc 24',
      'fifa',
      'cricket 24',
      'cricket 19',
      'big bash',
      'call of duty',
      'modern warfare',
      'black ops',
      'wwe 2k',
      'gran turismo',
      'f1 22',
      'ride 5',
      'hot wheels',
      'mortal kombat',
      'injustice',
      'ufc 5',
      'battlefield',
      'assassin\'s creed mirage',
      'assassin\'s creed valhalla',
      'payday 3',
      'dragon ball',
      'sniper elite',
    ];

    const trending = products.filter((p) => {
      if (featuredIdSet.has(p.id)) return false; // Strictly no duplication with Featured
      const lower = p.name.toLowerCase();
      if (lower.includes('custom printed cover')) return false;
      return trendingKeywords.some((kw) => lower.includes(kw));
    });

    // Fill with remaining catalog if more variety is needed
    if (trending.length < 14) {
      const remaining = products.filter(
        (p) => !featuredIdSet.has(p.id) && !trending.some((t) => t.id === p.id)
      );
      return [...trending, ...remaining].slice(0, 20);
    }

    return trending;
  }, [products, featuredProducts]);

  const todaysDeals = useMemo(() => {
    const featuredIdSet = new Set(featuredProducts.map((p) => p.id));
    const trendingIdSet = new Set(trendingProducts.map((p) => p.id));

    // Products strictly not shown in Featured or Trending
    const candidates = products.filter(
      (p) => !featuredIdSet.has(p.id) && !trendingIdSet.has(p.id)
    );

    // Prioritize high-discount steals, budget titles (< ₹1299), and custom-printed cover value editions
    const deals = [...candidates].sort((a, b) => {
      const aIsCustom = a.name.toLowerCase().includes('custom printed cover');
      const bIsCustom = b.name.toLowerCase().includes('custom printed cover');
      if (aIsCustom && !bIsCustom) return -1;
      if (!aIsCustom && bIsCustom) return 1;

      // Higher discount first
      if (b.discountPercent !== a.discountPercent) {
        return b.discountPercent - a.discountPercent;
      }
      // Lower price first
      return a.price - b.price;
    });

    // Fallback if catalog is small
    if (deals.length === 0) {
      return [...products].sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return deals;
  }, [products, featuredProducts, trendingProducts]);

  // Pricing calculations
  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = 0;
  const isTestOrder = cart.some((it) => it.product.id === 'test-razorpay-1rs' || it.product.price === 1);
  const cartShipping = isTestOrder || cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal + cartShipping);



  // Admin View Render
  if (currentPage === 'admin') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold">Loading Admin Console...</span>
              </div>
            </div>
          }
        >
          <AdminPanel
            products={products}
            onUpdateProducts={(newProducts) => setProducts(newProducts)}
            siteConfig={siteConfig}
            onUpdateSiteConfig={(newConfig) => setSiteConfig(newConfig)}
            orders={orders}
            onUpdateOrders={(newOrders) => setOrders(newOrders)}
            onExit={() => setCurrentPage('home')}
            onLogout={handleAdminLogout}
            showToast={showToast}
          />
        </React.Suspense>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#111827] dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm font-medium border border-gray-700">
            <Check className="w-4 h-4 text-[#10b981]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Maintenance View Render (Default when maintenanceMode is true and not bypassed by admin)
  if (siteConfig.maintenanceMode && !adminBypassMaintenance) {
    return (
      <div className={`min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-[#212121] dark:text-gray-100 transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0f17] text-gray-500">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-gray-500">Loading DJN Tech...</span>
              </div>
            </div>
          }
        >
          <MaintenancePage
            siteConfig={siteConfig}
            onOpenAdmin={() => setIsAdminPinModalOpen(true)}
            isAdminAuthenticated={isAdminAuthenticated}
            onEnterAdmin={() => {
              setCurrentPage('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBypassMaintenance={() => {
              setAdminBypassMaintenance(true);
              showToast('Browsing live store in Admin Mode');
            }}
            onToggleMaintenance={(enabled) => {
              const updated = { ...siteConfig, maintenanceMode: enabled };
              setSiteConfig(updated);
              upsertSiteConfigToDB(updated);
              showToast(enabled ? 'Maintenance mode enabled' : 'Store is now live!');
            }}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenPolicy={(p) => setActivePolicy(p)}
          />
        </React.Suspense>

        {/* Customer Policy & Information Modal */}
        {activePolicy && (
          <React.Suspense fallback={null}>
            <PolicyModal
              type={activePolicy}
              onClose={() => setActivePolicy(null)}
            />
          </React.Suspense>
        )}

        {/* Admin PIN Modal accessible from Maintenance Page */}
        {isAdminPinModalOpen && (
          <React.Suspense fallback={null}>
            <AdminPinModal
              isOpen={isAdminPinModalOpen}
              onClose={() => setIsAdminPinModalOpen(false)}
              onSuccess={handleAdminPinSuccess}
            />
          </React.Suspense>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#111827] dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm font-medium border border-gray-700">
            <Check className="w-4 h-4 text-[#10b981]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-[#212121] dark:text-gray-100 transition-colors duration-200">
      
      {/* Admin Maintenance Bypass Banner (Solid colors, zero gradients) */}
      {siteConfig.maintenanceMode && adminBypassMaintenance && (
        <div className="sticky top-0 z-50 bg-amber-600 dark:bg-amber-700 text-white px-4 py-2 text-xs font-medium shadow-sm border-b border-amber-700 dark:border-amber-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
              <span className="font-bold">Maintenance Mode is ACTIVE for public visitors.</span>
              <span className="hidden sm:inline text-amber-100">You are browsing the live store in Admin Bypass mode.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAdminBypassMaintenance(false)}
                className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/30 font-semibold cursor-pointer"
              >
                Back to Maintenance Page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('admin')}
                className="px-2.5 py-1 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-100 cursor-pointer"
              >
                Admin Panel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = { ...siteConfig, maintenanceMode: false };
                  setSiteConfig(updated);
                  upsertSiteConfigToDB(updated);
                  showToast('Store is now live!');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white cursor-pointer"
              >
                Turn OFF Maintenance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand Splash Screen with Animated Progress Bar */}
      {isSiteLoading && (
        <BrandPreloader onComplete={() => setIsSiteLoading(false)} />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm font-medium border border-gray-700">
          <Check className="w-4 h-4 text-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation with theme toggle and live order track */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={(cat, plat) => handleNavigateCategory(cat, plat)}
        activeCategory={activeCategory}
        activePlatform={selectedPlatform}
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
        onNavigateSellConsoles={handleNavigateSellConsoles}
        onNavigateRepairConsole={handleNavigateRepairConsole}
        onSearch={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            handleNavigateCategory('all');
          }
        }}
        searchQuery={searchQuery}
        allProducts={products}
        onSelectProduct={handleSelectProduct}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdmin={handleOpenAdmin}
        siteConfig={siteConfig}
        authUser={authUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenUserOrders={() => setIsUserOrdersOpen(true)}
        userOrdersCount={userOrders.length}
      />

      {/* Main Content Area: Conditional Routing Based on currentPage */}
      <main className="flex-1 pb-16 md:pb-0">
        <React.Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
              <span className="text-xs font-semibold">Loading...</span>
            </div>
          }
        >
          {/* VIEW 1: DEDICATED PRODUCT PAGE (FLIPKART / AMAZON STYLE) */}
          {currentPage === 'product-detail' && selectedProduct ? (
            <ProductPage
              product={selectedProduct}
              allProducts={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
              isInCart={cart.some((c) => c.product.id === selectedProduct.id)}
              onBack={() => {
                if (activeCategory !== 'all') {
                  setCurrentPage(activeCategory);
                } else {
                  setCurrentPage('home');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateCategory={handleNavigateCategory}
              onNavigateHome={handleNavigateHome}
            />
          ) : currentPage === 'sell-consoles' ? (
            
            /* VIEW 2: SELL CONSOLES TRADE-IN PORTAL */
            <SellConsolesPage
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={handleNavigateCategory}
              onSelectProduct={handleSelectProduct}
            />

          ) : currentPage === 'repair-console' ? (
            
            /* VIEW 3: REPAIR CONSOLE SERVICE PORTAL */
            <RepairConsolePage
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={handleNavigateCategory}
              onSelectProduct={handleSelectProduct}
            />

          ) : currentPage !== 'home' && currentPage !== 'product-detail' ? (
            
            /* VIEW 3: DEDICATED CATEGORY / CATALOG PAGE */
            <CategoryPage
              category={currentPage}
              platform={selectedPlatform}
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist.map((w) => w.id)}
              cartIds={cart.map((c) => c.product.id)}
              onNavigateHome={handleNavigateHome}
              onSelectCategory={handleNavigateCategory}
            />

          ) : (

          /* VIEW 3: FULL HOME PAGE */
          <div className="w-full flex flex-col">
            
            {/* Minimalist Hero Section with Aligned Visual Hierarchy */}
            <Hero
              onExploreGames={() => handleNavigateCategory('preowned_games')}
              onExploreConsoles={() => handleNavigateCategory('consoles')}
              featuredProduct={products[0]}
              onSelectProduct={handleSelectProduct}
              products={products}
            />

            {/* Infinite Running Marquee Ticker */}
            <Marquee announcementText={siteConfig.marqueeAnnouncement} />



            {/* SECTION 1: Featured Products (Horizontal Carousel) */}
            <ProductSectionCarousel
              title="Featured Products"
              subtitle="Top-rated consoles, official controllers & bestseller games"
              badgeText="Official Hardware & Certified Discs"
              badgeDotClass="bg-blue-600 dark:bg-blue-400"
              badgeTextClass="text-blue-600 dark:text-blue-400"
              products={featuredProducts}
              onViewAll={() => handleNavigateCategory('all')}
              viewAllLabel="View all"
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist.map((w) => w.id)}
              cartIds={cart.map((c) => c.product.id)}
              containerBgClass="bg-white dark:bg-[#0b0f17]"
              borderClass="border-b border-[#e5e7eb] dark:border-[#1e293b]"
            />

            {/* SECTION 2: Trending Now (Horizontal Carousel) */}
            <ProductSectionCarousel
              title="Trending Now"
              subtitle="Popular games and consoles this week"
              badgeText="Popular"
              badgeDotClass="bg-amber-500"
              badgeTextClass="text-amber-700 dark:text-amber-400"
              products={trendingProducts}
              onViewAll={() => handleNavigateCategory('all')}
              viewAllLabel="Browse all"
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist.map((w) => w.id)}
              cartIds={cart.map((c) => c.product.id)}
              containerBgClass="bg-[#f4f5f8] dark:bg-[#0e1626] border-y border-[#e2e5eb] dark:border-[#1e293b]"
              borderClass="border-b border-[#d8dce4] dark:border-[#223048]"
            />

            {/* SECTION 3: Special Deals (Horizontal Carousel) */}
            <ProductSectionCarousel
              title="Special Deals"
              subtitle="Discounted games, pre-owned consoles, and accessories"
              badgeText="Limited Offers"
              badgeDotClass="bg-emerald-500"
              badgeTextClass="text-emerald-700 dark:text-emerald-400"
              products={todaysDeals}
              onViewAll={() => handleNavigateCategory('preowned_games')}
              viewAllLabel="See all deals"
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist.map((w) => w.id)}
              cartIds={cart.map((c) => c.product.id)}
              containerBgClass="bg-gradient-to-b from-white via-emerald-50/25 to-white dark:from-[#0b0f17] dark:via-[#09221b]/20 dark:to-[#0b0f17]"
              borderClass="border-b border-emerald-200/60 dark:border-emerald-950/60"
            />

            {/* SECTION 4: Trust Pillars & Customer Feedback */}
            <section className="w-full py-6 sm:py-14 lg:py-20 bg-[#f8f9fb] dark:bg-[#0c121e] border-t border-[#eaedf0] dark:border-[#1e293b]">
              <HomeTrustSections onShopNow={() => handleNavigateCategory('all')} />
            </section>

          </div>
        )}
        </React.Suspense>
      </main>

      {/* Fully Functional Footer */}
      <Footer
        onSelectCategory={handleNavigateCategory}
        onOpenPolicy={(type) => setActivePolicy(type)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        siteConfig={siteConfig}
      />

      {/* Customer Policy & Information Modal */}
      {activePolicy && (
        <React.Suspense fallback={null}>
          <PolicyModal
            type={activePolicy}
            onClose={() => setActivePolicy(null)}
          />
        </React.Suspense>
      )}

      {/* Admin Security PIN Modal */}
      {isAdminPinModalOpen && (
        <React.Suspense fallback={null}>
          <AdminPinModal
            isOpen={isAdminPinModalOpen}
            onClose={() => setIsAdminPinModalOpen(false)}
            onSuccess={handleAdminPinSuccess}
          />
        </React.Suspense>
      )}

      {/* Cart Slide-Over Drawer */}
      {isCartOpen && (
        <React.Suspense fallback={null}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToCheckout={() => {
              if (!authUser) {
                setIsAuthModalOpen(true);
              } else {
                setIsCheckoutOpen(true);
              }
            }}
            authUser={authUser}
            onRequestLogin={() => setIsAuthModalOpen(true)}
          />
        </React.Suspense>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <React.Suspense fallback={null}>
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            items={wishlist}
            onRemoveItem={(id) => handleToggleWishlist({ id } as any)}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={handleSelectProduct}
          />
        </React.Suspense>
      )}

      {/* Express Checkout Modal */}
      {isCheckoutOpen && (
        <React.Suspense fallback={null}>
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            items={cart}
            subtotal={cartSubtotal}
            discount={cartDiscount}
            shipping={cartShipping}
            total={cartTotal}
            onOrderSuccess={handleOrderSuccess}
            siteConfig={siteConfig}
            authUser={authUser}
            onRequestLogin={() => setIsAuthModalOpen(true)}
          />
        </React.Suspense>
      )}

      {/* Order Confirmation Modal */}
      {completedOrder && (
        <React.Suspense fallback={null}>
          <OrderConfirmationModal
            order={completedOrder}
            onClose={() => setCompletedOrder(null)}
          />
        </React.Suspense>
      )}

      {/* Google Authentication Modal */}
      {isAuthModalOpen && (
        <React.Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </React.Suspense>
      )}

      {/* User Account & My Orders Modal */}
      {isUserOrdersOpen && authUser && (
        <React.Suspense fallback={null}>
          <UserOrdersModal
            isOpen={isUserOrdersOpen}
            onClose={() => setIsUserOrdersOpen(false)}
            user={authUser}
            orders={userOrders}
            wishlist={wishlist}
            onSignOut={handleSignOutUser}
            onContinueShopping={() => setIsUserOrdersOpen(false)}
            onAddToCart={handleAddToCart}
          />
        </React.Suspense>
      )}

      {/* Mobile Sticky Bottom Icon Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        activeCategory={activeCategory}
        onNavigateHome={handleNavigateHome}
        onSelectCategory={handleNavigateCategory}
        onNavigateSellConsoles={handleNavigateSellConsoles}
        authUser={authUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenUserOrders={() => setIsUserOrdersOpen(true)}
        userOrdersCount={userOrders.length}
      />

    </div>
  );
}
