import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const IlkalSarees = () => {
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
            Ilkal Sarees – A Timeless Heritage of Karnataka’s Handloom Tradition
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Ilkal sarees are a distinguished Geographical Indication (GI)-tagged handloom textile originating from Ilkal town in the Bagalkot district of Karnataka, India. Known for their unique weaving technique, bold color contrasts, and iconic pallu designs, authentic Ilkal sarees represent centuries of craftsmanship and cultural identity.
            <br /><br />
            Recognized as one of the most traditional handwoven sarees of South India, Ilkal sarees are celebrated for their durability, elegance, and heritage value. For those searching for authentic Ilkal sarees online or looking to understand the history and significance of Ilkal weaving, this timeless textile remains a symbol of Karnataka’s rich handloom legacy.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">What Makes Ilkal Sarees Unique?</h2>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-display text-xl font-semibold text-primary mb-3">The Signature Tope Teni Weaving Technique</h3>
                <p className="text-muted-foreground">
                  One of the most distinctive features of an authentic Ilkal saree is its traditional interlocking weft technique, locally known as the Tope Teni technique. In this method, the pallu (decorative end portion of the saree) is woven separately and then skillfully interlocked with the body of the saree using a complex hand-weaving process.
                  <br /><br />
                  This technique creates a seamless yet visually striking transition between the body and the pallu, setting Ilkal sarees apart from other Indian silk and cotton sarees. The Tope Teni method requires exceptional precision and skill, making every genuine Ilkal saree a testament to artisan craftsmanship.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-display text-xl font-semibold text-primary mb-3">Iconic Pallu, Borders, and Body Designs</h3>
                <p className="text-muted-foreground mb-4">Ilkal sarees are instantly recognizable due to their bold design elements and structured patterns.</p>
                <ul className="text-muted-foreground space-y-3">
                  <li><strong>Pallu:</strong> Typically features traditional geometric motifs, stripes, and temple-inspired designs that reflect Karnataka’s cultural aesthetics.</li>
                  <li><strong>Borders:</strong> Often draw inspiration from temple architecture, characterized by sharp lines and contrasting color blocks that enhance visual appeal.</li>
                  <li><strong>Body:</strong> May include checks, stripes, or subtle motifs that balance the richness of the pallu. This thoughtful design composition gives Ilkal sarees a unique blend of simplicity and grandeur.</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-display text-xl font-semibold text-primary mb-3">Vibrant and Contrasting Color Combinations</h3>
                <p className="text-muted-foreground mb-3">Authentic Ilkal sarees are known for their striking and vibrant color pairings. Traditional combinations often include:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><div className="w-3 h-3 rounded-full bg-green-600"></div><span className="text-sm">Red and Green</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-black"></div><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="text-sm">Black and Red</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#800000]"></div><div className="w-3 h-3 rounded-full bg-green-600"></div><span className="text-sm">Maroon and Green</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-900"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-sm">Navy and Mustard</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">These bold contrasts reflect regional identity and cultural symbolism deeply rooted in Karnataka’s textile traditions.</p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-display text-xl font-semibold text-primary mb-3">Blend of Cotton and Silk for Comfort and Elegance</h3>
                <p className="text-muted-foreground">
                  A traditional Ilkal saree is typically woven using a combination of cotton and silk threads. The warp (lengthwise threads) is usually cotton, providing strength, breathability, and durability. The weft (widthwise threads), especially in the pallu, often includes silk, adding a subtle sheen and luxurious finish.
                  <br /><br />
                  This cotton-silk blend makes Ilkal sarees both comfortable for extended wear and elegant for ceremonial occasions.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Rich History of Ilkal Sarees</h2>
            <p className="text-muted-foreground mb-4">
              The history of Ilkal saree weaving dates back several centuries and is believed to have flourished during the Chalukya dynasty between the 6th and 12th centuries CE. During this period, textile craftsmanship in Karnataka received patronage from royalty and local aristocracy, allowing traditional weaving techniques to evolve and refine.
            </p>
            <p className="text-muted-foreground">
              Over time, Ilkal sarees became a symbol of status, cultural pride, and regional identity. The weaving knowledge was passed down through generations of artisan families, preserving the authenticity of the craft even in the face of industrialization.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cultural and Social Significance</h2>
            <p className="text-muted-foreground mb-6">
              Ilkal sarees hold a special place in the cultural fabric of Karnataka. Traditionally worn during festivals, weddings, religious ceremonies, and important family occasions, these sarees symbolize grace, tradition, and continuity.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
               {["Festivals", "Weddings", "Religious Ceremonies", "Family Heirlooms"].map((item) => (
                <div key={item} className="bg-primary/5 border border-primary/10 p-4 rounded-lg text-center">
                  <span className="text-primary font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground italic text-center">For the global Indian diaspora, Ilkal sarees represent a deep connection to heritage and identity.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">GI Tag – Protecting Authentic Ilkal Sarees</h2>
            <p className="text-muted-foreground mb-4">Ilkal sarees have been granted Geographical Indication (GI) status, ensuring legal protection and recognition for genuine products originating from the Ilkal region of Karnataka.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <span>Protects the authenticity of original Ilkal sarees</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <span>Prevents misuse of the Ilkal name for powerloom imitations</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <span>Promotes fair recognition and economic support for local weavers</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <span>Preserves traditional weaving techniques</span>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-card p-6 rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">How to Identify Authentic Ilkal Sarees</h2>
            <p className="text-muted-foreground mb-4">To ensure you are buying genuine Ilkal sarees, look for the following characteristics:</p>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Distinct interlocking pallu using the Tope Teni technique</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Bold contrasting borders</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Traditional geometric pallu patterns</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Cotton-silk blend fabric</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Slight irregularities that indicate hand weaving</li>
            </ul>
            <p className="mt-4 text-sm text-primary font-medium">Machine-made replicas often lack the structural detailing and depth found in handwoven originals.</p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">A Living Legacy of Karnataka’s Textile Heritage</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ilkal sarees are more than garments — they are a living representation of Karnataka’s cultural history, artisan dedication, and sustainable handloom tradition. Each saree reflects patience, skill, and heritage woven into every thread.
            </p>
            <p className="text-primary font-medium">
              Whether worn for weddings, festivals, or cultural celebrations, they embody tradition while maintaining relevance in contemporary fashion.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IlkalSarees;
