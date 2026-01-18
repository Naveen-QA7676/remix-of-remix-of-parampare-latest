import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: "bs-1",
    name: "Maroon Kasuti Ilkal Saree",
    price: 4999,
    originalPrice: 6499,
    image: saree1,
    tag: "Bestseller",
    discount: "23% OFF",
    rating: 4.5,
    reviews: 89,
    inStock: true,
  },
  {
    id: "bs-2",
    name: "Royal Blue Silk Saree",
    price: 5499,
    originalPrice: 7999,
    image: saree2,
    tag: "New Arrival",
    discount: "31% OFF",
    rating: 4.7,
    reviews: 56,
    inStock: true,
  },
  {
    id: "bs-3",
    name: "Green Zari Work Saree",
    price: 6999,
    originalPrice: 8999,
    image: saree3,
    tag: null,
    discount: "22% OFF",
    rating: 4.6,
    reviews: 120,
    inStock: true,
  },
  {
    id: "bs-4",
    name: "Pink Festive Silk Saree",
    price: 5999,
    originalPrice: 7499,
    image: saree4,
    tag: "Sale",
    discount: "20% OFF",
    rating: 4.8,
    reviews: 45,
    inStock: true,
  },
];

const Bestsellers = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCart.find((item: { id: string }) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + 1, 5);
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistClick = (product: typeof products[0]) => {
    const wasAdded = toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.tag || undefined,
      inStock: product.inStock,
    });
    
    toast({
      title: wasAdded ? "Added to Wishlist" : "Removed from Wishlist",
      description: wasAdded 
        ? `${product.name} added to your wishlist.`
        : `${product.name} removed from your wishlist.`,
    });
  };

  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="inline-block text-gold font-body text-xs tracking-[0.25em] uppercase mb-3">
            Most Loved
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground">
            Bestsellers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-secondary mb-4 card-hover">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full aspect-[3/4] object-cover transition-all duration-700 ${
                      hoveredId === product.id ? "scale-105" : "scale-100"
                    }`}
                  />
                </Link>
                
                {product.tag && (
                  <span className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-body font-medium rounded-full ${
                    product.tag === "Sale" 
                      ? "bg-destructive text-white" 
                      : product.tag === "New Arrival"
                      ? "bg-foreground text-background"
                      : "bg-gold text-foreground"
                  }`}>
                    {product.tag}
                  </span>
                )}

                <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-body font-semibold bg-white text-foreground rounded-full shadow-soft">
                  {product.discount}
                </span>

                <div className={`absolute top-14 right-4 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredId === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleWishlistClick(product)}
                    className={`bg-white hover:bg-gold hover:text-white rounded-full h-10 w-10 shadow-soft transition-all duration-300 ${
                      isInWishlist(product.id) ? "text-destructive" : ""
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} strokeWidth={1.5} />
                  </Button>
                  <Link to={`/product/${product.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white hover:bg-gold hover:text-white rounded-full h-10 w-10 shadow-soft transition-all duration-300"
                    >
                      <Eye className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  </Link>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                  hoveredId === product.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}>
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(product)}
                    className="w-full font-body text-sm bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full shadow-elevated"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-body text-sm font-medium text-foreground line-clamp-2 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-lg text-foreground">
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

        <div className="text-center mt-14 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Link to="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="font-body font-medium tracking-wide rounded-full px-8 border-2 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 group"
            >
              View All Bestsellers
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
