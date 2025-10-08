import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import office1 from "@/assets/services/office-1.jpg";
import office2 from "@/assets/services/office-2.jpg";
import office3 from "@/assets/services/office-3.jpg";

const OfficeSpaces = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Office Spaces</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Design a productive and inspiring workspace that enhances focus and creativity. 
                Perfect for home offices and professional environments.
              </p>
              <Button size="lg" onClick={() => navigate("/get-estimate")}>
                Get Free Estimate
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <img src={office1} alt="Modern office space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={office2} alt="Executive office" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={office3} alt="Home office workspace" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OfficeSpaces;
