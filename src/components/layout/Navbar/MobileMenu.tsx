"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { navLinks, categories, WHATSAPP_NUMBER } from "@/constants/navbar";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const [catOpen, setCatOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Trigger slide-in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[89] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[80vw] max-w-sm z-[90] bg-[var(--background)] border-l border-[var(--border)] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${visible ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <span className="font-[var(--font-playfair)] text-lg font-bold text-[var(--primary)]">Fashion Pahnawa</span>
          <button onClick={handleClose} className="p-1 rounded-lg hover:bg-[var(--surface)] transition-colors">
            <X size={20} className="text-[var(--foreground)]" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-5 py-3 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className={`py-3 text-sm border-b border-[var(--border)] transition-colors ${
                pathname === link.href
                  ? "text-[var(--primary)] font-medium"
                  : "text-[var(--foreground)] hover:text-[var(--primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Categories Accordion */}
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="py-3 flex items-center justify-between text-sm text-[var(--foreground)] border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors"
          >
            <span>Categories</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Smooth Accordion */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${catOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="py-3 flex flex-col gap-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-2 px-1">
                    {cat.name}
                  </p>
                  {/* 2 Column Grid */}
                  <div className="grid grid-cols-2 gap-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        href={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={handleClose}
                        className="py-2 px-3 text-sm text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Social Footer */}
        <div className="px-5 py-5 border-t border-[var(--border)] flex items-center gap-4">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all">
            <FaWhatsapp size={17} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all">
            <FaInstagram size={17} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all">
            <FaFacebook size={17} />
          </a>
        </div>
      </div>
    </>
  );
}
