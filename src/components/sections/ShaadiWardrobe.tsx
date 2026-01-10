import { ArrowRight, Sparkles } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

const collections = [
  {
    title: "Bridal Sarees",
    subtitle: "For the Big Day",
    image: saree1,
    href: "#",
  },
  {
    title: "Mehendi Collection",
    subtitle: "Vibrant & Playful",
    image: saree2,
    href: "#",
  },
  {
    title: "Sangeet Specials",
    subtitle: "Dance-Ready Drapes",
    image: saree3,
    href: "#",
  },
  {
    title: "Reception Elegance",
    subtitle: "Grand Finales",
    image: saree4,
    href: "#",
  },
];

const ShaadiWardrobe = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-maroon/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-gold animate-glow" />
            <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
              Wedding Season
            </span>
            <Sparkles className="w-5 h-5 text-gold animate-glow" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Your Shaadi Wardrobe
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            Curated collections for every wedding celebration — from haldi to reception
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Grid of Collections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.title}
              href={collection.href}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-gold/80 font-body text-xs tracking-wider uppercase">
                  {collection.subtitle}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mt-1">
                  {collection.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-gold text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-3 border border-gold/0 rounded-lg group-hover:border-gold/40 transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShaadiWardrobe;
