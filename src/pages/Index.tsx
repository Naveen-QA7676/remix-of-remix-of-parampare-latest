import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import HeroSection from "@/components/sections/HeroSection";
import PromoBanner from "@/components/sections/PromoBanner";
import CircleCategories from "@/components/sections/CircleCategories";
import ShaadiWardrobe from "@/components/sections/ShaadiWardrobe";
import Bestsellers from "@/components/sections/Bestsellers";
import EthnicEnsemble from "@/components/sections/EthnicEnsemble";
import CuratedCollection from "@/components/sections/CuratedCollection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />
      <main>
        <HeroSection />
        <PromoBanner />
        <CircleCategories />
        <ShaadiWardrobe />
        <Bestsellers />
        <EthnicEnsemble />
        <CuratedCollection />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;