import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

const collections = [
  {
    title: "Bridal Sarees",
    subtitle: "For the Big Day",
    image: saree1,
    href: "/category/shaadi-wardrobe/bridal-sarees",
  },
  {
    title: "Mehendi Collection",
    subtitle: "Vibrant & Playful",
    image: saree2,
    href: "/category/shaadi-wardrobe/mehendi-collections",
  },
  {
    title: "Sangeet Specials",
    subtitle: "Dance-Ready Drapes",
    image: saree3,
    href: "/category/shaadi-wardrobe/sangeet-specials",
  },
  {
    title: "Reception Elegance",
    subtitle: "Grand Finales",
    image: saree4,
    href: "/category/shaadi-wardrobe/reception-elegance",
  },
];

const ShaadiWardrobe = () => {
  return (
    <section id="shaadi-wardrobe" className="py-12 md:py-16 bg-secondary relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header - Modern & Minimal */}
        <div className="text-center mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex justify-center items-center gap-2 text-gold font-body text-sm md:text-base tracking-[0.25em] uppercase mb-3 text-center w-full">
            <Sparkles className="h-4 w-4" />
            Wedding Season
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-medium text-foreground text-center">
            Your Shaadi Wardrobe
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body text-base">
            Curated collections for every wedding celebration
          </p>
        </div>

        {/* Modern Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
          {collections.map((collection, index) => (
            <div key={collection.title} className="flex-shrink-0 w-[240px] md:w-[300px] snap-center">
              <Link
                to={collection.href}
                className="group relative block overflow-hidden rounded-2xl aspect-[3/4] card-hover opacity-0 animate-fade-in-up shadow-lg"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-80" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="text-gold/90 font-body text-xs tracking-wider uppercase">
                    {collection.subtitle}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-white mt-1">
                    {collection.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="font-body">Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShaadiWardrobe;