"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    id: 1,
    icon: "🚚",
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders above ₹999. No hidden charges, just pure fashion delivered to your doorstep.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: 2,
    icon: "🔄",
    title: "Easy Returns",
    description: "Hassle-free 30-day return policy. Not satisfied? We'll pick it up and give you a full refund, no questions asked.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    id: 3,
    icon: "💳",
    title: "Secure Payment",
    description: "100% secure payment gateway with multiple options. Your transactions are protected with bank-grade encryption.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    id: 4,
    icon: "⭐",
    title: "Premium Quality",
    description: "Curated collection from top designers. Every product goes through strict quality checks before reaching you.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".feature-card");
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
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--highlight)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
      
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
            ✨ Why Us
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
            Why Choose <span className="text-[var(--primary)]">Us</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base">
            We're committed to providing you with the best shopping experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card opacity-0 transform translate-y-8 transition-all duration-700 group"
            >
              <div className={`
                relative bg-[var(--card)] rounded p-6 md:p-8 
                border border-[var(--border)] 
                hover:shadow-2xl hover:shadow-[var(--primary)]/10
                transition-all duration-500 
                hover:-translate-y-2
                overflow-hidden
                group-hover:border-[var(--primary)]/30
              `}>
                {/* Background Gradient Glow */}
                <div className={`
                  absolute -top-24 -right-24 w-48 h-48 rounded-full 
                  ${feature.bgColor}
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500
                  blur-2xl
                `} />

                {/* Icon Container */}
                {/* <div className={`
                  relative w-16 h-16 md:w-20 md:h-20 
                  rounded-2xl 
                  flex items-center justify-center 
                  text-3xl md:text-4xl
                  transition-all duration-500
                  group-hover:scale-110 group-hover:rotate-6
                  bg-gradient-to-br ${feature.color}
                  shadow-lg shadow-${feature.color.split(' ')[1]}/20
                  mb-4
                `}>
                  <span className="relative z-10">{feature.icon}</span>
                  
                  <div className={`
                    absolute inset-0 rounded-2xl 
                    bg-gradient-to-br ${feature.color}
                    opacity-0 group-hover:opacity-30
                    transition-opacity duration-500
                    animate-pulse-slow
                  `} />
                </div> */}

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Decorative Line */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-0.5 
                  bg-gradient-to-r ${feature.color}
                  opacity-0 group-hover:opacity-100
                  transition-all duration-500
                  transform scale-x-0 group-hover:scale-x-100
                  origin-left
                `} />

                {/* Corner Decorations */}
                <div className={`
                  absolute top-3 right-3 w-6 h-6 
                  border-t-2 border-r-2 border-[var(--border)]
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  group-hover:border-[var(--primary)]/30
                `} />
                <div className={`
                  absolute bottom-3 left-3 w-6 h-6 
                  border-b-2 border-l-2 border-[var(--border)]
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  group-hover:border-[var(--primary)]/30
                `} />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[var(--card)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">10K+ Happy Customers</p>
              <p className="text-xs text-[var(--muted-foreground)]">Trusted by fashion lovers</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-[var(--border)] hidden md:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Award Winning</p>
              <p className="text-xs text-[var(--muted-foreground)]">Best fashion store 2025</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-[var(--border)] hidden md:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">4.9 Star Rating</p>
              <p className="text-xs text-[var(--muted-foreground)]">Based on 5K+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
      `}</style>
    </section>
  );
}