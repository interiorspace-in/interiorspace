import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceGallery from "@/components/ServiceGallery";
import bedroom1 from "@/assets/services/bedroom-1.jpg";
import bedroom2 from "@/assets/services/bedroom-2.jpg";
import bedroom3 from "@/assets/services/bedroom-3.jpg";
import bedroom4 from "@/assets/services/bedroom-4.jpg";
import bedroom5 from "@/assets/services/bedroom-5.jpg";
import bedroom6 from "@/assets/services/bedroom-6.jpg";
import bedroom7 from "@/assets/services/bedroom-7.jpg";
import bedroom8 from "@/assets/services/bedroom-8.jpg";
import bedroom9 from "@/assets/services/bedroom-9.jpg";
import bedroom10 from "@/assets/services/bedroom-10.jpg";
import bedroom11 from "@/assets/services/bedroom-11.jpg";
import bedroom12 from "@/assets/services/bedroom-12.jpg";
import bedroom13 from "@/assets/services/bedroom-13.jpg";
import bedroom14 from "@/assets/services/bedroom-14.jpg";
import bedroom15 from "@/assets/services/bedroom-15.jpg";
import bedroom16 from "@/assets/services/bedroom-16.jpg";
import bedroom17 from "@/assets/services/bedroom-17.jpg";
import bedroom18 from "@/assets/services/bedroom-18.jpg";
import bedroom19 from "@/assets/services/bedroom-19.jpg";
import bedroom20 from "@/assets/services/bedroom-20.jpg";

const fallbackImages = [
  { src: bedroom1, alt: "Cozy bedroom design" },
  { src: bedroom2, alt: "Master bedroom suite" },
  { src: bedroom3, alt: "Contemporary bedroom" },
  { src: bedroom4, alt: "Warm cozy bedroom" },
  { src: bedroom5, alt: "Luxury master suite" },
  { src: bedroom6, alt: "Modern platform bedroom" },
  { src: bedroom7, alt: "Romantic canopy bed" },
  { src: bedroom8, alt: "Scandinavian bedroom" },
  { src: bedroom9, alt: "Luxury tufted headboard" },
  { src: bedroom10, alt: "Teen bedroom with study" },
  { src: bedroom11, alt: "Guest bedroom" },
  { src: bedroom12, alt: "Coastal beach bedroom" },
  { src: bedroom13, alt: "Rustic farmhouse bedroom" },
  { src: bedroom14, alt: "Urban loft bedroom" },
  { src: bedroom15, alt: "Zen minimalist bedroom" },
  { src: bedroom16, alt: "Art deco bedroom" },
  { src: bedroom17, alt: "Traditional classic bedroom" },
  { src: bedroom18, alt: "Bohemian bedroom" },
  { src: bedroom19, alt: "Smart automated bedroom" },
  { src: bedroom20, alt: "Hotel-style bedroom" },
];

const Bedrooms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Bedrooms</h1>
              <p className="text-lg text-muted-foreground">
                Create your personal sanctuary with bedroom designs that promote relaxation and rest. 
                Every detail is crafted to ensure comfort, style, and tranquility.
              </p>
            </div>

            <ServiceGallery serviceSlug="bedrooms" fallbackImages={fallbackImages} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Bedrooms;
