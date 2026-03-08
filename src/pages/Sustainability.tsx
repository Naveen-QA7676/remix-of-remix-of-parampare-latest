import { Link } from "react-router-dom";
import { ArrowLeft, Check, Leaf, Heart, Recycle, Package } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const Sustainability = () => {
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
            🌿 Sustainability at Parampare
          </h1>
          
          <p className="text-xl text-primary font-medium mb-4">
            Weaving Responsibility into Every Thread
          </p>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, sustainability is not a marketing statement — it is a philosophy inherited from India’s centuries-old handloom tradition. Long before sustainable fashion became a global movement, Indian artisans were practicing environmentally responsible textile production through slow, mindful craftsmanship. Our authentic handloom sarees are created using processes that respect nature, empower artisan communities, and reduce environmental impact.
            <br /><br />
            For customers searching for sustainable Indian fashion, ethical saree brands, or eco-friendly handwoven sarees, Parampare represents a conscious alternative to fast fashion.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Slow Fashion Rooted in Heritage</h2>
            <p className="text-muted-foreground mb-4">
              Handloom weaving is the essence of slow fashion. Unlike industrial textile production, which prioritizes speed and volume, handwoven sarees are crafted in small batches using traditional looms. Each saree takes days — sometimes weeks — to complete, ensuring attention to detail and minimal waste.
            </p>
            <p className="text-muted-foreground">
              This deliberate pace reduces overproduction, lowers excess inventory, and prevents the environmental damage associated with mass manufacturing. When you buy authentic handloom sarees online from Parampare, you are choosing quality over quantity and craftsmanship over convenience.
            </p>
            <p className="text-primary font-medium mt-4 italic">Slow fashion is not just about style — it is about responsibility.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Natural Fibers and Traditional Techniques</h2>
            <p className="text-muted-foreground mb-4">
              Parampare focuses on natural fibers such as cotton and silk, materials that have been used in Indian textiles for generations. These fabrics are biodegradable, breathable, and environmentally responsible compared to synthetic alternatives.
            </p>
            <p className="text-muted-foreground">
              Many of our authentic Ilkal sarees and traditional silk sarees are crafted using age-old dyeing and weaving techniques that minimize chemical processing. By preserving these traditional methods, we reduce reliance on heavy industrial treatments while maintaining the purity and cultural integrity of each saree.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Ethical Production and Artisan Empowerment</h2>
            <p className="text-muted-foreground mb-4">
              True sustainability goes beyond materials — it includes people. At Parampare, we work directly with artisan families and handloom communities in Karnataka to ensure fair wages, safe working environments, and long-term livelihood support.
            </p>
            <p className="font-semibold text-foreground mb-4">By choosing to buy Ilkal sarees online or authentic handwoven sarees from Parampare, customers contribute to:</p>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" size={18} /><span>Fair and transparent compensation for weavers</span></li>
              <li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" size={18} /><span>Preservation of traditional handloom techniques</span></li>
              <li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" size={18} /><span>Strengthening rural artisan economies</span></li>
              <li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" size={18} /><span>Encouraging the next generation to continue weaving</span></li>
            </ul>
            <p className="text-muted-foreground italic">Sustainable fashion must protect both the planet and the people behind the craft.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Lower Carbon Footprint Through Handloom Weaving</h2>
            <p className="text-muted-foreground mb-4">
              Handloom weaving consumes significantly less electricity compared to powerloom or factory-based textile production. Traditional looms rely on manual skill rather than energy-intensive machinery, resulting in a lower carbon footprint.
            </p>
            <p className="text-muted-foreground">
              By promoting genuine handloom sarees, Parampare supports a textile ecosystem that values human craftsmanship over industrial automation. This not only reduces environmental impact but also preserves cultural heritage.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Thoughtful and Responsible Packaging</h2>
            <p className="text-muted-foreground mb-4">
              Sustainability extends beyond the loom. Parampare is committed to using minimal, recyclable, and plastic-free packaging wherever possible. We continuously evaluate our packaging materials to reduce waste while ensuring product safety during global shipping.
            </p>
            <p className="text-muted-foreground">
              Our goal is to deliver authentic handloom sarees worldwide in a manner that reflects our environmental values — from artisan to wardrobe.
            </p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Honoring Tradition, Protecting the Future</h2>
            <p className="text-muted-foreground mb-4">
              Handloom weaving is inherently sustainable because it values time, skill, and respect for resources. Every authentic handwoven saree embodies patience, tradition, and mindful production. By choosing handloom over mass-produced textiles, customers actively support:
            </p>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>• Reduced industrial pollution</li>
              <li>• Lower energy consumption</li>
              <li>• Preservation of India’s textile heritage</li>
              <li>• A more conscious and ethical fashion industry</li>
            </ul>
            <p className="text-primary font-medium">
              Parampare believes that tradition and sustainability are inseparable.
            </p>
          </section>

          <section className="mt-12 text-center text-muted-foreground">
            <p className="mb-4">Sustainability is a continuous journey, not a destination. We are committed to learning, improving, and making thoughtful decisions at every stage — from sourcing yarn to delivering finished sarees to customers across the world.</p>
            <p className="font-semibold text-primary">At Parampare, every saree you wear represents respect — for nature, for artisans, and for tradition.</p>
            <p className="mt-4">Thank you for choosing consciously. Thank you for supporting authentic handloom.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
