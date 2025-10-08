import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import entrance1 from "@/assets/services/entrance-foyer-1.jpg";
import entrance2 from "@/assets/services/entrance-foyer-2.jpg";

const EntranceFoyer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Entrance and Foyer</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Make a stunning first impression with a beautifully designed entrance. Your foyer sets 
                the tone for your entire home with elegance and warmth.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <img src={entrance1} alt="Beautiful entrance foyer" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
              <img src={entrance2} alt="Grand entrance hallway" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EntranceFoyer;
