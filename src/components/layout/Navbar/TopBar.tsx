"use client";

import { useTheme } from "next-themes";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

export default function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-10 bg-[var(--primary)] text-white text-xs flex items-center px-4 md:px-8">
      <div className="flex-1 hidden md:block">
        <span>🚚 Free Shipping on Selected Orders</span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors">
          <FaPhone size={11} />
          <span className="hidden md:inline">Call Us</span>
        </a>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors">
          <FaWhatsapp size={13} />
          <span className="hidden md:inline">WhatsApp</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
          <FaInstagram size={13} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
          <FaFacebook size={13} />
        </a>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:text-[var(--accent)] transition-colors"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </div>
  );
}
