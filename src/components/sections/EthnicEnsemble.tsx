import { ArrowRight } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";

const ensembles = [
  {
    title: "Traditional Elegance",
    description: "Timeless classics for pujas, festivals, and family gatherings",
    image: saree1,
    tag: "Heritage",
    href: "#",
  },
  {
    title: "Contemporary Chic",
    description: "Modern silhouettes with ethnic soul for the new-age woman",
    image: saree2,
    tag: "Trending",
    href: "#",
  },
  {
    title: "Festive Grandeur",
    description: "Rich fabrics and vibrant hues for celebrations that shine",
    image: saree3,
    tag: "Limited",
    href: "#",
  },
];

const EthnicEnsemble = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Style Collections
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
            Ethnic Ensemble
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            Discover styles that celebrate tradition while embracing modern aesthetics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ensembles.map((ensemble, index) => (
            <a
              key={ensemble.title}
              href={ensemble.href}
              className="group relative bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={ensemble.image}
                  alt={ensemble.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Tag */}
              <span className="absolute top-4 left-4 bg-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-glow">
                {ensemble.tag}
              </span>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-gold transition-colors duration-300">
                  {ensemble.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 font-body">
                  {ensemble.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-gold font-medium text-sm">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-maroon to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EthnicEnsemble;
