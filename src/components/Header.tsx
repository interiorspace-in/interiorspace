import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity"
          >
            Interior <span className="text-primary">Space</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("why-us")} className="text-foreground hover:text-primary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-primary transition-colors">
              Testimonials
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+919175956905">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </a>
            <Button size="sm" onClick={() => scrollToSection("estimate")}>
              Get Free Estimate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("services")} className="text-left text-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection("why-us")} className="text-left text-foreground hover:text-primary transition-colors">
                Process
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="text-left text-foreground hover:text-primary transition-colors">
                Testimonials
              </button>
              <a href="tel:+919175956905" className="w-full">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
              </a>
              <Button className="w-full" onClick={() => scrollToSection("estimate")}>
                Get Free Estimate
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
