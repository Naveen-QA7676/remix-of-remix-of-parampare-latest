import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Package, Truck, CheckCircle2, Clock, PackageCheck, Home, MapPin, CreditCard, Banknote, ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import apiClient from "@/lib/apiClient";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  _id?: string;
  date: string;
  items: OrderItem[];
  address: any;
  status: string;
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  estimatedDelivery: string;
  trackingNumber?: string;
}

const OrderTrackingSteps = ({ status }: { status: string }) => {
  const steps = [
    { id: 1, label: "Order Confirmed", icon: CheckCircle2 },
    { id: 2, label: "Processing", icon: Clock },
    { id: 3, label: "Shipped", icon: Truck },
    { id: 4, label: "Out for Delivery", icon: PackageCheck },
    { id: 5, label: "Delivered", icon: Home },
  ];

  const getActiveStep = () => {
    switch (status.toLowerCase()) {
      case "order confirmed": return 1;
      case "processing": return 2;
      case "shipped": return 3;
      case "out for delivery": return 4;
      case "delivered": return 5;
      case "cancelled": return 0;
      default: return 1;
    }
  };

  const activeStep = getActiveStep();

  if (status.toLowerCase() === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
        <Package className="h-5 w-5" />
        <span className="font-medium">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="relative py-8">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 mx-8 hidden sm:block">
        <div 
          className="h-full bg-gold transition-all duration-500"
          style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id <= activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                  isActive
                    ? "bg-gold text-foreground shadow-lg shadow-gold/20"
                    : "bg-secondary text-muted-foreground"
                } ${isCurrent ? "ring-4 ring-gold/30" : ""}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-2 text-center font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiClient.get(`/orders/${orderId}`);
        const o = res.data.data || res.data;
        const mapped: Order = {
          id: o.orderId || o.id,
          _id: o._id || o.id,
          date: o.createdAt || o.date,
          items: (o.items || []).map((i: any) => ({
            id: i.product?._id || i.product || i.productId || i._id,
            name: i.product?.name || i.name || "Product",
            image: i.product?.images?.[0] || i.image || i.product?.image || "",
            price: i.product?.price || i.price || 0,
            quantity: i.quantity || 1,
          })),
          address: o.shippingAddress,
          status: o.status || "Order Confirmed",
          paymentMethod: o.paymentMethod || "Pay on Delivery",
          subtotal: o.subtotal || o.totalAmount - (o.deliveryCharge || 0),
          deliveryCharge: o.deliveryCharge || 0,
          total: o.totalAmount || o.total,
          estimatedDelivery: o.estimatedDelivery || new Date(new Date(o.createdAt || new Date()).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: o.trackingNumber,
        };
        setOrder(mapped);
      } catch (err) {
        console.error("Fetch order detail failed:", err);
        // Local storage fallback for recently placed orders if API sync is delayed
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const found = savedOrders.find((o: any) => o.id === orderId);
        if (found) setOrder(found);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Package className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
      <Button onClick={() => navigate("/orders")}>Back to My Orders</Button>
    </div>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/orders")} className="mb-2 -ml-2 text-muted-foreground hover:text-gold">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Orders
            </Button>
            <h1 className="text-3xl font-display font-semibold text-foreground">Order Details</h1>
            <p className="text-muted-foreground mt-1">Order # {order.id} • Placed on {formatDate(order.date)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
              <Printer className="h-4 w-4" /> Print Invoice
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Status Tracking */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Truck className="h-5 w-5 text-gold" /> Order Status
              </h2>
              <OrderTrackingSteps status={order.status} />
              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-secondary/30 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Tracking ID</p>
                    <p className="font-mono font-medium">{order.trackingNumber}</p>
                  </div>
                  <Button variant="link" className="text-gold" onClick={() => window.open(`https://tracker.parampara.in/${order.trackingNumber}`, '_blank')}>
                    Track on carrier site
                  </Button>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-gold" /> Items Ordered
              </h2>
              <div className="space-y-6">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      <p className="font-semibold text-foreground mt-1">₹{item.price.toLocaleString()}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-gold mt-2" onClick={() => navigate(`/product/${item.id}`)}>
                        View Item
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" /> Delivery Address
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-base">{order.address.fullName}</p>
                <p className="text-muted-foreground">{order.address.house}, {order.address.street}</p>
                <p className="text-muted-foreground">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                <p className="text-muted-foreground pt-2">Mobile: <span className="text-foreground">+91 {order.address.mobile}</span></p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gold" /> Payment Summary
              </h2>
              <div className="flex items-center gap-2 mb-6 p-3 bg-secondary/50 rounded-lg">
                {order.paymentMethod.includes("Online") ? <CreditCard className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
                <span className="text-sm font-medium">{order.paymentMethod}</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charge</span>
                  <span>{order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between text-base font-bold">
                  <span>Grand Total</span>
                  <span className="text-gold">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetail;
