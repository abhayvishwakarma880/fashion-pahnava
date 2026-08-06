import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram, FaFacebook, FaPinterest, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/constants/footer";

const iconMap: Record<string, React.ReactNode> = {
  instagram: <FaInstagram size={18} />,
  facebook: <FaFacebook size={18} />,
  pinterest: <FaPinterest size={18} />,
  youtube: <FaYoutube size={18} />,
  whatsapp: <FaWhatsapp size={18} />,
};

export default function FooterContact() {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Follow Us</h4>
      <div className="flex flex-wrap gap-3 mb-6">
        {socialLinks.map((s) => (
          <Link key={s.icon} href={s.href} target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded bg-[#1e1e1e] border border-[#2B2B2B] flex items-center justify-center text-[#BDBDBD] hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all">
            {iconMap[s.icon]}
          </Link>
        ))}
      </div>
      <div className="border-t border-[#2B2B2B] pt-4">
        <p className="text-xs text-[#BDBDBD] uppercase tracking-widest mb-2">Working Hours</p>
        <p className="text-sm text-white font-medium">Mon – Sat</p>
        <p className="text-sm text-[#C9A96E]">10:00 AM – 7:00 PM</p>
      </div>
    </div>
  );
}
