import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceGallery from "@/components/ServiceGallery";
import fullHome1 from "@/assets/services/full-home-1.jpg";
import fullHome2 from "@/assets/services/full-home-2.jpg";
import fullHome3 from "@/assets/services/full-home-3.jpg";
import fullHome4 from "@/assets/services/full-home-4.jpg";
import fullHome5 from "@/assets/services/full-home-5.jpg";
import fullHome6 from "@/assets/services/full-home-6.jpg";
import fullHome7 from "@/assets/services/full-home-7.jpg";
import fullHome8 from "@/assets/services/full-home-8.jpg";
import fullHome9 from "@/assets/services/full-home-9.jpg";
import fullHome10 from "@/assets/services/full-home-10.jpg";
import fullHome11 from "@/assets/services/full-home-11.jpg";
import fullHome12 from "@/assets/services/full-home-12.jpg";
import fullHome13 from "@/assets/services/full-home-13.jpg";
import fullHome14 from "@/assets/services/full-home-14.jpg";
import fullHome15 from "@/assets/services/full-home-15.jpg";
import fullHome16 from "@/assets/services/full-home-16.jpg";
import fullHome17 from "@/assets/services/full-home-17.jpg";
import fullHome18 from "@/assets/services/full-home-18.jpg";
import fullHome19 from "@/assets/services/full-home-19.jpg";
import fullHome20 from "@/assets/services/full-home-20.jpg";

const fallbackImages = [
  { src: fullHome1, alt: "Modern full home interior" },
  { src: fullHome2, alt: "Spacious full home design" },
  { src: fullHome3, alt: "Elegant full home layout" },
  { src: fullHome4, alt: "Contemporary home design" },
  { src: fullHome5, alt: "Luxury home interior" },
  { src: fullHome6, alt: "Minimalist home design" },
  { src: fullHome7, alt: "Traditional home interior" },
  { src: fullHome8, alt: "Modern apartment design" },
  { src: fullHome9, alt: "Spacious villa interior" },
  { src: fullHome10, alt: "Cozy home atmosphere" },
  { src: fullHome11, alt: "Open concept living" },
  { src: fullHome12, alt: "Sophisticated interior" },
  { src: fullHome13, alt: "Bright modern home" },
  { src: fullHome14, alt: "Elegant living space" },
  { src: fullHome15, alt: "Stylish home design" },
  { src: fullHome16, alt: "Comfortable family home" },
  { src: fullHome17, alt: "Chic interior styling" },
  { src: fullHome18, alt: "Beautiful home decor" },
  { src: fullHome19, alt: "Premium home interior" },
  { src: fullHome20, alt: "Complete home makeover" },
];

const FullHomeInteriors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="bg-gradient-to-b from-secondary/30 to-background py-[36px]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Full Home Interiors</h1>
              <p className="text-lg text-muted-foreground">
                Transform your entire home into a masterpiece with our comprehensive interior design solutions. 
                From concept to completion, we create cohesive, beautiful spaces that reflect your lifestyle.
              </p>
            </div>

            <ServiceGallery serviceSlug="full-home-interiors" fallbackImages={fallbackImages} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FullHomeInteriors;
