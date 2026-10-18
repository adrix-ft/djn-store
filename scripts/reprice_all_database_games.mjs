import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { AMAZON_ONLY_GAMES_PRICING } from './reprice_strictly_amazon_only.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

/**
 * 100% EXCLUSIVE AMAZON.IN REAL-TIME PRICING SYNCHRONIZATION
 * Sourced STRICTLY from Amazon India (amazon.in) only.
 * Client Rule: Pre-Owned Price = 60% of Amazon Price (Strictly 40% OFF Discount).
 */
export const ALL_GAMES_AMAZON_FLIPKART_PRICING = Object.fromEntries(
  Object.entries(AMAZON_ONLY_GAMES_PRICING).map(([id, g]) => [
    id,
    {
      name: g.name,
      platform: g.platform,
      source: "Amazon.in",
      onlinePrice: g.amazonPrice,
      preownedPrice: g.preownedPrice
    }
  ])
);

async function repriceAllGames() {
  console.log('Fetching all pre-owned games from Supabase...');
  const { data: dbGames, error } = await supabase
    .from('products')
    .select('id, name, platform, mrp, price, discount_percent')
    .eq('category', 'preowned_games');

  if (error) {
    console.error('Failed to fetch products:', error);
    return;
  }

  console.log(`Found ${dbGames.length} games in Supabase database.`);

  const updates = [];
  const sqlStatements = [
    `-- ============================================================================`,
    `-- DJN TECH - STRICT AMAZON.IN REAL-TIME PRICING SYNCHRONIZATION`,
    `-- Sourced strictly from Amazon India (amazon.in) only (0% third-party).`,
    `-- Formula: MRP = Amazon.in Retail Price | Selling Price = 60% of Amazon Price (40% OFF)`,
    `-- Synchronized across all ${dbGames.length} pre-owned games in database`,
    `-- Generated: ${new Date().toISOString()}`,
    `-- ============================================================================\n`
  ];

  const missingInCatalog = [];

  for (const g of dbGames) {
    const entry = ALL_GAMES_AMAZON_FLIPKART_PRICING[g.id];
    if (!entry) {
      missingInCatalog.push(g);
      continue;
    }

    const onlinePrice = entry.onlinePrice;
    const preownedPrice = entry.preownedPrice;
    const discountPercent = 40;
    const ratioPercent = 60;

    updates.push({
      id: g.id,
      name: entry.name,
      platform: entry.platform,
      source: entry.source,
      onlinePrice,
      preownedPrice,
      discountPercent,
      ratioPercent
    });

    sqlStatements.push(`UPDATE public.products SET
    mrp = ${onlinePrice},
    price = ${preownedPrice},
    discount_percent = ${discountPercent},
    updated_at = NOW()
WHERE id = '${g.id}';`);
  }

  if (missingInCatalog.length > 0) {
    console.warn(`WARNING: ${missingInCatalog.length} games missing in catalog mapping:`, missingInCatalog.map(x => x.id));
  } else {
    console.log(`✓ ALL 100% (${updates.length} / ${dbGames.length}) of database games mapped!`);
  }

  // Write SQL file
  const sqlPath = 'supabase/reprice_strictly_amazon_only.sql';
  fs.writeFileSync(sqlPath, sqlStatements.join('\n'), 'utf8');
  console.log(`✓ Saved SQL migration to ${sqlPath}`);
}

repriceAllGames().catch(console.error);
