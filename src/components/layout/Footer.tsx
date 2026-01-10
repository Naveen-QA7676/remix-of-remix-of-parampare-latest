import { Twitter, Instagram, Youtube, Facebook, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      {/* Newsletter */}
      <div className="border-b border-muted-foreground/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">Join Our Family</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="font-body text-muted-foreground mb-8 text-lg">
              Be the first to know about new arrivals, exclusive offers, and heritage stories from our artisans.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-muted-foreground/30 text-background placeholder:text-muted-foreground flex-1 h-12 focus:border-gold transition-colors"
              />
              <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-body h-12 px-6 group transition-all duration-300 hover:shadow-lg hover:shadow-gold/25">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-3xl font-bold text-gold mb-4">
              Parampare
            </h4>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
              Bringing authentic Ilkal sarees from Karnataka's finest weavers to your wardrobe. Every thread tells a story.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors">
                <Phone size={16} />
                +91 98765 43210
              </a>
              <a href="mailto:hello@parampare.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors">
                <Mail size={16} />
                hello@parampare.com
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                Ilkal, Karnataka, India
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
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
                  className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">
              Customer Service
            </h5>
            <ul className="space-y-3 font-body text-sm">
              {["Shipping & Delivery", "Track Your Order", "Returns & Exchange", "Size Guide", "Contact Us", "FAQs"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">
              About Parampare
            </h5>
            <ul className="space-y-3 font-body text-sm">
              {["Our Story", "The Artisans", "Sustainability", "Customer Reviews", "Blog", "Careers"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">
              Policies
            </h5>
            <ul className="space-y-3 font-body text-sm">
              {["Terms of Use", "Privacy Policy", "Refund Policy", "Cookie Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Payment Methods */}
            <div className="mt-8">
              <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-4 text-background">
                We Accept
              </h5>
              <div className="flex gap-2 flex-wrap">
                {["Visa", "MC", "UPI", "GPay"].map((method) => (
                  <span key={method} className="px-3 py-1.5 bg-muted-foreground/10 rounded text-xs text-muted-foreground">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-muted-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-muted-foreground">
              © 2026 Parampare. All rights reserved.
            </p>
            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
              Handcrafted with <span className="text-destructive animate-glow">❤️</span> in Karnataka, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
