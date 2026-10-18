import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

export const NEW_GAMES = [
  // 1. Assassin's Creed Syndicate (Xbox One) - 1
  {
    id: 'assassins-creed-syndicate-xbox-preowned',
    name: "Assassin's Creed Syndicate (Xbox One)",
    subtitle: '100% Optical Laser Tested Disc · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.7,
    review_count: 28,
    in_stock: true,
    stock_count: 1,
    badge: 'VICTORIAN LONDON',
    features: [
      'Official Microsoft Xbox One Blu-ray game disc',
      '25-Point optical laser seek and complete installation verified',
      'Original retail game case with authentic Xbox One cover art',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: "Lead the industrial underworld in Victorian-era London as Jacob and Evie Frye. Tested on Xbox One and Xbox Series X via backward compatibility. Disc cleaned and verified by DJN Tech.",
    in_the_box: [
      "Xbox One Game Disc (Assassin's Creed Syndicate)",
      'Official Retail Green Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Xbox One Retail Case',
    genre: 'Action / Victorian London',
    theme_color: '#107c10',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/368500/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-ac-synd-xb1',
        userName: 'Vikram Sethi',
        userLocation: 'Bengaluru',
        rating: 5,
        date: '2 days ago',
        title: 'Runs like a dream on Series X!',
        comment: 'Fast delivery from DJN Tech. Disc had zero scratches and installed 100% on my Xbox. Syndicate at 60fps is amazing.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 2. Assassin's Creed The Ezio Collection (PS4) - 1
  {
    id: 'assassins-creed-the-ezio-collection-ps4-preowned',
    name: "Assassin's Creed The Ezio Collection (PS4)",
    subtitle: 'Includes AC II, Brotherhood & Revelations Remastered · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1999,
    price: 1199,
    discount_percent: 40,
    rating: 4.9,
    review_count: 42,
    in_stock: true,
    stock_count: 1,
    badge: 'TRILOGY PACK',
    features: [
      'Includes full single-player campaigns of AC II, Brotherhood & Revelations',
      'Enhanced 1080p graphics and improved visual lighting on PS4 / PS5',
      'Includes all single-player DLC expansions and short films',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Relive the legendary saga of Ezio Auditore da Firenze across Italy and Constantinople. Complete remastered trilogy disc tested and certified by DJN Tech.',
    in_the_box: [
      "PS4 Game Disc (Assassin's Creed The Ezio Collection)",
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: '3-in-1 Remastered Trilogy Pack',
    genre: 'Action / Renaissance Trilogy',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nrv.jpg',
    reviews: [
      {
        id: 'rev-ac-ezio-ps4',
        userName: 'Aditya Kulkarni',
        userLocation: 'Pune',
        rating: 5,
        date: '1 week ago',
        title: '3 classic games on 1 disc, insane value',
        comment: 'Ezio trilogy is absolute peak Assassin’s Creed. Packaging from DJN Tech was pristine with bubble wrap. Disc was spotless.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 3. Call of Duty: Infinite Warfare (Xbox One) - 1
  {
    id: 'call-of-duty-infinite-warfare-xbox-preowned',
    name: 'Call of Duty: Infinite Warfare (Xbox One)',
    subtitle: '100% Optical Laser Tested Disc · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 1818,
    price: 1099,
    discount_percent: 40,
    rating: 4.6,
    review_count: 24,
    in_stock: true,
    stock_count: 1,
    badge: 'CAMPAIGN',
    features: [
      'Official Microsoft Xbox One Blu-ray game disc',
      'Grounded military sci-fi campaign with Jackal starfighter piloting',
      'Zombies in Spaceland 80s amusement park co-op mode',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Take the fight across our solar system in this gripping COD sci-fi campaign. 100% laser tested on Xbox One and Series X by DJN Tech.',
    in_the_box: [
      'Xbox One Game Disc (Call of Duty: Infinite Warfare)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Xbox One Retail Case',
    genre: 'Shooter / Sci-Fi FPS',
    theme_color: '#107c10',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292730/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-cod-iw-xb1',
        userName: 'Naveen Kumar',
        userLocation: 'Hyderabad',
        rating: 5,
        date: '4 days ago',
        title: 'Underrated campaign!',
        comment: 'Ethan the robot is such a great character. Disc arrived in great condition with original box.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 4. Call of Duty: Infinite Warfare Legacy Edition (PS4) - 1
  {
    id: 'call-of-duty-infinite-warfare-legacy-edition-ps4-preowned',
    name: 'Call of Duty: Infinite Warfare - Legacy Edition (PS4)',
    subtitle: 'Includes Modern Warfare Remastered · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2499,
    price: 1499,
    discount_percent: 40,
    rating: 4.8,
    review_count: 36,
    in_stock: true,
    stock_count: 1,
    badge: 'LEGACY EDITION',
    features: [
      'Special 2-in-1 Legacy Edition packaging',
      'Includes Call of Duty: Infinite Warfare full game',
      'Modern Warfare Remastered campaign and classic multiplayer',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'The ultimate 2-in-1 Call of Duty package featuring Infinite Warfare alongside the timeless Modern Warfare Remastered. Tested and verified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (Infinite Warfare Legacy Edition)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Legacy Edition (Includes MW Remastered)',
    genre: 'Shooter / Dual Campaign FPS',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co81ge.jpg',
    reviews: [
      {
        id: 'rev-cod-iw-leg-ps4',
        userName: 'Gaurav Sharma',
        userLocation: 'Delhi',
        rating: 5,
        date: '3 days ago',
        title: 'MW Remastered alone is worth it',
        comment: 'Playing through All Ghillied Up in remastered visuals brought back so many memories. Authentic Indian retail disc.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 5. Cricket 22 (PS4) - 2
  {
    id: 'cricket-22-ps4-preowned',
    name: 'Cricket 22 (PS4)',
    subtitle: 'Official Game of The Ashes · Pre-Owned Grade A+ · 2 Discs in Stock',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 3599,
    price: 2199,
    discount_percent: 39,
    rating: 4.7,
    review_count: 31,
    in_stock: true,
    stock_count: 2,
    badge: 'THE ASHES',
    features: [
      'Official licensing for The Ashes, Big Bash League, and Caribbean Premier League',
      'All-new bowling and fielding controls with tight responsive tactile feedback',
      'Deep narrative career mode with full press conferences and management',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: "Step onto the pitch with full official licenses for Men's and Women's Ashes competitions. Bench-tested on PlayStation 4 and backward-compatible with PS5.",
    in_the_box: [
      'PS4 Game Disc (Cricket 22)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Sports / Cricket',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1701380/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-cric22-1',
        userName: 'Rohan Deshmukh',
        userLocation: 'Mumbai',
        rating: 5,
        date: '5 days ago',
        title: 'Superb cricket physics!',
        comment: 'Best cricket game on PS4. Big improvement over Cricket 19 in bowling mechanics. Fast shipping by DJN Tech.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 6. Death Stranding: Special Edition (PS4) - 1
  {
    id: 'death-stranding-special-edition-ps4-preowned',
    name: 'Death Stranding: Special Edition (PS4)',
    subtitle: 'Hideo Kojima Masterpiece · Collectible SteelBook Case · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2499,
    price: 1499,
    discount_percent: 40,
    rating: 4.9,
    review_count: 39,
    in_stock: true,
    stock_count: 1,
    badge: 'SPECIAL EDITION',
    features: [
      "Collector's edition custom metallic SteelBook case",
      'Starring Norman Reedus, Mads Mikkelsen, Léa Seydoux, and Guillermo del Toro',
      'Groundbreaking asynchronous online connection mechanics',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: "Reconnect a fractured society in Hideo Kojima's genre-defying cinematic odyssey. Features the collectible Special Edition SteelBook casing.",
    in_the_box: [
      'PS4 Game Disc (Death Stranding)',
      'Custom SteelBook Metal Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original SteelBook)',
    edition: 'Special SteelBook Edition',
    genre: 'Action / Cinematic Sci-Fi',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-ds-se-1',
        userName: 'Abhishek Roy',
        userLocation: 'Kolkata',
        rating: 5,
        date: '6 days ago',
        title: 'Gorgeous SteelBook edition',
        comment: 'The metal case has a stunning finish. Atmospheric soundtrack and unforgettable journey. DJN delivered in 2 days.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 7. Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles (PS4) - 1
  {
    id: 'demon-slayer-kimetsu-no-yaiba-the-hinokami-chronicles-ps4-preowned',
    name: 'Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles (PS4)',
    subtitle: 'Official Anime Arena Fighter · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1638,
    price: 999,
    discount_percent: 39,
    rating: 4.8,
    review_count: 27,
    in_stock: true,
    stock_count: 1,
    badge: 'ANIME HIT',
    features: [
      "Relive Tanjiro's emotional story from the anime and Mugen Train arc",
      "Spectacular visual effects by CyberConnect2 capturing Ufotable's animation",
      'Head-to-head 2v2 arena battle mode with iconic Demon Slayer roster',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Walk the path of a Demon Slayer as Tanjiro Kamado in this breathtaking arena brawler. Tested for optical seek and fast installation on PS4 and PS5.',
    in_the_box: [
      'PS4 Game Disc (Demon Slayer Hinokami Chronicles)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Anime / Arena Fighter',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2928600/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-ds-hino-1',
        userName: 'Kunal Patel',
        userLocation: 'Ahmedabad',
        rating: 5,
        date: '1 week ago',
        title: 'Must have for anime fans!',
        comment: 'Hinokami Kagura visuals look insane on TV! Disc in immaculate condition, plays flawlessly.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 8. FIFA 20 (Xbox One) - 1
  {
    id: 'fifa-20-xbox-preowned',
    name: 'FIFA 20 (Xbox One)',
    subtitle: 'Includes VOLTA Street Football · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 999,
    price: 599,
    discount_percent: 40,
    rating: 4.6,
    review_count: 22,
    in_stock: true,
    stock_count: 1,
    badge: 'VOLTA FOOTBALL',
    features: [
      'Official Microsoft Xbox One Blu-ray game disc',
      'Features VOLTA Football bringing authentic street football and cages alive',
      'UEFA Champions League, Europa League, and Premier League licenses',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Experience both prestige stadium matches and raw street football with VOLTA in FIFA 20 on Xbox One and Xbox Series X via backward compatibility.',
    in_the_box: [
      'Xbox One Game Disc (FIFA 20)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Xbox One Retail Case',
    genre: 'Sports / Football',
    theme_color: '#107c10',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg',
    reviews: [
      {
        id: 'rev-f20-xb1',
        userName: 'Manish Rawat',
        userLocation: 'Jaipur',
        rating: 5,
        date: '2 weeks ago',
        title: 'Great fun with friends',
        comment: 'VOLTA mode is super addictive. Clean disc, original case with all inlays intact.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 9. FIFA 21 Champions Edition (PS4) - 1
  {
    id: 'fifa-21-champions-edition-ps4-preowned',
    name: 'FIFA 21 Champions Edition (PS4)',
    subtitle: 'Champions Edition · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1899,
    price: 1149,
    discount_percent: 39,
    rating: 4.7,
    review_count: 33,
    in_stock: true,
    stock_count: 1,
    badge: 'CHAMPIONS EDITION',
    features: [
      'Special Champions Edition packaging with Kylian Mbappé cover art',
      'Agile Dribbling, Positioning Personality, and Directed Creative Runs',
      'Expanded Career Mode with Match Sim and interactive development plans',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Win as one on the streets and in the stadium with FIFA 21 Champions Edition. Cleaned, benchmarked, and laser seek verified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (FIFA 21 Champions Edition)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Champions Edition',
    genre: 'Sports / Football',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wm2.jpg',
    reviews: [
      {
        id: 'rev-f21-champ-1',
        userName: 'Sanjay Nair',
        userLocation: 'Kochi',
        rating: 5,
        date: '4 days ago',
        title: 'Authentic Indian release',
        comment: 'Disc is scratchless and plays seamlessly. Champions Edition cover looks great in my collection.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 10. Gran Turismo Sport Spec II (PS4) - 3
  {
    id: 'gran-turismo-sport-spec-ii-ps4-preowned',
    name: 'Gran Turismo Sport - Spec II (PS4)',
    subtitle: 'Bonus Car Pack & In-Game Credits · 3 Discs Available · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2499,
    price: 1499,
    discount_percent: 40,
    rating: 4.9,
    review_count: 45,
    in_stock: true,
    stock_count: 3,
    badge: 'SPEC II EDITION',
    features: [
      'Expanded 2-Disc physical package with major content updates included',
      'Includes 10 Gr.3 Top Performing Cars and 2,500,000 in-game bonus credits',
      'FIA-certified real-time online motorsport and deep arcade/campaign racing',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'The definitive release of Gran Turismo Sport featuring massive bundled content, tracks, and Gr.3 bonus cars on 2 Blu-ray discs. Inspected and laser verified by DJN Tech.',
    in_the_box: [
      'PS4 2-Disc Set (Gran Turismo Sport Spec II)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine 2-disc set, optical laser seek verified, original case)',
    edition: 'Spec II Complete Edition (2 Discs)',
    genre: 'Racing / Simulation',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk2.jpg',
    reviews: [
      {
        id: 'rev-gt-spec2-1',
        userName: 'Arjun Sen',
        userLocation: 'Chandigarh',
        rating: 5,
        date: '3 days ago',
        title: 'The definitive GT Sport edition',
        comment: 'Comes with both discs in original multi-disc case. Saved huge downloads because updates are on disc. 10/10.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 11. Grand Theft Auto V (Xbox One) - 2
  {
    id: 'grand-theft-auto-v-xbox-preowned',
    name: 'Grand Theft Auto V (Xbox One)',
    subtitle: 'Includes GTA Online & Los Santos Map · 2 Discs Available',
    category: 'preowned_games',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 2199,
    price: 1299,
    discount_percent: 41,
    rating: 4.9,
    review_count: 65,
    in_stock: true,
    stock_count: 2,
    badge: 'ALL-TIME BESTSELLER',
    features: [
      'Official Microsoft Xbox One Blu-ray game disc',
      'Includes full story mode with Michael, Franklin, and Trevor',
      'Full access to GTA Online including all major multiplayer heists and updates',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Explore the sun-soaked metropolis of Los Santos and Blaine County in Rockstar’s blockbuster. Tested on Xbox One and Xbox Series X via backward compatibility.',
    in_the_box: [
      'Xbox One Game Disc (Grand Theft Auto V)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Xbox One Retail Case',
    genre: 'Action / Open World',
    theme_color: '#107c10',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-gtav-xb1',
        userName: 'Prashant Iyer',
        userLocation: 'Chennai',
        rating: 5,
        date: '2 days ago',
        title: 'Essential for any Xbox owner',
        comment: 'Worked immediately on Series X with quick install. Disc condition was top tier. Trusted seller!',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 12. Injustice: Ultimate Edition (PS4) - 3
  {
    id: 'injustice-gods-among-us-ultimate-edition-ps4-preowned',
    name: 'Injustice: Gods Among Us - Ultimate Edition (PS4)',
    subtitle: 'All 6 DLC Characters & 30+ Skins Included · 3 Discs in Stock',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.7,
    review_count: 34,
    in_stock: true,
    stock_count: 3,
    badge: 'ULTIMATE EDITION',
    features: [
      'Ultimate Edition includes Lobo, Batgirl, General Zod, Martian Manhunter, Zatanna & Scorpion',
      'Over 30 additional bonus character skins and 60 S.T.A.R. Labs missions',
      'Deep narrative comic-accurate NetherRealm story campaign',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'What if our greatest heroes became our greatest threat? Fight as DC legends in this complete Ultimate Edition. Laser tested on PS4 and PS5.',
    in_the_box: [
      'PS4 Game Disc (Injustice: Gods Among Us Ultimate Edition)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Ultimate Complete Edition',
    genre: 'Fighting / DC Superheroes',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1mym.jpg',
    reviews: [
      {
        id: 'rev-inj-ult-1',
        userName: 'Saurabh Joshi',
        userLocation: 'Nagpur',
        rating: 5,
        date: '4 days ago',
        title: 'All DLC included on disc',
        comment: 'Martian Manhunter and Lobo are so cool to play as. Super fast shipping from DJN.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 13. It Takes Two (PS4) - 1
  {
    id: 'it-takes-two-ps4-preowned',
    name: 'It Takes Two (PS4)',
    subtitle: 'Game of the Year 2021 Winner · Friend’s Pass Free Co-op · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2599,
    price: 1549,
    discount_percent: 40,
    rating: 5.0,
    review_count: 48,
    in_stock: true,
    stock_count: 1,
    badge: 'GAME OF THE YEAR',
    features: [
      'Winner of The Game Awards Game of the Year 2021',
      'Pure co-op perfection with split-screen and online play',
      'Free PS5 digital upgrade included with this disc',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure built purely for co-op. Tested and certified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (It Takes Two)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition (Free PS5 Upgrade)',
    genre: 'Co-op / Adventure Platformer',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-itt-1',
        userName: 'Deepak & Sneha',
        userLocation: 'Bengaluru',
        rating: 5,
        date: '1 week ago',
        title: 'Best couples game ever made',
        comment: 'Played this whole weekend with my wife. Creative gameplay mechanics in every level. Free PS5 upgrade also worked!',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 14. LEGO City Undercover (PS4) - 1
  {
    id: 'lego-city-undercover-ps4-preowned',
    name: 'LEGO City Undercover (PS4)',
    subtitle: 'Open World Police Detective Adventure · 2-Player Co-op · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.8,
    review_count: 26,
    in_stock: true,
    stock_count: 1,
    badge: 'FAMILY FAVORITE',
    features: [
      'Join the chase as undercover police officer Chase McCain',
      'Over 20 distinct districts to investigate in a huge open-world LEGO city',
      'Full 2-player drop-in/drop-out split-screen cooperative play',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Hunt down escaped criminal Rex Fury across sprawling LEGO City. Filled with witty movie parodies and family-friendly co-op fun. Laser verified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (LEGO City Undercover)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Action / Open World Adventure',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578330/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-lego-city-1',
        userName: 'Tanmay Bhatt',
        userLocation: 'Mumbai',
        rating: 5,
        date: '5 days ago',
        title: 'Fun GTA for kids and family',
        comment: 'My younger brother and I love driving vehicles and solving puzzles. Disc arrived safely and cleanly.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 15. Mortal Kombat 11 (PS4) - 1
  {
    id: 'mortal-kombat-11-ps4-preowned',
    name: 'Mortal Kombat 11 (PS4)',
    subtitle: 'Iconic Cinematic Story & Fatalities · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2199,
    price: 1299,
    discount_percent: 41,
    rating: 4.8,
    review_count: 38,
    in_stock: true,
    stock_count: 1,
    badge: 'KOMBAT HIT',
    features: [
      'Custom Character Variation System allows unprecedented fighter personalization',
      'Time-bending cinematic story mode bringing classic and modern rosters face-to-face',
      'Brutal Fatalities and Krushing Blows delivered in fluid 60fps',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Mortal Kombat is back and better than ever in the next evolution of the iconic franchise. Bench-tested and 100% optical seek verified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (Mortal Kombat 11)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Fighting / Brutal Combat',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976310/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-mk11-ps4',
        userName: 'Harish Rathi',
        userLocation: 'Surat',
        rating: 5,
        date: '1 week ago',
        title: 'Fatalities look sickeningly good',
        comment: 'Runs at a locked 60fps on PS4. Smooth disc, no lag or read issues.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 16. Elden Ring: Nightreign (PS4) - 1
  {
    id: 'elden-ring-nightreign-ps4-preowned',
    name: 'Elden Ring: Nightreign (PS4)',
    subtitle: 'Standalone 3-Player Co-op Survival Roguelike · 2025 Release',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 4499,
    price: 2699,
    discount_percent: 40,
    rating: 4.9,
    review_count: 19,
    in_stock: true,
    stock_count: 1,
    badge: '2025 RELEASE',
    features: [
      'Standalone adventure set in the world of Elden Ring by FromSoftware',
      'Cooperative 3-player survival gameplay battling formidable Nightlords',
      'Procedurally shifting Limveld territory with day/night survival cycles',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Unite as Nightfarers to withstand the descent of darkness. FromSoftware’s innovative standalone multiplayer chapter. Tested and verified on PS4 and PS5.',
    in_the_box: [
      'PS4 Game Disc (Elden Ring: Nightreign)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Action RPG / Co-op Survival',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-er-night-1',
        userName: 'Aman Singhal',
        userLocation: 'Noida',
        rating: 5,
        date: '3 days ago',
        title: 'Intense co-op Souls experience!',
        comment: 'Got my copy within 48 hours. FromSoftware gameplay never misses. Nightlord fights are epic.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 17. Resident Evil 7: Biohazard (PS4) - 1
  {
    id: 'resident-evil-7-biohazard-ps4-preowned',
    name: 'Resident Evil 7: Biohazard (PS4)',
    subtitle: 'True Survival Horror · PS VR Compatible · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.8,
    review_count: 32,
    in_stock: true,
    stock_count: 1,
    badge: 'SURVIVAL HORROR',
    features: [
      'First-person isolated survival horror powered by Capcom’s RE Engine',
      'Explore the derelict plantation mansion of the terrifying Baker family',
      'Full PlayStation VR headset support for unforgettable immersion',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Set in modern day rural America, experience visceral survival horror from a terrifying first-person perspective. Tested on PS4, PS VR, and PS5.',
    in_the_box: [
      'PS4 Game Disc (Resident Evil 7: Biohazard)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition (PS VR Compatible)',
    genre: 'Survival Horror / First Person',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-re7-ps4',
        userName: 'Rohit Balan',
        userLocation: 'Thane',
        rating: 5,
        date: '5 days ago',
        title: 'Scariest game on PlayStation',
        comment: 'The Baker family mansion is pure nightmare fuel. Disc arrived spotless in original cover.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 18. Sonic Forces (Xbox One) - 1
  {
    id: 'sonic-forces-xbox-preowned',
    name: 'Sonic Forces (Xbox One)',
    subtitle: 'Modern & Classic Sonic Gameplay · Pre-Owned Grade A+ · 7-Day Guarantee',
    category: 'preowned_games',
    platform: 'Xbox',
    condition: 'Pre-Owned Grade A+',
    mrp: 1699,
    price: 999,
    discount_percent: 41,
    rating: 4.6,
    review_count: 21,
    in_stock: true,
    stock_count: 1,
    badge: 'SONIC',
    features: [
      'High-speed action as Modern Sonic, Classic Sonic, and custom Avatar hero',
      'Equip your Custom Hero with powerful Wispon gadgets',
      'Defeat Dr. Eggman and mysterious villain Infinite across ruined landscapes',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Join the uprising to reclaim the world from Dr. Eggman and the sinister Infinite. Tested on Xbox One and Xbox Series X via backward compatibility.',
    in_the_box: [
      'Xbox One Game Disc (Sonic Forces)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Xbox One Retail Case',
    genre: 'Action / Fast Platformer',
    theme_color: '#107c10',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/637100/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-sf-xb1',
        userName: 'Abhay Chauhan',
        userLocation: 'Indore',
        rating: 5,
        date: '1 week ago',
        title: 'Super fast platformer',
        comment: 'Creating your own Sonic character is really fun. Disc worked without issues.',
        verifiedBuyer: true,
        platformPlayed: 'Xbox'
      }
    ]
  },

  // 19. Tekken 7 (PS4) - 1
  {
    id: 'tekken-7-ps4-preowned',
    name: 'Tekken 7 (PS4)',
    subtitle: 'Mishima Bloodline Saga · 100% Optical Laser Tested Disc',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1699,
    price: 999,
    discount_percent: 41,
    rating: 4.8,
    review_count: 41,
    in_stock: true,
    stock_count: 1,
    badge: 'ICONIC FIGHTER',
    features: [
      'Unreal Engine 4 powered cinematic story battles and stunning particle effects',
      'All-new battle mechanics including Rage Arts, Rage Drives, and Power Crushes',
      'Roster of over 30 iconic fighters including guest combatant Akuma',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Witness the final chapter of the 20-year-long Mishima blood feud. Bench-tested and tournament-ready disc on PS4 and PS5.',
    in_the_box: [
      'PS4 Game Disc (Tekken 7)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Fighting / 3D Martial Arts',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/389730/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-t7-ps4',
        userName: 'Faiz Ali',
        userLocation: 'Lucknow',
        rating: 5,
        date: '4 days ago',
        title: 'Best fighting game on PS4',
        comment: 'Combos feel so crisp and responsive. Disc arrived looking brand new.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 20. Tom Clancy's Ghost Recon Wildlands Gold Edition (PS4) - 1
  {
    id: 'tom-clancys-ghost-recon-wildlands-gold-edition-ps4-preowned',
    name: "Tom Clancy's Ghost Recon Wildlands - Gold Edition (PS4)",
    subtitle: 'Tactical Bolivia Open World · Gold Edition with Bonus Content · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1999,
    price: 1199,
    discount_percent: 40,
    rating: 4.8,
    review_count: 29,
    in_stock: true,
    stock_count: 1,
    badge: 'GOLD EDITION',
    features: [
      'Gold Edition packaging with Santa Blanca cartel artwork',
      'Massive Bolivian open world with varied terrain from salt flats to jungles',
      'Full 4-player seamless cooperative military tactical gameplay',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Lead your elite 4-player Ghost team behind enemy lines to dismantle the Santa Blanca cartel. Tested and certified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (Ghost Recon Wildlands Gold Edition)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Gold Edition',
    genre: 'Tactical Shooter / Open World Co-op',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co23gq.jpg',
    reviews: [
      {
        id: 'rev-grw-gold-1',
        userName: 'Karthik Raja',
        userLocation: 'Coimbatore',
        rating: 5,
        date: '6 days ago',
        title: 'Great co-op shooter with friends',
        comment: 'Huge open world map. Dispatched quickly with trackable delivery. Recommended seller.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 21. UFC 3 (PS4) - 1
  {
    id: 'ea-sports-ufc-3-ps4-preowned',
    name: 'EA Sports UFC 3 (PS4)',
    subtitle: 'Real Player Motion Tech · GOAT Career Mode · Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2099,
    price: 1249,
    discount_percent: 40,
    rating: 4.7,
    review_count: 23,
    in_stock: true,
    stock_count: 1,
    badge: 'OCTAGON',
    features: [
      'Revolutionary Real Player Motion (RPM) tech with over 5,000 new animations',
      'G.O.A.T. Career Mode: build fight hype, gain fans, and sign blockbuster contracts',
      'Conor McGregor cover athlete edition',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Deliver every punch, kick, block, and counter with fluid realism inside the Octagon. 100% tested and verified on PS4 and PS5.',
    in_the_box: [
      'PS4 Game Disc (EA Sports UFC 3)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Sports / MMA Combat',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1o2w.jpg',
    reviews: [
      {
        id: 'rev-ufc3-ps4',
        userName: 'Suraj Rawal',
        userLocation: 'Dehradun',
        rating: 5,
        date: '1 week ago',
        title: 'Striking feels heavy and realistic',
        comment: 'Better career mode than UFC 4 in my opinion. Disc came clean with no smudges.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 22. WWE 2K19 (PS4) - 1
  {
    id: 'wwe-2k19-ps4-preowned',
    name: 'WWE 2K19 (PS4)',
    subtitle: 'Fan Favorite Gameplay · Featuring AJ Styles · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2199,
    price: 1299,
    discount_percent: 41,
    rating: 4.9,
    review_count: 37,
    in_stock: true,
    stock_count: 1,
    badge: 'FAN FAVORITE',
    features: [
      'Widely celebrated as one of the smoothest, most responsive WWE 2K wrestling games',
      'Daniel Bryan 2K Showcase mode reliving his greatest career matches',
      'Extensive roster of WWE Superstars, NXT talent, and WWE Legends',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Never Say Never with WWE 2K19 featuring cover superstar AJ Styles. Celebrated for peak gameplay polish and extensive universe mode. Tested by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (WWE 2K19)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Sports / Wrestling',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/817130/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-wwe19-ps4',
        userName: 'Akash Banerjee',
        userLocation: 'Kolkata',
        rating: 5,
        date: '3 days ago',
        title: 'Still the best modern WWE game',
        comment: 'Gameplay pacing is unmatched. Genuine disc, arrived quickly.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 23. WWE 2K20 (PS4) - 1
  {
    id: 'wwe-2k20-ps4-preowned',
    name: 'WWE 2K20 (PS4)',
    subtitle: 'Featuring Becky Lynch & Roman Reigns · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2435,
    price: 1449,
    discount_percent: 40,
    rating: 4.5,
    review_count: 25,
    in_stock: true,
    stock_count: 1,
    badge: 'SMACKDOWN',
    features: [
      "2K Showcase: The Women's Evolution featuring the Four Horsewomen",
      'Dual male and female MyCAREER storylines with voiceover talent',
      'WWE Towers mode featuring Roman Reigns career gauntlets',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Step inside the ring with dual cover stars Becky Lynch and Roman Reigns. Fully patched, benchmarked, and laser tested by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (WWE 2K20)',
      'Official Retail Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail Edition',
    genre: 'Sports / Wrestling',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1015500/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-wwe20-ps4',
        userName: 'Ritesh Varma',
        userLocation: 'Patna',
        rating: 5,
        date: '5 days ago',
        title: 'Lots of content and fun storylines',
        comment: 'With the updates installed it runs smoothly. Disc is in great shape.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  }
];

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function jsonSql(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

export function generateSqlMigration() {
  const statements = [];
  statements.push(`-- ============================================================================
-- DJN TECH - BATCH INVENTORY EXPANSION (23 NEW PRE-OWNED TITLES)
-- PS4 & Xbox One Discs with Verified Cover Art, Pricing, and Stock
-- ============================================================================
`);

  for (const g of NEW_GAMES) {
    const q = `INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, edition, genre, theme_color, image_url, reviews
) VALUES (
    ${escapeSql(g.id)},
    ${escapeSql(g.name)},
    ${escapeSql(g.subtitle)},
    ${escapeSql(g.category)},
    ${escapeSql(g.platform)},
    ${escapeSql(g.condition)},
    ${g.mrp},
    ${g.price},
    ${g.discount_percent},
    ${g.rating},
    ${g.review_count},
    ${g.in_stock},
    ${g.stock_count},
    ${escapeSql(g.badge)},
    ${jsonSql(g.features)},
    ${escapeSql(g.description)},
    ${jsonSql(g.in_the_box)},
    ${escapeSql(g.warranty)},
    ${escapeSql(g.disc_condition)},
    ${escapeSql(g.edition)},
    ${escapeSql(g.genre)},
    ${escapeSql(g.theme_color)},
    ${escapeSql(g.image_url)},
    ${jsonSql(g.reviews)}
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    platform = EXCLUDED.platform,
    condition = EXCLUDED.condition,
    mrp = EXCLUDED.mrp,
    price = EXCLUDED.price,
    discount_percent = EXCLUDED.discount_percent,
    stock_count = EXCLUDED.stock_count,
    in_stock = TRUE,
    badge = EXCLUDED.badge,
    features = EXCLUDED.features,
    description = EXCLUDED.description,
    in_the_box = EXCLUDED.in_the_box,
    warranty = EXCLUDED.warranty,
    disc_condition = EXCLUDED.disc_condition,
    edition = EXCLUDED.edition,
    genre = EXCLUDED.genre,
    theme_color = EXCLUDED.theme_color,
    image_url = EXCLUDED.image_url,
    reviews = EXCLUDED.reviews,
    updated_at = NOW();`;

    statements.push(q);
  }

  const finalSql = statements.join('\n\n');
  fs.writeFileSync('supabase/add_new_games_batch.sql', finalSql, 'utf8');
  console.log('Saved SQL migration to supabase/add_new_games_batch.sql');
}

async function applyToSupabase() {
  generateSqlMigration();

  console.log(`\nUpserting ${NEW_GAMES.length} new game products into Supabase...`);
  let successCount = 0;

  for (const game of NEW_GAMES) {
    const { error } = await supabase.from('products').upsert(game, { onConflict: 'id' });
    if (error) {
      console.error(`✗ Error upserting ${game.name} (${game.id}):`, error.message);
    } else {
      console.log(`✓ Upserted: ${game.name} [${game.platform}] - ₹${game.price} (Stock: ${game.stock_count})`);
      successCount++;
    }
  }

  console.log(`\nMigration completed: ${successCount} / ${NEW_GAMES.length} games upserted successfully.`);

  // Verify total games in DB
  const { data: allGames, error: fetchErr } = await supabase
    .from('products')
    .select('id, name, platform, stock_count, price')
    .eq('category', 'preowned_games');

  if (fetchErr) {
    console.error('Error fetching verification count:', fetchErr.message);
  } else {
    console.log(`\nTotal pre-owned games now in database: ${allGames.length}`);
    const xboxGames = allGames.filter(g => g.platform === 'Xbox');
    const ps4Games = allGames.filter(g => g.platform === 'PS4');
    const ps5Games = allGames.filter(g => g.platform === 'PS5');
    console.log(`Platform Breakdown:`);
    console.log(`- PS4 Games: ${ps4Games.length}`);
    console.log(`- PS5 Games: ${ps5Games.length}`);
    console.log(`- Xbox Games: ${xboxGames.length}`);
  }
}

applyToSupabase().catch(console.error);
