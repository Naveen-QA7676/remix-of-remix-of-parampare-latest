import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality of the Ilkal saree I received exceeded my expectations. The weave is authentic and the colors are vibrant. Truly a piece of art that I'll cherish forever!",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Anjali Rao",
    location: "Bangalore",
    rating: 5,
    text: "Parampare delivers authentic handloom sarees right to your doorstep. The customer service is excellent and the packaging was so beautiful, it felt like unwrapping a gift.",
    avatar: "AR",
  },
  {
    id: 3,
    name: "Meera Kulkarni",
    location: "Pune",
    rating: 5,
    text: "I've been looking for authentic Ilkal sarees for years. Finally found Parampare! The craftsmanship is impeccable and prices are reasonable. Highly recommended!",
    avatar: "MK",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-maroon-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Customer Love
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-2">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative shadow-2xl opacity-0 animate-scale-in" style={{ animationDelay: "0.4s" }}>
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
              <Quote className="h-6 w-6 text-accent-foreground" />
            </div>

            {/* Content */}
            <div className={`transition-all duration-500 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 fill-gold text-gold animate-scale-in" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-lg md:text-xl text-center text-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-accent-foreground font-display font-bold text-lg shadow-lg">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-primary/30 hover:border-gold hover:bg-gold hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex 
                        ? "w-8 h-2 bg-gold" 
                        : "w-2 h-2 bg-border hover:bg-gold/50"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-primary/30 hover:border-gold hover:bg-gold hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
