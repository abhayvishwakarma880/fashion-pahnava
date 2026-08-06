import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { quickLinks } from "@/constants/footer";

export default function FooterLinks() {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
      <ul className="flex flex-col gap-2.5">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center gap-1.5 text-sm text-[#BDBDBD] hover:text-[#C9A96E] transition-colors group">
              <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
