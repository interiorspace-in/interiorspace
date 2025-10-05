import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import wardrobe1 from "@/assets/services/wardrobe-1.jpg";
import wardrobe2 from "@/assets/services/wardrobe-2.jpg";

const Wardrobes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Wardrobes</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Maximize your storage space with our custom wardrobe solutions. From walk-in closets to 
                space-saving designs, we create organized systems tailored to your needs.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <img src={wardrobe1} alt="Modern wardrobe closet" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
              <img src={wardrobe2} alt="Walk-in wardrobe" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Storage Solutions</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Customized storage compartments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Sliding and hinged door options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Soft-close mechanisms and premium hardware</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>LED lighting integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Mirror and accessory organization</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Design Your Wardrobe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wardrobes;
