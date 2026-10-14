import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Phone, Mail, HelpCircle, FileText, Scale } from 'lucide-react';

export type PolicyType = 'about' | 'contact' | 'terms' | 'privacy' | 'shipping' | 'refund' | 'grievance';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getPolicyContent = () => {
    switch (type) {
      case 'shipping':
        return {
          title: 'Shipping & Delivery Policy',
          icon: Truck,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] leading-relaxed">
              <p>
                At <strong>DJN Tech</strong>, we understand that gamers want their consoles, controllers, and games as quickly and safely as possible.
              </p>
              <div className="p-4 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1]">
                <h4 className="font-bold text-[#0c4a6e] mb-1">Free Delivery</h4>
                <p>We provide <strong>100% Free Insured Delivery</strong> on all orders above ₹1,000 across all serviceable pin codes in India.</p>
              </div>
              <h4 className="font-bold text-[#111827] text-base mt-4">Dispatch & Timeline</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Orders are processed, bubble-wrapped, and dispatched within <strong>24 to 48 hours</strong>.</li>
                <li>Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad): <strong>2–3 business days</strong>.</li>
                <li>Rest of India: <strong>3–5 business days</strong>.</li>
                <li>Every order is shipped via insured premium express couriers (BlueDart, Delhivery, DTDC).</li>
              </ul>
              <h4 className="font-bold text-[#111827] text-base mt-4">Packaging & Damage Protection</h4>
              <p>
                Consoles and discs are packed in heavy-duty triple-layer shockproof bubble wraps and rigid boxes. In the rare event of transit damage, we provide an immediate free replacement.
              </p>
            </div>
          )
        };
      case 'refund':
        return {
          title: 'Refund & 7-Day Replacement Policy',
          icon: RotateCcw,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] leading-relaxed">
              <p>
                We stand behind the quality of every product we sell. All pre-owned game discs, controllers, and consoles come with our certified <strong>7-Day Replacement Guarantee</strong>.
              </p>
              <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857]">
                <h4 className="font-bold text-[#065f46] mb-1">7-Day Zero-Hassle Replacement</h4>
                <p>If any pre-owned disc fails to read, console has any hardware issue, or controller exhibits stick drift, we will arrange a doorstep pickup and send you a replacement or issue a full refund.</p>
              </div>
              <h4 className="font-bold text-[#111827] text-base mt-4">How to Claim Replacement</h4>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Contact our support team on WhatsApp at <strong>+91 84464 39374</strong> within 7 days of delivery.</li>
                <li>Share a short photo or video showing the issue along with your Order ID.</li>
                <li>Our technician will verify and immediately initiate a reverse pickup.</li>
                <li>Once verified, replacement is dispatched immediately or refund is credited within 24-48 hours.</li>
              </ol>
            </div>
          )
        };
      case 'about':
        return {
          title: 'About DJN Tech Console Store',
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] leading-relaxed">
              <p>
                <strong>DJN Tech</strong> is India's dedicated gaming store founded by gamers, for gamers. We bridge the gap between expensive digital games and risky unverified second-hand markets.
              </p>
              <h4 className="font-bold text-[#111827] text-base">What Makes DJN Tech Different?</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>100% Genuine Sealed Units:</strong> Brand new PS5 & Xbox consoles with official Indian manufacturer warranty seals.</li>
                <li><strong>Tested Pre-Owned Discs:</strong> Every pre-owned game disc is cleaned and tested on retail consoles before packaging.</li>
                <li><strong>Transparent Pricing:</strong> Competitive rates with genuine customer support and real-time WhatsApp order tracking.</li>
              </ul>
              <p className="pt-2">
                Whether you are buying your first PlayStation 5 or expanding your pre-owned game collection, DJN Tech guarantees authenticity, speed, and peace of mind.
              </p>
            </div>
          )
        };
      case 'contact':
        return {
          title: 'Contact Us & Help Center',
          icon: Phone,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] leading-relaxed">
              <p>
                Have questions about a console, want to check disc condition, or need order tracking? Our team is available 7 days a week!
              </p>
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/918446439374"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#25d366]/10 border border-[#25d366]/30 text-[#128c7e] hover:bg-[#25d366]/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#25d366]" />
                  <div>
                    <span className="font-bold block text-sm text-[#075e54]">Chat on WhatsApp</span>
                    <span className="text-xs text-[#128c7e]">+91 84464 39374 (Fastest Response)</span>
                  </div>
                </a>

                <a
                  href="mailto:djntechofficial@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] hover:bg-[#e0f2fe] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#1a73e8]" />
                  <div>
                    <span className="font-bold block text-sm text-[#0c4a6e]">Email Support</span>
                    <span className="text-xs text-[#0369a1]">djntechofficial@gmail.com</span>
                  </div>
                </a>
              </div>
              <div className="pt-3 text-xs text-[#6b7280]">
                <p><strong>Support Timings:</strong> Monday to Sunday, 10:00 AM – 9:00 PM IST</p>
                <p className="mt-1">Orders placed before 2:00 PM are dispatched the same day.</p>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Use & Consumer Rights',
          icon: FileText,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] dark:text-gray-300 leading-relaxed">
              <p>
                Welcome to <strong>DJN Tech</strong> (djntech.in). By accessing our website, purchasing products, or booking repair and trade-in services, you agree to our terms compliant with the <em>Consumer Protection Act, 2019</em> and the <em>Consumer Protection (E-Commerce) Rules, 2020</em>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>100% Genuine Inventory:</strong> All brand-new consoles and accessories carry official Indian manufacturer warranties. All pre-owned game discs and consoles undergo technical verification and testing before dispatch.</li>
                <li><strong>Pricing Transparency:</strong> In accordance with Legal Metrology (Packaged Commodities) Rules, every listed price is displayed in Indian National Rupees (INR) and is strictly <strong>inclusive of all statutory taxes (GST)</strong>. No hidden surcharges or drip fees are applied at checkout.</li>
                <li><strong>Order Confirmation & Payments:</strong> Orders are confirmed upon receipt of valid electronic payment through RBI-compliant, PCI-DSS Level 1 certified gateways (Razorpay).</li>
                <li><strong>Consumer Protection & Cancellation:</strong> Customers may cancel their order before courier dispatch with a 100% instant refund. Orders already dispatched are covered under our comprehensive 7-Day Doorstep Replacement Guarantee.</li>
                <li><strong>Anti-Scalping Fair Purchase Policy:</strong> DJN Tech reserves the right to restrict or cancel duplicate bulk orders placed by commercial scalpers or automated bots to protect retail gamers.</li>
              </ul>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Protection',
          icon: HelpCircle,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] dark:text-gray-300 leading-relaxed">
              <p>
                At <strong>DJN Tech</strong>, your data privacy is strictly protected in accordance with the <em>Information Technology Act, 2000</em>, the <em>IT (Reasonable Security Practices) Rules, 2011</em>, and the <em>Digital Personal Data Protection Act, 2023</em>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>Minimal Data Collection:</strong> We only collect information strictly necessary to fulfill your order and provide warranty tracking (Customer Name, Shipping Address, Pincode, Mobile Number, and Email).</li>
                <li><strong>Zero Payment Credential Storage:</strong> DJN Tech never collects, views, or stores your credit card numbers, CVVs, UPI PINs, or Net Banking credentials. All financial authorizations are encrypted and handled directly by RBI-licensed payment processors.</li>
                <li><strong>Strict Non-Disclosure:</strong> We do not sell, rent, monetize, or disclose your personal data to any third-party marketing brokers or advertising networks.</li>
                <li><strong>Right to Rectification & Erasure:</strong> Customers can request updates to their stored address or profile details at any time via the User Dashboard or by emailing customer care.</li>
              </ul>
            </div>
          )
        };
      case 'grievance':
        return {
          title: 'Grievance Officer & Legal Disclosures',
          icon: Scale,
          content: (
            <div className="space-y-4 text-sm text-[#4b5563] dark:text-gray-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200">
                <h4 className="font-bold text-xs sm:text-sm mb-1">
                  Statutory Disclosure under Consumer Protection (E-Commerce) Rules, 2020
                </h4>
                <p className="text-[11px] sm:text-xs leading-relaxed">
                  In compliance with Rule 4(4) and Rule 5(3) of the Consumer Protection (E-Commerce) Rules, 2020 enacted under the Consumer Protection Act, 2019, the details of our appointed Grievance Redressal Officer and legal entity are published below:
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Grievance Redressal Officer:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Mr. Dinesh J. Nadar</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Designation:</span>
                  <span>Head of Operations & Grievance Redressal</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Legal Platform Entity:</span>
                  <span>DJN Tech Console Store (djntech.in)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Registered Address:</span>
                  <span className="sm:text-right">Baner Road, Pune, Maharashtra - 411045, India</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Grievance Email:</span>
                  <a href="mailto:grievance@djntech.in" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                    grievance@djntech.in
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200/60 dark:border-gray-700/60 gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Customer Care Direct Line:</span>
                  <span className="font-bold text-gray-900 dark:text-white">+91 84464 39374</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 dark:text-white">Operating Hours:</span>
                  <span>Monday to Saturday, 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <h4 className="font-bold text-[#111827] dark:text-white text-xs uppercase tracking-wider mt-4">
                Redressal Mechanism & Mandatory Timelines
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <li><strong>Ticket Acknowledgment:</strong> Every complaint ticket submitted will be acknowledged with a unique tracking ticket within <strong>48 hours</strong>.</li>
                <li><strong>Complete Resolution:</strong> The Grievance Officer will investigate and redress the dispute within <strong>30 days (1 month)</strong> from the date of receipt as mandated under Rule 4(4).</li>
                <li><strong>National Consumer Helpline:</strong> Consumers may also lodge complaints directly with the Government of India via the National Consumer Helpline (NCH) at Toll-Free <strong>1915</strong> or on <em>consumerhelpline.gov.in</em>.</li>
              </ul>

              <h4 className="font-bold text-[#111827] dark:text-white text-xs uppercase tracking-wider mt-3">
                Legal Metrology Declarations
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <li><strong>Inclusive of All Taxes:</strong> All Maximum Retail Prices (MRP) and listed prices on this website are strictly inclusive of all applicable Goods and Services Tax (GST).</li>
                <li><strong>Country of Origin & Importer:</strong> Country of origin and manufacturer details are clearly specified for every listed product.</li>
              </ul>
            </div>
          )
        };
      default:
        return { title: 'Information', icon: HelpCircle, content: null };
    }
  };

  const { title, icon: Icon, content } = getPolicyContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-[#e5e7eb] dark:border-[#1e293b] p-6 sm:p-8 text-[#212121] dark:text-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb] dark:border-[#1e293b] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] dark:bg-blue-950/50 text-[#1a73e8] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6b7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-[#f3f4f6] dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-600 dark:text-gray-300">
          {content}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#e5e7eb] dark:border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#111827] dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
};
