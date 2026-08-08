"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Truck, Clock, MapPin, Package, AlertTriangle, CheckCircle, Mail, IndianRupee, Globe } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const shippingOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    time: "5–7 Business Days",
    charge: "₹49",
    free: "Free above ₹999",
    desc: "Available across India. Reliable delivery to your doorstep.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    time: "2–3 Business Days",
    charge: "₹99",
    free: "Free above ₹2,499",
    desc: "Faster delivery for select cities. Order before 12 PM for same-day dispatch.",
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
    border: "border-[var(--primary)]/30",
  },
  {
    icon: Globe,
    title: "Remote Areas",
    time: "7–10 Business Days",
    charge: "₹99",
    free: "No free shipping",
    desc: "Delivery available to remote and rural areas across India via partner couriers.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const steps = [
  { icon: Package, step: "01", title: "Order Placed", desc: "You place your order via WhatsApp or our website. You'll receive a confirmation message." },
  { icon: CheckCircle, step: "02", title: "Order Confirmed", desc: "Our team verifies your order and payment within 2–4 hours on business days." },
  { icon: Truck, step: "03", title: "Dispatched", desc: "Your order is packed and handed over to our courier partner. Tracking details shared on WhatsApp." },
  { icon: MapPin, step: "04", title: "Out for Delivery", desc: "Your package is out for delivery. You'll receive a call from the delivery agent." },
];

const faqs = [
  { q: "Do you ship across all of India?", a: "Yes, we ship to all states and union territories across India including remote areas via our courier partners." },
  { q: "How do I track my order?", a: "Once your order is dispatched, we'll send the tracking number and courier details via WhatsApp. You can track it on the courier's website." },
  { q: "What if my order is delayed?", a: "Delays can happen due to weather, public holidays, or high demand. If your order is delayed beyond the expected date, contact us on WhatsApp immediately." },
  { q: "Can I change my delivery address after placing an order?", a: "Address changes are possible only before the order is dispatched. Contact us on WhatsApp as soon as possible." },
  { q: "What if the package is damaged on delivery?", a: "Do not accept a visibly damaged package. If you've already accepted it, take photos and contact us within 24 hours for a replacement." },
  { q: "Do you offer same-day delivery?", a: "Same-day delivery is not available currently. Express delivery (2–3 days) is our fastest option for select cities." },
];

export default function ShippingPolicyPage() {
  const [loaded, setLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();
  const s4 = useInView();
  const s5 = useInView();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a08] to-[#1a0e05]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C79A5B 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />
        <div
          className="relative z-10 text-center px-4"
          style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)" }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full mb-4">
            Delivery Info
          </span>
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-3">
            Shipping <span className="text-[var(--primary)]">Policy</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto">
            Fast, reliable delivery across India. Know everything about how we ship your orders.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section ref={s1.ref} className="py-12 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Ships To", value: "All India", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Clock, label: "Dispatch Time", value: "24–48 hrs", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
              { icon: IndianRupee, label: "Free Shipping", value: "Above ₹999", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: Package, label: "Packaging", value: "Secure Pack", color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map(({ icon: Icon, label, value, color, bg }, i) => (
              <div
                key={label}
                style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: s1.inView ? 1 : 0, transform: s1.inView ? "translateY(0)" : "translateY(24px)" }}
                className="flex items-center gap-3 p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section ref={s2.ref} className="py-14 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div
            className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              Delivery Options
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              Shipping <span className="text-[var(--primary)]">Options</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shippingOptions.map(({ icon: Icon, title, time, charge, free, desc, color, bg, border }, i) => (
              <div
                key={title}
                style={{ transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`, opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(32px)" }}
                className={`bg-[var(--card)] border ${border} rounded-xl p-6`}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">{title}</h3>
                <p className={`text-sm font-bold ${color} mb-1`}>{time}</p>
                <p className="text-xs text-[var(--muted-foreground)] mb-3 leading-relaxed">{desc}</p>
                <div className="border-t border-[var(--border)] pt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--muted-foreground)]">Charge</span>
                    <span className="font-semibold text-[var(--foreground)]">{charge}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--muted-foreground)]">Free shipping</span>
                    <span className="font-semibold text-green-500">{free}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Journey */}
      <section ref={s3.ref} className="py-14 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div
            className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              Order Journey
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              From Order to <span className="text-[var(--primary)]">Doorstep</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ icon: Icon, step, title, desc }, i) => (
              <div
                key={step}
                style={{ transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`, opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateY(0)" : "translateY(32px)" }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 relative"
              >
                <span className="text-4xl font-bold text-[var(--primary)]/10 absolute top-3 right-4 font-[var(--font-playfair)]">{step}</span>
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1.5">{title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section ref={s4.ref} className="py-14 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notes */}
            <div
              style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s4.inView ? 1 : 0, transform: s4.inView ? "translateX(0)" : "translateX(-24px)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle size={18} className="text-amber-500" />
                <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[var(--foreground)]">Important Notes</h2>
              </div>
              <div className="space-y-3">
                {[
                  "Orders are dispatched within 24–48 hours on business days (Mon–Sat).",
                  "Delivery times are estimates and may vary due to public holidays or weather.",
                  "Shipping charges are calculated at checkout based on your location.",
                  "We currently ship only within India. International shipping is not available.",
                  "Ensure your delivery address and phone number are correct to avoid delays.",
                  "For bulk orders (5+ items), please contact us on WhatsApp for special rates.",
                  "We are not responsible for delays caused by the courier after dispatch.",
                ].map((note, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                    <span className="text-amber-500 font-bold text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-[var(--muted-foreground)]">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact + Links */}
            <div
              style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: s4.inView ? 1 : 0, transform: s4.inView ? "translateX(0)" : "translateX(24px)" }}
              className="space-y-4"
            >
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[var(--foreground)] mb-2">Shipping Query?</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-5">
                  Have questions about your delivery or want to track your order? Reach out to us directly.
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I have a query about my order delivery.`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FaWhatsapp size={18} />
                    <div>
                      <p className="font-semibold">WhatsApp Us</p>
                      <p className="text-xs opacity-80">Track order or report an issue</p>
                    </div>
                  </a>
                  <a
                    href="mailto:fpehnava29@gmail.com?subject=Shipping Query"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Mail size={18} />
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-xs opacity-80">fpehnava29@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5">
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">Related Policies</p>
                <div className="space-y-2">
                  {[
                    { label: "Return Policy", href: "/return-policy" },
                    { label: "Refund Policy", href: "/refund-policy" },
                    { label: "Contact Us", href: "/contact" },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href} className="flex items-center justify-between text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-1 border-b border-[var(--border)] last:border-0">
                      {label} <span className="text-[var(--primary)]">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={s5.ref} className="py-14 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div
            className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s5.inView ? 1 : 0, transform: s5.inView ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              FAQ
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              Shipping <span className="text-[var(--primary)]">FAQs</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ transition: `opacity 500ms ease ${i * 80}ms, transform 500ms ease ${i * 80}ms`, opacity: s5.inView ? 1 : 0, transform: s5.inView ? "translateY(0)" : "translateY(16px)" }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors"
                >
                  <span className="text-sm font-semibold text-[var(--foreground)]">{faq.q}</span>
                  <span
                    className="text-[var(--primary)] text-lg shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? "200px" : "0", transition: "max-height 300ms ease", overflow: "hidden" }}>
                  <p className="px-5 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
