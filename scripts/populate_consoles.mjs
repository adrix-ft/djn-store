import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
let SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_KEY && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const [k, ...vParts] = line.split('=');
    const val = vParts.join('=').trim();
    if (k?.trim() === 'SUPABASE_SECRET_KEY' && val) {
      SUPABASE_KEY = val;
      break;
    }
    if (k?.trim() === 'SUPABASE_PUBLISHABLE_KEY' && val && !SUPABASE_KEY) {
      SUPABASE_KEY = val;
    }
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CONSOLES = [
  // 1. PS5 Slim Disc Edition
  {
    id: 'ps5-slim-disc',
    name: 'PlayStation 5 Slim (Disc Edition)',
    subtitle: '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 54990,
    price: 49990,
    discount_percent: 9,
    rating: 4.9,
    review_count: 58,
    in_stock: true,
    stock_count: 5,
    badge: 'BESTSELLER',
    image_url: '/hero-ps5-slim.png',
    features: [
      'Slimmer design with 1TB ultra-high speed internal SSD storage',
      'Ultra HD Blu-ray optical disc drive included',
      'Haptic feedback and adaptive triggers via DualSense wireless controller',
      'Tempest 3D AudioTech and up to 120 fps with 120Hz output',
      'Official 1 Year Sony India Manufacturer Warranty'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games in a sleek, compact slim form factor.',
    in_the_box: [
      'PS5 Slim Console (Disc Model)',
      'DualSense Wireless Controller (White)',
      '1TB SSD (Installed)',
      'HDMI 2.1 Cable',
      'AC Power Cord',
      'USB-C Cable',
      'Horizontal Stand Feet',
      "Astro's Playroom pre-installed"
    ],
    warranty: '1 Year Official Sony India Warranty + DJN Assured Support',
    edition: 'Standard Slim Disc Edition',
    genre: 'Next-Gen Gaming Console',
    theme_color: '#00439c'
  },

  // 2. PS5 Slim Digital Edition
  {
    id: 'ps5-slim-digital',
    name: 'PlayStation 5 Slim (Digital Edition)',
    subtitle: '1TB Custom SSD · 4K 120Hz HDR · Ultra-Fast Loading · All-Digital',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 49990,
    price: 44990,
    discount_percent: 10,
    rating: 4.8,
    review_count: 36,
    in_stock: true,
    stock_count: 4,
    badge: 'ALL-DIGITAL',
    image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
    features: [
      'All-digital slim design without disc drive (digital downloads & PS Store)',
      '1TB internal ultra-fast PCIe Gen4 NVMe SSD',
      'DualSense haptic feedback and dynamic triggers',
      'Ray Tracing support and true 4K high-frame-rate output',
      'Official 1 Year Sony India Warranty'
    ],
    description: 'Go purely digital with the all-new PS5 Slim Digital Edition. Download your games directly from PlayStation Network and store them on the 1TB high-speed solid-state drive.',
    in_the_box: [
      'PS5 Slim Console (Digital Model)',
      'DualSense Wireless Controller',
      '1TB SSD (Installed)',
      'HDMI 2.1 Cable',
      'AC Power Cord',
      'USB-C Charging Cable',
      'Horizontal Feet'
    ],
    warranty: '1 Year Official Sony India Warranty',
    edition: 'Digital Slim Edition',
    genre: 'Next-Gen Digital Console',
    theme_color: '#00439c'
  },

  // 3. PS5 Standard Disc (Pre-Owned)
  {
    id: 'ps5-standard-disc-preowned',
    name: 'PlayStation 5 Standard (Disc Edition) - Pre-Owned',
    subtitle: '825GB SSD · 4K HDR Blu-Ray · DJN 25-Point Bench Tested · 1-Month Warranty',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Pre-Owned Grade A+',
    mrp: 49990,
    price: 38999,
    discount_percent: 22,
    rating: 4.8,
    review_count: 44,
    in_stock: true,
    stock_count: 3,
    badge: 'VALUE DEAL',
    image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
    features: [
      'Original launch revision with robust thermal heat-sink',
      '825GB ultra-high speed SSD with expandable M.2 slot',
      'Optical Blu-ray disc drive tested with 100% laser read accuracy',
      'Includes original DualSense wireless controller',
      'Protected under DJN Tech 1-Month Comprehensive Warranty'
    ],
    description: 'Certified Grade A+ pre-owned PlayStation 5 console. Ultrasonic cleaned, thermal paste serviced, and thoroughly bench tested under high stress gaming workloads.',
    in_the_box: [
      'PlayStation 5 Disc Console (Grade A+)',
      'Official DualSense Wireless Controller',
      'HDMI Cable',
      'Power Cable',
      'DJN QA Certification Card'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Replacement Guarantee',
    edition: 'Original Fat Model Disc',
    genre: 'Next-Gen Gaming Console',
    theme_color: '#00439c'
  },

  // 4. PS4 Pro (1TB)
  {
    id: 'ps4-pro-1tb-preowned',
    name: 'PlayStation 4 Pro (1TB Console) - Pre-Owned',
    subtitle: 'Enhanced 4K Gaming · Boost Mode · 1TB Storage · DJN Certified',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 38990,
    price: 23999,
    discount_percent: 38,
    rating: 4.8,
    review_count: 62,
    in_stock: true,
    stock_count: 6,
    badge: '4K GAMING',
    image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps4-pro-product-thumbnail-01-en-14sep21',
    features: [
      '4.20 Teraflops GPU for enhanced 4K visuals and faster frame rates',
      'Boost Mode delivers higher performance for legacy PS4 titles',
      '1TB internal SATA storage for huge game libraries',
      'Includes 1 Official Sony DualShock 4 wireless controller',
      'Complete thermal servicing and disc seek verified'
    ],
    description: 'The most powerful PlayStation 4 model ever made. Offers 4K checkerboard rendering, HDR color depth, and higher frame rates on games like God of War, Spider-Man, and Red Dead Redemption II.',
    in_the_box: [
      'PlayStation 4 Pro 1TB Console (Jet Black)',
      'DualShock 4 Wireless Controller (Original V2)',
      'HDMI Cable',
      'Power Cord',
      'Micro-USB Controller Charging Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Replacement Guarantee',
    edition: 'Pro Edition (1TB)',
    genre: 'Home Gaming Console',
    theme_color: '#003791'
  },

  // 5. PS4 Slim (1TB)
  {
    id: 'ps4-slim-1tb-preowned',
    name: 'PlayStation 4 Slim (1TB Console) - Pre-Owned',
    subtitle: 'Quiet & Energy Efficient · 1TB Storage · HDR Ready · Complete Kit',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 29990,
    price: 19999,
    discount_percent: 33,
    rating: 4.9,
    review_count: 85,
    in_stock: true,
    stock_count: 8,
    badge: 'MOST POPULAR',
    image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Compact, sleek form factor that runs whisper quiet and cool',
      '1TB internal storage holding 20+ blockbuster games',
      'HDR support for breathtaking colors on supported TVs',
      'Includes original DualShock 4 V2 controller',
      'Fully bench tested and laser optical drive verified'
    ],
    description: 'The golden standard for PlayStation gaming. The PS4 Slim 1TB delivers exceptional reliability, an immense library of award-winning titles, and effortless plug-and-play entertainment.',
    in_the_box: [
      'PlayStation 4 Slim 1TB Console',
      'DualShock 4 Wireless Controller',
      'HDMI Cable',
      'Power Cable',
      'USB Controller Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Replacement Guarantee',
    edition: 'Slim Edition (1TB)',
    genre: 'Home Gaming Console',
    theme_color: '#003791'
  },

  // 6. PS4 Slim (500GB)
  {
    id: 'ps4-slim-500gb-preowned',
    name: 'PlayStation 4 Slim (500GB Console) - Pre-Owned',
    subtitle: 'Budget Champion · 500GB HDD · HDR Support · Certified Grade A+',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 27990,
    price: 17499,
    discount_percent: 37,
    rating: 4.8,
    review_count: 53,
    in_stock: true,
    stock_count: 5,
    badge: 'BUDGET ENTRY',
    image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Affordable entry into the PlayStation ecosystem',
      '500GB internal storage expandable via external USB 3.0 HDD',
      'Plays the entire catalog of PS4 masterpieces',
      'Includes 1 DualShock 4 controller and all cables',
      '100% Optical laser seek and installation pass'
    ],
    description: 'The most cost-effective way to play GTA V, God of War, The Last of Us, and FC 24 with authentic console performance without breaking the bank.',
    in_the_box: [
      'PlayStation 4 Slim 500GB Console',
      'DualShock 4 Wireless Controller',
      'HDMI Cable',
      'Power Cable',
      'Controller Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Replacement Guarantee',
    edition: 'Slim Edition (500GB)',
    genre: 'Home Gaming Console',
    theme_color: '#003791'
  },

  // 7. Xbox Series X (1TB)
  {
    id: 'xbox-series-x-1tb',
    name: 'Xbox Series X (1TB SSD Console)',
    subtitle: '12 Teraflops · True 4K 120FPS · 4K UHD Blu-Ray · Quick Resume',
    category: 'consoles',
    platform: 'Xbox',
    condition: 'Brand New Sealed',
    mrp: 55990,
    price: 51990,
    discount_percent: 7,
    rating: 4.9,
    review_count: 32,
    in_stock: true,
    stock_count: 3,
    badge: '12 TERAFLOPS',
    image_url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni',
    features: [
      '12 Teraflops of raw GPU computing power for true 4K gaming',
      'Xbox Velocity Architecture with custom 1TB NVMe SSD',
      'Quick Resume lets you instantly switch between multiple games',
      'Physical 4K Ultra HD Blu-ray disc player',
      'Backwards compatible with 4 generations of Xbox games'
    ],
    description: 'The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles with next-generation speeds, Quick Resume, and breathtaking graphical fidelity.',
    in_the_box: [
      'Xbox Series X Console (1TB)',
      'Xbox Wireless Controller (Carbon Black)',
      'Ultra High Speed HDMI Cable',
      'Power Cord',
      '2 AA Batteries'
    ],
    warranty: '1 Year Official Microsoft India Manufacturer Warranty',
    edition: 'Standard Disc Edition (1TB)',
    genre: 'Next-Gen Flagship Console',
    theme_color: '#107c10'
  },

  // 8. Xbox Series S (512GB)
  {
    id: 'xbox-series-s-512gb-preowned',
    name: 'Xbox Series S (512GB SSD Console) - Pre-Owned',
    subtitle: 'All-Digital Next-Gen · 120 FPS Ready · Xbox Game Pass Ultimate Ready',
    category: 'consoles',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 34990,
    price: 21999,
    discount_percent: 37,
    rating: 4.8,
    review_count: 41,
    in_stock: true,
    stock_count: 5,
    badge: 'GAME PASS CHAMPION',
    image_url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mKce',
    features: [
      'Next-generation speed and performance in the smallest Xbox ever',
      '512GB custom NVMe SSD with ultra-fast load times',
      'Variable Refresh Rate (VRR) and up to 120 FPS smooth gameplay',
      'Perfect match for Xbox Game Pass library of 400+ titles',
      'Includes official Xbox wireless controller'
    ],
    description: 'Next-gen gaming at an unbeatable price point. Fully certified Grade A+ pre-owned Xbox Series S console ready for instant gaming with Xbox Game Pass.',
    in_the_box: [
      'Xbox Series S Console (Robot White)',
      'Xbox Wireless Controller (Robot White)',
      'High Speed HDMI Cable',
      'Power Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Replacement Guarantee',
    edition: 'All-Digital Edition (512GB)',
    genre: 'Next-Gen Digital Console',
    theme_color: '#107c10'
  },

  // 9. Nintendo Switch OLED Model
  {
    id: 'nintendo-switch-oled-white',
    name: 'Nintendo Switch OLED Model (White)',
    subtitle: '7-inch Vibrant OLED Screen · 64GB Internal Storage · Enhanced Audio · LAN Dock',
    category: 'consoles',
    platform: 'Switch',
    condition: 'Brand New Sealed',
    mrp: 34999,
    price: 29999,
    discount_percent: 14,
    rating: 4.9,
    review_count: 39,
    in_stock: true,
    stock_count: 4,
    badge: '7" OLED DISPLAY',
    image_url: 'https://m.media-amazon.com/images/I/61-PblYntsL._SX679_.jpg',
    features: [
      'Vivid 7-inch OLED screen with deep blacks and rich colors',
      'Wide adjustable tabletop stand for comfortable multiplayer',
      'Wired LAN port built into the dock for steady TV gaming',
      '64GB internal storage with microSD card expansion',
      'Three modes in one: TV Mode, Tabletop Mode, Handheld Mode'
    ],
    description: 'Experience your favorite games anytime, anywhere with the vibrant colors and crisp contrast of a 7-inch OLED screen. The flagship portable console from Nintendo.',
    in_the_box: [
      'Nintendo Switch Console (OLED Model)',
      'Nintendo Switch Dock (White with LAN port)',
      'Joy-Con (L) and Joy-Con (R) in White',
      'Joy-Con Wrist Straps',
      'Joy-Con Grip',
      'High Speed HDMI Cable',
      'AC Adapter'
    ],
    warranty: '6-Month DJN Tech Comprehensive Warranty + 7-Day Doorstep Replacement',
    edition: 'OLED Model (White)',
    genre: 'Hybrid Handheld Console',
    theme_color: '#e60012'
  },

  // 10. Nintendo Switch V2 (Neon)
  {
    id: 'nintendo-switch-v2-preowned',
    name: 'Nintendo Switch V2 (Neon Blue & Red) - Pre-Owned',
    subtitle: 'Extended Battery Life Edition · Handheld & TV Gaming · Grade A+',
    category: 'consoles',
    platform: 'Switch',
    condition: 'Pre-Owned Grade A+',
    mrp: 29999,
    price: 18999,
    discount_percent: 37,
    rating: 4.8,
    review_count: 47,
    in_stock: true,
    stock_count: 4,
    badge: 'HYBRID GAMING',
    image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Upgraded V2 processor with 4.5 to 9 hours extended battery life',
      'Dock included for seamless TV output at 1080p',
      'Original Joy-Con controllers with zero stick drift tested',
      'Play Mario, Zelda, Pokemon, and thousands of indie gems',
      'Ultrasonic cleaned and certified Grade A+'
    ],
    description: 'The revolutionary home console that turns into a handheld on the go. Pre-owned Grade A+ model with extended battery life and authentic Joy-Con controllers.',
    in_the_box: [
      'Nintendo Switch V2 Console',
      'Nintendo Switch TV Dock',
      'Joy-Con (L) Neon Blue & Joy-Con (R) Neon Red',
      'Joy-Con Grip',
      'HDMI Cable',
      'AC Adapter'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement',
    edition: 'Standard V2 Battery Edition',
    genre: 'Hybrid Handheld Console',
    theme_color: '#e60012'
  },

  // 11. DualSense Controller
  {
    id: 'dualsense-midnight-black',
    name: 'PS5 DualSense Wireless Controller (Midnight Black)',
    subtitle: 'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone',
    category: 'controllers',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 6390,
    price: 4990,
    discount_percent: 22,
    rating: 4.9,
    review_count: 56,
    in_stock: true,
    stock_count: 14,
    badge: 'POPULAR COLOR',
    image_url: '/hero-dualsense.png',
    features: [
      'Immersive haptic feedback brings in-game actions to life in your hands',
      'Dynamic adaptive triggers simulate physical resistance of gear and weapons',
      'Built-in microphone and 3.5mm headset jack for seamless multiplayer voice',
      'Signature comfortable design with evolved ergonomic grip'
    ],
    description: 'Discover a deeper gaming experience with the innovative PS5 DualSense controller featuring haptic feedback and dynamic triggers.',
    in_the_box: [
      'DualSense Wireless Controller (Midnight Black)',
      'Instruction Manual'
    ],
    warranty: '1 Year Official Sony India Warranty',
    edition: 'Midnight Black Edition',
    genre: 'Official Wireless Controller',
    theme_color: '#00439c'
  },

  // 12. Xbox Wireless Controller (Robot White)
  {
    id: 'xbox-wireless-controller-white',
    name: 'Xbox Wireless Controller (Robot White)',
    subtitle: 'Textured Grip · Hybrid D-Pad · Bluetooth · Works with Xbox & PC',
    category: 'controllers',
    platform: 'Xbox',
    condition: 'Brand New Sealed',
    mrp: 5990,
    price: 4790,
    discount_percent: 20,
    rating: 4.8,
    review_count: 42,
    in_stock: true,
    stock_count: 8,
    badge: 'CROSS-PLATFORM',
    image_url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mKce',
    features: [
      'Sculpted surfaces and refined geometry for enhanced comfort during gameplay',
      'Hybrid D-pad and textured grip on triggers, bumpers, and back-case',
      'Seamlessly capture and share content with dedicated Share button',
      'Xbox Wireless and Bluetooth technology for gaming on console, PC, mobile'
    ],
    description: 'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay.',
    in_the_box: [
      'Xbox Wireless Controller (Robot White)',
      '2 AA Batteries'
    ],
    warranty: '1 Year Official Microsoft Warranty',
    edition: 'Robot White Edition',
    genre: 'Official Wireless Controller',
    theme_color: '#107c10'
  }
];

async function insertConsoles() {
  console.log(`Inserting ${CONSOLES.length} consoles and controllers into Supabase...`);

  for (const item of CONSOLES) {
    const { error } = await supabase
      .from('products')
      .upsert(item, { onConflict: 'id' });

    if (error) {
      console.error(`Failed to upsert ${item.id}:`, error.message);
    } else {
      console.log(`✓ Inserted/Updated: ${item.name} (${item.platform} - ${item.category})`);
    }
  }

  console.log('\nAll consoles and controllers successfully populated into Supabase!');
}

insertConsoles().catch(console.error);
