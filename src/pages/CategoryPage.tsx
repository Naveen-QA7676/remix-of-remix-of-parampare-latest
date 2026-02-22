import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { fetchProducts, fetchCategories, Category, Product as APIProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, SlidersHorizontal, PackageX, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { useToast } from "@/hooks/use-toast";

type Product = APIProduct & {
  image: string;
  reviews: number;
  badge?: string;
};

const CategoryPage = () => {
  const { slug, subslug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Category | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const { toast } = useToast();

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const catRes = await fetchCategories();
        if (catRes.success) {
          const currentCat = catRes.data.find(c => c.slug === slug);
          if (currentCat) {
            setCategory(currentCat);
            if (subslug) {
              const currentSub = catRes.data.find(c => c.slug === subslug);
              setSubcategory(currentSub || null);
            } else {
              setSubcategory(null);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load category data:", error);
      }
    };

    loadCategoryData();
  }, [slug, subslug]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params: any = {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        };
        if (category) params.category = category._id;
        if (subcategory) params.subcategory = subcategory._id;
        
        // Map frontend filters to API params
        if (selectedFilters.fabric?.length) params.fabric = selectedFilters.fabric[0];
        if (selectedFilters.occasion?.length) params.occasion = selectedFilters.occasion[0];
        if (selectedFilters.color?.length) params.color = selectedFilters.color[0];
        if (selectedFilters.weave?.length) params.weave = selectedFilters.weave[0];
        if (selectedFilters.border?.length) params.border = selectedFilters.border[0];
        if (selectedFilters.pallu?.length) params.pallu = selectedFilters.pallu[0];

        const response = await fetchProducts(params);
        if (response.success) {
          const mappedProducts = response.products.map(p => ({
            ...p,
            image: (p.images && p.images.length > 0) ? p.images[0] : "/placeholder.svg",
            reviews: p.reviewCount || 0,
            badge: (p.badges && p.badges.length > 0) ? p.badges[0] : undefined
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadProducts();
    }
  }, [category, subcategory, selectedFilters, priceRange]);

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
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: category?.name || "Products", href: category ? `/category/${category.slug}` : "/products" },
              ...(subcategory ? [{ label: subcategory.name, href: `/category/${category?.slug}/${subcategory.slug}` }] : [])
            ]} 
          />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2 text-capitalize">
                {subcategory?.name || category?.name || "All Products"}
              </h1>
              <p className="text-muted-foreground">
                Showing {products.length} exquisite pieces
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-secondary/50 p-1 rounded-lg border border-border/50">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 border border-border rounded-xl overflow-hidden">
              <ProductFilters 
                selectedFilters={selectedFilters} 
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onClearAll={handleClearAll}
                onApply={handleApply}
                onClose={() => {}} 
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-gold animate-spin mb-4" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
                  : "flex flex-col gap-6 animate-fade-in"
              }>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <PackageX className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  We couldn't find any products in this category at the moment.
                </p>
                <Button variant="outline" onClick={handleClearAll}>
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default CategoryPage;
