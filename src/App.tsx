/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Category, Platform, Condition, Order, ProductReview, SiteConfig } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductSectionCarousel } from './components/ProductSectionCarousel';
import { ProductPage } from './components/ProductPage';
import { CategoryPage } from './components/CategoryPage';
import { Marquee } from './components/Marquee';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HomeTrustSections } from './components/HomeTrustSections';
import { Footer } from './components/Footer';
import { SellConsolesPage } from './components/SellConsolesPage';
import { RepairConsolePage } from './components/RepairConsolePage';
import { AdminPanel } from './components/AdminPanel';
import { AdminPinModal } from './components/AdminPinModal';
import { DEFAULT_SITE_CONFIG } from './data/siteConfig';
import {
  fetchProductsFromDB,
  fetchSiteConfigFromDB,
  fetchOrdersFromDB,
  createOrderInDB,
} from './lib/supabase';
import { Check } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('djn_products_v6');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return PRODUCTS;
  });

  // Dynamic Site Configuration
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('djn_site_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_SITE_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('djn_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Sync with Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadFromSupabase() {
      try {
        const [dbProducts, dbConfig, dbOrders] = await Promise.all([
          fetchProductsFromDB(),
          fetchSiteConfigFromDB(),
          fetchOrdersFromDB(),
        ]);
        if (isMounted) {
          if (dbProducts && dbProducts.length > 0) {
            setProducts(dbProducts);
          }
          if (dbConfig) {
            setSiteConfig(dbConfig);
          }
          if (dbOrders && dbOrders.length > 0) {
            setOrders(dbOrders);
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
          paymentMethod: 'cod',
        },
        status: 'Dispatched',
        estimatedDelivery: '14 Oct 2026',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('djn_admin_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('djn_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('djn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('djn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('djn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('djn_products_v5', JSON.stringify(products));
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

  // Instant Buy Now
  const handleBuyNow = (product: Product, condition?: Condition) => {
    handleAddToCart(product, condition);
    setIsCheckoutOpen(true);
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

  // Apply Coupon
  const handleApplyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const targetCode = siteConfig.promoCode.trim().toUpperCase();
    if (cleanCode === targetCode || cleanCode === 'DJN2026' || cleanCode === 'WELCOME10') {
      setAppliedCoupon(cleanCode);
      showToast(`Coupon "${cleanCode}" applied successfully!`);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast(`Coupon removed`);
  };

  // Order Placement Success
  const handleOrderSuccess = (order: Order) => {
    setCompletedOrder(order);
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);

    // Persist order to Supabase
    createOrderInDB(order).catch((err) => {
      console.warn('[Supabase] Failed to persist order online:', err);
    });
  };

  // Section collections for Home page (dynamically adapting to hero or database products)
  const featuredProducts = useMemo(() => {
    const curated = products.filter((p) => p.badge || p.rating >= 4.8);
    return curated.length > 0 ? curated : products;
  }, [products]);

  const trendingProducts = useMemo(() => {
    const curated = products.filter(
      (p) => p.category === 'preowned_games' || p.category === 'controllers'
    );
    return curated.length > 0 ? curated : products;
  }, [products]);

  const todaysDeals = useMemo(() => {
    const curated = products.filter((p) => p.discountPercent >= 10);
    return curated.length > 0 ? curated : products;
  }, [products]);

  // Pricing calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount =
    appliedCoupon === 'DJN10'
      ? Math.round(cartSubtotal * 0.1)
      : appliedCoupon === 'GAMEON'
      ? Math.min(250, cartSubtotal)
      : 0;
  const cartShipping = cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);



  // Admin View Render
  if (currentPage === 'admin') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm font-medium border border-gray-700">
          <Check className="w-4 h-4 text-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation with theme toggle and live order track */}
      <Header
        cartCount={cart.reduce((acc, it) => acc + it.quantity, 0)}
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
      />

      {/* Main Content Area: Conditional Routing Based on currentPage */}
      <main className="flex-1 pb-16 md:pb-0">
        
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
              subtitle="Most viewed games and high-velocity console bundles"
              badgeText="🔥 High Demand This Week"
              badgeDotClass="bg-amber-500 animate-pulse"
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
              subtitle="Discounted optical discs, pre-owned consoles & refurbished accessories"
              badgeText="⚡ Biggest Price Drops · Up to 55% OFF"
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
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Admin Security PIN Modal */}
      <AdminPinModal
        isOpen={isAdminPinModalOpen}
        onClose={() => setIsAdminPinModalOpen(false)}
        onSuccess={handleAdminPinSuccess}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveItem={(id) => handleToggleWishlist({ id } as any)}
        onAddToCart={(p) => handleAddToCart(p)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Express Checkout Modal */}
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
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

    </div>
  );
}
