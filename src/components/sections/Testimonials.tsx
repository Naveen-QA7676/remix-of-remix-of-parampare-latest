import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality of the Ilkal saree I received exceeded my expectations. The weave is authentic and the colors are vibrant. Truly a piece of art!",
  },
  {
    id: 2,
    name: "Anjali Rao",
    location: "Bangalore",
    rating: 5,
    text: "Parampare delivers authentic handloom sarees right to your doorstep. The customer service is excellent and the packaging was beautiful.",
  },
  {
    id: 3,
    name: "Meera Kulkarni",
    location: "Pune",
    rating: 5,
    text: "I've been looking for authentic Ilkal sarees for years. Finally found Parampare! The craftsmanship is impeccable and prices are reasonable.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">
            Customer Love
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2">
            What Our Customers Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-sm p-8 md:p-12 relative">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-body text-lg md:text-xl text-center text-foreground mb-6 italic">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <p className="font-display font-semibold text-foreground">
                {testimonials[currentIndex].name}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {testimonials[currentIndex].location}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;