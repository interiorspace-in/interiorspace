import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sofaDining1 from "@/assets/services/sofa-dining-1.jpg";
import sofaDining2 from "@/assets/services/sofa-dining-2.jpg";

const SofaDining = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sofa and Dining</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Elevate your dining and lounging experience with our curated furniture collections. 
                Perfect blend of comfort, style, and functionality for your home.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <img src={sofaDining1} alt="Stylish dining and sofa set" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining2} alt="Open dining and living area" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SofaDining;
