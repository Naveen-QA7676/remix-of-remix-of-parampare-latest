import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Mail } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const ReturnsExchange = () => {
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
            Return, Exchange & Refund Policy
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Transparent & Customer-Friendly Policy for Authentic Ilkal Sarees
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, we take pride in offering authentic Ilkal sarees handcrafted with heritage and precision. Each saree undergoes a detailed quality check before dispatch to ensure you receive a product that reflects true handloom craftsmanship. However, if you experience any concern with your purchase, our return, exchange, and refund policy is designed to make the process simple, fair, and transparent.
            <br /><br />
            We encourage customers to review the policy carefully before initiating a request.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Return & Exchange Eligibility</h2>
            <p className="text-muted-foreground mb-4">You may request a return or exchange if the following conditions are met:</p>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li className="flex items-center gap-3"><Check className="text-green-600 flex-shrink-0" size={18} /><span>The saree is unused, unworn, and unwashed</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-600 flex-shrink-0" size={18} /><span>All original tags and packaging are intact</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-600 flex-shrink-0" size={18} /><span>The request is initiated within 7 days of delivery</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-600 flex-shrink-0" size={18} /><span>Proof of purchase or order confirmation is available</span></li>
            </ul>
            <p className="text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/20 p-4 border-l-4 border-amber-400 rounded">
              <strong>Note:</strong> Since Ilkal sarees are delicate handloom products, items showing signs of usage, alterations, stains, perfume, or damage will not qualify for return.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Non-Returnable Items</h2>
            <p className="text-muted-foreground mb-4">For hygiene, customization, and fairness reasons, we do not accept returns on:</p>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-3"><X className="text-red-600 flex-shrink-0" size={18} /><span>Customized or tailor-made products</span></li>
              <li className="flex items-center gap-3"><X className="text-red-600 flex-shrink-0" size={18} /><span>Stitched or altered blouse pieces</span></li>
              <li className="flex items-center gap-3"><X className="text-red-600 flex-shrink-0" size={18} /><span>Washed or worn sarees</span></li>
              <li className="flex items-center gap-3"><X className="text-red-600 flex-shrink-0" size={18} /><span>Products marked as “Final Sale”</span></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">How to Initiate a Return or Exchange</h2>
            <div className="bg-card border border-border p-8 rounded-xl">
              <ol className="text-muted-foreground space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                  <span>Log in to your Parampare account</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                  <span>Go to My Orders</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                  <span>Select the order you wish to return or exchange</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">4</span>
                  <span>Submit your request</span>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground italic text-center">Once we receive your request, our team will review it and provide further instructions within 24–48 business hours.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              Refunds are processed within 7–10 business days after the product passes quality inspection.
            </p>
            <p className="font-semibold text-foreground mb-2">Refund options include:</p>
            <ul className="text-muted-foreground space-y-1 mb-4">
              <li>• Original payment method (card, UPI, net banking, wallet)</li>
              <li>• Store credit (if preferred)</li>
            </ul>
            <p className="text-xs text-muted-foreground italic">Please note that banks or payment providers may take additional time to reflect the refunded amount.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Damaged, Defective, or Incorrect Items</h2>
            <p className="text-muted-foreground mb-4">If your product arrives damaged or incorrect, please contact us within 48 hours of delivery with:</p>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>• Your order number</li>
              <li>• Clear photos of the product and packaging</li>
              <li>• A brief description of the issue</li>
            </ul>
            <p className="text-primary font-medium">After verification, we will arrange a replacement or refund at no additional cost.</p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Important Note on Handloom Products</h2>
            <p className="text-muted-foreground mb-4 italic">
              Slight variations in weave, texture, or color are natural characteristics of authentic Ilkal sarees. These are not defects but a mark of genuine handwoven craftsmanship, making every saree unique.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-foreground font-semibold">Contact Us:</p>
              <a href="mailto:support@parampare.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail size={18} /> support@parampare.com
              </a>
              <p className="text-muted-foreground text-sm">Monday – Saturday, 10 AM – 6 PM</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsExchange;
