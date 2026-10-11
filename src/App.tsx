/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Category, Platform, Condition, Order, ProductReview } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
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
import { Check, Home, LayoutGrid, Heart, ShoppingBag, Sun, Moon } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('djn_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    localStorage.setItem('djn_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
  };

  // Multi-page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'all' | Category | 'product-detail'>('home');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCategory = (cat: Category | 'all') => {
    setSelectedProduct(null);
    setCurrentPage(cat);
    setActiveCategory(cat);
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
    if (code === 'DJN10' || code === 'GAMEON') {
      setAppliedCoupon(code);
      showToast(`Coupon "${code}" applied successfully!`);
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
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Section collections for Home page
  const featuredProducts = useMemo(() => {
    return products.filter((p) => [
      'gow-ragnarok-ps5',
      'spiderman-2-ps5',
      'dualsense-midnight-black',
      'ps4-pro-1tb-preowned',
      'ps5-slim-disc',
      'elden-ring-ps5'
    ].includes(p.id));
  }, [products]);

  const trendingProducts = useMemo(() => {
    return products.filter((p) => [
      'elden-ring-ps5',
      'black-myth-wukong-ps5',
      'dualsense-cosmic-red',
      'ps5-slim-disc',
      'last-of-us-part1-ps5',
      'ghost-of-tsushima-dc-ps5'
    ].includes(p.id));
  }, [products]);

  const todaysDeals = useMemo(() => {
    return products.filter((p) => [
      'bloodborne-goty-ps4',
      'red-dead-2-ps4',
      'gta-v-ps5',
      'dualshock-4-jet-black-preowned',
      'gow-2018-ps4',
      'resident-evil-4-ps5'
    ].includes(p.id));
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

  // Clean Circular Categories for Home
  const categoryCircles = [
    {
      id: 'consoles' as const,
      name: 'Consoles',
      platform: 'all' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/game-console-300x300.png',
    },
    {
      id: 'controllers' as const,
      name: 'Controllers',
      platform: 'all' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/joystick-300x300.png',
    },
    {
      id: 'preowned_games' as const,
      name: 'PS5 Games',
      platform: 'PS5' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/vinyl-record-300x300.png',
    },
    {
      id: 'preowned_games' as const,
      name: 'PS4 Games',
      platform: 'PS4' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/ps4-300x300.png',
    },
    {
      id: 'consoles' as const,
      name: 'Xbox',
      platform: 'Xbox' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/xbox-300x300.png',
    },
    {
      id: 'accessories' as const,
      name: 'Accessories',
      platform: 'all' as const,
      imageUrl: 'https://psxgaming.com/wp-content/uploads/2025/03/gamepad-1-300x300.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-[#212121] dark:text-gray-100 transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#111827] dark:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm font-medium border border-gray-700">
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
        onSelectCategory={(cat) => handleNavigateCategory(cat)}
        activeCategory={activeCategory}
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
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
        ) : currentPage !== 'home' && currentPage !== 'product-detail' ? (
          
          /* VIEW 2: DEDICATED CATEGORY / CATALOG PAGE */
          <CategoryPage
            category={currentPage}
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
          <div className="space-y-10 sm:space-y-16 pb-12 sm:pb-16">
            
            {/* Minimalist Hero Section with Aligned Visual Hierarchy */}
            <Hero
              onExploreGames={() => handleNavigateCategory('preowned_games')}
              onExploreConsoles={() => handleNavigateCategory('consoles')}
              featuredProduct={products[0]}
              onSelectProduct={handleSelectProduct}
            />

            {/* Infinite Running Marquee Ticker */}
            <Marquee />

            {/* Categories Section - Positioned Directly under Hero & Marquee */}
            <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-2">
              <div className="text-center mb-6">
                <p className="text-xs font-semibold tracking-wider text-[#9ca3af] dark:text-gray-400 uppercase">
                  Explore by Category
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
                {categoryCircles.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigateCategory(cat.id)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] group-hover:border-[#111827] dark:group-hover:border-blue-500 group-hover:shadow-md flex items-center justify-center overflow-hidden p-3.5 transition-all duration-300">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#4b5563] dark:text-gray-300 group-hover:text-[#111827] dark:group-hover:text-white mt-3 tracking-tight transition-colors">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#e5e7eb] dark:border-[#1e293b]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                    Featured Products
                  </h2>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
                    Popular consoles and verified gaming gear
                  </p>
                </div>
                <button
                  onClick={() => handleNavigateCategory('all')}
                  className="text-xs font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline cursor-pointer"
                >
                  View all →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                {featuredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    isInCart={cart.some((c) => c.product.id === prod.id)}
                  />
                ))}
              </div>
            </section>

            {/* Trending Now Section */}
            <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#e5e7eb] dark:border-[#1e293b]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                    Trending Now
                  </h2>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
                    Top sellers and trending titles this week
                  </p>
                </div>
                <button
                  onClick={() => handleNavigateCategory('all')}
                  className="text-xs font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline cursor-pointer"
                >
                  Browse all →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                {trendingProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    isInCart={cart.some((c) => c.product.id === prod.id)}
                  />
                ))}
              </div>
            </section>

            {/* Special Deals Section */}
            <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#e5e7eb] dark:border-[#1e293b]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                    Special Deals
                  </h2>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
                    Discounted pre-owned discs and refurbished accessories
                  </p>
                </div>
                <button
                  onClick={() => handleNavigateCategory('preowned_games')}
                  className="text-xs font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline cursor-pointer"
                >
                  See all deals →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                {todaysDeals.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    isInCart={cart.some((c) => c.product.id === prod.id)}
                  />
                ))}
              </div>
            </section>

            {/* Trust Pillars & Verified Customer Reviews ("Why Choose DJN Tech" removed) */}
            <HomeTrustSections onShopNow={() => handleNavigateCategory('all')} />

          </div>
        )}

      </main>

      {/* Fully Functional Footer */}
      <Footer
        onSelectCategory={handleNavigateCategory}
        onOpenPolicy={(type) => setActivePolicy(type)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Customer Policy & Information Modal */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
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
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Sticky Mobile Bottom Navigation Bar (Ultra-responsive shopping experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-t border-[#e5e7eb] dark:border-[#1e293b] px-2 py-2 grid grid-cols-5 items-center justify-items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.4)]">
        <button
          onClick={handleNavigateHome}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            currentPage === 'home'
              ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavigateCategory('all')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            currentPage !== 'home' && currentPage !== 'product-detail'
              ? 'text-[#1a73e8] dark:text-[#60a5fa] font-bold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 bg-[#d0473e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 right-0 w-4 h-4 bg-[#1a73e8] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
          <span>Cart</span>
        </button>

        <button
          onClick={handleToggleTheme}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
          <span>Theme</span>
        </button>
      </div>

    </div>
  );
}
