import { Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, Clock, MapPin, Mail, Phone } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const ShippingDelivery = () => {
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
            Shipping & Delivery Policy
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Trusted Delivery of Authentic Ilkal Sarees Across India
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, every authentic Ilkal saree begins its journey on a traditional handloom in Karnataka and travels with care to reach your wardrobe. We understand that when you order a handcrafted saree online, you are not just buying a product — you are investing in heritage, craftsmanship, and trust. That is why our shipping and delivery process is designed to be secure, transparent, and reliable.
            <br /><br />
            We currently deliver across India through India Post, one of the country’s most trusted and extensive postal networks. Their wide coverage allows us to serve customers in metropolitan cities, small towns, and even rural postal zones, ensuring that traditional handwoven Ilkal sarees are accessible to every saree lover in India.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Order Processing & Quality Assurance</h2>
            <p className="text-muted-foreground mb-4">
              Once you place an order, our team begins a careful processing routine within 1–2 business days. Before dispatch, each saree undergoes a detailed quality check to ensure the weave, colors, borders, and signature Teni pallu meet our standards. The saree is then neatly folded to preserve the integrity of the fabric and securely packed using protective materials.
            </p>
            <p className="text-muted-foreground">
              We take special care in packaging because Ilkal sarees are delicate handloom products. Our packaging is designed to protect the fabric from moisture, damage, and mishandling during transit, while also aligning with our commitment to responsible and minimal packaging practices.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Delivery Timeline Across India</h2>
            <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg mb-6">
              <p className="text-muted-foreground mb-4">
                After dispatch, your order typically reaches you within <strong>7–8 business days</strong>.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Delivery timelines may vary slightly depending on the destination, especially for remote or rural locations. Public holidays, weather conditions, or unforeseen logistical delays may occasionally affect delivery schedules, but we always strive to ensure timely dispatch and smooth transit.
              </p>
            </div>
            <p className="text-primary font-medium text-center">From Karnataka to your doorstep, we ensure every step of the shipping journey is handled with care.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Tracking Your Order</h2>
            <p className="text-muted-foreground mb-4">
              As soon as your saree is dispatched, you will receive a confirmation email containing your tracking details. You can monitor the progress of your shipment through the official India Post tracking system.
            </p>
            <p className="text-muted-foreground">
              If you need assistance at any stage, our customer support team is available to help you with updates and clarifications.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Address Accuracy & Delivery Responsibility</h2>
            <p className="text-muted-foreground">
              To ensure successful delivery, we request customers to provide complete and accurate shipping details, including the correct PIN code and contact number. Accurate information helps prevent delays and ensures your handwoven saree reaches you without complications.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Shipping Charges & Transparency</h2>
            <p className="text-muted-foreground">
              Any applicable shipping charges will be clearly displayed at checkout before you complete your purchase. If we are running a free shipping offer, it will be automatically applied. We believe in complete transparency — no hidden costs, no surprises.
            </p>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment to Safe Delivery</h2>
            <p className="text-muted-foreground mb-6">
              At Parampare, shipping is not just about logistics — it is about honoring the journey of a handcrafted Ilkal saree. From the loom of our skilled artisans in Ilkal to your home, we ensure that each saree is delivered safely, respectfully, and efficiently.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-foreground font-semibold">Contact Us:</p>
              <a href="mailto:support@parampare.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail size={18} /> support@parampare.com
              </a>
              <p className="text-muted-foreground text-sm">Business Hours: Monday to Saturday, 10 AM – 6 PM</p>
            </div>
          </section>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Thank you for choosing Parampare. <br />
            Thank you for supporting authentic handloom Ilkal sarees made in Karnataka.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingDelivery;
