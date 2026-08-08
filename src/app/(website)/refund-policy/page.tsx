"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IndianRupee, Clock, CreditCard, Banknote, Wallet, AlertTriangle, Mail, CheckCircle } from "lucide-react";
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

const refundMethods = [
  { icon: CreditCard, title: "Credit / Debit Card", time: "5–7 business days", desc: "Refund credited back to the original card used for payment.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Wallet, title: "UPI / GPay / PhonePe", time: "2–3 business days", desc: "Refund sent directly to the UPI ID used during checkout.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Banknote, title: "Cash on Delivery (COD)", time: "5–7 business days", desc: "Refund via bank transfer. Share your account details with us.", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: Wallet, title: "Store Credit", time: "Within 24 hours", desc: "Instant store credit that can be used on your next purchase.", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
];

const timeline = [
  { day: "Day 0", event: "Return request raised via WhatsApp or email" },
  { day: "Day 1–2", event: "Return request reviewed and approved by our team" },
  { day: "Day 3–5", event: "Item picked up or received at our warehouse" },
  { day: "Day 5–6", event: "Item inspected for quality and condition" },
  { day: "Day 6–7", event: "Refund initiated to original payment method" },
  { day: "Day 7–14", event: "Refund reflects in your account (bank processing time)" },
];

export default function RefundPolicyPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();
  const s4 = useInView();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a08] to-[#1a0e05]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C79A5B 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />
        <div className="relative z-10 text-center px-4"
          style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)" }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full mb-4">
            Customer Care
          </span>
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-3">
            Refund <span className="text-[var(--primary)]">Policy</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto">
            Transparent and hassle-free refunds. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section ref={s1.ref} className="py-12 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "Processing Time", value: "5–7 Days", sub: "after item received", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: IndianRupee, label: "Refund Amount", value: "100%", sub: "of item value", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: CheckCircle, label: "Success Rate", value: "98%", sub: "refunds processed", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
            ].map(({ icon: Icon, label, value, sub, color, bg }, i) => (
              <div key={label}
                style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: s1.inView ? 1 : 0, transform: s1.inView ? "translateY(0)" : "translateY(24px)" }}
                className="flex items-center gap-4 p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">{label}</p>
                  <p className={`text-xl font-bold ${color}`}>{value}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Methods */}
      <section ref={s2.ref} className="py-14 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(24px)" }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              Refund Methods
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              How You'll Get Your <span className="text-[var(--primary)]">Money Back</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {refundMethods.map(({ icon: Icon, title, time, desc, color, bg }, i) => (
              <div key={title}
                style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(24px)" }}
                className="flex gap-4 p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/30 transition-colors">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] text-sm">{title}</h3>
                  <p className={`text-xs font-medium ${color} mt-0.5`}>{time}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline + Notes */}
      <section ref={s3.ref} className="py-14 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Timeline */}
            <div style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateX(0)" : "translateX(-24px)" }}>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
                Timeline
              </span>
              <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[var(--foreground)] mb-6">
                Refund <span className="text-[var(--primary)]">Timeline</span>
              </h2>
              <div className="space-y-0">
                {timeline.map(({ day, event }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)] mt-1 shrink-0" />
                      {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-[var(--border)] my-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">{day}</p>
                      <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateX(0)" : "translateX(24px)" }}>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
                Conditions
              </span>
              <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[var(--foreground)] mb-6">
                Refund <span className="text-[var(--primary)]">Conditions</span>
              </h2>
              <div className="space-y-3">
                {[
                  "Refund is applicable only after the returned item is received and inspected.",
                  "Item must be in original condition — unused, unwashed, with all tags.",
                  "Shipping charges are non-refundable unless the error is on our side.",
                  "Partial refunds may be issued for items with minor damage not caused by us.",
                  "Refunds for COD orders are processed via bank transfer only.",
                  "If the refund is delayed beyond 14 days, contact us immediately.",
                ].map((cond, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                    <CheckCircle size={14} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-sm text-[var(--muted-foreground)]">{cond}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact + Links */}
      <section ref={s4.ref} className="py-14 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center"
          style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s4.inView ? 1 : 0, transform: s4.inView ? "translateY(0)" : "translateY(24px)" }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[var(--foreground)]">
              Refund Not Received?
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">
            If your refund hasn't arrived within the expected timeframe, please contact us immediately. We'll resolve it within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I have not received my refund yet.`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">
              <FaWhatsapp size={16} /> WhatsApp Us
            </a>
            <a href="mailto:fpehnava29@gmail.com?subject=Refund Not Received"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">
              <Mail size={15} /> Email Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/return-policy" className="text-[var(--primary)] hover:underline">Return Policy</Link>
            <span className="text-[var(--border)]">•</span>
            <Link href="/shipping-policy" className="text-[var(--primary)] hover:underline">Shipping Policy</Link>
            <span className="text-[var(--border)]">•</span>
            <Link href="/contact" className="text-[var(--primary)] hover:underline">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
