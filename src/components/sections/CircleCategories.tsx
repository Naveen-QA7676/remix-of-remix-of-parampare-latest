import { Link } from "react-router-dom";
import category1 from "@/assets/category-1.png";
import category2 from "@/assets/category-2.png";
import category3 from "@/assets/category-3.png";
import category4 from "@/assets/category-4.png";

const categories = [
  { name: "Ilkal Sarees", image: category1, href: "/products?category=ilkal" },
  { name: "Silk Sarees", image: category2, href: "/products?category=silk" },
  { name: "Cotton Sarees", image: category3, href: "/products?category=cotton" },
  { name: "Bridal Collection", image: category4, href: "/products?category=bridal" },
  { name: "Festive Wear", image: category1, href: "/products?category=festive" },
  { name: "Daily Wear", image: category2, href: "/products?category=daily" },
];

const CircleCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  return (
    <Link
      to={category.href}
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative flex flex-col items-center">
        {/* Circle image - Small and centered */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-border/50 group-hover:border-gold transition-all duration-500 bg-secondary shadow-sm group-hover:shadow-md">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        
        {/* Category Name - Smaller font */}
        <h3 className="mt-2 text-center text-[10px] md:text-xs font-medium text-foreground group-hover:text-gold transition-colors duration-300">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

const CircleCategories = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-gold font-body text-xs tracking-[0.25em] uppercase mb-3 text-center w-full">
            Our Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground text-center">
            Shop by Category
          </h2>
        </div>

        {/* Categories Flex Grid - Single centered row */}
        <div className="flex flex-nowrap md:flex-wrap justify-center items-start gap-4 md:gap-8 lg:gap-12 overflow-x-auto md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category, index) => (
            <div key={category.name} className="flex-shrink-0 w-20 md:w-24">
              <CircleCard category={category} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CircleCategories;
