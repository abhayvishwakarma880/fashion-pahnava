"use client";

import { useState, useEffect, useRef } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".newsletter-element");
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--primary)] opacity-5 blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--highlight)] opacity-5 blur-3xl animate-pulse-slow-delay" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-[var(--card)] rounded-3xl p-8 md:p-12 lg:p-16 border border-[var(--border)] shadow-2xl shadow-[var(--primary)]/5 relative overflow-hidden">
          
          {/* Decorative Elements Inside Card */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--primary)] opacity-5 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--accent)] opacity-5 blur-2xl" />
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="newsletter-element opacity-0 transform translate-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)]/10 text-3xl mb-4">
                ✉️
              </div>
            </div>

            {/* Heading */}
            <div className="newsletter-element opacity-0 transform translate-y-8">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
                📬 Newsletter
              </span>
              <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
                Stay <span className="text-[var(--primary)]">Updated</span>
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm md:text-base max-w-md mx-auto">
                Get the latest fashion trends, exclusive offers, and style tips delivered to your inbox
              </p>
            </div>

            {/* Features */}
            <div className="newsletter-element opacity-0 transform translate-y-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-xs text-[var(--muted-foreground)]">Exclusive Offers</span>
              </div>
              <div className="w-px h-4 bg-[var(--border)] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-xs text-[var(--muted-foreground)]">New Arrivals</span>
              </div>
              <div className="w-px h-4 bg-[var(--border)] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-xs text-[var(--muted-foreground)]">Style Tips</span>
              </div>
              <div className="w-px h-4 bg-[var(--border)] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-xs text-[var(--muted-foreground)]">10% Off First Order</span>
              </div>
            </div>

            {/* Subscribe Form */}
            <div className="newsletter-element opacity-0 transform translate-y-8 mt-8">
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`
                        w-full px-5 py-3.5 rounded-xl
                        bg-[var(--background)] border-2
                        text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60
                        focus:outline-none focus:border-[var(--primary)]
                        transition-all duration-300
                        ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)]'}
                      `}
                      disabled={isLoading || isSubscribed}
                    />
                    {error && (
                      <p className="absolute -bottom-6 left-0 text-xs text-red-500 mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    className={`
                      px-8 py-3.5 rounded-xl text-sm font-medium
                      bg-[var(--primary)] text-white
                      hover:opacity-90 transition-all duration-300
                      hover:shadow-lg hover:shadow-[var(--primary)]/30
                      transform hover:scale-[1.02]
                      flex items-center justify-center gap-2
                      min-w-[140px]
                      ${(isLoading || isSubscribed) ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Subscribing...
                      </>
                    ) : isSubscribed ? (
                      <>
                        <span className="text-lg">✓</span>
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Success Message */}
            {isSubscribed && (
              <div className="newsletter-element opacity-0 transform translate-y-8 mt-4">
                <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full text-sm">
                  <span className="text-lg">🎉</span>
                  Thanks for subscribing! Check your inbox for a surprise.
                </div>
              </div>
            )}

            {/* Trust Badge */}
            <div className="newsletter-element opacity-0 transform translate-y-8 mt-6">
              <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]">
                <span>🔒 No spam, unsubscribe anytime</span>
                <span>•</span>
                <span>📧 10K+ subscribers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .newsletter-element.animate-in {
          animation: fadeUp 0.8s ease forwards;
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
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.08;
          }
        }
        
        @keyframes pulse-slow-delay {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.08;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 4s ease-in-out infinite;
        }
        
        .newsletter-element:nth-child(1) { animation-delay: 0.1s; }
        .newsletter-element:nth-child(2) { animation-delay: 0.3s; }
        .newsletter-element:nth-child(3) { animation-delay: 0.5s; }
        .newsletter-element:nth-child(4) { animation-delay: 0.7s; }
        .newsletter-element:nth-child(5) { animation-delay: 0.9s; }
        .newsletter-element:nth-child(6) { animation-delay: 1.1s; }
      `}</style>
    </section>
  );
}