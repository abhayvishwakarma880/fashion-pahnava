"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye } from "lucide-react";
import QuickView from "./QuickView";
import BookingModal from "./BookingModal";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  isNew: boolean;
  discount: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [quickView, setQuickView] = useState(false);
  const [booking, setBooking] = useState(false);

  return (
    <>
      <div className="group relative bg-[var(--card)] border border-[var(--border)] rounded overflow-hidden hover:shadow-xl hover:shadow-[var(--primary)]/10 hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
            )}
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.discount}% OFF</span>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setQuickView(true)}
              className="bg-white text-[var(--primary)] px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 hover:bg-[var(--primary)] hover:text-white transition-colors shadow-lg"
            >
              <Eye size={14} />
              Quick View
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5">{product.category}</p>
          <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors mb-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-[var(--primary)]">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-[var(--muted-foreground)] line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          {/* Book Now */}
          <button
            onClick={() => setBooking(true)}
            className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2 rounded text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>
      </div>

      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
      {booking && <BookingModal product={product} onClose={() => setBooking(false)} />}
    </>
  );
}
