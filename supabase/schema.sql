-- ============================================================================
-- DJN TECH - COMPLETE SUPABASE DATABASE SCHEMA & SEED DATA
-- Project: DJN Tech Gaming Store (rudqiwifokllmjpfcnbp.supabase.co)
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL CHECK (category IN ('consoles', 'controllers', 'preowned_games', 'accessories')),
    platform TEXT NOT NULL CHECK (platform IN ('PS5', 'PS4', 'Xbox', 'Switch', 'Universal')),
    condition TEXT NOT NULL,
    mrp NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    discount_percent INTEGER DEFAULT 0,
    rating NUMERIC DEFAULT 4.5,
    review_count INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_count INTEGER DEFAULT 10,
    badge TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    in_the_box JSONB DEFAULT '[]'::jsonb,
    warranty TEXT,
    disc_condition TEXT,
    color TEXT,
    theme_color TEXT DEFAULT '#0070D1',
    genre TEXT,
    storage TEXT,
    edition TEXT,
    image_url TEXT,
    reviews JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SITE CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'default',
    store_name TEXT NOT NULL DEFAULT 'DJN Tech',
    phone TEXT NOT NULL DEFAULT '+91 84464 39374',
    whatsapp_number TEXT NOT NULL DEFAULT '918446439374',
    email TEXT NOT NULL DEFAULT 'djntechofficial@gmail.com',
    instagram TEXT NOT NULL DEFAULT '@djntech',
    support_hours TEXT NOT NULL DEFAULT 'Monday to Sunday, 10:00 AM – 9:00 PM IST',
    address TEXT NOT NULL DEFAULT 'Mumbai, Maharashtra, India',
    marquee_announcement TEXT,
    hero_headline TEXT,
    hero_subheadline TEXT,
    promo_code TEXT DEFAULT 'DJN2026',
    promo_discount_percent INTEGER DEFAULT 10,
    free_shipping_threshold NUMERIC DEFAULT 1000,
    razorpay_key_id TEXT DEFAULT 'rzp_test_1DP5mmOlF5G5ag',
    razorpay_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC DEFAULT 0,
    shipping NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'cod',
    payment_id TEXT,
    status TEXT DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled')),
    estimated_delivery TEXT DEFAULT '3-5 Business Days',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRADE-IN / SELL CONSOLES REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.trade_in_requests (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model_id TEXT NOT NULL,
    model_name TEXT NOT NULL,
    condition TEXT NOT NULL,
    warranty_seal_intact BOOLEAN DEFAULT TRUE,
    has_extra_controller BOOLEAN DEFAULT FALSE,
    cash_estimate NUMERIC NOT NULL,
    store_credit_estimate NUMERIC NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_upi TEXT,
    pickup_address TEXT NOT NULL,
    status TEXT DEFAULT 'Pending Pickup' CHECK (status IN ('Pending Pickup', 'Inspected', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CONSOLE & CONTROLLER REPAIRS TABLE
CREATE TABLE IF NOT EXISTS public.repair_requests (
    id TEXT PRIMARY KEY,
    console_type TEXT NOT NULL,
    issue_id TEXT NOT NULL,
    issue_title TEXT NOT NULL,
    estimated_cost NUMERIC NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pickup_address TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'Request Received' CHECK (status IN ('Request Received', 'In Repair', 'Tested', 'Delivered', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_platform ON public.products (platform);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products (in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trade_in_created_at ON public.trade_in_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_repair_created_at ON public.repair_requests (created_at DESC);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_in_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_requests ENABLE ROW LEVEL SECURITY;

-- Products Policies: Public read, full access for client app
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable full access for products" ON public.products;
CREATE POLICY "Enable full access for products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Site Config Policies
DROP POLICY IF EXISTS "Public can view site config" ON public.site_config;
CREATE POLICY "Public can view site config" ON public.site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable full access for site config" ON public.site_config;
CREATE POLICY "Enable full access for site config" ON public.site_config FOR ALL USING (true) WITH CHECK (true);

-- Orders Policies
DROP POLICY IF EXISTS "Public can create and view orders" ON public.orders;
CREATE POLICY "Public can create and view orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- Trade-In Requests Policies
DROP POLICY IF EXISTS "Public can submit trade-in requests" ON public.trade_in_requests;
CREATE POLICY "Public can submit trade-in requests" ON public.trade_in_requests FOR ALL USING (true) WITH CHECK (true);

-- Repair Requests Policies
DROP POLICY IF EXISTS "Public can submit repair requests" ON public.repair_requests;
CREATE POLICY "Public can submit repair requests" ON public.repair_requests FOR ALL USING (true) WITH CHECK (true);

-- 9. INITIAL SEED: SITE CONFIGURATION
INSERT INTO public.site_config (
    id, store_name, phone, whatsapp_number, email, instagram, support_hours, address,
    marquee_announcement, hero_headline, hero_subheadline, promo_code, promo_discount_percent,
    free_shipping_threshold, razorpay_key_id, razorpay_enabled
) VALUES (
    'default',
    'DJN Tech',
    '+91 84464 39374',
    '918446439374',
    'djntechofficial@gmail.com',
    '@djntech',
    'Monday to Sunday, 10:00 AM – 9:00 PM IST',
    'Mumbai, Maharashtra, India',
    '⚡ Free Express Shipping Across India · 🛡️ Certified 25-Point Hardware QA Inspection · 🔄 7-Day Doorstep Replacement Guarantee · 🎮 100% Genuine Sealed Units',
    'Consoles, Controllers & Pre-Owned Games',
    'Authentic PlayStation 5, PS4 Pro, Xbox Series X, DualSense controllers and optical laser-tested pre-owned discs with 7-day doorstep replacement guarantee.',
    'DJN2026',
    10,
    1000,
    'rzp_test_1DP5mmOlF5G5ag',
    TRUE
)
ON CONFLICT (id) DO UPDATE SET
    store_name = EXCLUDED.store_name,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    email = EXCLUDED.email,
    instagram = EXCLUDED.instagram,
    support_hours = EXCLUDED.support_hours,
    address = EXCLUDED.address,
    marquee_announcement = EXCLUDED.marquee_announcement,
    hero_headline = EXCLUDED.hero_headline,
    hero_subheadline = EXCLUDED.hero_subheadline,
    promo_code = EXCLUDED.promo_code,
    promo_discount_percent = EXCLUDED.promo_discount_percent,
    free_shipping_threshold = EXCLUDED.free_shipping_threshold,
    razorpay_key_id = EXCLUDED.razorpay_key_id,
    razorpay_enabled = EXCLUDED.razorpay_enabled,
    updated_at = NOW();

-- 10. INITIAL SEED: ALL PRODUCTS (3 ITEMS)
INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, color, theme_color, genre, storage, edition,
    image_url, reviews
) VALUES (
    'ps5-slim-disc',
    'PlayStation 5 Slim (Disc Edition)',
    '1TB Custom SSD · 4K 120Hz · Ray Tracing · Ultra HD Blu-ray',
    'consoles',
    'PS5',
    'Brand New Sealed',
    54990,
    49990,
    9,
    4.9,
    42,
    TRUE,
    5,
    'BESTSELLER',
    '["Slimmer design with 1TB ultra-high speed internal SSD storage","Ultra HD Blu-ray disc drive included","Haptic feedback and adaptive triggers via DualSense wireless controller","Tempest 3D AudioTech and up to 120 fps with 120Hz output","Official 1 Year Sony India Manufacturer Warranty"]'::jsonb,
    'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games in a sleek, compact slim form factor.',
    '["PS5 Slim Console (Disc Model)","DualSense Wireless Controller (White)","1TB SSD (Installed)","HDMI 2.1 Cable","AC Power Cord","USB-C Cable","Horizontal Stand Feet","Astro''s Playroom pre-installed"]'::jsonb,
    '1 Year Official Sony Warranty + DJN Tech Assured Support',
    NULL,
    NULL,
    '#00439c',
    NULL,
    '1TB SSD',
    'Standard Slim Disc',
    '/hero-ps5-slim.png',
    '[{"id":"rev-c1","userName":"Aakash Verma","userLocation":"Delhi","rating":5,"date":"3 days ago","title":"Original Indian Sony Unit, Superb packaging!","comment":"Received brand new sealed box with original Indian warranty seal. Delivery was super fast within 48 hours. DJN Tech is 100% trustworthy for consoles!","verifiedBuyer":true,"platformPlayed":"PS5"},{"id":"rev-c2","userName":"Naveen Kumar","userLocation":"Bengaluru","rating":5,"date":"1 week ago","title":"Silent and sleek machine","comment":"Runs quiet and the 1TB SSD gives much needed space over original launch model. Great customer service on WhatsApp.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
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

INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, color, theme_color, genre, storage, edition,
    image_url, reviews
) VALUES (
    'dualsense-midnight-black',
    'PS5 DualSense Wireless Controller (Midnight Black)',
    'Haptic Feedback · Dynamic Adaptive Triggers · Built-in Microphone',
    'controllers',
    'PS5',
    'Brand New Sealed',
    6390,
    4990,
    22,
    4.9,
    56,
    TRUE,
    14,
    'POPULAR COLOR',
    '["Immersive haptic feedback brings in-game actions to life in your hands","Dynamic adaptive triggers simulate physical resistance of gear and weapons","Built-in microphone and 3.5mm headset jack for seamless multiplayer voice","Create button to broadcast your epic gaming moments","Signature comfortable design with enhanced stick grips"]'::jsonb,
    'Discover a deeper, highly immersive gaming experience that brings the action to life in the palms of your hands. The DualSense wireless controller features immersive haptic feedback and dynamic adaptive triggers in a sleek Midnight Black finish.',
    '["DualSense Wireless Controller (Midnight Black)","Instruction Manual"]'::jsonb,
    '1 Year Official Sony Warranty',
    NULL,
    'Midnight Black',
    '#090d16',
    NULL,
    NULL,
    NULL,
    '/hero-dualsense.png',
    '[{"id":"rev-c-mb1","userName":"Prashant Iyer","userLocation":"Chennai","rating":5,"date":"4 days ago","title":"Tactile triggers and stealth finish","comment":"Midnight Black looks far better in person than standard white. Triggers work brilliantly with Astro Bot and Gran Turismo 7. 100% genuine Sony packaging.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
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

INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, color, theme_color, genre, storage, edition,
    image_url, reviews
) VALUES (
    'elden-ring-ps5',
    'Elden Ring: Shadow of the Erdtree (PS5 Pre-Owned)',
    'FromSoftware Masterpiece · Optical Clean Pass · Original Case',
    'preowned_games',
    'PS5',
    'Pre-Owned Grade A+',
    4499,
    2199,
    51,
    4.9,
    88,
    TRUE,
    5,
    'GAME OF THE YEAR',
    '["Massive open-world RPG with hundreds of weapons and bosses","Full 60 FPS performance mode on PS5","Pre-owned disc inspected for flawless data installation","DJN Assured optical disc guarantee"]'::jsonb,
    'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    '["PS5 Game Case","Elden Ring Blu-ray Disc","Original Map Insert (subject to availability)"]'::jsonb,
    '7-Day Replacement Guarantee',
    'Grade A+ (Clean, verified installation test)',
    NULL,
    '#b45309',
    'Action RPG / Souls-like',
    NULL,
    NULL,
    '/hero-elden-ring.png',
    '[{"id":"rev-er-1","userName":"Murugan G","userLocation":"Madurai","rating":5,"date":"1 week ago","title":"Very reasonable price and authentic item","comment":"Price was way cheaper than local store. Product exactly matches photos. Fast courier dispatch and helpful WhatsApp support.","verifiedBuyer":true,"platformPlayed":"PS5"}]'::jsonb
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

-- 10. ADMIN USERS & CREDENTIALS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'superadmin',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for admin authentication" ON public.admin_users;
CREATE POLICY "Enable read access for admin authentication" ON public.admin_users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable full access for admin users" ON public.admin_users;
CREATE POLICY "Enable full access for admin users" ON public.admin_users FOR ALL USING (true);

INSERT INTO public.admin_users (username, password_hash, role)
VALUES ('admin', 'd9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131', 'superadmin')
ON CONFLICT (username) DO NOTHING;

