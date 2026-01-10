import { Twitter, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

const TopUtilityHeader = () => {
  const promoMessages = [
    "✨ SHOP FOR ₹5999+ & GET EXTRA 10% OFF INSTANTLY!* ✨",
    "🎉 GET EXTRA 5% OFF ON ₹2499+ ORDERS - Use Code: FLASH5 🎉",
    "💎 EXCLUSIVE: FIRST ORDER? ENJOY 15% OFF ON ₹7999+ 💎"
  ];

  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground">
      {/* Promo Banner with Marquee Effect */}
      <div className="bg-gradient-to-r from-gold via-gold-light to-gold text-accent-foreground py-2.5 px-4 overflow-hidden relative">
        <div className="flex items-center justify-center">
          <p 
            key={currentPromo}
            className="text-sm font-semibold tracking-wide animate-fade-in"
          >
            {promoMessages[currentPromo]}
          </p>
        </div>
      </div>

      {/* Utility Links */}
      <div className="container mx-auto px-4 py-2.5 flex flex-wrap justify-between items-center text-xs">
        {/* Left Links */}
        <nav className="hidden md:flex space-x-4">
          {["Shipping & Delivery", "Track Your Order", "Customer Reviews", "Returns", "Contact Us", "FAQs"].map((link, index) => (
            <a 
              key={link} 
              href="#" 
              className="hover:text-gold transition-all duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex space-x-3 ml-auto">
          {[
            { Icon: Twitter, label: "Twitter" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Youtube, label: "YouTube" },
            { Icon: Facebook, label: "Facebook" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <a 
              key={label}
              href="#" 
              className="hover:text-gold transition-all duration-300 hover:scale-125" 
              aria-label={label}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUtilityHeader;
