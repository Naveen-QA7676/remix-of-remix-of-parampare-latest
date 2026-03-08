import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const CookiePolicy = () => {
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
            🍪 Cookie Policy
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Enhancing Your Experience on Parampare
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            At Parampare, we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand how you interact with our platform. This policy explains what cookies are, how we use them, and your choices regarding their use.
          </p>

          <div className="space-y-10 text-muted-foreground">
            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. What Are Cookies?</h2>
              <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember certain information about your preferences or past actions, making your next visit more efficient and personalized.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. How We Use Cookies</h2>
              <p className="mb-4">We use different types of cookies for various purposes:</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-sm">These are necessary for the website to function properly. They enable core features such as secure login, cart functionality, and checkout processes.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Performance & Analytics</h3>
                  <p className="text-sm">These cookies help us understand how visitors use our site by collecting anonymous data on page views, session duration, and navigation patterns. This helps us improve our website’s performance.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Preference Cookies</h3>
                  <p className="text-sm">These allow our website to remember choices you make (such as your preferred language or region) and provide more personalized features for a better experience.</p>
                </div>
              </div>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Third-Party Cookies</h2>
              <p>In addition to our own cookies, we may also use third-party cookies from trusted partners (such as Google Analytics or payment providers) to help us analyze usage, provide social media features, and ensure secure transactions. These third parties have their own privacy and cookie policies.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Managing Your Cookie Preferences</h2>
              <p className="mb-4">You have the right to decide whether to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline them if you prefer.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div><span>You can clear existing cookies from your browser.</span></li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div><span>You can set your browser to notify you before a cookie is placed.</span></li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div><span>You can disable cookies entirely in your browser settings.</span></li>
              </ul>
              <p className="mt-4 text-sm italic">Please note that if you choose to disable cookies, some parts of the Parampare website may not function correctly or may be unavailable.</p>
            </section>

            <section tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Updates to This Policy</h2>
              <p>We may update our Cookie Policy from time to time to reflect changes in our technology or for legal compliance. Any updates will be posted on this page with an updated date.</p>
            </section>

            <section className="bg-primary/5 p-8 rounded-xl border border-primary/10">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Contact Us</h2>
              <p className="mb-4">If you have any questions about our use of cookies or this policy, please contact us at:</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:support@parampare.in" className="text-primary font-medium hover:underline flex items-center gap-2">
                  <span>📩</span> support@parampare.in
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
