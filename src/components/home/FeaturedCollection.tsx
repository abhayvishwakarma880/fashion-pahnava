"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// All Products Data
const allProducts = {
  women: [
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
    },
    {
      id: 2,
      name: "Silk Saree with Border",
      category: "Ethnic Wear",
      price: 3499,
      originalPrice: 4999,
      rating: 4.9,
      reviews: 312,
      image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
      isNew: true,
      isTrending: true,
    },
    {
      id: 3,
      name: "Embroidered Kurti",
      category: "Women's Wear",
      price: 1499,
      originalPrice: 2199,
      rating: 4.4,
      reviews: 98,
      image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
      isNew: false,
      isTrending: true,
    },
    {
      id: 4,
      name: "Designer Anarkali Suit",
      category: "Women's Wear",
      price: 2799,
      originalPrice: 3999,
      rating: 4.7,
      reviews: 156,
      image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
      isNew: true,
      isTrending: false,
    },
  ],
  men: [
    {
      id: 5,
      name: "Classic Linen Blazer",
      category: "Men's Wear",
      price: 2499,
      originalPrice: 3499,
      rating: 4.8,
      reviews: 96,
      image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
      isNew: true,
      isTrending: false,
    },
    {
      id: 6,
      name: "Men's Sherwani Set",
      category: "Ethnic Wear",
      price: 3999,
      originalPrice: 5999,
      rating: 4.6,
      reviews: 89,
      image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
      isNew: true,
      isTrending: true,
    },
    {
      id: 7,
      name: "Casual Polo T-Shirt",
      category: "Men's Wear",
      price: 899,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 67,
      image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
      isNew: false,
      isTrending: false,
    },
    {
      id: 8,
      name: "Formal Slim Fit Shirt",
      category: "Men's Wear",
      price: 1199,
      originalPrice: 1699,
      rating: 4.5,
      reviews: 112,
      image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
      isNew: true,
      isTrending: false,
    },
  ],
  kids: [
    {
      id: 9,
      name: "Kids Printed T-Shirt",
      category: "Kids Wear",
      price: 599,
      originalPrice: 899,
      rating: 4.7,
      reviews: 143,
      image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
      isNew: true,
      isTrending: false,
    },
    {
      id: 10,
      name: "Kids Party Wear Dress",
      category: "Kids Wear",
      price: 999,
      originalPrice: 1499,
      rating: 4.8,
      reviews: 78,
      image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
      isNew: true,
      isTrending: true,
    },
    {
      id: 11,
      name: "Kids Denim Jeans",
      category: "Kids Wear",
      price: 799,
      originalPrice: 1199,
      rating: 4.4,
      reviews: 56,
      image: "https://i.pinimg.com/474x/f8/fe/a3/f8fea33af02a4ed02033f3dc97894b42.jpg?nii=t",
      isNew: false,
      isTrending: false,
    },
    {
      id: 12,
      name: "Kids Ethnic Set",
      category: "Kids Wear",
      price: 1299,
      originalPrice: 1799,
      rating: 4.6,
      reviews: 92,
      image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
      isNew: true,
      isTrending: false,
    },
  ],
  accessories: [
    {
      id: 13,
      name: "Leather Crossbody Bag",
      category: "Accessories",
      price: 999,
      originalPrice: 1499,
      rating: 4.3,
      reviews: 67,
      image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
      isNew: true,
      isTrending: false,
    },
    {
      id: 14,
      name: "Silver Oxidized Jewelry Set",
      category: "Accessories",
      price: 799,
      originalPrice: 1299,
      rating: 4.2,
      reviews: 56,
      image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
      isNew: true,
      isTrending: true,
    },
    {
      id: 15,
      name: "Designer Sunglasses",
      category: "Accessories",
      price: 1499,
      originalPrice: 2499,
      rating: 4.5,
      reviews: 43,
      image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
      isNew: false,
      isTrending: true,
    },
    {
      id: 16,
      name: "Premium Leather Belt",
      category: "Accessories",
      price: 699,
      originalPrice: 999,
      rating: 4.4,
      reviews: 38,
      image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
      isNew: true,
      isTrending: false,
    },
  ],
};

type TabKey = keyof typeof allProducts;

export default function FeaturedCollection() {
  const [activeTab, setActiveTab] = useState<TabKey>("women");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "women", label: "Women", icon: "👩" },
    { id: "men", label: "Men", icon: "👨" },
    { id: "kids", label: "Kids", icon: "👶" },
    { id: "accessories", label: "Accessories", icon: "💎" },
  ];

  const currentProducts = allProducts[activeTab];

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

  const handleTabChange = (tabId: TabKey) => {
    if (tabId === activeTab || isAnimating) return;
    
    setIsAnimating(true);
    
    // Fade out current products
    if (productGridRef.current) {
      const cards = productGridRef.current.querySelectorAll(".product-card");
      cards.forEach((card) => {
        card.classList.remove("animate-in");
        card.classList.add("animate-out");
      });
    }

    // Change tab after animation
    setTimeout(() => {
      setActiveTab(tabId);
      
      // Fade in new products
      setTimeout(() => {
        if (productGridRef.current) {
          const newCards = productGridRef.current.querySelectorAll(".product-card");
          newCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove("animate-out");
              card.classList.add("animate-in");
            }, index * 100);
          });
        }
        setIsAnimating(false);
      }, 100);
    }, 300);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {halfStar && (
          <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-[var(--muted-foreground)]">({rating})</span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--highlight)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
            ⭐ Featured Collection
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
            Trending <span className="text-[var(--primary)]">Collections</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base">
            Discover handpicked styles from our latest collections
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[var(--card)] border border-[var(--border)] rounded p-1.5 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabKey)}
                className={`
                  px-6 md:px-8 py-2.5 md:py-3 rounded text-sm font-medium transition-all duration-300
                  flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--highlight)]/10"
                  }
                `}
              >
                {/* <span className="text-base">{tab.icon}</span> */}
                {tab.label}
                {activeTab === tab.id && (
                  <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded">
                    {allProducts[tab.id as TabKey].length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={productGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-card opacity-0 transform translate-y-8 transition-all duration-500"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="group relative bg-[var(--card)] rounded overflow-hidden border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/5 transition-all duration-500 hover:-translate-y-1">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-lg">
                        New
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-lg">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                    <button className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-2.5 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-2.5 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700"
                    >
                      <svg className="w-4 h-4" fill={wishlist.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-2.5 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4">
                  <div className="mb-0.5">
                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="mb-1.5">
                    {renderStars(product.rating)}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-base font-bold text-[var(--primary)] font-[var(--font-playfair)]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[var(--muted-foreground)] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-[var(--primary)] text-white py-2 rounded text-xs font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-2 group">
                    <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/products?category=${activeTab}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--primary)] text-[var(--primary)] rounded text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20 transform hover:scale-105 duration-300"
          >
            View All {tabs.find(t => t.id === activeTab)?.label} Collection
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
      </div>

      <style jsx>{`
        .product-card.animate-in {
          animation: fadeUp 0.6s ease forwards;
        }
        
        .product-card.animate-out {
          animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}