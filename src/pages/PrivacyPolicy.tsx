import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
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
            🔐 Privacy Policy
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Commitment to Protecting Your Personal Information
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website or buy authentic Ilkal sarees online. By using our platform, you consent to the practices described in this policy.
          </p>

          <div className="space-y-10 text-muted-foreground">
            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p className="mb-3">To provide a seamless shopping experience and fulfill your orders, we collect certain personal details, including:</p>
              <ul className="grid md:grid-cols-2 gap-2">
                <li className="flex items-center gap-2"><span>👤</span> Name</li>
                <li className="flex items-center gap-2"><span>📞</span> Mobile Number</li>
                <li className="flex items-center gap-2"><span>📧</span> Email Address</li>
                <li className="flex items-center gap-2"><span>📍</span> Shipping & Delivery Address</li>
                <li className="flex items-center gap-2"><span>📑</span> Order History and Communication Preferences</li>
              </ul>
              <p className="mt-4 text-sm italic">We do not store your credit card, debit card, or bank account details. All payments are processed through secure, third-party payment gateways.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">The information we collect is used solely for the following purposes:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span><strong>Order Fulfillment:</strong> To process, pack, and deliver your handwoven sarees to your doorstep.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span><strong>Communication:</strong> To send order confirmations, shipping updates, and respond to your inquiries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span><strong>Customer Support:</strong> To provide assistance regarding returns, exchanges, or any other concerns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span><strong>Service Improvement:</strong> To analyze website usage and improve our product offerings and user experience.</span>
                </li>
              </ul>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Data Sharing and Third Parties</h2>
              <p>We believe in transparency. Parampare <strong>does not sell, rent, or trade</strong> your personal information to third parties for marketing purposes. We share your data only with trusted service providers who assist us in operating our business, such as:</p>
              <ul className="mt-3 space-y-2">
                <li>• <strong>Logistics Partners:</strong> (e.g., India Post) to deliver your orders.</li>
                <li>• <strong>Payment Processors:</strong> To facilitate secure online transactions.</li>
              </ul>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Security of Your Information</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal data. This includes using encrypted protocols (SSL) and secure server environments to prevent unauthorized access, disclosure, or alteration of your information.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Cookies and Tracking Technologies</h2>
              <p>Our website uses cookies to enhance your browsing experience, remember your preferences, and understand how you interact with our platform. You can manage or disable cookies through your browser settings, though this may affect certain features of the website.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Your Rights and Choices</h2>
              <p>You have the right to access, update, or request the deletion of your personal information stored with us. If you wish to exercise any of these rights or have concerns about your data, please contact our support team.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any updates will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
            </section>

            <section className="bg-primary/5 p-8 rounded-xl border border-primary/10">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">8. Contact Us</h2>
              <p className="mb-4">If you have any questions, suggestions, or concerns regarding our Privacy Policy or data handling practices, please reach out to us:</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:support@parampare.in" className="text-primary font-medium hover:underline flex items-center gap-2">
                  <span>📩</span> support@parampare.in
                </a>
                <p className="text-sm">Parampare Saree House, Ilkal, Karnataka, India.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
