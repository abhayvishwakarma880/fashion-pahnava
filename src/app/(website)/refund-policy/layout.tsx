import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Transparent refunds via UPI, card, or bank transfer within 5–7 business days.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
