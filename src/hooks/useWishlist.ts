import { useState, useEffect, useCallback } from "react";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(stored);
    };

    loadWishlist();
    
    window.addEventListener("wishlistUpdated", loadWishlist);
    window.addEventListener("storage", loadWishlist);
    
    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  const addToWishlist = useCallback((product: WishlistItem) => {
    const updated = [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [wishlist]);

  const removeFromWishlist = useCallback((productId: string) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [wishlist]);

  const toggleWishlist = useCallback((product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    wishlistCount: wishlist.length,
  };
};

export default useWishlist;
