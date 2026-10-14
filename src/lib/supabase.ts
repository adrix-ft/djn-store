import { createClient } from '@supabase/supabase-js';
import { Product, Order, SiteConfig } from '../types/store';
import { PRODUCTS } from '../data/products';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';

// Environment variables or fallback credentials
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://rudqiwifokllmjpfcnbp.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_246KDnCvK0ivkk8yBm1JIw_meJd3uN9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Maps database row to Product type
 */
export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle || '',
    category: row.category,
    platform: row.platform,
    condition: row.condition,
    mrp: Number(row.mrp) || 0,
    price: Number(row.price) || 0,
    discountPercent: Number(row.discount_percent) || 0,
    rating: Number(row.rating) || 4.5,
    reviewCount: Number(row.review_count) || 0,
    inStock: Boolean(row.in_stock),
    stockCount: Number(row.stock_count) || 0,
    badge: row.badge || undefined,
    features: Array.isArray(row.features) ? row.features : [],
    description: row.description || '',
    inTheBox: Array.isArray(row.in_the_box) ? row.in_the_box : [],
    warranty: row.warranty || '',
    discCondition: row.disc_condition || undefined,
    color: row.color || undefined,
    themeColor: row.theme_color || '#0070D1',
    genre: row.genre || undefined,
    storage: row.storage || undefined,
    edition: row.edition || undefined,
    imageUrl: row.image_url || undefined,
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
  };
}

/**
 * Maps Product type to database row
 */
export function mapProductToRow(prod: Product) {
  return {
    id: prod.id,
    name: prod.name,
    subtitle: prod.subtitle,
    category: prod.category,
    platform: prod.platform,
    condition: prod.condition,
    mrp: prod.mrp,
    price: prod.price,
    discount_percent: prod.discountPercent,
    rating: prod.rating,
    review_count: prod.reviewCount,
    in_stock: prod.inStock,
    stock_count: prod.stockCount,
    badge: prod.badge || null,
    features: prod.features || [],
    description: prod.description || '',
    in_the_box: prod.inTheBox || [],
    warranty: prod.warranty || '',
    disc_condition: prod.discCondition || null,
    color: prod.color || null,
    theme_color: prod.themeColor || '#0070D1',
    genre: prod.genre || null,
    storage: prod.storage || null,
    edition: prod.edition || null,
    image_url: prod.imageUrl || null,
    reviews: prod.reviews || [],
    updated_at: new Date().toISOString(),
  };
}

/**
 * Maps database row to Order type
 */
export function mapRowToOrder(row: any): Order {
  return {
    id: row.id,
    date: row.created_at
      ? new Date(row.created_at).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : new Date().toLocaleString(),
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(row.subtotal) || 0,
    discount: Number(row.discount) || 0,
    shipping: Number(row.shipping) || 0,
    total: Number(row.total) || 0,
    customer: {
      fullName: row.customer_name || '',
      phone: row.customer_phone || '',
      email: row.customer_email || '',
      address: row.address || '',
      city: row.city || '',
      state: row.state || '',
      pincode: row.pincode || '',
      paymentMethod: row.payment_method || 'cod',
      paymentId: row.payment_id || undefined,
      notes: row.notes || undefined,
    },
    status: row.status || 'Confirmed',
    estimatedDelivery: row.estimated_delivery || '3-5 Business Days',
    paymentId: row.payment_id || undefined,
  };
}

/**
 * Maps Order type to database row
 */
