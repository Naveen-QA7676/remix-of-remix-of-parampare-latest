import { useState, useEffect, forwardRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = forwardRef<HTMLButtonElement>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      ref={ref}
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gold hover:bg-gold/90 text-foreground shadow-elevated animate-fade-in"
      size="icon"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
});

BackToTop.displayName = "BackToTop";

export default BackToTop;
