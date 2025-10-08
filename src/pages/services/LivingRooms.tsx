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

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LivingRooms;
