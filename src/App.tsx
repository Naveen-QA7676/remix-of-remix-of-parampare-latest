import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";
import IlkalSarees from "./pages/IlkalSarees";
import OurStory from "./pages/OurStory";
import ShippingDelivery from "./pages/ShippingDelivery";
import ReturnsExchange from "./pages/ReturnsExchange";
import FAQs from "./pages/FAQs";
import TheArtisans from "./pages/TheArtisans";
import Sustainability from "./pages/Sustainability";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import YourAccount from "./pages/YourAccount";
import YourAddresses from "./pages/YourAddresses";
import SwitchAccount from "./pages/SwitchAccount";
import ScrollToTop from "./components/ScrollToTop";
import Chatbot from "./components/Chatbot";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

// Component to handle scroll to section on navigation
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation for bestsellers
    if (location.hash === "#bestsellers" || location.state?.scrollTo === "bestsellers") {
      setTimeout(() => {
        document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/account" element={<YourAccount />} />
          <Route path="/addresses" element={<YourAddresses />} />
          <Route path="/switch-account" element={<SwitchAccount />} />
          <Route path="/ilkal-sarees" element={<IlkalSarees />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/returns-exchange" element={<ReturnsExchange />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/artisans" element={<TheArtisans />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
