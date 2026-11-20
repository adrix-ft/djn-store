import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read credentials from .env.local safely
let SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
let SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || '';

if (!SUPABASE_KEY && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const [k, ...vParts] = line.split('=');
    const val = vParts.join('=').trim();
    if (k?.trim() === 'SUPABASE_SECRET_KEY' && val) {
      SUPABASE_KEY = val;
      break;
    }
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log('Fetching all products from Supabase...');
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  console.log(`Fetched ${products.length} products.`);

  const updates = [];

  for (const p of products) {
    let changed = false;
    let newSubtitle = p.subtitle;
    let newInTheBox = Array.isArray(p.in_the_box) ? [...p.in_the_box] : [];
    let newFeatures = Array.isArray(p.features) ? [...p.features] : [];
    let newDescription = p.description || '';

    const nameLower = p.name.toLowerCase();

    // 1. CONSOLES
    if (p.category === 'consoles') {
      // Subtitle cleanup
      if (newSubtitle && newSubtitle.includes('Complete Kit with DualShock 4')) {
        newSubtitle = newSubtitle.replace('· Complete Kit with DualShock 4', '· Grade A+ Condition').trim();
        changed = true;
      }

      // In The Box: ONLY the product name itself!
      const targetBox = [p.name];
      if (JSON.stringify(newInTheBox) !== JSON.stringify(targetBox)) {
        newInTheBox = targetBox;
        changed = true;
      }

      // Features: Remove any mentions of controllers, cables, cords, docks, etc.
      const cleanedFeatures = newFeatures.filter(f => {
        const fl = f.toLowerCase();
        if (fl.includes('dualshock') || fl.includes('dualsense')) return false;
        if (fl.includes('includes') && fl.includes('controller') && !nameLower.includes('controller')) return false;
        if (fl.includes('controller and all connection cables')) return false;
        if (fl.includes('hdmi') || fl.includes('power cord') || fl.includes('power cable') || fl.includes('usb charging cable') || fl.includes('micro-usb')) return false;
        return true;
      });

      // Deduplicate features if warranty appeared twice
      const seen = new Set();
      const dedupedFeatures = [];
      for (const f of cleanedFeatures) {
        if (!seen.has(f)) {
          seen.add(f);
          dedupedFeatures.push(f);
        }
      }

      if (JSON.stringify(newFeatures) !== JSON.stringify(dedupedFeatures)) {
        newFeatures = dedupedFeatures;
        changed = true;
      }

      // Description cleanup: remove bundled controller and cables mentions
      if (newDescription.includes('bundled with authentic controller and cables')) {
        newDescription = newDescription.replace('bundled with authentic controller and cables.', 'serviced by DJN Tech technicians.').replace('bundled with authentic controller and cables', 'serviced by DJN Tech technicians');
        changed = true;
      }
      if (newDescription.includes('bundled with authentic controller and cables')) {
        newDescription = newDescription.replace(/bundled with authentic controller and cables/g, 'serviced by DJN Tech technicians');
        changed = true;
      }
    }

    // 2. CONTROLLERS
    else if (p.category === 'controllers') {
      // In the box: only the controller itself
      const targetBox = [p.name];
      if (JSON.stringify(newInTheBox) !== JSON.stringify(targetBox)) {
        newInTheBox = targetBox;
        changed = true;
      }

      // Clean features
      const cleanedFeatures = newFeatures.filter(f => {
        const fl = f.toLowerCase();
        if (fl.includes('batteries') && !nameLower.includes('batteries') && !nameLower.includes('battery')) return false;
        if (fl.includes('user manual') || fl.includes('setup guide')) return false;
        return true;
      });

      if (JSON.stringify(newFeatures) !== JSON.stringify(cleanedFeatures)) {
        newFeatures = cleanedFeatures;
        changed = true;
      }
    }

    // 3. ACCESSORIES
    else if (p.category === 'accessories') {
      if (p.id === 'ps5-disc-drive') {
        const targetBox = [p.name];
        if (JSON.stringify(newInTheBox) !== JSON.stringify(targetBox)) {
          newInTheBox = targetBox;
          changed = true;
        }
      }
    }

    // 4. GAMES
    else if (p.category === 'preowned_games' || p.category === 'nintendo_games') {
      // For games: in_the_box should strictly be the game disc / game card itself
      let targetItem = p.name;
      if (nameLower.includes('only game card')) {
        targetItem = '1x ' + p.name;
      } else if (nameLower.includes('with box')) {
        targetItem = '1x ' + p.name;
      } else {
        targetItem = '1x ' + p.name + ' Disc';
      }
      const targetBox = [targetItem];
      if (JSON.stringify(newInTheBox) !== JSON.stringify(targetBox)) {
        newInTheBox = targetBox;
        changed = true;
      }
    }

    if (changed) {
      updates.push({
        id: p.id,
        name: p.name,
        category: p.category,
        newSubtitle,
        newInTheBox,
        newFeatures,
        newDescription
      });
    }
  }

  console.log(`\nFound ${updates.length} products to sanitize.`);
  for (const u of updates) {
    console.log(`Sanitizing [${u.category}] ${u.name}`);
    console.log('  InTheBox:', JSON.stringify(u.newInTheBox));
    console.log('  Features count:', u.newFeatures.length);

    const { error: updateError } = await supabase
      .from('products')
      .update({
        subtitle: u.newSubtitle,
        in_the_box: u.newInTheBox,
        features: u.newFeatures,
        description: u.newDescription,
        updated_at: new Date().toISOString()
      })
      .eq('id', u.id);

    if (updateError) {
      console.error(`  Error updating ${u.id}:`, updateError);
    } else {
      console.log(`  ✓ Success`);
    }
  }

  console.log('\nAll products sanitized successfully in Supabase!');
}

run();
