import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  ExternalLink,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  CornerDownRight,
  X,
  Clock,
  Sparkles,
  ThumbsUp,
  ShieldCheck
} from 'lucide-react';
import { REAL_GOOGLE_REVIEWS, GOOGLE_BUSINESS_INFO, GoogleReview } from '../data/googleReviews';
import { fetchGoogleReviewsFromDB } from '../lib/supabase';

// Official Multicolored Google "G" Logo SVG
export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Helper to check for expired Google CDN review photos (grass-cs tokens return 403 Forbidden)
const isBrokenGooglePhoto = (url: string) => {
  return !url || url.includes('googleusercontent.com/grass-cs/');
};

// Reviewer Avatar with automatic Google Photo loading and graceful fallback to colored initial
const ReviewerAvatar: React.FC<{
  name: string;
  avatarUrl?: string;
  fallbackColor?: string;
}> = ({ name, avatarUrl, fallbackColor = '#4285F4' }) => {
  const [imgError, setImgError] = useState(false);

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-10 h-10 rounded-full object-cover shadow-2xs bg-gray-100 dark:bg-gray-800"
      />
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-2xs select-none"
      style={{ backgroundColor: fallbackColor }}
    >
      {name.trim().charAt(0).toUpperCase() || 'U'}
    </div>
  );
};

