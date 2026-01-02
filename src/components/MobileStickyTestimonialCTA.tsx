import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import EstimateModal from "@/components/EstimateModal";
import { 
  trackWhatsAppClick, 
  getBookConsultationWhatsAppUrl 
} from "@/hooks/useWhatsAppLeads";

const MobileStickyTestimonialCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = async () => {
    const whatsappUrl = getBookConsultationWhatsAppUrl();

    // Track lead asynchronously
    trackWhatsAppClick({
      client_name: "Book Consultation",
      project_type: "Consultation",
      page_source: "Mobile Sticky CTA",
    });

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background border-t border-border p-3 shadow-lg flex gap-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            onClick={() => setIsModalOpen(true)}
          >
            <Phone className="w-5 h-5 mr-2" />
            Get Consultation
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Book Consultation
          </Button>
        </div>
      </div>
      <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default MobileStickyTestimonialCTA;