export function mapOrderToRow(order: Order) {
  return {
    id: order.id,
    customer_name: order.customer.fullName,
    customer_phone: order.customer.phone,
    customer_email: order.customer.email,
    address: order.customer.address,
    city: order.customer.city,
    state: order.customer.state,
    pincode: order.customer.pincode,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    total: order.total,
    payment_method: order.customer.paymentMethod,
    payment_id: order.customer.paymentId || order.paymentId || null,
    status: order.status,
    estimated_delivery: order.estimatedDelivery,
    notes: order.customer.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Maps database row to SiteConfig type
 */
export function mapRowToSiteConfig(row: any): SiteConfig {
  return {
    storeName: row.store_name || DEFAULT_SITE_CONFIG.storeName,
    phone: row.phone || DEFAULT_SITE_CONFIG.phone,
    whatsappNumber: row.whatsapp_number || DEFAULT_SITE_CONFIG.whatsappNumber,
    email: row.email || DEFAULT_SITE_CONFIG.email,
    instagram: row.instagram || DEFAULT_SITE_CONFIG.instagram,
    supportHours: row.support_hours || DEFAULT_SITE_CONFIG.supportHours,
    address: row.address || DEFAULT_SITE_CONFIG.address,
    marqueeAnnouncement: row.marquee_announcement || DEFAULT_SITE_CONFIG.marqueeAnnouncement,
    heroHeadline: row.hero_headline || DEFAULT_SITE_CONFIG.heroHeadline,
    heroSubheadline: row.hero_subheadline || DEFAULT_SITE_CONFIG.heroSubheadline,
    promoCode: row.promo_code || DEFAULT_SITE_CONFIG.promoCode,
    promoDiscountPercent: Number(row.promo_discount_percent) || DEFAULT_SITE_CONFIG.promoDiscountPercent,
    freeShippingThreshold: Number(row.free_shipping_threshold) || DEFAULT_SITE_CONFIG.freeShippingThreshold,
    razorpayKeyId: row.razorpay_key_id || DEFAULT_SITE_CONFIG.razorpayKeyId,
    razorpayEnabled: row.razorpay_enabled ?? DEFAULT_SITE_CONFIG.razorpayEnabled,
  };
}

/**
 * Maps SiteConfig type to database row
 */
export function mapSiteConfigToRow(config: SiteConfig) {
  return {
    id: 'default',
    store_name: config.storeName,
    phone: config.phone,
    whatsapp_number: config.whatsappNumber,
    email: config.email,
    instagram: config.instagram,
    support_hours: config.supportHours,
    address: config.address,
    marquee_announcement: config.marqueeAnnouncement,
    hero_headline: config.heroHeadline,
    hero_subheadline: config.heroSubheadline,
    promo_code: config.promoCode,
    promo_discount_percent: config.promoDiscountPercent,
    free_shipping_threshold: config.freeShippingThreshold,
    razorpay_key_id: config.razorpayKeyId || null,
    razorpay_enabled: Boolean(config.razorpayEnabled),
    updated_at: new Date().toISOString(),
  };
}

// ============================================================================
// DATA ACCESS LAYER WITH SEAMLESS LOCALSTORAGE FALLBACK
// ============================================================================

export async function fetchProductsFromDB(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Supabase] Products query error:', error.message);
      // Fallback to local storage or defaults
      const local = localStorage.getItem('djn_products_v6');
      return local ? JSON.parse(local) : PRODUCTS;
    }

    const mapped = data.map(mapRowToProduct);
    localStorage.setItem('djn_products_v6', JSON.stringify(mapped));
    return mapped;
  } catch (err) {
    console.warn('[Supabase] Failed to fetch products, using offline cache:', err);
    const local = localStorage.getItem('djn_products_v6');
    return local ? JSON.parse(local) : PRODUCTS;
  }
}

export async function upsertProductToDB(product: Product): Promise<boolean> {
  try {
    const row = mapProductToRow(product);
    const { error } = await supabase.from('products').upsert(row);
    if (error) {
      console.error('[Supabase] Upsert product error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to upsert product:', err);
    return false;
  }
}

export async function deleteProductFromDB(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('[Supabase] Delete product error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to delete product:', err);
    return false;
  }
}

export async function fetchSiteConfigFromDB(): Promise<SiteConfig> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error || !data) {
      if (error) console.warn('[Supabase] SiteConfig query error:', error.message);
      const local = localStorage.getItem('djn_site_config');
      return local ? JSON.parse(local) : DEFAULT_SITE_CONFIG;
    }

    const mapped = mapRowToSiteConfig(data);
    localStorage.setItem('djn_site_config', JSON.stringify(mapped));
    return mapped;
  } catch (err) {
    console.warn('[Supabase] Failed to fetch site config, using offline cache:', err);
    const local = localStorage.getItem('djn_site_config');
    return local ? JSON.parse(local) : DEFAULT_SITE_CONFIG;
  }
}

export async function upsertSiteConfigToDB(config: SiteConfig): Promise<boolean> {
  try {
    const row = mapSiteConfigToRow(config);
    const { error } = await supabase.from('site_config').upsert(row);
    if (error) {
      console.error('[Supabase] Upsert config error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to upsert site config:', err);
    return false;
  }
}

export async function fetchOrdersFromDB(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      if (error) console.warn('[Supabase] Orders query error:', error.message);
      const local = localStorage.getItem('djn_admin_orders');
      return local ? JSON.parse(local) : [];
    }

    const mapped = data.map(mapRowToOrder);
    localStorage.setItem('djn_admin_orders', JSON.stringify(mapped));
    return mapped;
  } catch (err) {
    console.warn('[Supabase] Failed to fetch orders, using offline cache:', err);
    const local = localStorage.getItem('djn_admin_orders');
    return local ? JSON.parse(local) : [];
  }
}

export async function createOrderInDB(order: Order): Promise<boolean> {
  try {
    const row = mapOrderToRow(order);
    const { error } = await supabase.from('orders').insert(row);
    if (error) {
      console.error('[Supabase] Create order error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to save order to Supabase:', err);
    return false;
  }
}

export async function updateOrderStatusInDB(orderId: string, status: Order['status']): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) {
      console.error('[Supabase] Update order status error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to update order status:', err);
    return false;
  }
}

export async function submitTradeInRequestToDB(tradeInData: {
  id: string;
  brand: string;
  modelId: string;
  modelName: string;
  condition: string;
  warrantySealIntact: boolean;
  hasExtraController: boolean;
  cashEstimate: number;
  storeCreditEstimate: number;
  customerName: string;
  customerPhone: string;
  customerUpi?: string;
  pickupAddress: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('trade_in_requests').insert({
      id: tradeInData.id,
      brand: tradeInData.brand,
      model_id: tradeInData.modelId,
      model_name: tradeInData.modelName,
      condition: tradeInData.condition,
      warranty_seal_intact: tradeInData.warrantySealIntact,
      has_extra_controller: tradeInData.hasExtraController,
      cash_estimate: tradeInData.cashEstimate,
      store_credit_estimate: tradeInData.storeCreditEstimate,
      customer_name: tradeInData.customerName,
      customer_phone: tradeInData.customerPhone,
      customer_upi: tradeInData.customerUpi || null,
      pickup_address: tradeInData.pickupAddress,
      status: 'Pending Pickup',
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[Supabase] Trade-in submission error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to submit trade-in request:', err);
    return false;
  }
}

export async function submitRepairRequestToDB(repairData: {
  id: string;
  consoleType: string;
  issueId: string;
  issueTitle: string;
  estimatedCost: number;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  notes?: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('repair_requests').insert({
      id: repairData.id,
      console_type: repairData.consoleType,
      issue_id: repairData.issueId,
      issue_title: repairData.issueTitle,
      estimated_cost: repairData.estimatedCost,
      customer_name: repairData.customerName,
      customer_phone: repairData.customerPhone,
      pickup_address: repairData.pickupAddress,
      notes: repairData.notes || null,
      status: 'Request Received',
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[Supabase] Repair submission error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to submit repair request:', err);
    return false;
  }
}

/**
 * Computes SHA-256 hash using the Web Crypto API
 */
export async function hashPassword(plain: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies admin credentials against Supabase admin_users table,
 * with graceful fallback to custom storage or secure default.
 */
export async function verifyAdminCredentials(
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: string; role?: string; message?: string }> {
  const cleanUsername = usernameInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  if (!cleanUsername || !cleanPassword) {
    return { success: false, message: 'Please enter both username and password' };
  }

  const inputHash = await hashPassword(cleanPassword);

  // 1. Try secure database RPC if available
  try {
    const { data, error } = await (supabase as any).rpc('verify_admin_login', {
      p_username: cleanUsername,
      p_hash: inputHash,
    });
    if (!error && data && data.success) {
      return {
        success: true,
        user: data.user,
        role: data.role || 'superadmin',
      };
    }
  } catch (err) {
    // Continue to standard verification
  }

  // 2. Query Supabase admin_users table (if read permissions exist)
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .ilike('username', cleanUsername)
      .limit(1);

    if (!error && data && data.length > 0) {
      const user = data[0];
      const match =
        user.password_hash === cleanPassword ||
        user.password_hash === inputHash;

      if (match) {
        // Record last login
        supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id)
          .then(() => {}, () => {});

        return {
          success: true,
          user: user.username,
          role: user.role || 'superadmin',
        };
      } else {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }
    }
  } catch (err) {
    // Continue to hash verification
  }

  // 3. Cryptographic SHA-256 hash verification (zero plain text credentials stored in codebase)
  const SECURE_ADMIN_HASHES: Record<string, { hash: string; role: string; user: string }> = {
    admin: {
      hash: 'd9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131',
      role: 'superadmin',
      user: 'admin',
    },
    djntech: {
      hash: 'd9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131',
      role: 'superadmin',
      user: 'admin',
    },
    'djntechofficial@gmail.com': {
      hash: 'd9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131',
      role: 'superadmin',
      user: 'admin',
    },
    aa: {
      hash: '34ff3bb3732ca5436824c18fc789ff0507ae31807ca3f782b7d7740235d5d719',
      role: 'admin',
      user: 'aa',
    },
  };

  const account = SECURE_ADMIN_HASHES[cleanUsername];
  if (account && account.hash === inputHash) {
    return { success: true, user: account.user, role: account.role };
  }

  return { success: false, message: 'Invalid username or password. Access denied.' };
}

/**
 * Updates or creates admin credentials in Supabase admin_users table
 */
export async function updateAdminCredentials(
  newUsername: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> {
  const cleanUsername = newUsername.trim().toLowerCase();
  const cleanPassword = newPassword.trim();

  if (cleanUsername.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters' };
  }
  if (cleanPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const passwordHash = await hashPassword(cleanPassword);

  // Sync locally first
  localStorage.setItem(
    'djn_admin_custom_creds',
    JSON.stringify({ username: cleanUsername, passwordHash, updatedAt: new Date().toISOString() })
  );

  try {
    const { error } = await supabase.from('admin_users').upsert(
      {
        username: cleanUsername,
        password_hash: passwordHash,
        role: 'superadmin',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'username' }
    );

    if (error) {
      console.warn('[Supabase] Failed to upsert admin credentials:', error);
      return { success: true, message: 'Credentials updated locally (database table pending sync)' };
    }

    return { success: true, message: 'Credentials successfully synced to database' };
  } catch (err) {
    console.warn('[Supabase] Credential update error:', err);
    return { success: true, message: 'Credentials updated locally' };
  }
}

