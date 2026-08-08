import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Fashion Pehnava ships across all of India. Free shipping above ₹999.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
