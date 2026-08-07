import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Image src="/logo.jpeg" alt="Fashion Pahnawa" width={40} height={40} className="rounded object-cover" />
        <span className="font-[var(--font-playfair)] text-xl font-bold text-white">Fashion Pahnawa</span>
      </div>
      <p className="text-[#BDBDBD] text-sm leading-relaxed max-w-xs">
        Premium Fashion Store for Men, Women & Kids. Discover trendy collections designed with comfort, elegance, and quality.
      </p>
      <div className="flex flex-col gap-2.5 mt-1">
        {[
          { icon: MapPin, text: "Lucknow, Uttar Pradesh" },
          { icon: Mail, text: "fpehnava29@gmail.com" },
          { icon: Phone, text: "+91 9876543210" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-[#BDBDBD]">
            <Icon size={14} className="text-[#C9A96E] shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
