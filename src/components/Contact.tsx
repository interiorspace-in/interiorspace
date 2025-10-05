import { MapPin, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const Contact = () => {
  return <section id="contact" className="bg-secondary/30 py-[60px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your space? Reach out to us today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Phone */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call or WhatsApp</h3>
            <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              +91 91759 56905
            </a>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Our Showroom</h3>
            <a href="https://maps.app.goo.gl/6aekHNxkd2sgDLnq8" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Ravet, Pune 412101
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Interior Journey?
          </h3>
          <p className="text-muted-foreground mb-6">
            Book a free consultation with our design experts today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                Book Free Consultation
              </Button>
            </a>
            <Button size="lg" variant="outline" onClick={() => {
            const element = document.getElementById("estimate");
            if (element) {
              element.scrollIntoView({
                behavior: "smooth"
              });
            }
          }} className="w-full sm:w-auto">
              Get Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;