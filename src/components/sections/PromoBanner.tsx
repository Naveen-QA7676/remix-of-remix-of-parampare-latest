import { Tag, Gift, Truck } from "lucide-react";

const promos = [
  {
    icon: Tag,
    title: "Use Code: FIRSTWEAVE",
    subtitle: "Flat ₹199 OFF on your first order",
  },
  {
    icon: Gift,
    title: "First App Order?",
    subtitle: "Enjoy 15% OFF on your first purchase",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On all orders above ₹3999",
  },
];

const PromoBanner = () => {
  return (
    <section className="py-6 bg-secondary/50 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-fit mx-auto md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {promos.map((promo, index) => (
            <div
              key={promo.title}
              className="flex items-center gap-4 justify-start opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <promo.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold text-foreground">
                  {promo.title}
                </h4>
                <p className="text-muted-foreground text-xs font-body">
                  {promo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;