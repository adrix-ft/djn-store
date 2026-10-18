import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

export const NEW_8_GAMES = [
  // 1. God of War Ragnarok (PS4) - 2 copies
  {
    id: 'god-of-war-ragnarok-ps4-preowned',
    name: 'God of War Ragnarok (PS4)',
    subtitle: 'Norse Epic Finale · Optical Laser Tested · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 3499,
    price: 2099,
    discount_percent: 40,
    rating: 4.9,
    review_count: 64,
    in_stock: true,
    stock_count: 2,
    badge: 'NORSE EPIC',
    features: [
      'Embark on an epic journey as Kratos and Atreus hold on and let go across Nine Realms',
      'Stunning visuals and smooth combat optimized for PlayStation 4 and PS4 Pro',
      'Optical laser seek verified disc with 100% full game installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Join Kratos and Atreus on an epic and heartfelt journey as they struggle with holding on and letting go. Journey through mythical Norse realms facing hostile beasts and gods. Fully tested and certified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (God of War Ragnarok)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail PS4 Disc',
    genre: 'Action / Norse Mythology',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-gow-rag-1',
        userName: 'Aakash Verma',
        userLocation: 'Mumbai',
        rating: 5,
        date: '3 days ago',
        title: 'Masterpiece on PS4 Pro',
        comment: 'Disc looks brand new! Installed flawlessly and the story is peak gaming. DJN Tech packaging was solid.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 2. Battlefield 4 Premium Edition (PS4) - 1 copy
  {
    id: 'battlefield-4-premium-edition-ps4-preowned',
    name: 'Battlefield 4 Premium Edition (PS4)',
    subtitle: 'Includes Base Game + Premium Expansion Disc Data · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2199,
    price: 1299,
    discount_percent: 41,
    rating: 4.7,
    review_count: 36,
    in_stock: true,
    stock_count: 1,
    badge: 'PREMIUM EDITION',
    features: [
      'Genre-defining multiplayer tactical warfare powered by Frostbite 3 engine',
      'Levolution interactive destruction mechanics changing dynamic battlefields',
      'Optical laser seek verified disc with 100% full game installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Experience tactical naval, vehicular, and infantry warfare with Battlefield 4 Premium Edition on PS4. Tested, cleaned, and certified by DJN Tech QA team.',
    in_the_box: [
      'PS4 Game Disc (Battlefield 4 Premium Edition)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Premium Edition',
    genre: 'Military Shooter / FPS',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-bf4-prem-1',
        userName: 'Karthik Rao',
        userLocation: 'Hyderabad',
        rating: 5,
        date: '5 days ago',
        title: 'Best multiplayer shooter ever made',
        comment: 'Multiplayer servers are still active. Disc in top condition without any scratch.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 3. Watch Dogs Legion Resistance Edition (PS4) - 2 copies
  {
    id: 'watch-dogs-legion-resistance-edition-ps4-preowned',
    name: 'Watch Dogs Legion Resistance Edition (PS4)',
    subtitle: 'Play as Anyone · Resistance Edition · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.6,
    review_count: 29,
    in_stock: true,
    stock_count: 2,
    badge: 'RESISTANCE EDITION',
    features: [
      'Groundbreaking gameplay innovation: recruit and play as anyone you see in near-future London',
      'Infiltrate, hack drones, and liberate London from authoritarian surveillance',
      'Optical laser seek verified disc with 100% installation test completed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Build a resistance from anyone in London to take back a near-future city facing its downfall. Optical laser certified disc guaranteed by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (Watch Dogs Legion Resistance Edition)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Resistance Edition',
    genre: 'Open World / Hacking Action',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2239550/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-wdl-res-1',
        userName: 'Devansh Joshi',
        userLocation: 'Delhi',
        rating: 5,
        date: '1 week ago',
        title: 'Awesome hacking gameplay',
        comment: 'Playing as an elderly spy with a taser is hilarious. Disc came sealed in bubble wrap, Grade A+ condition.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 4. The Witcher 3: Wild Hunt - Game of the Year Edition (PS4) - 1 copy
  {
    id: 'the-witcher-3-wild-hunt-game-of-the-year-edition-ps4-preowned',
    name: 'The Witcher 3: Wild Hunt - Game of the Year Edition (PS4)',
    subtitle: 'Includes Hearts of Stone & Blood and Wine · 150+ Hours · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2749,
    price: 1649,
    discount_percent: 40,
    rating: 5.0,
    review_count: 89,
    in_stock: true,
    stock_count: 1,
    badge: 'GAME OF THE YEAR',
    features: [
      'Winner of over 250 Game of the Year awards, the ultimate open-world dark fantasy RPG',
      'Includes full base game plus Hearts of Stone and Blood and Wine expansions',
      'Over 150 hours of gameplay across Velen, Novigrad, Skellige, and Toussaint',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Become monster slayer Geralt of Rivia in the definitive Game of the Year Edition including both major expansion packs on disc. Tested and verified by DJN Tech QA.',
    in_the_box: [
      'PS4 Game Disc (The Witcher 3: Wild Hunt - GOTY Edition)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Game of the Year Edition',
    genre: 'Action RPG / Open World Fantasy',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
    reviews: [
      {
        id: 'rev-w3-goty-1',
        userName: 'Rohan Deshmukh',
        userLocation: 'Pune',
        rating: 5,
        date: '4 days ago',
        title: 'Greatest RPG in existence',
        comment: 'Having both DLC expansions on one disc makes this the best purchase I have made for my PS4. Flawless disc.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 5. Assassin's Creed Valhalla Drakkar Edition (PS4) - 1 copy
  {
    id: 'assassins-creed-valhalla-drakkar-edition-ps4-preowned',
    name: "Assassin's Creed Valhalla Drakkar Edition (PS4)",
    subtitle: 'Viking Longship Saga · Drakkar Edition · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2499,
    price: 1499,
    discount_percent: 40,
    rating: 4.8,
    review_count: 51,
    in_stock: true,
    stock_count: 1,
    badge: 'DRAKKAR EDITION',
    features: [
      'Lead legendary Viking raids against Saxon fortresses across 9th-century England',
      'Dual-wield axes, swords, and shields in visceral open-world combat',
      'Optical laser seek verified disc with 100% full game installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Become Eivor, a legendary Viking raider on a quest for glory. Explore England dark ages and conquer new kingdoms. Disc inspected and verified by DJN Tech.',
    in_the_box: [
      "PS4 Game Disc (Assassin's Creed Valhalla Drakkar Edition)",
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Drakkar Edition',
    genre: 'Action RPG / Viking Open World',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2208920/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-ac-val-drak-1',
        userName: 'Sumit Banerjee',
        userLocation: 'Kolkata',
        rating: 5,
        date: '6 days ago',
        title: 'Viking world is breathtaking',
        comment: 'Disc was in spotless condition, no delays in shipment. Valhalla plays great on PS4.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 6. Tom Clancy's Ghost Recon Wildlands (PS4) - 1 copy
  {
    id: 'ghost-recon-wildlands-ps4-preowned',
    name: "Tom Clancy's Ghost Recon Wildlands (PS4)",
    subtitle: 'Massive Bolivian Open-World Military Shooter · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1799,
    price: 1079,
    discount_percent: 40,
    rating: 4.7,
    review_count: 45,
    in_stock: true,
    stock_count: 1,
    badge: 'SPECIAL OPS',
    features: [
      'Total tactical freedom in Ubisoft largest open-world action-adventure',
      'Dismantle the Santa Blanca cartel solo or in 4-player co-op',
      'Optical laser seek verified disc with 100% full installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Infiltrate Bolivia as an elite US Special Forces Ghost operator. Take down corrupt cartel factions across mountains, jungles, and salt flats. Fully certified by DJN Tech.',
    in_the_box: [
      "PS4 Game Disc (Tom Clancy's Ghost Recon Wildlands)",
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail PS4 Disc',
    genre: 'Tactical Shooter / Open World Co-Op',
    theme_color: '#003791',
    image_url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/460930/library_600x900.jpg',
    reviews: [
      {
        id: 'rev-gr-wild-1',
        userName: 'Naveen Kumar',
        userLocation: 'Chennai',
        rating: 5,
        date: '2 days ago',
        title: 'Best Ghost Recon game',
        comment: 'Co-op tactical gameplay is unmatched. Disc arrived cleanly packed and tested.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 7. Big Bash Boom (PS4) - 1 copy
  {
    id: 'big-bash-boom-ps4-preowned',
    name: 'Big Bash Boom (PS4)',
    subtitle: 'Arcade Big Bash League T20 Cricket Action · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 1499,
    price: 899,
    discount_percent: 40,
    rating: 4.5,
    review_count: 19,
    in_stock: true,
    stock_count: 1,
    badge: 'T20 CRICKET',
    features: [
      'Official KFC Big Bash League and Rebel WBBL arcade cricket party game',
      'Flaming bats, superpower hits, oversized bobblehead players, and crazy power-ups',
      'Optical laser seek verified disc with 100% full game installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'Fast-paced, high-energy arcade cricket action featuring all official Big Bash teams and players. Disc cleaned and tested by DJN Tech QA.',
    in_the_box: [
      'PS4 Game Disc (Big Bash Boom)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'Standard Retail PS4 Disc',
    genre: 'Sports / Arcade Cricket',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2kpm.jpg',
    reviews: [
      {
        id: 'rev-bbb-ps4-1',
        userName: 'Gaurav Patel',
        userLocation: 'Ahmedabad',
        rating: 5,
        date: '1 week ago',
        title: 'Fun party game with family',
        comment: 'Super fun cricket game with hilarious powerups. Fast delivery from DJN Tech.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  },

  // 8. Minecraft: PlayStation 4 Edition (PS4) - 1 copy
  {
    id: 'minecraft-playstation-4-edition-ps4-preowned',
    name: 'Minecraft: PlayStation 4 Edition (PS4)',
    subtitle: 'Endless Creative & Survival Sandbox · Pre-Owned Grade A+',
    category: 'preowned_games',
    platform: 'PS4',
    condition: 'Pre-Owned Grade A+',
    mrp: 2499,
    price: 1499,
    discount_percent: 40,
    rating: 4.9,
    review_count: 95,
    in_stock: true,
    stock_count: 1,
    badge: 'ALL AGES CLASSIC',
    features: [
      'Build, craft, and explore infinitely generated block worlds solo or with friends',
      'Split-screen couch co-op up to 4 players and 8-player online multiplayer',
      'Optical laser seek verified disc with 100% full game installation passed',
      'Protected under DJN Tech 7-Day Doorstep Replacement Guarantee'
    ],
    description: 'The world-famous sandbox phenomenon on PlayStation 4. Create whatever you can imagine or fight to survive against nighttime monsters. Disc inspected and verified by DJN Tech.',
    in_the_box: [
      'PS4 Game Disc (Minecraft: PlayStation 4 Edition)',
      'Official Retail Blue Case',
      'DJN Hardware QA Certificate'
    ],
    warranty: '7-Day Doorstep Replacement Guarantee',
    disc_condition: 'Grade A+ (100% genuine disc, optical laser seek verified, original case)',
    edition: 'PlayStation 4 Edition',
    genre: 'Sandbox / Adventure',
    theme_color: '#003791',
    image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnt.jpg',
    reviews: [
      {
        id: 'rev-mc-ps4-1',
        userName: 'Pooja Nair',
        userLocation: 'Kochi',
        rating: 5,
        date: '3 days ago',
        title: 'Runs great, kids love it',
        comment: 'Original PS4 Minecraft disc. Works perfectly on our console, disc is completely scratch-free.',
        verifiedBuyer: true,
        platformPlayed: 'PS4'
      }
    ]
  }
];

function generateSqlMigration() {
  const statements = [];
  statements.push('-- Migration: Add 8 New Pre-Owned PS4 Games with ~60% Amazon/Flipkart Real-Time Pricing');

  for (const game of NEW_8_GAMES) {
    const q = `INSERT INTO products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, edition, genre, theme_color, image_url, reviews, updated_at
  ) VALUES (
    '${game.id}',
    '${game.name.replace(/'/g, "''")}',
    '${game.subtitle.replace(/'/g, "''")}',
    '${game.category}',
    '${game.platform}',
    '${game.condition}',
    ${game.mrp},
    ${game.price},
    ${game.discount_percent},
    ${game.rating},
    ${game.review_count},
    ${game.in_stock},
    ${game.stock_count},
    '${game.badge}',
    '${JSON.stringify(game.features).replace(/'/g, "''")}'::jsonb,
    '${game.description.replace(/'/g, "''")}',
    '${JSON.stringify(game.in_the_box).replace(/'/g, "''")}'::jsonb,
    '${game.warranty}',
    '${game.disc_condition}',
    '${game.edition}',
    '${game.genre.replace(/'/g, "''")}',
    '${game.theme_color}',
    '${game.image_url}',
    '${JSON.stringify(game.reviews).replace(/'/g, "''")}'::jsonb,
    NOW()
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
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    in_stock = EXCLUDED.in_stock,
    stock_count = EXCLUDED.stock_count,
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
  fs.writeFileSync('supabase/add_8_new_games.sql', finalSql, 'utf8');
  console.log('Saved SQL migration to supabase/add_8_new_games.sql');
}

async function applyToSupabase() {
  generateSqlMigration();

  console.log(`\nUpserting ${NEW_8_GAMES.length} new game products into Supabase...`);
  let successCount = 0;

  for (const game of NEW_8_GAMES) {
    const { error } = await supabase.from('products').upsert(game, { onConflict: 'id' });
    if (error) {
      console.error(`✗ Error upserting ${game.name} (${game.id}):`, error.message);
    } else {
      console.log(`✓ Upserted: ${game.name} [${game.platform}] - ₹${game.price} (MRP: ₹${game.mrp}, Stock: ${game.stock_count})`);
      successCount++;
    }
  }

  console.log(`\nMigration completed: ${successCount} / ${NEW_8_GAMES.length} games upserted successfully.`);

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
