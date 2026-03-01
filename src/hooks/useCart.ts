import { useState, useEffect, useCallback, useMemo } from "react";
import apiClient from "@/lib/apiClient";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
}

const isLoggedIn = () =>
  !!(localStorage.getItem("token") && localStorage.getItem("isLoggedIn") === "true");

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLocal = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(Array.isArray(stored) ? stored : []);
  }, []);

  const loadFromApi = useCallback(async () => {
    if (!isLoggedIn()) {
      loadLocal();
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await apiClient.get("/cart");
      const rawItems = res.data.data?.items || res.data.items || [];
      const items: CartItem[] = rawItems.map((i: any) => ({
        id: i.product?._id || i.product || i.productId,
        name: i.product?.name || i.name,
        image: i.product?.images?.[0] || i.image || "",
        price: i.product?.price || i.price,
        originalPrice: i.product?.originalPrice || i.originalPrice,
        quantity: i.quantity,
      }));
      setCartItems(items);
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      console.error("Fetch cart failed:", err);
      loadLocal();
    } finally {
      setLoading(false);
    }
  }, [loadLocal]);

  useEffect(() => {
    loadFromApi();

    const onUpdate = () => {
      // Small delay to ensure DB has updated before we refetch
      setTimeout(() => loadFromApi(), 100);
    };
    
    window.addEventListener("cartUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    window.addEventListener("loginSuccess", onUpdate);
    
    return () => {
      window.removeEventListener("cartUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("loginSuccess", onUpdate);
    };
  }, [loadFromApi]);

  const addToCart = useCallback(async (product: any, quantity: number = 1) => {
    const productId = product.id || product._id;
    const name = product.name;
    const image = product.image || (product.images && product.images[0]) || "";
    const price = product.price;
    const originalPrice = product.originalPrice;

    // Optimistically update local first
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.id === productId);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, 5);
    } else {
      cart.push({ id: productId, name, image, price, originalPrice, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    if (isLoggedIn()) {
      try {
        await apiClient.post("/cart/add", { productId, quantity });
        return true;
      } catch (err) {
        console.error("Add to cart API failed:", err);
      }
    }
    return true;
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    // Optimistically update local
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updated = cart.filter((i: any) => i.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));

    if (isLoggedIn()) {
      try {
        await apiClient.delete("/cart/remove", { data: { productId } });
        return true;
      } catch (err) {
        console.error("Remove from cart API failed:", err);
      }
    }
    return true;
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity < 1 || quantity > 5) return false;

    // Optimistically update local
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = cart.find((i: any) => i.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }

    if (isLoggedIn()) {
      try {
        await apiClient.put("/cart/update", { productId, quantity });
        return true;
      } catch (err) {
        console.error("Update cart API failed:", err);
      }
    }
    return true;
  }, []);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  return {
    cartItems,
    loading,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    refreshCart: loadFromApi
  };
};

export default useCart;
