"use client";

import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Clock, ChevronDown, Send, CheckCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 XXXXXXXXXX",
    sub: "Mon–Sat, 10AM–7PM",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "fpehnava29@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:fpehnava29@gmail.com",
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lucknow, Uttar Pradesh",
    sub: "India",
    href: "https://maps.google.com/?q=Lucknow,Uttar+Pradesh",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat",
    sub: "10:00 AM – 7:00 PM",
    href: null,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

const socialLinks = [
  { icon: FaWhatsapp, label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, color: "hover:bg-green-500 hover:border-green-500" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/fashion_pehnava1", color: "hover:bg-pink-500 hover:border-pink-500" },
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com/fashionpehnava", color: "hover:bg-blue-600 hover:border-blue-600" },
];

const faqs = [
  { q: "How can I place an order?", a: "You can place an order directly via WhatsApp by clicking the 'Book Now' button on any product, or by messaging us at our WhatsApp number." },
  { q: "What payment methods do you accept?", a: "We accept UPI, Google Pay, Paytm, PhonePe, bank transfer, and cash on delivery for select locations." },
  { q: "How long does delivery take?", a: "Standard delivery takes 3–7 business days depending on your location. Express delivery is available for select cities." },
  { q: "Can I return or exchange a product?", a: "Yes! We offer a 7-day return/exchange policy. The product must be unused and in original packaging. Contact us on WhatsApp to initiate a return." },
  { q: "Do you ship across India?", a: "Yes, we ship to all major cities and towns across India. Shipping charges may apply for remote areas." },
  { q: "How do I track my order?", a: "Once your order is shipped, we'll send you the tracking details via WhatsApp. You can also contact us anytime for order status." },
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

export default function ContactPage() {
  return (
    <main>
      <HeroBanner />
      <ContactInfoStrip />
      <FormAndMap />
      <SocialSection />
      <FAQSection />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a08] to-[#1a0e05]" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C79A5B 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-44 h-44 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />

      <div className="relative z-10 text-center px-4"
        style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)" }}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full mb-4">
          Get In Touch
        </span>
        <h1 className="font-[var(--font-playfair)] text-4xl md:text-6xl font-bold text-white mb-4">
          Contact <span className="text-[var(--primary)]">Us</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          We're here to help! Reach out via WhatsApp, email, or fill the form below.
        </p>
      </div>
    </section>
  );
}

// ─── Contact Info Strip ───────────────────────────────────────────────────────

function ContactInfoStrip() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, label, value, sub, href, color, bg }, i) => {
            const inner = (
              <div
                className={`flex items-start gap-4 p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/40 hover:-translate-y-0.5 transition-all duration-300 h-full ${href ? "cursor-pointer" : ""}`}
                style={{ transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{sub}</p>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form + Map ───────────────────────────────────────────────────────

function FormAndMap() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}!%0APhone: ${form.phone}%0ASubject: ${form.subject}%0A%0A${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Form */}
          <div style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-32px)" }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
              Send a Message
            </span>
            <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[var(--foreground)] mb-6">
              We'd Love to <span className="text-[var(--primary)]">Hear From You</span>
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle size={52} className="text-green-500" />
                <h3 className="text-xl font-bold text-[var(--foreground)]">Message Sent!</h3>
                <p className="text-[var(--muted-foreground)] text-sm">We've opened WhatsApp with your message. We'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 text-sm font-semibold bg-[var(--primary)] text-white rounded-full hover:opacity-90 transition-opacity">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXXXXXXX" type="tel"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Email Address</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" type="email"
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-colors appearance-none">
                    <option value="">Select a subject</option>
                    <option>Order Enquiry</option>
                    <option>Product Question</option>
                    <option>Return / Exchange</option>
                    <option>Shipping Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Write your message here..."
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                  <Send size={15} /> Send via WhatsApp
                </button>
                <p className="text-xs text-center text-[var(--muted-foreground)]">
                  This will open WhatsApp with your message pre-filled.
                </p>
              </form>
            )}
          </div>

          {/* Map */}
          <div style={{ transition: "opacity 700ms ease 150ms, transform 700ms ease 150ms", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(32px)" }}
            className="flex flex-col gap-5">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
                Find Us
              </span>
              <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[var(--foreground)] mb-2">
                Our <span className="text-[var(--primary)]">Location</span>
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">Lucknow, Uttar Pradesh, India</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[var(--border)] flex-1 min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114938.01773697!2d80.8213!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fashion Pehnava Location"
              />
            </div>

            <a href="https://maps.google.com/?q=Lucknow,Uttar+Pradesh" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold py-2.5 rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
              <MapPin size={14} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Media ─────────────────────────────────────────────────────────────

function SocialSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-14 bg-[var(--primary)]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center"
        style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
        <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-2">
          Follow Us on Social Media
        </h2>
        <p className="text-white/70 text-sm mb-8">Stay updated with our latest collections and offers</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {socialLinks.map(({ icon: Icon, label, href, color }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className={`flex items-center gap-2.5 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full transition-all duration-300 ${color} hover:text-white`}>
              <Icon size={16} /> {label}
            </a>
          ))}
        </div>
        <p className="text-white/60 text-xs mt-6">
          Instagram: <span className="text-white font-medium">@fashion_pehnava1</span>
          &nbsp;•&nbsp;
          Email: <span className="text-white font-medium">fpehnava29@gmail.com</span>
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12"
          style={{ transition: "opacity 700ms ease, transform 700ms ease", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Frequently Asked <span className="text-[var(--primary)]">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              style={{ transition: `opacity 500ms ease ${i * 80}ms, transform 500ms ease ${i * 80}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors">
                <span className="text-sm font-semibold text-[var(--foreground)]">{faq.q}</span>
                <ChevronDown size={16} className={`text-[var(--primary)] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div style={{ maxHeight: open === i ? "200px" : "0", transition: "max-height 300ms ease", overflow: "hidden" }}>
                <p className="px-5 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-sm text-[var(--muted-foreground)] mb-3">Still have questions? We're happy to help!</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I have a question about Fashion Pehnava`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
            <FaWhatsapp size={15} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
