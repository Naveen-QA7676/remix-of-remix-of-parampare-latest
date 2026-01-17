import { Search, Heart, User, ShoppingBag, Menu, X, LogOut, UserPlus, Coins, Tag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { sareesCategories, dressMaterialsCategories, occasionsCategories } from "@/data/categories";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("cartUpdated", checkAuth);
    window.addEventListener("wishlistUpdated", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("cartUpdated", checkAuth);
      window.removeEventListener("wishlistUpdated", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleBestsellersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#bestsellers");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const simpleMenuItems = [
    { label: "SALE", href: "/products?filter=sale", highlight: true },
    { label: "BESTSELLERS", href: "/#bestsellers", onClick: handleBestsellersClick },
    { label: "NEW ARRIVALS", href: "/products?filter=new" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo - Kannada */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground tracking-tight">
              ಪರಂಪರೆ
            </h1>
          </Link>

          {/* Desktop Navigation with Mega Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            {simpleMenuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={item.onClick}
                className={`px-4 py-2 font-body text-sm font-medium tracking-wide transition-colors hover-underline ${
                  item.highlight ? "text-destructive" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                {/* SAREES Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground">
                    SAREES
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6 bg-card border border-border shadow-xl rounded-lg">
                      <div className="grid grid-cols-3 gap-6">
                        {sareesCategories.map((group) => (
                          <div key={group.heading}>
                            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-3">
                              {group.heading}
                            </h4>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={item.href}
                                      className="text-sm text-muted-foreground hover:text-gold transition-colors block py-1"
                                    >
                                      {item.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* DRESS MATERIALS */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground">
                    DRESS MATERIALS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[250px] p-4 bg-card border border-border shadow-xl rounded-lg">
                      <ul className="space-y-2">
                        {dressMaterialsCategories.map((item) => (
                          <li key={item.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="text-sm text-muted-foreground hover:text-gold transition-colors block py-2 px-2 rounded hover:bg-secondary/50"
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* OCCASIONS */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground">
                    OCCASIONS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[250px] p-4 bg-card border border-border shadow-xl rounded-lg">
                      <ul className="space-y-2">
                        {occasionsCategories.map((item) => (
                          <li key={item.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="text-sm text-muted-foreground hover:text-gold transition-colors block py-2 px-2 rounded hover:bg-secondary/50"
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Action Icons & Search */}
          <div className="flex items-center gap-2">
            {/* Always Visible Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 h-9 text-sm pr-9 bg-secondary/50 border-border/50"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-foreground/70 hover:text-foreground hover:bg-transparent"
                  onClick={handleWishlistClick}
                >
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-destructive text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Wishlist</TooltipContent>
            </Tooltip>
            
            {/* User Menu */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-transparent">
                      <User className="h-5 w-5" strokeWidth={1.5} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>My Account</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/coins")}>
                      <Coins className="h-4 w-4 mr-2" />
                      Parampare Coins
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/coupons")}>
                      <Tag className="h-4 w-4 mr-2" />
                      My Coupons
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/register")}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up Now
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Cart */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-foreground/70 hover:text-foreground hover:bg-transparent"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-gold text-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Cart</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Navigation with Accordion Dropdowns */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <Input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 text-sm pr-10 bg-secondary/50"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-10 w-10"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex flex-col gap-1">
              {simpleMenuItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => {
                    if (item.onClick) item.onClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "font-body text-base font-medium py-3 px-2 rounded-lg transition-all hover:bg-secondary",
                    item.highlight ? "text-destructive" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* SAREES Accordion */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "sarees" ? null : "sarees")}
                  className="w-full flex items-center justify-between font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                >
                  SAREES
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === "sarees" && "rotate-180")} />
                </button>
                {mobileDropdown === "sarees" && (
                  <div className="pl-4 pb-2 space-y-3 animate-fade-in">
                    {sareesCategories.map((group) => (
                      <div key={group.heading}>
                        <h4 className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2 px-2">
                          {group.heading}
                        </h4>
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-2 text-sm text-foreground/80 hover:text-gold"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DRESS MATERIALS Accordion */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "dress" ? null : "dress")}
                  className="w-full flex items-center justify-between font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                >
                  DRESS MATERIALS
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === "dress" && "rotate-180")} />
                </button>
                {mobileDropdown === "dress" && (
                  <div className="pl-4 pb-2 animate-fade-in">
                    {dressMaterialsCategories.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-2 text-sm text-foreground/80 hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* OCCASIONS Accordion */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "occasions" ? null : "occasions")}
                  className="w-full flex items-center justify-between font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                >
                  OCCASIONS
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === "occasions" && "rotate-180")} />
                </button>
                {mobileDropdown === "occasions" && (
                  <div className="pl-4 pb-2 animate-fade-in">
                    {occasionsCategories.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-2 text-sm text-foreground/80 hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border/50 mt-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                    >
                      My Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-destructive"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-gold"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
