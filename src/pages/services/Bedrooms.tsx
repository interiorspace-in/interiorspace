import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bedroom1 from "@/assets/services/bedroom-1.jpg";
import bedroom2 from "@/assets/services/bedroom-2.jpg";
import bedroom3 from "@/assets/services/bedroom-3.jpg";
import bedroom4 from "@/assets/services/bedroom-4.jpg";
import bedroom5 from "@/assets/services/bedroom-5.jpg";
import bedroom6 from "@/assets/services/bedroom-6.jpg";
import bedroom7 from "@/assets/services/bedroom-7.jpg";
import bedroom8 from "@/assets/services/bedroom-8.jpg";
import bedroom9 from "@/assets/services/bedroom-9.jpg";
import bedroom10 from "@/assets/services/bedroom-10.jpg";
import bedroom11 from "@/assets/services/bedroom-11.jpg";
import bedroom12 from "@/assets/services/bedroom-12.jpg";
import bedroom13 from "@/assets/services/bedroom-13.jpg";
import bedroom14 from "@/assets/services/bedroom-14.jpg";
import bedroom15 from "@/assets/services/bedroom-15.jpg";
import bedroom16 from "@/assets/services/bedroom-16.jpg";
import bedroom17 from "@/assets/services/bedroom-17.jpg";
import bedroom18 from "@/assets/services/bedroom-18.jpg";
import bedroom19 from "@/assets/services/bedroom-19.jpg";
import bedroom20 from "@/assets/services/bedroom-20.jpg";

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

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <img src={bedroom1} alt="Cozy bedroom design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom2} alt="Master bedroom suite" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom3} alt="Contemporary bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom4} alt="Warm cozy bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom5} alt="Luxury master suite" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom6} alt="Modern platform bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom7} alt="Romantic canopy bed" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom8} alt="Scandinavian bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom9} alt="Luxury tufted headboard" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom10} alt="Teen bedroom with study" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom11} alt="Guest bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom12} alt="Coastal beach bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom13} alt="Rustic farmhouse bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom14} alt="Urban loft bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom15} alt="Zen minimalist bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom16} alt="Art deco bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom17} alt="Traditional classic bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom18} alt="Bohemian bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom19} alt="Smart automated bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={bedroom20} alt="Hotel-style bedroom" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Bedrooms;
