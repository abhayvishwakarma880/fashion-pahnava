"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "@/constants/navbar";

type Product = { name: string; price: number; image?: string };

type Form = {
  name: string;
  phone: string;
  email: string;
  pincode: string;
  district: string;
  state: string;
  address: string;
};

const EMPTY: Form = { name: "", phone: "", email: "", pincode: "", district: "", state: "", address: "" };

const inputCls = "w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors";

export default function BookingModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    if (name === "pincode") {
      // only digits
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setForm((p) => ({ ...p, pincode: digits, district: "", state: "" }));
      setPincodeError("");
      if (digits.length >= 3) fetchPincode(digits);
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  }

  async function fetchPincode(pin: string) {
    setPincodeLoading(true);
    setPincodeError("");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        setForm((p) => ({ ...p, district: po.District || "", state: po.State || "" }));
      } else {
        setForm((p) => ({ ...p, district: "", state: "" }));
        if (pin.length === 6) setPincodeError("Invalid pincode");
      }
    } catch {
      if (pin.length === 6) setPincodeError("Could not fetch pincode data");
    } finally {
      setPincodeLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🛍️ *New Order - Fashion Pehnava*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Price:* ₹${product.price.toLocaleString()}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n\n` +
      `*Delivery Address:*\n` +
      `${form.address}\n` +
      `${form.district}, ${form.state}\n` +
      `Pincode: ${form.pincode}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        transition: "background-color 250ms ease, backdrop-filter 250ms ease",
        backgroundColor: visible ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
      }}
      onClick={handleClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] rounded w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          transition: "opacity 250ms ease, transform 250ms ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
          <div>
            <h2 className="font-[var(--font-playfair)] text-lg font-bold text-[var(--foreground)]">Book Product</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5 line-clamp-1">
              {product.name} — ₹{product.price.toLocaleString()}
            </p>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded hover:bg-[var(--surface)] transition-colors">
            <X size={18} className="text-[var(--muted-foreground)]" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <CheckCircle size={52} className="text-green-500" />
              <h3 className="text-lg font-bold text-[var(--foreground)]">Order Sent!</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Your booking details have been sent via WhatsApp. We'll confirm your order shortly.
              </p>
              <button onClick={handleClose}
                className="mt-2 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded hover:opacity-90 transition-opacity">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                <Field label="Phone Number *" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXXXXXXX" type="tel" required pattern="[0-9+\s\-]{10,15}" />
              </div>

              {/* Email */}
              <Field label="Email Address" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" type="email" />

              {/* Pincode + District + State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Pincode *</label>
                  <div className="relative">
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      maxLength={6}
                      required
                      pattern="\d{6}"
                      className={`${inputCls} pr-8`}
                    />
                    {pincodeLoading && (
                      <Loader2 size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--primary)] animate-spin" />
                    )}
                  </div>
                  {pincodeError && <p className="text-[10px] text-red-500 mt-1">{pincodeError}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">District</label>
                  <input
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Auto-filled"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Auto-filled"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">Full Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House no., Street, Locality..."
                  required
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3 rounded text-sm font-semibold hover:opacity-90 transition-opacity">
                {/* <FaWhatsapp size={16} /> */}
                 Confirm Booking
              </button>
              {/* <p className="text-[10px] text-center text-[var(--muted-foreground)]">
                This will open WhatsApp with your order details pre-filled.
              </p> */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", required, pattern }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string; required?: boolean; pattern?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1.5 block">{label}</label>
      <input
        name={name} value={value} onChange={onChange} placeholder={placeholder}
        type={type} required={required} pattern={pattern}
        className={inputCls}
      />
    </div>
  );
}
