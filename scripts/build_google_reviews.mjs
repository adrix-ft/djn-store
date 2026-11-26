import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('src/data/raw_google_reviews.json', 'utf8'));

const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#1E40AF', '#7C3AED', '#0F9D58', '#0891B2', '#D97706'];

function getCategory(text = '') {
  const t = text.toLowerCase();
  if (t.includes('repair') || t.includes('hdmi') || t.includes('solder') || t.includes('dead') || t.includes('fix')) {
    return 'Console Repair & Service';
  }
  if (t.includes('controller') || t.includes('stick drift') || t.includes('dualsense') || t.includes('tmr')) {
    return 'Controllers & Accessories';
  }
  if (t.includes('ps5') || t.includes('playstation 5')) {
    return 'PlayStation 5 & Gear';
  }
  if (t.includes('disc') || t.includes('cd') || t.includes('game') || t.includes('titles') || t.includes('uncharted') || t.includes('spiderman')) {
    return 'Pre-Owned Games & Discs';
  }
  if (t.includes('sell') || t.includes('sold') || t.includes('buyback') || t.includes('ps4') || t.includes('xbox') || t.includes('switch') || t.includes('price')) {
    return 'Console Buyback & Trade-In';
  }
  if (t.includes('delivery') || t.includes('pickup') || t.includes('online') || t.includes('rapido') || t.includes('kashmir')) {
    return 'Express Delivery & Service';
  }
  return 'Verified Google Review';
}

const formatted = raw.map((item, idx) => {
  const categoryTag = getCategory(item.text);
  const color = colors[idx % colors.length];

  const validPhotos = Array.isArray(item.reviewImageUrls) && item.reviewImageUrls.length > 0
    ? item.reviewImageUrls.filter((u) => !u.includes('googleusercontent.com/grass-cs/'))
    : [];

  return {
    id: `g-rev-${idx + 1}-${(item.name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    authorName: item.name || 'Verified Customer',
    authorLocation: 'Mumbai',
    authorAvatarColor: color,
    authorAvatarUrl: item.reviewerPhotoUrl || undefined,
    isLocalGuide: Boolean(item.isLocalGuide),
    guideReviewsCount: item.reviewerNumberOfReviews || 1,
    rating: item.stars || 5,
    relativeTime: item.publishAt || 'Recently',
    text: item.text || 'Great experience with DJN Tech!',
    categoryTag,
    photos: validPhotos.length > 0 ? validPhotos : undefined,
    ownerReply: item.responseFromOwnerText ? {
      author: 'DJN TECH (Owner)',
      text: item.responseFromOwnerText.trim(),
      relativeTime: item.publishAt || 'Recently',
    } : undefined,
  };
});

// Priority sorting: Reviews with customer photos always appear FIRST in the carousel
const sortedReviews = [...formatted].sort((a, b) => {
  const aHas = Boolean(a.photos && a.photos.length > 0) ? 1 : 0;
  const bHas = Boolean(b.photos && b.photos.length > 0) ? 1 : 0;
  if (bHas !== aHas) {
    return bHas - aHas; // Images first
  }
  return 0;
});

const fileContent = `export interface GoogleReview {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatarColor: string;
  authorAvatarUrl?: string;
  isLocalGuide?: boolean;
  guideReviewsCount?: number;
  authorReviewCount?: number;
  authorPhotoCount?: number;
  rating: number;
  relativeTime: string;
  text: string;
  categoryTag: string;
  helpfulCount: number;
  photos?: string[];
  ownerReply?: {
    author: string;
    text: string;
    relativeTime: string;
  };
}

export const GOOGLE_BUSINESS_INFO = {
  businessName: 'DJN TECH',
  tagline: 'Gaming Consoles, Controllers & Pre-Owned Games Store',
  rating: 5.0,
  reviewCount: 246,
  googleMapsUrl: 'https://share.google/9rz8FY2PBoxccfNV4',
  address: 'Chamunda CHS, 101, Delisle Rd, near to Pragati Industrial Estate, Lower Parel East, Shastri Nagar, Adarsh Nagar, Worli, Mumbai, Maharashtra 400011',
  phone: '+91 84464 39374',
  openingHours: 'Mon - Sat: 12:00 PM – 9:00 PM (Sun: Closed)',
};

export const REAL_GOOGLE_REVIEWS: GoogleReview[] = ${JSON.stringify(sortedReviews, null, 2)};
`;

fs.writeFileSync('src/data/googleReviews.ts', fileContent, 'utf8');
console.log(`[Google Reviews] Successfully wrote ${sortedReviews.length} verified reviews into src/data/googleReviews.ts (Images prioritised first)`);
