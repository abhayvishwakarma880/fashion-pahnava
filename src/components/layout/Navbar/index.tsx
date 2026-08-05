"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Menu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MegaMenu from "./MegaMenu";
import SearchModal from "./SearchModal";
import MobileMenu from "./MobileMenu";
import { navLinks, WHATSAPP_NUMBER } from "@/constants/navbar";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [catHover, setCatHover] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md shadow-md h-14"
          : "bg-[var(--background)] h-16"
      } border-b border-[var(--border)]`}>
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-[var(--font-playfair)] text-xl md:text-2xl font-bold text-[var(--primary)] shrink-0">
            Fashion Pahnawa
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className="relative px-3 py-2 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </li>
            ))}

            {/* Categories with Mega Menu */}
            <li className="relative" onMouseEnter={() => setCatHover(true)} onMouseLeave={() => setCatHover(false)}>
              <button className="relative px-3 py-2 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-1 group">
                Categories
                <svg className={`w-3 h-3 transition-transform ${catHover ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
              {catHover && <MegaMenu />}
            </li>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)}
              className="p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <Search size={18} />
            </button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors hidden md:flex">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
              className="p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors hidden md:flex">
              <FaWhatsapp size={18} />
            </a>
            <Link href="/products"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity ml-1">
              Shop Now
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(true)}
              className="p-2 md:hidden text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
