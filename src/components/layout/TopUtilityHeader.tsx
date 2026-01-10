import { Twitter, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

const TopUtilityHeader = () => {
  const promoMessages = [
    "SHOP FOR ₹5999+ & GET EXTRA 10% OFF INSTANTLY!*",
    "GET EXTRA 5% OFF ON ₹2499+ ORDERS - Use Code: FLASH5",
    "EXCLUSIVE: FIRST ORDER? ENJOY 15% OFF ON ₹7999+"
  ];

  return (
    <div className="bg-primary text-primary-foreground">
      {/* Promo Banner */}
      <div className="bg-gold text-accent-foreground py-2 px-4 text-center">
        <p className="text-sm font-medium animate-pulse">
          {promoMessages[0]}
        </p>
      </div>

      {/* Utility Links */}
      <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-xs">
        {/* Left Links */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gold transition-colors">Shipping & Delivery</a>
          <a href="#" className="hover:text-gold transition-colors">Track Your Order</a>
          <a href="#" className="hover:text-gold transition-colors">Customer Reviews</a>
          <a href="#" className="hover:text-gold transition-colors">Returns</a>
          <a href="#" className="hover:text-gold transition-colors">Contact Us</a>
          <a href="#" className="hover:text-gold transition-colors">FAQs</a>
        </nav>

        {/* Social Links */}
        <div className="flex space-x-3 ml-auto">
          <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
            <Twitter size={14} />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
            <Instagram size={14} />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
            <Youtube size={14} />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
            <Facebook size={14} />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn">
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityHeader;