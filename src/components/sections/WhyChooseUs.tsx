import { Shield, Truck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Genuine handwoven Ilkal sarees directly from artisans",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast & secure shipping across all pin codes",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free 7-day return policy for your peace of mind",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer care to assist you anytime",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Why Parampare
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-2">
            The Parampare Promise
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-gold transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
