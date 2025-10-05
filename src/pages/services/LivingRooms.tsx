import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import living1 from "@/assets/services/living-room-1.jpg";
import living2 from "@/assets/services/living-room-2.jpg";
import living3 from "@/assets/services/living-room-3.jpg";

const LivingRooms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Living Rooms</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Design a living room that becomes the heart of your home. Where comfort meets elegance, 
                and every element is crafted for memorable moments with family and friends.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <img src={living1} alt="Elegant living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living2} alt="Luxury living space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living3} alt="Scandinavian living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Design Elements</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Comfortable and stylish seating arrangements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Custom entertainment units and storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Ambient and accent lighting solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Premium fabrics and materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Personalized decor and finishing touches</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Create Your Living Space
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LivingRooms;
