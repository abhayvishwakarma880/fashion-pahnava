"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  isNew: boolean;
  discount: number;
};

export default function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const t = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);

    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        transition: "background-color 250ms ease, backdrop-filter 250ms ease",
        backgroundColor: visible ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
      }}
      onClick={handleClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] rounded w-full max-w-2xl shadow-2xl overflow-hidden"
        style={{
          transition: "opacity 250ms ease, transform 250ms ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square sm:aspect-auto sm:h-80 bg-[var(--surface)]">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
            )}
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col gap-3 relative">
            <button onClick={handleClose} className="absolute top-3 right-3 p-1.5 rounded hover:bg-[var(--surface)] transition-colors">
              <X size={18} className="text-[var(--muted-foreground)]" />
            </button>

            <div>
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">{product.category}</p>
              <h3 className="text-lg font-bold text-[var(--foreground)] font-[var(--font-playfair)] mt-0.5">{product.name}</h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[var(--primary)]">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-[var(--muted-foreground)] line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.discount}% OFF</span>
            </div>

            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{product.description}</p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to book: ${product.name} (₹${product.price})`}
              target="_blank"
              rel="noreferrer"
              className="mt-auto flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2.5 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {/* <FaWhatsapp size={16} /> */}
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
