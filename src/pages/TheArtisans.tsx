import { Link } from "react-router-dom";
import { ArrowLeft, Check, Heart, Users, Leaf } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const TheArtisans = () => {
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
            The Artisans Behind Parampare
          </h1>
          
          <p className="text-xl text-primary font-medium mb-4">
            Preserving India’s Handloom Heritage, Empowering Weaver Communities
          </p>

          <p className="text-lg text-muted-foreground mb-8">
            Behind every authentic Parampare saree stands a skilled artisan whose craftsmanship reflects generations of tradition. Our handwoven sarees are created by master weavers from Ilkal, Karnataka — a region globally recognized for its GI-tagged Ilkal sarees and rich textile heritage. These artisans are not factory workers; they are custodians of one of India’s oldest handloom weaving traditions, passing their knowledge from parent to child over decades.
            <br /><br />
            When customers search for authentic handloom sarees online or buy Ilkal sarees online, what they truly seek is originality — and that authenticity begins with the hands that weave each thread.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">A Heritage Woven by Hand, Not Machines</h2>
            <p className="text-muted-foreground mb-4">
              Every Ilkal saree at Parampare undergoes a meticulous handloom process that cannot be replicated by powerloom machines. From preparing the silk and cotton yarns to dyeing, designing borders, and weaving the iconic Tope Teni pallu, each step is carried out manually on traditional looms.
            </p>
            <p className="text-muted-foreground mb-4">
              Completing a single authentic handwoven saree can take several days — sometimes weeks — depending on the complexity of the design. This is not mass production; this is slow, sustainable fashion rooted in precision, patience, and pride.
            </p>
            <p className="text-muted-foreground">
              For global customers in the USA, UK, and beyond who value sustainable Indian fashion and ethical craftsmanship, Parampare offers sarees that embody artistry rather than automation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Supporting Handloom Communities Through Ethical Sourcing</h2>
            <p className="text-muted-foreground mb-6">
              Parampare works directly with artisan families and handloom clusters in Karnataka to ensure fair and transparent sourcing. By eliminating unnecessary middlemen, we help preserve traditional weaving techniques while enabling sustainable livelihoods for weaver communities.
            </p>
            <p className="font-semibold text-foreground mb-4">When you choose to buy authentic Ilkal sarees from Parampare, you are directly contributing to:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Check className="text-primary flex-shrink-0" size={20} />
                <span>The preservation of India’s handloom heritage</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary flex-shrink-0" size={20} />
                <span>Fair wages and ethical working conditions</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary flex-shrink-0" size={20} />
                <span>Recognition of artisan craftsmanship</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-primary flex-shrink-0" size={20} />
                <span>The survival of traditional silk and cotton weaving techniques</span>
              </div>
            </div>
            <p className="text-primary font-medium italic">Your purchase supports real families, real skills, and real cultural continuity.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Sustainable Fashion Rooted in Responsibility</h2>
            <p className="text-muted-foreground mb-4">
              Handloom sarees represent one of the most sustainable forms of textile production in the world. Unlike industrial manufacturing, handwoven sarees consume minimal electricity and generate significantly lower environmental impact.
            </p>
            <p className="text-muted-foreground">
              By promoting genuine handloom sarees, Parampare encourages slow fashion, responsible consumption, and conscious global shopping. Customers seeking sustainable silk sarees online or ethical Indian clothing brands can trust that every Parampare saree reflects mindful production and cultural integrity.
            </p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Stories Woven Into Every Thread</h2>
            <p className="text-muted-foreground mb-4">
              No two authentic handwoven sarees are ever identical — and that uniqueness is a mark of true craftsmanship. Subtle variations in weave, texture, and color are not imperfections; they are signatures of authenticity, proving that the saree has been created by human hands rather than machines.
            </p>
            <p className="text-muted-foreground mb-4">
              Each Parampare saree carries the story of its artisan — their skill, dedication, and heritage woven into every thread.
            </p>
            <p className="text-primary font-medium">
              When you wear a Parampare saree, you are wearing more than fabric. You are wearing tradition, identity, and the living legacy of India’s handloom artistry.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TheArtisans;
