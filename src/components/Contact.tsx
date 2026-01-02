import { useState } from "react";
import { MapPin, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import EstimateModal from "@/components/EstimateModal";
import { getBookConsultationWhatsAppUrl, trackWhatsAppClick } from "@/hooks/useWhatsAppLeads";
const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleWhatsAppClick = () => {
    const whatsappUrl = getBookConsultationWhatsAppUrl();
    trackWhatsAppClick({
      client_name: "Book Consultation",
      project_type: "Consultation",
      page_source: "Contact Section"
    });
    window.open(whatsappUrl, "_blank");
  };
  return <>
      <section id="contact" className="bg-secondary/30 py-[60px]">
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
              <a href="tel:+919175956905" className="text-muted-foreground hover:text-primary transition-colors">
                +91 9175956905
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
                <a href="https://www.facebook.com/share/17bY5HLVxJ/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/interiorspace_ravet?igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://www.pinterest.com/interiorspaceravet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <button onClick={handleWhatsAppClick} className="hover:text-primary transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Book Consultation CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8" onClick={handleWhatsAppClick}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Book Consultation 
            </Button>
          </div>

          {/* CTA Section */}
          
        </div>
      </section>

      <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>;
};
export default Contact;