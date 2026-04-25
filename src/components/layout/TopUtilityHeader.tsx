import { Twitter, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

import { Link } from "react-router-dom";

const TopUtilityHeader = () => {

  return (
    <div className="bg-foreground text-background">

      {/* Utility Links - Minimal & Modern */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center text-xs">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Shipping", href: "/shipping-delivery" },
            { label: "Track Order", href: "https://myspeedpost.com/", external: true },
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