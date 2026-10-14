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

async function cleanFeatures() {
  console.log('Fetching all products from Supabase...');
  const { data: products, error } = await supabase.from('products').select('id, name, features');
  if (error) {
    console.error('Fetch error:', error.message);
    return;
  }

  let updatedCount = 0;
  for (const p of products) {
    if (!Array.isArray(p.features)) continue;
    const filtered = p.features.filter(
      (feat) =>
        typeof feat === 'string' &&
        !feat.toLowerCase().includes('25-point') &&
        !feat.toLowerCase().includes('doorstep replacement')
    );

    if (filtered.length !== p.features.length) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ features: filtered })
        .eq('id', p.id);

      if (updateError) {
        console.error(`Failed to update ${p.id}:`, updateError.message);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`Successfully cleaned features for ${updatedCount} products in Supabase.`);
}

cleanFeatures().catch(console.error);
