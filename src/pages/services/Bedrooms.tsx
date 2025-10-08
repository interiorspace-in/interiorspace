import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bedroom1 from "@/assets/services/bedroom-1.jpg";
import bedroom2 from "@/assets/services/bedroom-2.jpg";
import bedroom3 from "@/assets/services/bedroom-3.jpg";

const Bedrooms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Bedrooms</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Create your personal sanctuary with bedroom designs that promote relaxation and rest. 
                Every detail is crafted to ensure comfort, style, and tranquility.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <img src={bedroom1} alt="Cozy bedroom design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom2} alt="Master bedroom suite" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom3} alt="Contemporary bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Bedrooms;
