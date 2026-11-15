-- ============================================================================
-- DJN TECH - ADD 6 NINTENDO SWITCH PRE-OWNED GAMES
-- Category: preowned_games | Platform: Switch | Condition: Pre-Owned Grade A+
-- 4 Games: ONLY GAME CARD (Loose cartridge without retail box)
-- 2 Games: WITH BOX (Complete with original case and cover art)
-- ============================================================================

-- 1. FIFA 20 (Nintendo Switch) (Only Game Card) - ₹1,200
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'fifa-20-switch-preowned',
  'FIFA 20 (Nintendo Switch) (Only Game Card)',
  'EA Sports · Only Game Card (No Box) · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  3499,
  1200,
  65,
  4.6,
  52,
  TRUE,
  10,
  'ONLY GAME CARD',
  '["Authentic Nintendo Switch Game Card (Loose cartridge, retail box not included)", "100% verified optical & terminal pin contact test passed", "Portable FIFA football action on Nintendo Switch with updated squads and kits", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Experience FIFA 20 on Nintendo Switch with authentic kits, clubs, and squads from top leagues around the world. Please note: This item includes the authentic game card only; the original retail plastic case is not included. Fully tested and certified by DJN Tech.',
  '["1x Nintendo Switch Game Card (Only Game Card - No Box)"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested authentic game card, clean pins)',
  'Sports / Football Simulation',
  '#0284c7',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r3k.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;

-- 2. Super Mario Odyssey (Nintendo Switch) (Only Game Card) - ₹3,000
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'super-mario-odyssey-switch-preowned',
  'Super Mario Odyssey (Nintendo Switch) (Only Game Card)',
  'Nintendo · Only Game Card (No Box) · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  4999,
  3000,
  40,
  4.9,
  148,
  TRUE,
  10,
  'ONLY GAME CARD',
  '["Authentic Nintendo Switch Game Card (Loose cartridge, retail box not included)", "100% verified terminal pin contact and full game boot test passed", "Join Mario and his ally Cappy on a massive 3D sandbox globe-trotting adventure", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Embark on a captivating 3D adventure through massive sandbox kingdoms with Mario and his companion Cappy. Please note: This item includes the authentic game card only; the original retail plastic case is not included. Fully tested and certified by DJN Tech.',
  '["1x Nintendo Switch Game Card (Only Game Card - No Box)"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested authentic game card, clean pins)',
  'Platformer / 3D Adventure',
  '#dc2626',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co1m35.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;

-- 3. Minecraft (Nintendo Switch) (Only Game Card) - ₹1,700
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'minecraft-switch-preowned',
  'Minecraft (Nintendo Switch) (Only Game Card)',
  'Mojang Studios · Only Game Card (No Box) · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  2999,
  1700,
  43,
  4.8,
  98,
  TRUE,
  10,
  'ONLY GAME CARD',
  '["Authentic Nintendo Switch Game Card (Loose cartridge, retail box not included)", "100% verified terminal pin contact and save data test passed", "Explore randomly generated worlds and build grand creations anywhere you go", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Create anything you can imagine in Minecraft on Nintendo Switch. Build, explore, and survive on the go. Please note: This item includes the authentic game card only; the original retail plastic case is not included. Fully tested and verified by DJN Tech.',
  '["1x Nintendo Switch Game Card (Only Game Card - No Box)"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested authentic game card, clean pins)',
  'Sandbox / Survival',
  '#16a34a',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co8431.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;

-- 4. AO Tennis 2 (Nintendo Switch) (Only Game Card) - ₹1,200
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'ao-tennis-2-switch-preowned',
  'AO Tennis 2 (Nintendo Switch) (Only Game Card)',
  'Big Ant Studios · Only Game Card (No Box) · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  3499,
  1200,
  65,
  4.6,
  36,
  TRUE,
  10,
  'ONLY GAME CARD',
  '["Authentic Nintendo Switch Game Card (Loose cartridge, retail box not included)", "100% verified terminal pin contact and complete match loading test passed", "Comprehensive tennis simulation with full career mode and community academy", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'AO Tennis 2 is the premier tennis experience designed for and by its passionate community. Play on the road with Nintendo Switch. Please note: This item includes the authentic game card only; the original retail plastic case is not included. Fully tested by DJN Tech.',
  '["1x Nintendo Switch Game Card (Only Game Card - No Box)"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested authentic game card, clean pins)',
  'Sports / Tennis Simulation',
  '#0284c7',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1072500/library_600x900.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;

-- 5. Nintendo Switch Sports (Nintendo Switch) (With Box) - ₹3,000
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'nintendo-switch-sports-preowned',
  'Nintendo Switch Sports (Nintendo Switch) (With Box)',
  'Nintendo · Complete with Original Retail Case · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  4499,
  3000,
  33,
  4.8,
  82,
  TRUE,
  10,
  'WITH BOX',
  '["Complete with original Nintendo Switch retail plastic case and authentic cover artwork", "Play Soccer, Volleyball, Bowling, Tennis, Badminton, and Chambara with motion controls", "100% verified game card and pristine retail case inspected by DJN Tech", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Swing, kick, and spike your way to victory in Nintendo Switch Sports. Complete with original case and game card. Fully tested and certified by DJN Tech.',
  '["1x Nintendo Switch Game Card", "1x Original Nintendo Switch Case with Cover Art"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, complete in original retail case)',
  'Sports / Motion Party Game',
  '#059669',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co4apq.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;

-- 6. Mario Kart 8 Deluxe (Nintendo Switch) (With Box) - ₹3,000
INSERT INTO public.products (
  id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
  rating, review_count, in_stock, stock_count, badge, features, description,
  in_the_box, warranty, disc_condition, genre, theme_color, image_url, reviews
) VALUES (
  'mario-kart-8-deluxe-switch-preowned',
  'Mario Kart 8 Deluxe (Nintendo Switch) (With Box)',
  'Nintendo · Complete with Original Retail Case · Pre-Owned Grade A+',
  'preowned_games',
  'Switch',
  'Pre-Owned Grade A+',
  4999,
  3000,
  40,
  4.9,
  176,
  TRUE,
  10,
  'WITH BOX',
  '["Complete with original Nintendo Switch retail plastic case and authentic cover artwork", "Definitive version of Mario Kart 8 featuring 48 race courses and revamped Battle Mode", "100% verified game card and pristine retail case inspected by DJN Tech", "1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)"]'::jsonb,
  'Hit the road with the definitive version of Mario Kart 8 Deluxe on Nintendo Switch. Race your friends or battle them in a revised battle mode. Complete with original case and game card. Fully tested by DJN Tech.',
  '["1x Nintendo Switch Game Card", "1x Original Nintendo Switch Case with Cover Art"]'::jsonb,
  '1 Month Shop Warranty on all Preowned consoles (Warranty does not cover physical and liquid damage)',
  'Grade A+ (Tested, complete in original retail case)',
  'Racing / Kart Racing',
  '#dc2626',
  'https://images.igdb.com/igdb/image/upload/t_cover_big/co1te8.jpg',
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
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  description = EXCLUDED.description,
  in_the_box = EXCLUDED.in_the_box,
  warranty = EXCLUDED.warranty,
  disc_condition = EXCLUDED.disc_condition,
  image_url = EXCLUDED.image_url;
