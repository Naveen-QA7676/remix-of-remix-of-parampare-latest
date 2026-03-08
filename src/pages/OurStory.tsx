import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Parampare
          </h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Authentic Handloom Sarees Online – Preserving India’s Textile Heritage for the World
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Parampare is a global Indian handloom saree brand dedicated to preserving and promoting authentic handwoven sarees from India’s traditional artisan communities. We specialize in genuine, region-specific Indian sarees, including GI-tagged Ilkal sarees from Karnataka, traditional silk sarees, bridal handloom collections, and festive sarees crafted using centuries-old weaving techniques.
          </p>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            At Parampare, we believe that a saree is not just attire — it is heritage woven into fabric. Our mission is to make authentic handloom sarees accessible to customers across India, the USA, the UK, Canada, Australia, and other international markets who are searching for genuine Indian sarees online.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Preserving the Legacy of Authentic Indian Handloom Sarees</h2>
            <p className="text-muted-foreground mb-4">
              India’s handloom industry represents one of the richest textile traditions in the world. Every authentic handwoven saree carries the skill, patience, and cultural identity of the artisan who created it. Unlike mass-produced fabrics, handloom sarees are crafted manually on traditional looms, ensuring uniqueness, durability, and authenticity.
            </p>
            <p className="text-muted-foreground">
              Parampare works directly with weaver communities to source original handloom sarees, ensuring that each product reflects true craftsmanship and ethical production practices. When customers search for “buy handloom sarees online” or “authentic Indian silk sarees,” we aim to be a trusted destination that guarantees quality and transparency.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">GI-Tagged Ilkal Sarees – A Cultural Treasure from Karnataka</h2>
            <p className="text-muted-foreground mb-4">
              One of our proud specialties is the authentic Ilkal saree, a Geographical Indication (GI) tagged handloom product from Karnataka, India. Known for its distinctive borders, traditional Tope Teni weaving technique, and elegant pallu designs, the Ilkal saree represents a deep-rooted cultural identity.
            </p>
            <p className="text-muted-foreground">
              For customers worldwide searching for “Buy Ilkal Sarees Online” or “GI-tagged Ilkal sarees,” Parampare ensures direct artisan sourcing, original craftsmanship, and genuine quality assurance. We do not deal in powerloom imitations — every Ilkal saree in our collection is rooted in authenticity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Sustainable and Ethical Indian Fashion</h2>
            <p className="text-muted-foreground mb-4">
              In a world increasingly driven by fast fashion, handloom represents sustainability and responsibility. Authentic handwoven sarees consume less electricity, reduce industrial waste, and support rural artisan livelihoods. Choosing a handloom saree is not just a fashion decision — it is a conscious lifestyle choice.
            </p>
            <p className="text-muted-foreground">
              Parampare promotes sustainable Indian fashion by connecting global customers with ethical, handcrafted textiles that preserve traditional weaving techniques while supporting artisan communities. Our collections combine heritage aesthetics with contemporary appeal, making them ideal for weddings, festive celebrations, and modern occasions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">A Global Destination for Traditional Sarees</h2>
            <p className="text-muted-foreground mb-4">
              As Indian culture reaches a global audience, the demand for authentic sarees in the USA, UK, and other international markets continues to grow. Parampare is committed to delivering traditional Indian sarees worldwide with secure shipping, transparent pricing, and trusted service.
            </p>
            <p className="text-muted-foreground">
              Whether you are looking for bridal silk sarees, festive handloom sarees, or authentic Ilkal sarees online, our curated collections are designed to celebrate India’s textile excellence on a global stage.
            </p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment to Authenticity and Trust</h2>
            <p className="text-muted-foreground mb-4">
              Every saree at Parampare stands for authenticity, ethical sourcing, and quality assurance. We are committed to offering genuine handloom sarees, direct artisan support, honest pricing, and a seamless online shopping experience for customers across the world.
            </p>
            <p className="text-primary font-medium">
              Parampare stands for tradition that lives on — woven with pride, worn with purpose, and delivered with trust.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;
