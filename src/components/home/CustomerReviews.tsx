"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review: "Absolutely stunning collection! The silk saree I ordered exceeded my expectations. The fabric quality is premium and the colors are even more beautiful in person. Will definitely shop again!",
    image: "https://i.pravatar.cc/150?img=1",
    date: "2 days ago",
    verified: true,
    product: "Designer Silk Saree",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi, India",
    rating: 5,
    review: "Best online shopping experience ever! The blazer fits perfectly and the material is top-notch. Shipping was super fast and packaging was excellent. Highly recommended!",
    image: "https://i.pravatar.cc/150?img=2",
    date: "5 days ago",
    verified: true,
    product: "Classic Slim Fit Blazer",
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Ahmedabad, India",
    rating: 4,
    review: "Beautiful jewelry set! The craftsmanship is amazing and it looks even better than the pictures. Perfect for weddings and special occasions. Just loved it!",
    image: "https://i.pravatar.cc/150?img=3",
    date: "1 week ago",
    verified: true,
    product: "Silver Oxidized Jewelry Set",
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Bangalore, India",
    rating: 5,
    review: "The kurta set is a masterpiece! The embroidery work is intricate and the fabric is so comfortable. Received so many compliments at the wedding. Thank you!",
    image: "https://i.pravatar.cc/150?img=4",
    date: "1 week ago",
    verified: false,
    product: "Designer Embroidered Kurta Set",
  },
  {
    id: 5,
    name: "Neha Singh",
    location: "Lucknow, India",
    rating: 5,
    review: "Absolutely in love with my Banarasi saree! It's a timeless piece that I'll cherish forever. The quality is unmatched and the service was exceptional.",
    image: "https://i.pravatar.cc/150?img=5",
    date: "2 weeks ago",
    verified: true,
    product: "Handwoven Banarasi Saree",
  },
  {
    id: 6,
    name: "Vikram Jain",
    location: "Jaipur, India",
    rating: 4,
    review: "Great quality leather jacket! The fit is perfect and it looks very premium. Only suggestion would be to add more color options. Overall, very satisfied!",
    image: "https://i.pravatar.cc/150?img=6",
    date: "2 weeks ago",
    verified: true,
    product: "Premium Leather Biker Jacket",
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
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

  const totalSlides = Math.ceil(reviews.length / itemsPerViewState);
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
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, totalSlides, currentIndex]);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".review-card");
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Calculate average rating
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

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
            💬 Testimonials
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
            What Our <span className="text-[var(--primary)]">Customers Say</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base">
            Real reviews from real customers who love our products
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[var(--foreground)]">{avgRating}</span>
              <div>
                <div className="flex">{renderStars(Math.round(parseFloat(avgRating)))}</div>
                <span className="text-xs text-[var(--muted-foreground)]">Based on {reviews.length} reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Slider - Fixed */}
        <div className="relative overflow-hidden pb-4" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-1"
              >
                {reviews
                  .slice(
                    slideIndex * itemsPerViewState,
                    slideIndex * itemsPerViewState + itemsPerViewState
                  )
                  .map((review) => (
                    <div
                      key={review.id}
                      className="review-card opacity-0 transform translate-y-8 transition-all duration-700 group h-full"
                    >
                      <div className="bg-[var(--card)] rounded p-5 md:p-6 border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-1 relative h-full flex flex-col">
                        
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 text-4xl text-[var(--primary)]/10 font-serif">"</div>

                        {/* Rating */}
                        <div className="mb-3 flex-shrink-0">
                          {renderStars(review.rating)}
                        </div>

                        {/* Review Text - Fixed height with scroll */}
                        <div className="flex-1 min-h-[80px]">
                          <p className="text-[var(--foreground)] text-sm leading-relaxed line-clamp-4">
                            {review.review}
                          </p>
                        </div>

                        {/* Product Name */}
                        <p className="text-xs text-[var(--primary)] font-medium mt-3 flex-shrink-0">
                          Product: {review.product}
                        </p>

                        {/* User Info */}
                        <div className="flex items-center gap-3 pt-3 mt-3 border-t border-[var(--border)] flex-shrink-0">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary)]/20 flex-shrink-0">
                            <Image
                              src={review.image}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-[var(--foreground)] truncate">
                                {review.name}
                              </p>
                              {review.verified && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                              <span>{review.location}</span>
                              <span>•</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setIsAutoPlay(false);
                prevSlide();
                setTimeout(() => setIsAutoPlay(true), 5000);
              }}
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
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
              className="p-2.5 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="text-sm font-medium text-[var(--foreground)]">4.8/5 Average</span>
          </div>
          <div className="w-px h-6 bg-[var(--border)] hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <span className="text-sm font-medium text-[var(--foreground)]">{reviews.length}+ Reviews</span>
          </div>
          <div className="w-px h-6 bg-[var(--border)] hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-medium text-[var(--foreground)]">98% Satisfied</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .review-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .review-card:nth-child(1) { transition-delay: 0.05s; }
        .review-card:nth-child(2) { transition-delay: 0.1s; }
        .review-card:nth-child(3) { transition-delay: 0.15s; }
      `}</style>
    </section>
  );
}