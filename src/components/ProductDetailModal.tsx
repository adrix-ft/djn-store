import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Check, ChevronRight, Upload } from 'lucide-react';
import { Product, ProductReview, Condition } from '../types/store';
import { ProductVisualizer } from './ProductVisualizer';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, condition: Condition) => void;
  onBuyNow: (product: Product, condition: Condition) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isInCart: boolean;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  isInCart,
  relatedProducts,
  onSelectProduct,
  onAddReview,
}) => {
  const [selectedCondition, setSelectedCondition] = useState<Condition>(product.condition);

  // Review Form matching Screenshot 2 exactly
  const [reviewerRating, setReviewerRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;

    onAddReview(product.id, {
      userName: reviewerName,
      userLocation: 'Verified Buyer',
      rating: reviewerRating,
      title: reviewText.slice(0, 35) + '...',
      comment: reviewText,
      verifiedBuyer: true,
      platformPlayed: product.platform,
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewerName('');
      setReviewerEmail('');
      setReviewText('');
    }, 3000);
  };

  const isPreOwned = selectedCondition.includes('Pre-Owned') || selectedCondition.includes('Refurbished');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-[#e5e7eb]">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#212121] border border-[#e2e8f0] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Breadcrumb (Matching Screenshot 2: Home > Category > Product Name) */}
        <div className="px-6 py-4 border-b border-[#f1f5f9] bg-[#fafafa] flex items-center gap-1.5 text-xs text-[#64748b]">
          <span className="hover:text-[#1a73e8] cursor-pointer" onClick={onClose}>Home</span>
          <ChevronRight className="w-3 h-3 text-[#94a3b8]" />
          <span className="hover:text-[#1a73e8] cursor-pointer" onClick={onClose}>
            {product.category === 'preowned_games' ? 'Pre-Owned Games' : product.category}
          </span>
          <ChevronRight className="w-3 h-3 text-[#94a3b8]" />
          <span className="text-[#212121] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Showcase (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-8 border-b border-[#e5e7eb]">
          
          {/* Left Column: Product Visual */}
          <div className="md:col-span-6 bg-[#f8fafc] rounded-2xl p-6 flex flex-col items-center justify-center border border-[#e2e8f0] relative">
            <ProductVisualizer product={product} size="detail" />
            
            {isPreOwned && (
              <div className="mt-4 w-full p-3 bg-white rounded-xl border border-emerald-200 text-xs flex items-center gap-2.5 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-[#212121]">DJN Tested Optical Disc</p>
                  <p className="text-[11px] text-[#64748b]">Passed 100% data read & laser installation test. 7-Day Replacement Guarantee.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Condition, Buy CTAs */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a73e8] uppercase tracking-wider">
                {product.platform} · {product.condition}
              </span>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#212121] mt-1 font-display leading-tight">
                {product.name}
              </h1>

              {/* Price row matching screenshot 1 & 2: Large Blue text + Strikethrough MRP */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#1a73e8] font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}.00
                </span>
                {product.mrp > product.price && (
                  <span className="text-base text-[#9e9e9e] line-through font-mono tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')}.00
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#d0473e] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-mono">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-[#64748b] mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Condition Choice */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-[#424242] block">
                  Select Condition / Edition:
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => setSelectedCondition(product.condition)}
                    className="p-3 rounded-xl border text-left transition-all border-[#1a73e8] bg-blue-50/50 shadow-xs"
                  >
                    <p className="text-xs font-bold text-[#212121]">{product.condition}</p>
                    <p className="text-[11px] text-[#1a73e8] font-mono font-semibold mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}.00
                    </p>
                  </button>
                </div>
              </div>

              {/* Highlights Checklist */}
              <div className="mt-5 space-y-1.5 text-xs text-[#424242]">
                {product.features
                  .filter(
                    (feat) =>
                      !feat.toLowerCase().includes('25-point') &&
                      !feat.toLowerCase().includes('doorstep replacement')
                  )
                  .slice(0, 3)
                  .map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#10b981] font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actions: Add to Cart & Buy Now (Pill Buttons as seen in screenshots) */}
            <div className="pt-4 border-t border-[#f1f5f9] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAddToCart(product, selectedCondition)}
                  className={`flex-1 py-3 px-6 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isInCart
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#212121] hover:bg-[#333333] text-white shadow-md'
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onBuyNow(product, selectedCondition)}
                  className="flex-1 py-3 px-6 rounded-full text-xs font-bold bg-[#1a73e8] hover:bg-[#145fc3] text-white shadow-md transition-colors"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-3 rounded-full border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#64748b] hover:text-[#d0473e] transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#d0473e] text-[#d0473e]' : ''}`} />
                </button>
              </div>

              <p className="text-center text-[11px] text-[#64748b]">
                Free replacement within 7 days · Express Shipping Available
              </p>
            </div>

          </div>
        </div>

        {/* Section 2: "Be the first to review [Product Name]" (Matching Screenshot 2 Exactly!) */}
        <div className="p-6 sm:p-10 border-b border-[#e5e7eb] max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#e5e7eb] p-6 sm:p-8 bg-white shadow-xs">
            <h3 className="text-xl font-bold text-[#212121] font-display">
              Be the first to review “{product.name}”
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Your email address will not be published. Required fields are marked *
            </p>

            {reviewSubmitted ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your review has been submitted successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-6 space-y-5 text-xs text-[#424242]">
                
                {/* Your rating */}
                <div>
                  <label className="font-semibold block mb-1">Your rating *</label>
                  <div className="flex items-center gap-1 text-slate-300">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewerRating(star)}
                        className="p-0.5 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewerRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Your review */}
                <div>
                  <label className="font-semibold block mb-1">Your review *</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] p-3 text-xs text-[#212121] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                {/* Upload up to 5 images or videos matching Screenshot 2 */}
                <div>
                  <label className="font-semibold block mb-1">Upload up to 5 images or videos</label>
                  <div className="border border-dashed border-[#cbd5e1] rounded-xl p-4 flex items-center gap-3 bg-[#fafafa]">
                    <label className="px-4 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] rounded-md text-xs font-medium cursor-pointer shadow-xs">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-[#94a3b8]">No file chosen</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="font-semibold block mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] p-2.5 text-xs text-[#212121] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-semibold block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={reviewerEmail}
                    onChange={(e) => setReviewerEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] p-2.5 text-xs text-[#212121] focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                {/* Save info checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="rounded border-[#cbd5e1] text-[#1a73e8]"
                  />
                  <label htmlFor="saveInfo" className="text-xs text-[#64748b]">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                {/* Submit Pill Button matching Screenshot 2 */}
                <div>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#212121] hover:bg-[#333333] text-white font-bold rounded-full text-xs shadow-sm transition-colors"
                  >
                    Submit
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Reviews list */}
          <div className="mt-8">
            <h4 className="text-lg font-bold text-[#212121] mb-3">Reviews</h4>
            {product.reviews.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] text-xs">
                There are no reviews yet
              </div>
            ) : (
              <div className="space-y-3">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-[#e2e8f0] bg-white">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[#94a3b8]">{rev.date}</span>
                    </div>
                    <p className="text-xs font-bold text-[#212121] mt-1">{rev.title}</p>
                    <p className="text-xs text-[#64748b] mt-0.5">{rev.comment}</p>
                    <p className="text-[11px] text-[#212121] font-semibold mt-2">
                      {rev.userName} <span className="text-[#10b981] font-normal">✓ Verified Buyer</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Related Products (Matching Screenshot 2) */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-10 border-b border-[#e5e7eb]">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#212121] font-display">Related products</h3>
              <p className="text-xs text-[#64748b] mt-0.5">
                You may also like these popular picks! Explore our related products and find more styles you'll love
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="rounded-xl border border-[#e5e7eb] bg-white p-3 cursor-pointer group hover:shadow-md transition-all text-center flex flex-col justify-between"
                >
                  <div className="relative bg-[#f8fafc] rounded-lg p-2 mb-2 overflow-hidden">
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1a73e8] text-white">
                      -{rel.discountPercent}%
                    </span>
                    <ProductVisualizer product={rel} size="sm" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#212121] group-hover:text-[#1a73e8] line-clamp-1 transition-colors">
                      {rel.name}
                    </h5>
                    <div className="mt-1 font-mono text-xs flex items-center justify-center gap-1.5">
                      <span className="font-bold text-[#1a73e8]">₹{rel.price.toLocaleString('en-IN')}.00</span>
                      <span className="text-[11px] text-[#9e9e9e] line-through">₹{rel.mrp.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
