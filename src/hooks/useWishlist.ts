import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/apiClient";

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

const isLoggedIn = () =>
  !!(localStorage.getItem("token") && localStorage.getItem("isLoggedIn") === "true");

// Helper: convert DB product → WishlistItem shape
const toWishlistItem = (raw: any): WishlistItem => ({
  id: raw._id || raw.id,
  name: raw.name,
  image: (raw.images && raw.images[0]) || "",
  price: raw.price,
  originalPrice: raw.originalPrice,
  rating: raw.rating || 4,
  reviews: raw.numReviews || 0,
  badge: raw.badges?.[0],
  inStock: raw.inStock ?? true,
});

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const loadLocal = () => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  };

  const loadFromApi = useCallback(async () => {
    try {
      const res = await apiClient.get("/wishlist");
      const items = (res.data.data || []).map((i: any) => toWishlistItem(i.product || i));
      setWishlist(items);
      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch {
      loadLocal();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      loadFromApi();
    } else {
      loadLocal();
    }

    const onUpdate = () => (isLoggedIn() ? loadFromApi() : loadLocal());
    window.addEventListener("wishlistUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [loadFromApi]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const addToWishlist = useCallback(async (product: WishlistItem) => {
    if (isLoggedIn()) {
      try {
        await apiClient.post("/wishlist/add", { productId: product.id });
        await loadFromApi();
        window.dispatchEvent(new Event("wishlistUpdated"));
        return true;
      } catch { /* fall through to local */ }
    }
    const updated = [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [wishlist, loadFromApi]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (isLoggedIn()) {
      try {
        await apiClient.delete("/wishlist/remove", { data: { productId } });
        await loadFromApi();
        window.dispatchEvent(new Event("wishlistUpdated"));
        return true;
      } catch { /* fall through to local */ }
    }
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [wishlist, loadFromApi]);

  const toggleWishlist = useCallback(async (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
      return false;
    } else {
      await addToWishlist(product);
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
