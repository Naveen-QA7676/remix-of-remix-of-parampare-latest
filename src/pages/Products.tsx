import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Star, Filter, X, PackageX, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, Product as APIProduct } from "@/lib/api";

// Use APIProduct directly from @/lib/api
type Product = APIProduct & {
  image: string;
  reviews: number;
  badge?: string;
};

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

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All Sarees";
  const search = searchParams.get("search") || "";
  const occasionParam = searchParams.get("occasion");
  const fabricParam = searchParams.get("fabric");
  const colorParam = searchParams.get("color");
  const weaveParam = searchParams.get("weave");
  const filterParam = searchParams.get("filter"); // e.g., 'new', 'sale'
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  // Sync URL params to local filters state
  useEffect(() => {
    const newFilters: Record<string, string[]> = {};
    if (occasionParam) newFilters.occasion = [occasionParam];
    if (fabricParam) newFilters.fabric = [fabricParam];
    if (colorParam) newFilters.color = [colorParam];
    if (weaveParam) newFilters.weave = [weaveParam];
    
    if (filterParam === 'new') setSortBy('new');
    
    setSelectedFilters(newFilters);
  }, [occasionParam, fabricParam, colorParam, weaveParam, filterParam]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params: any = {
          category,
          search,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          page: currentPage,
          limit: itemsPerPage,
          sort: sortBy === 'price-asc' ? 'price_asc' : 
                sortBy === 'price-desc' ? 'price_desc' : 
                sortBy === 'rating' ? 'rating_desc' : 
                sortBy === 'new' ? 'newest' : undefined,
        };

        // Map frontend filters to API params
        if (selectedFilters.fabric?.length) params.fabric = selectedFilters.fabric[0];
        if (selectedFilters.occasion?.length) params.occasion = selectedFilters.occasion[0];
        if (selectedFilters.color?.length) params.color = selectedFilters.color[0];
        if (selectedFilters.weave?.length) params.weave = selectedFilters.weave[0];
        if (selectedFilters.border?.length) params.border = selectedFilters.border[0];
        if (selectedFilters.pallu?.length) params.pallu = selectedFilters.pallu[0];

        const response = await fetchProducts(params);
        if (response.success && Array.isArray(response.products)) {
          // Map backend data to frontend-friendly format
          const mappedProducts = response.products.map(p => ({
            ...p,
            image: (p.images && p.images.length > 0) ? p.images[0] : "/placeholder.svg",
            reviews: p.reviewCount || 0,
            badge: (p.badges && p.badges.length > 0) ? p.badges[0] : undefined
          }));
          setProducts(mappedProducts);
          setTotalCount(response.count || mappedProducts.length);
          setTotalPages(response.totalPages || 1);
        } else {
          setProducts([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, search, sortBy, selectedFilters, priceRange, currentPage, itemsPerPage]);

  // Reset to page 1 when filters or limits change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, sortBy, selectedFilters, priceRange, itemsPerPage]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!search.trim()) return products;
    
    const searchWords = search.toLowerCase().trim().split(/\s+/);
    return products.filter(product => {
      const name = product.name.toLowerCase();
      const description = (product.description || "").toLowerCase();
      const tags = (product.badges || []).map(b => b.toLowerCase());
      
      // Match if all search words are present in either name, description or tags (AND logic)
      // or match if any word is present (OR logic)
      // The user expects "multi-word searches should return relevant results"
      // Let's implement OR mapping but prioritized by how many words match
      return searchWords.some(word => 
        name.includes(word) || 
        description.includes(word) || 
        tags.some(t => t.includes(word))
      );
    });
  }, [products, search]);

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
    toast({
      title: "Filters Applied",
      description: `Showing ${products.length} products`,
    });
    setMobileFilterOpen(false);
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
                  Showing {products.length} of {totalCount} sarees
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Items Per Page Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
                  <Select 
                    value={itemsPerPage.toString()} 
                    onValueChange={(val) => setItemsPerPage(parseInt(val))}
                  >
                    <SelectTrigger className="w-[80px] h-9 bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-[100]">
                      {[12, 24, 36, 60, 96].map((limit) => (
                        <SelectItem key={limit} value={limit.toString()}>
                          {limit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By - Top Right */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-9 bg-card">
                    <span className="text-muted-foreground mr-2">Sort by:</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-[100]">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-gold animate-spin mb-4" />
                <p className="text-muted-foreground">Loading beautiful sarees...</p>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
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
              <div className="space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination UI */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-full shadow-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-9 h-9 rounded-full ${currentPage === i + 1 ? "bg-gold text-foreground" : ""}`}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-full shadow-sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
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
