"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2B2B2B] rounded px-6 py-8 md:py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="shrink-0 text-center md:text-left">
          <h3 className="font-[var(--font-playfair)] text-xl font-bold text-white mb-1">Stay Updated</h3>
          <p className="text-sm text-[#BDBDBD]">Subscribe for latest offers & new arrivals</p>
        </div>
        {subscribed ? (
          <p className="text-[#C9A96E] font-medium text-sm">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-[#111111] border border-[#2B2B2B] rounded px-4 py-2.5 text-sm text-white placeholder:text-[#666] outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button type="submit"
              className="px-5 py-2.5 bg-[#C9A96E] text-black text-sm font-semibold rounded hover:opacity-90 transition-opacity shrink-0">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
