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

let globalWishlist: WishlistItem[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
let isFetchingWishlist = false;
let lastFetchTime = 0;
const observers: ((items: WishlistItem[]) => void)[] = [];

const notifyObservers = () => {
  observers.forEach((cb) => cb([...globalWishlist]));
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(globalWishlist);

  const loadLocal = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    globalWishlist = stored;
    setWishlist(stored);
    notifyObservers();
  }, []);

  const loadFromApi = useCallback(async () => {
    if (!isLoggedIn()) {
      loadLocal();
      return;
    }

    const now = Date.now();
    if (isFetchingWishlist || now - lastFetchTime < 1000) return;
    
    try {
      isFetchingWishlist = true;
      const res = await apiClient.get("/wishlist");
      
      // Support multiple API structures:
      // 1. res.data.data[0].items (per doc)
      // 2. res.data.items (per screenshot)
      // 3. res.data.data (direct array)
      const data = res.data;
      let rawItems = [];
      
      if (data.items) {
        rawItems = data.items;
      } else if (data.data) {
        if (Array.isArray(data.data)) {
          if (data.data[0]?.items) {
            rawItems = data.data[0].items;
          } else {
            rawItems = data.data;
          }
        } else if (typeof data.data === "object" && data.data.items) {
          rawItems = data.data.items;
        } else if (typeof data.data === "object") {
           // Maybe data.data IS the single wishlist object but not in an array
           rawItems = data.data.items || [];
        }
      }

      const items = rawItems.map((i: any) => toWishlistItem(i.product || i));
      globalWishlist = items;
      setWishlist(items);
      localStorage.setItem("wishlist", JSON.stringify(items));
      lastFetchTime = Date.now();
      notifyObservers();
    } catch (err) {
      console.error("Fetch wishlist failed:", err);
      loadLocal();
    } finally {
      isFetchingWishlist = false;
    }
  }, [loadLocal]);

  useEffect(() => {
    // Subscribe to changes
    observers.push(setWishlist);
    
    // Initial fetch if authenticated
    if (isLoggedIn()) {
      loadFromApi();
    } else {
      loadLocal();
    }

    const onUpdate = () => {
      loadFromApi();
    };

    window.addEventListener("wishlistUpdated", onUpdate);
    window.addEventListener("loginSuccess", onUpdate);
    
    return () => {
      const idx = observers.indexOf(setWishlist);
      if (idx !== -1) observers.splice(idx, 1);
      window.removeEventListener("wishlistUpdated", onUpdate);
      window.removeEventListener("loginSuccess", onUpdate);
    };
  }, [loadFromApi, loadLocal]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const addToWishlist = useCallback(async (product: WishlistItem) => {
    if (isLoggedIn()) {
      try {
        const res = await apiClient.post("/wishlist/add", { productId: product.id });
        if (res.data.items || res.data.data) {
          const data = res.data;
          let rawItems = data.items || (Array.isArray(data.data) ? (data.data[0]?.items || data.data) : []);
          const items = rawItems.map((i: any) => toWishlistItem(i.product || i));
          globalWishlist = items;
          setWishlist(items);
          localStorage.setItem("wishlist", JSON.stringify(items));
          notifyObservers();
        } else {
          loadFromApi();
        }
        return true;
      } catch (err) {
        console.error("Add to wishlist failed:", err);
      }
    }
    const updated = [...globalWishlist, product];
    globalWishlist = updated;
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    notifyObservers();
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [loadFromApi]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    // Local update for immediate UI response
    const updated = globalWishlist.filter((item) => item.id !== productId);
    globalWishlist = updated;
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    notifyObservers();

    if (isLoggedIn()) {
      try {
        const res = await apiClient.delete("/wishlist/remove", { data: { productId } });
        if (res.data.items || res.data.data) {
          const data = res.data;
          let rawItems = data.items || (Array.isArray(data.data) ? (data.data[0]?.items || data.data) : []);
          const items = rawItems.map((i: any) => toWishlistItem(i.product || i));
          globalWishlist = items;
          setWishlist(items);
          localStorage.setItem("wishlist", JSON.stringify(items));
          notifyObservers();
        } else {
          loadFromApi();
        }
        return true;
      } catch (err) {
        console.error("Remove from wishlist failed:", err);
      }
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
    return true;
  }, [loadFromApi]);

  const toggleWishlist = useCallback(async (product: WishlistItem) => {
    const isCurrentlyIn = isInWishlist(product.id);
    
    if (isLoggedIn()) {
      try {
        const res = await apiClient.post("/wishlist/toggle", { productId: product.id });
        if (res.data.items || res.data.data) {
          const data = res.data;
          let rawItems = data.items || (Array.isArray(data.data) ? (data.data[0]?.items || data.data) : []);
          const items = rawItems.map((i: any) => toWishlistItem(i.product || i));
          globalWishlist = items;
          setWishlist(items);
          localStorage.setItem("wishlist", JSON.stringify(items));
          notifyObservers();
        } else {
          loadFromApi();
        }
        return !isCurrentlyIn;
      } catch (err) {
        console.error("Toggle wishlist failed:", err);
      }
    }
    
    // Local fallback/Guest mode
    let updated;
    if (isCurrentlyIn) {
      updated = globalWishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...globalWishlist, product];
    }
    
    globalWishlist = updated;
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    notifyObservers();
    window.dispatchEvent(new Event("wishlistUpdated"));
    return !isCurrentlyIn;
  }, [isInWishlist, loadFromApi]);

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
