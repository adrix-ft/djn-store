import React from 'react';
import { Phone, Mail, Facebook, Instagram, Youtube, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { Category } from '../types/store';
import { BrandLogo } from './BrandLogo';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  onSelectCategory: (category: Category | 'all') => void;
  onOpenPolicy: (type: PolicyType) => void;
  onOpenCart?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPolicy,
  onOpenCart,
}) => {
  return (
    <footer className="bg-white dark:bg-[#080d14] text-[#424242] dark:text-gray-300 border-t border-[#e5e7eb] dark:border-[#1e293b] pt-12 pb-8 transition-colors duration-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Brand Banner Strip */}
        <div className="mb-10 pb-8 border-b border-[#e5e7eb] dark:border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-6">
          <BrandLogo variant="horizontal" />
          <p className="text-xs text-[#64748b] dark:text-gray-400 max-w-md text-center sm:text-right">
            India's premier console store for authentic PlayStation 5, PS4 consoles, DualSense controllers, and certified tested pre-owned games.
          </p>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#e5e7eb] dark:border-[#1e293b] text-xs">
          
          {/* Column 1: Help Customers */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#212121] dark:text-white text-sm">Help Customers</h4>
            <p className="text-[#64748b] dark:text-gray-400 leading-relaxed">
              Contact us via WhatsApp or call for fast assistance.
            </p>
            <a
              href="https://wa.me/919629998859"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-medium text-[#212121] dark:text-gray-200 hover:text-[#25d366] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25d366]" />
              <span>+91 96299 98859 (WhatsApp)</span>
            </a>
            <a
              href="tel:+919629998859"
              className="flex items-center gap-2 font-medium text-[#212121] dark:text-gray-200 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
              <span>+91 96299 98859 (Call)</span>
            </a>
            <a
              href="mailto:djntech.india@gmail.com"
              className="flex items-center gap-2 text-[#64748b] dark:text-gray-400 hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#60a5fa]" />
              <span>djntech.india@gmail.com</span>
            </a>
          </div>

          {/* Column 2: Our Company */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#212121] dark:text-white text-sm">Our Company</h4>
            <ul className="space-y-2 text-[#64748b] dark:text-gray-400">
              <li>
                <button
                  onClick={() => onOpenPolicy('about')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('contact')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => (onOpenCart ? onOpenCart() : onSelectCategory('all'))}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  My Cart & Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  View All Inventory
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop by Category */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#212121] dark:text-white text-sm">Shop by Category</h4>
            <ul className="space-y-2 text-[#64748b] dark:text-gray-400">
              <li>
                <button
                  onClick={() => onSelectCategory('consoles')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Consoles (PS5, PS4 & Xbox)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('controllers')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Controllers (DualSense)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('preowned_games')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Pre-Owned Game Discs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Gaming Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Policy */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#212121] dark:text-white text-sm">Customer Policies</h4>
            <ul className="space-y-2 text-[#64748b] dark:text-gray-400">
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Shipping & Express Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  7-Day Replacement Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Connect */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#212121] dark:text-white text-sm">Social & Community</h4>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919629998859"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e7eb] dark:border-gray-800 flex items-center justify-center text-[#64748b] dark:text-gray-400 hover:text-[#25d366] hover:border-[#25d366] transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e7eb] dark:border-gray-800 flex items-center justify-center text-[#64748b] dark:text-gray-400 hover:text-[#e1306c] hover:border-[#e1306c] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e7eb] dark:border-gray-800 flex items-center justify-center text-[#64748b] dark:text-gray-400 hover:text-[#ff0000] hover:border-[#ff0000] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-[11px] text-[#64748b] dark:text-gray-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>100% Secure Checkout & Support</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-[#64748b] dark:text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} DJN Tech (djntech.in). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onOpenPolicy('shipping')} className="hover:text-[#111827] dark:hover:text-white">Free Delivery</button>
            <span>·</span>
            <button onClick={() => onOpenPolicy('refund')} className="hover:text-[#111827] dark:hover:text-white">7-Day Returns</button>
            <span>·</span>
            <button onClick={() => onOpenPolicy('privacy')} className="hover:text-[#111827] dark:hover:text-white">Privacy</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

