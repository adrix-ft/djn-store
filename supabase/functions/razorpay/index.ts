// Supabase Edge Function: razorpay
// Handles server-side Order Creation and Cryptographic HMAC SHA-256 Verification

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID') || 'rzp_live_TpRIohlYKoheVz';
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || '';
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://rudqiwifokllmjpfcnbp.supabase.co';
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || '';

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json();
    const { action } = body;

    // 1. ACTION: CREATE ORDER (Server-side price verification)
    if (action === 'create_order') {
      const { items = [], promoCode, customer } = body;

      if (!items || items.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'Cart cannot be empty.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Fetch authentic product prices from Supabase
      const productIds = items.map((i: any) => i.productId);
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('id, price')
        .in('id', productIds);

      if (prodErr || !dbProducts) {
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to verify items in database.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const priceMap = new Map();
      dbProducts.forEach((p: any) => priceMap.set(p.id, Number(p.price) || 0));

      let serverSubtotal = 0;
      for (const item of items) {
        const p = priceMap.get(item.productId);
        if (p === undefined) {
          return new Response(
            JSON.stringify({ success: false, error: `Invalid product: ${item.productId}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        serverSubtotal += p * (item.quantity || 1);
      }

      // Fetch store settings for shipping & discounts
      const { data: config } = await supabase
        .from('site_config')
        .select('free_shipping_threshold, standard_shipping_fee, promo_code, promo_discount_percent')
        .eq('id', 'default')
        .maybeSingle();

      const freeThreshold = config?.free_shipping_threshold ?? 1000;
      const standardShipping = config?.standard_shipping_fee ?? 99;
      const validPromo = config?.promo_code || 'DJN2026';
      const promoPercent = config?.promo_discount_percent ?? 10;

      let discount = 0;
      if (promoCode && promoCode.trim().toUpperCase() === validPromo.trim().toUpperCase()) {
        discount = Math.round((serverSubtotal * promoPercent) / 100);
      }

      const shipping = serverSubtotal >= freeThreshold || serverSubtotal === 0 ? 0 : standardShipping;
      const serverTotal = Math.max(1, serverSubtotal + shipping - discount);
      const amountInPaise = Math.round(serverTotal * 100);

      if (!RAZORPAY_KEY_SECRET) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'RAZORPAY_KEY_SECRET is not configured on server.',
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
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

      const rzpData = await rzpRes.json();
      if (!rzpRes.ok || !rzpData.id) {
        return new Response(
          JSON.stringify({ success: false, error: rzpData.error?.description || 'Razorpay order creation failed.' }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          orderId: rzpData.id,
          amount: amountInPaise,
          currency: 'INR',
          keyId: RAZORPAY_KEY_ID,
          serverTotal,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. ACTION: VERIFY PAYMENT SIGNATURE (HMAC SHA-256)
    if (action === 'verify_payment') {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return new Response(
          JSON.stringify({ success: false, error: 'Missing payment signature details.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const encoder = new TextEncoder();
      const keyData = encoder.encode(RAZORPAY_KEY_SECRET);
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const dataToSign = encoder.encode(`${razorpayOrderId}|${razorpayPaymentId}`);
      const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataToSign);
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const expectedSignature = signatureArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      if (expectedSignature !== razorpaySignature) {
        return new Response(
          JSON.stringify({ success: false, error: 'Signature verification failed. Payment tampered.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          verified: true,
          paymentId: razorpayPaymentId,
          orderId: razorpayOrderId,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: `Unknown action: "${action}"` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Server error.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
