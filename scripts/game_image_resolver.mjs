import fs from 'fs';

// Curated App IDs & direct image URLs for games that are console exclusives or special editions
const MANUAL_GAME_IMAGES = {
  // PlayStation Exclusives
  "Gran Turismo Sport": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7v.jpg",
  "Driveclub": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x3t.jpg",
  "The Last of Us Part II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.jpg",
  "The Last of Us Remastered": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg",
  "Uncharted 4: A Thief's End": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/library_600x900.jpg",
  "Uncharted: The Lost Legacy": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/library_600x900.jpg",
  "Uncharted: The Nathan Drake Collection": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20ee.jpg",
  "Ratchet & Clank": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7f.jpg",
  "God of War III Remastered": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1t9n.jpg",
  "Horizon Zero Dawn Complete Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg",
  "Days Gone": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/library_600x900.jpg",
  "Ghost of Tsushima: Director's Cut": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg",
  "Marvel's Spider-Man": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/library_600x900.jpg",
  "Spider-Man": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/library_600x900.jpg",
  "Marvel's Spider-Man: Miles Morales": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817190/library_600x900.jpg",

  // Sports & Cricket
  "FIFA 14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20de.jpg",
  "FIFA 15": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20df.jpg",
  "FIFA 16": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20dg.jpg",
  "FIFA 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20dh.jpg",
  "FIFA 18": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20di.jpg",
  "FIFA 19": "https://images.igdb.com/igdb/image/upload/t_cover_big/co20dj.jpg",
  "FIFA 20": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg",
  "FIFA 21": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1313860/library_600x900.jpg",
  "FIFA 22": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1506830/library_600x900.jpg",
  "FIFA 23": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1811260/library_600x900.jpg",
  "FC 24": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/library_600x900.jpg",
  "Cricket 19": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1028350/library_600x900.jpg",
  "Cricket 24": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2162600/library_600x900.jpg",
  "Ashes Cricket": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/649640/library_600x900.jpg",
  "Big Bash Boom": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kpm.jpg",
  "UFC 4": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2h3u.jpg",
  "UFC 5": "https://images.igdb.com/igdb/image/upload/t_cover_big/co70w5.jpg",
  "WWE 2K18": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/664430/library_600x900.jpg",
  "WWE 2K22": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1255630/library_600x900.jpg",
  "WWE 2K23": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1942660/library_600x900.jpg",
  "WWE 2K24": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2315690/library_600x900.jpg",
  "F1 22": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1692250/library_600x900.jpg",
  "WRC": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1849250/library_600x900.jpg",
  "Ride 5": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1650010/library_600x900.jpg",
  "Hot Wheels Unleashed": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1271700/library_600x900.jpg",

  // Top Games & Franchises
  "Grand Theft Auto V": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg",
  "GTA 5": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg",
  "Red Dead Redemption II": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg",
  "God of War": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg",
  "Hogwarts Legacy": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg",
  "Cyberpunk 2077": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg",
  "The Witcher 3: Wild Hunt": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg",
  "Resident Evil 2": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/library_600x900.jpg",
  "Resident Evil 4": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900.jpg",
  "Silent Hill": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/library_600x900.jpg",
  "Minecraft: PlayStation 4 Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnt.jpg",
  "Batman: Arkham Knight": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg",
  "Far Cry 4": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/298110/library_600x900.jpg",
  "Far Cry 6": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/library_600x900.jpg",
  "Battlefield 4": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/library_600x900.jpg",
  "Battlefield 1": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/library_600x900.jpg",
  "Battlefield 2042": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/library_600x900.jpg",
  "Call of Duty: Advanced Warfare": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/209650/library_600x900.jpg",
  "Call of Duty: Black Ops III": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/311210/library_600x900.jpg",
  "Call of Duty: Infinite Warfare": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/476600/library_600x900.jpg",
  "Call of Duty: Black Ops 4": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x3k.jpg",
  "Call of Duty: Modern Warfare II": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/library_600x900.jpg",
  "Sniper Elite 3 Ultimate Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238090/library_600x900.jpg",
  "Sniper Elite 5": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1029690/library_600x900.jpg",
  "Dead by Daylight": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/library_600x900.jpg",
  "Dying Light": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/library_600x900.jpg",
  "Dying Light Enhanced Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/library_600x900.jpg",
  "Payday 3": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1272080/library_600x900.jpg",
  "PlayerUnknown's Battlegrounds": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/library_600x900.jpg",
  "Metro Exodus": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/library_600x900.jpg",
  "Deathloop": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1252330/library_600x900.jpg",
  "Tomb Raider I-III Remastered": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2525380/library_600x900.jpg",
  "Metal Gear Solid V: The Phantom Pain": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287700/library_600x900.jpg",
  "Sleeping Dogs: Definitive Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307690/library_600x900.jpg",
  "Mafia III": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/library_600x900.jpg",
  "Nioh": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/485510/library_600x900.jpg",
  "Nioh Collection": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1325200/library_600x900.jpg",
  "Among Us: Crewmate Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/library_600x900.jpg",
  "Sonic Forces": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/637100/library_600x900.jpg",
  "Injustice 2": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/627270/library_600x900.jpg",
  "Mortal Kombat 11 Ultimate": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976310/library_600x900.jpg",
  "Naruto Shippuden: Ultimate Ninja Storm 4": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/349040/library_600x900.jpg",
  "Dragon Ball Xenoverse": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r3k.jpg",
  "Dragon Ball Z: Kakarot": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/851850/library_600x900.jpg",
  "Marvel's Avengers": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/997070/library_600x900.jpg",
  "Tom Clancy's Ghost Recon Breakpoint": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2231380/library_600x900.jpg",

  // Ubisoft series
  "Watch Dogs": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.jpg",
  "Watch Dogs 2": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/library_600x900.jpg",
  "Watch Dogs Legion": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2239550/library_600x900.jpg",
  "Assassin's Creed IV Black Flag": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242050/library_600x900.jpg",
  "Assassin's Creed Unity": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289650/library_600x900.jpg",
  "Assassin's Creed Syndicate": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/368500/library_600x900.jpg",
  "Assassin's Creed Origins": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582160/library_600x900.jpg",
  "Assassin's Creed Odyssey": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/library_600x900.jpg",
  "Assassin's Creed Valhalla": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2208920/library_600x900.jpg",
  "Assassin's Creed Mirage": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w8x.jpg",
  "Assassin's Creed Mirage: Launch Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w8x.jpg",
  "Assassin's Creed The Ezio Collection": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nrv.jpg",
  "Call of Duty: Infinite Warfare - Legacy Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co81ge.jpg",
  "Cricket 22": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1701380/library_600x900.jpg",
  "Death Stranding: Special Edition": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/library_600x900.jpg",
  "Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2928600/library_600x900.jpg",
  "FIFA 21 Champions Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wm2.jpg",
  "Gran Turismo Sport - Spec II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk2.jpg",
  "Gran Turismo Sport Spec II": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk2.jpg",
  "Injustice: Gods Among Us - Ultimate Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mym.jpg",
  "Injustice: Ultimate Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mym.jpg",
  "It Takes Two": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg",
  "LEGO City Undercover": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578330/library_600x900.jpg",
  "Mortal Kombat 11": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976310/library_600x900.jpg",
  "Elden Ring: Nightreign": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/library_600x900.jpg",
  "Nightreign": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/library_600x900.jpg",
  "Resident Evil 7: Biohazard": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/library_600x900.jpg",
  "Tekken 7": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/389730/library_600x900.jpg",
  "Tom Clancy's Ghost Recon Wildlands - Gold Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23gq.jpg",
  "Tom Clancy's Ghost Recon Wildlands Gold Edition": "https://images.igdb.com/igdb/image/upload/t_cover_big/co23gq.jpg",
  "EA Sports UFC 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1o2w.jpg",
  "UFC 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1o2w.jpg",
  "WWE 2K19": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/817130/library_600x900.jpg",
  "WWE 2K20": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1015500/library_600x900.jpg"
};

