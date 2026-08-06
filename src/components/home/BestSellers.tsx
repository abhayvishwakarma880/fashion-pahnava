"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const bestSellers = [
  {
    id: 1,
    name: "Designer Silk Saree with Golden Border",
    category: "Ethnic Wear",
    price: 3499,
    originalPrice: 4999,
    image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "2.5K+ sold",
    description: "Pure silk saree with intricate golden border and traditional zari work.",
  },
  {
    id: 2,
    name: "Premium Leather Biker Jacket",
    category: "Western Wear",
    price: 4499,
    originalPrice: 6999,
    image: "https://i.pinimg.com/474x/f8/fe/a3/f8fea33af02a4ed02033f3dc97894b42.jpg?nii=t",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "1.8K+ sold",
    description: "Genuine leather jacket with premium finish perfect for winter fashion.",
  },
  {
    id: 3,
    name: "Handwoven Banarasi Saree",
    category: "Ethnic Wear",
    price: 8999,
    originalPrice: 12999,
    image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "3.2K+ sold",
    description: "Handwoven Banarasi saree with rich silk fabric and intricate patterns.",
  },
  {
    id: 4,
    name: "Classic Slim Fit Blazer",
    category: "Men's Wear",
    price: 3499,
    originalPrice: 4999,
    image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "1.2K+ sold",
    description: "Premium slim fit blazer perfect for formal occasions and business meetings.",
  },
  {
    id: 5,
    name: "Designer Embroidered Kurta Set",
    category: "Men's Wear",
    price: 3999,
    originalPrice: 5999,
    image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "1.5K+ sold",
    description: "Handcrafted kurta set with intricate embroidery for wedding celebrations.",
  },
  {
    id: 6,
    name: "Silver Oxidized Jewelry Set",
    category: "Accessories",
    price: 1299,
    originalPrice: 1999,
    image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-600",
    soldCount: "980+ sold",
    description: "Beautiful oxidized silver jewelry set with traditional Indian designs.",
  },
];

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".product-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--primary)] opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
              🏆 Customer Favorites
            </span>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-2">
              Best <span className="text-[var(--primary)]">Sellers</span>
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm md:text-base">
              Most loved products by our fashion community
            </p>
          </div>
          <Link
            href="/products?sort=bestseller"
            className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-medium hover:gap-3 transition-all mt-4 md:mt-0 group"
          >
            View All Best Sellers
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Products Grid - 2 columns mobile, 3 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="product-card opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <div className="group relative bg-[var(--card)] rounded overflow-hidden border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2">
                
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />

                  {/* Best Seller Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className={`
                      relative bg-gradient-to-r ${product.badgeColor}
                      text-white px-2 md:px-3 py-1 md:py-1.5 rounded
                      shadow-lg shadow-orange-500/30
                      flex items-center gap-1 md:gap-2
                      transform -rotate-2
                      group-hover:rotate-0 transition-transform duration-500
                    `}>
                      <span className="text-sm md:text-lg">🏆</span>
                      <div>
                        <span className="text-[8px] md:text-xs font-bold uppercase tracking-wider">Best Seller</span>
                        <span className="block text-[8px] md:text-[10px] opacity-80">{product.soldCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] md:text-xs font-bold px-1.5 md:px-3 py-0.5 md:py-1.5 rounded shadow-lg z-10">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2.5 md:p-4">
                  <div className="flex items-start justify-between mb-0.5 gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] md:text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                        {product.category}
                      </p>
                      <h3 className="text-xs md:text-base font-semibold text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-[8px] md:text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap">
                      {product.soldCount}
                    </span>
                  </div>
                  
                  {/* Description - 2 lines */}
                  <p className="text-[10px] md:text-xs text-[var(--muted-foreground)] mb-1.5 md:mb-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 md:gap-3 mb-1.5 md:mb-2.5">
                    <span className="text-sm md:text-xl font-bold text-[var(--primary)] font-[var(--font-playfair)]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] md:text-sm text-[var(--muted-foreground)] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full bg-[var(--primary)] text-white py-1.5 md:py-2.5 rounded text-[10px] md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-1.5 md:gap-2 group">
                    <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded p-4 md:p-8 border border-[var(--border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-3xl md:text-4xl">🎯</span>
              <div>
                <h4 className="text-base md:text-lg font-bold text-[var(--foreground)]">Love What You See?</h4>
                <p className="text-xs md:text-sm text-[var(--muted-foreground)]">These bestsellers are flying off the shelves</p>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-[var(--primary)] text-white rounded text-xs md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-105 duration-300 whitespace-nowrap"
            >
              Shop Best Sellers
              <svg className="w-3.5 md:w-4 h-3.5 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .product-card:nth-child(1) { transition-delay: 0.05s; }
        .product-card:nth-child(2) { transition-delay: 0.1s; }
        .product-card:nth-child(3) { transition-delay: 0.15s; }
        .product-card:nth-child(4) { transition-delay: 0.2s; }
        .product-card:nth-child(5) { transition-delay: 0.25s; }
        .product-card:nth-child(6) { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}