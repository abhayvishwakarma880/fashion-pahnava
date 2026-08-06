"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "women",
    name: "Women's Wear",
    image: "https://i.pinimg.com/736x/64/02/e7/6402e7ad6f9abb85b70f1cb622575857.jpg",
    count: "250+ Products",
    href: "/products?category=women",
  },
  {
    id: "men",
    name: "Men's Wear",
    image: "https://i.pinimg.com/736x/76/0f/aa/760faa8086afb8c9d2d5c93715db4ec0.jpg",
    count: "200+ Products",
    href: "/products?category=men",
  },
  {
    id: "kids",
    name: "Kids Wear",
    image: "https://i.pinimg.com/736x/d5/b2/7a/d5b27a581ea35a64a0bdaea9ffda3654.jpg",
    count: "150+ Products",
    href: "/products?category=kids",
  },
  {
    id: "ethnic",
    name: "Ethnic Wear",
    image: "https://img-edg.joomcdn.net/bc06926a4e160219f5ceb0a5210d3ab2f63146fc_original.jpeg",
    count: "180+ Products",
    href: "/products?category=ethnic",
  },
  {
    id: "western",
    name: "Western Wear",
    image: "https://i.pinimg.com/originals/4c/7e/a5/4c7ea546055af03a639bd424ebcc62eb.jpg?nii=t",
    count: "220+ Products",
    href: "/products?category=western",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://i.pinimg.com/736x/f5/71/22/f57122206649b974cb4e64110cd4cbe1.jpg",
    count: "100+ Products",
    href: "/products?category=accessories",
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".category-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 150);
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
      className="py-16 md:py-24 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[var(--highlight)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
            🛍️ Categories
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
            Shop By <span className="text-[var(--primary)]">Category</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base">
            Explore our diverse collection curated just for you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="category-card opacity-0 transform translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded aspect-[3/4] bg-[var(--card)] border border-[var(--border)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Category Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-500" />
                  
                  {/* Gradient Overlay Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  {/* Category Name */}
                  <h3 className="text-white text-lg md:text-xl font-bold font-[var(--font-playfair)] mb-1 transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Product Count */}
                  <p className="text-white/70 text-xs md:text-sm mb-3 transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {category.count}
                  </p>

                  {/* Shop Now Button - Always visible on mobile, hover on desktop */}
                  <div className="relative overflow-hidden">
                    <div className={`
                      flex items-center gap-2 text-white text-sm font-medium
                      transition-transform duration-500
                      ${isMobile 
                        ? 'translate-x-0' 
                        : '-translate-x-full md:group-hover:translate-x-0'
                      }
                    `}>
                      <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded hover:bg-white/30 transition-colors">
                        Shop Now
                        <svg
                          className="w-4 h-4 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Border Glow */}
                <div className="absolute inset-0 rounded ring-1 ring-white/0 md:group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--primary)] text-[var(--primary)] rounded text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20 transform hover:scale-105 duration-300"
          >
            View All Categories
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .category-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 640px) {
          .category-card {
            aspect-ratio: 3/4;
          }
        }
      `}</style>
    </section>
  );
}