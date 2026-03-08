import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => {
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
            🔄 Refund Policy
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Fair, Transparent & Responsible Resolution Policy
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, we are committed to delivering authentic Ilkal sarees that reflect true handloom craftsmanship from Karnataka. Each saree undergoes a careful quality inspection before dispatch. However, in the rare event that you receive a damaged, defective, or incorrect product, we are here to resolve the issue in a fair and transparent manner.
            <br /><br />
            Because our products are handcrafted and unique, our refund policy is structured to protect both our customers and the artisan community behind every saree.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Eligibility for Refunds</h2>
              <p className="text-muted-foreground mb-4">A refund or replacement may be considered if:</p>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-3"><Check className="text-green-600 mt-1 flex-shrink-0" size={18} /><span>The product received is damaged during transit</span></li>
                <li className="flex items-start gap-3"><Check className="text-green-600 mt-1 flex-shrink-0" size={18} /><span>The product has a manufacturing defect</span></li>
                <li className="flex items-start gap-3"><Check className="text-green-600 mt-1 flex-shrink-0" size={18} /><span>An incorrect item was delivered</span></li>
                <li className="flex items-start gap-3"><Check className="text-green-600 mt-1 flex-shrink-0" size={18} /><span>The issue is reported within 7 days of delivery</span></li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4 italic">To initiate a refund request, customers must provide proof of the issue along with the order details.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Non-Refundable Situations</h2>
              <p className="text-muted-foreground mb-4">Due to the nature of handwoven Ilkal sarees, certain conditions are not eligible for refunds:</p>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-3"><X className="text-red-600 mt-1 flex-shrink-0" size={18} /><span>Slight variations in color, weave, or design (natural in handloom products)</span></li>
                <li className="flex items-start gap-3"><X className="text-red-600 mt-1 flex-shrink-0" size={18} /><span>Minor differences caused by screen display settings</span></li>
                <li className="flex items-start gap-3"><X className="text-red-600 mt-1 flex-shrink-0" size={18} /><span>Damage caused after delivery</span></li>
                <li className="flex items-start gap-3"><X className="text-red-600 mt-1 flex-shrink-0" size={18} /><span>Products returned without original packaging and tags</span></li>
                <li className="flex items-start gap-3"><X className="text-red-600 mt-1 flex-shrink-0" size={18} /><span>Requests made after the specified reporting period</span></li>
              </ul>
              <p className="text-primary font-medium mt-4">Note: Variations are not defects — they are a hallmark of authentic handcrafted sarees.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">How to Initiate a Refund Request</h2>
              <div className="bg-card border border-border p-6 rounded-lg text-muted-foreground">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">1</span>
                    <span>Contact our support team with your Order ID</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">2</span>
                    <span>Share clear images of the product and packaging</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">3</span>
                    <span>Provide a brief description of the issue</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm italic">Our team will review the request within 24–48 business hours and guide you through the next steps.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Refund Methods</h2>
              <p className="text-muted-foreground mb-4">If your request is approved, the resolution may be processed via:</p>
              <ul className="text-muted-foreground space-y-1 mb-6">
                <li>• Replacement of the same product (subject to availability)</li>
                <li>• Store credit for future purchases</li>
                <li>• Refund to the original payment method</li>
              </ul>
              <p className="text-sm text-muted-foreground">Refunds, if applicable, are processed within 7–10 business days after approval. The actual credit timeline may vary depending on your bank or payment provider.</p>
            </section>

            <section className="bg-primary/5 p-8 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment to Fairness</h2>
              <p className="text-muted-foreground mb-6">
                At Parampare, we believe in ethical business practices and transparent communication. Our refund policy is designed to ensure genuine concerns are addressed promptly while maintaining respect for the craftsmanship of our handwoven Ilkal sarees.
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-foreground font-semibold">Contact Us:</p>
                <a href="mailto:support@parampare.in" className="flex items-center gap-2 text-primary hover:underline">
                  support@parampare.in
                </a>
                <p className="text-muted-foreground text-sm">Monday – Saturday, 10 AM – 6 PM</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
