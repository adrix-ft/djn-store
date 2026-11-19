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

// 2. Query argument
const rawQuery = process.argv.slice(2).join(' ').trim();
const query = rawQuery.toLowerCase();

async function search() {
  console.log(`\n============================================================`);
  console.log(`  DJN TECH DATABASE CATALOG SEARCH`);
  console.log(`  Query: "${rawQuery || '(ALL PRODUCTS)'}"`);
  console.log(`============================================================\n`);

  const { data, error } = await supabase
    .from('products')
    .select('id, name, subtitle, category, platform, condition, price, mrp, discount_percent, in_stock, stock_count, badge, image_url')
    .order('price', { ascending: false });

  if (error) {
    console.error('Supabase query error:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log('Database returned 0 products.\n');
    return;
  }

  let matches = data;

  if (query) {
    const tokens = query.split(/\s+/).filter(Boolean);

    matches = data.filter((p) => {
      const targetStr = `${p.id} ${p.name} ${p.subtitle || ''} ${p.category} ${p.platform} ${p.condition} ${p.badge || ''}`.toLowerCase();
      
      return tokens.every((token) => {
        if (targetStr.includes(token)) return true;
        if (token === 'ps4' && (targetStr.includes('playstation 4') || targetStr.includes('ps4'))) return true;
        if (token === 'ps5' && (targetStr.includes('playstation 5') || targetStr.includes('ps5'))) return true;
        if (token === 'switch' && (targetStr.includes('nintendo') || targetStr.includes('switch'))) return true;
        return false;
      });
    });
  }

  if (matches.length === 0) {
    console.log(`[RESULT] No products found matching "${rawQuery}".`);
    console.log(`-> Safe to add as a new product in the database.\n`);
    return;
  }

  console.log(`[RESULT] Found ${matches.length} matching product(s) in Supabase:\n`);
  matches.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.id}]`);
    console.log(`   Name:      ${p.name}`);
    console.log(`   Category:  ${p.category} | Platform: ${p.platform} | Condition: ${p.condition}`);
    console.log(`   Price:     ₹${(p.price || 0).toLocaleString('en-IN')} (MRP: ₹${(p.mrp || 0).toLocaleString('en-IN')}, ${p.discount_percent || 0}% OFF)`);
    console.log(`   Badge:     ${p.badge || 'None'} | Stock: ${p.in_stock ? 'In Stock' : 'Out of Stock'} (${p.stock_count})`);
    console.log(`   Image:     ${p.image_url || 'None'}`);
    console.log(`   ------------------------------------------------------------`);
  });

  console.log(`\nNext Steps:`);
  console.log(`- If updating an existing item: use its ID (${matches[0].id}) in scripts/upsert_product.mjs.`);
  console.log(`- If adding a new separate edition/condition: use a unique ID (e.g. product-${Date.now()}).\n`);
}

search().catch(console.error);
