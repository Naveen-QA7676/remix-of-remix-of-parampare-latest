import { Twitter, Instagram, Youtube, Facebook, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="border-b border-muted-foreground/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">Join Our Family</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Subscribe to Our Newsletter</h3>
            <p className="font-body text-muted-foreground mb-8 text-lg">Be the first to know about new arrivals, exclusive offers, and heritage stories.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="bg-background/10 border-muted-foreground/30 text-background placeholder:text-muted-foreground flex-1 h-12" />
              <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-body h-12 px-6">Subscribe <ArrowRight className="h-4 w-4 ml-2" /></Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-3xl font-bold text-gold mb-4">Parampare</h4>
            <p className="font-body text-sm text-muted-foreground mb-6">Bringing authentic Ilkal sarees from Karnataka's finest weavers to your wardrobe.</p>
            <div className="space-y-3 mb-6">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold"><Phone size={16} />+91 98765 43210</a>
              <a href="mailto:hello@parampare.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold"><Mail size={16} />hello@parampare.com</a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground"><MapPin size={16} className="mt-0.5" />Ilkal, Karnataka, India</div>
            </div>
            <div className="flex space-x-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com" },
                { Icon: Facebook, href: "https://www.facebook.com" },
                { Icon: Twitter, href: "https://x.com" },
                { Icon: Youtube, href: "https://www.youtube.com" },
                { Icon: Linkedin, href: "https://www.linkedin.com" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-accent-foreground transition-all"><Icon size={18} /></a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">Customer Service</h5>
            <ul className="space-y-3 font-body text-sm">
              {[
                { label: "Shipping & Delivery", to: "/shipping-delivery" },
                { label: "Track Your Order", to: "https://www.indiapost.gov.in/", external: true },
                { label: "Returns & Exchange", to: "/returns-exchange" },
                { label: "Contact Us", to: "/contact" },
                { label: "FAQs", to: "/faqs" }
              ].map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold">{link.label}</a>
                  ) : (
                    <Link to={link.to} className="text-muted-foreground hover:text-gold">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">About Parampare</h5>
            <ul className="space-y-3 font-body text-sm">
              {[
                { label: "Our Story", to: "/our-story" },
                { label: "The Artisans", to: "/artisans" },
                { label: "Sustainability", to: "/sustainability" },
                { label: "Ilkal Sarees", to: "/ilkal-sarees" }
              ].map((link) => (
                <li key={link.label}><Link to={link.to} className="text-muted-foreground hover:text-gold">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-6 text-background">Policies</h5>
            <ul className="space-y-3 font-body text-sm">
              {[
                { label: "Terms of Use", to: "/terms-of-use" },
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Refund Policy", to: "/refund-policy" },
                { label: "Cookie Policy", to: "/cookie-policy" }
              ].map((link) => (
                <li key={link.label}><Link to={link.to} className="text-muted-foreground hover:text-gold">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-muted-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-muted-foreground">© 2026 Parampare. All rights reserved.</p>
            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">Handcrafted with <span className="text-destructive">❤️</span> in Karnataka, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
