import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-interior.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Luxury Interior Design" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40 py-[10px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block text-primary">Dream Home</span>
            Into Reality
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">Premium interior design solutions with 45-day delivery and 
10-year warranty. Serving Pune, Pimpri Chinchwad, and surrounding areas.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8" onClick={() => navigate("/get-estimate")}>
              Get Free Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                Book Consultation
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 gap-6 max-w-lg">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
              <div className="text-3xl font-bold text-primary mb-1">45 Days</div>
              <div className="text-sm text-muted-foreground">Quick Delivery</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
              <div className="text-3xl font-bold text-primary mb-1">10 Years</div>
              <div className="text-sm text-muted-foreground">Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;