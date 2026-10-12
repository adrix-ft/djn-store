import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Banknote,
  Gift,
  ArrowRight,
  Info
} from 'lucide-react';
import { Category, Platform, Product } from '../types/store';

interface SellConsolesPageProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category | 'all', platform?: Platform | 'all') => void;
  onSelectProduct?: (product: Product) => void;
}

interface ConsoleModelOption {
  id: string;
  brand: 'playstation' | 'xbox' | 'nintendo' | 'handheld';
  name: string;
  basePrice: number;
  popular?: boolean;
}

const CONSOLE_MODELS: ConsoleModelOption[] = [
  // PlayStation
  { id: 'ps5-pro', brand: 'playstation', name: 'PlayStation 5 Pro (2TB)', basePrice: 52000, popular: true },
  { id: 'ps5-slim-disc', brand: 'playstation', name: 'PlayStation 5 Slim (Disc Edition 1TB)', basePrice: 36500, popular: true },
  { id: 'ps5-slim-digital', brand: 'playstation', name: 'PlayStation 5 Slim (Digital Edition 1TB)', basePrice: 31500 },
  { id: 'ps5-fat-disc', brand: 'playstation', name: 'PlayStation 5 Original (Disc Model 825GB)', basePrice: 33000 },
  { id: 'ps5-fat-digital', brand: 'playstation', name: 'PlayStation 5 Original (Digital Model 825GB)', basePrice: 28500 },
  { id: 'ps-portal', brand: 'playstation', name: 'PlayStation Portal Remote Player (8" 1080p)', basePrice: 14500, popular: true },
  { id: 'psvr2', brand: 'playstation', name: 'PlayStation VR2 Horizon Bundle + Sense Controllers', basePrice: 24000 },
  { id: 'ps4-pro', brand: 'playstation', name: 'PlayStation 4 Pro (1TB 4K Enhanced)', basePrice: 17500, popular: true },
  { id: 'ps4-slim-1tb', brand: 'playstation', name: 'PlayStation 4 Slim (1TB)', basePrice: 14500 },
  { id: 'ps4-slim-500gb', brand: 'playstation', name: 'PlayStation 4 Slim (500GB)', basePrice: 13000 },
  { id: 'ps4-fat-1tb', brand: 'playstation', name: 'PlayStation 4 Original Fat (1TB Matte/Gloss)', basePrice: 11500 },
  { id: 'ps4-fat-500gb', brand: 'playstation', name: 'PlayStation 4 Original Fat (500GB)', basePrice: 10500 },

  // Xbox
  { id: 'xbox-series-x-2tb', brand: 'xbox', name: 'Xbox Series X (2TB Galaxy Black Edition)', basePrice: 38000 },
  { id: 'xbox-series-x', brand: 'xbox', name: 'Xbox Series X (1TB True 4K UHD)', basePrice: 33500, popular: true },
  { id: 'xbox-series-s-1tb', brand: 'xbox', name: 'Xbox Series S (1TB Carbon Black)', basePrice: 21000 },
  { id: 'xbox-series-s-512', brand: 'xbox', name: 'Xbox Series S (512GB Robot White)', basePrice: 18500, popular: true },
  { id: 'xbox-one-x', brand: 'xbox', name: 'Xbox One X (1TB 4K HDR)', basePrice: 12500 },
  { id: 'xbox-one-s', brand: 'xbox', name: 'Xbox One S (1TB / 500GB 4K Streaming)', basePrice: 9500 },
  { id: 'xbox-one-fat', brand: 'xbox', name: 'Xbox One Original Fat (500GB / 1TB)', basePrice: 7500 },

  // Nintendo
  { id: 'switch-oled', brand: 'nintendo', name: 'Nintendo Switch OLED Model (64GB Neon/White)', basePrice: 19500, popular: true },
  { id: 'switch-v2', brand: 'nintendo', name: 'Nintendo Switch V2 (Enhanced Battery Life)', basePrice: 14000 },
  { id: 'switch-v1', brand: 'nintendo', name: 'Nintendo Switch V1 (Original / Unpatched HAC-001)', basePrice: 12500 },
  { id: 'switch-lite', brand: 'nintendo', name: 'Nintendo Switch Lite (Compact Handheld)', basePrice: 9500 },

  // Handheld Gaming PCs
  { id: 'steam-deck-oled', brand: 'handheld', name: 'Valve Steam Deck OLED (512GB / 1TB 90Hz HDR)', basePrice: 34000, popular: true },
  { id: 'steam-deck-lcd', brand: 'handheld', name: 'Valve Steam Deck LCD (256GB / 512GB NVMe)', basePrice: 24000 },
  { id: 'rog-ally-x', brand: 'handheld', name: 'ASUS ROG Ally X (Z1 Extreme 24GB RAM 1TB)', basePrice: 42000, popular: true },
  { id: 'rog-ally-z1', brand: 'handheld', name: 'ASUS ROG Ally (AMD Z1 Extreme 512GB 120Hz)', basePrice: 28500 },
];

