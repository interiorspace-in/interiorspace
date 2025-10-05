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
    name: "Akshay Mahamuni",
    text: "I purchased sofa, dining table and center table from this showroom. Quality of the product is very good and design is also good. They also delivered the products on the committed time. Overall experience is very good.",
    rating: 5,
  },
  {
    name: "Swapnil Mulik",
    text: "Absolutely love my sofa. It exceeded my expectations in quality, design, and comfort. Hamid provided excellent guidance. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ashutosh Shitoot",
    text: "My experience was very nice. I bought a 6 seater sofa, coffee table and dining table. I am happy with their products, services and prices. I appreciate their customer service. They delivered products on time.",
    rating: 5,
  },
  {
    name: "Vikrant Gaikwad",
    text: "Recently purchased sofa, dining table and centre table! Quality and design are very good. Easy to customise as per our requirement. I got delivery on time as committed.",
    rating: 5,
  },
  {
    name: "Bhushan N. G.",
    text: "Customer service is very good. Sofas are very comfortable. Rates are reasonable and delivery is on time. Highly recommended.",
    rating: 5,
  },
  {
    name: "Abhishek Mane",
    text: "Good quality products and also reasonable price. Hamid is very cooperative and experienced. Overall experience is really good and recommended.",
    rating: 5,
  },
  {
    name: "Prasad Tate",
    text: "Bought Sofaset and dining table from Interior Space. Overall experience is good, Hamid was very cooperative and delivery was on time. Recommended.",
    rating: 5,
  },
  {
    name: "Sumedh Marathe",
    text: "Really happy with the sofa and dining table. Perfect blend of Quality, Design, and Comfort. Hamid provided excellent support. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amol Gawade",
    text: "We purchased 6 seater sofa & dinning table. Excellent customer service with ontime delivery. Quality & price both are good. Overall best experience.",
    rating: 5,
  },
  {
    name: "Yogesh Koli",
    text: "Best Quality Furniture at Reasonable Price, Excellent service by Hamidbhai!",
    rating: 5,
  },
  {
    name: "Amit Gawade",
    text: "Very Good And Affordable price and Best Experience",
    rating: 5,
  },
  {
    name: "Rajesh Koli",
    text: "At the showroom there is plenty of options for household furniture's.",
    rating: 5,
  },
  {
    name: "Sumit Gawade",
    text: "Bought furniture and good customer service and quality of the furniture was very good",
    rating: 4,
  },
  {
    name: "Akshay Shirke",
    text: "Good service and quality furniture",
    rating: 4,
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

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
