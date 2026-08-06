"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/constants/navbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [catHover, setCatHover] = useState(false);
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

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search Box - Desktop */}
            <div className="hidden md:flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 w-52 focus-within:border-[var(--primary)] transition-colors">
              <Search size={15} className="text-[var(--muted-foreground)] shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] w-full"
              />
            </div>

            {/* Search Icon - Mobile */}
            <button className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <Search size={20} />
            </button>

            <Link href="/products"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity">
              Shop Now
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(true)} className="p-2 md:hidden text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
