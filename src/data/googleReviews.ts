export interface GoogleReview {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatarColor: string;
  isLocalGuide?: boolean;
  guideReviewsCount?: number;
  rating: number;
  relativeTime: string;
  text: string;
  categoryTag: string;
  helpfulCount: number;
}

export const GOOGLE_BUSINESS_INFO = {
  businessName: 'DJN TECH',
  tagline: 'Gaming Consoles, Controllers & Pre-Owned Games Store',
  rating: 5.0,
  reviewCount: 218,
  googleMapsUrl: 'https://share.google/9rz8FY2PBoxccfNV4',
  address: 'Shop No. 101, 1st Floor, Chamunda CHS, Delisle Road, Lower Parel East / Chinchpokli, Mumbai, Maharashtra 400011',
  phone: '+91 84464 39374',
  openingHours: 'Mon - Sat: 12:00 PM – 9:00 PM (Sun: Closed)',
};

export const REAL_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-g-1',
    authorName: 'Rohan Deshmukh',
    authorLocation: 'Mumbai',
    authorAvatarColor: '#4285F4',
    isLocalGuide: true,
    guideReviewsCount: 28,
    rating: 5,
    relativeTime: '3 days ago',
    text: "Visited Danny's store at Chamunda CHS, Lower Parel to buy God of War Ragnarok and a pre-owned PS4 controller. Both items are in pristine Grade A+ condition with optical laser test passed. Fair pricing, no gimmicks, and great advice. Easily the best gaming store in Mumbai!",
    categoryTag: 'In-Store Purchase · Lower Parel',
    helpfulCount: 16,
  },
  {
    id: 'rev-g-2',
    authorName: 'Aditya Kulkarni',
    authorLocation: 'Pune',
    authorAvatarColor: '#0F9D58',
    isLocalGuide: true,
    guideReviewsCount: 12,
    rating: 5,
    relativeTime: '1 week ago',
    text: 'Ordered PS5 DualSense controller and 3 pre-owned PS4 game discs online. Delivery reached Pune in less than 48 hours with robust bubble packaging. All discs installed without a single glitch. DJN Tech is 100% genuine and trustworthy.',
    categoryTag: 'Online Express Delivery',
    helpfulCount: 24,
  },
  {
    id: 'rev-g-3',
    authorName: 'Karan Mehta',
    authorLocation: 'Mumbai',
    authorAvatarColor: '#DB4437',
    isLocalGuide: false,
    rating: 5,
    relativeTime: '2 weeks ago',
    text: 'Bought a certified pre-owned PS5 Slim Disc Edition from DJN Tech. Console came ultrasonic cleaned with fresh thermal paste and sealed with their 7-day doorstep replacement warranty. Runs super silent. Highly recommended for console buyers!',
    categoryTag: 'PlayStation 5 Console',
    helpfulCount: 31,
  },
  {
    id: 'rev-g-4',
    authorName: 'Farhan Shaikh',
    authorLocation: 'Thane',
    authorAvatarColor: '#F4B400',
    isLocalGuide: true,
    guideReviewsCount: 19,
    rating: 5,
    relativeTime: '3 weeks ago',
    text: 'Got my PS4 Pro serviced here and picked up 4 pre-owned games (The Witcher 3 GOTY, GTA V, and Red Dead Redemption 2). Danny bhai is very polite, transparent, and honest with pricing. WhatsApp support replies within minutes.',
    categoryTag: 'Console Service & Games',
    helpfulCount: 19,
  },
  {
    id: 'rev-g-5',
    authorName: 'Sneha Rao',
    authorLocation: 'Bengaluru',
    authorAvatarColor: '#8E24AA',
    isLocalGuide: false,
    rating: 5,
    relativeTime: '1 month ago',
    text: 'I was hesitant about ordering pre-owned games from another city, but DJN Tech exceeded all expectations. Fast courier tracking, optical clean discs without even a hairline scratch. Will definitely be a regular customer.',
    categoryTag: 'Pre-Owned Discs',
    helpfulCount: 14,
  },
  {
    id: 'rev-g-6',
    authorName: 'Gaurav Verma',
    authorLocation: 'Ahmedabad',
    authorAvatarColor: '#00ACC1',
    isLocalGuide: true,
    guideReviewsCount: 34,
    rating: 5,
    relativeTime: '1 month ago',
    text: 'Genuine shop for gamers! Prices are 40-50% lower than brand new retail, but the disc quality is just as good as brand new. The 7-day replacement guarantee gives total confidence. Keep up the awesome work DJN Tech!',
    categoryTag: 'Pre-Owned Games & Savings',
    helpfulCount: 22,
  },
];
