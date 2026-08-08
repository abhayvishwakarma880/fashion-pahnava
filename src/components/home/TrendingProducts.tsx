"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import BookingModal from "@/components/products/BookingModal";

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
    description: "Pure silk saree with intricate zari work and traditional border design.",
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
    description: "Genuine leather jacket with premium finish perfect for winter fashion.",
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
    description: "Handcrafted sherwani with intricate embroidery for wedding celebrations.",
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
    description: "Beautiful oxidized silver jewelry set with traditional Indian designs.",
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
    description: "Elegant Anarkali suit with beautiful embellishments and flowy fabric.",
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
    description: "Premium linen blazer perfect for formal occasions and business meetings.",
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
    description: "Adorable party dress for kids with comfortable fabric and stylish design.",
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
    description: "Premium designer handbag with genuine leather and multiple compartments.",
  },
];

export default function TrendingProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookingProduct, setBookingProduct] = useState<typeof trendingProducts[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = {
    mobile: 2,
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

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Auto-play with cleanup
  useEffect(() => {
    if (isAutoPlay && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, totalSlides, nextSlide]);

  const handlePrevClick = () => {
    setIsAutoPlay(false);
    prevSlide();
    // Restart auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const handleNextClick = () => {
    setIsAutoPlay(false);
    nextSlide();
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    goToSlide(index);
    setTimeout(() => setIsAutoPlay(true), 5000);
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
              onClick={handlePrevClick}
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 disabled:opacity-50"
              disabled={totalSlides <= 1}
              aria-label="Previous slide"
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
                  onClick={() => handleDotClick(index)}
                  className={`
                    transition-all duration-300 rounded-full
                    ${currentIndex === index 
                      ? "w-8 h-2.5 bg-[var(--primary)]" 
                      : "w-2.5 h-2.5 bg-[var(--border)] hover:bg-[var(--primary)]/50"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 disabled:opacity-50"
              disabled={totalSlides <= 1}
              aria-label="Next slide"
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
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 transition-all duration-500"
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Trending Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1.5 rounded uppercase tracking-wider shadow-lg">
                      <span className="text-[10px] md:text-xs">🔥</span>
                      Trending
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2.5 md:p-4">
                  <div className="mb-0.5">
                    <p className="text-[8px] md:text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-[var(--foreground)] mb-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Description - 2 lines */}
                  <p className="text-[10px] md:text-xs text-[var(--muted-foreground)] mb-1.5 md:mb-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2.5">
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
                  <button
                    onClick={() => setBookingProduct(product)}
                    className="w-full bg-[var(--primary)] text-white py-1.5 md:py-2.5 rounded text-[10px] md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-1.5 md:gap-2 group">
                    <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Book Now
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-white rounded text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-105 duration-300"
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

      {bookingProduct && <BookingModal product={bookingProduct} onClose={() => setBookingProduct(null)} />}

      <style jsx>{`
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
      `}</style>
    </section>
  );
}