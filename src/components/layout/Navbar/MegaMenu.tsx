"use client";

import Link from "next/link";
import { categories } from "@/constants/navbar";

export default function MegaMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-b-lg p-6 grid grid-cols-3 gap-6 z-50">
      {categories.map((cat) => (
        <div key={cat.name}>
          <h4 className="font-[var(--font-playfair)] font-semibold text-[var(--primary)] mb-3 text-sm uppercase tracking-wide border-b border-[var(--border)] pb-2">
            {cat.name}
          </h4>
          <ul className="space-y-2">
            {cat.items.map((item) => (
              <li key={item}>
                <Link
                  href={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
