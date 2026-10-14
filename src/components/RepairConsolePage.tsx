import React, { useState } from 'react';
import {
  ChevronRight,
  Wrench,
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
  Clock,
  Cpu,
  Flame,
  Gamepad,
  Gamepad2,
  Tv,
  Disc,
  Power,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';
import { Category, Platform, Product } from '../types/store';
import { submitRepairRequestToDB } from '../lib/supabase';

interface RepairConsolePageProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category | 'all', platform?: Platform | 'all') => void;
  onSelectProduct?: (product: Product) => void;
}

interface RepairIssueOption {
  id: string;
  title: string;
  desc: string;
  price: number;
  turnaround: string;
  popular?: boolean;
  iconName: 'tv' | 'flame' | 'gamepad' | 'disc' | 'power' | 'cpu';
}

const REPAIR_ISSUES: Record<string, RepairIssueOption[]> = {
  ps5: [
    {
      id: 'ps5-hdmi',
      title: 'HDMI 2.1 Port Replacement',
      desc: 'Fix bent pins, loose socket, black screen or 4K 120Hz signal dropping.',
      price: 1799,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'tv'
    },
    {
      id: 'ps5-thermal',
      title: 'Liquid Metal & Deep Thermal Service',
      desc: 'Ultrasonic cleaning, dry liquid metal respread, thermal pads & silent fan.',
      price: 999,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'flame'
    },
    {
      id: 'ps5-disc',
      title: 'Ultra HD Blu-Ray Laser & Mechanism',
      desc: 'Fix discs not reading, scratching, stuck disc roller or laser blindness.',
      price: 1599,
      turnaround: '24-48 Hours',
      iconName: 'disc'
    },
    {
      id: 'ps5-power',
      title: 'Power Supply (PSU) / BLOD Repair',
      desc: 'Fix console suddenly turning off while gaming, 1-beep shutoff, power surge.',
      price: 2499,
      turnaround: '48 Hours',
      popular: true,
      iconName: 'power'
    },
    {
      id: 'ps5-usb',
      title: 'Front USB Type-C & Type-A Port Solder',
      desc: 'Fix loose or broken front USB ports, controllers not charging wired.',
      price: 899,
      turnaround: '24 Hours',
      iconName: 'tv'
    },
    {
      id: 'ps5-wifi',
      title: 'Wi-Fi & Bluetooth Controller Sync IC',
      desc: 'Fix DualSense disconnecting wirelessly, AW-XM510 IC & antenna repair.',
      price: 1899,
      turnaround: '48 Hours',
      iconName: 'gamepad'
    },
    {
      id: 'ps5-software',
      title: 'Safe Mode Loop / Storage Error CE-108255-1',
      desc: 'Corrupted system rebuild, NAND re-flash, clean OS restoration.',
      price: 799,
      turnaround: '24 Hours',
      iconName: 'cpu'
    },
    {
      id: 'ps5-motherboard',
      title: 'Motherboard Chip-Level Diagnostic',
      desc: 'Liquid damage, power rail shorts, Southbridge replacement, fuse restoration.',
      price: 1999,
      turnaround: '48-72 Hours',
      iconName: 'cpu'
    }
  ],
  ps4: [
    {
      id: 'ps4-thermal',
      title: 'Thermal Overhaul & Fan Noise Fix',
      desc: 'Fix PS4 jet engine fan noise, Arctic MX-6 paste application, heat sink unblock.',
      price: 899,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'flame'
    },
    {
      id: 'ps4-hdmi',
      title: 'HDMI Port & Panasonic IC Chip',
      desc: 'White Light of Death (WLOD) repair, bent HDMI port pins, no signal display.',
      price: 1499,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'tv'
    },
    {
      id: 'ps4-hdd',
      title: 'Hard Drive (HDD) Failure & Error SU-42118-0',
      desc: 'Fix Cannot start the PS4, flashing blue light loop, 1TB Seagate drive upgrade.',
      price: 1199,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'cpu'
    },
    {
      id: 'ps4-laser',
      title: 'Optical Laser Lens & Auto-Eject Sensor',
      desc: 'Fix unrecognized disc error, optical drive roller eject issue, continuous beeping.',
      price: 1299,
      turnaround: '24-48 Hours',
      iconName: 'disc'
    },
    {
      id: 'ps4-power',
      title: 'Power Supply Unit Replacement',
      desc: 'Fix console not powering on, no beeps, power board replacement.',
      price: 1899,
      turnaround: '24-48 Hours',
      iconName: 'power'
    },
    {
      id: 'ps4-blod',
      title: 'Southbridge IC / BLOD Micro-soldering',
      desc: 'Pulsing Blue Light of Death fix, APU re-balling, power rail fuse repair.',
      price: 2199,
      turnaround: '48-72 Hours',
      iconName: 'cpu'
    }
  ],
  xbox: [
    {
      id: 'xbox-hdmi',
      title: 'Xbox Series X/S HDMI Port Repair',
      desc: 'Official 4K 120Hz HDMI port replacement with micro-soldering.',
      price: 1899,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'tv'
    },
    {
      id: 'xbox-thermal',
      title: 'Thermal Cleaning & Fan Service',
      desc: 'Deep internal vapor chamber cleaning & premium thermal interface paste.',
      price: 999,
      turnaround: '24 Hours',
      iconName: 'flame'
    },
    {
      id: 'xbox-disc',
      title: 'Series X Disc Drive Laser Repair',
      desc: 'Optical drive pickup lens replacement & drive calibration.',
      price: 1699,
      turnaround: '48 Hours',
      iconName: 'disc'
    },
    {
      id: 'xbox-storage',
      title: 'Green Screen of Death / Error E100/E101 Fix',
      desc: 'Internal NVMe SSD / HDD partition rebuild, offline OSU1 update restoration.',
      price: 1499,
      turnaround: '24-48 Hours',
      popular: true,
      iconName: 'cpu'
    },
    {
      id: 'xbox-power',
      title: 'Power Supply Unit Diagnostic',
      desc: 'Short circuit protection recovery & internal PSU rebuild.',
      price: 2299,
      turnaround: '48 Hours',
      iconName: 'power'
    },
    {
      id: 'xbox-sync',
      title: 'Controller Wireless Sync / RF Module',
      desc: 'Fix controllers not syncing wirelessly, front RF antenna board swap.',
      price: 1299,
      turnaround: '24 Hours',
      iconName: 'gamepad'
    }
  ],
  nintendo: [
    {
      id: 'switch-charging',
      title: 'USB Type-C & M92T36 Power IC Repair',
      desc: 'Fix Switch not charging, dead battery indicator, dock mode output failure.',
      price: 1499,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'power'
    },
    {
      id: 'switch-joycon',
      title: 'Joy-Con Drift / Hall Effect Magnetic Upgrade',
      desc: 'Fix drifting analog sticks, zero-friction electromagnetic sensors fitted.',
      price: 599,
      turnaround: 'Same Day',
      popular: true,
      iconName: 'gamepad'
    },
    {
      id: 'switch-screen',
      title: 'LCD / OLED Screen & Touch Glass Digitizer',
      desc: 'Fix cracked screen, bleeding colors, unresponsive touch layer.',
      price: 2299,
      turnaround: '24-48 Hours',
      iconName: 'tv'
    },
    {
      id: 'switch-battery',
      title: 'OEM Battery Replacement',
      desc: 'Fix battery draining fast or swelling, original high-capacity cell.',
      price: 899,
      turnaround: 'Same Day',
      iconName: 'power'
    },
    {
      id: 'switch-card-reader',
      title: 'Game Card Reader & Audio Jack Board',
      desc: 'Fix The game card could not be read error and crackling headphone jack.',
      price: 1199,
      turnaround: '24 Hours',
      iconName: 'disc'
    },
    {
      id: 'switch-thermal',
      title: 'Cooling Fan & Thermal Repaste',
      desc: 'Fix loud buzzing fan noise, console overheating and going to sleep.',
      price: 699,
      turnaround: 'Same Day',
      iconName: 'flame'
    }
  ],
  controller: [
    {
      id: 'ctrl-drift-standard',
      title: 'DualSense / Xbox Analog Stick Drift Fix',
      desc: 'Replace worn potentiometer sensors with calibrated Alps ALPS modules.',
      price: 699,
      turnaround: 'Same Day',
      popular: true,
      iconName: 'gamepad'
    },
    {
      id: 'ctrl-drift-hall',
      title: 'Hall Effect Magnetic Joysticks Upgrade',
      desc: 'Never get stick drift again! Electromagnetic zero-friction sensor installation.',
      price: 1199,
      turnaround: '24 Hours',
      popular: true,
      iconName: 'gamepad'
    },
    {
      id: 'ctrl-trigger',
      title: 'Adaptive Trigger Spring & Motor Repair',
      desc: 'Fix broken DualSense L2/R2 spring, loose haptic feedback gear.',
      price: 499,
      turnaround: 'Same Day',
      iconName: 'gamepad'
    },
    {
      id: 'ctrl-usbc',
      title: 'USB-C Charging Port Solder Repair',
      desc: 'Fix loose controller charging cable, damaged pins, controller not turning on.',
      price: 499,
      turnaround: 'Same Day',
      iconName: 'tv'
    },
    {
      id: 'ctrl-battery',
      title: 'Extended Battery Replacement',
      desc: 'New high-capacity OEM battery cell for longer wireless gaming sessions.',
      price: 599,
      turnaround: 'Same Day',
      iconName: 'power'
    },
    {
      id: 'ctrl-buttons',
      title: 'Conductive Rubber Pads & D-Pad Buttons Fix',
      desc: 'Fix sticky X/O/Square/Triangle buttons, unresponsive directional pad.',
      price: 399,
      turnaround: 'Same Day',
      iconName: 'gamepad'
    }
  ]
};

