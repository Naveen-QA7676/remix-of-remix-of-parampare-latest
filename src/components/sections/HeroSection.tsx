import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center min-h-[60vh] md:min-h-[80vh]">
        <div className="max-w-xl space-y-6 py-12">
          <span className="inline-block text-gold font-body text-sm tracking-[0.2em] uppercase">
            Heritage Handwoven
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Authentic
            <span className="block text-primary">Ilkal Sarees</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-md">
            Discover the timeless elegance of Karnataka's finest handloom tradition. 
            Each saree tells a story of heritage and artistry.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="default" size="lg" className="font-body tracking-wide">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" className="font-body tracking-wide border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View Bestsellers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;