// Function to resolve image URL
export async function getGameImageUrl(rawTitle) {
  let cleanName = rawTitle
    .replace(/\(PS4\)/gi, '')
    .replace(/\(PS5\)/gi, '')
    .replace(/\(Xbox One\)/gi, '')
    .replace(/\(Xbox\)/gi, '')
    .replace(/\(Custom printed cover\)/gi, '')
    .trim();

  // Check manual dictionary first
  if (MANUAL_GAME_IMAGES[cleanName]) {
    return MANUAL_GAME_IMAGES[cleanName];
  }

  // Fuzzy check in manual list
  for (const key of Object.keys(MANUAL_GAME_IMAGES)) {
    if (cleanName.toLowerCase() === key.toLowerCase() || cleanName.toLowerCase().startsWith(key.toLowerCase())) {
      return MANUAL_GAME_IMAGES[key];
    }
  }

  // Steam Store Search API
  try {
    const searchUrl = 'https://store.steampowered.com/api/storesearch/?term=' + encodeURIComponent(cleanName) + '&l=english&cc=US';
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      const boxArt = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${item.id}/library_600x900.jpg`;
      const headCheck = await fetch(boxArt, { method: 'HEAD' });
      if (headCheck.status === 200) {
        return boxArt;
      }
      return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${item.id}/header.jpg`;
    }
  } catch (err) {
    console.warn('Steam fetch error for', cleanName, err.message);
  }

  return 'https://images.igdb.com/igdb/image/upload/t_cover_big/co20de.jpg';
}
