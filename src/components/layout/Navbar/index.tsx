"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/constants/navbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [catHover, setCatHover] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image src="/logo.jpeg" alt="Fashion Pahnawa" width={120} height={48} className="h-10 w-auto object-contain" priority />
            <span className="font-[var(--font-playfair)] text-lg md:text-xl font-bold text-[var(--primary)]">Fashion Pahnawa</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className={`relative px-3 py-2 text-sm transition-colors group ${
                    pathname === link.href
                      ? "text-[var(--primary)]"
                      : "text-[var(--foreground)] hover:text-[var(--primary)]"
                  }`}>
                  {link.label}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--primary)] transition-transform origin-left ${
                    pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
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
          <div className="flex items-center gap-1 ml-3 sm:gap-3">
            <Link href="/login"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm border border-[var(--border)] text-[var(--foreground)] rounded hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              Login
            </Link>

            <Link href="/register"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm bg-[var(--primary)] text-white rounded hover:opacity-90 transition-opacity">
              Register
            </Link>

            {/* Mobile Login/Register */}
            <Link href="/login" className="md:hidden px-3 py-1.5 text-xs border border-[var(--border)] text-[var(--foreground)] rounded hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              Login
            </Link>
            <Link href="/register" className="md:hidden px-3 py-1.5 text-xs bg-[var(--primary)] text-white rounded hover:opacity-90 transition-opacity">
              Register
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
