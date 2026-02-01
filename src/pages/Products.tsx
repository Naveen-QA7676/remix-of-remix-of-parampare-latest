import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Star, Filter, X, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import ProductFilters from "@/components/products/ProductFilters";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New Arrival" | "GI Certified";
  inStock: boolean;
  // Filter attributes
  fabric?: string;
  color?: string;
  occasion?: string;
  weave?: string;
  border?: string;
  pallu?: string;
  blouse?: string;
  createdAt?: string;
}

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "New Arrivals", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Popularity", value: "popularity" },
  { label: "Customer Rating", value: "rating" },
  { label: "Discount: Low to High", value: "discount-asc" },
  { label: "Discount: High to Low", value: "discount-desc" },
];

// Sample products data with filter attributes
const allProducts: Product[] = [
  {
    id: "1",
    name: "Ilkal Saree – Teni Pallu Red",
    image: "/placeholder.svg",
    price: 2999,
    originalPrice: 4499,
    rating: 4.6,
    reviews: 128,
    badge: "Best Seller",
    inStock: true,
    fabric: "pure-cotton",
    color: "red",
    occasion: "festive",
    weave: "ilkal-traditional",
    border: "zari",
    pallu: "tope-teni",
    blouse: "running",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Traditional Kasuti Work Saree",
    image: "/placeholder.svg",
    price: 3499,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 89,
    badge: "GI Certified",
    inStock: true,
    fabric: "cotton-silk",
    color: "green",
    occasion: "wedding",
    weave: "handloom",
    border: "temple",
    pallu: "zari",
    blouse: "contrast",
    createdAt: "2025-01-10",
  },
  {
    id: "3",
    name: "Handwoven Silk Ilkal Saree",
    image: "/placeholder.svg",
    price: 4299,
    rating: 4.5,
    reviews: 56,
    badge: "New Arrival",
    inStock: true,
    fabric: "pure-silk",
    color: "maroon",
    occasion: "wedding",
    weave: "zari-border",
    border: "broad",
    pallu: "heavy",
    blouse: "attached",
    createdAt: "2025-01-20",
  },
  {
    id: "4",
    name: "Cotton Ilkal Saree – Blue",
    image: "/placeholder.svg",
    price: 1999,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 234,
    inStock: true,
    fabric: "pure-cotton",
    color: "blue",
    occasion: "daily",
    weave: "ilkal-traditional",
    border: "self",
    pallu: "simple",
    blouse: "running",
    createdAt: "2024-12-01",
  },
  {
    id: "5",
    name: "Festive Maroon Ilkal Saree",
    image: "/placeholder.svg",
    price: 3799,
    originalPrice: 5499,
    rating: 4.7,
    reviews: 167,
    badge: "Best Seller",
    inStock: true,
    fabric: "silk-blend",
    color: "maroon",
    occasion: "festive",
    weave: "tope-teni",
    border: "contrast",
    pallu: "tope-teni",
    blouse: "contrast",
    createdAt: "2025-01-05",
  },
  {
    id: "6",
    name: "Pure Silk Teni Border Saree",
    image: "/placeholder.svg",
    price: 5499,
    rating: 4.9,
    reviews: 45,
    badge: "GI Certified",
    inStock: false,
    fabric: "pure-silk",
    color: "yellow",
    occasion: "wedding",
    weave: "zari-border",
    border: "zari",
    pallu: "heavy",
    blouse: "attached",
    createdAt: "2025-01-18",
  },
  {
    id: "7",
    name: "Daily Wear Cotton Saree",
    image: "/placeholder.svg",
    price: 1499,
    originalPrice: 1999,
    rating: 4.2,
    reviews: 312,
    inStock: true,
    fabric: "pure-cotton",
    color: "white",
    occasion: "daily",
    weave: "handloom",
    border: "self",
    pallu: "simple",
    blouse: "running",
    createdAt: "2024-11-15",
  },
  {
    id: "8",
    name: "Office Wear Art Silk Saree",
    image: "/placeholder.svg",
    price: 2499,
    rating: 4.3,
    reviews: 98,
    inStock: true,
    fabric: "art-silk",
    color: "blue",
    occasion: "office",
    weave: "jacquard",
    border: "contrast",
    pallu: "simple",
    blouse: "running",
    createdAt: "2024-12-20",
  },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All Sarees";
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  // Calculate discount percentage for a product
  const getDiscount = (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  // Filter and sort products using useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply category filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === "discount") {
          // Handle discount filter specially
          const minDiscount = Math.max(...values.map((v) => parseInt(v)));
          result = result.filter((product) => getDiscount(product) >= minDiscount);
        } else {
          // Standard filter - match any of the selected values
          result = result.filter((product) => {
            const productValue = product[key as keyof Product] as string | undefined;
            return productValue && values.includes(productValue);
          });
        }
      }
    });

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "popularity":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "discount-asc":
        result.sort((a, b) => getDiscount(a) - getDiscount(b));
        break;
      case "discount-desc":
        result.sort((a, b) => getDiscount(b) - getDiscount(a));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return result;
  }, [selectedFilters, priceRange, sortBy]);

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || [];
      if (checked) {
        return { ...prev, [key]: [...current, value] };
      } else {
        return { ...prev, [key]: current.filter((v) => v !== value) };
      }
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setPriceRange([0, 20000]);
  };

  const handleApply = () => {
    setMobileFilterOpen(false);
    toast({
      title: "Filters Applied",
      description: `Showing ${filteredAndSortedProducts.length} products`,
    });
  };

  const handleWishlistClick = (product: Product) => {
    const wasAdded = toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge,
      inStock: product.inStock,
    });
    
    toast({
      title: wasAdded ? "Added to Wishlist" : "Removed from Wishlist",
      description: wasAdded 
        ? `${product.name} has been added to your wishlist.`
        : `${product.name} has been removed from your wishlist.`,
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gold text-foreground";
      case "New Arrival":
        return "bg-primary text-primary-foreground";
      case "GI Certified":
        return "bg-green-600 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  // Get active filter chips
  const activeFilters = Object.entries(selectedFilters).flatMap(([key, values]) =>
    values.map((value) => ({ key, value, label: `${key}: ${value}` }))
  );

  const hasActiveFilters = activeFilters.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 20000;

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
            {category}
          </h1>
          <p className="text-muted-foreground">
            Handwoven authentic Ilkal sarees with traditional craftsmanship
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters - Left Side */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 border border-border rounded-xl overflow-hidden">
              <ProductFilters
                selectedFilters={selectedFilters}
                priceRange={priceRange}
                onFilterChange={handleFilterChange}
                onPriceChange={setPriceRange}
                onClearAll={handleClearAll}
                onApply={handleApply}
              />
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar - Sort & Mobile Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                      {activeFilters.length > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {activeFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <ProductFilters
                      selectedFilters={selectedFilters}
                      priceRange={priceRange}
                      onFilterChange={handleFilterChange}
                      onPriceChange={setPriceRange}
                      onClearAll={handleClearAll}
                      onApply={handleApply}
                      onClose={() => setMobileFilterOpen(false)}
                      isMobile
                    />
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} of {allProducts.length} sarees
                </p>
              </div>

              {/* Sort By - Top Right */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-card">
                  <span className="text-muted-foreground mr-2">Sort by:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filter Chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter) => (
                  <Badge
                    key={`${filter.key}-${filter.value}`}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {filter.value}
                    <button
                      onClick={() => handleFilterChange(filter.key, filter.value, false)}
                      className="ml-1 p-0.5 rounded-full hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-destructive hover:text-destructive"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <PackageX className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  We couldn't find any products matching your filters. Try adjusting your filters or browse all products.
                </p>
                <Button onClick={handleClearAll} className="bg-gold hover:bg-gold/90 text-foreground">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card rounded-xl overflow-hidden border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Badge */}
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 left-3 ${getBadgeColor(product.badge)}`}
                        >
                          {product.badge}
                        </Badge>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleWishlistClick(product)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 transition-all ${
                            isInWishlist(product.id)
                              ? "fill-destructive text-destructive"
                              : "text-foreground/70"
                          }`}
                        />
                      </button>

                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium px-4 py-2 bg-black/70 rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-gold text-gold" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-green-600 font-medium">
                              {getDiscount(product)}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Products;
