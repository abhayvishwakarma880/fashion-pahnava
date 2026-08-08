"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { RotateCcw, CheckCircle, XCircle, Clock, Package, AlertTriangle, Mail } from "lucide-react";
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

const eligible = [
  "Item received is damaged or defective",
  "Wrong item delivered (different from what was ordered)",
  "Item is significantly different from the product description",
  "Item is missing parts or accessories",
  "Size or fit issue (exchange available)",
];

const notEligible = [
  "Items returned after 7 days of delivery",
  "Used, washed, or altered items",
  "Items without original tags and packaging",
  "Innerwear, lingerie, and swimwear (hygiene reasons)",
  "Customized or made-to-order items",
  "Items purchased during clearance/final sale",
];

const steps = [
  { icon: FaWhatsapp, step: "01", title: "Contact Us", desc: "Message us on WhatsApp or email within 7 days of delivery with your order details and reason for return." },
  { icon: Package, step: "02", title: "Pack the Item", desc: "Pack the item securely in its original packaging with all tags intact. Include your order ID inside." },
  { icon: RotateCcw, step: "03", title: "Ship It Back", desc: "Drop off the package at your nearest courier. We'll share the return address after approval." },
  { icon: CheckCircle, step: "04", title: "Get Refund", desc: "Once we receive and inspect the item, your refund will be processed within 5–7 business days." },
];

export default function ReturnPolicyPage() {
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
            Return <span className="text-[var(--primary)]">Policy</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto">
            We want you to love every purchase. If something's not right, we're here to help.
          </p>
        </div>
      </section>

      {/* Quick Summary */}
      <section ref={s1.ref} className="py-12 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "Return Window", value: "7 Days", sub: "from delivery date", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: RotateCcw, label: "Exchange", value: "Free", sub: "size & fit issues", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: CheckCircle, label: "Refund Time", value: "5–7 Days", sub: "after item received", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
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

      {/* Eligible / Not Eligible */}
      <section ref={s2.ref} className="py-14 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(24px)" }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              Eligibility
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              What Can Be <span className="text-[var(--primary)]">Returned?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(24px)" }}>
            {/* Eligible */}
            <div className="bg-[var(--card)] border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={18} className="text-green-500" />
                <h3 className="font-semibold text-[var(--foreground)]">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted-foreground)]">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Not Eligible */}
            <div className="bg-[var(--card)] border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={18} className="text-red-500" />
                <h3 className="font-semibold text-[var(--foreground)]">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {notEligible.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted-foreground)]">
                    <XCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section ref={s3.ref} className="py-14 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10"
            style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateY(0)" : "translateY(24px)" }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-3">
              Process
            </span>
            <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              How to <span className="text-[var(--primary)]">Return</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ icon: Icon, step, title, desc }, i) => (
              <div key={step}
                style={{ transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`, opacity: s3.inView ? 1 : 0, transform: s3.inView ? "translateY(0)" : "translateY(32px)" }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 relative">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Notes */}
            <div style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: s4.inView ? 1 : 0, transform: s4.inView ? "translateX(-24px)" : "translateX(-24px)" }}>
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle size={18} className="text-amber-500" />
                <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[var(--foreground)]">Important Notes</h2>
              </div>
              <div className="space-y-3">
                {[
                  "Return requests must be raised within 7 days of delivery.",
                  "Items must be unused, unwashed, and in original condition with all tags.",
                  "Original packaging must be intact for the return to be accepted.",
                  "Shipping charges for returns are borne by the customer unless the item is defective or wrong.",
                  "Refunds are processed to the original payment method or as store credit.",
                  "COD orders will receive refund via bank transfer — please share your bank details.",
                  "We reserve the right to reject returns that don't meet our policy conditions.",
                ].map((note, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                    <span className="text-amber-500 font-bold text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-[var(--muted-foreground)]">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: s4.inView ? 1 : 0, transform: s4.inView ? "translateX(0)" : "translateX(24px)" }}
              className="space-y-4">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[var(--foreground)] mb-2">Need Help with a Return?</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-5">Contact us within 7 days of delivery. We'll guide you through the entire process.</p>
                <div className="space-y-3">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to initiate a return for my order.`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    <FaWhatsapp size={18} />
                    <div>
                      <p className="font-semibold">WhatsApp Us</p>
                      <p className="text-xs opacity-80">Fastest response — usually within 1 hour</p>
                    </div>
                  </a>
                  <a href="mailto:fpehnava29@gmail.com?subject=Return Request"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    <Mail size={18} />
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-xs opacity-80">fpehnava29@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5">
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">Also See</p>
                <div className="space-y-2">
                  <Link href="/refund-policy" className="flex items-center justify-between text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-1">
                    Refund Policy <span className="text-[var(--primary)]">→</span>
                  </Link>
                  <Link href="/shipping-policy" className="flex items-center justify-between text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-1">
                    Shipping Policy <span className="text-[var(--primary)]">→</span>
                  </Link>
                  <Link href="/contact" className="flex items-center justify-between text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-1">
                    Contact Us <span className="text-[var(--primary)]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
