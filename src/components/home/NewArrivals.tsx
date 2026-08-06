"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Floral Print Maxi Dress",
    category: "Women's Wear",
    price: 1299,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 128,
    image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
    isNew: true,
    isTrending: true,
    description: "Elegant floral print maxi dress perfect for summer parties and casual outings.",
  },
  {
    id: 2,
    name: "Classic Linen Blazer",
    category: "Men's Wear",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 96,
    image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
    isNew: true,
    isTrending: false,
    description: "Premium linen blazer with perfect fit for formal occasions and business meetings.",
  },
  {
    id: 3,
    name: "Embroidered Kurta Set",
    category: "Ethnic Wear",
    price: 1899,
    originalPrice: 2599,
    rating: 4.6,
    reviews: 215,
    image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
    isNew: true,
    isTrending: true,
    description: "Handcrafted kurta set with intricate embroidery work for festive celebrations.",
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 999,
    originalPrice: 1499,
    rating: 4.3,
    reviews: 67,
    image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
    isNew: true,
    isTrending: false,
    description: "Genuine leather crossbody bag with multiple compartments for daily use.",
  },
  {
    id: 5,
    name: "Silk Saree with Border",
    category: "Ethnic Wear",
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 312,
    image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
    isNew: true,
    isTrending: true,
    description: "Pure silk saree with traditional border design perfect for weddings and special events.",
  },
  {
    id: 6,
    name: "Denim Jacket with Patches",
    category: "Western Wear",
    price: 1799,
    originalPrice: 2299,
    rating: 4.4,
    reviews: 84,
    image: "https://i.pinimg.com/474x/f8/fe/a3/f8fea33af02a4ed02033f3dc97894b42.jpg?nii=t",
    isNew: true,
    isTrending: false,
    description: "Trendy denim jacket with stylish patches, perfect for casual street style looks.",
  },
  {
    id: 7,
    name: "Kids Printed T-Shirt",
    category: "Kids Wear",
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviews: 143,
    image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
    isNew: true,
    isTrending: false,
    description: "Comfortable cotton t-shirt with fun prints for your little ones.",
  },
  {
    id: 8,
    name: "Silver Oxidized Jewelry Set",
    category: "Accessories",
    price: 799,
    originalPrice: 1299,
    rating: 4.2,
    reviews: 56,
    image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
    isNew: true,
    isTrending: true,
    description: "Beautiful oxidized silver jewelry set with traditional designs for ethnic wear.",
  },
];

export default function NewArrivals() {
  const [wishlist, setWishlist] = useState<number[]>([]);
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
              }, index * 100);
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

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-18 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[var(--highlight)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
              ✨ Fresh Collection
            </span>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-2">
              New <span className="text-[var(--primary)]">Arrivals</span>
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm md:text-base">
              Fresh styles just added - be the first to shop!
            </p>
          </div>
          <Link
            href="/products?sort=new"
            className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-medium hover:gap-3 transition-all mt-4 md:mt-0 group"
          >
            View All New Arrivals
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

        {/* Products Grid - 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <div className="group relative bg-[var(--card)] rounded overflow-hidden border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/5 transition-all duration-500 hover:-translate-y-1">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[var(--primary)] text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded uppercase tracking-wider shadow-lg">
                        New
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded uppercase tracking-wider shadow-lg">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Wishlist Button - Only visible on hover */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-[var(--border)] dark:border-gray-700 hover:bg-red-500 hover:text-white"
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill={wishlist.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-2.5 md:p-4">
                  <div className="mb-0.5">
                    <p className="text-[8px] md:text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>
                  <h3 className="text-xs md:text-base font-semibold text-[var(--foreground)] mb-0.5 md:mb-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Description - 2 lines with ... */}
                  <p className="text-[10px] md:text-xs text-[var(--muted-foreground)] mb-1.5 md:mb-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <span className="text-sm md:text-lg font-bold text-[var(--primary)] font-[var(--font-playfair)]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] md:text-sm text-[var(--muted-foreground)] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full bg-[var(--primary)] text-white py-1.5 md:py-2.5 rounded md:rounded text-[10px] md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-1.5 md:gap-2 group">
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}