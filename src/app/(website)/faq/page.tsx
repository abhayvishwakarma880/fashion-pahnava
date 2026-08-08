"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Search, Mail } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Orders", "Shipping", "Returns & Refunds", "Payments", "Products", "Account"];

const faqs = [
  // Orders
  { cat: "Orders", q: "How do I place an order?", a: "You can place an order by clicking 'Book Now' on any product. A booking form will open where you fill in your details. Your order is then confirmed via WhatsApp." },
  { cat: "Orders", q: "Can I cancel my order?", a: "Orders can be cancelled before they are dispatched. Contact us on WhatsApp immediately after placing the order. Once dispatched, cancellation is not possible." },
  { cat: "Orders", q: "How do I track my order?", a: "Once your order is dispatched, we'll send the tracking number and courier details via WhatsApp. You can use that to track your package on the courier's website." },
  { cat: "Orders", q: "Can I modify my order after placing it?", a: "Order modifications (size, address, quantity) are possible only before dispatch. Contact us on WhatsApp as soon as possible after placing the order." },
  { cat: "Orders", q: "Do I get an order confirmation?", a: "Yes, you'll receive an order confirmation message on WhatsApp with your order details, estimated delivery date, and our contact information." },

  // Shipping
  { cat: "Shipping", q: "Do you ship across all of India?", a: "Yes, we ship to all states and union territories across India including remote areas via our trusted courier partners." },
  { cat: "Shipping", q: "How long does delivery take?", a: "Standard delivery takes 5–7 business days. Express delivery (select cities) takes 2–3 business days. Remote areas may take 7–10 business days." },
  { cat: "Shipping", q: "What are the shipping charges?", a: "Standard shipping is ₹49. It's free on orders above ₹999. Express delivery is ₹99, free on orders above ₹2,499." },
  { cat: "Shipping", q: "What if my package is delayed?", a: "Delays can happen due to weather, public holidays, or high demand. If your order is delayed beyond the expected date, contact us on WhatsApp and we'll investigate immediately." },
  { cat: "Shipping", q: "Can I change my delivery address?", a: "Address changes are possible only before the order is dispatched. Contact us on WhatsApp as soon as possible with your order ID and new address." },

  // Returns & Refunds
  { cat: "Returns & Refunds", q: "What is your return policy?", a: "We accept returns within 7 days of delivery for damaged, defective, or wrong items. Items must be unused, unwashed, and in original packaging with all tags intact." },
  { cat: "Returns & Refunds", q: "How do I initiate a return?", a: "Message us on WhatsApp or email us at fpehnava29@gmail.com within 7 days of delivery with your order ID, reason for return, and photos of the item." },
  { cat: "Returns & Refunds", q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after we receive and inspect the returned item. It may take an additional 3–5 days to reflect in your account." },
  { cat: "Returns & Refunds", q: "Can I exchange a product?", a: "Yes! We offer free exchanges for size and fit issues. Contact us within 7 days of delivery. The item must be unused and in original condition." },
  { cat: "Returns & Refunds", q: "Are shipping charges refunded?", a: "Shipping charges are non-refundable unless the return is due to our error (wrong or defective item). In that case, we cover the return shipping cost as well." },

  // Payments
  { cat: "Payments", q: "What payment methods do you accept?", a: "We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and Cash on Delivery (COD) for select locations." },
  { cat: "Payments", q: "Is Cash on Delivery available?", a: "Yes, COD is available for most locations across India. A small COD handling fee of ₹30 may apply for orders below ₹500." },
  { cat: "Payments", q: "Is my payment information secure?", a: "Absolutely. All online payments are processed through secure, encrypted payment gateways. We never store your card or UPI details." },
  { cat: "Payments", q: "What if my payment fails?", a: "If your payment fails but the amount is deducted, it will be automatically refunded within 5–7 business days. Contact us if it takes longer." },

  // Products
  { cat: "Products", q: "Are the products genuine?", a: "Yes, 100%. All products on Fashion Pehnava are genuine and sourced directly from trusted manufacturers and artisans. We do not sell replicas or counterfeit items." },
  { cat: "Products", q: "How do I know which size to order?", a: "Each product has a size guide. If you're unsure, message us on WhatsApp with your measurements and we'll help you pick the right size." },
  { cat: "Products", q: "Are the product colors accurate?", a: "We try our best to show accurate colors. However, slight variations may occur due to screen settings and lighting. If you have doubts, contact us before ordering." },
  { cat: "Products", q: "Can I request a custom order?", a: "Yes! We accept custom orders for select categories. Contact us on WhatsApp with your requirements and we'll let you know if it's possible." },

  // Account
  { cat: "Account", q: "Do I need an account to order?", a: "No, you don't need an account. You can place orders directly via WhatsApp or the Book Now button on our website without creating an account." },
  { cat: "Account", q: "How do I contact customer support?", a: "You can reach us via WhatsApp, email at fpehnava29@gmail.com, or through the Contact page on our website. We're available Mon–Sat, 10AM–7PM." },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  const s1 = useInView();
  const s2 = useInView();

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat = activeCategory === "All" || f.cat === activeCategory;
      const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  // Reset open when filter changes
  useEffect(() => { setOpenIndex(null); }, [activeCategory, search]);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[44vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a08] to-[#1a0e05]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C79A5B 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />

        <div
          className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto"
          style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)" }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full mb-4">
            Help Center
          </span>
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-[var(--primary)]">Questions</span>
          </h1>
          {/* Search */}
          <div className="relative mt-2">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your question..."
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={s1.ref} className="py-10 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: `${faqs.length}+`, label: "Questions Answered" },
              { value: `${categories.length - 1}`, label: "Categories" },
              { value: "24hr", label: "Support Response" },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: s1.inView ? 1 : 0, transform: s1.inView ? "translateY(0)" : "translateY(20px)" }}
                className="text-center p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl"
              >
                <p className="font-[var(--font-playfair)] text-2xl font-bold text-[var(--primary)]">{value}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={s2.ref} className="py-10 pb-20 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Category Tabs */}
          <div
            className="flex gap-2 flex-wrap mb-8"
            style={{ transition: "opacity 600ms ease, transform 600ms ease", opacity: s2.inView ? 1 : 0, transform: s2.inView ? "translateY(0)" : "translateY(20px)" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? "opacity-70" : "opacity-50"}`}>
                    ({faqs.filter((f) => f.cat === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results count */}
          {search && (
            <p className="text-xs text-[var(--muted-foreground)] mb-4">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<span className="text-[var(--primary)]">{search}</span>"
            </p>
          )}

          {/* FAQ List */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-[var(--foreground)] mb-1">No results found</p>
              <p className="text-sm text-[var(--muted-foreground)] mb-5">Try a different keyword or browse by category</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="px-5 py-2 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map((faq, i) => (
                <div
                  key={i}
                  style={{ transition: `opacity 400ms ease ${Math.min(i, 8) * 50}ms`, opacity: s2.inView ? 1 : 0 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full shrink-0 hidden sm:block">
                        {faq.cat}
                      </span>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{faq.q}</span>
                    </div>
                    <span
                      className="text-[var(--primary)] text-xl font-light shrink-0 transition-transform duration-300"
                      style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                    >+</span>
                  </button>
                  <div style={{ maxHeight: openIndex === i ? "300px" : "0", transition: "max-height 300ms ease", overflow: "hidden" }}>
                    <p className="px-5 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-14 bg-[var(--surface)]">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
            Still Have <span className="text-[var(--primary)]">Questions?</span>
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-8">
            Can't find what you're looking for? Our team is happy to help — usually within 1 hour on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I have a question about Fashion Pehnava.`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            >
              <FaWhatsapp size={16} /> Ask on WhatsApp
            </a>
            <a
              href="mailto:fpehnava29@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            >
              <Mail size={15} /> Email Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            {[
              { label: "Return Policy", href: "/return-policy" },
              { label: "Refund Policy", href: "/refund-policy" },
              { label: "Shipping Policy", href: "/shipping-policy" },
              { label: "Contact Us", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-[var(--primary)] hover:underline">{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
