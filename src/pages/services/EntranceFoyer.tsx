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

            <div className="max-w-3xl mx-auto space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Design Highlights</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Statement entrance doors and frames</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Elegant console tables and decor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Feature walls and artwork displays</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Welcoming lighting solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Smart storage for shoes and accessories</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Create Your Entrance
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EntranceFoyer;
