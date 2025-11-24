import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sofaDining1 from "@/assets/services/sofa-dining-1.jpg";
import sofaDining2 from "@/assets/services/sofa-dining-2.jpg";
import sofaDining3 from "@/assets/services/sofa-dining-3.jpg";
import sofaDining4 from "@/assets/services/sofa-dining-4.jpg";
import sofaDining5 from "@/assets/services/sofa-dining-5.jpg";
import sofaDining6 from "@/assets/services/sofa-dining-6.jpg";
import sofaDining7 from "@/assets/services/sofa-dining-7.jpg";
import sofaDining8 from "@/assets/services/sofa-dining-8.jpg";
import sofaDining9 from "@/assets/services/sofa-dining-9.jpg";
import sofaDining10 from "@/assets/services/sofa-dining-10.jpg";
import sofaDining11 from "@/assets/services/sofa-dining-11.jpg";
import sofaDining12 from "@/assets/services/sofa-dining-12.jpg";
import sofaDining13 from "@/assets/services/sofa-dining-13.jpg";
import sofaDining14 from "@/assets/services/sofa-dining-14.jpg";
import sofaDining15 from "@/assets/services/sofa-dining-15.jpg";
import sofaDining16 from "@/assets/services/sofa-dining-16.jpg";
import sofaDining17 from "@/assets/services/sofa-dining-17.jpg";
import sofaDining18 from "@/assets/services/sofa-dining-18.jpg";
import sofaDining19 from "@/assets/services/sofa-dining-19.jpg";
import sofaDining20 from "@/assets/services/sofa-dining-20.jpg";

const SofaDining = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sofa and Dining</h1>
              <p className="text-lg text-muted-foreground">
                Elevate your dining and lounging experience with our curated furniture collections. 
                Perfect blend of comfort, style, and functionality for your home.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <img src={sofaDining1} alt="Stylish dining and sofa set" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining2} alt="Open dining and living area" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining3} alt="Modern sofa dining combo" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining4} alt="Elegant sofa with marble table" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining5} alt="Contemporary dining room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining6} alt="Sectional with dining area" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining7} alt="Velvet sofa and dining set" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining8} alt="Scandinavian dining living" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining9} alt="Leather sofa marble dining" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining10} alt="L-shaped sofa round table" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining11} alt="Traditional formal dining" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining12} alt="Mid-century dining area" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining13} alt="Tufted sofa with chandelier" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining14} alt="Modular multifunctional" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining15} alt="Coastal dining living" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining16} alt="Industrial loft furniture" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining17} alt="Bohemian rustic dining" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining18} alt="Smart home living dining" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining19} alt="Luxury formal arrangement" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={sofaDining20} alt="Compact space-saving design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SofaDining;
