import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// Master dictionary of authentic original retail MRPs
const ORIGINAL_MRPS = {
  // Sports
  "FIFA 14": 2999,
  "FIFA 15": 2999,
  "FIFA 16": 3499,
  "FIFA 17": 3499,
  "FIFA 18": 3999,
  "FIFA 19": 3999,
  "FIFA 20": 3999,
  "FIFA 21": 3999,
  "FIFA 22": 3999,
  "FIFA 23": 4499,
  "FC 24": 4999,
  "Cricket 19": 3999,
  "Cricket 22": 3999,
  "Cricket 24": 4499,
  "Ashes Cricket": 3499,
  "Big Bash Boom": 2999,
  "UFC 3": 2999,
  "UFC 4": 3999,
  "UFC 5": 4799,
  "WWE 2K18": 3499,
  "WWE 2K19": 3499,
  "WWE 2K20": 3499,
  "WWE 2K22": 3999,
  "WWE 2K23": 4499,
  "WWE 2K24": 4999,
  "F1 22": 4499,
  "Driveclub": 2999,
  "Gran Turismo Sport": 3499,
  "Gran Turismo Sport Spec II": 3999,
  "Gran Turismo Sport - Spec II": 3999,
  "Hot Wheels Unleashed": 3499,
  "Ride 5": 4499,
  "WRC": 4499,

  // Action / Adventure
  "Grand Theft Auto V": 3499,
  "GTA 5": 3499,
  "Red Dead Redemption II": 4499,
  "God of War": 3499,
  "God of War III Remastered": 2499,
  "The Last of Us Remastered": 2999,
  "The Last of Us Part II": 3999,
  "Uncharted 4: A Thief's End": 2999,
  "Uncharted: The Nathan Drake Collection": 2999,
  "Uncharted: The Lost Legacy": 2999,
  "Marvel's Spider-Man": 3499,
  "Spider-Man": 3499,
  "Marvel's Spider-Man: Miles Morales": 3999,
  "Ghost of Tsushima: Director's Cut": 4999,
  "Horizon Zero Dawn Complete Edition": 2999,
  "Days Gone": 3499,
  "Ratchet & Clank": 2499,
  "The Witcher 3: Wild Hunt": 3499,
  "Cyberpunk 2077": 3999,
  "Hogwarts Legacy": 4999,
  "Minecraft: PlayStation 4 Edition": 2999,
  "Sonic Forces": 2499,
  "Among Us: Crewmate Edition": 2499,
  "Deathloop": 3999,
  "Tomb Raider I-III Remastered": 3499,

  // Shooters & Horror
  "Battlefield 4": 2999,
  "Battlefield 1": 2999,
  "Battlefield 2042": 4499,
  "Call of Duty: Advanced Warfare": 3499,
  "Call of Duty: Black Ops III": 3499,
  "Call of Duty: Infinite Warfare": 3499,
  "Call of Duty: Infinite Warfare Legacy Edition": 4499,
  "Call of Duty: Infinite Warfare - Legacy Edition": 4499,
  "Call of Duty: Black Ops 4": 3999,
  "Call of Duty: Modern Warfare II": 4999,
  "Sniper Elite 3 Ultimate Edition": 2999,
  "Sniper Elite 5": 4499,
  "Payday 3": 3499,
  "PlayerUnknown's Battlegrounds": 2499,
  "Tom Clancy's Ghost Recon Breakpoint": 3499,
  "Tom Clancy's Ghost Recon Wildlands Gold Edition": 3999,
  "Tom Clancy's Ghost Recon Wildlands - Gold Edition": 3999,
  "Resident Evil 2": 3499,
  "Resident Evil 4": 4499,
  "Resident Evil 7: Biohazard": 2999,
  "Silent Hill": 4999,
  "Dead by Daylight": 2999,
  "Dying Light": 2999,
  "Dying Light Enhanced Edition": 3499,
  "Metro Exodus": 3499,

  // Ubisoft / Fighting
  "Watch Dogs": 2499,
  "Watch Dogs 2": 2999,
  "Watch Dogs Legion": 3999,
  "Far Cry 4": 2499,
  "Far Cry 6": 4499,
  "Assassin's Creed IV Black Flag": 2499,
  "Assassin's Creed Unity": 2499,
  "Assassin's Creed Syndicate": 2999,
  "Assassin's Creed The Ezio Collection": 3499,
  "Assassin's Creed Origins": 3499,
  "Assassin's Creed Odyssey": 3999,
  "Assassin's Creed Valhalla": 4499,
  "Assassin's Creed Mirage": 3999,
  "Assassin's Creed Mirage: Launch Edition": 4299,
  "Batman: Arkham Knight": 2999,
  "Marvel's Avengers": 3499,
  "Injustice: Ultimate Edition": 2499,
  "Injustice: Gods Among Us - Ultimate Edition": 2499,
  "Injustice 2": 2999,
  "Mortal Kombat 11": 3499,
  "Mortal Kombat 11 Ultimate": 3999,
  "Tekken 7": 2999,
  "Naruto Shippuden: Ultimate Ninja Storm 4": 2999,
  "Dragon Ball Xenoverse": 2499,
  "Dragon Ball Z: Kakarot": 3499,
  "Metal Gear Solid V: The Phantom Pain": 2999,
  "Sleeping Dogs: Definitive Edition": 2499,
  "Mafia III": 2999,
  "Nioh": 2999,
  "Nioh Collection": 4999,
  "It Takes Two": 2999,
  "LEGO City Undercover": 2499,
  "Death Stranding: Special Edition": 3999,
  "Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles": 3999,
  "FIFA 21 Champions Edition": 4499,
  "Elden Ring: Nightreign": 4499,
  "Nightreign": 4499
};

