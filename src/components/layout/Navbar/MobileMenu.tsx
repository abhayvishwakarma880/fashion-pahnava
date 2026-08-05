"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { navLinks, categories, WHATSAPP_NUMBER } from "@/constants/navbar";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-[90] bg-[var(--background)] flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <span className="font-[var(--font-playfair)] text-xl font-bold text-[var(--primary)]">Fashion Pahnawa</span>
        <button onClick={onClose}><X size={22} className="text-[var(--foreground)]" /></button>
      </div>

      <nav className="flex flex-col px-5 py-4 gap-1">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose}
            className="py-3 text-[var(--foreground)] border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors">
            {link.label}
          </Link>
        ))}

        {/* Categories Accordion */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="py-3 flex items-center justify-between text-[var(--foreground)] border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors"
        >
          <span>Categories</span>
          <ChevronDown size={16} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
        </button>
        {catOpen && (
          <div className="pl-4 pb-2">
            {categories.map((cat) => (
              <div key={cat.name} className="mb-3">
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide mb-1">{cat.name}</p>
                {cat.items.map((item) => (
                  <Link key={item} href={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={onClose}
                    className="block py-1.5 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </nav>

      <div className="mt-auto px-5 py-6 border-t border-[var(--border)] flex items-center gap-5">
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:text-[var(--primary)]"><FaWhatsapp size={20} /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:text-[var(--primary)]"><FaInstagram size={20} /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:text-[var(--primary)]"><FaFacebook size={20} /></a>
      </div>
    </div>
  );
}
