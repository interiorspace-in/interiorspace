import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceGallery from "@/components/ServiceGallery";
import wardrobe1 from "@/assets/services/wardrobe-1.jpg";
import wardrobe2 from "@/assets/services/wardrobe-2.jpg";
import wardrobe3 from "@/assets/services/wardrobe-3.jpg";
import wardrobe4 from "@/assets/services/wardrobe-4.jpg";
import wardrobe5 from "@/assets/services/wardrobe-5.jpg";
import wardrobe6 from "@/assets/services/wardrobe-6.jpg";
import wardrobe7 from "@/assets/services/wardrobe-7.jpg";
import wardrobe8 from "@/assets/services/wardrobe-8.jpg";
import wardrobe9 from "@/assets/services/wardrobe-9.jpg";
import wardrobe10 from "@/assets/services/wardrobe-10.jpg";
import wardrobe11 from "@/assets/services/wardrobe-11.jpg";
import wardrobe12 from "@/assets/services/wardrobe-12.jpg";
import wardrobe13 from "@/assets/services/wardrobe-13.jpg";
import wardrobe14 from "@/assets/services/wardrobe-14.jpg";
import wardrobe15 from "@/assets/services/wardrobe-15.jpg";
import wardrobe16 from "@/assets/services/wardrobe-16.jpg";
import wardrobe17 from "@/assets/services/wardrobe-17.jpg";
import wardrobe18 from "@/assets/services/wardrobe-18.jpg";
import wardrobe19 from "@/assets/services/wardrobe-19.jpg";
import wardrobe20 from "@/assets/services/wardrobe-20.jpg";

const fallbackImages = [
  { src: wardrobe1, alt: "Modern wardrobe closet" },
  { src: wardrobe2, alt: "Walk-in wardrobe" },
  { src: wardrobe3, alt: "Custom wardrobe storage" },
  { src: wardrobe4, alt: "Luxury wardrobe design" },
  { src: wardrobe5, alt: "Contemporary wardrobe" },
  { src: wardrobe6, alt: "Built-in wardrobe system" },
  { src: wardrobe7, alt: "Elegant wardrobe solution" },
  { src: wardrobe8, alt: "Modular wardrobe design" },
  { src: wardrobe9, alt: "Spacious walk-in closet" },
  { src: wardrobe10, alt: "Organized wardrobe with shelving" },
  { src: wardrobe11, alt: "Mirror finish sliding wardrobe" },
  { src: wardrobe12, alt: "LED lit luxury wardrobe" },
  { src: wardrobe13, alt: "Corner wardrobe design" },
  { src: wardrobe14, alt: "Jewelry drawer wardrobe" },
  { src: wardrobe15, alt: "Minimalist seamless wardrobe" },
  { src: wardrobe16, alt: "Glass display wardrobe" },
  { src: wardrobe17, alt: "Integrated vanity wardrobe" },
  { src: wardrobe18, alt: "Smart automated wardrobe" },
  { src: wardrobe19, alt: "Classic carved wardrobe" },
  { src: wardrobe20, alt: "Full-height storage wardrobe" },
];

const Wardrobes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Wardrobes</h1>
              <p className="text-lg text-muted-foreground">
                Maximize your storage space with our custom wardrobe solutions. From walk-in closets to 
                space-saving designs, we create organized systems tailored to your needs.
              </p>
            </div>

            <ServiceGallery serviceSlug="wardrobes" fallbackImages={fallbackImages} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wardrobes;
