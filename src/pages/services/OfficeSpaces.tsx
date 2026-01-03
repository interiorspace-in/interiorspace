import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceGallery from "@/components/ServiceGallery";
import office1 from "@/assets/services/office-1.jpg";
import office2 from "@/assets/services/office-2.jpg";
import office3 from "@/assets/services/office-3.jpg";
import office4 from "@/assets/services/office-4.jpg";
import office5 from "@/assets/services/office-5.jpg";
import office6 from "@/assets/services/office-6.jpg";
import office7 from "@/assets/services/office-7.jpg";
import office8 from "@/assets/services/office-8.jpg";
import office9 from "@/assets/services/office-9.jpg";
import office10 from "@/assets/services/office-10.jpg";
import office11 from "@/assets/services/office-11.jpg";
import office12 from "@/assets/services/office-12.jpg";
import office13 from "@/assets/services/office-13.jpg";
import office14 from "@/assets/services/office-14.jpg";
import office15 from "@/assets/services/office-15.jpg";
import office16 from "@/assets/services/office-16.jpg";
import office17 from "@/assets/services/office-17.jpg";
import office18 from "@/assets/services/office-18.jpg";
import office19 from "@/assets/services/office-19.jpg";
import office20 from "@/assets/services/office-20.jpg";

const fallbackImages = [
  { src: office1, alt: "Modern office space" },
  { src: office2, alt: "Executive office" },
  { src: office3, alt: "Home office workspace" },
  { src: office4, alt: "Contemporary office design" },
  { src: office5, alt: "Executive dark wood office" },
  { src: office6, alt: "Standing desk home office" },
  { src: office7, alt: "Scandinavian bright workspace" },
  { src: office8, alt: "Creative studio office" },
  { src: office9, alt: "Industrial loft workspace" },
  { src: office10, alt: "Corner office city view" },
  { src: office11, alt: "Library study office" },
  { src: office12, alt: "Tech startup workspace" },
  { src: office13, alt: "Built-in office nook" },
  { src: office14, alt: "Coastal beach office" },
  { src: office15, alt: "Mid-century retro office" },
  { src: office16, alt: "Zen minimalist workspace" },
  { src: office17, alt: "Bohemian creative office" },
  { src: office18, alt: "Smart tech office setup" },
  { src: office19, alt: "Farmhouse rustic office" },
  { src: office20, alt: "Luxury corporate office" },
];

const OfficeSpaces = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Office Spaces</h1>
              <p className="text-lg text-muted-foreground">
                Design a productive and inspiring workspace that enhances focus and creativity. 
                Perfect for home offices and professional environments.
              </p>
            </div>

            <ServiceGallery serviceSlug="office-spaces" fallbackImages={fallbackImages} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OfficeSpaces;
