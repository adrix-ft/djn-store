export interface GoogleReview {
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
  reviewCount: 243,
  googleMapsUrl: 'https://share.google/9rz8FY2PBoxccfNV4',
  address: 'Chamunda CHS, 101, Delisle Rd, near to Pragati Industrial Estate, Lower Parel East, Shastri Nagar, Adarsh Nagar, Worli, Mumbai, Maharashtra 400011',
  phone: '+91 84464 39374',
  openingHours: 'Mon - Sat: 12:00 PM – 9:00 PM (Sun: Closed)',
};

export const REAL_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-g-kevin',
    authorName: 'Kevin Borkar',
    authorLocation: 'Mumbai',
    authorAvatarColor: '#1E40AF',
    authorAvatarUrl: '/reviews/kevin_avatar.png',
    authorReviewCount: 5,
    authorPhotoCount: 4,
    rating: 5,
    relativeTime: '6 months ago',
    text: "I sold my PS4 slim in person to DJN Tech. He checked the console in person, confirmed it's working condition, gave me a fairly decent value for it and he sent me the whole amount Instantly.",
    categoryTag: 'Console Buyback & Test',
    helpfulCount: 42,
    photos: [
      '/reviews/kevin_ps4_controller.png',
      '/reviews/kevin_ps4_tv_screen.png',
      '/reviews/kevin_ps4_slim_console.png',
    ],
    ownerReply: {
      author: 'DJN TECH (owner)',
      text: 'Thanks brother 🙏',
      relativeTime: '4 months ago',
    },
  },
  {
    id: 'rev-g-sahil',
    authorName: 'Sahil Sawant',
    authorLocation: 'Mumbai',
    authorAvatarColor: '#0F9D58',
    isLocalGuide: true,
    guideReviewsCount: 42,
    authorReviewCount: 42,
    rating: 5,
    relativeTime: '3 months ago',
    text: 'Best place in Mumbai for pre-owned gaming consoles and original game discs at unbeatable prices! Danny was very polite and checked everything in front of me before purchase. Highly recommended.',
    categoryTag: 'Pre-Owned Consoles & Games',
    helpfulCount: 29,
    ownerReply: {
      author: 'DJN TECH (owner)',
      text: 'Thank you so much Sahil! Enjoy gaming 🎮',
      relativeTime: '3 months ago',
    },
  },
  {
    id: 'rev-g-pratham',
    authorName: 'Pratham Joshi',
    authorLocation: 'Mumbai',
    authorAvatarColor: '#EA4335',
    authorReviewCount: 8,
    authorPhotoCount: 2,
    rating: 5,
    relativeTime: '4 months ago',
    text: 'Top notch service and quality! Bought a PS5 console and pre-owned DualSense controller. Danny explained all warranty terms clearly. 100% genuine seller.',
    categoryTag: 'PlayStation 5 & Service',
    helpfulCount: 34,
    ownerReply: {
      author: 'DJN TECH (owner)',
      text: 'Glad you had a great experience Pratham bhai 🙏',
      relativeTime: '4 months ago',
    },
  },
  {
    id: 'rev-g-nikhil',
    authorName: 'Nikhil Jain',
    authorLocation: 'Thane',
    authorAvatarColor: '#FBBC05',
    authorReviewCount: 14,
    rating: 5,
    relativeTime: '5 months ago',
    text: 'Super fast delivery and great condition of pre-owned discs, really worth it! The game discs look brand new with zero scratches. Will buy more games soon.',
    categoryTag: 'Express Delivery & Discs',
    helpfulCount: 21,
    ownerReply: {
      author: 'DJN TECH (owner)',
      text: 'Thanks Nikhil! Keep gaming.',
      relativeTime: '5 months ago',
    },
  },
  {
    id: 'rev-g-aditya',
    authorName: 'Aditya Kulkarni',
    authorLocation: 'Pune',
    authorAvatarColor: '#4285F4',
    isLocalGuide: true,
    guideReviewsCount: 16,
    authorReviewCount: 16,
    authorPhotoCount: 3,
    rating: 5,
    relativeTime: '5 months ago',
    text: 'Ordered pre-owned PS4 game discs online. Delivery was quick with bubble packaging and discs installed smoothly without any error. DJN Tech is completely reliable.',
    categoryTag: 'Online Express Delivery',
    helpfulCount: 18,
    ownerReply: {
      author: 'DJN TECH (owner)',
      text: 'Thank you for trusting DJN Tech Aditya! Enjoy your games.',
      relativeTime: '5 months ago',
    },
  },
];
