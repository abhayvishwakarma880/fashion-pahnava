import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Fashion Pehnava — our story, mission, and team.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