export const SellConsolesPage: React.FC<SellConsolesPageProps> = ({
  onNavigateHome,
  onNavigateCategory,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<'playstation' | 'xbox' | 'nintendo' | 'handheld'>('playstation');
  const [selectedModelId, setSelectedModelId] = useState<string>('ps5-slim-disc');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'fair'>('flawless');
  const [warrantySealIntact, setWarrantySealIntact] = useState(true);
  const [hasExtraController, setHasExtraController] = useState(false);
  const [hasOriginalBox, setHasOriginalBox] = useState(true);
  const [extraGamesCount, setExtraGamesCount] = useState(0);

  // Doorstep Pickup Modal / Form State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    upiId: '',
    city: '',
    address: '',
    pincode: '',
    pickupDate: '',
    pickupTimeSlot: 'afternoon',
    serialNumber: '',
    notes: ''
  });

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter models by chosen brand
  const brandModels = CONSOLE_MODELS.filter((m) => m.brand === selectedBrand);
  const currentModel = CONSOLE_MODELS.find((m) => m.id === selectedModelId) || brandModels[0];

  // Calculate pricing
  const conditionMultiplier = condition === 'flawless' ? 1.0 : condition === 'good' ? 0.88 : 0.75;
  const sealBonus = warrantySealIntact ? 0 : -1000; // Small deduction if seal was opened
  const controllerBonus = hasExtraController ? 2200 : 0;
  const boxBonus = hasOriginalBox ? 500 : 0;
  const gamesBonus = extraGamesCount * 600;

  const baseCalculated = Math.round(currentModel.basePrice * conditionMultiplier);
  const totalCashEstimate = Math.max(3000, baseCalculated + sealBonus + controllerBonus + boxBonus + gamesBonus);
  const storeCreditEstimate = Math.round(totalCashEstimate * 1.1); // +10% store credit bonus

  // WhatsApp prefilled message
  const conditionLabel =
    condition === 'flawless'
      ? 'Flawless (Mint / Box & Cables)'
      : condition === 'good'
      ? 'Good (Minor wear, 100% working)'
      : 'Fair (Visible marks, fully functional)';

  const waMessage = encodeURIComponent(
    `Hi DJN Tech! I would like to sell my gaming console:\n\n` +
    `• Model: ${currentModel.name}\n` +
    `• Condition: ${conditionLabel}\n` +
    `• Extra Controller: ${hasExtraController ? 'Yes' : 'No'}\n` +
    `• Original Box: ${hasOriginalBox ? 'Yes' : 'No'}\n` +
    `• Games Included: ${extraGamesCount}\n\n` +
    `• Estimated Quote: ₹${totalCashEstimate.toLocaleString('en-IN')} Cash / ₹${storeCreditEstimate.toLocaleString('en-IN')} Store Credit\n\n` +
    `Please share the doorstep pickup and inspection details.`
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DJN-SELL-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(newId);
    setBookingSuccess(true);
  };

  const faqs = [
    {
      q: 'How fast will I receive the payment after selling my console?',
      a: 'Payment is transferred immediately upon 15-minute diagnostic testing. Once our technician tests the console, the cash is transferred on the spot to your Bank Account or UPI (Google Pay, PhonePe, Paytm).'
    },
    {
      q: 'Is doorstep pickup free across India?',
      a: 'Yes! We offer 100% free doorstep pickup across major Indian cities including Chennai, Coimbatore, Bengaluru, Hyderabad, Mumbai, Delhi-NCR, Pune, and all Tier 1/2 pin codes via our insured logistics network.'
    },
    {
      q: 'Will my personal accounts and private data be wiped safely?',
      a: 'Absolutely. We perform a certified multi-pass factory format and NAND wipe on all storage units in your presence or in our testing lab, removing all PSN, Xbox Live, saved games, and personal credentials permanently.'
    },
    {
      q: 'What if my console has cosmetic scratches or no original box?',
      a: 'No problem! We buy consoles in all functional conditions. Select "Good" or "Fair" in our calculator above for an accurate quote. We only require the power cable, HDMI cord, and at least one working controller.'
    },
    {
      q: 'Can I choose Store Credit instead of Cash?',
      a: 'Yes! When choosing DJN Tech Store Credit, you get an extra +10% bonus valuation to spend on any PS5 Slim, Pro consoles, DualSense controllers, or tested pre-owned games in our store.'
    }
  ];

  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-[#0b0f17] min-h-screen py-6 sm:py-10 text-[#212121] dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-[#6b7280] dark:text-gray-400 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] dark:text-gray-600" />
          <span className="text-[#111827] dark:text-white font-semibold">
            Sell Your Consoles
          </span>
        </div>

        {/* Page Title & Overview */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Sell Your Gaming Console
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Get an instant valuation quote for your PlayStation, Xbox, or Nintendo hardware below. Free doorstep pickup across India with direct payment via UPI or bank transfer upon inspection.
          </p>
        </div>

        {/* Valuation Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Interactive Estimator Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Select Brand */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Select Console Brand
                </h2>
                <span className="text-xs text-[#6b7280] dark:text-gray-400">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'playstation', label: 'PlayStation', sub: 'PS5, PS4 & Portal' },
                  { id: 'xbox', label: 'Xbox', sub: 'Series X|S & One' },
                  { id: 'nintendo', label: 'Nintendo', sub: 'Switch OLED & Lite' },
                  { id: 'handheld', label: 'Handheld PCs', sub: 'Steam Deck & ROG Ally' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBrand(b.id as any);
                      const first = CONSOLE_MODELS.find((m) => m.brand === b.id);
                      if (first) setSelectedModelId(first.id);
                    }}
                    className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedBrand === b.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                        : 'border-[#e5e7eb] dark:border-[#2d3748] hover:border-gray-400 dark:hover:border-gray-600 text-[#4b5563] dark:text-gray-300'
                    }`}
                  >
                    <p className="text-sm sm:text-base font-bold">{b.label}</p>
                    <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-0.5">{b.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Exact Console Model */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Select Your Exact Model
                </h2>
                <span className="text-xs text-[#6b7280] dark:text-gray-400">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brandModels.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      selectedModelId === m.id
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold shadow-xs ring-1 ring-blue-500/20'
                        : 'border-[#e5e7eb] dark:border-[#2d3748] hover:border-gray-400 dark:hover:border-gray-600 text-[#1f2937] dark:text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-[#111827] dark:text-white">{m.name}</p>
                        {m.popular && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold">
                            TOP VALUE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-0.5">
                        Max Buyback: Up to ₹{m.basePrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedModelId === m.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedModelId === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Console Condition & Add-ons */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                  Hardware Condition & Extras
                </h2>
                <span className="text-xs text-[#6b7280] dark:text-gray-400">Step 3 of 3</span>
              </div>

              {/* Condition Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  {
                    id: 'flawless',
                    title: 'Flawless / Mint',
                    desc: 'Zero scratches, runs silent, with all cords & controller.',
                    badge: '100% Value'
                  },
                  {
                    id: 'good',
                    title: 'Good Condition',
                    desc: 'Minor cosmetic marks, 100% functional, power cable.',
                    badge: '88% Value'
                  },
                  {
                    id: 'fair',
                    title: 'Fair / Working',
                    desc: 'Visible wear or scuffs, fully working disc/HDMI.',
                    badge: '75% Value'
                  },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCondition(c.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      condition === c.id
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-[#e5e7eb] dark:border-[#2d3748] hover:border-gray-400 dark:hover:border-gray-600 text-[#4b5563] dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">{c.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6b7280] dark:text-gray-400 leading-relaxed">{c.desc}</p>
                  </button>
                ))}
              </div>

              {/* Warranty Seal Status (Shop Verification) */}
              <div className="mb-4 p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748]">
                <p className="text-xs font-bold text-[#111827] dark:text-white mb-2">
                  Factory Warranty Sticker Status
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setWarrantySealIntact(true)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                      warrantySealIntact
                        ? 'border-emerald-600 bg-white dark:bg-[#1f293d] text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                        : 'border-transparent text-[#6b7280] dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <span>✓ Seal Intact (Never Opened)</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Full Value</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWarrantySealIntact(false)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                      !warrantySealIntact
                        ? 'border-amber-600 bg-white dark:bg-[#1f293d] text-amber-700 dark:text-amber-400 font-bold shadow-xs'
                        : 'border-transparent text-[#6b7280] dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <span>⚠️ Seal Broken / Repaired</span>
                    <span className="text-[10px] text-amber-600 font-bold">-₹1,000</span>
                  </button>
                </div>
              </div>

              {/* Add-on toggles */}
              <div className="space-y-3 pt-4 border-t border-[#f3f4f6] dark:border-[#1e293b]">
                <p className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider">
                  Included Accessories & Bundles
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] hover:bg-[#f9fafb] dark:hover:bg-[#161f30] cursor-pointer transition-colors">
                    <div className="text-xs">
                      <p className="font-semibold text-[#111827] dark:text-white">Extra Wireless Controller</p>
                      <p className="text-[#6b7280] dark:text-gray-400 text-[11px]">+₹2,200 added to quote</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasExtraController}
                      onChange={(e) => setHasExtraController(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] hover:bg-[#f9fafb] dark:hover:bg-[#161f30] cursor-pointer transition-colors">
                    <div className="text-xs">
                      <p className="font-semibold text-[#111827] dark:text-white">Original Box & Manuals</p>
                      <p className="text-[#6b7280] dark:text-gray-400 text-[11px]">+₹500 bonus added</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasOriginalBox}
                      onChange={(e) => setHasOriginalBox(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Extra Games Counter */}
                <div className="p-3 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#111827] dark:text-white">Selling Any Original Game Discs?</p>
                    <p className="text-[#6b7280] dark:text-gray-400 text-[11px]">₹600 added per tested disc</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraGamesCount((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-[#f3f4f6] dark:bg-[#1f293d] hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#111827] dark:text-white">{extraGamesCount}</span>
                    <button
                      type="button"
                      onClick={() => setExtraGamesCount((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-[#f3f4f6] dark:bg-[#1f293d] hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Shop Inspection Checklist Badges */}
                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-[11px] text-blue-800 dark:text-blue-300 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    DJN Tech Buyback Standards:
                  </p>
                  <p>• Verified not banned from PlayStation Network, Xbox Live, or Nintendo Network.</p>
                  <p>• Free factory format & permanent NAND data wipe performed in front of you.</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Instant Live Quote Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 shadow-xl space-y-6">
              
              <div className="border-b border-[#f0f2f5] dark:border-[#1e293b] pb-4">
                <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-wider block mb-1">
                  Verified Buyback Valuation
                </span>
                <h3 className="text-lg font-extrabold text-[#111827] dark:text-white leading-snug">
                  {currentModel.name}
                </h3>
                <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
                  Graded as: <strong className="text-[#111827] dark:text-white">{conditionLabel}</strong>
                </p>
              </div>

              {/* Instant Valuation Numbers */}
              <div className="space-y-3.5">
                {/* Cash Option */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                    <span>Instant Cash (Bank / UPI)</span>
                    <span className="bg-emerald-200 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-[10px] font-bold">SAME DAY</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    ₹{totalCashEstimate.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
                    Direct transfer to Google Pay, PhonePe, or Bank NEFT.
                  </p>
                </div>

                {/* Store Credit Option with 10% bonus */}
                <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">
                    <span>DJN Store Credit</span>
                    <span className="bg-amber-400 text-gray-900 px-2 py-0.5 rounded text-[10px] font-black">+10% EXTRA</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                    ₹{storeCreditEstimate.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">
                    Upgrade to PS5 Slim/Pro or get latest tested games.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-[#111827] dark:bg-blue-600 hover:bg-[#1a73e8] dark:hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Request Free Doorstep Pickup</span>
                </button>

                <a
                  href={`https://wa.me/918446439374?text=${waMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Sell on WhatsApp (+91 84464 39374)</span>
                </a>
              </div>

              {/* Guarantee badges */}
              <div className="pt-3 border-t border-[#f0f2f5] dark:border-[#1e293b] text-[11px] text-[#6b7280] dark:text-gray-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Quote guaranteed for 7 full business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Zero shipping fees · Return free if unsatisfied</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Official testing video shared on WhatsApp</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Steps: How Selling Your Console Works */}
        <section className="bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-10 md:p-12 mb-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              How Selling Your Console Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-gray-400 mt-2">
              From instant quote to money in your bank account in 4 fast, transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Instant Online Quote',
                desc: 'Select your console model, condition, and accessories to lock in your live guaranteed cash quote.'
              },
              {
                step: '02',
                title: 'Free Doorstep Pickup',
                desc: 'Our insured logistics partner picks up the packaged console from your address anywhere in India.'
              },
              {
                step: '03',
                title: '15-Min Laser Diagnostics',
                desc: 'Our expert technician verifies optical disc reading, HDMI port, thermal fan noise, and NAND storage.'
              },
              {
                step: '04',
                title: 'Instant UPI Payment',
                desc: 'Payment transferred directly to your bank account or UPI within 15 minutes of testing completion.'
              },
            ].map((st) => (
              <div key={st.step} className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] relative">
                <span className="text-2xl sm:text-3xl font-black text-blue-600/40 dark:text-blue-400/30 block mb-2">
                  {st.step}
                </span>
                <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-1.5">{st.title}</h4>
                <p className="text-xs text-[#6b7280] dark:text-gray-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-10 mb-16 shadow-xs max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Frequently Asked Questions About Selling
            </h2>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
              Everything you need to know about testing, payment speed, and data privacy.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#e5e7eb] dark:border-[#1e293b] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#111827] dark:text-white hover:bg-[#f9fafb] dark:hover:bg-[#161f30] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-1 bg-[#f9fafb] dark:bg-[#161f30] text-xs text-[#6b7280] dark:text-gray-300 leading-relaxed border-t border-[#eaedf0] dark:border-[#2d3748]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Free Doorstep Pickup Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {!bookingSuccess ? (
              <>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0f2f5] dark:border-[#1e293b]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                      Schedule Free Doorstep Pickup
                    </h3>
                    <p className="text-xs text-[#6b7280] dark:text-gray-400">
                      Selling: {currentModel.name} (₹{totalCashEstimate.toLocaleString('en-IN')})
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        UPI ID for Instant Payment *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. yourname@okhdfcbank"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Coimbatore / Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="641001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                      Complete Pickup Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Door no, Building name, Street, Landmark, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Preferred Pickup Date
                      </label>
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Preferred Pickup Slot
                      </label>
                      <select
                        value={formData.pickupTimeSlot}
                        onChange={(e) => setFormData({ ...formData, pickupTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="morning">Morning (10 AM - 1 PM)</option>
                        <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Serial / Model No. (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CFI-1208A / CUH-7216B"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Accessories Included / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. With 2 games & HDMI cable"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Pickup & Lock Quote (₹{totalCashEstimate.toLocaleString('en-IN')})</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white">
                    Doorstep Pickup Scheduled!
                  </h3>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
                    Booking ID: <strong className="text-emerald-600 dark:text-emerald-400">{bookingId}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] text-xs text-left space-y-2">
                  <p className="text-[#374151] dark:text-gray-300">
                    • Our logistics team will call / WhatsApp you at <strong>{formData.phone}</strong> shortly to confirm the pickup slot.
                  </p>
                  <p className="text-[#374151] dark:text-gray-300">
                    • Please keep the console, power cable, HDMI cord, and controller in a safe box.
                  </p>
                  <p className="text-[#374151] dark:text-gray-300">
                    • Instant payment of <strong>₹{totalCashEstimate.toLocaleString('en-IN')}</strong> will be sent to your UPI (<strong>{formData.upiId || formData.phone}</strong>) post-bench test.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="w-full bg-[#111827] dark:bg-blue-600 text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
