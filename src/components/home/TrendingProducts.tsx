"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const trendingProducts = [
  {
    id: 1,
    name: "Designer Silk Saree",
    category: "Ethnic Wear",
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 312,
    image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
    isTrending: true,
    discount: 30,
  },
  {
    id: 2,
    name: "Premium Leather Jacket",
    category: "Western Wear",
    price: 4499,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 256,
    image: "https://i.pinimg.com/474x/f8/fe/a3/f8fea33af02a4ed02033f3dc97894b42.jpg?nii=t",
    isTrending: true,
    discount: 36,
  },
  {
    id: 3,
    name: "Embroidered Sherwani",
    category: "Ethnic Wear",
    price: 5999,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 189,
    image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
    isTrending: true,
    discount: 33,
  },
  {
    id: 4,
    name: "Handcrafted Silver Jewelry",
    category: "Accessories",
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 143,
    image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
    isTrending: true,
    discount: 35,
  },
  {
    id: 5,
    name: "Designer Anarkali Suit",
    category: "Women's Wear",
    price: 2799,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 167,
    image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
    isTrending: true,
    discount: 30,
  },
  {
    id: 6,
    name: "Classic Linen Blazer",
    category: "Men's Wear",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 96,
    image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
    isTrending: true,
    discount: 29,
  },
  {
    id: 7,
    name: "Kids Party Wear Dress",
    category: "Kids Wear",
    price: 999,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 78,
    image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
    isTrending: true,
    discount: 33,
  },
  {
    id: 8,
    name: "Designer Handbag",
    category: "Accessories",
    price: 1899,
    originalPrice: 2799,
    rating: 4.4,
    reviews: 112,
    image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
    isTrending: true,
    discount: 32,
  },
];

export default function TrendingProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.desktop;
    const width = window.innerWidth;
    if (width < 640) return itemsPerView.mobile;
    if (width < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const [itemsPerViewState, setItemsPerViewState] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerViewState(getItemsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(trendingProducts.length / itemsPerViewState);
  const maxIndex = Math.max(0, totalSlides - 1);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    if (isAutoPlay && totalSlides > 1) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, totalSlides, currentIndex]);

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

  const getVisibleProducts = () => {
    const start = currentIndex * itemsPerViewState;
    const end = start + itemsPerViewState;
    return trendingProducts.slice(start, end);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--primary)] opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
              🔥 Hot Picks
            </span>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-2">
              Trending <span className="text-[var(--primary)]">Now</span>
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm md:text-base">
              Most popular styles loved by our customers
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                setIsAutoPlay(false);
                prevSlide();
                setTimeout(() => setIsAutoPlay(true), 5000);
              }}
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 disabled:opacity-50"
              disabled={totalSlides <= 1}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlay(false);
                    goToSlide(index);
                    setTimeout(() => setIsAutoPlay(true), 5000);
                  }}
                  className={`
                    transition-all duration-300 rounded-full
                    ${currentIndex === index 
                      ? "w-8 h-2.5 bg-[var(--primary)]" 
                      : "w-2.5 h-2.5 bg-[var(--border)] hover:bg-[var(--primary)]/50"
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setIsAutoPlay(false);
                nextSlide();
                setTimeout(() => setIsAutoPlay(true), 5000);
              }}
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 disabled:opacity-50"
              disabled={totalSlides <= 1}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden" ref={sliderRef}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-500"
          >
            {getVisibleProducts().map((product) => (
              <div
                key={product.id}
                className="group relative bg-[var(--card)] rounded overflow-hidden border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Trending Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
                      <span className="text-xs">🔥</span>
                      Trending
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                    <button className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-3 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700"
                    >
                      <svg className="w-5 h-5" fill={wishlist.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white dark:bg-[var(--card)] text-[var(--foreground)] p-3 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-lg border border-[var(--border)] dark:border-gray-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-0.5">
                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)] mb-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="mb-2">
                    {renderStars(product.rating)}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-[var(--primary)] font-[var(--font-playfair)]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--muted-foreground)] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 text-white py-2.5 rounded text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-2 group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products?sort=trending"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-105 duration-300"
          >
            View All Trending Products
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