import fs from 'fs';
import { getGameImageUrl } from './game_image_resolver.mjs';

const RAW_LIST = [
  "FIFA 16 (PS4)",
  "FIFA 19 (PS4)",
  "FIFA 20 (PS4)",
  "FIFA 19 (PS4)",
  "FIFA 19 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Grand Theft Auto V (PS4)",
  "Grand Theft Auto V (PS4)",
  "FIFA 18 (PS4)",
  "FIFA 14 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Grand Theft Auto V (PS4)",
  "FIFA 19 (PS4)",
  "FIFA 16 (PS4)",
  "FIFA 19 (PS4)",
  "FIFA 15 (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "Watch Dogs (PS4)",
  "God of War (PS4)",
  "Battlefield 4 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "Far Cry 4 (PS4)",
  "Battlefield 1 (PS4)",
  "Days Gone (PS4)",
  "The Last of Us Part II (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "The Witcher 3: Wild Hunt (PS4)",
  "Assassin's Creed Syndicate (PS4)",
  "Red Dead Redemption II (PS4)",
  "Horizon Zero Dawn Complete Edition (PS4)",
  "FIFA 19 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Big Bash Boom (PS4)",
  "Ratchet & Clank (PS4)",
  "Watch Dogs 2 (PS4)",
  "The Last of Us Remastered (PS4)",
  "Grand Theft Auto V (PS4)",
  "Grand Theft Auto V (PS4)",
  "Grand Theft Auto V (PS4)",
  "Red Dead Redemption II (PS4)",
  "God of War (PS4)",
  "God of War (PS4)",
  "Grand Theft Auto V (PS4)",
  "PlayerUnknown's Battlegrounds (PS4)",
  "Gran Turismo Sport (PS4)",
  "Assassin's Creed Syndicate (PS4)",
  "Horizon Zero Dawn Complete Edition (PS4)",
  "Gran Turismo Sport (PS4)",
  "FIFA 20 (PS4)",
  "Watch Dogs (PS4)",
  "Resident Evil 2 (PS4)",
  "FIFA 19 (PS4)",
  "FIFA 18 (PS4)",
  "FIFA 17 (PS4)",
  "Grand Theft Auto V (PS4)",
  "God of War (PS4)",
  "Uncharted: The Nathan Drake Collection (PS4)",
  "Among Us: Crewmate Edition (PS4)",
  "God of War (PS4)",
  "FIFA 22 (PS4)",
  "Gran Turismo Sport (PS4)",
  "Ratchet & Clank (PS4)",
  "Call of Duty: Black Ops 4 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Sonic Forces (PS4)",
  "God of War (PS4)",
  "FIFA 20 (PS4)",
  "FIFA 21 (PS4)",
  "FIFA 23 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Batman: Arkham Knight (PS4)",
  "Gran Turismo Sport (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "Minecraft: PlayStation 4 Edition (PS4)",
  "Dying Light Enhanced Edition (PS4)",
  "God of War (PS4)",
  "Cyberpunk 2077 (PS4)",
  "God of War (PS4)",
  "Cricket 19 (PS4)",
  "Big Bash Boom (PS4)",
  "Watch Dogs 2 (PS4)",
  "God of War III Remastered (PS4)",
  "Cricket 19 (PS4)",
  "Call of Duty: Advanced Warfare (PS4)",
  "Assassin's Creed Valhalla (PS4)",
  "Naruto Shippuden: Ultimate Ninja Storm 4 (PS4)",
  "Assassin's Creed IV Black Flag (PS4)",
  "Watch Dogs 2 (PS4)",
  "Grand Theft Auto V (PS4)",
  "Metal Gear Solid V: The Phantom Pain (PS4)",
  "Metal Gear Solid V: The Phantom Pain (PS4)",
  "Red Dead Redemption II (PS4)",
  "Assassin's Creed Origins (PS4)",
  "Sleeping Dogs: Definitive Edition (PS4)",
  "Mafia III (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "Ashes Cricket (PS4)",
  "Marvel's Spider-Man (PS4)",
  "The Last of Us Remastered (PS4)",
  "Driveclub (PS4)",
  "Ratchet & Clank (PS4)",
  "UFC 4 (PS4)",
  "Dead by Daylight (PS4)",
  "Cricket 19 (PS4)",
  "Horizon Zero Dawn Complete Edition (PS4)",
  "Uncharted: The Lost Legacy (PS4)",
  "The Last of Us Part II (PS4)",
  "Marvel's Spider-Man (PS4)",
  "Injustice 2 (PS4)",
  "Horizon Zero Dawn Complete Edition (PS4)",
  "Resident Evil 4 (PS4)",
  "Dying Light (PS4)",
  "Tom Clancy's Ghost Recon Breakpoint (PS4)",
  "Gran Turismo Sport (PS4)",
  "Ratchet & Clank (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "Uncharted: The Nathan Drake Collection (PS4)",
  "FC 24 (PS4)",
  "Watch Dogs (PS4)",
  "Injustice 2 (PS4)",
  "Cricket 19 (PS4)",
  "The Last of Us Remastered (PS4)",
  "Grand Theft Auto V (PS4)",
  "Injustice 2 (PS4)",
  "Marvel's Spider-Man (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "GTA 5 (Custom printed cover) (PS4)",
  "The Last of Us Remastered (PS4)",
  "Call of Duty: Infinite Warfare (PS4)",
  "Driveclub (PS4)",
  "Marvel's Spider-Man (PS4)",
  "Nioh (PS4)",
  "Days Gone (PS4)",
  "WWE 2K18 (PS4)",
  "Batman: Arkham Knight (PS4)",
  "Marvel's Avengers (PS4)",
  "Far Cry 4 (PS4)",
  "God of War (PS4)",
  "Uncharted 4: A Thief's End (PS4)",
  "FIFA 23 (PS4)",
  "Call of Duty: Black Ops III (PS4)",
  "Dragon Ball Xenoverse (PS4)",
  "Watch Dogs Legion (PS4)",
  "Batman: Arkham Knight (PS4)",
  "Assassin's Creed Odyssey (PS4)",
  "Call of Duty: Black Ops 4 (PS4)",
  "Uncharted: The Nathan Drake Collection (PS4)",
  "WWE 2K24 (PS4)",
  "Watch Dogs 2 (PS4)",
  "Assassin's Creed Unity (PS4)",
  "Far Cry 6 (PS5)",
  "Sniper Elite 5 (PS5)",
  "Deathloop (PS5)",
  "Nioh Collection (PS5)",
  "Grand Theft Auto V (PS5)",
  "Grand Theft Auto V (PS5)",
  "Grand Theft Auto V (PS5)",
  "Grand Theft Auto V (PS5)",
  "Grand Theft Auto V (PS5)",
  "Assassin's Creed Valhalla (PS5)",
  "Assassin's Creed Mirage (PS5)",
  "Assassin's Creed Mirage: Launch Edition (PS5)",
  "Assassin's Creed Valhalla (PS5)",
  "Metro Exodus (PS5)",
  "Tomb Raider I-III Remastered (PS5)",
  "Marvel's Spider-Man: Miles Morales (PS5)",
  "Resident Evil 4 (PS5)",
  "Ghost of Tsushima: Director's Cut (PS5)",
  "WWE 2K22 (PS5)",
  "Call of Duty: Modern Warfare II (PS5)",
  "Hogwarts Legacy (PS5)",
  "Battlefield 2042 (PS5)",
  "Hogwarts Legacy (PS5)",
  "Payday 3 (PS5)",
  "Hot Wheels Unleashed (PS5)",
  "Ride 5 (PS5)",
  "Watch Dogs Legion (PS5)",
  "FIFA 23 (PS5)",
  "FIFA 23 (PS5)",
  "FIFA 23 (PS5)",
  "FIFA 23 (PS5)",
  "FIFA 23 (Custom printed cover) (PS5)",
  "FIFA 23 (Custom printed cover) (PS5)",
  "WRC (Custom printed cover) (PS5)",
  "Cricket 24 (Custom printed cover) (PS5)",
  "Far Cry 6 (Custom printed cover) (PS5)",
  "Spider-Man (Custom printed cover) (PS5)",
  "UFC 5 (PS5)",
  "Silent Hill (PS5)",
  "Hogwarts Legacy (PS5)",
  "FC 24 (PS5)",
  "FC 24 (PS5)",
  "FC 24 (PS5)",
  "FC 24 (PS5)",
  "Marvel's Spider-Man: Miles Morales (PS5)",
  "Cricket 24 (PS5)",
  "Hogwarts Legacy (PS5)",
  "Mortal Kombat 11 Ultimate (PS5)",
  "WWE 2K22 (PS5)",
  "F1 22 (PS5)",
  "WWE 2K23 (PS5)",
  "Sniper Elite 3 Ultimate Edition (PS4)",
  "God of War (PS4)",
  "Dragon Ball Z: Kakarot (PS4)",
  "Mafia III (PS4)",
  "Assassin's Creed Valhalla (PS4)"
];

