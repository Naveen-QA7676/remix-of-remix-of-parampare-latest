import { Search, Heart, User, ShoppingBag, Menu, X, LogOut, MapPin, Package, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
// import logoImage from "@/assets/logo.jpg";

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [accountHovered, setAccountHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const userData = localStorage.getItem("parampare_user");
        if (userData) {
          try {
            const parsed = JSON.parse(userData);
            setUserName(parsed.fullName || "User");
          } catch {
            setUserName("User");
          }
        }
      }
      
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
    localStorage.removeItem("parampare_user");
    setIsLoggedIn(false);
    setUserName("");
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleBestsellersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "bestsellers" } });
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

  const handleAccountAction = (path: string) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: path } });
    } else {
      navigate(path);
    }
    setAccountHovered(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

          {/* Logo - Image */}
          <Link to="/" className="flex-shrink-0" onClick={handleLogoClick}>
            <img 
              src="/kannada-logo.png" 
              alt="Parampare" 
              className="h-6 md:h-8 w-auto object-contain"
            />
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

            <NavigationMenu className="relative z-50">
              <NavigationMenuList className="gap-0">
                {/* SAREES Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground h-10 px-4">
                    SAREES
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
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
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground h-10 px-4">
                    DRESS MATERIALS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
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
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground h-10 px-4">
                    OCCASIONS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
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
            
            {/* Amazon-style Account Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAccountHovered(true)}
              onMouseLeave={() => setAccountHovered(false)}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground/70 hover:text-foreground hover:bg-transparent"
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Button>
              
              {/* Hover Dropdown */}
              {accountHovered && (
                <div className="absolute right-0 top-full pt-2 z-[100]">
                  <div className="w-56 bg-card border border-border rounded-xl shadow-elevated p-3 animate-fade-in">
                    {isLoggedIn && (
                      <div className="px-3 py-2 border-b border-border/50 mb-2">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="font-medium text-foreground truncate">{userName}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleAccountAction("/account")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Your Account
                    </button>
                    <button
                      onClick={() => handleAccountAction("/orders")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      Your Orders
                    </button>
                    <button
                      onClick={() => handleAccountAction("/addresses")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      Your Addresses
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={() => handleAccountAction("/switch-account")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Switch Account
                      </button>
                    )}
                    
                    {isLoggedIn && (
                      <>
                        <div className="border-t border-border/50 my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
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
              {simpleMenuItems.map((item) => (
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
                      to="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/addresses"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-body text-base font-medium py-3 px-2 rounded-lg hover:bg-secondary text-foreground"
                    >
                      My Addresses
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
                      Sign Out
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
