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
const CartDrawer = React.lazy(() => import('./components/CartDrawer').then(m => ({ default: m.CartDrawer })));
const WishlistDrawer = React.lazy(() => import('./components/WishlistDrawer').then(m => ({ default: m.WishlistDrawer })));
const CheckoutModal = React.lazy(() => import('./components/CheckoutModal').then(m => ({ default: m.CheckoutModal })));
const OrderConfirmationModal = React.lazy(() => import('./components/OrderConfirmationModal').then(m => ({ default: m.OrderConfirmationModal })));
const PolicyModal = React.lazy(() => import('./components/PolicyModal').then(m => ({ default: m.PolicyModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const UserOrdersModal = React.lazy(() => import('./components/UserOrdersModal').then(m => ({ default: m.UserOrdersModal })));
const MaintenancePage = React.lazy(() => import('./components/MaintenancePage').then(m => ({ default: m.MaintenancePage })));
const GiveawayModal = React.lazy(() => import('./components/GiveawayModal').then(m => ({ default: m.GiveawayModal })));
import { DEFAULT_SITE_CONFIG } from './data/siteConfig';
import {
  fetchProductsFromDB,
  fetchSiteConfigFromDB,
  fetchOrdersFromDB,
  fetchUserOrdersFromDB,
  fetchCurrentUserRole,
  signOutUser,
  supabase,
  createOrderInDB,
  upsertProductToDB,
  upsertSiteConfigToDB,
} from './lib/supabase';
import { Check, Gift } from 'lucide-react';

export interface ResolvedRoute {
  page: 'home' | 'all' | Category | 'sell-consoles' | 'repair-console' | 'product-detail' | 'admin';
  category: Category | 'all';
  platform: Platform | 'all';
  product: Product | null;
  policy: PolicyType | null;
}

export function resolveRouteFromUrl(availableProducts: Product[]): ResolvedRoute {
  if (typeof window === 'undefined') {
    return {
      page: 'home',
      category: 'all',
      platform: 'all',
      product: null,
      policy: null,
    };
  }

  const pathname = window.location.pathname || '';
  const search = window.location.search || '';
  const hash = window.location.hash || '';

  const rawPath = pathname.toLowerCase().replace(/\/+$/, '');
  const rawHash = hash.toLowerCase();
  const searchParams = new URLSearchParams(search);

  // 1. PRODUCT ROUTE CHECK (Top Priority - Flipkart / Amazon style)
  let targetProductId: string | null = null;

  // Path format: /product/:id or /p/:id or /item/:id
  const productPathMatch = rawPath.match(/^\/(?:product|p|item)\/([^/?#]+)/i);
  if (productPathMatch && productPathMatch[1]) {
    targetProductId = decodeURIComponent(productPathMatch[1]).trim();
  }

  // Query parameter format: ?product=:id or ?product_id=:id or ?p=:id or ?id=:id
  if (!targetProductId) {
    const q = searchParams.get('product') || searchParams.get('product_id') || searchParams.get('p') || searchParams.get('id');
    if (q) targetProductId = q.trim();
  }

  // Hash format: #product/:id or #product-:id or #p/:id
  if (!targetProductId && rawHash) {
    const hashMatch = rawHash.match(/^#(?:product|p)[/-]([^/?#]+)/i);
    if (hashMatch && hashMatch[1]) {
      targetProductId = decodeURIComponent(hashMatch[1]).trim();
    }
  }

  // Direct product slug in pathname (e.g. /ps5-slim-disc or /dualsense-white)
  if (!targetProductId && rawPath && rawPath !== '/' && !rawPath.includes('/')) {
    const candidateSlug = rawPath.replace(/^\//, '').trim();
    const systemRoutes = [
      'admin', 'cart', 'wishlist', 'orders', 'my-orders', 'sell', 'sell-consoles',
      'repair', 'repair-console', 'specials', 'deals', 'terms', 'privacy',
      'shipping', 'refund', 'contact', 'about', 'grievance', 'consoles',
      'controllers', 'games', 'preowned_games', 'preowned-games', 'accessories',
      'shop', 'all', 'store', 'catalog', 'nintendo-games', 'switch-games',
      'ps5-games', 'ps4-games', 'xbox-games', 'console-games', 'nintendo', 'switch'
    ];
    if (!systemRoutes.includes(candidateSlug)) {
      targetProductId = candidateSlug;
    }
  }

  if (targetProductId) {
    const targetClean = targetProductId.toLowerCase();
    const pool = availableProducts && availableProducts.length > 0 ? availableProducts : PRODUCTS;
    const matched = pool.find((p) => {
      if (!p) return false;
      if (p.id.toLowerCase() === targetClean) return true;
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (slug === targetClean) return true;
      if (targetClean.length >= 4 && p.id.toLowerCase().includes(targetClean)) return true;
      return false;
    });

    if (matched) {
      return {
        page: 'product-detail',
        category: matched.category,
        platform: matched.platform || 'all',
        product: matched,
        policy: null,
      };
    }
  }

  // 2. CATEGORY ROUTES (/category/:cat, /consoles, /controllers, /games, /accessories, /shop)
  const catMatch = rawPath.match(/^\/(?:category|c)\/([^/?#]+)/i);
  const catSlug = (catMatch && catMatch[1] ? catMatch[1] : rawPath.replace(/^\//, '')).toLowerCase();

  if (catSlug === 'consoles' || rawHash === '#consoles') {
    return { page: 'consoles', category: 'consoles', platform: 'all', product: null, policy: null };
  }
  if (catSlug === 'nintendo' || catSlug === 'switch' || rawHash === '#nintendo' || rawHash === '#switch') {
    return { page: 'consoles', category: 'consoles', platform: 'Nintendo', product: null, policy: null };
  }
  if (catSlug === 'nintendo-games' || catSlug === 'switch-games' || rawHash === '#nintendo-games' || rawHash === '#switch-games') {
    return { page: 'preowned_games', category: 'preowned_games', platform: 'Switch', product: null, policy: null };
  }
  if (catSlug === 'ps5-games' || rawHash === '#ps5-games') {
    return { page: 'preowned_games', category: 'preowned_games', platform: 'PS5', product: null, policy: null };
  }
  if (catSlug === 'ps4-games' || rawHash === '#ps4-games') {
    return { page: 'preowned_games', category: 'preowned_games', platform: 'PS4', product: null, policy: null };
  }
  if (catSlug === 'xbox-games' || rawHash === '#xbox-games') {
    return { page: 'preowned_games', category: 'preowned_games', platform: 'Xbox', product: null, policy: null };
  }
  if (catSlug === 'controllers' || rawHash === '#controllers') {
    return { page: 'controllers', category: 'controllers', platform: 'all', product: null, policy: null };
  }
  if (catSlug === 'games' || catSlug === 'console-games' || catSlug === 'preowned_games' || catSlug === 'preowned-games' || rawHash === '#games' || rawHash === '#console-games') {
    return { page: 'preowned_games', category: 'preowned_games', platform: 'all', product: null, policy: null };
  }
  if (catSlug === 'accessories' || rawHash === '#accessories') {
    return { page: 'accessories', category: 'accessories', platform: 'all', product: null, policy: null };
  }
  if (catSlug === 'shop' || catSlug === 'all' || catSlug === 'catalog') {
    return { page: 'all', category: 'all', platform: 'all', product: null, policy: null };
  }

  // 3. SERVICES / PORTALS (/sell-consoles, /repair-console)
  if (rawPath === '/sell-consoles' || rawPath === '/sell' || rawPath === '/trade-in' || rawHash === '#sell-consoles') {
    return { page: 'sell-consoles', category: 'all', platform: 'all', product: null, policy: null };
  }
  if (rawPath === '/repair-console' || rawPath === '/repair' || rawHash === '#repair-console') {
    return { page: 'repair-console', category: 'all', platform: 'all', product: null, policy: null };
  }

  // 4. ADMIN
  if (rawPath === '/admin' || rawHash === '#admin') {
    return { page: 'admin', category: 'all', platform: 'all', product: null, policy: null };
  }

  // 5. POLICIES & INFORMATION MODALS
  if (rawPath === '/terms' || rawPath === '/terms-and-conditions' || rawHash === '#terms') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'terms' };
  }
  if (rawPath === '/privacy' || rawPath === '/privacy-policy' || rawHash === '#privacy') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'privacy' };
  }
  if (rawPath === '/shipping' || rawPath === '/shipping-policy' || rawHash === '#shipping') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'shipping' };
  }
  if (rawPath === '/refund' || rawPath === '/refund-policy' || rawHash === '#refund') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'refund' };
  }
  if (rawPath === '/contact' || rawPath === '/contact-us' || rawHash === '#contact') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'contact' };
  }
  if (rawPath === '/about' || rawPath === '/about-us' || rawHash === '#about') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'about' };
  }
  if (rawPath === '/grievance' || rawHash === '#grievance') {
    return { page: 'home', category: 'all', platform: 'all', product: null, policy: 'grievance' };
  }

  return {
    page: 'home',
    category: 'all',
    platform: 'all',
    product: null,
    policy: null,
  };
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      localStorage.removeItem('djn_products_v6');
      localStorage.removeItem('djn_products_v7');
      localStorage.removeItem('djn_products_v8');
      localStorage.removeItem('djn_products_v9');
      localStorage.removeItem('djn_products_v10');
      const saved = localStorage.getItem('djn_products_v11');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const savedIds = new Set(parsed.map((p) => p.id));
        const missing = PRODUCTS.filter((p) => !savedIds.has(p.id));
        return [...parsed, ...missing].map((p) => ({ ...p, inStock: true, stockCount: 999 }));
      }
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS.map((p) => ({ ...p, inStock: true, stockCount: 999 }));
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
            const guaranteed = dbProducts.map((p) => ({
              ...p,
              inStock: true,
              stockCount: 999,
            }));
            const dbIds = new Set(guaranteed.map((p) => p.id));
            const missing = PRODUCTS.filter((p) => !dbIds.has(p.id));
            const merged = [...guaranteed, ...missing];
            const hasTest = merged.some((p) => p.id === TEST_PRODUCT.id || p.price === 1);
            const finalProducts = hasTest ? merged : [TEST_PRODUCT, ...merged];
            setProducts(finalProducts);

            if (missing.length > 0) {
              missing.forEach((prod) => {
                upsertProductToDB(prod).catch(() => {});
              });
            }

            // If visitor landed on a product URL that wasn't in local storage, resolve it from Supabase
            if (!selectedProduct && typeof window !== 'undefined') {
              const route = resolveRouteFromUrl(finalProducts);
              if (route.page === 'product-detail' && route.product) {
                setSelectedProduct(route.product);
                setCurrentPage('product-detail');
                setActiveCategory(route.category);
                document.title = `${route.product.name} | DJN Tech Online Store`;
              }
            }
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

  // Synchronous URL Route Resolver (Flipkart / Amazon style direct deep linking)
  const initialRoute = useMemo(() => resolveRouteFromUrl(products), []);

  // Multi-page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'all' | Category | 'sell-consoles' | 'repair-console' | 'product-detail' | 'admin'>(() => initialRoute.page);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(() => initialRoute.category);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>(() => initialRoute.platform);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => initialRoute.product);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(() => initialRoute.policy);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

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

  // Admin access strictly derived from verified user role (Google OAuth + Supabase users table)
  const isAdminUser = Boolean(
    authUser?.role === 'admin' ||
    authUser?.role === 'superadmin' ||
    authUser?.role === 'staff'
  );
  const isAdminAuthenticated = isAdminUser;

  // Helper to identify internal payment test product(s)
  const isTestProduct = (p?: Product | null): boolean => {
    if (!p) return false;
    return (
      p.id === 'test-razorpay-1rs' ||
      p.id === TEST_PRODUCT.id ||
      p.price === 1 ||
      Boolean(p.name && p.name.toLowerCase().includes('gateway test'))
    );
  };

  // Visible products: normal visitors/customers never see test items; only Admins & Superadmins can
  const visibleProducts = useMemo(() => {
    if (isAdminUser) {
      return products;
    }
    return products.filter((p) => !isTestProduct(p));
  }, [products, isAdminUser]);

  // Guard: If a visitor tries to view the test product URL/page without admin permissions, redirect to home
  useEffect(() => {
    if (selectedProduct && isTestProduct(selectedProduct) && !isAdminUser) {
      setSelectedProduct(null);
      if (currentPage === 'product-detail') {
        setCurrentPage('home');
      }
    }
  }, [selectedProduct, isAdminUser, currentPage]);

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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  // Official DJN Tech Giveaway Modal State
  const [isGiveawayOpen, setIsGiveawayOpen] = useState(false);

  // Auto-open Giveaway Popup when website opens & preloader finishes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      if (search.toLowerCase().includes('giveaway') || hash.toLowerCase().includes('giveaway')) {
        setIsGiveawayOpen(true);
        return;
      }
    }

    if (!isSiteLoading) {
      try {
        const dismissed = sessionStorage.getItem('djn_giveaway_dismissed');
        if (!dismissed) {
          const timer = setTimeout(() => {
            setIsGiveawayOpen(true);
          }, 700);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        const timer = setTimeout(() => {
          setIsGiveawayOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [isSiteLoading]);

  const handleOpenGiveaway = () => {
    setIsGiveawayOpen(true);
  };

  const handleCloseGiveaway = () => {
    setIsGiveawayOpen(false);
    try {
      sessionStorage.setItem('djn_giveaway_dismissed', 'true');
    } catch (e) {
      // ignore storage restriction
    }
  };

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

  // Auth Session listener with role synchronization
  useEffect(() => {
    const syncUserRole = async (userObj: any, isSignInEvent = false) => {
      const parsed = parseGoogleUser(userObj);
      const role = await fetchCurrentUserRole(parsed.email);
      parsed.role = role;
      setAuthUser(parsed);
      localStorage.setItem('djn_auth_user', JSON.stringify(parsed));
      if (isSignInEvent) {
        if (role === 'admin' || role === 'superadmin') {
          showToast(`Welcome Admin, ${parsed.fullName}!`);
        } else if (role === 'staff') {
          showToast(`Welcome Staff, ${parsed.fullName}!`);
        } else {
          showToast(`Welcome, ${parsed.fullName}!`);
        }
      }
    };

    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        syncUserRole(session.user, false);
      }
    });

    // 2. Auth changes subscription (e.g. Google OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
        syncUserRole(session.user, event === 'SIGNED_IN');
      } else if (event === 'SIGNED_OUT') {
        setAuthUser(null);
        localStorage.removeItem('djn_auth_user');
        localStorage.removeItem('djn_admin_authenticated');
        setUserOrders([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Ensure role is fetched if authUser is present but missing role
  useEffect(() => {
    if (authUser?.email && !authUser.role) {
      fetchCurrentUserRole(authUser.email).then((role) => {
        if (role !== authUser.role) {
          const updated = { ...authUser, role };
          setAuthUser(updated);
          localStorage.setItem('djn_auth_user', JSON.stringify(updated));
        }
      });
    }
  }, [authUser?.email, authUser?.role]);

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
    localStorage.setItem('djn_products_v11', JSON.stringify(products));
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Navigation Handlers with HTML5 History API (Flipkart / Amazon style URL sync)
  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
    setActiveCategory('all');
    setSelectedPlatform('all');
    if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
      window.history.pushState({ type: 'home' }, '', '/');
    }
    document.title = siteConfig.brandName
      ? `${siteConfig.brandName} - Consoles, Controllers & Pre-Owned Games`
      : 'DJN Tech - Consoles, Controllers & Pre-Owned Games';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSellConsoles = () => {
    setSelectedProduct(null);
    setCurrentPage('sell-consoles');
    setActiveCategory('all');
    setSelectedPlatform('all');
    if (window.location.pathname !== '/sell-consoles') {
      window.history.pushState({ type: 'sell' }, '', '/sell-consoles');
    }
    document.title = 'Sell Your Gaming Consoles | Instant Cash · DJN Tech';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateRepairConsole = () => {
    setSelectedProduct(null);
    setCurrentPage('repair-console');
    setActiveCategory('all');
    setSelectedPlatform('all');
    if (window.location.pathname !== '/repair-console') {
      window.history.pushState({ type: 'repair' }, '', '/repair-console');
    }
    document.title = 'Console Repair & Maintenance Service · DJN Tech';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCategory = (cat: Category | 'all', plat: Platform | 'all' = 'all') => {
    setSelectedProduct(null);
    setCurrentPage(cat);
    setActiveCategory(cat);
    setSelectedPlatform(plat);
    const catSlug = cat === 'all'
      ? '/shop'
      : cat === 'preowned_games' && (plat === 'Switch' || plat === 'Nintendo')
      ? '/category/nintendo-games'
      : cat === 'preowned_games' && plat === 'PS5'
      ? '/category/ps5-games'
      : cat === 'preowned_games' && plat === 'PS4'
      ? '/category/ps4-games'
      : cat === 'preowned_games' && plat === 'Xbox'
      ? '/category/xbox-games'
      : `/category/${cat}`;
    if (window.location.pathname !== catSlug) {
      window.history.pushState({ type: 'category', category: cat, platform: plat }, '', catSlug);
    }
    const catLabel = cat === 'all'
      ? 'All Gaming Catalog'
      : cat === 'preowned_games' && (plat === 'Switch' || plat === 'Nintendo')
      ? 'Nintendo Switch Games'
      : cat === 'preowned_games' && plat !== 'all'
      ? `${plat} Games`
      : cat === 'preowned_games'
      ? 'Console Games'
      : cat.replace('_', ' ').toUpperCase();
    document.title = `${catLabel} | DJN Tech Online Store`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    if (isTestProduct(product) && !isAdminUser) {
      showToast('This item is a private test product accessible only to store administrators.');
      return;
    }
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    const targetUrl = `/product/${product.id}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ type: 'product', id: product.id }, '', targetUrl);
    }
    document.title = `${product.name} | DJN Tech Online Store`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Access Handlers
  const handleOpenAdmin = () => {
    if (isAdminUser) {
      setSelectedProduct(null);
      setCurrentPage('admin');
      if (window.location.pathname !== '/admin') {
        window.history.pushState({ type: 'admin' }, '', '/admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!authUser) {
      setIsAuthModalOpen(true);
      showToast('Please sign in with your authorized Google Account');
    } else {
      showToast('Access restricted: Only authorized admins can open Command Center');
    }
  };

  // Support deep-linking from shared product URLs, sitelinks, direct links, and browser back/forward buttons
  useEffect(() => {
    const handleUrlRoute = () => {
      const route = resolveRouteFromUrl(products.length > 0 ? products : PRODUCTS);

      // 1. DEDICATED PRODUCT ROUTE (Flipkart / Amazon Style)
      if (route.page === 'product-detail' && route.product) {
        if (isTestProduct(route.product) && !isAdminUser) {
          showToast('Access restricted: Private test product requires administrator sign-in');
          setCurrentPage('home');
          setSelectedProduct(null);
          return;
        }
        setSelectedProduct(route.product);
        setCurrentPage('product-detail');
        setActiveCategory(route.category);
        document.title = `${route.product.name} | DJN Tech Online Store`;
        return;
      }

      // 2. SPECIALS / DEALS (Sitelink: "Specials")
      const fullUrlTarget = `${window.location.pathname} ${window.location.hash} ${window.location.search}`.toLowerCase();
      if (
        fullUrlTarget.includes('special') ||
        fullUrlTarget.includes('deal') ||
        fullUrlTarget.includes('offer')
      ) {
        setSelectedProduct(null);
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('specials');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 750, behavior: 'smooth' });
          }
        }, 150);
        return;
      }

      // 3. ADMIN ROUTE
      if (route.page === 'admin') {
        if (isAdminUser) {
          setSelectedProduct(null);
          setCurrentPage('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (!authUser) {
          setIsAuthModalOpen(true);
          showToast('Please sign in with your authorized Google Account');
        } else {
          showToast('Access restricted: Administrator role required');
        }
        return;
      }

      // 4. POLICIES & INFO MODALS
      if (route.policy) {
        setActivePolicy(route.policy);
        return;
      }

      // 5. DRAWERS & MODALS (Cart, Wishlist, User Orders)
      if (fullUrlTarget.includes('cart') || fullUrlTarget.includes('checkout')) {
        setIsCartOpen(true);
        return;
      }
      if (fullUrlTarget.includes('wishlist')) {
        setIsWishlistOpen(true);
        return;
      }
      if (fullUrlTarget.includes('order') || fullUrlTarget.includes('track')) {
        if (authUser) {
          setIsUserOrdersOpen(true);
        } else {
          setIsAuthModalOpen(true);
        }
        return;
      }

      // 6. CATEGORY, PORTALS, AND HOME
      setSelectedProduct(null);
      setCurrentPage(route.page);
      setActiveCategory(route.category);
      setSelectedPlatform(route.platform);

      if (route.page === 'home') {
        document.title = siteConfig.brandName
          ? `${siteConfig.brandName} - Consoles, Controllers & Pre-Owned Games`
          : 'DJN Tech - Consoles, Controllers & Pre-Owned Games';
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, [isAdminUser, authUser, products, siteConfig.brandName]);

  // Route security guard: bounce non-admins out of admin page
  useEffect(() => {
    if (currentPage === 'admin' && !isAdminUser) {
      if (!authUser) {
        setIsAuthModalOpen(true);
      } else {
        showToast('Access restricted: Administrator privileges required');
        setCurrentPage('home');
      }
    }
  }, [currentPage, isAdminUser, authUser]);

  const handleAdminLogout = async () => {
    await signOutUser();
    setAuthUser(null);
    localStorage.removeItem('djn_auth_user');
    localStorage.removeItem('djn_admin_authenticated');
    setCurrentPage('home');
    showToast('Admin signed out');
  };

  // Add to Cart
  const handleAddToCart = (product: Product, condition?: Condition) => {
    if (product.isEnquiryOnly || product.price === 0) {
      const message = encodeURIComponent(
        product.whatsappMessage ||
          `Hi DJN Tech, I want to pre-order / enquire about: ${product.name}. Please share pricing, release date, and booking details.`
      );
      window.open(`https://wa.me/918446439374?text=${message}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (isTestProduct(product) && !isAdminUser) {
      showToast('This item is a private test product accessible only to store administrators.');
      return;
    }
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
    if (product.isEnquiryOnly || product.price === 0) {
      handleAddToCart(product, condition);
      return;
    }
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
      localStorage.setItem('djn_products_v11', JSON.stringify(prevProducts));
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
    const hardware = visibleProducts.filter(
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

    const flagshipGames = visibleProducts.filter((p) => {
      if (p.category !== 'preowned_games') return false;
      const lower = p.name.toLowerCase();
      // Skip custom printed covers in featured to keep it premium standard edition
      if (lower.includes('custom printed cover')) return false;
      return flagshipKeywords.some((kw) => lower.includes(kw));
    });

    const curated = [...hardware, ...flagshipGames];
    return curated.length > 0 ? curated : visibleProducts;
  }, [visibleProducts]);

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

    const trending = visibleProducts.filter((p) => {
      if (featuredIdSet.has(p.id)) return false; // Strictly no duplication with Featured
      const lower = p.name.toLowerCase();
      if (lower.includes('custom printed cover')) return false;
      return trendingKeywords.some((kw) => lower.includes(kw));
    });

    // Fill with remaining catalog if more variety is needed
    if (trending.length < 14) {
      const remaining = visibleProducts.filter(
        (p) => !featuredIdSet.has(p.id) && !trending.some((t) => t.id === p.id)
      );
      return [...trending, ...remaining].slice(0, 20);
    }

    return trending;
  }, [visibleProducts, featuredProducts]);

  const todaysDeals = useMemo(() => {
    const featuredIdSet = new Set(featuredProducts.map((p) => p.id));
    const trendingIdSet = new Set(trendingProducts.map((p) => p.id));

    // Products strictly not shown in Featured or Trending
    const candidates = visibleProducts.filter(
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
      return [...visibleProducts].sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return deals;
  }, [visibleProducts, featuredProducts, trendingProducts]);

  // Cart and Wishlist filtered for non-admin visitors
  const displayCart = useMemo(() => {
    if (isAdminUser) return cart;
    return cart.filter((it) => !isTestProduct(it.product));
  }, [cart, isAdminUser]);

  const displayWishlist = useMemo(() => {
    if (isAdminUser) return wishlist;
    return wishlist.filter((p) => !isTestProduct(p));
  }, [wishlist, isAdminUser]);

  // Pricing calculations
  const cartCount = displayCart.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = displayCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = 0;
  const isTestOrder = displayCart.some((it) => isTestProduct(it.product));
  const freeThreshold = siteConfig?.freeShippingThreshold ?? 1000;
  const standardFee = siteConfig?.standardShippingFee ?? 99;
  const cartShipping = isTestOrder || cartSubtotal >= freeThreshold || cartSubtotal === 0 || standardFee === 0 ? 0 : standardFee;
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
            authUser={authUser}
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
            onOpenAdmin={() => {
              if (isAdminUser) {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            isAdminAuthenticated={isAdminUser}
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

        {/* Auth Modal for Admin Login from Maintenance View */}
        {isAuthModalOpen && (
          <React.Suspense fallback={null}>
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              onLoginSuccess={handleLoginSuccess}
              title="Admin Authentication"
              subtitle="Sign in with your authorized Google Account to open the Command Center."
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
        allProducts={visibleProducts}
        onSelectProduct={handleSelectProduct}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdmin={isAdminUser ? handleOpenAdmin : undefined}
        siteConfig={siteConfig}
        authUser={authUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenUserOrders={() => setIsUserOrdersOpen(true)}
        userOrdersCount={userOrders.length}
        onOpenGiveaway={handleOpenGiveaway}
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
          {currentPage === 'product-detail' && selectedProduct && (!isTestProduct(selectedProduct) || isAdminUser) ? (
            <ProductPage
              product={selectedProduct}
              allProducts={visibleProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={displayWishlist.some((w) => w.id === selectedProduct.id)}
              isInCart={displayCart.some((c) => c.product.id === selectedProduct.id)}
              onBack={() => {
                if (window.history.length > 2) {
                  window.history.back();
                } else if (activeCategory !== 'all') {
                  handleNavigateCategory(activeCategory);
                } else {
                  handleNavigateHome();
                }
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
              products={visibleProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={displayWishlist.map((w) => w.id)}
              cartIds={displayCart.map((c) => c.product.id)}
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
              featuredProduct={visibleProducts.find((p) => !isTestProduct(p)) || visibleProducts[0]}
              onSelectProduct={handleSelectProduct}
              products={visibleProducts}
            />

            {/* Infinite Running Marquee Ticker */}
            <Marquee announcementText={siteConfig.marqueeAnnouncement} onOpenGiveaway={handleOpenGiveaway} />



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
              id="specials"
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
        onOpenAdmin={isAdminUser ? handleOpenAdmin : undefined}
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

      {/* Cart Slide-Over Drawer */}
      {isCartOpen && (
        <React.Suspense fallback={null}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={displayCart}
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
            siteConfig={siteConfig}
          />
        </React.Suspense>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <React.Suspense fallback={null}>
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            items={displayWishlist}
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
            items={displayCart}
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

      {/* Official Free Game Giveaway Modal */}
      {isGiveawayOpen && (
        <React.Suspense fallback={null}>
          <GiveawayModal
            isOpen={isGiveawayOpen}
            onClose={handleCloseGiveaway}
            formUrl="https://forms.gle/RtfL5twVXAQ8EYLE6"
          />
        </React.Suspense>
      )}

      {/* Floating Giveaway Quick Launcher Badge */}
      {!isGiveawayOpen && (
        <button
          type="button"
          onClick={handleOpenGiveaway}
          className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#145fc3] hover:from-blue-600 hover:to-indigo-600 text-white shadow-xl shadow-blue-600/35 border border-white/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="DJN Tech Free Game Giveaway"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <Gift className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-tight">Free Game Giveaway</span>
          <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black uppercase tracking-wider">
            WIN
          </span>
        </button>
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