function getOriginalMrp(cleanName, existingMrp) {
  if (ORIGINAL_MRPS[cleanName]) return ORIGINAL_MRPS[cleanName];
  for (const k of Object.keys(ORIGINAL_MRPS)) {
    if (cleanName.toLowerCase().startsWith(k.toLowerCase()) || cleanName.toLowerCase().includes(k.toLowerCase())) {
      return ORIGINAL_MRPS[k];
    }
  }
  return existingMrp || 3499;
}

/**
 * Calculates pre-owned price at ~60% - 70% OF original price (MRP).
 * Like if game is ₹1,000, price is ₹600.
 */
function calculateReducedTo60to70(mrp, platform) {
  // Target ratio of MRP:
  // Standard/PS4 titles: ~60% of MRP (e.g. 2499 -> 1499, 2999 -> 1799, 3499 -> 2099)
  // High-demand/PS5 titles: ~62% - 64% of MRP (e.g. 3999 -> 2499, 4499 -> 2799, 4999 -> 3199)
  let targetRatio = 0.60;
  if (platform === 'PS5') {
    targetRatio = 0.63; // ~63% of MRP for PS5
  } else if (mrp >= 4499) {
    targetRatio = 0.62;
  }

  let rawPrice = mrp * targetRatio;

  // Round to nearest 100 minus 1 (e.g. 1499, 1799, 2099, 2399, 2799, 3199)
  let roundedPrice = Math.round(rawPrice / 100) * 100 - 1;

  // Verify that ratio is strictly within [0.60, 0.70]
  let ratio = roundedPrice / mrp;

  while (ratio < 0.60) {
    roundedPrice += 50;
    ratio = roundedPrice / mrp;
  }
  while (ratio > 0.70) {
    roundedPrice -= 50;
    ratio = roundedPrice / mrp;
  }

  // Ensure clean psychological ending (e.g. 99)
  if (roundedPrice % 100 !== 99) {
    roundedPrice = Math.floor(roundedPrice / 100) * 100 - 1;
    if (roundedPrice / mrp < 0.60) roundedPrice += 100;
    if (roundedPrice / mrp > 0.70) roundedPrice -= 100;
  }

  // Discount percentage shown on storefront
  const discountPercent = Math.round(((mrp - roundedPrice) / mrp) * 100);

  return {
    price: roundedPrice,
    mrp: mrp,
    discountPercent,
    ratioPercent: Math.round((roundedPrice / mrp) * 100)
  };
}