export const GoogleReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>(REAL_GOOGLE_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'buyback' | 'ps5' | 'repair' | 'nintendo' | 'discs' | 'photos'
  >('all');
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Helper to get valid, non-broken customer photos
  const getValidPhotos = (photos?: string[], failedMap: Record<string, boolean> = failedPhotos) => {
    if (!photos || photos.length === 0) return [];
    return photos.filter((p) => !isBrokenGooglePhoto(p) && !failedMap[p]);
  };

  // Mouse drag refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Load reviews from Supabase database with local fallback
  useEffect(() => {
    let isMounted = true;
    fetchGoogleReviewsFromDB().then((dbReviews) => {
      if (isMounted && dbReviews && dbReviews.length > 0) {
        // Merge Supabase reviews with default genuine reviews without duplicates
        const map = new Map<string, GoogleReview>();
        REAL_GOOGLE_REVIEWS.forEach((r) => map.set(r.id, r));
        dbReviews.forEach((r) => {
          const cleanPhotos = (r.photos || []).filter((p) => !isBrokenGooglePhoto(p));
          map.set(r.id, { ...r, photos: cleanPhotos });
        });
        setReviews(Array.from(map.values()));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Close photo lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePhoto) {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 15);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [reviews, selectedFilter]);

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = Math.max(el.clientWidth * 0.75, 340);
    el.scrollBy({
      left: dir === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Mouse Drag / Swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = reviews.filter((r) => {
    const textLower = (r.text || '').toLowerCase();
    const tagLower = (r.categoryTag || '').toLowerCase();

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'buyback') {
      return (
        tagLower.includes('buyback') ||
        textLower.includes('sold') ||
        textLower.includes('sell') ||
        textLower.includes('resale') ||
        textLower.includes('bought from us') ||
        textLower.includes('deal was fine')
      );
    }
    if (selectedFilter === 'ps5') {
      return (
        tagLower.includes('ps5') ||
        tagLower.includes('playstation 5') ||
        textLower.includes('ps5') ||
        textLower.includes('playstation 5')
      );
    }
    if (selectedFilter === 'repair') {
      return (
        tagLower.includes('repair') ||
        textLower.includes('repair') ||
        textLower.includes('hdmi') ||
        textLower.includes('stick') ||
        textLower.includes('drift') ||
        textLower.includes('solder') ||
        textLower.includes('fixed') ||
        textLower.includes('diagnosed')
      );
    }
    if (selectedFilter === 'nintendo') {
      return (
        tagLower.includes('nintendo') ||
        textLower.includes('switch') ||
        textLower.includes('nintendo') ||
        textLower.includes('3ds')
      );
    }
    if (selectedFilter === 'discs') {
      return (
        tagLower.includes('discs') ||
        tagLower.includes('games') ||
        textLower.includes('disc') ||
        textLower.includes('cd') ||
        textLower.includes('games') ||
        textLower.includes('titles') ||
        textLower.includes('uncharted')
      );
    }
    if (selectedFilter === 'photos') {
      return getValidPhotos(r.photos, failedPhotos).length > 0;
    }
    return true;
  });

  const reviewsWithPhotosCount = reviews.filter(
    (r) => getValidPhotos(r.photos, failedPhotos).length > 0
  ).length;

  const filterButtons: {
    id: 'all' | 'buyback' | 'ps5' | 'repair' | 'nintendo' | 'discs' | 'photos';
    label: string;
  }[] = [
    { id: 'all', label: `All Reviews (${reviews.length})` },
    { id: 'buyback', label: 'Console Buyback' },
    { id: 'ps5', label: 'PlayStation 5' },
    { id: 'repair', label: 'Repairs & HDMI' },
    { id: 'nintendo', label: 'Nintendo & Switch' },
    { id: 'discs', label: 'Pre-Owned Discs' },
  ];

  if (reviewsWithPhotosCount > 0) {
    filterButtons.push({
      id: 'photos',
      label: `Customer Photos (${reviewsWithPhotosCount})`,
    });
  }

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10">
      
      {/* =========================================================================
          ELFSIGHT-STYLE GOOGLE REVIEWS WIDGET CONTAINER
          100% Free · Unlimited Views · Direct Database Powered · No Watermarks
         ========================================================================= */}
      <div className="w-full rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] p-4 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-colors">
        
        {/* TOP BAR: Official Google Header Badge (Exact Elfsight Widget Look) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
          
          {/* Left: Google Logo + Rating Score + Verified Badge */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#f8f9fa] dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700/80 flex items-center justify-center shadow-xs shrink-0">
              <GoogleLogoIcon className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-gray-900 dark:text-white">
                  EXCELLENT
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span>
                  <strong>{GOOGLE_BUSINESS_INFO.rating.toFixed(1)}</strong> rating based on{' '}
                  <strong className="text-gray-900 dark:text-white">{GOOGLE_BUSINESS_INFO.reviewCount}+ reviews</strong>
                </span>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                  Verified on Google
                </span>
              </div>
            </div>
          </div>

          {/* Right: Write Review Button & Carousel Left/Right Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
              title="Review DJN Tech on Google Maps"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </a>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1 pl-1">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2333] text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 shadow-2xs'
                    : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
                }`}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2333] text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 shadow-2xs'
                    : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
                }`}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-4 pb-4 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Filter:
          </span>
          {filterButtons.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#283548]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* SLIDING CAROUSEL TRACK (Elfsight Slider Layout) */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-1 cursor-grab active:cursor-grabbing select-none"
        >
          {filteredReviews.map((rev) => {
            const isExpanded = expandedReviews[rev.id];
            const isLong = rev.text && rev.text.length > 150;
            const displayText = isLong && !isExpanded ? `${rev.text.slice(0, 150)}...` : rev.text;
            const cardPhotos = getValidPhotos(rev.photos, failedPhotos);

            return (
              <div
                key={rev.id}
                className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-2xl bg-[#fafafa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#243048] p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-200"
              >
                <div>
                  
                  {/* Card Header: Avatar + Google Badge + User Info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      
                      {/* Avatar with Google Overlay */}
                      <div className="relative shrink-0">
                        <ReviewerAvatar
                          name={rev.authorName}
                          avatarUrl={rev.authorAvatarUrl}
                          fallbackColor={rev.authorAvatarColor}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-[#161f30] flex items-center justify-center shadow-xs border border-gray-100 dark:border-gray-800">
                          <GoogleLogoIcon className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                            {rev.authorName}
                          </p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                          <span>{rev.authorLocation}</span>
                          {rev.isLocalGuide && (
                            <>
                              <span>·</span>
                              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                                Local Guide
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                    </div>

                    <span className="text-[11px] text-gray-400 shrink-0">
                      {rev.relativeTime}
                    </span>
                  </div>

                  {/* Rating Stars & Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {rev.categoryTag && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80 truncate max-w-[150px]">
                        {rev.categoryTag}
                      </span>
                    )}
                  </div>

                  {/* Review Text with Read More */}
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{displayText}"
                  </p>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(rev.id)}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1 cursor-pointer"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}

                  {/* Customer Uploaded Verification Photos */}
                  {cardPhotos.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-200/60 dark:border-gray-800">
                      <p className="text-[10px] font-medium text-gray-400 mb-1.5">
                        Customer Photos ({cardPhotos.length}):
                      </p>
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {cardPhotos.map((photo, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePhoto(photo);
                            }}
                            className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0 hover:opacity-90 transition-opacity cursor-pointer group/img"
                            title="Click to zoom photo"
                          >
                            <img
                              src={photo}
                              alt={`${rev.authorName} photo ${i + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-200"
                              loading="lazy"
                              onError={() => {
                                setFailedPhotos((prev) => ({ ...prev, [photo]: true }));
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verified Owner Reply */}
                  {rev.ownerReply && (
                    <div className="mt-3 p-2.5 rounded-xl bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-gray-800 text-[11px]">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white mb-0.5">
                        <CornerDownRight className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Response from DJN TECH</span>
                        <span className="text-[10px] font-normal text-gray-400 ml-auto">
                          {rev.ownerReply.relativeTime}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 pl-4">
                        {rev.ownerReply.text}
                      </p>
                    </div>
                  )}

                </div>

                {/* Footer: Verified on Google Maps Badge */}
                <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>

                  <a
                    href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* BOTTOM STORE INFO BANNER */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span>
              <strong>Visit DJN Tech Store:</strong> Delisle Rd, Lower Parel East, Worli, Mumbai 400011 (Mon - Sat 12 PM – 9 PM)
            </span>
          </div>

          <a
            href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* FULL PHOTO LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl p-2 sm:p-3 overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              title="Close image"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhoto}
              alt="Customer review photo"
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </section>
  );
};
