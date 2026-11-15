-- ============================================================================
-- DJN TECH - ADD 15 GAMES FROM CLIENT WHATSAPP INVENTORY
-- Total Items: 15 games across PS4 and PS5
-- ============================================================================

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'agents-of-mayhem-ps4-preowned',
  'Agents of Mayhem (PS4)',
  'Deep Silver & Volition · Open-World Superhero Action · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2499,
  800,
  68,
  4.6,
  42,
  TRUE,
  10,
  'ACTION',
  '["Fast-paced open world combat set in a futuristic neo-Seoul","Seamlessly switch between a squad of 3 distinct agents during combat","Optical laser seek verified disc with 100% full game installation passed","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'In Agents of Mayhem, you run a no-holds-barred operation against a shadowy supervillain organization. Recruit a squad of 12 distinct characters with unique powers, gadgets, and special abilities. Fully tested and certified by DJN Tech.',
  '["PS4 Game Disc (Agents of Mayhem)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Action / Third-Person Shooter',
  '#8b5cf6',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304530/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'assassins-creed-chronicles-ps4-preowned',
  'Assassin''s Creed Chronicles (PS4)',
  'Ubisoft · China, India & Russia Trilogy · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2499,
  800,
  68,
  4.6,
  53,
  TRUE,
  10,
  'STEALTH',
  '["Complete trilogy collection: Chronicles China, Chronicles India, and Chronicles Russia","Stunning 2.5D stealth mechanics with beautiful water-color and brush stroke aesthetics","Master the Eagle Vision, agile rooftop parkour, and lethal martial arts assassinations","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Experience three distinct civilizations and periods throughout history: the Ming Dynasty collapse in China, the Sikh Empire war in India, and the Red October aftermath in Russia. Fully tested and certified by DJN Tech.',
  '["PS4 Game Disc (Assassin''s Creed Chronicles Trilogy)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Stealth / Action Adventure',
  '#ea580c',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x9r.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'sleeping-dogs-definitive-ps4-preowned',
  'Sleeping Dogs: Definitive Edition (PS4)',
  'Square Enix · Hong Kong Undercover Thriller · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2499,
  800,
  68,
  4.8,
  89,
  TRUE,
  10,
  'CRIME THRILLER',
  '["Acclaimed undercover cop martial arts action drama set in vibrant Hong Kong","Includes all 24 DLC expansion packs with upgraded 1080p graphics and high-res audio","Devastating martial arts combos, high-speed car chases, and explosive gunfights","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Welcome to Hong Kong, a vibrant neon city teeming with life, whose exotic locations and busy streets hide one of the most powerful and dangerous criminal organizations in the world: the Triads. Fully tested and certified by DJN Tech.',
  '["PS4 Game Disc (Sleeping Dogs: Definitive Edition)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Action / Open World Martial Arts',
  '#dc2626',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307690/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'mortal-kombat-xl-ps4-preowned',
  'Mortal Kombat XL (PS4)',
  'NetherRealm Studios · Definitive Kombat Roster · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2999,
  900,
  70,
  4.8,
  112,
  TRUE,
  10,
  'FIGHTING',
  '["Includes full Mortal Kombat X game plus Kombat Pack 1 and Kombat Pack 2","Features iconic guest fighters Alien, Predator, Jason Voorhees, and Leatherface","Uncensored cinematic story mode and gory Fatalities in smooth 60fps","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Mortal Kombat XL offers the definitive experience of the legendary fighting franchise. Features full story mode and the complete Kombat Pack characters. Fully tested and certified by DJN Tech.',
  '["PS4 Game Disc (Mortal Kombat XL)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Fighting / Action',
  '#eab308',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'pro-evolution-soccer-ps4-preowned',
  'Pro Evolution Soccer (PES) (PS4)',
  'Konami · Authentic Tactical Football Simulation · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  1999,
  500,
  75,
  4.7,
  58,
  TRUE,
  10,
  'FOOTBALL',
  '["True-to-life football simulation with realistic ball physics and first-touch control","Master League management mode, Matchday live tournaments, and offline 4-player co-op","Official club licenses with highly detailed stadium atmospheres and player scans","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Experience pure football gameplay with Konami''s acclaimed PES simulation engine. Featuring precise passing, realistic ball trajectory, and tactical team management. Fully tested and certified by DJN Tech.',
  '["PS4 Game Disc (Pro Evolution Soccer)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Sports / Football Simulation',
  '#0284c7',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/996470/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'don-bradman-cricket-ps4-preowned',
  'Don Bradman Cricket (PS4)',
  'Big Ant Studios · Real Cricket Physics · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2499,
  700,
  72,
  4.7,
  76,
  TRUE,
  10,
  'CRICKET',
  '["Physics-based cricket simulator with full 360-degree shot control","20-year career mode from amateur club matches up to international captaincy","Community Cricket Academy with thousands of real community teams and players","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Don Bradman Cricket delivers authentic, realistic cricket mechanics. Experience true bat-and-ball physics with zero artificial assist. Fully tested and verified by DJN Tech.',
  '["PS4 Game Disc (Don Bradman Cricket)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Sports / Cricket',
  '#16a34a',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/288120/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'lego-marvel-super-heroes-ps4-preowned',
  'LEGO Marvel Super Heroes (PS4)',
  'Warner Bros · Over 100 Playable Super Heroes · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2499,
  800,
  68,
  4.9,
  145,
  TRUE,
  10,
  'SUPER HEROES',
  '["Smash, swing, and fly as Iron Man, Spider-Man, the Hulk, Captain America, and Wolverine","Original Marvel storyline as heroes unite to prevent Loki and villains from building a superweapon","Free roam through a massive LEGO Manhattan and visit Stark Tower, the X-Mansion, and Asgard","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'LEGO Marvel Super Heroes features an original story crossing the entire Marvel Universe. Players take control of Iron Man, Spider-Man, the Hulk, and many more as they unite to stop villains. Fully tested by DJN Tech.',
  '["PS4 Game Disc (LEGO Marvel Super Heroes)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Action Adventure / Marvel',
  '#b91c1c',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/249130/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'lego-jurassic-world-ps4-preowned',
  'LEGO Jurassic World (PS4)',
  'Warner Bros · 4 Jurassic Blockbuster Films · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2999,
  900,
  70,
  4.8,
  67,
  TRUE,
  10,
  'FAMILY FAVORITE',
  '["Relive iconic scenes from Jurassic Park, The Lost World, Jurassic Park III, and Jurassic World","Choose from 20 playable LEGO dinosaurs, including the mighty T. rex and deadly Raptor","Fun 2-player drop-in drop-out co-op gameplay perfect for kids and families","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Following the epic storylines of Jurassic Park, The Lost World: Jurassic Park, Jurassic Park III, and Jurassic World, LEGO Jurassic World is the first videogame where players can relive all four film adventures. Fully tested by DJN Tech.',
  '["PS4 Game Disc (LEGO Jurassic World)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Adventure / Family Co-op',
  '#059669',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/352400/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'madden-nfl-15-ps4-preowned',
  'Madden NFL 15 (PS4)',
  'EA Sports · Defensive War & Gridiron Action · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  1999,
  500,
  75,
  4.6,
  38,
  TRUE,
  10,
  'NFL SPORTS',
  '["Overhauled defensive gameplay with dynamic pass rush moves and tackling mechanics","NFL Films broadcast presentation with pre-game shows and detailed sideline animations","Deep Connected Franchise and Madden Ultimate Team game modes","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Madden NFL 15 transforms defense into a thrilling experience on PlayStation 4. Featuring all-new pass rush mechanics and an intuitive tackling system. Fully tested by DJN Tech.',
  '["PS4 Game Disc (Madden NFL 15)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Sports / American Football',
  '#1e3a8a',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co20u8.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'prince-of-persia-the-lost-crown-ps5-preowned',
  'Prince of Persia: The Lost Crown (PS5)',
  'Ubisoft Montpellier · Mythological Persian Action · Pre-Owned Grade A+',
  'preowned_games',
  'PS5',
  'Pre-Owned Grade A+',
  3499,
  1500,
  57,
  4.9,
  104,
  TRUE,
  10,
  'PS5 METROIDVANIA',
  '["Acrobatic mythological Persian Metroidvania platformer from the creators of Rayman Legends","Wield deadly dual blades and manipulate time powers to defeat corrupted creatures and bosses","Ultra-responsive 4K 120 FPS high-frame-rate performance on PlayStation 5","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Dash into a stylish and thrilling action-adventure platformer set in a mythological Persian world where the boundaries of time and space are yours to manipulate. Play as Sargon and grow from sword-wielding prodigy into an extraordinary legend. Fully tested by DJN Tech.',
  '["PS5 Game Disc (Prince of Persia: The Lost Crown)","Official Retail White PS5 Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Action Adventure / Metroidvania',
  '#d97706',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2751000/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'mafia-iii-ps4-preowned',
  'Mafia III (PS4)',
  '2K Games · 1968 New Bordeaux Crime Epic · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  2999,
  900,
  70,
  4.7,
  84,
  TRUE,
  10,
  'OPEN WORLD',
  '["Immersive 1968 New Bordeaux open world inspired by New Orleans with authentic era soundtrack","Build your criminal empire, allocate turf to underbosses, and exact revenge on the Italian Mob","Brutal stealth takedowns, intense cover gunplay, and white-knuckle muscle car driving","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'It''s 1968 and after years of combat in Vietnam, Lincoln Clay knows this truth: family isn''t who you''re born with, it''s who you die for. Build a new family on the ashes of the old. Fully tested and verified by DJN Tech.',
  '["PS4 Game Disc (Mafia III)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Action / Crime Open World',
  '#475569',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  '007-first-light-ps5-new',
  '007 First Light (PS5)',
  'IO Interactive · Official James Bond Origin Story · Brand New Sealed',
  'preowned_games',
  'PS5',
  'Brand New Sealed',
  5999,
  5600,
  7,
  5,
  48,
  TRUE,
  10,
  'BRAND NEW SEALED',
  '["Original James Bond origin story created by IO Interactive (creators of Hitman trilogy)","Cinematic third-person stealth, high-stakes espionage, and intense combat action","Travel to exotic locations across the globe with classic MI6 spy gadgets and covert vehicles","Brand New Factory Sealed Indian Retail Edition with Store Warranty"]'::jsonb,
  'Step into the shoes of a young James Bond in 007 First Light as he undergoes MI6 training to earn his coveted Double-O status. Developed by the masterminds behind Hitman. Brand New Sealed physical edition.',
  '["PS5 Official Case (Brand New Sealed)","007 First Light Blu-ray Disc","MI6 Dossier Insert"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Brand New Factory Sealed',
  'Action / Espionage Stealth',
  '#0f172a',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co2k7m.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'cricket-22-ps5-preowned',
  'Cricket 22 (PS5)',
  'Big Ant Studios · Next-Gen Ashes & T20 Leagues · Pre-Owned Grade A+',
  'preowned_games',
  'PS5',
  'Pre-Owned Grade A+',
  3999,
  1500,
  62,
  4.8,
  94,
  TRUE,
  10,
  'PS5 CRICKET',
  '["Official cricket game of The Ashes, Big Bash, The Hundred, and Caribbean Premier League","Enhanced bowling, batting, and fielding mechanics with DualSense haptic feedback","Native 4K resolution and smooth 60 FPS visual performance on PlayStation 5","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Cricket 22 delivers the most robust, substantial game of cricket that fans have ever seen. Enjoy full licensed competitions, enhanced depth in career mode, and advanced visual presentation on PS5. Fully tested by DJN Tech.',
  '["PS5 Game Disc (Cricket 22)","Official Retail White PS5 Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Sports / Cricket Simulation',
  '#047857',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1701330/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'killzone-shadow-fall-ps4-preowned',
  'Killzone Shadow Fall (PS4)',
  'Guerrilla Games · Futuristic Sci-Fi Shooter · Pre-Owned Grade A+',
  'preowned_games',
  'PS4',
  'Pre-Owned Grade A+',
  1999,
  500,
  75,
  4.6,
  72,
  TRUE,
  10,
  'SCI-FI FPS',
  '["Visually stunning futuristic sci-fi first-person shooter set in divided Vekta City","Command the OWL combat drone for tactical shields, ziplining, hacking, and stun blasts","Deep multiplayer and engrossing campaign against the Helghast threat","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Set thirty years after the events of Killzone 3, the world is a very different place with two rival factions, the Helghast and the Vektans, living side by side divided by a colossal wall. Take on missions as a Shadow Marshal. Fully tested by DJN Tech.',
  '["PS4 Game Disc (Killzone Shadow Fall)","Official Retail Blue Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Shooter / Sci-Fi FPS',
  '#b91c1c',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7m.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;

INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'need-for-speed-unbound-ps5-preowned',
  'Need for Speed Unbound (PS5)',
  'EA Criterion · High-Octane Street Racing · Pre-Owned Grade A+',
  'preowned_games',
  'PS5',
  'Pre-Owned Grade A+',
  4499,
  1600,
  64,
  4.8,
  83,
  TRUE,
  10,
  'PS5 STREET RACING',
  '["Unique visual fusion of realistic street racing physics and vibrant graffiti anime effects","Battle through Lakeshore city competing in weekly qualifiers to conquer The Grand street race","Outsmart and outrun relentless police chases with tactical nitrous boosts and getaway routes","1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Race against time, outsmart the cops, and take on weekly qualifiers to reach The Grand, Lakeshore''s ultimate street racing challenge. Experience smooth 4K 60fps racing on PlayStation 5. Fully tested by DJN Tech.',
  '["PS5 Game Disc (Need for Speed Unbound)","Official Retail White PS5 Case"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, clean disc, original case)',
  'Racing / Arcade Street Racing',
  '#a855f7',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/library_600x900.jpg',
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_percent = EXCLUDED.discount_percent,
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  platform = EXCLUDED.platform,
  condition = EXCLUDED.condition,
  in_stock = TRUE,
  stock_count = EXCLUDED.stock_count,
  image_url = EXCLUDED.image_url;
