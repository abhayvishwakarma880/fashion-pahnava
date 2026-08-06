"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PromotionalBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".banner-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-in");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative w-full overflow-hidden bg-[var(--surface)]"
    >
      {/* Main Banner Container */}
      <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://krs.planeta-mall.ru/i/10/89/13/108913/file.jpg"
            alt="Mid Season Sale"
            fill
            className="object-cover object-center"
            priority
          />
          
          {/* Black Overlay - 50% */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
          
          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[var(--primary)]/10 rounded-full blur-3xl z-[1]" />
        <div className="absolute bottom-0 left-0 w-56 md:w-80 h-56 md:h-80 bg-[var(--accent)]/10 rounded-full blur-3xl z-[1]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="banner-element opacity-0 transform translate-y-8">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-white/10 backdrop-blur-sm border border-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
                🔥 Limited Time Offer
              </span>
            </div>

            {/* Heading */}
            <div className="banner-element opacity-0 transform translate-y-8">
              <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 md:mb-3">
  MID SEASON{" "}
  <span className="text-[var(--primary)] relative inline-block">
    SALE
    <svg
      className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
      height="3"
      viewBox="0 0 200 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2H200"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-pulse"
      />
    </svg>
  </span>
</h2>
            </div>

            {/* Discount */}
            <div className="banner-element opacity-0 transform translate-y-8">
              <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-3">
                UP TO <span className="text-[var(--primary)]">60%</span> OFF
              </p>
            </div>

            {/* Description */}
            <div className="banner-element opacity-0 transform translate-y-8">
              <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4 md:mb-6 max-w-md">
                Shop the latest collection with exclusive discounts. 
                Don't miss out on these amazing deals!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="banner-element opacity-0 transform translate-y-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/products"
                className="group relative px-5 md:px-8 py-2.5 md:py-3.5 bg-[var(--primary)] text-white rounded text-xs md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-105 duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <svg
                    className="w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-1 transition-transform"
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
                </span>
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              
              <Link
                href="/categories"
                className="px-5 md:px-8 py-2.5 md:py-3.5 border-2 border-white/30 text-white rounded text-xs md:text-sm font-medium hover:bg-white hover:text-[var(--foreground)] transition-all hover:scale-105 duration-300 backdrop-blur-sm bg-white/5"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Discount Tag - Right Side */}
        <div className="hidden lg:block absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-10 animate-float">
          <div className="relative">
            <div className="w-24 h-24 xl:w-36 xl:h-36 rounded-full bg-[var(--primary)] flex flex-col items-center justify-center shadow-2xl shadow-[var(--primary)]/30 border-4 border-white/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              <span className="text-2xl xl:text-4xl font-bold text-white relative">60%</span>
              <span className="text-[10px] xl:text-sm font-semibold text-white/90 relative">OFF</span>
              <span className="text-[8px] xl:text-[10px] text-white/70 uppercase tracking-wider relative">Limited</span>
            </div>
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)] opacity-30 animate-ping" />
          </div>
        </div>

        {/* Small Floating Badge - Bottom Right */}
        {/* <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 z-10 animate-float-delay">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-xl">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/20 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]"
                  />
                ))}
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-white/60">People Shopping</p>
                <p className="text-xs md:text-sm font-semibold text-white">2.5K+ Today</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .banner-element.animate-in {
          animation: fadeUp 0.8s ease forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1.5s;
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .banner-element:nth-child(1) { animation-delay: 0.1s; }
        .banner-element:nth-child(2) { animation-delay: 0.3s; }
        .banner-element:nth-child(3) { animation-delay: 0.5s; }
        .banner-element:nth-child(4) { animation-delay: 0.7s; }
        .banner-element:nth-child(5) { animation-delay: 0.9s; }
        .banner-element:nth-child(6) { animation-delay: 1.1s; }
      `}</style>
    </section>
  );
}