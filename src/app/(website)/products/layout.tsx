import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of premium fashion for Men, Women & Kids.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
