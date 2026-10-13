import { getGameImageUrl } from './game_image_resolver.mjs';

const SUPABASE_URL = 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_246KDnCvK0ivkk8yBm1JIw_meJd3uN9';

async function syncAll() {
  console.log('Fetching existing products from Supabase...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id,name`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const products = await res.json();
  console.log(`Found ${products.length} products in Supabase.`);

  let updated = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const imageUrl = await getGameImageUrl(p.name);

    if (imageUrl) {
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${p.id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: imageUrl,
          updated_at: new Date().toISOString()
        })
      });

      if (patchRes.ok) {
        updated++;
        process.stdout.write(`[${i + 1}/${products.length}] Updated: ${p.name}\n`);
      } else {
        console.error(`Failed to update ${p.id}: ${patchRes.status}`);
      }
    }
  }

  console.log(`\nSuccessfully updated ${updated}/${products.length} products in Supabase with verified box art URLs!`);
}

syncAll().catch(console.error);
