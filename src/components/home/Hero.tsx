"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll("[data-fade]");
    els?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
      el.classList.add("animate-fade-up");
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--surface)]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://s.yimg.com/ny/api/res/1.2/8a9c_pUM3iPkCU.e9thu7w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02MjE7Y2Y9d2VicA--/https://media.zenfs.com/en-US/homerun/seventeen_632/657d72bfb6d6725b23b7c747daf3f4b2" // isko apni image se replace karein
          alt="Fashion Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/80 to-[var(--surface)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent opacity-60" />
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--highlight)] opacity-30 blur-3xl z-[1]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[var(--accent)] opacity-20 blur-3xl z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)] opacity-5 blur-3xl z-[1]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid md:grid-cols-2 gap-10 items-center py-16 md:py-0 relative z-10">

        {/* Left Content */}
        <div className="flex flex-col gap-5">
          <span
            data-fade
            className="opacity-0 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-white/80 dark:bg-[var(--highlight)]/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit border border-[var(--border)]"
          >
            ✨ New Collection 2026
          </span>

          <h1
            data-fade
            className="opacity-0 font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight"
          >
            Fashion That <br />
            <span className="text-[var(--primary)] relative">
              Defines You
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--primary)] rounded-full opacity-30" />
            </span>
          </h1>

          {/* <p
            data-fade
            className="opacity-0 text-[var(--muted-foreground)] text-base md:text-lg max-w-md leading-relaxed backdrop-blur-sm bg-white/10 dark:bg-black/10 px-4 py-2 rounded-xl inline-block"
          >
            Discover premium ethnic and western wear crafted for every occasion.
          </p> */}

          <div data-fade className="opacity-0 flex items-center gap-4 flex-wrap">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-[var(--primary)] text-white rounded text-sm font-medium hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary)]/30 transform duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
            <Link
              href="/categories"
              className="px-8 py-3.5 border-2 border-[var(--primary)] text-[var(--primary)] rounded text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary)]/20 transform duration-300 backdrop-blur-sm bg-white/10"
            >
              Explore Collection
            </Link>
          </div>

          {/* Stats with Glass Effect */}
          <div data-fade className="opacity-0 flex items-center gap-8 pt-4">
            {[["500+", "Products"], ["10K+", "Customers"], ["4.9★", "Rating"]].map(([val, label]) => (
              <div key={label} className="backdrop-blur-sm bg-white/10 dark:bg-black/10 px-4 py-2 rounded border border-[var(--border)]">
                <p className="font-[var(--font-playfair)] text-xl font-bold text-[var(--primary)]">{val}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center items-center z-10">
          {/* Main Image Card with Glass Effect */}
          <div className="relative w-72 h-[420px] md:w-96 md:h-[540px] rounded overflow-hidden shadow-2xl shadow-[var(--primary)]/20 animate-zoom-in border-2 border-white/20 backdrop-blur-sm">
            <Image
              src="https://graziamagazine.com/wp-content/uploads/2025/10/GettyImages-2240842553-scaled.jpg"
              alt="Fashion Model"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
            />
            
            {/* Multiple Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent" />
            
            {/* Decorative Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--highlight)] to-[var(--accent)] rounded blur-sm opacity-50 -z-10" />
          </div>

          {/* Floating Badge - Left */}
          {/* <div className="absolute -top-4 -left-4 md:left-0 z-20 animate-float">
            <div className="bg-[var(--primary)] text-white rounded-2xl px-5 py-3.5 shadow-2xl shadow-[var(--primary)]/40 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <p className="text-2xl font-bold font-[var(--font-playfair)] relative">50%</p>
              <p className="text-xs font-medium relative">OFF</p>
              <p className="text-[10px] opacity-80 relative">Summer Sale</p>
            </div>
          </div> */}

          {/* Floating Badge - Bottom Right */}
          {/* <div className="absolute -bottom-4 -right-4 md:-right-6 z-20 animate-float-delay">
            <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-2xl px-5 py-3.5 shadow-2xl shadow-black/20">
              <p className="text-[10px] text-[var(--muted-foreground)] font-medium">New Arrival</p>
              <p className="text-sm font-semibold text-[var(--foreground)]">Summer Collection</p>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white" />
            </div>
          </div> */}

          {/* Floating Badge - Top Right */}
          {/* <div className="absolute -top-4 -right-4 z-20 animate-float-delay">
            <div className="bg-white/90 dark:bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-full px-4 py-2 shadow-xl shadow-black/10 flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⭐</span>
              <span className="text-xs font-semibold text-[var(--foreground)]">Trusted</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-[1]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 60 C360 120 720 0 1080 60 L1440 60 L1440 120 L0 120 Z"
            fill="var(--surface)"
            opacity="0.6"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9) rotate(-3deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s ease forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 4s ease-in-out infinite 2s;
        }
        .animate-zoom-in {
          animation: zoomIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}