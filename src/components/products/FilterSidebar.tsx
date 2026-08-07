"use client";

import { X } from "lucide-react";
import { filterCategories } from "@/constants/products";

type Filters = {
  categories: string[];
  priceRange: [number, number];
  search: string;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose?: () => void;
};

export default function FilterSidebar({ filters, onChange, onClose }: Props) {
  const toggle = (val: string) => {
    const arr = filters.categories;
    onChange({
      ...filters,
      categories: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    });
  };

  const clearAll = () =>
    onChange({ categories: [], priceRange: [0, 15000], search: "" });

  const hasFilters = filters.categories.length;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded p-5 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-[var(--foreground)] text-sm uppercase tracking-wider">Filters</h3>
        <div className="flex items-center gap-2">
          {hasFilters ? (
            <button onClick={clearAll} className="text-xs text-[var(--primary)] hover:underline">Clear All</button>
          ) : null}
          {onClose && (
            <button onClick={onClose} className="p-1 rounded hover:bg-[var(--surface)] md:hidden">
              <X size={16} className="text-[var(--muted-foreground)]" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2">Search</p>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search products..."
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      {/* Category */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2">Category</p>
        <div className="flex flex-col gap-2">
          {filterCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggle(cat)}
                className="accent-[var(--primary)] w-3.5 h-3.5"
              />
              <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2">
          Price: ₹{filters.priceRange[0].toLocaleString()} – ₹{filters.priceRange[1].toLocaleString()}
        </p>
        <input
          type="range"
          min={0}
          max={15000}
          step={500}
          value={filters.priceRange[1]}
          onChange={(e) => onChange({ ...filters, priceRange: [0, Number(e.target.value)] })}
          className="w-full accent-[var(--primary)]"
        />
        <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] mt-1">
          <span>₹0</span><span>₹15,000</span>
        </div>
      </div>
    </div>
  );
}
