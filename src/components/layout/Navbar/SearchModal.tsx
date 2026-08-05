"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

const trending = ["Ladies Saree", "Formal Shirts", "Lehenga", "Perfume"];

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[var(--card)] w-full max-w-xl rounded-xl shadow-2xl p-6">
        <div className="flex items-center gap-3 border border-[var(--border)] rounded-lg px-4 py-3">
          <Search size={18} className="text-[var(--muted-foreground)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm"
          />
          <button onClick={onClose}>
            <X size={18} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]" />
          </button>
        </div>
        <div className="mt-5">
          <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Trending</p>
          <div className="flex flex-wrap gap-2">
            {trending.map((t) => (
              <span key={t} className="text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] px-3 py-1 rounded-full cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
