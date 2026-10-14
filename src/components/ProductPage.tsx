import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  Package,
  Award,
  Tag,
  MapPin,
  MessageCircle,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';
import { GameCaseFrame } from './GameCaseFrame';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isInCart: boolean;
  onBack: () => void;
  onNavigateCategory: (category: Product['category']) => void;
  onNavigateHome: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  isInCart,
  onBack,
  onNavigateCategory,
  onNavigateHome
}) => {
  const [pincode, setPincode] = useState('110001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Recommended products (same category or platform, excluding current product)
  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform))
    .slice(0, 6);

  // Frequently bought together / accessories
  const recommendedGear = allProducts
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getCategoryLabel = (cat: Product['category']) => {
    switch (cat) {
      case 'consoles':
        return 'Consoles';
      case 'controllers':
        return 'Controllers';
      case 'preowned_games':
        return 'Pre-Owned Games';
      case 'accessories':
        return 'Accessories';
      default:
        return 'All Products';
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-[#0b0f17] min-h-screen py-6 sm:py-8 text-[#212121] dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Amazon/Flipkart Breadcrumbs Bar */}
        <div className="flex items-center justify-between gap-4 py-3 mb-4 text-xs text-[#6b7280] dark:text-gray-400">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] dark:text-gray-600" />
            <button
              onClick={() => onNavigateCategory(product.category)}
              className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-medium cursor-pointer"
            >
              {getCategoryLabel(product.category)}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] dark:text-gray-600" />
            <span className="text-[#111827] dark:text-white font-semibold truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </nav>

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] hover:text-[#145fc3] dark:hover:text-[#93c5fd] transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Product Showcase Card (Flipkart/Amazon White Split Box) */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs p-6 sm:p-8 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            
            {/* LEFT COLUMN: Gallery & Buy Actions */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Main Image Box with Zoom Container */}
              <div className="relative w-full aspect-square bg-[#fbfcfd] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] rounded-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden group">
                {/* Condition Badge */}
                <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-[#1e293b] text-[#111827] dark:text-white border border-[#eaedf0] dark:border-gray-700 shadow-xs">
                  {product.condition}
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white dark:bg-[#1e293b] border border-[#eaedf0] dark:border-gray-700 flex items-center justify-center shadow-xs transition-transform hover:scale-110 cursor-pointer ${
                    isWishlisted ? 'text-[#e11d48]' : 'text-[#6b7280] dark:text-gray-300 hover:text-[#e11d48]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {product.category === 'preowned_games' ? (
                  <GameCaseFrame
                    imageUrl={product.imageUrl}
                    name={product.name}
                    platform={product.platform}
                    size="detail"
                    className="h-full py-1"
                  />
                ) : (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                )}
              </div>

              {/* Primary Sticky Buy & Cart Buttons (Flipkart/Amazon Style) */}
              <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                    isInCart
                      ? 'bg-[#10b981] hover:bg-[#059669] text-white'
                      : 'bg-[#ff9f00] hover:bg-[#f59400] text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isInCart ? 'Added in Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => onBuyNow(product)}
                  className="py-3.5 px-4 rounded-xl font-bold text-sm bg-[#fb641b] hover:bg-[#ea550a] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Quick Order Link */}
              <a
                href={`https://wa.me/918446439374?text=${encodeURIComponent(
                  `Hi DJN Tech, I am interested in purchasing: ${product.name} (₹${product.price}). Is it available for delivery?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-3 py-2.5 px-4 rounded-xl font-semibold text-xs text-[#075e54] dark:text-emerald-300 bg-[#25d366]/10 dark:bg-emerald-950/30 border border-[#25d366]/30 dark:border-emerald-800 hover:bg-[#25d366]/20 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366]" />
                <span>Order via WhatsApp (+91 84464 39374)</span>
              </a>

            </div>

            {/* RIGHT COLUMN: Product Specifications & Buy Box */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Category & Platform Tag */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-[#1a73e8] dark:text-[#60a5fa] uppercase tracking-wider">
                  {product.platform} · {product.category.replace('_', ' ')}
                </span>
                
                <button
                  onClick={handleShare}
                  className="text-xs text-[#6b7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#6b7280] dark:text-gray-300 mt-1.5 font-medium">
                {product.subtitle}
              </p>

              {/* Rating & Review Badge */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-[#f3f4f6] dark:border-[#1e293b]">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#388e3c] text-white text-xs font-bold">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs text-[#6b7280] dark:text-gray-400 font-medium">
                  {product.reviewCount} Ratings & {product.reviews?.length || 0} Reviews
                </span>
                <span className="text-xs font-semibold text-[#059669] dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  DJN Assured
                </span>
              </div>

              {/* Price Block (Amazon/Flipkart Style) */}
              <div className="py-4 border-b border-[#f3f4f6] dark:border-[#1e293b]">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-[#9ca3af] dark:text-gray-500 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base font-bold text-[#388e3c] dark:text-emerald-400">
                    {product.discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-1">
                  Inclusive of all taxes · Free express shipping above ₹1,000
                </p>
              </div>

              {/* Product Availability & Shipping Status */}
              <div className="py-3 border-b border-[#f3f4f6] dark:border-[#1e293b]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#059669] dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ready for immediate dispatch · Express Delivery available</span>
                </div>
              </div>

              {/* Delivery Pin Code Checker */}
              <div className="py-3.5 border-b border-[#f3f4f6] dark:border-[#1e293b] text-xs">
                <div className="flex items-center gap-2 mb-2 font-bold text-[#111827] dark:text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
                  <span>Delivery to Pincode</span>
                </div>
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6 digit pincode"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#d1d5db] dark:border-gray-700 bg-white dark:bg-[#161f30] text-xs font-medium text-[#111827] dark:text-white focus:outline-hidden focus:border-[#1a73e8]"
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#111827] dark:bg-blue-600 text-white text-xs font-semibold cursor-pointer shrink-0"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <p className="mt-2 text-[#059669] dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Delivery within 2–4 Business Days · Express Shipping Across India</span>
                  </p>
                )}
              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-3 gap-3 py-4 border-b border-[#f3f4f6] dark:border-[#1e293b] text-center">
                <div className="p-2.5 rounded-xl bg-[#f9fafb] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748]">
                  <RotateCcw className="w-4 h-4 text-[#1a73e8] dark:text-[#60a5fa] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#111827] dark:text-white block">7-Day Replacement</span>
                  <span className="text-[10px] text-[#6b7280] dark:text-gray-400">Hassle-free guarantee</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f9fafb] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748]">
                  <Truck className="w-4 h-4 text-[#059669] dark:text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#111827] dark:text-white block">Insured Delivery</span>
                  <span className="text-[10px] text-[#6b7280] dark:text-gray-400">Safe bubble packing</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f9fafb] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748]">
                  <ShieldCheck className="w-4 h-4 text-[#9333ea] dark:text-purple-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#111827] dark:text-white block">DJN Assured</span>
                  <span className="text-[10px] text-[#6b7280] dark:text-gray-400">100% Tested gear</span>
                </div>
              </div>

              {/* Key Features Bullet Points */}
              <div className="pt-4">
                <h3 className="font-bold text-sm text-[#111827] dark:text-white mb-2.5">Key Highlights:</h3>
                <ul className="space-y-2 text-xs text-[#4b5563] dark:text-gray-300">
                  {product.features
                    .filter(
                      (feat) =>
                        !feat.toLowerCase().includes('25-point') &&
                        !feat.toLowerCase().includes('doorstep replacement')
                    )
                    .map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#60a5fa] shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* In The Box Box */}
              {product.inTheBox && product.inTheBox.length > 0 && (
                <div className="mt-5 p-3.5 rounded-xl bg-[#f9fafb] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748]">
                  <span className="text-xs font-bold text-[#111827] dark:text-white block mb-1.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
                    In The Box:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.inTheBox.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-gray-700 text-[#4b5563] dark:text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Warranty Card */}
              {product.warranty && (
                <div className="mt-3 text-xs text-[#4b5563] dark:text-gray-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span><strong>Warranty:</strong> {product.warranty}</span>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] shadow-xs p-6 sm:p-8 mb-12">
            <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-6 flex items-center gap-2">
              <span>Verified Customer Reviews</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#f3f4f6] dark:bg-[#161f30] text-[#6b7280] dark:text-gray-400">
                {product.reviews.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-[#f9fafb] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#9ca3af] dark:text-gray-500">{rev.date}</span>
                  </div>

                  <h4 className="text-xs font-bold text-[#111827] dark:text-white">{rev.title}</h4>
                  <p className="text-xs text-[#4b5563] dark:text-gray-300 leading-relaxed">"{rev.comment}"</p>

                  <div className="pt-1 flex items-center gap-2 text-[11px] text-[#6b7280] dark:text-gray-400">
                    <span className="font-semibold text-[#111827] dark:text-white">{rev.userName}</span>
                    <span>· {rev.userLocation}</span>
                    {rev.verifiedBuyer && (
                      <span className="text-[#059669] dark:text-emerald-400 font-medium">✓ Verified Buyer</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLIPKART & AMAZON: RECOMMENDED PRODUCTS SECTION */}
        <section className="mt-8 mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e5e7eb] dark:border-[#1e293b]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                Customers Also Viewed
              </h2>
              <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
                Popular items in {getCategoryLabel(product.category)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(selected) => onSelectProduct(selected)}
                onAddToCart={(prod) => onAddToCart(prod)}
                onToggleWishlist={(prod) => onToggleWishlist(prod)}
                isWishlisted={false}
                isInCart={false}
              />
            ))}
          </div>
        </section>

        {/* FREQUENTLY BOUGHT TOGETHER / RECOMMENDED ACCESSORIES */}
        {recommendedGear.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e5e7eb] dark:border-[#1e293b]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                  Recommended Gear & Accessories
                </h2>
                <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-0.5">
                  Enhance your gaming setup with certified controllers and games
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5">
              {recommendedGear.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(selected) => onSelectProduct(selected)}
                  onAddToCart={(prod) => onAddToCart(prod)}
                  onToggleWishlist={(prod) => onToggleWishlist(prod)}
                  isWishlisted={false}
                  isInCart={false}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
