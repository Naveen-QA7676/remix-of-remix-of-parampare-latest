import { Twitter, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopUtilityHeader = () => {
  const promoMessages = [
    "New Customers Special 🎉 – Flat ₹199 OFF on your first order",
    "Free Delivery 🚚 on orders above ₹3999",
    "Get 5% OFF on orders above ₹6999"
  ];

  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-foreground text-background">
      {/* Modern Promo Banner - Lighter Classic Orange */}
      <div className="bg-[#FF9E4D] py-2 px-4 border-b border-black/5">
        <div className="flex items-center justify-center">
          <p 
            key={currentPromo}
            className="text-sm font-semibold tracking-wide text-foreground transition-all duration-500 animate-fade-in text-center"
          >
            {promoMessages[currentPromo]}
          </p>
        </div>
      </div>

      {/* Utility Links - Minimal & Modern */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center text-xs">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Shipping", href: "/shipping-delivery" },
            { label: "Track Order", href: "https://www.indiapost.gov.in/", external: true },
            { label: "Reviews", href: "/#testimonials" },
            { label: "Returns", href: "/returns-exchange" },
            { label: "Contact", href: "/contact" },
            { label: "FAQs", href: "/faqs" }
          ].map((link) => (
            link.external ? (
              <a 
                key={link.label} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors duration-300 hover-underline"
              >
                {link.label}
              </a>
            ) : (
              <Link 
                key={link.label} 
                to={link.href}
                className="text-background/70 hover:text-background transition-colors duration-300 hover-underline"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-4 ml-auto">
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: Facebook, label: "Facebook" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Youtube, label: "YouTube" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <a 
              key={label}
              href="#" 
              className="text-background/60 hover:text-gold transition-all duration-300" 
              aria-label={label}
            >
              <Icon size={14} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUtilityHeader;