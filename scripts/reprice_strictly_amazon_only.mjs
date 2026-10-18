import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rudqiwifokllmjpfcnbp.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

/**
 * STRICT AMAZON.IN PRICING CATALOG (100% AMAZON ONLY)
 * Rule: Online Benchmark Price = Amazon.in Official Retail Price
 * Pre-Owned Selling Price = 60% of Amazon.in Price (Strict 40% Discount)
 */
export const AMAZON_ONLY_GAMES_PRICING = {
  // 1. Far Cry 6 (PS5 - Custom Cover)
  "far-cry-6-ps5-custom-cover-preowned": {
    name: "Far Cry 6 (PS5 - Custom Cover)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1899,
    preownedPrice: 1139 // 40% OFF
  },
  // 2. Grand Theft Auto V (PS5)
  "grand-theft-auto-v-ps5-preowned": {
    name: "Grand Theft Auto V (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2399,
    preownedPrice: 1439 // 40% OFF
  },
  // 3. God of War III Remastered (PS4)
  "god-of-war-iii-remastered-ps4-preowned": {
    name: "God of War III Remastered (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 4. Far Cry 4 (PS4)
  "far-cry-4-ps4-preowned": {
    name: "Far Cry 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 5. Driveclub (PS4)
  "driveclub-ps4-preowned": {
    name: "Driveclub (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 6. Payday 3 (PS5)
  "payday-3-ps5-preowned": {
    name: "Payday 3 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2199,
    preownedPrice: 1319 // 40% OFF
  },
  // 7. FIFA 20 (Xbox One)
  "fifa-20-xbox-preowned": {
    name: "FIFA 20 (Xbox One)",
    platform: "Xbox",
    source: "Amazon.in",
    amazonPrice: 999,
    preownedPrice: 599 // 40% OFF
  },
  // 8. WWE 2K24 (PS4)
  "wwe-2k24-ps4-preowned": {
    name: "WWE 2K24 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 3499,
    preownedPrice: 2099 // 40% OFF
  },
  // 9. Watch Dogs Legion (PS4)
  "watch-dogs-legion-ps4-preowned": {
    name: "Watch Dogs Legion (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 10. Tom Clancy's Ghost Recon Breakpoint (PS4)
  "tom-clancys-ghost-recon-breakpoint-ps4-preowned": {
    name: "Tom Clancy's Ghost Recon Breakpoint (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 11. Mafia III (PS4)
  "mafia-iii-ps4-preowned": {
    name: "Mafia III (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 12. Assassin's Creed Mirage (PS5)
  "assassins-creed-mirage-ps5-preowned": {
    name: "Assassin's Creed Mirage (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2799,
    preownedPrice: 1679 // 40% OFF
  },
  // 13. Watch Dogs 2 (PS4)
  "watch-dogs-2-ps4-preowned": {
    name: "Watch Dogs 2 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 14. Tom Clancy's Ghost Recon Wildlands - Gold Edition (PS4)
  "tom-clancys-ghost-recon-wildlands-gold-edition-ps4-preowned": {
    name: "Tom Clancy's Ghost Recon Wildlands - Gold Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 15. Mortal Kombat 11 (PS4)
  "mortal-kombat-11-ps4-preowned": {
    name: "Mortal Kombat 11 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 16. Assassin's Creed Odyssey (PS4)
  "assassins-creed-odyssey-ps4-preowned": {
    name: "Assassin's Creed Odyssey (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 17. Tom Clancy's Ghost Recon Wildlands (PS4)
  "ghost-recon-wildlands-ps4-preowned": {
    name: "Tom Clancy's Ghost Recon Wildlands (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1799,
    preownedPrice: 1079 // 40% OFF
  },
  // 18. Watch Dogs Legion Resistance Edition (PS4)
  "watch-dogs-legion-resistance-edition-ps4-preowned": {
    name: "Watch Dogs Legion Resistance Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 19. Big Bash Boom (PS4)
  "big-bash-boom-ps4-preowned": {
    name: "Big Bash Boom (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 20. Assassin's Creed Origins (PS4)
  "assassins-creed-origins-ps4-preowned": {
    name: "Assassin's Creed Origins (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1799,
    preownedPrice: 1079 // 40% OFF
  },
  // 21. Ride 5 (PS5)
  "ride-5-ps5-preowned": {
    name: "Ride 5 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 22. WRC (PS5 - Custom Cover)
  "wrc-ps5-custom-cover-preowned": {
    name: "WRC (PS5 - Custom Cover)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 23. Assassin's Creed Mirage: Launch Edition (PS5)
  "assassins-creed-mirage-launch-edition-ps5-preowned": {
    name: "Assassin's Creed Mirage: Launch Edition (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 24. Battlefield 1 (PS4)
  "battlefield-1-ps4-preowned": {
    name: "Battlefield 1 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1199,
    preownedPrice: 719 // 40% OFF
  },
  // 25. The Witcher 3: Wild Hunt - Game of the Year Edition (PS4)
  "the-witcher-3-wild-hunt-game-of-the-year-edition-ps4-preowned": {
    name: "The Witcher 3: Wild Hunt - Game of the Year Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 26. Minecraft: PlayStation 4 Edition (PS4)
  "minecraft-playstation-4-edition-ps4-preowned": {
    name: "Minecraft: PlayStation 4 Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 27. Cricket 24 (PS5)
  "cricket-24-ps5-preowned": {
    name: "Cricket 24 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 28. Ashes Cricket (PS4)
  "ashes-cricket-ps4-preowned": {
    name: "Ashes Cricket (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 29. Battlefield 4 (PS4)
  "battlefield-4-ps4-preowned": {
    name: "Battlefield 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 30. Marvel's Spider-Man: Miles Morales (PS5)
  "marvels-spider-man-miles-morales-ps5-preowned": {
    name: "Marvel's Spider-Man: Miles Morales (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 31. Assassin's Creed Syndicate (Xbox One)
  "assassins-creed-syndicate-xbox-preowned": {
    name: "Assassin's Creed Syndicate (Xbox One)",
    platform: "Xbox",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 32. God of War Ragnarok (PS4)
  "god-of-war-ragnarok-ps4-preowned": {
    name: "God of War Ragnarok (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 3499,
    preownedPrice: 2099 // 40% OFF
  },
  // 33. Call of Duty: Infinite Warfare (PS4)
  "call-of-duty-infinite-warfare-ps4-preowned": {
    name: "Call of Duty: Infinite Warfare (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 34. Assassin's Creed The Ezio Collection (PS4)
  "assassins-creed-the-ezio-collection-ps4-preowned": {
    name: "Assassin's Creed The Ezio Collection (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 35. Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles (PS4)
  "demon-slayer-kimetsu-no-yaiba-the-hinokami-chronicles-ps4-preowned": {
    name: "Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 36. Gran Turismo Sport - Spec II (PS4)
  "gran-turismo-sport-spec-ii-ps4-preowned": {
    name: "Gran Turismo Sport - Spec II (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1699,
    preownedPrice: 1019 // 40% OFF
  },
  // 37. FIFA 16 (PS4)
  "fifa-16-ps4-preowned": {
    name: "FIFA 16 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 899,
    preownedPrice: 539 // 40% OFF
  },
  // 38. Call of Duty: Modern Warfare II (PS5)
  "call-of-duty-modern-warfare-ii-ps5-preowned": {
    name: "Call of Duty: Modern Warfare II (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 3999,
    preownedPrice: 2399 // 40% OFF
  },
  // 39. Cricket 19 (PS4)
  "cricket-19-ps4-preowned": {
    name: "Cricket 19 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 40. EA Sports UFC 3 (PS4)
  "ea-sports-ufc-3-ps4-preowned": {
    name: "EA Sports UFC 3 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 41. Grand Theft Auto V (Xbox One)
  "grand-theft-auto-v-xbox-preowned": {
    name: "Grand Theft Auto V (Xbox One)",
    platform: "Xbox",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 42. Battlefield 4 Premium Edition (PS4)
  "battlefield-4-premium-edition-ps4-preowned": {
    name: "Battlefield 4 Premium Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 43. Dragon Ball Xenoverse (PS4)
  "dragon-ball-xenoverse-ps4-preowned": {
    name: "Dragon Ball Xenoverse (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 44. Call of Duty: Infinite Warfare (Xbox One)
  "call-of-duty-infinite-warfare-xbox-preowned": {
    name: "Call of Duty: Infinite Warfare (Xbox One)",
    platform: "Xbox",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 45. Assassin's Creed Valhalla Drakkar Edition (PS4)
  "assassins-creed-valhalla-drakkar-edition-ps4-preowned": {
    name: "Assassin's Creed Valhalla Drakkar Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 46. Assassin's Creed Valhalla (PS4)
  "assassins-creed-valhalla-ps4-preowned": {
    name: "Assassin's Creed Valhalla (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 47. Cyberpunk 2077 (PS4)
  "cyberpunk-2077-ps4-preowned": {
    name: "Cyberpunk 2077 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 48. Resident Evil 7: Biohazard (PS4)
  "resident-evil-7-biohazard-ps4-preowned": {
    name: "Resident Evil 7: Biohazard (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 49. Death Stranding: Special Edition (PS4)
  "death-stranding-special-edition-ps4-preowned": {
    name: "Death Stranding: Special Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2199,
    preownedPrice: 1319 // 40% OFF
  },
  // 50. Dragon Ball Z: Kakarot (PS4)
  "dragon-ball-z-kakarot-ps4-preowned": {
    name: "Dragon Ball Z: Kakarot (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 51. Batman: Arkham Knight (PS4)
  "batman-arkham-knight-ps4-preowned": {
    name: "Batman: Arkham Knight (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 52. Elden Ring: Nightreign (PS4)
  "elden-ring-nightreign-ps4-preowned": {
    name: "Elden Ring: Nightreign (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 53. Dying Light (PS4)
  "dying-light-ps4-preowned": {
    name: "Dying Light (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 54. WWE 2K19 (PS4)
  "wwe-2k19-ps4-preowned": {
    name: "WWE 2K19 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1699,
    preownedPrice: 1019 // 40% OFF
  },
  // 55. Tekken 7 (PS4)
  "tekken-7-ps4-preowned": {
    name: "Tekken 7 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 56. Dead by Daylight (PS4)
  "dead-by-daylight-ps4-preowned": {
    name: "Dead by Daylight (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 57. Cricket 22 (PS4)
  "cricket-22-ps4-preowned": {
    name: "Cricket 22 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 58. It Takes Two (PS4)
  "it-takes-two-ps4-preowned": {
    name: "It Takes Two (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 59. LEGO City Undercover (PS4)
  "lego-city-undercover-ps4-preowned": {
    name: "LEGO City Undercover (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 60. Injustice: Gods Among Us - Ultimate Edition (PS4)
  "injustice-gods-among-us-ultimate-edition-ps4-preowned": {
    name: "Injustice: Gods Among Us - Ultimate Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 61. F1 22 (PS5)
  "f1-22-ps5-preowned": {
    name: "F1 22 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 62. Sonic Forces (Xbox One)
  "sonic-forces-xbox-preowned": {
    name: "Sonic Forces (Xbox One)",
    platform: "Xbox",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 63. FIFA 21 Champions Edition (PS4)
  "fifa-21-champions-edition-ps4-preowned": {
    name: "FIFA 21 Champions Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 64. WWE 2K20 (PS4)
  "wwe-2k20-ps4-preowned": {
    name: "WWE 2K20 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 65. FIFA 17 (PS4)
  "fifa-17-ps4-preowned": {
    name: "FIFA 17 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 899,
    preownedPrice: 539 // 40% OFF
  },
  // 66. FC 24 (PS4)
  "fc-24-ps4-preowned": {
    name: "FC 24 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 67. Call of Duty: Black Ops 4 (PS4)
  "call-of-duty-black-ops-4-ps4-preowned": {
    name: "Call of Duty: Black Ops 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1799,
    preownedPrice: 1079 // 40% OFF
  },
  // 68. FIFA 14 (PS4)
  "fifa-14-ps4-preowned": {
    name: "FIFA 14 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 799,
    preownedPrice: 479 // 40% OFF
  },
  // 69. Call of Duty: Infinite Warfare - Legacy Edition (PS4)
  "call-of-duty-infinite-warfare-legacy-edition-ps4-preowned": {
    name: "Call of Duty: Infinite Warfare - Legacy Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 70. Hot Wheels Unleashed (PS5)
  "hot-wheels-unleashed-ps5-preowned": {
    name: "Hot Wheels Unleashed (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 71. FIFA 22 (PS4)
  "fifa-22-ps4-preowned": {
    name: "FIFA 22 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 72. FIFA 19 (PS4)
  "fifa-19-ps4-preowned": {
    name: "FIFA 19 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1099,
    preownedPrice: 659 // 40% OFF
  },
  // 73. FIFA 21 (PS4)
  "fifa-21-ps4-preowned": {
    name: "FIFA 21 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 74. FIFA 20 (PS4)
  "fifa-20-ps4-preowned": {
    name: "FIFA 20 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1199,
    preownedPrice: 719 // 40% OFF
  },
  // 75. FIFA 23 (PS4)
  "fifa-23-ps4-preowned": {
    name: "FIFA 23 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 76. Grand Theft Auto V (PS4)
  "grand-theft-auto-v-ps4-preowned": {
    name: "Grand Theft Auto V (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 77. Hogwarts Legacy (PS5)
  "hogwarts-legacy-ps5-preowned": {
    name: "Hogwarts Legacy (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 78. Far Cry 6 (PS5)
  "far-cry-6-ps5-preowned": {
    name: "Far Cry 6 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 79. Ghost of Tsushima: Director's Cut (PS5)
  "ghost-of-tsushima-directors-cut-ps5-preowned": {
    name: "Ghost of Tsushima: Director's Cut (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 3499,
    preownedPrice: 2099 // 40% OFF
  },
  // 80. God of War (PS4)
  "god-of-war-ps4-preowned": {
    name: "God of War (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 81. Marvel's Spider-Man (PS4)
  "marvels-spider-man-ps4-preowned": {
    name: "Marvel's Spider-Man (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 82. Injustice 2 (PS4)
  "injustice-2-ps4-preowned": {
    name: "Injustice 2 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 83. Metro Exodus (PS5)
  "metro-exodus-ps5-preowned": {
    name: "Metro Exodus (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 84. Metal Gear Solid V: The Phantom Pain (PS4)
  "metal-gear-solid-v-the-phantom-pain-ps4-preowned": {
    name: "Metal Gear Solid V: The Phantom Pain (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 85. Mortal Kombat 11 Ultimate (PS5)
  "mortal-kombat-11-ultimate-ps5-preowned": {
    name: "Mortal Kombat 11 Ultimate (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 86. Resident Evil 2 (PS4)
  "resident-evil-2-ps4-preowned": {
    name: "Resident Evil 2 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1699,
    preownedPrice: 1019 // 40% OFF
  },
  // 87. Ratchet & Clank (PS4)
  "ratchet-clank-ps4-preowned": {
    name: "Ratchet & Clank (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 88. Red Dead Redemption II (PS4)
  "red-dead-redemption-ii-ps4-preowned": {
    name: "Red Dead Redemption II (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 2199,
    preownedPrice: 1319 // 40% OFF
  },
  // 89. Silent Hill (PS5)
  "silent-hill-ps5-preowned": {
    name: "Silent Hill (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 3999,
    preownedPrice: 2399 // 40% OFF
  },
  // 90. Sniper Elite 3 Ultimate Edition (PS4)
  "sniper-elite-3-ultimate-edition-ps4-preowned": {
    name: "Sniper Elite 3 Ultimate Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 91. Resident Evil 4 (PS5)
  "resident-evil-4-ps5-preowned": {
    name: "Resident Evil 4 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 92. Sonic Forces (PS4)
  "sonic-forces-ps4-preowned": {
    name: "Sonic Forces (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 93. Sniper Elite 5 (PS5)
  "sniper-elite-5-ps5-preowned": {
    name: "Sniper Elite 5 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 94. UFC 5 (PS5)
  "ufc-5-ps5-preowned": {
    name: "UFC 5 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 3499,
    preownedPrice: 2099 // 40% OFF
  },
  // 95. Uncharted: The Lost Legacy (PS4)
  "uncharted-the-lost-legacy-ps4-preowned": {
    name: "Uncharted: The Lost Legacy (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 96. Tomb Raider I-III Remastered (PS5)
  "tomb-raider-i-iii-remastered-ps5-preowned": {
    name: "Tomb Raider I-III Remastered (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 97. The Last of Us Remastered (PS4)
  "the-last-of-us-remastered-ps4-preowned": {
    name: "The Last of Us Remastered (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 98. UFC 4 (PS4)
  "ufc-4-ps4-preowned": {
    name: "UFC 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 99. WWE 2K18 (PS4)
  "wwe-2k18-ps4-preowned": {
    name: "WWE 2K18 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 100. WWE 2K22 (PS5)
  "wwe-2k22-ps5-preowned": {
    name: "WWE 2K22 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2199,
    preownedPrice: 1319 // 40% OFF
  },
  // 101. Assassin's Creed IV Black Flag (PS4)
  "assassins-creed-iv-black-flag-ps4-preowned": {
    name: "Assassin's Creed IV Black Flag (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 102. Assassin's Creed Syndicate (PS4)
  "assassins-creed-syndicate-ps4-preowned": {
    name: "Assassin's Creed Syndicate (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 103. FIFA 23 (PS5)
  "fifa-23-ps5-preowned": {
    name: "FIFA 23 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 104. Watch Dogs Legion (PS5)
  "watch-dogs-legion-ps5-preowned": {
    name: "Watch Dogs Legion (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1899,
    preownedPrice: 1139 // 40% OFF
  },
  // 105. Assassin's Creed Unity (PS4)
  "assassins-creed-unity-ps4-preowned": {
    name: "Assassin's Creed Unity (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 106. Days Gone (PS4)
  "days-gone-ps4-preowned": {
    name: "Days Gone (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 107. Horizon Zero Dawn Complete Edition (PS4)
  "horizon-zero-dawn-complete-edition-ps4-preowned": {
    name: "Horizon Zero Dawn Complete Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 108. Among Us: Crewmate Edition (PS4)
  "among-us-crewmate-edition-ps4-preowned": {
    name: "Among Us: Crewmate Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 109. Deathloop (PS5)
  "deathloop-ps5-preowned": {
    name: "Deathloop (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 110. Assassin's Creed Valhalla (PS5)
  "assassins-creed-valhalla-ps5-preowned": {
    name: "Assassin's Creed Valhalla (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 111. Call of Duty: Advanced Warfare (PS4)
  "call-of-duty-advanced-warfare-ps4-preowned": {
    name: "Call of Duty: Advanced Warfare (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 112. Call of Duty: Black Ops III (PS4)
  "call-of-duty-black-ops-iii-ps4-preowned": {
    name: "Call of Duty: Black Ops III (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1699,
    preownedPrice: 1019 // 40% OFF
  },
  // 113. Battlefield 2042 (PS5)
  "battlefield-2042-ps5-preowned": {
    name: "Battlefield 2042 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 114. FIFA 15 (PS4)
  "fifa-15-ps4-preowned": {
    name: "FIFA 15 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 799,
    preownedPrice: 479 // 40% OFF
  },
  // 115. Marvel's Avengers (PS4)
  "marvels-avengers-ps4-preowned": {
    name: "Marvel's Avengers (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 116. Nioh Collection (PS5)
  "nioh-collection-ps5-preowned": {
    name: "Nioh Collection (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 117. FC 24 (PS5)
  "fc-24-ps5-preowned": {
    name: "FC 24 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2999,
    preownedPrice: 1799 // 40% OFF
  },
  // 118. FIFA 23 (PS5 - Custom Cover)
  "fifa-23-ps5-custom-cover-preowned": {
    name: "FIFA 23 (PS5 - Custom Cover)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2299,
    preownedPrice: 1379 // 40% OFF
  },
  // 119. GTA 5 (PS4 - Custom Cover)
  "gta-5-ps4-custom-cover-preowned": {
    name: "GTA 5 (PS4 - Custom Cover)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1899,
    preownedPrice: 1139 // 40% OFF
  },
  // 120. Naruto Shippuden: Ultimate Ninja Storm 4 (PS4)
  "naruto-shippuden-ultimate-ninja-storm-4-ps4-preowned": {
    name: "Naruto Shippuden: Ultimate Ninja Storm 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 121. PlayerUnknown's Battlegrounds (PS4)
  "playerunknowns-battlegrounds-ps4-preowned": {
    name: "PlayerUnknown's Battlegrounds (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 999,
    preownedPrice: 599 // 40% OFF
  },
  // 122. Sleeping Dogs: Definitive Edition (PS4)
  "sleeping-dogs-definitive-edition-ps4-preowned": {
    name: "Sleeping Dogs: Definitive Edition (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 123. Uncharted 4: A Thief's End (PS4)
  "uncharted-4-a-thiefs-end-ps4-preowned": {
    name: "Uncharted 4: A Thief's End (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 124. WWE 2K23 (PS5)
  "wwe-2k23-ps5-preowned": {
    name: "WWE 2K23 (PS5)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 125. Spider-Man (PS5 - Custom Cover)
  "spider-man-ps5-custom-cover-preowned": {
    name: "Spider-Man (PS5 - Custom Cover)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2499,
    preownedPrice: 1499 // 40% OFF
  },
  // 126. Resident Evil 4 (PS4)
  "resident-evil-4-ps4-preowned": {
    name: "Resident Evil 4 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 127. The Last of Us Part II (PS4)
  "the-last-of-us-part-ii-ps4-preowned": {
    name: "The Last of Us Part II (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1999,
    preownedPrice: 1199 // 40% OFF
  },
  // 128. The Witcher 3: Wild Hunt (PS4)
  "the-witcher-3-wild-hunt-ps4-preowned": {
    name: "The Witcher 3: Wild Hunt (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1799,
    preownedPrice: 1079 // 40% OFF
  },
  // 129. Uncharted: The Nathan Drake Collection (PS4)
  "uncharted-the-nathan-drake-collection-ps4-preowned": {
    name: "Uncharted: The Nathan Drake Collection (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1499,
    preownedPrice: 899 // 40% OFF
  },
  // 130. Watch Dogs (PS4)
  "watch-dogs-ps4-preowned": {
    name: "Watch Dogs (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 1299,
    preownedPrice: 779 // 40% OFF
  },
  // 131. Cricket 24 (PS5 - Custom Cover)
  "cricket-24-ps5-custom-cover-preowned": {
    name: "Cricket 24 (PS5 - Custom Cover)",
    platform: "PS5",
    source: "Amazon.in",
    amazonPrice: 2799,
    preownedPrice: 1679 // 40% OFF
  },
  // 132. FIFA 18 (PS4)
  "fifa-18-ps4-preowned": {
    name: "FIFA 18 (PS4)",
    platform: "PS4",
    source: "Amazon.in",
    amazonPrice: 999,
    preownedPrice: 599 // 40% OFF
  }
};

async function executeStrictAmazonReprice() {
  console.log('Fetching pre-owned games from Supabase...');
  const { data: dbGames, error } = await supabase
    .from('products')
    .select('id, name, platform, mrp, price, discount_percent')
    .eq('category', 'preowned_games');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${dbGames.length} games in Supabase database.`);

  const updates = [];
  const sqlStatements = [
    `-- ============================================================================`,
    `-- DJN TECH - STRICT AMAZON.IN ONLY PRICING SYNCHRONIZATION`,
    `-- Sourced strictly from Amazon India (amazon.in) only.`,
    `-- Formula: MRP = Amazon.in Retail Price | Selling Price = 60% of Amazon Price (40% OFF)`,
    `-- Total pre-owned games: ${dbGames.length}`,
    `-- Generated: ${new Date().toISOString()}`,
    `-- ============================================================================\n`
  ];

  let unmapped = [];
  for (const g of dbGames) {
    const entry = AMAZON_ONLY_GAMES_PRICING[g.id];
    if (!entry) {
      unmapped.push(g);
      continue;
    }

    const amazonPrice = entry.amazonPrice;
    const preownedPrice = entry.preownedPrice;
    const discountPercent = 40;

    updates.push({
      id: g.id,
      name: entry.name,
      platform: entry.platform,
      amazonPrice,
      preownedPrice,
      discountPercent
    });

    sqlStatements.push(`UPDATE public.products SET
    mrp = ${amazonPrice},
    price = ${preownedPrice},
    discount_percent = ${discountPercent},
    updated_at = NOW()
WHERE id = '${g.id}';`);
  }

  if (unmapped.length > 0) {
    console.error('WARNING: Unmapped games found:', unmapped.map(u => ({ id: u.id, name: u.name })));
    return;
  }

  console.log(`✓ 100% (${updates.length} / ${dbGames.length}) of database games mapped strictly to Amazon.in!`);

  // Write SQL Migration
  const sqlPath = 'supabase/reprice_strictly_amazon_only.sql';
  fs.writeFileSync(sqlPath, sqlStatements.join('\n'), 'utf8');
  console.log(`✓ Saved SQL migration to ${sqlPath}`);

  // Apply Live Updates in Supabase
  console.log(`\nExecuting live Supabase batch updates for all ${updates.length} games...`);
  let successCount = 0;
  for (const u of updates) {
    const { error: upErr } = await supabase
      .from('products')
      .update({
        mrp: u.amazonPrice,
        price: u.preownedPrice,
        discount_percent: u.discountPercent,
        updated_at: new Date().toISOString()
      })
      .eq('id', u.id);

    if (upErr) {
      console.error(`✗ Error updating ${u.name} (${u.id}):`, upErr.message);
    } else {
      successCount++;
    }
  }

  console.log(`\n✓ Supabase Live Update Complete: ${successCount} / ${updates.length} games updated!`);
  console.log(`Source for all items: 100% Amazon.in strictly`);
  console.log(`Discount applied: Exactly 40% OFF across the entire pre-owned game catalog!`);
}

executeStrictAmazonReprice().catch(console.error);
