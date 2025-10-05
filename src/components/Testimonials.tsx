import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "ruchi123",
    text: "I recently purchased a sofa set, Dining table, and center table from Interior Space, and I must say, I am extremely pleased with the entire experience. The furniture is not only stylish and well-crafted but also very comfortable.",
    rating: 5,
  },
  {
    name: "Sagar Sawarkar",
    text: "I recently purchased a sofa and dining table, and I'm very happy with the overall experience. Hamid was extremely helpful in assisting me with the selection—his suggestions were thoughtful and made the process smooth.",
    rating: 5,
  },
  {
    name: "Siddhant Singh",
    text: "I recently got my home interiors done by Interior Space, and I couldn't be happier with the outcome! They handled everything from the TV unit, mandir, false ceiling, painting, safety door, bed, to all the other interior work with great attention to detail.",
    rating: 5,
  },
  {
    name: "Happy Customer",
    text: "Best Quality Furniture at Reasonable Price, Excellent service by Hamidbhai! The team was professional and delivered on time.",
    rating: 5,
  },
  {
    name: "Satisfied Client",
    text: "At the showroom there is plenty of options for household furniture's. Very Good And Affordable price and Best Experience overall!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-border">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-lg text-foreground mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-8">
            <a
              href="https://maps.app.goo.gl/6aekHNxkd2sgDLnq8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Star className="h-4 w-4 fill-primary" />
              View all 37 reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
