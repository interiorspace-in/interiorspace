import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fullHome1 from "@/assets/services/full-home-1.jpg";
import fullHome2 from "@/assets/services/full-home-2.jpg";

const FullHomeInteriors = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Full Home Interiors</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your entire home into a masterpiece with our comprehensive interior design solutions. 
                From concept to completion, we create cohesive, beautiful spaces that reflect your lifestyle.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <img src={fullHome1} alt="Modern full home interior" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
              <img src={fullHome2} alt="Spacious full home design" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FullHomeInteriors;
