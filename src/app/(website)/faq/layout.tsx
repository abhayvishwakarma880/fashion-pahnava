import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about orders, shipping, returns, and payments at Fashion Pehnava.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
