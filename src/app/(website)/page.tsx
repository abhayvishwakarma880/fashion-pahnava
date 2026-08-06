import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

const Categories = dynamic(() => import("@/components/home/Categories"));
const NewArrivals = dynamic(() => import("@/components/home/NewArrivals"));
const PromotionalBanner = dynamic(() => import("@/components/home/PromotionalBanner"));
const FeaturedCollection = dynamic(() => import("@/components/home/FeaturedCollection"));
const TrendingProducts = dynamic(() => import("@/components/home/TrendingProducts"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const BestSellers = dynamic(() => import("@/components/home/BestSellers"));
const CustomerReviews = dynamic(() => import("@/components/home/CustomerReviews"));
const InstagramGallery = dynamic(() => import("@/components/home/InstagramGallery"));

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <PromotionalBanner />
      <FeaturedCollection />
      <TrendingProducts />
      <WhyChooseUs />
      <BestSellers />
      <CustomerReviews />
      <InstagramGallery />
    </>
  );
}
