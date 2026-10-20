
import MemberTopBar from "./components/MemberTopBar";
import MemberMainHeader from "./components/MemberMainHeader";

import CategoryNavbar from "@/components/layout/CategoryNavbar";
import HeroBanner from "@/components/layout/HeroBanner";
import ShopByCategory from "@/components/layout/ShopByCategory";
import SpecialOffers from "@/components/layout/SpecialOffers";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import NewArrivals from "@/components/layout/NewArrivals";
import Clothing from "@/components/layout/Clothing";
import JewelryAccessories from "@/components/layout/JewelryAccessories";
import ShopByBrand from "@/components/layout/ShopByBrand";
import LatestBlogPosts from "@/components/layout/LatestBlogPosts";
import Footer from "@/components/layout/Footer";

export default function MemberHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />
      <HeroBanner />

      <ShopByCategory />
      <SpecialOffers />
      <FeaturedProducts />
      <NewArrivals />
      <Clothing />
      <JewelryAccessories />
      <ShopByBrand />
      <LatestBlogPosts />

      <Footer />
    </main>
  );
}
