import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";

const ensembles = [
  {
    title: "Traditional Elegance",
    description: "Timeless classics for pujas, festivals, and family gatherings",
    image: saree1,
    tag: "Heritage",
    href: "/products?occasion=traditional&category=Traditional",
  },
  {
    title: "Contemporary Chic",
    description: "Modern silhouettes with ethnic soul for the new-age woman",
    image: saree2,
    tag: "Trending",
    href: "/products?weave=jacquard&category=Contemporary",
  },
  {
    title: "Festive Grandeur",
    description: "Rich fabrics and vibrant hues for celebrations that shine",
    image: saree3,
    tag: "Limited",
    href: "/products?occasion=festive&category=Festive",
  },
];

const EthnicEnsemble = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 2) {
        scrollContainer.scrollTo({ left: 0, behavior: "auto" });
      } else {
        scrollContainer.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 40);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden font-body">
      <div className="container mx-auto px-4 relative border-t border-border/50 pt-16">
        <div className="text-center mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block text-gold font-body text-xs tracking-[0.25em] uppercase mb-3 text-center w-full">
            Style Collections
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground text-center">
            Ethnic Ensemble
          </h2>
        </div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto pb-8 gap-6 md:gap-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
        >
          {ensembles.map((ensemble, index) => (
            <Link
              key={ensemble.title}
              to={ensemble.href}
              className="flex-shrink-0 w-[280px] md:w-[calc(33.33%-22px)] group bg-secondary rounded-2xl overflow-hidden card-hover opacity-0 animate-fade-in-up relative"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ensemble.image} alt={ensemble.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                {ensemble.tag}
              </span>
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-foreground group-hover:text-gold transition-colors">{ensemble.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 font-body">{ensemble.description}</p>
                <div className="flex items-center gap-2 mt-4 text-gold font-medium text-sm">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EthnicEnsemble;