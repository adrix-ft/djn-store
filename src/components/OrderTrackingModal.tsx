import React, { useState } from 'react';
import { X, Search, Truck, Package, ShieldCheck, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

interface TrackingStage {
  title: string;
  desc: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId || 'DJN-84291');
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderIdInput.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearched(true);
    }, 400);
  };

  const stages: TrackingStage[] = [
    {
      title: 'Order Confirmed & Payment Verified',
      desc: 'Order received. Secured via Razorpay 256-bit SSL.',
      time: 'Yesterday, 04:15 PM',
      completed: true,
    },
    {
      title: 'DJN Tech 25-Point Hardware QA Inspection',
      desc: 'Disc drive, laser reading, thermal paste & DualSense drift tested.',
      time: 'Yesterday, 07:30 PM',
      completed: true,
    },
    {
      title: 'Dispatched via Blue Dart Apex Express',
      desc: 'AWB #BLUEDART-88294101 · Transit hub Mumbai sorting facility.',
      time: 'Today, 08:45 AM',
      completed: true,
      current: true,
    },
    {
      title: 'Out for Delivery',
      desc: 'Courier executive assigned with OTP hand-off.',
      time: 'Estimated Tomorrow by 01:00 PM',
      completed: false,
    },
    {
      title: 'Delivered to Doorstep',
      desc: 'Includes 3-month DJN Tech replacement guarantee.',
      time: 'Expected Tomorrow',
      completed: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#111827] w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all text-[#212121] dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-[#161f30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Live Order Tracking</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Real-time express dispatch across India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Tracking Search Input */}
          <form onSubmit={handleTrack} className="space-y-3">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Enter Order ID or Contact Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="e.g. DJN-84291 or 9876543210"
                  className="w-full bg-gray-50 dark:bg-[#1a2333] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isSearching ? (
                  <span className="inline-block animate-spin">⌛</span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Track</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Sample Pills */}
            <div className="flex items-center gap-2 pt-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
              <span>Quick demo:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput('DJN-84291');
                  setSearched(true);
                }}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
              >
                DJN-84291 (PS5 Console)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput('DJN-65120');
                  setSearched(true);
                }}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
              >
                DJN-65120 (DualSense Red)
              </button>
            </div>
          </form>

          {searched && (
            <div className="space-y-6 pt-2 animate-in fade-in duration-300">
              {/* Order Status Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {orderIdInput || 'DJN-84291'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      In Transit
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                    PlayStation 5 Slim Disc Edition + God of War
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Delivery to: Koramangala, Bengaluru - 560034
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                  <p className="text-base font-bold text-blue-600 dark:text-blue-400">Tomorrow by 1 PM</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">Air Express Guaranteed</p>
                </div>
              </div>

              {/* Courier info strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Carrier</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Blue Dart Express</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Tracking Number</span>
                  <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">BD-98234419</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Service Tier</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Insured Priority Air</span>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
                {stages.map((stage, idx) => (
                  <div key={idx} className="relative group">
                    {/* Step Icon Pin */}
                    <div 
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        stage.current
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50 scale-110'
                          : stage.completed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {stage.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-sm font-bold ${
                          stage.current 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : stage.completed 
                            ? 'text-gray-900 dark:text-gray-100' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {stage.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                          {stage.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Banner */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1a2333] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Need help with this order?</span>
                <a
                  href="https://wa.me/918446439374?text=Hi%20DJN%20Tech,%20I%20have%20a%20question%20regarding%20my%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Chat with WhatsApp Support <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
