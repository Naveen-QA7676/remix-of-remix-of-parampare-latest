import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import category1 from "@/assets/category-1.png";
import category2 from "@/assets/category-2.png";
import category3 from "@/assets/category-3.png";
import category4 from "@/assets/category-4.png";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryTree, getCategoryImageUrl } from "@/lib/api";

const CircleCard = ({ category, index }: { category: { name: string; image: string; href: string }; index: number }) => {
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

const staticCategories = [
  { name: "Silk Sarees", image: category2, href: "/category/shop-by-category/silk-sarees" },
  { name: "Cotton Sarees", image: category3, href: "/category/shop-by-category/cotton-sarees" },
  { name: "Bridal Collection", image: category4, href: "/category/shop-by-category/bridal-collection" },
  { name: "Festive Wear", image: category1, href: "/category/occasions/festive-wear" },
  { name: "Daily Wear", image: category2, href: "/category/shop-by-category/daily-wear" },
];

const CircleCategories = () => {
  const { data: treeRes } = useQuery({
    queryKey: ["categoryTree"],
    queryFn: fetchCategoryTree,
  });

  const shopByCategory = treeRes?.data?.find(c => c.slug === "shop-by-category");
  const apiCategories = shopByCategory?.children || [];

  const categories = apiCategories.length > 0
    ? apiCategories.map((cat, i) => ({
        name: cat.name,
        image: getCategoryImageUrl(cat.imageUrl) || [category1, category2, category3, category4][i % 4],
        href: `/category/shop-by-category/${cat.slug}`,
      }))
    : staticCategories;

  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center justify-center gap-2 text-gold font-body text-sm md:text-base tracking-[0.25em] uppercase mb-3 text-center w-full">
            <Sparkles className="h-4 w-4" />
            Our Collections
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-medium text-foreground text-center">
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
