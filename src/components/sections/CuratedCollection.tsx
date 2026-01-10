import { ArrowRight, Sparkles } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree3 from "@/assets/saree-3.jpg";

const collections = [
  {
    title: "Your Shaadi Wardrobe",
    description: "Curated wedding collections for your special day. From bridal reds to festive golds.",
    image: saree1,
    link: "#",
    badge: "Wedding Special",
  },
  {
    title: "Ethnic Ensemble",
    description: "Style-based collections for every occasion. Traditional meets contemporary.",
    image: saree3,
    link: "#",
    badge: "Trending",
  },
];

const CuratedCollection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="inline-flex items-center gap-2 text-gold font-body text-sm tracking-[0.2em] uppercase">
            <Sparkles className="h-4 w-4" />
            Specially Selected
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
            Curated For You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <a
              key={collection.title}
              href={collection.link}
              className="group flex flex-col md:flex-row bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="md:w-1/2 relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-48 md:h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-accent-foreground text-xs font-body font-semibold rounded-full shadow-lg animate-glow">
                  {collection.badge}
                </span>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-gold to-primary group-hover:h-full transition-all duration-700" />
                
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {collection.title}
                </h3>
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary group-hover:text-gold transition-all duration-300">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollection;
