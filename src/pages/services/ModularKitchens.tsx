import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import kitchen1 from "@/assets/services/modular-kitchen-1.jpg";
import kitchen2 from "@/assets/services/modular-kitchen-2.jpg";
import kitchen3 from "@/assets/services/modular-kitchen-3.jpg";
import kitchen4 from "@/assets/services/modular-kitchen-4.jpg";
import kitchen5 from "@/assets/services/modular-kitchen-5.jpg";
import kitchen6 from "@/assets/services/modular-kitchen-6.jpg";
import kitchen7 from "@/assets/services/modular-kitchen-7.jpg";
import kitchen8 from "@/assets/services/modular-kitchen-8.jpg";
import kitchen9 from "@/assets/services/modular-kitchen-9.jpg";
import kitchen10 from "@/assets/services/modular-kitchen-10.jpg";
import kitchen11 from "@/assets/services/modular-kitchen-11.jpg";
import kitchen12 from "@/assets/services/modular-kitchen-12.jpg";
import kitchen13 from "@/assets/services/modular-kitchen-13.jpg";
import kitchen14 from "@/assets/services/modular-kitchen-14.jpg";
import kitchen15 from "@/assets/services/modular-kitchen-15.jpg";
import kitchen16 from "@/assets/services/modular-kitchen-16.jpg";
import kitchen17 from "@/assets/services/modular-kitchen-17.jpg";
import kitchen18 from "@/assets/services/modular-kitchen-18.jpg";
import kitchen19 from "@/assets/services/modular-kitchen-19.jpg";
import kitchen20 from "@/assets/services/modular-kitchen-20.jpg";

const ModularKitchens = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Modular Kitchens</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Create your dream kitchen with our modern modular solutions. Smart storage, elegant design, 
                and functionality come together to make cooking a delightful experience.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <img src={kitchen1} alt="Luxury modular kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen2} alt="Contemporary kitchen design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen3} alt="Minimalist modular kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen4} alt="Modern kitchen layout" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen5} alt="Elegant kitchen cabinets" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen6} alt="Spacious kitchen island" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen7} alt="Sleek kitchen countertops" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen8} alt="Smart kitchen storage" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen9} alt="Traditional kitchen design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen10} alt="Open plan kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen11} alt="White modular kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen12} alt="Dark themed kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen13} alt="U-shaped kitchen design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen14} alt="L-shaped kitchen layout" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen15} alt="Parallel kitchen design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen16} alt="Island kitchen setup" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen17} alt="Premium kitchen finishes" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen18} alt="Functional kitchen space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen19} alt="Designer kitchen interior" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen20} alt="Complete kitchen renovation" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModularKitchens;