export const RepairConsolePage: React.FC<RepairConsolePageProps> = ({
  onNavigateHome,
  onNavigateCategory,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'ps5' | 'ps4' | 'xbox' | 'nintendo' | 'controller'>('ps5');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('ps5-hdmi');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    pincode: '',
    consoleSerial: '',
    preferredDate: '',
    preferredTimeSlot: 'afternoon',
    problemDescription: '',
    includedItems: 'console-only'
  });

  const availableIssues = REPAIR_ISSUES[selectedDevice] || REPAIR_ISSUES.ps5;
  const currentIssue =
    availableIssues.find((it) => it.id === selectedIssueId) || availableIssues[0];

  const deviceName =
    selectedDevice === 'ps5'
      ? 'PlayStation 5 (Slim / Fat / Pro)'
      : selectedDevice === 'ps4'
      ? 'PlayStation 4 (Pro / Slim / Fat)'
      : selectedDevice === 'xbox'
      ? 'Xbox Series X|S / Xbox One'
      : 'DualSense / Wireless Controller';

  const expressSurcharge = urgency === 'express' ? 300 : 0;
  const totalEstimatedCost = currentIssue.price + expressSurcharge;

  const waMessage = encodeURIComponent(
    `Hi DJN Tech! I need a repair quote for my gaming hardware:\n\n` +
    `• Device: ${deviceName}\n` +
    `• Issue: ${currentIssue.title}\n` +
    `• Service: ${urgency === 'express' ? 'Express (Same-Day / 24h)' : 'Standard'}\n` +
    `• Estimated Cost: ₹${totalEstimatedCost.toLocaleString('en-IN')}\n\n` +
    `Please assist me with doorstep pickup / service center instructions.`
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DJN-FIX-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(newId);
    setBookingSuccess(true);

    submitRepairRequestToDB({
      id: newId,
      consoleType: deviceName,
      issueId: currentIssue.id,
      issueTitle: currentIssue.title,
      estimatedCost: totalEstimatedCost,
      customerName: formData.fullName,
      customerPhone: formData.phone,
      pickupAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      notes: `${formData.problemDescription ? 'Problem: ' + formData.problemDescription + ' | ' : ''}Serial: ${formData.consoleSerial || 'N/A'}, Urgency: ${urgency}, Slot: ${formData.preferredDate || 'Earliest'} ${formData.preferredTimeSlot}`,
    }).catch((err) => {
      console.warn('[Supabase] Failed to persist repair request:', err);
    });
  };

  const faqs = [
    {
      q: 'What is your No-Fix No-Fee Policy?',
      a: 'We believe in 100% honesty. If our certified technicians inspect your console and it is determined beyond economical repair, you pay absolutely zero diagnostic fees.'
    },
    {
      q: 'Do you offer a warranty on console repairs?',
      a: 'Yes! Every repair completed by DJN Tech comes with our comprehensive 90-Day Repair Guarantee. If the same hardware component fails within 90 days, we repair it again completely free of charge.'
    },
    {
      q: 'How does doorstep pickup work across India?',
      a: 'Once you schedule a pickup, our insured courier partner collects your console securely packaged from your doorstep in cities like Chennai, Coimbatore, Bengaluru, Mumbai, Delhi, Hyderabad, and all Tier 1/2 pin codes.'
    },
    {
      q: 'What are Hall Effect Joysticks for controllers?',
      a: 'Standard controller thumbsticks use physical carbon potentiometers that wear down and cause stick drift. Hall Effect joysticks use magnetic fields and sensors with zero physical friction, meaning they never drift for the lifetime of your controller.'
    },
    {
      q: 'Will my save data or accounts be wiped during repair?',
      a: 'No! Unlike official service centers that swap units and wipe everything, we perform hardware-level component repair. Your internal SSD, save games, user accounts, and trophies remain 100% untouched.'
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
            Repair Your Console
          </span>
        </div>

        {/* Page Title & Overview */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Console & Controller Repairs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Professional diagnostics and hardware repair for PlayStation, Xbox, and controllers. Genuine OEM components, 90-day repair warranty coverage, and insured doorstep pickup.
          </p>
        </div>

        {/* Repair Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Interactive Selection */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Select Console / Hardware */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Select Hardware To Repair
                </h2>
                <span className="text-xs text-[#6b7280] dark:text-gray-400">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'ps5', label: 'PlayStation 5', sub: 'Slim, Pro, Fat', tag: 'PS5' },
                  { id: 'ps4', label: 'PlayStation 4', sub: 'Pro, Slim, Fat', tag: 'PS4' },
                  { id: 'xbox', label: 'Xbox Consoles', sub: 'Series X|S, One', tag: 'XBOX' },
                  { id: 'nintendo', label: 'Nintendo Switch', sub: 'OLED, V2, Lite', tag: 'SWITCH' },
                  { id: 'controller', label: 'Controllers', sub: 'DualSense, Xbox', tag: 'CTRL' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDevice(d.id as any);
                      const first = REPAIR_ISSUES[d.id]?.[0];
                      if (first) setSelectedIssueId(first.id);
                    }}
                    className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDevice === d.id
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-xs ring-1 ring-blue-500/20'
                        : 'border-[#e5e7eb] dark:border-[#2d3748] hover:border-gray-400 dark:hover:border-gray-600 text-[#4b5563] dark:text-gray-300'
                    }`}
                  >
                    <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mb-2">{d.tag}</span>
                    <p className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">{d.label}</p>
                    <p className="text-[11px] text-[#6b7280] dark:text-gray-400 mt-0.5">{d.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Issue / Repair Needed */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Select Hardware Issue / Service
                </h2>
                <span className="text-xs text-[#6b7280] dark:text-gray-400">Step 2 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {availableIssues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedIssueId === issue.id
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-[#e5e7eb] dark:border-[#2d3748] hover:border-gray-400 dark:hover:border-gray-600 text-[#1f2937] dark:text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">
                          {issue.title}
                        </span>
                        {issue.popular && (
                          <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-bold">
                            FREQUENT
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-[#6b7280] dark:text-gray-400 leading-relaxed mb-3">
                        {issue.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-[#f3f4f6] dark:border-[#1e293b] text-xs">
                      <span className="font-extrabold text-[#111827] dark:text-white text-sm">
                        ₹{issue.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#6b7280] dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500" />
                        {issue.turnaround}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Service Speed Toggle */}
              <div className="mt-6 pt-5 border-t border-[#f0f2f5] dark:border-[#1e293b]">
                <p className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider mb-2.5">
                  Service Speed Option
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'standard'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-[#e5e7eb] dark:border-[#2d3748]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#111827] dark:text-white">Standard Diagnostic & Bench Test</p>
                    <p className="text-[11px] text-[#6b7280] dark:text-gray-400">Regular queue · Included in base price</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('express')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'express'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-[#e5e7eb] dark:border-[#2d3748]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#111827] dark:text-white">Express Priority Bench</p>
                      <span className="text-[10px] font-bold text-blue-600">+₹300</span>
                    </div>
                    <p className="text-[11px] text-[#6b7280] dark:text-gray-400">Immediate diagnostic inspection</p>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Repair Quote Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 shadow-xl space-y-6">
              
              <div className="border-b border-[#f0f2f5] dark:border-[#1e293b] pb-4">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Guaranteed Repair Quote
                </span>
                <h3 className="text-lg font-extrabold text-[#111827] dark:text-white leading-snug">
                  {currentIssue.title}
                </h3>
                <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
                  Hardware: <strong className="text-[#111827] dark:text-white">{deviceName}</strong>
                </p>
              </div>

              {/* Price card */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  <span>Estimated Total (Parts + Labor)</span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    90-DAY WARRANTY
                  </span>
                </div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                  ₹{totalEstimatedCost.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-blue-700 dark:text-blue-300 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Turnaround: {currentIssue.turnaround}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-[#111827] dark:bg-blue-600 hover:bg-[#1a73e8] dark:hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Schedule Free Doorstep Pickup</span>
                </button>

                <a
                  href={`https://wa.me/918446439374?text=${waMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Technician (+91 84464 39374)</span>
                </a>
              </div>

              {/* Assurances */}
              <div className="pt-3 border-t border-[#f0f2f5] dark:border-[#1e293b] text-[11px] text-[#6b7280] dark:text-gray-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No Fix, No Fee — ₹0 if not repairable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Your save games and SSD data remain untouched</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Testing video shared prior to dispatch</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Steps: How Repair Process Works */}
        <section className="bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-10 md:p-12 mb-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Our 4-Step Precision Repair Process
            </h2>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-gray-400 mt-2">
              From doorstep pickup to testing and delivery back to your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Book Pickup Online',
                desc: 'Select your console issue and lock in your transparent quote with free insured courier pickup.'
              },
              {
                step: '02',
                title: 'Microscope Inspection',
                desc: 'Our certified engineers inspect solder joints, power lines, and thermal paste under microscope.'
              },
              {
                step: '03',
                title: 'Component Repair',
                desc: 'Original OEM parts fitted with anti-static ESD tools and high-grade soldering stations.'
              },
              {
                step: '04',
                title: '2-Hour Stress Test & Return',
                desc: 'Benchmark tested with 4K games for 2 hours, then safely couriered back with 90-day warranty.'
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

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#111827] rounded-3xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-10 mb-16 shadow-xs max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Frequently Asked Questions About Console Repairs
            </h2>
            <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
              Clear answers regarding warranty, parts, and safety.
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
                      Book Console Repair Pickup
                    </h3>
                    <p className="text-xs text-[#6b7280] dark:text-gray-400">
                      {currentIssue.title} (₹{totalEstimatedCost.toLocaleString('en-IN')})
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
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
                  </div>

                  <div>
                    <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                      Complete Pickup Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Door no, Street, Landmark, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
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
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Preferred Pickup Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Preferred Pickup Slot
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="morning">Morning (10 AM - 1 PM)</option>
                        <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                        Console Serial / Model No. (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CFI-1108A / 03-274..."
                        value={formData.consoleSerial}
                        onChange={(e) => setFormData({ ...formData, consoleSerial: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                      Included Items With Package
                    </label>
                    <select
                      value={formData.includedItems}
                      onChange={(e) => setFormData({ ...formData, includedItems: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="console-only">Console / Controller Only (Recommended)</option>
                      <option value="console-power">Console + Power Cable</option>
                      <option value="console-all">Console + Power Cable + HDMI Cable</option>
                      <option value="with-controller">Console + Controller (Need controller check)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#374151] dark:text-gray-300 mb-1">
                      Describe Fault Symptoms / Problem Details *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. HDMI port has bent pins, TV says No Signal. Turns on with blue light then white light."
                      value={formData.problemDescription}
                      onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-[#f9fafb] dark:bg-[#161f30] text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>Confirm Repair Booking (₹{totalEstimatedCost.toLocaleString('en-IN')})</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white">
                    Repair Pickup Scheduled!
                  </h3>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">
                    Service Job ID: <strong className="text-blue-600 dark:text-blue-400">{bookingId}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#161f30] border border-[#eaedf0] dark:border-[#2d3748] text-xs text-left space-y-2">
                  <p className="text-[#374151] dark:text-gray-300">
                    • Our logistics team will call / WhatsApp you at <strong>{formData.phone}</strong> to confirm the pickup timing.
                  </p>
                  <p className="text-[#374151] dark:text-gray-300">
                    • Please send only the console and power cord (no need to send original HDMI or controllers unless they need repair).
                  </p>
                  <p className="text-[#374151] dark:text-gray-300">
                    • 90-Day Warranty applies to all replaced parts and labor.
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
