import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Return Policy",
  description: "7-day returns, free exchanges, and hassle-free process at Fashion Pehnava.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
