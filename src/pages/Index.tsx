import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import Bestsellers from "@/components/sections/Bestsellers";
import CuratedCollection from "@/components/sections/CuratedCollection";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <Bestsellers />
        <CuratedCollection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;