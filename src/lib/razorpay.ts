import { supabase } from './supabase';
import { CartItem, OrderCustomerInfo } from '../types/store';

export interface CreateOrderParams {
  items: CartItem[];
  customer: OrderCustomerInfo;
  promoCode?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
  serverTotal?: number;
  error?: string;
}

export interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  verified?: boolean;
  error?: string;
}

/**
 * Creates a cryptographically locked Razorpay Order from the backend.
 * The backend calculates the authentic price from the database to prevent client-side price tampering.
 */
export async function createBackendRazorpayOrder(params: CreateOrderParams): Promise<CreateOrderResponse> {
  const payload = {
    action: 'create_order',
    items: params.items.map((i) => ({
      productId: i.product.id,
      quantity: i.quantity,
    })),
    promoCode: params.promoCode,
    customer: {
      fullName: params.customer.fullName,
      phone: params.customer.phone,
      email: params.customer.email,
      address: params.customer.address,
      city: params.customer.city,
      state: params.customer.state,
      pincode: params.customer.pincode,
    },
  };

  // 1. Try local or hosted serverless endpoint (/api/razorpay)
  try {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.orderId) {
        return data;
      }
      if (data.error) {
        return { success: false, error: data.error };
      }
    }
  } catch (err) {
    // Continue to Supabase Edge Function fallback
  }

  // 2. Try Supabase Edge Function fallback
  try {
    const { data, error } = await supabase.functions.invoke('razorpay', {
      body: payload,
    });

    if (!error && data?.success && data?.orderId) {
      return data;
    }
    if (data?.error) {
      return { success: false, error: data.error };
    }
  } catch (err: any) {
    console.warn('[Razorpay] Supabase Edge Function invocation failed:', err);
  }

  return {
    success: false,
    error: 'Backend payment initialization unavailable. Please ensure server has RAZORPAY_KEY_SECRET configured.',
  };
}

/**
 * Cryptographically verifies the Razorpay payment signature via HMAC SHA-256 on the backend.
 */
export async function verifyBackendRazorpayPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  const payload = {
    action: 'verify_payment',
    razorpayOrderId: params.razorpayOrderId,
    razorpayPaymentId: params.razorpayPaymentId,
    razorpaySignature: params.razorpaySignature,
  };

  // 1. Try local or hosted serverless endpoint (/api/razorpay)
  try {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.verified) {
        return data;
      }
      if (data.error) {
        return { success: false, error: data.error };
      }
    }
  } catch (err) {
    // Continue to Supabase Edge Function fallback
  }

  // 2. Try Supabase Edge Function fallback
  try {
    const { data, error } = await supabase.functions.invoke('razorpay', {
      body: payload,
    });

    if (!error && data?.success && data?.verified) {
      return data;
    }
    if (data?.error) {
      return { success: false, error: data.error };
    }
  } catch (err: any) {
    console.warn('[Razorpay] Verification fallback error:', err);
  }

  return {
    success: false,
    error: 'Payment signature could not be verified by backend.',
  };
}
