import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { customerLinks } from "@/constants/footer";

export default function FooterSupport() {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Customer Service</h4>
      <ul className="flex flex-col gap-2.5">
        {customerLinks.map((link) => (
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
