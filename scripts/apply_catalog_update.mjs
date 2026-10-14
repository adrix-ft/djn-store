import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const HARDWARE_CATALOG = [
  // 1. Controller: DualSense White (4100)
  {
    id: 'dualsense-white',
    name: 'PlayStation 5 DualSense Wireless Controller (White)',
    subtitle: 'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone · 3.5mm Jack',
    category: 'controllers',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 5990,
    price: 4100,
    discount_percent: 32,
    rating: 4.9,
    review_count: 74,
    in_stock: true,
    stock_count: 999,
    badge: 'POPULAR',
    features: [
      'Immersive haptic feedback brings in-game actions alive in your hands',
      'Dynamic adaptive triggers with customizable resistance levels',
      'Integrated microphone and 3.5mm headset jack for seamless team chat',
      'Create button to record and broadcast your most epic gaming moments',
      'Signature two-tone ergonomic comfort with high-traction analog grips'
    ],
    description: 'Discover a deeper, highly immersive gaming experience with the iconic two-tone White PS5 DualSense wireless controller. Featuring groundbreaking haptic feedback, dynamic adaptive triggers, and a built-in microphone, all integrated into an iconic ergonomic design.',
    in_the_box: [
      'PS5 DualSense Wireless Controller (White)',
      'Quick-Start User Manual',
      'Official Manufacturer Warranty Card'
    ],
    warranty: '1 Year Official Sony India Warranty + DJN Assured Support',
    color: 'White',
    theme_color: '#00439c',
    genre: 'Official Wireless Controller',
    edition: 'Standard White Edition',
    image_url: '/dualsense-white.jpg',
    reviews: [
      {
        id: 'rev-ds-w1',
        userName: 'Rohan Mehta',
        userLocation: 'Mumbai',
        rating: 5,
        date: '2 days ago',
        title: 'Authentic Sony India unit, superb feel!',
        comment: 'Received brand new sealed box with original Indian warranty seal. The white finish looks ultra clean and haptics on Astro Bot are unbelievable.',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // 2. Controller: DualSense Black (4200)
  {
    id: 'dualsense-midnight-black',
    name: 'PlayStation 5 DualSense Wireless Controller (Midnight Black)',
    subtitle: 'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone · Stealth Finish',
    category: 'controllers',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 6390,
    price: 4200,
    discount_percent: 34,
    rating: 4.9,
    review_count: 56,
    in_stock: true,
    stock_count: 999,
    badge: 'BESTSELLER',
    features: [
      'Tactile haptic feedback simulating authentic in-game physical sensations',
      'Adaptive triggers simulating weapon draw and accelerator resistance',
      'Built-in microphone and 3.5mm audio jack for team voice communication',
      'Matte Midnight Black stealth color scheme with subtle blue accent lighting'
    ],
    description: 'Ignite your gaming nights with the sleek Midnight Black DualSense wireless controller. Features advanced haptic feedback, dynamic adaptive triggers, and an integrated microphone in a stealth dark silhouette.',
    in_the_box: [
      'PS5 DualSense Wireless Controller (Midnight Black)',
      'User Manual',
      'Official Sony Warranty Card'
    ],
    warranty: '1 Year Official Sony India Warranty + DJN Assured Support',
    color: 'Midnight Black',
    theme_color: '#090d16',
    genre: 'Official Wireless Controller',
    edition: 'Midnight Black Edition',
    image_url: '/hero-dualsense.png',
    reviews: [
      {
        id: 'rev-ds-b1',
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

  // 3. Controller: Xbox Series Controller (4200)
  {
    id: 'xbox-series-controller',
    name: 'Xbox Wireless Controller (Series X|S)',
    subtitle: 'Textured Grip · Hybrid D-Pad · Bluetooth & Xbox Wireless · 40hr Battery Life',
    category: 'controllers',
    platform: 'Xbox',
    condition: 'Brand New Sealed',
    mrp: 5990,
    price: 4200,
    discount_percent: 30,
    rating: 4.8,
    review_count: 42,
    in_stock: true,
    stock_count: 999,
    badge: 'CROSS-PLATFORM',
    features: [
      'Sculpted surfaces and refined geometry for enhanced hand comfort during gameplay',
      'Hybrid D-pad and textured grip on triggers, bumpers, and back-case',
      'Seamlessly capture and share screenshots and clips with dedicated Share button',
      'Xbox Wireless and Bluetooth technology for gaming on console, PC, mobile'
    ],
    description: 'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay. Stay on target with textured grip and a hybrid D-pad.',
    in_the_box: [
      'Xbox Wireless Controller',
      '2 AA Alkaline Batteries',
      'Setup Guide'
    ],
    warranty: '1 Year Official Microsoft India Warranty',
    color: 'Carbon Black',
    theme_color: '#107c10',
    genre: 'Official Wireless Controller',
    edition: 'Series X|S Edition',
    image_url: '/xbox-series-controller.jpg',
    reviews: [
      {
        id: 'rev-xb-1',
        userName: 'Sameer Deshmukh',
        userLocation: 'Pune',
        rating: 5,
        date: '5 days ago',
        title: 'Great grip and PC Bluetooth pairing',
        comment: 'Works flawlessly on both my Xbox and Windows PC. Very comfortable textured triggers and rock-solid build.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 4. Console: PS5 Slim Disc Edition 1TB (62000)
  {
    id: 'ps5-slim-disc',
    name: 'PlayStation 5 Slim (Disc Edition) 1TB',
    subtitle: '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray Optical Drive',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 64990,
    price: 62000,
    discount_percent: 5,
    rating: 4.9,
    review_count: 58,
    in_stock: true,
    stock_count: 999,
    badge: 'FLAGSHIP',
    features: [
      'Slimmer chassis with 1TB ultra-high speed internal PCIe Gen4 NVMe SSD',
      'Ultra HD Blu-ray optical disc drive included',
      'DualSense wireless controller with haptic feedback & adaptive triggers',
      'Tempest 3D AudioTech and up to 120 fps with 120Hz 4K HDR video output',
      'Official 1 Year Sony India Manufacturer Warranty'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed 1TB SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games in a sleek, compact slim form factor.',
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
    theme_color: '#00439c',
    genre: 'Next-Gen Gaming Console',
    storage: '1TB SSD',
    edition: 'Slim Disc Edition 1TB',
    image_url: '/hero-ps5-slim.png',
    reviews: [
      {
        id: 'rev-ps5-slim-1',
        userName: 'Aakash Verma',
        userLocation: 'Delhi',
        rating: 5,
        date: '3 days ago',
        title: 'Original Indian Sony Unit, Superb packaging!',
        comment: 'Received brand new sealed box with original Indian warranty seal. Delivery was super fast within 48 hours. DJN Tech is 100% trustworthy for consoles!',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // 5. Console: PS5 Standard Disc Edition 825GB (55000)
  {
    id: 'ps5-standard-disc-preowned',
    name: 'PlayStation 5 Standard (Disc Edition) 825GB',
    subtitle: '825GB High-Speed SSD · 4K HDR Blu-Ray · DJN 25-Point Bench Tested · Grade A+',
    category: 'consoles',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 59900,
    price: 55000,
    discount_percent: 8,
    rating: 4.8,
    review_count: 44,
    in_stock: true,
    stock_count: 999,
    badge: 'ORIGINAL FAT',
    features: [
      'Robust launch revision with massive copper thermal cooling heat-sink',
      '825GB ultra-high speed SSD with expandable M.2 NVMe slot',
      'Ultra HD Blu-ray optical disc drive with 100% optical seek accuracy',
      'Includes official Sony DualSense wireless controller',
      'Protected under DJN Tech Comprehensive Hardware Guarantee'
    ],
    description: 'The iconic original PlayStation 5 Standard Disc Edition. Built with high-grade thermal engineering, whisper-quiet liquid metal cooling, and ultra-high-speed SSD architecture for breathtaking next-generation gaming.',
    in_the_box: [
      'PlayStation 5 Standard Disc Console',
      'Official DualSense Wireless Controller',
      'HDMI 2.1 Cable',
      'Power Cable',
      'Vertical/Horizontal Base Stand'
    ],
    warranty: '1 Year Manufacturer / DJN Hardware Warranty + 7-Day Replacement Guarantee',
    theme_color: '#00439c',
    genre: 'Next-Gen Gaming Console',
    storage: '825GB SSD',
    edition: 'Standard Disc Edition 825GB',
    image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
    reviews: [
      {
        id: 'rev-ps5-fat-1',
        userName: 'Naveen Kumar',
        userLocation: 'Bengaluru',
        rating: 5,
        date: '1 week ago',
        title: 'Heavy duty cooling and silent',
        comment: 'Console arrived in immaculate condition. Plays all my disc games without a glitch. DJN team assisted with doorstep delivery verification.',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // 6. Console: PS4 Slim 1TB (22000)
  {
    id: 'ps4-slim-1tb-preowned',
    name: 'PlayStation 4 Slim (1TB Console)',
    subtitle: '1TB Storage · Whisper Quiet · HDR Ready · Complete Kit with DualShock 4',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 29990,
    price: 22000,
    discount_percent: 27,
    rating: 4.9,
    review_count: 85,
    in_stock: true,
    stock_count: 999,
    badge: 'TOP SELLER',
    features: [
      'Massive 1TB internal HDD holding 25+ blockbuster PlayStation games',
      'Energy-efficient slim architecture that runs cool and whisper-quiet',
      'Full HDR support for vibrant color reproduction on compatible TVs',
      'Includes original Sony DualShock 4 V2 wireless controller',
      '100% optical laser seek and motherboard diagnostic pass'
    ],
    description: 'The golden standard for PlayStation gaming. The PS4 Slim 1TB delivers exceptional reliability, an immense library of award-winning titles, and effortless plug-and-play entertainment.',
    in_the_box: [
      'PlayStation 4 Slim 1TB Console',
      'DualShock 4 Wireless Controller (Original V2)',
      'HDMI Cable',
      'Power Cable',
      'USB Charging Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    theme_color: '#003791',
    genre: 'Home Gaming Console',
    storage: '1TB HDD',
    edition: 'Slim Edition (1TB)',
    image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    reviews: [
      {
        id: 'rev-ps4-1tb-1',
        userName: 'Vikram Malhotra',
        userLocation: 'Chandigarh',
        rating: 5,
        date: '4 days ago',
        title: 'Looks like new, huge storage!',
        comment: 'Condition is literally Grade A+ without scratches. 1TB hard drive is super useful for GTA V, RDR2, and God of War. Great value!',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 7. Console: PS4 Slim 500GB (21000)
  {
    id: 'ps4-slim-500gb-preowned',
    name: 'PlayStation 4 Slim (500GB Console)',
    subtitle: '500GB HDD · Compact & Energy Efficient · HDR Ready · DJN Certified',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 27990,
    price: 21000,
    discount_percent: 25,
    rating: 4.8,
    review_count: 53,
    in_stock: true,
    stock_count: 999,
    badge: 'VALUE PICK',
    features: [
      'Affordable entry into the legendary PlayStation ecosystem',
      '500GB internal storage expandable via external USB 3.0 external drive',
      'Plays the entire catalog of PS4 masterpieces with smooth 1080p output',
      'Includes 1 original Sony DualShock 4 controller and all connection cables',
      'Complete 25-point hardware bench stress-testing verified'
    ],
    description: 'The most cost-effective way to play GTA V, God of War, The Last of Us, and FC 24 with authentic console performance without breaking the bank.',
    in_the_box: [
      'PlayStation 4 Slim 500GB Console',
      'DualShock 4 Wireless Controller',
      'HDMI Cable',
      'Power Cable',
      'USB Controller Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    theme_color: '#003791',
    genre: 'Home Gaming Console',
    storage: '500GB HDD',
    edition: 'Slim Edition (500GB)',
    image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    reviews: [
      {
        id: 'rev-ps4-500-1',
        userName: 'Karan Shah',
        userLocation: 'Ahmedabad',
        rating: 5,
        date: '6 days ago',
        title: 'Smooth performance, prompt delivery',
        comment: 'Bought for my younger brother. Works flawlessly and runs super quiet. DJN Tech customer support is very responsive.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 8. Console: PS4 Standard 500GB (18000)
  {
    id: 'ps4-standard-500gb-preowned',
    name: 'PlayStation 4 Standard (500GB Console)',
    subtitle: 'Classic Angled Design · Optical Audio Out · 500GB HDD · DJN Certified Grade A+',
    category: 'consoles',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 24990,
    price: 18000,
    discount_percent: 28,
    rating: 4.7,
    review_count: 38,
    in_stock: true,
    stock_count: 999,
    badge: 'BUDGET CHAMPION',
    features: [
      'Original launch chassis with dual matte and gloss architectural styling',
      'Built-in optical TOSLINK audio output port for dedicated sound systems',
      '500GB internal hard drive holding favorite games',
      'Includes authentic DualShock 4 wireless controller',
      'Ultrasonic cleaned, fresh thermal paste serviced, and stress bench tested'
    ],
    description: 'The iconic original PlayStation 4 that launched an era of gaming classics. Certified Grade A+ pre-owned unit thoroughly bench-tested, serviced, and bundled with authentic controller and cables.',
    in_the_box: [
      'PlayStation 4 Standard Console (Jet Black)',
      'DualShock 4 Wireless Controller',
      'HDMI Cable',
      'AC Power Cord',
      'Micro-USB Controller Cable'
    ],
    warranty: '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    theme_color: '#003791',
    genre: 'Home Gaming Console',
    storage: '500GB HDD',
    edition: 'Original Standard "Fat" Edition',
    image_url: '/ps4-standard.jpg',
    reviews: [
      {
        id: 'rev-ps4-std-1',
        userName: 'Amit Sengupta',
        userLocation: 'Kolkata',
        rating: 5,
        date: '1 week ago',
        title: 'Unbeatable budget gaming console',
        comment: 'For 18k, this is a steal. Plays all PS4 titles effortlessly. The optical audio port connects right into my soundbar. Very clean condition!',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 9. Accessory: PS5 Disc Drive (9000)
  {
    id: 'ps5-disc-drive',
    name: 'PlayStation 5 Disc Drive (for PS5 Slim & Pro)',
    subtitle: 'Ultra HD Blu-ray Optical Disc Player · Snap-In Installation · Official Sony Unit',
    category: 'accessories',
    platform: 'PS5',
    condition: 'Brand New Sealed',
    mrp: 10990,
    price: 9000,
    discount_percent: 18,
    rating: 4.9,
    review_count: 29,
    in_stock: true,
    stock_count: 999,
    badge: 'OFFICIAL SONY',
    features: [
      'Official Sony Ultra HD Blu-ray optical disc drive add-on for PS5 Slim & PS5 Pro',
      'Tool-free snap-in installation directly into console bay',
      'Play 4K Ultra HD Blu-ray discs, standard Blu-ray discs, and DVDs',
      'Enables pre-owned and physical game disc playback on digital slim consoles'
    ],
    description: 'Upgrade your PlayStation 5 Digital Slim console to play physical disc games and 4K Ultra HD Blu-ray movies. Features seamless tool-free installation and official Sony integration.',
    in_the_box: [
      'PS5 Disc Drive Add-on Unit',
      'Original White Matching Cover Panel',
      '2 Horizontal Stand Feet (Long)',
      'Instruction Manual'
    ],
    warranty: '1 Year Official Sony India Warranty',
    color: 'White',
    theme_color: '#00439c',
    genre: 'Console Optical Accessory',
    edition: 'Official Disc Drive Add-On',
    image_url: '/ps5-disc-drive.jpg',
    reviews: [
      {
        id: 'rev-dd-1',
        userName: 'Rahul Singhania',
        userLocation: 'Hyderabad',
        rating: 5,
        date: '3 days ago',
        title: 'Snapped right into my Slim digital!',
        comment: 'Took literally 30 seconds to click into place. Now I can buy pre-owned disc games at super cheap prices from DJN Tech!',
        verifiedBuyer: true,
        platformPlayed: 'PS5'
      }
    ]
  },

  // 10. Accessory: Xbox Rechargeable Battery Pack (800)
  {
    id: 'xbox-rechargeable-battery-pack',
    name: 'Xbox Rechargeable Battery Pack (+ USB-C Cable)',
    subtitle: 'Up to 30 Hours Battery Life · Play While Charging · Includes 9ft Braided USB-C Cable',
    category: 'accessories',
    platform: 'Xbox',
    condition: 'Brand New Sealed',
    mrp: 1499,
    price: 800,
    discount_percent: 47,
    rating: 4.8,
    review_count: 61,
    in_stock: true,
    stock_count: 999,
    badge: 'MUST HAVE',
    features: [
      'Rechargeable high-density lithium-ion battery pack for Xbox Wireless Controllers',
      'Provides up to 30 hours of continuous gameplay on a full charge',
      'Fully charges in under 4 hours, even when console is on standby',
      'Includes long 9-foot durable USB-C charging cable',
      'Say goodbye to expensive disposable AA batteries forever'
    ],
    description: 'Keep the action going with the Xbox Rechargeable Battery Pack + USB-C Cable. Recharge while you play or afterwards, even when your Xbox is in standby. The long-lasting rechargeable battery fully charges in under 4 hours.',
    in_the_box: [
      'Xbox Rechargeable Lithium-Ion Battery Pack',
      '9-foot USB-C Braided Cable',
      'Quick Start Guide'
    ],
    warranty: '6-Month DJN Tech Hardware Warranty',
    color: 'Black',
    theme_color: '#107c10',
    genre: 'Controller Power Accessory',
    edition: 'Play & Charge Kit',
    image_url: '/xbox-battery-pack.jpg',
    reviews: [
      {
        id: 'rev-xb-bat-1',
        userName: 'Devendra Joshi',
        userLocation: 'Jaipur',
        rating: 5,
        date: '5 days ago',
        title: 'Essential accessory for any Xbox controller',
        comment: 'Fits perfectly inside the controller battery compartment. Saves a ton of money on AA batteries. Solid build and long cable.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  }
];

const ALLOWED_HARDWARE_IDS = HARDWARE_CATALOG.map(i => i.id);

async function applyMigration() {
  console.log('1. Upserting 10 hardware and accessory items...');
  for (const item of HARDWARE_CATALOG) {
    const { error } = await supabase.from('products').upsert(item, { onConflict: 'id' });
    if (error) {
      console.error(`Failed to upsert ${item.id}:`, error.message);
    } else {
      console.log(`✓ Upserted: ${item.name} (₹${item.price})`);
    }
  }

  console.log('\n2. Removing unlisted hardware/accessories...');
  // Find all consoles, controllers, accessories
  const { data: currentHardware, error: fetchErr } = await supabase
    .from('products')
    .select('id, name, category')
    .in('category', ['consoles', 'controllers', 'accessories']);

  if (fetchErr) {
    console.error('Fetch error:', fetchErr.message);
  } else {
    for (const prod of currentHardware) {
      if (!ALLOWED_HARDWARE_IDS.includes(prod.id)) {
        const { error: delErr } = await supabase.from('products').delete().eq('id', prod.id);
        if (delErr) {
          console.error(`Failed to delete ${prod.id}:`, delErr.message);
        } else {
          console.log(`✗ Removed unlisted item: ${prod.name} (${prod.id})`);
        }
      }
    }
  }

  console.log('\n3. Verifying pre-owned games catalog...');
  const { data: games, error: gamesErr } = await supabase
    .from('products')
    .select('id, name, platform')
    .eq('category', 'preowned_games');

  if (gamesErr) {
    console.error('Games fetch error:', gamesErr.message);
  } else {
    const ps4Games = games.filter(g => g.platform === 'PS4');
    const ps5Games = games.filter(g => g.platform === 'PS5');
    console.log(`✓ Intact games: Total ${games.length} (${ps4Games.length} PS4 games, ${ps5Games.length} PS5 games)`);
  }

  console.log('\n4. Final catalog breakdown:');
  const { data: allProds } = await supabase.from('products').select('category, platform');
  const summary = {};
  allProds.forEach(p => {
    const key = `${p.category} (${p.platform})`;
    summary[key] = (summary[key] || 0) + 1;
  });
  console.log(summary);
  console.log(`Total active products in database: ${allProds.length}`);
}

applyMigration().catch(console.error);
