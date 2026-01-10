import { Tag, Gift, Truck } from "lucide-react";

const promos = [
  {
    icon: Tag,
    title: "Use Code: KOSKILUV10",
    subtitle: "Get 10% off on orders above ₹5999",
  },
  {
    icon: Gift,
    title: "First App Order?",
    subtitle: "Enjoy 15% off on orders above ₹7999",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On all orders above ₹2999",
  },
];

const PromoBanner = () => {
  return (
    <section className="py-8 bg-maroon/10 border-y border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <div
              key={promo.title}
              className="flex items-center gap-4 justify-center md:justify-start opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <promo.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-sm md:text-base font-bold text-foreground">
                  {promo.title}
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm font-body">
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
