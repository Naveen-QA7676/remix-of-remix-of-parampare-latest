import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-40 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center min-h-[70vh] md:min-h-[90vh]">
        <div className="max-w-2xl space-y-8 py-12">
          <span className="inline-flex items-center gap-2 text-gold font-body text-sm tracking-[0.2em] uppercase opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Sparkles className="h-4 w-4 animate-glow" />
            Heritage Handwoven Collection
          </span>
          
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight opacity-0 animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
            Authentic
            <span className="block text-primary relative">
              Ilkal Sarees
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/50" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" className="animate-shimmer" />
              </svg>
            </span>
          </h2>
          
          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-lg opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            Discover the timeless elegance of Karnataka's finest handloom tradition. 
            Each saree tells a story of heritage, craftsmanship, and artistry passed down through generations.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <Button 
              variant="default" 
              size="lg" 
              className="font-body tracking-wide group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-body tracking-wide border-gold text-gold hover:bg-gold hover:text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-gold/25"
            >
              View Bestsellers
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-6 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
            {["100% Handwoven", "Direct from Artisans", "Free Shipping ₹2999+"].map((badge, index) => (
              <span 
                key={badge} 
                className="flex items-center gap-2 text-sm text-muted-foreground font-body"
              >
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-fade-in-up" style={{ animationDuration: "1.5s", animationIterationCount: "infinite" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
