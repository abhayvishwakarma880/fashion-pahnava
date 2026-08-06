import Link from "next/link";
import { bottomLinks } from "@/constants/footer";

export default function BottomFooter() {
  return (
    <div className="border-t border-[#2B2B2B] pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="text-sm text-[#BDBDBD]">
        © 2026 <span className="text-[#C9A96E]">Fashion Pahnawa</span>. All Rights Reserved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {bottomLinks.map((link) => (
          <Link key={link.href} href={link.href}
            className="text-xs text-[#BDBDBD] hover:text-[#C9A96E] transition-colors">
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