async function run() {
  const { data: games, error } = await supabase
    .from('products')
    .select('id, name, platform, mrp, price, discount_percent')
    .eq('category', 'preowned_games')
    .order('platform', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  console.log(`Analyzing ${games.length} pre-owned games in database...\n`);

  const updates = [];
  const sqlStatements = [];
  sqlStatements.push(`-- ============================================================================
-- DJN TECH - PRE-OWNED GAMES REDUCED TO 60% - 70% OF ORIGINAL PRICE (MRP)
-- Rule: Pre-owned selling price = 60% to 70% of original online price (e.g., ₹1,000 -> ₹600)
-- ============================================================================
`);

  for (const g of games) {
    const cleanName = g.name
      .replace(/\(PS4\)/gi, '')
      .replace(/\(PS5\)/gi, '')
      .replace(/\(Xbox One\)/gi, '')
      .replace(/\(Xbox\)/gi, '')
      .replace(/\(Custom printed cover\)/gi, '')
      .trim();

    const authenticMrp = getOriginalMrp(cleanName, g.mrp);
    const { price: newPrice, mrp: newMrp, discountPercent, ratioPercent } = calculateReducedTo60to70(authenticMrp, g.platform);

    updates.push({
      id: g.id,
      name: g.name,
      platform: g.platform,
      oldPrice: g.price,
      newPrice,
      oldMrp: g.mrp,
      newMrp,
      discountPercent,
      ratioPercent
    });

    sqlStatements.push(`UPDATE public.products SET
    price = ${newPrice},
    mrp = ${newMrp},
    discount_percent = ${discountPercent},
    updated_at = NOW()
WHERE id = '${g.id}';`);
  }

  fs.writeFileSync('supabase/reprice_preowned_to_60pct.sql', sqlStatements.join('\n'), 'utf8');
  console.log('Saved SQL migration to supabase/reprice_preowned_to_60pct.sql\n');

  console.log('Applying updates to Supabase products table...');
  let successCount = 0;

  for (const u of updates) {
    const { error: upErr } = await supabase
      .from('products')
      .update({
        price: u.newPrice,
        mrp: u.newMrp,
        discount_percent: u.discountPercent,
        updated_at: new Date().toISOString()
      })
      .eq('id', u.id);

    if (upErr) {
      console.error(`Error updating ${u.name}:`, upErr.message);
    } else {
      successCount++;
    }
  }

  console.log(`\nSuccessfully updated ${successCount} / ${updates.length} games in Supabase database!`);

  // Final verification across ALL 124 games
  const { data: allGames } = await supabase
    .from('products')
    .select('id, name, platform, mrp, price, discount_percent')
    .eq('category', 'preowned_games');

  const ratios = allGames.map(g => Math.round((g.price / g.mrp) * 100));
  const minR = Math.min(...ratios);
  const maxR = Math.max(...ratios);
  const avgR = Math.round(ratios.reduce((a, b) => a + b, 0) / ratios.length);

  console.log('\n=== FINAL VERIFICATION ACROSS ALL 124 PRE-OWNED GAMES ===');
  console.log(`Total games in DB: ${allGames.length}`);
  console.log(`Minimum price-to-MRP ratio: ${minR}% of original price`);
  console.log(`Maximum price-to-MRP ratio: ${maxR}% of original price`);
  console.log(`Average price-to-MRP ratio: ${avgR}% of original price`);
  console.log(`100% compliant with 60% - 70% rule: ${minR >= 60 && maxR <= 70 ? 'YES ✅' : 'NO ❌'}`);

  console.log('\n--- Sample Updated Games ---');
  console.table(allGames.slice(0, 20).map(g => ({
    Game: g.name.slice(0, 32),
    Platform: g.platform,
    'Original MRP': `₹${g.mrp}`,
    'Pre-Owned Price': `₹${g.price}`,
    '% of Original': `${Math.round((g.price / g.mrp) * 100)}%`,
    'Discount Badge': `${g.discount_percent}% OFF`
  })));
}

run().catch(console.error);
