"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Star, Users, ShoppingBag, Award, Heart } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: ShoppingBag, value: "5,000+", label: "Products Sold" },
  { icon: Award, value: "4.9★", label: "Average Rating" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
];

const whyUs = [
  { icon: "🎨", title: "Curated Collections", desc: "Handpicked styles for every occasion — from casual to festive." },
  { icon: "💎", title: "Premium Quality", desc: "Every product passes strict quality checks before reaching you." },
  { icon: "🚚", title: "Fast Delivery", desc: "Quick and reliable shipping across India with real-time tracking." },
  { icon: "💬", title: "WhatsApp Support", desc: "Instant help via WhatsApp — we're always just a message away." },
];

const team = [
  { name: "Aryan Sharma", role: "Founder & CEO", emoji: "👨‍💼", desc: "Passionate about bringing premium fashion to every doorstep." },
  { name: "Priya Verma", role: "Head of Design", emoji: "👩‍🎨", desc: "Curates every collection with an eye for elegance and trend." },
  { name: "Rahul Gupta", role: "Operations Head", emoji: "👨‍💻", desc: "Ensures seamless delivery and customer satisfaction." },
];

const reviews = [
  { name: "Neha Singh", location: "Lucknow", rating: 5, text: "Best fashion store! Quality is unmatched and delivery was super fast.", avatar: "https://i.pravatar.cc/80?img=5" },
  { name: "Amit Kumar", location: "Delhi", rating: 5, text: "Ordered a kurta set and it was exactly as shown. Highly recommended!", avatar: "https://i.pravatar.cc/80?img=4" },
  { name: "Priya Sharma", location: "Mumbai", rating: 5, text: "The saree collection is stunning. Will definitely shop again!", avatar: "https://i.pravatar.cc/80?img=1" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      <HeroBanner />
      <OurStory />
      <Mission />
      <StatsSection />
      <WhyChooseUs />
      <TeamSection />
      <ReviewsSection />
      <ContactCTA />
    </main>
  );
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────

function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a08] to-[#1a0e05]" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C79A5B 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />

      <div className="relative z-10 text-center px-4"
        style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)" }}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full mb-4">
          Our Story
        </span>
        <h1 className="font-[var(--font-playfair)] text-4xl md:text-6xl font-bold text-white mb-4">
          About <span className="text-[var(--primary)]">Fashion Pehnava</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Bringing premium fashion to every doorstep across India — with love, quality, and style.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href="/products"
            className="px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
            Shop Now
          </Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
            <FaWhatsapp size={15} /> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

function OurStory() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)" }}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--surface)]">
              <Image src="https://i.pinimg.com/736x/40/4f/11/404f112f90af91f39031f820e208b498.jpg"
                alt="Our Story" fill className="object-fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Est. 2022
              </div>
            </div>
          </div>

          {/* Text side */}
          <div style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)" }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-5">
              From a Dream to <span className="text-[var(--primary)]">Your Wardrobe</span>
            </h2>
            <div className="space-y-4 text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed">
              <p>
                Fashion Pehnava was born from a simple belief — that everyone deserves to look and feel their best without breaking the bank. Founded in 2022 in Lucknow, we started as a small boutique with a big dream.
              </p>
              <p>
                What began as a passion project quickly grew into a trusted fashion destination for thousands of customers across India. We source the finest fabrics and work with skilled artisans to bring you collections that blend tradition with modern trends.
              </p>
              <p>
                Today, we're proud to serve over 10,000 happy customers — and we're just getting started.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com/fashion_pehnava1" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline">
                <FaInstagram size={16} /> @fashion_pehnava1
              </a>
              <span className="text-[var(--border)]">•</span>
              <a href="mailto:fpehnava29@gmail.com"
                className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline">
                <Mail size={14} /> fpehnava29@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mission ──────────────────────────────────────────────────────────────────

function Mission() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-20 bg-[var(--surface)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10"
        style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
          Our Mission
        </span>
        <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
          Fashion for <span className="text-[var(--primary)]">Everyone</span>
        </h2>
        <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-8">
          Our mission is to make premium fashion accessible to every Indian household. We believe style shouldn't be a luxury — it should be a right. Through carefully curated collections, transparent pricing, and exceptional service, we're redefining what online fashion shopping means in India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {[
            { emoji: "🌟", title: "Our Vision", text: "To be India's most loved fashion brand by 2030." },
            { emoji: "💡", title: "Our Values", text: "Quality, transparency, and customer-first always." },
            { emoji: "🤝", title: "Our Promise", text: "100% genuine products with hassle-free returns." },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-left">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-14 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={label}
              style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
              className="text-center text-white">
              <div className="flex justify-center mb-2">
                <Icon size={28} className="opacity-80" />
              </div>
              <div className="font-[var(--font-playfair)] text-3xl font-bold">{value}</div>
              <div className="text-sm opacity-80 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUs() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
            Why Us
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Why Choose <span className="text-[var(--primary)]">Fashion Pehnava</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.map((item, i) => (
            <div key={item.title}
              style={{ transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/50 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function TeamSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
            Meet the Team
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            The People Behind <span className="text-[var(--primary)]">the Brand</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <div key={member.name}
              style={{ transition: `opacity 600ms ease ${i * 150}ms, transform 600ms ease ${i * 150}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-3">{member.emoji}</div>
              <h3 className="font-semibold text-[var(--foreground)]">{member.name}</h3>
              <p className="text-xs text-[var(--primary)] font-medium mt-0.5 mb-2">{member.role}</p>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function ReviewsSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            What Our <span className="text-[var(--primary)]">Customers Say</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={r.name}
              style={{ transition: `opacity 600ms ease ${i * 150}ms, transform 600ms ease ${i * 150}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/40 transition-colors">
              <Stars count={r.rating} />
              <p className="text-sm text-[var(--foreground)] leading-relaxed mt-3 mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                <Image src={r.avatar} alt={r.name} width={36} height={36} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{r.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────

function ContactCTA() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-16 md:py-20 bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center"
        style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}>
        <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
          Get in <span className="text-[var(--primary)]">Touch</span>
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 text-sm md:text-base">
          Have questions? We'd love to hear from you. Reach out via WhatsApp, email, or follow us on Instagram.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">
            <FaWhatsapp size={16} /> Chat on WhatsApp
          </a>
          <a href="mailto:fpehnava29@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">
            <Mail size={15} /> fpehnava29@gmail.com
          </a>
          <a href="https://instagram.com/fashion_pehnava1" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors w-full sm:w-auto justify-center">
            <FaInstagram size={15} /> @fashion_pehnava1
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[var(--primary)]" /> Lucknow, Uttar Pradesh</span>
          <span className="hidden sm:block text-[var(--border)]">•</span>
          <span className="flex items-center gap-1.5"><Phone size={13} className="text-[var(--primary)]" /> Mon–Sat, 10AM–7PM</span>
        </div>
      </div>
    </section>
  );
}
