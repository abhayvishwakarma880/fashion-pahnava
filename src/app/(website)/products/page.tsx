"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { products, sortOptions } from "@/constants/products";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductCard from "@/components/products/ProductCard";

type Filters = {
  categories: string[];
  priceRange: [number, number];
  search: string;
};

const defaultFilters: Filters = {
  categories: [],
  priceRange: [0, 15000],
  search: "",
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState("latest");
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.search)
      list = list.filter((p) => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.categories.length)
      list = list.filter((p) => filters.categories.includes(p.category));
    list = list.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "discount") list.sort((a, b) => b.discount - a.discount);
    else list.sort((a, b) => b.id - a.id);

    return list;
  }, [filters, sort]);

  const activeFilterCount = filters.categories.length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Page Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-center">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Home / Shop</p>
          <h1 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Our <span className="text-[var(--primary)]">Collection</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-6">

          {/* Sidebar — Desktop */}
          <aside className="hidden md:block w-60 shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFilter && (
            <div className="fixed inset-0 z-[80] flex md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilter(false)} />
              <div className="relative ml-auto w-72 h-full bg-[var(--background)] overflow-y-auto p-4 shadow-2xl">
                <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setMobileFilter(false)} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setMobileFilter(true)}
                className="md:hidden flex items-center gap-2 px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active filter chips */}
              <div className="hidden md:flex items-center gap-2 flex-wrap flex-1">
                {filters.categories.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-xs bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 px-2.5 py-1 rounded-full">
                    {f}
                    <button onClick={() => setFilters({ ...filters, categories: filters.categories.filter((v) => v !== f) })}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] text-sm rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-[var(--foreground)] font-semibold mb-1">No products found</p>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">Try adjusting your filters</p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
