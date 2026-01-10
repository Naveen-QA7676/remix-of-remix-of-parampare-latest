import { ArrowRight } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";

const categories = [
  {
    title: "Sarees",
    subtitle: "Traditional Elegance",
    description: "Authentic handwoven Ilkal sarees",
    image: saree1,
  },
  {
    title: "Dress Materials",
    subtitle: "Custom Creations",
    description: "Premium fabrics for your designs",
    image: saree2,
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Browse Our
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href="#"
              className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Decorative Border */}
              <div className="absolute inset-4 border border-gold/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:inset-6" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block text-gold font-body text-sm tracking-[0.15em] uppercase mb-2 opacity-80">
                  {category.subtitle}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {category.title}
                </h3>
                <p className="font-body text-primary-foreground/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                  Explore Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
