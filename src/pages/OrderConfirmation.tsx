import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

interface Order {
  id: string;
  date: string;
  items: any[];
  address: any;
  status: string;
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  estimatedDelivery: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let orderId = location.state?.orderId;
    const passedOrder = location.state?.order;

    if (!orderId) {
      orderId = sessionStorage.getItem("lastOrderId") || undefined;
    }

    if (passedOrder) {
      setOrder(passedOrder);
    }

    if (!orderId && !passedOrder) {
      // Check if there's a recent order in localStorage we can show
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (orders.length > 0) {
        setOrder(orders[0]);
      } else {
        navigate("/");
      }
      return;
    }

    const loadOrder = async () => {
      if (passedOrder) return; // Already have data
      // Try local storage first (fallback/guest path)
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // If not in local storage, fetch from API
        try {
          const res = await apiClient.get(`/orders/${orderId}`);
          const data = res.data.data || res.data;
          const mapped: Order = {
            id: data.orderId || data._id || data.id,
            date: data.createdAt || data.date,
            items: (data.items || []).map((i: any) => ({
              id: i.product || i.productId || i._id,
              name: i.name,
              image: i.image || "",
              price: i.price,
              quantity: i.quantity,
            })),
            address: data.shippingAddress,
            status: data.status || "Order Confirmed",
            paymentMethod: data.paymentMethod || "Pay on Delivery",
            subtotal: data.subtotal || data.totalAmount,
            deliveryCharge: data.deliveryCharge || 0,
            total: data.totalAmount || data.total,
            estimatedDelivery: data.estimatedDelivery || new Date(new Date(data.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          };
          setOrder(mapped);
        } catch (err) {
          console.error("Fetch order details failed:", err);
          // Don't navigate away yet, maybe show a generic success
        }
      }
    };

    loadOrder();

    // Auto-redirect to order details after 8 seconds
    const timer = setTimeout(() => {
      navigate(`/orders/${orderId}`);
    }, 8000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      toast({ title: "Order ID copied!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Success Banner */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <CheckCircle className="h-14 w-14 text-green-500 animate-in zoom-in duration-500 delay-300 fill-green-50" />
            </div>
            <h1 className="text-4xl font-display font-semibold text-foreground mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for choosing Parampare. We've received your order.
            </p>
          </div>

          {/* Order Info Card */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-gold">{order.id}</span>
                  <button onClick={copyOrderId} className="text-muted-foreground hover:text-gold transition-colors">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <span className="font-medium">{formatDate(order.date)}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 py-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Package className="h-4 w-4" />
                  Order Status
                </div>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {order.status}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Truck className="h-4 w-4" />
                  Estimated Delivery
                </div>
                <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
              </div>
            </div>

            <div className="py-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>

            {/* Shipping Address */}
            <div className="py-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Shipping to</p>
              <div className="text-sm">
                <p className="font-medium">{order.address.fullName}</p>
                <p className="text-muted-foreground">
                  {order.address.house}, {order.address.street}
                </p>
                <p className="text-muted-foreground">
                  {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
                <p className="text-muted-foreground">Mobile: +91 {order.address.mobile}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">Order Items</p>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={order.deliveryCharge === 0 ? "text-green-600" : ""}>
                    {order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/orders")}
              variant="outline"
              className="gap-2"
            >
              <Package className="h-4 w-4" />
              View My Orders
            </Button>
            <Button
              onClick={() => navigate("/products")}
              className="bg-gold hover:bg-gold/90 text-foreground gap-2"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