// Count frequencies
const countMap = {};
for (const item of RAW_LIST) {
  countMap[item] = (countMap[item] || 0) + 1;
}

// Metadata registry for game details & pricing
const GAME_DETAILS = {
  // Sports
  "FIFA 14": { price: 499, mrp: 2999, genre: "Sports / Football", badge: "RETRO" },
  "FIFA 15": { price: 549, mrp: 2999, genre: "Sports / Football", badge: "RETRO" },
  "FIFA 16": { price: 599, mrp: 3499, genre: "Sports / Football", badge: "CLASSIC" },
  "FIFA 17": { price: 699, mrp: 3499, genre: "Sports / Football", badge: "CLASSIC" },
  "FIFA 18": { price: 799, mrp: 3999, genre: "Sports / Football", badge: "POPULAR" },
  "FIFA 19": { price: 899, mrp: 3999, genre: "Sports / Football", badge: "TOP SELLER" },
  "FIFA 20": { price: 999, mrp: 3999, genre: "Sports / Football", badge: "POPULAR" },
  "FIFA 21": { price: 1199, mrp: 3999, genre: "Sports / Football", badge: "POPULAR" },
  "FIFA 22": { price: 1399, mrp: 3999, genre: "Sports / Football", badge: "TRENDING" },
  "FIFA 23": { price: 1699, mrp: 4499, genre: "Sports / Football", badge: "BESTSELLER" },
  "FC 24": { price: 2199, mrp: 4999, genre: "Sports / Football", badge: "HOT TITLE" },
  "Cricket 19": { price: 1399, mrp: 3999, genre: "Sports / Cricket", badge: "FAN FAVORITE" },
  "Cricket 24": { price: 2399, mrp: 4499, genre: "Sports / Cricket", badge: "LATEST CRICKET" },
  "Ashes Cricket": { price: 1199, mrp: 3499, genre: "Sports / Cricket", badge: "POPULAR" },
  "Big Bash Boom": { price: 899, mrp: 2999, genre: "Sports / Cricket Arcade", badge: "FAMILY" },
  "UFC 4": { price: 1399, mrp: 3999, genre: "Sports / MMA Combat", badge: "COMBAT" },
  "UFC 5": { price: 2699, mrp: 4799, genre: "Sports / MMA Combat", badge: "NEXT-GEN" },
  "WWE 2K18": { price: 899, mrp: 3499, genre: "Sports / Wrestling", badge: "CLASSIC" },
  "WWE 2K22": { price: 1499, mrp: 3999, genre: "Sports / Wrestling", badge: "POPULAR" },
  "WWE 2K23": { price: 1899, mrp: 4499, genre: "Sports / Wrestling", badge: "TOP SELLER" },
  "WWE 2K24": { price: 2699, mrp: 4999, genre: "Sports / Wrestling", badge: "LATEST" },
  "F1 22": { price: 1499, mrp: 4499, genre: "Racing / Formula 1", badge: "RACING" },
  "Driveclub": { price: 999, mrp: 2999, genre: "Racing / Sim-Cade", badge: "PS EXCLUSIVE" },
  "Gran Turismo Sport": { price: 999, mrp: 3499, genre: "Racing / Simulation", badge: "PLAYSTATION HITS" },
  "Hot Wheels Unleashed": { price: 1499, mrp: 3499, genre: "Racing / Arcade", badge: "FAMILY" },
  "Ride 5": { price: 2199, mrp: 4499, genre: "Racing / Superbike", badge: "NEXT-GEN" },
  "WRC": { price: 1899, mrp: 4499, genre: "Racing / Rally Sim", badge: "RALLY" },

  // Action / Adventure
  "Grand Theft Auto V": { price: 1299, mrp: 3499, genre: "Action / Open World", badge: "ALL-TIME BESTSELLER" },
  "GTA 5": { price: 1099, mrp: 3499, genre: "Action / Open World", badge: "CUSTOM COVER" },
  "Red Dead Redemption II": { price: 1599, mrp: 4499, genre: "Action / Open World Western", badge: "MASTERPIECE" },
  "God of War": { price: 999, mrp: 3499, genre: "Action / Mythological RPG", badge: "GAME OF THE YEAR" },
  "God of War III Remastered": { price: 899, mrp: 2499, genre: "Action / Hack and Slash", badge: "CLASSIC HITS" },
  "The Last of Us Remastered": { price: 999, mrp: 2999, genre: "Action / Narrative Survival", badge: "MASTERPIECE" },
  "The Last of Us Part II": { price: 1699, mrp: 3999, genre: "Action / Story-driven", badge: "AWARD WINNER" },
  "Uncharted 4: A Thief's End": { price: 999, mrp: 2999, genre: "Action / Cinematic Adventure", badge: "BESTSELLER" },
  "Uncharted: The Nathan Drake Collection": { price: 999, mrp: 2999, genre: "Action / Adventure 3-in-1", badge: "TRILOGY PACK" },
  "Uncharted: The Lost Legacy": { price: 999, mrp: 2999, genre: "Action / Adventure", badge: "EXPANSION" },
  "Marvel's Spider-Man": { price: 1299, mrp: 3499, genre: "Action / Superhero Open World", badge: "BLOCKBUSTER" },
  "Spider-Man": { price: 1199, mrp: 3499, genre: "Action / Superhero Open World", badge: "CUSTOM COVER" },
  "Marvel's Spider-Man: Miles Morales": { price: 1799, mrp: 3999, genre: "Action / Open World", badge: "BESTSELLER" },
  "Ghost of Tsushima: Director's Cut": { price: 2299, mrp: 4999, genre: "Action / Samurai Open World", badge: "DIRECTOR'S CUT" },
  "Horizon Zero Dawn Complete Edition": { price: 999, mrp: 2999, genre: "Action RPG / Open World", badge: "COMPLETE EDITION" },
  "Days Gone": { price: 1099, mrp: 3499, genre: "Action / Open World Survival", badge: "ZOMBIE SURVIVAL" },
  "Ratchet & Clank": { price: 899, mrp: 2499, genre: "Action / Platformer", badge: "PLAYSTATION HITS" },
  "The Witcher 3: Wild Hunt": { price: 1199, mrp: 3499, genre: "RPG / Open World Fantasy", badge: "GOTY WINNER" },
  "Cyberpunk 2077": { price: 1499, mrp: 3999, genre: "Action RPG / Sci-Fi", badge: "ENHANCED" },
  "Hogwarts Legacy": { price: 2399, mrp: 4999, genre: "Action RPG / Wizarding World", badge: "BESTSELLER" },
  "Minecraft: PlayStation 4 Edition": { price: 1399, mrp: 2999, genre: "Sandbox / Survival", badge: "ALL-TIME HIT" },
  "Sonic Forces": { price: 999, mrp: 2499, genre: "Action / Platformer", badge: "SONIC" },
  "Among Us: Crewmate Edition": { price: 899, mrp: 2499, genre: "Party / Social Deduction", badge: "CREWMATE" },
  "Deathloop": { price: 1399, mrp: 3999, genre: "Action / Time-Loop Shooter", badge: "CRITICS PICK" },
  "Tomb Raider I-III Remastered": { price: 1899, mrp: 3499, genre: "Action / Classic Adventure", badge: "TRILOGY" },

  // Shooters & Horror
  "Battlefield 4": { price: 699, mrp: 2999, genre: "Shooter / Modern Warfare", badge: "CLASSIC" },
  "Battlefield 1": { price: 799, mrp: 2999, genre: "Shooter / WW1 Historical", badge: "POPULAR" },
  "Battlefield 2042": { price: 1299, mrp: 4499, genre: "Shooter / Large-Scale War", badge: "PS5 NEXT-GEN" },
  "Call of Duty: Advanced Warfare": { price: 799, mrp: 3499, genre: "Shooter / First-Person", badge: "EXO COMBAT" },
  "Call of Duty: Black Ops III": { price: 899, mrp: 3499, genre: "Shooter / Sci-Fi FPS", badge: "ZOMBIES" },
  "Call of Duty: Infinite Warfare": { price: 799, mrp: 3499, genre: "Shooter / Space Combat", badge: "CAMPAIGN" },
  "Call of Duty: Black Ops 4": { price: 999, mrp: 3999, genre: "Shooter / Multiplayer FPS", badge: "BLACKOUT" },
  "Call of Duty: Modern Warfare II": { price: 2499, mrp: 4999, genre: "Shooter / Tactical FPS", badge: "BESTSELLER" },
  "Sniper Elite 3 Ultimate Edition": { price: 899, mrp: 2999, genre: "Tactical Shooter / Stealth", badge: "ULTIMATE" },
  "Sniper Elite 5": { price: 1999, mrp: 4499, genre: "Tactical Shooter / Stealth", badge: "NEXT-GEN" },
  "Payday 3": { price: 1499, mrp: 3499, genre: "Co-op Shooter / Heist", badge: "HEIST" },
  "PlayerUnknown's Battlegrounds": { price: 799, mrp: 2499, genre: "Battle Royale / Shooter", badge: "PUBG" },
  "Tom Clancy's Ghost Recon Breakpoint": { price: 999, mrp: 3499, genre: "Tactical Shooter / Open World", badge: "CO-OP" },
  "Resident Evil 2": { price: 1299, mrp: 3499, genre: "Survival Horror / Remake", badge: "HORROR HIT" },
  "Resident Evil 4": { price: 1899, mrp: 4499, genre: "Survival Horror / Action", badge: "GOTY NOMINEE" },
  "Silent Hill": { price: 2999, mrp: 4999, genre: "Psychological Horror", badge: "ICONIC HORROR" },
  "Dead by Daylight": { price: 1099, mrp: 2999, genre: "Asymmetrical Horror", badge: "MULTIPLAYER" },
  "Dying Light": { price: 899, mrp: 2999, genre: "Action / Parkour Zombie", badge: "SURVIVAL" },
  "Dying Light Enhanced Edition": { price: 1099, mrp: 3499, genre: "Action / Zombie Survival", badge: "ENHANCED" },
  "Metro Exodus": { price: 1399, mrp: 3499, genre: "Atmospheric FPS / Post-Apocalyptic", badge: "PS5 ENHANCED" },

  // Ubisoft / Warner / Fighting
  "Watch Dogs": { price: 699, mrp: 2499, genre: "Action / Open World Hacking", badge: "CLASSIC" },
  "Watch Dogs 2": { price: 899, mrp: 2999, genre: "Action / Open World Hacking", badge: "POPULAR" },
  "Watch Dogs Legion": { price: 1199, mrp: 3999, genre: "Action / Open World London", badge: "NEXT-GEN" },
  "Far Cry 4": { price: 799, mrp: 2499, genre: "Action / Open World FPS", badge: "KYRAT" },
  "Far Cry 6": { price: 1499, mrp: 4499, genre: "Action / Guerrilla FPS", badge: "YARA" },
  "Assassin's Creed IV Black Flag": { price: 799, mrp: 2499, genre: "Action / Pirate Adventure", badge: "PIRATE HIT" },
  "Assassin's Creed Unity": { price: 799, mrp: 2499, genre: "Action / Historical Paris", badge: "CLASSIC" },
  "Assassin's Creed Syndicate": { price: 899, mrp: 2999, genre: "Action / Victorian London", badge: "POPULAR" },
  "Assassin's Creed Origins": { price: 1099, mrp: 3499, genre: "Action RPG / Ancient Egypt", badge: "BAYEK" },
  "Assassin's Creed Odyssey": { price: 1199, mrp: 3999, genre: "Action RPG / Ancient Greece", badge: "MYTHOLOGY" },
  "Assassin's Creed Valhalla": { price: 1399, mrp: 4499, genre: "Action RPG / Viking Conquest", badge: "VIKING EPIC" },
  "Assassin's Creed Mirage": { price: 1899, mrp: 3999, genre: "Action / Stealth Adventure", badge: "BAGHDAD" },
  "Assassin's Creed Mirage: Launch Edition": { price: 2099, mrp: 4299, genre: "Action / Stealth Adventure", badge: "LAUNCH EDITION" },
  "Batman: Arkham Knight": { price: 899, mrp: 2999, genre: "Action / Superhero Dark Knight", badge: "CLASSIC" },
  "Marvel's Avengers": { price: 899, mrp: 3499, genre: "Action / Superhero Brawler", badge: "HEROES" },
  "Injustice 2": { price: 899, mrp: 2999, genre: "Fighting / DC Superheroes", badge: "FIGHTING" },
  "Mortal Kombat 11 Ultimate": { price: 1699, mrp: 3999, genre: "Fighting / Brutal Combat", badge: "ULTIMATE" },
  "Naruto Shippuden: Ultimate Ninja Storm 4": { price: 999, mrp: 2999, genre: "Anime / Fighting", badge: "ANIME HIT" },
  "Dragon Ball Xenoverse": { price: 799, mrp: 2499, genre: "Anime / Fighting RPG", badge: "DRAGON BALL" },
  "Dragon Ball Z: Kakarot": { price: 1299, mrp: 3499, genre: "Anime / Action RPG", badge: "KAKAROT" },
  "Metal Gear Solid V: The Phantom Pain": { price: 999, mrp: 2999, genre: "Tactical Espionage / Stealth", badge: "KOJIMA CLASSIC" },
  "Sleeping Dogs: Definitive Edition": { price: 899, mrp: 2499, genre: "Action / Hong Kong Open World", badge: "MARTIAL ARTS" },
  "Mafia III": { price: 899, mrp: 2999, genre: "Action / Crime Drama", badge: "CRIME SAGA" },
  "Nioh": { price: 899, mrp: 2999, genre: "Action RPG / Dark Samurai", badge: "SOULSLIKE" },
  "Nioh Collection": { price: 2399, mrp: 4999, genre: "Action RPG / Complete Remastered", badge: "DUAL PACK" }
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function jsonSql(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

async function main() {
  let distinctTitles = Object.keys(countMap);
  distinctTitles.sort();

  let sqlStatements = [];
  sqlStatements.push(`-- ============================================================================
-- DJN TECH - POPULATE PRE-OWNED PS4 & PS5 GAMES INVENTORY WITH HIGH-RES COVER ART
-- Total unique catalog titles: ${distinctTitles.length}
-- Total physical units inventory: ${RAW_LIST.length}
-- ============================================================================
`);

  console.log(`Resolving image URLs for ${distinctTitles.length} games...`);

  for (let i = 0; i < distinctTitles.length; i++) {
    const rawTitle = distinctTitles[i];
    const stockCount = countMap[rawTitle];
    
    // Extract Platform
    let platform = 'PS4';
    if (rawTitle.includes('(PS5)')) {
      platform = 'PS5';
    }

    const isCustomCover = rawTitle.includes('(Custom printed cover)');

    // Clean title without (PS4), (PS5), (Custom printed cover)
    let cleanName = rawTitle
      .replace(/\(PS4\)/gi, '')
      .replace(/\(PS5\)/gi, '')
      .replace(/\(Custom printed cover\)/gi, '')
      .trim();

    // Find metadata in registry
    let details = GAME_DETAILS[cleanName];
    if (!details) {
      // fuzzy match
      for (const key of Object.keys(GAME_DETAILS)) {
        if (cleanName.toLowerCase().startsWith(key.toLowerCase()) || cleanName.toLowerCase().includes(key.toLowerCase())) {
          details = GAME_DETAILS[key];
          break;
        }
      }
    }

    // Fallbacks if not matched
    let basePrice = details ? details.price : 999;
    let mrp = details ? details.mrp : 3499;
    let genre = details ? details.genre : 'Action / Adventure';
    let badge = details ? details.badge : (platform === 'PS5' ? 'PS5 ENHANCED' : 'PRE-OWNED');

    if (platform === 'PS5' && !rawTitle.includes('(PS5)')) {
      basePrice = Math.round(basePrice * 1.35);
      mrp = Math.max(mrp, 4499);
    }
    if (isCustomCover) {
      basePrice = Math.max(499, basePrice - 200);
      badge = 'CUSTOM COVER';
    }

    const discountPercent = Math.round(((mrp - basePrice) / mrp) * 100);
    const condition = isCustomCover ? 'Pre-Owned Grade A' : 'Pre-Owned Grade A+';
    const discCondition = isCustomCover
      ? 'Grade A (100% genuine disc, laser tested, custom high-gloss printed cover)'
      : 'Grade A+ (100% genuine disc, optical laser seek verified, original case)';

    const edition = isCustomCover ? 'Custom Printed Case Edition' : 'Standard Pre-Owned Retail Case';
    
    const customTag = isCustomCover ? '-custom-cover' : '';
    const id = `${slugify(cleanName)}-${platform.toLowerCase()}${customTag}-preowned`;

    const fullName = `${cleanName} (${platform}${isCustomCover ? ' - Custom Cover' : ''})`;
    const subtitle = `100% Optical Laser Tested Disc · ${condition} · 7-Day Guarantee`;

    const features = [
      `Genuine official Sony PlayStation ${platform} Blu-ray disc`,
      `25-Point optical seek and complete installation verified`,
      isCustomCover ? `Comes in sturdy DVD/Blu-ray case with premium custom printed cover art` : `Original retail game case with authentic inlay cover`,
      `Protected under DJN Tech 7-Day Doorstep Replacement Guarantee`
    ];

    const inTheBox = [
      `${platform} Game Disc (${cleanName})`,
      isCustomCover ? 'High-Gloss Custom Cover Box' : 'Official Retail Case',
      'DJN Hardware QA Certificate'
    ];

    const description = `Immerse yourself in ${cleanName} on PlayStation ${platform}. Every pre-owned disc at DJN Tech is ultrasonic cleaned, bench tested for complete installation pass, and dispatched in protective packaging with tracking.`;

    const themeColor = platform === 'PS5' ? '#0070D1' : '#003791';

    // Fetch verified image URL
    const imageUrl = await getGameImageUrl(rawTitle);
    process.stdout.write(`[${i + 1}/${distinctTitles.length}] ${cleanName} (${platform}) -> ${imageUrl.slice(0, 50)}...\n`);

    const insertQuery = `INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, edition, genre, theme_color, image_url
) VALUES (
    ${escapeSql(id)},
    ${escapeSql(fullName)},
    ${escapeSql(subtitle)},
    'preowned_games',
    ${escapeSql(platform)},
    ${escapeSql(condition)},
    ${mrp},
    ${basePrice},
    ${discountPercent},
    4.8,
    ${Math.floor(18 + Math.random() * 45)},
    TRUE,
    ${stockCount},
    ${escapeSql(badge)},
    ${jsonSql(features)},
    ${escapeSql(description)},
    ${jsonSql(inTheBox)},
    '7-Day Doorstep Replacement Guarantee',
    ${escapeSql(discCondition)},
    ${escapeSql(edition)},
    ${escapeSql(genre)},
    ${escapeSql(themeColor)},
    ${escapeSql(imageUrl)}
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
    updated_at = NOW();`;

    sqlStatements.push(insertQuery);
  }

  const finalSql = sqlStatements.join('\n\n');
  fs.writeFileSync('supabase/populate_games.sql', finalSql, 'utf8');
  console.log('\nSuccessfully generated supabase/populate_games.sql with image URLs!');
  console.log('Total SQL statements:', distinctTitles.length);
  console.log('Total file size:', finalSql.length);
}

main();
