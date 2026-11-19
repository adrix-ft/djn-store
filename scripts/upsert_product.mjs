import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// 1. Resolve Supabase credentials from environment or .env.local
let SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
let SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_KEY && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const [k, ...vParts] = line.split('=');
    const val = vParts.join('=').trim();
    if (k?.trim() === 'SUPABASE_SECRET_KEY' && val) {
      SUPABASE_KEY = val;
      break;
    }
    if ((k?.trim() === 'VITE_SUPABASE_ANON_KEY' || k?.trim() === 'SUPABASE_PUBLISHABLE_KEY') && val && !SUPABASE_KEY) {
      SUPABASE_KEY = val;
    }
  }
}

if (!SUPABASE_KEY) {
  console.error('Error: Could not find SUPABASE_SECRET_KEY or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Parse input arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
============================================================
  DJN TECH PRODUCT UPSERT TOOL
============================================================

Usage:
  1. From JSON file:
     node scripts/upsert_product.mjs ./product.json

  2. From JSON string:
     node scripts/upsert_product.mjs '{"id":"fifa-20-card","name":"FIFA 20 (Only Game Card)","price":1200,"category":"nintendo_games","platform":"Nintendo Switch","condition":"Pre-Owned Grade A+"}'

  3. From CLI Flags:
     node scripts/upsert_product.mjs --name "Minecraft Pre-Owned" --price 1700 --category "nintendo_games" --platform "Nintendo Switch" --condition "Pre-Owned Grade A+" --badge "ONLY GAME CARD"

Options:
  --id              Unique slug or id (auto-generated if omitted)
  --name            Full product title (Required)
  --price           Store selling price in INR (Required)
  --mrp             Original MRP (defaults to price * 1.35)
  --category        Category (consoles | preowned_games | nintendo_games | controllers | accessories)
  --platform        Platform (PS5 | PS4 | Xbox | Nintendo Switch | Switch | Universal)
  --condition       Condition (Pre-Owned Grade A+ | Brand New Sealed)
  --badge           Card badge (e.g. ONLY GAME CARD | WITH BOX | NEW ARRIVAL | POPULAR)
  --image           Image URL (Cover art / product photo)
  --storage         Storage capacity (e.g. 1TB HDD, 500GB HDD, 825GB SSD)
  --warranty        Warranty string (defaults to 1 Month Shop Warranty)
  --sync-local      Also automatically add/update in src/data/products.ts
`);
  process.exit(0);
}

let productInput = null;

// Check if first arg is a JSON file
if (fs.existsSync(args[0])) {
  try {
    productInput = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
  } catch (err) {
    console.error('Failed to parse JSON file:', err.message);
    process.exit(1);
  }
} else if (args[0].startsWith('{')) {
  try {
    productInput = JSON.parse(args.join(' '));
  } catch (err) {
    console.error('Failed to parse inline JSON string:', err.message);
    process.exit(1);
  }
} else {
  // Parse CLI flags
  productInput = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    const val = args[i + 1];
    if (key === '--id') { productInput.id = val; i++; }
    else if (key === '--name') { productInput.name = val; i++; }
    else if (key === '--price') { productInput.price = Number(val); i++; }
    else if (key === '--mrp') { productInput.mrp = Number(val); i++; }
    else if (key === '--category') { productInput.category = val; i++; }
    else if (key === '--platform') { productInput.platform = val; i++; }
    else if (key === '--condition') { productInput.condition = val; i++; }
    else if (key === '--badge') { productInput.badge = val; i++; }
    else if (key === '--image') { productInput.image_url = val; productInput.imageUrl = val; i++; }
    else if (key === '--storage') { productInput.storage = val; i++; }
    else if (key === '--warranty') { productInput.warranty = val; i++; }
    else if (key === '--sync-local') { productInput.syncLocal = true; }
  }
}

if (!productInput || !productInput.name || productInput.price === undefined) {
  console.error('Error: "name" and "price" are required to upsert a product.');
  process.exit(1);
}

// Format and sanitize product data
const id = productInput.id || `product-${Date.now()}`;
const price = Number(productInput.price) || 0;
const mrp = Number(productInput.mrp) || Math.round(price * 1.35);
const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

// Smart default detection for games vs hardware
const isGame = productInput.category === 'preowned_games' || productInput.category === 'nintendo_games' || /game|fifa|mario|kart|tennis|pokemon|zelda|minecraft/i.test(productInput.name);
const isNintendo = /nintendo|switch/i.test(productInput.platform || '') || /nintendo/i.test(productInput.category || '') || /mario|zelda|pokemon/i.test(productInput.name);
const isOnlyGameCard = /only game\s*card/i.test(productInput.name) || /only game\s*card/i.test(productInput.badge || '');

let defaultCategory = productInput.category || (isNintendo ? 'nintendo_games' : (isGame ? 'preowned_games' : 'consoles'));
let defaultPlatform = productInput.platform || (isNintendo ? 'Nintendo Switch' : 'PS4');
if (defaultPlatform === 'Nintendo') defaultPlatform = 'Nintendo Switch';

let defaultBadge = productInput.badge;
if (!defaultBadge) {
  if (isOnlyGameCard) defaultBadge = 'ONLY GAME CARD';
  else if (isGame) defaultBadge = 'WITH BOX';
  else defaultBadge = 'PRE-OWNED';
}

const defaultFeatures = productInput.features || [
  isOnlyGameCard ? 'Original authentic game cartridge (Only game card, box not included)' : 'Includes original game cartridge / disc and case',
  '100% verified working and tested with console read test',
  'Protected by DJN Tech Store replacement guarantee'
];

const defaultInTheBox = productInput.in_the_box || productInput.inTheBox || [
  isOnlyGameCard ? '1x Authentic Game Cartridge (Only Game Card)' : '1x Game Disc/Cartridge + Original Case Box'
];

const defaultWarranty = productInput.warranty || 'DJN Tech Store Testing Guarantee';

const dbRow = {
  id: id,
  name: productInput.name,
  subtitle: productInput.subtitle || (isOnlyGameCard ? 'Authentic Game Cartridge (Only Game Card, No Box)' : 'Tested & Certified · Original Case Included'),
  category: defaultCategory,
  platform: defaultPlatform === 'Nintendo' ? 'Switch' : defaultPlatform,
  condition: productInput.condition || 'Pre-Owned Grade A+',
  mrp: mrp,
  price: price,
  discount_percent: discountPercent,
  rating: productInput.rating || 4.8,
  review_count: productInput.review_count || productInput.reviewCount || 12,
  in_stock: productInput.in_stock !== undefined ? Boolean(productInput.in_stock) : (productInput.inStock !== undefined ? Boolean(productInput.inStock) : true),
  stock_count: productInput.stock_count !== undefined ? Number(productInput.stock_count) : (productInput.stockCount !== undefined ? Number(productInput.stockCount) : 999),
  badge: defaultBadge,
  features: defaultFeatures,
  description: productInput.description || `${productInput.name}. Certified authentic, inspected and verified for flawless gameplay by DJN Tech.`,
  in_the_box: defaultInTheBox,
  warranty: defaultWarranty,
  storage: productInput.storage || null,
  color: productInput.color || null,
  edition: productInput.edition || null,
  image_url: productInput.image_url || productInput.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  updated_at: new Date().toISOString()
};

async function execute() {
  console.log(`\n============================================================`);
  console.log(`  UPSERTING PRODUCT TO SUPABASE`);
  console.log(`============================================================`);
  console.log(`ID:         ${dbRow.id}`);
  console.log(`Name:       ${dbRow.name}`);
  console.log(`Category:   ${dbRow.category} | Platform: ${dbRow.platform}`);
  console.log(`Condition:  ${dbRow.condition}`);
  console.log(`Price:      ₹${dbRow.price.toLocaleString('en-IN')} (MRP: ₹${dbRow.mrp.toLocaleString('en-IN')}, ${dbRow.discount_percent}% OFF)`);
  console.log(`Badge:      ${dbRow.badge}`);
  console.log(`Image:      ${dbRow.image_url}`);
  console.log(`------------------------------------------------------------\n`);

  const { data, error } = await supabase
    .from('products')
    .upsert(dbRow, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('✗ Upsert failed in Supabase:', error.message);
    process.exit(1);
  }

  console.log('✓ Successfully upserted into Supabase "products" table!');
  console.log(`Row in DB:`, data ? data[0] : 'OK');
}

execute().catch(console.error);
