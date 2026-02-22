import { Link } from "react-router-dom";
import { Heart, Star, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import apiClient from "@/lib/apiClient";

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Best Seller": return "bg-gold text-foreground";
    case "New Arrival": return "bg-primary text-primary-foreground";
    case "GI Certified": return "bg-green-600 text-white";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const addToCart = async (item: typeof wishlist[0]) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Logged in: add via API
      try {
        await apiClient.post("/cart/add", { productId: item.id, quantity: 1 });
        // Sync localStorage for Cart page
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existing = cart.find((c: any) => c.id === item.id);
        if (existing) existing.quantity = Math.min(existing.quantity + 1, 5);
        else cart.push({ ...item, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
      } catch {
        // Fall through to local only
      }
    } else {
      // Guest: local only
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((c: any) => c.id === item.id);
      if (existing) existing.quantity = Math.min(existing.quantity + 1, 5);
      else cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }

    toast({ title: "Added to cart!", description: `${item.name} has been added to your cart.` });
  };

  const handleRemove = async (id: string) => {
    await removeFromWishlist(id);
    toast({ title: "Removed from wishlist", description: "Item has been removed from your wishlist." });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8 min-h-[60vh]">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">My Wishlist</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length > 0 ? `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved` : "Your saved items will appear here"}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">No items were added to your wishlist</h2>
            <p className="text-muted-foreground mb-6 max-w-md">Browse our collection and click the heart icon to save items you love.</p>
            <Link to="/products"><Button className="bg-gold hover:bg-gold/90 text-foreground">Browse Sarees</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="group bg-card rounded-xl overflow-hidden border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  {item.badge && (
                    <Badge className={`absolute top-3 left-3 ${getBadgeColor(item.badge)}`}>{item.badge}</Badge>
                  )}
                  <button onClick={() => handleRemove(item.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium px-4 py-2 bg-black/70 rounded-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">{item.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-semibold text-foreground">₹{item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <Button onClick={() => addToCart(item)} disabled={!item.inStock} className="w-full gap-2 bg-gold hover:bg-gold/90 text-foreground" size="sm">
                    <ShoppingBag className="h-4 w-4" />Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Wishlist;
