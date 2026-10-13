import { Product } from '../types/store';

export const PRODUCTS: Product[] = [
  // --- HERO CONSOLE ---
  {
    id: 'ps5-slim-disc',
    name: 'PlayStation 5 Slim (Disc Edition)',
    subtitle: '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 54990,
    price: 49990,
    discountPercent: 9,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 5,
    badge: 'BESTSELLER',
    imageUrl: '/hero-ps5-slim.png',
    features: [
      'Slimmer design with 1TB ultra-high speed internal SSD storage',
      'Ultra HD Blu-ray disc drive included',
      'Haptic feedback and adaptive triggers via DualSense wireless controller',
      'Tempest 3D AudioTech and up to 120 fps with 120Hz output',
      'Official 1 Year Sony India Manufacturer Warranty'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games in a sleek, compact slim form factor.',
    inTheBox: ['PS5 Slim Console (Disc Model)', 'DualSense Wireless Controller (White)', '1TB SSD (Installed)', 'HDMI 2.1 Cable', 'AC Power Cord', 'USB-C Cable', 'Horizontal Stand Feet', 'Astro\'s Playroom pre-installed'],
    warranty: '1 Year Official Sony Warranty + DJN Tech Assured Support',
    themeColor: '#00439c',
    storage: '1TB SSD',
    edition: 'Standard Slim Disc',
    reviews: [
      {
        id: 'rev-c1',
        userName: 'Aakash Verma',
        userLocation: 'Delhi',
        rating: 5,
        date: '3 days ago',
        title: 'Original Indian Sony Unit, Superb packaging!',
        comment: 'Received brand new sealed box with original Indian warranty seal. Delivery was super fast within 48 hours. DJN Tech is 100% trustworthy for consoles!',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      },
      {
        id: 'rev-c2',
        userName: 'Naveen Kumar',
        userLocation: 'Bengaluru',
        rating: 5,
        date: '1 week ago',
        title: 'Silent and sleek machine',
        comment: 'Runs quiet and the 1TB SSD gives much needed space over original launch model. Great customer service on WhatsApp.',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // --- HERO CONTROLLER ---
  {
    id: 'dualsense-midnight-black',
    name: 'PS5 DualSense Wireless Controller (Midnight Black)',
    subtitle: 'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone',
    category: 'controllers',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 6390,
    price: 4990,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockCount: 14,
    badge: 'POPULAR COLOR',
    imageUrl: '/hero-dualsense.png',
    features: [
      'Immersive haptic feedback brings in-game actions to life in your hands',
      'Dynamic adaptive triggers simulate physical resistance of gear and weapons',
      'Built-in microphone and 3.5mm headset jack for seamless multiplayer voice',
      'Create button to broadcast your epic gaming moments',
      'Signature comfortable design with enhanced stick grips'
    ],
    description: 'Discover a deeper, highly immersive gaming experience that brings the action to life in the palms of your hands. The DualSense wireless controller features immersive haptic feedback and dynamic adaptive triggers in a sleek Midnight Black finish.',
    inTheBox: ['DualSense Wireless Controller (Midnight Black)', 'Instruction Manual'],
    warranty: '1 Year Official Sony Warranty',
    color: 'Midnight Black',
    themeColor: '#090d16',
    reviews: [
      {
        id: 'rev-c-mb1',
        userName: 'Prashant Iyer',
        userLocation: 'Chennai',
        rating: 5,
        date: '4 days ago',
        title: 'Tactile triggers and stealth finish',
        comment: 'Midnight Black looks far better in person than standard white. Triggers work brilliantly with Astro Bot and Gran Turismo 7. 100% genuine Sony packaging.',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // --- HERO PRE-OWNED DISC ---
  {
    id: 'elden-ring-ps5',
    name: 'Elden Ring: Shadow of the Erdtree (PS5 Pre-Owned)',
    subtitle: 'FromSoftware Masterpiece · Optical Clean Pass · Original Case',
    category: 'preowned_games',
    platform: 'PS5',
    condition: 'Pre-Owned Grade A+',
    mrp: 4499,
    price: 2199,
    discountPercent: 51,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 5,
    badge: 'GAME OF THE YEAR',
    imageUrl: '/hero-elden-ring.png',
    features: [
      'Massive open-world RPG with hundreds of weapons and bosses',
      'Full 60 FPS performance mode on PS5',
      'Pre-owned disc inspected for flawless data installation',
      'DJN Assured optical disc guarantee'
    ],
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    inTheBox: ['PS5 Game Case', 'Elden Ring Blu-ray Disc', 'Original Map Insert (subject to availability)'],
    warranty: '7-Day Replacement Guarantee',
    discCondition: 'Grade A+ (Clean, verified installation test)',
    genre: 'Action RPG / Souls-like',
    themeColor: '#b45309',
    reviews: [
      {
        id: 'rev-er-1',
        userName: 'Murugan G',
        userLocation: 'Madurai',
        rating: 5,
        date: '1 week ago',
        title: 'Very reasonable price and authentic item',
        comment: 'Price was way cheaper than local store. Product exactly matches photos. Fast courier dispatch and helpful WhatsApp support.',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  }
];
