import { PRODUCTS } from '../src/data/products.ts';
import { DEFAULT_SITE_CONFIG } from '../src/data/siteConfig.ts';
import fs from 'fs';

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function jsonSql(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

let sql = `-- ============================================================================
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
    ${escapeSql(DEFAULT_SITE_CONFIG.storeName)},
    ${escapeSql(DEFAULT_SITE_CONFIG.phone)},
    ${escapeSql(DEFAULT_SITE_CONFIG.whatsappNumber)},
    ${escapeSql(DEFAULT_SITE_CONFIG.email)},
    ${escapeSql(DEFAULT_SITE_CONFIG.instagram)},
    ${escapeSql(DEFAULT_SITE_CONFIG.supportHours)},
    ${escapeSql(DEFAULT_SITE_CONFIG.address)},
    ${escapeSql(DEFAULT_SITE_CONFIG.marqueeAnnouncement)},
    ${escapeSql(DEFAULT_SITE_CONFIG.heroHeadline)},
    ${escapeSql(DEFAULT_SITE_CONFIG.heroSubheadline)},
    ${escapeSql(DEFAULT_SITE_CONFIG.promoCode)},
    ${DEFAULT_SITE_CONFIG.promoDiscountPercent},
    ${DEFAULT_SITE_CONFIG.freeShippingThreshold},
    ${escapeSql(DEFAULT_SITE_CONFIG.razorpayKeyId || 'rzp_test_1DP5mmOlF5G5ag')},
    ${DEFAULT_SITE_CONFIG.razorpayEnabled ? 'TRUE' : 'FALSE'}
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

-- 10. INITIAL SEED: ALL PRODUCTS (${PRODUCTS.length} ITEMS)
`;

for (const p of PRODUCTS) {
  sql += `INSERT INTO public.products (
    id, name, subtitle, category, platform, condition, mrp, price, discount_percent,
    rating, review_count, in_stock, stock_count, badge, features, description,
    in_the_box, warranty, disc_condition, color, theme_color, genre, storage, edition,
    image_url, reviews
) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.name)},
    ${escapeSql(p.subtitle)},
    ${escapeSql(p.category)},
    ${escapeSql(p.platform)},
    ${escapeSql(p.condition)},
    ${p.mrp},
    ${p.price},
    ${p.discountPercent || 0},
    ${p.rating || 4.5},
    ${p.reviewCount || 0},
    ${p.inStock ? 'TRUE' : 'FALSE'},
    ${p.stockCount || 10},
    ${escapeSql(p.badge)},
    ${jsonSql(p.features)},
    ${escapeSql(p.description)},
    ${jsonSql(p.inTheBox)},
    ${escapeSql(p.warranty)},
    ${escapeSql(p.discCondition)},
    ${escapeSql(p.color)},
    ${escapeSql(p.themeColor || '#0070D1')},
    ${escapeSql(p.genre)},
    ${escapeSql(p.storage)},
    ${escapeSql(p.edition)},
    ${escapeSql(p.imageUrl)},
    ${jsonSql(p.reviews)}
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

`;
}

if (!fs.existsSync('supabase')) {
  fs.mkdirSync('supabase');
}
fs.writeFileSync('supabase/schema.sql', sql, 'utf8');
console.log('Successfully wrote supabase/schema.sql, total size:', sql.length);
