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
  reviewCount: 246,
  googleMapsUrl: 'https://share.google/9rz8FY2PBoxccfNV4',
  address: 'Chamunda CHS, 101, Delisle Rd, near to Pragati Industrial Estate, Lower Parel East, Shastri Nagar, Adarsh Nagar, Worli, Mumbai, Maharashtra 400011',
  phone: '+91 84464 39374',
  openingHours: 'Mon - Sat: 12:00 PM – 9:00 PM (Sun: Closed)',
};

export const REAL_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    "id": "g-rev-1-pulsewavelighting",
    "authorName": "Pulse Wave Lighting",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVljPXOp2SvnA965DStNwJt3yr6PEBel3vMUOoV5XH0_O6_MV8=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "2 days ago",
    "text": "Great response and support",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 days ago"
    }
  },
  {
    "id": "g-rev-2-yuvrajshingte",
    "authorName": "Yuvraj Shingte",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUF_t2EmUHDVtTO08fYPIvQlzgbOTAn07JQluyOCfSrgcMnMXI=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "3 days ago",
    "text": "I loved the experience ,I genuinely think that you should visit this place or buy titles ,",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks sir 🙏",
      "relativeTime": "3 days ago"
    }
  },
  {
    "id": "g-rev-3-gauravjain",
    "authorName": "Gaurav Jain",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWUkMuYQTGgUviHCYq5Q0U1rOvRRSN_bLClFUkwEMNMP5-Gg9Qb=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "3 days ago",
    "text": "My PS5 was dead and DJ was able to get it up and running pretty quickly.  Definitely recommend",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks sir 🙏",
      "relativeTime": "3 days ago"
    }
  },
  {
    "id": "g-rev-4-omkarchiplunkar",
    "authorName": "Omkar Chiplunkar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWBb95OFEAIt7PeR1hOFO1T1-KdPYjK1WO9Fw1rC4YQ5D6YVb8AXw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "2 weeks ago",
    "text": "Saved my console! The HDMI port on my PS4 Pro was corrupt, and I thought the console was done for. They diagnosed the issue quickly, replaced the port with a clean solder job, and tested it thoroughly before handing it back. It connects to the TV perfectly now. Professional, fast, and reasonably repair priced. Thank you!",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 weeks ago"
    }
  },
  {
    "id": "g-rev-5-sahilshaikh",
    "authorName": "Sahil Shaikh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUfI9b9fbM-ao5ckvxJFDZIkCAwdj2BOrrXqLZnaEWBZCaOOG5D=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "2 weeks ago",
    "text": "Best Seller ❤️",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 weeks ago"
    }
  },
  {
    "id": "g-rev-6-rampandey",
    "authorName": "Ram Pandey",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWbS9kmXxVXwIkWT1su0z5LCAxrEkHxpScKdOATnOTq8XGPsT1u=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 25,
    "rating": 5,
    "relativeTime": "2 weeks ago",
    "text": "Good guy. Have given my controller for stick drift issue. He helped me with TMR stick. Also bought a disc from him.",
    "categoryTag": "Controllers & Accessories",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 weeks ago"
    }
  },
  {
    "id": "g-rev-7-usmankhan",
    "authorName": "Usman Khan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVQigSaQfVkUtWBVV8zg3SAkEqOYzUMNi3LSFAb7jsoOHRSCtDC=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "3 weeks ago",
    "text": "Recently sell my ps4 he give me best price of my console and owner mr danny is friendly to his customer I'm happy to deal with him...",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 weeks ago"
    }
  },
  {
    "id": "g-rev-8-maroofkhan",
    "authorName": "Maroof Khan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUle1y3GeOssg1quOrSHbw8XTImpT0aaSoJmZ9NiT9pSeaowq4-7w=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "3 weeks ago",
    "text": "soo helpful",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 weeks ago"
    }
  },
  {
    "id": "g-rev-9-kishanbhandari",
    "authorName": "Kishan Bhandari",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVbBo__DRG5nBH4pTaQiMtfxDXGnma6RrxxK7fdBn2oVB-qnVzY=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Had a great experience selling my PS4 here. The entire process was smooth and hassle-free. They tested the console in front of me, everything was transparent, and I received the payment upfront without any issues. Friendly and professional service. Definitely recommend!",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-10-abhishekshetty",
    "authorName": "Abhishek Shetty",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUb_UjAScBgBe9fEVLmR3CeaSFpgvlh4SCb30leA18z9HirStSo=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Great place for gaming",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-11-furqanhasanfatta",
    "authorName": "Furqan Hasanfatta",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKe_7Kr0eeH3LQ-NvjSeWwnqNN3yQeRf8fvS5vKSrFmCtvT3Q=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "It was a very smooth experience for selling my ps4 fully satisfied",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-12-darshanajugya",
    "authorName": "Darshan Ajugya",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKPjIoaT7fIw56VnnFcAWBsFyChObdau_9mAoBAG0XVnkKvfg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "I should my ps4 to him and he gave me best price of my ps4 slim thanku dj tech",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-13-theabhaygames",
    "authorName": "The Abhay Games",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVKSUyrl3yvJt-AzsHXAO2YM896QG0mQsCao74TrRpvJO18DNzKaw=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 21,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Nice Deals & Great Discount Products",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-14-euansequeira",
    "authorName": "Euan Sequeira",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVmyQWWwkT_6xB5DkGRYYy4vIIoRZk69O1ft9_8mnd8DMDrNiIc1Q=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Great experience in selling my ps4 . Much recommended. Great person to do business with",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-15-haranshkochhar",
    "authorName": "Haransh Kochhar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJMTk8re3NlIMsisFukwC0vzxulxT_Wv0lrSAMySjdFPuOpTOs=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Very good service i sold my ps4 i got the best price",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-16-sabs",
    "authorName": "SAB S",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjX7rkkSqNb2LklqCY36NJWuBKwP6Qdiv6hu5Vt9337_VHe7eHji=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 6,
    "rating": 5,
    "relativeTime": "a month ago",
    "text": "Danny bhai is genuine person and it was great to deal with you bro",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a month ago"
    }
  },
  {
    "id": "g-rev-17-dushyantpratap",
    "authorName": "Dushyant Pratap",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjX8N93PJH_3sfkeXQud1pmlTLmW_1-lpO3hA8UMyU4BWQrJdDYN=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "2 months ago",
    "text": "The deal was outstanding with no hassle, trusted and genuine person behind this",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 months ago"
    }
  },
  {
    "id": "g-rev-18-learnnrock",
    "authorName": "LEARN n rock",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJzoxN_HqgqioPgh3vUuN1fe9IA_jBdHed1u2zIUhk4Wh5e7Q=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "2 months ago",
    "text": "Must visit this shop it is very reasonable and also sales person also well behave and polite i Highly recommend must visit this Game shop",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "2 months ago"
    }
  },
  {
    "id": "g-rev-19-gauravraut",
    "authorName": "Gaurav Raut",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjW2xUKQDH_E8YvjlTYkgJR8K0gaLaefwgz8nq0PrEp8CRg7eBo=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "I have sold him ps4 slim and game discs at a very good price. Apart from business person is very good at nature suggested me some valuable things as i have also purchased switch lite from him also he is very much reachable 👍🏻👍🏻👍🏻",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother for a wonderful review 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-20-rameezmulla",
    "authorName": "Rameez Mulla",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKPpIVbXk1Uu06iu8u86aiyoWBscwg4hnGL915DCmpKPMeXEA=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 20,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "I recently sold my nintendo switch to DGN tech ...The process was very smooth and quick without any issues. He immediately paid the money as soon as he got the console. Had a very good deal with him.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother for a wonderful review 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-21-lakshyashah",
    "authorName": "Lakshya Shah",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXAtNHNJX7KLUF-WqX09B2wuOuHslfay0XMLll29cgDWZzDt1v_=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 19,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "I sold 2 ps4 to DJN TECH. Received very good resale value for both the ps4. Best place to sell or purchase any playstation.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-22-piyushgohil",
    "authorName": "PIYUSH GOHIL",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVY_UPWqXw1GZrnMuAx4WJFMZ6_03yAKZZZd_vfWSqaG7BHEhY=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "Good Service , good and best products and best quality also all is good I buy more from this thanks",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-23-nikhilmhatre",
    "authorName": "Nikhil Mhatre",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVkxpZfMmOvOypzPY9jTXy0sNOyqmniXDjommk7Ov1re1RBBAk=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "Good service by djn tech i sold my xbox to them good service provided by them easy process no extra charges from the customer whole expense was done by djn tech good service 👍",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Excellent brother...thanks 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-24-ojasnarvekar",
    "authorName": "Ojas Narvekar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjU-2-45_9Isc_0g6fuztj3JsQmydc4fe6UnpubggqoJzbhDSYNB=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "I sold my xbox one s to them.. And I was really satisfied with them.. The person is really well spoken and knows how to build trust with the customer..  I was very happy with this deal..",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Awsome review thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-25-aatishirani",
    "authorName": "Aatish Irani",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJWHgQka6Z-UFcdWxACDZmb9rYdJfd8ExB95cSHmZAUmoNVqw=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 18,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "Dinesh is great person and all his products are top notch quality. I would highly recommend purchasing products from his store",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-26-ojasvaidya",
    "authorName": "Ojas Vaidya",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJIx3Zii0XhVquizVnrDNI_U3HClnSj8XPWFyLlG42xNfgUQQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "Sold my ps4 along with 4 games for 16.5k.",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-27-shounakkambli",
    "authorName": "Shounak Kambli",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKmk5AqgYsqrOEoJsdrEtkoVgkU7f3KppoM6KC9_29GKPbwTA=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 15,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "Had a smooth n stress free experience with djn tech for my ps4 repair .Dinesh Bhai is an absolute honest person backed with amazing knowledge n quick solutions. He explained everything in such detail n always gives time to the customer. He not only fixed the original issue but also helped fix problems caused by the repair guy whom I had given the console earlier...would recommend djn for all console related issues",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-28-kingrider",
    "authorName": "King Rider",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocK0eU8zVgTDGbUc68ixFPoE5oGkjh7RvmOE-bhOcsCL4TR6jQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "3 months ago",
    "text": "I had a great experience dealing with DJN Tech. I sold my PS4 through a simple video call verification, and after everything was checked, I received the payment instantly. The entire process was fast, smooth, and hassle-free. I also got a great price for my console. The owner is genuine, friendly, and professional. Highly recommended for anyone looking to sell their gaming console safely and easily!",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "3 months ago"
    }
  },
  {
    "id": "g-rev-29-armaanshaha",
    "authorName": "Armaan Shaha",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUgi7A6MDyDWWSsR-6JbvwHCJJsKaIJqzVnffBOPw39ZUy_Fa0K_A=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 13,
    "rating": 5,
    "relativeTime": "4 months ago",
    "text": "Very professional and helpful. Purchased a PS5 and ancillary stuff, would purchase from here again. 10/10 would recommend.",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "4 months ago"
    }
  },
  {
    "id": "g-rev-30-shrikrishnabandal",
    "authorName": "Shri Krishna Bandal",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKgdo93rbd3kBiCJGjkYXTc4-iU-MwSm7JeJFN-XOXsqJS9Xg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "4 months ago",
    "text": "Such a genuine and kind person I have ever seen.. Giving quick replies and sort queries very quickly .. also helped in critical situations related to ps5 and its accessories…",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "4 months ago"
    }
  },
  {
    "id": "g-rev-31-mukeshverma",
    "authorName": "Mukesh Verma",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJbh3iQh7Ih0BBZXUwxU4f6HldRJo-2uOtkaQzwNQqGOnRHfw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "4 months ago",
    "text": "Just sold my PS4 to DJN TECH. The Owner (Mr Dinesh) is very honest guy. the process of selling was very easy. Got payment within minute after confirmation.Thank you Bhai...It was a good experience.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "4 months ago"
    }
  },
  {
    "id": "g-rev-32-aqdasak",
    "authorName": "AQDAS AK",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVC-MotIcsHgAmohn2P-TFTJ2NXav8_ZdLz_MTozeHZrHsCLPLq=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "4 months ago",
    "text": "Excellent service by DJN TECH! The owner is incredibly genuine, professional, and helpful. They explain everything clearly and deliver top-notch work. If you are looking for reliable and high-quality tech services, this is the absolute best place to go. Completely satisfied with their service!",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother awsome review 👌",
      "relativeTime": "4 months ago"
    }
  },
  {
    "id": "g-rev-33-mandeepsatani",
    "authorName": "Mandeep Satani",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXeEkiZoE9sCxEwEjWuOQtMxZX-7tbNHKVbvWsY1BbHA_uFByNR=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "I sold my ps4 fat for good price to DJN TECH and it was genuinely a very good deal for me and the delivery was also very convenient and hassle free",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-34-googlegamer18",
    "authorName": "Google Gamer18",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLyULOBobGFTdrs8SjaooPx9aWuDjGYzVl8hSewuVpiUBByRg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Best place for selling your consoles. Hassle-free. Plus they pay very considerably. If you have a console to sell I would definitely suggest this.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother for a unique review 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-35-hemantmahadik",
    "authorName": "Hemant Mahadik",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLIgu3dxINxhiMemZ5Osu4C5EKK0V7fhS4F1SsAbjaH1sSZnQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Pro level service and repair of controller and personal care experience.",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-36-kalpeshbhalia",
    "authorName": "Kalpesh Bhalia",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLnekIn8vbGzALRW6d1KdRW_Rbded5YwA-5pn6-IMfci9Ys-g=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "I had a superb experience with DJN Tech. I purchased three PS gaming CDs from them, and the entire process was smooth and enjoyable. They treat customers like family and take the time to explain each and every service in detail. The gaming experience has been excellent so far. Highly recommended for anyone looking for quality gaming products and great customer service.",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-37-abdulbarikhan",
    "authorName": "Abdulbari Khan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVcZXb9pcADJ75unmArm5yAoTryrd3YJ7B7id-5GFsZcHvtRLrC=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "I am sell my ps 4 pro in good price good or genuine person thankyou",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-38-samratmarathe",
    "authorName": "Samrat Marathe",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJvEC8mLZdsfc2xrPDkhmHCLztWny3bKGujmDhgA20NbwNqVA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Very smooth experience. Very trustworthy",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-39-tejjaspersonal",
    "authorName": "Tejjas Personal",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUwye1V2YUJo89EDTPoDNhz-cCY23ABCA9KVEAhWb1cSjUvSrQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Good exchange of ps4 and games for ps5 controller and money. very good condition second hand ps5 controller with warranty",
    "categoryTag": "Controllers & Accessories",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-40-gauvas",
    "authorName": "GauVas",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjU7duZAb43laSZNVcsLezKRxMx5pnMCrWDYyIiwTsWakMpCbN8LlA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Got the PS5 delivered within 1 hour of inquiry at the cheapest rates at the time. Will highly recommend them to anyone",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-41-tusharbhoir",
    "authorName": "Tushar Bhoir",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocL4HpogMPn6DJkgmdtxTAMLS81PGPBq9GWOtpLWV1lUH0k_FA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 3,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Nice People Sold My Nintendo Switch Lite To Them Real Nice Guys There Everyone Should Visit them",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-42-drashtashelawala",
    "authorName": "Drashta Shelawala",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUefQFXktg3UbjcYHw1YGeXq_VjF--Em4QrYVLW16ZWFmBHsl8IxQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "A completely seamless and truth worthy process",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-43-kritikgupta",
    "authorName": "Kritik Gupta",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWRsQ76qondWfx2O5Sk0w8pRfMvtIE_w7ImmMDh59_a8tcJ42pN=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 7,
    "rating": 5,
    "relativeTime": "6 months ago",
    "text": "Good service by Danny, extremely sweet guy! Highly recommend 👍🏻",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "6 months ago"
    }
  },
  {
    "id": "g-rev-44-rishabhpittalia",
    "authorName": "Rishabh Pittalia",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJrfILdnWvbeIW5kmpRlseseMbOrLxBqqbudL4lTLH3eH_OJw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "I had a great experience selling my PS4 Pro 1TB to DJN Tech. I found them through OLX, and from the very first conversation, they were extremely polite, professional, and easy to communicate with. The whole process was smooth and hassle-free.\nThey offered me a very good and fair price for my console, and everything was handled honestly and quickly. I really appreciate their transparency and friendly behavior throughout the deal.\nHighly recommended if anyone is looking to sell or want to buy their gaming console — trustworthy service and a great overall experience. Thank you, DJN Tech!",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-45-ameypatil",
    "authorName": "Amey Patil",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLxZdvQP7gfzHupCGl-9z7bonj0ZUwvWJugvFi5NjIOpwdC7wU=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 9,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Today I bought 2 PS5 game cd's (pre owned ). I got both of them at reasonable rates with perfect condition.\nThank you Danny bhai",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-46-harshmeshram",
    "authorName": "Harsh Meshram",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIln4VtK3fc_LTbodbggPV2H12vcetUQC1nsK0H_rhNLvE4yJk=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 16,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Sold my console to Danny Bhai. Great and smooth experience. And the deal Danny bhai will give will not be given by anyone in market.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-47-vyomsolanki",
    "authorName": "Vyom Solanki",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKQmn0mSj6QMYHINJG3sv4DQynj8yOvOEMQc3a4DApgs0_2Ew=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Got an amazing deal for PS-5",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-48-abdullahshaikh",
    "authorName": "Abdullah Shaikh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIDFVCoEZ8XVgSuA-QEA-eyZbfPXCs07ZI5wshy2JxhBKHRDNDN=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Best reliable buyer and seller",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-49-sheetaljogadiya",
    "authorName": "Sheetal Jogadiya",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJYairOnyTIs3Cw-zkmFfu1FtKrFfNLxA4gBFYNC44QyNCjpQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Just brought a ps5 and some games from them got it in fabulous condition and their service are at reasonable prices you should definitely checkout",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-50-premm",
    "authorName": "Premm",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKZET5A0jnkeUh9cguDUBgjLICSBnnm-6Kr6ZjPzS4eyzgmsA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Sell ps4 to DJN Tech bhai was really genuine and gems of person....",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-51-mohamadrizwanshaik",
    "authorName": "Mohamad rizwan Shaik",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLyc3ARgL2Aeli-wmLAzS2mnO8lxkKNeW4bEGMAL-XcGOHesXA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Bhai bohot bohot acche youtuber hai bohot support karte hai guide karte hai",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-52-neilpagariya",
    "authorName": "NEIL PAGARIYA",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWr_IDssGEMUp2LzKAJ9LrNjymljBB5FNS-YJNuMdN9NaWrnvOS=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "I sold my ps5 for a very good rate .. trustable shop.",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-53-damtil",
    "authorName": "DAM TIL",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXp_etnEIqRJ2EjxJHyszaNXnGtE7dRDipJ9ngENDJBIZleYwAn=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Just purchased my first product from djn tech! The guy is really great talking to! I have had a nice conversation with danny bhai and he guided me with everything i need to know! Also very active on WhatsApp and polite behaviour! I just bought a ps4 v2 controller it's pre owned but man i feel like i got a brand new controller so thanks a lot danny bhai again and looking forward to buying more gadgets from you buddy👍🏼",
    "categoryTag": "Controllers & Accessories",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-54-mandar",
    "authorName": "Mandar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUE7ceufDZN_J0_bMuhVws06EtD_u_TfMgxxXaiXpzT8jKbXetV=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 7,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "I have sold and purchased multiple games. The process was smooth, and it is a trusted source for quality games.",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-55-utkarshkrishna",
    "authorName": "Utkarsh Krishna",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWtLJwdlHVYgUPx99DkCLUpbxDovCisOZyrdIWMl5I7hdBbRaM=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 6,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Danny bhai gave me a good deal for my ps4 pro 👍",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-56-amaanfarrukh",
    "authorName": "Amaan Farrukh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLcflv7iuga0lBMX64jYKACeBHE2zLvkHrvLEi8JSoSTwCwYg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Amazing service. Genuine products. Totally worth it. Got Nintendo 3ds XL and Nintendo switch oled all in good condition. Products were delivered to Kashmir with ease.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-57-shahilshah",
    "authorName": "Shahil Shah",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIDjyrbBytS8jkkZ0zGW-ut1MmeV6LkxV3JeWmPmNTsRgUUjQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Amazing service , Trusted and reliable.",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-58-dhruvthakker",
    "authorName": "Dhruv Thakker",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKb5iuReD0KBlZJ6xr5enWu5_yim5dsTstral0NIwDehU562GM=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Good place to buy consoles. Very reliable",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-59-pranavnar",
    "authorName": "Pranav Nar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXfbNoAXMx08GQtrhUaHLeh_EFtRvHwwm3eST49ZM3s9MPz3k3PXQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "I sold my PS5 to DJN Tech. It was so transparent deal from the start to the payment. Everything was flawless.Thanks Danny bhai",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-60-shubhampatankar",
    "authorName": "SHUBHAM PATANKAR",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUoEr0FiHvxCBbCNhmCo6L2v0BCYk_S87NmAhvzvukFe6L0cYXKDg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Very genuine, trustworthy channel your gaming needs, highly recommended 👍",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-61-mohammedavesmurghe",
    "authorName": "Mohammed Aves Murghe",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjU-0xyMMyFmT_2cREmkd9ScGsJywVtJlGAJS6z8oyP7YdFhgvm-=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 7,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Sold PS4, It was very smooth experience and provide with good price.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-62-sonupawar",
    "authorName": "Sonu Pawar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVJduMJWvsbz6BPUo4dP61Gl6XeLb_jh5safDIZwSMbm9iW3oV_=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "It is nice service",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-63-tanishqpadhi",
    "authorName": "Tanishq Padhi",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWQ4cDeoEhc3bTxq-tcZndtEg_ISsKDfjmCvYS83Ll7vSMaQHE=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Sold my console at a reasonable price 👍🏼 worth it 💯",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-64-apurvjha",
    "authorName": "Apurv Jha",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUFc5s5fvWmejWpQtm8cYoajtO7Fe_rTLSb0UomCje-b-1zzKbGVQ=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 16,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Great product!",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-65-sarthakjadhav",
    "authorName": "Sarthak Jadhav",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJtodsqhfy1-fSevSlq6kd17jIIiOPQ2Rk1wpFtM3Hg8lZvQNKd=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 11,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Had great selling experience",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-66-owaiskhan",
    "authorName": "Owais Khan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIUIbgyuSM9PQd9v_LISXu__EkwNwNJgfk2L_aTu8QePYw-Rw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Best deal",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-67-yugmehta",
    "authorName": "Yug Mehta",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUAB3v-FiTsMM3VZ5J2ZEodDK6yhYXSshRMxMe2gjKT2136SIdJ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Very nice guy loved having done deal with him.Sold ps4 pro to him at good price you guys can sell it to.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-68-prajapatisangam",
    "authorName": "Prajapati Sangam",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIorZx1sQzXB6_7B1tRM8qcdzVDRHZs6cRNBQjRsO0gLdgPHQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Thanks a lot for buying from us! Hope you love the product.",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-69-samsondsouza",
    "authorName": "Samson Dsouza",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJfV3mrJ1ytx8Nlk9sOeSTgdx1h2fYb6F-xYHAc6HIHdKKm0w=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "Sold my playstation 4 at a really good price and a really nice and sweet guy loved to do business with him.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-70-muzammilshaikh",
    "authorName": "Muzammil Shaikh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXJTkxRzUiFVrAcQfzXMTlb4uWZtD6aQKvDeQYlwkN8HNhADLItgA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "7 months ago",
    "text": "I recently sold my PS4 to DJN Tech and the whole experience was completely hassle-free. He trusted me and purchased the PS4 directly after a video call without any unnecessary complications. The payment was made on time exactly as promised.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "7 months ago"
    }
  },
  {
    "id": "g-rev-71-saifmbubere",
    "authorName": "Saif M bubere",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXU5hY5MF2-YEj81Yom1-DUx2tdX_xGmhsjk4rlkmWxXiUOtOmr=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "8 months ago",
    "text": "Nice quality",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏...",
      "relativeTime": "8 months ago"
    }
  },
  {
    "id": "g-rev-72-sarthakbhatia",
    "authorName": "Sarthak Bhatia",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJGjEwK6KPtKHKwe9-Xw6l2TQgKSb_q_vqro-E-VdgAeZFGJg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "8 months ago",
    "text": "Original working disks about to buy few more",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏...",
      "relativeTime": "8 months ago"
    }
  },
  {
    "id": "g-rev-73-anshalghadge",
    "authorName": "Anshal Ghadge",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKa84jUVEEZz1kzchz3y71EqV2MgKK6-z9F00CTNHL8t-u7Xw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "9 months ago",
    "text": "Great guy , great service , repaired my hdmi port and made it like new . Very trustable guy.",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "9 months ago"
    }
  },
  {
    "id": "g-rev-74-laxmikatariya",
    "authorName": "Laxmi Katariya",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKWXpJP1LSlKeXgQvPtG9NQuVuaJobcgWNbXn5JVXErbYX6lA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "9 months ago",
    "text": "Nice console ....",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "9 months ago"
    }
  },
  {
    "id": "g-rev-75-ashishsakpal",
    "authorName": "Ashish Sakpal",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWEvouq9LSsk0iU9X546WDZYlKj4SXUqqMmgcXnV4PWHsw6IxbR=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "9 months ago",
    "text": "Very co-operative service, in South Mumbai DJN is a reliable service provider for gaming consoles",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "9 months ago"
    }
  },
  {
    "id": "g-rev-76-neuclyadroid",
    "authorName": "Neuclya Droid",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVf3MZUb8qt32OZQJZ0uGLFaglvb5Hvu3h5LLfmy3rLWgNbiQBw=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "10 months ago",
    "text": "Very Honest Person Walked Me Through The Whole Process I Got My Ps4 Slim 9.0 With Good Condition With Only Minor Scratches Running Smoothly For 2 Months. Im Really Happy With The Whole Experience ❤️",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏....",
      "relativeTime": "10 months ago"
    }
  },
  {
    "id": "g-rev-77-prudhvirajsampathirao",
    "authorName": "PRUDHVIRAJ SAMPATHIRAO",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVGa8InVfNZk0GQy-NmiG7sE0JCYnjNKSh1dxH-C968P8VFXMqLsA=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 17,
    "rating": 5,
    "relativeTime": "10 months ago",
    "text": "Brilliant. Go for it. You will get the best Console for the best price. Very cool guy. Thank you for the best deal brother.",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "10 months ago"
    }
  },
  {
    "id": "g-rev-78-adityashinde",
    "authorName": "Aditya Shinde",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVvuRETqb-CxvYgUjmFopHROPM_Ffj4FRcQkTS7NPfE6G6cl4sB=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "10 months ago",
    "text": "Best service ever and perfect customer satisfaction djn tech rocks",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "10 months ago"
    }
  },
  {
    "id": "g-rev-79-gulamtahashildar",
    "authorName": "Gulam Tahashildar",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWYNnVtg0BlZkUdubDlMZmoc7oGvg2XYWvuO-eqzwnvA6whmxoJ=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 10,
    "rating": 5,
    "relativeTime": "11 months ago",
    "text": "Bhai awesome bhnda he yaar , aaj ke date me koi bi aisa guard nai krta yeh bhai sab aap ko full support and your amount satisfied wali feeling denge , trust me best banda he bhai ❤️ muje bohot support kiya and me every each games se leke new playstation ine se leta hu and mast conditions me milta he yaar aur jo inki delivered packageing he wo dekh ke hi pata chalega ❤️ best he 10 out of 20% bhai fully satisfied thnqu so much bhai ❤️",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "11 months ago"
    }
  },
  {
    "id": "g-rev-80-shivaarun",
    "authorName": "Shiva Arun",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjX1Ynlg0az3sMRl-yU5QgbxWwe9yZkQUc1hQ3zTVZquX5ejzfCG=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "11 months ago",
    "text": "My sweet brother good product give me ❤️❤️im really happy..",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏....",
      "relativeTime": "11 months ago"
    }
  },
  {
    "id": "g-rev-81-amitsingh",
    "authorName": "Amit Singh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXY4dkL7fhYFAa-MKHM4wFV9b2w_zj_7raGlljDAnuiID390pbKRA=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 20,
    "rating": 5,
    "relativeTime": "11 months ago",
    "text": "Danny is a gaming console expert. He's also authentic; repairing only what's needed, and if devices have life, he wont unnecessarily fix or charge. The passion driving him is obvious.",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "11 months ago"
    }
  },
  {
    "id": "g-rev-82-parthkavi",
    "authorName": "Parth Kavi",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXgibQmukoYcvlw-uVJidLu_pxr7xaXN4bdUYghTDh359PoAT9viw=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 343,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Got Spiderman Miles and morals CD for PS4 from Danny bhai.\nCD working completely fine and Delivered on the 2nd day.\nVery fast delivery, very humble attitude of danny bhai.\nOverall best dealer for you Playstation needs.",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-83-pmgaming",
    "authorName": "PM gaming",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVQq3N8udNePWPlpq4sSKIHrZ6UDSGBtcj__i3knNaOsGsHNPc=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "I sold my PS2 on DJN Tech, and they actually gave me a good price for it according to its condition",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-84-kalim",
    "authorName": "Kalim",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLO8N7hK1gVtzwSyq7Vp9oMjPiSUS1e4ZrS7OpVgAKjSlQabQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Sold my ps2 in good price to this guy buy products from him",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-85-jigarshah",
    "authorName": "Jigar Shah",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVdn5B2qGHpkFmcaZyf188W54CxZlvf7M-ivgFgDBYWnyGWH8o=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Great Service! I wanted to repair my PS5 Controller on a Sunday and Danny did it within 4 hr.",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-86-maroofkazi",
    "authorName": "Maroof Kazi",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocI-jwlPaqH9fwQzGnjlZr9fnLDt6hKIDTyCq4bqLzyMsS1KTLc=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Genuine person with good product in excellent condition seems to be new, hassle free contact with full customer support",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-87-nileshagarwal",
    "authorName": "Nilesh Agarwal",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWjMFWhtLJpvazqg7O53JUOaS9luW3eOlwC3ygk1mqfMnPc4i6q=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Just bought Uncharted and Last one of us pre owned games. The quality was good and delivery was quick.",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-88-hassanshaikh",
    "authorName": "Hassan Shaikh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWCtNYr_d5UWnKhwjUzn_HdCkEad0A-U2jDzQpCYN1SEgjbNq5i=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 5,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Excellent Condition – Worth It!\nI bought a PS4 game second-hand and was honestly surprised by how good the condition was. The disc is super clean with no scratches, it loaded instantly, and the gameplay was smooth. It felt just like buying a new one but at a much better price. Totally satisfied with the deal – highly recommended for any gamer looking for quality at a budget price!\nDJNTECH 🙌",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏...",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-89-siddhanthshukla",
    "authorName": "Siddhanth Shukla",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUYbkqDiKA2o9hhHNdxtu-coLhHo1EQllpTcO4KYYehqhNrHiKbWg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Excellent PS5 Service! I had a great experience with the PS5 service from DJN. DINESH is knowledgeable, professional, and very responsive. My console was diagnosed quickly and the issue was resolved without any hassle. It’s running perfectly now. Highly recommend their service for any PlayStation repairs or maintenance!",
    "categoryTag": "Console Repair & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-90-battlenbite",
    "authorName": "BattleNBite",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKj4F0pppCr5BDaV50f5EJ_5TJbYh0ul1iPxDNlWET8T0EZuA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Nobody can beat the rates of Danny brother. Always helpful, very polite person.",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother 🙏",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-91-ashishmishra",
    "authorName": "Ashish Mishra",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJ6Nfxlba0dWxljY3MPA88t9Yd85wgiikBrFPsZaeOLag-tBA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Absolutely Worth It – 6 Months of Smooth Gaming! Review for Game Controller Purchase from DJN Tech: I bought a game controller from DJN Tech 6 months ago, and it’s been excellent. The build is solid, buttons responsive, and there's no drift at all. It works perfectly with both my PC and console. Even after long gaming sessions, it still feels brand new. DJN Tech provided fast delivery and great customer service — totally worth it!",
    "categoryTag": "Controllers & Accessories",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother...",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-92-shadabpathan",
    "authorName": "Shadab Pathan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLVdsKjJTAzFSoZbw_8eZheoykNeF6Gu7VAB-8G4cDmW3x07w=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "I liked the ps3 super slim as I got the best delivery experience. I am is in very concern for the delivery but no I got the best transparent delivery. Thankyou DJN tech.",
    "categoryTag": "Express Delivery & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother...",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-93-rahulyadav",
    "authorName": "Rahul Yadav",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJl3u6waD1fu8G2CWJOOrHRbdmdVbaSAQ1WR2oQoyL5ydSHpBPQ=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Very helpful bhai guiding properly for product",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-94-joyalthomassaji",
    "authorName": "Joyal Thomas Saji",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#34A853",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLeDwfFwzbJBx3lJghWnkhRVpBoLlEEq2fY0SC_vSwp3bXbIg=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 2,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Bought a ps vita from them . Absolutely good condition and no problems till date . Loving it",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother. ..",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-95-kunalchavan",
    "authorName": "Kunal Chavan",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#1E40AF",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXT-O0UVkfni_706XkHKJbVz1zRV18TMPybhjp25puvGkfESPnM=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 7,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Just bought a ps5 and controller from djn tech really the service is fast and the condition of console is A1.",
    "categoryTag": "Controllers & Accessories",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother for supporting....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-96-glenlobo",
    "authorName": "Glen Lobo",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#7C3AED",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWPOCX-qg6cE4UXo6Ix4GLZ5FPPAuFzluIsbb93VZ9JQL1yW8M=s1920-c-rp-mo-ba12-br100",
    "isLocalGuide": true,
    "guideReviewsCount": 16,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "I bought a second-hand PS4 Pro from Danny @ DJNTech about two months ago, and I couldn’t be happier with my purchase. The price was very fair, and the quality of the console was excellent. It runs smoothly, with no issues at all—feels just like new!\n\nDanny was professional, honest, and made the whole process easy. The PS4 Pro was clean, well-maintained, and ready to go right out of the box. I’ve been gaming regularly since then with zero problems.\n\nHighly recommend DJNTech if you’re looking for a reliable second-hand console at a great price. Excellent value and great service!",
    "categoryTag": "Console Buyback & Trade-In",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-97-greenpungent",
    "authorName": "greenpungent",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0F9D58",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjU1uA6RWpKTnAUAuZVjzpR0M8U3kMn7CeUP54omL9SphtbKiE0=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Genuine person and quick in response overall good experience buying the product. Excellent knowledge about product pin to pin.",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother...",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-98-tusharkoli",
    "authorName": "Tushar Koli",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#0891B2",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjW0xnOk4QGQ6Pn7siW6AUrOLgfLRd9O6WvBt3n-ty7slbv_fZwh=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Great experience. Genuine products with excellent service",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-99-jatinsharma",
    "authorName": "jatin sharma",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#D97706",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUOf8XCmg3FFduQGAL62mekcUmlsxbw2WVWhJbX4cZhic7g4Dk=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 8,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Prompt service and fast delivery and quiz assistance on call for query",
    "categoryTag": "Express Delivery & Service",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-100-hannanshaikh",
    "authorName": "Hannan Shaikh",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#4285F4",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocILfNg0jQSvqoUmicX8R3Ejo_xBV_Hd3Wi8kYAlPzY84dFkiA=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 4,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Best console seller mr danny sir so trustly purchase and sale cd amd console",
    "categoryTag": "Pre-Owned Games & Discs",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother....",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-101-punitvakil",
    "authorName": "Punit Vakil",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#EA4335",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIEBzN2hcJ-Rs_97RpVW5GyuZJIYatgS__FPqrJ3JMw-UDrmP8=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 1,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Bought a PS5 from Danny bhai, must say he is the go to guy if anyone is looking for any gaming console in Mumbai.\n\nHe explained everything about the gaming console and how to use it as I was a first time user.\n\nEven the after sale support was great, Highly recommend ✌🏻",
    "categoryTag": "PlayStation 5 & Gear",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother...",
      "relativeTime": "a year ago"
    }
  },
  {
    "id": "g-rev-102-bireswarbasak",
    "authorName": "Bireswar Basak",
    "authorLocation": "Mumbai",
    "authorAvatarColor": "#FBBC05",
    "authorAvatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIwQo0YbwabCtn6awaW2QkN177p7QCeQUTnh-nS9aZYhmxiPxI=s1920-c-rp-mo-br100",
    "isLocalGuide": false,
    "guideReviewsCount": 10,
    "rating": 5,
    "relativeTime": "a year ago",
    "text": "Owner is very supportive, gives quick response.",
    "categoryTag": "Verified Google Review",
    "ownerReply": {
      "author": "DJN TECH (Owner)",
      "text": "Thanks brother...",
      "relativeTime": "a year ago"
    }
  }
];
