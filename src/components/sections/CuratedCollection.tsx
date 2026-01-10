import { ArrowRight } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree3 from "@/assets/saree-3.jpg";

const collections = [
  {
    title: "Your Shaadi Wardrobe",
    description: "Curated wedding collections for your special day",
    image: saree1,
    link: "#",
  },
  {
    title: "Ethnic Ensemble",
    description: "Style-based collections for every occasion",
    image: saree3,
    link: "#",
  },
];

const CuratedCollection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Specially Selected
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Curated For You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {collections.map((collection) => (
            <a
              key={collection.title}
              href={collection.link}
              className="group flex flex-col md:flex-row bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="md:w-1/2">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                  {collection.title}
                </h3>
                <p className="font-body text-muted-foreground mb-4">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary group-hover:text-gold transition-colors">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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