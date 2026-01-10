import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";

const categories = [
  {
    title: "Sarees",
    subtitle: "Traditional Elegance",
    image: saree1,
  },
  {
    title: "Dress Materials",
    subtitle: "Custom Creations",
    image: saree2,
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Browse Our
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Shop by Category
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category) => (
            <a
              key={category.title}
              href="#"
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-gold-light font-body text-sm tracking-[0.15em] uppercase">
                  {category.subtitle}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mt-1">
                  {category.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;