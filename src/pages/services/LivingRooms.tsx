import Header from "@/components/Header";
import Footer from "@/components/Footer";
import living1 from "@/assets/services/living-room-1.jpg";
import living2 from "@/assets/services/living-room-2.jpg";
import living3 from "@/assets/services/living-room-3.jpg";
import living4 from "@/assets/services/living-room-4.jpg";
import living5 from "@/assets/services/living-room-5.jpg";
import living6 from "@/assets/services/living-room-6.jpg";
import living7 from "@/assets/services/living-room-7.jpg";
import living8 from "@/assets/services/living-room-8.jpg";
import living9 from "@/assets/services/living-room-9.jpg";
import living10 from "@/assets/services/living-room-10.jpg";
import living11 from "@/assets/services/living-room-11.jpg";
import living12 from "@/assets/services/living-room-12.jpg";
import living13 from "@/assets/services/living-room-13.jpg";
import living14 from "@/assets/services/living-room-14.jpg";
import living15 from "@/assets/services/living-room-15.jpg";
import living16 from "@/assets/services/living-room-16.jpg";
import living17 from "@/assets/services/living-room-17.jpg";
import living18 from "@/assets/services/living-room-18.jpg";
import living19 from "@/assets/services/living-room-19.jpg";
import living20 from "@/assets/services/living-room-20.jpg";

const LivingRooms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Living Rooms</h1>
              <p className="text-lg text-muted-foreground">
                Design a living room that becomes the heart of your home. Where comfort meets elegance, 
                and every element is crafted for memorable moments with family and friends.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <img src={living1} alt="Elegant living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living2} alt="Luxury living space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living3} alt="Scandinavian living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living4} alt="Modern living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living5} alt="Luxury living with chandelier" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living6} alt="Scandinavian minimalist" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living7} alt="Art deco living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living8} alt="Traditional living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living9} alt="Modern entertainment space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living10} alt="Coastal themed living" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living11} alt="Industrial loft living" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living12} alt="Bohemian living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living13} alt="Transitional living space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living14} alt="Mid-century modern" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living15} alt="Farmhouse living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living16} alt="Minimalist design" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living17} alt="Eclectic living space" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living18} alt="Glamorous living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living19} alt="Zen living room" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <img src={living20} alt="Smart home living" className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LivingRooms;
