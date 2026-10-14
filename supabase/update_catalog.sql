-- ============================================================================
-- DJN TECH - CATALOG UPDATE SQL MIGRATION
-- Project: DJN Tech Gaming Store (rudqiwifokllmjpfcnbp.supabase.co)
-- Description:
--   1. Inserts / Updates the exact requested Consoles, Controllers, and Accessories:
--      - Playstation 5 DualSense controller White (₹4,100)
--      - Playstation 5 DualSense controller Black (₹4,200)
--      - Xbox Series Controller (₹4,200)
--      - Playstation 5 Slim Disc Edition 1TB (₹62,000)
--      - Playstation 5 Standard Disc Edition 825GB (₹55,000)
--      - Playstation 4 Slim 1TB (₹22,000)
--      - Playstation 4 Slim 500GB (₹21,000)
--      - Playstation 4 Standard 500GB (₹18,000)
--      - Playstation 5 Disc Drive (₹9,000)
--      - Xbox Rechargeable Battery Pack (₹800)
--   2. Keeps ALL PlayStation 4 Games & PlayStation 5 Games (from the photos)
--   3. Deletes any consoles, controllers, accessories, or other products NOT in the list.
-- ============================================================================

-- STEP 1: UPSERT THE EXACT SPECIFIED HARDWARE & ACCESSORIES
INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, color, theme_color, genre, storage, edition,
    image_url, reviews
) VALUES
-- ----------------------------------------------------------------------------
-- 1. CONTROLLER: PlayStation 5 DualSense Controller White (₹4,100)
-- ----------------------------------------------------------------------------
(
    'dualsense-white',
    'PlayStation 5 DualSense Wireless Controller (White)',
    'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone · 3.5mm Jack',
    'controllers',
    'PS5',
    'Brand New Sealed',
    5990,
    4100,
    32,
    4.9,
    74,
    TRUE,
    12,
    'POPULAR',
    '["Immersive haptic feedback brings in-game actions alive in your hands","Dynamic adaptive triggers with customizable resistance levels","Integrated microphone and 3.5mm headset jack for seamless team chat","Create button to record and broadcast your most epic gaming moments","Signature two-tone ergonomic comfort with high-traction analog grips"]'::jsonb,
    'Discover a deeper, highly immersive gaming experience with the iconic two-tone White PS5 DualSense wireless controller. Featuring groundbreaking haptic feedback, dynamic adaptive triggers, and a built-in microphone, all integrated into an iconic ergonomic design.',
    '["PS5 DualSense Wireless Controller (White)","Quick-Start User Manual","Official Manufacturer Warranty Card"]'::jsonb,
    '1 Year Official Sony India Warranty + DJN Assured Support',
    NULL,
    'White',
    '#00439c',
    'Official Wireless Controller',
    NULL,
    'Standard White Edition',
    '/dualsense-white.jpg',
    '[{"id":"rev-ds-w1","userName":"Rohan Mehta","userLocation":"Mumbai","rating":5,"date":"2 days ago","title":"Authentic Sony India unit, superb feel!","comment":"Received brand new sealed box with original Indian warranty seal. The white finish looks ultra clean and haptics on Astro Bot are unbelievable.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 2. CONTROLLER: PlayStation 5 DualSense Controller Black (₹4,200)
-- ----------------------------------------------------------------------------
(
    'dualsense-midnight-black',
    'PlayStation 5 DualSense Wireless Controller (Midnight Black)',
    'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone · Stealth Finish',
    'controllers',
    'PS5',
    'Brand New Sealed',
    6390,
    4200,
    34,
    4.9,
    56,
    TRUE,
    10,
    'BESTSELLER',
    '["Tactile haptic feedback simulating authentic in-game physical sensations","Adaptive triggers simulating weapon draw and accelerator resistance","Built-in microphone and 3.5mm audio jack for team voice communication","Matte Midnight Black stealth color scheme with subtle blue accent lighting"]'::jsonb,
    'Ignite your gaming nights with the sleek Midnight Black DualSense wireless controller. Features advanced haptic feedback, dynamic adaptive triggers, and an integrated microphone in a stealth dark silhouette.',
    '["PS5 DualSense Wireless Controller (Midnight Black)","User Manual","Official Sony Warranty Card"]'::jsonb,
    '1 Year Official Sony India Warranty + DJN Assured Support',
    NULL,
    'Midnight Black',
    '#090d16',
    'Official Wireless Controller',
    NULL,
    'Midnight Black Edition',
    '/hero-dualsense.png',
    '[{"id":"rev-ds-b1","userName":"Prashant Iyer","userLocation":"Chennai","rating":5,"date":"4 days ago","title":"Tactile triggers and stealth finish","comment":"Midnight Black looks far better in person than standard white. Triggers work brilliantly with Astro Bot and Gran Turismo 7. 100% genuine Sony packaging.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 3. CONTROLLER: Xbox Series Controller (₹4,200)
-- ----------------------------------------------------------------------------
(
    'xbox-series-controller',
    'Xbox Wireless Controller (Series X|S)',
    'Textured Grip · Hybrid D-Pad · Bluetooth & Xbox Wireless · 40hr Battery Life',
    'controllers',
    'Xbox',
    'Brand New Sealed',
    5990,
    4200,
    30,
    4.8,
    42,
    TRUE,
    8,
    'CROSS-PLATFORM',
    '["Sculpted surfaces and refined geometry for enhanced hand comfort during gameplay","Hybrid D-pad and textured grip on triggers, bumpers, and back-case","Seamlessly capture and share screenshots and clips with dedicated Share button","Xbox Wireless and Bluetooth technology for gaming on console, PC, mobile"]'::jsonb,
    'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay. Stay on target with textured grip and a hybrid D-pad.',
    '["Xbox Wireless Controller","2 AA Alkaline Batteries","Setup Guide"]'::jsonb,
    '1 Year Official Microsoft India Warranty',
    NULL,
    'Carbon Black',
    '#107c10',
    'Official Wireless Controller',
    NULL,
    'Series X|S Edition',
    '/xbox-series-controller.jpg',
    '[{"id":"rev-xb-1","userName":"Sameer Deshmukh","userLocation":"Pune","rating":5,"date":"5 days ago","title":"Great grip and PC Bluetooth pairing","comment":"Works flawlessly on both my Xbox and Windows PC. Very comfortable textured triggers and rock-solid build.","verifiedBuyer":true,"platformPlayed":"Xbox"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 4. CONSOLE: PlayStation 5 Slim Disc Edition 1TB (₹62,000)
-- ----------------------------------------------------------------------------
(
    'ps5-slim-disc',
    'PlayStation 5 Slim (Disc Edition) 1TB',
    '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray Optical Drive',
    'consoles',
    'PS5',
    'Brand New Sealed',
    64990,
    62000,
    5,
    4.9,
    58,
    TRUE,
    5,
    'FLAGSHIP',
    '["Slimmer chassis with 1TB ultra-high speed internal PCIe Gen4 NVMe SSD","Ultra HD Blu-ray optical disc drive included","DualSense wireless controller with haptic feedback & adaptive triggers","Tempest 3D AudioTech and up to 120 fps with 120Hz 4K HDR video output","Official 1 Year Sony India Manufacturer Warranty"]'::jsonb,
    'Experience lightning-fast loading with an ultra-high speed 1TB SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games in a sleek, compact slim form factor.',
    '["PS5 Slim Console (Disc Model)","DualSense Wireless Controller (White)","1TB SSD (Installed)","HDMI 2.1 Cable","AC Power Cord","USB-C Cable","Horizontal Stand Feet","Astro''s Playroom pre-installed"]'::jsonb,
    '1 Year Official Sony India Warranty + DJN Assured Support',
    NULL,
    NULL,
    '#00439c',
    'Next-Gen Gaming Console',
    '1TB SSD',
    'Slim Disc Edition 1TB',
    '/hero-ps5-slim.png',
    '[{"id":"rev-ps5-slim-1","userName":"Aakash Verma","userLocation":"Delhi","rating":5,"date":"3 days ago","title":"Original Indian Sony Unit, Superb packaging!","comment":"Received brand new sealed box with original Indian warranty seal. Delivery was super fast within 48 hours. DJN Tech is 100% trustworthy for consoles!","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 5. CONSOLE: PlayStation 5 Standard Disc Edition 825GB (₹55,000)
-- ----------------------------------------------------------------------------
(
    'ps5-standard-disc-preowned',
    'PlayStation 5 Standard (Disc Edition) 825GB',
    '825GB High-Speed SSD · 4K HDR Blu-Ray · DJN 25-Point Bench Tested · Grade A+',
    'consoles',
    'PS5',
    'Brand New Sealed',
    59900,
    55000,
    8,
    4.8,
    44,
    TRUE,
    4,
    'ORIGINAL FAT',
    '["Robust launch revision with massive copper thermal cooling heat-sink","825GB ultra-high speed SSD with expandable M.2 NVMe slot","Ultra HD Blu-ray optical disc drive with 100% optical seek accuracy","Includes official Sony DualSense wireless controller","Protected under DJN Tech Comprehensive Hardware Guarantee"]'::jsonb,
    'The iconic original PlayStation 5 Standard Disc Edition. Built with high-grade thermal engineering, whisper-quiet liquid metal cooling, and ultra-high-speed SSD architecture for breathtaking next-generation gaming.',
    '["PlayStation 5 Standard Disc Console","Official DualSense Wireless Controller","HDMI 2.1 Cable","Power Cable","Vertical/Horizontal Base Stand"]'::jsonb,
    '1 Year Manufacturer / DJN Hardware Warranty + 7-Day Replacement Guarantee',
    NULL,
    NULL,
    '#00439c',
    'Next-Gen Gaming Console',
    '825GB SSD',
    'Standard Disc Edition 825GB',
    'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
    '[{"id":"rev-ps5-fat-1","userName":"Naveen Kumar","userLocation":"Bengaluru","rating":5,"date":"1 week ago","title":"Heavy duty cooling and silent","comment":"Console arrived in immaculate condition. Plays all my disc games without a glitch. DJN team assisted with doorstep delivery verification.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 6. CONSOLE: PlayStation 4 Slim 1TB (₹22,000)
-- ----------------------------------------------------------------------------
(
    'ps4-slim-1tb-preowned',
    'PlayStation 4 Slim (1TB Console)',
    '1TB Storage · Whisper Quiet · HDR Ready · Complete Kit with DualShock 4',
    'consoles',
    'PS4',
    'Pre-Owned Grade A+',
    29990,
    22000,
    27,
    4.9,
    85,
    TRUE,
    8,
    'TOP SELLER',
    '["Massive 1TB internal HDD holding 25+ blockbuster PlayStation games","Energy-efficient slim architecture that runs cool and whisper-quiet","Full HDR support for vibrant color reproduction on compatible TVs","Includes original Sony DualShock 4 V2 wireless controller","100% optical laser seek and motherboard diagnostic pass"]'::jsonb,
    'The golden standard for PlayStation gaming. The PS4 Slim 1TB delivers exceptional reliability, an immense library of award-winning titles, and effortless plug-and-play entertainment.',
    '["PlayStation 4 Slim 1TB Console","DualShock 4 Wireless Controller (Original V2)","HDMI Cable","Power Cable","USB Charging Cable"]'::jsonb,
    '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    NULL,
    NULL,
    '#003791',
    'Home Gaming Console',
    '1TB HDD',
    'Slim Edition (1TB)',
    'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    '[{"id":"rev-ps4-1tb-1","userName":"Vikram Malhotra","userLocation":"Chandigarh","rating":5,"date":"4 days ago","title":"Looks like new, huge storage!","comment":"Condition is literally Grade A+ without scratches. 1TB hard drive is super useful for GTA V, RDR2, and God of War. Great value!","verifiedBuyer":true,"platformPlayed":"PS4"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 7. CONSOLE: PlayStation 4 Slim 500GB (₹21,000)
-- ----------------------------------------------------------------------------
(
    'ps4-slim-500gb-preowned',
    'PlayStation 4 Slim (500GB Console)',
    '500GB HDD · Compact & Energy Efficient · HDR Ready · DJN Certified',
    'consoles',
    'PS4',
    'Pre-Owned Grade A+',
    27990,
    21000,
    25,
    4.8,
    53,
    TRUE,
    5,
    'VALUE PICK',
    '["Affordable entry into the legendary PlayStation ecosystem","500GB internal storage expandable via external USB 3.0 external drive","Plays the entire catalog of PS4 masterpieces with smooth 1080p output","Includes 1 original Sony DualShock 4 controller and all connection cables","Complete 25-point hardware bench stress-testing verified"]'::jsonb,
    'The most cost-effective way to play GTA V, God of War, The Last of Us, and FC 24 with authentic console performance without breaking the bank.',
    '["PlayStation 4 Slim 500GB Console","DualShock 4 Wireless Controller","HDMI Cable","Power Cable","USB Controller Cable"]'::jsonb,
    '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    NULL,
    NULL,
    '#003791',
    'Home Gaming Console',
    '500GB HDD',
    'Slim Edition (500GB)',
    'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=1000&q=80',
    '[{"id":"rev-ps4-500-1","userName":"Karan Shah","userLocation":"Ahmedabad","rating":5,"date":"6 days ago","title":"Smooth performance, prompt delivery","comment":"Bought for my younger brother. Works flawlessly and runs super quiet. DJN Tech customer support is very responsive.","verifiedBuyer":true,"platformPlayed":"PS4"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 8. CONSOLE: PlayStation 4 Standard 500GB (₹18,000)
-- ----------------------------------------------------------------------------
(
    'ps4-standard-500gb-preowned',
    'PlayStation 4 Standard (500GB Console)',
    'Classic Angled Design · Optical Audio Out · 500GB HDD · DJN Certified Grade A+',
    'consoles',
    'PS4',
    'Pre-Owned Grade A+',
    24990,
    18000,
    28,
    4.7,
    38,
    TRUE,
    4,
    'BUDGET CHAMPION',
    '["Original launch chassis with dual matte and gloss architectural styling","Built-in optical TOSLINK audio output port for dedicated sound systems","500GB internal hard drive holding favorite games","Includes authentic DualShock 4 wireless controller","Ultrasonic cleaned, fresh thermal paste serviced, and stress bench tested"]'::jsonb,
    'The iconic original PlayStation 4 that launched an era of gaming classics. Certified Grade A+ pre-owned unit thoroughly bench-tested, serviced, and bundled with authentic controller and cables.',
    '["PlayStation 4 Standard Console (Jet Black)","DualShock 4 Wireless Controller","HDMI Cable","AC Power Cord","Micro-USB Controller Cable"]'::jsonb,
    '1-Month DJN Tech Hardware Warranty + 7-Day Doorstep Replacement Guarantee',
    NULL,
    NULL,
    '#003791',
    'Home Gaming Console',
    '500GB HDD',
    'Original Standard "Fat" Edition',
    '/ps4-standard.jpg',
    '[{"id":"rev-ps4-std-1","userName":"Amit Sengupta","userLocation":"Kolkata","rating":5,"date":"1 week ago","title":"Unbeatable budget gaming console","comment":"For 18k, this is a steal. Plays all PS4 titles effortlessly. The optical audio port connects right into my soundbar. Very clean condition!","verifiedBuyer":true,"platformPlayed":"PS4"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 9. ACCESSORY: PlayStation 5 Disc Drive (₹9,000)
-- ----------------------------------------------------------------------------
(
    'ps5-disc-drive',
    'PlayStation 5 Disc Drive (for PS5 Slim & Pro)',
    'Ultra HD Blu-ray Optical Disc Player · Snap-In Installation · Official Sony Unit',
    'accessories',
    'PS5',
    'Brand New Sealed',
    10990,
    9000,
    18,
    4.9,
    29,
    TRUE,
    6,
    'OFFICIAL SONY',
    '["Official Sony Ultra HD Blu-ray optical disc drive add-on for PS5 Slim & PS5 Pro","Tool-free snap-in installation directly into console bay","Play 4K Ultra HD Blu-ray discs, standard Blu-ray discs, and DVDs","Enables pre-owned and physical game disc playback on digital slim consoles"]'::jsonb,
    'Upgrade your PlayStation 5 Digital Slim console to play physical disc games and 4K Ultra HD Blu-ray movies. Features seamless tool-free installation and official Sony integration.',
    '["PS5 Disc Drive Add-on Unit","Original White Matching Cover Panel","2 Horizontal Stand Feet (Long)","Instruction Manual"]'::jsonb,
    '1 Year Official Sony India Warranty',
    NULL,
    'White',
    '#00439c',
    'Console Optical Accessory',
    NULL,
    'Official Disc Drive Add-On',
    '/ps5-disc-drive.jpg',
    '[{"id":"rev-dd-1","userName":"Rahul Singhania","userLocation":"Hyderabad","rating":5,"date":"3 days ago","title":"Snapped right into my Slim digital!","comment":"Took literally 30 seconds to click into place. Now I can buy pre-owned disc games at super cheap prices from DJN Tech!","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
),

-- ----------------------------------------------------------------------------
-- 10. ACCESSORY: Xbox Rechargeable Battery Pack (₹800)
-- ----------------------------------------------------------------------------
(
    'xbox-rechargeable-battery-pack',
    'Xbox Rechargeable Battery Pack (+ USB-C Cable)',
    'Up to 30 Hours Battery Life · Play While Charging · Includes 9ft Braided USB-C Cable',
    'accessories',
    'Xbox',
    'Brand New Sealed',
    1499,
    800,
    47,
    4.8,
    61,
    TRUE,
    15,
    'MUST HAVE',
    '["Rechargeable high-density lithium-ion battery pack for Xbox Wireless Controllers","Provides up to 30 hours of continuous gameplay on a full charge","Fully charges in under 4 hours, even when console is on standby","Includes long 9-foot durable USB-C charging cable","Say goodbye to expensive disposable AA batteries forever"]'::jsonb,
    'Keep the action going with the Xbox Rechargeable Battery Pack + USB-C Cable. Recharge while you play or afterwards, even when your Xbox is in standby. The long-lasting rechargeable battery fully charges in under 4 hours.',
    '["Xbox Rechargeable Lithium-Ion Battery Pack","9-foot USB-C Braided Cable","Quick Start Guide"]'::jsonb,
    '6-Month DJN Tech Hardware Warranty',
    NULL,
    'Black',
    '#107c10',
    'Controller Power Accessory',
    NULL,
    'Play & Charge Kit',
    '/xbox-battery-pack.jpg',
    '[{"id":"rev-xb-bat-1","userName":"Devendra Joshi","userLocation":"Jaipur","rating":5,"date":"5 days ago","title":"Essential accessory for any Xbox controller","comment":"Fits perfectly inside the controller battery compartment. Saves a ton of money on AA batteries. Solid build and long cable.","verifiedBuyer":true,"platformPlayed":"Xbox"}]'::jsonb
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
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    in_stock = EXCLUDED.in_stock,
    stock_count = EXCLUDED.stock_count,
    badge = EXCLUDED.badge,
    features = EXCLUDED.features,
    description = EXCLUDED.description,
    in_the_box = EXCLUDED.in_the_box,
    warranty = EXCLUDED.warranty,
    disc_condition = EXCLUDED.disc_condition,
    color = EXCLUDED.color,
    theme_color = EXCLUDED.theme_color,
    genre = EXCLUDED.genre,
    storage = EXCLUDED.storage,
    edition = EXCLUDED.edition,
    image_url = EXCLUDED.image_url,
    reviews = EXCLUDED.reviews,
    updated_at = NOW();


-- ============================================================================
-- STEP 2: REMOVE UNLISTED HARDWARE & ACCESSORIES
-- Only keep the 10 approved items above in categories 'consoles', 'controllers', 'accessories'.
-- All other consoles/controllers (e.g. Nintendo Switch, PS4 Pro, Xbox Series X/S, etc.) are purged.
-- ============================================================================
DELETE FROM public.products
WHERE category IN ('consoles', 'controllers', 'accessories')
  AND id NOT IN (
    'dualsense-white',
    'dualsense-midnight-black',
    'xbox-series-controller',
    'ps5-slim-disc',
    'ps5-standard-disc-preowned',
    'ps4-slim-1tb-preowned',
    'ps4-slim-500gb-preowned',
    'ps4-standard-500gb-preowned',
    'ps5-disc-drive',
    'xbox-rechargeable-battery-pack'
  );


-- ============================================================================
-- STEP 3: PRESERVE ALL PS4 & PS5 GAMES (FROM PHOTOS)
-- Ensure only PS4 and PS5 pre-owned games from the photos exist in catalog.
-- Remove any test/unrelated game titles if present.
-- ============================================================================
DELETE FROM public.products
WHERE category = 'preowned_games'
  AND platform NOT IN ('PS4', 'PS5');

-- Ensure no orphaned non-standard categories exist
DELETE FROM public.products
WHERE category NOT IN ('consoles', 'controllers', 'accessories', 'preowned_games');


-- ============================================================================
-- STEP 4: PERMANENTLY REMOVE STOCK RESTRICTIONS (ALWAYS AVAILABLE)
-- Ensures all catalog items (consoles, controllers, accessories, games)
-- are permanently marked In Stock and have unrestricted inventory for checkout.
-- ============================================================================
UPDATE public.products
SET in_stock = TRUE,
    stock_count = 999;


-- ============================================================================
-- STEP 5: VERIFICATION REPORT
-- ============================================================================
SELECT category, platform, COUNT(*) as product_count, MIN(price) as min_price, MAX(price) as max_price
FROM public.products
GROUP BY category, platform
ORDER BY category, platform;
