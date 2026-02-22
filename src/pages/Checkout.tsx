import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import apiClient from "@/lib/apiClient";

interface Address {
  id: string;
  fullName: string;
  mobile: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  alternatePhone?: string;
  isDefault?: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState<Omit<Address, "id">>({
    fullName: "", mobile: "", house: "", street: "",
    city: "", state: "", pincode: "", landmark: "", alternatePhone: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) { navigate("/login", { state: { returnTo: "/checkout" } }); return; }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length === 0) { navigate("/cart"); return; }
    setCartItems(storedCart);

    const savedAddresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    setAddresses(savedAddresses);
    if (savedAddresses.length > 0) {
      const defaultAddr = savedAddresses.find((a: Address) => a.isDefault) || savedAddresses[0];
      setSelectedAddress(defaultAddr.id);
    } else {
      setShowAddForm(true);
    }
  }, [navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!/^[0-9]{10}$/.test(formData.mobile)) e.mobile = "Valid 10-digit mobile required";
    if (!formData.house.trim()) e.house = "House/Flat is required";
    if (!formData.street.trim()) e.street = "Street/Area is required";
    if (!formData.city.trim()) e.city = "City is required";
    if (!formData.state.trim()) e.state = "State is required";
    if (!/^[0-9]{6}$/.test(formData.pincode)) e.pincode = "Valid 6-digit pincode required";
    if (!formData.landmark.trim()) e.landmark = "Landmark is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveAddress = () => {
    if (!validateForm()) return;
    const newAddress: Address = { ...formData, id: Date.now().toString(), isDefault: addresses.length === 0 };
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
    setSelectedAddress(newAddress.id);
    setShowAddForm(false);
    setFormData({ fullName: "", mobile: "", house: "", street: "", city: "", state: "", pincode: "", landmark: "", alternatePhone: "" });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;
    const selectedAddr = addresses.find((a) => a.id === selectedAddress);

    setPlacingOrder(true);
    try {
      // Build items in the shape the backend expects
      const orderItems = cartItems.map((item: any) => ({
        productId: item.id,
        name: item.name,
        image: item.image || "",
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await apiClient.post("/orders", {
        items: orderItems,
        shippingAddress: selectedAddr,
        paymentMethod: "Pay on Delivery",
      });

      // Clear cart (backend already cleared DB cart)
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/order-confirmation", {
        state: { orderId: res.data.data.orderId || res.data.data._id },
      });
    } catch (err: any) {
      // Fallback: save to localStorage if API fails
      const orderDate = new Date();
      const orderId = `PAR-ORD-${orderDate.toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;
      const order = {
        id: orderId, date: orderDate.toISOString(), items: cartItems,
        address: selectedAddr, status: "Order Confirmed", paymentMethod: "Pay on Delivery",
        subtotal: cartItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0),
        deliveryCharge: 0,
        total: cartItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0),
        estimatedDelivery: new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existing]));
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/order-confirmation", { state: { orderId: order.id } });
    } finally {
      setPlacingOrder(false);
    }
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCharge = subtotal >= 999 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader /><MainHeader />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link><span className="mx-2">/</span>
          <Link to="/cart" className="hover:text-gold">Cart</Link><span className="mx-2">/</span>
          <span className="text-foreground">Checkout</span>
        </nav>
        <h1 className="text-3xl font-display font-semibold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gold" />Delivery Address
                </h2>
                {addresses.length > 0 && !showAddForm && (
                  <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)} className="gap-1">
                    <Plus className="h-4 w-4" />Add New
                  </Button>
                )}
              </div>

              {!showAddForm && addresses.length > 0 && (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label key={address.id} className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedAddress === address.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"}`}>
                      <div className="flex items-start gap-3">
                        <input type="radio" name="address" value={address.id} checked={selectedAddress === address.id} onChange={() => setSelectedAddress(address.id)} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.fullName}</span>
                            {address.isDefault && <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded">Default</span>}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{address.house}, {address.street}</p>
                          <p className="text-sm text-muted-foreground">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-sm text-muted-foreground">Landmark: {address.landmark}</p>
                          <p className="text-sm text-muted-foreground mt-1">Mobile: +91 {address.mobile}</p>
                        </div>
                        {selectedAddress === address.id && <Check className="h-5 w-5 text-gold" />}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {showAddForm && (
                <div className="space-y-4">
                  {addresses.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)} className="mb-4">
                      <ArrowLeft className="h-4 w-4 mr-2" />Back to saved addresses
                    </Button>
                  )}
                  <h3 className="font-medium mb-4">Add New Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name *</label>
                      <Input value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} placeholder="Enter full name" className={errors.fullName ? "border-destructive" : ""} />
                      {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                      <Input value={formData.mobile} onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className={errors.mobile ? "border-destructive" : ""} />
                      {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">House / Flat *</label>
                      <Input value={formData.house} onChange={(e) => handleChange("house", e.target.value)} placeholder="House/Flat number, Building name" className={errors.house ? "border-destructive" : ""} />
                      {errors.house && <p className="text-destructive text-xs mt-1">{errors.house}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Street / Area *</label>
                      <Input value={formData.street} onChange={(e) => handleChange("street", e.target.value)} placeholder="Street, Area, Colony" className={errors.street ? "border-destructive" : ""} />
                      {errors.street && <p className="text-destructive text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City *</label>
                      <Input value={formData.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="City" className={errors.city ? "border-destructive" : ""} />
                      {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State *</label>
                      <Input value={formData.state} onChange={(e) => handleChange("state", e.target.value)} placeholder="State" className={errors.state ? "border-destructive" : ""} />
                      {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode *</label>
                      <Input value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit pincode" className={errors.pincode ? "border-destructive" : ""} />
                      {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Landmark *</label>
                      <Input value={formData.landmark} onChange={(e) => handleChange("landmark", e.target.value)} placeholder="Nearby landmark" className={errors.landmark ? "border-destructive" : ""} />
                      {errors.landmark && <p className="text-destructive text-xs mt-1">{errors.landmark}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Alternate Phone (optional)</label>
                      <Input value={formData.alternatePhone} onChange={(e) => handleChange("alternatePhone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Another phone number" />
                    </div>
                  </div>
                  <Button onClick={handleSaveAddress} className="mt-4 bg-gold hover:bg-gold/90 text-foreground">Save & Continue</Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft sticky top-24">
              <h2 className="text-xl font-display font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-green-600" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-3 border-t border-border">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 mb-4">Payment: <span className="font-medium text-foreground">Pay on Delivery</span></p>
              <Button onClick={handlePlaceOrder} disabled={!selectedAddress || showAddForm || placingOrder} className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground font-medium">
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
