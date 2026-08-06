import Newsletter from "./Newsletter";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterSupport from "./FooterSupport";
import FooterContact from "./FooterContact";
import BottomFooter from "./BottomFooter";
import { Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

const trustFeatures = [
  { icon: Truck, title: "Free Shipping", desc: "On selected orders" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% safe & secure" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7 day return policy" },
  { icon: Star, title: "100% Quality", desc: "Genuine products" },
];

const paymentIcons = [
  { name: "Visa", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#1A1F71"/><text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">VISA</text></svg> },
  { name: "Mastercard", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#252525"/><circle cx="18" cy="24" r="10" fill="#EB001B"/><circle cx="30" cy="24" r="10" fill="#F79E1B"/><path d="M24 16.3a10 10 0 010 15.4A10 10 0 0124 16.3z" fill="#FF5F00"/></svg> },
  { name: "UPI", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#6C3EC1"/><text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">UPI</text></svg> },
  { name: "RuPay", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#1B6B3A"/><text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">RuPay</text></svg> },
  { name: "Paytm", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#00BAF2"/><text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">Paytm</text></svg> },
  { name: "GPay", svg: <svg viewBox="0 0 48 48" className="h-6 w-auto"><rect width="48" height="48" rx="6" fill="#fff"/><text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#4285F4" fontSize="11" fontWeight="bold" fontFamily="Arial">GPay</text></svg> },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111]">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        <Newsletter />
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-[#2B2B2B] pt-10">
          <FooterBrand />
          <FooterLinks />
          <FooterSupport />
          <FooterContact />
        </div>
      </div>

      {/* Trust Features */}
      <div className="border-t border-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 p-4 rounded bg-[#1a1a1a] border border-[#2B2B2B]">
                <div className="w-10 h-10 rounded bg-[#C9A96E]/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-[#BDBDBD] text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#BDBDBD] uppercase tracking-widest">We Accept</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {paymentIcons.map((p) => (
              <div key={p.name} className="w-12 h-8 flex items-center justify-center rounded overflow-hidden">
                {p.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <BottomFooter />
      </div>
    </footer>
  );
}
