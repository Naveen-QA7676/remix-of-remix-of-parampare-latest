import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

const products = [
  {
    id: 1,
    name: "Maroon Kasuti Ilkal Saree",
    price: 4999,
    originalPrice: 6499,
    image: saree1,
    tag: "Bestseller",
    discount: "23% OFF",
  },
  {
    id: 2,
    name: "Royal Blue Silk Saree",
    price: 5499,
    originalPrice: 7999,
    image: saree2,
    tag: "New Arrival",
    discount: "31% OFF",
  },
  {
    id: 3,
    name: "Green Zari Work Saree",
    price: 6999,
    originalPrice: 8999,
    image: saree3,
    tag: null,
    discount: "22% OFF",
  },
  {
    id: 4,
    name: "Pink Festive Silk Saree",
    price: 5999,
    originalPrice: 7499,
    image: saree4,
    tag: "Sale",
    discount: "20% OFF",
  },
];

const Bestsellers = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Most Loved
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
            Bestsellers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-cream mb-4 shadow-sm hover:shadow-xl transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full aspect-[3/4] object-cover transition-all duration-700 ${
                    hoveredId === product.id ? "scale-110 blur-[1px]" : "scale-100"
                  }`}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300 ${
                  hoveredId === product.id ? "opacity-100" : "opacity-0"
                }`} />
                
                {/* Tag */}
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-body font-semibold rounded-full shadow-lg transition-transform duration-300 ${
                    hoveredId === product.id ? "translate-y-0" : ""
                  } ${
                    product.tag === "Sale" 
                      ? "bg-destructive text-destructive-foreground" 
                      : product.tag === "New Arrival"
                      ? "bg-gold text-accent-foreground animate-glow"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {product.tag}
                  </span>
                )}

                {/* Discount Badge */}
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-body font-bold bg-background/90 text-destructive rounded-full backdrop-blur-sm">
                  {product.discount}
                </span>

                {/* Action Buttons */}
                <div className={`absolute top-14 right-3 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredId === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-accent-foreground rounded-full h-9 w-9 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-accent-foreground rounded-full h-9 w-9 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Add */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                  hoveredId === product.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full font-body text-sm bg-gold hover:bg-gold-dark text-accent-foreground gap-2 shadow-xl"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="space-y-2 px-1">
                <h3 className="font-body text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="font-body text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="font-body tracking-wide border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group"
          >
            View All Bestsellers
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
