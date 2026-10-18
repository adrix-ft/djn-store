import React, { useState } from 'react';
import { Star, ExternalLink, MapPin, CheckCircle2, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { REAL_GOOGLE_REVIEWS, GOOGLE_BUSINESS_INFO, GoogleReview } from '../data/googleReviews';

// Authentic Official Google "G" Logo SVG
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

export const GoogleReviewsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'instore' | 'ps5' | 'discs' | 'delivery'>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    REAL_GOOGLE_REVIEWS.forEach((r) => {
      map[r.id] = r.helpfulCount;
    });
    return map;
  });
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const handleHelpfulClick = (id: string) => {
    if (userVoted[id]) return;
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredReviews = REAL_GOOGLE_REVIEWS.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'instore') return r.categoryTag.toLowerCase().includes('in-store');
    if (selectedFilter === 'ps5') return r.categoryTag.toLowerCase().includes('playstation');
    if (selectedFilter === 'discs') return r.categoryTag.toLowerCase().includes('discs') || r.categoryTag.toLowerCase().includes('games');
    if (selectedFilter === 'delivery') return r.categoryTag.toLowerCase().includes('delivery');
    return true;
  });

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10">
      
      {/* Google Business Header Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] p-4 sm:p-7 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] mb-6 sm:mb-8 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Google Rating & Business Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            
            {/* Google G Emblem & Rating Score */}
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#f8f9fa] dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700/80 flex items-center justify-center shadow-xs shrink-0">
                <GoogleLogoIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-none">
                    {GOOGLE_BUSINESS_INFO.rating.toFixed(1)}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      Verified Google Business
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  Based on <strong>{GOOGLE_BUSINESS_INFO.reviewCount}+ customer reviews</strong>
                </span>
              </div>
            </div>

            {/* Business Info & Location */}
            <div className="sm:border-l sm:border-gray-200 sm:dark:border-gray-800 sm:pl-6">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white">
                  {GOOGLE_BUSINESS_INFO.businessName}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                  Google Maps
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 max-w-md">
                {GOOGLE_BUSINESS_INFO.tagline}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate max-w-xs sm:max-w-md">
                  Lower Parel / Chinchpokli, Mumbai
                </span>
              </div>
            </div>

          </div>

          {/* Right: Direct CTA Buttons to Google Maps */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Review Us on Google</span>
            </a>

            <a
              href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a2333] hover:bg-gray-100 dark:hover:bg-[#223048] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700/80 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <GoogleLogoIcon className="w-3.5 h-3.5" />
              <span>View Google Profile</span>
              <ExternalLink className="w-3 h-3 text-gray-400 ml-0.5" />
            </a>
          </div>

        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100 dark:border-gray-800/80 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'instore', label: 'In-Store Experience' },
            { id: 'ps5', label: 'PlayStation 5' },
            { id: 'discs', label: 'Pre-Owned Discs' },
            { id: 'delivery', label: 'Online Delivery' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#283548]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)] hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 group"
          >
            <div>
              {/* Header: Author Avatar & Name */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Colored Letter Avatar with Google Logo Badge */}
                  <div className="relative shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-2xs"
                      style={{ backgroundColor: rev.authorAvatarColor }}
                    >
                      {rev.authorName.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-[#111827] flex items-center justify-center shadow-xs border border-gray-100 dark:border-gray-800">
                      <GoogleLogoIcon className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="font-bold text-xs sm:text-sm text-[#111827] dark:text-white truncate">
                      {rev.authorName}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                      <span>{rev.authorLocation}</span>
                      {rev.isLocalGuide && (
                        <>
                          <span>·</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">
                            Local Guide ({rev.guideReviewsCount})
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

              {/* Star Rating & Category Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 dark:bg-[#1a2333] text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50 truncate max-w-[170px]">
                  {rev.categoryTag}
                </span>
              </div>

              {/* Review Text Body */}
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                "{rev.text}"
              </p>
            </div>

            {/* Footer: Helpful feedback button & Google maps verification */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
              <button
                onClick={() => handleHelpfulClick(rev.id)}
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  userVoted[rev.id]
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40'
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-[#1e293b]'
                }`}
                title="Mark this review as helpful"
              >
                <ThumbsUp className={`w-3 h-3 ${userVoted[rev.id] ? 'fill-current' : ''}`} />
                <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
              </button>

              <a
                href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Verified on Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Footer Banner linking to Google Maps */}
      <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-xl bg-blue-50/60 dark:bg-[#111827] border border-blue-100 dark:border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <GoogleLogoIcon className="w-5 h-5 shrink-0" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Have you purchased from DJN Tech in Mumbai or online? We would love your honest feedback!
          </p>
        </div>
        <a
          href={GOOGLE_BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
        >
          <span>Rate DJN Tech on Google Maps</span>
          <span>→</span>
        </a>
      </div>

    </section>
  );
};
