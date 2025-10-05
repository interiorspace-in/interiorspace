import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import kitchen1 from "@/assets/services/modular-kitchen-1.jpg";
import kitchen2 from "@/assets/services/modular-kitchen-2.jpg";
import kitchen3 from "@/assets/services/modular-kitchen-3.jpg";

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

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <img src={kitchen1} alt="Luxury modular kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen2} alt="Contemporary kitchen design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={kitchen3} alt="Minimalist modular kitchen" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Features</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Customized modular units to fit your space</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Premium quality materials and hardware</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Intelligent storage solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Modern appliances integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Easy maintenance and durability</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Design Your Kitchen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModularKitchens;
