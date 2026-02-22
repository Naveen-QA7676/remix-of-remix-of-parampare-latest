import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Heart, Star, Minus, Plus, ShoppingBag, Zap, Truck, RotateCcw, Shield, Check, Share2, Ruler, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import { fetchProductById, Product } from "@/lib/api";
import apiClient from "@/lib/apiClient";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetchProductById(id);
        if (response.success) {
          setProduct(response.data);
          setSelectedImage(0);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-gold animate-spin mb-4" />
        <p className="text-muted-foreground">Fetching product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-display font-semibold mb-4">Product Not Found</h2>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const dispatchCartUpdate = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = async () => {
    const image = (product.images && product.images.length > 0) ? product.images[0] : "/placeholder.svg";
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await apiClient.post("/cart/add", { productId: product.id, quantity });
      } catch { /* ignore, sync local below */ }
    }
    // Always sync localStorage so Cart page can read it
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) existing.quantity = Math.min(existing.quantity + quantity, 5);
    else cart.push({ ...product, quantity, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) navigate("/login", { state: { returnTo: "/checkout" } });
    else navigate("/checkout");
  };

  const handleWishlistClick = async () => {
    const wasAdded = await toggleWishlist({
      id: product.id,
      name: product.name,
      image: (product.images && product.images.length > 0) ? product.images[0] : "/placeholder.svg",
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviewCount || 0,
      badge: (product.badges && product.badges.length > 0) ? product.badges[0] : undefined,
      inStock: product.inStock,
    });
    
    toast({
      title: wasAdded ? "Added to Wishlist" : "Removed from Wishlist",
      description: wasAdded 
        ? `${product.name} has been added to your wishlist.`
        : `${product.name} has been removed from your wishlist.`,
    });
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gold">Sarees</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image Gallery with Flipkart-style layout */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Thumbnails - Left side on desktop */}
            <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 lg:pr-2">
              {(product.images && product.images.length > 0) ? (
                product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-gold ring-2 ring-gold/30"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="w-20 h-24 rounded-lg bg-secondary border-2 border-border" />
              )}
            </div>

            {/* Main Image with Zoom */}
            <div className="order-1 lg:order-2 flex-1 flex gap-4">
              <div
                ref={imageRef}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary cursor-zoom-in flex-1"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <img
                  src={(product.images && product.images.length > 0) ? product.images[selectedImage] : "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Zoom lens indicator */}
                {isZooming && (
                  <div
                    className="absolute w-32 h-32 border-2 border-gold/50 rounded-lg pointer-events-none bg-gold/10"
                    style={{
                      left: `calc(${zoomPosition.x}% - 64px)`,
                      top: `calc(${zoomPosition.y}% - 64px)`,
                    }}
                  />
                )}
              </div>

              {/* Zoom Panel - Side (Desktop only) */}
              {isZooming && (
                <div className="hidden lg:block w-[400px] h-[500px] rounded-2xl overflow-hidden border border-border shadow-xl bg-secondary flex-shrink-0">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("${(product.images && product.images.length > 0) ? product.images[selectedImage] : "/placeholder.svg"}")`,
                      backgroundSize: "250%",
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Badge & Share */}
            <div className="flex items-center justify-between">
              {product.badge && (
                <Badge className="bg-green-600 text-white">{product.badge}</Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: `Check out this beautiful ${product.name} from Parampare!`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied!",
                      description: "Product link copied to clipboard.",
                    });
                  }
                }}
                className="ml-auto"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <Link to="#reviews" className="text-gold hover:underline text-sm">
                View all {product.reviewCount} reviews
              </Link>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    MRP ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-medium">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} (
                  {product.originalPrice > 0 ? Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  ) : 0}
                  % off)
                </p>
              )}
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Product Attributes */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Border Type</p>
                <p className="font-medium">{product.border || "Traditional"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blouse Piece</p>
                <p className="font-medium">{product.blouse || "Included"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className={`font-medium ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? "✔ In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Size Guide */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-gold gap-2">
                  <Ruler className="h-4 w-4" />
                  View Size Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display">Saree Size Guide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="text-muted-foreground">Saree Length</p>
                      <p className="font-medium">5.5 meters</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Saree Width</p>
                      <p className="font-medium">1.1 meters</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Blouse Piece</p>
                      <p className="font-medium">0.8 meters</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Length</p>
                      <p className="font-medium">6.3 meters</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    All our Ilkal sarees come in standard sizing. The blouse piece is unstitched and can be customized to your measurements.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Delivered in {product.deliveryTimeDays} working days</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                  disabled={quantity >= 5}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">(Max: 5)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 gap-2 border-gold text-gold hover:bg-gold hover:text-foreground"
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-12 gap-2 bg-gold hover:bg-gold/90 text-foreground"
                disabled={!product.inStock}
              >
                <Zap className="h-5 w-5" />
                Buy Now
              </Button>
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              onClick={handleWishlistClick}
              className="w-full gap-2"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-destructive text-destructive" : ""
                }`}
              />
              {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-gold" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-gold" />
                <span>7-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-gold" />
                <span>GI certified product</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-5 w-5 text-gold" />
                <span>Cash on delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold">About the Saree</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold">Care Instructions</h2>
            <ul className="space-y-2">
              {Array.isArray(product.careInstructions) && product.careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-gold flex-shrink-0" />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProductDetail;
