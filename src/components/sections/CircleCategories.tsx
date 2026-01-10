import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

const categories = [
  { name: "Sarees", image: saree1, href: "#" },
  { name: "Dress Materials", image: saree2, href: "#" },
  { name: "Silk Sarees", image: saree3, href: "#" },
  { name: "Cotton Sarees", image: saree4, href: "#" },
  { name: "Wedding", image: saree1, href: "#" },
  { name: "Festive", image: saree2, href: "#" },
  { name: "New Arrivals", image: saree3, href: "#" },
  { name: "Bestsellers", image: saree4, href: "#" },
];

const CircleCategories = () => {
  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Explore
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-2">
            Shop by Category
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center gap-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              {/* Circle Container */}
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold transition-all duration-500 group-hover:scale-110 shadow-md group-hover:shadow-xl group-hover:shadow-gold/20">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                
                {/* Decorative Ring */}
                <div className="absolute inset-1 rounded-full border border-gold/0 group-hover:border-gold/50 transition-all duration-500 z-20" />
              </div>

              {/* Category Name */}
              <span className="font-body text-xs md:text-sm font-medium text-foreground text-center group-hover:text-gold transition-colors duration-300 max-w-[80px] md:max-w-[100px]">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CircleCategories;
