import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryTree, getCategoryImageUrl } from "@/lib/api";
import { useState, useEffect, useRef } from "react";


const ShaadiWardrobe = () => {
  const { data: treeRes } = useQuery({
    queryKey: ["categoryTree"],
    queryFn: fetchCategoryTree,
  });

  const shaadiCategory = treeRes?.data?.find(c => c.slug === "shaadi-wardrobe");
  const apiCollections = shaadiCategory?.children || [];

  const collections = apiCollections.map((cat) => ({
    title: cat.name,
    subtitle: cat.description || "Wedding Special",
    image: getCategoryImageUrl(cat.imageUrl) || "/placeholder.svg",
    href: `/category/shaadi-wardrobe/${cat.slug}`,
  }));
  
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused || collections.length === 0) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 2) {
        scrollContainer.scrollTo({ left: 0, behavior: "auto" });
      } else {
        scrollContainer.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 40);

    return () => clearInterval(scrollInterval);
  }, [isPaused, collections.length]);

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
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Wait 2 seconds before resuming
            setTimeout(() => setIsPaused(false), 2000);
          }}
          className="flex overflow-x-auto pb-8 gap-4 md:gap-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
        >
          {collections.map((collection, index) => (
            <div key={collection.title} className="flex-shrink-0 w-[240px] md:w-[300px]">
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