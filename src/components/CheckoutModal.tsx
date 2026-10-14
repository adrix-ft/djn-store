import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  MapPin,
  Building,
  Sparkles,
  Lock,
} from 'lucide-react';
import { AuthUser, CartItem, Order, OrderCustomerInfo, SiteConfig } from '../types/store';
import { GoogleLogoIcon } from './GoogleLogoIcon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: Order) => void;
  siteConfig?: SiteConfig;
  authUser?: AuthUser | null;
  onRequestLogin?: () => void;
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

// Helper to deduce State and City from Indian Pincode prefix
export const getPincodeInfo = (pin: string): { state?: string; city?: string } | null => {
  if (!pin || pin.length < 2) return null;
  const p2 = pin.substring(0, 2);
  const p3 = pin.substring(0, 3);

  if (p2 === '11') return { state: 'Delhi', city: 'New Delhi' };
  if (p2 === '12' || p2 === '13') return { state: 'Haryana', city: 'Gurugram' };
  if (p2 === '14' || p2 === '15') return { state: 'Punjab', city: 'Ludhiana' };
  if (p2 === '16') return { state: 'Chandigarh', city: 'Chandigarh' };
  if (p2 === '17') return { state: 'Himachal Pradesh', city: 'Shimla' };
  if (p2 === '18' || p2 === '19') return { state: 'Jammu and Kashmir', city: 'Srinagar' };
  if (['20', '21', '22', '23', '24', '25', '26', '27', '28'].includes(p2)) {
    if (p3 === '248') return { state: 'Uttarakhand', city: 'Dehradun' };
    if (p3 === '201') return { state: 'Uttar Pradesh', city: 'Noida' };
    if (p3 === '226') return { state: 'Uttar Pradesh', city: 'Lucknow' };
    return { state: 'Uttar Pradesh' };
  }
  if (['30', '31', '32', '33', '34'].includes(p2)) {
    if (p3 === '302') return { state: 'Rajasthan', city: 'Jaipur' };
    return { state: 'Rajasthan' };
  }
  if (['36', '37', '38', '39'].includes(p2)) {
    if (p3 === '380') return { state: 'Gujarat', city: 'Ahmedabad' };
    if (p3 === '395') return { state: 'Gujarat', city: 'Surat' };
    return { state: 'Gujarat' };
  }
  if (['40', '41', '42', '43', '44'].includes(p2)) {
    if (p3 === '400') return { state: 'Maharashtra', city: 'Mumbai' };
    if (p3 === '411') return { state: 'Maharashtra', city: 'Pune' };
    if (p3 === '440') return { state: 'Maharashtra', city: 'Nagpur' };
    return { state: 'Maharashtra' };
  }
  if (['45', '46', '47', '48'].includes(p2)) {
    if (p3 === '452') return { state: 'Madhya Pradesh', city: 'Indore' };
    if (p3 === '462') return { state: 'Madhya Pradesh', city: 'Bhopal' };
    return { state: 'Madhya Pradesh' };
  }
  if (['50', '51', '52', '53'].includes(p2)) {
    if (p3 === '500') return { state: 'Telangana', city: 'Hyderabad' };
    return { state: 'Telangana' };
  }
  if (['56', '57', '58', '59'].includes(p2)) {
    if (p3 === '560') return { state: 'Karnataka', city: 'Bengaluru' };
    return { state: 'Karnataka' };
  }
  if (['60', '61', '62', '63', '64'].includes(p2)) {
    if (p3 === '600') return { state: 'Tamil Nadu', city: 'Chennai' };
    if (p3 === '620') return { state: 'Tamil Nadu', city: 'Tiruchirappalli' };
    if (p3 === '625') return { state: 'Tamil Nadu', city: 'Madurai' };
    if (p3 === '641') return { state: 'Tamil Nadu', city: 'Coimbatore' };
    return { state: 'Tamil Nadu' };
  }
  if (['67', '68', '69'].includes(p2)) {
    if (p3 === '682') return { state: 'Kerala', city: 'Kochi' };
    if (p3 === '695') return { state: 'Kerala', city: 'Thiruvananthapuram' };
    return { state: 'Kerala' };
  }
  if (['70', '71', '72', '73', '74'].includes(p2)) {
    if (p3 === '700') return { state: 'West Bengal', city: 'Kolkata' };
    return { state: 'West Bengal' };
  }
  return null;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
  siteConfig,
  authUser,
  onRequestLogin,
}) => {
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: authUser?.fullName || '',
    phone: '',
    email: authUser?.email || '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'razorpay',
    notes: '',
    userId: authUser?.id,
  });

  // Sync with authUser when user logs in
  useEffect(() => {
    if (authUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || authUser.fullName || '',
        email: authUser.email || prev.email || '',
        userId: authUser.id,
      }));
    }
  }, [authUser]);

  // Track touched fields for instant validation errors
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pincodeAutofillHint, setPincodeAutofillHint] = useState<string | null>(null);

  // Load Razorpay script if not loaded
  useEffect(() => {
    if (!isOpen) return;
    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation Rules
  const errors = {
    fullName:
      !formData.fullName.trim()
        ? 'Full Name is required'
        : formData.fullName.trim().length < 3
        ? 'Name must be at least 3 letters'
        : !/^[a-zA-Z\s.']+$/.test(formData.fullName.trim())
        ? 'Name can only contain alphabets and spaces'
        : null,

    phone:
      !formData.phone.trim()
        ? 'Phone number is required'
        : formData.phone.replace(/\D/g, '').length !== 10
        ? 'Must be exactly 10 digits'
        : !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))
        ? 'Must be a valid Indian mobile number (starts with 6-9)'
        : null,

    email:
      !formData.email.trim()
        ? 'Email address is required'
        : !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())
        ? 'Please enter a valid email address (e.g. name@gmail.com)'
        : null,

    address:
      !formData.address.trim()
        ? 'Complete delivery address is required'
        : formData.address.trim().length < 10
        ? 'Address must be at least 10 characters (include House/Flat No. & Street)'
        : null,

    pincode:
      !formData.pincode.trim()
        ? 'PIN Code is required'
        : !/^[1-9][0-9]{5}$/.test(formData.pincode.trim())
        ? 'Must be a valid 6-digit Indian PIN Code'
        : null,

    city:
      !formData.city.trim()
        ? 'City is required'
        : formData.city.trim().length < 2
        ? 'City must be at least 2 characters'
        : null,
  };

  const isFormValid =
    !errors.fullName &&
    !errors.phone &&
    !errors.email &&
    !errors.address &&
    !errors.pincode &&
    !errors.city;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Clean phone input (keeps only digits, limits to 10 digits)
  const handlePhoneChange = (val: string) => {
    let clean = val.replace(/\D/g, '');
    // If user typed or pasted +91, strip country code
    if (clean.length > 10 && clean.startsWith('91')) {
      clean = clean.substring(2);
    } else if (clean.length > 10 && clean.startsWith('0')) {
      clean = clean.substring(1);
    }
    if (clean.length <= 10) {
      setFormData((prev) => ({ ...prev, phone: clean }));
    }
  };

  // Handle Pincode Change with Smart State/City Detection
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: clean }));

    if (clean.length === 6) {
      const info = getPincodeInfo(clean);
      if (info) {
        setFormData((prev) => ({
          ...prev,
          pincode: clean,
          state: info.state || prev.state,
          city: prev.city ? prev.city : info.city || prev.city,
        }));
        setPincodeAutofillHint(`Detected: ${info.city ? info.city + ', ' : ''}${info.state}`);
      } else {
        setPincodeAutofillHint(null);
      }
    } else {
      setPincodeAutofillHint(null);
    }
  };

  // Finalize Order
  const finalizeOrder = (paymentId?: string, method?: 'razorpay' | 'cod' | 'upi' | 'card') => {
    const orderId = 'DJN-' + Math.floor(100000 + Math.random() * 900000);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
      userId: authUser?.id,
      customer: {
        ...formData,
        userId: authUser?.id,
        email: authUser?.email || formData.email,
        paymentMethod: method || formData.paymentMethod,
        paymentId: paymentId || undefined,
      },
      status: 'Confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      paymentId: paymentId || undefined,
    };

    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authUser) {
      setErrorMessage('Google Sign-In is required to place an order.');
      if (onRequestLogin) onRequestLogin();
      return;
    }

    // Mark all fields touched to show all errors
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address: true,
      pincode: true,
      city: true,
    });

    if (!isFormValid) {
      setErrorMessage('Please fix the highlighted errors before proceeding to payment.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // RAZORPAY PAYMENT GATEWAY
    if (formData.paymentMethod === 'razorpay') {
      const razorpayKey = siteConfig?.razorpayKeyId || 'rzp_test_1DP5mmOlF5G5ag';

      if ((window as any).Razorpay) {
        try {
          const options = {
            key: razorpayKey,
            amount: Math.round(total * 100), // in paise
            currency: 'INR',
            name: siteConfig?.storeName || 'DJN Tech',
            description: `Order of ${items.length} gaming item(s)`,
            image: '/favicon.png',
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone,
            },
            notes: {
              address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
              pincode: formData.pincode,
              store: 'DJN Tech Online Store',
            },
            theme: {
              color: '#00439c',
            },
            modal: {
              ondismiss: function () {
                setIsSubmitting(false);
              },
            },
            handler: function (response: any) {
              const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
              finalizeOrder(paymentId, 'razorpay');
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', function (response: any) {
            setIsSubmitting(false);
            setErrorMessage(
              response?.error?.description || 'Payment was cancelled or failed. Please try again.'
            );
          });
          rzp.open();
          return;
        } catch (err: any) {
          console.error('Razorpay initialization error:', err);
        }
      }

      setIsSubmitting(false);
      setErrorMessage(
        'Unable to initialize Razorpay payment gateway. Please check your internet connection or contact DJN Tech support.'
      );
      return;
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111827] border border-[#e5e7eb] dark:border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#212121] dark:text-gray-100">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-[#e5e7eb] dark:border-[#1e293b] flex items-center justify-between bg-[#fafafa] dark:bg-[#161f30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Truck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#212121] dark:text-white leading-tight">
                Express Checkout
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Verified address & 256-bit secure Razorpay payment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#64748b] dark:text-gray-400 hover:text-[#212121] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!authUser ? (
          <div className="p-8 sm:p-12 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto shadow-md">
              <GoogleLogoIcon className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Google Login Required to Order
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                Sign in with Google to Place Order
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                To guarantee priority delivery, activate your 7-day replacement warranty, and provide real-time order tracking updates on WhatsApp and Email, please sign in with your Google account.
              </p>
            </div>

            <button
              type="button"
              onClick={onRequestLogin}
              className="w-full py-4 px-6 rounded-2xl bg-white dark:bg-[#1a2333] border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]"
            >
              <GoogleLogoIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-black text-gray-900 dark:text-white">
                Continue with Google
              </span>
            </button>

            <div className="grid grid-cols-2 gap-3 text-left pt-2">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800">
                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">Live Order Updates</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Track shipment milestone stages from packaging to delivery.</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161f30] border border-gray-100 dark:border-gray-800">
                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">Fast Autofill</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Instantly sync your name and verified email address.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold cursor-pointer"
            >
              ← Return to Cart
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Authenticated Account Bar */}
            <div className="mx-6 mt-4 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
              <div className="flex items-center gap-2.5">
                <GoogleLogoIcon className="w-4 h-4 shrink-0" />
                <span>
                  Ordering as <strong>{authUser.fullName}</strong> ({authUser.email})
                </span>
              </div>
              <button
                type="button"
                onClick={onRequestLogin}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Switch
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-[#424242] dark:text-gray-300">
              {/* Left Column: Delivery Details & Payment */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-[#212121] dark:text-white text-sm">
                    1. Customer & Delivery Address
                  </h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Details
                  </span>
                </div>

              {/* Full Name */}
              <div>
                <label className="font-semibold block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. Ramesh Sundaram"
                    className={`w-full pl-9 pr-8 py-2.5 rounded-xl border text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                      touched.fullName && errors.fullName
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : touched.fullName && !errors.fullName
                        ? 'border-emerald-500 focus:border-emerald-600'
                        : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                    }`}
                  />
                  {touched.fullName && !errors.fullName && (
                    <CheckCircle2 className="absolute right-2.5 top-2.5 w-4 h-4 text-emerald-500" />
                  )}
                  {touched.fullName && errors.fullName && (
                    <AlertCircle className="absolute right-2.5 top-2.5 w-4 h-4 text-red-500" />
                  )}
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <div>
                  <label className="font-semibold block mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-500 select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="98765 43210"
                      className={`w-full pl-11 pr-8 py-2.5 rounded-xl border text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                        touched.phone && errors.phone
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.phone && !errors.phone
                          ? 'border-emerald-500 focus:border-emerald-600'
                          : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {touched.phone && !errors.phone && (
                      <CheckCircle2 className="absolute right-2.5 top-2.5 w-4 h-4 text-emerald-500" />
                    )}
                    {touched.phone && errors.phone && (
                      <AlertCircle className="absolute right-2.5 top-2.5 w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {touched.phone && errors.phone ? (
                    <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.phone}</p>
                  ) : (
                    <span className="text-[10px] text-gray-400 mt-0.5 block">10-digit number for order tracking</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-semibold block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onBlur={() => handleBlur('email')}
                      placeholder="customer@gmail.com"
                      className={`w-full pl-9 pr-8 py-2.5 rounded-xl border text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                        touched.email && errors.email
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.email && !errors.email
                          ? 'border-emerald-500 focus:border-emerald-600'
                          : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {touched.email && !errors.email && (
                      <CheckCircle2 className="absolute right-2.5 top-2.5 w-4 h-4 text-emerald-500" />
                    )}
                    {touched.email && errors.email && (
                      <AlertCircle className="absolute right-2.5 top-2.5 w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="font-semibold block mb-1">
                  Complete Delivery Address & House/Flat No. *
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    onBlur={() => handleBlur('address')}
                    placeholder="Flat / House No., Building Name, Street / Area, Landmark"
                    className={`w-full p-2.5 rounded-xl border text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                      touched.address && errors.address
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : touched.address && !errors.address
                        ? 'border-emerald-500 focus:border-emerald-600'
                        : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                    }`}
                  />
                </div>
                {touched.address && errors.address && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.address}</p>
                )}
              </div>

              {/* PIN Code, City, State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pincode */}
                <div>
                  <label className="font-semibold block mb-1">
                    PIN Code (6 Digits) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      onBlur={() => handleBlur('pincode')}
                      placeholder="e.g. 400001"
                      className={`w-full p-2.5 pr-8 rounded-xl border font-mono font-bold text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                        touched.pincode && errors.pincode
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.pincode && !errors.pincode
                          ? 'border-emerald-500 focus:border-emerald-600'
                          : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {touched.pincode && !errors.pincode && (
                      <CheckCircle2 className="absolute right-2.5 top-2.5 w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  {pincodeAutofillHint && (
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1 block">
                      {pincodeAutofillHint}
                    </span>
                  )}
                  {touched.pincode && errors.pincode && (
                    <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.pincode}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="font-semibold block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    onBlur={() => handleBlur('city')}
                    placeholder="e.g. Mumbai"
                    className={`w-full p-2.5 rounded-xl border text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] transition-colors focus:outline-none ${
                      touched.city && errors.city
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-[#cbd5e1] dark:border-gray-700 focus:border-blue-500'
                    }`}
                  />
                  {touched.city && errors.city && (
                    <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="font-semibold block mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#cbd5e1] dark:border-gray-700 text-xs text-[#212121] dark:text-white bg-[#f8fafc] dark:bg-[#161f30] focus:outline-none focus:border-blue-500"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#212121] dark:text-white text-sm">
                    2. Choose Payment Method
                  </h3>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-blue-500" /> Razorpay 256-Bit SSL
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* Option 1: Razorpay Gateway (Primary) */}
                  <label
                    className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'razorpay'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-500/20 shadow-xs'
                        : 'border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-[#161f30] hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={formData.paymentMethod === 'razorpay'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                        className="mt-1 accent-blue-600"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#212121] dark:text-white text-xs sm:text-sm">
                            Razorpay Payment Gateway
                          </p>
                          <span className="text-[9px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            RECOMMENDED
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400 mt-0.5">
                          Instant payment via UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, NetBanking & EMI.
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                            Google Pay
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                            PhonePe
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
                            Paytm UPI
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                            Visa / Mastercard
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Pay Button */}
            <div className="md:col-span-5 bg-[#fafafa] dark:bg-[#161f30] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#212121] dark:text-white text-sm mb-3">
                  Order Summary ({items.length} items)
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1">
                  {items.map((it) => (
                    <div
                      key={it.product.id}
                      className="flex justify-between items-center text-xs py-1.5 border-b border-[#e2e8f0] dark:border-gray-700"
                    >
                      <div className="truncate max-w-[160px]">
                        <p className="font-semibold text-[#212121] dark:text-white truncate">
                          {it.product.name}
                        </p>
                        <p className="text-[11px] text-[#64748b] dark:text-gray-400">
                          Qty: {it.quantity} · {it.selectedCondition}
                        </p>
                      </div>
                      <span className="font-mono text-[#212121] dark:text-white font-bold">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}.00
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#64748b] dark:text-gray-400 pt-2 border-t border-[#e2e8f0] dark:border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-[#212121] dark:text-white">
                      ₹{subtotal.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#10b981]">
                      <span>Discount:</span>
                      <span>-₹{discount.toLocaleString('en-IN')}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-mono text-[#10b981] font-bold">
                      {shipping === 0 ? 'FREE' : `₹${shipping}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#212121] dark:text-white pt-2 border-t border-[#e2e8f0] dark:border-gray-700">
                    <span>Total Amount:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      ₹{total.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e2e8f0] dark:border-gray-700 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Processing...'
                      : formData.paymentMethod === 'razorpay'
                      ? `Pay ₹${total.toLocaleString('en-IN')} via Razorpay`
                      : `Confirm Order · ₹${total.toLocaleString('en-IN')}`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>7-Day Replacement Guarantee & Doorstep Pickup</span>
                </div>
              </div>
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
