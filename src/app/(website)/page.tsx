import BestSellers from "@/components/home/BestSellers";
import Categories from "@/components/home/Categories";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import TrendingProducts from "@/components/home/TrendingProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstagramGallery from "@/components/home/InstagramGallery";
// import Newsletter from "@/components/home/Newsletter";

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
      {/* <Newsletter /> */}
    </>
  );
}
