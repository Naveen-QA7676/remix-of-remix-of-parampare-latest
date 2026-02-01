import { ArrowRight } from "lucide-react";
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
    href: "/products?occasion=wedding&category=Bridal",
  },
  {
    title: "Mehendi Collection",
    subtitle: "Vibrant & Playful",
    image: saree2,
    href: "/products?occasion=festive&category=Mehendi",
  },
  {
    title: "Sangeet Specials",
    subtitle: "Dance-Ready Drapes",
    image: saree3,
    href: "/products?occasion=festive&category=Sangeet",
  },
  {
    title: "Reception Elegance",
    subtitle: "Grand Finales",
    image: saree4,
    href: "/products?occasion=wedding&category=Reception",
  },
];

const ShaadiWardrobe = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header - Modern & Minimal */}
        <div className="text-center mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block text-gold font-body text-xs tracking-[0.25em] uppercase mb-3">
            Wedding Season
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground">
            Your Shaadi Wardrobe
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body text-base">
            Curated collections for every wedding celebration
          </p>
        </div>

        {/* Modern Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              to={collection.href}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover opacity-0 animate-fade-in-up"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShaadiWardrobe;