import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const RAZORPAY_KEY_ID =
  process.env.RAZORPAY_KEY_ID ||
  process.env.VITE_RAZORPAY_KEY_ID ||
  'rzp_live_TpRIohlYKoheVz';

const RAZORPAY_KEY_SECRET =
  process.env.RAZORPAY_KEY_SECRET ||
  process.env.VITE_RAZORPAY_KEY_SECRET ||
  '';

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://rudqiwifokllmjpfcnbp.supabase.co';

const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_246KDnCvK0ivkk8yBm1JIw_meJd3uN9';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

interface CartItemInput {
  productId: string;
  quantity: number;
}

interface OrderRequestPayload {
  action: 'create_order' | 'verify_payment';
  items?: CartItemInput[];
  promoCode?: string;
  customer?: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }));
    return;
  }

  try {
    // Read JSON body
    let body: OrderRequestPayload;
    if (typeof req.body === 'object' && req.body !== null) {
      body = req.body;
    } else {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const raw = Buffer.concat(buffers).toString('utf-8');
      body = JSON.parse(raw || '{}');
    }

    const { action } = body;

    // =========================================================================
    // ACTION 1: CREATE RAZORPAY ORDER (Server-Side Price Validation)
    // =========================================================================
    if (action === 'create_order') {
      const { items = [], promoCode, customer } = body;

      if (!items || items.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Cart cannot be empty.' }));
        return;
      }

      // 1. Fetch live product records from Supabase to verify REAL price
      const productIds = items.map((i) => i.productId);
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('id, price, in_stock')
        .in('id', productIds);

      if (prodErr || !dbProducts || dbProducts.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Failed to verify items in database.' }));
        return;
      }

      const productPriceMap = new Map<string, number>();
      dbProducts.forEach((p) => productPriceMap.set(p.id, Number(p.price) || 0));

      // Calculate server subtotal
      let serverSubtotal = 0;
      for (const item of items) {
        const itemPrice = productPriceMap.get(item.productId);
        if (itemPrice === undefined) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: `Invalid product ID: ${item.productId}` }));
          return;
        }
        serverSubtotal += itemPrice * (item.quantity || 1);
      }

      // 2. Fetch site config for promo and shipping rules
      const { data: siteConfig } = await supabase
        .from('site_config')
        .select('free_shipping_threshold, standard_shipping_fee, promo_code, promo_discount_percent')
        .eq('id', 'default')
        .maybeSingle();

      const freeThreshold = siteConfig?.free_shipping_threshold ?? 1000;
      const standardShipping = siteConfig?.standard_shipping_fee ?? 99;
      const validPromo = siteConfig?.promo_code || 'DJN2026';
      const promoPercent = siteConfig?.promo_discount_percent ?? 10;

      // Calculate discount
      let discountAmount = 0;
      if (promoCode && promoCode.trim().toUpperCase() === validPromo.trim().toUpperCase()) {
        discountAmount = Math.round((serverSubtotal * promoPercent) / 100);
      }

      // Calculate shipping
      const shippingAmount = serverSubtotal >= freeThreshold || serverSubtotal === 0 ? 0 : standardShipping;

      // Final verified total (minimum ₹1)
      const serverTotal = Math.max(1, serverSubtotal + shippingAmount - discountAmount);
      const amountInPaise = Math.round(serverTotal * 100);

      // 3. Check Razorpay secret
      if (!RAZORPAY_KEY_SECRET) {
        console.warn('[Razorpay API] Warning: RAZORPAY_KEY_SECRET is not configured on server.');
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: 'Payment gateway secret is not configured on the server. Please add RAZORPAY_KEY_SECRET to your server environment variables.',
          })
        );
        return;
      }

      // 4. Call Razorpay API to create locked Order
      const authHeader = 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customer_name: customer?.fullName || 'Customer',
            customer_phone: customer?.phone || '',
            customer_email: customer?.email || '',
            store: 'DJN Tech',
          },
        }),
      });

      const razorpayData = await razorpayResponse.json();

      if (!razorpayResponse.ok || !razorpayData.id) {
        console.error('[Razorpay API] Order creation error:', razorpayData);
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: razorpayData.error?.description || 'Failed to create Razorpay payment order.',
          })
        );
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          orderId: razorpayData.id,
          amount: amountInPaise,
          currency: 'INR',
          keyId: RAZORPAY_KEY_ID,
          serverTotal,
        })
      );
      return;
    }

    // =========================================================================
    // ACTION 2: VERIFY PAYMENT SIGNATURE (HMAC SHA-256)
    // =========================================================================
    if (action === 'verify_payment') {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: 'Missing order_id, payment_id, or signature for verification.',
          })
        );
        return;
      }

      if (!RAZORPAY_KEY_SECRET) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: 'Server missing RAZORPAY_KEY_SECRET configuration.',
          })
        );
        return;
      }

      // Compute expected HMAC SHA-256
      const bodyToSign = `${razorpayOrderId}|${razorpayPaymentId}`;
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(bodyToSign)
        .digest('hex');

      const isSignatureValid = expectedSignature === razorpaySignature;

      if (!isSignatureValid) {
        console.error('[Razorpay API] Signature mismatch detected!', {
          expected: expectedSignature,
          received: razorpaySignature,
        });
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: 'Cryptographic signature verification failed. Payment is invalid or tampered.',
          })
        );
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          verified: true,
          paymentId: razorpayPaymentId,
          orderId: razorpayOrderId,
          message: 'Payment cryptographically verified.',
        })
      );
      return;
    }

    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: `Unknown action: "${action}"` }));
  } catch (err: any) {
    console.error('[Razorpay API] Unexpected server error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err?.message || 'Internal server error.' }));
  }
}
