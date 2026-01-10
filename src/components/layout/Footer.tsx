import { Twitter, Instagram, Youtube, Facebook, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-muted-foreground/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Be the first to know about new arrivals, exclusive offers, and heritage stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-muted-foreground/30 text-background placeholder:text-muted-foreground flex-1"
              />
              <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-body">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-2xl font-bold text-gold mb-4">
              Parampare
            </h4>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Bringing authentic Ilkal sarees from Karnataka's finest weavers to your wardrobe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-4">
              Customer Service
            </h5>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Returns & Exchange</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-4">
              About Parampare
            </h5>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">The Artisans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-body font-bold text-sm uppercase tracking-wide mb-4">
              Policies
            </h5>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-muted-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <p className="font-body text-sm text-center text-muted-foreground">
            © 2026 Parampare. All rights reserved. Handcrafted with ❤️ in Karnataka.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;