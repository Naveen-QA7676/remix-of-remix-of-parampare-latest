import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: 2,
    name: "Royal Blue Silk Saree",
    price: 5499,
    originalPrice: 7999,
    image: saree2,
    tag: "New",
  },
  {
    id: 3,
    name: "Green Zari Work Saree",
    price: 6999,
    originalPrice: 8999,
    image: saree3,
    tag: null,
  },
  {
    id: 4,
    name: "Pink Festive Silk Saree",
    price: 5999,
    originalPrice: 7499,
    image: saree4,
    tag: "Sale",
  },
];

const Bestsellers = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Most Loved
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Bestsellers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-sm bg-cream mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Tag */}
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-body font-medium rounded-sm ${
                    product.tag === "Sale" 
                      ? "bg-destructive text-destructive-foreground" 
                      : product.tag === "New"
                      ? "bg-gold text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button variant="default" size="sm" className="w-full font-body text-xs">
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-body text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-body font-bold text-foreground">
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

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="font-body tracking-wide">
            View All Bestsellers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;