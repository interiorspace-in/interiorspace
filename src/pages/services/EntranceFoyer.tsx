import Header from "@/components/Header";
import Footer from "@/components/Footer";
import entrance1 from "@/assets/services/entrance-foyer-1.jpg";
import entrance2 from "@/assets/services/entrance-foyer-2.jpg";
import entrance3 from "@/assets/services/entrance-foyer-3.jpg";
import entrance4 from "@/assets/services/entrance-foyer-4.jpg";
import entrance5 from "@/assets/services/entrance-foyer-5.jpg";
import entrance6 from "@/assets/services/entrance-foyer-6.jpg";
import entrance7 from "@/assets/services/entrance-foyer-7.jpg";
import entrance8 from "@/assets/services/entrance-foyer-8.jpg";
import entrance9 from "@/assets/services/entrance-foyer-9.jpg";
import entrance10 from "@/assets/services/entrance-foyer-10.jpg";
import entrance11 from "@/assets/services/entrance-foyer-11.jpg";
import entrance12 from "@/assets/services/entrance-foyer-12.jpg";
import entrance13 from "@/assets/services/entrance-foyer-13.jpg";
import entrance14 from "@/assets/services/entrance-foyer-14.jpg";
import entrance15 from "@/assets/services/entrance-foyer-15.jpg";
import entrance16 from "@/assets/services/entrance-foyer-16.jpg";
import entrance17 from "@/assets/services/entrance-foyer-17.jpg";
import entrance18 from "@/assets/services/entrance-foyer-18.jpg";
import entrance19 from "@/assets/services/entrance-foyer-19.jpg";
import entrance20 from "@/assets/services/entrance-foyer-20.jpg";

const EntranceFoyer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Entrance and Foyer</h1>
              <p className="text-lg text-muted-foreground">
                Make a stunning first impression with a beautifully designed entrance. Your foyer sets 
                the tone for your entire home with elegance and warmth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <img src={entrance1} alt="Beautiful entrance foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance2} alt="Grand entrance hallway" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance3} alt="Modern foyer design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance4} alt="Chandelier luxury foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance5} alt="Minimalist floating console" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance6} alt="Traditional wooden entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance7} alt="Skylight marble foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance8} alt="Sculptural staircase foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance9} alt="Scandinavian storage entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance10} alt="Art deco geometric foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance11} alt="Farmhouse shiplap entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance12} alt="Double-height grand foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance13} alt="Compact smart storage" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance14} alt="Coastal nautical entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance15} alt="Industrial brick foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance16} alt="Japanese zen entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance17} alt="Bohemian colorful foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance18} alt="Mid-century retro entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance19} alt="Smart automated foyer" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={entrance20} alt="Transitional timeless entrance" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EntranceFoyer;
